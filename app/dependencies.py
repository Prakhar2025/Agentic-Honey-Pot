"""
Dependency Injection for FastAPI.

This module provides dependency injection functions for use with
FastAPI's Depends() system. All dependencies are async-compatible.

Usage:
    from app.dependencies import get_db_session, get_orchestrator
    
    @router.get("/")
    async def endpoint(db: AsyncSession = Depends(get_db_session)):
        ...
"""

import logging
from typing import AsyncGenerator, Optional

from sqlalchemy.ext.asyncio import AsyncSession

from app.agent.orchestrator import AgentOrchestrator, get_orchestrator
from app.db.database import get_db_context
from app.db.repositories.intelligence import IntelligenceRepository
from app.db.repositories.messages import MessageRepository
from app.db.repositories.sessions import SessionRepository

logger = logging.getLogger(__name__)


# =============================================================================
# DATABASE SESSION DEPENDENCY
# =============================================================================

async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Provide an async database session.
    
    Yields a database session that is automatically closed after
    the request completes. Uses async context manager for proper cleanup.
    
    Yields:
        AsyncSession: SQLAlchemy async session.
    
    Raises:
        HTTPException: If database connection fails.
    
    Example:
        @router.get("/items")
        async def get_items(db: AsyncSession = Depends(get_db_session)):
            ...
    """
    async with get_db_context() as session:
        try:
            yield session
        except Exception as e:
            logger.error(f"Database session error: {e}")
            await session.rollback()
            raise
        finally:
            await session.close()


# =============================================================================
# REPOSITORY DEPENDENCIES
# =============================================================================

async def get_session_repository(
    db: AsyncSession = None,
) -> AsyncGenerator[SessionRepository, None]:
    """
    Provide SessionRepository with database session.
    
    Args:
        db: Optional existing session (injected by FastAPI).
    
    Yields:
        SessionRepository: Repository for session operations.
    
    Example:
        @router.get("/sessions")
        async def list_sessions(
            repo: SessionRepository = Depends(get_session_repository)
        ):
            return await repo.list_all()
    """
    async with get_db_context() as session:
        try:
            yield SessionRepository(session)
        except Exception as e:
            logger.error(f"SessionRepository error: {e}")
            raise


async def get_message_repository() -> AsyncGenerator[MessageRepository, None]:
    """
    Provide MessageRepository with database session.
    
    Yields:
        MessageRepository: Repository for message operations.
    """
    async with get_db_context() as session:
        try:
            yield MessageRepository(session)
        except Exception as e:
            logger.error(f"MessageRepository error: {e}")
            raise


async def get_intelligence_repository() -> AsyncGenerator[IntelligenceRepository, None]:
    """
    Provide IntelligenceRepository with database session.
    
    Yields:
        IntelligenceRepository: Repository for intelligence operations.
    """
    async with get_db_context() as session:
        try:
            yield IntelligenceRepository(session)
        except Exception as e:
            logger.error(f"IntelligenceRepository error: {e}")
            raise


# =============================================================================
# AGENT ORCHESTRATOR DEPENDENCY
# =============================================================================

def get_agent_orchestrator() -> AgentOrchestrator:
    """
    Provide singleton AgentOrchestrator instance.
    
    Returns:
        AgentOrchestrator: Shared orchestrator instance.
    
    Example:
        @router.post("/engage")
        async def engage(
            orchestrator: AgentOrchestrator = Depends(get_agent_orchestrator)
        ):
            result = await orchestrator.process_message(...)
    """
    try:
        return get_orchestrator()
    except Exception as e:
        logger.error(f"Failed to get orchestrator: {e}")
        raise RuntimeError(f"Orchestrator initialization failed: {e}")


# =============================================================================
# COMBINED DEPENDENCIES
# =============================================================================

class DatabaseRepositories:
    """Container for all database repositories."""
    
    def __init__(
        self,
        session_repo: SessionRepository,
        message_repo: MessageRepository,
        intelligence_repo: IntelligenceRepository,
    ) -> None:
        self.sessions = session_repo
        self.messages = message_repo
        self.intelligence = intelligence_repo


async def get_repositories() -> AsyncGenerator[DatabaseRepositories, None]:
    """
    Provide all database repositories in a single dependency.
    
    Yields:
        DatabaseRepositories: Container with all repositories.
    
    Example:
        @router.get("/data")
        async def get_data(
            repos: DatabaseRepositories = Depends(get_repositories)
        ):
            sessions = await repos.sessions.list_all()
    """
    async with get_db_context() as session:
        try:
            repos = DatabaseRepositories(
                session_repo=SessionRepository(session),
                message_repo=MessageRepository(session),
                intelligence_repo=IntelligenceRepository(session),
            )
            yield repos
        except Exception as e:
            logger.error(f"Repository initialization error: {e}")
            raise
