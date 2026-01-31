"""
Validators for Extracted Intelligence Entities.

This module provides validation functions for financial entities
extracted from scam messages. Each validator checks format,
structure, and (where possible) semantics.

Usage:
    from app.intelligence.validators import validate_phone, validate_upi
    
    if validate_phone("+919876543210"):
        print("Valid phone number")
"""

import logging
import re
from typing import Optional, Tuple

logger = logging.getLogger(__name__)


# =============================================================================
# PHONE NUMBER VALIDATION
# =============================================================================

def validate_phone(phone: str) -> bool:
    """
    Validate an Indian phone number.
    
    Args:
        phone: Phone number string to validate.
    
    Returns:
        bool: True if valid Indian phone number.
    
    Examples:
        >>> validate_phone("+919876543210")
        True
        >>> validate_phone("9876543210")
        True
        >>> validate_phone("1234567890")
        False  # Doesn't start with 6-9
        >>> validate_phone("987654")
        False  # Too short
    """
    if not phone:
        return False
    
    # Remove all non-digit characters except leading +
    cleaned = re.sub(r"[^\d+]", "", phone)
    
    # Handle +91 or 91 prefix
    if cleaned.startswith("+91"):
        cleaned = cleaned[3:]
    elif cleaned.startswith("91") and len(cleaned) == 12:
        cleaned = cleaned[2:]
    elif cleaned.startswith("0"):
        cleaned = cleaned[1:]
    
    # Must be exactly 10 digits starting with 6-9
    if len(cleaned) != 10:
        return False
    
    if not cleaned[0] in "6789":
        return False
    
    if not cleaned.isdigit():
        return False
    
    return True


def normalize_phone(phone: str) -> Optional[str]:
    """
    Normalize an Indian phone number to standard format.
    
    Args:
        phone: Phone number string.
    
    Returns:
        Optional[str]: Normalized phone in +91XXXXXXXXXX format, or None if invalid.
    
    Examples:
        >>> normalize_phone("9876543210")
        "+919876543210"
        >>> normalize_phone("+91 98765 43210")
        "+919876543210"
        >>> normalize_phone("1234567890")
        None
    """
    if not validate_phone(phone):
        return None
    
    # Remove all non-digit characters
    digits = re.sub(r"\D", "", phone)
    
    # Get last 10 digits
    if len(digits) >= 10:
        digits = digits[-10:]
    
    return f"+91{digits}"


# =============================================================================
# UPI ID VALIDATION
# =============================================================================

# Valid UPI handles
VALID_UPI_HANDLES = {
    "ybl", "paytm", "okaxis", "oksbi", "okhdfcbank", "okicici",
    "upi", "apl", "axisbank", "sbi", "hdfcbank", "icici", "ibl",
    "kotak", "indus", "federal", "pnb", "boi", "bob", "cbi",
    "rbl", "yes", "idbi", "abfspay", "axl", "pingpay", "gpay",
    "phonepe", "amazonpay", "freecharge", "mobikwik", "airtel",
    "jio", "slice", "jupiter", "fi", "niyopay", "postpay",
    "waicici", "wahdfcbank", "wasbi", "waaxis", "yapl", "idfcbank",
}


def validate_upi(upi_id: str) -> bool:
    """
    Validate a UPI ID format.
    
    Args:
        upi_id: UPI ID string to validate.
    
    Returns:
        bool: True if valid UPI ID format.
    
    Examples:
        >>> validate_upi("user@ybl")
        True
        >>> validate_upi("merchant.store@paytm")
        True
        >>> validate_upi("user@invalid")
        False
        >>> validate_upi("user")
        False
    """
    if not upi_id or "@" not in upi_id:
        return False
    
    parts = upi_id.lower().split("@")
    if len(parts) != 2:
        return False
    
    username, handle = parts
    
    # Validate username: 3-50 alphanumeric + . _ -
    if not re.match(r"^[a-z0-9._-]{3,50}$", username):
        return False
    
    # Validate handle
    if handle not in VALID_UPI_HANDLES:
        return False
    
    return True


def validate_upi_loose(upi_id: str) -> bool:
    """
    Loosely validate a UPI ID (any handle allowed).
    
    Args:
        upi_id: UPI ID string.
    
    Returns:
        bool: True if valid format (any handle).
    
    Examples:
        >>> validate_upi_loose("user@custombank")
        True
        >>> validate_upi_loose("a@b")
        False  # Username too short
    """
    if not upi_id or "@" not in upi_id:
        return False
    
    parts = upi_id.lower().split("@")
    if len(parts) != 2:
        return False
    
    username, handle = parts
    
    # Username: at least 3 chars
    if len(username) < 3 or len(username) > 50:
        return False
    
    # Handle: at least 2 chars
    if len(handle) < 2 or len(handle) > 20:
        return False
    
    # Both should be alphanumeric with allowed special chars
    if not re.match(r"^[a-z0-9._-]+$", username):
        return False
    
    if not re.match(r"^[a-z]+$", handle):
        return False
    
    return True


def normalize_upi(upi_id: str) -> Optional[str]:
    """
    Normalize a UPI ID to lowercase.
    
    Args:
        upi_id: UPI ID string.
    
    Returns:
        Optional[str]: Normalized UPI ID or None if invalid.
    """
    if not validate_upi_loose(upi_id):
        return None
    
    return upi_id.lower().strip()


# =============================================================================
# BANK ACCOUNT VALIDATION
# =============================================================================

def validate_bank_account(account: str) -> bool:
    """
    Validate an Indian bank account number.
    
    Args:
        account: Account number string.
    
    Returns:
        bool: True if valid format (9-18 digits).
    
    Examples:
        >>> validate_bank_account("1234567890123")
        True
        >>> validate_bank_account("12345678")
        False  # Too short
        >>> validate_bank_account("1234567890123456789")
        False  # Too long
    """
    if not account:
        return False
    
    # Remove spaces and dashes
    cleaned = re.sub(r"[\s\-]", "", account)
    
    # Must be all digits
    if not cleaned.isdigit():
        return False
    
    # Length: 9-18 digits
    if len(cleaned) < 9 or len(cleaned) > 18:
        return False
    
    # Should not look like a phone number
    if len(cleaned) == 10 and cleaned[0] in "6789":
        return False
    
    return True


def normalize_bank_account(account: str) -> Optional[str]:
    """
    Normalize a bank account number.
    
    Args:
        account: Account number string.
    
    Returns:
        Optional[str]: Normalized account or None if invalid.
    """
    if not account:
        return None
    
    cleaned = re.sub(r"[\s\-]", "", account)
    
    if not validate_bank_account(cleaned):
        return None
    
    return cleaned


# =============================================================================
# IFSC CODE VALIDATION
# =============================================================================

def validate_ifsc(ifsc: str) -> bool:
    """
    Validate an Indian IFSC code.
    
    Format: 4 letters + 0 + 6 alphanumeric
    
    Args:
        ifsc: IFSC code string.
    
    Returns:
        bool: True if valid IFSC format.
    
    Examples:
        >>> validate_ifsc("HDFC0001234")
        True
        >>> validate_ifsc("SBIN0123456")
        True
        >>> validate_ifsc("INVALID")
        False
        >>> validate_ifsc("HDFC1001234")
        False  # 5th char must be 0
    """
    if not ifsc:
        return False
    
    cleaned = ifsc.upper().strip()
    
    # Must be exactly 11 characters
    if len(cleaned) != 11:
        return False
    
    # First 4 must be letters
    if not cleaned[:4].isalpha():
        return False
    
    # 5th character must be 0
    if cleaned[4] != "0":
        return False
    
    # Last 6 must be alphanumeric
    if not cleaned[5:].isalnum():
        return False
    
    return True


def normalize_ifsc(ifsc: str) -> Optional[str]:
    """
    Normalize an IFSC code to uppercase.
    
    Args:
        ifsc: IFSC code string.
    
    Returns:
        Optional[str]: Normalized IFSC or None if invalid.
    """
    if not validate_ifsc(ifsc):
        return None
    
    return ifsc.upper().strip()


# =============================================================================
# URL VALIDATION
# =============================================================================

# Suspicious TLDs often used in phishing
SUSPICIOUS_TLDS = {
    "xyz", "tk", "ml", "ga", "cf", "gq", "top", "pw", "cc",
    "club", "site", "online", "live", "info", "click", "link",
    "space", "fun", "work", "surf", "cam", "icu", "buzz",
}

# Legitimate bank domains
LEGITIMATE_BANK_DOMAINS = {
    "sbi.co.in", "onlinesbi.com",
    "hdfcbank.com", "netbanking.hdfcbank.com",
    "icicibank.com", "infinity.icicibank.com",
    "axisbank.com", "omni.axisbank.com",
    "kotak.com", "kotakmf.com",
    "yesbank.in", "yesbank.com",
    "pnbindia.in", "netpnb.com",
    "bankofbaroda.in", "barodaconnect.com",
    "bankofindia.co.in",
    "canarabank.com",
    "unionbankofindia.co.in",
    "idbibank.in",
    "rblbank.com",
    "indusind.com",
    "federalbank.co.in",
}


def validate_url(url: str) -> bool:
    """
    Validate a URL format.
    
    Args:
        url: URL string.
    
    Returns:
        bool: True if valid URL format.
    
    Examples:
        >>> validate_url("https://example.com")
        True
        >>> validate_url("http://test.xyz/path")
        True
        >>> validate_url("not-a-url")
        False
    """
    if not url:
        return False
    
    pattern = re.compile(
        r"^https?://"                     # Protocol
        r"[a-zA-Z0-9]"                    # Domain start
        r"[a-zA-Z0-9\-._~:/?#\[\]@!$&'()*+,;=%]*$"  # Rest
    )
    
    return bool(pattern.match(url))


def is_suspicious_url(url: str) -> Tuple[bool, str]:
    """
    Check if a URL is suspicious (potential phishing).
    
    Args:
        url: URL string.
    
    Returns:
        Tuple[bool, str]: (is_suspicious, reason)
    
    Examples:
        >>> is_suspicious_url("http://sbi-update.xyz/login")
        (True, "suspicious_tld")
        >>> is_suspicious_url("https://sbi.co.in/")
        (False, "")
    """
    if not url:
        return False, ""
    
    url_lower = url.lower()
    
    # Extract domain
    match = re.search(r"https?://([^/]+)", url_lower)
    if not match:
        return False, ""
    
    domain = match.group(1)
    
    # Check if legitimate bank domain
    for legit in LEGITIMATE_BANK_DOMAINS:
        if domain == legit or domain.endswith("." + legit):
            return False, ""
    
    # Check for suspicious TLD
    for tld in SUSPICIOUS_TLDS:
        if domain.endswith(f".{tld}"):
            return True, "suspicious_tld"
    
    # Check for bank name in non-bank domain
    bank_names = ["sbi", "hdfc", "icici", "axis", "pnb", "bob", "kotak", "yes", "idbi"]
    for bank in bank_names:
        if bank in domain and not any(legit in domain for legit in LEGITIMATE_BANK_DOMAINS):
            return True, "fake_bank_domain"
    
    # Check for phishing keywords
    phishing_keywords = ["kyc", "update", "verify", "secure", "login", "unlock", "blocked"]
    if any(kw in domain for kw in phishing_keywords):
        return True, "phishing_keyword"
    
    # Check for URL shorteners
    shorteners = ["bit.ly", "goo.gl", "t.co", "tinyurl.com", "is.gd", "cutt.ly"]
    if any(s in domain for s in shorteners):
        return True, "url_shortener"
    
    return False, ""


# =============================================================================
# EMAIL VALIDATION
# =============================================================================

def validate_email(email: str) -> bool:
    """
    Validate an email address format.
    
    Args:
        email: Email string.
    
    Returns:
        bool: True if valid email format.
    
    Examples:
        >>> validate_email("test@example.com")
        True
        >>> validate_email("invalid")
        False
    """
    if not email:
        return False
    
    pattern = re.compile(
        r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    )
    
    return bool(pattern.match(email))


# =============================================================================
# AADHAAR VALIDATION
# =============================================================================

def validate_aadhaar(aadhaar: str) -> bool:
    """
    Validate an Aadhaar number format.
    
    12 digits, first digit 2-9, with Verhoeff checksum.
    Note: This only validates format, not the actual checksum.
    
    Args:
        aadhaar: Aadhaar number string.
    
    Returns:
        bool: True if valid format.
    
    Examples:
        >>> validate_aadhaar("234567890123")
        True
        >>> validate_aadhaar("123456789012")
        False  # Starts with 1
        >>> validate_aadhaar("12345678901")
        False  # Only 11 digits
    """
    if not aadhaar:
        return False
    
    # Remove spaces and dashes
    cleaned = re.sub(r"[\s\-]", "", aadhaar)
    
    # Must be exactly 12 digits
    if len(cleaned) != 12 or not cleaned.isdigit():
        return False
    
    # First digit must be 2-9
    if cleaned[0] in "01":
        return False
    
    return True


# =============================================================================
# PAN VALIDATION
# =============================================================================

def validate_pan(pan: str) -> bool:
    """
    Validate a PAN card number format.
    
    Format: AAAAA0000A (5 letters, 4 digits, 1 letter)
    
    Args:
        pan: PAN number string.
    
    Returns:
        bool: True if valid format.
    
    Examples:
        >>> validate_pan("ABCDE1234F")
        True
        >>> validate_pan("ABCD12345")
        False
    """
    if not pan:
        return False
    
    cleaned = pan.upper().strip()
    
    # Must be exactly 10 characters
    if len(cleaned) != 10:
        return False
    
    # First 5 must be letters
    if not cleaned[:5].isalpha():
        return False
    
    # 4th letter must be valid holder type
    if cleaned[3] not in "PCHABGJLFT":
        return False
    
    # Next 4 must be digits
    if not cleaned[5:9].isdigit():
        return False
    
    # Last must be a letter
    if not cleaned[9].isalpha():
        return False
    
    return True


# =============================================================================
# CONFIDENCE SCORING
# =============================================================================

def calculate_entity_confidence(
    entity_type: str,
    value: str,
    context: Optional[str] = None,
) -> float:
    """
    Calculate confidence score for an extracted entity.
    
    Args:
        entity_type: Type of entity (phone, upi, bank_account, etc.)
        value: Extracted value.
        context: Surrounding text for context-aware scoring.
    
    Returns:
        float: Confidence score between 0.0 and 1.0.
    
    Examples:
        >>> calculate_entity_confidence("phone", "+919876543210")
        0.95
        >>> calculate_entity_confidence("upi", "user@ybl")
        0.9
    """
    base_confidence = 0.7
    
    validators = {
        "phone": validate_phone,
        "upi": validate_upi,
        "bank_account": validate_bank_account,
        "ifsc": validate_ifsc,
        "url": validate_url,
        "email": validate_email,
        "aadhaar": validate_aadhaar,
        "pan": validate_pan,
    }
    
    validator = validators.get(entity_type)
    if validator and validator(value):
        base_confidence = 0.85
    
    # Boost for context clues
    if context:
        context_lower = context.lower()
        
        context_keywords = {
            "phone": ["call", "phone", "mobile", "contact", "number", "whatsapp"],
            "upi": ["pay", "transfer", "upi", "gpay", "phonepe", "paytm"],
            "bank_account": ["account", "a/c", "transfer", "deposit", "bank"],
            "ifsc": ["ifsc", "branch", "bank", "transfer"],
        }
        
        keywords = context_keywords.get(entity_type, [])
        if any(kw in context_lower for kw in keywords):
            base_confidence = min(base_confidence + 0.1, 0.98)
    
    # Specific adjustments
    if entity_type == "phone" and validate_phone(value):
        base_confidence = 0.95
    elif entity_type == "upi" and validate_upi(value):
        base_confidence = 0.92
    elif entity_type == "ifsc" and validate_ifsc(value):
        base_confidence = 0.98
    
    return round(base_confidence, 2)
