"""
Middleware - Request/Response processing.

Middleware:
    - Auth: API key authentication
    - RateLimit: Rate limiting per API key
    - Logging: Structured request/response logging
    - Timing: Request timing (X-Response-Time header)
"""

from app.middleware.auth import APIKeyMiddleware

__all__ = ["APIKeyMiddleware"]
