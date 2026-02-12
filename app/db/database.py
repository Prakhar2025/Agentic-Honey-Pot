"""
Database Configuration and Session Management.

This module provides async SQLAlchemy setup for SQLite database,
including engine configuration, session factory, and lifecycle management.

Usage:
    from app.db.database import get_db, init_db
    
    # Initialize database on startup
    await init_db()
    
    # Use in FastAPI dependency
    async def endpoint(db: AsyncSession = Depends(get_db)):
        ...
"""

import logging
from contextlib import asynccontextmanager
from pathlib import Path
from typing import AsyncGenerator

from sqlalchemy import event, text
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.pool import StaticPool

from app.config import get_settings

logger = logging.getLogger(__name__)


class Base(DeclarativeBase):
    """
    SQLAlchemy declarative base class.
    
    All ORM models should inherit from this class.
    """
    pass


def _get_database_url() -> str:
    """
    Get the database URL, converting to async format if needed.
    
    Returns:
        str: Async-compatible database URL.
    """
    settings = get_settings()
    url = settings.database_url
    
    # Convert sqlite:// to sqlite+aiosqlite://
    if url.startswith("sqlite://"):
        url = url.replace("sqlite://", "sqlite+aiosqlite://", 1)
    
    # Convert postgresql:// to postgresql+asyncpg://
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    return url


def _create_engine() -> AsyncEngine:
    """
    Create and configure the async SQLAlchemy engine.
    
    Returns:
        AsyncEngine: Configured async database engine.
    """
    settings = get_settings()
    database_url = _get_database_url()
    
    # SQLite-specific configuration
    if "sqlite" in database_url:
        engine = create_async_engine(
            database_url,
            echo=settings.is_development,
            connect_args={"check_same_thread": False},
            poolclass=StaticPool,
        )
    else:
        # PostgreSQL or other databases
        engine = create_async_engine(
            database_url,
            echo=settings.is_development,
            pool_pre_ping=True,
            pool_size=5,
            max_overflow=10,
        )
    
    return engine


# Create engine instance
engine = _create_engine()

# Create async session factory
async_session_factory = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
    autocommit=False,
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Async generator for database session dependency injection.
    
    Yields:
        AsyncSession: Active database session.
    
    Usage:
        @app.get("/items")
        async def get_items(db: AsyncSession = Depends(get_db)):
            result = await db.execute(select(Item))
            return result.scalars().all()
    """
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


@asynccontextmanager
async def get_db_context() -> AsyncGenerator[AsyncSession, None]:
    """
    Async context manager for database sessions outside of FastAPI.
    
    Yields:
        AsyncSession: Active database session.
    
    Usage:
        async with get_db_context() as db:
            result = await db.execute(select(Model))
    """
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def init_db() -> None:
    """
    Initialize the database by creating all tables.
    
    This function should be called during application startup.
    It creates the data directory if needed and all database tables.
    
    Usage:
        @app.on_event("startup")
        async def startup():
            await init_db()
    """
    settings = get_settings()
    
    # Ensure data directory exists for SQLite
    if "sqlite" in settings.database_url:
        db_path = settings.database_url.replace("sqlite:///", "")
        if db_path.startswith("./"):
            db_path = db_path[2:]
        
        data_dir = Path(db_path).parent
        data_dir.mkdir(parents=True, exist_ok=True)
        logger.info(f"Database directory ensured: {data_dir}")
    
    # Import models to register them with Base
    from app.db import models  # noqa: F401
    
    # Create all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    logger.info("Database tables created successfully")


async def close_db() -> None:
    """
    Close database connections gracefully.
    
    This function should be called during application shutdown.
    
    Usage:
        @app.on_event("shutdown")
        async def shutdown():
            await close_db()
    """
    await engine.dispose()
    logger.info("Database connections closed")


async def health_check() -> bool:
    """
    Check database connectivity.
    
    Returns:
        bool: True if database is accessible, False otherwise.
    """
    try:
        async with async_session_factory() as session:
            await session.execute(text("SELECT 1"))
        return True
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        return False
