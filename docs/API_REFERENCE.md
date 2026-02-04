# 📡 API Reference

**API Version:** v1 | **Status:** Stable

**Complete API Documentation for ScamShield Honeypot**

---

## 📋 Table of Contents

- [Base URL](#-base-url)
- [Authentication](#-authentication)
- [Rate Limiting](#️-rate-limiting)
- [Response Format](#-response-format)
- [Endpoints](#-endpoints)
- [Error Codes](#-error-codes)
- [Pagination](#-pagination)

---

## 🌐 Base URL

| Environment | Base URL |
|-------------|----------|
| Production | `https://scamshield-honeypot.onrender.com` |
| Local Development | `http://localhost:8000` |

**API Version:** All endpoints are prefixed with `/v1/`

---

## 🔐 Authentication

All protected endpoints require an API key in the request header:

```
x-api-key: YOUR_API_KEY
```

### Public Endpoints (No Auth Required)

- `GET /` - Root endpoint
- `GET /v1/health` - Health check
- `GET /v1/health/ready` - Readiness check
- `GET /v1/health/live` - Liveness check
- `GET /docs` - Swagger UI
- `GET /redoc` - ReDoc UI

### Protected Endpoints

All other endpoints require valid API key.

---

## ⏱️ Rate Limiting

| Tier | Requests/Minute | Burst |
|------|-----------------|-------|
| Free | 60 | 10 |
| Standard | 300 | 50 |
| Enterprise | Unlimited | - |

Rate limit headers:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1706184000
```

---

## 📦 Response Format

### Success Response

```json
{
  "status": "success",
  "data": { ... },
  "meta": {
    "timestamp": "2026-02-04T12:00:00Z",
    "version": "1.0.0"
  }
}
```

### Error Response

```json
{
  "status": "error",
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Description of the error",
    "details": { ... }
  }
}
```

---

## 🔌 Endpoints

### Honeypot Endpoints

#### POST /v1/honeypot/engage

Start a new honeypot session with an incoming scam message.

**Request:**

```http
POST /v1/honeypot/engage
Content-Type: application/json
x-api-key: YOUR_API_KEY
```

```json
{
  "scammer_message": "Your bank account will be blocked. Share OTP immediately!",
  "source_type": "sms",
  "persona_preference": "elderly_victim",
  "metadata": {
    "channel": "SMS",
    "language": "English"
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `scammer_message` | string | ✅ Yes | The scam message text |
| `source_type` | string | No | `sms`, `whatsapp`, `email`, `chat` |
| `persona_preference` | string | No | Preferred persona to use |
| `metadata` | object | No | Additional context |

**Response:**

```json
{
  "session_id": "sess_abc123def456",
  "response": "Oh dear, my account blocked? What is OTP? My grandson usually helps...",
  "persona_used": "elderly_victim",
  "persona_display_name": "Elderly Victim",
  "scam_type": "OTP_FRAUD",
  "scam_confidence": 0.92,
  "conversation_status": "ONGOING",
  "turn_count": 1,
  "extracted_intelligence": {
    "bank_accounts": [],
    "upi_ids": [],
    "phone_numbers": [],
    "phishing_links": []
  },
  "processing_time_ms": 1250.5
}
```

**Example (cURL):**

```bash
curl -X POST "https://scamshield-honeypot.onrender.com/v1/honeypot/engage" \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "scammer_message": "Your KYC is expired. Update now at http://fake-bank.com",
    "source_type": "sms"
  }'
```

---

#### POST /v1/honeypot/continue

Continue an existing honeypot conversation.

**Request:**

```json
{
  "session_id": "sess_abc123def456",
  "scammer_message": "Send your card number to verify",
  "metadata": {}
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `session_id` | string | ✅ Yes | Existing session ID |
| `scammer_message` | string | ✅ Yes | Next scam message |
| `metadata` | object | No | Additional context |

**Response:**

```json
{
  "session_id": "sess_abc123def456",
  "response": "Card number? Beta, which card? I have so many cards...",
  "persona_used": "elderly_victim",
  "scam_type": "KYC_FRAUD",
  "conversation_status": "ONGOING",
  "turn_count": 2,
  "extracted_intelligence": {
    "bank_accounts": [],
    "upi_ids": [],
    "phone_numbers": [],
    "phishing_links": ["http://fake-bank.com"]
  },
  "processing_time_ms": 980.2
}
```

---

#### GET /v1/honeypot/session/{session_id}

Get details of a specific session.

**Response:**

```json
{
  "id": "sess_abc123def456",
  "status": "ONGOING",
  "scam_type": "KYC_FRAUD",
  "persona_id": "elderly_victim",
  "turn_count": 5,
  "is_scam": true,
  "source_type": "sms",
  "started_at": "2026-02-04T10:00:00Z",
  "ended_at": null,
  "messages": [
    {
      "role": "scammer",
      "content": "Your bank account will be blocked...",
      "turn_number": 1,
      "created_at": "2026-02-04T10:00:00Z"
    },
    {
      "role": "agent",
      "content": "Oh dear, what happened...",
      "turn_number": 1,
      "created_at": "2026-02-04T10:00:01Z"
    }
  ],
  "intelligence": {
    "bank_accounts": [],
    "upi_ids": ["scammer@ybl"],
    "phone_numbers": ["+919876543210"],
    "phishing_links": []
  }
}
```

---

#### DELETE /v1/honeypot/session/{session_id}

Delete a session and all associated data.

**Response:**

```json
{
  "status": "success",
  "message": "Session deleted successfully"
}
```

---

### Session Endpoints

#### GET /v1/sessions

List all sessions with optional filtering.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | int | 1 | Page number |
| `page_size` | int | 20 | Items per page (max 100) |
| `status` | string | - | Filter by status |
| `scam_type` | string | - | Filter by scam type |
| `start_date` | string | - | ISO date filter |
| `end_date` | string | - | ISO date filter |

**Example:**

```
GET /v1/sessions?page=1&page_size=10&status=ONGOING
```

**Response:**

```json
{
  "items": [
    {
      "id": "sess_abc123",
      "status": "ONGOING",
      "scam_type": "KYC_FRAUD",
      "turn_count": 3,
      "started_at": "2026-02-04T10:00:00Z"
    }
  ],
  "total": 150,
  "page": 1,
  "page_size": 10,
  "total_pages": 15
}
```

---

#### GET /v1/sessions/{session_id}/intelligence

Get extracted intelligence for a session.

**Response:**

```json
{
  "session_id": "sess_abc123",
  "bank_accounts": [
    {
      "account_number": "50100123456789",
      "ifsc_code": "HDFC0001234",
      "bank_name": "HDFC Bank",
      "confidence": 0.95,
      "extracted_at": "2026-02-04T10:05:00Z"
    }
  ],
  "upi_ids": [
    {
      "id": "scammer@ybl",
      "confidence": 0.98,
      "extracted_at": "2026-02-04T10:03:00Z"
    }
  ],
  "phone_numbers": [
    {
      "number": "+919876543210",
      "type": "mobile",
      "confidence": 0.99,
      "extracted_at": "2026-02-04T10:02:00Z"
    }
  ],
  "phishing_links": [
    {
      "url": "http://fake-bank.example.com",
      "domain": "fake-bank.example.com",
      "confidence": 0.97,
      "extracted_at": "2026-02-04T10:04:00Z"
    }
  ],
  "total_entities": 4
}
```

---

### Intelligence Endpoints

#### GET /v1/intelligence

List all extracted intelligence across sessions.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `entity_type` | string | `bank_account`, `upi_id`, `phone`, `url` |
| `min_confidence` | float | Minimum confidence score (0-1) |

**Response:**

```json
{
  "items": [
    {
      "id": "intel_123",
      "session_id": "sess_abc",
      "entity_type": "upi_id",
      "value": "scammer@ybl",
      "confidence": 0.98,
      "extracted_at": "2026-02-04T10:00:00Z"
    }
  ],
  "total": 500
}
```

---

### Analytics Endpoints

#### GET /v1/analytics/summary

Get overall analytics summary.

**Response:**

```json
{
  "total_sessions": 1250,
  "active_sessions": 15,
  "total_messages": 8500,
  "total_entities_extracted": 450,
  "avg_turns_per_session": 6.8,
  "avg_response_time_ms": 1100,
  "scam_detection_rate": 0.92,
  "top_scam_type": "KYC_FRAUD",
  "period": {
    "start": "2026-01-01T00:00:00Z",
    "end": "2026-02-04T12:00:00Z"
  }
}
```

---

#### GET /v1/analytics/scam-types

Get scam type distribution.

**Response:**

```json
{
  "distribution": [
    { "type": "KYC_FRAUD", "count": 350, "percentage": 28.0 },
    { "type": "LOTTERY_SCAM", "count": 200, "percentage": 16.0 },
    { "type": "OTP_FRAUD", "count": 180, "percentage": 14.4 },
    { "type": "INVESTMENT_FRAUD", "count": 150, "percentage": 12.0 },
    { "type": "TECH_SUPPORT", "count": 120, "percentage": 9.6 },
    { "type": "JOB_SCAM", "count": 100, "percentage": 8.0 },
    { "type": "LOAN_SCAM", "count": 80, "percentage": 6.4 },
    { "type": "UNKNOWN", "count": 70, "percentage": 5.6 }
  ],
  "total": 1250
}
```

---

#### GET /v1/analytics/timeline

Get session timeline data.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `period` | string | `7d` | `24h`, `7d`, `30d`, `90d` |
| `granularity` | string | `day` | `hour`, `day`, `week` |

**Response:**

```json
{
  "data": [
    { "date": "2026-02-01", "sessions": 45, "messages": 312 },
    { "date": "2026-02-02", "sessions": 52, "messages": 378 },
    { "date": "2026-02-03", "sessions": 48, "messages": 345 },
    { "date": "2026-02-04", "sessions": 38, "messages": 265 }
  ],
  "period": "7d",
  "granularity": "day"
}
```

---

### Health Endpoints

#### GET /v1/health

Basic health check.

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2026-02-04T12:00:00Z",
  "version": "1.0.0"
}
```

---

#### GET /v1/health/ready

Readiness check with component status.

**Response:**

```json
{
  "status": "ready",
  "timestamp": "2026-02-04T12:00:00Z",
  "components": {
    "database": { "status": "connected" },
    "llm": { "status": "ready", "model": "llama-3.3-70b-versatile" }
  },
  "environment": "production"
}
```

---

#### GET /v1/health/live

Liveness probe (Kubernetes compatible).

**Response:**

```json
{
  "status": "alive"
}
```

---

## ❌ Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_REQUEST` | 400 | Malformed request body |
| `UNAUTHORIZED` | 401 | Missing or invalid API key |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily down |

---

## 📄 Pagination

List endpoints support cursor-based pagination:

```json
{
  "items": [...],
  "total": 1000,
  "page": 1,
  "page_size": 20,
  "total_pages": 50,
  "has_next": true,
  "has_prev": false
}
```

---

## 🔗 See Also

- [Architecture](./ARCHITECTURE.md) - System design
- [Backend Development](./BACKEND_DEVELOPMENT.md) - Development guide
- [Testing](./TESTING.md) - API testing guide
