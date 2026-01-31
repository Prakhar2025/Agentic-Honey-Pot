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

from fastapi import APIRouter, status
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
    total_ifsc_codes: int = 0
    total_phishing_links: int = 0
    total_emails: int = 0
    unique_phone_numbers: List[str] = Field(default_factory=list)
    unique_upi_ids: List[str] = Field(default_factory=list)
    unique_bank_accounts: List[str] = Field(default_factory=list)
    high_confidence_intel: int = Field(
        0,
        description="Intel with confidence > 0.85",
    )
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
    
    Provides comprehensive statistics about honeypot operations:
    - Session counts (total, active, completed)
    - Intelligence extraction metrics
    - Scam type distribution
    - Persona usage statistics
    
    Returns:
        DashboardResponse with all analytics data.
    
    Example Response:
        {
            "total_sessions": 150,
            "active_sessions": 12,
            "completed_sessions": 138,
            "total_intel_extracted": 245,
            "avg_turns_per_session": 4.5,
            "scam_type_distribution": [
                {"scam_type": "KYC_PHISHING", "count": 45, "percentage": 30.0}
            ]
        }
    """
    logger.info("Dashboard analytics requested")
    
    async with get_db_context() as db:
        session_repo = SessionRepository(db)
        
        # Get all sessions
        sessions = await session_repo.list_all(limit=1000)
        
        # Calculate metrics
        total_sessions = len(sessions)
        active_sessions = sum(
            1 for s in sessions 
            if s.status in ["ONGOING", "INTELLIGENCE_EXTRACTED"]
        )
        completed_sessions = sum(
            1 for s in sessions 
            if s.status in ["COMPLETED", "MAX_TURNS_REACHED", "GOAL_ACHIEVED"]
        )
        
        # Total intel extracted
        total_intel = 0
        for session in sessions:
            intel = session.extracted_intelligence or {}
            total_intel += intel.get("total_entities", 0)
        
        # Average turns
        turns = [s.turn_count or 0 for s in sessions]
        avg_turns = sum(turns) / len(turns) if turns else 0.0
        
        # Scam type distribution
        scam_types: Dict[str, int] = {}
        for session in sessions:
            st = session.scam_type_detected or "UNKNOWN"
            scam_types[st] = scam_types.get(st, 0) + 1
        
        distribution = []
        for st, count in sorted(scam_types.items(), key=lambda x: -x[1]):
            pct = (count / total_sessions * 100) if total_sessions > 0 else 0
            distribution.append(ScamTypeDistribution(
                scam_type=st,
                count=count,
                percentage=round(pct, 1),
            ))
        
        # Persona usage
        persona_usage: Dict[str, int] = {}
        for session in sessions:
            persona = session.persona_used or "unknown"
            persona_usage[persona] = persona_usage.get(persona, 0) + 1
        
        return DashboardResponse(
            total_sessions=total_sessions,
            active_sessions=active_sessions,
            completed_sessions=completed_sessions,
            total_intel_extracted=total_intel,
            avg_turns_per_session=round(avg_turns, 2),
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
    
    Aggregates all extracted intelligence across all sessions
    and returns unique entities and counts.
    
    Returns:
        IntelligenceSummary with aggregated intelligence.
    
    Example Response:
        {
            "total_phone_numbers": 45,
            "total_upi_ids": 32,
            "unique_phone_numbers": ["+919876543210", ...],
            "high_confidence_intel": 58
        }
    """
    logger.info("Intelligence summary requested")
    
    async with get_db_context() as db:
        session_repo = SessionRepository(db)
        sessions = await session_repo.list_all(limit=1000)
        
        # Aggregate all intel
        all_phones: set = set()
        all_upis: set = set()
        all_accounts: set = set()
        all_ifscs: set = set()
        all_urls: set = set()
        all_emails: set = set()
        
        total_phones = 0
        total_upis = 0
        total_accounts = 0
        total_ifscs = 0
        total_urls = 0
        total_emails = 0
        high_confidence = 0
        
        for session in sessions:
            intel = session.extracted_intelligence or {}
            
            # Phone numbers
            for phone in intel.get("phone_numbers", []):
                total_phones += 1
                num = phone.get("number", "")
                if num:
                    all_phones.add(num)
                if phone.get("confidence", 0) >= 0.85:
                    high_confidence += 1
            
            # UPI IDs
            for upi in intel.get("upi_ids", []):
                total_upis += 1
                uid = upi.get("id", "")
                if uid:
                    all_upis.add(uid)
                if upi.get("confidence", 0) >= 0.85:
                    high_confidence += 1
            
            # Bank accounts
            for acc in intel.get("bank_accounts", []):
                total_accounts += 1
                num = acc.get("account_number", "")
                if num:
                    all_accounts.add(num)
                if acc.get("confidence", 0) >= 0.85:
                    high_confidence += 1
            
            # IFSC codes
            for ifsc in intel.get("ifsc_codes", []):
                total_ifscs += 1
                code = ifsc.get("code", "")
                if code:
                    all_ifscs.add(code)
            
            # Phishing links
            for link in intel.get("phishing_links", []):
                total_urls += 1
                url = link.get("url", "")
                if url:
                    all_urls.add(url)
            
            # Emails
            for email in intel.get("emails", []):
                total_emails += 1
                addr = email.get("email", "")
                if addr:
                    all_emails.add(addr)
        
        return IntelligenceSummary(
            total_phone_numbers=total_phones,
            total_upi_ids=total_upis,
            total_bank_accounts=total_accounts,
            total_ifsc_codes=total_ifscs,
            total_phishing_links=total_urls,
            total_emails=total_emails,
            unique_phone_numbers=sorted(list(all_phones))[:50],  # Limit to 50
            unique_upi_ids=sorted(list(all_upis))[:50],
            unique_bank_accounts=sorted(list(all_accounts))[:50],
            high_confidence_intel=high_confidence,
            timestamp=datetime.now(timezone.utc).isoformat(),
        )
