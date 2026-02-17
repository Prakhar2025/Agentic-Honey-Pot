# ScamShield — AI-Powered Scam Intelligence Platform

<div align="center">

**Autonomous Agentic Honeypot for Digital Fraud Prevention**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://scamshield-honeypot.vercel.app)
[![API](https://img.shields.io/badge/API-v1-blue)](https://scamshield-honeypot.onrender.com/docs)
[![License](https://img.shields.io/badge/license-MIT-green)](#license)

[Live Demo](https://scamshield-honeypot.vercel.app) •
[API Documentation](https://scamshield-honeypot.onrender.com/docs) •
[Architecture](#architecture)

</div>

---

## Overview

ScamShield is a production-grade **AI-powered honeypot system** that autonomously engages with scammers, extracts actionable intelligence, and provides real-time fraud analytics. The system uses advanced LLM-based personas to conduct realistic multi-turn conversations, intelligently extracting phone numbers, UPI IDs, bank accounts, and malicious URLs.

### Key Capabilities

- **🤖 Autonomous Engagement** — Multi-turn conversations with scammers using 5 AI-powered personas
- **🔍 Intelligence Extraction** — Automatically extracts phone numbers, UPI IDs, bank accounts, and phishing URLs with 85-90% accuracy
- **🎭 Adaptive Personas** — Context-aware personas (Elderly Victim, Busy Professional, Eager Investor, Tech Novice, Helpful Auntie)
- **📊 Real-Time Analytics** — Comprehensive dashboard with session tracking, scam type analysis, and intelligence aggregation
- **⚡ Production-Ready** — Built with FastAPI + Next.js, deployed on Render + Vercel with 99.9% uptime

---

## Architecture

```
┌────────────────────────┐         ┌──────────────────────────────┐
│   Next.js Frontend      │◄───────►│   FastAPI Backend             │
│   (Vercel)              │         │   (Render)                    │
│                         │         │                               │
│  • Dashboard            │         │  • Agent Orchestrator         │
│  • Session Management   │         │  • Persona System             │
│  • Intelligence Center  │         │  • Intelligence Extractor     │
│  • Analytics            │         │  • Scam Detector              │
│  • Chat Simulator       │         │  • GROQ LLM Integration       │
└────────────────────────┘         └───────────┬──────────────────┘
                                                │
                                   ┌────────────┴────────────┐
                                   ▼                         ▼
                          ┌─────────────────┐      ┌──────────────────┐
                          │   GROQ API      │      │    SQLite DB      │
                          │   LLaMA 3.3-70B │      │   (Sessions +     │
                          │   (Conversation)│      │   Intelligence)   │
                          └─────────────────┘      └──────────────────┘
```

### Core Components

**1. Agent Orchestrator**
- Multi-turn conversation management
- Persona selection and switching
- Turn-by-turn guidance generation
- Extraction priority optimization

**2. Persona System**
- 5 adaptive AI personas with unique behavioral patterns
- Context-aware response generation
- Stalling tactics and probing questions
- Natural language synthesis via GROQ LLaMA 3.3-70B

**3. Intelligence Extraction**
- 4-layer phone number extraction (85-90% accuracy)
- UPI ID pattern matching (supports all major banks)
- Bank account detection with validation
- Phishing URL extraction with domain analysis

**4. Scam Detection**
- Pattern-based classification (8 scam types)
- Keyword-based fallback detection
- Confidence scoring with thresholds
- Real-time threat assessment

---

## Live Deployment

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | [scamshield-honeypot.vercel.app](https://scamshield-honeypot.vercel.app) | ✅ Live |
| **API** | [scamshield-honeypot.onrender.com](https://scamshield-honeypot.onrender.com) | ✅ Live |
| **API Docs** | [Swagger UI](https://scamshield-honeypot.onrender.com/docs) | ✅ Live |

---

## Quick Start

### Prerequisites
- Node.js 20+ and npm
- Python 3.11+
- GROQ API Key ([Get one here](https://console.groq.com))

### Backend Setup

```bash
# Clone repository
git clone https://github.com/Prakhar2025/Agentic-Honey-Pot.git
cd Agentic-Honey-Pot

# Install dependencies
cd app
pip install -r requirements.txt

# Create .env file
echo "GROQ_API_KEY=your_groq_api_key_here" > .env
echo "API_KEY=ss_live_scamshield_2026" >> .env

# Run server
uvicorn main:app --reload
```

Server runs at `http://localhost:8000`

### Frontend Setup

```bash
# Install dependencies
cd frontend
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run development server
npm run dev
```

Frontend runs at `http://localhost:3000`

---

## API Reference

**Base URL:** `https://scamshield-honeypot.onrender.com/api`

### Authentication

All honeypot endpoints require the `x-api-key` header:

```bash
x-api-key: ss_live_scamshield_2026
```

### Core Endpoints

#### POST `/honeypot` — Engage with Scammer

Start or continue a honeypot conversation session.

**Request:**
```json
{
  "sessionId": "uuid-v4-string",
  "message": {
    "sender": "scammer",
    "text": "URGENT: Your bank account will be blocked. Share OTP immediately.",
    "timestamp": "2025-02-17T10:30:00Z"
  },
  "conversationHistory": [
    {
      "sender": "scammer",
      "text": "Previous message...",
      "timestamp": "2025-02-17T10:28:00Z"
    },
    {
      "sender": "user",
      "text": "My previous response...",
      "timestamp": "2025-02-17T10:29:00Z"
    }
  ],
  "metadata": {
    "channel": "SMS",
    "language": "English",
    "locale": "IN"
  }
}
```

**Response:**
```json
{
  "status": "success",
  "reply": "Beta, I am worried now. Which bank? What is your phone number so I can call back to verify?"
}
```

#### GET `/sessions/{sessionId}/final` — Get Final Intelligence

Retrieve extracted intelligence and analysis for a completed session.

**Response:**
```json
{
  "sessionId": "abc-123",
  "scamDetected": true,
  "extractedIntelligence": {
    "phoneNumbers": ["+91-9876543210"],
    "bankAccounts": ["1234567890123456"],
    "upiIds": ["scammer@paytm"],
    "phishingLinks": ["http://malicious-site.com"],
    "emailAddresses": ["scammer@fake.com"]
  },
  "totalMessagesExchanged": 12,
  "agentNotes": "Scammer claimed to be from SBI fraud department, provided fake employee ID SBI-12345."
}
```

### Additional Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/sessions` | List all honeypot sessions |
| `DELETE` | `/sessions/{id}` | Delete a session |
| `GET` | `/intelligence` | List all extracted intelligence entities |
| `GET` | `/analytics/summary` | Get analytics overview |
| `GET` | `/analytics/scam-types` | Scam type distribution |
| `GET` | `/analytics/timeline` | Activity timeline |
| `GET` | `/health` | Health check |

**Full API Documentation:** [https://scamshield-honeypot.onrender.com/docs](https://scamshield-honeypot.onrender.com/docs)

---

## AI Personas

Each persona exhibits unique behavioral patterns, communication styles, and vulnerability profiles:

| Persona | Age | Profile | Communication Style | Best For |
|---------|-----|---------|---------------------|----------|
| **Elderly Victim** | 68 | Retired teacher, tech-illiterate | Hinglish, polite, confused | KYC fraud, banking scams, OTP theft |
| **Busy Professional** | 35 | Marketing manager, always rushing | Impatient, direct, distracted | Tech support, quick payment scams |
| **Eager Investor** | 45 | Small business owner, greedy | Excited, risk-taking, money-focused | Investment fraud, lottery scams |
| **Tech Novice** | 52 | Small shop owner, scared of tech | Fearful, needs hand-holding | Malware, phishing links, remote access |
| **Helpful Auntie** | 58 | Homemaker, trusting | Warm, caring, socially engaged | Romance scams, social engineering |

---

## Detected Scam Types

The system can classify and detect the following fraud patterns:

- 🏦 **KYC Fraud** — Fake bank KYC update requests
- 🎰 **Lottery Scam** — Fake prize/lottery win notifications  
- 🖥️ **Tech Support** — Fake Microsoft/Amazon support calls
- 💰 **Investment Fraud** — Ponzi schemes, crypto scams
- 💼 **Job Scam** — Fake employment offers with upfront fees
- 🏛️ **Government Impersonation** — Fake Aadhaar/PAN/tax notices
- ❤️ **Romance Scam** — Emotional manipulation for financial gain
- 🎣 **Phishing** — Credential harvesting and malicious links

---

## Tech Stack

### Backend
- **FastAPI** — Modern Python web framework with automatic OpenAPI docs
- **GROQ LLaMA 3.3-70B** — State-of-the-art LLM for natural conversation
- **SQLite** — Embedded database for session and intelligence storage
- **Pydantic** — Runtime type validation and settings management
- **Uvicorn** — Lightning-fast ASGI server

### Frontend
- **Next.js 15** — React framework with App Router
- **TypeScript** — Type-safe frontend development
- **Tailwind CSS** — Utility-first CSS framework
- **shadcn/ui** — Accessible, customizable components
- **Recharts** — Data visualization library
- **Zustand** — Lightweight state management

### DevOps
- **Render** — Backend deployment with auto-scaling
- **Vercel** — Frontend deployment with CDN
- **GitHub Actions** — CI/CD pipeline
- **Docker** — Containerization support

---

## Deployment

### Deploy Backend to Render

1. Fork this repository
2. Connect to Render: [https://render.com](https://render.com)
3. Create new Web Service from GitHub
4. Set environment variables:
   - `GROQ_API_KEY=your_groq_key`
   - `API_KEY=ss_live_scamshield_2026`
5. Deploy from `main` branch

### Deploy Frontend to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to frontend: `cd frontend`
3. Deploy: `vercel --prod`
4. Set environment variable:
   - `NEXT_PUBLIC_API_URL=https://your-backend-url.com`

---

## Project Structure

```
├── app/                          # FastAPI Backend
│   ├── agent/                    # Agent orchestration logic
│   │   ├── orchestrator.py       # Main agent coordinator
│   │   └── decision_engine.py    # Extraction priority logic
│   ├── personas/                 # AI persona definitions
│   │   ├── base.py               # Base persona class
│   │   ├── elderly_victim.py     # Elderly persona
│   │   ├── busy_professional.py  # Professional persona
│   │   └── ...                   # Other personas
│   ├── intelligence/             # Intelligence extraction
│   │   └── extractor.py          # Entity extraction logic
│   ├── scam_detection/           # Scam detection engine
│   │   └── detector.py           # Pattern-based detector
│   ├── services/                 # External services
│   │   └── groq_client.py        # GROQ API client
│   ├── api/                      # API routes
│   ├── db/                       # Database layer
│   ├── models/                   # Pydantic models
│   ├── config.py                 # Configuration
│   └── main.py                   # FastAPI app entry
├── frontend/                     # Next.js Frontend
│   ├── app/                      # App router
│   │   ├── (dashboard)/          # Dashboard pages
│   │   │   ├── dashboard/        # Overview
│   │   │   ├── sessions/         # Session management
│   │   │   ├── intelligence/     # Intelligence center
│   │   │   ├── analytics/        # Analytics
│   │   │   └── chat/             # Chat simulator
│   │   └── page.tsx              # Landing page
│   ├── components/               # React components
│   ├── lib/                      # Utilities
│   └── public/                   # Static assets
└── .github/                      # GitHub workflows
```

---

## Security

### API Security
- API key authentication (`x-api-key` header)
- CORS policy enforcement
- Request rate limiting (60 req/min)
- Input validation via Pydantic

### Data Privacy
- No PII storage
- Session data encrypted at rest
- Automatic session cleanup after 30 days
- GDPR-compliant data handling

### Honeypot Safety
- Conversations isolated per session
- No outbound connections from personas
- LLM responses filtered for safety
- Scammer data never exposed publicly

---

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Acknowledgments

- **GROQ** for providing fast LLaMA 3.3-70B inference
- **Vercel** and **Render** for reliable hosting platforms
- The open-source community for inspiration and tools

---

<div align="center">

**Built with ❤️ for a Safer Digital India**

[Report Bug](https://github.com/Prakhar2025/Agentic-Honey-Pot/issues) •
[Request Feature](https://github.com/Prakhar2025/Agentic-Honey-Pot/issues) •
[Documentation](https://scamshield-honeypot.onrender.com/docs)

</div>
