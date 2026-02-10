// Sessions Over Time Chart - Line/Area chart with grouping options
'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush,
} from 'recharts'
import { BarChart3, TrendingUp } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ChartContainer } from '@/components/charts/chart-container'
import { cn } from '@/lib/utils'
import { useSessionsOverTime } from '@/lib/hooks'
import { useAnalyticsStore } from '@/lib/stores'
import { formatChartDate } from '@/lib/utils/date-ranges'
import { formatNumber } from '@/lib/utils/format'
import { CHART_COLORS, STATUS_COLORS } from '@/lib/constants/chart-colors'

type GroupBy = 'status' | 'scam_type' | 'persona'

const GROUP_OPTIONS = [
    { value: 'status' as const, label: 'By Status' },
    { value: 'scam_type' as const, label: 'By Scam Type' },
    { value: 'persona' as const, label: 'By Persona' },
]

interface CustomTooltipProps {
    active?: boolean
    payload?: Array<{ color: string; name: string; value: number }>
    label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    const { granularity } = useAnalyticsStore()

    if (!active || !payload || !label) return null

    return (
        <div className="rounded-lg border bg-popover/95 p-3 shadow-lg backdrop-blur-sm">
            <p className="mb-2 text-sm font-medium text-foreground">
                {formatChartDate(label, granularity)}
            </p>
            <div className="space-y-1">
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-muted-foreground">{entry.name}:</span>
                        <span className="font-medium">{formatNumber(entry.value)}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function SessionsOverTime() {
    const [groupBy, setGroupBy] = useState<GroupBy>('status')
    const { granularity } = useAnalyticsStore()
    const { data, isLoading, error } = useSessionsOverTime({ groupBy })

    const chartData = useMemo(() => {
        if (!data?.data) return []
        return data.data.map((point) => ({
            ...point,
            date: formatChartDate(point.timestamp, granularity),
        }))
    }, [data, granularity])

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>
        )
    }

    return (
        <ChartContainer
            title="Sessions Over Time"
            description="Track session trends and patterns over the selected period"
            icon={<TrendingUp className="h-4 w-4" />}
            isEmpty={!chartData.length}
            error={error?.message}
            actions={
                <div className="flex gap-1">
                    {GROUP_OPTIONS.map((option) => (
                        <Button
                            key={option.value}
                            variant={groupBy === option.value ? 'secondary' : 'ghost'}
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => setGroupBy(option.value)}
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>
            }
        >
            <ResponsiveContainer width="100%" height={320}>
                <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="gradientTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gradientCompleted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={STATUS_COLORS.completed} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={STATUS_COLORS.completed} stopOpacity={0} />
                        </linearGradient>
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
                        wrapperStyle={{ paddingTop: 20 }}
                        iconType="circle"
                        iconSize={8}
                    />

                    {groupBy === 'status' && (
                        <>
                            <Area
                                type="monotone"
                                dataKey="total"
                                name="Total"
                                stroke={CHART_COLORS.primary}
                                fill="url(#gradientTotal)"
                                strokeWidth={2}
                            />
                            <Line
                                type="monotone"
                                dataKey="completed"
                                name="Completed"
                                stroke={STATUS_COLORS.completed}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="active"
                                name="Active"
                                stroke={STATUS_COLORS.active}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="failed"
                                name="Failed"
                                stroke={STATUS_COLORS.failed}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4 }}
                            />
                        </>
                    )}

                    {groupBy !== 'status' && (
                        <Area
                            type="monotone"
                            dataKey="total"
                            name="Sessions"
                            stroke={CHART_COLORS.primary}
                            fill="url(#gradientTotal)"
                            strokeWidth={2}
                        />
                    )}

                    <Brush
                        dataKey="date"
                        height={30}
                        stroke={CHART_COLORS.primary}
                        fill="hsl(var(--muted))"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}
