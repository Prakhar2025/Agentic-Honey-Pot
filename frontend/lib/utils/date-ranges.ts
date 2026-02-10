// Date Range Utilities for Analytics
import {
    format,
    parseISO,
    differenceInDays,
    differenceInHours,
    subDays,
    subHours,
    subMonths,
    startOfDay,
    endOfDay,
    startOfWeek,
    startOfMonth,
    isValid
} from 'date-fns'
import { DateRange } from 'react-day-picker'
import { TimeRangeKey, TIME_RANGES, TimeRangeConfig } from '@/lib/constants/time-ranges'

/**
 * Get date range from time range key and optional custom range
 */
export function getDateRange(
    timeRange: TimeRangeKey,
    customRange?: DateRange
): { startDate: Date; endDate: Date } {
    if (timeRange === 'custom' && customRange?.from && customRange?.to) {
        return {
            startDate: customRange.from,
            endDate: customRange.to,
        }
    }

    const config = TIME_RANGES[timeRange]
    if (config) {
        const { start, end } = config.getRange()
        return { startDate: start, endDate: end }
    }

    // Default to 7 days
    return {
        startDate: startOfDay(subDays(new Date(), 6)),
        endDate: endOfDay(new Date()),
    }
}

/**
 * Get comparison date range for period-over-period analysis
 */
export function getComparisonRange(
    startDate: Date,
    endDate: Date
): { startDate: Date; endDate: Date } {
    const days = differenceInDays(endDate, startDate)

    return {
        startDate: subDays(startDate, days + 1),
        endDate: subDays(endDate, days + 1),
    }
}

/**
 * Determine optimal granularity based on date range
 */
export function getOptimalGranularity(
    startDate: Date,
    endDate: Date
): 'hour' | 'day' | 'week' | 'month' {
    const days = differenceInDays(endDate, startDate)

    if (days <= 1) return 'hour'
    if (days <= 31) return 'day'
    if (days <= 90) return 'week'
    return 'month'
}

/**
 * Format date for display in charts
 */
export function formatChartDate(
    dateStr: string,
    granularity: 'hour' | 'day' | 'week' | 'month'
): string {
    const date = parseISO(dateStr)
    if (!isValid(date)) return dateStr

    switch (granularity) {
        case 'hour':
            return format(date, 'HH:mm')
        case 'day':
            return format(date, 'MMM d')
        case 'week':
            return format(date, 'MMM d')
        case 'month':
            return format(date, 'MMM yyyy')
        default:
            return format(date, 'MMM d')
    }
}

/**
 * Format date for tooltips with full detail
 */
export function formatTooltipDate(
    dateStr: string,
    granularity: 'hour' | 'day' | 'week' | 'month'
): string {
    const date = parseISO(dateStr)
    if (!isValid(date)) return dateStr

    switch (granularity) {
        case 'hour':
            return format(date, 'MMM d, yyyy HH:mm')
        case 'day':
            return format(date, 'EEEE, MMM d, yyyy')
        case 'week':
            return `Week of ${format(date, 'MMM d, yyyy')}`
        case 'month':
            return format(date, 'MMMM yyyy')
        default:
            return format(date, 'MMM d, yyyy')
    }
}

/**
 * Get date range label for display
 */
export function getDateRangeLabel(
    startDate: Date,
    endDate: Date
): string {
    const days = differenceInDays(endDate, startDate)

    if (days === 0) {
        return format(startDate, 'MMM d, yyyy')
    }

    if (days < 365) {
        return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`
    }

    return `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`
}

/**
 * Check if date is within range
 */
export function isDateInRange(
    date: Date,
    startDate: Date,
    endDate: Date
): boolean {
    return date >= startDate && date <= endDate
}

/**
 * Parse API date string safely
 */
export function parseApiDate(dateStr: string): Date | null {
    try {
        const date = parseISO(dateStr)
        return isValid(date) ? date : null
    } catch {
        return null
    }
}

/**
 * Format duration in seconds to human readable
 */
export function formatDurationFromSeconds(seconds: number): string {
    if (seconds < 60) return `${Math.round(seconds)}s`
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
 * Get time range display info
 */
export function getTimeRangeInfo(timeRange: TimeRangeKey): TimeRangeConfig | undefined {
    return TIME_RANGES[timeRange]
}
