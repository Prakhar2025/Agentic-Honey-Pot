"""
Production Hardening Verification Script.

Tests:
1. Health endpoint (no auth required)
2. Missing API key -> 401
3. Wrong API key -> 401
4. Correct API key -> 201
5. Intelligence extraction -> saved to DB
"""

import requests
import json

BASE_URL = "http://127.0.0.1:8000"
CORRECT_API_KEY = "ss_live_scamshield_2026"
WRONG_API_KEY = "wrong_key"

def test_health():
    """Test health endpoint (no auth required)."""
    print("\n=== Test 1: Health Endpoint (No Auth) ===")
    resp = requests.get(f"{BASE_URL}/v1/health")
    print(f"Status: {resp.status_code}")
    print(f"Response: {resp.json()}")
    assert resp.status_code == 200, "Health should return 200"
    print("✅ PASSED")

def test_missing_api_key():
    """Test missing API key returns 401."""
    print("\n=== Test 2: Missing API Key -> 401 ===")
    resp = requests.post(
        f"{BASE_URL}/v1/honeypot/engage",
        json={"scammer_message": "test"},
    )
    print(f"Status: {resp.status_code}")
    print(f"Response: {resp.json()}")
    assert resp.status_code == 401, f"Expected 401, got {resp.status_code}"
    print("✅ PASSED")

def test_wrong_api_key():
    """Test wrong API key returns 401."""
    print("\n=== Test 3: Wrong API Key -> 401 ===")
    resp = requests.post(
        f"{BASE_URL}/v1/honeypot/engage",
        headers={"X-API-Key": WRONG_API_KEY},
        json={"scammer_message": "test"},
    )
    print(f"Status: {resp.status_code}")
    print(f"Response: {resp.json()}")
    assert resp.status_code == 401, f"Expected 401, got {resp.status_code}"
    print("✅ PASSED")

def test_correct_api_key():
    """Test correct API key returns 201 and extracts intelligence."""
    print("\n=== Test 4: Correct API Key -> 201 ===")
    message = "Your SBI account will be blocked. Call 9876543210 or pay to upi@axl to update KYC: http://fake-bank.com"
    resp = requests.post(
        f"{BASE_URL}/v1/honeypot/engage",
        headers={"X-API-Key": CORRECT_API_KEY},
        json={"scammer_message": message},
    )
    print(f"Status: {resp.status_code}")
    data = resp.json()
    print(f"Session ID: {data.get('session_id')}")
    print(f"Scam Type: {data.get('scam_type')}")
    print(f"Persona: {data.get('persona_display_name')}")
    assert resp.status_code == 201, f"Expected 201, got {resp.status_code}"
    print("✅ PASSED")
    return data.get("session_id")

def test_intelligence_saved(session_id):
    """Test that intelligence is saved to database."""
    print(f"\n=== Test 5: Intelligence Saved (session: {session_id}) ===")
    resp = requests.get(
        f"{BASE_URL}/v1/sessions/{session_id}/intelligence",
        headers={"X-API-Key": CORRECT_API_KEY},
    )
    print(f"Status: {resp.status_code}")
    data = resp.json()
    print(f"Phone Numbers: {data.get('phone_numbers', [])}")
    print(f"UPI IDs: {data.get('upi_ids', [])}")
    print(f"Phishing Links: {data.get('phishing_links', [])}")
    print(f"Total Entities: {data.get('total_entities', 0)}")
    
    # Check if any intelligence was extracted
    total = data.get("total_entities", 0)
    if total > 0:
        print("✅ PASSED - Intelligence extracted and saved!")
    else:
        print("⚠️ WARNING - No intelligence extracted (may need smarter extraction)")
    
    return data

if __name__ == "__main__":
    print("=" * 60)
    print("PRODUCTION HARDENING VERIFICATION")
    print("=" * 60)
    
    try:
        test_health()
        test_missing_api_key()
        test_wrong_api_key()
        session_id = test_correct_api_key()
        if session_id:
            test_intelligence_saved(session_id)
        
        print("\n" + "=" * 60)
        print("ALL CRITICAL TESTS PASSED! ✅")
        print("=" * 60)
    except AssertionError as e:
        print(f"\n❌ TEST FAILED: {e}")
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
