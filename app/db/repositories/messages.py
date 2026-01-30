"""
Message Repository.

This module provides data access operations for conversation messages,
including message creation, retrieval, and conversation log building.

Usage:
    repo = MessageRepository(db_session)
    await repo.add_message(session_id, "scammer", "Pay now!", turn=1)
    log = await repo.get_conversation_log(session_id)
"""

from datetime import datetime
from typing import Any, Dict, List, Optional

from sqlalchemy import and_, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import MessageModel, MessageRole
from app.db.repositories.base import BaseRepository


class MessageRepository(BaseRepository[MessageModel]):
    """
    Repository for conversation message operations.
    
    Provides message-specific queries including conversation
    log retrieval and session-scoped operations.
    """
    
    def __init__(self, session: AsyncSession) -> None:
        """
        Initialize message repository.
        
        Args:
            session: Async database session.
        """
        super().__init__(MessageModel, session)
    
    async def add_message(
        self,
        session_id: str,
        role: str,
        content: str,
        turn_number: int,
        metadata: Optional[Dict[str, Any]] = None,
    ) -> MessageModel:
        """
        Add a new message to a session.
        
        Args:
            session_id: Parent session ID.
            role: Message sender (scammer or agent).
            content: Message text content.
            turn_number: Conversation turn number.
            metadata: Additional message metadata.
        
        Returns:
            MessageModel: The created message.
        """
        message_data = {
            "session_id": session_id,
            "role": role,
            "content": content,
            "turn_number": turn_number,
            "metadata_json": metadata,
        }
        return await self.create(message_data)
    
    async def add_scammer_message(
        self,
        session_id: str,
        content: str,
        turn_number: int,
        metadata: Optional[Dict[str, Any]] = None,
    ) -> MessageModel:
        """
        Add a scammer message to a session.
        
        Args:
            session_id: Parent session ID.
            content: Message text content.
            turn_number: Conversation turn number.
            metadata: Additional message metadata.
        
        Returns:
            MessageModel: The created message.
        """
        return await self.add_message(
            session_id=session_id,
            role=MessageRole.SCAMMER,
            content=content,
            turn_number=turn_number,
            metadata=metadata,
        )
    
    async def add_agent_message(
        self,
        session_id: str,
        content: str,
        turn_number: int,
        metadata: Optional[Dict[str, Any]] = None,
    ) -> MessageModel:
        """
        Add an agent (honeypot) response to a session.
        
        Args:
            session_id: Parent session ID.
            content: Response text content.
            turn_number: Conversation turn number.
            metadata: Additional message metadata.
        
        Returns:
            MessageModel: The created message.
        """
        return await self.add_message(
            session_id=session_id,
            role=MessageRole.AGENT,
            content=content,
            turn_number=turn_number,
            metadata=metadata,
        )
    
    async def get_by_session(
        self,
        session_id: str,
        limit: Optional[int] = None,
    ) -> List[MessageModel]:
        """
        Get all messages for a session ordered by turn.
        
        Args:
            session_id: Session ID to retrieve messages for.
            limit: Maximum number of messages.
        
        Returns:
            List[MessageModel]: Ordered list of messages.
        """
        query = (
            select(MessageModel)
            .where(MessageModel.session_id == session_id)
            .order_by(
                MessageModel.turn_number.asc(),
                MessageModel.created_at.asc(),
            )
        )
        
        if limit:
            query = query.limit(limit)
        
        result = await self.session.execute(query)
        return list(result.scalars().all())
    
    async def get_conversation_log(
        self,
        session_id: str,
    ) -> List[Dict[str, Any]]:
        """
        Get formatted conversation log for a session.
        
        Args:
            session_id: Session ID to retrieve log for.
        
        Returns:
            List[Dict[str, Any]]: Formatted conversation log.
        
        Example output:
            [
                {"turn": 1, "role": "scammer", "message": "...", "timestamp": "..."},
                {"turn": 1, "role": "agent", "message": "...", "timestamp": "..."},
            ]
        """
        messages = await self.get_by_session(session_id)
        
        log = []
        for msg in messages:
            log.append({
                "turn": msg.turn_number,
                "role": msg.role,
                "message": msg.content,
                "timestamp": msg.created_at.isoformat() if msg.created_at else None,
            })
        
        return log
    
    async def get_last_message(
        self,
        session_id: str,
        role: Optional[str] = None,
    ) -> Optional[MessageModel]:
        """
        Get the last message in a session.
        
        Args:
            session_id: Session ID to query.
            role: Optional role filter (scammer or agent).
        
        Returns:
            Optional[MessageModel]: Last message or None.
        """
        query = (
            select(MessageModel)
            .where(MessageModel.session_id == session_id)
        )
        
        if role:
            query = query.where(MessageModel.role == role)
        
        query = query.order_by(
            MessageModel.turn_number.desc(),
            MessageModel.created_at.desc(),
        ).limit(1)
        
        result = await self.session.execute(query)
        return result.scalar_one_or_none()
    
    async def get_messages_by_role(
        self,
        session_id: str,
        role: str,
    ) -> List[MessageModel]:
        """
        Get all messages by a specific role in a session.
        
        Args:
            session_id: Session ID to query.
            role: Role to filter by (scammer or agent).
        
        Returns:
            List[MessageModel]: Messages by the specified role.
        """
        query = (
            select(MessageModel)
            .where(
                and_(
                    MessageModel.session_id == session_id,
                    MessageModel.role == role,
                )
            )
            .order_by(MessageModel.turn_number.asc())
        )
        
        result = await self.session.execute(query)
        return list(result.scalars().all())
    
    async def get_scammer_messages(
        self,
        session_id: str,
    ) -> List[MessageModel]:
        """
        Get all scammer messages in a session.
        
        Args:
            session_id: Session ID to query.
        
        Returns:
            List[MessageModel]: Scammer messages.
        """
        return await self.get_messages_by_role(session_id, MessageRole.SCAMMER)
    
    async def get_message_count(
        self,
        session_id: str,
    ) -> int:
        """
        Count messages in a session.
        
        Args:
            session_id: Session ID to count messages for.
        
        Returns:
            int: Number of messages.
        """
        query = (
            select(func.count())
            .select_from(MessageModel)
            .where(MessageModel.session_id == session_id)
        )
        result = await self.session.execute(query)
        return result.scalar() or 0
    
    async def get_context_messages(
        self,
        session_id: str,
        max_messages: int = 10,
    ) -> List[MessageModel]:
        """
        Get recent messages for LLM context window.
        
        Args:
            session_id: Session ID to query.
            max_messages: Maximum messages to return (most recent).
        
        Returns:
            List[MessageModel]: Recent messages for context.
        """
        # Get messages ordered by most recent first
        query = (
            select(MessageModel)
            .where(MessageModel.session_id == session_id)
            .order_by(
                MessageModel.turn_number.desc(),
                MessageModel.created_at.desc(),
            )
            .limit(max_messages)
        )
        
        result = await self.session.execute(query)
        messages = list(result.scalars().all())
        
        # Reverse to get chronological order
        return list(reversed(messages))
    
    async def delete_by_session(
        self,
        session_id: str,
    ) -> int:
        """
        Delete all messages for a session.
        
        Args:
            session_id: Session ID to delete messages for.
        
        Returns:
            int: Number of messages deleted.
        """
        messages = await self.get_by_session(session_id)
        count = len(messages)
        
        for msg in messages:
            await self.session.delete(msg)
        
        await self.session.flush()
        return count
