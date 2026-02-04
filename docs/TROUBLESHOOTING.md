<![CDATA[# ❓ Troubleshooting Guide

<div align="center">

![Help](https://img.shields.io/badge/Support-Available-blue?style=for-the-badge)

**Common Issues and Solutions**

</div>

---

## 🔧 Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| API returns 401 | Check `x-api-key` header |
| LLM not responding | Verify `GROQ_API_KEY` |
| Database errors | Delete `honeypot.db` and restart |
| Import errors | Run `pip install -r requirements.txt` |

---

## 🔴 API Errors

### 401 Unauthorized

**Error:**
```json
{"detail": "Invalid or missing API key"}
```

**Causes:**
1. Missing `x-api-key` header
2. Incorrect API key value
3. API key not set in environment

**Solution:**
```bash
# Set API key in .env
API_KEY=your_api_key_here

# Use in request
curl -H "x-api-key: your_api_key_here" ...
```

---

### 404 Not Found

**Error:**
```json
{"detail": "Session not found"}
```

**Causes:**
1. Invalid session ID
2. Session was deleted
3. Session never created

**Solution:**
```bash
# Verify session exists
curl "http://localhost:8000/v1/sessions" \
  -H "x-api-key: your_key"
```

---

### 422 Validation Error

**Error:**
```json
{
  "detail": [
    {
      "loc": ["body", "scammer_message"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

**Causes:**
1. Missing required field
2. Wrong field type
3. Invalid JSON

**Solution:**
```bash
# Ensure correct format
curl -X POST "http://localhost:8000/v1/honeypot/engage" \
  -H "Content-Type: application/json" \
  -d '{"scammer_message": "Your message here"}'
```

---

### 500 Internal Server Error

**Error:**
```json
{"detail": "Internal server error"}
```

**Causes:**
1. LLM API failure
2. Database connection issue
3. Unhandled exception

**Solution:**
```bash
# Check server logs
uvicorn app.main:app --reload

# Enable debug mode
DEBUG=true uvicorn app.main:app --reload
```

---

## 🗄️ Database Errors

### Database Locked

**Error:**
```
sqlite3.OperationalError: database is locked
```

**Causes:**
1. Multiple processes accessing DB
2. Unclosed connections
3. Long-running transactions

**Solution:**
```bash
# Stop all server instances
pkill -f uvicorn

# Delete database and restart
rm honeypot.db
uvicorn app.main:app --reload
```

---

### Migration Error

**Error:**
```
sqlalchemy.exc.OperationalError: no such table
```

**Solution:**
```python
# In Python shell
from app.db.database import init_db
import asyncio
asyncio.run(init_db())
```

---

## 🤖 LLM Errors

### Groq API Key Invalid

**Error:**
```
groq.AuthenticationError: Invalid API key
```

**Solution:**
1. Get key from [console.groq.com](https://console.groq.com)
2. Set in `.env`:
   ```
   GROQ_API_KEY=gsk_your_key_here
   ```

---

### Rate Limit Exceeded

**Error:**
```
groq.RateLimitError: Rate limit exceeded
```

**Solution:**
1. Wait 60 seconds
2. Reduce request frequency
3. Upgrade Groq tier

---

### Model Not Found

**Error:**
```
Model 'llama-3.3-70b-versatile' not found
```

**Solution:**
```bash
# Use correct model name
GROQ_MODEL=llama-3.3-70b-versatile
```

---

## 🚀 Deployment Issues

### Render Build Fails

**Error:**
```
ERROR: Could not find a version that satisfies the requirement
```

**Solution:**
1. Check `requirements.txt` versions
2. Ensure Python version matches
3. Remove version constraints

```yaml
# render.yaml
envVars:
  - key: PYTHON_VERSION
    value: "3.11.9"
```

---

### Health Check Fails

**Error:**
```
Health check failed: 503
```

**Causes:**
1. Server still starting
2. Database not ready
3. LLM not configured

**Solution:**
```yaml
# render.yaml
healthCheckPath: /v1/health
initialDeployHook: true
```

---

### Port Binding Error

**Error:**
```
Address already in use: bind
```

**Solution:**
```bash
# Find process using port
lsof -i :8000

# Kill process
kill -9 <PID>

# Use different port
uvicorn app.main:app --port 8001
```

---

## ⚡ Performance Issues

### Slow Response Times

**Causes:**
1. LLM latency
2. Database queries
3. Network issues

**Solutions:**
1. Use faster LLM model
2. Add database indexes
3. Enable connection pooling

```python
# Faster model
GROQ_MODEL=llama-3.1-8b-instant
```

---

### Memory Issues

**Error:**
```
MemoryError: Unable to allocate
```

**Solution:**
1. Increase server memory
2. Implement pagination
3. Clean old sessions

```bash
# Cleanup old data
python scripts/cleanup_old_data.py --days 30
```

---

## 📋 FAQ

### Q: How do I reset the database?

```bash
rm honeypot.db
uvicorn app.main:app --reload
```

### Q: How do I test locally?

```bash
# Run server
uvicorn app.main:app --reload

# Test endpoint
curl -X POST "http://localhost:8000/v1/honeypot/engage" \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_key" \
  -d '{"scammer_message": "Your KYC expired"}'
```

### Q: Where are the logs?

Logs go to stdout. In production, configure logging:
```python
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
```

### Q: How do I add a new persona?

See [Backend Development Guide](./BACKEND_DEVELOPMENT.md#adding-new-personas).

---

## 📞 Getting Help

1. **Check Documentation**: Review all docs
2. **Search Issues**: GitHub Issues
3. **Ask Questions**: GitHub Discussions
4. **Report Bugs**: Create Issue with template

---

## 🔗 Related Documentation

- [Backend Development](./BACKEND_DEVELOPMENT.md)
- [Deployment](./DEPLOYMENT.md)
- [API Reference](./API_REFERENCE.md)
]]>
