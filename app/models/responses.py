"""
Pydantic Response Models.

This module defines response schemas for all API endpoints,
including success responses, error responses, and complex nested types.
"""

from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field

from app.models.intelligence import ExtractedIntelligence


class ConversationStatus(str, Enum):
    """Session conversation status."""
    ONGOING = "ONGOING"
    INTELLIGENCE_EXTRACTED = "INTELLIGENCE_EXTRACTED"
    COMPLETED = "COMPLETED"
    DISENGAGED = "DISENGAGED"
    MAX_TURNS_REACHED = "MAX_TURNS_REACHED"
    THREAT_DETECTED = "THREAT_DETECTED"
    TERMINATED = "TERMINATED"


class RiskLevel(str, Enum):
    """Scam risk level assessment."""
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class ScamType(str, Enum):
    """Detected scam type classification."""
    KYC_PHISHING = "KYC_PHISHING"
    LOTTERY_PRIZE = "LOTTERY_PRIZE"
    INVESTMENT_FRAUD = "INVESTMENT_FRAUD"
    IMPERSONATION = "IMPERSONATION"
    LOAN_SCAM = "LOAN_SCAM"
    JOB_SCAM = "JOB_SCAM"
    OTP_THEFT = "OTP_THEFT"
    TECH_SUPPORT = "TECH_SUPPORT"
    UNKNOWN = "UNKNOWN"


class EngageResponse(BaseModel):
    """
    Response for starting a new honeypot engagement.
    
    Attributes:
        session_id: Unique session identifier for continuation.
        is_scam: Whether the message was classified as a scam.
        scam_type: Category of scam detected.
        agent_response: Generated victim persona response.
        conversation_status: Current session status.
        turn_count: Number of conversation turns.
        persona_used: Persona selected for engagement.
    """
    
    session_id: str = Field(
        ...,
        description="Unique session identifier for continuation",
        examples=["sess_7f3a9b2c4d5e6f78"],
    )
    
    is_scam: bool = Field(
        ...,
        description="Whether the message was classified as a scam",
    )
    
    scam_type: Optional[ScamType] = Field(
        default=None,
        description="Category of scam detected",
    )
    
    risk_level: Optional[RiskLevel] = Field(
        default=None,
        description="Assessed risk level",
    )
    
    agent_response: str = Field(
        ...,
        description="Generated victim persona response",
        examples=[
            "Oh my! Please help me, I am not good with technology. What details do you need?",
        ],
    )
    
    conversation_status: ConversationStatus = Field(
        default=ConversationStatus.ONGOING,
        description="Current session status",
    )
    
    turn_count: int = Field(
        default=1,
        ge=0,
        description="Number of conversation turns",
    )
    
    persona_used: str = Field(
        ...,
        description="Persona selected for engagement",
        examples=["elderly_victim", "tech_novice"],
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "session_id": "sess_7f3a9b2c4d5e6f78",
                "is_scam": True,
                "scam_type": "KYC_PHISHING",
                "risk_level": "HIGH",
                "agent_response": "Oh my! Please help me, I am not good with technology. My grandson usually helps but he is not here. What details do you need?",
                "conversation_status": "ONGOING",
                "turn_count": 1,
                "persona_used": "elderly_victim"
            }
        }


class ContinueResponse(BaseModel):
    """
    Response for continuing an existing conversation.
    
    Attributes:
        session_id: Session identifier.
        agent_response: Generated victim persona response.
        conversation_status: Updated session status.
        turn_count: Updated turn count.
        extracted_intelligence: Newly extracted intelligence (if any).
        should_continue: Whether conversation should continue.
    """
    
    session_id: str = Field(
        ...,
        description="Session identifier",
    )
    
    agent_response: str = Field(
        ...,
        description="Generated victim persona response",
    )
    
    conversation_status: ConversationStatus = Field(
        ...,
        description="Updated session status",
    )
    
    turn_count: int = Field(
        ...,
        ge=0,
        description="Updated turn count",
    )
    
    extracted_intelligence: Optional[ExtractedIntelligence] = Field(
        default=None,
        description="Newly extracted intelligence (if any)",
    )
    
    should_continue: bool = Field(
        default=True,
        description="Whether conversation should continue",
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "session_id": "sess_7f3a9b2c4d5e6f78",
                "agent_response": "Okay beta, please wait I am writing down... 9876543210 and scammer@ybl, yes?",
                "conversation_status": "INTELLIGENCE_EXTRACTED",
                "turn_count": 2,
                "extracted_intelligence": {
                    "bank_accounts": [],
                    "upi_ids": [{"id": "scammer@ybl", "confidence": 0.98}],
                    "phone_numbers": [{"number": "+91-9876543210", "confidence": 0.99}],
                    "phishing_links": []
                },
                "should_continue": True
            }
        }


class ConversationMessage(BaseModel):
    """Single message in conversation log."""
    
    turn: int = Field(..., description="Conversation turn number")
    role: str = Field(..., description="Message sender (scammer or agent)")
    message: str = Field(..., description="Message content")
    timestamp: Optional[str] = Field(None, description="Message timestamp")


class SessionSummary(BaseModel):
    """Summary statistics for a session."""
    
    total_entities_extracted: int = Field(
        default=0,
        description="Total number of entities extracted",
    )
    
    highest_confidence_intel: Optional[str] = Field(
        default=None,
        description="Type of highest confidence extraction",
    )
    
    recommended_action: Optional[str] = Field(
        default=None,
        description="Recommended next action",
    )


class SessionDetailResponse(BaseModel):
    """
    Complete session details with conversation log and intelligence.
    
    Full response for GET /v1/honeypot/session/{id}.
    """
    
    session_id: str = Field(..., description="Unique session identifier")
    
    status: ConversationStatus = Field(
        ...,
        description="Current session status",
    )
    
    scam_type: Optional[ScamType] = Field(
        default=None,
        description="Detected scam type",
    )
    
    risk_level: Optional[RiskLevel] = Field(
        default=None,
        description="Risk level assessment",
    )
    
    persona_used: str = Field(
        ...,
        description="Victim persona used",
    )
    
    started_at: datetime = Field(
        ...,
        description="Session start timestamp",
    )
    
    ended_at: Optional[datetime] = Field(
        default=None,
        description="Session end timestamp",
    )
    
    session_duration_seconds: Optional[int] = Field(
        default=None,
        description="Total session duration in seconds",
    )
    
    total_turns: int = Field(
        ...,
        ge=0,
        description="Total conversation turns",
    )
    
    conversation_log: List[ConversationMessage] = Field(
        default_factory=list,
        description="Full conversation log",
    )
    
    extracted_intelligence: Optional[ExtractedIntelligence] = Field(
        default=None,
        description="All extracted intelligence",
    )
    
    summary: Optional[SessionSummary] = Field(
        default=None,
        description="Session summary statistics",
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "session_id": "sess_7f3a9b2c4d5e6f78",
                "status": "COMPLETED",
                "scam_type": "KYC_PHISHING",
                "risk_level": "CRITICAL",
                "persona_used": "elderly_victim",
                "started_at": "2026-01-30T15:30:00+05:30",
                "ended_at": "2026-01-30T15:35:00+05:30",
                "session_duration_seconds": 300,
                "total_turns": 4,
                "conversation_log": [
                    {"turn": 1, "role": "scammer", "message": "Your account blocked...", "timestamp": "2026-01-30T15:30:00+05:30"},
                    {"turn": 1, "role": "agent", "message": "Oh my! Please help...", "timestamp": "2026-01-30T15:30:02+05:30"}
                ],
                "extracted_intelligence": {
                    "bank_accounts": [],
                    "upi_ids": [{"id": "scammer@ybl", "confidence": 0.98}],
                    "phone_numbers": [{"number": "+91-9876543210", "confidence": 0.99}],
                    "phishing_links": []
                },
                "summary": {
                    "total_entities_extracted": 2,
                    "highest_confidence_intel": "phone_number",
                    "recommended_action": "Report to cybercrime.gov.in"
                }
            }
        }


class TerminateResponse(BaseModel):
    """Response for session termination."""
    
    session_id: str = Field(..., description="Terminated session ID")
    status: str = Field(..., description="Final status")
    reason: str = Field(..., description="Termination reason")
    final_intel_count: int = Field(default=0, description="Total extracted intelligence")


class WebhookResponse(BaseModel):
    """Response to Mock Scammer API webhook."""
    
    reply: str = Field(..., description="Agent response to scammer")
    session_id: str = Field(..., description="Internal session ID")
    continue_conversation: bool = Field(
        default=True,
        alias="continue",
        description="Whether to continue conversation",
    )


class HealthResponse(BaseModel):
    """Health check endpoint response."""
    
    status: str = Field(..., description="Service status")
    version: str = Field(..., description="API version")
    timestamp: datetime = Field(..., description="Current timestamp")
    components: Dict[str, str] = Field(
        default_factory=dict,
        description="Component health statuses",
    )
    active_sessions: Optional[int] = Field(
        default=None,
        description="Number of active sessions",
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "status": "healthy",
                "version": "1.0.0",
                "timestamp": "2026-01-30T15:40:00+05:30",
                "components": {
                    "database": "healthy",
                    "llm_service": "healthy",
                    "agent_loop": "healthy"
                },
                "active_sessions": 3
            }
        }


class AnalyticsSummaryResponse(BaseModel):
    """Analytics summary response."""
    
    total_sessions: int = Field(default=0, description="Total sessions")
    active_sessions: int = Field(default=0, description="Active sessions")
    completed_sessions: int = Field(default=0, description="Completed sessions")
    total_entities_extracted: int = Field(default=0, description="Total intelligence")
    
    sessions_by_status: Dict[str, int] = Field(
        default_factory=dict,
        description="Sessions grouped by status",
    )
    
    sessions_by_scam_type: Dict[str, int] = Field(
        default_factory=dict,
        description="Sessions grouped by scam type",
    )
    
    average_turns_per_session: float = Field(
        default=0.0,
        description="Average conversation turns",
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "total_sessions": 150,
                "active_sessions": 5,
                "completed_sessions": 120,
                "total_entities_extracted": 342,
                "sessions_by_status": {
                    "ONGOING": 5,
                    "COMPLETED": 120,
                    "MAX_TURNS_REACHED": 25
                },
                "sessions_by_scam_type": {
                    "KYC_PHISHING": 80,
                    "LOTTERY_PRIZE": 35,
                    "INVESTMENT_FRAUD": 35
                },
                "average_turns_per_session": 4.5
            }
        }
