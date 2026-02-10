# ScamShield Deployment Guide

## Deployment Options

This guide covers deploying the ScamShield frontend to various platforms.

## Table of Contents

- [Vercel (Recommended)](#vercel-recommended)
- [Docker](#docker)
- [AWS](#aws)
- [Google Cloud Platform](#google-cloud-platform)
- [Environment Variables](#environment-variables)

## Vercel (Recommended)

Vercel is the recommended platform for deploying Next.js applications.

### Prerequisites

- Vercel account
- GitHub repository connected to Vercel

### Steps

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy from CLI**
   ```bash
   cd frontend
   vercel
   ```

3. **Or Deploy from GitHub**
   - Push your code to GitHub
   - Import your repository in Vercel
   - Configure environment variables
   - Deploy!

### Environment Variables

Add these in Vercel Project Settings → Environment Variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=production
```

## Docker

### Build and Run

```bash
# Build the image
docker build -t scamshield-frontend .

# Run the container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.scamshield.ai \
  scamshield-frontend
```

### Docker Compose

```bash
docker-compose up -d
```

### Multi-stage Build Benefits

The Dockerfile uses multi-stage builds for:
- Smaller image size
- Faster builds with layer caching
- Production-only dependencies
- Security with non-root user

## AWS

### AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect GitHub repository
   - Select `frontend` as base directory

2. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - cd frontend
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: frontend/.next
       files:
         - '**/*'
     cache:
       paths:
         - frontend/node_modules/**/*
   ```

3. **Environment Variables**
   - Add in Amplify Console → Environment variables

### AWS EC2 + Docker

```bash
# SSH into EC2 instance
ssh -i your-key.pem ec2-user@your-ec2-ip

# Install Docker
sudo yum update -y
sudo yum install docker -y
sudo service docker start

# Clone and run
git clone your-repo
cd your-repo/frontend
docker build -t scamshield .
docker run -d -p 80:3000 scamshield
```

## Google Cloud Platform

### Cloud Run

1. **Build and Push Image**
   ```bash
   # Set project ID
   export PROJECT_ID=your-project-id
   
   # Build with Cloud Build
   gcloud builds submit --tag gcr.io/$PROJECT_ID/scamshield-frontend
   ```

2. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy scamshield-frontend \
     --image gcr.io/$PROJECT_ID/scamshield-frontend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars NEXT_PUBLIC_API_URL=https://api.scamshield.ai
   ```

### App Engine

1. **Create `app.yaml`**
   ```yaml
   runtime: nodejs20
   env: standard
   instance_class: F2
   
   env_variables:
     NEXT_PUBLIC_API_URL: "https://api.scamshield.ai"
   
   handlers:
     - url: /_next/static
       static_dir: .next/static
       secure: always
     
     - url: /.*
       script: auto
       secure: always
   ```

2. **Deploy**
   ```bash
   gcloud app deploy
   ```

## Environment Variables

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `https://api.scamshield.ai` |

### Optional

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_VERSION` | Application version | `1.0.0` |
| `NODE_ENV` | Node environment | `production` |

## Performance Optimization

### Enable Caching

```nginx
# Nginx configuration
location /_next/static {
    alias /app/.next/static;
    expires 1y;
    access_log off;
    add_header Cache-Control "public, immutable";
}

location /static {
    alias /app/public;
    expires 1d;
    access_log off;
}
```

### CDN Setup

1. **Vercel**: Built-in Edge Network (no configuration needed)
2. **AWS**: Use CloudFront
3. **GCP**: Use Cloud CDN

## Health Checks

The application exposes a health check endpoint:

```bash
curl https://your-domain.com/api/health
```

## Monitoring

### Vercel Analytics

Built-in analytics are included via `@vercel/analytics`.

View in: Vercel Dashboard → Analytics

### Sentry

Error tracking is configured via Next.js integration.

1. Set Sentry DSN in environment variables
2. Errors automatically reported
3. View in Sentry dashboard

## Troubleshooting

### Build Fails

**Issue**: `Cannot find module`
```bash
# Solution: Clean install
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Memory limit exceeded
```bash
# Solution: Increase Node memory
NODE_OPTIONS="--max_old_space_size=4096" npm run build
```

### Runtime Errors

**Issue**: API connection refused
- Check `NEXT_PUBLIC_API_URL` is correct
- Ensure CORS is configured on backend
- Verify network/firewall settings

**Issue**: Static files not loading
- Verify `output: 'standalone'` in next.config.js
- Check file permissions in Docker
- Ensure CDN is properly configured

## Rollback

### Vercel
```bash
# List deployments
vercel list

# Promote previous deployment
vercel promote [deployment-url]
```

### Docker
```bash
# Tag and keep previous version
docker tag scamshield:latest scamshield:previous

# Rollback
docker stop scamshield-current
docker run -d --name scamshield scamshield:previous
```

## Security Checklist

- [ ] Environment variables secured (no hardcoded secrets)
- [ ] HTTPS enabled
- [ ] Security headers configured (CSP, HSTS, etc.)
- [ ] API endpoints use authentication
- [ ] Dependencies updated (no known vulnerabilities)
- [ ] Docker image from trusted base
- [ ] Non-root user in Docker container
- [ ] Rate limiting configured
- [ ] Monitoring and logging enabled

## Support

For deployment issues:
1. Check logs: `vercel logs` or `docker logs`
2. Review documentation
3. Contact support team

---

**Last Updated**: February 2026  
**Maintained By**: ScamShield Team
