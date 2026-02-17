"""
Quick Test Script for Finals Sprint.

Usage:
    python scripts/quick_test.py test_cases.json
    python scripts/quick_test.py test_cases.json --case 3
"""

import asyncio
import json
import sys
import time
from pathlib import Path

import httpx


API_URL = "http://localhost:8000/api/honeypot"
TIMEOUT = 10.0


def load_test_cases(filepath: str) -> list:
    """Load test cases from JSON file."""
    with open(filepath, "r") as f:
        data = json.load(f)
    
    # Handle different formats
    if isinstance(data, list):
        return data
    elif isinstance(data, dict) and "testCases" in data:
        return data["testCases"]
    elif isinstance(data, dict):
        return [data]
    return []


async def run_test_case(client: httpx.AsyncClient, test_case: dict, case_num: int) -> dict:
    """Run a single test case."""
    print(f"\n{'='*60}")
    print(f"TEST CASE {case_num}")
    print(f"{'='*60}")
    
    session_id = test_case.get("sessionId", f"test_{case_num}_{int(time.time())}")
    message = test_case.get("message", {})
    message_text = message.get("text", "")
    
    print(f"Session ID: {session_id}")
    print(f"Message: {message_text[:100]}...")
    
    start = time.perf_counter()
    
    try:
        response = await client.post(
            API_URL,
            json=test_case,
            timeout=TIMEOUT,
        )
        elapsed = (time.perf_counter() - start) * 1000
        
        if response.status_code == 200:
            result = response.json()
            print(f"\n✅ SUCCESS ({elapsed:.0f}ms)")
            print(f"Status: {result.get('status')}")
            print(f"Reply: {result.get('reply', '')[:150]}...")
            
            return {
                "case": case_num,
                "session_id": session_id,
                "status": "success",
                "time_ms": elapsed,
                "reply": result.get("reply"),
            }
        else:
            print(f"\n❌ FAILED ({elapsed:.0f}ms)")
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text[:200]}")
            
            return {
                "case": case_num,
                "session_id": session_id,
                "status": "failed",
                "time_ms": elapsed,
                "error": response.text[:200],
            }
    
    except asyncio.TimeoutError:
        elapsed = (time.perf_counter() - start) * 1000
        print(f"\n⏱️ TIMEOUT ({elapsed:.0f}ms)")
        return {
            "case": case_num,
            "session_id": session_id,
            "status": "timeout",
            "time_ms": elapsed,
        }
    
    except Exception as e:
        elapsed = (time.perf_counter() - start) * 1000
        print(f"\n💥 ERROR ({elapsed:.0f}ms)")
        print(f"Error: {e}")
        return {
            "case": case_num,
            "session_id": session_id,
            "status": "error",
            "time_ms": elapsed,
            "error": str(e),
        }


async def main():
    """Run all test cases."""
    if len(sys.argv) < 2:
        print("Usage: python quick_test.py <test_cases.json> [--case N]")
        sys.exit(1)
    
    filepath = sys.argv[1]
    
    # Check if specific case requested
    specific_case = None
    if "--case" in sys.argv:
        idx = sys.argv.index("--case")
        if idx + 1 < len(sys.argv):
            specific_case = int(sys.argv[idx + 1])
    
    # Load test cases
    test_cases = load_test_cases(filepath)
    
    if not test_cases:
        print("❌ No test cases found!")
        sys.exit(1)
    
    print(f"\n🧪 Loaded {len(test_cases)} test case(s)")
    
    # Filter if specific case requested
    if specific_case is not None:
        if 1 <= specific_case <= len(test_cases):
            test_cases = [test_cases[specific_case - 1]]
            print(f"   Running only case #{specific_case}")
        else:
            print(f"❌ Case #{specific_case} not found (max: {len(test_cases)})")
            sys.exit(1)
    
    # Run tests
    results = []
    async with httpx.AsyncClient() as client:
        for i, test_case in enumerate(test_cases, 1):
            result = await run_test_case(client, test_case, i)
            results.append(result)
            
            # Small delay between tests
            if i < len(test_cases):
                await asyncio.sleep(0.5)
    
    # Summary
    print(f"\n{'='*60}")
    print("SUMMARY")
    print(f"{'='*60}")
    
    success_count = sum(1 for r in results if r["status"] == "success")
    failed_count = sum(1 for r in results if r["status"] == "failed")
    timeout_count = sum(1 for r in results if r["status"] == "timeout")
    error_count = sum(1 for r in results if r["status"] == "error")
    
    total = len(results)
    avg_time = sum(r["time_ms"] for r in results) / total if total > 0 else 0
    
    print(f"Total: {total}")
    print(f"✅ Success: {success_count} ({success_count/total*100:.1f}%)")
    print(f"❌ Failed: {failed_count} ({failed_count/total*100:.1f}%)")
    print(f"⏱️ Timeout: {timeout_count} ({timeout_count/total*100:.1f}%)")
    print(f"💥 Error: {error_count} ({error_count/total*100:.1f}%)")
    print(f"⏱️ Avg Time: {avg_time:.0f}ms")
    
    if failed_count > 0 or timeout_count > 0 or error_count > 0:
        print(f"\n⚠️ {failed_count + timeout_count + error_count} test(s) need attention!")
        sys.exit(1)
    else:
        print(f"\n🎉 All tests passed!")
        sys.exit(0)


if __name__ == "__main__":
    asyncio.run(main())
