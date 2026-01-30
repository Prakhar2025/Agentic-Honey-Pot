"""
Pydantic Models - Request/Response Schemas.

This package provides all Pydantic models for the API:
- Requests: API request schemas with validation
- Responses: API response schemas
- Session: Session domain models
- Conversation: Message and dialogue models
- Intelligence: Extracted intelligence models
- Errors: Error response models

Usage:
    from app.models.requests import EngageRequest, ContinueRequest
    from app.models.responses import EngageResponse, ContinueResponse
    from app.models.intelligence import ExtractedIntelligence
"""

from app.models.conversation import (
    ContextWindow,
    ConversationEntry,
    ConversationLog,
    Message,
    MessageCreate,
    MessageRole,
)
from app.models.errors import (
    ErrorCode,
    ErrorResponse,
    RateLimitErrorResponse,
    ServiceUnavailableResponse,
    ValidationErrorDetail,
    ValidationErrorResponse,
)
from app.models.intelligence import (
    BankAccount,
    ExtractedIntelligence,
    OtherIntel,
    PhishingLink,
    PhoneNumber,
    UPIId,
)
from app.models.requests import (
    ContinueRequest,
    EngageRequest,
    MessageMetadata,
    PersonaType,
    SourceType,
    TerminateRequest,
    WebhookRequest,
)
from app.models.responses import (
    AnalyticsSummaryResponse,
    ContinueResponse,
    ConversationMessage,
    ConversationStatus,
    EngageResponse,
    HealthResponse,
    RiskLevel,
    ScamType,
    SessionDetailResponse,
    SessionSummary,
    TerminateResponse,
    WebhookResponse,
)
from app.models.session import (
    RiskLevelEnum,
    ScamTypeEnum,
    Session,
    SessionCreate,
    SessionList,
    SessionStatus,
    SessionUpdate,
)

__all__ = [
    # Requests
    "EngageRequest",
    "ContinueRequest",
    "TerminateRequest",
    "WebhookRequest",
    "MessageMetadata",
    "SourceType",
    "PersonaType",
    # Responses
    "EngageResponse",
    "ContinueResponse",
    "SessionDetailResponse",
    "TerminateResponse",
    "WebhookResponse",
    "HealthResponse",
    "AnalyticsSummaryResponse",
    "ConversationMessage",
    "SessionSummary",
    "ConversationStatus",
    "RiskLevel",
    "ScamType",
    # Session
    "Session",
    "SessionCreate",
    "SessionUpdate",
    "SessionList",
    "SessionStatus",
    "ScamTypeEnum",
    "RiskLevelEnum",
    # Conversation
    "Message",
    "MessageCreate",
    "MessageRole",
    "ConversationEntry",
    "ConversationLog",
    "ContextWindow",
    # Intelligence
    "ExtractedIntelligence",
    "BankAccount",
    "UPIId",
    "PhoneNumber",
    "PhishingLink",
    "OtherIntel",
    # Errors
    "ErrorCode",
    "ErrorResponse",
    "ValidationErrorDetail",
    "ValidationErrorResponse",
    "RateLimitErrorResponse",
    "ServiceUnavailableResponse",
]
