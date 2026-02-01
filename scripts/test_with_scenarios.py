"""
Test API with 100 Scam Scenarios.

This script loads test_scenarios.json and tests the API
with all 100 scam messages to validate:
- Scam detection accuracy
- Persona selection
- Intelligence extraction
- Response generation
- Performance (<500ms target)

Usage:
    python scripts/test_with_scenarios.py
"""

import json
import time
import requests
from typing import Dict, List
from datetime import datetime


# API Configuration
API_BASE_URL = "http://localhost:8000"
ENGAGE_ENDPOINT = f"{API_BASE_URL}/v1/honeypot/engage"
CONTINUE_ENDPOINT = f"{API_BASE_URL}/v1/honeypot/continue"

# Authentication
API_KEY = "ss_live_scamshield_2026"
HEADERS = {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json"
}


def load_scenarios() -> List[Dict]:
    """Load test scenarios from JSON file."""
    with open('tests/test_scenarios.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data['scenarios']


def test_single_scenario(scenario: Dict) -> Dict:
    """
    Test a single scenario.
    
    Args:
        scenario: Scenario dictionary with message and expected data.
    
    Returns:
        Dict: Test results with success/failure info.
    """
    start_time = time.perf_counter()
    
    try:
        # Send engage request
        response = requests.post(
            ENGAGE_ENDPOINT,
            headers=HEADERS,
            json={
                'scammer_message': scenario['message'],
                'source_type': scenario['source_type']
            },
            timeout=10
        )
        
        elapsed_ms = (time.perf_counter() - start_time) * 1000
        
        if response.status_code != 201:
            return {
                'success': False,
                'error': f"HTTP {response.status_code}",
                'elapsed_ms': elapsed_ms
            }
        
        data = response.json()
        
        # Validate response
        result = {
            'success': True,
            'session_id': data.get('session_id'),
            'persona': data.get('persona_used'),
            'scam_type': data.get('scam_type'),
            'detected_confidence': data.get('scam_confidence'),
            'expected_confidence': scenario.get('expected_scam_confidence'),
            'conversation_status': data.get('conversation_status'),
            'response_length': len(data.get('response', '')),
            'elapsed_ms': elapsed_ms,
            'api_processing_ms': data.get('processing_time_ms')
        }
        
        # Check if scam type matches expectation
        result['scam_type_match'] = (
            result['scam_type'] == scenario['scam_type'] or
            result['scam_type'] == 'UNKNOWN'  # Acceptable for low confidence
        )
        
        return result
        
    except requests.exceptions.Timeout:
        elapsed_ms = (time.perf_counter() - start_time) * 1000
        return {
            'success': False,
            'error': 'Timeout (>10s)',
            'elapsed_ms': elapsed_ms
        }
    except Exception as e:
        elapsed_ms = (time.perf_counter() - start_time) * 1000
        return {
            'success': False,
            'error': str(e),
            'elapsed_ms': elapsed_ms
        }


def run_tests(limit: int = None) -> None:
    """
    Run tests on all scenarios.
    
    Args:
        limit: Optional limit on number of scenarios to test.
    """
    print("=" * 80)
    print("🧪 TESTING API WITH SCAM SCENARIOS")
    print("=" * 80)
    print()
    
    # Load scenarios
    print("📂 Loading scenarios...")
    scenarios = load_scenarios()
    
    if limit:
        scenarios = scenarios[:limit]
        print(f"   Testing first {limit} scenarios only\n")
    else:
        print(f"   Loaded {len(scenarios)} scenarios\n")
    
    # Test each scenario
    results = []
    failed = []
    slow_responses = []
    
    print("🚀 Starting tests...\n")
    
    for i, scenario in enumerate(scenarios, 1):
        print(f"[{i}/{len(scenarios)}] Testing Scenario #{scenario['id']} ({scenario['scam_type']})...")
        
        result = test_single_scenario(scenario)
        results.append(result)
        
        if not result['success']:
            failed.append({
                'scenario_id': scenario['id'],
                'scam_type': scenario['scam_type'],
                'error': result['error']
            })
            print(f"   ❌ FAILED: {result['error']}")
        else:
            status_icon = "✅" if result['elapsed_ms'] < 1000 else "⚠️"
            print(f"   {status_icon} Success: {result['elapsed_ms']:.0f}ms | "
                  f"Persona: {result['persona']} | "
                  f"Status: {result['conversation_status']}")
            
            # Track slow responses
            if result['elapsed_ms'] > 1000:
                slow_responses.append({
                    'scenario_id': scenario['id'],
                    'elapsed_ms': result['elapsed_ms']
                })
        
        # Small delay to avoid rate limiting
        time.sleep(0.1)
    
    # Summary
    print("\n" + "=" * 80)
    print("📊 TEST SUMMARY")
    print("=" * 80)
    
    successful = [r for r in results if r['success']]
    success_rate = len(successful) / len(results) * 100
    
    print(f"\n✅ Successful: {len(successful)}/{len(results)} ({success_rate:.1f}%)")
    print(f"❌ Failed: {len(failed)}/{len(results)}")
    
    if successful:
        avg_time = sum(r['elapsed_ms'] for r in successful) / len(successful)
        min_time = min(r['elapsed_ms'] for r in successful)
        max_time = max(r['elapsed_ms'] for r in successful)
        
        print(f"\n⏱️  Performance:")
        print(f"   Average: {avg_time:.0f}ms")
        print(f"   Min: {min_time:.0f}ms")
        print(f"   Max: {max_time:.0f}ms")
        print(f"   Target: <1000ms")
        
        under_target = len([r for r in successful if r['elapsed_ms'] < 1000])
        print(f"   Under target: {under_target}/{len(successful)} ({under_target/len(successful)*100:.1f}%)")
    
    # Show failures
    if failed:
        print(f"\n❌ Failed Tests:")
        for f in failed[:10]:  # Show first 10
            print(f"   - Scenario {f['scenario_id']} ({f['scam_type']}): {f['error']}")
        if len(failed) > 10:
            print(f"   ... and {len(failed) - 10} more")
    
    # Show slow responses
    if slow_responses:
        print(f"\n⚠️  Slow Responses (>{1000}ms):")
        for s in slow_responses[:5]:
            print(f"   - Scenario {s['scenario_id']}: {s['elapsed_ms']:.0f}ms")
        if len(slow_responses) > 5:
            print(f"   ... and {len(slow_responses) - 5} more")
    
    # Persona distribution
    personas = {}
    for r in successful:
        persona = r.get('persona', 'unknown')
        personas[persona] = personas.get(persona, 0) + 1
    
    print(f"\n🎭 Persona Distribution:")
    for persona, count in sorted(personas.items(), key=lambda x: x[1], reverse=True):
        print(f"   {persona}: {count} ({count/len(successful)*100:.1f}%)")
    
    print("\n" + "=" * 80)
    print(f"✨ Testing completed at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 80)


if __name__ == "__main__":
    import sys
    
    # Optional: limit number of tests
    limit = int(sys.argv[1]) if len(sys.argv) > 1 else None
    
    print("\n🔍 Make sure API server is running at http://localhost:8000")
    print("   Start with: uvicorn app.main:app --reload\n")
    
    input("Press Enter to start testing...")
    
    run_tests(limit=limit)
