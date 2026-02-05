#!/usr/bin/env python3
"""
Pre-Evaluation Verification Script
Run this tomorrow morning (Feb 6) at 5:30 AM to verify everything is ready.

Usage:
    python scripts/verify_before_evaluation.py
"""

import requests
import sys
from datetime import datetime

SERVICE_URL = "https://scamshield-honeypot.onrender.com"

def check_endpoint(url, name, expected_status=200):
    """Check if an endpoint is responding correctly."""
    try:
        print(f"\n🔍 Checking {name}...")
        print(f"   URL: {url}")
        
        response = requests.get(url, timeout=30)
        response_time = response.elapsed.total_seconds()
        
        if response.status_code == expected_status:
            print(f"   ✅ SUCCESS - Status: {response.status_code}, Time: {response_time:.2f}s")
            return True
        else:
            print(f"   ⚠️ WARNING - Expected {expected_status}, got {response.status_code}")
            print(f"   Response: {response.text[:200]}")
            return False
            
    except requests.exceptions.Timeout:
        print(f"   ❌ TIMEOUT - Service might be sleeping or slow")
        return False
    except requests.exceptions.RequestException as e:
        print(f"   ❌ ERROR - {str(e)}")
        return False

def main():
    """Run all verification checks."""
    print("=" * 70)
    print("ScamShield Pre-Evaluation Verification")
    print("=" * 70)
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Service: {SERVICE_URL}")
    print("=" * 70)
    
    checks = [
        (f"{SERVICE_URL}/", "Root Endpoint"),
        (f"{SERVICE_URL}/v1/health", "Health Check"),
        (f"{SERVICE_URL}/v1/health/live", "Liveness Probe"),
        (f"{SERVICE_URL}/docs", "API Documentation"),
    ]
    
    results = []
    for url, name in checks:
        results.append(check_endpoint(url, name))
    
    # Summary
    print("\n" + "=" * 70)
    print("VERIFICATION SUMMARY")
    print("=" * 70)
    
    passed = sum(results)
    total = len(results)
    
    for (url, name), result in zip(checks, results):
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {name}")
    
    print("=" * 70)
    print(f"Result: {passed}/{total} checks passed")
    
    if passed == total:
        print("\n🎉 ALL CHECKS PASSED - Service is ready for evaluation!")
        print("\n📋 Next steps:")
        print("   1. Keep this terminal open")
        print("   2. Run: python scripts/keep_alive.py")
        print("   3. Keep it running during evaluation (6-10 AM)")
        return 0
    else:
        print("\n⚠️ SOME CHECKS FAILED - Service might be sleeping")
        print("\n🔧 Quick fix:")
        print("   1. Wait 30 seconds for service to wake up")
        print("   2. Run this script again")
        print("   3. If still failing, check Render dashboard")
        return 1

if __name__ == "__main__":
    sys.exit(main())
