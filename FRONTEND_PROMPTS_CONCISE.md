# 🚀 ScamShield Frontend Development Prompts - Comprehensive English Guide

> **Complete Natural Language Prompt Collection for Building FAANG-Level Frontend**
> 
> **Project:** ScamShield Agentic Honeypot Dashboard  
> **Hackathon:** India AI Impact Buildathon 2026  
> **Model:** Claude Opus 4.5 with Thinking (Antigravity)  
> **Total Prompts:** 9 (Prompt 0 to Prompt 8)

---

## 📋 Table of Contents

| Prompt | Title | Expected Output |
|--------|-------|-----------------|
| [Prompt 0](#prompt-0-complete-unified-documentation) | Complete Unified Documentation | 15 documentation files |
| [Prompt 1](#prompt-1-frontend-project-setup--configuration) | Frontend Project Setup & Configuration | 40+ configuration files |
| [Prompt 2](#prompt-2-ui-component-library) | UI Component Library | 55+ reusable components |
| [Prompt 3](#prompt-3-dashboard-home-page) | Dashboard Home Page | 40+ dashboard files |
| [Prompt 4](#prompt-4-sessions-management) | Sessions Management | 50+ session files |
| [Prompt 5](#prompt-5-intelligence-center) | Intelligence Center | 45+ intelligence files |
| [Prompt 6](#prompt-6-analytics--reports) | Analytics & Reports | 50+ analytics files |
| [Prompt 7](#prompt-7-chat-interface--api-integration) | Chat Interface & API Integration | 85+ chat/API files |
| [Prompt 8](#prompt-8-final-polish--production) | Final Polish & Production | 130+ production files |

---

# ═══════════════════════════════════════════════════════════════════════════════
# PROMPT 0: Complete Unified Documentation
# ═══════════════════════════════════════════════════════════════════════════════

## Context & Background

You are building documentation for ScamShield, an AI-powered autonomous scam engagement and intelligence extraction system for India AI Impact Buildathon 2026. This is a production-grade agentic honeypot that actively engages scammers using AI-powered victim personas, extracts intelligence including bank accounts, UPI IDs, phone numbers, and phishing links, and uses Groq LLM with the llama-3.3-70b-versatile model.

## Existing Backend Specifications

The backend is fully built with FastAPI 0.109.0 on Python 3.11+, SQLAlchemy 2.0.25 with async SQLite for the database, Groq API for LLM integration, and Pydantic 2.5.3 for validation. There are 13 API endpoints covering honeypot engagement, session management, intelligence extraction, analytics, and health monitoring.

The system detects 8 scam types: KYC Fraud, Lottery Scam, Tech Support, Investment Fraud, Job Scam, Loan Scam, OTP Fraud, and Unknown. It extracts 7 entity types: Phone Number, UPI ID, Bank Account, IFSC Code, Email, URL, and Crypto Wallet. There are 5 AI personas: Elderly Victim (confused trusting grandparent), Tech Novice (overwhelmed by technology), Eager Investor (greedy and impatient), Busy Professional (distracted and time-pressed), and Helpful Auntie (oversharing and chatty).

## Documentation Requirements

Create 15 comprehensive documentation files with FAANG-level quality:

**Main Documentation Index:** Create a documentation home with navigation cards, feature highlights, quick links to all sections, and status badges. This serves as the central hub for all documentation.

**Project Overview:** Write a complete overview covering the problem statement (India loses ₹60 crore daily to scams), solution overview, key features table, technology stack, system capabilities, target audience, use cases, success metrics, and roadmap.

**System Architecture:** Document high-level architecture with ASCII art diagrams, component diagrams showing all modules, data flow diagrams, the agentic loop explanation, sequence diagrams for engagement flow and conversation continuation and intelligence extraction, design patterns used, scalability considerations, and technology decision rationale.

**Complete API Reference:** Document base URL and versioning, API key authentication, rate limiting, and all 13 endpoints with HTTP method, path, description, request schema with JSON examples, response schema with JSON examples, curl command examples, and error codes. Include common error responses, pagination details, and filtering options.

**Backend Development Guide:** Cover prerequisites, local setup instructions step-by-step, project structure explanation, code conventions, how to add new endpoints, how to add new personas, how to add new scam types, how to add new entity extractors, testing procedures, and debugging tips.

**Frontend Development Guide:** Cover prerequisites including Node.js 18+, local setup instructions, planned project structure, component architecture, state management approach, API integration patterns, styling guidelines, how to add new pages, how to add new components, and testing procedures.

**Database Schema Documentation:** Include ER diagram in ASCII art, documentation for sessions table, messages table, and extracted_intelligence table, column descriptions, indexes, relationships, migration strategy, and backup procedures.

**Deployment Guide:** Cover environment variables required, backend deployment to Render.com, frontend deployment to Vercel, Docker deployment instructions, Docker Compose configuration, CI/CD pipeline setup, health checks configuration, monitoring setup, logging configuration, and scaling guidelines.

**Security Documentation:** Cover security architecture, authentication and authorization, API key management, data protection measures, input validation, rate limiting, CORS configuration, ethical considerations for honeypot operation, data retention policy, and incident response procedures.

**Testing Guide:** Cover testing strategy, unit tests, integration tests, API tests, end-to-end tests, mention that 100 test scenarios already exist, instructions for running tests, code coverage requirements, and CI/CD testing integration.

**Contribution Guidelines:** Include code of conduct, how to contribute, development workflow, branch naming conventions (main, develop, feature/*, bugfix/*), commit message format, pull request process, code review guidelines, and issue templates.

**Changelog:** Use semantic versioning format, document v1.0.0 initial release with complete features list, backend API, database, LLM integration, and placeholder for future versions.

**Troubleshooting Guide:** Cover common errors and solutions, API errors, database errors, LLM errors, deployment issues, performance issues, and frequently asked questions.

**Glossary:** Define technical terms, domain-specific terms (scam types), and acronyms used throughout the project.

**Updated README:** Create a professional README with badges, one-line description, problem statement, solution description, key features with icons, technology stack table, quick start guide, API usage example, simplified project structure, documentation links, contributing section, license, team and hackathon info, and contact information.

## Quality Standards

All documentation must be at Google, Meta, Microsoft, and Apple documentation level. Use clear, concise, professional language. Include no placeholder text - everything must be complete. Maintain consistent formatting throughout. Ensure mobile-friendly markdown. Use accessible language. Include both technical and non-technical sections. Provide complete working examples. Document error handling. Cover edge cases. Use proper heading hierarchy (H1 to H2 to H3), tables for structured data, code blocks with syntax highlighting, collapsible sections where appropriate, emoji icons for visual appeal, and status badges.

---

# ═══════════════════════════════════════════════════════════════════════════════
# PROMPT 1: Frontend Project Setup & Configuration
# ═══════════════════════════════════════════════════════════════════════════════

## Context & Objective

Create a complete production-ready Next.js 14 frontend project for the ScamShield Agentic Honeypot Dashboard. This is the foundation for a FAANG/MNC-level enterprise application that will display real-time scam engagement sessions, show extracted intelligence, provide analytics and reporting, allow testing scam scenarios via chat interface, and connect to the FastAPI backend.

## Technical Stack Requirements

Use Next.js 14.1.0 with App Router for the framework. Use TypeScript 5.3+ with strict mode enabled. Use Tailwind CSS 3.4+ for styling. Use shadcn/ui latest version for UI components. Use Lucide React for icons. Use Recharts 2.10+ for charting. Use TanStack Query (React Query) 5.17+ for server state management. Use Zustand 4.4+ for client state management. Use React Hook Form 7.49+ with Zod for form handling and validation. Use Axios 1.6+ for HTTP requests. Use date-fns 3.2+ for date manipulation. Use Framer Motion 10.18+ for animations. Use next-themes for dark/light mode theming. Use Sonner for toast notifications. Use clsx and tailwind-merge for class utilities.

## Project Structure Requirements

Create the complete frontend folder with Next.js App Router structure. The app directory should have route groups for auth, dashboard, and marketing. Include proper layouts for each section. Create loading.tsx and error.tsx files for all routes. Include not-found.tsx for 404 handling.

Set up the components directory with ui folder for shadcn/ui components, layout folder for header, sidebar, and footer components, common folder for shared components like loading spinners and empty states, and feature-specific folders for dashboard, sessions, intelligence, analytics, and chat components.

Create the lib directory with api folder for API client and endpoint functions, hooks folder for custom React hooks, stores folder for Zustand stores, utils folder for utility functions, constants folder for application constants, and types folder for TypeScript type definitions.

Include the public directory with images, icons, and static assets folders.

## Configuration Files

Create package.json with all dependencies properly configured including scripts for dev, build, start, lint, format, type-check, and test commands.

Create tsconfig.json with strict TypeScript configuration including path aliases using @ for clean imports, proper module resolution, and Next.js recommended settings.

Create tailwind.config.ts with extended theme configuration, custom colors for scam types and personas, shadcn/ui CSS variable integration, animation utilities, and custom plugins for scrollbar and typography.

Create next.config.js with image optimization settings, environment variable handling, security headers, and performance optimizations.

Create components.json for shadcn/ui configuration with proper path aliases and style settings.

Create .env.local with API URL configuration, app name, feature flags, and development settings. Create .env.example as a template.

Create .eslintrc.json with Next.js recommended rules, TypeScript rules, import sorting, and accessibility rules.

Create .prettierrc with consistent formatting configuration including tab width, single quotes, trailing commas, and print width settings.

Create .gitignore with proper exclusions for node_modules, build outputs, environment files, and IDE settings.

## Core Application Files

Create app/layout.tsx as the root layout with HTML structure, font configuration using Inter from Google Fonts, theme provider, query client provider, Sonner toast container, and proper metadata.

Create app/providers.tsx with QueryClientProvider configuration including stale time, retry settings, and refetch options. Include ThemeProvider with system theme detection and TooltipProvider.

Create app/globals.css with Tailwind directives, CSS custom properties for light and dark themes covering background, foreground, card, primary, secondary, muted, accent, destructive, success, warning, and info colors. Include border, input, and ring colors. Add chart colors, sidebar-specific colors, custom scrollbar styles, animation utilities, and focus ring utilities.

Create app/page.tsx as a landing page that redirects to the dashboard or shows a marketing page for unauthenticated users.

## Library Files

Create lib/api/client.ts with Axios instance configuration, base URL from environment variables, request interceptors for auth headers and request ID, response interceptors for error handling and retry logic, proper error transformation with custom ApiError class, request/response logging in development, and utility functions for get, post, put, patch, and delete operations.

Create lib/api/endpoints.ts with all API endpoint paths organized by domain: honeypot endpoints for engage, continue, and session operations; sessions endpoints for list and detail operations; intelligence endpoints for list and detail operations; analytics endpoints for summary, scam types, and timeline; and health endpoints.

Create lib/utils/cn.ts with the standard class name utility combining clsx and tailwind-merge.

Create lib/utils/format.ts with formatting utilities for numbers, currency, percentages, phone numbers, UPI IDs, bank accounts, text truncation, capitalization, and slugification.

Create lib/utils/date.ts with date utilities using date-fns for formatting dates, relative time, duration, and checking if dates are today or yesterday.

Create lib/constants/index.ts with application constants including scam types with icons, labels, and colors; personas with icons, labels, and descriptions; entity types with icons and colors; session statuses; and navigation items.

Create types/index.ts with TypeScript interfaces and types for Session, Message, ExtractedEntity, ScamDetection, Persona, AnalyticsSummary, ApiResponse, and PaginatedResponse.

## Layout Components

Create components/layout/header.tsx with application header including logo, navigation links, search button with keyboard shortcut hint, theme toggle, notifications dropdown, and user menu.

Create components/layout/sidebar.tsx with collapsible sidebar including navigation items with icons and labels, active state highlighting, badge counts for items, collapse/expand functionality, and responsive behavior.

Create components/layout/main-layout.tsx wrapping the header, sidebar, and main content area with proper spacing, scroll handling, and responsive layout.

Create components/layout/page-header.tsx as a reusable page header with title, description, breadcrumbs, and action buttons slot.

Create components/layout/footer.tsx with copyright, links, and version information.

## Theme Configuration

Create components/theme-provider.tsx using next-themes with attribute-based theme switching, system theme detection, and suppressHydrationWarning.

Create components/theme-toggle.tsx with animated toggle button supporting light, dark, and system modes.

## Base UI Components

Set up shadcn/ui components including button with all variants and sizes, input with proper styling, label with required indicator option, textarea with auto-resize option, select with search functionality, checkbox and radio, switch, slider, dialog and alert-dialog, dropdown-menu and context-menu, popover and tooltip, tabs with animations, accordion and collapsible, card with header, content, and footer, badge with multiple variants, avatar with fallback, separator, scroll-area with custom scrollbar, skeleton for loading states, progress and loading indicators, sheet for slide-over panels, command for command palette, and sonner for toast notifications.

## Common Components

Create loading-spinner with multiple sizes and color options.

Create empty-state with customizable icon, title, description, and action button.

Create error-state with error icon, message, retry button, and report issue link.

Create page-loader with logo animation and blur background.

Create data-card for statistics with icon, label, value, trend indicator, and sparkline option.

Create status-badge with color mapping and pulse animation for active states.

Create copy-button with success feedback and toast notification.

Create search-input with debounced onChange, clear button, and keyboard shortcut hint.

Create confirm-dialog with promise-based API and danger variant.

## Quality Requirements

All components must work with Next.js 14 App Router and be RSC compatible. Use 'use client' directive only when necessary for interactive components. Follow shadcn/ui patterns for consistency. Ensure all Radix UI primitives are properly typed. Support both controlled and uncontrolled patterns. Include proper displayName for React DevTools. Forward refs on components wrapping DOM elements. Use CVA (class-variance-authority) for variant styling. Ensure full WCAG 2.1 AA accessibility compliance with keyboard accessibility, proper ARIA labels, and visible focus indicators.

---

# ═══════════════════════════════════════════════════════════════════════════════
# PROMPT 2: UI Component Library
# ═══════════════════════════════════════════════════════════════════════════════

## Context & Objective

Build a comprehensive, enterprise-grade UI component library for the ScamShield dashboard. These components will be used throughout the application and must match the quality of component libraries from Google Material, Ant Design, or Chakra UI. All components must be fully accessible, type-safe, and performant.

## Extended shadcn/ui Components

Enhance the base shadcn/ui components with ScamShield-specific styling and functionality. Create extended versions of all base components with proper dark mode support, consistent animations, and accessibility features.

## Data Display Components

Create a data table component using TanStack Table with features including sortable columns with visual indicators, filterable columns with dropdown filters, pagination with page size selector, row selection with checkbox column, column visibility toggle, column resizing, sticky headers, virtual scrolling for large datasets, bulk actions bar, empty and loading states, export functionality, and responsive mobile layout.

Create a stats-card component for displaying metrics with animated number counting, trend indicators showing percentage change with up/down arrows, sparkline chart integration, comparison to previous period, click-to-drill-down functionality, and loading skeleton.

Create a timeline component for activity feeds with vertical and horizontal orientations, grouped by date option, animated entry transitions, action buttons on items, expandable content, and virtual scrolling for long timelines.

Create a kanban-board component for visual session management with draggable cards between columns, column headers with counts, card previews with key information, and quick actions on hover.

## Visualization Components

Create chart wrapper components for Recharts including line-chart with gradient fill, area-chart with multiple series, bar-chart with horizontal and vertical variants, pie-chart with interactive segments, donut-chart with center label, radar-chart for persona comparison, treemap for hierarchical data, and funnel-chart for conversion visualization.

Create a heatmap component for activity visualization with configurable color scales, interactive cells with tooltips, and legend.

Create a gauge component for threat level display with animated needle or progress arc, threshold markers, and color-coded zones.

Create a map component for geographic distribution using India SVG with interactive states, color-coded by activity level, and tooltips with state details.

## Form Components

Create an advanced form system with multi-step form wizard including progress indicator, step validation, and navigation. Create a search-combobox with async search, recent searches, and keyboard navigation. Create a date-range-picker with presets for common ranges, calendar UI, and comparison option. Create a tag-input for multiple value entry with autocomplete, validation, and remove functionality. Create a file-upload with drag-and-drop, preview, progress, and file type restrictions. Create a rich-text-editor for notes and annotations. Create a code-editor with syntax highlighting for JSON and curl examples.

## Feedback Components

Create a notification-center as a dropdown with grouped notifications, mark as read, mark all as read, and notification preferences. Create a command-palette triggered by Cmd+K with search across pages, actions, and recent items. Create an announcement-banner for system-wide messages with dismiss option and action button. Create a progress-steps for multi-step processes with completed, current, and upcoming states.

## Layout Components

Create a resizable-panels component for adjustable layout sections with drag handles and persistent state. Create a masonry-grid for intelligence cards with responsive columns. Create a virtual-list for rendering large lists efficiently. Create an infinite-scroll component with load more trigger and loading indicator.

## Interactive Components

Create context-menu components for right-click actions on sessions, entities, and messages. Create a keyboard-shortcuts-dialog showing all available shortcuts organized by section. Create a tour component for onboarding with step-by-step highlights and dismiss option.

## Typography Components

Create heading components for H1 through H6 with consistent styling. Create text components for paragraph, lead, large, small, muted, and code variants. Create a prose component for rendered markdown content.

## Quality Requirements

Every component must have full TypeScript type definitions with generics where appropriate. Every component must be fully accessible with ARIA labels, roles, and keyboard navigation. Every component must support dark mode through CSS variables. Every component must include loading, error, and empty states where applicable. Every component must be documented with JSDoc comments including usage examples. Every component must support ref forwarding. Every component must have proper displayName. Every component must be tree-shakeable for optimal bundle size.

---

# ═══════════════════════════════════════════════════════════════════════════════
# PROMPT 3: Dashboard Home Page
# ═══════════════════════════════════════════════════════════════════════════════

## Context & Objective

Build a stunning, feature-rich dashboard home page that displays real-time scam engagement statistics, similar to dashboards at Google Analytics, Datadog, or Grafana. This is the first thing users see and must immediately convey the value and status of the ScamShield system.

## Dashboard Layout

Design a responsive grid layout that adapts from single column on mobile to multi-column on desktop. The layout should include a header section with welcome banner, time range selector, and refresh button. Below that, place a row of four KPI cards showing total sessions, active sessions, intelligence extracted, and detection rate. The next section contains two charts side by side: a large scam detection timeline chart and a smaller scam type distribution donut chart. Below the charts, show recent sessions list alongside a threat level indicator card. Then include a row of three cards for system health, quick actions, and intelligence summary. Finally, add a live activity feed at the bottom.

## Header Components

Create a welcome-banner component that displays a greeting based on time of day, the user's name, and a motivational message about fighting scams. Include a small illustration or icon.

Create a time-range-selector component with preset options for today, 7 days, 30 days, and 90 days, plus a custom date range picker. The selected range should persist and affect all dashboard data.

Create a refresh-button component with manual refresh capability, auto-refresh toggle with interval options (5s, 10s, 30s, 1m), countdown timer showing next refresh, and loading spinner during refresh.

## KPI Cards Section

Create a stats-cards component that displays four main KPI cards in a responsive grid. Each card should fetch its own data and update independently.

Create individual stat-card components with animated number counting on initial load, trend indicator showing percentage change from previous period with up or down arrow, sparkline showing trend over time, icon with colored background, loading skeleton state, and hover effect for interactivity.

The four KPIs are: Total Sessions showing cumulative count with percentage change, Active Sessions showing current live sessions with pulsing indicator, Intelligence Extracted showing total entities found with trend, and Detection Rate showing percentage of scams detected successfully.

## Chart Section

Create a scam-detection-chart component as a large area or line chart showing sessions and intelligence extraction over time. Include multiple series for sessions and intelligence with a legend, interactive tooltips showing exact values, zoom and pan functionality, smooth animations on data change, and responsive sizing.

Create a scam-types-chart component as a donut chart showing distribution of scam types detected. Include interactive segments with hover effects, center text showing total count, legend with percentages, click to filter functionality, and animated entry.

## Recent Sessions Section

Create a recent-sessions component showing the 5 most recent sessions. Each session row should display status indicator (active with pulse, completed, or failed), scam type with icon, persona used with avatar, turn count, entities extracted count, and relative timestamp. Include a "View All Sessions" link and auto-refresh for active sessions.

Create a session-row component for each item with hover effects, click to navigate to detail, and quick actions on hover.

## Threat Level Section

Create a threat-level-card component displaying current system threat level from 1 to 10 with a visual gauge, label (Low, Medium, Elevated, High, Critical), animated gauge or progress ring, color coding from green to red, active threats count, high risk sessions count, and trend indicator.

## System Health Section

Create a system-health component showing status of all system components. Display API health, database health, and LLM health with status indicators (healthy, degraded, unhealthy), latency metrics, and last check timestamp. Show overall uptime percentage and system version.

Create a health-indicator component for each metric with colored status dot, metric name, status text, and optional latency display.

## Quick Actions Section

Create a quick-actions component with buttons for common actions: New Session linking to chat, View Analytics linking to analytics page, Export Data with format options, and View Documentation linking to docs. Use clear icons and labels.

## Intelligence Summary Section

Create an intelligence-summary component showing count of each entity type extracted. Display cards for Phone Numbers, UPI IDs, Bank Accounts, and Phishing Links with icon, count, and click to navigate to filtered intelligence view.

## Activity Feed Section

Create an activity-feed component showing live stream of system events. Events include new session started, intelligence extracted, session completed, threat level changed, and system alerts. Each item shows icon, description, and relative timestamp. New items animate in from top. Support virtual scrolling for performance. Include filter by event type option.

## Data Fetching Hooks

Create use-dashboard-data hook that fetches all dashboard data with proper caching, refetch intervals, and error handling.

Create use-realtime-stats hook for polling active data with configurable intervals.

Create use-chart-data hook for transforming API data into chart-ready format.

## API Integration

Create dashboard.ts API file with functions for getSummary returning overview statistics, getRecentSessions returning latest sessions, getScamTypeDistribution returning chart data, getTimeline returning time series data, and getSystemHealth returning health status.

## Quality Requirements

The dashboard must feel alive with subtle animations and real-time updates. Loading states should use skeleton components matching the layout. Errors should be caught at the section level so one failing component doesn't break the whole page. All data should be accessible via keyboard navigation. The design should be cohesive with consistent spacing, colors, and typography.

---

# ═══════════════════════════════════════════════════════════════════════════════
# PROMPT 4: Sessions Management
# ═══════════════════════════════════════════════════════════════════════════════

## Context & Objective

Build a comprehensive session management system for viewing, filtering, and managing all scam engagement sessions. This is a critical feature that allows users to browse historical sessions, view conversation details, and analyze individual engagement attempts.

## Sessions List Page

Create the main sessions page with a complete listing interface. Include a page header with title, description, and new session button. Implement a toolbar with search input (debounced with 300ms delay), filter toggle button with active filter count badge, view mode toggle between table and grid, and export dropdown with JSON and CSV options.

Create a filter panel that is collapsible and contains status filter with tabs for All, Active, Completed, and Failed. Include scam type multi-select dropdown, persona multi-select dropdown, date range picker with calendar UI, active filters display as removable badges, and clear all filters button.

Create a data table for table view using TanStack Table with columns for select checkbox, status badge, scam type with preview text, persona with icon, turn count, entities extracted count, relative timestamp, and actions menu. Implement sortable columns, row selection for bulk actions, click row to navigate to detail, and loading skeleton.

Create a grid view as an alternative card-based layout with session cards showing the same information in a visual format, masonry layout, and hover effects.

Create a bulk actions bar that appears when rows are selected, showing selected count, export selected button, delete selected button with confirmation, and clear selection button.

Create pagination with page numbers, previous and next buttons, page size selector, and total items display.

## Session Detail Page

Create a session detail page with full conversation history and analysis. Include a header with back button, session ID, status badge, scam type badge, persona badge, and actions dropdown for export, share, and delete.

Create a main content area with two-panel layout. The left panel shows conversation history and the right panel shows session metadata and extracted intelligence.

Create a conversation-view component with virtual scrolling for long conversations, message grouping by date, search within conversation, entity highlighting in message text, auto-scroll to latest for active sessions, and copy message text button.

Create a conversation-message component for each message with sender indicator (scammer or victim persona), avatar or icon, message content with entity highlighting, timestamp, extracted entities shown as badges, and retry button for failed messages.

Create a session-sidebar component with session metadata card showing ID, status, scam type, persona, created time, and duration. Include a scam detection card showing detected scam type, confidence score, and risk level. Add an extracted intelligence card listing all entities found with type badges and copy buttons. Show a session timeline with key events.

## Session Actions

Implement export session as JSON or PDF with full conversation and metadata.

Implement delete session with confirmation dialog and undo option via toast.

Implement continue session for active sessions, navigating to chat with session loaded.

Implement share session generating a shareable link with optional expiry.

## Data Hooks

Create use-sessions hook for fetching sessions list with filters, pagination, and sorting. Use TanStack Query with proper cache invalidation.

Create use-session hook for fetching single session detail with messages and intelligence.

Create use-session-messages hook for fetching messages with real-time polling for active sessions.

Create use-delete-session mutation hook with optimistic update.

## State Management

Create session-filters store using Zustand for filter panel open state, active filter count, and filter persistence.

## URL State

Implement URL-based state for filters, sorting, pagination, and view mode. When users share URLs, recipients should see the same filtered view.

## Quality Requirements

The sessions list must handle thousands of sessions efficiently using pagination and virtual scrolling. Filters should update the URL without full page reload. The detail view must support very long conversations with virtual scrolling. All actions must have loading and error states. The UI must be responsive from mobile to desktop.

---

# ═══════════════════════════════════════════════════════════════════════════════
# PROMPT 5: Intelligence Center
# ═══════════════════════════════════════════════════════════════════════════════

## Context & Objective

Build an Intelligence Center for managing and analyzing all extracted scam intelligence (entities). This is the core value proposition of ScamShield - the collected intelligence that can help identify and stop scammers. The interface must allow users to browse, filter, verify, and export extracted entities.

## Intelligence List Page

Create the main intelligence page with comprehensive entity listing. Include a page header with title showing "Intelligence Center", description, and stats summary showing counts by entity type.

Create a stats overview section with cards for each entity type showing count, verified count, and trend. Entity types are Phone Numbers, UPI IDs, Bank Accounts, IFSC Codes, Emails, URLs, and Crypto Wallets.

Create a toolbar with search input supporting search by value or session, filter toggle button, view mode toggle between table and grid, mask/unmask values toggle for privacy, and export dropdown.

Create a filter panel with entity type filter using icon buttons or select, risk score range slider, confidence threshold slider, verification status filter (all, verified, unverified), date range picker, and associated scam type filter.

Create a data table with columns for select checkbox, entity type badge with icon, value with formatting and copy button, risk score with color-coded badge, confidence meter as a visual bar, occurrence count showing how many sessions contained this entity, verification status badge, first seen timestamp, and actions menu.

Create a grid view with entity cards showing type icon, masked or full value, risk indicator, and quick actions.

Create bulk actions bar for exporting selected, verifying selected, and deleting selected.

## Entity Detail Panel

Create a slide-over panel that opens when clicking an entity. The panel displays complete entity information including entity type with icon and label, full value with large copy button, risk score with visual gauge and explanation, confidence meter with percentage, and occurrence count with link to related sessions.

Show verification status with current status indicator, verify and unverify toggle button, verification source if verified, and verification timestamp.

Show metadata section with entity-specific details like country code and carrier for phones, bank name for accounts, and domain analysis for URLs.

Show associated scam types as badges listing the scam types where this entity was found.

Show related sessions as a list with session ID, scam type, and timestamp, linking to session detail.

Show timeline with first seen, last seen, and created timestamps.

Show similar entities if pattern matching finds related values.

Show notes section with existing notes list and add note form with text area and submit button.

Show actions footer with export button, report to authorities button, and delete button with confirmation.

## Entity Type Components

Create entity-type-badge component with icon and color for each entity type.

Create entity-value-display component with formatting specific to each type, masking option, and copy button.

Create entity-risk-badge component with color-coded label based on score.

Create entity-confidence-bar component as a visual progress bar.

Create entity-verification-badge component showing verified or unverified status.

## Risk Score Visualization

Create risk-score-gauge component as a circular gauge with animated fill, threshold markers, color gradient from green to red, and center text showing score.

Create confidence-meter component as a horizontal bar with percentage label.

## Data Hooks

Create use-intelligence hook for fetching entities list with filters, pagination, and sorting.

Create use-entity-detail hook for fetching single entity with related data.

Create use-add-entity-note mutation hook.

Create use-verify-entity mutation hook.

Create use-delete-entity mutation hook with confirmation.

## Entity Utilities

Create entity-formatters utility with functions for formatting each entity type appropriately, masking sensitive values, and getting entity icon and color.

## Quality Requirements

The intelligence center must handle tens of thousands of entities efficiently. Sensitive data like bank accounts should be maskable. Verification workflow must be clear and auditable. Export functionality must support filtering and selection. The detail panel must load additional data lazily.

---

# ═══════════════════════════════════════════════════════════════════════════════
# PROMPT 6: Analytics & Reports
# ═══════════════════════════════════════════════════════════════════════════════

## Context & Objective

Build a comprehensive Analytics and Reporting system that provides deep insights into scam patterns, persona effectiveness, and system performance. This should rival analytics dashboards from Google Analytics, Mixpanel, or Amplitude with rich visualizations and customizable reports.

## Analytics Page Layout

Create a tabbed interface with three main tabs: Overview, Deep Analysis, and Reports.

## Analytics Header

Create an analytics header with title, time range selector with presets and custom range, compare toggle for comparing to previous period, granularity selector for hour, day, week, or month, and refresh button.

## Overview Tab

Create an analytics overview section with key metrics cards showing total sessions with comparison, total entities extracted, average session duration, average turns per session, success rate, and top performing persona.

Create a sessions over time chart as a large area chart with multiple series capability for grouping by status or scam type, interactive legend for toggling series, zoom and pan functionality, comparison line if compare mode is enabled, and export chart button.

Create a scam type breakdown section with horizontal bar chart showing count by scam type, percentage and count labels, click to drill down, and comparison indicators.

Create a persona effectiveness chart as a radar or bar chart comparing personas across metrics including sessions handled, success rate, average entities extracted, and average duration.

Create an entity extraction trends chart as a stacked area chart showing extraction over time by entity type with totals.

## Deep Analysis Tab

Create a geographic distribution section with India map heatmap colored by session density, top states list, and click state for details.

Create an hourly activity heatmap as a 7x24 grid showing activity by day and hour with color intensity based on volume and interactive cells with tooltips.

Create a detection funnel visualization showing stages from session started to scam detected to entities extracted to verified entities with conversion rates between stages.

Create an LLM performance metrics section showing total API calls, average latency, P95 and P99 latency, error rate, total tokens used, and cost breakdown by model.

Create a session duration distribution chart as a histogram showing distribution of session durations with average and median markers.

Create a correlation analysis section showing relationships between scam type and persona effectiveness, time of day and scam type, and entity types and scam types.

## Reports Tab

Create a report generator interface with report type selection for daily, weekly, monthly, or custom reports. Include date range selection for custom reports. Add section checkboxes for executive summary, sessions analysis, scam types breakdown, entity extraction, persona performance, geographic distribution, LLM metrics, and AI recommendations. Include format selection for PDF, Excel, or CSV and include charts toggle.

Create a scheduled reports section for managing recurring reports with list of scheduled reports, create new schedule button, edit and delete actions, and next run indicator.

Create a reports history section showing previously generated reports with report name, type, date range, generated timestamp, format, and download button.

## Chart Components

Create reusable chart components for line chart, area chart, bar chart (horizontal and vertical), pie and donut chart, radar chart, funnel chart, heatmap, histogram, and sparkline. Each chart component should include loading state, error state, empty state, responsive sizing, theme-aware colors, export functionality, and fullscreen mode.

Create chart-container wrapper component with title, description, actions slot, loading and error handling, and fullscreen toggle.

Create chart-tooltip component with consistent styling across all charts.

Create chart-legend component with clickable items for toggling series.

## Data Hooks

Create analytics hooks for each data type: use-analytics-overview, use-sessions-over-time, use-scam-type-distribution, use-persona-effectiveness, use-geographic-distribution, use-entity-extraction, use-hourly-activity, use-llm-performance, and use-detection-funnel.

## Analytics Store

Create Zustand store for analytics state including time range, custom range, compare enabled flag, granularity, and setters for each. Persist user preferences.

## Report Generation

Create use-generate-report mutation hook that accepts report configuration and returns download URL.

Create use-scheduled-reports hook for listing and managing scheduled reports.

Create use-report-history hook for listing past reports.

## Quality Requirements

All charts must be interactive with tooltips and click actions. Data must update when time range changes. Comparison mode must show percentage changes. Large datasets must not impact performance. Charts must be exportable as PNG and data as CSV. The reports feature must handle async generation with progress indication.

---

# ═══════════════════════════════════════════════════════════════════════════════
# PROMPT 7: Chat Interface & API Integration
# ═══════════════════════════════════════════════════════════════════════════════

## Context & Objective

Build a production-ready chat interface for testing scam scenarios with AI personas. This is the interactive core of ScamShield where users can simulate scam conversations and observe how the honeypot responds. The chat must feel as polished as ChatGPT, Intercom, or WhatsApp Web.

## Chat Page Layout

Create a full-height chat page with three-panel layout. The left panel shows session list or scenario selection (collapsible). The center panel shows the main chat interface. The right panel shows real-time analysis including scam detection, extracted entities, and session info (collapsible).

## Left Panel - Session/Scenario Selection

Create a new chat view showing quick start scenarios as clickable cards with icon, name, description, and suggested persona. Include a custom message option with persona selector. Show recent sessions list with status, scam type, and timestamp.

Create a scenario card component with scenario icon, name, description, difficulty badge, expected entities preview, and click to start.

Create a persona selector as a dropdown or card selection with persona icon, name, description, effectiveness rating, and traits preview.

## Center Panel - Chat Interface

Create a chat header showing session status, persona being used with icon and name, session duration, turn count, and actions menu for export, share, and end session.

Create a messages area with virtual scrolling for long conversations, message grouping by time, smooth auto-scroll to bottom, scroll-to-bottom floating button when scrolled up, and typing indicator when AI is responding.

Create a message bubble component with different styling for scammer messages (left, darker) and victim persona messages (right, primary color). Include avatar or icon, message content with entity highlighting, timestamp on hover, message status indicator (sending, sent, error), retry button for failed messages, and copy message button on hover.

Create entity highlighting within messages by detecting entities in message text, displaying as highlighted spans with different colors by type, showing tooltips with entity type and copy option, and linking to entity detail.

Create a typing indicator component with animated dots, persona avatar, and label showing persona is typing.

Create a message input area with multi-line text input that auto-grows, send button with keyboard shortcut hint, character count if approaching limit, disabled state when AI is responding, and paste support for long messages.

## Right Panel - Real-time Analysis

Create a scam detection panel showing detected scam type with confidence, risk level indicator (gauge or bar), risk factors list, and update animation when detection changes.

Create an extracted entities panel with live list of entities found during session, entity type badges, values with copy buttons, timestamp when found, and link to full entity detail.

Create a session info panel showing session ID with copy button, status with live indicator for active, persona details with traits, start time and duration, turn count, and entities count.

Create a persona info card showing current persona with icon, name, full description, behavioral traits list, vulnerabilities, and effectiveness metrics.

## Chat Functionality

Implement start new session by posting to engage endpoint with scammer message and optional persona selection. Handle success by creating session, adding AI response as message, and updating scam detection panel. Handle errors with error message and retry option.

Implement continue conversation by posting to continue endpoint with session ID and scammer message. Implement optimistic update by adding scammer message immediately with sending status, showing typing indicator, adding AI response when received, and updating entities list.

Implement end session by posting to delete endpoint or allowing natural completion. Show session summary and option to export.

Implement message retry for failed messages with retry button that attempts to resend.

## Sound Effects

Implement optional sound effects for message received (subtle notification), message sent (subtle whoosh), error (subtle alert), and new entity extracted (subtle ding). Include toggle in settings with user preference persistence.

## Chat State Management

Create chat store using Zustand with immer for immutable updates. Store active session, messages array, loading state, typing state, extracted entities, last scam detection, risk score, and settings. Include actions for start session, add message, update message, set typing, add entities, and clear session. Use session storage for persistence during page refresh.

## API Integration

Create honeypot API file with engage function for starting session, continue function for sending messages, getSession function for loading session, and deleteSession function for ending session.

Create use-chat hook as the main chat functionality hook combining mutations, state updates, and sound effects.

Create use-session-loader hook for loading existing session from URL parameter.

## Scenario Constants

Create scenarios constant file with all predefined scam scenarios including ID, name, description, icon, category, scam type, initial message, suggested persona, difficulty level, tags, and expected entities.

Create persona constants file with full persona definitions including ID, label, icon, description, trait, characteristics list, behavioral patterns, vulnerabilities, response style, effectiveness scores by scam type, and color.

## Quality Requirements

The chat must feel instantaneous with optimistic updates. Messages must persist across page refresh during active session. The UI must be responsive with mobile-friendly layout. Accessibility must support keyboard navigation including Tab to input, Enter to send, and Escape to cancel. Real-time analysis must update without disrupting the chat flow. Large conversations must perform well with virtual scrolling.

---

# ═══════════════════════════════════════════════════════════════════════════════
# PROMPT 8: Final Polish & Production
# ═══════════════════════════════════════════════════════════════════════════════

## Context & Objective

This is the final prompt that transforms ScamShield into a fully production-ready, enterprise-grade platform worthy of Google, Meta, Apple, and Microsoft standards. Implement documentation pages, marketing pages, settings, production optimizations, deployment infrastructure, testing suite, and all final polish.

## Documentation Pages

Create a documentation home page with search bar using keyboard shortcut (Cmd+K), category cards with icons linking to sections, quick links to popular topics, version badge, and API stats.

Create an interactive API reference page with sidebar navigation organized by endpoint group, endpoint documentation with method badge, path, description, parameters table, request body schema, response examples, and code tabs for curl, Python, and JavaScript. Include an interactive API playground with request builder, execute button, and response display with timing.

Create getting started guide with prerequisites, installation steps, quick start example, and next steps.

Create architecture documentation with system diagrams, component explanations, and data flow descriptions.

Create persona documentation with details for each of the 5 personas.

Create scam types documentation explaining each of the 8 detected scam types.

Create entity types documentation explaining each of the 7 extracted entity types.

Create deployment guide with step-by-step deployment instructions for various platforms.

Create changelog page with version history using semantic versioning.

Create FAQ page with common questions and answers in accordion format.

## Documentation Components

Create docs-sidebar component with table of contents, collapsible sections, and scroll spy for active section.

Create docs-search component as a modal with full-text search across documentation.

Create code-block component with syntax highlighting, copy button, and language indicator.

Create api-endpoint component for documenting individual endpoints with all details.

Create api-playground component for interactive API testing.

Create tabs-code component for showing code in multiple languages.

Create callout component for info, warning, and error notices.

Create schema-viewer component for displaying JSON schemas.

## Marketing Pages

Create public landing page with hero section featuring headline, subheadline, and call-to-action buttons. Include features showcase grid, statistics section, technology stack display, testimonials (placeholder), and call-to-action section.

Create about page explaining the ScamShield mission and team.

Create features page with detailed feature descriptions.

Create pricing page (placeholder for future monetization).

Create contact page with contact form.

Create privacy policy page.

Create terms of service page.

Create marketing components including hero, features-grid, stats-section, testimonials, cta-section, footer, navbar, and contact-form.

## Settings Pages

Create main settings page with navigation to all settings sections.

Create profile settings page with user profile form.

Create API keys settings page with list of API keys, create new key modal, revoke key functionality, and usage statistics.

Create notifications settings page with email and push notification toggles.

Create appearance settings page with theme selection (light, dark, system), accent color picker, and display density options.

Create integrations settings page showing available third-party integrations.

Create settings components including settings-sidebar, profile-form, api-key-list, api-key-create, notification-toggles, theme-switcher, danger-zone for account deletion, and export-data.

## Production Optimization

Create optimized next.config.js with React strict mode, SWC minification, image optimization with AVIF and WebP support, optimized package imports, output as standalone, security headers including X-DNS-Prefetch-Control, HSTS, X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy, and Content-Security-Policy.

Create middleware.ts for edge middleware handling authentication and rate limiting.

Create instrumentation.ts for OpenTelemetry integration.

Create Sentry configuration files for client, server, and edge with error tracking.

Create analytics utilities for initializing analytics, defining events, and wrapping providers.

Create monitoring utilities for performance tracking and error reporting.

Create SEO utilities for metadata generation and JSON-LD structured data.

Create security utilities for CSP headers, security headers, and rate limiting.

## Build and Deployment

Create production environment file with all required variables.

Create staging environment file.

Create production Dockerfile with multi-stage build using deps stage for dependencies, builder stage for compilation, and runner stage with non-root user, health check, and minimal image size.

Create docker-compose.yml for local and staging environments.

Create .dockerignore file.

Create vercel.json for Vercel deployment configuration.

Create netlify.toml for Netlify deployment configuration.

Create render.yaml for Render.com deployment configuration.

Create GitHub Actions workflows for CI including lint, type check, tests, build, E2E tests, Lighthouse audit, and bundle size check. Create CD workflow for production deployment. Create preview workflow for PR preview deployments.

Create PR template and issue templates for bugs and feature requests.

## Testing Suite

Create Playwright configuration for E2E testing.

Create E2E tests for dashboard, chat, and authentication flows.

Create Vitest configuration for unit tests.

Create unit tests for custom hooks and utility functions.

Create integration tests for API functions.

Create Jest configuration as alternative.

Create Lighthouse configuration for performance auditing.

Create Cypress configuration and smoke tests as alternative E2E framework.

## Final Documentation

Create comprehensive README with badges, description, features, tech stack, quick start, project structure, available scripts, environment variables, deployment instructions, documentation links, contributing section, and license.

Create CONTRIBUTING.md with contribution guidelines, development workflow, and code standards.

Create CHANGELOG.md with version history.

Create DEPLOYMENT.md with detailed deployment instructions for all platforms.

Create ARCHITECTURE.md explaining frontend architecture decisions.

Create SECURITY.md documenting security measures.

Create PERFORMANCE.md with performance optimization guidelines.

Create TESTING.md explaining testing strategy and instructions.

Create ACCESSIBILITY.md with accessibility guidelines and audit checklist.

Create CODE_OF_CONDUCT.md.

Create LICENSE file with MIT license.

Create robots.txt for search engines.

Create sitemap configuration.

Create PWA manifest.json with app name, icons, theme colors, and display settings.

Create browserconfig.xml for Windows tiles.

Create humans.txt with team credits.

## Quality Requirements

Achieve Lighthouse performance score of 95+. Ensure Core Web Vitals are optimized with FCP under 1.5s, TTI under 3.5s, and CLS under 0.1. Implement code splitting and lazy loading. Use image optimization with modern formats. Implement efficient caching strategies. Ensure WCAG 2.1 AA accessibility compliance. Implement keyboard navigation, screen reader support, focus management, and high contrast support. Ensure comprehensive SEO with meta tags, Open Graph, structured data, sitemap, and canonical URLs. Prepare PWA with manifest, service worker architecture, and offline support. Set up monitoring with Sentry error tracking, performance monitoring, and analytics. Achieve high test coverage with unit, integration, and E2E tests.

---

# ═══════════════════════════════════════════════════════════════════════════════
# COMPARISON & RECOMMENDATION
# ═══════════════════════════════════════════════════════════════════════════════

## Comparison of Prompt Formats

### Original Detailed Prompts (FRONTEND_PROMPTS.md)
**Pros:**
- Contains complete, copy-paste ready code for every file
- Includes exact TypeScript interfaces and implementations
- Shows precise file paths and folder structure
- Provides working examples with all edge cases
- No ambiguity about implementation details
- Total: ~18,000 lines covering 500+ files

**Cons:**
- Very long prompts (2000+ lines each)
- May hit token limits with smaller context windows
- Less flexibility for AI interpretation
- Code might not match exact project needs
- Higher risk of outdated patterns

### Concise English Prompts (This File)
**Pros:**
- Compact and readable prompts
- Allows AI to use latest patterns and best practices
- Flexible for different project variations
- Won't hit token limits
- Easier to modify and customize
- Total: ~5,000 lines covering the same 500+ files

**Cons:**
- AI must generate code from descriptions
- Potential for interpretation differences
- May miss some edge cases
- Requires strong AI reasoning capability

## Recommendation for Claude Opus 4.5 with Thinking

**USE THE CONCISE ENGLISH PROMPTS (This File)** for the following reasons:

1. **Claude Opus 4.5 Thinking Capability:** The thinking mode in Antigravity enables Claude to reason through complex requirements and generate high-quality code. It doesn't need copy-paste templates - it can synthesize better code from clear descriptions.

2. **Latest Best Practices:** The AI will use the most current patterns for Next.js 14, React, and TypeScript rather than potentially outdated code snippets.

3. **Token Efficiency:** The concise prompts fit comfortably within context windows, leaving room for the AI to reason and generate comprehensive output.

4. **Flexibility:** The AI can adapt the implementation to your exact project structure and handle edge cases intelligently.

5. **Maintainability:** English descriptions are easier to update and modify than thousands of lines of code.

## How to Use These Prompts

1. Copy one prompt at a time (Prompt 0 through Prompt 8)
2. Paste into Claude Opus 4.5 with Thinking enabled
3. Add context: "Using the existing backend at [your-api-url], create all files described in this prompt following FAANG-level quality standards."
4. Let Claude generate the complete implementation
5. Review and iterate on specific sections if needed
6. Proceed to the next prompt

## Alternative: Hybrid Approach

If you need more specificity for certain complex features, you can:
1. Use concise prompts as the base
2. Add detailed specifications for specific complex components
3. Reference the detailed FRONTEND_PROMPTS.md for exact code when needed

---

**Created for:** India AI Impact Buildathon 2026  
**Project:** ScamShield Agentic Honeypot Dashboard  
**Quality Standard:** FAANG/MNC Enterprise Level (Google, Meta, Apple, Microsoft)  
**AI Model:** Claude Opus 4.5 with Thinking (Antigravity)
