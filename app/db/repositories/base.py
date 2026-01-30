"""
Base Repository Class.

This module provides a generic async repository base class with
common CRUD operations that can be inherited by specific repositories.

Usage:
    class UserRepository(BaseRepository[UserModel]):
        pass
    
    repo = UserRepository(db_session)
    user = await repo.get(user_id)
"""

from typing import Any, Dict, Generic, List, Optional, Type, TypeVar

from sqlalchemy import func, select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import Base

# Type variable for generic model
ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    """
    Generic async repository with CRUD operations.
    
    Provides common database operations that can be reused across
    all entity repositories. Uses SQLAlchemy async session.
    
    Attributes:
        model: SQLAlchemy model class.
        session: Async database session.
    
    Type Parameters:
        ModelType: The SQLAlchemy model type this repository manages.
    """
    
    def __init__(self, model: Type[ModelType], session: AsyncSession) -> None:
        """
        Initialize repository with model and session.
        
        Args:
            model: SQLAlchemy model class to manage.
            session: Async database session.
        """
        self.model = model
        self.session = session
    
    async def create(self, obj_data: Dict[str, Any]) -> ModelType:
        """
        Create a new record in the database.
        
        Args:
            obj_data: Dictionary of field values for the new record.
        
        Returns:
            ModelType: The created model instance.
        
        Example:
            user = await repo.create({"name": "John", "email": "john@example.com"})
        """
        db_obj = self.model(**obj_data)
        self.session.add(db_obj)
        await self.session.flush()
        await self.session.refresh(db_obj)
        return db_obj
    
    async def get(self, id: Any) -> Optional[ModelType]:
        """
        Get a single record by primary key.
        
        Args:
            id: Primary key value.
        
        Returns:
            Optional[ModelType]: The found record or None.
        
        Example:
            user = await repo.get("user_123")
        """
        result = await self.session.get(self.model, id)
        return result
    
    async def get_by_field(
        self,
        field_name: str,
        value: Any,
    ) -> Optional[ModelType]:
        """
        Get a single record by a specific field value.
        
        Args:
            field_name: Name of the field to filter by.
            value: Value to match.
        
        Returns:
            Optional[ModelType]: The found record or None.
        
        Example:
            user = await repo.get_by_field("email", "john@example.com")
        """
        field = getattr(self.model, field_name)
        query = select(self.model).where(field == value)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()
    
    async def get_many_by_field(
        self,
        field_name: str,
        value: Any,
        limit: Optional[int] = None,
        offset: int = 0,
    ) -> List[ModelType]:
        """
        Get multiple records by a specific field value.
        
        Args:
            field_name: Name of the field to filter by.
            value: Value to match.
            limit: Maximum number of records to return.
            offset: Number of records to skip.
        
        Returns:
            List[ModelType]: List of matching records.
        """
        field = getattr(self.model, field_name)
        query = select(self.model).where(field == value).offset(offset)
        
        if limit:
            query = query.limit(limit)
        
        result = await self.session.execute(query)
        return list(result.scalars().all())
    
    async def update(
        self,
        id: Any,
        obj_data: Dict[str, Any],
    ) -> Optional[ModelType]:
        """
        Update a record by primary key.
        
        Args:
            id: Primary key value.
            obj_data: Dictionary of fields to update.
        
        Returns:
            Optional[ModelType]: The updated record or None if not found.
        
        Example:
            user = await repo.update("user_123", {"name": "Jane"})
        """
        db_obj = await self.get(id)
        if db_obj is None:
            return None
        
        for field, value in obj_data.items():
            if hasattr(db_obj, field):
                setattr(db_obj, field, value)
        
        await self.session.flush()
        await self.session.refresh(db_obj)
        return db_obj
    
    async def delete(self, id: Any) -> bool:
        """
        Delete a record by primary key.
        
        Args:
            id: Primary key value.
        
        Returns:
            bool: True if deleted, False if not found.
        
        Example:
            deleted = await repo.delete("user_123")
        """
        db_obj = await self.get(id)
        if db_obj is None:
            return False
        
        await self.session.delete(db_obj)
        await self.session.flush()
        return True
    
    async def list(
        self,
        limit: int = 100,
        offset: int = 0,
        order_by: Optional[str] = None,
        order_desc: bool = False,
    ) -> List[ModelType]:
        """
        List records with pagination.
        
        Args:
            limit: Maximum number of records to return.
            offset: Number of records to skip.
            order_by: Field name to order by.
            order_desc: Whether to order descending.
        
        Returns:
            List[ModelType]: List of records.
        
        Example:
            users = await repo.list(limit=10, offset=0, order_by="created_at")
        """
        query = select(self.model).offset(offset).limit(limit)
        
        if order_by and hasattr(self.model, order_by):
            order_field = getattr(self.model, order_by)
            if order_desc:
                query = query.order_by(order_field.desc())
            else:
                query = query.order_by(order_field.asc())
        
        result = await self.session.execute(query)
        return list(result.scalars().all())
    
    async def count(self) -> int:
        """
        Count total records in the table.
        
        Returns:
            int: Total count of records.
        """
        query = select(func.count()).select_from(self.model)
        result = await self.session.execute(query)
        return result.scalar() or 0
    
    async def exists(self, id: Any) -> bool:
        """
        Check if a record exists by primary key.
        
        Args:
            id: Primary key value.
        
        Returns:
            bool: True if exists, False otherwise.
        """
        db_obj = await self.get(id)
        return db_obj is not None
