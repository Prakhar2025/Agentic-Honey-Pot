# 🧪 Testing Guide

**Comprehensive Testing Documentation**

Tests: 100 Scenarios | Coverage: 85%

---

## 🎯 Testing Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                     TESTING PYRAMID                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                        ┌───────┐                                 │
│                        │  E2E  │  ← Browser/API Tests            │
│                       ─┴───────┴─                                │
│                    ┌─────────────┐                               │
│                    │ Integration │  ← API + DB Tests             │
│                   ─┴─────────────┴─                              │
│                ┌─────────────────────┐                           │
│                │     Unit Tests      │  ← Function Tests         │
│               ─┴─────────────────────┴─                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Test Coverage Goals

| Layer | Coverage Target | Current |
|-------|-----------------|---------|
| Unit Tests | 90% | 85% |
| Integration | 75% | 70% |
| E2E | Key flows | 100% |

---

## 🧪 Unit Tests

### Running Unit Tests

```bash
# All unit tests
pytest tests/unit/ -v

# Specific module
pytest tests/unit/test_extractor.py -v

# With coverage
pytest tests/unit/ --cov=app --cov-report=html
```

### Example Unit Test

```python
# tests/unit/test_extractor.py
import pytest
from app.intelligence.extractor import IntelligenceExtractor

class TestIntelligenceExtractor:
    @pytest.fixture
    def extractor(self):
        return IntelligenceExtractor()
    
    def test_extract_phone_number(self, extractor):
        message = "Call me at +91-9876543210 for details"
        result = extractor.extract_all(message)
        
        assert len(result["phone_numbers"]) == 1
        assert result["phone_numbers"][0]["number"] == "+91-9876543210"
    
    def test_extract_upi_id(self, extractor):
        message = "Send money to scammer@ybl"
        result = extractor.extract_all(message)
        
        assert len(result["upi_ids"]) == 1
        assert result["upi_ids"][0]["id"] == "scammer@ybl"
    
    def test_no_entities(self, extractor):
        message = "Hello, how are you?"
        result = extractor.extract_all(message)
        
        assert all(len(v) == 0 for v in result.values())
```

---

## 🔗 Integration Tests

### Running Integration Tests

```bash
# All integration tests
pytest tests/integration/ -v

# With database
pytest tests/integration/ --db-url="sqlite+aiosqlite:///./test.db"
```

### Example Integration Test

```python
# tests/integration/test_honeypot_api.py
import pytest
from httpx import AsyncClient
from app.main import create_app

@pytest.fixture
async def client():
    app = create_app()
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

class TestHoneypotAPI:
    @pytest.mark.asyncio
    async def test_engage_creates_session(self, client):
        response = await client.post(
            "/v1/honeypot/engage",
            json={"scammer_message": "Your KYC expired"},
            headers={"x-api-key": "test_key"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "session_id" in data
        assert data["scam_type"] == "KYC_FRAUD"
    
    @pytest.mark.asyncio
    async def test_continue_requires_session(self, client):
        response = await client.post(
            "/v1/honeypot/continue",
            json={
                "session_id": "nonexistent",
                "scammer_message": "Send OTP"
            },
            headers={"x-api-key": "test_key"}
        )
        
        assert response.status_code == 404
```

---

## 🌐 API Tests

### Running API Tests

```bash
# Using httpx
pytest tests/api/ -v

# Using requests (live server)
python scripts/test_live_api.py --url http://localhost:8000
```

### Scenario Testing

We have **100 pre-defined test scenarios**:

```bash
# Run all scenarios
python scripts/test_with_scenarios.py

# Run specific category
python scripts/test_with_scenarios.py --category kyc_fraud
```

### Scenario Categories

| Category | Count | Description |
|----------|-------|-------------|
| KYC Fraud | 15 | Bank verification scams |
| Lottery Scam | 12 | Fake prize scams |
| OTP Fraud | 18 | OTP theft attempts |
| Tech Support | 10 | Fake support calls |
| Investment | 15 | Fake investment schemes |
| Job Scam | 10 | Fake job offers |
| Loan Scam | 8 | Fake loan approvals |
| Mixed | 12 | Multi-type scams |

---

## 🎭 End-to-End Tests

### Browser Testing (Planned)

```bash
# Playwright tests
npx playwright test

# With UI
npx playwright test --ui
```

### API Flow Tests

```python
# tests/e2e/test_full_conversation.py
@pytest.mark.asyncio
async def test_full_scam_conversation():
    # 1. Start session
    engage = await client.post("/v1/honeypot/engage", ...)
    session_id = engage.json()["session_id"]
    
    # 2. Continue conversation (5 turns)
    for i in range(5):
        continue_resp = await client.post(
            "/v1/honeypot/continue",
            json={"session_id": session_id, "scammer_message": f"Message {i}"}
        )
        assert continue_resp.status_code == 200
    
    # 3. Verify intelligence extracted
    intel = await client.get(f"/v1/sessions/{session_id}/intelligence")
    assert intel.json()["total_entities"] > 0
    
    # 4. Verify session completed
    session = await client.get(f"/v1/honeypot/session/{session_id}")
    assert session.json()["turn_count"] == 5
```

---

## 📝 Test Scenarios

### Sample Scenario File

```json
[
  {
    "id": "kyc_001",
    "name": "Basic KYC Expiry",
    "messages": [
      "Your KYC is expired. Update immediately.",
      "Go to http://fake-bank.com and verify.",
      "Enter your card number and OTP."
    ],
    "expected": {
      "scam_type": "KYC_FRAUD",
      "entities": ["phishing_link"]
    }
  },
  {
    "id": "kyc_002",
    "name": "RBI Warning",
    "messages": [
      "RBI Notice: Account will be blocked in 24 hours.",
      "Call +91-9876543210 to verify PAN.",
      "Share Aadhaar for instant verification."
    ],
    "expected": {
      "scam_type": "KYC_FRAUD",
      "entities": ["phone_number"]
    }
  }
]
```

---

## 🔧 Running Tests

### Quick Commands

```bash
# Run all tests
pytest

# Run with verbose output
pytest -v

# Run specific test file
pytest tests/unit/test_detector.py

# Run tests matching pattern
pytest -k "test_extract"

# Run with coverage report
pytest --cov=app --cov-report=term-missing

# Generate HTML coverage report
pytest --cov=app --cov-report=html
open htmlcov/index.html
```

### CI/CD Testing

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt
      - run: pytest --cov=app --cov-report=xml
      - uses: codecov/codecov-action@v3
```

---

## 🔗 Related Documentation

- [Backend Development](./BACKEND_DEVELOPMENT.md)
- [API Reference](./API_REFERENCE.md)
- [Troubleshooting](./TROUBLESHOOTING.md)
