// Date utility functions

import { format, formatDistanceToNow, parseISO, isToday, isYesterday, differenceInSeconds } from 'date-fns'

export function formatRelativeTime(dateString: string): string {
    try {
        const date = parseISO(dateString)
        return formatDistanceToNow(date, { addSuffix: true })
    } catch {
        return 'Unknown'
    }
}

export function formatTime(dateString: string): string {
    try {
        const date = parseISO(dateString)
        return format(date, 'h:mm a')
    } catch {
        return ''
    }
}

export function formatDateTime(dateString: string): string {
    try {
        const date = parseISO(dateString)
        if (isToday(date)) {
            return `Today at ${format(date, 'h:mm a')}`
        }
        if (isYesterday(date)) {
            return `Yesterday at ${format(date, 'h:mm a')}`
        }
        return format(date, 'MMM d, yyyy h:mm a')
    } catch {
        return 'Unknown'
    }
}

export function formatDuration(seconds: number): string {
    if (!seconds || seconds < 0) return '0s'

    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hours > 0) {
        return `${hours}h ${minutes}m`
    }
    if (minutes > 0) {
        return `${minutes}m ${secs}s`
    }
    return `${secs}s`
}

export function formatDateRange(from: Date | undefined, to: Date | undefined): string {
    if (!from) return 'Select date range'

    const fromStr = format(from, 'MMM d, yyyy')
    if (!to || from.getTime() === to.getTime()) {
        return fromStr
    }
    return `${fromStr} - ${format(to, 'MMM d, yyyy')}`
}

export function getSessionDuration(startedAt: string, endedAt?: string | null): number {
    try {
        const start = parseISO(startedAt)
        const end = endedAt ? parseISO(endedAt) : new Date()
        return differenceInSeconds(end, start)
    } catch {
        return 0
    }
}
