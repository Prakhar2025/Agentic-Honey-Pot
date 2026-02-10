# 📚 ScamShield Documentation

**ScamShield - Agentic Honeypot** | Version 1.0.0 | Status: Production

**AI-Powered Autonomous Scam Engagement & Intelligence Extraction System**

*Built for India AI Impact Buildathon 2026*

---

## 🚀 Quick Navigation

| Section | Description |
|---------|-------------|
| [📖 Overview](./OVERVIEW.md) | Problem statement, solution, and key features |
| [🏗️ Architecture](./ARCHITECTURE.md) | System design, components, and data flow |
| [📡 API Reference](./API_REFERENCE.md) | Complete API documentation with examples |
| [💻 Backend Development](./BACKEND_DEVELOPMENT.md) | Setup and development guide |
| [🎨 Frontend Development](./FRONTEND_DEVELOPMENT.md) | UI development guide |
| [🗄️ Database Schema](./DATABASE_SCHEMA.md) | Data models and relationships |
| [🚀 Deployment](./DEPLOYMENT.md) | Production deployment guide |
| [🔒 Security](./SECURITY.md) | Security practices and considerations |
| [🧪 Testing](./TESTING.md) | Testing strategy and execution |
| [🤝 Contributing](./CONTRIBUTING.md) | Contribution guidelines |
| [📋 Changelog](./CHANGELOG.md) | Version history |
| [❓ Troubleshooting](./TROUBLESHOOTING.md) | Common issues and solutions |
| [📘 Glossary](./GLOSSARY.md) | Terms and definitions |

---

## ✨ Key Features

### 🤖 Agentic AI Core

- Autonomous multi-turn conversations
- Self-correcting behavior
- Dynamic persona switching
- Intelligent engagement timing

### 🎭 5 Victim Personas

- Elderly Victim (confused grandparent)
- Tech Novice (overwhelmed user)
- Eager Investor (greedy target)
- Busy Professional (distracted)
- Helpful Auntie (oversharing)

### 🔍 Intelligence Extraction

- Bank account numbers
- UPI IDs
- Phone numbers
- Phishing links
- Email addresses
- Crypto wallets

### 📊 8 Scam Types Detected

- KYC Fraud
- Lottery Scam
- Tech Support Scam
- Investment Fraud
- Job Scam
- Loan Scam
- OTP Fraud
- Unknown/Other

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| Backend Framework | FastAPI 0.109.0 |
| Language | Python 3.11+ |
| LLM Provider | Groq (LLaMA 3.3-70b-versatile) |
| Database | SQLAlchemy 2.0 + aiosqlite |
| Validation | Pydantic 2.5.3 |
| Frontend | Next.js 14 + Tailwind CSS (Planned) |
| Deployment | Render.com (Backend) + Vercel (Frontend) |

---

## 🏃 Quick Start

```bash
# Clone repository
git clone https://github.com/Prakhar2025/Agentic-Honey-Pot.git
cd Agentic-Honey-Pot

# Setup environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Add your GROQ_API_KEY to .env

# Run server
uvicorn app.main:app --reload
```

- **API available at:** `http://localhost:8000`
- **Documentation:** `http://localhost:8000/docs`

---

## 📞 API Quick Example

```bash
curl -X POST "http://localhost:8000/v1/honeypot/engage" \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "sessionId": "test-001",
    "message": {
      "sender": "scammer",
      "text": "Your bank account will be blocked. Share OTP now!"
    }
  }'
```

**Response:**

```json
{
  "status": "success",
  "reply": "Oh dear, my account blocked? What is OTP? My grandson usually helps me..."
}
```

---

## 🌐 Live Deployment

| Environment | URL |
|-------------|-----|
| Production API | https://scamshield-honeypot.onrender.com |
| API Docs | https://scamshield-honeypot.onrender.com/docs |
| Health Check | https://scamshield-honeypot.onrender.com/v1/health |

---

## 📈 Project Status

| Component | Status | Progress |
|-----------|--------|----------|
| Backend API | ✅ Complete | 100% |
| Database Layer | ✅ Complete | 100% |
| LLM Integration | ✅ Complete | 100% |
| Authentication | ✅ Complete | 100% |
| Documentation | ✅ Complete | 100% |
| Frontend UI | 🚧 In Progress | 0% |

---

## 🏆 Hackathon

**India AI Impact Buildathon 2026**

- **Problem:** India loses ₹60 crore daily to online scams
- **Solution:** AI-powered honeypot that engages scammers and extracts intelligence
- **Impact:** Helps law enforcement identify scammer networks

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](../LICENSE) file.

---

**Made with ❤️ for a safer India**

[Report Bug](https://github.com/Prakhar2025/Agentic-Honey-Pot/issues) · [Request Feature](https://github.com/Prakhar2025/Agentic-Honey-Pot/issues)
