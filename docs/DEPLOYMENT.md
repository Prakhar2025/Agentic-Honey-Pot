# 🚀 Deployment Guide

> ScamShield Honeypot API — Production Deployment on Render.com

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Deployment Options](#deployment-options)
- [Render.com Deployment](#rendercom-deployment)
- [Docker Deployment](#docker-deployment)
- [Health Checks](#health-checks)
- [Monitoring & Logging](#monitoring--logging)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

| Requirement | Version | Purpose |
|-------------|---------|---------|
| Python | 3.11+ | Runtime environment |
| Groq API Key | - | LLM inference |
| Git | Latest | Version control |
| Render Account | Free tier | Cloud hosting |

---

## Environment Variables

Create a `.env` file or configure in your deployment platform:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `GROQ_API_KEY` | ✅ | Groq API authentication key | `gsk_abc123xyz...` |
| `DATABASE_URL` | ❌ | SQLite database path | `sqlite:///./data/scamshield.db` |
| `ENVIRONMENT` | ❌ | Runtime environment | `production` |
| `LOG_LEVEL` | ❌ | Logging verbosity | `INFO` |
| `CORS_ORIGINS` | ❌ | Allowed CORS origins | `["https://yourdomain.com"]` |
| `RATE_LIMIT_RPM` | ❌ | Default rate limit per minute | `60` |

### Production Values

```bash
GROQ_API_KEY=gsk_your_production_key
DATABASE_URL=sqlite:///./data/scamshield.db
ENVIRONMENT=production
LOG_LEVEL=WARNING
CORS_ORIGINS=["https://api.scamshield.in"]
RATE_LIMIT_RPM=100
```

---

## Deployment Options

| Platform | Difficulty | Cost | Best For |
|----------|------------|------|----------|
| **Render.com** | ⭐ Easy | Free tier available | Hackathon/MVP |
| **Railway** | ⭐ Easy | $5 credit/month | Quick prototypes |
| **Docker + VPS** | ⭐⭐ Medium | ~$5/month | Custom control |
| **AWS Lambda** | ⭐⭐⭐ Complex | Pay-per-use | High scale |

---

## Render.com Deployment

### Step 1: Prepare Repository

Ensure your repository has these files:

```
scamshield-honeypot/
├── app/
│   └── main.py
├── requirements.txt
├── render.yaml          # Render configuration
└── .python-version      # Optional: Python version
```

### Step 2: Create `render.yaml`

```yaml
services:
  - type: web
    name: scamshield-api
    runtime: python
    region: singapore  # Closest to India
    plan: free
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: GROQ_API_KEY
        sync: false  # Set manually in dashboard
      - key: ENVIRONMENT
        value: production
      - key: LOG_LEVEL
        value: INFO
    healthCheckPath: /health
    autoDeploy: true
```

### Step 3: Deploy

1. Go to [render.com](https://render.com) and sign in
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Render will auto-detect `render.yaml`
5. Add `GROQ_API_KEY` in Environment settings
6. Click **Deploy**

### Step 4: Verify Deployment

```bash
# Check health endpoint
curl https://scamshield-api.onrender.com/health

# Expected response:
# {"status": "healthy", "version": "1.0.0"}
```

---

## Docker Deployment

### Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create non-root user
RUN adduser --disabled-password --gecos '' appuser
USER appuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Start server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - GROQ_API_KEY=${GROQ_API_KEY}
      - ENVIRONMENT=production
      - DATABASE_URL=sqlite:///./data/scamshield.db
    volumes:
      - ./data:/app/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### Build & Run

```bash
# Build image
docker build -t scamshield-api .

# Run container
docker run -d \
  --name scamshield \
  -p 8000:8000 \
  -e GROQ_API_KEY=your_key_here \
  scamshield-api

# Using docker-compose
docker-compose up -d
```

---

## Health Checks

### Endpoints

| Endpoint | Method | Auth | Response |
|----------|--------|------|----------|
| `/health` | GET | None | Service status |
| `/docs` | GET | None | OpenAPI docs |

### Health Response

```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2026-01-30T11:50:00+05:30",
  "components": {
    "database": "healthy",
    "llm_service": "healthy"
  }
}
```

### Monitoring Script

```bash
#!/bin/bash
# health_check.sh

API_URL="https://scamshield-api.onrender.com"

response=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/health")

if [ "$response" -eq 200 ]; then
    echo "✅ API is healthy"
    exit 0
else
    echo "❌ API is down (HTTP $response)"
    exit 1
fi
```

---

## Monitoring & Logging

### Render.com Logs

```bash
# View logs in Render dashboard
# Or use Render CLI
render logs scamshield-api --tail
```

### Log Format (Structured JSON)

```json
{
  "timestamp": "2026-01-30T11:50:00Z",
  "level": "INFO",
  "message": "Request processed",
  "request_id": "req_abc123",
  "path": "/v1/honeypot",
  "method": "POST",
  "status_code": 200,
  "duration_ms": 156
}
```

### Recommended Monitoring Tools

| Tool | Purpose | Integration |
|------|---------|-------------|
| **Render Metrics** | CPU, Memory, Requests | Built-in |
| **UptimeRobot** | Uptime monitoring | Free tier |
| **Sentry** | Error tracking | SDK available |
| **Logflare** | Log aggregation | Render add-on |

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| `503 Service Unavailable` | Cold start on free tier | Wait 30s, Render spins up |
| `401 Unauthorized` | Invalid/missing API key | Check `X-API-Key` header |
| `429 Too Many Requests` | Rate limit exceeded | Wait and retry |
| `500 Internal Error` | Groq API failure | Check `GROQ_API_KEY` |

### Debug Mode

```bash
# Local debugging
export LOG_LEVEL=DEBUG
uvicorn app.main:app --reload

# Check specific issues
curl -v https://your-api.onrender.com/health
```

### Cold Start Optimization

Render.com free tier sleeps after 15 minutes of inactivity.

**Solutions:**
1. Use a cron job to ping `/health` every 10 minutes
2. Upgrade to paid tier ($7/month) for always-on
3. Use UptimeRobot for free pings

```bash
# Cron job (on external server)
*/10 * * * * curl -s https://scamshield-api.onrender.com/health > /dev/null
```

---

## Production Checklist

- [ ] `GROQ_API_KEY` set in environment
- [ ] `ENVIRONMENT=production` configured
- [ ] Health check endpoint responding
- [ ] CORS origins configured correctly
- [ ] Rate limiting enabled
- [ ] Monitoring/alerting set up
- [ ] Database backups configured (if applicable)
- [ ] SSL/TLS enabled (automatic on Render)

---

## Render.com Free Tier Limits

| Resource | Limit |
|----------|-------|
| **Instances** | 1 |
| **RAM** | 512 MB |
| **CPU** | Shared |
| **Bandwidth** | 100 GB/month |
| **Sleep** | After 15 min inactive |
| **Build Time** | 500 min/month |

> 💡 **Tip:** For hackathon demo, free tier is sufficient. Consider upgrading for production use.

---

<p align="center"><em>Deploy with confidence. Scale when ready.</em></p>
