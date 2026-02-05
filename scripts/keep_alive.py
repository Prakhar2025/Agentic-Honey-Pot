#!/usr/bin/env python3
"""
Keep-Alive Script for Render Service
Run this script to continuously ping the service and keep it awake.

Usage:
    python scripts/keep_alive.py

For tomorrow morning, run this at 5:30 AM and keep it running during evaluation.
"""

import time
import requests
from datetime import datetime

SERVICE_URL = "https://scamshield-honeypot.onrender.com"
HEALTH_ENDPOINT = f"{SERVICE_URL}/v1/health"
PING_INTERVAL = 240  # 4 minutes (less than Render's 15-min timeout)

def ping_service():
    """Ping the health endpoint and return status."""
    try:
        response = requests.get(HEALTH_ENDPOINT, timeout=30)
        status = "✅ UP" if response.status_code == 200 else f"⚠️ {response.status_code}"
        print(f"[{datetime.now().strftime('%H:%M:%S')}] {status} - Response time: {response.elapsed.total_seconds():.2f}s")
        return response.status_code == 200
    except requests.exceptions.RequestException as e:
        print(f"[{datetime.now().strftime('%H:%M:%S')}] ❌ ERROR - {str(e)}")
        return False

def main():
    """Main keep-alive loop."""
    print("=" * 60)
    print("ScamShield Keep-Alive Script")
    print("=" * 60)
    print(f"Service URL: {SERVICE_URL}")
    print(f"Ping interval: {PING_INTERVAL} seconds ({PING_INTERVAL/60:.1f} minutes)")
    print("Press Ctrl+C to stop")
    print("=" * 60)
    print()
    
    consecutive_failures = 0
    
    while True:
        try:
            success = ping_service()
            
            if success:
                consecutive_failures = 0
            else:
                consecutive_failures += 1
                
                # If multiple failures, try to wake it up with rapid pings
                if consecutive_failures >= 2:
                    print(f"⚠️ {consecutive_failures} consecutive failures - attempting rapid wake-up...")
                    for i in range(3):
                        time.sleep(2)
                        ping_service()
            
            # Wait before next ping
            time.sleep(PING_INTERVAL)
            
        except KeyboardInterrupt:
            print("\n\n👋 Keep-alive stopped by user")
            break
        except Exception as e:
            print(f"❌ Unexpected error: {e}")
            time.sleep(PING_INTERVAL)

if __name__ == "__main__":
    main()
