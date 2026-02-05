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
from app.intelligence.extractor import IntelligenceExtractor, get_extractor
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
            
            # CRITICAL: Extract intelligence from ALL scammer messages in conversation
            # This ensures we don't miss any revealed details from earlier turns
            all_scammer_text = message_text
            for msg in request.conversationHistory:
                if msg.sender == "scammer":
                    all_scammer_text += " " + msg.text
            
            extractor = get_extractor()
            full_extraction = extractor.extract_all(all_scammer_text)
            
            # Merge full extraction with existing intel (avoid duplicates)
            for key in ["upi_ids", "bank_accounts", "phone_numbers", "phishing_links"]:
                existing = extracted_intel.get(key, [])
                new_items = full_extraction.get(key, [])
                existing_ids = set()
                for e in existing:
                    existing_ids.add(e.get("id") or e.get("account_number") or e.get("number") or e.get("url"))
                for item in new_items:
                    item_id = item.get("id") or item.get("account_number") or item.get("number") or item.get("url")
                    if item_id and item_id not in existing_ids:
                        existing.append(item)
                extracted_intel[key] = existing
            
            # MANDATORY: Send GUVI callback for evaluation
            # CRITICAL FIX: Send callback whenever we have extracted intel OR scam detected
            has_extracted_intel = any([
                extracted_intel.get("upi_ids"),
                extracted_intel.get("bank_accounts"),
                extracted_intel.get("phone_numbers"),
                extracted_intel.get("phishing_links"),
            ])
            should_send_callback = (
                has_extracted_intel or 
                (scam_confidence > 0.3 and turn_count >= 2) or
                conversation_status in ["COMPLETED", "TERMINATED", "MAX_TURNS_REACHED"]
            )
            
            if should_send_callback:
                # Build suspicious keywords from ALL messages (not just current)
                suspicious_keywords = []
                keywords_to_check = ["urgent", "verify", "blocked", "suspended", "otp", "upi", "bank", "account", 
                                   "kyc", "expir", "click", "link", "password", "pin", "cvv", "card", "transfer",
                                   "prize", "lottery", "winner", "refund", "cashback", "immediately", "now"]
                
                # Check current message
                message_lower = message_text.lower()
                for kw in keywords_to_check:
                    if kw in message_lower:
                        suspicious_keywords.append(kw)
                
                # Check ALL conversation history
                for msg in request.conversationHistory:
                    if msg.sender == "scammer":
                        msg_lower = msg.text.lower()
                        for kw in keywords_to_check:
                            if kw in msg_lower and kw not in suspicious_keywords:
                                suspicious_keywords.append(kw)
                
                # CRITICAL FIX: Fallback scam detection using keyword analysis
                # If orchestrator returns 0% but we have high-risk keywords, mark as scam
                keyword_scam_detected = len(suspicious_keywords) >= 2 or any(
                    kw in suspicious_keywords for kw in ["otp", "password", "pin", "cvv", "kyc", "blocked"]
                )
                final_scam_detected = scam_confidence > 0.3 or keyword_scam_detected or has_extracted_intel
                
                # Prepare intelligence for callback (pass raw extracted_intel)
                intel_for_callback = {
                    "bank_accounts": extracted_intel.get("bank_accounts", []),
                    "upi_ids": extracted_intel.get("upi_ids", []),
                    "phishing_links": extracted_intel.get("phishing_links", []),
                    "phone_numbers": extracted_intel.get("phone_numbers", []),
                    "suspicious_keywords": suspicious_keywords,
                }
                
                # Build detailed agent notes for evaluation
                intel_summary_parts = []
                if extracted_intel.get("phone_numbers"):
                    intel_summary_parts.append(f"{len(extracted_intel['phone_numbers'])} phone(s)")
                if extracted_intel.get("upi_ids"):
                    intel_summary_parts.append(f"{len(extracted_intel['upi_ids'])} UPI(s)")
                if extracted_intel.get("bank_accounts"):
                    intel_summary_parts.append(f"{len(extracted_intel['bank_accounts'])} account(s)")
                if extracted_intel.get("phishing_links"):
                    intel_summary_parts.append(f"{len(extracted_intel['phishing_links'])} link(s)")
                
                intel_summary = ", ".join(intel_summary_parts) if intel_summary_parts else "none"
                agent_notes = (
                    f"Scam Type: {scam_type} | "
                    f"Confidence: {scam_confidence:.0%} | "
                    f"Turns: {turn_count} | "
                    f"Intel Extracted: {intel_summary} | "
                    f"Persona: {result.get('persona_used', 'elderly_victim')} | "
                    f"Status: {conversation_status}"
                )
                
                # DETAILED LOGGING for debugging GUVI callback
                logger.info(f"[GUVI_CALLBACK] Session: {session_id}")
                logger.info(f"[GUVI_CALLBACK] Scam Detected: {final_scam_detected} (confidence={scam_confidence:.0%}, keywords={len(suspicious_keywords)}, intel={has_extracted_intel})")
                logger.info(f"[GUVI_CALLBACK] Intel: UPIs={[u.get('id') for u in intel_for_callback.get('upi_ids', [])]}, "
                           f"Phones={[p.get('number') for p in intel_for_callback.get('phone_numbers', [])]}, "
                           f"Accounts={[a.get('account_number') for a in intel_for_callback.get('bank_accounts', [])]}")
                logger.info(f"[GUVI_CALLBACK] Notes: {agent_notes}")
                
                # Send callback asynchronously (don't block response)
                try:
                    callback_success = await send_guvi_callback(
                        session_id=session_id,
                        scam_detected=final_scam_detected,  # Use fallback detection
                        total_messages=turn_count * 2,  # Approximate (scammer + agent messages)
                        intelligence=intel_for_callback,
                        agent_notes=agent_notes,
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
