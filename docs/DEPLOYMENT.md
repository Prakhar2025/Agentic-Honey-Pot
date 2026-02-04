# 🚀 Deployment Guide

**Complete Deployment Documentation**

---

## 📋 Table of Contents

- [Environment Variables](#-environment-variables)
- [Backend Deployment (Render)](#-backend-deployment-rendercom)
- [Frontend Deployment (Vercel)](#-frontend-deployment-vercel)
- [Docker Deployment](#-docker-deployment)
- [Docker Compose](#-docker-compose)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Health Checks](#-health-checks)
- [Monitoring](#-monitoring)
- [Logging](#-logging)
- [Scaling](#-scaling)

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GROQ_API_KEY` | Groq LLM API key | `gsk_abc123...` |
| `API_KEY` | API authentication key | `ss_live_abc123` |
| `GROQ_MODEL` | LLM model name | `llama-3.3-70b-versatile` |

### Optional Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `sqlite+aiosqlite:///./honeypot.db` | Database connection |
| `ENVIRONMENT` | `development` | `development`/`production` |
| `DEBUG` | `false` | Enable debug mode |
| `LOG_LEVEL` | `INFO` | Logging level |
| `MAX_TURNS` | `20` | Max conversation turns |
| `CORS_ORIGINS` | `*` | Allowed CORS origins |

### Example .env File

```env
# Required
GROQ_API_KEY=gsk_your_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
API_KEY=ss_live_your_secure_key

# Optional
ENVIRONMENT=production
DEBUG=false
LOG_LEVEL=INFO
DATABASE_URL=sqlite+aiosqlite:///./honeypot.db
```

---

## 🌐 Backend Deployment (Render.com)

### Method 1: One-Click Deploy

Click the button below to deploy to Render:

[Deploy to Render](https://render.com/deploy)

### Method 2: Manual Setup

#### 1. Create Web Service

1. Go to [render.com](https://render.com) → Dashboard
2. Click **New** → **Web Service**
3. Connect GitHub repository

#### 2. Configure Service

| Setting | Value |
|---------|-------|
| Name | scamshield-honeypot |
| Runtime | Python 3 |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |
| Plan | Free |

#### 3. Set Environment Variables

In Render Dashboard → Environment:

```
GROQ_API_KEY=gsk_xxx
API_KEY=ss_live_xxx
GROQ_MODEL=llama-3.3-70b-versatile
PYTHON_VERSION=3.11.9
```

#### 4. Deploy

Render auto-deploys on push to `main` branch.

### render.yaml (Infrastructure as Code)

```yaml
services:
  - type: web
    name: scamshield-honeypot
    runtime: python
    plan: free
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
    healthCheckPath: /v1/health
    envVars:
      - key: PYTHON_VERSION
        value: "3.11.9"
      - key: GROQ_API_KEY
        sync: false
      - key: API_KEY
        sync: false
      - key: GROQ_MODEL
        value: llama-3.3-70b-versatile
```

---

## 🎨 Frontend Deployment (Vercel)

### Method 1: One-Click Deploy

[Deploy with Vercel](https://vercel.com/new)

### Method 2: CLI Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel

# Production deploy
vercel --prod
```

### Vercel Configuration

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_API_URL": "https://scamshield-honeypot.onrender.com"
  }
}
```

### Environment Variables

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | https://scamshield-honeypot.onrender.com |
| `NEXT_PUBLIC_API_KEY` | Your API key |

---

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/v1/health || exit 1

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Build and Run

```bash
# Build image
docker build -t scamshield:latest .

# Run container
docker run -d \
  --name scamshield \
  -p 8000:8000 \
  -e GROQ_API_KEY=your_key \
  -e API_KEY=your_api_key \
  scamshield:latest

# View logs
docker logs -f scamshield
```

---

## 🐳 Docker Compose

### docker-compose.yml

```yaml
version: '3.8'

services:
  api:
    build: .
    container_name: scamshield-api
    ports:
      - "8000:8000"
    environment:
      - GROQ_API_KEY=${GROQ_API_KEY}
      - API_KEY=${API_KEY}
      - GROQ_MODEL=llama-3.3-70b-versatile
      - DATABASE_URL=sqlite+aiosqlite:///./data/honeypot.db
    volumes:
      - ./data:/app/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/v1/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped

  frontend:
    build: ./frontend
    container_name: scamshield-frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://api:8000
    depends_on:
      - api

volumes:
  data:
```

### Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild
docker-compose up -d --build
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: pip install -r requirements.txt
      
      - name: Run tests
        run: pytest tests/ -v
        env:
          GROQ_API_KEY: ${{ secrets.GROQ_API_KEY }}

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v0.0.8
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

### Branch Strategy

| Branch | Deployment |
|--------|------------|
| `main` | Production (auto-deploy) |
| `develop` | Staging (manual) |
| `feature/*` | Preview (PR deploys) |

---

## ❤️ Health Checks

### Endpoints

| Endpoint | Purpose | Response |
|----------|---------|----------|
| `/v1/health` | Basic health | `{"status": "healthy"}` |
| `/v1/health/ready` | Readiness | DB + LLM status |
| `/v1/health/live` | Liveness | `{"status": "alive"}` |

### Render Health Check

```yaml
healthCheckPath: /v1/health
```

### Docker Health Check

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/v1/health || exit 1
```

### Kubernetes Probes

```yaml
livenessProbe:
  httpGet:
    path: /v1/health/live
    port: 8000
  initialDelaySeconds: 5
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /v1/health/ready
    port: 8000
  initialDelaySeconds: 10
  periodSeconds: 5
```

---

## 📊 Monitoring

### UptimeRobot Setup

1. Create account at [uptimerobot.com](https://uptimerobot.com)
2. Add new monitor:
   - Type: HTTP(s)
   - URL: `https://scamshield-honeypot.onrender.com/v1/health`
   - Interval: 5 minutes

### Metrics to Monitor

| Metric | Threshold | Alert |
|--------|-----------|-------|
| Response Time | > 3s | Warning |
| Error Rate | > 5% | Critical |
| Uptime | < 99% | Critical |
| CPU Usage | > 80% | Warning |
| Memory | > 90% | Critical |

### Render Dashboard

Render provides built-in metrics:

- Request count
- Response time
- Memory usage
- CPU usage

---

## 📝 Logging

### Configuration

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),
    ]
)
```

### Log Levels

| Level | Usage |
|-------|-------|
| `DEBUG` | Detailed debugging |
| `INFO` | General information |
| `WARNING` | Potential issues |
| `ERROR` | Error occurred |
| `CRITICAL` | System failure |

### Structured Logging

```python
import json
import logging

logger = logging.getLogger(__name__)

logger.info(json.dumps({
    "event": "session_created",
    "session_id": session_id,
    "scam_type": scam_type,
    "timestamp": datetime.utcnow().isoformat()
}))
```

### Log Aggregation (Optional)

For production, consider:

- **Papertrail** - Log aggregation
- **Datadog** - Full observability
- **Sentry** - Error tracking

---

## 📈 Scaling

### Horizontal Scaling

```yaml
services:
  - type: web
    name: scamshield-honeypot
    plan: standard
    autoDeploy: true
    scaling:
      minInstances: 1
      maxInstances: 3
      targetMemoryPercent: 80
      targetCPUPercent: 70
```

### Database Scaling

| Stage | Database | When |
|-------|----------|------|
| MVP | SQLite | < 10K sessions |
| Growth | PostgreSQL | < 100K sessions |
| Scale | PostgreSQL + Read Replicas | > 100K sessions |

### Performance Tips

1. Enable Response Caching for analytics endpoints
2. Use Connection Pooling for database
3. Implement Rate Limiting to prevent abuse
4. Add CDN for static assets (frontend)

---

## 🔗 Related Documentation

- [Backend Development](./BACKEND_DEVELOPMENT.md)
- [Security](./SECURITY.md)
- [Troubleshooting](./TROUBLESHOOTING.md)
