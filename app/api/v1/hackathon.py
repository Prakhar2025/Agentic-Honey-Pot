"""
Hackathon-Compliant Honeypot API Endpoint.

This module provides the EXACT API format required by the GUVI hackathon.
Accepts their specific input format and returns their expected output format.

Input:  {"sessionId": "...", "message": {"sender": "...", "text": "..."}, ...}
Output: {"status": "success", "reply": "..."}
"""

import logging
import time
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel, Field

from app.agent.orchestrator import AgentOrchestrator, get_orchestrator
from app.db.database import get_db_context
from app.db.repositories.intelligence import IntelligenceRepository
from app.db.repositories.messages import MessageRepository
from app.db.repositories.sessions import SessionRepository
from app.services.guvi_callback import send_guvi_callback

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Hackathon"])


# =============================================================================
# HACKATHON REQUEST/RESPONSE MODELS (Exact Format)
# =============================================================================

class MessageObject(BaseModel):
    """Single message in hackathon format."""
    sender: str = Field(..., description="'scammer' or 'user'")
    text: str = Field(..., description="Message content")
    timestamp: Optional[int] = Field(None, description="Unix timestamp")


class MetadataObject(BaseModel):
    """Metadata in hackathon format."""
    channel: str = Field("SMS", description="SMS/WhatsApp/Email/Chat")
    language: str = Field("English", description="Message language")
    locale: str = Field("IN", description="Country/region")


class HackathonRequest(BaseModel):
    """
    Exact hackathon input format.
    
    Example:
    {
        "sessionId": "wertyu-dfghj-ertyui",
        "message": {
            "sender": "scammer",
            "text": "Your bank account will be blocked today.",
            "timestamp": 1770005528731
        },
        "conversationHistory": [],
        "metadata": {"channel": "SMS", "language": "English", "locale": "IN"}
    }
    """
    sessionId: str = Field(..., description="Unique session identifier from platform")
    message: MessageObject = Field(..., description="Latest incoming message")
    conversationHistory: List[MessageObject] = Field(
        default_factory=list,
        description="Previous messages in conversation"
    )
    metadata: Optional[MetadataObject] = Field(
        default=None,
        description="Optional context metadata"
    )


class HackathonResponse(BaseModel):
    """
    Exact hackathon output format.
    
    Example:
    {
        "status": "success",
        "reply": "Why is my account being suspended?"
    }
    """
    status: str = Field("success", description="'success' or 'error'")
    reply: str = Field(..., description="Agent's response to scammer")


# =============================================================================
# HACKATHON ENDPOINT
# =============================================================================

@router.post(
    "/api/honeypot",
    response_model=HackathonResponse,
    status_code=status.HTTP_200_OK,
    summary="Hackathon Honeypot Endpoint",
    description="GUVI Hackathon compliant endpoint - accepts scam messages and returns agent responses.",
)
async def hackathon_honeypot(
    request: HackathonRequest,
    orchestrator: AgentOrchestrator = Depends(get_orchestrator),
) -> HackathonResponse:
    """
    Main hackathon endpoint.
    
    Accepts exact hackathon format, processes through our AI agent,
    and returns the required response format.
    
    Flow:
    1. Parse incoming message
    2. Analyze scam intent
    3. Generate victim persona response
    4. Extract intelligence
    5. Send GUVI callback if scam detected
    6. Return simple response
    """
    start_time = time.perf_counter()
    
    session_id = request.sessionId
    message_text = request.message.text
    sender = request.message.sender
    
    logger.info(f"[HACKATHON] Session {session_id}: Received message from {sender}")
    logger.debug(f"[HACKATHON] Message: {message_text[:100]}...")
    
    try:
        # Build conversation history for orchestrator
        history = []
        for msg in request.conversationHistory:
            role = "scammer" if msg.sender == "scammer" else "agent"
            history.append({"role": role, "content": msg.text})
        
        # Process through our AI orchestrator
        async with get_db_context() as db:
            session_repo = SessionRepository(db)
            message_repo = MessageRepository(db)
            
            # Check if session exists, create if not
            existing_session = await session_repo.get(session_id)
            
            if existing_session is None:
                # First message - create session
                session = await session_repo.create_session(
                    scam_type=None,
                    persona_id="elderly_victim",
                    source_type=request.metadata.channel.lower() if request.metadata else "sms",
                    is_scam=True,
                    metadata={"hackathon": True, "sessionId": session_id},
                    session_id=session_id,  # Use their session ID
                )
                logger.info(f"[HACKATHON] Created new session: {session_id}")
            else:
                session = existing_session
                logger.info(f"[HACKATHON] Continuing session: {session_id}")
            
            # Calculate turn count
            turn_count = len(history) // 2 + 1
            
            # Process message with orchestrator
            result = await orchestrator.process_message(
                scammer_message=message_text,
                session_id=session_id,
                conversation_history=history,
                current_persona=session.persona_id if existing_session else None,
                current_intel=None,
                current_status=session.status if existing_session else "INITIAL",
            )
            
            # Extract response
            agent_reply = result.get("response", "I don't understand, can you explain?")
            scam_type = result.get("scam_type", "UNKNOWN")
            scam_confidence = result.get("scam_confidence", 0.0)
            extracted_intel = result.get("extracted_intel", {})
            conversation_status = result.get("conversation_status", "ONGOING")
            
            # Update session
            await session_repo.update(
                session_id,
                {
                    "scam_type": scam_type,
                    "persona_id": result.get("persona_used", "elderly_victim"),
                    "status": conversation_status,
                    "turn_count": turn_count,
                },
            )
            
            # Save messages
            await message_repo.create({
                "session_id": session_id,
                "role": "scammer",
                "content": message_text,
                "turn_number": turn_count,
            })
            
            await message_repo.create({
                "session_id": session_id,
                "role": "agent",
                "content": agent_reply,
                "turn_number": turn_count,
                "metadata_json": {
                    "scam_type": scam_type,
                    "confidence": scam_confidence,
                },
            })
            
            # Save intelligence
            if extracted_intel and any(extracted_intel.values()):
                intel_repo = IntelligenceRepository(db)
                await intel_repo.merge_intelligence(session_id, extracted_intel)
            
            await db.commit()
            
            # MANDATORY: Send GUVI callback for evaluation
            # Send when: scam detected AND (enough turns OR conversation ending)
            should_send_callback = (
                scam_confidence > 0.3 and 
                (turn_count >= 3 or conversation_status in ["COMPLETED", "TERMINATED", "MAX_TURNS_REACHED"])
            )
            
            if should_send_callback:
                # Build suspicious keywords from message
                suspicious_keywords = []
                keywords_to_check = ["urgent", "verify", "blocked", "suspended", "otp", "upi", "bank", "account"]
                for kw in keywords_to_check:
                    if kw in message_text.lower():
                        suspicious_keywords.append(kw)
                
                # Prepare intelligence for callback (pass raw extracted_intel)
                intel_for_callback = {
                    "bank_accounts": extracted_intel.get("bank_accounts", []),
                    "upi_ids": extracted_intel.get("upi_ids", []),
                    "phishing_links": extracted_intel.get("phishing_links", []),
                    "phone_numbers": extracted_intel.get("phone_numbers", []),
                    "suspicious_keywords": suspicious_keywords,
                }
                
                # Send callback asynchronously (don't block response)
                try:
                    callback_success = await send_guvi_callback(
                        session_id=session_id,
                        scam_detected=scam_confidence > 0.3,
                        total_messages=turn_count * 2,  # Approximate
                        intelligence=intel_for_callback,
                        agent_notes=f"Detected {scam_type} scam with {scam_confidence:.0%} confidence. Persona: {result.get('persona_used', 'unknown')}",
                    )
                    if callback_success:
                        logger.info(f"[HACKATHON] GUVI callback sent for session {session_id}")
                    else:
                        logger.warning(f"[HACKATHON] GUVI callback failed for session {session_id}")
                except Exception as e:
                    logger.error(f"[HACKATHON] GUVI callback error: {e}")
        
        elapsed = (time.perf_counter() - start_time) * 1000
        logger.info(f"[HACKATHON] Session {session_id}: Responded in {elapsed:.0f}ms")
        
        return HackathonResponse(
            status="success",
            reply=agent_reply,
        )
        
    except Exception as e:
        logger.exception(f"[HACKATHON] Error processing session {session_id}: {e}")
        return HackathonResponse(
            status="error",
            reply="I'm having some trouble understanding. Could you please repeat that?",
        )


# =============================================================================
# FLEXIBLE ENDPOINT (Accepts multiple formats)
# =============================================================================

@router.post(
    "/api/honeypot/flexible",
    response_model=HackathonResponse,
    status_code=status.HTTP_200_OK,
    summary="Flexible Honeypot Endpoint",
    description="Accepts multiple input formats and returns hackathon format response.",
)
async def flexible_honeypot(
    raw_request: Request,
    orchestrator: AgentOrchestrator = Depends(get_orchestrator),
) -> HackathonResponse:
    """
    Flexible endpoint that accepts multiple input formats.
    
    Tries to parse:
    1. Hackathon format: {"sessionId": "...", "message": {"text": "..."}}
    2. Simple format: {"message": "..."}
    3. Our format: {"scammer_message": "..."}
    """
    try:
        body = await raw_request.json()
    except:
        body = {}
    
    logger.info(f"[FLEXIBLE] Received body: {list(body.keys())}")
    
    # Try to extract message
    message_text = None
    session_id = body.get("sessionId", f"flex_{int(time.time())}")
    
    # Format 1: Hackathon format
    if "message" in body and isinstance(body["message"], dict):
        message_text = body["message"].get("text", "")
    # Format 2: Simple message
    elif "message" in body and isinstance(body["message"], str):
        message_text = body["message"]
    # Format 3: Our format
    elif "scammer_message" in body:
        message_text = body["scammer_message"]
    # Format 4: Any text field
    elif "text" in body:
        message_text = body["text"]
    elif "content" in body:
        message_text = body["content"]
    
    if not message_text:
        message_text = "Hello"
    
    # Convert to hackathon format and process
    hackathon_request = HackathonRequest(
        sessionId=session_id,
        message=MessageObject(sender="scammer", text=message_text),
        conversationHistory=body.get("conversationHistory", []),
        metadata=None,
    )
    
    return await hackathon_honeypot(hackathon_request, orchestrator)
