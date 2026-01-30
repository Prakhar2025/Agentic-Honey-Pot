"""
Pytest Configuration and Fixtures.

This module provides shared fixtures for all tests.
"""

import asyncio
from typing import AsyncGenerator, Generator

import pytest
import pytest_asyncio
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from app.config import Settings


@pytest.fixture(scope="session")
def event_loop() -> Generator[asyncio.AbstractEventLoop, None, None]:
    """Create an event loop for async tests."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="session")
def test_settings() -> Settings:
    """Provide test settings with mock values."""
    return Settings(
        groq_api_key="test_groq_key_12345",
        api_key="ss_test_api_key",
        environment="development",
        database_url="sqlite:///./test_data/test.db",
        max_turns=5,
        default_persona="elderly_victim",
        log_level="DEBUG",
        log_json=False,
    )


@pytest.fixture
def sample_scam_messages() -> list[dict]:
    """Provide sample scam messages for testing."""
    return [
        {
            "message": "Dear Customer, Your SBI account will be blocked! Update KYC immediately: http://sbi-kyc-update.xyz",
            "expected_type": "KYC_PHISHING",
            "expected_is_scam": True,
        },
        {
            "message": "Congratulations! You won Rs. 50,00,000 in Amazon Lucky Draw. Claim now: http://amaz0n-prize.xyz",
            "expected_type": "LOTTERY_PRIZE",
            "expected_is_scam": True,
        },
        {
            "message": "Invest ₹10,000 today, get ₹1,00,000 in 30 days! Guaranteed returns. WhatsApp 9876543210",
            "expected_type": "INVESTMENT_FRAUD",
            "expected_is_scam": True,
        },
        {
            "message": "Your order #12345 has been shipped. Track at official-amazon.in/track",
            "expected_type": None,
            "expected_is_scam": False,
        },
    ]


@pytest.fixture
def sample_intelligence_data() -> dict:
    """Provide sample extracted intelligence for testing."""
    return {
        "bank_accounts": [
            {"account_number": "1234567890123456", "ifsc_code": "HDFC0001234", "confidence": 0.95}
        ],
        "upi_ids": [
            {"id": "scammer@ybl", "confidence": 0.98}
        ],
        "phone_numbers": [
            {"number": "+91-9876543210", "confidence": 0.99}
        ],
        "phishing_links": [
            {"url": "http://fake-bank.xyz/login", "domain": "fake-bank.xyz", "confidence": 0.97}
        ],
    }


@pytest.fixture
def sample_session_data() -> dict:
    """Provide sample session data for testing."""
    return {
        "session_id": "sess_test_12345",
        "status": "ONGOING",
        "scam_type": "KYC_PHISHING",
        "persona_used": "elderly_victim",
        "turn_count": 0,
    }
