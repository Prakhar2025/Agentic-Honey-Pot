'use client'

import * as React from 'react'
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { TrendingUp, RefreshCw, Download, Maximize2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ChartTooltip } from '@/components/charts/chart-tooltip'
import { useTimelineData } from '@/lib/hooks'

interface ScamDetectionChartProps {
    timeRange?: string
}

const timeRanges = [
    { label: '24H', value: '24h' },
    { label: '7D', value: '7d' },
    { label: '30D', value: '30d' },
    { label: '90D', value: '90d' },
]

export function ScamDetectionChart({ timeRange: externalRange }: ScamDetectionChartProps) {
    const [internalRange, setInternalRange] = React.useState('7d')
    const timeRange = externalRange || internalRange
    const { data, isLoading, error, refetch } = useTimelineData(timeRange)

    if (isLoading) return <ChartSkeleton />
    if (error) return <ChartError onRetry={refetch} />

    return (
        <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg font-semibold">
                        Scam Detection Timeline
                    </CardTitle>
                </div>
                <div className="flex items-center gap-2">
                    {/* Time Range Selector */}
                    <div className="flex rounded-lg border bg-muted p-1">
                        {timeRanges.map((range) => (
                            <Button
                                key={range.value}
                                variant={timeRange === range.value ? 'secondary' : 'ghost'}
                                size="sm"
                                className="h-7 px-3 text-xs"
                                onClick={() => setInternalRange(range.value)}
                            >
                                {range.label}
                            </Button>
                        ))}
                    </div>

                    {/* Action buttons */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => refetch()}
                    >
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data?.data || []}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorIntelligence" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                                className="text-muted-foreground"
                                tickFormatter={(value) => {
                                    const date = new Date(value)
                                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                }}
                            />
                            <YAxis
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                                className="text-muted-foreground"
                            />
                            <Tooltip content={<ChartTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="sessions"
                                name="Sessions"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorSessions)"
                                animationDuration={500}
                            />
                            <Area
                                type="monotone"
                                dataKey="intelligence"
                                name="Intelligence"
                                stroke="#8b5cf6"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorIntelligence)"
                                animationDuration={500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Summary stats below chart */}
                <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                            {data?.totalSessions || 0}
                        </p>
                        <p className="text-xs text-muted-foreground">Total Sessions</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                            {data?.totalIntelligence || 0}
                        </p>
                        <p className="text-xs text-muted-foreground">Intel Extracted</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                            {data?.avgPerDay || 0}
                        </p>
                        <p className="text-xs text-muted-foreground">Avg/Day</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function ChartSkeleton() {
    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-[300px] w-full" />
                <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="text-center">
                            <Skeleton className="mx-auto h-8 w-16" />
                            <Skeleton className="mx-auto mt-1 h-3 w-20" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function ChartError({ onRetry }: { onRetry: () => void }) {
    return (
        <Card className="lg:col-span-2">
            <CardContent className="flex h-[400px] flex-col items-center justify-center">
                <p className="text-muted-foreground">Failed to load chart data</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={onRetry}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry
                </Button>
            </CardContent>
        </Card>
    )
}
