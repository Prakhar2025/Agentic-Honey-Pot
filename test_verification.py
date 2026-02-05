"""
Quick test script to verify the extraction and orchestrator work correctly.
Simulates what the hackathon evaluator will do.
"""

import asyncio
import json
import sys
sys.path.insert(0, '.')

from app.intelligence.extractor import IntelligenceExtractor
from app.intelligence.validators import validate_phone, validate_bank_account


def test_extraction():
    """Test the extraction patterns with sample scam messages."""
    print("=" * 60)
    print("TESTING INTELLIGENCE EXTRACTION")
    print("=" * 60)
    
    extractor = IntelligenceExtractor()
    
    # Test cases from real scam messages
    test_cases = [
        {
            "name": "Phone number extraction",
            "text": "Your KYC is expiring. Call +91-9876543210 to update.",
            "expected_phones": 1,
            "expected_accounts": 0,
        },
        {
            "name": "16-digit bank account",
            "text": "Transfer money to account number 1234567890123456",
            "expected_phones": 0,
            "expected_accounts": 1,
        },
        {
            "name": "Bank account with context",
            "text": "Send to A/C: 12345678901234",
            "expected_phones": 0,
            "expected_accounts": 1,
        },
        {
            "name": "UPI extraction",
            "text": "Pay to fraudster@ybl or scammer@paytm",
            "expected_phones": 0,
            "expected_upis": 2,
        },
        {
            "name": "Mixed entities",
            "text": "Call 9876543210, pay to user@ybl, or transfer to A/C 12345678901234567",
            "expected_phones": 1,
            "expected_upis": 1,
            "expected_accounts": 1,
        },
        {
            "name": "Phone should NOT be extracted as bank account",
            "text": "Contact 9876543210 for help",
            "expected_phones": 1,
            "expected_accounts": 0,  # Should NOT extract as bank account
        },
    ]
    
    all_passed = True
    
    for case in test_cases:
        print(f"\n[TEST] {case['name']}")
        print(f"   Input: {case['text']}")
        
        result = extractor.extract_all(case["text"])
        
        # Check phones
        if "expected_phones" in case:
            actual = len(result["phone_numbers"])
            expected = case["expected_phones"]
            status = "[PASS]" if actual == expected else "[FAIL]"
            if actual != expected:
                all_passed = False
            print(f"   {status} Phones: {actual} (expected {expected})")
            if result["phone_numbers"]:
                for p in result["phone_numbers"]:
                    print(f"       -> {p['number']}")
        
        # Check bank accounts
        if "expected_accounts" in case:
            actual = len(result["bank_accounts"])
            expected = case["expected_accounts"]
            status = "[PASS]" if actual == expected else "[FAIL]"
            if actual != expected:
                all_passed = False
            print(f"   {status} Bank Accounts: {actual} (expected {expected})")
            if result["bank_accounts"]:
                for b in result["bank_accounts"]:
                    print(f"       -> {b['account_number']}")
        
        # Check UPIs
        if "expected_upis" in case:
            actual = len(result["upi_ids"])
            expected = case["expected_upis"]
            status = "[PASS]" if actual == expected else "[FAIL]"
            if actual != expected:
                all_passed = False
            print(f"   {status} UPI IDs: {actual} (expected {expected})")
            if result["upi_ids"]:
                for u in result["upi_ids"]:
                    print(f"       -> {u['id']}")
    
    print("\n" + "=" * 60)
    if all_passed:
        print("[PASS] ALL EXTRACTION TESTS PASSED!")
    else:
        print("[FAIL] SOME TESTS FAILED!")
    print("=" * 60)
    
    return all_passed


def test_phone_validation():
    """Test phone validation specifically."""
    print("\n" + "=" * 60)
    print("TESTING PHONE NUMBER VALIDATION")
    print("=" * 60)
    
    test_cases = [
        ("+919876543210", True, "Valid +91 format"),
        ("9876543210", True, "Valid 10 digits"),
        ("91-9876543210", True, "Valid with 91 prefix"),
        ("1234567890", False, "Invalid - starts with 1"),
        ("5555555555", False, "Invalid - starts with 5"),
        ("9876543", False, "Invalid - too short"),
        ("98765432101234", False, "Invalid - too long"),
    ]
    
    all_passed = True
    for phone, expected, desc in test_cases:
        result = validate_phone(phone)
        status = "[PASS]" if result == expected else "[FAIL]"
        if result != expected:
            all_passed = False
        print(f"   {status} {phone}: {result} (expected {expected}) - {desc}")
    
    return all_passed


def test_bank_account_validation():
    """Test bank account validation to ensure no phone hallucination."""
    print("\n" + "=" * 60)
    print("TESTING BANK ACCOUNT VALIDATION (vs Phone)")
    print("=" * 60)
    
    test_cases = [
        ("1234567890123", True, 13, "Valid 13-digit account"),
        ("1234567890123456", True, 16, "Valid 16-digit account"),
        ("123456789", True, 9, "Valid 9-digit account"),
        ("9876543210", False, 10, "INVALID - looks like phone number (starts with 9)"),
        ("6789012345", False, 10, "INVALID - looks like phone number (starts with 6)"),
        ("1234567890", True, 10, "Valid - 10 digits but starts with 1 (not phone)"),
    ]
    
    all_passed = True
    for account, expected, digits, desc in test_cases:
        result = validate_bank_account(account)
        status = "[PASS]" if result == expected else "[FAIL]"
        if result != expected:
            all_passed = False
        print(f"   {status} {account} ({digits} digits): {result} (expected {expected}) - {desc}")
    
    return all_passed


if __name__ == "__main__":
    print("\nSCAMSHIELD HONEYPOT - BACKEND VERIFICATION TEST")
    print("=" * 60)
    
    tests = [
        ("Extraction", test_extraction),
        ("Phone Validation", test_phone_validation),
        ("Bank Account Validation", test_bank_account_validation),
    ]
    
    results = []
    for name, func in tests:
        try:
            passed = func()
            results.append((name, passed))
        except Exception as e:
            print(f"\n[ERROR] in {name}: {e}")
            results.append((name, False))
    
    print("\n" + "=" * 60)
    print("FINAL RESULTS:")
    print("=" * 60)
    
    all_passed = True
    for name, passed in results:
        status = "[PASS]" if passed else "[FAIL]"
        if not passed:
            all_passed = False
        print(f"   {status}: {name}")
    
    print("\n" + "=" * 60)
    if all_passed:
        print(">>> ALL TESTS PASSED - READY FOR HACKATHON! <<<")
    else:
        print(">>> SOME TESTS FAILED - NEEDS ATTENTION <<<")
    print("=" * 60 + "\n")
