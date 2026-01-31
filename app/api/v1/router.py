"""
API v1 Router.

This module defines the main v1 API router that includes
all sub-routers for the honeypot API.

Routes:
    /v1/honeypot/* - Honeypot engagement endpoints
    /v1/sessions/* - Session management endpoints
    /v1/analytics/* - Analytics and dashboard endpoints
    /v1/health/* - Health check endpoints
"""

from fastapi import APIRouter

from app.api.v1.analytics import router as analytics_router
from app.api.v1.health import router as health_router
from app.api.v1.honeypot import router as honeypot_router
from app.api.v1.sessions import router as sessions_router

# Create main v1 router
router = APIRouter(prefix="/v1")

# Include all sub-routers
router.include_router(honeypot_router)
router.include_router(sessions_router)
router.include_router(analytics_router)
router.include_router(health_router)

# Export router
__all__ = ["router"]
