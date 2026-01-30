"""
Session Domain Models.

This module defines Pydantic models for session data and metadata.
"""

from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field, field_validator


class SessionStatus(str, Enum):
    """Session status enumeration."""
    ONGOING = "ONGOING"
    INTELLIGENCE_EXTRACTED = "INTELLIGENCE_EXTRACTED"
    COMPLETED = "COMPLETED"
    DISENGAGED = "DISENGAGED"
    MAX_TURNS_REACHED = "MAX_TURNS_REACHED"
    THREAT_DETECTED = "THREAT_DETECTED"
    TERMINATED = "TERMINATED"


class ScamTypeEnum(str, Enum):
    """Scam type enumeration."""
    KYC_PHISHING = "KYC_PHISHING"
    LOTTERY_PRIZE = "LOTTERY_PRIZE"
    INVESTMENT_FRAUD = "INVESTMENT_FRAUD"
    IMPERSONATION = "IMPERSONATION"
    LOAN_SCAM = "LOAN_SCAM"
    JOB_SCAM = "JOB_SCAM"
    OTP_THEFT = "OTP_THEFT"
    TECH_SUPPORT = "TECH_SUPPORT"
    UNKNOWN = "UNKNOWN"


class RiskLevelEnum(str, Enum):
    """Risk level enumeration."""
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class SessionCreate(BaseModel):
    """
    Data required to create a new session.
    
    Attributes:
        scam_type: Detected scam type.
        persona_id: Persona to use for engagement.
        source_type: Message source channel.
        is_scam: Whether classified as scam.
        metadata: Additional session metadata.
    """
    
    scam_type: Optional[str] = Field(
        default=None,
        description="Detected scam type",
    )
    
    persona_id: str = Field(
        default="elderly_victim",
        description="Persona for engagement",
    )
    
    source_type: Optional[str] = Field(
        default=None,
        description="Message source channel",
    )
    
    is_scam: bool = Field(
        default=True,
        description="Whether classified as scam",
    )
    
    risk_level: Optional[str] = Field(
        default=None,
        description="Risk level assessment",
    )
    
    metadata: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Additional metadata",
    )


class SessionUpdate(BaseModel):
    """
    Data for updating a session.
    
    Attributes:
        status: New session status.
        turn_count: Updated turn count.
        scam_type: Updated scam type.
        risk_level: Updated risk level.
    """
    
    status: Optional[SessionStatus] = Field(
        default=None,
        description="New session status",
    )
    
    turn_count: Optional[int] = Field(
        default=None,
        ge=0,
        description="Updated turn count",
    )
    
    scam_type: Optional[str] = Field(
        default=None,
        description="Updated scam type",
    )
    
    risk_level: Optional[str] = Field(
        default=None,
        description="Updated risk level",
    )
    
    ended_at: Optional[datetime] = Field(
        default=None,
        description="Session end timestamp",
    )


class Session(BaseModel):
    """
    Full session domain model.
    
    Represents a complete honeypot engagement session with
    all metadata and state information.
    
    Attributes:
        id: Unique session identifier.
        status: Current session status.
        scam_type: Detected scam type.
        risk_level: Risk level assessment.
        persona_id: Persona used for engagement.
        source_type: Message source channel.
        turn_count: Number of conversation turns.
        is_scam: Whether classified as scam.
        started_at: Session start timestamp.
        ended_at: Session end timestamp.
        metadata: Additional session metadata.
    """
    
    id: str = Field(
        ...,
        description="Unique session identifier",
        examples=["sess_7f3a9b2c4d5e6f78"],
    )
    
    status: SessionStatus = Field(
        default=SessionStatus.ONGOING,
        description="Current session status",
    )
    
    scam_type: Optional[str] = Field(
        default=None,
        description="Detected scam type",
    )
    
    risk_level: Optional[str] = Field(
        default=None,
        description="Risk level assessment",
    )
    
    persona_id: str = Field(
        ...,
        description="Persona used for engagement",
    )
    
    source_type: Optional[str] = Field(
        default=None,
        description="Message source channel",
    )
    
    turn_count: int = Field(
        default=0,
        ge=0,
        description="Number of conversation turns",
    )
    
    is_scam: bool = Field(
        default=True,
        description="Whether classified as scam",
    )
    
    started_at: datetime = Field(
        ...,
        description="Session start timestamp",
    )
    
    ended_at: Optional[datetime] = Field(
        default=None,
        description="Session end timestamp",
    )
    
    metadata: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Additional session metadata",
    )
    
    @property
    def is_active(self) -> bool:
        """Check if session is still active."""
        return self.status == SessionStatus.ONGOING
    
    @property
    def is_completed(self) -> bool:
        """Check if session is completed."""
        return self.status in [
            SessionStatus.COMPLETED,
            SessionStatus.INTELLIGENCE_EXTRACTED,
            SessionStatus.MAX_TURNS_REACHED,
            SessionStatus.DISENGAGED,
            SessionStatus.TERMINATED,
        ]
    
    @property
    def duration_seconds(self) -> Optional[int]:
        """Calculate session duration in seconds."""
        if self.ended_at is None:
            return None
        delta = self.ended_at - self.started_at
        return int(delta.total_seconds())
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": "sess_7f3a9b2c4d5e6f78",
                "status": "ONGOING",
                "scam_type": "KYC_PHISHING",
                "risk_level": "HIGH",
                "persona_id": "elderly_victim",
                "source_type": "sms",
                "turn_count": 2,
                "is_scam": True,
                "started_at": "2026-01-30T15:30:00+05:30",
                "ended_at": None,
                "metadata": {"sender": "+91-9876543210"}
            }
        }


class SessionList(BaseModel):
    """
    List of sessions with pagination metadata.
    
    Attributes:
        sessions: List of session objects.
        total: Total number of sessions.
        limit: Page size.
        offset: Page offset.
    """
    
    sessions: List[Session] = Field(
        default_factory=list,
        description="List of sessions",
    )
    
    total: int = Field(
        default=0,
        description="Total number of sessions",
    )
    
    limit: int = Field(
        default=100,
        description="Page size",
    )
    
    offset: int = Field(
        default=0,
        description="Page offset",
    )
    
    @property
    def has_more(self) -> bool:
        """Check if there are more pages."""
        return (self.offset + len(self.sessions)) < self.total
