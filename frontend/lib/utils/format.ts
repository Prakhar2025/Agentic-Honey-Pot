// Formatting Utilities for Analytics
import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns'

/**
 * Format large numbers with K/M/B suffixes
 */
export function formatNumber(value: number, decimals: number = 0): string {
    if (value === null || value === undefined || isNaN(value)) return '0'

    if (Math.abs(value) >= 1_000_000_000) {
        return (value / 1_000_000_000).toFixed(decimals) + 'B'
    }
    if (Math.abs(value) >= 1_000_000) {
        return (value / 1_000_000).toFixed(decimals) + 'M'
    }
    if (Math.abs(value) >= 1_000) {
        return (value / 1_000).toFixed(decimals) + 'K'
    }

    return value.toLocaleString('en-US', { maximumFractionDigits: decimals })
}

/**
 * Format percentage with optional decimals
 */
export function formatPercentage(value: number, decimals: number = 1): string {
    if (value === null || value === undefined || isNaN(value)) return '0%'
    return value.toFixed(decimals) + '%'
}

/**
 * Format duration in seconds to human readable
 */
export function formatDuration(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0s'

    if (seconds < 60) {
        return `${Math.round(seconds)}s`
    }

    if (seconds < 3600) {
        const mins = Math.floor(seconds / 60)
        const secs = Math.round(seconds % 60)
        return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`
    }

    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

/**
 * Format bytes to human readable size
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
    if (!bytes || bytes === 0) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * Format currency (USD)
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
    if (value === null || value === undefined || isNaN(value)) return '$0.00'

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)
}

/**
 * Format latency in milliseconds
 */
export function formatLatency(ms: number): string {
    if (!ms || isNaN(ms)) return '0ms'

    if (ms < 1000) {
        return `${Math.round(ms)}ms`
    }

    return `${(ms / 1000).toFixed(2)}s`
}

/**
 * Format date for display
 */
export function formatDate(dateStr: string, formatStr: string = 'MMM d, yyyy'): string {
    try {
        const date = parseISO(dateStr)
        if (!isValid(date)) return dateStr
        return format(date, formatStr)
    } catch {
        return dateStr
    }
}

/**
 * Format relative time
 */
export function formatRelativeTime(dateStr: string): string {
    try {
        const date = parseISO(dateStr)
        if (!isValid(date)) return dateStr
        return formatDistanceToNow(date, { addSuffix: true })
    } catch {
        return dateStr
    }
}

/**
 * Format trend value with arrow
 */
export function formatTrend(value: number): { text: string; isPositive: boolean; isNeutral: boolean } {
    if (value === 0) {
        return { text: '0%', isPositive: false, isNeutral: true }
    }

    const isPositive = value > 0
    const text = `${isPositive ? '+' : ''}${value.toFixed(1)}%`

    return { text, isPositive, isNeutral: false }
}

/**
 * Format count with singular/plural label
 */
export function formatCount(count: number, singular: string, plural?: string): string {
    const label = count === 1 ? singular : (plural || singular + 's')
    return `${formatNumber(count)} ${label}`
}

/**
 * Format tokens count
 */
export function formatTokens(tokens: number): string {
    if (tokens >= 1_000_000) {
        return (tokens / 1_000_000).toFixed(2) + 'M'
    }
    if (tokens >= 1_000) {
        return (tokens / 1_000).toFixed(1) + 'K'
    }
    return tokens.toString()
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
}

/**
 * Round to specified decimal places
 */
export function roundTo(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals)
    return Math.round(value * factor) / factor
}
