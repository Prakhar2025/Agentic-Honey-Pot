# 🚀 ScamShield Frontend Development Prompts

> **Complete prompt collection for building FAANG-level frontend**
> 
> **Project:** ScamShield Agentic Honeypot Dashboard
> **Hackathon:** India AI Impact Buildathon 2026
> **Total Prompts:** 9 (Prompt 0 to Prompt 8)

---

## 📋 Table of Contents

| Prompt | Title | Status |
|--------|-------|--------|
| [Prompt 0](#prompt-0-complete-unified-documentation) | Complete Unified Documentation | ⏳ Pending |
| [Prompt 1](#prompt-1-frontend-project-setup--configuration) | Frontend Project Setup & Configuration | ⏳ Pending |
| [Prompt 2](#prompt-2-ui-component-library) | UI Component Library | ⏳ Pending |
| [Prompt 3](#prompt-3-dashboard-home-page) | Dashboard Home Page | ⏳ Pending |
| [Prompt 4](#prompt-4-sessions-management) | Sessions Management | ⏳ Pending |
| [Prompt 5](#prompt-5-intelligence-center) | Intelligence Center | ⏳ Pending |
| [Prompt 6](#prompt-6-analytics--reports) | Analytics & Reports | ⏳ Pending |
| [Prompt 7](#prompt-7-chat-interface--api-integration) | Chat Interface & API Integration | ⏳ Pending |
| [Prompt 8](#prompt-8-final-polish--production) | Final Polish & Production | ⏳ Pending |

---

## 📊 Progress Tracker

- **Completed:** 0/9
- **Current:** Prompt 0
- **Last Updated:** January 31, 2026

---

# ═══════════════════════════════════════════════════════════════════════════════
# ██████╗ ██████╗  ██████╗ ███╗   ███╗██████╗ ████████╗     ██████╗ 
# ██╔══██╗██╔══██╗██╔═══██╗████╗ ████║██╔══██╗╚══██╔══╝    ██╔═████╗
# ██████╔╝██████╔╝██║   ██║██╔████╔██║██████╔╝   ██║       ██║██╔██║
# ██╔═══╝ ██╔══██╗██║   ██║██║╚██╔╝██║██╔═══╝    ██║       ████╔╝██║
# ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║██║        ██║       ╚██████╔╝
# ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝        ╚═╝        ╚═════╝ 
# ═══════════════════════════════════════════════════════════════════════════════

# PROMPT 0: Complete Unified Documentation

## 📦 Expected Output
| Output | Description |
|--------|-------------|
| `docs/index.md` | Documentation home with navigation |
| `docs/OVERVIEW.md` | Complete project overview |
| `docs/ARCHITECTURE.md` | Unified system architecture |
| `docs/API_REFERENCE.md` | Complete API documentation |
| `docs/BACKEND_DEVELOPMENT.md` | Backend developer guide |
| `docs/FRONTEND_DEVELOPMENT.md` | Frontend developer guide |
| `docs/DATABASE_SCHEMA.md` | Database design & models |
| `docs/DEPLOYMENT.md` | Production deployment guide |
| `docs/SECURITY.md` | Security best practices |
| `docs/TESTING.md` | Testing strategy & guide |
| `docs/CONTRIBUTING.md` | Contribution guidelines |
| `docs/CHANGELOG.md` | Version history |
| `docs/TROUBLESHOOTING.md` | Common issues & solutions |
| `docs/GLOSSARY.md` | Terms & definitions |
| `README.md` | Updated professional README |
| **Total: 15 files** | ~8,000+ lines of documentation |

## ▶️ START PROMPT 0 ═══════════════════════════════════════════════════════════

Create complete FAANG/MNC-level unified documentation for ScamShield Agentic Honeypot - an AI-powered autonomous scam engagement and intelligence extraction system built for India AI Impact Buildathon 2026.

## PROJECT CONTEXT

ScamShield is a production-grade agentic honeypot that:
- Actively engages scammers using AI-powered victim personas
- Extracts intelligence (bank accounts, UPI IDs, phone numbers, phishing links)
- Uses Groq LLM (LLaMA 3.3-70b-versatile) for response generation
- Built with FastAPI backend + Next.js 14 frontend (upcoming)

## EXISTING BACKEND (Already Built)

### Tech Stack
- **Backend:** FastAPI 0.109.0, Python 3.11+
- **Database:** SQLAlchemy 2.0.25 + aiosqlite (async SQLite)
- **LLM:** Groq API with llama-3.3-70b-versatile model
- **Validation:** Pydantic 2.5.3

### API Endpoints (13 Total)
1. POST /v1/honeypot/engage - Start new honeypot session
2. POST /v1/honeypot/continue - Continue conversation
3. GET /v1/honeypot/session/{session_id} - Get session details
4. DELETE /v1/honeypot/session/{session_id} - Delete session
5. GET /v1/sessions - List all sessions
6. GET /v1/sessions/{session_id}/intelligence - Get extracted intel
7. GET /v1/intelligence - List all intelligence
8. GET /v1/intelligence/{id} - Get specific intelligence
9. GET /v1/analytics/summary - Get analytics summary
10. GET /v1/analytics/scam-types - Scam type distribution
11. GET /v1/analytics/timeline - Timeline analytics
12. GET /health - Health check
13. GET /health/detailed - Detailed health

### Project Structure
```
app/
├── main.py                    # FastAPI entry point
├── config.py                  # Configuration management
├── api/v1/                    # API routes
│   ├── honeypot.py           # Core honeypot endpoints
│   ├── sessions.py           # Session management
│   ├── intelligence.py       # Intelligence endpoints
│   ├── analytics.py          # Analytics endpoints
│   └── health.py             # Health checks
├── agent/                     # Agentic core
│   ├── orchestrator.py       # Main agent loop
│   ├── state_machine.py      # Conversation states
│   ├── decision_engine.py    # Continue/exit logic
│   └── safety.py             # Safety checks
├── personas/                  # 5 Victim personas
│   ├── elderly_victim.py
│   ├── tech_novice.py
│   ├── eager_investor.py
│   ├── busy_professional.py
│   └── helpful_auntie.py
├── intelligence/              # Intel extraction
│   ├── extractor.py
│   ├── patterns.py           # Regex patterns
│   └── validators.py
├── scam_detection/           # Scam detection
│   ├── detector.py
│   └── classifier.py
├── services/
│   └── groq_client.py        # Groq LLM client
├── db/
│   ├── database.py           # Async DB setup
│   ├── models.py             # SQLAlchemy models
│   └── repositories/         # Data access layer
└── models/                    # Pydantic schemas
```

### Scam Types Detected (8 Types)
1. KYC_FRAUD - KYC/bank verification scams
2. LOTTERY_SCAM - Fake lottery/prize scams
3. TECH_SUPPORT - Fake tech support
4. INVESTMENT_FRAUD - Fake investment schemes
5. JOB_SCAM - Fake job offers
6. LOAN_SCAM - Fake loan offers
7. OTP_FRAUD - OTP theft attempts
8. UNKNOWN - Unclassified scams

### Entity Types Extracted (7 Types)
1. PHONE_NUMBER - Indian phone numbers
2. UPI_ID - UPI payment addresses
3. BANK_ACCOUNT - Bank account numbers
4. IFSC_CODE - Bank IFSC codes
5. EMAIL - Email addresses
6. URL - Phishing links
7. CRYPTO_WALLET - Cryptocurrency addresses

### Personas (5 Types)
1. elderly_victim - Confused, trusting grandparent
2. tech_novice - Overwhelmed by technology
3. eager_investor - Greedy, impatient investor
4. busy_professional - Distracted, time-pressed
5. helpful_auntie - Oversharing, chatty

## UPCOMING FRONTEND (To Be Built)

### Tech Stack (Planned)
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Charts:** Recharts
- **State:** TanStack Query
- **Forms:** React Hook Form + Zod

### Pages (Planned)
- Dashboard - Real-time stats & overview
- Sessions - Session management
- Intelligence - Extracted entities
- Analytics - Charts & reports
- Chat - Scam simulation interface
- Settings - Configuration
- Documentation - Built-in docs

## DOCUMENTATION REQUIREMENTS

Create the following documentation files with FAANG-level quality:

### 1. docs/index.md - Documentation Home
- Welcome message
- Quick navigation cards
- Feature highlights
- Quick links to all sections
- Status badges

### 2. docs/OVERVIEW.md - Project Overview
- Problem statement (India loses ₹60 crore daily to scams)
- Solution overview
- Key features table
- Technology stack
- System capabilities
- Target audience
- Use cases
- Success metrics
- Roadmap

### 3. docs/ARCHITECTURE.md - System Architecture
- High-level architecture diagram (ASCII art)
- Component diagram
- Data flow diagrams
- Agentic loop explanation
- Sequence diagrams for:
  - Engagement flow
  - Conversation continuation
  - Intelligence extraction
- Design patterns used
- Scalability considerations
- Technology decisions rationale

### 4. docs/API_REFERENCE.md - Complete API Documentation
- Base URL and versioning
- Authentication (API key)
- Rate limiting
- All 13 endpoints with:
  - HTTP method and path
  - Description
  - Request schema (JSON)
  - Response schema (JSON)
  - Example requests (curl)
  - Example responses
  - Error codes
- Common error responses
- Pagination
- Filtering

### 5. docs/BACKEND_DEVELOPMENT.md - Backend Developer Guide
- Prerequisites
- Local setup instructions
- Project structure explanation
- Code conventions
- Adding new endpoints
- Adding new personas
- Adding new scam types
- Adding new entity extractors
- Testing backend
- Debugging tips

### 6. docs/FRONTEND_DEVELOPMENT.md - Frontend Developer Guide
- Prerequisites (Node.js 18+)
- Local setup instructions
- Project structure (planned)
- Component architecture
- State management
- API integration
- Styling guidelines
- Adding new pages
- Adding new components
- Testing frontend

### 7. docs/DATABASE_SCHEMA.md - Database Documentation
- ER diagram (ASCII art)
- Tables:
  - sessions
  - messages
  - extracted_intelligence
- Column descriptions
- Indexes
- Relationships
- Migration strategy
- Backup procedures

### 8. docs/DEPLOYMENT.md - Deployment Guide
- Environment variables
- Backend deployment (Render.com)
- Frontend deployment (Vercel)
- Docker deployment
- Docker Compose
- CI/CD pipeline
- Health checks
- Monitoring setup
- Logging configuration
- Scaling guidelines

### 9. docs/SECURITY.md - Security Documentation
- Security architecture
- Authentication & authorization
- API key management
- Data protection
- Input validation
- Rate limiting
- CORS configuration
- Ethical considerations
- Data retention policy
- Incident response

### 10. docs/TESTING.md - Testing Guide
- Testing strategy
- Unit tests
- Integration tests
- API tests
- End-to-end tests
- Test scenarios (mention 100 scenarios exist)
- Running tests
- Code coverage
- CI/CD testing

### 11. docs/CONTRIBUTING.md - Contribution Guidelines
- Code of conduct
- How to contribute
- Development workflow
- Branch naming (main, develop, feature/*, bugfix/*)
- Commit message format
- Pull request process
- Code review guidelines
- Issue templates

### 12. docs/CHANGELOG.md - Version History
- Version format (Semantic Versioning)
- v1.0.0 - Initial Release (current)
  - Features list
  - Backend API
  - Database
  - LLM integration
- Future versions placeholder

### 13. docs/TROUBLESHOOTING.md - Troubleshooting Guide
- Common errors and solutions
- API errors
- Database errors
- LLM errors
- Deployment issues
- Performance issues
- FAQ

### 14. docs/GLOSSARY.md - Terms & Definitions
- Technical terms
- Domain terms (scam types)
- Acronyms

### 15. README.md - Updated Main README
- Professional header with badges
- One-line description
- Problem statement
- Solution
- Key features (icons)
- Tech stack table
- Quick start guide
- API usage example
- Project structure (simplified)
- Documentation links
- Contributing section
- License
- Team/hackathon info
- Contact

## FORMATTING REQUIREMENTS

1. **Professional Markdown:**
   - Proper headings hierarchy (H1 → H2 → H3)
   - Tables for structured data
   - Code blocks with syntax highlighting
   - Collapsible sections where appropriate
   - Emoji icons for visual appeal
   - Status badges

2. **ASCII Art Diagrams:**
   - Architecture diagrams
   - Flow diagrams
   - ER diagrams
   - Use box-drawing characters

3. **Code Examples:**
   - curl commands for API
   - Python examples
   - TypeScript examples (frontend)
   - Include both request and response

4. **Tables:**
   - Feature comparison
   - API endpoints list
   - Environment variables
   - Error codes
   - Configuration options

5. **Cross-References:**
   - Link between documents
   - Table of contents in long docs
   - "See also" sections

## QUALITY STANDARDS

- Google/Meta/Microsoft/Apple documentation level
- Clear, concise, professional language
- No placeholder text - everything complete
- Consistent formatting throughout
- Mobile-friendly markdown
- Accessible language
- Both technical and non-technical sections
- Complete examples that actually work
- Error handling documented
- Edge cases covered

## IMPORTANT NOTES

1. This is for India AI Impact Buildathon 2026
2. Backend is 100% complete and tested
3. Frontend development starts after documentation
4. Groq API key is required (free tier available)
5. Deployment target is Render.com (backend) + Vercel (frontend)
6. 100 test scenarios already exist
7. All API endpoints tested and working

Create all 15 documentation files with complete, production-ready content. Each file should be comprehensive, professional, and follow the structure outlined above. The documentation should look like it belongs to a FAANG company's open-source project.

## ⏹️ END PROMPT 0 ═════════════════════════════════════════════════════════════

---

# ═══════════════════════════════════════════════════════════════════════════════
# ██████╗ ██████╗  ██████╗ ███╗   ███╗██████╗ ████████╗     ██╗
# ██╔══██╗██╔══██╗██╔═══██╗████╗ ████║██╔══██╗╚══██╔══╝    ███║
# ██████╔╝██████╔╝██║   ██║██╔████╔██║██████╔╝   ██║       ╚██║
# ██╔═══╝ ██╔══██╗██║   ██║██║╚██╔╝██║██╔═══╝    ██║        ██║
# ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║██║        ██║        ██║
# ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝        ╚═╝        ╚═╝
# ═══════════════════════════════════════════════════════════════════════════════

# PROMPT 1: Frontend Project Setup & Configuration

## 📦 Expected Output
| Output | Description |
|--------|-------------|
| `frontend/` | Complete Next.js 14 project folder |
| `frontend/package.json` | All dependencies configured |
| `frontend/tsconfig.json` | TypeScript configuration |
| `frontend/tailwind.config.ts` | Tailwind CSS configuration |
| `frontend/next.config.js` | Next.js configuration |
| `frontend/components.json` | shadcn/ui configuration |
| `frontend/.env.local` | Environment variables |
| `frontend/.env.example` | Example env file |
| `frontend/.eslintrc.json` | ESLint configuration |
| `frontend/.prettierrc` | Prettier configuration |
| `frontend/.gitignore` | Git ignore file |
| `frontend/app/layout.tsx` | Root layout with providers |
| `frontend/app/page.tsx` | Landing page |
| `frontend/app/globals.css` | Global styles with Tailwind |
| `frontend/app/providers.tsx` | Context providers |
| `frontend/lib/utils.ts` | Utility functions |
| `frontend/lib/api/client.ts` | API client configuration |
| `frontend/lib/constants.ts` | App constants |
| `frontend/types/index.ts` | TypeScript type definitions |
| `frontend/components/ui/` | Base UI components |
| `frontend/components/layout/` | Layout components |
| `frontend/components/theme-provider.tsx` | Dark/Light mode provider |
| `frontend/public/` | Static assets folder |
| `frontend/README.md` | Frontend documentation |
| **Total: 40+ files** | Complete production-ready setup |

## ▶️ START PROMPT 1 ═══════════════════════════════════════════════════════════

Create a complete production-ready Next.js 14 frontend project for ScamShield Agentic Honeypot Dashboard. This is a FAANG/MNC-level enterprise application for India AI Impact Buildathon 2026.

## PROJECT CONTEXT

ScamShield is an AI-powered autonomous scam engagement and intelligence extraction system. The frontend dashboard will:
- Display real-time scam engagement sessions
- Show extracted intelligence (bank accounts, UPI IDs, phone numbers, phishing links)
- Provide analytics and reporting
- Allow testing scam scenarios via chat interface
- Connect to FastAPI backend at configurable URL

## TECHNICAL REQUIREMENTS

### Core Stack
- **Framework:** Next.js 14.1.0 (App Router)
- **Language:** TypeScript 5.3+
- **Styling:** Tailwind CSS 3.4+
- **UI Components:** shadcn/ui (latest)
- **Icons:** Lucide React
- **Charts:** Recharts 2.10+
- **State Management:** TanStack Query (React Query) 5.17+
- **Forms:** React Hook Form 7.49+ with Zod validation
- **HTTP Client:** Axios 1.6+
- **Date Handling:** date-fns 3.2+
- **Animations:** Framer Motion 10.18+
- **Theme:** next-themes for dark/light mode
- **Notifications:** Sonner (toast notifications)

### Code Quality
- **Linting:** ESLint with Next.js config
- **Formatting:** Prettier
- **Type Safety:** Strict TypeScript
- **Path Aliases:** @/* for clean imports

## FOLDER STRUCTURE TO CREATE

```
frontend/
├── app/                                    # Next.js 14 App Router
│   ├── (auth)/                            # Auth group (future)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/                       # Dashboard group
│   │   ├── layout.tsx                     # Dashboard layout with sidebar
│   │   ├── page.tsx                       # Dashboard home (redirect)
│   │   ├── dashboard/
│   │   │   └── page.tsx                   # Main dashboard
│   │   ├── sessions/
│   │   │   ├── page.tsx                   # Sessions list
│   │   │   └── [id]/
│   │   │       └── page.tsx               # Session detail
│   │   ├── intelligence/
│   │   │   ├── page.tsx                   # Intelligence list
│   │   │   └── [id]/
│   │   │       └── page.tsx               # Entity detail
│   │   ├── analytics/
│   │   │   └── page.tsx                   # Analytics page
│   │   ├── chat/
│   │   │   └── page.tsx                   # Chat simulator
│   │   └── settings/
│   │       └── page.tsx                   # Settings page
│   ├── api/                               # API routes (if needed)
│   │   └── health/
│   │       └── route.ts
│   ├── layout.tsx                         # Root layout
│   ├── page.tsx                           # Landing page
│   ├── loading.tsx                        # Global loading
│   ├── error.tsx                          # Global error
│   ├── not-found.tsx                      # 404 page
│   ├── globals.css                        # Global styles
│   └── providers.tsx                      # All providers wrapper
├── components/
│   ├── ui/                                # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── tooltip.tsx
│   │   ├── skeleton.tsx
│   │   ├── separator.tsx
│   │   ├── scroll-area.tsx
│   │   ├── avatar.tsx
│   │   ├── alert.tsx
│   │   ├── progress.tsx
│   │   └── sheet.tsx
│   ├── layout/                            # Layout components
│   │   ├── header.tsx                     # Top header
│   │   ├── sidebar.tsx                    # Side navigation
│   │   ├── footer.tsx                     # Footer
│   │   ├── mobile-nav.tsx                 # Mobile navigation
│   │   ├── breadcrumbs.tsx                # Breadcrumb navigation
│   │   └── page-header.tsx                # Page title header
│   ├── common/                            # Common components
│   │   ├── logo.tsx                       # App logo
│   │   ├── loading-spinner.tsx            # Loading spinner
│   │   ├── empty-state.tsx                # Empty state placeholder
│   │   ├── error-boundary.tsx             # Error boundary
│   │   └── confirm-dialog.tsx             # Confirmation dialog
│   ├── theme-provider.tsx                 # Theme context provider
│   └── theme-toggle.tsx                   # Dark/light toggle button
├── lib/
│   ├── api/                               # API layer
│   │   ├── client.ts                      # Axios instance with interceptors
│   │   ├── endpoints.ts                   # API endpoint constants
│   │   ├── sessions.ts                    # Sessions API functions
│   │   ├── intelligence.ts                # Intelligence API functions
│   │   ├── analytics.ts                   # Analytics API functions
│   │   ├── honeypot.ts                    # Honeypot API functions
│   │   └── health.ts                      # Health check API
│   ├── hooks/                             # Custom React hooks
│   │   ├── use-sessions.ts                # Sessions data hooks
│   │   ├── use-intelligence.ts            # Intelligence data hooks
│   │   ├── use-analytics.ts               # Analytics data hooks
│   │   ├── use-chat.ts                    # Chat functionality hooks
│   │   ├── use-debounce.ts                # Debounce hook
│   │   ├── use-local-storage.ts           # Local storage hook
│   │   └── use-media-query.ts             # Media query hook
│   ├── utils/                             # Utility functions
│   │   ├── cn.ts                          # Class name merger (clsx + twMerge)
│   │   ├── format.ts                      # Formatting utilities
│   │   ├── date.ts                        # Date utilities
│   │   ├── validation.ts                  # Zod schemas
│   │   └── helpers.ts                     # General helpers
│   ├── constants/                         # Constants
│   │   ├── index.ts                       # Main constants
│   │   ├── navigation.ts                  # Navigation items
│   │   ├── scam-types.ts                  # Scam type definitions
│   │   └── personas.ts                    # Persona definitions
│   └── config.ts                          # App configuration
├── types/                                 # TypeScript types
│   ├── index.ts                           # Main type exports
│   ├── api.ts                             # API response types
│   ├── session.ts                         # Session types
│   ├── intelligence.ts                    # Intelligence types
│   ├── analytics.ts                       # Analytics types
│   └── common.ts                          # Common types
├── styles/                                # Additional styles
│   └── themes.css                         # Theme variables
├── public/                                # Static assets
│   ├── favicon.ico
│   ├── logo.svg
│   ├── logo-dark.svg
│   ├── og-image.png                       # Open Graph image
│   └── images/
│       └── placeholder.svg
├── .env.local                             # Local environment variables
├── .env.example                           # Example environment file
├── .eslintrc.json                         # ESLint configuration
├── .prettierrc                            # Prettier configuration
├── .gitignore                             # Git ignore
├── components.json                        # shadcn/ui config
├── next.config.js                         # Next.js config
├── package.json                           # Dependencies
├── postcss.config.js                      # PostCSS config
├── tailwind.config.ts                     # Tailwind config
├── tsconfig.json                          # TypeScript config
└── README.md                              # Frontend documentation
```

## FILE CONTENTS TO CREATE

### 1. package.json
```json
{
  "name": "scamshield-dashboard",
  "version": "1.0.0",
  "private": true,
  "description": "ScamShield Agentic Honeypot Dashboard - AI-powered scam intelligence platform",
  "author": "ScamShield Team",
  "license": "MIT",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf .next out node_modules",
    "analyze": "ANALYZE=true next build"
  },
  "dependencies": {
    "next": "14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@tanstack/react-query": "^5.17.0",
    "@tanstack/react-query-devtools": "^5.17.0",
    "axios": "^1.6.5",
    "zod": "^3.22.4",
    "react-hook-form": "^7.49.3",
    "@hookform/resolvers": "^3.3.3",
    "date-fns": "^3.2.0",
    "recharts": "^2.10.4",
    "framer-motion": "^10.18.0",
    "next-themes": "^0.2.1",
    "sonner": "^1.3.1",
    "lucide-react": "^0.309.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "class-variance-authority": "^0.7.0",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-sheet": "^1.0.5",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-tooltip": "^1.0.7"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.47",
    "@types/react-dom": "^18.2.18",
    "typescript": "^5.3.3",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.33",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.56.0",
    "eslint-config-next": "14.1.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-tailwindcss": "^3.13.1",
    "prettier": "^3.2.4",
    "prettier-plugin-tailwindcss": "^0.5.11",
    "@next/bundle-analyzer": "^14.1.0"
  }
}
```

### 2. tsconfig.json
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./types/*"],
      "@/styles/*": ["./styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 3. tailwind.config.ts
Complete Tailwind configuration with:
- Custom color palette (scamshield brand colors)
- Dark mode support (class-based)
- Custom animations
- Typography plugin ready
- Container configuration
- Extended spacing and sizing

### 4. next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts']
  }
}

module.exports = nextConfig
```

### 5. components.json (shadcn/ui)
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils/cn",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/lib/hooks"
  }
}
```

### 6. .env.local
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_VERSION=v1

# App Configuration
NEXT_PUBLIC_APP_NAME=ScamShield
NEXT_PUBLIC_APP_DESCRIPTION=AI-Powered Scam Intelligence Platform
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_CHAT=true
NEXT_PUBLIC_ENABLE_DARK_MODE=true

# Optional: API Key (if required)
NEXT_PUBLIC_API_KEY=
```

### 7. .env.example
Same as .env.local but with placeholder values and comments explaining each variable.

### 8. app/globals.css
Complete Tailwind CSS setup with:
- CSS variables for theming
- Dark mode variables
- Custom utility classes
- Scrollbar styling
- Animation keyframes
- Typography defaults

### 9. app/layout.tsx
Root layout with:
- HTML lang attribute
- Meta tags (SEO)
- Font loading (Inter from Google Fonts)
- Providers wrapper
- Toast container (Sonner)

### 10. app/providers.tsx
Provider wrapper component with:
- QueryClientProvider (TanStack Query)
- ThemeProvider (next-themes)
- Configuration for SSR

### 11. app/page.tsx
Landing page with:
- Hero section
- Feature highlights
- Call to action
- Professional design
- Responsive layout

### 12. app/(dashboard)/layout.tsx
Dashboard layout with:
- Sidebar navigation
- Top header
- Mobile responsive
- Breadcrumbs
- User area

### 13. components/layout/sidebar.tsx
Sidebar with:
- Logo
- Navigation items with icons
- Active state highlighting
- Collapsible on mobile
- Bottom section (settings, logout)

### 14. components/layout/header.tsx
Header with:
- Breadcrumbs
- Search bar
- Theme toggle
- Notifications icon
- User avatar/menu

### 15. components/theme-provider.tsx
Theme provider using next-themes with:
- System preference detection
- localStorage persistence
- SSR-safe implementation

### 16. components/theme-toggle.tsx
Theme toggle button with:
- Sun/Moon icons
- Smooth transition
- Accessible

### 17. lib/utils/cn.ts
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 18. lib/api/client.ts
Axios instance with:
- Base URL from env
- Request interceptors (auth token, logging)
- Response interceptors (error handling)
- Timeout configuration
- Retry logic

### 19. lib/api/endpoints.ts
```typescript
export const API_ENDPOINTS = {
  // Honeypot
  ENGAGE: '/v1/honeypot/engage',
  CONTINUE: '/v1/honeypot/continue',
  
  // Sessions
  SESSIONS: '/v1/sessions',
  SESSION: (id: string) => `/v1/honeypot/session/${id}`,
  SESSION_INTELLIGENCE: (id: string) => `/v1/sessions/${id}/intelligence`,
  
  // Intelligence
  INTELLIGENCE: '/v1/intelligence',
  INTELLIGENCE_DETAIL: (id: string) => `/v1/intelligence/${id}`,
  
  // Analytics
  ANALYTICS_SUMMARY: '/v1/analytics/summary',
  ANALYTICS_SCAM_TYPES: '/v1/analytics/scam-types',
  ANALYTICS_TIMELINE: '/v1/analytics/timeline',
  
  // Health
  HEALTH: '/health',
  HEALTH_DETAILED: '/health/detailed',
} as const
```

### 20. types/index.ts
Complete TypeScript types for:
- Session (SessionStatus, ScamType, Session)
- Intelligence (EntityType, ExtractedEntity)
- Analytics (AnalyticsSummary, TimelineData)
- API (ApiResponse, PaginatedResponse, ApiError)
- Common (Persona, RiskLevel)

### 21. lib/constants/index.ts
```typescript
export const APP_CONFIG = {
  name: 'ScamShield',
  description: 'AI-Powered Scam Intelligence Platform',
  version: '1.0.0',
} as const

export const SCAM_TYPES = {
  KYC_FRAUD: { label: 'KYC Fraud', color: 'red', icon: 'Shield' },
  LOTTERY_SCAM: { label: 'Lottery Scam', color: 'orange', icon: 'Gift' },
  TECH_SUPPORT: { label: 'Tech Support', color: 'yellow', icon: 'Monitor' },
  INVESTMENT_FRAUD: { label: 'Investment Fraud', color: 'purple', icon: 'TrendingUp' },
  JOB_SCAM: { label: 'Job Scam', color: 'blue', icon: 'Briefcase' },
  LOAN_SCAM: { label: 'Loan Scam', color: 'green', icon: 'Banknote' },
  OTP_FRAUD: { label: 'OTP Fraud', color: 'pink', icon: 'Key' },
  UNKNOWN: { label: 'Unknown', color: 'gray', icon: 'HelpCircle' },
} as const

export const PERSONAS = {
  elderly_victim: { label: 'Elderly Victim', description: 'Confused, trusting grandparent', icon: '👵' },
  tech_novice: { label: 'Tech Novice', description: 'Overwhelmed by technology', icon: '🤷' },
  eager_investor: { label: 'Eager Investor', description: 'Greedy, impatient investor', icon: '💰' },
  busy_professional: { label: 'Busy Professional', description: 'Distracted, time-pressed', icon: '👔' },
  helpful_auntie: { label: 'Helpful Auntie', description: 'Oversharing, chatty', icon: '👩' },
} as const

export const ENTITY_TYPES = {
  PHONE_NUMBER: { label: 'Phone Number', icon: 'Phone', color: 'blue' },
  UPI_ID: { label: 'UPI ID', icon: 'CreditCard', color: 'green' },
  BANK_ACCOUNT: { label: 'Bank Account', icon: 'Building', color: 'purple' },
  IFSC_CODE: { label: 'IFSC Code', icon: 'Hash', color: 'orange' },
  EMAIL: { label: 'Email', icon: 'Mail', color: 'pink' },
  URL: { label: 'Phishing Link', icon: 'Link', color: 'red' },
  CRYPTO_WALLET: { label: 'Crypto Wallet', icon: 'Bitcoin', color: 'yellow' },
} as const
```

### 22. lib/constants/navigation.ts
```typescript
import { 
  LayoutDashboard, 
  MessageSquare, 
  Brain, 
  BarChart3, 
  MessagesSquare,
  Settings,
  FileText,
  HelpCircle
} from 'lucide-react'

export const NAVIGATION_ITEMS = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview and statistics',
  },
  {
    title: 'Sessions',
    href: '/sessions',
    icon: MessageSquare,
    description: 'Scam engagement sessions',
  },
  {
    title: 'Intelligence',
    href: '/intelligence',
    icon: Brain,
    description: 'Extracted entities',
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    description: 'Charts and reports',
  },
  {
    title: 'Chat',
    href: '/chat',
    icon: MessagesSquare,
    description: 'Test scam scenarios',
  },
] as const

export const SECONDARY_NAVIGATION = [
  {
    title: 'Documentation',
    href: '/docs',
    icon: FileText,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
  {
    title: 'Help',
    href: '/help',
    icon: HelpCircle,
  },
] as const
```

### 23. shadcn/ui Components
Create all essential UI components:
- button.tsx (variants: default, destructive, outline, secondary, ghost, link)
- card.tsx (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- badge.tsx (variants for different statuses)
- input.tsx (with validation states)
- textarea.tsx
- select.tsx
- dialog.tsx
- dropdown-menu.tsx
- table.tsx (Table, TableHeader, TableBody, TableRow, TableCell, etc.)
- tabs.tsx
- tooltip.tsx
- skeleton.tsx
- separator.tsx
- scroll-area.tsx
- avatar.tsx
- alert.tsx
- progress.tsx
- sheet.tsx (for mobile sidebar)

### 24. components/common/loading-spinner.tsx
```typescript
import { cn } from "@/lib/utils/cn"
import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }
  
  return (
    <Loader2 className={cn("animate-spin text-primary", sizeClasses[size], className)} />
  )
}
```

### 25. components/common/empty-state.tsx
Generic empty state component with icon, title, description, and optional action button.

### 26. components/common/error-boundary.tsx
React error boundary with fallback UI and retry functionality.

### 27. app/loading.tsx
Global loading state with skeleton UI.

### 28. app/error.tsx
Global error page with retry button.

### 29. app/not-found.tsx
Custom 404 page with navigation back home.

### 30. Placeholder pages
Create placeholder pages for all routes with basic structure:
- app/(dashboard)/dashboard/page.tsx
- app/(dashboard)/sessions/page.tsx
- app/(dashboard)/sessions/[id]/page.tsx
- app/(dashboard)/intelligence/page.tsx
- app/(dashboard)/intelligence/[id]/page.tsx
- app/(dashboard)/analytics/page.tsx
- app/(dashboard)/chat/page.tsx
- app/(dashboard)/settings/page.tsx

Each placeholder should have:
- Page title
- Coming soon message
- Proper TypeScript types
- Export as default

### 31. .eslintrc.json
```json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "plugins": ["tailwindcss"],
  "rules": {
    "tailwindcss/classnames-order": "warn",
    "tailwindcss/no-custom-classname": "off"
  }
}
```

### 32. .prettierrc
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 33. .gitignore
```
# dependencies
node_modules
.pnp
.pnp.js

# testing
coverage

# next.js
.next/
out/

# production
build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# IDE
.idea
.vscode
```

### 34. frontend/README.md
Complete documentation for frontend:
- Features
- Tech stack
- Getting started
- Available scripts
- Project structure
- Environment variables
- Deployment

## QUALITY REQUIREMENTS

1. **TypeScript:** Strict mode, no any types, proper interfaces
2. **Accessibility:** ARIA labels, keyboard navigation, focus states
3. **Responsive:** Mobile-first, works on all screen sizes
4. **Performance:** Optimized imports, lazy loading ready
5. **SEO:** Meta tags, Open Graph, proper headings
6. **Dark Mode:** Full support with smooth transitions
7. **Error Handling:** Graceful fallbacks, user-friendly messages
8. **Loading States:** Skeletons for all async content
9. **Code Quality:** Consistent naming, proper comments
10. **Production Ready:** No console logs, proper error handling

## DESIGN SYSTEM

### Colors (CSS Variables)
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Success: Green (#22C55E)
- Warning: Yellow (#F59E0B)
- Danger: Red (#EF4444)
- Background: White/Slate-950
- Foreground: Slate-900/White

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold
- Body: Regular

### Spacing
- Consistent 4px grid
- Container max-width: 1280px

## IMPORTANT NOTES

1. All components must be server-component compatible (RSC)
2. Use 'use client' directive only when necessary
3. Implement proper loading and error states
4. Follow Next.js 14 App Router conventions
5. Use absolute imports with @ alias
6. Keep components small and focused
7. Extract reusable logic into hooks
8. Type all props and state

Create all files with complete, production-ready code. The project should be immediately runnable with `npm install && npm run dev` after creation.

## ⏹️ END PROMPT 1 ═════════════════════════════════════════════════════════════

---

# ═══════════════════════════════════════════════════════════════════════════════
# ██████╗ ██████╗  ██████╗ ███╗   ███╗██████╗ ████████╗    ██████╗ 
# ██╔══██╗██╔══██╗██╔═══██╗████╗ ████║██╔══██╗╚══██╔══╝    ╚════██╗
# ██████╔╝██████╔╝██║   ██║██╔████╔██║██████╔╝   ██║        █████╔╝
# ██╔═══╝ ██╔══██╗██║   ██║██║╚██╔╝██║██╔═══╝    ██║       ██╔═══╝ 
# ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║██║        ██║       ███████╗
# ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝        ╚═╝       ╚══════╝
# ═══════════════════════════════════════════════════════════════════════════════

# PROMPT 2: UI Component Library

## 📦 Expected Output
| Output | Description |
|--------|-------------|
| `frontend/components/ui/button.tsx` | Button with 6 variants, 5 sizes, loading state |
| `frontend/components/ui/card.tsx` | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| `frontend/components/ui/badge.tsx` | Badge with 8 variants for status/scam types |
| `frontend/components/ui/alert.tsx` | Alert with 4 variants (default, info, warning, error) |
| `frontend/components/ui/input.tsx` | Input with validation states, icons support |
| `frontend/components/ui/textarea.tsx` | Textarea with character count, auto-resize |
| `frontend/components/ui/select.tsx` | Select with search, multi-select support |
| `frontend/components/ui/dialog.tsx` | Modal dialog with animations |
| `frontend/components/ui/dropdown-menu.tsx` | Dropdown with nested menus |
| `frontend/components/ui/table.tsx` | Table with sorting, pagination support |
| `frontend/components/ui/tabs.tsx` | Tabs with keyboard navigation |
| `frontend/components/ui/tooltip.tsx` | Tooltip with positioning |
| `frontend/components/ui/skeleton.tsx` | Skeleton loaders (text, card, table, avatar) |
| `frontend/components/ui/progress.tsx` | Progress bar with animations |
| `frontend/components/ui/avatar.tsx` | Avatar with fallback initials |
| `frontend/components/ui/separator.tsx` | Horizontal/vertical separator |
| `frontend/components/ui/scroll-area.tsx` | Custom scrollbar area |
| `frontend/components/ui/sheet.tsx` | Slide-out panel (mobile sidebar) |
| `frontend/components/ui/switch.tsx` | Toggle switch |
| `frontend/components/ui/checkbox.tsx` | Checkbox with indeterminate state |
| `frontend/components/ui/radio-group.tsx` | Radio button group |
| `frontend/components/ui/label.tsx` | Form label with required indicator |
| `frontend/components/ui/form.tsx` | Form components with React Hook Form |
| `frontend/components/ui/toast.tsx` | Toast notification system |
| `frontend/components/ui/toaster.tsx` | Toast container |
| `frontend/components/ui/sonner.tsx` | Sonner toast integration |
| `frontend/components/ui/popover.tsx` | Popover with positioning |
| `frontend/components/ui/command.tsx` | Command palette (search) |
| `frontend/components/ui/data-table.tsx` | Advanced data table with TanStack Table |
| `frontend/components/ui/date-picker.tsx` | Date picker component |
| `frontend/components/ui/calendar.tsx` | Calendar component |
| `frontend/components/ui/slider.tsx` | Range slider |
| `frontend/components/ui/accordion.tsx` | Collapsible accordion |
| `frontend/components/ui/alert-dialog.tsx` | Confirmation dialog |
| `frontend/components/ui/hover-card.tsx` | Hover card preview |
| `frontend/components/ui/context-menu.tsx` | Right-click context menu |
| `frontend/components/ui/menubar.tsx` | Menu bar navigation |
| `frontend/components/ui/navigation-menu.tsx` | Navigation menu |
| `frontend/components/ui/aspect-ratio.tsx` | Aspect ratio container |
| `frontend/components/ui/collapsible.tsx` | Collapsible section |
| `frontend/components/common/loading-spinner.tsx` | Animated loading spinner |
| `frontend/components/common/empty-state.tsx` | Empty state with icon, title, action |
| `frontend/components/common/error-state.tsx` | Error state with retry |
| `frontend/components/common/page-loader.tsx` | Full page loading |
| `frontend/components/common/data-card.tsx` | Stats/metric card |
| `frontend/components/common/status-badge.tsx` | Status indicator badge |
| `frontend/components/common/copy-button.tsx` | Copy to clipboard button |
| `frontend/components/common/search-input.tsx` | Search input with debounce |
| `frontend/components/common/confirm-dialog.tsx` | Reusable confirmation dialog |
| `frontend/components/common/file-upload.tsx` | File upload dropzone |
| `frontend/app/globals.css` | Complete theme CSS variables |
| `frontend/styles/themes.css` | Extended theme configurations |
| `frontend/lib/utils/cn.ts` | Class name utility |
| `frontend/lib/utils/format.ts` | Formatting utilities |
| **Total: 55+ files** | Complete FAANG-level component library |

## ▶️ START PROMPT 2 ═══════════════════════════════════════════════════════════

Create a complete FAANG/MNC-level UI component library for ScamShield Agentic Honeypot Dashboard using shadcn/ui, Radix UI primitives, and Tailwind CSS. This is an enterprise-grade component system for India AI Impact Buildathon 2026.

## PROJECT CONTEXT

This is PROMPT 2 of the ScamShield frontend development. PROMPT 1 has already set up the Next.js 14 project structure. Now we need to build a comprehensive component library that rivals Google Material UI, Ant Design, and Chakra UI in quality and completeness.

The component library will be used for:
- Dashboard displaying scam engagement statistics
- Session management with conversation history
- Intelligence extraction display (bank accounts, UPI IDs, phone numbers)
- Analytics charts and reports
- Real-time chat interface for scam simulation
- Dark/Light theme support throughout

## TECHNICAL REQUIREMENTS

### Dependencies (Already installed in Prompt 1)
- Radix UI primitives (@radix-ui/react-*)
- Tailwind CSS 3.4+
- class-variance-authority (CVA)
- clsx + tailwind-merge
- Lucide React icons
- Framer Motion for animations
- Sonner for toasts
- React Hook Form + Zod
- TanStack Table for data tables
- date-fns for dates
- cmdk for command palette

### Design Principles
1. **Composable:** Components can be combined flexibly
2. **Accessible:** WCAG 2.1 AA compliant, keyboard navigation
3. **Themeable:** CSS variables for easy customization
4. **Responsive:** Mobile-first, works on all screen sizes
5. **Animated:** Subtle, performant animations
6. **Type-safe:** Full TypeScript support with proper generics

## COMPONENT SPECIFICATIONS

### 1. frontend/components/ui/button.tsx

```typescript
// Button component with variants, sizes, loading state, and icons
// Variants: default, destructive, outline, secondary, ghost, link
// Sizes: xs, sm, default, lg, xl
// Features:
// - Loading spinner with disabled state
// - Left/right icon support
// - Full width option
// - As child pattern for links
// - Keyboard focus ring
// - Ripple effect on click (optional)

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-green-600 text-white hover:bg-green-700 shadow-sm",
        warning: "bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm",
      },
      size: {
        xs: "h-7 px-2 text-xs rounded",
        sm: "h-8 px-3 text-xs rounded-md",
        default: "h-10 px-4 py-2",
        lg: "h-11 px-6 text-base rounded-lg",
        xl: "h-12 px-8 text-lg rounded-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, leftIcon, rightIcon, fullWidth, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          fullWidth && "w-full",
          loading && "cursor-wait"
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### 2. frontend/components/ui/card.tsx

```typescript
// Card component with header, title, description, content, footer
// Features:
// - Hover effects
// - Click handling (for clickable cards)
// - Loading skeleton variant
// - Bordered/borderless variants
// - Shadow variants (none, sm, md, lg)

// Exports: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
// Additional: CardSkeleton for loading states
```

### 3. frontend/components/ui/badge.tsx

```typescript
// Badge component for statuses, counts, labels
// Variants: default, secondary, destructive, outline, success, warning, info
// Scam-specific variants: kyc, lottery, tech_support, investment, job, loan, otp
// Sizes: sm, default, lg
// Features:
// - Dot indicator option
// - Removable badges with X button
// - Animated pulse for live/active states
// - Icon support

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        success: "border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
        warning: "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
        info: "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
        // Scam type specific badges
        kyc_fraud: "border-transparent bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
        lottery_scam: "border-transparent bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
        tech_support: "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
        investment_fraud: "border-transparent bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
        job_scam: "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
        loan_scam: "border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
        otp_fraud: "border-transparent bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
        // Status badges
        active: "border-transparent bg-green-100 text-green-800 animate-pulse",
        completed: "border-transparent bg-gray-100 text-gray-800",
        failed: "border-transparent bg-red-100 text-red-800",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### 4. frontend/components/ui/input.tsx

```typescript
// Input component with full form integration
// Features:
// - Error/success states with colors
// - Left/right icons/addons
// - Clearable input
// - Password visibility toggle
// - Character counter
// - Disabled/readonly states
// - Various types: text, email, password, number, search, tel, url
// - Size variants: sm, default, lg

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  success?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
  showPasswordToggle?: boolean
}
```

### 5. frontend/components/ui/textarea.tsx

```typescript
// Textarea with advanced features
// Features:
// - Auto-resize based on content
// - Character counter with limit
// - Min/max rows
// - Error/success states
// - Disabled/readonly states
```

### 6. frontend/components/ui/select.tsx

```typescript
// Select component using Radix UI Select
// Features:
// - Searchable/filterable options
// - Multi-select support
// - Option groups
// - Custom option rendering
// - Clear button
// - Loading state
// - Empty state
// - Keyboard navigation
```

### 7. frontend/components/ui/dialog.tsx

```typescript
// Modal dialog using Radix UI Dialog
// Features:
// - Animated open/close (Framer Motion)
// - Multiple sizes: sm, default, lg, xl, full
// - Scrollable content
// - Close on overlay click (configurable)
// - Close on escape (configurable)
// - Focus trap
// - Nested dialogs support

// Exports: Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose
```

### 8. frontend/components/ui/dropdown-menu.tsx

```typescript
// Dropdown menu using Radix UI DropdownMenu
// Features:
// - Nested submenus
// - Checkboxes and radio items
// - Keyboard navigation
// - Icons support
// - Disabled items
// - Separators
// - Labels/headers

// Exports: DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup
```

### 9. frontend/components/ui/table.tsx

```typescript
// Table component for basic tables
// Features:
// - Responsive horizontal scroll
// - Striped rows option
// - Hoverable rows
// - Sticky header
// - Row selection support
// - Loading skeleton rows

// Exports: Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption
```

### 10. frontend/components/ui/data-table.tsx

```typescript
// Advanced data table using TanStack Table
// Features:
// - Column sorting (single and multi)
// - Column filtering
// - Global search/filter
// - Pagination (client and server-side)
// - Row selection (single and multi)
// - Column visibility toggle
// - Column resizing
// - Column reordering
// - Row expansion
// - Sticky header and columns
// - Loading states
// - Empty states
// - Export to CSV
// - Responsive design

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  loading?: boolean
  emptyMessage?: string
  pagination?: boolean
  pageSize?: number
  selectable?: boolean
  onRowSelect?: (rows: TData[]) => void
}
```

### 11. frontend/components/ui/tabs.tsx

```typescript
// Tabs using Radix UI Tabs
// Features:
// - Horizontal and vertical orientations
// - Animated indicator
// - Keyboard navigation
// - Disabled tabs
// - Icons in tabs
// - Badge counts in tabs
// - Scrollable tab list for many tabs
```

### 12. frontend/components/ui/skeleton.tsx

```typescript
// Skeleton loaders for various content types
// Exports:
// - Skeleton (base)
// - SkeletonText (paragraph lines)
// - SkeletonAvatar (circular)
// - SkeletonCard (card placeholder)
// - SkeletonTable (table rows)
// - SkeletonChart (chart placeholder)
// - SkeletonList (list items)

// Features:
// - Animated shimmer effect
// - Customizable sizes
// - Composable for complex layouts
```

### 13. frontend/components/ui/toast.tsx + toaster.tsx + sonner.tsx

```typescript
// Toast notification system using Sonner
// Features:
// - Multiple toast types: default, success, error, warning, info, loading
// - Promise toasts (loading -> success/error)
// - Custom JSX content
// - Action buttons
// - Dismissible
// - Auto-dismiss with configurable duration
// - Position options: top-left, top-right, bottom-left, bottom-right, top-center, bottom-center
// - Maximum visible toasts
// - Stacked appearance
// - Keyboard dismissible

// Usage examples in comments:
// toast("Event created")
// toast.success("Session started successfully")
// toast.error("Failed to extract intelligence")
// toast.promise(fetchData(), { loading: "Loading...", success: "Done!", error: "Error" })
```

### 14. frontend/components/ui/alert.tsx

```typescript
// Alert component for messages and notifications
// Variants: default, info, success, warning, destructive
// Features:
// - Icon slot
// - Dismissible option
// - Title and description
// - Action buttons
// - Animated entrance/exit
```

### 15. frontend/components/ui/progress.tsx

```typescript
// Progress bar component
// Features:
// - Determinate (percentage)
// - Indeterminate (loading)
// - Sizes: sm, default, lg
// - Color variants
// - Animated transitions
// - Value label option
// - Circular progress variant
```

### 16. frontend/components/ui/avatar.tsx

```typescript
// Avatar component using Radix UI Avatar
// Features:
// - Image with fallback
// - Initials fallback (auto-generated from name)
// - Sizes: xs, sm, default, lg, xl
// - Status indicator (online, offline, busy, away)
// - Bordered option
// - Avatar group with overlap
// - Placeholder/skeleton state
```

### 17. frontend/components/ui/tooltip.tsx

```typescript
// Tooltip using Radix UI Tooltip
// Features:
// - Multiple positions: top, right, bottom, left
// - Delay open/close
// - Arrow pointer
// - Custom content support
// - Disabled when trigger is disabled
```

### 18. frontend/components/ui/popover.tsx

```typescript
// Popover using Radix UI Popover
// Features:
// - Multiple positions with auto-flip
// - Arrow pointer
// - Click outside to close
// - Focus trap option
// - Controlled/uncontrolled modes
```

### 19. frontend/components/ui/sheet.tsx

```typescript
// Slide-out panel using Radix UI Dialog
// Features:
// - Slide from: top, right, bottom, left
// - Multiple sizes: sm, default, lg, xl, full
// - Overlay backdrop
// - Close button
// - Scrollable content
// - Focus trap
// Perfect for mobile navigation sidebar
```

### 20. frontend/components/ui/command.tsx

```typescript
// Command palette using cmdk
// Features:
// - Fast fuzzy search
// - Keyboard navigation (up/down/enter/escape)
// - Grouped commands
// - Recent/suggested items
// - Loading state
// - Empty state
// - Custom item rendering
// Can be used for:
// - Global search (Cmd+K)
// - Action palette
// - Autocomplete
```

### 21. frontend/components/ui/calendar.tsx + date-picker.tsx

```typescript
// Calendar and DatePicker components
// Features:
// - Single date selection
// - Date range selection
// - Multiple date selection
// - Min/max date constraints
// - Disabled dates
// - Month/year navigation
// - Keyboard navigation
// - Locale support
// - Format customization
```

### 22. frontend/components/ui/form.tsx

```typescript
// Form components integrated with React Hook Form
// Features:
// - Form wrapper with context
// - FormField with controller
// - FormItem, FormLabel, FormControl, FormDescription, FormMessage
// - Automatic error display
// - Zod validation integration
// - Accessible form controls

// Usage with React Hook Form and Zod for type-safe forms
```

### 23. frontend/components/ui/switch.tsx

```typescript
// Toggle switch using Radix UI Switch
// Features:
// - Sizes: sm, default, lg
// - Disabled state
// - Loading state
// - Label position: left, right
// - Accessible
```

### 24. frontend/components/ui/checkbox.tsx

```typescript
// Checkbox using Radix UI Checkbox
// Features:
// - Checked, unchecked, indeterminate states
// - Disabled state
// - Custom icons
// - Label support
// - Form integration
```

### 25. frontend/components/ui/radio-group.tsx

```typescript
// Radio group using Radix UI RadioGroup
// Features:
// - Vertical/horizontal layout
// - Disabled options
// - Card-style radio options
// - Form integration
```

### 26. frontend/components/ui/accordion.tsx

```typescript
// Accordion using Radix UI Accordion
// Features:
// - Single/multiple expanded
// - Animated expand/collapse
// - Custom trigger/content
// - Disabled items
// - Icon customization
```

### 27. frontend/components/ui/alert-dialog.tsx

```typescript
// Confirmation dialog using Radix UI AlertDialog
// Features:
// - Danger/warning variants
// - Cancel and confirm buttons
// - Custom content
// - Async confirm handler with loading
// - Not dismissible by clicking outside (intentional for confirmations)
```

### 28. frontend/components/ui/slider.tsx

```typescript
// Range slider using Radix UI Slider
// Features:
// - Single value
// - Range (min-max)
// - Step increments
// - Marks/labels
// - Disabled state
// - Vertical orientation
```

### 29. frontend/components/ui/scroll-area.tsx

```typescript
// Custom scrollbar area using Radix UI ScrollArea
// Features:
// - Custom styled scrollbar
// - Horizontal/vertical scroll
// - Auto-hide scrollbar
// - Smooth scrolling
```

### 30. frontend/components/ui/separator.tsx

```typescript
// Visual separator using Radix UI Separator
// Features:
// - Horizontal/vertical orientation
// - Decorative option
// - Label in middle option (OR separator)
```

### 31. frontend/components/ui/hover-card.tsx

```typescript
// Hover card using Radix UI HoverCard
// Features:
// - Rich preview on hover
// - Open/close delay
// - Arrow pointer
// - Custom positioning
// Good for user previews, link previews
```

### 32. frontend/components/ui/context-menu.tsx

```typescript
// Right-click context menu using Radix UI ContextMenu
// Features:
// - Nested submenus
// - Checkboxes and radio items
// - Keyboard shortcuts display
// - Disabled items
// - Separators
```

### 33. frontend/components/ui/menubar.tsx

```typescript
// Menu bar using Radix UI Menubar
// Features:
// - Multiple menus
// - Keyboard navigation
// - Checkboxes and radio items
// - Nested submenus
// - Shortcuts display
```

### 34. frontend/components/ui/navigation-menu.tsx

```typescript
// Navigation menu using Radix UI NavigationMenu
// Features:
// - Viewport animation
// - Mega menu support
// - Keyboard navigation
// - Link items and triggers
// - Indicator animation
```

### 35. frontend/components/ui/aspect-ratio.tsx

```typescript
// Aspect ratio container using Radix UI AspectRatio
// Features:
// - Common ratios: 1:1, 16:9, 4:3, 21:9
// - Custom ratios
// - Responsive
```

### 36. frontend/components/ui/collapsible.tsx

```typescript
// Collapsible section using Radix UI Collapsible
// Features:
// - Animated expand/collapse
// - Controlled/uncontrolled
// - Custom trigger
```

### 37. frontend/components/ui/label.tsx

```typescript
// Form label using Radix UI Label
// Features:
// - Required indicator (asterisk)
// - Optional indicator
// - Disabled styling
// - htmlFor association
```

## COMMON COMPONENTS (frontend/components/common/)

### 38. frontend/components/common/loading-spinner.tsx

```typescript
// Animated loading spinner
// Sizes: xs, sm, md, lg, xl
// Colors: primary, secondary, white
// Full-screen overlay option
```

### 39. frontend/components/common/empty-state.tsx

```typescript
// Empty state placeholder
// Features:
// - Icon (customizable)
// - Title
// - Description
// - Action button
// - Multiple preset illustrations

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}
```

### 40. frontend/components/common/error-state.tsx

```typescript
// Error state with retry
// Features:
// - Error icon
// - Error message
// - Retry button
// - Report issue link
```

### 41. frontend/components/common/page-loader.tsx

```typescript
// Full page loading overlay
// Features:
// - Logo animation
// - Progress indicator
// - Loading message
// - Blur background
```

### 42. frontend/components/common/data-card.tsx

```typescript
// Statistics/metrics card
// Features:
// - Icon
// - Label
// - Value (with formatting)
// - Trend indicator (up/down/neutral)
// - Comparison (vs last period)
// - Sparkline chart option
// - Click to drill down

interface DataCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  trend?: {
    value: number
    direction: 'up' | 'down' | 'neutral'
  }
  comparison?: string
  loading?: boolean
  onClick?: () => void
}
```

### 43. frontend/components/common/status-badge.tsx

```typescript
// Status indicator badge
// Maps session statuses to colors and labels
// Features:
// - Dot indicator
// - Pulse animation for active
// - Tooltip with details

type Status = 'active' | 'completed' | 'failed' | 'pending' | 'processing'
```

### 44. frontend/components/common/copy-button.tsx

```typescript
// Copy to clipboard button
// Features:
// - Copy icon changes to check on success
// - Toast notification
// - Supports any text content
// - Accessible
```

### 45. frontend/components/common/search-input.tsx

```typescript
// Search input with debounce
// Features:
// - Search icon
// - Clear button
// - Debounced onChange (300ms default)
// - Loading indicator
// - Keyboard shortcut hint (Cmd+K)
```

### 46. frontend/components/common/confirm-dialog.tsx

```typescript
// Reusable confirmation dialog
// Features:
// - Promise-based API
// - Danger/warning variants
// - Custom title, description
// - Custom button labels
// - Async confirm with loading

// Usage: const confirmed = await confirmDialog({ title: "Delete?", description: "..." })
```

### 47. frontend/components/common/file-upload.tsx

```typescript
// File upload dropzone
// Features:
// - Drag and drop
// - Click to browse
// - File type restrictions
// - Max file size
// - Multiple files
// - Preview thumbnails
// - Upload progress
// - Remove file
```

## THEME SYSTEM (frontend/app/globals.css)

Create a comprehensive CSS variables theme system:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Background colors */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    
    /* Card colors */
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    
    /* Popover colors */
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    
    /* Primary colors - Blue */
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    
    /* Secondary colors */
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    
    /* Muted colors */
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    
    /* Accent colors */
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    
    /* Destructive colors - Red */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    
    /* Success colors - Green */
    --success: 142.1 76.2% 36.3%;
    --success-foreground: 355.7 100% 97.3%;
    
    /* Warning colors - Yellow */
    --warning: 45.4 93.4% 47.5%;
    --warning-foreground: 26 83.3% 14.1%;
    
    /* Info colors - Blue */
    --info: 199.4 95.5% 53.8%;
    --info-foreground: 210 40% 98%;
    
    /* Border and input colors */
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    
    /* Border radius */
    --radius: 0.5rem;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    
    /* Sidebar specific */
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
    
    /* Chart colors */
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    /* Dark mode colors */
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    
    --success: 142.1 70.6% 45.3%;
    --success-foreground: 144.9 80.4% 10%;
    
    --warning: 48 96.5% 53.1%;
    --warning-foreground: 26 83.3% 14.1%;
    
    --info: 199.4 95.5% 53.8%;
    --info-foreground: 210 40% 98%;
    
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
    
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
    
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

/* Custom scrollbar */
@layer utilities {
  .scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: hsl(var(--muted)) transparent;
  }
  
  .scrollbar-thin::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: hsl(var(--muted-foreground) / 0.3);
    border-radius: 4px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background-color: hsl(var(--muted-foreground) / 0.5);
  }
}

/* Animation utilities */
@layer utilities {
  .animate-in {
    animation: animate-in 0.2s ease-out;
  }
  
  .animate-out {
    animation: animate-out 0.2s ease-in;
  }
  
  @keyframes animate-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes animate-out {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }
  
  .slide-in-from-top {
    animation: slide-in-from-top 0.2s ease-out;
  }
  
  @keyframes slide-in-from-top {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .slide-in-from-bottom {
    animation: slide-in-from-bottom 0.2s ease-out;
  }
  
  @keyframes slide-in-from-bottom {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .fade-in {
    animation: fade-in 0.2s ease-out;
  }
  
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}

/* Focus styles */
@layer utilities {
  .focus-ring {
    @apply focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;
  }
}
```

## UTILITY FUNCTIONS

### 48. frontend/lib/utils/cn.ts

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 49. frontend/lib/utils/format.ts

```typescript
// Formatting utilities
export function formatNumber(value: number): string
export function formatCurrency(value: number, currency?: string): string
export function formatPercentage(value: number): string
export function formatPhoneNumber(phone: string): string
export function formatUpiId(upi: string): string
export function formatBankAccount(account: string): string
export function truncate(str: string, length: number): string
export function capitalize(str: string): string
export function slugify(str: string): string
```

### 50. frontend/lib/utils/date.ts

```typescript
// Date utilities using date-fns
export function formatDate(date: Date | string, format?: string): string
export function formatRelativeTime(date: Date | string): string
export function formatDuration(seconds: number): string
export function isToday(date: Date | string): boolean
export function isYesterday(date: Date | string): boolean
export function getTimeAgo(date: Date | string): string
```

## QUALITY REQUIREMENTS

1. **Accessibility (WCAG 2.1 AA):**
   - All interactive elements are keyboard accessible
   - Proper ARIA labels and roles
   - Focus indicators visible
   - Color contrast ratios met
   - Screen reader compatible

2. **Performance:**
   - Tree-shakeable exports
   - Minimal runtime overhead
   - Optimized re-renders
   - Lazy load heavy components

3. **Type Safety:**
   - Full TypeScript coverage
   - Generic components where appropriate
   - Exported types for all components
   - No `any` types

4. **Documentation:**
   - JSDoc comments on all exports
   - Usage examples in comments
   - Props documentation

5. **Testing Ready:**
   - data-testid attributes
   - Deterministic behavior
   - No random IDs in SSR

## IMPORTANT NOTES

1. All components must work with Next.js 14 App Router (RSC compatible)
2. Use 'use client' directive only when needed (interactive components)
3. Follow shadcn/ui patterns for consistency
4. Ensure all Radix UI primitives are properly typed
5. Support both controlled and uncontrolled patterns
6. Include proper displayName for React DevTools
7. Forward refs on all components that wrap DOM elements
8. Use CVA (class-variance-authority) for variant styling

Create all 55+ component files with complete, production-ready code. Each component should be immediately usable after creation with no additional setup required.

## ⏹️ END PROMPT 2 ═════════════════════════════════════════════════════════════

---

# ═══════════════════════════════════════════════════════════════════════════════
# ██████╗ ██████╗  ██████╗ ███╗   ███╗██████╗ ████████╗    ██████╗ 
# ██╔══██╗██╔══██╗██╔═══██╗████╗ ████║██╔══██╗╚══██╔══╝    ╚════██╗
# ██████╔╝██████╔╝██║   ██║██╔████╔██║██████╔╝   ██║        █████╔╝
# ██╔═══╝ ██╔══██╗██║   ██║██║╚██╔╝██║██╔═══╝    ██║        ╚═══██╗
# ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║██║        ██║       ██████╔╝
# ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝        ╚═╝       ╚═════╝ 
# ═══════════════════════════════════════════════════════════════════════════════

# PROMPT 3: Dashboard Home Page

## 📦 Expected Output
| Output | Description |
|--------|-------------|
| `frontend/app/(dashboard)/dashboard/page.tsx` | Main dashboard page component |
| `frontend/app/(dashboard)/dashboard/loading.tsx` | Dashboard loading skeleton |
| `frontend/app/(dashboard)/dashboard/error.tsx` | Dashboard error boundary |
| `frontend/components/dashboard/stats-cards.tsx` | Statistics cards grid component |
| `frontend/components/dashboard/stat-card.tsx` | Individual stat card with animations |
| `frontend/components/dashboard/scam-detection-chart.tsx` | Real-time line/area chart |
| `frontend/components/dashboard/scam-types-chart.tsx` | Pie/donut chart for scam distribution |
| `frontend/components/dashboard/recent-sessions.tsx` | Recent sessions list with status |
| `frontend/components/dashboard/session-row.tsx` | Individual session row component |
| `frontend/components/dashboard/threat-level-indicator.tsx` | Threat level gauge/meter |
| `frontend/components/dashboard/threat-level-card.tsx` | Threat level summary card |
| `frontend/components/dashboard/system-health.tsx` | System health status panel |
| `frontend/components/dashboard/health-indicator.tsx` | Individual health metric |
| `frontend/components/dashboard/quick-actions.tsx` | Quick action buttons panel |
| `frontend/components/dashboard/activity-feed.tsx` | Real-time activity feed |
| `frontend/components/dashboard/activity-item.tsx` | Individual activity item |
| `frontend/components/dashboard/intelligence-summary.tsx` | Extracted intel summary |
| `frontend/components/dashboard/entity-count-card.tsx` | Entity type count card |
| `frontend/components/dashboard/persona-performance.tsx` | Persona effectiveness chart |
| `frontend/components/dashboard/geo-distribution.tsx` | Geographic distribution (mock) |
| `frontend/components/dashboard/time-range-selector.tsx` | Date range filter |
| `frontend/components/dashboard/refresh-button.tsx` | Manual refresh with countdown |
| `frontend/components/dashboard/dashboard-header.tsx` | Dashboard page header |
| `frontend/components/dashboard/welcome-banner.tsx` | Welcome/greeting banner |
| `frontend/components/dashboard/alerts-panel.tsx` | Active alerts/warnings panel |
| `frontend/components/dashboard/kpi-ticker.tsx` | Scrolling KPI ticker |
| `frontend/components/charts/line-chart.tsx` | Reusable line chart wrapper |
| `frontend/components/charts/area-chart.tsx` | Reusable area chart wrapper |
| `frontend/components/charts/bar-chart.tsx` | Reusable bar chart wrapper |
| `frontend/components/charts/pie-chart.tsx` | Reusable pie/donut chart wrapper |
| `frontend/components/charts/sparkline.tsx` | Mini sparkline chart |
| `frontend/components/charts/chart-container.tsx` | Chart wrapper with loading/error |
| `frontend/components/charts/chart-tooltip.tsx` | Custom chart tooltip |
| `frontend/components/charts/chart-legend.tsx` | Custom chart legend |
| `frontend/lib/hooks/use-dashboard-data.ts` | Dashboard data fetching hook |
| `frontend/lib/hooks/use-realtime-stats.ts` | Real-time stats polling hook |
| `frontend/lib/hooks/use-chart-data.ts` | Chart data transformation hook |
| `frontend/lib/api/dashboard.ts` | Dashboard API functions |
| `frontend/types/dashboard.ts` | Dashboard TypeScript types |
| **Total: 40+ files** | Complete production-ready dashboard |

## ▶️ START PROMPT 3 ═══════════════════════════════════════════════════════════

Create a complete FAANG/MNC-level Dashboard Home Page for ScamShield Agentic Honeypot using Next.js 14, React, Recharts, and TanStack Query. This is an enterprise-grade real-time monitoring dashboard for India AI Impact Buildathon 2026.

## PROJECT CONTEXT

This is PROMPT 3 of the ScamShield frontend development. PROMPT 1 set up the Next.js 14 project, and PROMPT 2 created the UI component library. Now we need to build a stunning, feature-rich dashboard home page that displays real-time scam engagement statistics, similar to dashboards at Google, Meta, Datadog, or Grafana.

The dashboard monitors:
- Active scam engagement sessions
- Extracted intelligence (bank accounts, UPI IDs, phone numbers, phishing links)
- Scam type distribution
- Persona effectiveness
- System health and API status
- Threat levels and alerts

## BACKEND API ENDPOINTS (Already Built)

```typescript
// Analytics endpoints
GET /v1/analytics/summary
Response: {
  total_sessions: number
  active_sessions: number
  completed_sessions: number
  total_intelligence: number
  scam_detection_rate: number
  avg_session_duration: number
  total_entities_extracted: number
}

GET /v1/analytics/scam-types
Response: {
  distribution: [
    { scam_type: string, count: number, percentage: number }
  ]
}

GET /v1/analytics/timeline
Response: {
  data: [
    { date: string, sessions: number, intelligence: number }
  ]
}

// Sessions endpoints
GET /v1/sessions?limit=10&status=active
Response: {
  sessions: [
    {
      id: string
      status: 'active' | 'completed' | 'failed'
      scam_type: string
      persona_used: string
      turn_count: number
      created_at: string
      extracted_count: number
    }
  ]
}

// Health endpoint
GET /health/detailed
Response: {
  status: 'healthy' | 'degraded' | 'unhealthy'
  components: {
    database: { status: string, latency_ms: number }
    llm: { status: string, latency_ms: number }
    api: { status: string, requests_per_minute: number }
  }
  uptime_seconds: number
  version: string
}
```

## TECHNICAL REQUIREMENTS

### Stack
- **Framework:** Next.js 14 (App Router, Server Components where possible)
- **State Management:** TanStack Query for server state
- **Charts:** Recharts with custom styling
- **Animations:** Framer Motion for micro-interactions
- **Styling:** Tailwind CSS + shadcn/ui components
- **Real-time:** Polling with configurable intervals (5s, 10s, 30s, 1m)

### Design Requirements
- **Dark/Light Mode:** Full support with smooth transitions
- **Responsive:** Mobile-first, tablet, desktop layouts
- **Accessibility:** WCAG 2.1 AA compliant
- **Performance:** Skeleton loading, optimistic updates
- **Animations:** Subtle, professional micro-interactions

## DASHBOARD LAYOUT STRUCTURE

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  HEADER: Welcome Banner + Time Range Selector + Refresh Button              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ Total       │ │ Active      │ │ Intelligence│ │ Detection   │           │
│  │ Sessions    │ │ Sessions    │ │ Extracted   │ │ Rate        │           │
│  │ 1,234 ↑12%  │ │ 23 🔴 Live  │ │ 567 ↑8%     │ │ 94.5% ↑2%   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                                              │
│  ┌─────────────────────────────────────┐ ┌─────────────────────────────┐   │
│  │                                     │ │                             │   │
│  │  📈 SCAM DETECTION TIMELINE        │ │  🍩 SCAM TYPE DISTRIBUTION  │   │
│  │  [Interactive Area/Line Chart]      │ │  [Donut Chart with Legend]  │   │
│  │                                     │ │                             │   │
│  │  Sessions ━━━  Intelligence ━━━    │ │  KYC: 35%  Lottery: 25%    │   │
│  │                                     │ │  Investment: 20%  Other: 20%│   │
│  └─────────────────────────────────────┘ └─────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────────────────────┐ ┌─────────────────────────────┐   │
│  │                                     │ │                             │   │
│  │  📋 RECENT SESSIONS                │ │  🎯 THREAT LEVEL            │   │
│  │  ┌─────────────────────────────┐   │ │                             │   │
│  │  │ 🔴 KYC Fraud | elderly_vic. │   │ │  ┌─────────────────────┐   │   │
│  │  │ Turn 3 | 2 entities | 2m ago│   │ │  │    ████████░░░░     │   │   │
│  │  ├─────────────────────────────┤   │ │  │      ELEVATED       │   │   │
│  │  │ 🟢 Lottery | tech_novice    │   │ │  │    Level: 7/10      │   │   │
│  │  │ Completed | 5 entities | 5m │   │ │  └─────────────────────┘   │   │
│  │  ├─────────────────────────────┤   │ │                             │   │
│  │  │ 🟡 Investment | eager_inv.  │   │ │  Active Threats: 3         │   │
│  │  │ Turn 5 | 3 entities | 8m    │   │ │  High Risk Sessions: 2     │   │
│  │  └─────────────────────────────┘   │ │                             │   │
│  │  [View All Sessions →]             │ │                             │   │
│  └─────────────────────────────────────┘ └─────────────────────────────┘   │
│                                                                              │
│  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────────────┐ │
│  │ 🏥 SYSTEM HEALTH  │ │ ⚡ QUICK ACTIONS  │ │ 📊 INTELLIGENCE SUMMARY   │ │
│  │                   │ │                   │ │                           │ │
│  │ API: 🟢 Healthy   │ │ [+ New Session]   │ │ 📞 Phones: 234            │ │
│  │ DB:  🟢 Healthy   │ │ [📊 Analytics]    │ │ 💳 UPI IDs: 156           │ │
│  │ LLM: 🟢 Healthy   │ │ [💬 Test Chat]    │ │ 🏦 Banks: 89              │ │
│  │                   │ │ [📥 Export]       │ │ 🔗 Links: 67              │ │
│  │ Uptime: 99.9%     │ │                   │ │                           │ │
│  └───────────────────┘ └───────────────────┘ └───────────────────────────┘ │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ 📡 LIVE ACTIVITY FEED                                                   ││
│  │ • 2s ago: New session started (KYC Fraud detected)                      ││
│  │ • 15s ago: Intelligence extracted - UPI ID: scammer@upi                 ││
│  │ • 32s ago: Session completed - 4 entities extracted                     ││
│  │ • 1m ago: Threat level elevated to HIGH                                 ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

## COMPONENT SPECIFICATIONS

### 1. frontend/app/(dashboard)/dashboard/page.tsx

```typescript
// Main dashboard page - Server Component with client islands
// Features:
// - Initial data fetch on server (SSR)
// - Client-side hydration for real-time updates
// - Responsive grid layout
// - Loading states with skeletons
// - Error boundaries for each section

import { Suspense } from 'react'
import { Metadata } from 'next'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { ScamDetectionChart } from '@/components/dashboard/scam-detection-chart'
import { ScamTypesChart } from '@/components/dashboard/scam-types-chart'
import { RecentSessions } from '@/components/dashboard/recent-sessions'
import { ThreatLevelCard } from '@/components/dashboard/threat-level-card'
import { SystemHealth } from '@/components/dashboard/system-health'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { IntelligenceSummary } from '@/components/dashboard/intelligence-summary'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { StatsCardsSkeleton } from '@/components/dashboard/skeletons'

export const metadata: Metadata = {
  title: 'Dashboard | ScamShield',
  description: 'Real-time scam engagement monitoring dashboard',
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <DashboardHeader />
      
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards />
      </Suspense>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ScamDetectionChart />
        </div>
        <div>
          <ScamTypesChart />
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentSessions />
        </div>
        <div>
          <ThreatLevelCard />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <SystemHealth />
        <QuickActions />
        <IntelligenceSummary />
      </div>
      
      <ActivityFeed />
    </div>
  )
}
```

### 2. frontend/components/dashboard/stats-cards.tsx

```typescript
// Statistics cards grid with animated counters
// Features:
// - 4 main KPI cards in responsive grid
// - Animated number counting on load
// - Trend indicators (up/down arrows with percentage)
// - Sparkline mini charts
// - Click to drill down
// - Real-time updates with TanStack Query
// - Loading skeleton states
// - Hover effects with subtle shadows

'use client'

import { motion } from 'framer-motion'
import { 
  Activity, 
  Radio, 
  Brain, 
  Target,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Sparkline } from '@/components/charts/sparkline'
import { useDashboardStats } from '@/lib/hooks/use-dashboard-data'
import { formatNumber, formatPercentage } from '@/lib/utils/format'
import { cn } from '@/lib/utils/cn'

interface StatCardProps {
  title: string
  value: number
  previousValue?: number
  format?: 'number' | 'percentage'
  icon: React.ReactNode
  iconColor: string
  iconBgColor: string
  sparklineData?: number[]
  href?: string
  loading?: boolean
  live?: boolean
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export function StatsCards() {
  const { data, isLoading, error } = useDashboardStats()
  
  if (isLoading) return <StatsCardsSkeleton />
  if (error) return <StatsCardsError />
  
  const stats = [
    {
      title: 'Total Sessions',
      value: data.total_sessions,
      previousValue: data.previous_total_sessions,
      icon: <Activity className="h-5 w-5" />,
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100 dark:bg-blue-900/30',
      sparklineData: data.sessions_trend,
      href: '/sessions',
    },
    {
      title: 'Active Sessions',
      value: data.active_sessions,
      icon: <Radio className="h-5 w-5" />,
      iconColor: 'text-green-600',
      iconBgColor: 'bg-green-100 dark:bg-green-900/30',
      live: true,
      href: '/sessions?status=active',
    },
    {
      title: 'Intelligence Extracted',
      value: data.total_intelligence,
      previousValue: data.previous_intelligence,
      icon: <Brain className="h-5 w-5" />,
      iconColor: 'text-purple-600',
      iconBgColor: 'bg-purple-100 dark:bg-purple-900/30',
      sparklineData: data.intelligence_trend,
      href: '/intelligence',
    },
    {
      title: 'Detection Rate',
      value: data.scam_detection_rate,
      previousValue: data.previous_detection_rate,
      format: 'percentage',
      icon: <Target className="h-5 w-5" />,
      iconColor: 'text-orange-600',
      iconBgColor: 'bg-orange-100 dark:bg-orange-900/30',
      href: '/analytics',
    },
  ]
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat, index) => (
        <motion.div key={stat.title} variants={itemVariants}>
          <StatCard {...stat} />
        </motion.div>
      ))}
    </motion.div>
  )
}

function StatCard({
  title,
  value,
  previousValue,
  format = 'number',
  icon,
  iconColor,
  iconBgColor,
  sparklineData,
  href,
  live,
}: StatCardProps) {
  const trend = previousValue ? ((value - previousValue) / previousValue) * 100 : 0
  const trendDirection = trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral'
  
  const formattedValue = format === 'percentage' 
    ? formatPercentage(value) 
    : formatNumber(value)
  
  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
              {live && (
                <span className="ml-2 inline-flex items-center">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                </span>
              )}
            </p>
            <div className="flex items-baseline gap-2">
              <AnimatedCounter value={value} format={format} />
              {previousValue && (
                <TrendBadge direction={trendDirection} value={Math.abs(trend)} />
              )}
            </div>
          </div>
          <div className={cn('rounded-lg p-2.5', iconBgColor)}>
            <span className={iconColor}>{icon}</span>
          </div>
        </div>
        
        {sparklineData && sparklineData.length > 0 && (
          <div className="mt-4 h-10">
            <Sparkline 
              data={sparklineData} 
              color={trendDirection === 'up' ? '#22c55e' : trendDirection === 'down' ? '#ef4444' : '#6b7280'}
            />
          </div>
        )}
      </CardContent>
      
      {/* Hover gradient effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </Card>
  )
}

function AnimatedCounter({ value, format }: { value: number; format: 'number' | 'percentage' }) {
  // Use framer-motion or custom hook for animated counting
  const displayValue = format === 'percentage' ? `${value.toFixed(1)}%` : formatNumber(value)
  
  return (
    <motion.span
      className="text-2xl font-bold tracking-tight"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      {displayValue}
    </motion.span>
  )
}

function TrendBadge({ direction, value }: { direction: 'up' | 'down' | 'neutral'; value: number }) {
  const colors = {
    up: 'text-green-600 bg-green-100 dark:bg-green-900/30',
    down: 'text-red-600 bg-red-100 dark:bg-red-900/30',
    neutral: 'text-gray-600 bg-gray-100 dark:bg-gray-800',
  }
  
  const icons = {
    up: <TrendingUp className="h-3 w-3" />,
    down: <TrendingDown className="h-3 w-3" />,
    neutral: <Minus className="h-3 w-3" />,
  }
  
  return (
    <span className={cn('inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium', colors[direction])}>
      {icons[direction]}
      {value.toFixed(1)}%
    </span>
  )
}

export function StatsCardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
            <Skeleton className="mt-4 h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

### 3. frontend/components/dashboard/scam-detection-chart.tsx

```typescript
// Real-time scam detection timeline chart
// Features:
// - Area/Line chart showing sessions and intelligence over time
// - Multiple data series with different colors
// - Interactive tooltip on hover
// - Zoom and pan capabilities
// - Time range selector (24h, 7d, 30d, 90d)
// - Animated transitions on data change
// - Responsive design
// - Loading and error states
// - Export chart as image

'use client'

import { useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  Download, 
  Maximize2, 
  RefreshCw,
  TrendingUp
} from 'lucide-react'
import { useTimelineData } from '@/lib/hooks/use-dashboard-data'
import { ChartTooltip } from '@/components/charts/chart-tooltip'
import { cn } from '@/lib/utils/cn'

const timeRanges = [
  { label: '24H', value: '24h' },
  { label: '7D', value: '7d' },
  { label: '30D', value: '30d' },
  { label: '90D', value: '90d' },
]

export function ScamDetectionChart() {
  const [timeRange, setTimeRange] = useState('7d')
  const { data, isLoading, error, refetch } = useTimelineData(timeRange)
  
  if (isLoading) return <ChartSkeleton />
  if (error) return <ChartError onRetry={refetch} />
  
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">Scam Detection Timeline</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          {/* Time Range Selector */}
          <div className="flex rounded-lg border bg-muted p-1">
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                variant={timeRange === range.value ? 'secondary' : 'ghost'}
                size="sm"
                className="h-7 px-3 text-xs"
                onClick={() => setTimeRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
          
          {/* Action buttons */}
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorIntelligence" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <Tooltip content={<ChartTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="sessions"
                name="Sessions"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSessions)"
                animationDuration={500}
              />
              <Area
                type="monotone"
                dataKey="intelligence"
                name="Intelligence"
                stroke="#8b5cf6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorIntelligence)"
                animationDuration={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Summary stats below chart */}
        <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{data?.totalSessions || 0}</p>
            <p className="text-xs text-muted-foreground">Total Sessions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{data?.totalIntelligence || 0}</p>
            <p className="text-xs text-muted-foreground">Intel Extracted</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{data?.avgPerDay || 0}</p>
            <p className="text-xs text-muted-foreground">Avg/Day</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ChartSkeleton() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  )
}

function ChartError({ onRetry }: { onRetry: () => void }) {
  return (
    <Card className="col-span-2">
      <CardContent className="flex h-[350px] flex-col items-center justify-center">
        <p className="text-muted-foreground">Failed to load chart data</p>
        <Button variant="outline" size="sm" className="mt-2" onClick={onRetry}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </CardContent>
    </Card>
  )
}
```

### 4. frontend/components/dashboard/scam-types-chart.tsx

```typescript
// Scam type distribution donut chart
// Features:
// - Interactive donut/pie chart
// - Custom legend with percentages
// - Hover effects on segments
// - Click to filter by scam type
// - Color coding by scam type
// - Responsive design
// - Animated segments

'use client'

import { useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PieChartIcon } from 'lucide-react'
import { useScamTypesData } from '@/lib/hooks/use-dashboard-data'
import { SCAM_TYPES } from '@/lib/constants'

const COLORS = {
  KYC_FRAUD: '#ef4444',
  LOTTERY_SCAM: '#f97316',
  TECH_SUPPORT: '#eab308',
  INVESTMENT_FRAUD: '#8b5cf6',
  JOB_SCAM: '#3b82f6',
  LOAN_SCAM: '#22c55e',
  OTP_FRAUD: '#ec4899',
  UNKNOWN: '#6b7280',
}

export function ScamTypesChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const { data, isLoading } = useScamTypesData()
  
  const renderActiveShape = (props: any) => {
    // Custom active segment rendering with expanded size
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 10}
          outerRadius={outerRadius + 12}
          fill={fill}
        />
        <text x={cx} y={cy - 10} textAnchor="middle" className="fill-foreground text-lg font-bold">
          {payload.scam_type.replace('_', ' ')}
        </text>
        <text x={cx} y={cy + 15} textAnchor="middle" className="fill-muted-foreground text-sm">
          {(percent * 100).toFixed(1)}%
        </text>
      </g>
    )
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <PieChartIcon className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">Scam Distribution</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data?.distribution || []}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="count"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data?.distribution.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.scam_type as keyof typeof COLORS] || COLORS.UNKNOWN}
                    className="cursor-pointer transition-opacity hover:opacity-80"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Custom Legend */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data?.distribution.slice(0, 6).map((item) => (
            <div 
              key={item.scam_type}
              className="flex items-center gap-2 text-sm"
            >
              <span 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: COLORS[item.scam_type as keyof typeof COLORS] }}
              />
              <span className="truncate text-muted-foreground">
                {SCAM_TYPES[item.scam_type as keyof typeof SCAM_TYPES]?.label || item.scam_type}
              </span>
              <Badge variant="secondary" className="ml-auto text-xs">
                {item.percentage}%
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
```

### 5. frontend/components/dashboard/recent-sessions.tsx

```typescript
// Recent sessions list with real-time updates
// Features:
// - List of latest 5-10 sessions
// - Status indicator (active/completed/failed)
// - Scam type badge
// - Persona used
// - Turn count and entities extracted
// - Relative timestamp
// - Click to view session details
// - Animated new session additions
// - View all link
// - Filter by status

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  MessageSquare, 
  ArrowRight, 
  Clock,
  Bot,
  Brain,
  ChevronRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useRecentSessions } from '@/lib/hooks/use-dashboard-data'
import { SCAM_TYPES, PERSONAS } from '@/lib/constants'
import { formatRelativeTime } from '@/lib/utils/date'
import { cn } from '@/lib/utils/cn'

const statusColors = {
  active: 'bg-green-500',
  completed: 'bg-blue-500',
  failed: 'bg-red-500',
}

const statusBadgeVariants = {
  active: 'success',
  completed: 'secondary',
  failed: 'destructive',
} as const

export function RecentSessions() {
  const { data: sessions, isLoading } = useRecentSessions(10)
  
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">Recent Sessions</CardTitle>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/sessions" className="text-sm text-muted-foreground hover:text-foreground">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px] pr-4">
          <AnimatePresence initial={false}>
            {sessions?.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <SessionRow session={session} />
              </motion.div>
            ))}
          </AnimatePresence>
          
          {(!sessions || sessions.length === 0) && (
            <div className="flex h-[200px] flex-col items-center justify-center text-center">
              <MessageSquare className="h-10 w-10 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">No sessions yet</p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/chat">Start New Session</Link>
              </Button>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

interface SessionRowProps {
  session: {
    id: string
    status: 'active' | 'completed' | 'failed'
    scam_type: string
    persona_used: string
    turn_count: number
    created_at: string
    extracted_count: number
  }
}

function SessionRow({ session }: SessionRowProps) {
  const persona = PERSONAS[session.persona_used as keyof typeof PERSONAS]
  const scamType = SCAM_TYPES[session.scam_type as keyof typeof SCAM_TYPES]
  
  return (
    <Link href={`/sessions/${session.id}`}>
      <div className="group flex items-center gap-4 rounded-lg border p-3 transition-all hover:bg-muted/50 hover:shadow-sm mb-2">
        {/* Status indicator */}
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary">
              {persona?.icon || '👤'}
            </AvatarFallback>
          </Avatar>
          <span 
            className={cn(
              'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background',
              statusColors[session.status]
            )}
          />
          {session.status === 'active' && (
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 animate-ping rounded-full bg-green-500" />
          )}
        </div>
        
        {/* Session info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Badge 
              variant={scamType?.color as any || 'secondary'} 
              className="text-xs"
            >
              {scamType?.label || session.scam_type}
            </Badge>
            <Badge 
              variant={statusBadgeVariants[session.status]}
              className="text-xs"
            >
              {session.status}
            </Badge>
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Bot className="h-3 w-3" />
              {persona?.label || session.persona_used}
            </span>
            <span>Turn {session.turn_count}</span>
            <span className="flex items-center gap-1">
              <Brain className="h-3 w-3" />
              {session.extracted_count} entities
            </span>
          </div>
        </div>
        
        {/* Timestamp and arrow */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{formatRelativeTime(session.created_at)}</span>
          <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </div>
    </Link>
  )
}
```

### 6. frontend/components/dashboard/threat-level-card.tsx

```typescript
// Threat level gauge and summary
// Features:
// - Visual gauge/meter showing current threat level (1-10)
// - Color coding (green/yellow/orange/red)
// - Animated gauge needle
// - Threat level label (Low/Medium/Elevated/High/Critical)
// - Active threats count
// - High risk sessions count
// - Historical comparison
// - Click for detailed threat analysis

'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Shield, Activity, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useThreatLevel } from '@/lib/hooks/use-dashboard-data'
import { cn } from '@/lib/utils/cn'

const threatLevels = {
  1: { label: 'Minimal', color: 'bg-green-500', textColor: 'text-green-600', bgColor: 'bg-green-100' },
  2: { label: 'Low', color: 'bg-green-500', textColor: 'text-green-600', bgColor: 'bg-green-100' },
  3: { label: 'Guarded', color: 'bg-blue-500', textColor: 'text-blue-600', bgColor: 'bg-blue-100' },
  4: { label: 'Guarded', color: 'bg-blue-500', textColor: 'text-blue-600', bgColor: 'bg-blue-100' },
  5: { label: 'Elevated', color: 'bg-yellow-500', textColor: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  6: { label: 'Elevated', color: 'bg-yellow-500', textColor: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  7: { label: 'High', color: 'bg-orange-500', textColor: 'text-orange-600', bgColor: 'bg-orange-100' },
  8: { label: 'High', color: 'bg-orange-500', textColor: 'text-orange-600', bgColor: 'bg-orange-100' },
  9: { label: 'Severe', color: 'bg-red-500', textColor: 'text-red-600', bgColor: 'bg-red-100' },
  10: { label: 'Critical', color: 'bg-red-600', textColor: 'text-red-700', bgColor: 'bg-red-100' },
}

export function ThreatLevelCard() {
  const { data, isLoading } = useThreatLevel()
  
  const level = data?.level || 5
  const threatInfo = threatLevels[level as keyof typeof threatLevels]
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">Threat Level</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {/* Threat Gauge */}
        <div className="relative flex flex-col items-center py-4">
          {/* Circular gauge background */}
          <div className="relative h-32 w-32">
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted"
              />
              {/* Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                className={threatInfo.textColor}
                strokeDasharray={`${(level / 10) * 251.2} 251.2`}
                initial={{ strokeDasharray: '0 251.2' }}
                animate={{ strokeDasharray: `${(level / 10) * 251.2} 251.2` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span 
                className="text-3xl font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                {level}
              </motion.span>
              <span className="text-xs text-muted-foreground">/ 10</span>
            </div>
          </div>
          
          {/* Threat label */}
          <Badge 
            variant="outline"
            className={cn('mt-4 text-sm font-semibold', threatInfo.textColor, threatInfo.bgColor)}
          >
            {threatInfo.label}
          </Badge>
        </div>
        
        {/* Stats */}
        <div className="mt-4 space-y-3 border-t pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Active Threats
            </span>
            <span className="font-semibold">{data?.activeThreats || 0}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Activity className="h-4 w-4 text-red-500" />
              High Risk Sessions
            </span>
            <span className="font-semibold">{data?.highRiskSessions || 0}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              24h Change
            </span>
            <span className={cn(
              'font-semibold',
              data?.change24h > 0 ? 'text-red-600' : 'text-green-600'
            )}>
              {data?.change24h > 0 ? '+' : ''}{data?.change24h || 0}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

### 7. frontend/components/dashboard/system-health.tsx

```typescript
// System health status panel
// Features:
// - API, Database, LLM status indicators
// - Latency metrics
// - Uptime percentage
// - Last check timestamp
// - Auto-refresh every 30s
// - Click to expand details
// - Historical uptime chart

'use client'

import { motion } from 'framer-motion'
import { 
  Server, 
  Database, 
  Brain, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  Clock,
  Activity,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useSystemHealth } from '@/lib/hooks/use-dashboard-data'
import { cn } from '@/lib/utils/cn'

const statusConfig = {
  healthy: {
    icon: CheckCircle2,
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    label: 'Healthy',
  },
  degraded: {
    icon: AlertCircle,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    label: 'Degraded',
  },
  unhealthy: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    label: 'Unhealthy',
  },
}

export function SystemHealth() {
  const { data, isLoading, refetch, dataUpdatedAt } = useSystemHealth()
  
  const components = [
    {
      name: 'API Server',
      icon: Server,
      status: data?.components?.api?.status || 'healthy',
      metric: `${data?.components?.api?.requests_per_minute || 0} req/min`,
    },
    {
      name: 'Database',
      icon: Database,
      status: data?.components?.database?.status || 'healthy',
      metric: `${data?.components?.database?.latency_ms || 0}ms`,
    },
    {
      name: 'LLM Service',
      icon: Brain,
      status: data?.components?.llm?.status || 'healthy',
      metric: `${data?.components?.llm?.latency_ms || 0}ms`,
    },
  ]
  
  const uptimePercentage = data?.uptime_percentage || 99.9
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">System Health</CardTitle>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => refetch()}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Refresh status</TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall status */}
        <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
          <span className="text-sm font-medium">Overall Status</span>
          <Badge 
            variant="outline"
            className={cn(
              statusConfig[data?.status as keyof typeof statusConfig]?.color,
              statusConfig[data?.status as keyof typeof statusConfig]?.bgColor
            )}
          >
            {statusConfig[data?.status as keyof typeof statusConfig]?.label || 'Unknown'}
          </Badge>
        </div>
        
        {/* Component status */}
        <div className="space-y-2">
          {components.map((component) => {
            const config = statusConfig[component.status as keyof typeof statusConfig]
            const StatusIcon = config?.icon || CheckCircle2
            
            return (
              <motion.div
                key={component.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-2">
                  <component.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{component.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{component.metric}</span>
                  <StatusIcon className={cn('h-4 w-4', config?.color)} />
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Uptime */}
        <div className="space-y-2 border-t pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Uptime</span>
            <span className="font-semibold">{uptimePercentage}%</span>
          </div>
          <Progress value={uptimePercentage} className="h-2" />
        </div>
        
        {/* Last updated */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Last checked: {new Date(dataUpdatedAt).toLocaleTimeString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}
```

### 8. frontend/components/dashboard/quick-actions.tsx

```typescript
// Quick action buttons panel
// Features:
// - Start new session button
// - View analytics button
// - Open chat simulator button
// - Export data button
// - Keyboard shortcuts hints
// - Hover animations

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Plus, 
  BarChart3, 
  MessageSquare, 
  Download,
  Zap,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

const actions = [
  {
    label: 'New Session',
    description: 'Start scam engagement',
    href: '/chat',
    icon: Plus,
    color: 'bg-green-500 hover:bg-green-600',
    shortcut: 'N',
  },
  {
    label: 'Analytics',
    description: 'View detailed reports',
    href: '/analytics',
    icon: BarChart3,
    color: 'bg-blue-500 hover:bg-blue-600',
    shortcut: 'A',
  },
  {
    label: 'Test Chat',
    description: 'Simulate scam scenario',
    href: '/chat?mode=test',
    icon: MessageSquare,
    color: 'bg-purple-500 hover:bg-purple-600',
    shortcut: 'T',
  },
  {
    label: 'Export',
    description: 'Download intelligence',
    href: '/intelligence?export=true',
    icon: Download,
    color: 'bg-orange-500 hover:bg-orange-600',
    shortcut: 'E',
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={action.href}>
              <Button
                variant="outline"
                className="group h-auto w-full justify-start gap-3 p-3 transition-all hover:shadow-md"
              >
                <div className={cn('rounded-lg p-2 text-white transition-colors', action.color)}>
                  <action.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{action.label}</span>
                    <kbd className="hidden rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:inline-block">
                      {action.shortcut}
                    </kbd>
                  </div>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </Button>
            </Link>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
```

### 9. frontend/components/dashboard/intelligence-summary.tsx

```typescript
// Extracted intelligence summary
// Features:
// - Entity type counts (phones, UPI, banks, links)
// - Icon and color for each type
// - Total count
// - Click to view filtered intelligence
// - Mini progress bars showing distribution

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Phone, 
  CreditCard, 
  Building2, 
  Link as LinkIcon,
  Mail,
  Hash,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { useIntelligenceSummary } from '@/lib/hooks/use-dashboard-data'
import { cn } from '@/lib/utils/cn'

const entityConfig = {
  PHONE_NUMBER: { icon: Phone, color: 'text-blue-500', bgColor: 'bg-blue-100', label: 'Phone Numbers' },
  UPI_ID: { icon: CreditCard, color: 'text-green-500', bgColor: 'bg-green-100', label: 'UPI IDs' },
  BANK_ACCOUNT: { icon: Building2, color: 'text-purple-500', bgColor: 'bg-purple-100', label: 'Bank Accounts' },
  URL: { icon: LinkIcon, color: 'text-red-500', bgColor: 'bg-red-100', label: 'Phishing Links' },
  EMAIL: { icon: Mail, color: 'text-pink-500', bgColor: 'bg-pink-100', label: 'Emails' },
  IFSC_CODE: { icon: Hash, color: 'text-orange-500', bgColor: 'bg-orange-100', label: 'IFSC Codes' },
}

export function IntelligenceSummary() {
  const { data, isLoading } = useIntelligenceSummary()
  
  const total = data?.total || 0
  const entities = data?.by_type || []
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">Intelligence</CardTitle>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/intelligence" className="text-xs text-muted-foreground">
            View All
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Total */}
        <div className="flex items-center justify-between rounded-lg bg-primary/10 p-3">
          <span className="text-sm font-medium">Total Extracted</span>
          <span className="text-2xl font-bold text-primary">{total}</span>
        </div>
        
        {/* Entity breakdown */}
        <div className="space-y-3">
          {entities.slice(0, 4).map((entity, index) => {
            const config = entityConfig[entity.type as keyof typeof entityConfig]
            const Icon = config?.icon || Hash
            const percentage = total > 0 ? (entity.count / total) * 100 : 0
            
            return (
              <motion.div
                key={entity.type}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/intelligence?type=${entity.type}`}>
                  <div className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50">
                    <div className={cn('rounded-lg p-2', config?.bgColor || 'bg-gray-100')}>
                      <Icon className={cn('h-4 w-4', config?.color || 'text-gray-500')} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate">
                          {config?.label || entity.type}
                        </span>
                        <span className="text-sm font-semibold">{entity.count}</span>
                      </div>
                      <Progress value={percentage} className="mt-1 h-1.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
```

### 10. frontend/components/dashboard/activity-feed.tsx

```typescript
// Real-time activity feed
// Features:
// - Live updates using polling or WebSocket
// - Different activity types with icons
// - Relative timestamps
// - Animated new items
// - Expandable details
// - Filter by activity type
// - Auto-scroll to latest

'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Activity, 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  Brain,
  XCircle,
  Filter,
  Pause
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useActivityFeed } from '@/lib/hooks/use-dashboard-data'
import { formatRelativeTime } from '@/lib/utils/date'
import { cn } from '@/lib/utils/cn'

const activityConfig = {
  session_started: {
    icon: Play,
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    label: 'Session Started',
  },
  session_completed: {
    icon: CheckCircle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    label: 'Session Completed',
  },
  intelligence_extracted: {
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    label: 'Intelligence Extracted',
  },
  threat_elevated: {
    icon: AlertTriangle,
    color: 'text-orange-500',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    label: 'Threat Elevated',
  },
  session_failed: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    label: 'Session Failed',
  },
}

export function ActivityFeed() {
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { data: activities, isLoading } = useActivityFeed({ enabled: !isPaused })
  
  // Auto-scroll to top when new activities arrive
  useEffect(() => {
    if (!isPaused && scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [activities, isPaused])
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">Live Activity</CardTitle>
          {!isPaused && (
            <Badge variant="outline" className="animate-pulse text-green-600">
              <span className="mr-1 h-2 w-2 rounded-full bg-green-500" />
              Live
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? (
              <>
                <Play className="mr-1 h-4 w-4" />
                Resume
              </>
            ) : (
              <>
                <Pause className="mr-1 h-4 w-4" />
                Pause
              </>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]" ref={scrollRef}>
          <AnimatePresence initial={false}>
            {activities?.map((activity, index) => {
              const config = activityConfig[activity.type as keyof typeof activityConfig]
              const Icon = config?.icon || Activity
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, height: 0, x: -20 }}
                  animate={{ opacity: 1, height: 'auto', x: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-3 border-b py-3 last:border-0"
                >
                  <div className={cn('rounded-full p-1.5', config?.bgColor || 'bg-gray-100')}>
                    <Icon className={cn('h-3.5 w-3.5', config?.color || 'text-gray-500')} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{config?.label || activity.type}</span>
                      {activity.details && (
                        <span className="text-muted-foreground"> — {activity.details}</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatRelativeTime(activity.timestamp)}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
          
          {(!activities || activities.length === 0) && (
            <div className="flex h-[150px] items-center justify-center text-sm text-muted-foreground">
              No recent activity
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
```

### 11. frontend/lib/hooks/use-dashboard-data.ts

```typescript
// Dashboard data fetching hooks using TanStack Query
// Features:
// - Auto-refresh at configurable intervals
// - Optimistic updates
// - Error retry logic
// - Stale-while-revalidate
// - Prefetching
// - Cache management

'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { dashboardApi } from '@/lib/api/dashboard'

// Query keys
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  timeline: (range: string) => [...dashboardKeys.all, 'timeline', range] as const,
  scamTypes: () => [...dashboardKeys.all, 'scam-types'] as const,
  recentSessions: (limit: number) => [...dashboardKeys.all, 'recent-sessions', limit] as const,
  threatLevel: () => [...dashboardKeys.all, 'threat-level'] as const,
  systemHealth: () => [...dashboardKeys.all, 'system-health'] as const,
  intelligenceSummary: () => [...dashboardKeys.all, 'intelligence-summary'] as const,
  activityFeed: () => [...dashboardKeys.all, 'activity-feed'] as const,
}

// Hook for dashboard statistics
export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: dashboardApi.getStats,
    refetchInterval: 10000, // Refresh every 10 seconds
    staleTime: 5000,
  })
}

// Hook for timeline data
export function useTimelineData(range: string) {
  return useQuery({
    queryKey: dashboardKeys.timeline(range),
    queryFn: () => dashboardApi.getTimeline(range),
    staleTime: 30000,
  })
}

// Hook for scam types distribution
export function useScamTypesData() {
  return useQuery({
    queryKey: dashboardKeys.scamTypes(),
    queryFn: dashboardApi.getScamTypes,
    staleTime: 60000,
  })
}

// Hook for recent sessions
export function useRecentSessions(limit: number = 10) {
  return useQuery({
    queryKey: dashboardKeys.recentSessions(limit),
    queryFn: () => dashboardApi.getRecentSessions(limit),
    refetchInterval: 5000,
    staleTime: 3000,
  })
}

// Hook for threat level
export function useThreatLevel() {
  return useQuery({
    queryKey: dashboardKeys.threatLevel(),
    queryFn: dashboardApi.getThreatLevel,
    refetchInterval: 15000,
    staleTime: 10000,
  })
}

// Hook for system health
export function useSystemHealth() {
  return useQuery({
    queryKey: dashboardKeys.systemHealth(),
    queryFn: dashboardApi.getSystemHealth,
    refetchInterval: 30000,
    staleTime: 15000,
  })
}

// Hook for intelligence summary
export function useIntelligenceSummary() {
  return useQuery({
    queryKey: dashboardKeys.intelligenceSummary(),
    queryFn: dashboardApi.getIntelligenceSummary,
    refetchInterval: 30000,
    staleTime: 20000,
  })
}

// Hook for activity feed
export function useActivityFeed(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: dashboardKeys.activityFeed(),
    queryFn: dashboardApi.getActivityFeed,
    refetchInterval: 5000,
    staleTime: 2000,
    enabled: options?.enabled ?? true,
  })
}

// Hook to prefetch dashboard data
export function usePrefetchDashboard() {
  const queryClient = useQueryClient()
  
  return () => {
    queryClient.prefetchQuery({
      queryKey: dashboardKeys.stats(),
      queryFn: dashboardApi.getStats,
    })
    queryClient.prefetchQuery({
      queryKey: dashboardKeys.recentSessions(10),
      queryFn: () => dashboardApi.getRecentSessions(10),
    })
  }
}
```

### 12. frontend/lib/api/dashboard.ts

```typescript
// Dashboard API functions
// All API calls for dashboard data

import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import type { 
  DashboardStats, 
  TimelineData, 
  ScamTypesData,
  Session,
  ThreatLevel,
  SystemHealth,
  IntelligenceSummary,
  ActivityItem
} from '@/types/dashboard'

export const dashboardApi = {
  // Get dashboard statistics
  async getStats(): Promise<DashboardStats> {
    const { data } = await apiClient.get(API_ENDPOINTS.ANALYTICS_SUMMARY)
    return data
  },
  
  // Get timeline data
  async getTimeline(range: string): Promise<TimelineData> {
    const { data } = await apiClient.get(API_ENDPOINTS.ANALYTICS_TIMELINE, {
      params: { range }
    })
    return data
  },
  
  // Get scam types distribution
  async getScamTypes(): Promise<ScamTypesData> {
    const { data } = await apiClient.get(API_ENDPOINTS.ANALYTICS_SCAM_TYPES)
    return data
  },
  
  // Get recent sessions
  async getRecentSessions(limit: number): Promise<Session[]> {
    const { data } = await apiClient.get(API_ENDPOINTS.SESSIONS, {
      params: { limit, sort: '-created_at' }
    })
    return data.sessions
  },
  
  // Get threat level
  async getThreatLevel(): Promise<ThreatLevel> {
    // This would come from a computed endpoint or aggregation
    const { data } = await apiClient.get(API_ENDPOINTS.ANALYTICS_SUMMARY)
    return {
      level: Math.min(10, Math.max(1, Math.floor(data.active_sessions / 5) + 3)),
      activeThreats: data.active_sessions,
      highRiskSessions: Math.floor(data.active_sessions * 0.3),
      change24h: Math.floor(Math.random() * 5) - 2,
    }
  },
  
  // Get system health
  async getSystemHealth(): Promise<SystemHealth> {
    const { data } = await apiClient.get(API_ENDPOINTS.HEALTH_DETAILED)
    return {
      ...data,
      uptime_percentage: 99.9, // Computed from uptime_seconds
    }
  },
  
  // Get intelligence summary
  async getIntelligenceSummary(): Promise<IntelligenceSummary> {
    const { data } = await apiClient.get(API_ENDPOINTS.INTELLIGENCE)
    // Aggregate by type
    const byType = Object.entries(
      data.entities.reduce((acc: Record<string, number>, entity: any) => {
        acc[entity.type] = (acc[entity.type] || 0) + 1
        return acc
      }, {})
    ).map(([type, count]) => ({ type, count: count as number }))
    
    return {
      total: data.total || data.entities.length,
      by_type: byType,
    }
  },
  
  // Get activity feed
  async getActivityFeed(): Promise<ActivityItem[]> {
    // This would come from a dedicated activity/events endpoint
    // For now, generate from recent sessions
    const { data } = await apiClient.get(API_ENDPOINTS.SESSIONS, {
      params: { limit: 20 }
    })
    
    return data.sessions.map((session: Session, index: number) => ({
      id: `${session.id}-${index}`,
      type: session.status === 'active' ? 'session_started' : 
            session.status === 'completed' ? 'session_completed' : 'session_failed',
      details: `${session.scam_type} - ${session.persona_used}`,
      timestamp: session.created_at,
    }))
  },
}
```

### 13. frontend/types/dashboard.ts

```typescript
// Dashboard TypeScript types

export interface DashboardStats {
  total_sessions: number
  previous_total_sessions?: number
  active_sessions: number
  completed_sessions: number
  total_intelligence: number
  previous_intelligence?: number
  scam_detection_rate: number
  previous_detection_rate?: number
  avg_session_duration: number
  total_entities_extracted: number
  sessions_trend?: number[]
  intelligence_trend?: number[]
}

export interface TimelineData {
  data: Array<{
    date: string
    sessions: number
    intelligence: number
  }>
  totalSessions: number
  totalIntelligence: number
  avgPerDay: number
}

export interface ScamTypesData {
  distribution: Array<{
    scam_type: string
    count: number
    percentage: number
  }>
}

export interface ThreatLevel {
  level: number
  activeThreats: number
  highRiskSessions: number
  change24h: number
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy'
  components: {
    database: { status: string; latency_ms: number }
    llm: { status: string; latency_ms: number }
    api: { status: string; requests_per_minute: number }
  }
  uptime_seconds: number
  uptime_percentage: number
  version: string
}

export interface IntelligenceSummary {
  total: number
  by_type: Array<{
    type: string
    count: number
  }>
}

export interface ActivityItem {
  id: string
  type: 'session_started' | 'session_completed' | 'intelligence_extracted' | 'threat_elevated' | 'session_failed'
  details?: string
  timestamp: string
}
```

## ADDITIONAL FILES TO CREATE

### Chart Components (frontend/components/charts/)

14. **sparkline.tsx** - Mini inline chart for stat cards
15. **line-chart.tsx** - Reusable line chart wrapper
16. **area-chart.tsx** - Reusable area chart wrapper
17. **bar-chart.tsx** - Reusable bar chart wrapper
18. **pie-chart.tsx** - Reusable pie/donut chart wrapper
19. **chart-container.tsx** - Chart wrapper with loading/error states
20. **chart-tooltip.tsx** - Custom styled tooltip for charts
21. **chart-legend.tsx** - Custom styled legend for charts

### Dashboard Components (frontend/components/dashboard/)

22. **dashboard-header.tsx** - Page header with title, date range, refresh
23. **welcome-banner.tsx** - Greeting banner with user name and tips
24. **time-range-selector.tsx** - Global time range filter
25. **refresh-button.tsx** - Manual refresh with countdown timer
26. **alerts-panel.tsx** - Active alerts and warnings
27. **kpi-ticker.tsx** - Scrolling KPI marquee
28. **persona-performance.tsx** - Persona effectiveness comparison
29. **geo-distribution.tsx** - Geographic distribution map (mock)
30. **skeletons.tsx** - All skeleton loading states

### Page Files

31. **frontend/app/(dashboard)/dashboard/loading.tsx** - Page loading state
32. **frontend/app/(dashboard)/dashboard/error.tsx** - Page error boundary

## QUALITY REQUIREMENTS

1. **Performance:**
   - Use React Server Components where possible
   - Implement code splitting for charts
   - Optimize re-renders with proper memoization
   - Use skeleton loading for perceived performance

2. **Accessibility:**
   - Proper ARIA labels for charts
   - Keyboard navigation support
   - Screen reader announcements for live data
   - Color contrast compliance

3. **Responsiveness:**
   - Mobile: Single column, stacked cards
   - Tablet: 2 columns, condensed charts
   - Desktop: Full 3-column grid layout

4. **Real-time Updates:**
   - Configurable polling intervals
   - Visual indicators for live data
   - Pause/resume functionality
   - Optimistic UI updates

5. **Error Handling:**
   - Graceful degradation
   - Retry mechanisms
   - User-friendly error messages
   - Fallback UI components

## IMPORTANT NOTES

1. All data fetching uses TanStack Query for caching and synchronization
2. Charts use Recharts with custom styling to match design system
3. Animations use Framer Motion for smooth transitions
4. All components support dark/light mode
5. Dashboard auto-refreshes but respects user's pause preference
6. Mobile layout prioritizes most important metrics
7. All numbers use proper formatting (thousands separator, percentages)
8. Timestamps show relative time (e.g., "2 minutes ago")

Create all 40+ files with complete, production-ready code. The dashboard should look like it belongs to a FAANG company's monitoring product - clean, professional, and feature-rich.

## ⏹️ END PROMPT 3 ═════════════════════════════════════════════════════════════

---

# ═══════════════════════════════════════════════════════════════════════════════
# ██████╗ ██████╗  ██████╗ ███╗   ███╗██████╗ ████████╗    ██╗  ██╗
# ██╔══██╗██╔══██╗██╔═══██╗████╗ ████║██╔══██╗╚══██╔══╝    ██║  ██║
# ██████╔╝██████╔╝██║   ██║██╔████╔██║██████╔╝   ██║       ███████║
# ██╔═══╝ ██╔══██╗██║   ██║██║╚██╔╝██║██╔═══╝    ██║       ╚════██║
# ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║██║        ██║            ██║
# ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝        ╚═╝            ╚═╝
# ═══════════════════════════════════════════════════════════════════════════════

# PROMPT 4: Sessions Management

## 📦 Expected Output
| Output | Description |
|--------|-------------|
| `frontend/app/(dashboard)/sessions/page.tsx` | Sessions list page with SSR |
| `frontend/app/(dashboard)/sessions/loading.tsx` | Sessions page loading skeleton |
| `frontend/app/(dashboard)/sessions/error.tsx` | Sessions page error boundary |
| `frontend/app/(dashboard)/sessions/[id]/page.tsx` | Session detail page |
| `frontend/app/(dashboard)/sessions/[id]/loading.tsx` | Session detail loading |
| `frontend/app/(dashboard)/sessions/[id]/error.tsx` | Session detail error |
| `frontend/components/sessions/sessions-list.tsx` | Main sessions list component |
| `frontend/components/sessions/session-card.tsx` | Individual session card |
| `frontend/components/sessions/session-row.tsx` | Session table row component |
| `frontend/components/sessions/sessions-table.tsx` | Data table for sessions |
| `frontend/components/sessions/sessions-grid.tsx` | Grid view for sessions |
| `frontend/components/sessions/sessions-toolbar.tsx` | Filters, search, view toggle |
| `frontend/components/sessions/sessions-filters.tsx` | Advanced filter panel |
| `frontend/components/sessions/sessions-search.tsx` | Search input with debounce |
| `frontend/components/sessions/sessions-pagination.tsx` | Pagination controls |
| `frontend/components/sessions/sessions-sort.tsx` | Sort dropdown component |
| `frontend/components/sessions/sessions-bulk-actions.tsx` | Bulk action toolbar |
| `frontend/components/sessions/sessions-export.tsx` | Export dialog/dropdown |
| `frontend/components/sessions/sessions-empty.tsx` | Empty state component |
| `frontend/components/sessions/session-status-badge.tsx` | Status badge component |
| `frontend/components/sessions/session-detail-header.tsx` | Detail page header |
| `frontend/components/sessions/session-detail-sidebar.tsx` | Detail page sidebar |
| `frontend/components/sessions/session-metadata.tsx` | Session metadata panel |
| `frontend/components/sessions/session-timeline.tsx` | Session timeline view |
| `frontend/components/sessions/session-stats.tsx` | Session statistics cards |
| `frontend/components/sessions/conversation-view.tsx` | Main conversation display |
| `frontend/components/sessions/conversation-message.tsx` | Individual message bubble |
| `frontend/components/sessions/conversation-header.tsx` | Conversation header |
| `frontend/components/sessions/conversation-toolbar.tsx` | Conversation actions |
| `frontend/components/sessions/conversation-search.tsx` | Search within conversation |
| `frontend/components/sessions/message-scammer.tsx` | Scammer message component |
| `frontend/components/sessions/message-persona.tsx` | Persona response component |
| `frontend/components/sessions/message-system.tsx` | System message component |
| `frontend/components/sessions/message-timestamp.tsx` | Message timestamp display |
| `frontend/components/sessions/message-actions.tsx` | Message action buttons |
| `frontend/components/sessions/extracted-entities-panel.tsx` | Extracted intelligence panel |
| `frontend/components/sessions/entity-highlight.tsx` | Highlighted entity in text |
| `frontend/components/sessions/session-actions-menu.tsx` | Session actions dropdown |
| `frontend/components/sessions/delete-session-dialog.tsx` | Delete confirmation dialog |
| `frontend/components/sessions/export-session-dialog.tsx` | Export options dialog |
| `frontend/components/sessions/session-notes.tsx` | Session notes/annotations |
| `frontend/components/sessions/session-tags.tsx` | Session tagging component |
| `frontend/components/sessions/live-indicator.tsx` | Live session indicator |
| `frontend/components/sessions/auto-scroll-button.tsx` | Auto-scroll toggle |
| `frontend/lib/hooks/use-sessions.ts` | Sessions list hook |
| `frontend/lib/hooks/use-session-detail.ts` | Single session hook |
| `frontend/lib/hooks/use-session-messages.ts` | Messages with polling |
| `frontend/lib/hooks/use-session-filters.ts` | Filter state management |
| `frontend/lib/hooks/use-session-search.ts` | Search with debounce |
| `frontend/lib/hooks/use-infinite-sessions.ts` | Infinite scroll hook |
| `frontend/lib/api/sessions.ts` | Sessions API functions |
| `frontend/lib/utils/session-helpers.ts` | Session utility functions |
| `frontend/lib/utils/message-parser.ts` | Message parsing utilities |
| `frontend/lib/utils/entity-highlighter.ts` | Entity highlighting logic |
| `frontend/types/session.ts` | Session TypeScript types |
| `frontend/types/message.ts` | Message TypeScript types |
| `frontend/types/filters.ts` | Filter TypeScript types |
| **Total: 55+ files** | Complete sessions management module |

## ▶️ START PROMPT 4 ═══════════════════════════════════════════════════════════

Create a complete FAANG/MNC-level Sessions Management Module for ScamShield Agentic Honeypot using Next.js 14, React, TanStack Query, and TanStack Table. This is an enterprise-grade sessions management system for India AI Impact Buildathon 2026.

## PROJECT CONTEXT

This is PROMPT 4 of the ScamShield frontend development. Previous prompts set up:
- PROMPT 1: Next.js 14 project with complete configuration
- PROMPT 2: UI Component Library (shadcn/ui)
- PROMPT 3: Dashboard Home Page

Now we need to build a comprehensive sessions management module that allows users to:
- Browse all scam engagement sessions with powerful filtering
- View detailed conversation history with real-time updates
- Search, sort, and paginate through sessions
- Export session data in multiple formats
- Manage sessions (delete, archive, tag)

This should match the quality of session/conversation management in products like Intercom, Zendesk, or Datadog APM traces.

## BACKEND API ENDPOINTS (Already Built)

```typescript
// Sessions endpoints
GET /v1/sessions
Query Params:
  - limit: number (default: 20, max: 100)
  - offset: number (default: 0)
  - status: 'active' | 'completed' | 'failed' | 'all'
  - scam_type: string (comma-separated for multiple)
  - persona: string (comma-separated for multiple)
  - date_from: ISO string
  - date_to: ISO string
  - search: string (searches scam_type, persona, messages)
  - sort: 'created_at' | 'updated_at' | 'turn_count' | 'extracted_count'
  - order: 'asc' | 'desc'

Response: {
  sessions: Session[]
  total: number
  limit: number
  offset: number
  has_more: boolean
}

GET /v1/sessions/:id
Response: {
  id: string
  status: 'active' | 'completed' | 'failed'
  scam_type: string
  persona_used: string
  persona_config: object
  turn_count: number
  created_at: string
  updated_at: string
  completed_at?: string
  duration_seconds?: number
  metadata: {
    initial_message: string
    detection_confidence: number
    risk_score: number
  }
}

GET /v1/sessions/:id/messages
Query Params:
  - limit: number (default: 50)
  - offset: number
  - after_timestamp: ISO string (for polling new messages)

Response: {
  messages: Message[]
  total: number
  has_more: boolean
}

Message: {
  id: string
  session_id: string
  role: 'scammer' | 'persona' | 'system'
  content: string
  timestamp: string
  turn_number: number
  metadata?: {
    analysis?: {
      intent: string
      tactics: string[]
      confidence: number
    }
    extracted_entities?: ExtractedEntity[]
  }
}

GET /v1/sessions/:id/intelligence
Response: {
  entities: ExtractedEntity[]
  summary: {
    total: number
    by_type: Record<string, number>
    high_confidence: number
    verified: number
  }
}

DELETE /v1/sessions/:id
Response: { success: boolean, message: string }

POST /v1/sessions/:id/export
Body: { format: 'json' | 'csv' | 'pdf' }
Response: { download_url: string, expires_at: string }
```

## TECHNICAL REQUIREMENTS

### Stack
- **Framework:** Next.js 14 (App Router, Server Components where possible)
- **State Management:** TanStack Query for server state, URL state for filters
- **Data Table:** TanStack Table v8 with virtual scrolling
- **Animations:** Framer Motion for micro-interactions
- **Styling:** Tailwind CSS + shadcn/ui components
- **Real-time:** Polling with configurable intervals for active sessions

### Design Requirements
- **Dark/Light Mode:** Full support with smooth transitions
- **Responsive:** Mobile-first with adaptive layouts
- **Accessibility:** Full keyboard navigation, screen reader support
- **Performance:** Virtual scrolling for large lists, optimistic updates
- **Animations:** Smooth transitions, message animations

## SESSIONS LIST PAGE LAYOUT

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  📋 Sessions                                                    [+ New Test]│
│  Manage and monitor all scam engagement sessions                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 Search sessions...                    [Filters ▼] [📊] [📋] [⬇️] │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Status: [All ▼] [Active] [Completed] [Failed]                       │   │
│  │ Scam Type: [All Types ▼]  Persona: [All Personas ▼]  Date: [📅]    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─ BULK: [□ Select All] Selected: 3 ──── [🗑️ Delete] [⬇️ Export] ────┐   │
│  │                                                                      │   │
│  │ ┌────────────────────────────────────────────────────────────────┐  │   │
│  │ │ □ │ 🔴 ACTIVE │ KYC Fraud        │ elderly_victim  │ Turn 5   │  │   │
│  │ │   │           │ "Please share... │ 3 entities      │ 2m ago   │→ │   │
│  │ ├────────────────────────────────────────────────────────────────┤  │   │
│  │ │ □ │ 🟢 DONE   │ Lottery Scam     │ tech_novice     │ Turn 12  │  │   │
│  │ │   │           │ "Congratulations │ 7 entities      │ 15m ago  │→ │   │
│  │ ├────────────────────────────────────────────────────────────────┤  │   │
│  │ │ □ │ 🟢 DONE   │ Investment Fraud │ eager_investor  │ Turn 8   │  │   │
│  │ │   │           │ "Invest now for  │ 5 entities      │ 1h ago   │→ │   │
│  │ ├────────────────────────────────────────────────────────────────┤  │   │
│  │ │ □ │ 🔴 FAILED │ Tech Support     │ confused_user   │ Turn 2   │  │   │
│  │ │   │           │ "Your computer   │ 0 entities      │ 2h ago   │→ │   │
│  │ └────────────────────────────────────────────────────────────────┘  │   │
│  │                                                                      │   │
│  │  ◀ Previous    Page 1 of 24    Next ▶       Showing 1-20 of 467     │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## SESSION DETAIL PAGE LAYOUT

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← Back to Sessions                                                         │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │  SESSION #abc123                                        🔴 ACTIVE      ││
│  │  KYC Fraud Detection • elderly_victim persona                           ││
│  │  Started: Jan 31, 2026 at 2:34 PM • Duration: 12m 45s • Turn 7 of ∞    ││
│  │                                                                         ││
│  │  [📥 Export ▼] [🏷️ Tags] [📝 Notes] [⋮ More]                           ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  ┌──────────────────────────────────────┐ ┌─────────────────────────────┐  │
│  │                                      │ │ 📊 SESSION STATS            │  │
│  │  💬 CONVERSATION                     │ │                             │  │
│  │  ┌────────────────────────────────┐  │ │ Messages: 14                │  │
│  │  │ 🔍 Search in conversation...   │  │ │ Entities: 5                 │  │
│  │  └────────────────────────────────┘  │ │ Risk Score: 8.5/10          │  │
│  │                                      │ │ Confidence: 94%             │  │
│  │  ═══════ Today, 2:34 PM ═══════     │ │                             │  │
│  │                                      │ ├─────────────────────────────┤  │
│  │  ┌─ 🎭 Scammer ──────────────────┐  │ │ 🧠 EXTRACTED INTELLIGENCE   │  │
│  │  │ Dear customer, your KYC has   │  │ │                             │  │
│  │  │ expired. Please click link    │  │ │ 📞 Phone Numbers (2)        │  │
│  │  │ to update: bit.ly/fake-kyc    │  │ │   +91 98765 43210           │  │
│  │  │              ▲ highlighted    │  │ │   +91 87654 32109           │  │
│  │  │                    2:34 PM    │  │ │                             │  │
│  │  └───────────────────────────────┘  │ │ 💳 UPI IDs (1)              │  │
│  │                                      │ │   scammer@upi              │  │
│  │  ┌─ 🤖 Persona (elderly_victim) ─┐  │ │                             │  │
│  │  │ Oh my, I'm worried! What      │  │ │ 🔗 Phishing Links (1)       │  │
│  │  │ should I do? I don't want     │  │ │   bit.ly/fake-kyc           │  │
│  │  │ any problems with my bank...  │  │ │                             │  │
│  │  │                    2:35 PM    │  │ │ 🏦 Bank Accounts (1)        │  │
│  │  └───────────────────────────────┘  │ │   SBI: 12345678901          │  │
│  │                                      │ │                             │  │
│  │  ┌─ 🎭 Scammer ──────────────────┐  │ ├─────────────────────────────┤  │
│  │  │ Ma'am, send OTP to this       │  │ │ ⏱️ TIMELINE                 │  │
│  │  │ number: +91 98765 43210       │  │ │                             │  │
│  │  │ Also need bank account for    │  │ │ • 2:34 PM - Session started │  │
│  │  │ verification: SBI 12345678901 │  │ │ • 2:35 PM - Link detected   │  │
│  │  │                    2:36 PM    │  │ │ • 2:36 PM - Phone extracted │  │
│  │  └───────────────────────────────┘  │ │ • 2:36 PM - Bank extracted  │  │
│  │                                      │ │                             │  │
│  │  ┌─ ⚙️ System ───────────────────┐  │ └─────────────────────────────┘  │
│  │  │ ⚠️ High risk activity detected│  │                                  │
│  │  │ Extracted: Bank Account, Phone│  │                                  │
│  │  └───────────────────────────────┘  │                                  │
│  │                                      │                                  │
│  │  [🔄 Auto-scroll: ON] [⬇️ Jump to latest]                              │
│  │                                      │                                  │
│  └──────────────────────────────────────┘                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## COMPONENT SPECIFICATIONS

### 1. frontend/app/(dashboard)/sessions/page.tsx

```typescript
// Sessions list page - Server Component with client islands
// Features:
// - Server-side initial data fetch
// - URL-based filter state persistence
// - Client-side real-time updates
// - SEO metadata

import { Suspense } from 'react'
import { Metadata } from 'next'
import { SessionsToolbar } from '@/components/sessions/sessions-toolbar'
import { SessionsList } from '@/components/sessions/sessions-list'
import { SessionsFilters } from '@/components/sessions/sessions-filters'
import { SessionsListSkeleton } from '@/components/sessions/skeletons'

export const metadata: Metadata = {
  title: 'Sessions | ScamShield',
  description: 'Manage and monitor scam engagement sessions',
}

interface SessionsPageProps {
  searchParams: {
    status?: string
    scam_type?: string
    persona?: string
    search?: string
    sort?: string
    order?: string
    page?: string
    view?: 'table' | 'grid'
  }
}

export default function SessionsPage({ searchParams }: SessionsPageProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
        <p className="text-muted-foreground">
          Manage and monitor all scam engagement sessions
        </p>
      </div>
      
      {/* Toolbar with search, filters toggle, view toggle, export */}
      <SessionsToolbar />
      
      {/* Collapsible filters panel */}
      <SessionsFilters />
      
      {/* Sessions list with loading state */}
      <Suspense fallback={<SessionsListSkeleton />}>
        <SessionsList initialFilters={searchParams} />
      </Suspense>
    </div>
  )
}
```

### 2. frontend/components/sessions/sessions-list.tsx

```typescript
// Main sessions list component
// Features:
// - Table and grid view toggle
// - Bulk selection and actions
// - Infinite scroll or pagination
// - Real-time updates for active sessions
// - Empty state handling
// - Optimistic updates for delete/archive

'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  RowSelectionState,
  SortingState,
} from '@tanstack/react-table'
import { useSessions, useDeleteSession } from '@/lib/hooks/use-sessions'
import { SessionsTable } from './sessions-table'
import { SessionsGrid } from './sessions-grid'
import { SessionsPagination } from './sessions-pagination'
import { SessionsBulkActions } from './sessions-bulk-actions'
import { SessionsEmpty } from './sessions-empty'
import { SessionsListSkeleton } from './skeletons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Session } from '@/types/session'
import { SessionStatusBadge } from './session-status-badge'
import { SessionActionsMenu } from './session-actions-menu'
import { formatRelativeTime, formatDuration } from '@/lib/utils/date'
import { SCAM_TYPES, PERSONAS } from '@/lib/constants'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'
import { 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  MessageSquare,
  Brain,
  Clock,
  ExternalLink
} from 'lucide-react'

interface SessionsListProps {
  initialFilters: Record<string, string | undefined>
}

export function SessionsList({ initialFilters }: SessionsListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // View mode from URL
  const viewMode = (searchParams.get('view') as 'table' | 'grid') || 'table'
  
  // Parse filters from URL
  const filters = useMemo(() => ({
    status: searchParams.get('status') || 'all',
    scam_type: searchParams.get('scam_type') || '',
    persona: searchParams.get('persona') || '',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'created_at',
    order: (searchParams.get('order') as 'asc' | 'desc') || 'desc',
    page: parseInt(searchParams.get('page') || '1'),
    limit: 20,
  }), [searchParams])
  
  // Fetch sessions with TanStack Query
  const { 
    data, 
    isLoading, 
    isError, 
    refetch 
  } = useSessions(filters)
  
  // Table state
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = useState<SortingState>([
    { id: filters.sort, desc: filters.order === 'desc' }
  ])
  
  // Delete mutation
  const deleteSession = useDeleteSession()
  
  // Selected session IDs
  const selectedIds = useMemo(() => {
    if (!data?.sessions) return []
    return Object.keys(rowSelection)
      .filter(key => rowSelection[key])
      .map(key => data.sessions[parseInt(key)]?.id)
      .filter(Boolean)
  }, [rowSelection, data?.sessions])
  
  // Update URL when sorting changes
  const handleSortingChange = useCallback((newSorting: SortingState) => {
    setSorting(newSorting)
    if (newSorting.length > 0) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('sort', newSorting[0].id)
      params.set('order', newSorting[0].desc ? 'desc' : 'asc')
      router.push(`${pathname}?${params.toString()}`)
    }
  }, [searchParams, pathname, router])
  
  // Table columns definition
  const columns: ColumnDef<Session>[] = useMemo(() => [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <SessionStatusBadge status={row.original.status} />
      ),
      size: 100,
    },
    {
      accessorKey: 'scam_type',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Scam Type
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
      cell: ({ row }) => {
        const scamType = SCAM_TYPES[row.original.scam_type as keyof typeof SCAM_TYPES]
        return (
          <div className="flex flex-col">
            <span className="font-medium">
              {scamType?.label || row.original.scam_type}
            </span>
            <span className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
              {row.original.metadata?.initial_message || 'No preview'}
            </span>
          </div>
        )
      },
      size: 250,
    },
    {
      accessorKey: 'persona_used',
      header: 'Persona',
      cell: ({ row }) => {
        const persona = PERSONAS[row.original.persona_used as keyof typeof PERSONAS]
        return (
          <div className="flex items-center gap-2">
            <span className="text-lg">{persona?.icon || '🤖'}</span>
            <span className="text-sm">{persona?.label || row.original.persona_used}</span>
          </div>
        )
      },
      size: 150,
    },
    {
      accessorKey: 'turn_count',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Turns
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="tabular-nums">{row.original.turn_count}</span>
      ),
      size: 100,
    },
    {
      accessorKey: 'extracted_count',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <Brain className="mr-2 h-4 w-4" />
          Entities
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const count = row.original.extracted_count || 0
        return (
          <Badge variant={count > 0 ? 'default' : 'secondary'}>
            {count}
          </Badge>
        )
      },
      size: 100,
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <Clock className="mr-2 h-4 w-4" />
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {formatRelativeTime(row.original.created_at)}
        </span>
      ),
      size: 120,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/sessions/${row.original.id}`}>
              View
              <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </Button>
          <SessionActionsMenu session={row.original} />
        </div>
      ),
      size: 120,
    },
  ], [])
  
  // TanStack Table instance
  const table = useReactTable({
    data: data?.sessions || [],
    columns,
    state: {
      rowSelection,
      sorting,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: handleSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount: data ? Math.ceil(data.total / filters.limit) : 0,
  })
  
  // Loading state
  if (isLoading) {
    return <SessionsListSkeleton />
  }
  
  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">Failed to load sessions</p>
        <Button variant="outline" className="mt-4" onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    )
  }
  
  // Empty state
  if (!data?.sessions || data.sessions.length === 0) {
    return <SessionsEmpty hasFilters={!!filters.search || filters.status !== 'all'} />
  }
  
  return (
    <div className="space-y-4">
      {/* Bulk actions bar */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <SessionsBulkActions
              selectedCount={selectedIds.length}
              selectedIds={selectedIds}
              onClearSelection={() => setRowSelection({})}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Table or Grid view */}
      {viewMode === 'table' ? (
        <SessionsTable table={table} columns={columns} />
      ) : (
        <SessionsGrid sessions={data.sessions} selectedIds={selectedIds} />
      )}
      
      {/* Pagination */}
      <SessionsPagination
        currentPage={filters.page}
        totalPages={Math.ceil(data.total / filters.limit)}
        totalItems={data.total}
        pageSize={filters.limit}
      />
    </div>
  )
}
```

### 3. frontend/components/sessions/sessions-toolbar.tsx

```typescript
// Toolbar with search, filters toggle, view toggle, and export
// Features:
// - Debounced search input
// - Filter panel toggle
// - View mode toggle (table/grid)
// - Export dropdown
// - New session button

'use client'

import { useState, useCallback, useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { 
  Search, 
  SlidersHorizontal, 
  LayoutGrid, 
  LayoutList,
  Download,
  Plus,
  X,
  Loader2
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSessionFiltersStore } from '@/lib/stores/session-filters'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'

export function SessionsToolbar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  // Local search state for controlled input
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '')
  
  // Filter panel visibility
  const { isFiltersOpen, toggleFilters, activeFilterCount } = useSessionFiltersStore()
  
  // View mode from URL
  const viewMode = searchParams.get('view') || 'table'
  
  // Debounced search
  const debouncedSearch = useDebouncedCallback((value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set('search', value)
      } else {
        params.delete('search')
      }
      params.set('page', '1') // Reset to first page on search
      router.push(`${pathname}?${params.toString()}`)
    })
  }, 300)
  
  // Handle search input
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    debouncedSearch(value)
  }, [debouncedSearch])
  
  // Clear search
  const clearSearch = useCallback(() => {
    setSearchValue('')
    const params = new URLSearchParams(searchParams.toString())
    params.delete('search')
    router.push(`${pathname}?${params.toString()}`)
  }, [searchParams, pathname, router])
  
  // Toggle view mode
  const toggleViewMode = useCallback(() => {
    const newMode = viewMode === 'table' ? 'grid' : 'table'
    const params = new URLSearchParams(searchParams.toString())
    params.set('view', newMode)
    router.push(`${pathname}?${params.toString()}`)
  }, [viewMode, searchParams, pathname, router])
  
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search and filters */}
      <div className="flex flex-1 items-center gap-2">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search sessions..."
            value={searchValue}
            onChange={handleSearchChange}
            className="pl-9 pr-9"
          />
          {searchValue && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          {isPending && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
          )}
        </div>
        
        {/* Filters toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isFiltersOpen ? 'secondary' : 'outline'}
              size="icon"
              onClick={toggleFilters}
              className="relative"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {activeFilterCount > 0 && (
                <Badge 
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                  variant="destructive"
                >
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isFiltersOpen ? 'Hide filters' : 'Show filters'}
          </TooltipContent>
        </Tooltip>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* View toggle */}
        <div className="flex rounded-lg border bg-muted p-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => viewMode !== 'table' && toggleViewMode()}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Table view</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => viewMode !== 'grid' && toggleViewMode()}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Grid view</TooltipContent>
          </Tooltip>
        </div>
        
        {/* Export dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              Export as JSON
            </DropdownMenuItem>
            <DropdownMenuItem>
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Export selected ({0})
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* New session button */}
        <Button asChild>
          <Link href="/chat">
            <Plus className="mr-2 h-4 w-4" />
            New Session
          </Link>
        </Button>
      </div>
    </div>
  )
}
```

### 4. frontend/components/sessions/sessions-filters.tsx

```typescript
// Advanced filter panel
// Features:
// - Status filter (tabs or buttons)
// - Scam type multi-select
// - Persona multi-select
// - Date range picker
// - Clear all filters
// - Collapsible panel

'use client'

import { useCallback, useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSessionFiltersStore } from '@/lib/stores/session-filters'
import { SCAM_TYPES, PERSONAS, SESSION_STATUSES } from '@/lib/constants'
import { cn } from '@/lib/utils/cn'
import { DateRange } from 'react-day-picker'

export function SessionsFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  const { isFiltersOpen } = useSessionFiltersStore()
  
  // Current filter values from URL
  const currentStatus = searchParams.get('status') || 'all'
  const currentScamType = searchParams.get('scam_type') || ''
  const currentPersona = searchParams.get('persona') || ''
  const dateFrom = searchParams.get('date_from')
  const dateTo = searchParams.get('date_to')
  
  // Date range state
  const dateRange: DateRange | undefined = dateFrom || dateTo ? {
    from: dateFrom ? new Date(dateFrom) : undefined,
    to: dateTo ? new Date(dateTo) : undefined,
  } : undefined
  
  // Update URL with filter
  const updateFilter = useCallback((key: string, value: string | null) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== 'all') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.set('page', '1') // Reset to first page
      router.push(`${pathname}?${params.toString()}`)
    })
  }, [searchParams, pathname, router])
  
  // Update date range
  const updateDateRange = useCallback((range: DateRange | undefined) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (range?.from) {
        params.set('date_from', range.from.toISOString())
      } else {
        params.delete('date_from')
      }
      if (range?.to) {
        params.set('date_to', range.to.toISOString())
      } else {
        params.delete('date_to')
      }
      params.set('page', '1')
      router.push(`${pathname}?${params.toString()}`)
    })
  }, [searchParams, pathname, router])
  
  // Clear all filters
  const clearAllFilters = useCallback(() => {
    startTransition(() => {
      router.push(pathname)
    })
  }, [pathname, router])
  
  // Check if any filters are active
  const hasActiveFilters = currentStatus !== 'all' || currentScamType || currentPersona || dateFrom || dateTo
  
  return (
    <AnimatePresence>
      {isFiltersOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="rounded-lg border bg-card p-4 space-y-4">
            {/* Status filter tabs */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Tabs value={currentStatus} onValueChange={(v) => updateFilter('status', v)}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
                    Active
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                    Completed
                  </TabsTrigger>
                  <TabsTrigger value="failed" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                    Failed
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Scam type, persona, and date filters */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Scam Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Scam Type</label>
                <Select
                  value={currentScamType || 'all'}
                  onValueChange={(v) => updateFilter('scam_type', v === 'all' ? null : v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    {Object.entries(SCAM_TYPES).map(([key, { label, icon }]) => (
                      <SelectItem key={key} value={key}>
                        <span className="flex items-center gap-2">
                          <span>{icon}</span>
                          {label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Persona */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Persona</label>
                <Select
                  value={currentPersona || 'all'}
                  onValueChange={(v) => updateFilter('persona', v === 'all' ? null : v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All personas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All personas</SelectItem>
                    {Object.entries(PERSONAS).map(([key, { label, icon }]) => (
                      <SelectItem key={key} value={key}>
                        <span className="flex items-center gap-2">
                          <span>{icon}</span>
                          {label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Date range */}
              <div className="space-y-2 sm:col-span-2 lg:col-span-2">
                <label className="text-sm font-medium">Date Range</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !dateRange && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, 'LLL dd, y')} -{' '}
                            {format(dateRange.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(dateRange.from, 'LLL dd, y')
                        )
                      ) : (
                        'Select date range'
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={updateDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {/* Active filters and clear button */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex flex-wrap gap-2">
                  {currentStatus !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                      Status: {currentStatus}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => updateFilter('status', null)}
                      />
                    </Badge>
                  )}
                  {currentScamType && (
                    <Badge variant="secondary" className="gap-1">
                      Type: {SCAM_TYPES[currentScamType as keyof typeof SCAM_TYPES]?.label || currentScamType}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => updateFilter('scam_type', null)}
                      />
                    </Badge>
                  )}
                  {currentPersona && (
                    <Badge variant="secondary" className="gap-1">
                      Persona: {PERSONAS[currentPersona as keyof typeof PERSONAS]?.label || currentPersona}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => updateFilter('persona', null)}
                      />
                    </Badge>
                  )}
                  {dateRange && (
                    <Badge variant="secondary" className="gap-1">
                      Date: {format(dateRange.from!, 'MMM d')} - {format(dateRange.to || dateRange.from!, 'MMM d')}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => updateDateRange(undefined)}
                      />
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

### 5. frontend/app/(dashboard)/sessions/[id]/page.tsx

```typescript
// Session detail page
// Features:
// - Full conversation history
// - Real-time message updates for active sessions
// - Extracted intelligence panel
// - Session metadata and stats
// - Export and actions

import { Suspense } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SessionDetailHeader } from '@/components/sessions/session-detail-header'
import { ConversationView } from '@/components/sessions/conversation-view'
import { SessionDetailSidebar } from '@/components/sessions/session-detail-sidebar'
import { SessionDetailSkeleton } from '@/components/sessions/skeletons'
import { getSession } from '@/lib/api/sessions'

interface SessionDetailPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: SessionDetailPageProps): Promise<Metadata> {
  try {
    const session = await getSession(params.id)
    return {
      title: `Session ${session.id.slice(0, 8)} | ScamShield`,
      description: `${session.scam_type} session with ${session.persona_used} persona`,
    }
  } catch {
    return {
      title: 'Session Not Found | ScamShield',
    }
  }
}

export default async function SessionDetailPage({ params }: SessionDetailPageProps) {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <Suspense fallback={<SessionDetailSkeleton />}>
        <SessionDetailContent sessionId={params.id} />
      </Suspense>
    </div>
  )
}

async function SessionDetailContent({ sessionId }: { sessionId: string }) {
  // Server-side fetch for initial data
  let session
  try {
    session = await getSession(sessionId)
  } catch {
    notFound()
  }
  
  return (
    <>
      {/* Header */}
      <SessionDetailHeader session={session} />
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Conversation area */}
        <div className="flex-1 overflow-hidden">
          <ConversationView sessionId={sessionId} initialSession={session} />
        </div>
        
        {/* Sidebar */}
        <SessionDetailSidebar sessionId={sessionId} session={session} />
      </div>
    </>
  )
}
```

### 6. frontend/components/sessions/conversation-view.tsx

```typescript
// Main conversation display component
// Features:
// - Message list with virtual scrolling
// - Real-time updates for active sessions
// - Message search
// - Entity highlighting
// - Auto-scroll to latest
// - Message grouping by time
// - Copy message text

'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  ArrowDown, 
  Loader2,
  MessageSquare
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ConversationMessage } from './conversation-message'
import { ConversationHeader } from './conversation-header'
import { useSessionMessages } from '@/lib/hooks/use-session-messages'
import { Session, Message } from '@/types/session'
import { groupMessagesByDate } from '@/lib/utils/message-parser'
import { cn } from '@/lib/utils/cn'

interface ConversationViewProps {
  sessionId: string
  initialSession: Session
}

export function ConversationView({ sessionId, initialSession }: ConversationViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [autoScroll, setAutoScroll] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  
  // Fetch messages with real-time polling for active sessions
  const { 
    data: messagesData, 
    isLoading, 
    isFetching 
  } = useSessionMessages(sessionId, {
    refetchInterval: initialSession.status === 'active' ? 2000 : false,
  })
  
  const messages = messagesData?.messages || []
  const groupedMessages = groupMessagesByDate(messages)
  
  // Filter messages by search
  const filteredMessages = searchQuery
    ? messages.filter(m => 
        m.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages
  
  // Virtual scrolling for large conversations
  const parentRef = useRef<HTMLDivElement>(null)
  const rowVirtualizer = useVirtualizer({
    count: filteredMessages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120, // Estimated message height
    overscan: 5,
  })
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (autoScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages.length, autoScroll])
  
  // Detect when user scrolls up to disable auto-scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    const isAtBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 100
    setAutoScroll(isAtBottom)
  }, [])
  
  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    setAutoScroll(true)
  }, [])
  
  return (
    <div className="flex flex-col h-full">
      {/* Conversation header with search toggle */}
      <ConversationHeader 
        session={initialSession}
        messageCount={messages.length}
        showSearch={showSearch}
        onToggleSearch={() => setShowSearch(!showSearch)}
      />
      
      {/* Search bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b px-4 py-2"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search in conversation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
              {searchQuery && (
                <Badge variant="secondary" className="absolute right-3 top-1/2 -translate-y-1/2">
                  {filteredMessages.length} matches
                </Badge>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Messages area */}
      <div 
        ref={parentRef}
        className="flex-1 overflow-auto p-4 space-y-4"
        onScroll={handleScroll}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium">No messages yet</p>
            <p className="text-sm text-muted-foreground">
              Messages will appear here as the conversation progresses
            </p>
          </div>
        ) : (
          <>
            {/* Grouped messages */}
            {Object.entries(groupedMessages).map(([dateKey, dateMessages]) => (
              <div key={dateKey} className="space-y-4">
                {/* Date separator */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 border-t" />
                  <span className="text-xs font-medium text-muted-foreground bg-background px-2">
                    {dateKey}
                  </span>
                  <div className="flex-1 border-t" />
                </div>
                
                {/* Messages for this date */}
                {dateMessages.map((message, index) => (
                  <ConversationMessage
                    key={message.id}
                    message={message}
                    searchQuery={searchQuery}
                    showTimestamp={
                      index === 0 || 
                      new Date(message.timestamp).getTime() - 
                      new Date(dateMessages[index - 1]?.timestamp).getTime() > 300000 // 5 min
                    }
                  />
                ))}
              </div>
            ))}
            
            {/* Live indicator for active sessions */}
            {initialSession.status === 'active' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2 py-4"
              >
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </span>
                <span className="text-sm text-muted-foreground">Waiting for response...</span>
              </motion.div>
            )}
            
            {/* Scroll anchor */}
            <div ref={bottomRef} />
          </>
        )}
      </div>
      
      {/* Scroll to bottom button */}
      <AnimatePresence>
        {!autoScroll && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 right-4"
          >
            <Button
              variant="secondary"
              size="sm"
              className="shadow-lg"
              onClick={scrollToBottom}
            >
              <ArrowDown className="mr-2 h-4 w-4" />
              Jump to latest
              {isFetching && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

### 7. frontend/components/sessions/conversation-message.tsx

```typescript
// Individual message component
// Features:
// - Different styles for scammer, persona, system messages
// - Entity highlighting with tooltips
// - Copy to clipboard
// - Timestamp display
// - Analysis metadata (intent, tactics)
// - Animated entrance

'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Copy, 
  Check, 
  AlertTriangle,
  Info,
  Brain,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { EntityHighlight } from './entity-highlight'
import { Message } from '@/types/session'
import { highlightEntities } from '@/lib/utils/entity-highlighter'
import { formatTime } from '@/lib/utils/date'
import { cn } from '@/lib/utils/cn'

interface ConversationMessageProps {
  message: Message
  searchQuery?: string
  showTimestamp?: boolean
}

const messageStyles = {
  scammer: {
    container: 'mr-auto bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
    header: 'text-red-700 dark:text-red-400',
    icon: '🎭',
    label: 'Scammer',
  },
  persona: {
    container: 'ml-auto bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
    header: 'text-blue-700 dark:text-blue-400',
    icon: '🤖',
    label: 'Persona',
  },
  system: {
    container: 'mx-auto bg-muted border-border',
    header: 'text-muted-foreground',
    icon: '⚙️',
    label: 'System',
  },
}

export function ConversationMessage({ 
  message, 
  searchQuery,
  showTimestamp = true 
}: ConversationMessageProps) {
  const [copied, setCopied] = useState(false)
  const style = messageStyles[message.role]
  
  // Highlight entities in message content
  const highlightedContent = useMemo(() => {
    return highlightEntities(message.content, message.metadata?.extracted_entities || [])
  }, [message.content, message.metadata?.extracted_entities])
  
  // Highlight search matches
  const searchHighlightedContent = useMemo(() => {
    if (!searchQuery) return highlightedContent
    
    const regex = new RegExp(`(${searchQuery})`, 'gi')
    return highlightedContent.replace(
      regex, 
      '<mark class="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">$1</mark>'
    )
  }, [highlightedContent, searchQuery])
  
  // Copy message to clipboard
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const hasAnalysis = message.metadata?.analysis
  const hasEntities = message.metadata?.extracted_entities?.length > 0
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative max-w-[80%] rounded-lg border p-4',
        style.container,
        message.role === 'system' && 'max-w-full'
      )}
    >
      {/* Header */}
      <div className={cn('flex items-center gap-2 mb-2', style.header)}>
        <span className="text-lg">{style.icon}</span>
        <span className="font-medium text-sm">{style.label}</span>
        {message.turn_number && (
          <Badge variant="outline" className="text-xs">
            Turn {message.turn_number}
          </Badge>
        )}
        
        {/* Analysis indicator */}
        {hasAnalysis && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Brain className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Message Analysis</h4>
                <div className="text-xs space-y-1">
                  <div>
                    <span className="text-muted-foreground">Intent:</span>{' '}
                    <span className="font-medium">{message.metadata?.analysis?.intent}</span>
                  </div>
                  {message.metadata?.analysis?.tactics?.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Tactics:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {message.metadata?.analysis?.tactics.map((tactic: string) => (
                          <Badge key={tactic} variant="secondary" className="text-xs">
                            {tactic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Confidence:</span>{' '}
                    <span className="font-medium">
                      {(message.metadata?.analysis?.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
        
        {/* Entities indicator */}
        {hasEntities && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="destructive" className="text-xs gap-1">
                <AlertTriangle className="h-3 w-3" />
                {message.metadata?.extracted_entities?.length} entities
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                {message.metadata?.extracted_entities?.map((entity: any, i: number) => (
                  <div key={i} className="text-xs">
                    {entity.type}: {entity.value}
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        )}
        
        {/* Timestamp */}
        {showTimestamp && (
          <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatTime(message.timestamp)}
          </span>
        )}
      </div>
      
      {/* Content */}
      <div 
        className="text-sm whitespace-pre-wrap break-words"
        dangerouslySetInnerHTML={{ __html: searchHighlightedContent }}
      />
      
      {/* Copy button (appears on hover) */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy message</TooltipContent>
        </Tooltip>
      </div>
    </motion.div>
  )
}
```

### 8. frontend/components/sessions/session-detail-sidebar.tsx

```typescript
// Session detail sidebar
// Features:
// - Session stats
// - Extracted entities panel
// - Timeline
// - Tags
// - Notes

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Brain, 
  Target, 
  Clock,
  Phone,
  CreditCard,
  Building2,
  Link as LinkIcon,
  Mail,
  Hash,
  ChevronRight,
  Copy,
  Check,
  Tag,
  FileText
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useSessionIntelligence } from '@/lib/hooks/use-session-detail'
import { Session } from '@/types/session'
import { formatDuration, formatDateTime } from '@/lib/utils/date'
import { cn } from '@/lib/utils/cn'

interface SessionDetailSidebarProps {
  sessionId: string
  session: Session
}

const entityIcons = {
  PHONE_NUMBER: Phone,
  UPI_ID: CreditCard,
  BANK_ACCOUNT: Building2,
  URL: LinkIcon,
  EMAIL: Mail,
  IFSC_CODE: Hash,
}

const entityColors = {
  PHONE_NUMBER: 'text-blue-500 bg-blue-100',
  UPI_ID: 'text-green-500 bg-green-100',
  BANK_ACCOUNT: 'text-purple-500 bg-purple-100',
  URL: 'text-red-500 bg-red-100',
  EMAIL: 'text-pink-500 bg-pink-100',
  IFSC_CODE: 'text-orange-500 bg-orange-100',
}

export function SessionDetailSidebar({ sessionId, session }: SessionDetailSidebarProps) {
  const { data: intelligence, isLoading } = useSessionIntelligence(sessionId)
  const [copiedEntity, setCopiedEntity] = useState<string | null>(null)
  
  const copyEntity = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopiedEntity(value)
    setTimeout(() => setCopiedEntity(null), 2000)
  }
  
  // Group entities by type
  const groupedEntities = intelligence?.entities?.reduce((acc: any, entity: any) => {
    if (!acc[entity.type]) acc[entity.type] = []
    acc[entity.type].push(entity)
    return acc
  }, {}) || {}
  
  return (
    <div className="w-80 border-l bg-muted/30 flex flex-col">
      <Tabs defaultValue="stats" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid grid-cols-3">
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="intel">Intel</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        
        <ScrollArea className="flex-1 p-4">
          {/* Stats Tab */}
          <TabsContent value="stats" className="mt-0 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Session Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    Messages
                  </span>
                  <span className="font-semibold">{session.turn_count * 2}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Brain className="h-4 w-4" />
                    Entities Extracted
                  </span>
                  <span className="font-semibold">{intelligence?.summary?.total || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="h-4 w-4" />
                    Risk Score
                  </span>
                  <Badge variant={session.metadata?.risk_score > 7 ? 'destructive' : 'secondary'}>
                    {session.metadata?.risk_score || 0}/10
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Duration
                  </span>
                  <span className="font-semibold">
                    {formatDuration(session.duration_seconds || 0)}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            {/* Detection confidence */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Detection Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Confidence Level
                    </span>
                    <span className="text-xs font-semibold text-primary">
                      {((session.metadata?.detection_confidence || 0) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(session.metadata?.detection_confidence || 0) * 100}%` }}
                      transition={{ duration: 0.5 }}
                      className="bg-primary rounded"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Intelligence Tab */}
          <TabsContent value="intel" className="mt-0 space-y-4">
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 rounded bg-muted animate-pulse" />
                ))}
              </div>
            ) : Object.keys(groupedEntities).length === 0 ? (
              <div className="text-center py-8">
                <Brain className="h-10 w-10 mx-auto text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">No entities extracted yet</p>
              </div>
            ) : (
              Object.entries(groupedEntities).map(([type, entities]: [string, any]) => {
                const Icon = entityIcons[type as keyof typeof entityIcons] || Hash
                const colorClass = entityColors[type as keyof typeof entityColors] || 'text-gray-500 bg-gray-100'
                
                return (
                  <Collapsible key={type} defaultOpen>
                    <Card>
                      <CollapsibleTrigger className="w-full">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={cn('p-1.5 rounded', colorClass.split(' ')[1])}>
                                <Icon className={cn('h-4 w-4', colorClass.split(' ')[0])} />
                              </div>
                              <CardTitle className="text-sm font-medium">
                                {type.replace(/_/g, ' ')}
                              </CardTitle>
                            </div>
                            <Badge variant="secondary">{entities.length}</Badge>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0 space-y-2">
                          {entities.map((entity: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 rounded bg-muted/50 group"
                            >
                              <span className="text-sm font-mono truncate flex-1">
                                {entity.value}
                              </span>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 opacity-0 group-hover:opacity-100"
                                    onClick={() => copyEntity(entity.value)}
                                  >
                                    {copiedEntity === entity.value ? (
                                      <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Copy</TooltipContent>
                              </Tooltip>
                            </div>
                          ))}
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                )
              })
            )}
          </TabsContent>
          
          {/* Timeline Tab */}
          <TabsContent value="timeline" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Session Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-4 before:absolute before:inset-0 before:ml-3 before:w-0.5 before:bg-border">
                  <TimelineItem
                    time={session.created_at}
                    title="Session Started"
                    description={`${session.scam_type} detected`}
                    type="start"
                  />
                  
                  {intelligence?.entities?.slice(0, 5).map((entity: any, index: number) => (
                    <TimelineItem
                      key={index}
                      time={entity.extracted_at || session.created_at}
                      title="Entity Extracted"
                      description={`${entity.type}: ${entity.value.slice(0, 20)}...`}
                      type="entity"
                    />
                  ))}
                  
                  {session.status === 'completed' && session.completed_at && (
                    <TimelineItem
                      time={session.completed_at}
                      title="Session Completed"
                      description={`${session.turn_count} turns, ${intelligence?.summary?.total || 0} entities`}
                      type="end"
                    />
                  )}
                  
                  {session.status === 'active' && (
                    <TimelineItem
                      time={new Date().toISOString()}
                      title="In Progress"
                      description="Waiting for response..."
                      type="active"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}

function TimelineItem({ 
  time, 
  title, 
  description, 
  type 
}: { 
  time: string
  title: string
  description: string
  type: 'start' | 'entity' | 'end' | 'active'
}) {
  const colors = {
    start: 'bg-green-500',
    entity: 'bg-blue-500',
    end: 'bg-primary',
    active: 'bg-yellow-500 animate-pulse',
  }
  
  return (
    <div className="relative pl-8">
      <span className={cn(
        'absolute left-1 top-1.5 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-background',
        colors[type]
      )} />
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">
          {formatDateTime(time)}
        </span>
        <span className="text-sm font-medium">{title}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
    </div>
  )
}
```

### 9. frontend/lib/hooks/use-sessions.ts

```typescript
// Sessions hooks for list and mutations
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { sessionsApi } from '@/lib/api/sessions'
import { SessionFilters } from '@/types/filters'
import { toast } from 'sonner'

// Query keys
export const sessionKeys = {
  all: ['sessions'] as const,
  lists: () => [...sessionKeys.all, 'list'] as const,
  list: (filters: SessionFilters) => [...sessionKeys.lists(), filters] as const,
  details: () => [...sessionKeys.all, 'detail'] as const,
  detail: (id: string) => [...sessionKeys.details(), id] as const,
  messages: (id: string) => [...sessionKeys.detail(id), 'messages'] as const,
  intelligence: (id: string) => [...sessionKeys.detail(id), 'intelligence'] as const,
}

// Hook for sessions list
export function useSessions(filters: SessionFilters) {
  return useQuery({
    queryKey: sessionKeys.list(filters),
    queryFn: () => sessionsApi.getSessions(filters),
    staleTime: 10000,
    placeholderData: (previousData) => previousData, // Keep previous data while fetching
  })
}

// Hook for deleting session
export function useDeleteSession() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: sessionsApi.deleteSession,
    onMutate: async (sessionId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: sessionKeys.lists() })
      
      // Snapshot previous value
      const previousSessions = queryClient.getQueriesData({ queryKey: sessionKeys.lists() })
      
      // Optimistically remove from cache
      queryClient.setQueriesData({ queryKey: sessionKeys.lists() }, (old: any) => {
        if (!old) return old
        return {
          ...old,
          sessions: old.sessions.filter((s: any) => s.id !== sessionId),
          total: old.total - 1,
        }
      })
      
      return { previousSessions }
    },
    onError: (err, sessionId, context) => {
      // Rollback on error
      context?.previousSessions?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
      toast.error('Failed to delete session')
    },
    onSuccess: () => {
      toast.success('Session deleted')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() })
    },
  })
}

// Hook for bulk delete
export function useBulkDeleteSessions() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (sessionIds: string[]) => 
      Promise.all(sessionIds.map(id => sessionsApi.deleteSession(id))),
    onSuccess: (_, sessionIds) => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() })
      toast.success(`Deleted ${sessionIds.length} sessions`)
    },
    onError: () => {
      toast.error('Failed to delete sessions')
    },
  })
}

// Hook for exporting sessions
export function useExportSessions() {
  return useMutation({
    mutationFn: ({ sessionIds, format }: { sessionIds: string[], format: 'json' | 'csv' | 'pdf' }) =>
      sessionsApi.exportSessions(sessionIds, format),
    onSuccess: (data) => {
      // Trigger download
      window.open(data.download_url, '_blank')
      toast.success('Export ready')
    },
    onError: () => {
      toast.error('Failed to export sessions')
    },
  })
}
```

### 10. frontend/lib/hooks/use-session-messages.ts

```typescript
// Hook for session messages with real-time polling
'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { sessionsApi } from '@/lib/api/sessions'
import { sessionKeys } from './use-sessions'

interface UseSessionMessagesOptions {
  refetchInterval?: number | false
}

export function useSessionMessages(
  sessionId: string, 
  options: UseSessionMessagesOptions = {}
) {
  const queryClient = useQueryClient()
  
  return useQuery({
    queryKey: sessionKeys.messages(sessionId),
    queryFn: () => sessionsApi.getSessionMessages(sessionId),
    refetchInterval: options.refetchInterval,
    staleTime: 2000,
    // Merge new messages with existing ones
    select: (data) => ({
      ...data,
      messages: data.messages.sort((a: any, b: any) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )
    }),
  })
}

// Hook for session intelligence
export function useSessionIntelligence(sessionId: string) {
  return useQuery({
    queryKey: sessionKeys.intelligence(sessionId),
    queryFn: () => sessionsApi.getSessionIntelligence(sessionId),
    staleTime: 30000,
  })
}

// Hook for single session detail
export function useSessionDetail(sessionId: string) {
  return useQuery({
    queryKey: sessionKeys.detail(sessionId),
    queryFn: () => sessionsApi.getSession(sessionId),
    staleTime: 10000,
  })
}
```

### 11. frontend/lib/api/sessions.ts

```typescript
// Sessions API functions
import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import { Session, Message } from '@/types/session'
import { SessionFilters } from '@/types/filters'

export const sessionsApi = {
  // Get sessions list
  async getSessions(filters: SessionFilters) {
    const params = {
      limit: filters.limit || 20,
      offset: ((filters.page || 1) - 1) * (filters.limit || 20),
      ...(filters.status && filters.status !== 'all' && { status: filters.status }),
      ...(filters.scam_type && { scam_type: filters.scam_type }),
      ...(filters.persona && { persona: filters.persona }),
      ...(filters.search && { search: filters.search }),
      ...(filters.sort && { sort: filters.sort }),
      ...(filters.order && { order: filters.order }),
      ...(filters.date_from && { date_from: filters.date_from }),
      ...(filters.date_to && { date_to: filters.date_to }),
    }
    
    const { data } = await apiClient.get(API_ENDPOINTS.SESSIONS, { params })
    return data
  },
  
  // Get single session
  async getSession(id: string): Promise<Session> {
    const { data } = await apiClient.get(`${API_ENDPOINTS.SESSIONS}/${id}`)
    return data
  },
  
  // Get session messages
  async getSessionMessages(id: string, afterTimestamp?: string) {
    const params = afterTimestamp ? { after_timestamp: afterTimestamp } : {}
    const { data } = await apiClient.get(
      `${API_ENDPOINTS.SESSIONS}/${id}/messages`,
      { params }
    )
    return data
  },
  
  // Get session intelligence
  async getSessionIntelligence(id: string) {
    const { data } = await apiClient.get(`${API_ENDPOINTS.SESSIONS}/${id}/intelligence`)
    return data
  },
  
  // Delete session
  async deleteSession(id: string) {
    const { data } = await apiClient.delete(`${API_ENDPOINTS.SESSIONS}/${id}`)
    return data
  },
  
  // Export sessions
  async exportSessions(ids: string[], format: 'json' | 'csv' | 'pdf') {
    const { data } = await apiClient.post(`${API_ENDPOINTS.SESSIONS}/export`, {
      session_ids: ids,
      format,
    })
    return data
  },
}

// Server-side fetch function
export async function getSession(id: string): Promise<Session> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.SESSIONS}/${id}`,
    { next: { revalidate: 10 } }
  )
  
  if (!response.ok) {
    throw new Error('Failed to fetch session')
  }
  
  return response.json()
}
```

### 12. frontend/types/session.ts

```typescript
// Session TypeScript types

export interface Session {
  id: string
  status: 'active' | 'completed' | 'failed'
  scam_type: string
  persona_used: string
  persona_config?: Record<string, any>
  turn_count: number
  extracted_count?: number
  created_at: string
  updated_at: string
  completed_at?: string
  duration_seconds?: number
  metadata?: {
    initial_message?: string
    detection_confidence?: number
    risk_score?: number
  }
}

export interface Message {
  id: string
  session_id: string
  role: 'scammer' | 'persona' | 'system'
  content: string
  timestamp: string
  turn_number?: number
  metadata?: {
    analysis?: {
      intent: string
      tactics: string[]
      confidence: number
    }
    extracted_entities?: ExtractedEntity[]
  }
}

export interface ExtractedEntity {
  type: string
  value: string
  confidence: number
  source_message_id?: string
  extracted_at?: string
  verified?: boolean
}

export interface SessionIntelligence {
  entities: ExtractedEntity[]
  summary: {
    total: number
    by_type: Record<string, number>
    high_confidence: number
    verified: number
  }
}
```

### 13. frontend/types/filters.ts

```typescript
// Filter TypeScript types

export interface SessionFilters {
  status?: 'all' | 'active' | 'completed' | 'failed'
  scam_type?: string
  persona?: string
  search?: string
  sort?: 'created_at' | 'updated_at' | 'turn_count' | 'extracted_count'
  order?: 'asc' | 'desc'
  date_from?: string
  date_to?: string
  page?: number
  limit?: number
}
```

### 14. frontend/lib/utils/entity-highlighter.ts

```typescript
// Entity highlighting utility

import { ExtractedEntity } from '@/types/session'

export function highlightEntities(content: string, entities: ExtractedEntity[]): string {
  if (!entities || entities.length === 0) return escapeHtml(content)
  
  let result = content
  
  // Sort entities by length (longest first) to avoid partial replacements
  const sortedEntities = [...entities].sort((a, b) => b.value.length - a.value.length)
  
  for (const entity of sortedEntities) {
    const escapedValue = escapeRegExp(entity.value)
    const regex = new RegExp(escapedValue, 'gi')
    
    const tooltipContent = `${entity.type.replace(/_/g, ' ')}`
    const className = getEntityClassName(entity.type)
    
    result = result.replace(
      regex,
      `<span class="${className}" data-entity-type="${entity.type}" title="${tooltipContent}">$&</span>`
    )
  }
  
  return result
}

function getEntityClassName(type: string): string {
  const baseClass = 'entity-highlight px-1 py-0.5 rounded cursor-help'
  
  const typeClasses: Record<string, string> = {
    PHONE_NUMBER: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    UPI_ID: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    BANK_ACCOUNT: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
    URL: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    EMAIL: 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
    IFSC_CODE: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
  }
  
  return `${baseClass} ${typeClasses[type] || 'bg-gray-100 text-gray-800'}`
}

function escapeHtml(text: string): string {
  const div = typeof document !== 'undefined' ? document.createElement('div') : null
  if (div) {
    div.textContent = text
    return div.innerHTML
  }
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
```

### 15. frontend/lib/utils/message-parser.ts

```typescript
// Message parsing utilities

import { Message } from '@/types/session'
import { format, isToday, isYesterday, parseISO } from 'date-fns'

export function groupMessagesByDate(messages: Message[]): Record<string, Message[]> {
  const groups: Record<string, Message[]> = {}
  
  for (const message of messages) {
    const date = parseISO(message.timestamp)
    let dateKey: string
    
    if (isToday(date)) {
      dateKey = 'Today'
    } else if (isYesterday(date)) {
      dateKey = 'Yesterday'
    } else {
      dateKey = format(date, 'MMMM d, yyyy')
    }
    
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(message)
  }
  
  return groups
}

export function parseMessageContent(content: string): {
  text: string
  links: string[]
  mentions: string[]
} {
  const linkRegex = /(https?:\/\/[^\s]+)/g
  const mentionRegex = /@(\w+)/g
  
  const links = content.match(linkRegex) || []
  const mentions = (content.match(mentionRegex) || []).map(m => m.slice(1))
  
  return {
    text: content,
    links,
    mentions,
  }
}
```

## ADDITIONAL COMPONENTS TO CREATE

16. **sessions-table.tsx** - Table component using TanStack Table
17. **sessions-grid.tsx** - Grid view with session cards
18. **session-card.tsx** - Card component for grid view
19. **sessions-pagination.tsx** - Pagination with page numbers
20. **sessions-bulk-actions.tsx** - Bulk action toolbar
21. **sessions-export.tsx** - Export dialog with format options
22. **sessions-empty.tsx** - Empty state component
23. **session-status-badge.tsx** - Status badge with colors
24. **session-detail-header.tsx** - Detail page header
25. **session-actions-menu.tsx** - Actions dropdown menu
26. **delete-session-dialog.tsx** - Delete confirmation
27. **export-session-dialog.tsx** - Export options dialog
28. **conversation-header.tsx** - Conversation area header
29. **conversation-toolbar.tsx** - Conversation actions
30. **live-indicator.tsx** - Active session indicator
31. **auto-scroll-button.tsx** - Auto-scroll toggle button
32. **skeletons.tsx** - All loading skeleton components

## QUALITY REQUIREMENTS

1. **Performance:**
   - Virtual scrolling for large message lists
   - Optimistic updates for mutations
   - Efficient re-renders with proper memoization
   - Code splitting for heavy components

2. **Accessibility:**
   - Full keyboard navigation
   - ARIA labels for interactive elements
   - Screen reader announcements
   - Focus management

3. **Real-time:**
   - Configurable polling for active sessions
   - Visual indicators for live updates
   - Auto-scroll with user override
   - Smooth message animations

4. **UX:**
   - URL-based filter persistence
   - Debounced search
   - Optimistic UI updates
   - Graceful error handling

5. **Mobile:**
   - Responsive layouts
   - Touch-friendly interactions
   - Collapsible sidebar
   - Swipe gestures (future)

Create all 55+ files with complete, production-ready code. The sessions module should provide a comprehensive view into all scam engagement sessions with powerful filtering, searching, and real-time monitoring capabilities.

## ⏹️ END PROMPT 4 ═════════════════════════════════════════════════════════════

---

# ═══════════════════════════════════════════════════════════════════════════════
# ██████╗ ██████╗  ██████╗ ███╗   ███╗██████╗ ████████╗    ███████╗
# ██╔══██╗██╔══██╗██╔═══██╗████╗ ████║██╔══██╗╚══██╔══╝    ██╔════╝
# ██████╔╝██████╔╝██║   ██║██╔████╔██║██████╔╝   ██║       ███████╗
# ██╔═══╝ ██╔══██╗██║   ██║██║╚██╔╝██║██╔═══╝    ██║       ╚════██║
# ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║██║        ██║       ███████║
# ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝        ╚═╝       ╚══════╝
# ═══════════════════════════════════════════════════════════════════════════════

# PROMPT 5: Intelligence Center

## 📦 Expected Output
| Output | Description |
|--------|-------------|
| `frontend/app/(dashboard)/intelligence/page.tsx` | Intelligence center main page |
| `frontend/app/(dashboard)/intelligence/loading.tsx` | Page loading skeleton |
| `frontend/app/(dashboard)/intelligence/error.tsx` | Page error boundary |
| `frontend/app/(dashboard)/intelligence/[id]/page.tsx` | Entity detail page |
| `frontend/app/(dashboard)/intelligence/[id]/loading.tsx` | Entity detail loading |
| `frontend/components/intelligence/intelligence-overview.tsx` | Overview stats section |
| `frontend/components/intelligence/intelligence-stats-cards.tsx` | Entity type stat cards |
| `frontend/components/intelligence/entity-type-card.tsx` | Individual type stat card |
| `frontend/components/intelligence/intelligence-toolbar.tsx` | Search, filters, export |
| `frontend/components/intelligence/intelligence-filters.tsx` | Advanced filter panel |
| `frontend/components/intelligence/intelligence-search.tsx` | Global entity search |
| `frontend/components/intelligence/intelligence-list.tsx` | Main entities list |
| `frontend/components/intelligence/intelligence-table.tsx` | Data table for entities |
| `frontend/components/intelligence/intelligence-grid.tsx` | Grid/card view |
| `frontend/components/intelligence/entity-card.tsx` | Entity card component |
| `frontend/components/intelligence/entity-row.tsx` | Entity table row |
| `frontend/components/intelligence/entity-type-badge.tsx` | Entity type badge |
| `frontend/components/intelligence/entity-risk-badge.tsx` | Risk level badge |
| `frontend/components/intelligence/entity-confidence-bar.tsx` | Confidence indicator |
| `frontend/components/intelligence/entity-verification-badge.tsx` | Verification status |
| `frontend/components/intelligence/entity-actions-menu.tsx` | Entity actions dropdown |
| `frontend/components/intelligence/entity-detail-panel.tsx` | Slide-over detail panel |
| `frontend/components/intelligence/entity-detail-header.tsx` | Detail panel header |
| `frontend/components/intelligence/entity-detail-info.tsx` | Entity information section |
| `frontend/components/intelligence/entity-detail-sessions.tsx` | Related sessions list |
| `frontend/components/intelligence/entity-detail-timeline.tsx` | Entity extraction timeline |
| `frontend/components/intelligence/entity-detail-analysis.tsx` | AI analysis section |
| `frontend/components/intelligence/entity-detail-notes.tsx` | Notes/annotations |
| `frontend/components/intelligence/entity-detail-actions.tsx` | Detail action buttons |
| `frontend/components/intelligence/phone-entity-card.tsx` | Phone number card |
| `frontend/components/intelligence/upi-entity-card.tsx` | UPI ID card |
| `frontend/components/intelligence/bank-entity-card.tsx` | Bank account card |
| `frontend/components/intelligence/link-entity-card.tsx` | URL/link card |
| `frontend/components/intelligence/email-entity-card.tsx` | Email card |
| `frontend/components/intelligence/ifsc-entity-card.tsx` | IFSC code card |
| `frontend/components/intelligence/entity-copy-button.tsx` | Copy to clipboard |
| `frontend/components/intelligence/entity-report-dialog.tsx` | Report entity dialog |
| `frontend/components/intelligence/entity-verify-dialog.tsx` | Verify entity dialog |
| `frontend/components/intelligence/bulk-export-dialog.tsx` | Bulk export dialog |
| `frontend/components/intelligence/intelligence-empty.tsx` | Empty state |
| `frontend/components/intelligence/intelligence-pagination.tsx` | Pagination controls |
| `frontend/components/intelligence/risk-score-gauge.tsx` | Risk score visualization |
| `frontend/components/intelligence/confidence-meter.tsx` | Confidence meter |
| `frontend/components/intelligence/entity-frequency-chart.tsx` | Frequency over time |
| `frontend/components/intelligence/entity-source-chart.tsx` | Source distribution |
| `frontend/components/intelligence/intelligence-map.tsx` | Geographic visualization |
| `frontend/components/intelligence/threat-network-graph.tsx` | Entity relationship graph |
| `frontend/components/intelligence/intelligence-trends.tsx` | Trend analysis section |
| `frontend/components/intelligence/recent-extractions.tsx` | Recent extractions feed |
| `frontend/components/intelligence/high-risk-entities.tsx` | High risk entities panel |
| `frontend/components/intelligence/verification-queue.tsx` | Pending verification list |
| `frontend/lib/hooks/use-intelligence.ts` | Intelligence data hook |
| `frontend/lib/hooks/use-entity-detail.ts` | Single entity hook |
| `frontend/lib/hooks/use-entity-search.ts` | Search with autocomplete |
| `frontend/lib/hooks/use-intelligence-filters.ts` | Filter state management |
| `frontend/lib/hooks/use-entity-mutations.ts` | Entity CRUD operations |
| `frontend/lib/hooks/use-intelligence-stats.ts` | Stats aggregation hook |
| `frontend/lib/api/intelligence.ts` | Intelligence API functions |
| `frontend/lib/utils/entity-validators.ts` | Entity validation utils |
| `frontend/lib/utils/risk-calculator.ts` | Risk score calculations |
| `frontend/lib/utils/entity-formatters.ts` | Entity display formatters |
| `frontend/types/intelligence.ts` | Intelligence TypeScript types |
| `frontend/types/entity.ts` | Entity TypeScript types |
| `frontend/lib/constants/entity-types.ts` | Entity type constants |
| `frontend/lib/stores/intelligence-filters.ts` | Zustand filter store |
| **Total: 65+ files** | Complete intelligence management system |

## ▶️ START PROMPT 5 ═══════════════════════════════════════════════════════════

Create a complete FAANG/MNC-level Intelligence Center for ScamShield Agentic Honeypot using Next.js 14, React, TanStack Query, and advanced data visualization. This is an enterprise-grade intelligence management system for India AI Impact Buildathon 2026.

## PROJECT CONTEXT

This is PROMPT 5 of the ScamShield frontend development. Previous prompts set up:
- PROMPT 1: Next.js 14 project with complete configuration
- PROMPT 2: UI Component Library (shadcn/ui)
- PROMPT 3: Dashboard Home Page
- PROMPT 4: Sessions Management

Now we need to build a comprehensive Intelligence Center that manages all extracted scam intelligence:
- Phone numbers used by scammers
- UPI IDs for fraudulent transactions
- Bank account numbers
- Phishing URLs and links
- Email addresses
- IFSC codes

This should match the quality of threat intelligence platforms like Recorded Future, CrowdStrike Falcon, or VirusTotal.

## BACKEND API ENDPOINTS (Already Built)

```typescript
// Intelligence endpoints
GET /v1/intelligence
Query Params:
  - limit: number (default: 20, max: 100)
  - offset: number (default: 0)
  - type: 'PHONE_NUMBER' | 'UPI_ID' | 'BANK_ACCOUNT' | 'URL' | 'EMAIL' | 'IFSC_CODE' | 'all'
  - risk_level: 'low' | 'medium' | 'high' | 'critical' | 'all'
  - verified: boolean
  - search: string
  - date_from: ISO string
  - date_to: ISO string
  - sort: 'created_at' | 'risk_score' | 'confidence' | 'frequency'
  - order: 'asc' | 'desc'
  - session_id: string (filter by specific session)

Response: {
  entities: ExtractedEntity[]
  total: number
  limit: number
  offset: number
  has_more: boolean
  summary: {
    total: number
    by_type: Record<string, number>
    by_risk_level: Record<string, number>
    verified_count: number
    high_risk_count: number
  }
}

GET /v1/intelligence/:id
Response: {
  id: string
  type: 'PHONE_NUMBER' | 'UPI_ID' | 'BANK_ACCOUNT' | 'URL' | 'EMAIL' | 'IFSC_CODE'
  value: string
  normalized_value: string
  risk_score: number (0-10)
  confidence: number (0-1)
  verified: boolean
  verification_source?: string
  first_seen: string
  last_seen: string
  occurrence_count: number
  sessions: Array<{
    id: string
    scam_type: string
    timestamp: string
  }>
  metadata: {
    country_code?: string
    carrier?: string
    bank_name?: string
    domain?: string
    is_suspicious_domain?: boolean
    whois_data?: object
  }
  analysis: {
    threat_level: string
    associated_scam_types: string[]
    pattern_matches: string[]
    similar_entities: string[]
  }
  notes: Array<{
    id: string
    content: string
    author: string
    created_at: string
  }>
  created_at: string
  updated_at: string
}

GET /v1/intelligence/stats
Response: {
  total_entities: number
  total_by_type: Record<string, number>
  total_by_risk: Record<string, number>
  verified_percentage: number
  extraction_rate: {
    today: number
    this_week: number
    this_month: number
  }
  top_scam_types: Array<{ type: string, count: number }>
  trend: Array<{ date: string, count: number }>
}

GET /v1/intelligence/search
Query Params:
  - q: string (search query)
  - limit: number (default: 10)
Response: {
  results: Array<{
    id: string
    type: string
    value: string
    risk_score: number
    highlight: string
  }>
  total: number
}

POST /v1/intelligence/:id/verify
Body: { verified: boolean, source: string, notes?: string }
Response: { success: boolean, entity: ExtractedEntity }

POST /v1/intelligence/:id/report
Body: { 
  report_type: 'false_positive' | 'duplicate' | 'additional_info' | 'verified_scam'
  details: string
  evidence?: string[]
}
Response: { success: boolean, report_id: string }

POST /v1/intelligence/:id/notes
Body: { content: string }
Response: { success: boolean, note: Note }

DELETE /v1/intelligence/:id
Response: { success: boolean, message: string }

POST /v1/intelligence/export
Body: { 
  entity_ids?: string[]
  type?: string
  format: 'json' | 'csv' | 'stix' | 'misp'
  include_metadata: boolean
}
Response: { download_url: string, expires_at: string }
```

## TECHNICAL REQUIREMENTS

### Stack
- **Framework:** Next.js 14 (App Router, Server Components where possible)
- **State Management:** TanStack Query for server state, Zustand for UI state
- **Data Table:** TanStack Table v8 with sorting, filtering, selection
- **Charts:** Recharts for visualizations
- **Animations:** Framer Motion for micro-interactions
- **Styling:** Tailwind CSS + shadcn/ui components

### Design Requirements
- **Dark/Light Mode:** Full support with smooth transitions
- **Responsive:** Mobile-first with adaptive layouts
- **Accessibility:** Full keyboard navigation, screen reader support
- **Performance:** Virtual scrolling, optimistic updates, pagination
- **Security:** Secure display of sensitive data (partial masking option)

## INTELLIGENCE CENTER LAYOUT

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🧠 Intelligence Center                                                      │
│  Extracted scam intelligence and threat data                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ 📞 Phones   │ │ 💳 UPI IDs  │ │ 🏦 Banks    │ │ 🔗 Links    │           │
│  │   234       │ │   156       │ │   89        │ │   67        │           │
│  │   ↑12%      │ │   ↑8%       │ │   ↑5%       │ │   ↓2%       │           │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ 📧 Emails   │ │ 🔢 IFSC     │ │ ⚠️ High Risk│ │ ✅ Verified │           │
│  │   45        │ │   23        │ │   67        │ │   312       │           │
│  │   ↑3%       │ │   ↑1%       │ │   ↑15%      │ │   78%       │           │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 Search entities...        [Type ▼] [Risk ▼] [📅] [Filters] [⬇️] │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ TYPE     │ VALUE              │ RISK   │ CONF │ SEEN │ STATUS │ ACTIONS ││
│  ├──────────┼────────────────────┼────────┼──────┼──────┼────────┼─────────┤│
│  │ 📞 Phone │ +91 98765 43210    │ 🔴 9.2 │ 94%  │ 12x  │ ✅     │ ⋮       ││
│  │          │ KYC Fraud, OTP     │        │      │      │        │         ││
│  ├──────────┼────────────────────┼────────┼──────┼──────┼────────┼─────────┤│
│  │ 💳 UPI   │ scammer@okaxis     │ 🔴 8.7 │ 91%  │ 8x   │ ⏳     │ ⋮       ││
│  │          │ Investment Fraud   │        │      │      │        │         ││
│  ├──────────┼────────────────────┼────────┼──────┼──────┼────────┼─────────┤│
│  │ 🏦 Bank  │ SBI: 1234****8901  │ 🟠 7.5 │ 87%  │ 5x   │ ✅     │ ⋮       ││
│  │          │ Lottery Scam       │        │      │      │        │         ││
│  ├──────────┼────────────────────┼────────┼──────┼──────┼────────┼─────────┤│
│  │ 🔗 URL   │ bit.ly/fake-kyc    │ 🔴 9.8 │ 98%  │ 23x  │ ✅     │ ⋮       ││
│  │          │ Phishing, Malware  │        │      │      │        │         ││
│  ├──────────┼────────────────────┼────────┼──────┼──────┼────────┼─────────┤│
│  │ 📧 Email │ support@fake.com   │ 🟡 5.2 │ 72%  │ 3x   │ ⏳     │ ⋮       ││
│  │          │ Tech Support Scam  │        │      │      │        │         ││
│  └──────────┴────────────────────┴────────┴──────┴──────┴────────┴─────────┘│
│                                                                              │
│  ◀ Previous    Page 1 of 32    Next ▶       Showing 1-20 of 634             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## ENTITY DETAIL SLIDE-OVER PANEL

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back                                          [✗ Close]      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📞 PHONE NUMBER                                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  +91 98765 43210                              [📋 Copy] │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │ Risk Score      │  │ Confidence      │  │ Occurrences    │  │
│  │ ████████░░ 9.2  │  │ ████████░░ 94%  │  │ 12 sessions    │  │
│  │ 🔴 CRITICAL     │  │ High            │  │ First: Jan 15  │  │
│  └─────────────────┘  └─────────────────┘  └────────────────┘  │
│                                                                 │
│  VERIFICATION STATUS                                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ✅ Verified Scam Number                                  │   │
│  │ Source: User Report + Pattern Match                      │   │
│  │ Verified: Jan 28, 2026                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  METADATA                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Country: India (+91)                                     │   │
│  │ Carrier: Airtel                                          │   │
│  │ Circle: Delhi                                            │   │
│  │ Type: Mobile                                             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ASSOCIATED SCAM TYPES                                          │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│  │ KYC Fraud    │ │ OTP Fraud    │ │ Bank Fraud   │           │
│  │ 8 sessions   │ │ 3 sessions   │ │ 1 session    │           │
│  └──────────────┘ └──────────────┘ └──────────────┘           │
│                                                                 │
│  RELATED SESSIONS                                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ • Session #abc123 - KYC Fraud - Jan 31, 2026           →│   │
│  │ • Session #def456 - OTP Fraud - Jan 30, 2026           →│   │
│  │ • Session #ghi789 - KYC Fraud - Jan 28, 2026           →│   │
│  │ + 9 more sessions                                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  EXTRACTION TIMELINE                                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Jan 31 ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━● │   │
│  │ Jan 30 ●━━━━━━━━━━━●                                    │   │
│  │ Jan 28 ●━━━━━━●                                         │   │
│  │ Jan 15 ● (First seen)                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  SIMILAR ENTITIES                                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ +91 98765 43211 (Same carrier, similar pattern)         │   │
│  │ +91 98765 43212 (Same carrier, similar pattern)         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  NOTES (2)                                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ "Confirmed scam number - reported to police"             │   │
│  │ Added by Admin • Jan 29, 2026                            │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ "Multiple victims reported this number"                  │   │
│  │ Added by System • Jan 28, 2026                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│  [+ Add Note]                                                   │
│                                                                 │
│  ACTIONS                                                        │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐      │
│  │ ⬇️ Export │ │ 🚨 Report │ │ ✅ Verify │ │ 🗑️ Delete │      │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## COMPONENT SPECIFICATIONS

### 1. frontend/app/(dashboard)/intelligence/page.tsx

```typescript
// Intelligence center main page - Server Component with client islands
// Features:
// - Server-side initial data fetch
// - Overview statistics
// - Entity list with filters
// - URL-based filter persistence

import { Suspense } from 'react'
import { Metadata } from 'next'
import { IntelligenceOverview } from '@/components/intelligence/intelligence-overview'
import { IntelligenceToolbar } from '@/components/intelligence/intelligence-toolbar'
import { IntelligenceFilters } from '@/components/intelligence/intelligence-filters'
import { IntelligenceList } from '@/components/intelligence/intelligence-list'
import { IntelligenceStatsSkeleton, IntelligenceListSkeleton } from '@/components/intelligence/skeletons'

export const metadata: Metadata = {
  title: 'Intelligence Center | ScamShield',
  description: 'Extracted scam intelligence and threat data management',
}

interface IntelligencePageProps {
  searchParams: {
    type?: string
    risk_level?: string
    verified?: string
    search?: string
    sort?: string
    order?: string
    page?: string
    view?: 'table' | 'grid'
  }
}

export default function IntelligencePage({ searchParams }: IntelligencePageProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Intelligence Center</h1>
        <p className="text-muted-foreground">
          Manage extracted scam intelligence and threat indicators
        </p>
      </div>
      
      {/* Overview Statistics */}
      <Suspense fallback={<IntelligenceStatsSkeleton />}>
        <IntelligenceOverview />
      </Suspense>
      
      {/* Toolbar with search, filters toggle, view toggle, export */}
      <IntelligenceToolbar />
      
      {/* Collapsible filters panel */}
      <IntelligenceFilters />
      
      {/* Intelligence list */}
      <Suspense fallback={<IntelligenceListSkeleton />}>
        <IntelligenceList initialFilters={searchParams} />
      </Suspense>
    </div>
  )
}
```

### 2. frontend/components/intelligence/intelligence-overview.tsx

```typescript
// Overview statistics section
// Features:
// - Entity type stat cards
// - Risk distribution
// - Verification stats
// - Trend indicators
// - Click to filter

'use client'

import { motion } from 'framer-motion'
import { 
  Phone, 
  CreditCard, 
  Building2, 
  Link as LinkIcon,
  Mail,
  Hash,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useIntelligenceStats } from '@/lib/hooks/use-intelligence-stats'
import { formatNumber, formatPercentage } from '@/lib/utils/format'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'

const entityTypeConfig = {
  PHONE_NUMBER: {
    icon: Phone,
    label: 'Phone Numbers',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    href: '?type=PHONE_NUMBER',
  },
  UPI_ID: {
    icon: CreditCard,
    label: 'UPI IDs',
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    href: '?type=UPI_ID',
  },
  BANK_ACCOUNT: {
    icon: Building2,
    label: 'Bank Accounts',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    href: '?type=BANK_ACCOUNT',
  },
  URL: {
    icon: LinkIcon,
    label: 'Phishing Links',
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    href: '?type=URL',
  },
  EMAIL: {
    icon: Mail,
    label: 'Email Addresses',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100 dark:bg-pink-900/30',
    href: '?type=EMAIL',
  },
  IFSC_CODE: {
    icon: Hash,
    label: 'IFSC Codes',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    href: '?type=IFSC_CODE',
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export function IntelligenceOverview() {
  const { data: stats, isLoading } = useIntelligenceStats()
  
  if (isLoading) {
    return <IntelligenceOverviewSkeleton />
  }
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Entity Type Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {Object.entries(entityTypeConfig).map(([type, config]) => {
          const count = stats?.total_by_type?.[type] || 0
          const trend = stats?.trends?.[type] || 0
          
          return (
            <motion.div key={type} variants={itemVariants}>
              <Link href={config.href}>
                <Card className="group cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={cn('rounded-lg p-2', config.bgColor)}>
                        <config.icon className={cn('h-5 w-5', config.color)} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-2xl font-bold tabular-nums">
                          {formatNumber(count)}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {config.label}
                        </p>
                      </div>
                    </div>
                    {trend !== 0 && (
                      <div className={cn(
                        'mt-2 flex items-center gap-1 text-xs',
                        trend > 0 ? 'text-green-600' : 'text-red-600'
                      )}>
                        {trend > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>{Math.abs(trend)}% this week</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>
      
      {/* Risk & Verification Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <motion.div variants={itemVariants}>
          <Link href="?risk_level=critical,high">
            <Card className="cursor-pointer transition-all hover:shadow-md border-red-200 dark:border-red-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold tabular-nums text-red-600">
                      {formatNumber(stats?.total_by_risk?.critical + stats?.total_by_risk?.high || 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">High Risk</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Link href="?verified=true">
            <Card className="cursor-pointer transition-all hover:shadow-md border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold tabular-nums text-green-600">
                      {formatPercentage(stats?.verified_percentage || 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Verified</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums">
                    {formatNumber(stats?.extraction_rate?.today || 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums">
                    {formatNumber(stats?.extraction_rate?.this_week || 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

function IntelligenceOverviewSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="h-16 animate-pulse bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="h-12 animate-pulse bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

### 3. frontend/components/intelligence/intelligence-list.tsx

```typescript
// Main intelligence list component
// Features:
// - Table and grid view
// - Bulk selection
// - Real-time search
// - Entity detail slide-over
// - Optimistic updates

'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  RowSelectionState,
  SortingState,
} from '@tanstack/react-table'
import { useIntelligence } from '@/lib/hooks/use-intelligence'
import { IntelligenceTable } from './intelligence-table'
import { IntelligenceGrid } from './intelligence-grid'
import { IntelligencePagination } from './intelligence-pagination'
import { EntityDetailPanel } from './entity-detail-panel'
import { IntelligenceEmpty } from './intelligence-empty'
import { IntelligenceListSkeleton } from './skeletons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { ExtractedEntity } from '@/types/entity'
import { EntityTypeBadge } from './entity-type-badge'
import { EntityRiskBadge } from './entity-risk-badge'
import { EntityConfidenceBar } from './entity-confidence-bar'
import { EntityVerificationBadge } from './entity-verification-badge'
import { EntityActionsMenu } from './entity-actions-menu'
import { EntityCopyButton } from './entity-copy-button'
import { formatEntityValue, maskSensitiveValue } from '@/lib/utils/entity-formatters'
import { formatRelativeTime } from '@/lib/utils/date'
import { cn } from '@/lib/utils/cn'
import { 
  ArrowUpDown, 
  Eye,
  ExternalLink
} from 'lucide-react'

interface IntelligenceListProps {
  initialFilters: Record<string, string | undefined>
}

export function IntelligenceList({ initialFilters }: IntelligenceListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Selected entity for detail panel
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null)
  const [showMasked, setShowMasked] = useState(true)
  
  // View mode from URL
  const viewMode = (searchParams.get('view') as 'table' | 'grid') || 'table'
  
  // Parse filters from URL
  const filters = useMemo(() => ({
    type: searchParams.get('type') || 'all',
    risk_level: searchParams.get('risk_level') || 'all',
    verified: searchParams.get('verified') === 'true' ? true : 
              searchParams.get('verified') === 'false' ? false : undefined,
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'created_at',
    order: (searchParams.get('order') as 'asc' | 'desc') || 'desc',
    page: parseInt(searchParams.get('page') || '1'),
    limit: 20,
  }), [searchParams])
  
  // Fetch intelligence data
  const { 
    data, 
    isLoading, 
    isError, 
    refetch 
  } = useIntelligence(filters)
  
  // Table state
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = useState<SortingState>([
    { id: filters.sort, desc: filters.order === 'desc' }
  ])
  
  // Selected entity IDs
  const selectedIds = useMemo(() => {
    if (!data?.entities) return []
    return Object.keys(rowSelection)
      .filter(key => rowSelection[key])
      .map(key => data.entities[parseInt(key)]?.id)
      .filter(Boolean)
  }, [rowSelection, data?.entities])
  
  // Get selected entity for detail panel
  const selectedEntity = useMemo(() => {
    if (!selectedEntityId || !data?.entities) return null
    return data.entities.find(e => e.id === selectedEntityId) || null
  }, [selectedEntityId, data?.entities])
  
  // Update URL when sorting changes
  const handleSortingChange = useCallback((newSorting: SortingState) => {
    setSorting(newSorting)
    if (newSorting.length > 0) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('sort', newSorting[0].id)
      params.set('order', newSorting[0].desc ? 'desc' : 'asc')
      router.push(`${pathname}?${params.toString()}`)
    }
  }, [searchParams, pathname, router])
  
  // Table columns definition
  const columns: ColumnDef<ExtractedEntity>[] = useMemo(() => [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          onClick={(e) => e.stopPropagation()}
        />
      ),
      enableSorting: false,
      size: 40,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => <EntityTypeBadge type={row.original.type} />,
      size: 130,
    },
    {
      accessorKey: 'value',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">
            {showMasked 
              ? maskSensitiveValue(row.original.value, row.original.type)
              : formatEntityValue(row.original.value, row.original.type)
            }
          </span>
          <EntityCopyButton value={row.original.value} />
        </div>
      ),
      size: 250,
    },
    {
      accessorKey: 'risk_score',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Risk
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <EntityRiskBadge score={row.original.risk_score} />,
      size: 100,
    },
    {
      accessorKey: 'confidence',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Confidence
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <EntityConfidenceBar confidence={row.original.confidence} />
      ),
      size: 120,
    },
    {
      accessorKey: 'occurrence_count',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Seen
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row.original.occurrence_count}x
        </Badge>
      ),
      size: 80,
    },
    {
      accessorKey: 'verified',
      header: 'Status',
      cell: ({ row }) => <EntityVerificationBadge verified={row.original.verified} />,
      size: 100,
    },
    {
      accessorKey: 'first_seen',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          First Seen
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {formatRelativeTime(row.original.first_seen)}
        </span>
      ),
      size: 120,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={() => setSelectedEntityId(row.original.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <EntityActionsMenu entity={row.original} />
        </div>
      ),
      size: 100,
    },
  ], [showMasked])
  
  // TanStack Table instance
  const table = useReactTable({
    data: data?.entities || [],
    columns,
    state: {
      rowSelection,
      sorting,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: handleSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount: data ? Math.ceil(data.total / filters.limit) : 0,
  })
  
  // Loading state
  if (isLoading) {
    return <IntelligenceListSkeleton />
  }
  
  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">Failed to load intelligence data</p>
        <Button variant="outline" className="mt-4" onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    )
  }
  
  // Empty state
  if (!data?.entities || data.entities.length === 0) {
    return <IntelligenceEmpty hasFilters={!!filters.search || filters.type !== 'all'} />
  }
  
  return (
    <>
      <div className="space-y-4">
        {/* Bulk actions bar */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between rounded-lg border bg-muted/50 p-3"
            >
              <span className="text-sm">
                <strong>{selectedIds.length}</strong> entities selected
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Export Selected
                </Button>
                <Button variant="outline" size="sm">
                  Verify Selected
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setRowSelection({})}
                >
                  Clear
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Mask toggle */}
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMasked(!showMasked)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {showMasked ? 'Show Full Values' : 'Mask Values'}
          </Button>
        </div>
        
        {/* Table or Grid view */}
        {viewMode === 'table' ? (
          <IntelligenceTable 
            table={table} 
            columns={columns}
            onRowClick={(entity) => setSelectedEntityId(entity.id)}
          />
        ) : (
          <IntelligenceGrid 
            entities={data.entities}
            selectedIds={selectedIds}
            showMasked={showMasked}
            onEntityClick={(entity) => setSelectedEntityId(entity.id)}
          />
        )}
        
        {/* Pagination */}
        <IntelligencePagination
          currentPage={filters.page}
          totalPages={Math.ceil(data.total / filters.limit)}
          totalItems={data.total}
          pageSize={filters.limit}
        />
      </div>
      
      {/* Entity Detail Slide-over */}
      <Sheet open={!!selectedEntityId} onOpenChange={() => setSelectedEntityId(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedEntity && (
            <EntityDetailPanel 
              entity={selectedEntity}
              onClose={() => setSelectedEntityId(null)}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
```

### 4. frontend/components/intelligence/entity-detail-panel.tsx

```typescript
// Entity detail slide-over panel
// Features:
// - Full entity information
// - Related sessions
// - Extraction timeline
// - Notes and annotations
// - Actions (verify, report, export, delete)

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Phone,
  CreditCard,
  Building2,
  Link as LinkIcon,
  Mail,
  Hash,
  Copy,
  Check,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Globe,
  Shield,
  FileText,
  Plus,
  Download,
  Flag,
  Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useEntityDetail, useAddEntityNote, useVerifyEntity, useDeleteEntity } from '@/lib/hooks/use-entity-detail'
import { RiskScoreGauge } from './risk-score-gauge'
import { ConfidenceMeter } from './confidence-meter'
import { EntityTypeBadge } from './entity-type-badge'
import { ExtractedEntity } from '@/types/entity'
import { formatEntityValue, getEntityIcon, getEntityColor } from '@/lib/utils/entity-formatters'
import { formatDateTime, formatRelativeTime } from '@/lib/utils/date'
import { cn } from '@/lib/utils/cn'
import { toast } from 'sonner'

interface EntityDetailPanelProps {
  entity: ExtractedEntity
  onClose: () => void
}

const entityIcons = {
  PHONE_NUMBER: Phone,
  UPI_ID: CreditCard,
  BANK_ACCOUNT: Building2,
  URL: LinkIcon,
  EMAIL: Mail,
  IFSC_CODE: Hash,
}

export function EntityDetailPanel({ entity, onClose }: EntityDetailPanelProps) {
  const [copied, setCopied] = useState(false)
  const [newNote, setNewNote] = useState('')
  
  // Fetch full entity details
  const { data: fullEntity, isLoading } = useEntityDetail(entity.id)
  const addNoteMutation = useAddEntityNote()
  const verifyMutation = useVerifyEntity()
  const deleteMutation = useDeleteEntity()
  
  const entityData = fullEntity || entity
  const Icon = entityIcons[entityData.type as keyof typeof entityIcons] || Hash
  const colorClass = getEntityColor(entityData.type)
  
  // Copy to clipboard
  const copyValue = async () => {
    await navigator.clipboard.writeText(entityData.value)
    setCopied(true)
    toast.success('Copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }
  
  // Add note
  const handleAddNote = async () => {
    if (!newNote.trim()) return
    
    try {
      await addNoteMutation.mutateAsync({
        entityId: entityData.id,
        content: newNote,
      })
      setNewNote('')
      toast.success('Note added')
    } catch {
      toast.error('Failed to add note')
    }
  }
  
  // Verify entity
  const handleVerify = async (verified: boolean) => {
    try {
      await verifyMutation.mutateAsync({
        entityId: entityData.id,
        verified,
        source: 'manual_review',
      })
      toast.success(verified ? 'Entity verified' : 'Verification removed')
    } catch {
      toast.error('Failed to update verification')
    }
  }
  
  // Delete entity
  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(entityData.id)
      toast.success('Entity deleted')
      onClose()
    } catch {
      toast.error('Failed to delete entity')
    }
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="space-y-4 pb-4">
        <div className="flex items-center gap-3">
          <div className={cn('rounded-lg p-3', colorClass.split(' ')[1])}>
            <Icon className={cn('h-6 w-6', colorClass.split(' ')[0])} />
          </div>
          <div>
            <EntityTypeBadge type={entityData.type} />
            <p className="text-xs text-muted-foreground mt-1">
              ID: {entityData.id.slice(0, 8)}...
            </p>
          </div>
        </div>
        
        {/* Value display */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <code className="text-lg font-mono font-bold break-all">
                {formatEntityValue(entityData.value, entityData.type)}
              </code>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyValue}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy to clipboard</TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Separator />
      
      <ScrollArea className="flex-1 py-4">
        <div className="space-y-6">
          {/* Risk, Confidence, Occurrences */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <RiskScoreGauge score={entityData.risk_score} size="sm" />
                <p className="text-xs text-muted-foreground mt-2">Risk Score</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <ConfidenceMeter confidence={entityData.confidence} size="sm" />
                <p className="text-xs text-muted-foreground mt-2">Confidence</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold">{entityData.occurrence_count}</p>
                <p className="text-xs text-muted-foreground mt-2">Sessions</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Verification Status */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Verification Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {entityData.verified ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-green-600">Verified Threat</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium text-yellow-600">Pending Verification</span>
                    </>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVerify(!entityData.verified)}
                  disabled={verifyMutation.isPending}
                >
                  {entityData.verified ? 'Remove' : 'Verify'}
                </Button>
              </div>
              {entityData.verification_source && (
                <p className="text-xs text-muted-foreground">
                  Source: {entityData.verification_source}
                </p>
              )}
            </CardContent>
          </Card>
          
          {/* Metadata */}
          {entityData.metadata && Object.keys(entityData.metadata).length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Metadata
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 text-sm">
                  {entityData.metadata.country_code && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Country</dt>
                      <dd className="font-medium flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {entityData.metadata.country_code}
                      </dd>
                    </div>
                  )}
                  {entityData.metadata.carrier && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Carrier</dt>
                      <dd className="font-medium">{entityData.metadata.carrier}</dd>
                    </div>
                  )}
                  {entityData.metadata.bank_name && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Bank</dt>
                      <dd className="font-medium">{entityData.metadata.bank_name}</dd>
                    </div>
                  )}
                  {entityData.metadata.domain && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Domain</dt>
                      <dd className="font-medium">{entityData.metadata.domain}</dd>
                    </div>
                  )}
                  {entityData.metadata.is_suspicious_domain && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Suspicious</dt>
                      <dd>
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Yes
                        </Badge>
                      </dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>
          )}
          
          {/* Associated Scam Types */}
          {entityData.analysis?.associated_scam_types?.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Associated Scam Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {entityData.analysis.associated_scam_types.map((type: string) => (
                    <Badge key={type} variant="secondary">
                      {type.replace(/_/g, ' ')}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Related Sessions */}
          {entityData.sessions?.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Related Sessions ({entityData.sessions.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {entityData.sessions.slice(0, 5).map((session: any) => (
                  <Link
                    key={session.id}
                    href={`/sessions/${session.id}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {session.scam_type.replace(/_/g, ' ')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatRelativeTime(session.timestamp)}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
                {entityData.sessions.length > 5 && (
                  <Button variant="ghost" size="sm" className="w-full">
                    View all {entityData.sessions.length} sessions
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Timeline */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">First Seen</span>
                  <span className="font-medium">{formatDateTime(entityData.first_seen)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Seen</span>
                  <span className="font-medium">{formatDateTime(entityData.last_seen)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium">{formatDateTime(entityData.created_at)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Similar Entities */}
          {entityData.analysis?.similar_entities?.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Similar Entities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {entityData.analysis.similar_entities.map((similar: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                  >
                    <code className="text-sm font-mono">{similar}</code>
                    <Badge variant="outline" className="text-xs">Similar</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
          
          {/* Notes */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Notes ({entityData.notes?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {entityData.notes?.map((note: any) => (
                <div key={note.id} className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm">{note.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {note.author} • {formatRelativeTime(note.created_at)}
                  </p>
                </div>
              ))}
              
              <div className="space-y-2">
                <Textarea
                  placeholder="Add a note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={2}
                />
                <Button
                  size="sm"
                  onClick={handleAddNote}
                  disabled={!newNote.trim() || addNoteMutation.isPending}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
      
      <Separator />
      
      {/* Actions */}
      <div className="pt-4 flex items-center gap-2">
        <Button variant="outline" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button variant="outline" className="flex-1">
          <Flag className="h-4 w-4 mr-2" />
          Report
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Entity</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this entity? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
```

### 5. frontend/components/intelligence/entity-type-badge.tsx

```typescript
// Entity type badge component
'use client'

import { 
  Phone, 
  CreditCard, 
  Building2, 
  Link as LinkIcon,
  Mail,
  Hash
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils/cn'

const typeConfig = {
  PHONE_NUMBER: {
    icon: Phone,
    label: 'Phone',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  },
  UPI_ID: {
    icon: CreditCard,
    label: 'UPI',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  },
  BANK_ACCOUNT: {
    icon: Building2,
    label: 'Bank',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
  },
  URL: {
    icon: LinkIcon,
    label: 'Link',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
  },
  EMAIL: {
    icon: Mail,
    label: 'Email',
    color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300',
  },
  IFSC_CODE: {
    icon: Hash,
    label: 'IFSC',
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
  },
}

interface EntityTypeBadgeProps {
  type: string
  showLabel?: boolean
}

export function EntityTypeBadge({ type, showLabel = true }: EntityTypeBadgeProps) {
  const config = typeConfig[type as keyof typeof typeConfig]
  
  if (!config) {
    return <Badge variant="secondary">{type}</Badge>
  }
  
  const Icon = config.icon
  
  return (
    <Badge variant="outline" className={cn('gap-1', config.color)}>
      <Icon className="h-3 w-3" />
      {showLabel && config.label}
    </Badge>
  )
}
```

### 6. frontend/components/intelligence/entity-risk-badge.tsx

```typescript
// Risk level badge component
'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils/cn'

interface EntityRiskBadgeProps {
  score: number
}

export function EntityRiskBadge({ score }: EntityRiskBadgeProps) {
  const getRiskLevel = (score: number) => {
    if (score >= 9) return { label: 'Critical', color: 'bg-red-600 text-white' }
    if (score >= 7) return { label: 'High', color: 'bg-red-500 text-white' }
    if (score >= 5) return { label: 'Medium', color: 'bg-orange-500 text-white' }
    if (score >= 3) return { label: 'Low', color: 'bg-yellow-500 text-black' }
    return { label: 'Minimal', color: 'bg-green-500 text-white' }
  }
  
  const { label, color } = getRiskLevel(score)
  
  return (
    <Badge className={cn('tabular-nums gap-1', color)}>
      <span className="font-bold">{score.toFixed(1)}</span>
    </Badge>
  )
}
```

### 7. frontend/components/intelligence/risk-score-gauge.tsx

```typescript
// Risk score gauge visualization
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface RiskScoreGaugeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
}

export function RiskScoreGauge({ score, size = 'md' }: RiskScoreGaugeProps) {
  const sizeConfig = {
    sm: { width: 60, stroke: 6, fontSize: 'text-xl' },
    md: { width: 80, stroke: 8, fontSize: 'text-2xl' },
    lg: { width: 120, stroke: 10, fontSize: 'text-4xl' },
  }
  
  const config = sizeConfig[size]
  const radius = (config.width - config.stroke) / 2
  const circumference = radius * 2 * Math.PI
  const progress = (score / 10) * circumference
  
  const getColor = (score: number) => {
    if (score >= 9) return '#dc2626' // red-600
    if (score >= 7) return '#ef4444' // red-500
    if (score >= 5) return '#f97316' // orange-500
    if (score >= 3) return '#eab308' // yellow-500
    return '#22c55e' // green-500
  }
  
  const color = getColor(score)
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={config.width}
        height={config.width}
        className="-rotate-90 transform"
      >
        {/* Background circle */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.stroke}
          className="text-muted"
        />
        {/* Progress circle */}
        <motion.circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn('font-bold', config.fontSize)} style={{ color }}>
          {score.toFixed(1)}
        </span>
      </div>
    </div>
  )
}
```

### 8. frontend/lib/hooks/use-intelligence.ts

```typescript
// Intelligence data hooks
'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { intelligenceApi } from '@/lib/api/intelligence'
import { IntelligenceFilters } from '@/types/filters'

// Query keys
export const intelligenceKeys = {
  all: ['intelligence'] as const,
  lists: () => [...intelligenceKeys.all, 'list'] as const,
  list: (filters: IntelligenceFilters) => [...intelligenceKeys.lists(), filters] as const,
  details: () => [...intelligenceKeys.all, 'detail'] as const,
  detail: (id: string) => [...intelligenceKeys.details(), id] as const,
  stats: () => [...intelligenceKeys.all, 'stats'] as const,
  search: (query: string) => [...intelligenceKeys.all, 'search', query] as const,
}

// Hook for intelligence list
export function useIntelligence(filters: IntelligenceFilters) {
  return useQuery({
    queryKey: intelligenceKeys.list(filters),
    queryFn: () => intelligenceApi.getIntelligence(filters),
    staleTime: 30000,
    placeholderData: (previousData) => previousData,
  })
}

// Hook for single entity
export function useEntityDetail(id: string) {
  return useQuery({
    queryKey: intelligenceKeys.detail(id),
    queryFn: () => intelligenceApi.getEntity(id),
    staleTime: 60000,
    enabled: !!id,
  })
}

// Hook for intelligence stats
export function useIntelligenceStats() {
  return useQuery({
    queryKey: intelligenceKeys.stats(),
    queryFn: intelligenceApi.getStats,
    staleTime: 60000,
  })
}

// Hook for entity search with autocomplete
export function useEntitySearch(query: string) {
  return useQuery({
    queryKey: intelligenceKeys.search(query),
    queryFn: () => intelligenceApi.searchEntities(query),
    staleTime: 10000,
    enabled: query.length >= 2,
  })
}

// Hook for prefetching
export function usePrefetchEntity() {
  const queryClient = useQueryClient()
  
  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: intelligenceKeys.detail(id),
      queryFn: () => intelligenceApi.getEntity(id),
    })
  }
}
```

### 9. frontend/lib/hooks/use-entity-detail.ts

```typescript
// Entity detail and mutation hooks
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { intelligenceApi } from '@/lib/api/intelligence'
import { intelligenceKeys } from './use-intelligence'
import { toast } from 'sonner'

// Hook for entity detail
export { useEntityDetail } from './use-intelligence'

// Hook for adding note
export function useAddEntityNote() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ entityId, content }: { entityId: string; content: string }) =>
      intelligenceApi.addNote(entityId, content),
    onSuccess: (_, { entityId }) => {
      queryClient.invalidateQueries({ queryKey: intelligenceKeys.detail(entityId) })
    },
  })
}

// Hook for verifying entity
export function useVerifyEntity() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ entityId, verified, source }: { 
      entityId: string
      verified: boolean
      source: string
    }) => intelligenceApi.verifyEntity(entityId, verified, source),
    onMutate: async ({ entityId, verified }) => {
      await queryClient.cancelQueries({ queryKey: intelligenceKeys.detail(entityId) })
      
      const previousEntity = queryClient.getQueryData(intelligenceKeys.detail(entityId))
      
      queryClient.setQueryData(intelligenceKeys.detail(entityId), (old: any) => ({
        ...old,
        verified,
      }))
      
      return { previousEntity }
    },
    onError: (err, { entityId }, context) => {
      queryClient.setQueryData(
        intelligenceKeys.detail(entityId),
        context?.previousEntity
      )
    },
    onSettled: (_, __, { entityId }) => {
      queryClient.invalidateQueries({ queryKey: intelligenceKeys.detail(entityId) })
      queryClient.invalidateQueries({ queryKey: intelligenceKeys.lists() })
    },
  })
}

// Hook for deleting entity
export function useDeleteEntity() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (entityId: string) => intelligenceApi.deleteEntity(entityId),
    onMutate: async (entityId) => {
      await queryClient.cancelQueries({ queryKey: intelligenceKeys.lists() })
      
      const previousData = queryClient.getQueriesData({ queryKey: intelligenceKeys.lists() })
      
      queryClient.setQueriesData({ queryKey: intelligenceKeys.lists() }, (old: any) => {
        if (!old) return old
        return {
          ...old,
          entities: old.entities.filter((e: any) => e.id !== entityId),
          total: old.total - 1,
        }
      })
      
      return { previousData }
    },
    onError: (err, entityId, context) => {
      context?.previousData?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
      toast.error('Failed to delete entity')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: intelligenceKeys.lists() })
      queryClient.invalidateQueries({ queryKey: intelligenceKeys.stats() })
    },
  })
}

// Hook for reporting entity
export function useReportEntity() {
  return useMutation({
    mutationFn: ({ entityId, reportType, details }: {
      entityId: string
      reportType: 'false_positive' | 'duplicate' | 'additional_info' | 'verified_scam'
      details: string
    }) => intelligenceApi.reportEntity(entityId, reportType, details),
    onSuccess: () => {
      toast.success('Report submitted')
    },
    onError: () => {
      toast.error('Failed to submit report')
    },
  })
}

// Hook for exporting entities
export function useExportEntities() {
  return useMutation({
    mutationFn: ({ entityIds, format, includeMetadata }: {
      entityIds?: string[]
      format: 'json' | 'csv' | 'stix' | 'misp'
      includeMetadata: boolean
    }) => intelligenceApi.exportEntities(entityIds, format, includeMetadata),
    onSuccess: (data) => {
      window.open(data.download_url, '_blank')
      toast.success('Export ready')
    },
    onError: () => {
      toast.error('Failed to export')
    },
  })
}
```

### 10. frontend/lib/api/intelligence.ts

```typescript
// Intelligence API functions
import { apiClient } from './client'
import { API_ENDPOINTS } from './endpoints'
import { ExtractedEntity, IntelligenceStats } from '@/types/entity'
import { IntelligenceFilters } from '@/types/filters'

export const intelligenceApi = {
  // Get intelligence list
  async getIntelligence(filters: IntelligenceFilters) {
    const params = {
      limit: filters.limit || 20,
      offset: ((filters.page || 1) - 1) * (filters.limit || 20),
      ...(filters.type && filters.type !== 'all' && { type: filters.type }),
      ...(filters.risk_level && filters.risk_level !== 'all' && { risk_level: filters.risk_level }),
      ...(filters.verified !== undefined && { verified: filters.verified }),
      ...(filters.search && { search: filters.search }),
      ...(filters.sort && { sort: filters.sort }),
      ...(filters.order && { order: filters.order }),
      ...(filters.date_from && { date_from: filters.date_from }),
      ...(filters.date_to && { date_to: filters.date_to }),
    }
    
    const { data } = await apiClient.get(API_ENDPOINTS.INTELLIGENCE, { params })
    return data
  },
  
  // Get single entity
  async getEntity(id: string): Promise<ExtractedEntity> {
    const { data } = await apiClient.get(`${API_ENDPOINTS.INTELLIGENCE}/${id}`)
    return data
  },
  
  // Get intelligence stats
  async getStats(): Promise<IntelligenceStats> {
    const { data } = await apiClient.get(`${API_ENDPOINTS.INTELLIGENCE}/stats`)
    return data
  },
  
  // Search entities
  async searchEntities(query: string, limit: number = 10) {
    const { data } = await apiClient.get(`${API_ENDPOINTS.INTELLIGENCE}/search`, {
      params: { q: query, limit }
    })
    return data
  },
  
  // Verify entity
  async verifyEntity(id: string, verified: boolean, source: string) {
    const { data } = await apiClient.post(`${API_ENDPOINTS.INTELLIGENCE}/${id}/verify`, {
      verified,
      source,
    })
    return data
  },
  
  // Report entity
  async reportEntity(id: string, reportType: string, details: string) {
    const { data } = await apiClient.post(`${API_ENDPOINTS.INTELLIGENCE}/${id}/report`, {
      report_type: reportType,
      details,
    })
    return data
  },
  
  // Add note
  async addNote(id: string, content: string) {
    const { data } = await apiClient.post(`${API_ENDPOINTS.INTELLIGENCE}/${id}/notes`, {
      content,
    })
    return data
  },
  
  // Delete entity
  async deleteEntity(id: string) {
    const { data } = await apiClient.delete(`${API_ENDPOINTS.INTELLIGENCE}/${id}`)
    return data
  },
  
  // Export entities
  async exportEntities(
    entityIds: string[] | undefined,
    format: 'json' | 'csv' | 'stix' | 'misp',
    includeMetadata: boolean
  ) {
    const { data } = await apiClient.post(`${API_ENDPOINTS.INTELLIGENCE}/export`, {
      entity_ids: entityIds,
      format,
      include_metadata: includeMetadata,
    })
    return data
  },
}
```

### 11. frontend/lib/utils/entity-formatters.ts

```typescript
// Entity display formatters and utilities

export function formatEntityValue(value: string, type: string): string {
  switch (type) {
    case 'PHONE_NUMBER':
      return formatPhoneNumber(value)
    case 'BANK_ACCOUNT':
      return formatBankAccount(value)
    case 'UPI_ID':
      return value.toLowerCase()
    case 'URL':
      return decodeURIComponent(value)
    case 'EMAIL':
      return value.toLowerCase()
    default:
      return value
  }
}

export function maskSensitiveValue(value: string, type: string): string {
  switch (type) {
    case 'PHONE_NUMBER':
      // Show first 4 and last 2 digits
      if (value.length > 6) {
        return value.slice(0, 4) + '****' + value.slice(-2)
      }
      return value
    case 'BANK_ACCOUNT':
      // Show first 4 and last 4 digits
      if (value.length > 8) {
        return value.slice(0, 4) + '****' + value.slice(-4)
      }
      return value
    case 'UPI_ID':
      // Show first part before @
      const parts = value.split('@')
      if (parts[0].length > 3) {
        return parts[0].slice(0, 3) + '***@' + parts[1]
      }
      return value
    case 'EMAIL':
      // Show first 2 chars and domain
      const emailParts = value.split('@')
      if (emailParts[0].length > 2) {
        return emailParts[0].slice(0, 2) + '***@' + emailParts[1]
      }
      return value
    default:
      return value
  }
}

function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '')
  
  // Indian format: +91 XXXXX XXXXX
  if (digits.startsWith('91') && digits.length === 12) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
  }
  
  // Already formatted or other format
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
  }
  
  return phone
}

function formatBankAccount(account: string): string {
  // Format in groups of 4
  const digits = account.replace(/\D/g, '')
  return digits.match(/.{1,4}/g)?.join(' ') || account
}

export function getEntityColor(type: string): string {
  const colors: Record<string, string> = {
    PHONE_NUMBER: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
    UPI_ID: 'text-green-600 bg-green-100 dark:bg-green-900/30',
    BANK_ACCOUNT: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
    URL: 'text-red-600 bg-red-100 dark:bg-red-900/30',
    EMAIL: 'text-pink-600 bg-pink-100 dark:bg-pink-900/30',
    IFSC_CODE: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
  }
  return colors[type] || 'text-gray-600 bg-gray-100'
}

export function getEntityIcon(type: string): string {
  const icons: Record<string, string> = {
    PHONE_NUMBER: '📞',
    UPI_ID: '💳',
    BANK_ACCOUNT: '🏦',
    URL: '🔗',
    EMAIL: '📧',
    IFSC_CODE: '🔢',
  }
  return icons[type] || '📄'
}
```

### 12. frontend/types/entity.ts

```typescript
// Entity TypeScript types

export interface ExtractedEntity {
  id: string
  type: 'PHONE_NUMBER' | 'UPI_ID' | 'BANK_ACCOUNT' | 'URL' | 'EMAIL' | 'IFSC_CODE'
  value: string
  normalized_value: string
  risk_score: number
  confidence: number
  verified: boolean
  verification_source?: string
  first_seen: string
  last_seen: string
  occurrence_count: number
  sessions?: Array<{
    id: string
    scam_type: string
    timestamp: string
  }>
  metadata?: {
    country_code?: string
    carrier?: string
    bank_name?: string
    domain?: string
    is_suspicious_domain?: boolean
    whois_data?: Record<string, any>
  }
  analysis?: {
    threat_level: string
    associated_scam_types: string[]
    pattern_matches: string[]
    similar_entities: string[]
  }
  notes?: Array<{
    id: string
    content: string
    author: string
    created_at: string
  }>
  created_at: string
  updated_at: string
}

export interface IntelligenceStats {
  total_entities: number
  total_by_type: Record<string, number>
  total_by_risk: Record<string, number>
  verified_percentage: number
  extraction_rate: {
    today: number
    this_week: number
    this_month: number
  }
  top_scam_types: Array<{ type: string; count: number }>
  trend: Array<{ date: string; count: number }>
  trends?: Record<string, number>
}

export interface EntitySearchResult {
  id: string
  type: string
  value: string
  risk_score: number
  highlight: string
}
```

## ADDITIONAL COMPONENTS TO CREATE

13. **intelligence-toolbar.tsx** - Search, filters toggle, view toggle, export
14. **intelligence-filters.tsx** - Advanced filter panel
15. **intelligence-search.tsx** - Global search with autocomplete
16. **intelligence-table.tsx** - Data table component
17. **intelligence-grid.tsx** - Grid/card view
18. **entity-card.tsx** - Entity card for grid view
19. **entity-row.tsx** - Entity row for table
20. **entity-confidence-bar.tsx** - Confidence progress bar
21. **entity-verification-badge.tsx** - Verification status badge
22. **entity-actions-menu.tsx** - Actions dropdown
23. **entity-copy-button.tsx** - Copy to clipboard button
24. **entity-report-dialog.tsx** - Report entity dialog
25. **entity-verify-dialog.tsx** - Verify entity dialog
26. **bulk-export-dialog.tsx** - Bulk export options
27. **intelligence-empty.tsx** - Empty state
28. **intelligence-pagination.tsx** - Pagination controls
29. **confidence-meter.tsx** - Confidence visualization
30. **entity-frequency-chart.tsx** - Frequency over time chart
31. **entity-source-chart.tsx** - Source distribution chart
32. **threat-network-graph.tsx** - Entity relationship visualization
33. **recent-extractions.tsx** - Recent extractions feed
34. **high-risk-entities.tsx** - High risk entities panel
35. **verification-queue.tsx** - Pending verification list
36. **skeletons.tsx** - All loading skeletons

## QUALITY REQUIREMENTS

1. **Security:**
   - Sensitive data masking option
   - No sensitive data in URLs
   - Secure clipboard operations

2. **Performance:**
   - Virtual scrolling for large lists
   - Optimistic updates
   - Efficient filtering

3. **Export Formats:**
   - JSON (full data)
   - CSV (tabular)
   - STIX 2.1 (threat intel standard)
   - MISP (malware sharing)

4. **Accessibility:**
   - Screen reader support
   - Keyboard navigation
   - High contrast mode

5. **Responsiveness:**
   - Mobile-optimized views
   - Collapsible panels
   - Touch-friendly

Create all 65+ files with complete, production-ready code. The Intelligence Center should be a professional threat intelligence management platform worthy of cybersecurity industry standards.

## ⏹️ END PROMPT 5 ═════════════════════════════════════════════════════════════

---

# ═══════════════════════════════════════════════════════════════════════════════
# ██████╗ ██████╗  ██████╗ ███╗   ███╗██████╗ ████████╗     ██████╗
# ██╔══██╗██╔══██╗██╔═══██╗████╗ ████║██╔══██╗╚══██╔══╝    ██╔════╝
# ██████╔╝██████╔╝██║   ██║██╔████╔██║██████╔╝   ██║       ███████╗
# ██╔═══╝ ██╔══██╗██║   ██║██║╚██╔╝██║██╔═══╝    ██║       ██╔═══██╗
# ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║██║        ██║       ╚██████╔╝
# ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝        ╚═╝        ╚═════╝
# ═══════════════════════════════════════════════════════════════════════════════

# PROMPT 6: Analytics & Reports

## 📦 Expected Output
| Output | Description |
|--------|-------------|
| `frontend/app/(dashboard)/analytics/page.tsx` | Analytics main page |
| `frontend/app/(dashboard)/analytics/loading.tsx` | Page loading skeleton |
| `frontend/app/(dashboard)/analytics/error.tsx` | Page error boundary |
| `frontend/app/(dashboard)/analytics/reports/page.tsx` | Reports page |
| `frontend/app/(dashboard)/analytics/reports/[id]/page.tsx` | Report detail page |
| `frontend/components/analytics/analytics-header.tsx` | Header with time range |
| `frontend/components/analytics/analytics-overview.tsx` | KPI overview section |
| `frontend/components/analytics/kpi-card.tsx` | Individual KPI card |
| `frontend/components/analytics/kpi-sparkline.tsx` | Mini sparkline chart |
| `frontend/components/analytics/time-range-selector.tsx` | Time range picker |
| `frontend/components/analytics/date-range-picker.tsx` | Custom date picker |
| `frontend/components/analytics/comparison-toggle.tsx` | Period comparison toggle |
| `frontend/components/analytics/sessions-over-time.tsx` | Line chart sessions |
| `frontend/components/analytics/scam-type-distribution.tsx` | Pie/Donut chart |
| `frontend/components/analytics/persona-effectiveness.tsx` | Bar chart personas |
| `frontend/components/analytics/entity-extraction-chart.tsx` | Stacked area chart |
| `frontend/components/analytics/hourly-activity-heatmap.tsx` | Activity heatmap |
| `frontend/components/analytics/geographic-heatmap.tsx` | India state map |
| `frontend/components/analytics/top-scam-sources.tsx` | Top sources table |
| `frontend/components/analytics/detection-funnel.tsx` | Conversion funnel |
| `frontend/components/analytics/risk-score-distribution.tsx` | Histogram chart |
| `frontend/components/analytics/response-time-chart.tsx` | Response latency |
| `frontend/components/analytics/success-rate-gauge.tsx` | Success gauge |
| `frontend/components/analytics/trend-comparison.tsx` | Period comparison |
| `frontend/components/analytics/scam-tactics-radar.tsx` | Radar chart |
| `frontend/components/analytics/engagement-metrics.tsx` | Engagement stats |
| `frontend/components/analytics/llm-performance.tsx` | LLM metrics panel |
| `frontend/components/analytics/cost-analysis.tsx` | API cost tracking |
| `frontend/components/analytics/anomaly-detection.tsx` | Anomaly alerts |
| `frontend/components/analytics/prediction-chart.tsx` | Trend prediction |
| `frontend/components/analytics/real-time-ticker.tsx` | Live stats ticker |
| `frontend/components/analytics/chart-container.tsx` | Reusable chart wrapper |
| `frontend/components/analytics/chart-tooltip.tsx` | Custom chart tooltip |
| `frontend/components/analytics/chart-legend.tsx` | Custom chart legend |
| `frontend/components/analytics/chart-actions.tsx` | Chart action buttons |
| `frontend/components/analytics/chart-loading.tsx` | Chart loading state |
| `frontend/components/analytics/chart-empty.tsx` | Chart empty state |
| `frontend/components/analytics/chart-error.tsx` | Chart error state |
| `frontend/components/analytics/export-chart-button.tsx` | Export chart image |
| `frontend/components/analytics/fullscreen-chart.tsx` | Fullscreen modal |
| `frontend/components/reports/reports-list.tsx` | Reports list |
| `frontend/components/reports/report-card.tsx` | Report card |
| `frontend/components/reports/report-builder.tsx` | Custom report builder |
| `frontend/components/reports/report-template-card.tsx` | Template card |
| `frontend/components/reports/report-preview.tsx` | Report preview |
| `frontend/components/reports/report-download.tsx` | Download options |
| `frontend/components/reports/scheduled-reports.tsx` | Scheduled reports |
| `frontend/components/reports/report-filters.tsx` | Report filters |
| `frontend/components/reports/executive-summary.tsx` | Executive summary |
| `frontend/components/reports/detailed-breakdown.tsx` | Detailed section |
| `frontend/components/reports/report-table.tsx` | Data table section |
| `frontend/components/reports/report-charts.tsx` | Embedded charts |
| `frontend/components/reports/report-insights.tsx` | AI insights section |
| `frontend/components/reports/report-recommendations.tsx` | Recommendations |
| `frontend/lib/hooks/use-analytics.ts` | Analytics data hook |
| `frontend/lib/hooks/use-analytics-filters.ts` | Filter state hook |
| `frontend/lib/hooks/use-chart-data.ts` | Chart data hook |
| `frontend/lib/hooks/use-time-range.ts` | Time range hook |
| `frontend/lib/hooks/use-comparison.ts` | Period comparison |
| `frontend/lib/hooks/use-reports.ts` | Reports hook |
| `frontend/lib/hooks/use-report-builder.ts` | Report builder hook |
| `frontend/lib/hooks/use-export-chart.ts` | Chart export hook |
| `frontend/lib/api/analytics.ts` | Analytics API |
| `frontend/lib/api/reports.ts` | Reports API |
| `frontend/lib/utils/chart-helpers.ts` | Chart utilities |
| `frontend/lib/utils/date-ranges.ts` | Date range helpers |
| `frontend/lib/utils/statistics.ts` | Statistical functions |
| `frontend/lib/utils/export-utils.ts` | Export utilities |
| `frontend/lib/utils/geo-data.ts` | India states data |
| `frontend/types/analytics.ts` | Analytics types |
| `frontend/types/reports.ts` | Reports types |
| `frontend/types/charts.ts` | Chart types |
| `frontend/lib/constants/chart-colors.ts` | Chart color palette |
| `frontend/lib/constants/time-ranges.ts` | Time range presets |
| `frontend/lib/stores/analytics-store.ts` | Zustand analytics store |
| **Total: 75+ files** | Complete analytics & reports system |

## ▶️ START PROMPT 6 ═══════════════════════════════════════════════════════════

Create a complete FAANG/MNC-level Analytics & Reports Dashboard for ScamShield Agentic Honeypot using Next.js 14, React, Recharts, and TanStack Query. This is an enterprise-grade analytics platform for India AI Impact Buildathon 2026.

## PROJECT CONTEXT

This is PROMPT 6 of the ScamShield frontend development. Previous prompts set up:
- PROMPT 1: Next.js 14 project with complete configuration
- PROMPT 2: UI Component Library (shadcn/ui)
- PROMPT 3: Dashboard Home Page
- PROMPT 4: Sessions Management
- PROMPT 5: Intelligence Center

Now we need to build a comprehensive Analytics & Reports system that provides:
- Interactive data visualizations
- Time-based trend analysis
- Scam type distribution insights
- Persona effectiveness metrics
- Geographic distribution (India states)
- Downloadable professional reports

This should match the quality of analytics platforms like Google Analytics, Mixpanel, Amplitude, or Datadog.

## BACKEND API ENDPOINTS (Already Built)

```typescript
// Analytics endpoints
GET /v1/analytics/overview
Query Params:
  - start_date: ISO string
  - end_date: ISO string
  - granularity: 'hour' | 'day' | 'week' | 'month'
  - compare_previous: boolean

Response: {
  summary: {
    total_sessions: number
    active_sessions: number
    completed_sessions: number
    failed_sessions: number
    total_entities: number
    verified_entities: number
    avg_session_duration: number
    avg_turns_per_session: number
    avg_entities_per_session: number
    success_rate: number
  }
  comparison?: {
    sessions_change: number
    entities_change: number
    success_rate_change: number
    duration_change: number
  }
  period: {
    start: string
    end: string
    days: number
  }
}

GET /v1/analytics/sessions-over-time
Query Params:
  - start_date: ISO string
  - end_date: ISO string
  - granularity: 'hour' | 'day' | 'week' | 'month'
  - group_by?: 'status' | 'scam_type' | 'persona'

Response: {
  data: Array<{
    timestamp: string
    total: number
    active?: number
    completed?: number
    failed?: number
    [key: string]: number | string | undefined
  }>
  total: number
}

GET /v1/analytics/scam-type-distribution
Query Params:
  - start_date: ISO string
  - end_date: ISO string

Response: {
  data: Array<{
    scam_type: string
    count: number
    percentage: number
    avg_turns: number
    avg_entities: number
    success_rate: number
    trend: number
  }>
  total: number
}

GET /v1/analytics/persona-effectiveness
Query Params:
  - start_date: ISO string
  - end_date: ISO string

Response: {
  data: Array<{
    persona: string
    total_sessions: number
    completed_sessions: number
    success_rate: number
    avg_turns: number
    avg_entities: number
    avg_duration: number
    effectiveness_score: number
  }>
}

GET /v1/analytics/entity-extraction
Query Params:
  - start_date: ISO string
  - end_date: ISO string
  - granularity: 'hour' | 'day' | 'week' | 'month'

Response: {
  data: Array<{
    timestamp: string
    PHONE_NUMBER: number
    UPI_ID: number
    BANK_ACCOUNT: number
    URL: number
    EMAIL: number
    IFSC_CODE: number
    total: number
  }>
  summary: {
    total: number
    by_type: Record<string, number>
    high_confidence: number
  }
}

GET /v1/analytics/geographic-distribution
Query Params:
  - start_date: ISO string
  - end_date: ISO string

Response: {
  data: Array<{
    state: string
    state_code: string
    count: number
    percentage: number
    top_scam_types: string[]
  }>
  total: number
}

GET /v1/analytics/hourly-activity
Query Params:
  - start_date: ISO string
  - end_date: ISO string

Response: {
  data: Array<{
    day: number  // 0-6 (Sunday-Saturday)
    hour: number // 0-23
    count: number
    avg_duration: number
  }>
}

GET /v1/analytics/risk-distribution
Query Params:
  - start_date: ISO string
  - end_date: ISO string

Response: {
  data: Array<{
    range: string  // "0-2", "2-4", "4-6", "6-8", "8-10"
    count: number
    percentage: number
  }>
  avg_risk_score: number
  median_risk_score: number
}

GET /v1/analytics/llm-performance
Query Params:
  - start_date: ISO string
  - end_date: ISO string

Response: {
  total_calls: number
  avg_latency_ms: number
  p95_latency_ms: number
  p99_latency_ms: number
  error_rate: number
  total_tokens: number
  total_cost_usd: number
  by_model: Array<{
    model: string
    calls: number
    avg_latency: number
    tokens: number
    cost: number
  }>
}

GET /v1/analytics/detection-funnel
Response: {
  stages: Array<{
    name: string
    count: number
    conversion_rate: number
  }>
}

// Reports endpoints
GET /v1/reports
Query Params:
  - type?: 'daily' | 'weekly' | 'monthly' | 'custom'
  - status?: 'pending' | 'generated' | 'failed'
  
Response: {
  reports: Array<{
    id: string
    name: string
    type: string
    status: string
    created_at: string
    download_url?: string
    expires_at?: string
  }>
}

POST /v1/reports/generate
Body: {
  type: 'daily' | 'weekly' | 'monthly' | 'custom'
  name: string
  start_date: string
  end_date: string
  sections: string[]
  format: 'pdf' | 'xlsx' | 'csv'
  include_charts: boolean
}

Response: {
  report_id: string
  status: 'pending'
  estimated_time: number
}

GET /v1/reports/:id
Response: Report details with download URL
```

## TECHNICAL REQUIREMENTS

### Stack
- **Framework:** Next.js 14 (App Router, Server Components)
- **Charts:** Recharts for data visualization
- **State Management:** TanStack Query + Zustand
- **Date Handling:** date-fns for date operations
- **Export:** html2canvas, jspdf for exports
- **Animations:** Framer Motion for interactions

### Design Requirements
- **Dark/Light Mode:** Full support with chart theme switching
- **Responsive:** Charts resize gracefully on mobile
- **Accessibility:** Accessible chart alternatives, keyboard nav
- **Performance:** Lazy loading, data memoization
- **Interactivity:** Tooltips, zoom, pan, drill-down

## ANALYTICS DASHBOARD LAYOUT

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  📊 Analytics                                                                │
│  Comprehensive insights into scam detection operations                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ [Today] [7 Days] [30 Days] [90 Days] [Custom 📅]  [Compare: ✓] [⬇️]    ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │ 📊 Sessions  │ │ 🧠 Entities  │ │ ✅ Success   │ │ ⏱️ Avg Time  │       │
│  │    1,234     │ │    3,456     │ │    87.5%     │ │   12m 34s    │       │
│  │ ↑12% ▁▂▃▅▆█ │ │ ↑8%  ▁▂▃▄▆█ │ │ ↑2%  ▅▆▇▇█▇ │ │ ↓5%  █▇▆▅▄▃ │       │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                                              │
│  ┌─────────────────────────────────────────┐ ┌─────────────────────────────┐│
│  │ 📈 SESSIONS OVER TIME                   │ │ 🥧 SCAM TYPE DISTRIBUTION   ││
│  │                                         │ │                             ││
│  │     ▲                                   │ │      ╭─────────────╮       ││
│  │   ╱ ╲    ╱╲                            │ │    ╭─╯  KYC 35%    ╰─╮     ││
│  │  ╱   ╲  ╱  ╲   ╱╲                      │ │   ╭╯               ╰╮    ││
│  │ ╱     ╲╱    ╲ ╱  ╲                     │ │   │  Lottery 25%    │    ││
│  │╱             ╲    ╲                    │ │   ╰╮ Investment 20%╭╯    ││
│  │                                         │ │    ╰─╮  Other 20% ╭─╯     ││
│  │ Mon Tue Wed Thu Fri Sat Sun            │ │      ╰─────────────╯       ││
│  │                                         │ │                             ││
│  │ [Zoom] [Pan] [Reset] [⛶]              │ │ [Show All] [⛶]             ││
│  └─────────────────────────────────────────┘ └─────────────────────────────┘│
│                                                                              │
│  ┌─────────────────────────────────────────┐ ┌─────────────────────────────┐│
│  │ 🤖 PERSONA EFFECTIVENESS                │ │ 📍 GEOGRAPHIC DISTRIBUTION  ││
│  │                                         │ │                             ││
│  │ elderly_victim    ████████████ 92%     │ │    ┌─────────────────┐     ││
│  │ tech_novice       ██████████░░ 85%     │ │    │   INDIA MAP     │     ││
│  │ eager_investor    █████████░░░ 78%     │ │    │   with state    │     ││
│  │ curious_user      ████████░░░░ 71%     │ │    │   heatmap       │     ││
│  │ confused_senior   ███████░░░░░ 65%     │ │    └─────────────────┘     ││
│  │                                         │ │                             ││
│  │ Sorted by: [Effectiveness ▼]           │ │ Top: Maharashtra (23%)      ││
│  └─────────────────────────────────────────┘ └─────────────────────────────┘│
│                                                                              │
│  ┌─────────────────────────────────────────┐ ┌─────────────────────────────┐│
│  │ 📊 ENTITY EXTRACTION TRENDS             │ │ 🕐 ACTIVITY HEATMAP         ││
│  │                                         │ │                             ││
│  │ ▓▓▓▓▓▓▓▓▓▓ Phone                       │ │    0  4  8  12 16 20       ││
│  │ ░░░▓▓▓▓▓▓░ UPI                         │ │ Su ░░░▓▓▓▓▓▓░░░░░░        ││
│  │ ░░░░░░▓▓▓▓ Bank                        │ │ Mo ░░░▓▓▓████████░        ││
│  │ ░░░░░░░░▓▓ Link                        │ │ Tu ░░░▓▓▓████████░        ││
│  │ ░░░░░░░░░░ Email                       │ │ We ░░░▓▓▓████████░        ││
│  │                                         │ │ Th ░░░▓▓▓████████░        ││
│  │ Jan  Feb  Mar  Apr  May  Jun           │ │ Fr ░░░▓▓▓██████░░░        ││
│  └─────────────────────────────────────────┘ │ Sa ░░░▓▓▓▓▓▓░░░░░        ││
│                                              └─────────────────────────────┘│
│                                                                              │
│  ┌─────────────────────────────────────────┐ ┌─────────────────────────────┐│
│  │ 🎯 DETECTION FUNNEL                     │ │ 🧪 LLM PERFORMANCE          ││
│  │                                         │ │                             ││
│  │ Incoming          ████████████ 1,234   │ │ Avg Latency: 245ms          ││
│  │ Detected          █████████░░░   987   │ │ P95 Latency: 520ms          ││
│  │ Engaged           ███████░░░░░   756   │ │ Error Rate:  0.2%           ││
│  │ Intel Extracted   █████░░░░░░░   523   │ │ Total Tokens: 1.2M          ││
│  │ Verified          ███░░░░░░░░░   312   │ │ Est. Cost: $45.67           ││
│  │                                         │ │                             ││
│  │ Conversion: 25.3%                       │ │ [View Details]              ││
│  └─────────────────────────────────────────┘ └─────────────────────────────┘│
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ 📋 GENERATE REPORT  [Daily ▼] [PDF ▼]                     [Generate 📄]││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## COMPONENT SPECIFICATIONS

### 1. frontend/app/(dashboard)/analytics/page.tsx

```typescript
// Analytics main page - Server Component with client islands
// Features:
// - Server-side initial data fetch
// - Time range selector
// - Multiple chart sections
// - Report generation

import { Suspense } from 'react'
import { Metadata } from 'next'
import { AnalyticsHeader } from '@/components/analytics/analytics-header'
import { AnalyticsOverview } from '@/components/analytics/analytics-overview'
import { SessionsOverTime } from '@/components/analytics/sessions-over-time'
import { ScamTypeDistribution } from '@/components/analytics/scam-type-distribution'
import { PersonaEffectiveness } from '@/components/analytics/persona-effectiveness'
import { GeographicHeatmap } from '@/components/analytics/geographic-heatmap'
import { EntityExtractionChart } from '@/components/analytics/entity-extraction-chart'
import { HourlyActivityHeatmap } from '@/components/analytics/hourly-activity-heatmap'
import { DetectionFunnel } from '@/components/analytics/detection-funnel'
import { LLMPerformance } from '@/components/analytics/llm-performance'
import { ReportGenerator } from '@/components/reports/report-generator'
import { 
  AnalyticsOverviewSkeleton,
  ChartSkeleton 
} from '@/components/analytics/skeletons'

export const metadata: Metadata = {
  title: 'Analytics | ScamShield',
  description: 'Comprehensive analytics and insights for scam detection operations',
}

interface AnalyticsPageProps {
  searchParams: {
    range?: string
    start?: string
    end?: string
    compare?: string
  }
}

export default function AnalyticsPage({ searchParams }: AnalyticsPageProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header with time range selector */}
      <AnalyticsHeader />
      
      {/* KPI Overview Cards */}
      <Suspense fallback={<AnalyticsOverviewSkeleton />}>
        <AnalyticsOverview />
      </Suspense>
      
      {/* Charts Grid - Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense fallback={<ChartSkeleton />}>
          <SessionsOverTime />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <ScamTypeDistribution />
        </Suspense>
      </div>
      
      {/* Charts Grid - Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense fallback={<ChartSkeleton />}>
          <PersonaEffectiveness />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <GeographicHeatmap />
        </Suspense>
      </div>
      
      {/* Charts Grid - Row 3 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense fallback={<ChartSkeleton />}>
          <EntityExtractionChart />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <HourlyActivityHeatmap />
        </Suspense>
      </div>
      
      {/* Charts Grid - Row 4 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense fallback={<ChartSkeleton />}>
          <DetectionFunnel />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <LLMPerformance />
        </Suspense>
      </div>
      
      {/* Report Generator */}
      <ReportGenerator />
    </div>
  )
}
```

### 2. frontend/components/analytics/analytics-header.tsx

```typescript
// Analytics header with time range selector
// Features:
// - Preset time ranges
// - Custom date picker
// - Period comparison toggle
// - Export all button

'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { format, subDays, subMonths, startOfDay, endOfDay } from 'date-fns'
import { 
  Calendar as CalendarIcon,
  Download,
  RefreshCw,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAnalyticsStore } from '@/lib/stores/analytics-store'
import { TIME_RANGES, TimeRangeKey } from '@/lib/constants/time-ranges'
import { cn } from '@/lib/utils/cn'
import { DateRange } from 'react-day-picker'

export function AnalyticsHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const { 
    timeRange, 
    setTimeRange, 
    customRange, 
    setCustomRange,
    compareEnabled,
    setCompareEnabled,
    refreshData
  } = useAnalyticsStore()
  
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  // Handle time range change
  const handleTimeRangeChange = useCallback((range: TimeRangeKey) => {
    setTimeRange(range)
    const params = new URLSearchParams(searchParams.toString())
    params.set('range', range)
    params.delete('start')
    params.delete('end')
    router.push(`${pathname}?${params.toString()}`)
  }, [searchParams, pathname, router, setTimeRange])
  
  // Handle custom date range
  const handleCustomRange = useCallback((range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      setCustomRange(range)
      setTimeRange('custom')
      const params = new URLSearchParams(searchParams.toString())
      params.set('range', 'custom')
      params.set('start', range.from.toISOString())
      params.set('end', range.to.toISOString())
      router.push(`${pathname}?${params.toString()}`)
    }
  }, [searchParams, pathname, router, setCustomRange, setTimeRange])
  
  // Handle comparison toggle
  const handleCompareToggle = useCallback((enabled: boolean) => {
    setCompareEnabled(enabled)
    const params = new URLSearchParams(searchParams.toString())
    if (enabled) {
      params.set('compare', 'true')
    } else {
      params.delete('compare')
    }
    router.push(`${pathname}?${params.toString()}`)
  }, [searchParams, pathname, router, setCompareEnabled])
  
  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await refreshData()
    setTimeout(() => setIsRefreshing(false), 500)
  }, [refreshData])
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive insights into scam detection operations
        </p>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Time Range Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Preset Ranges */}
          <div className="flex rounded-lg border bg-muted p-1">
            {Object.entries(TIME_RANGES).slice(0, 4).map(([key, config]) => (
              <Button
                key={key}
                variant={timeRange === key ? 'secondary' : 'ghost'}
                size="sm"
                className="h-8 px-3"
                onClick={() => handleTimeRangeChange(key as TimeRangeKey)}
              >
                {config.label}
              </Button>
            ))}
            
            {/* Custom Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={timeRange === 'custom' ? 'secondary' : 'ghost'}
                  size="sm"
                  className="h-8 px-3"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {timeRange === 'custom' && customRange?.from && customRange?.to
                    ? `${format(customRange.from, 'MMM d')} - ${format(customRange.to, 'MMM d')}`
                    : 'Custom'
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={customRange?.from || new Date()}
                  selected={customRange}
                  onSelect={handleCustomRange}
                  numberOfMonths={2}
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Compare Toggle */}
          <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5">
            <Switch
              id="compare"
              checked={compareEnabled}
              onCheckedChange={handleCompareToggle}
              className="h-5 w-9"
            />
            <Label htmlFor="compare" className="text-sm cursor-pointer">
              Compare
            </Label>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={cn('mr-2 h-4 w-4', isRefreshing && 'animate-spin')} />
            Refresh
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export as PNG</DropdownMenuItem>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Schedule Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
```

### 3. frontend/components/analytics/analytics-overview.tsx

```typescript
// KPI overview section with sparklines
// Features:
// - Key metrics cards
// - Mini sparkline charts
// - Comparison indicators
// - Animated counters

'use client'

import { motion } from 'framer-motion'
import { 
  Activity,
  Brain,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { KPISparkline } from './kpi-sparkline'
import { useAnalyticsOverview } from '@/lib/hooks/use-analytics'
import { useAnalyticsStore } from '@/lib/stores/analytics-store'
import { formatNumber, formatPercentage, formatDuration } from '@/lib/utils/format'
import { cn } from '@/lib/utils/cn'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const kpiConfig = [
  {
    key: 'total_sessions',
    label: 'Total Sessions',
    icon: Activity,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    format: 'number',
    comparisonKey: 'sessions_change',
  },
  {
    key: 'total_entities',
    label: 'Entities Extracted',
    icon: Brain,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    format: 'number',
    comparisonKey: 'entities_change',
  },
  {
    key: 'success_rate',
    label: 'Success Rate',
    icon: CheckCircle2,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    format: 'percentage',
    comparisonKey: 'success_rate_change',
  },
  {
    key: 'avg_session_duration',
    label: 'Avg Duration',
    icon: Clock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    format: 'duration',
    comparisonKey: 'duration_change',
    invertTrend: true, // Lower is better
  },
]

export function AnalyticsOverview() {
  const { compareEnabled } = useAnalyticsStore()
  const { data, isLoading } = useAnalyticsOverview()
  
  if (isLoading) {
    return <AnalyticsOverviewSkeleton />
  }
  
  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'percentage':
        return formatPercentage(value)
      case 'duration':
        return formatDuration(value)
      default:
        return formatNumber(value)
    }
  }
  
  const getTrendIcon = (change: number, invert: boolean = false) => {
    const isPositive = invert ? change < 0 : change > 0
    const isNeutral = change === 0
    
    if (isNeutral) return <Minus className="h-4 w-4 text-muted-foreground" />
    if (isPositive) return <TrendingUp className="h-4 w-4 text-green-500" />
    return <TrendingDown className="h-4 w-4 text-red-500" />
  }
  
  const getTrendColor = (change: number, invert: boolean = false) => {
    const isPositive = invert ? change < 0 : change > 0
    const isNeutral = change === 0
    
    if (isNeutral) return 'text-muted-foreground'
    if (isPositive) return 'text-green-500'
    return 'text-red-500'
  }
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4 grid-cols-2 lg:grid-cols-4"
    >
      {kpiConfig.map((kpi) => {
        const value = data?.summary?.[kpi.key as keyof typeof data.summary] || 0
        const change = compareEnabled 
          ? data?.comparison?.[kpi.comparisonKey as keyof typeof data.comparison] || 0
          : null
        
        return (
          <motion.div key={kpi.key} variants={itemVariants}>
            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {kpi.label}
                    </p>
                    <p className="text-3xl font-bold tabular-nums">
                      {formatValue(value as number, kpi.format)}
                    </p>
                    
                    {/* Comparison indicator */}
                    {change !== null && (
                      <div className={cn(
                        'flex items-center gap-1 text-sm',
                        getTrendColor(change, kpi.invertTrend)
                      )}>
                        {getTrendIcon(change, kpi.invertTrend)}
                        <span>{Math.abs(change).toFixed(1)}%</span>
                        <span className="text-muted-foreground">vs prev</span>
                      </div>
                    )}
                  </div>
                  
                  <div className={cn('rounded-lg p-2', kpi.bgColor)}>
                    <kpi.icon className={cn('h-5 w-5', kpi.color)} />
                  </div>
                </div>
                
                {/* Sparkline */}
                <div className="mt-4 h-12">
                  <KPISparkline 
                    dataKey={kpi.key}
                    color={kpi.color.replace('text-', '')}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function AnalyticsOverviewSkeleton() {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-8 w-32 bg-muted animate-pulse rounded" />
              <div className="h-12 w-full bg-muted animate-pulse rounded" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

### 4. frontend/components/analytics/sessions-over-time.tsx

```typescript
// Sessions over time line chart
// Features:
// - Interactive line chart
// - Multiple series (by status)
// - Zoom and pan
// - Tooltip with details
// - Export and fullscreen

'use client'

import { useState, useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  ReferenceLine
} from 'recharts'
import { format, parseISO } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChartContainer } from './chart-container'
import { ChartTooltip } from './chart-tooltip'
import { ChartActions } from './chart-actions'
import { useSessionsOverTime } from '@/lib/hooks/use-analytics'
import { CHART_COLORS } from '@/lib/constants/chart-colors'
import { cn } from '@/lib/utils/cn'

type GroupBy = 'none' | 'status' | 'scam_type' | 'persona'

export function SessionsOverTime() {
  const [groupBy, setGroupBy] = useState<GroupBy>('status')
  const { data, isLoading, error } = useSessionsOverTime({ groupBy })
  
  // Transform data for chart
  const chartData = useMemo(() => {
    if (!data?.data) return []
    
    return data.data.map((item: any) => ({
      ...item,
      date: format(parseISO(item.timestamp), 'MMM d'),
      fullDate: format(parseISO(item.timestamp), 'MMM d, yyyy'),
    }))
  }, [data])
  
  // Determine which lines to show based on groupBy
  const lines = useMemo(() => {
    if (groupBy === 'none') {
      return [{ key: 'total', name: 'Total Sessions', color: CHART_COLORS.primary }]
    }
    
    if (groupBy === 'status') {
      return [
        { key: 'active', name: 'Active', color: CHART_COLORS.success },
        { key: 'completed', name: 'Completed', color: CHART_COLORS.info },
        { key: 'failed', name: 'Failed', color: CHART_COLORS.danger },
      ]
    }
    
    // Dynamic lines for scam_type or persona
    if (chartData.length > 0) {
      const keys = Object.keys(chartData[0]).filter(
        k => !['timestamp', 'date', 'fullDate', 'total'].includes(k)
      )
      return keys.map((key, i) => ({
        key,
        name: key.replace(/_/g, ' '),
        color: Object.values(CHART_COLORS)[i % Object.values(CHART_COLORS).length],
      }))
    }
    
    return []
  }, [groupBy, chartData])
  
  // Calculate average for reference line
  const average = useMemo(() => {
    if (!chartData.length) return 0
    const sum = chartData.reduce((acc: number, item: any) => acc + (item.total || 0), 0)
    return Math.round(sum / chartData.length)
  }, [chartData])
  
  return (
    <ChartContainer
      title="Sessions Over Time"
      description="Track session volume and trends"
      isLoading={isLoading}
      error={error}
      actions={
        <div className="flex items-center gap-2">
          <Select value={groupBy} onValueChange={(v) => setGroupBy(v as GroupBy)}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Total</SelectItem>
              <SelectItem value="status">By Status</SelectItem>
              <SelectItem value="scam_type">By Scam Type</SelectItem>
              <SelectItem value="persona">By Persona</SelectItem>
            </SelectContent>
          </Select>
          <ChartActions chartId="sessions-over-time" />
        </div>
      }
    >
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="date" 
            className="text-xs"
            tick={{ fill: 'currentColor' }}
          />
          <YAxis 
            className="text-xs"
            tick={{ fill: 'currentColor' }}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend />
          
          {/* Average reference line */}
          {groupBy === 'none' && (
            <ReferenceLine 
              y={average} 
              stroke={CHART_COLORS.muted}
              strokeDasharray="5 5"
              label={{ value: `Avg: ${average}`, position: 'right', fill: 'currentColor' }}
            />
          )}
          
          {/* Dynamic lines */}
          {lines.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              name={line.name}
              stroke={line.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          ))}
          
          {/* Brush for zoom */}
          <Brush 
            dataKey="date" 
            height={30} 
            stroke={CHART_COLORS.primary}
            fill="transparent"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
```

### 5. frontend/components/analytics/scam-type-distribution.tsx

```typescript
// Scam type distribution pie/donut chart
// Features:
// - Interactive donut chart
// - Legend with percentages
// - Click to filter
// - Hover details

'use client'

import { useState, useMemo, useCallback } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
  Legend,
  Tooltip
} from 'recharts'
import { ChartContainer } from './chart-container'
import { ChartActions } from './chart-actions'
import { useScamTypeDistribution } from '@/lib/hooks/use-analytics'
import { SCAM_TYPE_COLORS } from '@/lib/constants/chart-colors'
import { formatNumber, formatPercentage } from '@/lib/utils/format'

// Custom active shape for hover effect
const renderActiveShape = (props: any) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value
  } = props
  
  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" className="fill-foreground text-lg font-bold">
        {payload.scam_type.replace(/_/g, ' ')}
      </text>
      <text x={cx} y={cy + 15} textAnchor="middle" className="fill-muted-foreground text-sm">
        {formatNumber(value)} ({formatPercentage(percent * 100)})
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 5}
        outerRadius={innerRadius - 2}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  )
}

// Custom legend
const renderLegend = (props: any) => {
  const { payload } = props
  
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">
            {entry.value.replace(/_/g, ' ')}
          </span>
          <span className="text-sm font-medium">
            {formatPercentage(entry.payload.percentage)}
          </span>
        </div>
      ))}
    </div>
  )
}

export function ScamTypeDistribution() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
  const { data, isLoading, error } = useScamTypeDistribution()
  
  const chartData = useMemo(() => {
    if (!data?.data) return []
    return data.data.map((item: any, index: number) => ({
      ...item,
      fill: SCAM_TYPE_COLORS[item.scam_type] || SCAM_TYPE_COLORS.OTHER,
    }))
  }, [data])
  
  const onPieEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index)
  }, [])
  
  const onPieLeave = useCallback(() => {
    setActiveIndex(undefined)
  }, [])
  
  return (
    <ChartContainer
      title="Scam Type Distribution"
      description="Breakdown of detected scam categories"
      isLoading={isLoading}
      error={error}
      actions={<ChartActions chartId="scam-type-distribution" />}
    >
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="count"
            nameKey="scam_type"
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {chartData.map((entry: any, index: number) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.fill}
                className="cursor-pointer transition-opacity hover:opacity-80"
              />
            ))}
          </Pie>
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
```

### 6. frontend/components/analytics/persona-effectiveness.tsx

```typescript
// Persona effectiveness horizontal bar chart
// Features:
// - Horizontal bar chart
// - Effectiveness score
// - Sort options
// - Detailed metrics

'use client'

import { useState, useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts'
import { ChartContainer } from './chart-container'
import { ChartActions } from './chart-actions'
import { ChartTooltip } from './chart-tooltip'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePersonaEffectiveness } from '@/lib/hooks/use-analytics'
import { PERSONA_COLORS } from '@/lib/constants/chart-colors'
import { formatPercentage } from '@/lib/utils/format'

type SortBy = 'effectiveness_score' | 'success_rate' | 'total_sessions' | 'avg_entities'

export function PersonaEffectiveness() {
  const [sortBy, setSortBy] = useState<SortBy>('effectiveness_score')
  const { data, isLoading, error } = usePersonaEffectiveness()
  
  const chartData = useMemo(() => {
    if (!data?.data) return []
    
    return [...data.data]
      .sort((a: any, b: any) => b[sortBy] - a[sortBy])
      .map((item: any) => ({
        ...item,
        persona_label: item.persona.replace(/_/g, ' '),
        fill: PERSONA_COLORS[item.persona] || PERSONA_COLORS.default,
      }))
  }, [data, sortBy])
  
  // Custom label
  const renderLabel = (props: any) => {
    const { x, y, width, value } = props
    return (
      <text
        x={x + width + 5}
        y={y + 12}
        className="fill-muted-foreground text-xs"
      >
        {formatPercentage(value)}
      </text>
    )
  }
  
  return (
    <ChartContainer
      title="Persona Effectiveness"
      description="Compare persona performance metrics"
      isLoading={isLoading}
      error={error}
      actions={
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortBy)}>
            <SelectTrigger className="w-40 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="effectiveness_score">Effectiveness</SelectItem>
              <SelectItem value="success_rate">Success Rate</SelectItem>
              <SelectItem value="total_sessions">Sessions</SelectItem>
              <SelectItem value="avg_entities">Avg Entities</SelectItem>
            </SelectContent>
          </Select>
          <ChartActions chartId="persona-effectiveness" />
        </div>
      }
    >
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 60, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
          <XAxis 
            type="number" 
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            className="text-xs"
          />
          <YAxis 
            type="category" 
            dataKey="persona_label"
            className="text-xs"
            width={90}
          />
          <Tooltip content={<PersonaTooltip />} />
          <Bar 
            dataKey={sortBy === 'total_sessions' ? 'success_rate' : sortBy}
            radius={[0, 4, 4, 0]}
            maxBarSize={30}
          >
            {chartData.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <LabelList 
              dataKey={sortBy === 'total_sessions' ? 'success_rate' : sortBy}
              content={renderLabel}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

// Custom tooltip for persona details
function PersonaTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  
  const data = payload[0].payload
  
  return (
    <div className="bg-popover border rounded-lg shadow-lg p-3 space-y-2">
      <p className="font-medium">{data.persona_label}</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        <span className="text-muted-foreground">Sessions:</span>
        <span className="font-medium">{data.total_sessions}</span>
        <span className="text-muted-foreground">Success Rate:</span>
        <span className="font-medium">{formatPercentage(data.success_rate)}</span>
        <span className="text-muted-foreground">Avg Turns:</span>
        <span className="font-medium">{data.avg_turns.toFixed(1)}</span>
        <span className="text-muted-foreground">Avg Entities:</span>
        <span className="font-medium">{data.avg_entities.toFixed(1)}</span>
        <span className="text-muted-foreground">Effectiveness:</span>
        <span className="font-medium">{formatPercentage(data.effectiveness_score)}</span>
      </div>
    </div>
  )
}
```

### 7. frontend/components/analytics/geographic-heatmap.tsx

```typescript
// Geographic heatmap for India states
// Features:
// - SVG India map
// - State-level heatmap
// - Hover tooltips
// - Click to filter

'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChartContainer } from './chart-container'
import { ChartActions } from './chart-actions'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useGeographicDistribution } from '@/lib/hooks/use-analytics'
import { INDIA_STATES_PATH } from '@/lib/utils/geo-data'
import { formatNumber, formatPercentage } from '@/lib/utils/format'
import { cn } from '@/lib/utils/cn'

// Color scale for heatmap
const getHeatColor = (percentage: number) => {
  if (percentage >= 20) return '#dc2626' // red-600
  if (percentage >= 15) return '#ea580c' // orange-600
  if (percentage >= 10) return '#d97706' // amber-600
  if (percentage >= 5) return '#ca8a04'  // yellow-600
  if (percentage >= 2) return '#65a30d'  // lime-600
  return '#16a34a' // green-600
}

export function GeographicHeatmap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const { data, isLoading, error } = useGeographicDistribution()
  
  const stateData = useMemo(() => {
    if (!data?.data) return {}
    return data.data.reduce((acc: Record<string, any>, item: any) => {
      acc[item.state_code] = item
      return acc
    }, {})
  }, [data])
  
  const topStates = useMemo(() => {
    if (!data?.data) return []
    return data.data.slice(0, 5)
  }, [data])
  
  return (
    <ChartContainer
      title="Geographic Distribution"
      description="Scam activity by Indian states"
      isLoading={isLoading}
      error={error}
      actions={<ChartActions chartId="geographic-heatmap" />}
    >
      <div className="flex gap-4">
        {/* Map */}
        <div className="flex-1 relative">
          <svg
            viewBox="0 0 600 700"
            className="w-full h-[300px]"
          >
            {Object.entries(INDIA_STATES_PATH).map(([stateCode, pathData]) => {
              const stateInfo = stateData[stateCode]
              const percentage = stateInfo?.percentage || 0
              const fillColor = getHeatColor(percentage)
              
              return (
                <Tooltip key={stateCode}>
                  <TooltipTrigger asChild>
                    <motion.path
                      d={pathData.path}
                      fill={stateInfo ? fillColor : '#e5e7eb'}
                      stroke="#fff"
                      strokeWidth={1}
                      className="cursor-pointer transition-opacity"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredState && hoveredState !== stateCode ? 0.5 : 1 
                      }}
                      whileHover={{ scale: 1.02 }}
                      onMouseEnter={() => setHoveredState(stateCode)}
                      onMouseLeave={() => setHoveredState(null)}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p className="font-medium">{pathData.name}</p>
                      {stateInfo ? (
                        <>
                          <p className="text-sm">
                            {formatNumber(stateInfo.count)} sessions ({formatPercentage(stateInfo.percentage)})
                          </p>
                          {stateInfo.top_scam_types?.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                              Top: {stateInfo.top_scam_types.slice(0, 2).join(', ')}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">No data</p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </svg>
        </div>
        
        {/* Top states list */}
        <div className="w-48 space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Top States</p>
          {topStates.map((state: any, index: number) => (
            <div
              key={state.state_code}
              className={cn(
                'flex items-center justify-between p-2 rounded transition-colors',
                hoveredState === state.state_code && 'bg-muted'
              )}
              onMouseEnter={() => setHoveredState(state.state_code)}
              onMouseLeave={() => setHoveredState(null)}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  #{index + 1}
                </span>
                <span className="text-sm">{state.state}</span>
              </div>
              <Badge 
                variant="secondary"
                style={{ backgroundColor: getHeatColor(state.percentage) + '20' }}
              >
                {formatPercentage(state.percentage)}
              </Badge>
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <span className="text-xs text-muted-foreground">Low</span>
        <div className="flex">
          {[2, 5, 10, 15, 20].map((threshold) => (
            <div
              key={threshold}
              className="w-6 h-4"
              style={{ backgroundColor: getHeatColor(threshold) }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">High</span>
      </div>
    </ChartContainer>
  )
}
```

### 8. frontend/components/analytics/hourly-activity-heatmap.tsx

```typescript
// Activity heatmap by day and hour
// Features:
// - 7x24 grid heatmap
// - Interactive cells
// - Tooltip with details

'use client'

import { useMemo } from 'react'
import { ChartContainer } from './chart-container'
import { ChartActions } from './chart-actions'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useHourlyActivity } from '@/lib/hooks/use-analytics'
import { formatNumber } from '@/lib/utils/format'
import { cn } from '@/lib/utils/cn'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const HOURS = Array.from({ length: 24 }, (_, i) => i)

// Color intensity based on activity level
const getIntensity = (count: number, max: number) => {
  if (count === 0) return 'bg-muted'
  const ratio = count / max
  if (ratio >= 0.8) return 'bg-green-600 dark:bg-green-500'
  if (ratio >= 0.6) return 'bg-green-500 dark:bg-green-400'
  if (ratio >= 0.4) return 'bg-green-400 dark:bg-green-300'
  if (ratio >= 0.2) return 'bg-green-300 dark:bg-green-200'
  return 'bg-green-200 dark:bg-green-100'
}

export function HourlyActivityHeatmap() {
  const { data, isLoading, error } = useHourlyActivity()
  
  // Transform data into grid format
  const { grid, maxCount } = useMemo(() => {
    const grid: Record<string, number> = {}
    let maxCount = 0
    
    if (data?.data) {
      data.data.forEach((item: any) => {
        const key = `${item.day}-${item.hour}`
        grid[key] = item.count
        if (item.count > maxCount) maxCount = item.count
      })
    }
    
    return { grid, maxCount }
  }, [data])
  
  return (
    <ChartContainer
      title="Activity Heatmap"
      description="Session activity by day and hour"
      isLoading={isLoading}
      error={error}
      actions={<ChartActions chartId="hourly-activity-heatmap" />}
    >
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Hour labels */}
          <div className="flex ml-10 mb-1">
            {HOURS.filter((_, i) => i % 3 === 0).map((hour) => (
              <div
                key={hour}
                className="text-xs text-muted-foreground"
                style={{ width: `${100 / 8}%` }}
              >
                {hour.toString().padStart(2, '0')}:00
              </div>
            ))}
          </div>
          
          {/* Grid */}
          <div className="space-y-1">
            {DAYS.map((day, dayIndex) => (
              <div key={day} className="flex items-center gap-1">
                <div className="w-8 text-xs text-muted-foreground text-right">
                  {day}
                </div>
                <div className="flex-1 flex gap-[2px]">
                  {HOURS.map((hour) => {
                    const count = grid[`${dayIndex}-${hour}`] || 0
                    
                    return (
                      <Tooltip key={hour}>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              'flex-1 h-6 rounded-sm cursor-pointer transition-all hover:ring-2 hover:ring-ring',
                              getIntensity(count, maxCount)
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-medium">{day} {hour}:00 - {hour + 1}:00</p>
                          <p className="text-sm text-muted-foreground">
                            {formatNumber(count)} sessions
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-end gap-1 mt-4">
            <span className="text-xs text-muted-foreground mr-2">Less</span>
            {['bg-muted', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500', 'bg-green-600'].map((color, i) => (
              <div key={i} className={cn('w-4 h-4 rounded-sm', color)} />
            ))}
            <span className="text-xs text-muted-foreground ml-2">More</span>
          </div>
        </div>
      </div>
    </ChartContainer>
  )
}
```

### 9. frontend/components/analytics/chart-container.tsx

```typescript
// Reusable chart container wrapper
// Features:
// - Consistent styling
// - Loading/error states
// - Fullscreen support
// - Export functionality

'use client'

import { useState, useRef, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ChartLoading } from './chart-loading'
import { ChartError } from './chart-error'
import { ChartEmpty } from './chart-empty'

interface ChartContainerProps {
  title: string
  description?: string
  children: ReactNode
  isLoading?: boolean
  error?: Error | null
  isEmpty?: boolean
  actions?: ReactNode
  className?: string
}

export function ChartContainer({
  title,
  description,
  children,
  isLoading,
  error,
  isEmpty,
  actions,
  className,
}: ChartContainerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)
  
  const content = (
    <>
      {isLoading ? (
        <ChartLoading />
      ) : error ? (
        <ChartError error={error} />
      ) : isEmpty ? (
        <ChartEmpty />
      ) : (
        <div ref={chartRef}>{children}</div>
      )}
    </>
  )
  
  return (
    <>
      <Card className={className}>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">{title}</CardTitle>
              {description && (
                <CardDescription>{description}</CardDescription>
              )}
            </div>
            <div className="flex items-center gap-2">
              {actions}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsFullscreen(true)}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
      
      {/* Fullscreen Modal */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[90vw] h-[90vh]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0">
            {content}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
```

### 10. frontend/components/reports/report-generator.tsx

```typescript
// Report generation section
// Features:
// - Report type selection
// - Date range
// - Section selection
// - Format options
// - Generate button

'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon,
  Loader2,
  Check
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useGenerateReport } from '@/lib/hooks/use-reports'
import { cn } from '@/lib/utils/cn'
import { DateRange } from 'react-day-picker'
import { toast } from 'sonner'

const REPORT_TYPES = [
  { value: 'daily', label: 'Daily Report' },
  { value: 'weekly', label: 'Weekly Report' },
  { value: 'monthly', label: 'Monthly Report' },
  { value: 'custom', label: 'Custom Report' },
]

const REPORT_FORMATS = [
  { value: 'pdf', label: 'PDF Document' },
  { value: 'xlsx', label: 'Excel Spreadsheet' },
  { value: 'csv', label: 'CSV Data' },
]

const REPORT_SECTIONS = [
  { id: 'executive_summary', label: 'Executive Summary' },
  { id: 'sessions_analysis', label: 'Sessions Analysis' },
  { id: 'scam_types', label: 'Scam Type Breakdown' },
  { id: 'entity_extraction', label: 'Entity Extraction' },
  { id: 'persona_performance', label: 'Persona Performance' },
  { id: 'geographic_distribution', label: 'Geographic Distribution' },
  { id: 'llm_metrics', label: 'LLM Performance Metrics' },
  { id: 'recommendations', label: 'AI Recommendations' },
]

export function ReportGenerator() {
  const [reportType, setReportType] = useState<string>('weekly')
  const [format, setFormat] = useState<string>('pdf')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [sections, setSections] = useState<string[]>(
    REPORT_SECTIONS.map(s => s.id)
  )
  const [includeCharts, setIncludeCharts] = useState(true)
  
  const generateReport = useGenerateReport()
  
  const toggleSection = (sectionId: string) => {
    setSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }
  
  const handleGenerate = async () => {
    if (reportType === 'custom' && (!dateRange?.from || !dateRange?.to)) {
      toast.error('Please select a date range for custom report')
      return
    }
    
    if (sections.length === 0) {
      toast.error('Please select at least one section')
      return
    }
    
    try {
      await generateReport.mutateAsync({
        type: reportType as any,
        name: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`,
        start_date: dateRange?.from?.toISOString() || '',
        end_date: dateRange?.to?.toISOString() || '',
        sections,
        format: format as any,
        include_charts: includeCharts,
      })
      toast.success('Report generation started. You will be notified when ready.')
    } catch {
      toast.error('Failed to generate report')
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Generate Report
        </CardTitle>
        <CardDescription>
          Create customized reports with selected metrics and visualizations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Report Type */}
          <div className="space-y-2">
            <Label>Report Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REPORT_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Date Range (for custom) */}
          {reportType === 'custom' && (
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !dateRange && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, 'LLL dd')} -{' '}
                          {format(dateRange.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(dateRange.from, 'LLL dd, y')
                      )
                    ) : (
                      'Pick a date range'
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
          
          {/* Format */}
          <div className="space-y-2">
            <Label>Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REPORT_FORMATS.map(fmt => (
                  <SelectItem key={fmt.value} value={fmt.value}>
                    {fmt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Include Charts */}
          <div className="space-y-2">
            <Label>Options</Label>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="include-charts"
                checked={includeCharts}
                onCheckedChange={(checked) => setIncludeCharts(!!checked)}
              />
              <label
                htmlFor="include-charts"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include charts & visualizations
              </label>
            </div>
          </div>
        </div>
        
        {/* Sections */}
        <div className="mt-6 space-y-3">
          <Label>Sections to Include</Label>
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            {REPORT_SECTIONS.map(section => (
              <div key={section.id} className="flex items-center space-x-2">
                <Checkbox
                  id={section.id}
                  checked={sections.includes(section.id)}
                  onCheckedChange={() => toggleSection(section.id)}
                />
                <label
                  htmlFor={section.id}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {section.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Generate Button */}
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={handleGenerate}
            disabled={generateReport.isPending || sections.length === 0}
          >
            {generateReport.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

### 11. frontend/lib/hooks/use-analytics.ts

```typescript
// Analytics data hooks
'use client'

import { useQuery } from '@tanstack/react-query'
import { analyticsApi } from '@/lib/api/analytics'
import { useAnalyticsStore } from '@/lib/stores/analytics-store'
import { getDateRange } from '@/lib/utils/date-ranges'

// Query keys
export const analyticsKeys = {
  all: ['analytics'] as const,
  overview: (params: any) => [...analyticsKeys.all, 'overview', params] as const,
  sessionsOverTime: (params: any) => [...analyticsKeys.all, 'sessions-over-time', params] as const,
  scamTypeDistribution: (params: any) => [...analyticsKeys.all, 'scam-type-distribution', params] as const,
  personaEffectiveness: (params: any) => [...analyticsKeys.all, 'persona-effectiveness', params] as const,
  geographicDistribution: (params: any) => [...analyticsKeys.all, 'geographic', params] as const,
  entityExtraction: (params: any) => [...analyticsKeys.all, 'entity-extraction', params] as const,
  hourlyActivity: (params: any) => [...analyticsKeys.all, 'hourly-activity', params] as const,
  llmPerformance: (params: any) => [...analyticsKeys.all, 'llm-performance', params] as const,
  detectionFunnel: (params: any) => [...analyticsKeys.all, 'detection-funnel', params] as const,
}

// Hook factory for analytics queries
function useAnalyticsQuery<T>(
  keyFn: (params: any) => readonly string[],
  fetchFn: (params: any) => Promise<T>,
  options: { granularity?: string } = {}
) {
  const { timeRange, customRange, compareEnabled } = useAnalyticsStore()
  const { startDate, endDate } = getDateRange(timeRange, customRange)
  
  const params = {
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
    compare_previous: compareEnabled,
    granularity: options.granularity || 'day',
  }
  
  return useQuery({
    queryKey: keyFn(params),
    queryFn: () => fetchFn(params),
    staleTime: 60000, // 1 minute
  })
}

// Overview hook
export function useAnalyticsOverview() {
  return useAnalyticsQuery(
    analyticsKeys.overview,
    analyticsApi.getOverview
  )
}

// Sessions over time hook
export function useSessionsOverTime(options: { groupBy?: string } = {}) {
  const { timeRange, customRange, compareEnabled } = useAnalyticsStore()
  const { startDate, endDate } = getDateRange(timeRange, customRange)
  
  const params = {
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
    granularity: 'day',
    group_by: options.groupBy,
  }
  
  return useQuery({
    queryKey: analyticsKeys.sessionsOverTime(params),
    queryFn: () => analyticsApi.getSessionsOverTime(params),
    staleTime: 60000,
  })
}

// Scam type distribution hook
export function useScamTypeDistribution() {
  return useAnalyticsQuery(
    analyticsKeys.scamTypeDistribution,
    analyticsApi.getScamTypeDistribution
  )
}

// Persona effectiveness hook
export function usePersonaEffectiveness() {
  return useAnalyticsQuery(
    analyticsKeys.personaEffectiveness,
    analyticsApi.getPersonaEffectiveness
  )
}

// Geographic distribution hook
export function useGeographicDistribution() {
  return useAnalyticsQuery(
    analyticsKeys.geographicDistribution,
    analyticsApi.getGeographicDistribution
  )
}

// Entity extraction hook
export function useEntityExtraction() {
  return useAnalyticsQuery(
    analyticsKeys.entityExtraction,
    analyticsApi.getEntityExtraction,
    { granularity: 'day' }
  )
}

// Hourly activity hook
export function useHourlyActivity() {
  return useAnalyticsQuery(
    analyticsKeys.hourlyActivity,
    analyticsApi.getHourlyActivity
  )
}

// LLM performance hook
export function useLLMPerformance() {
  return useAnalyticsQuery(
    analyticsKeys.llmPerformance,
    analyticsApi.getLLMPerformance
  )
}

// Detection funnel hook
export function useDetectionFunnel() {
  return useAnalyticsQuery(
    analyticsKeys.detectionFunnel,
    analyticsApi.getDetectionFunnel
  )
}
```

### 12. frontend/lib/stores/analytics-store.ts

```typescript
// Zustand store for analytics state
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DateRange } from 'react-day-picker'
import { TimeRangeKey } from '@/lib/constants/time-ranges'

interface AnalyticsState {
  timeRange: TimeRangeKey
  customRange: DateRange | undefined
  compareEnabled: boolean
  granularity: 'hour' | 'day' | 'week' | 'month'
  
  setTimeRange: (range: TimeRangeKey) => void
  setCustomRange: (range: DateRange | undefined) => void
  setCompareEnabled: (enabled: boolean) => void
  setGranularity: (granularity: 'hour' | 'day' | 'week' | 'month') => void
  refreshData: () => Promise<void>
}

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      timeRange: '7d',
      customRange: undefined,
      compareEnabled: false,
      granularity: 'day',
      
      setTimeRange: (range) => set({ timeRange: range }),
      setCustomRange: (range) => set({ customRange: range }),
      setCompareEnabled: (enabled) => set({ compareEnabled: enabled }),
      setGranularity: (granularity) => set({ granularity }),
      
      refreshData: async () => {
        // This will be called to invalidate queries
        // Implementation depends on query client access
      },
    }),
    {
      name: 'analytics-storage',
      partialize: (state) => ({
        timeRange: state.timeRange,
        compareEnabled: state.compareEnabled,
        granularity: state.granularity,
      }),
    }
  )
)
```

### 13. frontend/lib/constants/chart-colors.ts

```typescript
// Chart color constants

export const CHART_COLORS = {
  primary: '#3b82f6',    // blue-500
  secondary: '#8b5cf6',  // violet-500
  success: '#22c55e',    // green-500
  danger: '#ef4444',     // red-500
  warning: '#f59e0b',    // amber-500
  info: '#06b6d4',       // cyan-500
  muted: '#9ca3af',      // gray-400
}

export const SCAM_TYPE_COLORS: Record<string, string> = {
  KYC_FRAUD: '#ef4444',
  LOTTERY_SCAM: '#f59e0b',
  INVESTMENT_FRAUD: '#8b5cf6',
  TECH_SUPPORT: '#3b82f6',
  JOB_SCAM: '#22c55e',
  ROMANCE_SCAM: '#ec4899',
  PHISHING: '#f97316',
  OTHER: '#6b7280',
}

export const PERSONA_COLORS: Record<string, string> = {
  elderly_victim: '#3b82f6',
  tech_novice: '#22c55e',
  eager_investor: '#8b5cf6',
  curious_user: '#f59e0b',
  confused_senior: '#ef4444',
  default: '#6b7280',
}

export const ENTITY_COLORS: Record<string, string> = {
  PHONE_NUMBER: '#3b82f6',
  UPI_ID: '#22c55e',
  BANK_ACCOUNT: '#8b5cf6',
  URL: '#ef4444',
  EMAIL: '#ec4899',
  IFSC_CODE: '#f59e0b',
}

// Gradient definitions for area charts
export const GRADIENTS = {
  blue: ['#3b82f6', '#1d4ed8'],
  green: ['#22c55e', '#15803d'],
  purple: ['#8b5cf6', '#6d28d9'],
  red: ['#ef4444', '#b91c1c'],
  amber: ['#f59e0b', '#b45309'],
}
```

### 14. frontend/lib/constants/time-ranges.ts

```typescript
// Time range presets
import { subDays, subMonths, startOfDay, endOfDay, startOfWeek, startOfMonth } from 'date-fns'

export type TimeRangeKey = 'today' | '7d' | '30d' | '90d' | 'custom'

export interface TimeRangeConfig {
  label: string
  shortLabel: string
  getRange: () => { start: Date; end: Date }
  granularity: 'hour' | 'day' | 'week' | 'month'
}

export const TIME_RANGES: Record<TimeRangeKey, TimeRangeConfig> = {
  today: {
    label: 'Today',
    shortLabel: '1D',
    getRange: () => ({
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
    }),
    granularity: 'hour',
  },
  '7d': {
    label: 'Last 7 Days',
    shortLabel: '7D',
    getRange: () => ({
      start: startOfDay(subDays(new Date(), 6)),
      end: endOfDay(new Date()),
    }),
    granularity: 'day',
  },
  '30d': {
    label: 'Last 30 Days',
    shortLabel: '30D',
    getRange: () => ({
      start: startOfDay(subDays(new Date(), 29)),
      end: endOfDay(new Date()),
    }),
    granularity: 'day',
  },
  '90d': {
    label: 'Last 90 Days',
    shortLabel: '90D',
    getRange: () => ({
      start: startOfDay(subDays(new Date(), 89)),
      end: endOfDay(new Date()),
    }),
    granularity: 'week',
  },
  custom: {
    label: 'Custom Range',
    shortLabel: 'Custom',
    getRange: () => ({
      start: startOfDay(subDays(new Date(), 29)),
      end: endOfDay(new Date()),
    }),
    granularity: 'day',
  },
}
```

### 15. frontend/types/analytics.ts

```typescript
// Analytics TypeScript types

export interface AnalyticsOverview {
  summary: {
    total_sessions: number
    active_sessions: number
    completed_sessions: number
    failed_sessions: number
    total_entities: number
    verified_entities: number
    avg_session_duration: number
    avg_turns_per_session: number
    avg_entities_per_session: number
    success_rate: number
  }
  comparison?: {
    sessions_change: number
    entities_change: number
    success_rate_change: number
    duration_change: number
  }
  period: {
    start: string
    end: string
    days: number
  }
}

export interface TimeSeriesDataPoint {
  timestamp: string
  total: number
  [key: string]: number | string
}

export interface ScamTypeData {
  scam_type: string
  count: number
  percentage: number
  avg_turns: number
  avg_entities: number
  success_rate: number
  trend: number
}

export interface PersonaData {
  persona: string
  total_sessions: number
  completed_sessions: number
  success_rate: number
  avg_turns: number
  avg_entities: number
  avg_duration: number
  effectiveness_score: number
}

export interface GeographicData {
  state: string
  state_code: string
  count: number
  percentage: number
  top_scam_types: string[]
}

export interface HourlyActivityData {
  day: number
  hour: number
  count: number
  avg_duration: number
}

export interface LLMPerformance {
  total_calls: number
  avg_latency_ms: number
  p95_latency_ms: number
  p99_latency_ms: number
  error_rate: number
  total_tokens: number
  total_cost_usd: number
  by_model: Array<{
    model: string
    calls: number
    avg_latency: number
    tokens: number
    cost: number
  }>
}

export interface FunnelStage {
  name: string
  count: number
  conversion_rate: number
}
```

## ADDITIONAL COMPONENTS TO CREATE

16. **kpi-sparkline.tsx** - Mini sparkline chart for KPI cards
17. **entity-extraction-chart.tsx** - Stacked area chart for entity trends
18. **detection-funnel.tsx** - Funnel visualization
19. **llm-performance.tsx** - LLM metrics panel
20. **chart-tooltip.tsx** - Custom chart tooltip
21. **chart-actions.tsx** - Export, fullscreen buttons
22. **chart-loading.tsx** - Chart loading state
23. **chart-error.tsx** - Chart error state
24. **chart-empty.tsx** - Chart empty state
25. **export-chart-button.tsx** - Export as PNG/SVG
26. **reports-list.tsx** - List of generated reports
27. **report-card.tsx** - Individual report card
28. **scheduled-reports.tsx** - Scheduled reports management
29. **skeletons.tsx** - All loading skeletons
30. **lib/api/analytics.ts** - Analytics API functions
31. **lib/api/reports.ts** - Reports API functions
32. **lib/utils/chart-helpers.ts** - Chart utility functions
33. **lib/utils/date-ranges.ts** - Date range utilities
34. **lib/utils/statistics.ts** - Statistical calculations
35. **lib/utils/geo-data.ts** - India states SVG paths
36. **lib/hooks/use-reports.ts** - Reports hooks
37. **lib/hooks/use-export-chart.ts** - Chart export hook

## QUALITY REQUIREMENTS

1. **Visualizations:**
   - Recharts for all charts
   - Consistent color palette
   - Dark/light mode support
   - Responsive resizing
   - Interactive tooltips

2. **Performance:**
   - Data memoization
   - Lazy chart loading
   - Efficient re-renders
   - WebWorker for heavy calculations

3. **Export Capabilities:**
   - PNG image export
   - PDF report generation
   - CSV data export
   - Scheduled reports

4. **Accessibility:**
   - Chart data tables for screen readers
   - Keyboard navigation
   - High contrast colors

5. **Responsiveness:**
   - Mobile-optimized layouts
   - Collapsible charts
   - Touch-friendly interactions

Create all 75+ files with complete, production-ready code. The Analytics Dashboard should be a professional data visualization platform worthy of enterprise use.

## ⏹️ END PROMPT 6 ═════════════════════════════════════════════════════════════---

# ═══════════════════════════════════════════════════════════════════════════════
# ██████╗ ██████╗  ██████╗ ███╗   ███╗██████╗ ████████╗    ███████╗
# ██╔══██╗██╔══██╗██╔═══██╗████╗ ████║██╔══██╗╚══██╔══╝    ╚════██║
# ██████╔╝██████╔╝██║   ██║██╔████╔██║██████╔╝   ██║           ██╔╝
# ██╔═══╝ ██╔══██╗██║   ██║██║╚██╔╝██║██╔═══╝    ██║          ██╔╝ 
# ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║██║        ██║          ██║  
# ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝        ╚═╝          ╚═╝  
# ═══════════════════════════════════════════════════════════════════════════════

# PROMPT 7: Chat Interface & API Integration

## 📦 Expected Output
*To be added*

## ▶️ START PROMPT 7 ═══════════════════════════════════════════════════════════

*To be added when ready*

## ⏹️ END PROMPT 7 ═════════════════════════════════════════════════════════════

---

# ═══════════════════════════════════════════════════════════════════════════════
# ██████╗ ██████╗  ██████╗ ███╗   ███╗██████╗ ████████╗     █████╗ 
# ██╔══██╗██╔══██╗██╔═══██╗████╗ ████║██╔══██╗╚══██╔══╝    ██╔══██╗
# ██████╔╝██████╔╝██║   ██║██╔████╔██║██████╔╝   ██║       ╚█████╔╝
# ██╔═══╝ ██╔══██╗██║   ██║██║╚██╔╝██║██╔═══╝    ██║       ██╔══██╗
# ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║██║        ██║       ╚█████╔╝
# ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝        ╚═╝        ╚════╝ 
# ═══════════════════════════════════════════════════════════════════════════════

# PROMPT 8: Final Polish & Production

## 📦 Expected Output
*To be added*

## ▶️ START PROMPT 8 ═══════════════════════════════════════════════════════════

*To be added when ready*

## ⏹️ END PROMPT 8 ═════════════════════════════════════════════════════════════

---

# 📝 Notes

## How to Use This File

1. **Find the prompt** you want to execute (Prompt 0, 1, 2, etc.)
2. **Copy everything** between `▶️ START PROMPT X` and `⏹️ END PROMPT X`
3. **Paste** into your AI assistant (Copilot, ChatGPT, Claude, etc.)
4. **Execute** and let it create all the files
5. **Update the status** in the Table of Contents from ⏳ to ✅

## Prompt Execution Order

**MUST follow this order:**
1. Prompt 0 → Documentation (do first)
2. Prompt 1 → Project Setup
3. Prompt 2 → UI Components
4. Prompt 3 → Dashboard
5. Prompt 4 → Sessions
6. Prompt 5 → Intelligence
7. Prompt 6 → Analytics
8. Prompt 7 → Chat + API
9. Prompt 8 → Final Polish

## Version History

| Date | Prompt | Changes |
|------|--------|---------|
| Jan 31, 2026 | 0, 1 | Initial prompts created |

---

**Made with ❤️ for India AI Impact Buildathon 2026**
