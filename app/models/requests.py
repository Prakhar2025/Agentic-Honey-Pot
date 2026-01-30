"""
Pydantic Request Models.

This module defines request schemas for all API endpoints,
including validation rules and OpenAPI documentation examples.
"""

from enum import Enum
from typing import Any, Dict, Optional

from pydantic import BaseModel, Field, field_validator


class SourceType(str, Enum):
    """Message source channel types."""
    SMS = "sms"
    WHATSAPP = "whatsapp"
    EMAIL = "email"
    VOICE_TRANSCRIPT = "voice_transcript"
    SOCIAL_MEDIA = "social_media"
    OTHER = "other"


class PersonaType(str, Enum):
    """Available victim persona types."""
    ELDERLY_VICTIM = "elderly_victim"
    TECH_NOVICE = "tech_novice"
    EAGER_INVESTOR = "eager_investor"
    BUSY_PROFESSIONAL = "busy_professional"
    HELPFUL_AUNTIE = "helpful_auntie"
    AUTO = "auto"


class MessageMetadata(BaseModel):
    """
    Optional metadata for incoming messages.
    
    Attributes:
        sender: Sender identifier (phone number, email, etc.).
        region: Geographic region of the sender.
        timestamp: Original message timestamp.
    """
    
    sender: Optional[str] = Field(
        default=None,
        description="Sender identifier (phone number, email, etc.)",
        examples=["+91-9876543210", "unknown@spam.com"],
    )
    
    region: Optional[str] = Field(
        default=None,
        description="Geographic region of the sender",
        examples=["Maharashtra", "Delhi", "Karnataka"],
    )
    
    timestamp: Optional[str] = Field(
        default=None,
        description="Original message timestamp (ISO 8601)",
        examples=["2026-01-30T15:30:00+05:30"],
    )
    
    class Config:
        extra = "allow"


class EngageRequest(BaseModel):
    """
    Request to start a new honeypot engagement session.
    
    Attributes:
        scammer_message: The scam message to analyze and engage with.
        source_type: Channel the message was received on.
        persona: Victim persona to use for engagement.
        metadata: Optional message metadata.
    
    Example:
        {
            "scammer_message": "Your SBI account blocked! Update KYC now.",
            "source_type": "sms",
            "persona": "elderly_victim",
            "metadata": {"sender": "+91-9876543210"}
        }
    """
    
    scammer_message: str = Field(
        ...,
        min_length=1,
        max_length=10000,
        description="The scam message to analyze and engage with",
        examples=[
            "Dear Customer, Your SBI account will be blocked! Update KYC immediately by sharing your details.",
            "Congratulations! You won Rs. 50,00,000 in Amazon Lucky Draw!",
        ],
    )
    
    source_type: SourceType = Field(
        default=SourceType.SMS,
        description="Channel the message was received on",
    )
    
    persona: PersonaType = Field(
        default=PersonaType.AUTO,
        description="Victim persona to use (auto = system selects)",
    )
    
    metadata: Optional[MessageMetadata] = Field(
        default=None,
        description="Optional message metadata",
    )
    
    @field_validator("scammer_message")
    @classmethod
    def validate_message_not_empty(cls, v: str) -> str:
        """Ensure message is not just whitespace."""
        if not v.strip():
            raise ValueError("Message cannot be empty or whitespace only")
        return v.strip()
    
    class Config:
        json_schema_extra = {
            "example": {
                "scammer_message": "Dear Customer, Your SBI account will be blocked! Update KYC immediately: http://sbi-kyc-update.xyz",
                "source_type": "sms",
                "persona": "elderly_victim",
                "metadata": {
                    "sender": "+91-9876543210",
                    "region": "Maharashtra"
                }
            }
        }


class ContinueRequest(BaseModel):
    """
    Request to continue an existing honeypot conversation.
    
    Attributes:
        session_id: ID of the existing session.
        scammer_message: The scammer's follow-up message.
    
    Example:
        {
            "session_id": "sess_7f3a9b2c4d5e6f78",
            "scammer_message": "Send your account number to 9876543210"
        }
    """
    
    session_id: str = Field(
        ...,
        min_length=1,
        max_length=64,
        description="ID of the existing session to continue",
        examples=["sess_7f3a9b2c4d5e6f78"],
    )
    
    scammer_message: str = Field(
        ...,
        min_length=1,
        max_length=10000,
        description="The scammer's follow-up message",
        examples=[
            "Send your account number and OTP to 9876543210 immediately!",
            "Pay ₹500 to scammer@ybl to unlock your account",
        ],
    )
    
    @field_validator("scammer_message")
    @classmethod
    def validate_message_not_empty(cls, v: str) -> str:
        """Ensure message is not just whitespace."""
        if not v.strip():
            raise ValueError("Message cannot be empty or whitespace only")
        return v.strip()
    
    @field_validator("session_id")
    @classmethod
    def validate_session_id_format(cls, v: str) -> str:
        """Validate session ID format."""
        if not v.startswith("sess_"):
            raise ValueError("Session ID must start with 'sess_'")
        return v
    
    class Config:
        json_schema_extra = {
            "example": {
                "session_id": "sess_7f3a9b2c4d5e6f78",
                "scammer_message": "Send your account number and OTP to 9876543210 or pay ₹500 to scammer@ybl"
            }
        }


class TerminateRequest(BaseModel):
    """
    Request to manually terminate a session.
    
    Attributes:
        session_id: ID of the session to terminate.
        reason: Optional reason for termination.
    """
    
    session_id: str = Field(
        ...,
        description="ID of the session to terminate",
    )
    
    reason: Optional[str] = Field(
        default="manual_termination",
        max_length=256,
        description="Reason for termination",
    )
    
    @field_validator("session_id")
    @classmethod
    def validate_session_id_format(cls, v: str) -> str:
        """Validate session ID format."""
        if not v.startswith("sess_"):
            raise ValueError("Session ID must start with 'sess_'")
        return v


class WebhookRequest(BaseModel):
    """
    Request from Mock Scammer API webhook.
    
    Attributes:
        conversation_id: Mock API conversation identifier.
        message: Scammer message content.
        scammer_profile: Optional scammer profile ID.
    """
    
    conversation_id: str = Field(
        ...,
        description="Mock Scammer API conversation ID",
    )
    
    message: str = Field(
        ...,
        min_length=1,
        description="Scammer message content",
    )
    
    scammer_profile: Optional[str] = Field(
        default=None,
        description="Scammer profile identifier",
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "conversation_id": "mock_conv_123",
                "message": "Pay ₹1000 to unlock your account",
                "scammer_profile": "kyc_scammer_01"
            }
        }
