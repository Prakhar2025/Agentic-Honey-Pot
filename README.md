# 🛡️ ScamShield

### Agentic Honey-Pot for Scam Detection & Intelligence Extraction

**Python 3.11+** | **FastAPI 0.109.0** | **Groq LLaMA 3.3** | **MIT License** | **Production Ready**

**AI-powered autonomous system that engages scammers and extracts intelligence**

[Documentation](./docs/index.md) · [API Reference](./docs/API_REFERENCE.md) · [Live Demo](https://scamshield-honeypot.onrender.com/docs)

---

## 🎯 The Problem

> **India loses ₹60 crore (₹600 million) DAILY to online scams**

Traditional detection methods fail because scammers constantly evolve tactics. Manual engagement is slow and doesn't scale.

## 💡 The Solution

ScamShield is an **AI-powered honeypot** that:

| Feature | Description |
|---------|-------------|
| 🤖 **Autonomous Engagement** | Multi-turn conversations with scammers |
| 🎭 **5 Victim Personas** | Elderly, Tech Novice, Investor, Professional, Auntie |
| 🔍 **Intelligence Extraction** | Bank accounts, UPI IDs, phone numbers, links |
| 📊 **8 Scam Types** | KYC, Lottery, Tech Support, Investment, Job, Loan, OTP |

---

## ✨ Key Features

- **🤖 Agentic AI Core** - Autonomous multi-turn conversations using LLaMA 3.3-70b
- **🎭 Dynamic Personas** - 5 victim profiles that adapt behavior during engagement
- **🔍 Real-time Extraction** - Capture phone numbers, UPI IDs, bank accounts, phishing links
- **📡 13 REST API Endpoints** - Complete API for integration
- **🔐 Enterprise Security** - API key auth, rate limiting, CORS
- **📊 Analytics Dashboard** - Track scam patterns and intelligence

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | FastAPI 0.109.0 |
| Language | Python 3.11+ |
| LLM | Groq (LLaMA 3.3-70b-versatile) |
| Database | SQLAlchemy 2.0 + SQLite |
| Validation | Pydantic 2.5.3 |
| Deployment | Render.com |

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/Prakhar2025/Agentic-Honey-Pot.git
cd Agentic-Honey-Pot

# Setup
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure
cp .env.example .env
# Add GROQ_API_KEY to .env

# Run
uvicorn app.main:app --reload
```

- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/docs

---

## 📡 API Usage

```bash
curl -X POST "http://localhost:8000/v1/honeypot/engage" \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "scammer_message": "Your bank account will be blocked. Share OTP!",
    "source_type": "sms"
  }'
```

**Response:**

```json
{
  "session_id": "sess_abc123",
  "response": "Oh dear, my account blocked? What is OTP?",
  "persona_used": "elderly_victim",
  "scam_type": "OTP_FRAUD",
  "extracted_intelligence": {
    "phone_numbers": [],
    "upi_ids": [],
    "bank_accounts": []
  }
}
```

---

## 📁 Project Structure

```
app/
├── main.py              # FastAPI entry
├── api/v1/              # API routes
├── agent/               # Agentic AI core
├── personas/            # 5 victim personas
├── intelligence/        # Entity extraction
├── scam_detection/      # Scam classification
├── services/            # External services
└── db/                  # Database layer
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Overview](./docs/OVERVIEW.md) | Problem, solution, features |
| [Architecture](./docs/ARCHITECTURE.md) | System design |
| [API Reference](./docs/API_REFERENCE.md) | Complete API docs |
| [Backend Development](./docs/BACKEND_DEVELOPMENT.md) | Dev guide |
| [Frontend Development](./docs/FRONTEND_DEVELOPMENT.md) | UI guide |
| [Database Schema](./docs/DATABASE_SCHEMA.md) | Data models |
| [Deployment](./docs/DEPLOYMENT.md) | Production setup |
| [Security](./docs/SECURITY.md) | Security practices |
| [Testing](./docs/TESTING.md) | Test guide |
| [Contributing](./docs/CONTRIBUTING.md) | Contribution guide |
| [Changelog](./docs/CHANGELOG.md) | Version history |
| [Troubleshooting](./docs/TROUBLESHOOTING.md) | Common issues |
| [Glossary](./docs/GLOSSARY.md) | Terms & definitions |

---

## 🌐 Live Deployment

| Environment | URL |
|-------------|-----|
| Production API | https://scamshield-honeypot.onrender.com |
| Swagger Docs | https://scamshield-honeypot.onrender.com/docs |
| Health Check | https://scamshield-honeypot.onrender.com/v1/health |

---

## 🏆 Hackathon

**India AI Impact Buildathon 2026**

Built to protect India from the ₹60 crore daily scam epidemic through AI-powered intelligence gathering.

---

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

```bash
# Development workflow
git checkout develop
git checkout -b feature/your-feature
# Make changes
git commit -m "feat: your feature"
git push origin feature/your-feature
# Create PR
```

---

## 📄 License

MIT License - see [LICENSE](./LICENSE)

---

**Made with ❤️ for a safer India**

[⭐ Star this repo](https://github.com/Prakhar2025/Agentic-Honey-Pot) · [🐛 Report Bug](https://github.com/Prakhar2025/Agentic-Honey-Pot/issues) · [✨ Request Feature](https://github.com/Prakhar2025/Agentic-Honey-Pot/issues)
