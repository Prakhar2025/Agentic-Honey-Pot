"""
Error Models.

This module defines Pydantic models for error responses and exceptions.
"""

from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class ErrorCode(str, Enum):
    """Standard error codes for the API."""
    
    # Client errors (400-499)
    BAD_REQUEST = "BAD_REQUEST"
    VALIDATION_ERROR = "VALIDATION_ERROR"
    UNAUTHORIZED = "UNAUTHORIZED"
    FORBIDDEN = "FORBIDDEN"
    NOT_FOUND = "NOT_FOUND"
    METHOD_NOT_ALLOWED = "METHOD_NOT_ALLOWED"
    CONFLICT = "CONFLICT"
    RATE_LIMITED = "RATE_LIMITED"
    PAYLOAD_TOO_LARGE = "PAYLOAD_TOO_LARGE"
    
    # Server errors (500-599)
    INTERNAL_ERROR = "INTERNAL_ERROR"
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE"
    GATEWAY_TIMEOUT = "GATEWAY_TIMEOUT"
    
    # Business logic errors
    SESSION_NOT_FOUND = "SESSION_NOT_FOUND"
    SESSION_EXPIRED = "SESSION_EXPIRED"
    SESSION_ALREADY_ENDED = "SESSION_ALREADY_ENDED"
    MAX_TURNS_EXCEEDED = "MAX_TURNS_EXCEEDED"
    PERSONA_NOT_FOUND = "PERSONA_NOT_FOUND"
    LLM_ERROR = "LLM_ERROR"
    EXTRACTION_ERROR = "EXTRACTION_ERROR"


class ValidationErrorDetail(BaseModel):
    """
    Detail about a single validation error.
    
    Attributes:
        field: Field that failed validation.
        message: Validation error message.
        type: Type of validation error.
        value: Invalid value (if safe to include).
    """
    
    field: str = Field(
        ...,
        description="Field that failed validation",
        examples=["scammer_message"],
    )
    
    message: str = Field(
        ...,
        description="Validation error message",
        examples=["Field cannot be empty"],
    )
    
    type: str = Field(
        default="value_error",
        description="Type of validation error",
        examples=["value_error", "type_error", "missing"],
    )
    
    value: Optional[Any] = Field(
        default=None,
        description="Invalid value (if safe to include)",
    )


class ErrorResponse(BaseModel):
    """
    Standard error response format.
    
    All API errors return this consistent structure for easy
    client-side error handling.
    
    Attributes:
        error: Error code identifier.
        message: Human-readable error message.
        details: Additional error details.
        request_id: Request ID for debugging.
        timestamp: Error occurrence timestamp.
        path: Request path that caused the error.
    """
    
    error: ErrorCode = Field(
        ...,
        description="Error code identifier",
    )
    
    message: str = Field(
        ...,
        description="Human-readable error message",
        examples=["Session not found"],
    )
    
    details: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Additional error details",
    )
    
    request_id: Optional[str] = Field(
        default=None,
        description="Request ID for debugging",
    )
    
    timestamp: datetime = Field(
        default_factory=datetime.utcnow,
        description="Error occurrence timestamp",
    )
    
    path: Optional[str] = Field(
        default=None,
        description="Request path that caused the error",
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "error": "SESSION_NOT_FOUND",
                "message": "Session with ID 'sess_invalid' not found",
                "details": {"session_id": "sess_invalid"},
                "request_id": "req_abc123",
                "timestamp": "2026-01-30T15:30:00+05:30",
                "path": "/api/v1/honeypot/continue"
            }
        }


class ValidationErrorResponse(BaseModel):
    """
    Validation error response with field details.
    
    Returned when request validation fails (HTTP 422).
    
    Attributes:
        error: Always VALIDATION_ERROR.
        message: Overall validation error message.
        errors: List of individual field errors.
        request_id: Request ID for debugging.
    """
    
    error: ErrorCode = Field(
        default=ErrorCode.VALIDATION_ERROR,
        description="Error code (always VALIDATION_ERROR)",
    )
    
    message: str = Field(
        default="Request validation failed",
        description="Overall validation error message",
    )
    
    errors: List[ValidationErrorDetail] = Field(
        default_factory=list,
        description="List of individual field errors",
    )
    
    request_id: Optional[str] = Field(
        default=None,
        description="Request ID for debugging",
    )
    
    timestamp: datetime = Field(
        default_factory=datetime.utcnow,
        description="Error occurrence timestamp",
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "error": "VALIDATION_ERROR",
                "message": "Request validation failed",
                "errors": [
                    {
                        "field": "scammer_message",
                        "message": "Field cannot be empty",
                        "type": "value_error",
                        "value": ""
                    },
                    {
                        "field": "persona",
                        "message": "Invalid persona type",
                        "type": "value_error",
                        "value": "invalid_persona"
                    }
                ],
                "request_id": "req_abc123",
                "timestamp": "2026-01-30T15:30:00+05:30"
            }
        }


class RateLimitErrorResponse(BaseModel):
    """
    Rate limit error response.
    
    Returned when request rate limit is exceeded (HTTP 429).
    
    Attributes:
        error: Always RATE_LIMITED.
        message: Rate limit error message.
        retry_after: Seconds until rate limit resets.
        limit: Maximum requests per window.
        remaining: Remaining requests in window.
    """
    
    error: ErrorCode = Field(
        default=ErrorCode.RATE_LIMITED,
        description="Error code (always RATE_LIMITED)",
    )
    
    message: str = Field(
        default="Rate limit exceeded",
        description="Rate limit error message",
    )
    
    retry_after: int = Field(
        ...,
        ge=0,
        description="Seconds until rate limit resets",
    )
    
    limit: int = Field(
        ...,
        description="Maximum requests per window",
    )
    
    remaining: int = Field(
        default=0,
        description="Remaining requests in window",
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "error": "RATE_LIMITED",
                "message": "Rate limit exceeded. Please try again later.",
                "retry_after": 60,
                "limit": 60,
                "remaining": 0
            }
        }


class ServiceUnavailableResponse(BaseModel):
    """
    Service unavailable response.
    
    Returned when a dependent service is down (HTTP 503).
    
    Attributes:
        error: Always SERVICE_UNAVAILABLE.
        message: Service unavailable message.
        service: Name of unavailable service.
        retry_after: Suggested retry delay.
    """
    
    error: ErrorCode = Field(
        default=ErrorCode.SERVICE_UNAVAILABLE,
        description="Error code",
    )
    
    message: str = Field(
        default="Service temporarily unavailable",
        description="Service unavailable message",
    )
    
    service: Optional[str] = Field(
        default=None,
        description="Name of unavailable service",
        examples=["groq_llm", "database", "mock_scammer_api"],
    )
    
    retry_after: Optional[int] = Field(
        default=None,
        ge=0,
        description="Suggested retry delay in seconds",
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "error": "SERVICE_UNAVAILABLE",
                "message": "LLM service temporarily unavailable",
                "service": "groq_llm",
                "retry_after": 30
            }
        }
