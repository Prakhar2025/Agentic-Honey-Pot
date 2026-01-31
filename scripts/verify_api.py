
import urllib.request
import json
import sys

def check_endpoint():
    print("Checking GET http://127.0.0.1:8000/v1/analytics/dashboard ...")
    try:
        req = urllib.request.Request("http://127.0.0.1:8000/v1/analytics/dashboard")
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                data = json.loads(response.read().decode())
                print("SUCCESS: Endpoint returned 200 OK")
                print("Data:", json.dumps(data, indent=2))
            else:
                print(f"FAILED: Status {response.status}")
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == "__main__":
    check_endpoint()
