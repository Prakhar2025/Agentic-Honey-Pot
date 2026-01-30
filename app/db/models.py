"""
SQLAlchemy ORM Models for ScamShield Honeypot.

This module defines the database schema for:
- Sessions: Honeypot engagement sessions
- Messages: Conversation messages within sessions
- Intelligence: Extracted scammer intelligence

All models use UUID primary keys and include proper indexes
for query optimization.
"""

import uuid
from datetime import datetime
from typing import List, Optional

from sqlalchemy import (
    Boolean,
    DateTime,
    Enum,
    ForeignKey,
    Index,
    Integer,
    String,
    Text,
    func,
)
from sqlalchemy.dialects.sqlite import JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


# ===========================================
# Enums
# ===========================================

class SessionStatus:
    """Session status constants."""
    ONGOING = "ONGOING"
    INTELLIGENCE_EXTRACTED = "INTELLIGENCE_EXTRACTED"
    COMPLETED = "COMPLETED"
    DISENGAGED = "DISENGAGED"
    MAX_TURNS_REACHED = "MAX_TURNS_REACHED"
    THREAT_DETECTED = "THREAT_DETECTED"
    TERMINATED = "TERMINATED"


class MessageRole:
    """Message role constants."""
    SCAMMER = "scammer"
    AGENT = "agent"


class ScamType:
    """Scam type constants."""
    KYC_PHISHING = "KYC_PHISHING"
    LOTTERY_PRIZE = "LOTTERY_PRIZE"
    INVESTMENT_FRAUD = "INVESTMENT_FRAUD"
    IMPERSONATION = "IMPERSONATION"
    LOAN_SCAM = "LOAN_SCAM"
    JOB_SCAM = "JOB_SCAM"
    OTP_THEFT = "OTP_THEFT"
    TECH_SUPPORT = "TECH_SUPPORT"
    UNKNOWN = "UNKNOWN"


class RiskLevel:
    """Risk level constants."""
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


# ===========================================
# Helper Functions
# ===========================================

def generate_uuid() -> str:
    """Generate a UUID string for primary keys."""
    return str(uuid.uuid4())


def generate_session_id() -> str:
    """Generate a session ID with prefix."""
    return f"sess_{uuid.uuid4().hex[:16]}"


# ===========================================
# ORM Models
# ===========================================

class SessionModel(Base):
    """
    Honeypot engagement session model.
    
    Stores metadata about each scammer engagement session including
    status, scam type, persona used, and timing information.
    
    Attributes:
        id: Unique session identifier (prefixed UUID).
        status: Current session status (ONGOING, COMPLETED, etc.).
        scam_type: Detected scam category.
        risk_level: Assessed risk level of the scam.
        persona_id: ID of the victim persona used.
        source_type: Source channel (sms, whatsapp, email, etc.).
        turn_count: Number of conversation turns.
        is_scam: Whether the initial message was classified as scam.
        started_at: Session start timestamp.
        ended_at: Session end timestamp (null if ongoing).
        metadata: Additional session metadata as JSON.
    """
    
    __tablename__ = "sessions"
    
    # Primary key
    id: Mapped[str] = mapped_column(
        String(32),
        primary_key=True,
        default=generate_session_id,
    )
    
    # Session state
    status: Mapped[str] = mapped_column(
        String(32),
        nullable=False,
        default=SessionStatus.ONGOING,
        index=True,
    )
    
    # Scam classification
    scam_type: Mapped[Optional[str]] = mapped_column(
        String(32),
        nullable=True,
        index=True,
    )
    
    risk_level: Mapped[Optional[str]] = mapped_column(
        String(16),
        nullable=True,
    )
    
    is_scam: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )
    
    # Persona information
    persona_id: Mapped[str] = mapped_column(
        String(32),
        nullable=False,
        default="elderly_victim",
    )
    
    # Source metadata
    source_type: Mapped[Optional[str]] = mapped_column(
        String(32),
        nullable=True,
    )
    
    # Conversation tracking
    turn_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )
    
    # Timestamps
    started_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    
    ended_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    
    # Additional metadata (JSON)
    metadata_json: Mapped[Optional[dict]] = mapped_column(
        JSON,
        nullable=True,
    )
    
    # Relationships
    messages: Mapped[List["MessageModel"]] = relationship(
        "MessageModel",
        back_populates="session",
        cascade="all, delete-orphan",
        order_by="MessageModel.turn_number, MessageModel.created_at",
    )
    
    intelligence: Mapped[Optional["IntelligenceModel"]] = relationship(
        "IntelligenceModel",
        back_populates="session",
        uselist=False,
        cascade="all, delete-orphan",
    )
    
    # Indexes
    __table_args__ = (
        Index("ix_sessions_status_started", "status", "started_at"),
        Index("ix_sessions_scam_type_status", "scam_type", "status"),
    )
    
    def __repr__(self) -> str:
        return f"<Session(id={self.id}, status={self.status}, turns={self.turn_count})>"


class MessageModel(Base):
    """
    Conversation message model.
    
    Stores individual messages exchanged during a honeypot session,
    including both scammer messages and agent responses.
    
    Attributes:
        id: Unique message identifier (UUID).
        session_id: Parent session ID.
        role: Message sender role (scammer or agent).
        content: Message text content.
        turn_number: Conversation turn number.
        created_at: Message creation timestamp.
        metadata: Additional message metadata as JSON.
    """
    
    __tablename__ = "messages"
    
    # Primary key
    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=generate_uuid,
    )
    
    # Foreign key to session
    session_id: Mapped[str] = mapped_column(
        String(32),
        ForeignKey("sessions.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    
    # Message content
    role: Mapped[str] = mapped_column(
        String(16),
        nullable=False,
        index=True,
    )
    
    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )
    
    # Conversation position
    turn_number: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )
    
    # Timestamp
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        index=True,
    )
    
    # Additional metadata (JSON)
    metadata_json: Mapped[Optional[dict]] = mapped_column(
        JSON,
        nullable=True,
    )
    
    # Relationship
    session: Mapped["SessionModel"] = relationship(
        "SessionModel",
        back_populates="messages",
    )
    
    # Indexes
    __table_args__ = (
        Index("ix_messages_session_turn", "session_id", "turn_number"),
    )
    
    def __repr__(self) -> str:
        return f"<Message(id={self.id[:8]}..., role={self.role}, turn={self.turn_number})>"


class IntelligenceModel(Base):
    """
    Extracted intelligence model.
    
    Stores actionable intelligence extracted from scammer messages
    including bank accounts, UPI IDs, phone numbers, and phishing links.
    
    Attributes:
        id: Unique intelligence record identifier (UUID).
        session_id: Parent session ID.
        bank_accounts: List of extracted bank account details (JSON).
        upi_ids: List of extracted UPI IDs (JSON).
        phone_numbers: List of extracted phone numbers (JSON).
        phishing_links: List of extracted phishing URLs (JSON).
        other_intel: Other extracted intelligence (JSON).
        total_entities: Total count of extracted entities.
        extracted_at: Extraction timestamp.
        last_updated_at: Last update timestamp.
    """
    
    __tablename__ = "intelligence"
    
    # Primary key
    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=generate_uuid,
    )
    
    # Foreign key to session
    session_id: Mapped[str] = mapped_column(
        String(32),
        ForeignKey("sessions.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
        index=True,
    )
    
    # Extracted entities (JSON arrays)
    bank_accounts: Mapped[Optional[list]] = mapped_column(
        JSON,
        nullable=True,
        default=list,
    )
    
    upi_ids: Mapped[Optional[list]] = mapped_column(
        JSON,
        nullable=True,
        default=list,
    )
    
    phone_numbers: Mapped[Optional[list]] = mapped_column(
        JSON,
        nullable=True,
        default=list,
    )
    
    phishing_links: Mapped[Optional[list]] = mapped_column(
        JSON,
        nullable=True,
        default=list,
    )
    
    other_intel: Mapped[Optional[list]] = mapped_column(
        JSON,
        nullable=True,
        default=list,
    )
    
    # Summary
    total_entities: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )
    
    # Timestamps
    extracted_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    
    last_updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )
    
    # Relationship
    session: Mapped["SessionModel"] = relationship(
        "SessionModel",
        back_populates="intelligence",
    )
    
    def __repr__(self) -> str:
        return f"<Intelligence(id={self.id[:8]}..., entities={self.total_entities})>"
    
    def update_total_entities(self) -> None:
        """Recalculate total entities count."""
        total = 0
        if self.bank_accounts:
            total += len(self.bank_accounts)
        if self.upi_ids:
            total += len(self.upi_ids)
        if self.phone_numbers:
            total += len(self.phone_numbers)
        if self.phishing_links:
            total += len(self.phishing_links)
        if self.other_intel:
            total += len(self.other_intel)
        self.total_entities = total
