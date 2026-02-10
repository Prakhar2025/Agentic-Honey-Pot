# ScamShield Agentic Honeypot

<div align="center">

# 🛡️ ScamShield — AI-Powered Scam Intelligence Platform

**Autonomous Agentic Honeypot for Combating Digital Fraud in India**

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![API](https://img.shields.io/badge/API-v1-blue)](#api-reference)
[![License](https://img.shields.io/badge/license-MIT-green)](#license)
[![India AI](https://img.shields.io/badge/India%20AI-Buildathon%202026-orange)](#)

[Live Demo](https://scamshield-honeypot.onrender.com) •
[API Docs](#api-reference) •
[Architecture](#architecture) •
[Contributing](CONTRIBUTING.md)

</div>

---

## 📋 Overview

ScamShield is an **AI-powered agentic honeypot** designed to autonomously engage with scammers, extract actionable intelligence, and protect millions from digital fraud. Built for **India AI Impact Buildathon 2026**.

### The Problem
- Indians lose **₹60+ crore daily** to digital scams
- Scammers use sophisticated social engineering tactics
- Traditional detection is reactive and slow

### Our Solution
An **autonomous AI agent** that:
1. **Receives** scam messages (SMS, WhatsApp, email)
2. **Engages** scammers using 5 realistic victim personas
3. **Extracts** intelligence (phone numbers, UPI IDs, bank accounts, phishing URLs)
4. **Reports** findings through a comprehensive analytics dashboard

---

## 🏗️ Architecture

```
┌─────────────────────┐     ┌─────────────────────────┐
│   Next.js Frontend  │────▶│   FastAPI Backend        │
│   (Dashboard + Chat)│     │   (REST API)             │
└─────────────────────┘     └────────┬────────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    ▼                ▼                ▼
            ┌──────────┐    ┌──────────────┐  ┌─────────┐
            │  MongoDB  │    │  Groq LLaMA  │  │  Redis  │
            │  (Storage)│    │  3.3-70b (AI)│  │ (Cache) │
            └──────────┘    └──────────────┘  └─────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Python 3.11+
- MongoDB
- Groq API Key

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd app
pip install -r requirements.txt
uvicorn main:app --reload
```

### Environment Variables

```env
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=https://scamshield-honeypot.onrender.com

# Backend (.env)
GROQ_API_KEY=your_groq_api_key
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
```

---

## 🔌 API Reference

Base URL: `https://scamshield-honeypot.onrender.com/api/v1`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/honeypot/engage` | Start new honeypot session |
| `POST` | `/honeypot/continue` | Continue conversation |
| `GET` | `/honeypot/session/{id}` | Get session details |
| `DELETE` | `/honeypot/session/{id}` | Delete session |
| `GET` | `/sessions` | List all sessions |
| `GET` | `/sessions/{id}/intelligence` | Get session intelligence |
| `GET` | `/intelligence` | List all extracted entities |
| `GET` | `/analytics/summary` | Analytics overview |
| `GET` | `/analytics/scam-types` | Scam type distribution |
| `GET` | `/analytics/timeline` | Activity timeline |
| `GET` | `/health` | Basic health check |
| `GET` | `/health/detailed` | Detailed health check |

### Quick Example

```bash
curl -X POST https://scamshield-honeypot.onrender.com/api/v1/honeypot/engage \
  -H "Content-Type: application/json" \
  -d '{"scammer_message": "Your KYC is pending, update now", "persona": "elderly_victim"}'
```

---

## 🎭 AI Personas

| Persona | Description | Best For |
|---------|-------------|----------|
| 👵 Elderly Victim | Confused senior citizen | KYC/banking scams |
| 🧑‍💼 Busy Professional | Distracted worker | Tech support scams |
| 🎓 Naive Student | Trusting college student | Job/lottery scams |
| 🏪 Small Business Owner | Worried entrepreneur | Tax/government scams |
| 🤷 Curious User | Cautiously interested | Romance/investment scams |

---

## 🔍 Detected Scam Types

- 🏦 **KYC Fraud** — Fake bank KYC update requests
- 🎰 **Lottery Scam** — Fake prize/lottery notifications
- 🖥️ **Tech Support** — Fake technical support calls
- 💰 **Investment Fraud** — Ponzi/crypto investment scams
- 💼 **Job Scam** — Fake employment offers
- 🏛️ **Government Impersonation** — Fake government notices
- ❤️ **Romance Scam** — Emotional manipulation for money
- 🎣 **Phishing** — Credential harvesting attempts

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** — React meta-framework
- **TypeScript** — Type-safe development
- **Tailwind CSS + shadcn/ui** — Styling & components
- **Recharts** — Data visualization
- **Framer Motion** — Animations
- **Zustand** — State management

### Backend
- **FastAPI** — Python web framework
- **LLaMA 3.3-70b** — Large language model (via Groq)
- **MongoDB** — Document database
- **Redis** — Caching layer

---

## 🐳 Docker Deployment

```bash
cd frontend
docker build -t scamshield-frontend .
docker run -p 3000:3000 scamshield-frontend
```

Or with Docker Compose:

```bash
cd frontend
docker-compose up -d
```

---

## 📁 Project Structure

```
├── frontend/                  # Next.js frontend
│   ├── app/                   # App router pages
│   │   ├── (dashboard)/       # Dashboard pages
│   │   │   ├── dashboard/     # Home dashboard
│   │   │   ├── sessions/      # Session management
│   │   │   ├── intelligence/  # Intelligence center
│   │   │   ├── analytics/     # Analytics & reports
│   │   │   ├── chat/          # Chat simulator
│   │   │   ├── settings/      # Settings
│   │   │   └── docs/          # Documentation
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   ├── lib/                   # Utilities & hooks
│   └── public/                # Static assets
├── app/                       # FastAPI backend
│   ├── api/                   # API routes
│   ├── personas/              # AI persona definitions
│   ├── intelligence/          # Entity extraction
│   └── core/                  # Core configuration
└── .github/                   # CI/CD workflows
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

## 🏆 Buildathon

Built for **India AI Impact Buildathon 2026** — Empowering India with AI-driven fraud prevention.

---

<div align="center">
Made with ❤️ by Team ScamShield
</div>
