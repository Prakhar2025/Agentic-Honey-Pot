"""
Health Check Endpoints.

This module provides health check endpoints for monitoring
the application status and readiness.

Endpoints:
    GET /health - Basic health check
    GET /health/ready - Readiness check (DB + LLM)
"""

import logging
from datetime import datetime, timezone
from typing import Any, Dict

from fastapi import APIRouter, HTTPException, status

from app.config import get_settings
from app.db.database import health_check as db_health_check
from app.services.groq_client import get_llm_client

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/health", tags=["Health"])


@router.get(
    "",
    summary="Basic Health Check",
    description="Simple health check to verify the API is running.",
    response_description="Health status with timestamp",
)
async def health_check() -> Dict[str, Any]:
    """
    Basic health check endpoint.
    
    Returns minimal status information to confirm the API is running.
    This endpoint is designed to be fast and lightweight.
    
    Returns:
        Dict containing:
        - status: "healthy"
        - timestamp: Current UTC time in ISO format
        - version: API version
    
    Example Response:
        {
            "status": "healthy",
            "timestamp": "2024-01-15T10:30:00Z",
            "version": "1.0.0"
        }
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "version": "1.0.0",
    }


@router.get(
    "/ready",
    summary="Readiness Check",
    description="Comprehensive readiness check including database and LLM connectivity.",
    response_description="Detailed component status",
)
async def readiness_check() -> Dict[str, Any]:
    """
    Comprehensive readiness check.
    
    Checks connectivity to all critical components:
    - Database (SQLite/PostgreSQL)
    - LLM Service (Groq API)
    
    Returns:
        Dict containing status of each component and overall readiness.
    
    Raises:
        HTTPException: 503 if any critical component is unhealthy.
    
    Example Response:
        {
            "status": "ready",
            "timestamp": "2024-01-15T10:30:00Z",
            "components": {
                "database": {"status": "connected", "latency_ms": 5},
                "llm": {"status": "ready", "model": "llama-3.3-70b-versatile"}
            },
            "environment": "development"
        }
    """
    settings = get_settings()
    components: Dict[str, Dict[str, Any]] = {}
    all_healthy = True
    
    # Check database
    try:
        db_ok = await db_health_check()
        components["database"] = {
            "status": "connected" if db_ok else "disconnected",
        }
        if not db_ok:
            all_healthy = False
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        components["database"] = {
            "status": "error",
            "error": str(e),
        }
        all_healthy = False
    
    # Check LLM service
    try:
        llm_client = get_llm_client()
        components["llm"] = {
            "status": "ready",
            "model": llm_client.model,
        }
    except Exception as e:
        logger.error(f"LLM health check failed: {e}")
        components["llm"] = {
            "status": "error",
            "error": str(e),
        }
        all_healthy = False
    
    result = {
        "status": "ready" if all_healthy else "degraded",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "components": components,
        "environment": settings.environment,
    }
    
    if not all_healthy:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=result,
        )
    
    return result


@router.get(
    "/live",
    summary="Liveness Check",
    description="Simple liveness probe for Kubernetes/container orchestration.",
)
async def liveness_check() -> Dict[str, str]:
    """
    Liveness probe endpoint.
    
    Ultra-lightweight endpoint for container orchestration liveness probes.
    Simply confirms the process is running.
    
    Returns:
        Dict with status "alive".
    """
    return {"status": "alive"}
