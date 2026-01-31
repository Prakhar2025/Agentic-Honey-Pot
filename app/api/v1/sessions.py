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
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, HTTPException, Query, status
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


class SessionResponse(BaseModel):
    """Response model for full session details."""
    
    id: str = Field(..., description="Session ID")
    source_type: Optional[str] = Field(None, description="Source type")
    persona_used: str = Field(..., description="Persona used")
    scam_type: Optional[str] = Field(None, description="Detected scam type")
    status: str = Field(..., description="Session status")
    turn_count: int = Field(..., description="Total turns")
    started_at: str = Field(..., description="Creation timestamp")
    ended_at: Optional[str] = Field(None, description="End timestamp")
    messages: List[MessageResponse] = Field(default_factory=list)
    intelligence: Optional[IntelligenceResponse] = None


class SessionSummary(BaseModel):
    """Summary model for session list."""
    
    id: str
    source_type: Optional[str]
    persona_used: str
    scam_type: Optional[str]
    status: str
    turn_count: int
    started_at: str


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
    """
    logger.info(f"List sessions: limit={limit}, offset={offset}")
    
    async with get_db_context() as db:
        session_repo = SessionRepository(db)
        
        # Get sessions based on filters
        if status_filter:
            sessions = await session_repo.get_by_status(
                status=status_filter,
                limit=limit,
                offset=offset,
            )
        elif scam_type:
            sessions = await session_repo.get_by_scam_type(
                scam_type=scam_type,
                limit=limit,
            )
        else:
            sessions = await session_repo.list(
                limit=limit,
                offset=offset,
                order_by="started_at",
                order_desc=True,
            )
        
        # Get total count
        total = await session_repo.count()
        
        # Convert to summaries
        summaries = []
        for session in sessions:
            summaries.append(SessionSummary(
                id=session.id,
                source_type=session.source_type,
                persona_used=session.persona_id or "unknown",
                scam_type=session.scam_type,
                status=session.status or "UNKNOWN",
                turn_count=session.turn_count or 0,
                started_at=session.started_at.isoformat() if session.started_at else "",
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
    """
    logger.info(f"Get session: session_id={session_id}")
    
    async with get_db_context() as db:
        session_repo = SessionRepository(db)
        message_repo = MessageRepository(db)
        
        # Get session with relations
        session = await session_repo.get_with_relations(session_id)
        if not session:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Session not found: {session_id}",
            )
        
        # Get messages
        messages = await message_repo.get_by_session(session_id)
        message_list = [
            MessageResponse(
                id=msg.id,
                role=msg.role,
                content=msg.content,
                turn_number=msg.turn_number or 1,
                created_at=msg.created_at.isoformat() if msg.created_at else "",
            )
            for msg in messages
        ]
        
        # Build intelligence response if exists
        intel_response = None
        if session.intelligence:
            intel = session.intelligence
            intel_response = IntelligenceResponse(
                session_id=session_id,
                phone_numbers=intel.phone_numbers or [],
                upi_ids=intel.upi_ids or [],
                bank_accounts=intel.bank_accounts or [],
                ifsc_codes=[],
                phishing_links=intel.phishing_links or [],
                emails=[],
                other_intel=intel.other_intel or [],
                total_entities=intel.total_entities or 0,
            )
        
        return SessionResponse(
            id=session.id,
            source_type=session.source_type,
            persona_used=session.persona_id or "unknown",
            scam_type=session.scam_type,
            status=session.status or "UNKNOWN",
            turn_count=session.turn_count or 0,
            started_at=session.started_at.isoformat() if session.started_at else "",
            ended_at=session.ended_at.isoformat() if session.ended_at else None,
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
    """
    logger.info(f"Get intelligence: session_id={session_id}")
    
    async with get_db_context() as db:
        session_repo = SessionRepository(db)
        
        session = await session_repo.get_with_relations(session_id)
        if not session:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Session not found: {session_id}",
            )
        
        intel = session.intelligence
        if not intel:
            return IntelligenceResponse(
                session_id=session_id,
                phone_numbers=[],
                upi_ids=[],
                bank_accounts=[],
                ifsc_codes=[],
                phishing_links=[],
                emails=[],
                other_intel=[],
                total_entities=0,
            )
        
        return IntelligenceResponse(
            session_id=session_id,
            phone_numbers=intel.phone_numbers or [],
            upi_ids=intel.upi_ids or [],
            bank_accounts=intel.bank_accounts or [],
            ifsc_codes=[],
            phishing_links=intel.phishing_links or [],
            emails=[],
            other_intel=intel.other_intel or [],
            total_entities=intel.total_entities or 0,
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
    """
    logger.info(f"Get messages: session_id={session_id}")
    
    async with get_db_context() as db:
        session_repo = SessionRepository(db)
        message_repo = MessageRepository(db)
        
        # Verify session exists
        session = await session_repo.get(session_id)
        if not session:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Session not found: {session_id}",
            )
        
        messages = await message_repo.get_by_session(session_id)
        
        return [
            MessageResponse(
                id=msg.id,
                role=msg.role,
                content=msg.content,
                turn_number=msg.turn_number or 1,
                created_at=msg.created_at.isoformat() if msg.created_at else "",
            )
            for msg in messages
        ]
