# 📡 API Specification

> ScamShield Honeypot API — Complete Endpoint Reference

**Base URL:** `https://api.scamshield.in`  
**API Version:** `v1`  
**Content Type:** `application/json`

---

## Authentication

All protected endpoints require API key authentication via the `X-API-Key` header.

```http
X-API-Key: ss_live_abc123def456ghi789
```

| Environment | Prefix | Example |
|-------------|--------|---------|
| Production | `ss_live_` | `ss_live_abc123def456ghi789` |
| Sandbox | `ss_test_` | `ss_test_xyz987uvw654rst321` |

---

## Rate Limiting

| Tier | Requests/Minute | Requests/Day |
|------|-----------------|--------------|
| **Free** | 10 | 100 |
| **Starter** | 60 | 5,000 |
| **Pro** | 300 | 50,000 |
| **Enterprise** | Custom | Custom |

### Rate Limit Headers

```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1706612400
```

---

## POST /v1/honeypot

Analyze a message for potential scam indicators.

### Request Schema

```json
{
  "message": "string (required, 1-10000 chars)",
  "source_type": "sms | whatsapp | email | voice_transcript | social_media | other",
  "metadata": {
    "sender": "string (optional)",
    "region": "string (optional)",
    "timestamp": "ISO 8601 (optional)"
  },
  "options": {
    "include_reasoning": "boolean (default: true)",
    "quick_mode": "boolean (default: false)",
    "language": "auto | en | hi | ta | te | bn"
  }
}
```

### Example Request

```bash
curl -X POST "https://api.scamshield.in/v1/honeypot" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ss_live_abc123def456ghi789" \
  -d '{
    "message": "Congratulations! You won Rs. 50 lakh. Claim: http://amaz0n-prize.xyz",
    "source_type": "sms",
    "metadata": {"sender": "+91-9876543210", "region": "Karnataka"}
  }'
```

### Response Schema

```json
{
  "request_id": "req_7f3a9b2c4d5e6f78",
  "is_scam": true,
  "risk_score": 92,
  "risk_level": "CRITICAL",
  "scam_type": "LOTTERY_PRIZE",
  "indicators": [
    "Unrealistic prize amount",
    "Suspicious domain (typosquatting)",
    "Urgency language"
  ],
  "recommendation": "Do NOT click. Report to cybercrime.gov.in",
  "confidence": 0.96,
  "reasoning": "Multiple high-confidence scam indicators detected...",
  "analysis_time_ms": 156,
  "created_at": "2026-01-30T11:38:25+05:30"
}
```

### Scam Types

| Type | Description |
|------|-------------|
| `KYC_PHISHING` | Fake KYC/account update requests |
| `LOTTERY_PRIZE` | Fake lottery/prize winnings |
| `INVESTMENT_FRAUD` | Fraudulent investment schemes |
| `IMPERSONATION` | Government/bank impersonation |
| `LOAN_SCAM` | Fake instant loan offers |
| `JOB_SCAM` | Fraudulent job opportunities |
| `OTP_THEFT` | Credential harvesting |

### Risk Levels

| Level | Score | Action |
|-------|-------|--------|
| 🟢 SAFE | 0-25 | No action needed |
| 🟡 LOW | 26-50 | Monitor |
| 🟠 MEDIUM | 51-75 | Verify source |
| 🔴 HIGH | 76-90 | Avoid interaction |
| ⛔ CRITICAL | 91-100 | Report immediately |

---

## GET /v1/honeypot/{request_id}

Retrieve a previously generated analysis.

```http
GET /v1/honeypot/req_7f3a9b2c4d5e6f78
X-API-Key: ss_live_abc123def456ghi789
```

---

## GET /v1/analytics/summary

Get aggregated analytics.

### Query Parameters

| Parameter | Values | Default |
|-----------|--------|---------|
| `period` | `24h`, `7d`, `30d`, `90d` | `7d` |
| `group_by` | `day`, `scam_type`, `source_type` | - |

### Response

```json
{
  "period": "7d",
  "summary": {
    "total_requests": 1250,
    "scams_detected": 847,
    "detection_rate": 0.678,
    "avg_risk_score": 64.3
  }
}
```

---

## GET /health

Health check (no auth required).

```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2026-01-30T11:38:25+05:30"
}
```

---

## Error Codes

| HTTP | Code | Description |
|------|------|-------------|
| 400 | `VALIDATION_ERROR` | Invalid request body |
| 400 | `MESSAGE_TOO_LONG` | Exceeds 10,000 chars |
| 401 | `MISSING_API_KEY` | No API key provided |
| 401 | `INVALID_API_KEY` | Key not recognized |
| 404 | `ANALYSIS_NOT_FOUND` | Request ID not found |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Server error |
| 503 | `LLM_SERVICE_UNAVAILABLE` | Groq API down |

### Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": {
      "field": "message",
      "issue": "Cannot be empty"
    }
  }
}
```

---

## Code Examples

### Python

```python
import httpx

response = httpx.post(
    "https://api.scamshield.in/v1/honeypot",
    headers={"X-API-Key": "ss_live_your_key"},
    json={"message": "Suspicious text", "source_type": "sms"}
)
result = response.json()
print(f"Risk: {result['risk_level']}")
```

### JavaScript

```javascript
const response = await fetch('https://api.scamshield.in/v1/honeypot', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'ss_live_your_key'
  },
  body: JSON.stringify({message: 'Suspicious text', source_type: 'sms'})
});
const result = await response.json();
```

---

<p align="center"><em>Questions? api-support@scamshield.in</em></p>
