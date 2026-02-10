// Time Range Presets and Configuration
import { subDays, subMonths, startOfDay, endOfDay, startOfWeek, startOfMonth, subHours } from 'date-fns'

export type TimeRangeKey = 'today' | '24h' | '7d' | '30d' | '90d' | '6m' | '1y' | 'custom'

export interface TimeRangeConfig {
    label: string
    shortLabel: string
    getRange: () => { start: Date; end: Date }
    granularity: 'hour' | 'day' | 'week' | 'month'
    comparisonLabel: string
}

export const TIME_RANGES: Record<TimeRangeKey, TimeRangeConfig> = {
    today: {
        label: 'Today',
        shortLabel: 'Today',
        getRange: () => ({
            start: startOfDay(new Date()),
            end: endOfDay(new Date()),
        }),
        granularity: 'hour',
        comparisonLabel: 'yesterday',
    },
    '24h': {
        label: 'Last 24 Hours',
        shortLabel: '24H',
        getRange: () => ({
            start: subHours(new Date(), 24),
            end: new Date(),
        }),
        granularity: 'hour',
        comparisonLabel: 'previous 24 hours',
    },
    '7d': {
        label: 'Last 7 Days',
        shortLabel: '7D',
        getRange: () => ({
            start: startOfDay(subDays(new Date(), 6)),
            end: endOfDay(new Date()),
        }),
        granularity: 'day',
        comparisonLabel: 'previous 7 days',
    },
    '30d': {
        label: 'Last 30 Days',
        shortLabel: '30D',
        getRange: () => ({
            start: startOfDay(subDays(new Date(), 29)),
            end: endOfDay(new Date()),
        }),
        granularity: 'day',
        comparisonLabel: 'previous 30 days',
    },
    '90d': {
        label: 'Last 90 Days',
        shortLabel: '90D',
        getRange: () => ({
            start: startOfDay(subDays(new Date(), 89)),
            end: endOfDay(new Date()),
        }),
        granularity: 'week',
        comparisonLabel: 'previous 90 days',
    },
    '6m': {
        label: 'Last 6 Months',
        shortLabel: '6M',
        getRange: () => ({
            start: startOfMonth(subMonths(new Date(), 5)),
            end: endOfDay(new Date()),
        }),
        granularity: 'month',
        comparisonLabel: 'previous 6 months',
    },
    '1y': {
        label: 'Last Year',
        shortLabel: '1Y',
        getRange: () => ({
            start: startOfMonth(subMonths(new Date(), 11)),
            end: endOfDay(new Date()),
        }),
        granularity: 'month',
        comparisonLabel: 'previous year',
    },
    custom: {
        label: 'Custom Range',
        shortLabel: 'Custom',
        getRange: () => ({
            start: startOfDay(subDays(new Date(), 29)),
            end: endOfDay(new Date()),
        }),
        granularity: 'day',
        comparisonLabel: 'previous period',
    },
}

// Default time range presets for quick selection
export const DEFAULT_TIME_RANGES: TimeRangeKey[] = ['today', '7d', '30d', '90d']

// Extended time ranges for advanced users
export const EXTENDED_TIME_RANGES: TimeRangeKey[] = ['24h', '7d', '30d', '90d', '6m', '1y']
