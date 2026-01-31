"""
Session Management Endpoints.

This module provides endpoints for retrieving and managing
honeypot sessions and their associated data.

Endpoints:
    GET /sessions - List all sessions with pagination
    GET /sessions/{session_id} - Get session details
    GET /sessions/{session_id}/intelligence - Get extracted intelligence
    GET /sessions/{session_id}/messages - Get conversation messages
"""

import logging
import uuid
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field

from app.db.database import get_db_context
from app.db.repositories.messages import MessageRepository
from app.db.repositories.sessions import SessionRepository

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/sessions", tags=["Sessions"])


# =============================================================================
# RESPONSE MODELS
# =============================================================================

class MessageResponse(BaseModel):
    """Response model for a single message."""
    
    id: str = Field(..., description="Message ID")
    role: str = Field(..., description="Message role (scammer/agent)")
    content: str = Field(..., description="Message content")
    turn_number: int = Field(..., description="Turn number")
    created_at: str = Field(..., description="Creation timestamp")


class IntelligenceResponse(BaseModel):
    """Response model for extracted intelligence."""
    
    session_id: str = Field(..., description="Session ID")
    phone_numbers: List[Dict[str, Any]] = Field(default_factory=list)
    upi_ids: List[Dict[str, Any]] = Field(default_factory=list)
    bank_accounts: List[Dict[str, Any]] = Field(default_factory=list)
    ifsc_codes: List[Dict[str, Any]] = Field(default_factory=list)
    phishing_links: List[Dict[str, Any]] = Field(default_factory=list)
    emails: List[Dict[str, Any]] = Field(default_factory=list)
    other_intel: List[Dict[str, Any]] = Field(default_factory=list)
    total_entities: int = Field(..., description="Total extracted entities")
    intel_score: float = Field(..., description="Intelligence score (0.0-1.0)")


class SessionResponse(BaseModel):
    """Response model for full session details."""
    
    id: str = Field(..., description="Session ID")
    source_type: str = Field(..., description="Source type")
    source_identifier: Optional[str] = Field(None, description="Source identifier")
    persona_used: str = Field(..., description="Persona used")
    scam_type_detected: str = Field(..., description="Detected scam type")
    status: str = Field(..., description="Session status")
    turn_count: int = Field(..., description="Total turns")
    created_at: str = Field(..., description="Creation timestamp")
    updated_at: str = Field(..., description="Last update timestamp")
    messages: List[MessageResponse] = Field(default_factory=list)
    intelligence: Optional[IntelligenceResponse] = None


class SessionSummary(BaseModel):
    """Summary model for session list."""
    
    id: str
    source_type: str
    persona_used: str
    scam_type_detected: str
    status: str
    turn_count: int
    intel_count: int
    created_at: str


class SessionListResponse(BaseModel):
    """Response model for session list."""
    
    sessions: List[SessionSummary]
    total: int
    limit: int
    offset: int


# =============================================================================
# ENDPOINTS
# =============================================================================

@router.get(
    "",
    response_model=SessionListResponse,
    summary="List Sessions",
    description="List all honeypot sessions with optional filtering and pagination.",
)
async def list_sessions(
    limit: int = Query(default=20, ge=1, le=100, description="Max results"),
    offset: int = Query(default=0, ge=0, description="Offset for pagination"),
    status_filter: Optional[str] = Query(
        default=None,
        alias="status",
        description="Filter by status",
    ),
    scam_type: Optional[str] = Query(
        default=None,
        description="Filter by scam type",
    ),
) -> SessionListResponse:
    """
    List all honeypot sessions.
    
    Supports pagination and filtering by status or scam type.
    Returns summary information for each session.
    
    Args:
        limit: Maximum number of results (1-100).
        offset: Pagination offset.
        status_filter: Optional status filter.
        scam_type: Optional scam type filter.
    
    Returns:
        SessionListResponse with list of session summaries.
    
    Example:
        GET /v1/sessions?limit=10&status=ONGOING&scam_type=KYC_PHISHING
    """
    logger.info(f"List sessions: limit={limit}, offset={offset}")
    
    async with get_db_context() as db:
        session_repo = SessionRepository(db)
        
        # Get sessions with filters
        sessions = await session_repo.list_all(
            limit=limit,
            offset=offset,
            status=status_filter,
            scam_type=scam_type,
        )
        
        # Get total count
        total = await session_repo.count(
            status=status_filter,
            scam_type=scam_type,
        )
        
        # Convert to summaries
        summaries = []
        for session in sessions:
            intel = session.extracted_intelligence or {}
            intel_count = intel.get("total_entities", 0) if intel else 0
            
            summaries.append(SessionSummary(
                id=str(session.id),
                source_type=session.source_type or "unknown",
                persona_used=session.persona_used or "unknown",
                scam_type_detected=session.scam_type_detected or "UNKNOWN",
                status=session.status or "UNKNOWN",
                turn_count=session.turn_count or 0,
                intel_count=intel_count,
                created_at=session.created_at.isoformat() if session.created_at else "",
            ))
        
        return SessionListResponse(
            sessions=summaries,
            total=total,
            limit=limit,
            offset=offset,
        )


@router.get(
    "/{session_id}",
    response_model=SessionResponse,
    summary="Get Session Details",
    description="Get full details of a honeypot session including messages.",
)
async def get_session(session_id: str) -> SessionResponse:
    """
    Get full session details.
    
    Returns complete session information including:
    - Session metadata
    - All conversation messages
    - Extracted intelligence
    
    Args:
        session_id: Session UUID.
    
    Returns:
        SessionResponse with full session details.
    
    Raises:
        HTTPException: 404 if session not found.
    """
    logger.info(f"Get session: session_id={session_id}")
    
    try:
        session_uuid = uuid.UUID(session_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid session ID format",
        )
    
    async with get_db_context() as db:
        session_repo = SessionRepository(db)
        message_repo = MessageRepository(db)
        
        session = await session_repo.get(session_uuid)
        if not session:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Session not found: {session_id}",
            )
        
        # Get messages
        messages = await message_repo.get_by_session(session_uuid)
        message_list = [
            MessageResponse(
                id=str(msg.id),
                role=msg.role,
                content=msg.content,
                turn_number=msg.turn_number or 1,
                created_at=msg.created_at.isoformat() if msg.created_at else "",
            )
            for msg in messages
        ]
        
        # Build intelligence response
        intel = session.extracted_intelligence or {}
        intel_response = IntelligenceResponse(
            session_id=session_id,
            phone_numbers=intel.get("phone_numbers", []),
            upi_ids=intel.get("upi_ids", []),
            bank_accounts=intel.get("bank_accounts", []),
            ifsc_codes=intel.get("ifsc_codes", []),
            phishing_links=intel.get("phishing_links", []),
            emails=intel.get("emails", []),
            other_intel=intel.get("other_intel", []),
            total_entities=intel.get("total_entities", 0),
            intel_score=0.0,  # Calculate if needed
        )
        
        return SessionResponse(
            id=str(session.id),
            source_type=session.source_type or "unknown",
            source_identifier=session.source_identifier,
            persona_used=session.persona_used or "unknown",
            scam_type_detected=session.scam_type_detected or "UNKNOWN",
            status=session.status or "UNKNOWN",
            turn_count=session.turn_count or 0,
            created_at=session.created_at.isoformat() if session.created_at else "",
            updated_at=session.updated_at.isoformat() if session.updated_at else "",
            messages=message_list,
            intelligence=intel_response,
        )


@router.get(
    "/{session_id}/intelligence",
    response_model=IntelligenceResponse,
    summary="Get Session Intelligence",
    description="Get only the extracted intelligence for a session.",
)
async def get_session_intelligence(session_id: str) -> IntelligenceResponse:
    """
    Get extracted intelligence for a session.
    
    Returns all financial entities and scam artifacts extracted
    from the conversation.
    
    Args:
        session_id: Session UUID.
    
    Returns:
        IntelligenceResponse with all extracted entities.
    
    Raises:
        HTTPException: 404 if session not found.
    """
    logger.info(f"Get intelligence: session_id={session_id}")
    
    try:
        session_uuid = uuid.UUID(session_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid session ID format",
        )
    
    async with get_db_context() as db:
        session_repo = SessionRepository(db)
        
        session = await session_repo.get(session_uuid)
        if not session:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Session not found: {session_id}",
            )
        
        intel = session.extracted_intelligence or {}
        
        return IntelligenceResponse(
            session_id=session_id,
            phone_numbers=intel.get("phone_numbers", []),
            upi_ids=intel.get("upi_ids", []),
            bank_accounts=intel.get("bank_accounts", []),
            ifsc_codes=intel.get("ifsc_codes", []),
            phishing_links=intel.get("phishing_links", []),
            emails=intel.get("emails", []),
            other_intel=intel.get("other_intel", []),
            total_entities=intel.get("total_entities", 0),
            intel_score=0.0,
        )


@router.get(
    "/{session_id}/messages",
    response_model=List[MessageResponse],
    summary="Get Session Messages",
    description="Get all messages for a session.",
)
async def get_session_messages(session_id: str) -> List[MessageResponse]:
    """
    Get all messages for a session.
    
    Returns the complete conversation history ordered by turn number.
    
    Args:
        session_id: Session UUID.
    
    Returns:
        List of MessageResponse objects.
    
    Raises:
        HTTPException: 404 if session not found.
    """
    logger.info(f"Get messages: session_id={session_id}")
    
    try:
        session_uuid = uuid.UUID(session_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid session ID format",
        )
    
    async with get_db_context() as db:
        session_repo = SessionRepository(db)
        message_repo = MessageRepository(db)
        
        # Verify session exists
        session = await session_repo.get(session_uuid)
        if not session:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Session not found: {session_id}",
            )
        
        messages = await message_repo.get_by_session(session_uuid)
        
        return [
            MessageResponse(
                id=str(msg.id),
                role=msg.role,
                content=msg.content,
                turn_number=msg.turn_number or 1,
                created_at=msg.created_at.isoformat() if msg.created_at else "",
            )
            for msg in messages
        ]
