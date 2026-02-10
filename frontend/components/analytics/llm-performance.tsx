// LLM Performance Chart - Model Performance Metrics
'use client'

import { useMemo } from 'react'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Cell,
} from 'recharts'
import { Cpu, Clock, DollarSign, Zap } from 'lucide-react'

import { ChartContainer } from '@/components/charts/chart-container'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useLLMPerformance } from '@/lib/hooks/use-analytics'
import { formatNumber, formatLatency, formatCurrency, formatTokens } from '@/lib/utils/format'
import { SERIES_COLORS } from '@/lib/constants/chart-colors'

interface CustomTooltipProps {
    active?: boolean
    payload?: Array<{
        payload: {
            model: string
            calls: number
            avg_latency: number
            tokens: number
            cost: number
        }
    }>
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload || !payload[0]) return null

    const data = payload[0].payload

    return (
        <div className="rounded-lg border bg-popover/95 p-3 shadow-lg backdrop-blur-sm">
            <p className="mb-2 font-medium">{data.model}</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <span className="text-muted-foreground">Calls:</span>
                <span className="font-medium">{formatNumber(data.calls)}</span>
                <span className="text-muted-foreground">Avg Latency:</span>
                <span className="font-medium">{formatLatency(data.avg_latency)}</span>
                <span className="text-muted-foreground">Tokens:</span>
                <span className="font-medium">{formatTokens(data.tokens)}</span>
                <span className="text-muted-foreground">Cost:</span>
                <span className="font-medium">{formatCurrency(data.cost)}</span>
            </div>
        </div>
    )
}

interface MetricCardProps {
    icon: React.ReactNode
    label: string
    value: string
    subValue?: string
    color?: string
}

function MetricCard({ icon, label, value, subValue, color = 'primary' }: MetricCardProps) {
    return (
        <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${color}/10`}>
                {icon}
            </div>
            <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-lg font-bold">{value}</p>
                {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
            </div>
        </div>
    )
}

export function LLMPerformance() {
    const { data, isLoading, error } = useLLMPerformance()

    const chartData = useMemo(() => {
        if (!data?.by_model) return []
        return data.by_model.map((model, index) => ({
            ...model,
            fill: SERIES_COLORS[index % SERIES_COLORS.length],
        }))
    }, [data])

    return (
        <ChartContainer
            title="LLM Performance"
            description="AI model usage, latency, and cost metrics"
            icon={<Cpu className="h-4 w-4" />}
            isEmpty={!chartData.length}
            isLoading={isLoading}
            error={error?.message}
        >
            {/* Top Metrics */}
            {data && (
                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <MetricCard
                        icon={<Zap className="h-5 w-5 text-blue-500" />}
                        label="Total Calls"
                        value={formatNumber(data.total_calls)}
                    />
                    <MetricCard
                        icon={<Clock className="h-5 w-5 text-amber-500" />}
                        label="Avg Latency"
                        value={formatLatency(data.avg_latency_ms)}
                        subValue={`P95: ${formatLatency(data.p95_latency_ms)}`}
                    />
                    <MetricCard
                        icon={<DollarSign className="h-5 w-5 text-green-500" />}
                        label="Total Cost"
                        value={formatCurrency(data.total_cost_usd)}
                    />
                    <MetricCard
                        icon={<Cpu className="h-5 w-5 text-violet-500" />}
                        label="Total Tokens"
                        value={formatTokens(data.total_tokens)}
                        subValue={`Error: ${data.error_rate.toFixed(2)}%`}
                    />
                </div>
            )}

            {/* Bar Chart */}
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={{ stroke: 'hsl(var(--border))' }} />
                    <YAxis type="category" dataKey="model" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={100} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))' }} />
                    <Bar dataKey="calls" name="API Calls" radius={[0, 4, 4, 0]} maxBarSize={20}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/* Model Breakdown */}
            {chartData.length > 0 && (
                <div className="mt-4 space-y-3 border-t pt-4">
                    <p className="text-sm font-medium">Model Breakdown</p>
                    {chartData.map((model, index) => {
                        const percentage = data ? (model.calls / data.total_calls) * 100 : 0
                        return (
                            <div key={model.model} className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: model.fill }} />
                                        <span>{model.model}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-muted-foreground">
                                        <span>{formatNumber(model.calls)} calls</span>
                                        <span>{formatCurrency(model.cost)}</span>
                                    </div>
                                </div>
                                <Progress value={percentage} className="h-1.5" style={{ '--progress-color': model.fill } as React.CSSProperties} />
                            </div>
                        )
                    })}
                </div>
            )}
        </ChartContainer>
    )
}
