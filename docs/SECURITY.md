# 🔒 Security Documentation

**Security Practices & Considerations**

---

## 🏛️ Security Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐       │
│    │   API Key   │───▶│   CORS      │───▶│ Rate Limit  │       │
│    │   Auth      │    │   Policy    │    │  Throttle   │       │
│    └─────────────┘    └─────────────┘    └─────────────┘       │
│           │                                      │              │
│           ▼                                      ▼              │
│    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐       │
│    │   Input     │───▶│  Endpoint   │───▶│   Response  │       │
│    │ Validation  │    │   Logic     │    │  Sanitize   │       │
│    └─────────────┘    └─────────────┘    └─────────────┘       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication & Authorization

### API Key Authentication

All protected endpoints require a valid API key:

```
x-api-key: YOUR_API_KEY
```

**Implementation:**

```python
# app/middleware/auth.py
class APIKeyMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.url.path in PUBLIC_PATHS:
            return await call_next(request)
        
        api_key = request.headers.get("x-api-key")
        if not api_key or api_key != settings.api_key:
            return JSONResponse(
                status_code=401,
                content={"error": "Invalid or missing API key"}
            )
        return await call_next(request)
```

### Public Endpoints

| Endpoint | Reason |
|----------|--------|
| `/` | Root info |
| `/docs` | Swagger UI |
| `/redoc` | ReDoc UI |
| `/openapi.json` | OpenAPI spec |
| `/v1/health` | Health checks |
| `/v1/health/ready` | Readiness probe |
| `/v1/health/live` | Liveness probe |

---

## 🔑 API Key Management

### Key Generation

```python
import secrets

# Generate secure API key
api_key = f"ss_live_{secrets.token_urlsafe(32)}"
```

### Key Storage

| Environment | Storage |
|-------------|---------|
| Development | `.env` file |
| Production | Environment variables |
| CI/CD | GitHub Secrets |

### Key Rotation

1. Generate new key
2. Add to environment
3. Update clients
4. Remove old key

---

## 🛡️ Data Protection

### Sensitive Data Handling

| Data Type | Protection |
|-----------|------------|
| API Keys | Environment variables |
| Scammer Data | Encrypted at rest |
| LLM Prompts | No PII included |
| Logs | Sanitized output |

### What We DON'T Store

- Real victim information
- Actual financial data
- Personal credentials
- Real OTPs

### What We DO Store

- Scammer-provided fake data
- Phone numbers scammers give
- UPI IDs scammers share
- Phishing links scammers send

---

## ✅ Input Validation

### Pydantic Validation

```python
from pydantic import BaseModel, Field, validator

class EngageRequest(BaseModel):
    scammer_message: str = Field(..., min_length=1, max_length=5000)
    source_type: str = Field(default="sms", pattern="^(sms|whatsapp|email|chat)$")
    
    @validator('scammer_message')
    def clean_message(cls, v):
        # Remove potentially dangerous content
        return v.strip()
```

### SQL Injection Prevention

- Using SQLAlchemy ORM (parameterized queries)
- Never raw SQL execution
- Input sanitization

---

## 🚦 Rate Limiting

### Configuration

| Tier | Requests/Min | Burst |
|------|--------------|-------|
| Free | 60 | 10 |
| Standard | 300 | 50 |
| Enterprise | Unlimited | - |

### Response Headers

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1706184000
```

---

## 🌐 CORS Configuration

```python
# app/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://scamshield-frontend.vercel.app"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
```

### Production Settings

| Setting | Value |
|---------|-------|
| Allowed Origins | Frontend domain only |
| Credentials | Enabled |
| Methods | Specific list |
| Headers | All (with x-api-key) |

---

## ⚖️ Ethical Considerations

### Purpose

ScamShield is designed to:

- ✅ Protect potential scam victims
- ✅ Gather intelligence on scam operations
- ✅ Support law enforcement
- ✅ Waste scammer resources

### Boundaries

ScamShield will NEVER:

- ❌ Provide real personal information
- ❌ Complete actual transactions
- ❌ Share real OTPs or credentials
- ❌ Engage in illegal activity
- ❌ Target legitimate businesses

### Safety Checks

```python
# app/agent/safety.py
FORBIDDEN_PATTERNS = [
    r'\b\d{16}\b',  # Real card numbers
    r'\b\d{4}\b\s*\d{4}\b',  # Real OTPs
    r'actual|real|genuine',  # Real data indicators
]

def is_safe_response(response: str) -> bool:
    for pattern in FORBIDDEN_PATTERNS:
        if re.search(pattern, response, re.I):
            return False
    return True
```

---

## 📝 Data Retention Policy

| Data Type | Retention | Reason |
|-----------|-----------|--------|
| Active Sessions | Indefinite | Ongoing investigations |
| Completed Sessions | 90 days | Intelligence value |
| Messages | 90 days | Context preservation |
| Intelligence | 1 year | Law enforcement use |
| Logs | 30 days | Debugging |

### Data Deletion

```bash
# Manual cleanup
python scripts/cleanup_old_data.py --days 90
```

---

## 🚨 Incident Response

### Security Issue Detected

1. **Identify**: Determine scope
2. **Contain**: Disable affected endpoints
3. **Eradicate**: Fix vulnerability
4. **Recover**: Restore service
5. **Review**: Post-mortem analysis

### Contact

For security issues, contact:

- Email: security@scamshield.example
- GitHub: Create private security advisory

---

## 🔗 Related Documentation

- [API Reference](./API_REFERENCE.md)
- [Deployment](./DEPLOYMENT.md)
- [Troubleshooting](./TROUBLESHOOTING.md)
