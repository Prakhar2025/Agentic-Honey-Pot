// Chart Helper Utilities
import { CHART_COLORS, SERIES_COLORS, getTrendColor } from '@/lib/constants/chart-colors'

/**
 * Get color for a specific index in a series
 */
export function getSeriesColor(index: number): string {
    return SERIES_COLORS[index % SERIES_COLORS.length]
}

/**
 * Generate gradient ID for chart
 */
export function getGradientId(baseId: string, index: number = 0): string {
    return `gradient-${baseId}-${index}`
}

/**
 * Calculate percentage change between two values
 */
export function calculateChange(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0
    return ((current - previous) / previous) * 100
}

/**
 * Get tick values for axis
 */
export function getAxisTicks(min: number, max: number, count: number = 5): number[] {
    const range = max - min
    const step = range / (count - 1)
    const ticks: number[] = []

    for (let i = 0; i < count; i++) {
        ticks.push(Math.round(min + step * i))
    }

    return ticks
}

/**
 * Format axis value based on magnitude
 */
export function formatAxisValue(value: number): string {
    if (Math.abs(value) >= 1_000_000) {
        return (value / 1_000_000).toFixed(1) + 'M'
    }
    if (Math.abs(value) >= 1_000) {
        return (value / 1_000).toFixed(1) + 'K'
    }
    return value.toString()
}

/**
 * Calculate moving average
 */
export function calculateMovingAverage(data: number[], window: number): number[] {
    const result: number[] = []

    for (let i = 0; i < data.length; i++) {
        const start = Math.max(0, i - window + 1)
        const end = i + 1
        const subset = data.slice(start, end)
        const avg = subset.reduce((a, b) => a + b, 0) / subset.length
        result.push(avg)
    }

    return result
}

/**
 * Get domain for chart axis with padding
 */
export function getChartDomain(
    data: number[],
    padding: number = 0.1
): [number, number] {
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min

    return [
        Math.floor(min - range * padding),
        Math.ceil(max + range * padding),
    ]
}

/**
 * Interpolate color between two colors based on value
 */
export function interpolateColor(
    color1: string,
    color2: string,
    factor: number
): string {
    const hex1 = color1.replace('#', '')
    const hex2 = color2.replace('#', '')

    const r1 = parseInt(hex1.substring(0, 2), 16)
    const g1 = parseInt(hex1.substring(2, 4), 16)
    const b1 = parseInt(hex1.substring(4, 6), 16)

    const r2 = parseInt(hex2.substring(0, 2), 16)
    const g2 = parseInt(hex2.substring(2, 4), 16)
    const b2 = parseInt(hex2.substring(4, 6), 16)

    const r = Math.round(r1 + factor * (r2 - r1))
    const g = Math.round(g1 + factor * (g2 - g1))
    const b = Math.round(b1 + factor * (b2 - b1))

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

/**
 * Generate color scale for heatmap
 */
export function generateColorScale(
    startColor: string,
    endColor: string,
    steps: number
): string[] {
    const colors: string[] = []

    for (let i = 0; i < steps; i++) {
        const factor = i / (steps - 1)
        colors.push(interpolateColor(startColor, endColor, factor))
    }

    return colors
}

/**
 * Calculate percentile
 */
export function calculatePercentile(data: number[], percentile: number): number {
    const sorted = [...data].sort((a, b) => a - b)
    const index = (percentile / 100) * (sorted.length - 1)
    const lower = Math.floor(index)
    const upper = Math.ceil(index)

    if (lower === upper) return sorted[lower]

    const fraction = index - lower
    return sorted[lower] * (1 - fraction) + sorted[upper] * fraction
}

/**
 * Calculate standard deviation
 */
export function calculateStdDev(data: number[]): number {
    const n = data.length
    if (n === 0) return 0

    const mean = data.reduce((a, b) => a + b, 0) / n
    const squaredDiffs = data.map(x => Math.pow(x - mean, 2))
    const variance = squaredDiffs.reduce((a, b) => a + b, 0) / n

    return Math.sqrt(variance)
}

/**
 * Bin data for histogram
 */
export function binData(
    data: number[],
    binCount: number
): { range: string; count: number }[] {
    if (data.length === 0) return []

    const min = Math.min(...data)
    const max = Math.max(...data)
    const binWidth = (max - min) / binCount

    const bins = Array.from({ length: binCount }, (_, i) => ({
        range: `${(min + i * binWidth).toFixed(1)}-${(min + (i + 1) * binWidth).toFixed(1)}`,
        count: 0,
    }))

    data.forEach(value => {
        const binIndex = Math.min(
            Math.floor((value - min) / binWidth),
            binCount - 1
        )
        bins[binIndex].count++
    })

    return bins
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength - 3) + '...'
}
