"""
Intelligence Extractor.

This module provides the main intelligence extraction engine for
identifying financial entities in scam messages. It uses regex
patterns optimized for Indian context and validates extracted data.

Usage:
    from app.intelligence.extractor import IntelligenceExtractor
    
    extractor = IntelligenceExtractor()
    intel = extractor.extract_all("Send money to 9876543210 or scammer@ybl")
    print(intel)
    # {
    #     "phone_numbers": [{"number": "+919876543210", "confidence": 0.95}],
    #     "upi_ids": [{"id": "scammer@ybl", "confidence": 0.92}],
    #     ...
    # }
"""

import logging
import re
from typing import Any, Dict, List, Optional, Set, Tuple

from app.intelligence.patterns import (
    AADHAAR_PATTERN,
    BANK_ACCOUNT_CONTEXT_PATTERN,
    BANK_ACCOUNT_PATTERN,
    EMAIL_PATTERN,
    IFSC_CONTEXT_PATTERN,
    IFSC_PATTERN,
    PAN_PATTERN,
    PHONE_PATTERN,
    PHONE_PATTERN_FLEXIBLE,
    PHISHING_URL_PATTERN,
    SUSPICIOUS_URL_PATTERN,
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

logger = logging.getLogger(__name__)


class IntelligenceExtractor:
    """
    Main intelligence extraction engine.
    
    Extracts financial entities from text using regex patterns
    optimized for Indian scam messages. Supports:
    - Phone numbers (Indian mobile format)
    - UPI IDs (all major payment apps)
    - Bank account numbers (9-18 digits)
    - IFSC codes (bank branch codes)
    - Phishing URLs (suspicious domains)
    - Emails
    - Aadhaar numbers (12 digits)
    - PAN numbers
    
    Example:
        extractor = IntelligenceExtractor()
        
        # Extract from single message
        intel = extractor.extract_all("Pay to 9876543210 or scammer@ybl")
        
        # Extract from conversation
        intel = extractor.extract_from_conversation([
            {"role": "scammer", "content": "Send ₹500 to scammer@ybl"},
            {"role": "agent", "content": "What is your account number?"},
            {"role": "scammer", "content": "HDFC account 12345678901234"}
        ])
    """
    
    def __init__(self) -> None:
        """Initialize the extractor."""
        self._extracted_phones: Set[str] = set()
        self._extracted_upis: Set[str] = set()
        self._extracted_accounts: Set[str] = set()
    
    def extract_all(
        self,
        text: str,
        include_low_confidence: bool = False,
    ) -> Dict[str, Any]:
        """
        Extract all intelligence from text.
        
        Args:
            text: Text to extract from.
            include_low_confidence: Include lower confidence extractions.
        
        Returns:
            Dict[str, Any]: Extracted intelligence.
        
        Example:
            >>> extractor = IntelligenceExtractor()
            >>> result = extractor.extract_all("Call 9876543210 or pay to user@ybl")
            >>> len(result["phone_numbers"])
            1
            >>> len(result["upi_ids"])
            1
        """
        if not text:
            return self._empty_result()
        
        logger.debug(f"Extracting intelligence from text ({len(text)} chars)")
        
        # Extract all entity types
        phone_numbers = self.extract_phone_numbers(text)
        upi_ids = self.extract_upi_ids(text)
        bank_accounts = self.extract_bank_accounts(text, phone_numbers)
        ifsc_codes = self.extract_ifsc_codes(text)
        urls = self.extract_urls(text)
        emails = self.extract_emails(text)
        other = self.extract_other(text)
        
        # Filter low confidence if needed
        if not include_low_confidence:
            phone_numbers = [p for p in phone_numbers if p.get("confidence", 0) >= 0.7]
            upi_ids = [u for u in upi_ids if u.get("confidence", 0) >= 0.7]
            bank_accounts = [b for b in bank_accounts if b.get("confidence", 0) >= 0.7]
        
        # Build result
        result = {
            "phone_numbers": phone_numbers,
            "upi_ids": upi_ids,
            "bank_accounts": bank_accounts,
            "ifsc_codes": ifsc_codes,
            "phishing_links": urls,
            "emails": emails,
            "other_intel": other,
            "total_entities": (
                len(phone_numbers) + len(upi_ids) + len(bank_accounts) +
                len(ifsc_codes) + len(urls) + len(emails) + len(other)
            ),
            "extraction_method": "regex",
        }
        
        logger.info(
            f"Extracted {result['total_entities']} entities: "
            f"{len(phone_numbers)} phones, {len(upi_ids)} UPIs, "
            f"{len(bank_accounts)} accounts, {len(urls)} URLs"
        )
        
        return result
    
    def extract_phone_numbers(self, text: str) -> List[Dict[str, Any]]:
        """
        Extract Indian phone numbers from text.
        
        Args:
            text: Text to extract from.
        
        Returns:
            List[Dict[str, Any]]: List of phone number objects.
        
        Example:
            >>> extractor = IntelligenceExtractor()
            >>> phones = extractor.extract_phone_numbers("Call +91 98765 43210")
            >>> phones[0]["number"]
            "+919876543210"
        """
        results: List[Dict[str, Any]] = []
        seen: Set[str] = set()
        
        # PRIMARY: Standard phone pattern
        for match in PHONE_PATTERN.finditer(text):
            raw = match.group(0)
            normalized = normalize_phone(raw)
            
            if normalized and normalized not in seen:
                seen.add(normalized)
                
                # Get surrounding context
                start = max(0, match.start() - 50)
                end = min(len(text), match.end() + 50)
                context = text[start:end]
                
                results.append({
                    "number": normalized,
                    "raw": raw,
                    "confidence": calculate_entity_confidence("phone", normalized, context),
                    "type": "mobile",
                })
        
        # FLEXIBLE: Noisy text with separators
        for match in PHONE_PATTERN_FLEXIBLE.finditer(text):
            raw = match.group(0)
            # Clean up the match
            cleaned = re.sub(r"[\s.\-]", "", raw)
            normalized = normalize_phone(cleaned)
            
            if normalized and normalized not in seen:
                seen.add(normalized)
                results.append({
                    "number": normalized,
                    "raw": raw,
                    "confidence": 0.75,  # Lower confidence for flexible match
                    "type": "mobile",
                })
        
        # EDGE CASE: Numbers in parentheses/brackets - (9876543210) or [+91-9876-543210]
        bracket_pattern = re.compile(r'[\(\[][\s]*([\+\d\s\-().]+?)[\s]*[\)\]]')
        for match in bracket_pattern.finditer(text):
            raw = match.group(1)
            # Normalize: remove separators
            cleaned = re.sub(r'[\s\-().]', '', raw)
            
            # Check if it has enough digits to be a phone number
            digit_only = re.sub(r'\D', '', cleaned)
            if len(digit_only) >= 10:
                normalized = normalize_phone(cleaned)
                if normalized and normalized not in seen:
                    seen.add(normalized)
                    results.append({
                        "number": normalized,
                        "raw": match.group(0),  # Include brackets in raw
                        "confidence": 0.80,  # Medium-high confidence
                        "type": "mobile",
                    })
        
        # NORMALIZATION FALLBACK: Create normalized version of entire text and re-scan
        # This catches numbers with unusual separators
        text_normalized = re.sub(r'[-()\s]', '', text)
        if text_normalized != text:
            # Only re-scan if normalization changed something
            for match in PHONE_PATTERN.finditer(text_normalized):
                raw = match.group(0)
                normalized = normalize_phone(raw)
                
                if normalized and normalized not in seen:
                    seen.add(normalized)
                    results.append({
                        "number": normalized,
                        "raw": raw,
                        "confidence": 0.70,  # Lower confidence for normalized scan
                        "type": "mobile",
                    })
        
        return results
    
    def extract_upi_ids(self, text: str) -> List[Dict[str, Any]]:
        """
        Extract UPI IDs from text.
        
        Args:
            text: Text to extract from.
        
        Returns:
            List[Dict[str, Any]]: List of UPI ID objects.
        
        Example:
            >>> extractor = IntelligenceExtractor()
            >>> upis = extractor.extract_upi_ids("Pay to scammer@ybl or fraud@paytm")
            >>> len(upis)
            2
        """
        results: List[Dict[str, Any]] = []
        seen: Set[str] = set()
        
        # Primary pattern (known handles)
        for match in UPI_PATTERN.finditer(text):
            raw = match.group(1)
            normalized = normalize_upi(raw)
            
            if normalized and normalized not in seen:
                seen.add(normalized)
                results.append({
                    "id": normalized,
                    "raw": raw,
                    "confidence": 0.92,  # High confidence for known handle
                })
        
        # Generic pattern (any handle)
        for match in UPI_PATTERN_GENERIC.finditer(text):
            raw = match.group(1)
            normalized = normalize_upi(raw)
            
            if normalized and normalized not in seen:
                # Exclude emails
                if validate_email(raw):
                    continue
                
                seen.add(normalized)
                confidence = 0.75 if validate_upi_loose(raw) else 0.6
                results.append({
                    "id": normalized,
                    "raw": raw,
                    "confidence": confidence,
                })
        
        return results
    
    def extract_bank_accounts(
        self,
        text: str,
        phone_numbers: Optional[List[Dict[str, Any]]] = None,
    ) -> List[Dict[str, Any]]:
        """
        Extract bank account numbers from text.
        
        Filters out phone numbers to avoid false positives.
        
        Args:
            text: Text to extract from.
            phone_numbers: Already extracted phone numbers to exclude.
        
        Returns:
            List[Dict[str, Any]]: List of bank account objects.
        
        Example:
            >>> extractor = IntelligenceExtractor()
            >>> accounts = extractor.extract_bank_accounts("A/C: 12345678901234")
            >>> len(accounts)
            1
        """
        results: List[Dict[str, Any]] = []
        seen: Set[str] = set()
        
        # Build set of phone numbers to exclude
        phone_set: Set[str] = set()
        if phone_numbers:
            for phone in phone_numbers:
                # Add raw digits
                raw_digits = re.sub(r"\D", "", phone.get("raw", ""))
                if len(raw_digits) >= 10:
                    phone_set.add(raw_digits[-10:])
        
        # Context-based pattern (higher confidence)
        for match in BANK_ACCOUNT_CONTEXT_PATTERN.finditer(text):
            raw = match.group(1)
            normalized = normalize_bank_account(raw)
            
            if not normalized or normalized in seen:
                continue
            
            # Skip if it looks like a phone number
            if normalized[-10:] in phone_set:
                continue
            
            seen.add(normalized)
            results.append({
                "account_number": normalized,
                "raw": raw,
                "confidence": 0.88,  # Higher for context match
                "ifsc_code": None,
                "bank_name": None,
            })
        
        # General pattern
        for match in BANK_ACCOUNT_PATTERN.finditer(text):
            raw = match.group(1)
            normalized = normalize_bank_account(raw)
            
            if not normalized or normalized in seen:
                continue
            
            # Skip if looks like phone number
            if len(normalized) == 10 and normalized[0] in "6789":
                continue
            
            if normalized[-10:] in phone_set:
                continue
            
            seen.add(normalized)
            results.append({
                "account_number": normalized,
                "raw": raw,
                "confidence": 0.72,
                "ifsc_code": None,
                "bank_name": None,
            })
        
        return results
    
    def extract_ifsc_codes(self, text: str) -> List[Dict[str, Any]]:
        """
        Extract IFSC codes from text.
        
        Args:
            text: Text to extract from.
        
        Returns:
            List[Dict[str, Any]]: List of IFSC code objects.
        
        Example:
            >>> extractor = IntelligenceExtractor()
            >>> codes = extractor.extract_ifsc_codes("IFSC: HDFC0001234")
            >>> codes[0]["code"]
            "HDFC0001234"
        """
        results: List[Dict[str, Any]] = []
        seen: Set[str] = set()
        
        # Context-based pattern (higher confidence)
        for match in IFSC_CONTEXT_PATTERN.finditer(text):
            raw = match.group(1)
            normalized = normalize_ifsc(raw)
            
            if normalized and normalized not in seen:
                seen.add(normalized)
                results.append({
                    "code": normalized,
                    "raw": raw,
                    "confidence": 0.95,
                    "bank_code": normalized[:4],
                })
        
        # General pattern
        for match in IFSC_PATTERN.finditer(text):
            raw = match.group(1) if match.lastindex else match.group(0)
            normalized = normalize_ifsc(raw)
            
            if normalized and normalized not in seen:
                seen.add(normalized)
                results.append({
                    "code": normalized,
                    "raw": raw,
                    "confidence": 0.85,
                    "bank_code": normalized[:4],
                })
        
        return results
    
    def extract_urls(self, text: str) -> List[Dict[str, Any]]:
        """
        Extract URLs from text and classify as suspicious/phishing.
        
        Args:
            text: Text to extract from.
        
        Returns:
            List[Dict[str, Any]]: List of URL objects with suspicion flags.
        
        Example:
            >>> extractor = IntelligenceExtractor()
            >>> urls = extractor.extract_urls("Click http://fake-sbi.xyz/login")
            >>> urls[0]["is_suspicious"]
            True
        """
        results: List[Dict[str, Any]] = []
        seen: Set[str] = set()
        
        for match in URL_PATTERN.finditer(text):
            url = match.group(1)
            
            if url in seen:
                continue
            
            seen.add(url)
            
            # Check if suspicious
            is_suspicious, reason = is_suspicious_url(url)
            
            # Extract domain
            domain_match = re.search(r"https?://([^/]+)", url)
            domain = domain_match.group(1) if domain_match else None
            
            results.append({
                "url": url,
                "domain": domain,
                "is_suspicious": is_suspicious,
                "suspicion_reason": reason if is_suspicious else None,
                "confidence": 0.95 if is_suspicious else 0.7,
            })
        
        return results
    
    def extract_emails(self, text: str) -> List[Dict[str, Any]]:
        """
        Extract email addresses from text.
        
        Args:
            text: Text to extract from.
        
        Returns:
            List[Dict[str, Any]]: List of email objects.
        """
        results: List[Dict[str, Any]] = []
        seen: Set[str] = set()
        
        for match in EMAIL_PATTERN.finditer(text):
            email = match.group(1).lower()
            
            if email in seen:
                continue
            
            if not validate_email(email):
                continue
            
            seen.add(email)
            results.append({
                "email": email,
                "confidence": 0.85,
            })
        
        return results
    
    def extract_other(self, text: str) -> List[Dict[str, Any]]:
        """
        Extract other entities (Aadhaar, PAN).
        
        Args:
            text: Text to extract from.
        
        Returns:
            List[Dict[str, Any]]: List of other intel objects.
        """
        results: List[Dict[str, Any]] = []
        
        # Aadhaar numbers
        for match in AADHAAR_PATTERN.finditer(text):
            raw = match.group(1)
            cleaned = re.sub(r"[\s\-]", "", raw)
            
            if validate_aadhaar(cleaned):
                # Mask for privacy
                masked = cleaned[:4] + "XXXX" + cleaned[-4:]
                results.append({
                    "type": "aadhaar",
                    "value": masked,
                    "confidence": 0.8,
                })
        
        # PAN numbers
        for match in PAN_PATTERN.finditer(text):
            raw = match.group(1).upper()
            
            if validate_pan(raw):
                results.append({
                    "type": "pan",
                    "value": raw,
                    "confidence": 0.85,
                })
        
        return results
    
    def extract_from_conversation(
        self,
        messages: List[Dict[str, str]],
        scammer_only: bool = True,
    ) -> Dict[str, Any]:
        """
        Extract intelligence from a conversation.
        
        Args:
            messages: List of message dicts with 'role' and 'content'.
            scammer_only: Only extract from scammer messages.
        
        Returns:
            Dict[str, Any]: Aggregated intelligence from all messages.
        """
        combined_text = ""
        
        for msg in messages:
            role = msg.get("role", "").lower()
            content = msg.get("content", "")
            
            if scammer_only and role not in ["scammer", "user"]:
                continue
            
            combined_text += " " + content
        
        return self.extract_all(combined_text.strip())
    
    def calculate_confidence(self, extracted_data: Dict[str, Any]) -> float:
        """
        Calculate overall confidence score for extracted data.
        
        Args:
            extracted_data: Extracted intelligence dictionary.
        
        Returns:
            float: Overall confidence score (0.0 - 1.0).
        """
        confidences: List[float] = []
        
        for key in ["phone_numbers", "upi_ids", "bank_accounts", "ifsc_codes",
                    "phishing_links", "emails", "other_intel"]:
            for item in extracted_data.get(key, []):
                conf = item.get("confidence")
                if conf is not None:
                    confidences.append(conf)
        
        if not confidences:
            return 0.0
        
        # Weighted average - more entities = more confidence
        base_confidence = sum(confidences) / len(confidences)
        entity_bonus = min(0.1, len(confidences) * 0.02)
        
        return round(min(0.99, base_confidence + entity_bonus), 2)
    
    def _empty_result(self) -> Dict[str, Any]:
        """Return empty extraction result."""
        return {
            "phone_numbers": [],
            "upi_ids": [],
            "bank_accounts": [],
            "ifsc_codes": [],
            "phishing_links": [],
            "emails": [],
            "other_intel": [],
            "total_entities": 0,
            "extraction_method": "regex",
        }
    
    def reset(self) -> None:
        """Reset extractor state."""
        self._extracted_phones.clear()
        self._extracted_upis.clear()
        self._extracted_accounts.clear()


# Singleton instance
_extractor_instance: Optional[IntelligenceExtractor] = None


def get_extractor() -> IntelligenceExtractor:
    """
    Get or create singleton extractor instance.
    
    Returns:
        IntelligenceExtractor: Shared extractor instance.
    """
    global _extractor_instance
    if _extractor_instance is None:
        _extractor_instance = IntelligenceExtractor()
    return _extractor_instance
