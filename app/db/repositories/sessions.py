"""
Session Repository.

This module provides data access operations for honeypot sessions,
including session lifecycle management and status-based queries.

Usage:
    repo = SessionRepository(db_session)
    session = await repo.create_session(scam_type, persona_id)
    active = await repo.get_active_sessions()
"""

from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional

from sqlalchemy import and_, func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.db.models import (
    IntelligenceModel,
    MessageModel,
    SessionModel,
    SessionStatus,
)
from app.db.repositories.base import BaseRepository


class SessionRepository(BaseRepository[SessionModel]):
    """
    Repository for honeypot session operations.
    
    Provides session-specific queries and lifecycle management
    beyond basic CRUD operations.
    """
    
    def __init__(self, session: AsyncSession) -> None:
        """
        Initialize session repository.
        
        Args:
            session: Async database session.
        """
        super().__init__(SessionModel, session)
    
    async def create_session(
        self,
        scam_type: Optional[str] = None,
        persona_id: str = "elderly_victim",
        source_type: Optional[str] = None,
        is_scam: bool = True,
        metadata: Optional[Dict[str, Any]] = None,
    ) -> SessionModel:
        """
        Create a new honeypot session.
        
        Args:
            scam_type: Detected scam type.
            persona_id: Victim persona to use.
            source_type: Message source (sms, whatsapp, etc.).
            is_scam: Whether message is classified as scam.
            metadata: Additional session metadata.
        
        Returns:
            SessionModel: The created session.
        """
        session_data = {
            "scam_type": scam_type,
            "persona_id": persona_id,
            "source_type": source_type,
            "is_scam": is_scam,
            "status": SessionStatus.ONGOING,
            "turn_count": 0,
            "metadata_json": metadata,
        }
        return await self.create(session_data)
    
    async def get_with_relations(
        self,
        session_id: str,
    ) -> Optional[SessionModel]:
        """
        Get session with messages and intelligence loaded.
        
        Args:
            session_id: Session ID to retrieve.
        
        Returns:
            Optional[SessionModel]: Session with relations or None.
        """
        query = (
            select(SessionModel)
            .options(
                selectinload(SessionModel.messages),
                selectinload(SessionModel.intelligence),
            )
            .where(SessionModel.id == session_id)
        )
        result = await self.session.execute(query)
        return result.scalar_one_or_none()
    
    async def get_active_sessions(
        self,
        limit: int = 100,
    ) -> List[SessionModel]:
        """
        Get all active (ONGOING) sessions.
        
        Args:
            limit: Maximum number of sessions to return.
        
        Returns:
            List[SessionModel]: List of active sessions.
        """
        return await self.get_many_by_field(
            "status",
            SessionStatus.ONGOING,
            limit=limit,
        )
    
    async def get_by_status(
        self,
        status: str,
        limit: int = 100,
        offset: int = 0,
    ) -> List[SessionModel]:
        """
        Get sessions by status.
        
        Args:
            status: Session status to filter by.
            limit: Maximum number of sessions.
            offset: Number of sessions to skip.
        
        Returns:
            List[SessionModel]: List of matching sessions.
        """
        query = (
            select(SessionModel)
            .where(SessionModel.status == status)
            .order_by(SessionModel.started_at.desc())
            .offset(offset)
            .limit(limit)
        )
        result = await self.session.execute(query)
        return list(result.scalars().all())
    
    async def get_by_scam_type(
        self,
        scam_type: str,
        limit: int = 100,
    ) -> List[SessionModel]:
        """
        Get sessions by scam type.
        
        Args:
            scam_type: Scam type to filter by.
            limit: Maximum number of sessions.
        
        Returns:
            List[SessionModel]: List of matching sessions.
        """
        return await self.get_many_by_field(
            "scam_type",
            scam_type,
            limit=limit,
        )
    
    async def update_status(
        self,
        session_id: str,
        status: str,
        end_session: bool = False,
    ) -> Optional[SessionModel]:
        """
        Update session status.
        
        Args:
            session_id: Session ID to update.
            status: New status value.
            end_session: Whether to set ended_at timestamp.
        
        Returns:
            Optional[SessionModel]: Updated session or None.
        """
        update_data = {"status": status}
        if end_session:
            update_data["ended_at"] = datetime.utcnow()
        
        return await self.update(session_id, update_data)
    
    async def increment_turn_count(
        self,
        session_id: str,
    ) -> Optional[SessionModel]:
        """
        Increment the turn count for a session.
        
        Args:
            session_id: Session ID to update.
        
        Returns:
            Optional[SessionModel]: Updated session or None.
        """
        db_session = await self.get(session_id)
        if db_session is None:
            return None
        
        db_session.turn_count += 1
        await self.session.flush()
        await self.session.refresh(db_session)
        return db_session
    
    async def end_session(
        self,
        session_id: str,
        status: str = SessionStatus.COMPLETED,
    ) -> Optional[SessionModel]:
        """
        End a session with final status.
        
        Args:
            session_id: Session ID to end.
            status: Final status (default: COMPLETED).
        
        Returns:
            Optional[SessionModel]: Ended session or None.
        """
        return await self.update_status(
            session_id,
            status,
            end_session=True,
        )
    
    async def get_expired_sessions(
        self,
        timeout_seconds: int = 1800,
    ) -> List[SessionModel]:
        """
        Get sessions that have exceeded the timeout.
        
        Args:
            timeout_seconds: Session timeout in seconds.
        
        Returns:
            List[SessionModel]: List of expired sessions.
        """
        cutoff_time = datetime.utcnow() - timedelta(seconds=timeout_seconds)
        
        query = (
            select(SessionModel)
            .where(
                and_(
                    SessionModel.status == SessionStatus.ONGOING,
                    SessionModel.started_at < cutoff_time,
                )
            )
        )
        result = await self.session.execute(query)
        return list(result.scalars().all())
    
    async def get_session_stats(self) -> Dict[str, Any]:
        """
        Get aggregate session statistics.
        
        Returns:
            Dict[str, Any]: Statistics including counts by status and scam type.
        """
        # Total count
        total_query = select(func.count()).select_from(SessionModel)
        total_result = await self.session.execute(total_query)
        total_count = total_result.scalar() or 0
        
        # Count by status
        status_query = (
            select(SessionModel.status, func.count())
            .group_by(SessionModel.status)
        )
        status_result = await self.session.execute(status_query)
        status_counts = {row[0]: row[1] for row in status_result.fetchall()}
        
        # Count by scam type
        type_query = (
            select(SessionModel.scam_type, func.count())
            .where(SessionModel.scam_type.isnot(None))
            .group_by(SessionModel.scam_type)
        )
        type_result = await self.session.execute(type_query)
        type_counts = {row[0]: row[1] for row in type_result.fetchall()}
        
        # Average turn count
        avg_turns_query = select(func.avg(SessionModel.turn_count))
        avg_turns_result = await self.session.execute(avg_turns_query)
        avg_turns = avg_turns_result.scalar() or 0
        
        return {
            "total_sessions": total_count,
            "by_status": status_counts,
            "by_scam_type": type_counts,
            "average_turns": round(float(avg_turns), 2),
        }
