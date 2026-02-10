# Changelog

All notable changes to ScamShield will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [1.0.0] — 2026-02-10

### 🎉 Initial Release

#### Added
- **Frontend Dashboard** — Next.js 14 application with 7 main pages
  - Dashboard home with live metrics
  - Sessions management with filters
  - Intelligence center with entity tracking
  - Analytics & reports with charts
  - Chat simulator with real-time API integration
  - Interactive documentation with API reference
  - Settings & configuration panel

- **Marketing Landing Page** — Professional landing page with animated hero, features, tech stack, and CTA sections

- **Documentation System** — Searchable docs with code blocks, schema viewer, and Cmd+K search

- **API Integration** — Full integration with all 13 backend endpoints

- **AI Personas** — 5 victim personas (elderly, professional, student, business owner, curious user)

- **Scam Detection** — 8 scam type classifications with confidence scoring

- **Entity Extraction** — Real-time extraction of phone numbers, UPI IDs, bank accounts, phishing URLs

- **Production Infrastructure**
  - Docker multi-stage build
  - GitHub Actions CI/CD pipeline
  - Security headers (HSTS, CSP, XSS protection)
  - Standalone output for containerized deployment

- **Developer Experience**
  - TypeScript throughout
  - Component library (shadcn/ui)
  - Zustand state management
  - Framer Motion animations
  - Recharts data visualization

## [0.1.0] — 2026-01-15

### Added
- Initial backend API with FastAPI
- Groq LLaMA 3.3-70b integration
- MongoDB session storage
- Basic scam detection engine
