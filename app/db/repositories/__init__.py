"""
Database Repositories - Data Access Layer.

This package provides repository classes for database operations:
- BaseRepository: Generic CRUD operations
- SessionRepository: Session lifecycle management
- MessageRepository: Conversation message operations
- IntelligenceRepository: Extracted intelligence operations

Usage:
    from app.db.repositories import SessionRepository, MessageRepository, IntelligenceRepository
    
    async def example(db: AsyncSession):
        session_repo = SessionRepository(db)
        session = await session_repo.create_session(scam_type="KYC_PHISHING")
"""

from app.db.repositories.base import BaseRepository
from app.db.repositories.intelligence import IntelligenceRepository
from app.db.repositories.messages import MessageRepository
from app.db.repositories.sessions import SessionRepository

__all__ = [
    "BaseRepository",
    "SessionRepository",
    "MessageRepository",
    "IntelligenceRepository",
]
