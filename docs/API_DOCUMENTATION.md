# 📡 API Documentation

> ScamShield Agentic Honeypot — Complete Endpoint Reference

**Base URL:** `https://api.scamshield.in`  
**API Version:** `v1`  
**Content Type:** `application/json`

---

## Table of Contents

- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)
- [Endpoints](#endpoints)
  - [POST /v1/honeypot/engage](#post-v1honeypot-engage)
  - [POST /v1/honeypot/continue](#post-v1honeypot-continue)
  - [GET /v1/honeypot/session/{id}](#get-v1honeypot-sessionid)
  - [DELETE /v1/honeypot/session/{id}](#delete-v1honeypot-sessionid)
  - [POST /webhook/scammer](#post-webhookscammer)
  - [GET /health](#get-health)
- [Data Types](#data-types)
- [Error Codes](#error-codes)
- [Code Examples](#code-examples)

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

| Tier | Requests/Minute | Sessions/Day |
|------|-----------------|--------------|
| **Free** | 10 | 50 |
| **Starter** | 60 | 500 |
| **Pro** | 300 | 5,000 |
| **Enterprise** | Custom | Custom |

### Rate Limit Headers

```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1706612400
```

---

## Endpoints

---

### POST /v1/honeypot/engage

Start a new honeypot engagement session with a scammer.

#### Request

```http
POST /v1/honeypot/engage HTTP/1.1
Content-Type: application/json
X-API-Key: ss_live_your_key
```

#### Request Schema

```json
{
  "scammer_message": "string (required)",
  "source_type": "sms | whatsapp | email | voice_transcript",
  "persona": "elderly_victim | tech_novice | eager_investor | busy_professional | helpful_auntie | auto",
  "metadata": {
    "sender": "string (optional)",
    "region": "string (optional)"
  }
}
```

#### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `scammer_message` | string | ✅ | Initial scam message received |
| `source_type` | enum | ✅ | Channel: sms, whatsapp, email, voice_transcript |
| `persona` | enum | ❌ | Victim persona to use (default: auto-select) |
| `metadata.sender` | string | ❌ | Sender identifier if known |
| `metadata.region` | string | ❌ | Geographic region |

#### Example Request

```bash
curl -X POST "https://api.scamshield.in/v1/honeypot/engage" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ss_live_your_key" \
  -d '{
    "scammer_message": "Dear Customer, Your SBI account will be blocked! Update KYC immediately by sharing your details.",
    "source_type": "sms",
    "persona": "elderly_victim",
    "metadata": {
      "sender": "+91-9876543210",
      "region": "Maharashtra"
    }
  }'
```

#### Response Schema

```json
{
  "session_id": "string",
  "is_scam": "boolean",
  "scam_type": "string",
  "agent_response": "string",
  "conversation_status": "string",
  "turn_count": "integer",
  "persona_used": "string"
}
```

#### Example Response

```json
{
  "session_id": "sess_7f3a9b2c4d5e6f78",
  "is_scam": true,
  "scam_type": "KYC_PHISHING",
  "agent_response": "Oh my! Please help me, I am not good with technology. My grandson usually helps but he is not here. What details do you need? I have my passbook here.",
  "conversation_status": "ONGOING",
  "turn_count": 1,
  "persona_used": "elderly_victim"
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `session_id` | string | Unique session identifier for continuation |
| `is_scam` | boolean | Whether message was classified as scam |
| `scam_type` | string | Category of scam detected |
| `agent_response` | string | Generated victim response to send to scammer |
| `conversation_status` | enum | Current session status |
| `turn_count` | integer | Number of conversation turns so far |
| `persona_used` | string | Persona selected for this engagement |

---

### POST /v1/honeypot/continue

Continue an existing conversation with the scammer.

#### Request Schema

```json
{
  "session_id": "string (required)",
  "scammer_message": "string (required)"
}
```

#### Example Request

```bash
curl -X POST "https://api.scamshield.in/v1/honeypot/continue" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ss_live_your_key" \
  -d '{
    "session_id": "sess_7f3a9b2c4d5e6f78",
    "scammer_message": "Send your account number and OTP to 9876543210 or pay ₹500 to scammer@ybl immediately"
  }'
```

#### Response with Intelligence Extraction

```json
{
  "session_id": "sess_7f3a9b2c4d5e6f78",
  "agent_response": "Okay beta, please wait I am writing down... 9876543210 and scammer@ybl is it? Let me ask my son to help with the payment.",
  "conversation_status": "INTELLIGENCE_EXTRACTED",
  "turn_count": 2,
  "extracted_intelligence": {
    "bank_accounts": [],
    "upi_ids": ["scammer@ybl"],
    "phone_numbers": ["+91-9876543210"],
    "phishing_links": []
  },
  "should_continue": true
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `session_id` | string | Same session ID |
| `agent_response` | string | Next victim response |
| `conversation_status` | enum | Updated status |
| `turn_count` | integer | Updated turn count |
| `extracted_intelligence` | object | Newly extracted intel (if any) |
| `should_continue` | boolean | Whether to continue conversation |

---

### GET /v1/honeypot/session/{id}

Retrieve complete session details and all extracted intelligence.

#### Request

```http
GET /v1/honeypot/session/sess_7f3a9b2c4d5e6f78
X-API-Key: ss_live_your_key
```

#### Response

```json
{
  "session_id": "sess_7f3a9b2c4d5e6f78",
  "status": "COMPLETED",
  "scam_type": "KYC_PHISHING",
  "risk_level": "CRITICAL",
  "persona_used": "elderly_victim",
  "started_at": "2026-01-30T15:30:00+05:30",
  "ended_at": "2026-01-30T15:35:00+05:30",
  "session_duration_seconds": 300,
  "total_turns": 4,
  "conversation_log": [
    {
      "turn": 1,
      "role": "scammer",
      "message": "Dear Customer, Your SBI account will be blocked...",
      "timestamp": "2026-01-30T15:30:00+05:30"
    },
    {
      "turn": 1,
      "role": "agent",
      "message": "Oh my! Please help me, I am not good with technology...",
      "timestamp": "2026-01-30T15:30:02+05:30"
    },
    {
      "turn": 2,
      "role": "scammer",
      "message": "Send your account number and OTP to 9876543210...",
      "timestamp": "2026-01-30T15:31:00+05:30"
    },
    {
      "turn": 2,
      "role": "agent",
      "message": "Okay beta, please wait I am writing down...",
      "timestamp": "2026-01-30T15:31:02+05:30"
    }
  ],
  "extracted_intelligence": {
    "bank_accounts": [],
    "upi_ids": [
      {
        "id": "scammer@ybl",
        "confidence": 0.98,
        "extracted_at_turn": 2
      }
    ],
    "phone_numbers": [
      {
        "number": "+91-9876543210",
        "confidence": 0.99,
        "extracted_at_turn": 2
      }
    ],
    "phishing_links": []
  },
  "summary": {
    "total_entities_extracted": 2,
    "highest_confidence_intel": "phone_number",
    "recommended_action": "Report to cybercrime.gov.in"
  }
}
```

---

### DELETE /v1/honeypot/session/{id}

Manually terminate an active session.

#### Request

```http
DELETE /v1/honeypot/session/sess_7f3a9b2c4d5e6f78
X-API-Key: ss_live_your_key
```

#### Response

```json
{
  "session_id": "sess_7f3a9b2c4d5e6f78",
  "status": "TERMINATED",
  "reason": "manual_termination",
  "final_intel_count": 2
}
```

---

### POST /webhook/scammer

Webhook endpoint for Mock Scammer API integration.

> **Note:** This endpoint is specifically for hackathon's Mock Scammer API.

#### Request (from Mock Scammer API)

```json
{
  "conversation_id": "mock_conv_123",
  "message": "Pay ₹1000 to unlock your account",
  "scammer_profile": "kyc_scammer_01"
}
```

#### Response (to Mock Scammer API)

```json
{
  "reply": "Oh dear, ₹1000 is too much for me. Can I pay ₹500 first? Where do I send?",
  "session_id": "sess_mapped_to_mock_conv",
  "continue": true
}
```

---

### GET /health

Health check endpoint (no authentication required).

```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2026-01-30T15:40:00+05:30",
  "components": {
    "database": "healthy",
    "llm_service": "healthy",
    "agent_loop": "healthy"
  }
}
```

---

## Data Types

### Conversation Status

| Status | Description |
|--------|-------------|
| `ONGOING` | Active conversation, continue engaging |
| `INTELLIGENCE_EXTRACTED` | Key information obtained |
| `COMPLETED` | Session successfully ended |
| `DISENGAGED` | Scammer stopped responding |
| `MAX_TURNS_REACHED` | Safety limit hit (default: 10) |
| `THREAT_DETECTED` | Scammer became aggressive |
| `TERMINATED` | Manually ended |

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
| `TECH_SUPPORT` | Fake tech support |

### Personas

| Persona | Description |
|---------|-------------|
| `elderly_victim` | Confused, trusting, asks for help |
| `tech_novice` | Doesn't understand technology |
| `eager_investor` | Greedy, wants quick returns |
| `busy_professional` | Distracted, wants quick resolution |
| `helpful_auntie` | Overshares, very polite |
| `auto` | System selects best persona |

### Extracted Intelligence Schema

```json
{
  "bank_accounts": [
    {
      "account_number": "1234567890",
      "ifsc_code": "HDFC0001234",
      "confidence": 0.95,
      "extracted_at_turn": 3
    }
  ],
  "upi_ids": [
    {
      "id": "scammer@ybl",
      "confidence": 0.98,
      "extracted_at_turn": 2
    }
  ],
  "phone_numbers": [
    {
      "number": "+91-9876543210",
      "confidence": 0.99,
      "extracted_at_turn": 1
    }
  ],
  "phishing_links": [
    {
      "url": "http://fake-bank.xyz/login",
      "domain": "fake-bank.xyz",
      "confidence": 0.97,
      "extracted_at_turn": 4
    }
  ]
}
```

---

## Error Codes

| HTTP | Code | Description |
|------|------|-------------|
| 400 | `VALIDATION_ERROR` | Invalid request body |
| 400 | `SESSION_NOT_ACTIVE` | Session already completed |
| 401 | `MISSING_API_KEY` | No API key provided |
| 401 | `INVALID_API_KEY` | Key not recognized |
| 404 | `SESSION_NOT_FOUND` | Session ID doesn't exist |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Server error |
| 503 | `LLM_SERVICE_UNAVAILABLE` | Groq API down |

### Error Response Format

```json
{
  "error": {
    "code": "SESSION_NOT_FOUND",
    "message": "No session found with ID: sess_invalid",
    "suggestion": "Start a new session with POST /v1/honeypot/engage"
  }
}
```

---

## Code Examples

### Python - Full Conversation Flow

```python
import httpx

API_KEY = "ss_live_your_key"
BASE = "https://api.scamshield.in/v1"
headers = {"X-API-Key": API_KEY}

# Start engagement
engage_resp = httpx.post(
    f"{BASE}/honeypot/engage",
    headers=headers,
    json={
        "scammer_message": "Your account blocked! Share details now!",
        "source_type": "sms",
        "persona": "elderly_victim"
    }
)
session = engage_resp.json()
print(f"Started session: {session['session_id']}")
print(f"Agent says: {session['agent_response']}")

# Continue conversation
continue_resp = httpx.post(
    f"{BASE}/honeypot/continue",
    headers=headers,
    json={
        "session_id": session['session_id'],
        "scammer_message": "Pay ₹500 to scammer@ybl now!"
    }
)
result = continue_resp.json()
print(f"Agent says: {result['agent_response']}")
print(f"Extracted: {result.get('extracted_intelligence', {})}")

# Get full report
report = httpx.get(
    f"{BASE}/honeypot/session/{session['session_id']}",
    headers=headers
).json()
print(f"Total intel: {report['extracted_intelligence']}")
```

### JavaScript - Async Flow

```javascript
const API_KEY = 'ss_live_your_key';
const BASE = 'https://api.scamshield.in/v1';

async function runHoneypot(scamMessage) {
  // Start
  const startRes = await fetch(`${BASE}/honeypot/engage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY
    },
    body: JSON.stringify({
      scammer_message: scamMessage,
      source_type: 'sms',
      persona: 'auto'
    })
  });
  const session = await startRes.json();
  console.log('Agent:', session.agent_response);
  
  // Continue (simulate scammer reply)
  const contRes = await fetch(`${BASE}/honeypot/continue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY
    },
    body: JSON.stringify({
      session_id: session.session_id,
      scammer_message: 'Send money to scammer@upi'
    })
  });
  const result = await contRes.json();
  console.log('Extracted:', result.extracted_intelligence);
  
  return result;
}
```

---

<p align="center"><em>Questions? api-support@scamshield.in</em></p>
