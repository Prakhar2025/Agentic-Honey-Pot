"""
Quick test for pre-event optimizations.
Tests edge cases for intelligence extraction and scam detection.
"""

import asyncio
from app.intelligence.extractor import IntelligenceExtractor
from app.scam_detection.detector import ScamDetector


async def test_extraction():
    """Test intelligence extraction edge cases."""
    print("="*60)
    print("TESTING: Intelligence Extraction Edge Cases")
    print("="*60)
    
    extractor = IntelligenceExtractor()
    
    tests = [
        "Call (9876543210) now",
        "Send to [+91-9876-543210]",
        "Account [1234567890123]",
        "UPI: scammer@okaxis, phone +91-98765-43210",
        "Transfer to user@paytm or (9876543210)",
    ]
    
    for t in tests:
        result = extractor.extract_all(t)
        print(f"\n{t!r}")
        print(f"  Phones: {[p['number'] for p in result['phone_numbers']]}")
        print(f"  UPIs: {[u['id'] for u in result['upi_ids']]}")
        print(f"  Accounts: {[a['account_number'] for a in result['bank_accounts']]}")


async def test_scam_detection():
    """Test scam detection with fallback keywords."""
    print("\n" + "="*60)
    print("TESTING: Scam Detection (with fallback keywords)")
    print("="*60)
    
    detector = ScamDetector()
    
    tests = [
        "Your card will expire soon",
        "Verify your UPI pin immediately",
        "Hello, how are you?",
        "Your account is blocked, verify KYC",
        "Share OTP to verify",
    ]
    
    for t in tests:
        is_scam, scam_type, conf = await detector.is_scam(t)
        print(f"\n{t!r}")
        print(f"  Scam: {is_scam}, Type: {scam_type}, Confidence: {conf:.0%}")


async def main():
    await test_extraction()
    await test_scam_detection()
    print("\n" + "="*60)
    print("✅ All tests completed!")
    print("="*60)


if __name__ == "__main__":
    asyncio.run(main())
