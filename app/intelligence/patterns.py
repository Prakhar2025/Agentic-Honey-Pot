"""
Regex Patterns for Indian Financial Entity Extraction.

This module contains compiled regex patterns for extracting
financial entities commonly found in Indian scam messages.

All patterns are designed for:
- High precision (minimize false positives)
- Indian context (phone formats, UPI handles, bank patterns)
- Edge case handling (various delimiters, formats)

Usage:
    from app.intelligence.patterns import PHONE_PATTERN, UPI_PATTERN
    
    matches = PHONE_PATTERN.findall(text)
"""

import re
from typing import Pattern


# =============================================================================
# PHONE NUMBER PATTERNS (Indian)
# =============================================================================

# Indian mobile: 10 digits starting with 6-9
# Supports: +91, 91, 0, or no prefix
# Allows: spaces, dashes, dots as separators
PHONE_PATTERN: Pattern[str] = re.compile(
    r"""
    (?:
        (?:\+91|91|0)?          # Optional country/STD code
        [\s.\-]?                # Optional separator
    )?
    (?:
        [6-9]\d{9}              # 10 digit mobile starting with 6-9
    )
    (?![0-9])                   # Not followed by more digits
    """,
    re.VERBOSE
)

# More flexible phone pattern for noisy text
PHONE_PATTERN_FLEXIBLE: Pattern[str] = re.compile(
    r"""
    (?:
        (?:\+91|91|0)?[\s.\-]?
    )?
    (?:
        [6-9][\s.\-]?
        (?:\d[\s.\-]?){8}
        \d
    )
    """,
    re.VERBOSE
)

# Landline pattern: STD code + 6-8 digits
LANDLINE_PATTERN: Pattern[str] = re.compile(
    r"""
    (?:
        0\d{2,4}                # STD code (02-05 digits with leading 0)
        [\s.\-]?
        \d{6,8}                 # 6-8 digit number
    )
    (?![0-9])
    """,
    re.VERBOSE
)


# =============================================================================
# UPI ID PATTERNS
# =============================================================================

# Valid UPI handles (banks and payment apps)
UPI_HANDLES = (
    "ybl", "paytm", "okaxis", "oksbi", "okhdfcbank", "okicici",
    "upi", "apl", "axisbank", "sbi", "hdfcbank", "icici", "ibl",
    "kotak", "indus", "federal", "pnb", "boi", "bob", "cbi",
    "rbl", "yes", "idbi", "abfspay", "axl", "pingpay", "gpay",
    "phonepe", "amazonpay", "freecharge", "mobikwik", "airtel",
    "jio", "slice", "jupiter", "fi", "niyopay", "postpay",
    "waicici", "wahdfcbank", "wasbi", "waaxis", "yapl", "idfcbank",
)

# UPI ID pattern: username@handle
UPI_PATTERN: Pattern[str] = re.compile(
    rf"""
    (?<![a-zA-Z0-9@])           # Not preceded by alphanumeric or @
    (
        [a-zA-Z0-9._-]{{3,50}}  # Username: 3-50 alphanumeric chars
        @
        (?:{'|'.join(UPI_HANDLES)})  # Valid UPI handle
    )
    (?![a-zA-Z0-9])             # Not followed by alphanumeric
    """,
    re.VERBOSE | re.IGNORECASE
)

# Generic UPI pattern (may catch some false positives)
UPI_PATTERN_GENERIC: Pattern[str] = re.compile(
    r"""
    (?<![a-zA-Z0-9@])
    (
        [a-zA-Z0-9._-]{3,50}
        @
        [a-zA-Z]{2,20}
    )
    (?![a-zA-Z0-9])
    """,
    re.VERBOSE | re.IGNORECASE
)


# =============================================================================
# BANK ACCOUNT PATTERNS
# =============================================================================

# Indian bank account: 9-18 digits
# Excludes patterns that look like phone numbers
BANK_ACCOUNT_PATTERN: Pattern[str] = re.compile(
    r"""
    (?<![0-9+])                 # Not preceded by digit or +
    (?!(?:\+91|91)?[6-9]\d{9})  # Not a phone number
    \(?                         # Optional opening parenthesis
    (
        \d{9,18}                # 9-18 digits
    )
    \)?                         # Optional closing parenthesis
    (?![0-9])                   # Not followed by digit
    """,
    re.VERBOSE
)

# Bank account with common prefixes/contexts
# Handles optional parentheses around the account number: (1234567890)
BANK_ACCOUNT_CONTEXT_PATTERN: Pattern[str] = re.compile(
    r"""
    (?:
        (?:a/?c|account|acct|acc)[\s.:]*(?:no\.?|number|num)?[\s.:]*
        |
        (?:bank\s*)?(?:a/?c|account)[\s.:]*
        |
        (?:transfer|send|pay)[\s\w]*(?:to)?[\s.:]*
    )
    [\s.:]*
    \(?                         # Optional opening parenthesis
    (\d{9,18})                  # Account number
    \)?                         # Optional closing parenthesis
    """,
    re.VERBOSE | re.IGNORECASE
)


# =============================================================================
# IFSC CODE PATTERNS
# =============================================================================

# IFSC: 4 letters + 0 + 6 alphanumeric
IFSC_PATTERN: Pattern[str] = re.compile(
    r"""
    (?<![A-Z0-9])               # Not preceded by alphanumeric
    (
        [A-Z]{4}                # 4 letter bank code
        0                       # Always 0 (reserved)
        [A-Z0-9]{6}             # 6 character branch code
    )
    (?![A-Z0-9])                # Not followed by alphanumeric
    """,
    re.VERBOSE | re.IGNORECASE
)

# IFSC with context
IFSC_CONTEXT_PATTERN: Pattern[str] = re.compile(
    r"""
    (?:
        ifsc[\s.:]*(?:code)?[\s.:]*
        |
        (?:branch|bank)[\s]*code[\s.:]*
    )
    ([A-Z]{4}0[A-Z0-9]{6})
    """,
    re.VERBOSE | re.IGNORECASE
)


# =============================================================================
# URL PATTERNS
# =============================================================================

# HTTP/HTTPS URLs
URL_PATTERN: Pattern[str] = re.compile(
    r"""
    (
        https?://               # Protocol
        (?:www\.)?              # Optional www
        [a-zA-Z0-9]             # Domain start
        [a-zA-Z0-9\-._~:/?#\[\]@!$&'()*+,;=%]*  # Rest of URL
    )
    """,
    re.VERBOSE | re.IGNORECASE
)

# Suspicious short URLs and link shorteners
SUSPICIOUS_URL_PATTERN: Pattern[str] = re.compile(
    r"""
    (
        https?://
        (?:
            bit\.ly|goo\.gl|t\.co|tinyurl\.com|
            is\.gd|cli\.gs|ow\.ly|j\.mp|
            buff\.ly|adf\.ly|bit\.do|mcaf\.ee|
            su\.pr|cutt\.ly|rb\.gy|shorturl\.at
        )
        /[a-zA-Z0-9]+
    )
    """,
    re.VERBOSE | re.IGNORECASE
)

# Phishing-like URLs (fake bank domains)
PHISHING_URL_PATTERN: Pattern[str] = re.compile(
    r"""
    https?://
    (?:
        [a-z]*(?:sbi|hdfc|icici|axis|pnb|bob|kotak|yes|idbi|rbl)[a-z]*
        |
        [a-z]*(?:bank|kyc|update|verify|secure|login|account)[a-z]*
    )
    \.
    (?!
        sbi\.co\.in|hdfcbank\.com|icicibank\.com|
        axisbank\.com|pnbindia\.in|bankofbaroda\.in
    )
    [a-z0-9\-]+\.
    (?:xyz|tk|ml|ga|cf|gq|top|pw|cc|club|site|online|live|info)
    """,
    re.VERBOSE | re.IGNORECASE
)


# =============================================================================
# EMAIL PATTERNS
# =============================================================================

EMAIL_PATTERN: Pattern[str] = re.compile(
    r"""
    (?<![a-zA-Z0-9._%+-])       # Not preceded by valid email chars
    (
        [a-zA-Z0-9._%+-]+       # Local part
        @
        [a-zA-Z0-9.-]+          # Domain
        \.
        [a-zA-Z]{2,}            # TLD
    )
    (?![a-zA-Z0-9])             # Not followed by alphanumeric
    """,
    re.VERBOSE
)


# =============================================================================
# AADHAAR PATTERNS (12 digits, optional spaces)
# =============================================================================

AADHAAR_PATTERN: Pattern[str] = re.compile(
    r"""
    (?<![0-9])
    (
        [2-9]\d{3}              # First 4 digits (starts with 2-9)
        [\s\-]?
        \d{4}                   # Middle 4 digits
        [\s\-]?
        \d{4}                   # Last 4 digits
    )
    (?![0-9])
    """,
    re.VERBOSE
)


# =============================================================================
# PAN CARD PATTERNS
# =============================================================================

PAN_PATTERN: Pattern[str] = re.compile(
    r"""
    (?<![A-Z0-9])
    (
        [A-Z]{3}                # First 3 letters (entity type)
        [PCHABGJLFT]            # 4th letter (holder type)
        [A-Z]                   # 5th letter (first letter of name)
        \d{4}                   # 4 digits
        [A-Z]                   # Check letter
    )
    (?![A-Z0-9])
    """,
    re.VERBOSE | re.IGNORECASE
)


# =============================================================================
# AMOUNT/MONEY PATTERNS (Indian Rupees)
# =============================================================================

AMOUNT_PATTERN: Pattern[str] = re.compile(
    r"""
    (?:
        (?:Rs\.?|₹|INR|Rupees?)[\s]*
    )?
    (
        \d{1,3}                 # 1-3 digits
        (?:,\d{2,3})*           # Indian numbering (lakhs, crores)
        (?:\.\d{1,2})?          # Optional decimals
    )
    (?:
        [\s]*(?:Rs\.?|₹|INR|Rupees?|/-|only)?
    )?
    """,
    re.VERBOSE | re.IGNORECASE
)


# =============================================================================
# OTP PATTERNS
# =============================================================================

OTP_PATTERN: Pattern[str] = re.compile(
    r"""
    (?:
        (?:otp|code|pin|password)[\s.:]*(?:is)?[\s.:]*
    )
    (\d{4,8})
    """,
    re.VERBOSE | re.IGNORECASE
)


# =============================================================================
# PATTERN REGISTRY (for iteration)
# =============================================================================

PATTERN_REGISTRY = {
    "phone": PHONE_PATTERN,
    "phone_flexible": PHONE_PATTERN_FLEXIBLE,
    "landline": LANDLINE_PATTERN,
    "upi": UPI_PATTERN,
    "upi_generic": UPI_PATTERN_GENERIC,
    "bank_account": BANK_ACCOUNT_PATTERN,
    "bank_account_context": BANK_ACCOUNT_CONTEXT_PATTERN,
    "ifsc": IFSC_PATTERN,
    "ifsc_context": IFSC_CONTEXT_PATTERN,
    "url": URL_PATTERN,
    "suspicious_url": SUSPICIOUS_URL_PATTERN,
    "phishing_url": PHISHING_URL_PATTERN,
    "email": EMAIL_PATTERN,
    "aadhaar": AADHAAR_PATTERN,
    "pan": PAN_PATTERN,
    "amount": AMOUNT_PATTERN,
    "otp": OTP_PATTERN,
}
