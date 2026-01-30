"""
Database Layer - SQLAlchemy ORM and repositories.

This package provides the complete database layer including:
- Async SQLAlchemy engine and session management
- ORM models for sessions, messages, and intelligence
- Repository classes for data access operations

Usage:
    from app.db.database import get_db, init_db, close_db
    from app.db.models import SessionModel, MessageModel, IntelligenceModel
    from app.db.repositories import SessionRepository, MessageRepository, IntelligenceRepository
"""

from app.db.database import (
    Base,
    async_session_factory,
    close_db,
    engine,
    get_db,
    get_db_context,
    health_check,
    init_db,
)
from app.db.models import (
    IntelligenceModel,
    MessageModel,
    MessageRole,
    RiskLevel,
    ScamType,
    SessionModel,
    SessionStatus,
)

__all__ = [
    # Database core
    "Base",
    "engine",
    "async_session_factory",
    "get_db",
    "get_db_context",
    "init_db",
    "close_db",
    "health_check",
    # Models
    "SessionModel",
    "MessageModel",
    "IntelligenceModel",
    # Constants
    "SessionStatus",
    "MessageRole",
    "ScamType",
    "RiskLevel",
]
