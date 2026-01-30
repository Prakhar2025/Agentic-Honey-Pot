"""
Intelligence Repository.

This module provides data access operations for extracted intelligence,
including entity storage, retrieval, and aggregation.

Usage:
    repo = IntelligenceRepository(db_session)
    intel = await repo.create_for_session(session_id)
    await repo.add_upi_id(session_id, "scammer@ybl", confidence=0.98)
"""

from datetime import datetime
from typing import Any, Dict, List, Optional

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import IntelligenceModel
from app.db.repositories.base import BaseRepository


class IntelligenceRepository(BaseRepository[IntelligenceModel]):
    """
    Repository for extracted intelligence operations.
    
    Provides intelligence-specific operations including entity
    addition, aggregation, and session-scoped queries.
    """
    
    def __init__(self, session: AsyncSession) -> None:
        """
        Initialize intelligence repository.
        
        Args:
            session: Async database session.
        """
        super().__init__(IntelligenceModel, session)
    
    async def create_for_session(
        self,
        session_id: str,
    ) -> IntelligenceModel:
        """
        Create a new intelligence record for a session.
        
        Args:
            session_id: Parent session ID.
        
        Returns:
            IntelligenceModel: The created intelligence record.
        """
        intel_data = {
            "session_id": session_id,
            "bank_accounts": [],
            "upi_ids": [],
            "phone_numbers": [],
            "phishing_links": [],
            "other_intel": [],
            "total_entities": 0,
        }
        return await self.create(intel_data)
    
    async def get_by_session(
        self,
        session_id: str,
    ) -> Optional[IntelligenceModel]:
        """
        Get intelligence record by session ID.
        
        Args:
            session_id: Session ID to query.
        
        Returns:
            Optional[IntelligenceModel]: Intelligence record or None.
        """
        return await self.get_by_field("session_id", session_id)
    
    async def get_or_create(
        self,
        session_id: str,
    ) -> IntelligenceModel:
        """
        Get existing intelligence or create new for session.
        
        Args:
            session_id: Session ID.
        
        Returns:
            IntelligenceModel: Existing or new intelligence record.
        """
        intel = await self.get_by_session(session_id)
        if intel is None:
            intel = await self.create_for_session(session_id)
        return intel
    
    async def add_bank_account(
        self,
        session_id: str,
        account_number: str,
        ifsc_code: Optional[str] = None,
        bank_name: Optional[str] = None,
        confidence: float = 0.9,
    ) -> IntelligenceModel:
        """
        Add a bank account to session intelligence.
        
        Args:
            session_id: Session ID.
            account_number: Bank account number.
            ifsc_code: IFSC code if available.
            bank_name: Bank name if identified.
            confidence: Extraction confidence (0-1).
        
        Returns:
            IntelligenceModel: Updated intelligence record.
        """
        intel = await self.get_or_create(session_id)
        
        bank_accounts = intel.bank_accounts or []
        
        # Check for duplicates
        existing = [a for a in bank_accounts if a.get("account_number") == account_number]
        if not existing:
            bank_accounts.append({
                "account_number": account_number,
                "ifsc_code": ifsc_code,
                "bank_name": bank_name,
                "confidence": confidence,
                "extracted_at": datetime.utcnow().isoformat(),
            })
            intel.bank_accounts = bank_accounts
            intel.update_total_entities()
            await self.session.flush()
        
        return intel
    
    async def add_upi_id(
        self,
        session_id: str,
        upi_id: str,
        confidence: float = 0.9,
    ) -> IntelligenceModel:
        """
        Add a UPI ID to session intelligence.
        
        Args:
            session_id: Session ID.
            upi_id: UPI ID (e.g., user@ybl).
            confidence: Extraction confidence (0-1).
        
        Returns:
            IntelligenceModel: Updated intelligence record.
        """
        intel = await self.get_or_create(session_id)
        
        upi_ids = intel.upi_ids or []
        
        # Check for duplicates
        existing = [u for u in upi_ids if u.get("id") == upi_id]
        if not existing:
            upi_ids.append({
                "id": upi_id,
                "confidence": confidence,
                "extracted_at": datetime.utcnow().isoformat(),
            })
            intel.upi_ids = upi_ids
            intel.update_total_entities()
            await self.session.flush()
        
        return intel
    
    async def add_phone_number(
        self,
        session_id: str,
        phone_number: str,
        phone_type: str = "mobile",
        confidence: float = 0.9,
    ) -> IntelligenceModel:
        """
        Add a phone number to session intelligence.
        
        Args:
            session_id: Session ID.
            phone_number: Phone number.
            phone_type: Type (mobile or landline).
            confidence: Extraction confidence (0-1).
        
        Returns:
            IntelligenceModel: Updated intelligence record.
        """
        intel = await self.get_or_create(session_id)
        
        phone_numbers = intel.phone_numbers or []
        
        # Check for duplicates
        existing = [p for p in phone_numbers if p.get("number") == phone_number]
        if not existing:
            phone_numbers.append({
                "number": phone_number,
                "type": phone_type,
                "confidence": confidence,
                "extracted_at": datetime.utcnow().isoformat(),
            })
            intel.phone_numbers = phone_numbers
            intel.update_total_entities()
            await self.session.flush()
        
        return intel
    
    async def add_phishing_link(
        self,
        session_id: str,
        url: str,
        domain: Optional[str] = None,
        confidence: float = 0.9,
    ) -> IntelligenceModel:
        """
        Add a phishing link to session intelligence.
        
        Args:
            session_id: Session ID.
            url: Full URL.
            domain: Domain name if extracted.
            confidence: Extraction confidence (0-1).
        
        Returns:
            IntelligenceModel: Updated intelligence record.
        """
        intel = await self.get_or_create(session_id)
        
        phishing_links = intel.phishing_links or []
        
        # Extract domain if not provided
        if domain is None:
            try:
                from urllib.parse import urlparse
                parsed = urlparse(url)
                domain = parsed.netloc
            except Exception:
                domain = None
        
        # Check for duplicates
        existing = [l for l in phishing_links if l.get("url") == url]
        if not existing:
            phishing_links.append({
                "url": url,
                "domain": domain,
                "confidence": confidence,
                "extracted_at": datetime.utcnow().isoformat(),
            })
            intel.phishing_links = phishing_links
            intel.update_total_entities()
            await self.session.flush()
        
        return intel
    
    async def add_other_intel(
        self,
        session_id: str,
        intel_type: str,
        value: str,
        confidence: float = 0.9,
    ) -> IntelligenceModel:
        """
        Add other intelligence to session.
        
        Args:
            session_id: Session ID.
            intel_type: Type of intel (email, aadhaar, pan, name, etc.).
            value: Extracted value.
            confidence: Extraction confidence (0-1).
        
        Returns:
            IntelligenceModel: Updated intelligence record.
        """
        intel = await self.get_or_create(session_id)
        
        other_intel = intel.other_intel or []
        
        # Check for duplicates
        existing = [o for o in other_intel if o.get("value") == value]
        if not existing:
            other_intel.append({
                "type": intel_type,
                "value": value,
                "confidence": confidence,
                "extracted_at": datetime.utcnow().isoformat(),
            })
            intel.other_intel = other_intel
            intel.update_total_entities()
            await self.session.flush()
        
        return intel
    
    async def merge_intelligence(
        self,
        session_id: str,
        extracted_data: Dict[str, Any],
    ) -> IntelligenceModel:
        """
        Merge extracted intelligence data into session.
        
        Args:
            session_id: Session ID.
            extracted_data: Dictionary with entity lists.
        
        Returns:
            IntelligenceModel: Updated intelligence record.
        """
        intel = await self.get_or_create(session_id)
        
        # Process each entity type
        for bank in extracted_data.get("bank_accounts", []):
            await self.add_bank_account(
                session_id,
                account_number=bank.get("account_number", ""),
                ifsc_code=bank.get("ifsc_code"),
                bank_name=bank.get("bank_name"),
                confidence=bank.get("confidence", 0.9),
            )
        
        for upi in extracted_data.get("upi_ids", []):
            await self.add_upi_id(
                session_id,
                upi_id=upi.get("id", ""),
                confidence=upi.get("confidence", 0.9),
            )
        
        for phone in extracted_data.get("phone_numbers", []):
            await self.add_phone_number(
                session_id,
                phone_number=phone.get("number", ""),
                phone_type=phone.get("type", "mobile"),
                confidence=phone.get("confidence", 0.9),
            )
        
        for link in extracted_data.get("phishing_links", []):
            await self.add_phishing_link(
                session_id,
                url=link.get("url", ""),
                domain=link.get("domain"),
                confidence=link.get("confidence", 0.9),
            )
        
        for other in extracted_data.get("other_intel", []):
            await self.add_other_intel(
                session_id,
                intel_type=other.get("type", "unknown"),
                value=other.get("value", ""),
                confidence=other.get("confidence", 0.9),
            )
        
        # Refresh to get updated counts
        await self.session.refresh(intel)
        return intel
    
    async def get_aggregate_stats(self) -> Dict[str, Any]:
        """
        Get aggregate intelligence statistics.
        
        Returns:
            Dict[str, Any]: Aggregated stats across all sessions.
        """
        query = select(
            func.count(IntelligenceModel.id).label("total_records"),
            func.sum(IntelligenceModel.total_entities).label("total_entities"),
        )
        result = await self.session.execute(query)
        row = result.fetchone()
        
        return {
            "total_records": row[0] or 0 if row else 0,
            "total_entities_extracted": row[1] or 0 if row else 0,
        }
    
    async def get_sessions_with_intel(
        self,
        min_entities: int = 1,
        limit: int = 100,
    ) -> List[IntelligenceModel]:
        """
        Get intelligence records with minimum entity count.
        
        Args:
            min_entities: Minimum entities required.
            limit: Maximum records to return.
        
        Returns:
            List[IntelligenceModel]: Records meeting criteria.
        """
        query = (
            select(IntelligenceModel)
            .where(IntelligenceModel.total_entities >= min_entities)
            .order_by(IntelligenceModel.total_entities.desc())
            .limit(limit)
        )
        result = await self.session.execute(query)
        return list(result.scalars().all())
