"""
Conversation Domain Models.

This module defines Pydantic models for messages and conversation logs.
"""

from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field, field_validator


class MessageRole(str, Enum):
    """Message role enumeration."""
    SCAMMER = "scammer"
    AGENT = "agent"


class MessageCreate(BaseModel):
    """
    Data required to create a new message.
    
    Attributes:
        session_id: Parent session ID.
        role: Message sender role.
        content: Message text content.
        turn_number: Conversation turn number.
        metadata: Additional message metadata.
    """
    
    session_id: str = Field(
        ...,
        description="Parent session ID",
    )
    
    role: MessageRole = Field(
        ...,
        description="Message sender role",
    )
    
    content: str = Field(
        ...,
        min_length=1,
        description="Message text content",
    )
    
    turn_number: int = Field(
        ...,
        ge=0,
        description="Conversation turn number",
    )
    
    metadata: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Additional metadata",
    )
    
    @field_validator("content")
    @classmethod
    def validate_content(cls, v: str) -> str:
        """Ensure content is not empty."""
        if not v.strip():
            raise ValueError("Message content cannot be empty")
        return v.strip()


class Message(BaseModel):
    """
    Full message domain model.
    
    Represents a single message in a honeypot conversation.
    
    Attributes:
        id: Unique message identifier.
        session_id: Parent session ID.
        role: Message sender role.
        content: Message text content.
        turn_number: Conversation turn number.
        created_at: Message creation timestamp.
        metadata: Additional message metadata.
    """
    
    id: str = Field(
        ...,
        description="Unique message identifier",
    )
    
    session_id: str = Field(
        ...,
        description="Parent session ID",
    )
    
    role: MessageRole = Field(
        ...,
        description="Message sender role",
    )
    
    content: str = Field(
        ...,
        description="Message text content",
    )
    
    turn_number: int = Field(
        ...,
        ge=0,
        description="Conversation turn number",
    )
    
    created_at: datetime = Field(
        ...,
        description="Message creation timestamp",
    )
    
    metadata: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Additional metadata",
    )
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": "msg_abc123",
                "session_id": "sess_7f3a9b2c4d5e6f78",
                "role": "scammer",
                "content": "Your account blocked! Send OTP now.",
                "turn_number": 1,
                "created_at": "2026-01-30T15:30:00+05:30",
                "metadata": None
            }
        }


class ConversationEntry(BaseModel):
    """
    Single entry in a conversation log (simplified format).
    
    Attributes:
        turn: Conversation turn number.
        role: Message sender role.
        message: Message content.
        timestamp: Message timestamp (ISO format).
    """
    
    turn: int = Field(
        ...,
        ge=0,
        description="Conversation turn number",
    )
    
    role: str = Field(
        ...,
        description="Message sender (scammer or agent)",
    )
    
    message: str = Field(
        ...,
        description="Message content",
    )
    
    timestamp: Optional[str] = Field(
        default=None,
        description="Message timestamp (ISO format)",
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "turn": 1,
                "role": "scammer",
                "message": "Your SBI account blocked! Update KYC now.",
                "timestamp": "2026-01-30T15:30:00+05:30"
            }
        }


class ConversationLog(BaseModel):
    """
    Complete conversation log for a session.
    
    Attributes:
        session_id: Session identifier.
        entries: List of conversation entries.
        total_turns: Total number of turns.
        started_at: Conversation start timestamp.
        ended_at: Conversation end timestamp.
    """
    
    session_id: str = Field(
        ...,
        description="Session identifier",
    )
    
    entries: List[ConversationEntry] = Field(
        default_factory=list,
        description="List of conversation entries",
    )
    
    total_turns: int = Field(
        default=0,
        ge=0,
        description="Total number of turns",
    )
    
    started_at: Optional[datetime] = Field(
        default=None,
        description="Conversation start timestamp",
    )
    
    ended_at: Optional[datetime] = Field(
        default=None,
        description="Conversation end timestamp",
    )
    
    def add_entry(
        self,
        role: str,
        message: str,
        turn: Optional[int] = None,
    ) -> "ConversationLog":
        """
        Add a new entry to the conversation log.
        
        Args:
            role: Message sender role.
            message: Message content.
            turn: Turn number (auto-increments if not provided).
        
        Returns:
            ConversationLog: Self for chaining.
        """
        if turn is None:
            turn = self.total_turns + 1 if not self.entries else self.entries[-1].turn + 1
        
        self.entries.append(
            ConversationEntry(
                turn=turn,
                role=role,
                message=message,
                timestamp=datetime.utcnow().isoformat(),
            )
        )
        self.total_turns = max(self.total_turns, turn)
        return self
    
    def get_context_messages(
        self,
        max_messages: int = 10,
    ) -> List[ConversationEntry]:
        """
        Get recent messages for LLM context.
        
        Args:
            max_messages: Maximum messages to return.
        
        Returns:
            List[ConversationEntry]: Recent messages.
        """
        return self.entries[-max_messages:]
    
    def to_llm_format(self) -> List[Dict[str, str]]:
        """
        Convert to LLM message format.
        
        Returns:
            List[Dict[str, str]]: Messages in LLM format.
        """
        llm_messages = []
        for entry in self.entries:
            # Map roles to LLM format
            if entry.role == "scammer":
                llm_role = "user"
            else:
                llm_role = "assistant"
            
            llm_messages.append({
                "role": llm_role,
                "content": entry.message,
            })
        
        return llm_messages
    
    class Config:
        json_schema_extra = {
            "example": {
                "session_id": "sess_7f3a9b2c4d5e6f78",
                "entries": [
                    {"turn": 1, "role": "scammer", "message": "Your account blocked!", "timestamp": "2026-01-30T15:30:00+05:30"},
                    {"turn": 1, "role": "agent", "message": "Oh my! Please help me.", "timestamp": "2026-01-30T15:30:02+05:30"}
                ],
                "total_turns": 1,
                "started_at": "2026-01-30T15:30:00+05:30",
                "ended_at": None
            }
        }


class ContextWindow(BaseModel):
    """
    Context window for LLM API calls.
    
    Manages the messages sent to the LLM while respecting token limits.
    
    Attributes:
        system_prompt: System prompt for the LLM.
        messages: Conversation messages.
        max_tokens: Maximum tokens for context.
    """
    
    system_prompt: str = Field(
        ...,
        description="System prompt for the LLM",
    )
    
    messages: List[Dict[str, str]] = Field(
        default_factory=list,
        description="Conversation messages in LLM format",
    )
    
    max_tokens: int = Field(
        default=4096,
        description="Maximum tokens for context",
    )
    
    def add_message(
        self,
        role: str,
        content: str,
    ) -> "ContextWindow":
        """
        Add a message to the context.
        
        Args:
            role: Message role (user/assistant/system).
            content: Message content.
        
        Returns:
            ContextWindow: Self for chaining.
        """
        self.messages.append({"role": role, "content": content})
        return self
    
    def to_api_format(self) -> List[Dict[str, str]]:
        """
        Convert to API request format.
        
        Returns:
            List[Dict[str, str]]: Messages in API format.
        """
        return [
            {"role": "system", "content": self.system_prompt},
            *self.messages,
        ]
