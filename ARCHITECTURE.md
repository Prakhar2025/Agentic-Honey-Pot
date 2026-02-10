# Architecture

## System Overview

ScamShield is an **agentic honeypot system** with two main components:

1. **Backend (FastAPI)** — AI engine, persona management, intelligence extraction
2. **Frontend (Next.js)** — Dashboard, analytics, chat simulator, documentation

## High-Level Architecture

```
                     ┌──────────────┐
                     │    Users     │
                     └──────┬───────┘
                            │
                   ┌────────▼────────┐
                   │  Next.js Frontend│
                   │  (App Router)    │
                   │  Port 3000       │
                   └────────┬────────┘
                            │ REST API
                   ┌────────▼────────┐
                   │  FastAPI Backend │
                   │  Port 8000       │
                   └────────┬────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
     ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
     │   MongoDB   │ │  Groq API   │ │    Redis    │
     │  (Sessions) │ │  (LLaMA AI) │ │   (Cache)   │
     └─────────────┘ └─────────────┘ └─────────────┘
```

## Frontend Architecture

### App Router Structure
```
app/
├── (dashboard)/          # Authenticated layout
│   ├── dashboard/        # Home metrics
│   ├── sessions/         # Session management
│   ├── intelligence/     # Entity tracking
│   ├── analytics/        # Charts & reports
│   ├── chat/             # Chat simulator
│   ├── settings/         # Configuration
│   └── docs/             # Documentation
├── (marketing)/          # Marketing layout
│   └── layout.tsx
└── page.tsx              # Landing page
```

### Component Architecture
- **UI Components** — shadcn/ui (Radix + Tailwind)
- **Feature Components** — Domain-specific (chat, sessions, intelligence)
- **State Management** — Zustand stores
- **API Layer** — Custom fetch wrappers (`lib/api/`)
- **Hooks** — Custom React hooks (`lib/hooks/`)

### Key Design Patterns
1. **Server Components** for static content, **Client Components** for interactivity
2. **Composition** over inheritance
3. **Barrel exports** for clean import paths
4. **Type-safe API** with TypeScript interfaces

## Backend Architecture

### API Layers
```
FastAPI App
├── api/v1/           # Versioned API routes
│   ├── honeypot.py   # Core engage/continue endpoints
│   ├── sessions.py   # Session management
│   ├── intelligence.py # Entity extraction queries
│   ├── analytics.py  # Aggregation endpoints
│   └── health.py     # Health checks
├── personas/         # AI persona definitions
│   ├── base.py       # Base persona class
│   ├── elderly.py    # Elderly victim persona
│   ├── professional.py
│   ├── student.py
│   ├── business.py
│   └── curious.py
├── intelligence/     # Intelligence extraction
│   ├── extractor.py  # Entity extraction engine
│   └── patterns.py   # Regex patterns
└── core/
    ├── config.py     # Configuration
    ├── database.py   # MongoDB connection
    └── llm.py        # Groq LLM client
```

### AI Pipeline
1. **Message Analysis** — Classify scam type, extract initial entities
2. **Persona Selection** — Choose optimal persona based on scam type
3. **Response Generation** — LLaMA 3.3-70b generates victim response
4. **Intelligence Extraction** — Post-process response for entities
5. **Storage** — Persist session and intelligence to MongoDB

## Data Flow

```
Scammer Message → API Gateway → Scam Classifier
                                      ↓
                               Persona Selector
                                      ↓
                              LLaMA Response Gen
                                      ↓
                            Entity Extractor → MongoDB
                                      ↓
                              API Response → Frontend
```

## Security Model

- **HTTPS** — All traffic encrypted
- **CORS** — Restricted origin policy
- **Rate Limiting** — Request limits per IP
- **Input Sanitization** — Request validation
- **Non-root Docker** — Container security
- **Security Headers** — HSTS, CSP, XSS protection
