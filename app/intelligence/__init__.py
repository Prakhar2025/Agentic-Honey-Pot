"""
Intelligence Extraction - Entity extraction from scam messages.

This package provides the intelligence extraction engine for
identifying and extracting financial entities from scam messages.

Components:
    - IntelligenceExtractor: Main extraction engine
    - IntelligenceAggregator: Merge and deduplicate across turns
    - Patterns: Regex patterns for Indian entities
    - Validators: Validation and normalization functions

Extracts:
    - Phone numbers (Indian mobile format)
    - UPI IDs (all major payment apps)
    - Bank account numbers (9-18 digits)
    - IFSC codes (bank branch codes)
    - Phishing URLs (suspicious domains)
    - Emails
    - Aadhaar numbers (12 digits)
    - PAN numbers

Usage:
    from app.intelligence import IntelligenceExtractor, get_extractor
    
    extractor = get_extractor()
    intel = extractor.extract_all("Pay to 9876543210 or scammer@ybl")
"""

from app.intelligence.aggregator import (
    EntityRecord,
    IntelligenceAggregator,
    get_aggregator,
)
from app.intelligence.extractor import (
    IntelligenceExtractor,
    get_extractor,
)
from app.intelligence.patterns import (
    AADHAAR_PATTERN,
    BANK_ACCOUNT_CONTEXT_PATTERN,
    BANK_ACCOUNT_PATTERN,
    EMAIL_PATTERN,
    IFSC_CONTEXT_PATTERN,
    IFSC_PATTERN,
    PAN_PATTERN,
    PATTERN_REGISTRY,
    PHONE_PATTERN,
    PHONE_PATTERN_FLEXIBLE,
    PHISHING_URL_PATTERN,
    SUSPICIOUS_URL_PATTERN,
    UPI_HANDLES,
    UPI_PATTERN,
    UPI_PATTERN_GENERIC,
    URL_PATTERN,
)
from app.intelligence.validators import (
    calculate_entity_confidence,
    is_suspicious_url,
    normalize_bank_account,
    normalize_ifsc,
    normalize_phone,
    normalize_upi,
    validate_aadhaar,
    validate_bank_account,
    validate_email,
    validate_ifsc,
    validate_pan,
    validate_phone,
    validate_upi,
    validate_upi_loose,
    validate_url,
)

__all__ = [
    # Main classes
    "IntelligenceExtractor",
    "IntelligenceAggregator",
    "EntityRecord",
    # Factory functions
    "get_extractor",
    "get_aggregator",
    # Patterns
    "PHONE_PATTERN",
    "PHONE_PATTERN_FLEXIBLE",
    "UPI_PATTERN",
    "UPI_PATTERN_GENERIC",
    "UPI_HANDLES",
    "BANK_ACCOUNT_PATTERN",
    "BANK_ACCOUNT_CONTEXT_PATTERN",
    "IFSC_PATTERN",
    "IFSC_CONTEXT_PATTERN",
    "URL_PATTERN",
    "SUSPICIOUS_URL_PATTERN",
    "PHISHING_URL_PATTERN",
    "EMAIL_PATTERN",
    "AADHAAR_PATTERN",
    "PAN_PATTERN",
    "PATTERN_REGISTRY",
    # Validators
    "validate_phone",
    "validate_upi",
    "validate_upi_loose",
    "validate_bank_account",
    "validate_ifsc",
    "validate_url",
    "validate_email",
    "validate_aadhaar",
    "validate_pan",
    # Normalizers
    "normalize_phone",
    "normalize_upi",
    "normalize_bank_account",
    "normalize_ifsc",
    # Utilities
    "is_suspicious_url",
    "calculate_entity_confidence",
]
