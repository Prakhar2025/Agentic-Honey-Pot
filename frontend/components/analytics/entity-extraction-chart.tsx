// Entity Extraction Chart - Stacked Area Chart
'use client'

import { useMemo, useState } from 'react'
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts'
import { Database, Eye, EyeOff } from 'lucide-react'

import { ChartContainer } from '@/components/charts/chart-container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useEntityExtraction } from '@/lib/hooks'
import { useAnalyticsStore } from '@/lib/stores'
import { formatChartDate } from '@/lib/utils/date-ranges'
import { formatNumber } from '@/lib/utils/format'
import { ENTITY_COLORS } from '@/lib/constants/chart-colors'

const ENTITY_LABELS: Record<string, string> = {
    PHONE_NUMBER: 'Phone Numbers',
    UPI_ID: 'UPI IDs',
    BANK_ACCOUNT: 'Bank Accounts',
    URL: 'URLs',
    EMAIL: 'Emails',
    IFSC_CODE: 'IFSC Codes',
}

const ENTITY_KEYS = ['PHONE_NUMBER', 'UPI_ID', 'BANK_ACCOUNT', 'URL', 'EMAIL', 'IFSC_CODE'] as const

interface CustomTooltipProps {
    active?: boolean
    payload?: Array<{ color: string; name: string; value: number }>
    label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    const { granularity } = useAnalyticsStore()

    if (!active || !payload || !label) return null

    const total = payload.reduce((sum, p) => sum + (p.value || 0), 0)

    return (
        <div className="rounded-lg border bg-popover/95 p-3 shadow-lg backdrop-blur-sm">
            <p className="mb-2 text-sm font-medium">
                {formatChartDate(label, granularity)}
            </p>
            <div className="space-y-1.5">
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-muted-foreground">
                                {ENTITY_LABELS[entry.name] || entry.name}
                            </span>
                        </div>
                        <span className="font-medium">{formatNumber(entry.value)}</span>
                    </div>
                ))}
                <div className="border-t pt-1.5 mt-1.5">
                    <div className="flex items-center justify-between text-sm font-medium">
                        <span>Total</span>
                        <span>{formatNumber(total)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LegendProps {
    payload?: Array<{ value: string; color: string }>
    visibleSeries: Set<string>
    toggleSeries: (key: string) => void
}

function CustomLegend({ payload, visibleSeries, toggleSeries }: LegendProps) {
    if (!payload) return null

    return (
        <div className="flex flex-wrap justify-center gap-2 pt-4">
            {payload.map((entry, index) => {
                const isVisible = visibleSeries.has(entry.value)
                return (
                    <button
                        key={index}
                        onClick={() => toggleSeries(entry.value)}
                        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-all ${isVisible
                            ? 'bg-muted/80'
                            : 'bg-muted/30 opacity-50'
                            }`}
                    >
                        <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: isVisible ? entry.color : '#888' }}
                        />
                        <span>{ENTITY_LABELS[entry.value] || entry.value}</span>
                        {isVisible ? (
                            <Eye className="h-3 w-3 text-muted-foreground" />
                        ) : (
                            <EyeOff className="h-3 w-3 text-muted-foreground" />
                        )}
                    </button>
                )
            })}
        </div>
    )
}

export function EntityExtractionChart() {
    const [visibleSeries, setVisibleSeries] = useState<Set<string>>(new Set(ENTITY_KEYS))
    const { granularity } = useAnalyticsStore()
    const { data, isLoading, error } = useEntityExtraction()

    const chartData = useMemo(() => {
        if (!data?.data) return []
        return data.data.map((point) => ({
            ...point,
            date: formatChartDate(point.timestamp, granularity),
        }))
    }, [data, granularity])

    const toggleSeries = (key: string) => {
        setVisibleSeries(prev => {
            const next = new Set(prev)
            if (next.has(key)) {
                next.delete(key)
            } else {
                next.add(key)
            }
            return next
        })
    }

    return (
        <ChartContainer
            title="Entity Extraction Trends"
            description="Extracted scam-related entities over time"
            icon={<Database className="h-4 w-4" />}
            isEmpty={!chartData.length}
            isLoading={isLoading}
            error={error?.message}
        >
            <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        {ENTITY_KEYS.map((key) => (
                            <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={ENTITY_COLORS[key]} stopOpacity={0.4} />
                                <stop offset="95%" stopColor={ENTITY_COLORS[key]} stopOpacity={0} />
                            </linearGradient>
                        ))}
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="hsl(var(--border))"
                    />

                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                        axisLine={{ stroke: 'hsl(var(--border))' }}
                    />

                    <YAxis
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => formatNumber(value)}
                        width={40}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Legend
                        content={(props: any) => (
                            <CustomLegend
                                payload={props.payload}
                                visibleSeries={visibleSeries}
                                toggleSeries={toggleSeries}
                            />
                        )}
                    />

                    {ENTITY_KEYS.map((key) => (
                        visibleSeries.has(key) && (
                            <Area
                                key={key}
                                type="monotone"
                                dataKey={key}
                                stackId="1"
                                stroke={ENTITY_COLORS[key]}
                                fill={`url(#gradient-${key})`}
                                strokeWidth={2}
                            />
                        )
                    ))}
                </AreaChart>
            </ResponsiveContainer>

            {/* Summary Stats */}
            {data?.summary && (
                <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold">{formatNumber(data.summary.total)}</p>
                        <p className="text-xs text-muted-foreground">Total Entities</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">{formatNumber(data.summary.high_confidence)}</p>
                        <p className="text-xs text-muted-foreground">High Confidence</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">
                            {data.summary.total > 0
                                ? ((data.summary.high_confidence / data.summary.total) * 100).toFixed(1)
                                : 0}%
                        </p>
                        <p className="text-xs text-muted-foreground">Verification Rate</p>
                    </div>
                </div>
            )}
        </ChartContainer>
    )
}
