"""
Intelligence Domain Models.

This module defines Pydantic models for extracted intelligence entities
including bank accounts, UPI IDs, phone numbers, and phishing links.
"""

from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field, field_validator


class BankAccount(BaseModel):
    """
    Extracted bank account information.
    
    Attributes:
        account_number: Bank account number (9-18 digits).
        ifsc_code: IFSC code for the bank branch.
        bank_name: Name of the bank (if identified).
        confidence: Extraction confidence score (0-1).
        extracted_at_turn: Turn number when extracted.
    """
    
    account_number: str = Field(
        ...,
        min_length=9,
        max_length=18,
        description="Bank account number",
        examples=["1234567890123456"],
    )
    
    ifsc_code: Optional[str] = Field(
        default=None,
        pattern=r"^[A-Z]{4}0[A-Z0-9]{6}$",
        description="IFSC code (format: XXXX0XXXXXX)",
        examples=["HDFC0001234"],
    )
    
    bank_name: Optional[str] = Field(
        default=None,
        description="Bank name if identified",
        examples=["HDFC Bank", "State Bank of India"],
    )
    
    confidence: float = Field(
        default=0.9,
        ge=0.0,
        le=1.0,
        description="Extraction confidence score",
    )
    
    extracted_at_turn: Optional[int] = Field(
        default=None,
        description="Conversation turn when extracted",
    )
    
    @field_validator("account_number")
    @classmethod
    def validate_account_number(cls, v: str) -> str:
        """Validate account number contains only digits."""
        if not v.isdigit():
            raise ValueError("Account number must contain only digits")
        return v


class UPIId(BaseModel):
    """
    Extracted UPI ID information.
    
    Attributes:
        id: UPI ID (format: user@handle).
        confidence: Extraction confidence score (0-1).
        extracted_at_turn: Turn number when extracted.
    """
    
    id: str = Field(
        ...,
        pattern=r"^[a-zA-Z0-9._-]+@[a-zA-Z]+$",
        description="UPI ID (format: user@handle)",
        examples=["scammer@ybl", "fraud@paytm"],
    )
    
    confidence: float = Field(
        default=0.9,
        ge=0.0,
        le=1.0,
        description="Extraction confidence score",
    )
    
    extracted_at_turn: Optional[int] = Field(
        default=None,
        description="Conversation turn when extracted",
    )


class PhoneNumber(BaseModel):
    """
    Extracted phone number information.
    
    Attributes:
        number: Phone number (Indian format).
        type: Phone type (mobile or landline).
        confidence: Extraction confidence score (0-1).
        extracted_at_turn: Turn number when extracted.
    """
    
    number: str = Field(
        ...,
        description="Phone number",
        examples=["+91-9876543210", "9876543210"],
    )
    
    type: str = Field(
        default="mobile",
        description="Phone type (mobile or landline)",
    )
    
    confidence: float = Field(
        default=0.9,
        ge=0.0,
        le=1.0,
        description="Extraction confidence score",
    )
    
    extracted_at_turn: Optional[int] = Field(
        default=None,
        description="Conversation turn when extracted",
    )
    
    @field_validator("number")
    @classmethod
    def normalize_phone_number(cls, v: str) -> str:
        """Normalize phone number format."""
        # Remove spaces and dashes
        cleaned = v.replace(" ", "").replace("-", "")
        
        # Add +91 prefix if not present
        if cleaned.startswith("0"):
            cleaned = "+91" + cleaned[1:]
        elif not cleaned.startswith("+"):
            if len(cleaned) == 10:
                cleaned = "+91" + cleaned
        
        return cleaned


class PhishingLink(BaseModel):
    """
    Extracted phishing link information.
    
    Attributes:
        url: Full URL of the phishing link.
        domain: Domain name extracted from URL.
        confidence: Extraction confidence score (0-1).
        extracted_at_turn: Turn number when extracted.
    """
    
    url: str = Field(
        ...,
        description="Full phishing URL",
        examples=["http://fake-bank.xyz/login"],
    )
    
    domain: Optional[str] = Field(
        default=None,
        description="Domain name",
        examples=["fake-bank.xyz"],
    )
    
    confidence: float = Field(
        default=0.9,
        ge=0.0,
        le=1.0,
        description="Extraction confidence score",
    )
    
    extracted_at_turn: Optional[int] = Field(
        default=None,
        description="Conversation turn when extracted",
    )


class OtherIntel(BaseModel):
    """
    Other extracted intelligence.
    
    Attributes:
        type: Type of intelligence (email, aadhaar, pan, name, etc.).
        value: Extracted value.
        confidence: Extraction confidence score (0-1).
    """
    
    type: str = Field(
        ...,
        description="Type of intelligence",
        examples=["email", "aadhaar", "pan", "name"],
    )
    
    value: str = Field(
        ...,
        description="Extracted value",
    )
    
    confidence: float = Field(
        default=0.9,
        ge=0.0,
        le=1.0,
        description="Extraction confidence score",
    )


class ExtractedIntelligence(BaseModel):
    """
    Complete extracted intelligence from a session.
    
    Aggregates all extracted entities including bank accounts,
    UPI IDs, phone numbers, phishing links, and other intel.
    
    Attributes:
        bank_accounts: List of extracted bank accounts.
        upi_ids: List of extracted UPI IDs.
        phone_numbers: List of extracted phone numbers.
        phishing_links: List of extracted phishing links.
        other_intel: List of other extracted intelligence.
        total_entities: Total count of extracted entities.
        extraction_method: Method used for extraction.
    """
    
    bank_accounts: List[BankAccount] = Field(
        default_factory=list,
        description="Extracted bank accounts",
    )
    
    upi_ids: List[UPIId] = Field(
        default_factory=list,
        description="Extracted UPI IDs",
    )
    
    phone_numbers: List[PhoneNumber] = Field(
        default_factory=list,
        description="Extracted phone numbers",
    )
    
    phishing_links: List[PhishingLink] = Field(
        default_factory=list,
        description="Extracted phishing links",
    )
    
    other_intel: List[OtherIntel] = Field(
        default_factory=list,
        description="Other extracted intelligence",
    )
    
    total_entities: Optional[int] = Field(
        default=None,
        description="Total entities extracted",
    )
    
    extraction_method: str = Field(
        default="hybrid",
        description="Extraction method (regex, llm, hybrid)",
    )
    
    def model_post_init(self, __context: Any) -> None:
        """Calculate total entities after initialization."""
        if self.total_entities is None:
            self.total_entities = (
                len(self.bank_accounts) +
                len(self.upi_ids) +
                len(self.phone_numbers) +
                len(self.phishing_links) +
                len(self.other_intel)
            )
    
    @classmethod
    def empty(cls) -> "ExtractedIntelligence":
        """Create an empty intelligence object."""
        return cls(
            bank_accounts=[],
            upi_ids=[],
            phone_numbers=[],
            phishing_links=[],
            other_intel=[],
            total_entities=0,
        )
    
    def is_empty(self) -> bool:
        """Check if no intelligence has been extracted."""
        return (
            len(self.bank_accounts) == 0 and
            len(self.upi_ids) == 0 and
            len(self.phone_numbers) == 0 and
            len(self.phishing_links) == 0 and
            len(self.other_intel) == 0
        )
    
    def merge(self, other: "ExtractedIntelligence") -> "ExtractedIntelligence":
        """
        Merge another intelligence object into this one.
        
        Args:
            other: Intelligence to merge.
        
        Returns:
            ExtractedIntelligence: New merged object.
        """
        return ExtractedIntelligence(
            bank_accounts=self.bank_accounts + other.bank_accounts,
            upi_ids=self.upi_ids + other.upi_ids,
            phone_numbers=self.phone_numbers + other.phone_numbers,
            phishing_links=self.phishing_links + other.phishing_links,
            other_intel=self.other_intel + other.other_intel,
        )
    
    class Config:
        json_schema_extra = {
            "example": {
                "bank_accounts": [
                    {"account_number": "1234567890123456", "ifsc_code": "HDFC0001234", "confidence": 0.95}
                ],
                "upi_ids": [
                    {"id": "scammer@ybl", "confidence": 0.98}
                ],
                "phone_numbers": [
                    {"number": "+91-9876543210", "type": "mobile", "confidence": 0.99}
                ],
                "phishing_links": [
                    {"url": "http://fake-bank.xyz/login", "domain": "fake-bank.xyz", "confidence": 0.97}
                ],
                "other_intel": [],
                "total_entities": 4,
                "extraction_method": "hybrid"
            }
        }
