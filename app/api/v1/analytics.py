"""
Analytics Endpoints.

This module provides analytics and dashboard endpoints for
monitoring honeypot performance and intelligence collection.

Endpoints:
    GET /analytics/dashboard - Overall analytics dashboard
    GET /analytics/intelligence - Aggregated intelligence summary
"""

import logging
from datetime import datetime, timezone
from typing import Any, Dict, List

from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.db.database import get_db_context
from app.db.repositories.sessions import SessionRepository

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/analytics", tags=["Analytics"])


# =============================================================================
# RESPONSE MODELS
# =============================================================================

class ScamTypeDistribution(BaseModel):
    """Distribution of scam types."""
    
    scam_type: str
    count: int
    percentage: float


class DashboardResponse(BaseModel):
    """Response model for dashboard analytics."""
    
    total_sessions: int = Field(..., description="Total number of sessions")
    active_sessions: int = Field(..., description="Currently active sessions")
    completed_sessions: int = Field(..., description="Completed sessions")
    total_intel_extracted: int = Field(..., description="Total entities extracted")
    avg_turns_per_session: float = Field(..., description="Average turns per session")
    scam_type_distribution: List[ScamTypeDistribution] = Field(
        default_factory=list,
        description="Distribution by scam type",
    )
    persona_usage: Dict[str, int] = Field(
        default_factory=dict,
        description="Usage count by persona",
    )
    timestamp: str = Field(..., description="Report timestamp")


class IntelligenceSummary(BaseModel):
    """Response model for aggregated intelligence."""
    
    total_phone_numbers: int = 0
    total_upi_ids: int = 0
    total_bank_accounts: int = 0
    total_phishing_links: int = 0
    unique_phone_numbers: List[str] = Field(default_factory=list)
    unique_upi_ids: List[str] = Field(default_factory=list)
    high_confidence_intel: int = Field(0, description="High confidence intel count")
    timestamp: str = Field(..., description="Report timestamp")


# =============================================================================
# ENDPOINTS
# =============================================================================

@router.get(
    "/dashboard",
    response_model=DashboardResponse,
    summary="Dashboard Analytics",
    description="Get overall honeypot analytics and statistics.",
)
async def get_dashboard() -> DashboardResponse:
    """
    Get dashboard analytics.
    """
    logger.info("Dashboard analytics requested")
    
    async with get_db_context() as db:
        session_repo = SessionRepository(db)
        
        # Get session statistics using the repository method
        stats = await session_repo.get_session_stats()
        
        # Calculate metrics
        status_counts = stats.get("by_status", {})
        active_sessions = status_counts.get("ONGOING", 0) + status_counts.get("INTELLIGENCE_EXTRACTED", 0)
        completed_sessions = (
            status_counts.get("COMPLETED", 0) + 
            status_counts.get("MAX_TURNS_REACHED", 0)
        )
        
        # Scam type distribution
        type_counts = stats.get("by_scam_type", {})
        total_sessions = stats.get("total_sessions", 0)
        
        distribution = []
        for st, count in sorted(type_counts.items(), key=lambda x: -x[1]):
            pct = (count / total_sessions * 100) if total_sessions > 0 else 0
            distribution.append(ScamTypeDistribution(
                scam_type=st,
                count=count,
                percentage=round(pct, 1),
            ))
        
        # Get aggregated stats directly
        persona_usage = stats.get("by_persona", {})
        total_intel = stats.get("total_intel", 0)
        
        return DashboardResponse(
            total_sessions=total_sessions,
            active_sessions=active_sessions,
            completed_sessions=completed_sessions,
            total_intel_extracted=total_intel,
            avg_turns_per_session=stats.get("average_turns", 0.0),
            scam_type_distribution=distribution,
            persona_usage=persona_usage,
            timestamp=datetime.now(timezone.utc).isoformat(),
        )


@router.get(
    "/intelligence",
    response_model=IntelligenceSummary,
    summary="Intelligence Summary",
    description="Get aggregated intelligence across all sessions.",
)
async def get_intelligence_summary() -> IntelligenceSummary:
    """
    Get aggregated intelligence summary.
    """
    logger.info("Intelligence summary requested")
    
    async with get_db_context() as db:
        session_repo = SessionRepository(db)
        
        # Get sessions with intelligence
        sessions = await session_repo.list(limit=1000)
        
        # Aggregate all intel
        all_phones: set = set()
        all_upis: set = set()
        
        total_phones = 0
        total_upis = 0
        total_accounts = 0
        total_urls = 0
        
        for session in sessions:
            if not session.intelligence:
                continue
            
            intel = session.intelligence
            
            # Phone numbers
            if intel.phone_numbers:
                for phone in intel.phone_numbers:
                    total_phones += 1
                    num = phone.get("number", "") if isinstance(phone, dict) else str(phone)
                    if num:
                        all_phones.add(num)
            
            # UPI IDs
            if intel.upi_ids:
                for upi in intel.upi_ids:
                    total_upis += 1
                    uid = upi.get("id", "") if isinstance(upi, dict) else str(upi)
                    if uid:
                        all_upis.add(uid)
            
            # Bank accounts
            if intel.bank_accounts:
                total_accounts += len(intel.bank_accounts)
            
            # Phishing links
            if intel.phishing_links:
                total_urls += len(intel.phishing_links)
        
        return IntelligenceSummary(
            total_phone_numbers=total_phones,
            total_upi_ids=total_upis,
            total_bank_accounts=total_accounts,
            total_phishing_links=total_urls,
            unique_phone_numbers=sorted(list(all_phones))[:50],
            unique_upi_ids=sorted(list(all_upis))[:50],
            high_confidence_intel=0,
            timestamp=datetime.now(timezone.utc).isoformat(),
        )
