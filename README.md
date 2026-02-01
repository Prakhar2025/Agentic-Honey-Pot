<p align="center">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/Groq-FF6B35?style=for-the-badge&logo=groq&logoColor=white" alt="Groq"/>
  <img src="https://img.shields.io/badge/LLaMA_3.2-7C3AED?style=for-the-badge&logo=meta&logoColor=white" alt="LLaMA"/>
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
</p>

<h1 align="center">🍯 ScamShield Agentic Honeypot</h1>

<p align="center">
  <strong>AI-Powered Autonomous Scam Engagement & Intelligence Extraction System</strong>
</p>

<p align="center">
  <em>Turning the tables on scammers — one conversation at a time.</em>
</p>

---

## 🎯 India AI Impact Buildathon 2026

> **Problem Statement:** Agentic Honey-Pot for Scam Detection & Intelligence Extraction

This project creates an **autonomous AI honeypot** that doesn't just detect scams — it **actively engages scammers** using believable victim personas to extract critical intelligence like bank accounts, UPI IDs, and phishing links.

---

## 🚨 The Problem

> **India loses approximately ₹60 crore (~$7.2M USD) daily to digital scams.**

Financial fraudsters exploit SMS, WhatsApp, and voice calls to deceive millions of Indians. Traditional detection systems are **passive** — they only identify scams after victims report them.

**What if we could fight back?**

---

## 💡 Our Solution: Agentic Honeypot

Unlike passive scam detectors, **ScamShield** is an **agentic honeypot** that:

```
┌─────────────────┐      ┌──────────────────────┐      ┌─────────────────────┐
│  Scammer sends  │      │  🤖 AI Agent engages │      │  📊 Extracted Intel │
│  scam message   │ ───▶ │  as believable       │ ───▶ │  Bank accounts      │
│                 │      │  victim persona      │      │  UPI IDs, Links     │
└─────────────────┘      └──────────────────────┘      └─────────────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │  Multi-turn dialogue │
                         │  to maximize intel   │
                         │  extraction          │
                         └──────────────────────┘
```

### 🔄 The Agentic Loop

1. **Receive** scam message from Mock Scammer API
2. **Analyze** message to confirm scam and identify type
3. **Select Persona** (elderly victim, tech novice, eager investor)
4. **Generate Response** as believable victim to elicit more info
5. **Continue Conversation** until intelligence is extracted
6. **Extract & Report** structured data (bank accounts, UPI, links)

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| � **Autonomous Agent** | Self-driven conversation loop that engages scammers without human intervention |
| � **Believable Personas** | Multiple victim profiles (elderly, tech-novice, greedy investor) for realistic engagement |
| 🧠 **LLM-Powered Responses** | Groq's ultra-fast LLaMA 3.2 generates contextual, convincing victim replies |
| 🔍 **Intelligence Extraction** | Automatically extracts bank accounts, UPI IDs, phishing links, phone numbers |
| 💬 **Multi-Turn Conversations** | Maintains context across multiple message exchanges |
| � **Structured JSON Output** | All extracted intelligence in machine-readable format |
| � **Mock Scammer API Ready** | Built to integrate with hackathon's simulated scammer system |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **API Framework** | FastAPI | High-performance async REST API |
| **AI Engine** | Groq (LLaMA 3.2) | Ultra-low latency LLM inference for agent responses |
| **Database** | SQLite | Conversation state & extracted intelligence storage |
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

### Start a Honeypot Session

**Request:**
```bash
curl -X POST "https://api.scamshield.in/v1/honeypot/engage" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your_api_key" \
  -d '{
    "scammer_message": "Dear Customer, Your SBI account will be blocked! Update KYC immediately by sharing your account details.",
    "source_type": "sms",
    "persona": "elderly_victim"
  }'
```

**Response:**
```json
{
  "session_id": "sess_7f3a9b2c",
  "is_scam": true,
  "scam_type": "KYC_PHISHING",
  "agent_response": "Oh my! Please help me, I am not good with technology. My grandson usually helps but he is not here. What details do you need? I have my passbook here.",
  "conversation_status": "ONGOING",
  "turn_count": 1,
  "persona_used": "elderly_victim"
}
```

### Continue Conversation

```bash
curl -X POST "https://api.scamshield.in/v1/honeypot/continue" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your_api_key" \
  -d '{
    "session_id": "sess_7f3a9b2c",
    "scammer_message": "Send your account number and OTP to 9876543210 or pay ₹500 to upi@scammer.ybl"
  }'
```

**Response with Extracted Intelligence:**
```json
{
  "session_id": "sess_7f3a9b2c",
  "agent_response": "Okay beta, please wait I am writing down... 9876543210 and upi@scammer.ybl, yes?",
  "conversation_status": "INTELLIGENCE_EXTRACTED",
  "turn_count": 2,
  "extracted_intelligence": {
    "bank_accounts": [],
    "upi_ids": ["upi@scammer.ybl"],
    "phone_numbers": ["+91-9876543210"],
    "phishing_links": []
  }
}
```

### Get Session Summary

```bash
curl "https://api.scamshield.in/v1/sessions/sess_7f3a9b2c" \
  -H "X-API-Key: your_api_key"
```

**Complete Intelligence Report:**
```json
{
  "session_id": "sess_7f3a9b2c",
  "scam_type": "KYC_PHISHING",
  "risk_level": "CRITICAL",
  "conversation_log": [
    {"role": "scammer", "message": "Dear Customer...", "timestamp": "..."},
    {"role": "agent", "message": "Oh my! Please help...", "timestamp": "..."},
    {"role": "scammer", "message": "Send your account...", "timestamp": "..."},
    {"role": "agent", "message": "Okay beta...", "timestamp": "..."}
  ],
  "extracted_intelligence": {
    "bank_accounts": [],
    "upi_ids": ["upi@scammer.ybl"],
    "phone_numbers": ["+91-9876543210"],
    "phishing_links": []
  },
  "persona_used": "elderly_victim",
  "session_duration_seconds": 45,
  "total_turns": 2
}
```

---

## 🎭 Victim Personas

| Persona | Description | Best For |
|---------|-------------|----------|
| `elderly_victim` | Confused, trusting, asks for help | KYC scams, bank impersonation |
| `tech_novice` | Doesn't understand technology, easily led | Tech support scams |
| `eager_investor` | Greedy, wants quick returns | Investment frauds, crypto scams |
| `busy_professional` | Distracted, wants quick resolution | Urgency-based scams |
| `helpful_neighbor` | Wants to help, shares too much | Social engineering |

---

## 📊 Conversation Status

| Status | Description |
|--------|-------------|
| `ONGOING` | Active conversation, continue engaging |
| `INTELLIGENCE_EXTRACTED` | Key information obtained |
| `SCAMMER_DISENGAGED` | Scammer stopped responding |
| `MAX_TURNS_REACHED` | Safety limit hit (default: 10 turns) |
| `THREAT_DETECTED` | Scammer became aggressive, session ended |

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [Architecture](./docs/ARCHITECTURE.md) | Agentic loop design and conversation flow |
| [API Documentation](./docs/API_DOCUMENTATION.md) | Complete endpoint reference |
| [Deployment Guide](./docs/DEPLOYMENT.md) | Production deployment on Render.com |
| [Project Structure](./docs/PROJECT_STRUCTURE.md) | Codebase organization |

---

## 🏆 India AI Impact Buildathon 2026

This project is built for the **India AI Impact Buildathon** with the mission to leverage AI for social good and protect Indian citizens from financial fraud.

### Team Information

| Role | Name | Expertise |
|------|------|-----------|
| 🎯 Team Lead | [Your Name] | Full-Stack Development |
| 🧠 AI/ML Engineer | [Team Member] | LLM Integration & Prompt Engineering |
| 🏗️ Backend Developer | [Team Member] | API Architecture |
| 📊 Data Analyst | [Team Member] | Threat Intelligence |

---

## � Ethical Considerations

- **No Real Victim Data**: System only engages with simulated/confirmed scammers
- **Extracted Data**: Used exclusively for law enforcement reporting
- **Persona Safety**: Agent never provides real sensitive information
- **Compliance**: Aligned with IT Act 2000 and CERT-In guidelines

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <strong>Built with 🇮🇳 for India's Digital Safety</strong>
</p>

<p align="center">
  <a href="https://cybercrime.gov.in">Report Cybercrimes</a> •
  <a href="https://nciipc.gov.in">NCIIPC</a> •
  <a href="https://cert-in.org.in">CERT-In</a>
</p>
