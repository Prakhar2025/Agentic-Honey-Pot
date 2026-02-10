# Deployment Guide

## 🚀 Deployment Options

### 1. Vercel (Recommended for Frontend)

```bash
cd frontend
npx vercel --prod
```

**Environment Variables to set on Vercel:**
| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://scamshield-honeypot.onrender.com` |

### 2. Docker

```bash
cd frontend

# Build
docker build -t scamshield-frontend .

# Run
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://scamshield-honeypot.onrender.com \
  scamshield-frontend

# Or use Docker Compose
docker-compose up -d
```

### 3. Render

The backend is already deployed on Render at:
- **API**: `https://scamshield-honeypot.onrender.com`

To deploy frontend on Render:
1. Create a new **Static Site** or **Web Service**
2. Set build command: `cd frontend && npm install && npm run build`
3. Set start command: `cd frontend && npm start`
4. Add environment variable: `NEXT_PUBLIC_API_URL`

### 4. Manual / VPS

```bash
# Install dependencies
cd frontend
npm ci

# Build
npm run build

# Start production server
npm start
```

## 🔧 Backend Deployment

Backend is a FastAPI application deployed on Render.

### Required Environment Variables (Backend)

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Groq API key for LLaMA inference |
| `MONGODB_URI` | MongoDB connection string |
| `REDIS_URL` | Redis connection URL |
| `ALLOWED_ORIGINS` | CORS allowed origins |

### Health Check

```bash
curl https://scamshield-honeypot.onrender.com/api/v1/health
```

## 📊 Monitoring

- Use `/api/v1/health/detailed` for component-level health checks
- Monitor API response times via the Analytics dashboard
- Set up uptime monitoring (e.g., UptimeRobot, Better Stack)

## 🔒 Security Checklist

- [x] HTTPS enforced
- [x] HSTS headers configured
- [x] X-Content-Type-Options: nosniff
- [x] X-Frame-Options: DENY
- [x] Referrer-Policy configured
- [x] CORS restricted to allowed origins
- [x] Rate limiting on API endpoints
- [x] Non-root Docker user
