"""
Scam Detection - Message classification and threat analysis.

This package provides scam detection capabilities for
identifying and classifying scam messages.

Supported scam types:
- KYC_PHISHING: Bank/telecom KYC update scams
- LOTTERY_PRIZE: Lottery and prize scams
- INVESTMENT_FRAUD: Fake investment schemes
- IMPERSONATION: Bank official/government impersonation
- LOAN_SCAM: Fake loan offers
- JOB_SCAM: Fraudulent job offers
- OTP_THEFT: OTP/PIN theft attempts
- TECH_SUPPORT: Fake tech support calls

Usage:
    from app.scam_detection import ScamDetector, get_scam_detector
    
    detector = get_scam_detector()
    is_scam, scam_type, confidence = await detector.is_scam(message)
"""

from app.scam_detection.detector import (
    ScamDetector,
    ScamType,
    get_scam_detector,
)

__all__ = [
    "ScamDetector",
    "ScamType",
    "get_scam_detector",
]
