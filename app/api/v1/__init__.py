"""
API v1 Package.

This package contains all v1 API endpoints:
- Honeypot: Scammer engagement endpoints
- Sessions: Session management endpoints
- Analytics: Dashboard and statistics
- Health: Health check endpoints
"""

from app.api.v1.router import router

__all__ = ["router"]
