<p align="center">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/Groq-FF6B35?style=for-the-badge&logo=groq&logoColor=white" alt="Groq"/>
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
</p>

<h1 align="center">🍯 ScamShield Honeypot API</h1>

<p align="center">
  <strong>AI-Powered Scam Detection Engine for India's Digital Defense</strong>
</p>

<p align="center">
  <em>Protecting citizens from financial fraud, one message at a time.</em>
</p>

---

## 🚨 The Problem

> **India loses approximately ₹60 crore (~$7.2M USD) daily to digital scams.**

Financial fraudsters exploit SMS, WhatsApp, and voice calls to deceive millions of Indians through:
- **Fake KYC update requests** impersonating banks
- **Lottery/prize scams** promising unrealistic rewards  
- **Investment frauds** with guaranteed returns
- **Impersonation attacks** posing as government officials
- **Phishing links** stealing credentials and OTPs

Traditional rule-based detection fails against evolving scam tactics. Victims—often elderly or less tech-savvy—suffer irreversible financial and emotional damage.

---

## 💡 Our Solution

**ScamShield Honeypot API** is an intelligent, AI-powered scam detection service that analyzes suspicious messages in real-time and returns actionable threat intelligence.

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│  Suspicious     │ ───▶ │  ScamShield API  │ ───▶ │  Risk Score +   │
│  Message/URL    │      │  (Groq + LLaMA)  │      │  Threat Intel   │
└─────────────────┘      └──────────────────┘      └─────────────────┘
```

The API acts as a "honeypot"—luring in scam patterns, analyzing them with LLMs, and returning comprehensive threat assessments.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🧠 **LLM-Powered Analysis** | Leverages Groq's ultra-fast inference with LLaMA 3.2 for nuanced scam detection |
| 🎯 **Risk Scoring** | Returns confidence scores (0-100) with categorical risk levels |
| 🏷️ **Scam Classification** | Identifies scam type: phishing, lottery, KYC fraud, investment scam, etc. |
| 📝 **Explainable AI** | Provides human-readable reasoning for each classification |
| 📊 **Analytics Dashboard** | Tracks scam patterns and regional threat intelligence |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **API Framework** | FastAPI | High-performance async REST API |
| **AI Engine** | Groq (LLaMA 3.2) | Ultra-low latency LLM inference |
| **Database** | SQLite | Lightweight, embedded persistence |
| **Deployment** | Render.com | Scalable cloud hosting |
| **Language** | Python 3.11+ | Core development |
| **Validation** | Pydantic | Request/response schema validation |

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11 or higher
- Groq API key ([Get one free](https://console.groq.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/your-team/scamshield-honeypot.git
cd scamshield-honeypot

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your GROQ_API_KEY

# Run the server
uvicorn app.main:app --reload
```

### Verify Installation
```bash
curl http://localhost:8000/health
# {"status": "healthy", "version": "1.0.0"}
```

---

## 📡 API Usage Example

### Analyze a Suspicious Message

**Request:**
```bash
curl -X POST "https://api.scamshield.in/v1/honeypot" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your_api_key" \
  -d '{
    "message": "Dear Customer, Your SBI account will be blocked! Update KYC immediately: http://sbi-kyc-update.xyz/verify",
    "source_type": "sms",
    "metadata": {
      "sender": "+91-9876543210",
      "region": "Maharashtra"
    }
  }'
```

**Response:**
```json
{
  "request_id": "req_7f3a9b2c",
  "is_scam": true,
  "risk_score": 94,
  "risk_level": "CRITICAL",
  "scam_type": "KYC_PHISHING",
  "indicators": [
    "Urgency language ('immediately', 'will be blocked')",
    "Suspicious domain (sbi-kyc-update.xyz)",
    "Impersonation of financial institution",
    "Request for sensitive action via link"
  ],
  "recommendation": "DO NOT click the link. Report to cybercrime.gov.in. Block sender.",
  "confidence": 0.97,
  "analysis_time_ms": 142
}
```

---

## 📊 Risk Levels

| Level | Score Range | Action |
|-------|-------------|--------|
| 🟢 **SAFE** | 0-25 | No action needed |
| 🟡 **LOW** | 26-50 | Monitor, likely spam |
| 🟠 **MEDIUM** | 51-75 | Potential scam, verify source |
| 🔴 **HIGH** | 76-90 | Likely scam, avoid interaction |
| ⛔ **CRITICAL** | 91-100 | Confirmed scam, report immediately |

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [Architecture](./docs/ARCHITECTURE.md) | System design and data flow |
| [API Documentation](./docs/API_DOCUMENTATION.md) | Complete endpoint reference |
| [Deployment Guide](./docs/DEPLOYMENT.md) | Production deployment on Render.com |
| [Project Structure](./docs/PROJECT_STRUCTURE.md) | Codebase organization |

---

## 🏆 India AI Hackathon 2026

This project is built for the **India AI Hackathon** with the mission to leverage AI for social good and protect Indian citizens from financial fraud.

### Team Information

| Role | Name | Expertise |
|------|------|-----------|
| 🎯 Team Lead | [Your Name] | Full-Stack Development |
| 🧠 AI/ML Engineer | [Team Member] | LLM Integration |
| 🏗️ Backend Developer | [Team Member] | API Architecture |
| 📊 Data Analyst | [Team Member] | Threat Intelligence |

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting PRs.

---

<p align="center">
  <strong>Built with 🇮🇳 for India's Digital Safety</strong>
</p>

<p align="center">
  <a href="https://cybercrime.gov.in">Report Cybercrimes</a> •
  <a href="https://nciipc.gov.in">NCIIPC</a> •
  <a href="https://cert-in.org.in">CERT-In</a>
</p>
