"""
Honeypot API Endpoints.

This module provides the core honeypot endpoints for engaging
with scammers and collecting intelligence.

Endpoints:
    POST /honeypot/engage - Start new scam conversation
    POST /honeypot/continue - Continue existing conversation
"""

import logging
import time
import uuid
from datetime import datetime, timezone
from typing import Any, Dict, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field

from app.agent.orchestrator import AgentOrchestrator, get_orchestrator
from app.db.database import get_db_context
from app.db.repositories.messages import MessageRepository
from app.db.repositories.sessions import SessionRepository

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/honeypot", tags=["Honeypot"])


# =============================================================================
# REQUEST/RESPONSE MODELS
# =============================================================================

class EngageRequest(BaseModel):
    """Request model for starting a new scam conversation."""
    
    scammer_message: str = Field(
        ...,
        min_length=1,
        max_length=2000,
        description="Initial message from the scammer",
        examples=["Your KYC is expiring. Click link to update."],
    )
    source_type: str = Field(
        default="sms",
        description="Source of the scam message",
        examples=["sms", "whatsapp", "call", "email"],
    )
    source_identifier: Optional[str] = Field(
        default=None,
        description="Source identifier (phone number, email, etc.)",
        examples=["+919876543210"],
    )
    persona_preference: Optional[str] = Field(
        default=None,
        description="Preferred persona (or 'auto' for automatic)",
        examples=["elderly_victim", "tech_novice", "auto"],
    )
    metadata: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Additional metadata about the scam",
    )


class EngageResponse(BaseModel):
    """Response model for engage endpoint."""
    
    session_id: str = Field(..., description="Unique session identifier")
    response: str = Field(..., description="Generated victim response")
    persona_used: str = Field(..., description="Persona identifier used")
    persona_display_name: str = Field(..., description="Human-readable persona name")
    scam_type: str = Field(..., description="Detected scam type")
    scam_confidence: float = Field(..., description="Scam detection confidence")
    conversation_status: str = Field(..., description="Current conversation status")
    turn_count: int = Field(..., description="Current turn number")
    processing_time_ms: float = Field(..., description="Processing time in milliseconds")


class ContinueRequest(BaseModel):
    """Request model for continuing a conversation."""
    
    session_id: str = Field(
        ...,
        description="Session ID from engage response",
        examples=["550e8400-e29b-41d4-a716-446655440000"],
    )
    scammer_message: str = Field(
        ...,
        min_length=1,
        max_length=2000,
        description="Message from the scammer",
        examples=["Please share your OTP for verification"],
    )


class ContinueResponse(BaseModel):
    """Response model for continue endpoint."""
    
    session_id: str = Field(..., description="Session identifier")
    response: str = Field(..., description="Generated victim response")
    conversation_status: str = Field(..., description="Current status")
    turn_count: int = Field(..., description="Current turn number")
    intel_score: float = Field(..., description="Intelligence extraction score")
    new_intel_count: int = Field(..., description="New entities extracted this turn")
    processing_time_ms: float = Field(..., description="Processing time")


# =============================================================================
# ENDPOINTS
# =============================================================================

@router.post(
    "/engage",
    response_model=EngageResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Start New Scam Conversation",
    description="Initialize a new honeypot session with an incoming scam message.",
)
async def engage_scammer(
    request: EngageRequest,
    orchestrator: AgentOrchestrator = Depends(get_orchestrator),
) -> EngageResponse:
    """
    Start a new honeypot conversation.
    
    This endpoint:
    1. Creates a new session
    2. Detects scam type
    3. Selects appropriate persona
    4. Generates initial victim response
    5. Saves session and messages to database
    
    Args:
        request: EngageRequest with scammer message and metadata.
        orchestrator: Agent orchestrator (injected).
    
    Returns:
        EngageResponse with session ID and generated response.
    
    Raises:
        HTTPException: 400 for invalid input, 500 for processing errors.
    
    Example:
        POST /v1/honeypot/engage
        {
            "scammer_message": "Your KYC is expiring",
            "source_type": "sms",
            "source_identifier": "+919876543210"
        }
        
        Response:
        {
            "session_id": "abc-123",
            "response": "Beta, what KYC? Please explain...",
            "persona_used": "elderly_victim",
            "scam_type": "KYC_PHISHING"
        }
    """
    start_time = time.perf_counter()
    session_id = str(uuid.uuid4())
    
    logger.info(f"New engage request: session_id={session_id}, source={request.source_type}")
    
    try:
        # Process message with orchestrator
        result = await orchestrator.process_message(
            scammer_message=request.scammer_message,
            session_id=session_id,
            conversation_history=[],
            current_persona=request.persona_preference,
            current_intel=None,
            current_status="INITIAL",
        )
        
        # Save session to database
        async with get_db_context() as db:
            session_repo = SessionRepository(db)
            message_repo = MessageRepository(db)
            
            # Create session record
            session_data = {
                "id": uuid.UUID(session_id),
                "source_type": request.source_type,
                "source_identifier": request.source_identifier,
                "persona_used": result["persona_used"],
                "scam_type_detected": result["scam_type"],
                "status": result["conversation_status"],
                "turn_count": result["turn_count"],
                "extracted_intelligence": result["extracted_intel"],
                "metadata": request.metadata or {},
            }
            session = await session_repo.create(session_data)
            
            # Save scammer message
            await message_repo.create({
                "session_id": session.id,
                "role": "scammer",
                "content": request.scammer_message,
                "turn_number": 1,
            })
            
            # Save agent response
            await message_repo.create({
                "session_id": session.id,
                "role": "agent",
                "content": result["response"],
                "turn_number": 1,
                "metadata": {
                    "processing_time_ms": result["processing_time_ms"],
                    "intel_score": result["intel_score"],
                },
            })
            
            await db.commit()
        
        total_time = (time.perf_counter() - start_time) * 1000
        
        logger.info(
            f"Engage complete: session_id={session_id}, "
            f"scam_type={result['scam_type']}, time={total_time:.0f}ms"
        )
        
        return EngageResponse(
            session_id=session_id,
            response=result["response"],
            persona_used=result["persona_used"],
            persona_display_name=result["persona_display_name"],
            scam_type=result["scam_type"],
            scam_confidence=result["scam_confidence"],
            conversation_status=result["conversation_status"],
            turn_count=result["turn_count"],
            processing_time_ms=round(total_time, 2),
        )
        
    except Exception as e:
        logger.exception(f"Engage failed: session_id={session_id}, error={e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process message: {str(e)}",
        )


@router.post(
    "/continue",
    response_model=ContinueResponse,
    summary="Continue Existing Conversation",
    description="Continue an existing honeypot conversation with a new scammer message.",
)
async def continue_conversation(
    request: ContinueRequest,
    orchestrator: AgentOrchestrator = Depends(get_orchestrator),
) -> ContinueResponse:
    """
    Continue an existing honeypot conversation.
    
    This endpoint:
    1. Fetches the existing session
    2. Retrieves conversation history
    3. Processes new message with context
    4. Updates session with new intelligence
    5. Saves messages to database
    
    Args:
        request: ContinueRequest with session ID and new message.
        orchestrator: Agent orchestrator (injected).
    
    Returns:
        ContinueResponse with generated response and updated stats.
    
    Raises:
        HTTPException: 404 if session not found, 400 if session terminated.
    
    Example:
        POST /v1/honeypot/continue
        {
            "session_id": "abc-123",
            "scammer_message": "Send OTP now"
        }
    """
    start_time = time.perf_counter()
    
    logger.info(f"Continue request: session_id={request.session_id}")
    
    try:
        # Parse and validate session ID
        try:
            session_uuid = uuid.UUID(request.session_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid session ID format",
            )
        
        async with get_db_context() as db:
            session_repo = SessionRepository(db)
            message_repo = MessageRepository(db)
            
            # Fetch existing session
            session = await session_repo.get(session_uuid)
            if not session:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Session not found: {request.session_id}",
                )
            
            # Check if session is still active
            if session.status in ["COMPLETED", "TERMINATED", "MAX_TURNS_REACHED"]:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Session is no longer active: {session.status}",
                )
            
            # Get conversation history
            messages = await message_repo.get_by_session(session_uuid)
            history = [
                {"role": msg.role, "content": msg.content}
                for msg in messages
            ]
            
            # Process message with orchestrator
            result = await orchestrator.process_message(
                scammer_message=request.scammer_message,
                session_id=request.session_id,
                conversation_history=history,
                current_persona=session.persona_used,
                current_intel=session.extracted_intelligence or {},
                current_status=session.status,
            )
            
            # Update session
            new_turn = result["turn_count"]
            await session_repo.update(
                session_uuid,
                {
                    "status": result["conversation_status"],
                    "turn_count": new_turn,
                    "extracted_intelligence": result["extracted_intel"],
                    "updated_at": datetime.now(timezone.utc),
                },
            )
            
            # Save scammer message
            await message_repo.create({
                "session_id": session_uuid,
                "role": "scammer",
                "content": request.scammer_message,
                "turn_number": new_turn,
            })
            
            # Save agent response
            await message_repo.create({
                "session_id": session_uuid,
                "role": "agent",
                "content": result["response"],
                "turn_number": new_turn,
                "metadata": {
                    "processing_time_ms": result["processing_time_ms"],
                    "intel_score": result["intel_score"],
                },
            })
            
            await db.commit()
        
        total_time = (time.perf_counter() - start_time) * 1000
        
        # Count new intel
        new_intel = result.get("new_intel_this_turn", {})
        new_intel_count = new_intel.get("total_entities", 0) if new_intel else 0
        
        logger.info(
            f"Continue complete: session_id={request.session_id}, "
            f"turn={new_turn}, status={result['conversation_status']}, "
            f"time={total_time:.0f}ms"
        )
        
        return ContinueResponse(
            session_id=request.session_id,
            response=result["response"],
            conversation_status=result["conversation_status"],
            turn_count=new_turn,
            intel_score=result["intel_score"],
            new_intel_count=new_intel_count,
            processing_time_ms=round(total_time, 2),
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.exception(f"Continue failed: session_id={request.session_id}, error={e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process message: {str(e)}",
        )
