<![CDATA[# 🎨 Frontend Development Guide

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

**Guide to Frontend Development**

</div>

---

## 📋 Prerequisites

| Requirement | Version | Installation |
|-------------|---------|--------------|
| Node.js | 18+ | [nodejs.org](https://nodejs.org) |
| npm/pnpm | Latest | Comes with Node.js |
| Git | Latest | [git-scm.com](https://git-scm.com) |

---

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Framework** | Next.js 14 (App Router) | React framework |
| **Styling** | Tailwind CSS 3.4 | Utility-first CSS |
| **Components** | shadcn/ui | UI component library |
| **Charts** | Recharts | Data visualization |
| **State** | TanStack Query | Server state management |
| **Forms** | React Hook Form + Zod | Form handling |
| **Icons** | Lucide React | Icon library |

---

## 🚀 Local Setup

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Configure Environment

```bash
cp .env.example .env.local
```

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_KEY=your_api_key_here
```

### 4. Run Development Server

```bash
npm run dev
```

Access at: http://localhost:3000

---

## 📁 Project Structure (Planned)

```
frontend/
├── app/                       # Next.js App Router
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home/Dashboard
│   ├── sessions/
│   │   ├── page.tsx          # Session list
│   │   └── [id]/
│   │       └── page.tsx      # Session detail
│   ├── intelligence/
│   │   └── page.tsx          # Intelligence browser
│   ├── analytics/
│   │   └── page.tsx          # Analytics charts
│   ├── chat/
│   │   └── page.tsx          # Chat simulation
│   ├── settings/
│   │   └── page.tsx          # Configuration
│   └── docs/
│       └── page.tsx          # Built-in docs
│
├── components/                # Reusable components
│   ├── ui/                   # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   └── footer.tsx
│   ├── dashboard/
│   │   ├── stats-card.tsx
│   │   ├── activity-feed.tsx
│   │   └── scam-map.tsx
│   ├── sessions/
│   │   ├── session-list.tsx
│   │   ├── session-card.tsx
│   │   └── message-thread.tsx
│   └── charts/
│       ├── scam-type-chart.tsx
│       └── timeline-chart.tsx
│
├── lib/                       # Utility functions
│   ├── api.ts                # API client
│   ├── utils.ts              # Helper functions
│   └── constants.ts          # App constants
│
├── hooks/                     # Custom React hooks
│   ├── use-sessions.ts
│   ├── use-analytics.ts
│   └── use-intelligence.ts
│
├── types/                     # TypeScript types
│   ├── session.ts
│   ├── intelligence.ts
│   └── api.ts
│
└── styles/
    └── globals.css           # Global styles
```

---

## 🎨 Design System

### Colors

```css
/* Tailwind config */
colors: {
  primary: {
    DEFAULT: '#6366F1',  /* Indigo */
    dark: '#4F46E5',
  },
  success: '#10B981',    /* Green */
  warning: '#F59E0B',    /* Amber */
  danger: '#EF4444',     /* Red */
  
  /* Scam type colors */
  scam: {
    kyc: '#F59E0B',
    lottery: '#8B5CF6',
    tech: '#3B82F6',
    investment: '#10B981',
    job: '#EC4899',
    loan: '#6366F1',
    otp: '#EF4444',
    unknown: '#6B7280',
  }
}
```

### Typography

```css
/* Font family */
font-family: 'Inter', sans-serif;

/* Sizes */
text-xs: 0.75rem;
text-sm: 0.875rem;
text-base: 1rem;
text-lg: 1.125rem;
text-xl: 1.25rem;
text-2xl: 1.5rem;
```

---

## 📡 API Integration

### API Client

```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY!,
      ...options?.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}
```

### TanStack Query Hooks

```typescript
// hooks/use-sessions.ts
import { useQuery } from '@tanstack/react-query';
import { fetchAPI } from '@/lib/api';
import type { Session } from '@/types/session';

export function useSessions() {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: () => fetchAPI<{ items: Session[] }>('/v1/sessions'),
  });
}

export function useSession(id: string) {
  return useQuery({
    queryKey: ['session', id],
    queryFn: () => fetchAPI<Session>(`/v1/honeypot/session/${id}`),
    enabled: !!id,
  });
}
```

---

## 📄 Pages

### Dashboard (Home)

Features:
- Total sessions count
- Active sessions
- Intelligence extracted
- Scam type distribution chart
- Recent activity feed
- Geographic map (if data available)

### Sessions

Features:
- Paginated session list
- Filter by status, scam type
- Search functionality
- Session detail view
- Message thread viewer

### Intelligence

Features:
- Entity browser
- Filter by entity type
- Confidence scores
- Export functionality

### Analytics

Features:
- Scam type pie chart
- Timeline bar chart
- Session metrics
- Date range selector

### Chat Simulation

Features:
- Start new session
- Send test messages
- View AI responses
- Real-time updates

---

## 🧩 Component Guidelines

### Component Structure

```tsx
// components/dashboard/stats-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
            {trend > 0 ? '+' : ''}{trend}% from last week
          </p>
        )}
      </CardContent>
    </Card>
  );
}
```

---

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests (Playwright)

```bash
npm run test:e2e
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables on Vercel

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | https://scamshield-honeypot.onrender.com |
| `NEXT_PUBLIC_API_KEY` | Your API key |

---

## 🔗 Related Documentation

- [API Reference](./API_REFERENCE.md)
- [Backend Development](./BACKEND_DEVELOPMENT.md)
- [Deployment](./DEPLOYMENT.md)
]]>
