// Chart Color Constants - Professional FAANG-level color palette

// Primary chart colors optimized for both light and dark modes
export const CHART_COLORS = {
    primary: '#3b82f6',      // blue-500
    secondary: '#8b5cf6',    // violet-500
    success: '#22c55e',      // green-500
    danger: '#ef4444',       // red-500
    warning: '#f59e0b',      // amber-500
    info: '#06b6d4',         // cyan-500
    muted: '#9ca3af',        // gray-400
    purple: '#a855f7',       // purple-500
    pink: '#ec4899',         // pink-500
    indigo: '#6366f1',       // indigo-500
    teal: '#14b8a6',         // teal-500
    orange: '#f97316',       // orange-500
}

// Status-based colors
export const STATUS_COLORS = {
    active: '#22c55e',       // green-500
    completed: '#3b82f6',    // blue-500
    failed: '#ef4444',       // red-500
    pending: '#f59e0b',      // amber-500
    paused: '#9ca3af',       // gray-400
}

// Scam type specific colors
export const SCAM_TYPE_COLORS: Record<string, string> = {
    KYC_FRAUD: '#ef4444',            // red-500
    LOTTERY_SCAM: '#f59e0b',         // amber-500
    INVESTMENT_FRAUD: '#8b5cf6',     // violet-500
    TECH_SUPPORT: '#3b82f6',         // blue-500
    JOB_SCAM: '#22c55e',             // green-500
    ROMANCE_SCAM: '#ec4899',         // pink-500
    PHISHING: '#f97316',             // orange-500
    IMPERSONATION: '#06b6d4',        // cyan-500
    PRIZE_SCAM: '#a855f7',           // purple-500
    CUSTOMS_FRAUD: '#14b8a6',        // teal-500
    TAX_SCAM: '#6366f1',             // indigo-500
    CRYPTO_SCAM: '#eab308',          // yellow-500
    OTHER: '#6b7280',                // gray-500
    UNKNOWN: '#94a3b8',              // slate-400
}

// Persona colors
export const PERSONA_COLORS: Record<string, string> = {
    elderly_victim: '#3b82f6',       // blue-500
    tech_novice: '#22c55e',          // green-500
    eager_investor: '#8b5cf6',       // violet-500
    curious_user: '#f59e0b',         // amber-500
    confused_senior: '#ef4444',      // red-500
    trusting_customer: '#ec4899',    // pink-500
    worried_parent: '#06b6d4',       // cyan-500
    busy_professional: '#f97316',    // orange-500
    default: '#6b7280',              // gray-500
}

// Entity type colors
export const ENTITY_COLORS: Record<string, string> = {
    PHONE_NUMBER: '#3b82f6',         // blue-500
    UPI_ID: '#22c55e',               // green-500
    BANK_ACCOUNT: '#8b5cf6',         // violet-500
    URL: '#ef4444',                  // red-500
    EMAIL: '#ec4899',                // pink-500
    IFSC_CODE: '#f59e0b',            // amber-500
    CRYPTO_WALLET: '#eab308',        // yellow-500
    AADHAAR: '#06b6d4',              // cyan-500
    PAN: '#f97316',                  // orange-500
}

// Risk level colors
export const RISK_COLORS: Record<string, string> = {
    critical: '#dc2626',             // red-600
    high: '#ef4444',                 // red-500
    medium: '#f59e0b',               // amber-500
    low: '#22c55e',                  // green-500
    minimal: '#10b981',              // emerald-500
}

// Gradient definitions for area charts
export const GRADIENTS = {
    blue: { start: '#3b82f6', end: '#1d4ed8' },
    green: { start: '#22c55e', end: '#15803d' },
    purple: { start: '#8b5cf6', end: '#6d28d9' },
    red: { start: '#ef4444', end: '#b91c1c' },
    amber: { start: '#f59e0b', end: '#b45309' },
    pink: { start: '#ec4899', end: '#be185d' },
    cyan: { start: '#06b6d4', end: '#0e7490' },
}

// Heatmap color scale
export const HEATMAP_COLORS = [
    '#f3f4f6',  // gray-100 (0%)
    '#bbf7d0',  // green-200 (20%)
    '#86efac',  // green-300 (40%)
    '#4ade80',  // green-400 (60%)
    '#22c55e',  // green-500 (80%)
    '#16a34a',  // green-600 (100%)
]

// Sequential color palette for multiple series
export const SERIES_COLORS = [
    '#3b82f6',  // blue-500
    '#22c55e',  // green-500
    '#8b5cf6',  // violet-500
    '#f59e0b',  // amber-500
    '#ef4444',  // red-500
    '#ec4899',  // pink-500
    '#06b6d4',  // cyan-500
    '#f97316',  // orange-500
    '#a855f7',  // purple-500
    '#14b8a6',  // teal-500
]

// Chart theme for dark mode
export const DARK_THEME = {
    background: '#0f172a',          // slate-900
    text: '#f8fafc',                // slate-50
    grid: '#334155',                // slate-700
    tooltip: '#1e293b',             // slate-800
    axis: '#94a3b8',                // slate-400
}

// Chart theme for light mode
export const LIGHT_THEME = {
    background: '#ffffff',
    text: '#0f172a',                // slate-900
    grid: '#e2e8f0',                // slate-200
    tooltip: '#ffffff',
    axis: '#64748b',                // slate-500
}

// Get color based on percentage threshold
export function getHeatColor(percentage: number): string {
    if (percentage >= 20) return '#dc2626'   // red-600
    if (percentage >= 15) return '#ea580c'   // orange-600
    if (percentage >= 10) return '#d97706'   // amber-600
    if (percentage >= 5) return '#ca8a04'    // yellow-600
    if (percentage >= 2) return '#65a30d'    // lime-600
    if (percentage > 0) return '#16a34a'     // green-600
    return '#e5e7eb'                          // gray-200
}

// Get intensity color for heatmap
export function getIntensityColor(value: number, max: number): string {
    if (value === 0 || max === 0) return HEATMAP_COLORS[0]
    const ratio = value / max
    const index = Math.min(Math.floor(ratio * (HEATMAP_COLORS.length - 1)) + 1, HEATMAP_COLORS.length - 1)
    return HEATMAP_COLORS[index]
}

// Get color for trend values
export function getTrendColor(value: number, invert: boolean = false): string {
    const isPositive = invert ? value < 0 : value > 0
    if (value === 0) return CHART_COLORS.muted
    return isPositive ? CHART_COLORS.success : CHART_COLORS.danger
}
