"""
API Key Authentication Middleware.

This module provides secure API key authentication for the ScamShield API.
Validates X-API-Key header against configured keys and returns proper
401 Unauthorized responses for invalid/missing keys.

Enterprise Features:
    - Multiple API key support (production, staging, testing)
    - Rate limiting integration ready
    - Correlation ID tracking
    - Comprehensive logging

Usage:
    # In main.py
    from app.middleware.auth import APIKeyMiddleware
    app.add_middleware(APIKeyMiddleware)
"""

import logging
import os
import time
import uuid
from typing import Callable, List, Optional, Set

from fastapi import Request, Response
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp

logger = logging.getLogger(__name__)


# Paths that don't require authentication
PUBLIC_PATHS: Set[str] = {
    "/",
    "/docs",
    "/redoc",
    "/openapi.json",
    "/v1/health",
    "/v1/health/ready",
    "/v1/health/live",
}

# Path prefixes that don't require authentication
PUBLIC_PREFIXES: List[str] = [
    "/docs",
    "/static",
]


class APIKeyMiddleware(BaseHTTPMiddleware):
    """
    Enterprise-grade API key authentication middleware.
    
    Features:
        - Validates X-API-Key header
        - Returns 401 for invalid/missing keys
        - Skips auth for public paths (health, docs)
        - Adds correlation ID for request tracking
        - Logs authentication attempts
    
    Configuration:
        Set API_KEY environment variable or pass keys to constructor.
    
    Example:
        app.add_middleware(
            APIKeyMiddleware,
            api_keys=["key1", "key2"],  # Optional, defaults to env var
        )
    """
    
    def __init__(
        self,
        app: ASGIApp,
        api_keys: Optional[List[str]] = None,
    ) -> None:
        """
        Initialize middleware.
        
        Args:
            app: ASGI application.
            api_keys: List of valid API keys. If None, reads from settings.
        """
        super().__init__(app)
        
        # Load API keys from settings (Pydantic) or constructor
        if api_keys:
            self.api_keys = set(api_keys)
        else:
            # Import here to avoid circular imports
            from app.config import get_settings
            settings = get_settings()
            self.api_keys = {settings.api_key} if settings.api_key else set()
        
        # Log configuration (without exposing keys)
        key_count = len(self.api_keys)
        logger.info(f"APIKeyMiddleware initialized with {key_count} API key(s)")
        
        if key_count == 0:
            logger.warning(
                "No API keys configured! Set API_KEY environment variable. "
                "All authenticated endpoints will return 401."
            )
    
    async def dispatch(
        self,
        request: Request,
        call_next: Callable,
    ) -> Response:
        """
        Process request and validate API key.
        
        Args:
            request: Incoming HTTP request.
            call_next: Next middleware/endpoint handler.
        
        Returns:
            Response: API response or 401 error.
        """
        # Generate correlation ID for request tracking
        correlation_id = request.headers.get(
            "X-Correlation-ID",
            str(uuid.uuid4())[:8],
        )
        
        # Add correlation ID to request state for logging
        request.state.correlation_id = correlation_id
        
        path = request.url.path
        method = request.method
        
        # Skip authentication for public paths
        if self._is_public_path(path):
            response = await call_next(request)
            response.headers["X-Correlation-ID"] = correlation_id
            return response
        
        # Extract API key from header
        api_key = request.headers.get("X-API-Key", "")
        
        # Validate API key
        if not api_key:
            logger.warning(
                f"Missing API key: {method} {path} "
                f"[correlation_id={correlation_id}]"
            )
            return self._unauthorized_response(
                message="Missing API key. Provide X-API-Key header.",
                correlation_id=correlation_id,
            )
        
        if api_key not in self.api_keys:
            # Log failed attempt (mask key for security)
            masked_key = f"{api_key[:4]}...{api_key[-4:]}" if len(api_key) > 8 else "****"
            logger.warning(
                f"Invalid API key: {method} {path} "
                f"[key={masked_key}, correlation_id={correlation_id}]"
            )
            return self._unauthorized_response(
                message="Invalid API key.",
                correlation_id=correlation_id,
            )
        
        # Key is valid - proceed with request
        logger.debug(
            f"Authenticated: {method} {path} "
            f"[correlation_id={correlation_id}]"
        )
        
        response = await call_next(request)
        response.headers["X-Correlation-ID"] = correlation_id
        return response
    
    def _is_public_path(self, path: str) -> bool:
        """
        Check if path is public (no auth required).
        
        Args:
            path: Request path.
        
        Returns:
            bool: True if public, False if auth required.
        """
        # Exact match
        if path in PUBLIC_PATHS:
            return True
        
        # Prefix match
        for prefix in PUBLIC_PREFIXES:
            if path.startswith(prefix):
                return True
        
        return False
    
    def _unauthorized_response(
        self,
        message: str,
        correlation_id: str,
    ) -> JSONResponse:
        """
        Generate standardized 401 response.
        
        Args:
            message: Error message.
            correlation_id: Request correlation ID.
        
        Returns:
            JSONResponse: 401 Unauthorized response.
        """
        return JSONResponse(
            status_code=401,
            content={
                "error": "unauthorized",
                "message": message,
                "correlation_id": correlation_id,
            },
            headers={
                "X-Correlation-ID": correlation_id,
                "WWW-Authenticate": "ApiKey",
            },
        )
