# ScamShield Dashboard

> AI-Powered Scam Intelligence Platform - Frontend

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17+ 
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── (dashboard)/        # Dashboard route group
│   │   ├── dashboard/      # Main dashboard
│   │   ├── sessions/       # Sessions list & detail
│   │   ├── intelligence/   # Extracted entities
│   │   ├── analytics/      # Charts & reports
│   │   ├── chat/           # Chat simulator
│   │   └── settings/       # App settings
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── providers.tsx       # React Query + Theme
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── common/             # Shared components
│   └── layout/             # Layout components
├── lib/
│   ├── api/                # API client & functions
│   ├── hooks/              # React Query hooks
│   ├── constants/          # App constants
│   └── utils/              # Utility functions
├── types/                  # TypeScript types
└── public/                 # Static assets
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.3 |
| Styling | Tailwind CSS 3.4 |
| Components | Radix UI + shadcn/ui |
| State | TanStack Query v5 |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Animations | Framer Motion |
| Icons | Lucide React |
| Toast | Sonner |

## 📡 API Integration

The frontend connects to the ScamShield backend API:

- **Production**: `https://scamshield-honeypot.onrender.com`
- **Local**: `http://localhost:8000`

Configure in `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://scamshield-honeypot.onrender.com
NEXT_PUBLIC_API_VERSION=v1
```

## 🎨 Features

### Dashboard
- Real-time statistics
- Recent sessions overview
- Quick actions
- Scam type distribution

### Sessions
- List all engagement sessions
- Filter by status, scam type
- View conversation history
- Extracted intelligence per session

### Intelligence
- Browse all extracted entities
- Filter by type (Phone, UPI, Bank, URL)
- Copy to clipboard
- Export as CSV

### Analytics
- Scam type distribution charts
- Timeline visualization
- Persona effectiveness
- Export reports

### Chat Simulator
- Test scam scenarios
- Multiple AI personas
- Real-time intelligence extraction
- Sample scam messages

## 🧪 Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix lint errors
npm run format       # Format with Prettier
npm run type-check   # TypeScript check
```

## 🌙 Dark Mode

Built-in dark mode support using `next-themes`. Toggle via the header button or it follows system preference.

## 📱 Responsive Design

Fully responsive layout that works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📄 License

MIT License - India AI Impact Buildathon 2026
