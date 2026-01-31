"""
API Package.

This package contains all API components including
versioned routers and endpoint modules.
"""

from app.api.v1.router import router as v1_router

__all__ = ["v1_router"]
