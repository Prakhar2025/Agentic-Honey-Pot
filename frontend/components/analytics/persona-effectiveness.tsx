// Persona Effectiveness Chart - Horizontal Bar Chart
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
    Cell,
    LabelList,
} from 'recharts'
import { Users } from 'lucide-react'

import { ChartContainer } from '@/components/charts/chart-container'
import { usePersonaEffectiveness } from '@/lib/hooks/use-analytics'
import { formatNumber, formatPercentage } from '@/lib/utils/format'
import { PERSONA_COLORS, SERIES_COLORS } from '@/lib/constants/chart-colors'

const PERSONA_LABELS: Record<string, string> = {
    elderly_victim: 'Elderly Victim',
    tech_novice: 'Tech Novice',
    eager_investor: 'Eager Investor',
    curious_user: 'Curious User',
    confused_senior: 'Confused Senior',
    trusting_customer: 'Trusting Customer',
    worried_parent: 'Worried Parent',
    busy_professional: 'Busy Professional',
}

interface CustomTooltipProps {
    active?: boolean
    payload?: Array<{
        payload: {
            persona: string
            total_sessions: number
            completed_sessions: number
            success_rate: number
            avg_turns: number
            avg_entities: number
            effectiveness_score: number
        }
    }>
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload || !payload[0]) return null

    const data = payload[0].payload
    const label = PERSONA_LABELS[data.persona] || data.persona

    return (
        <div className="rounded-lg border bg-popover/95 p-3 shadow-lg backdrop-blur-sm">
            <p className="mb-2 font-medium">{label}</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <span className="text-muted-foreground">Sessions:</span>
                <span className="font-medium">{formatNumber(data.total_sessions)}</span>
                <span className="text-muted-foreground">Completed:</span>
                <span className="font-medium">{formatNumber(data.completed_sessions)}</span>
                <span className="text-muted-foreground">Success Rate:</span>
                <span className="font-medium">{formatPercentage(data.success_rate)}</span>
                <span className="text-muted-foreground">Avg Turns:</span>
                <span className="font-medium">{data.avg_turns.toFixed(1)}</span>
                <span className="text-muted-foreground">Avg Entities:</span>
                <span className="font-medium">{data.avg_entities.toFixed(1)}</span>
                <span className="text-muted-foreground">Effectiveness:</span>
                <span className="font-bold text-primary">{data.effectiveness_score.toFixed(1)}%</span>
            </div>
        </div>
    )
}

export function PersonaEffectiveness() {
    const { data, isLoading, error } = usePersonaEffectiveness()

    const chartData = useMemo(() => {
        if (!data?.data) return []
        return data.data
            .map((item, index) => ({
                ...item,
                label: PERSONA_LABELS[item.persona] || item.persona,
                fill: PERSONA_COLORS[item.persona] || SERIES_COLORS[index % SERIES_COLORS.length],
            }))
            .sort((a, b) => b.effectiveness_score - a.effectiveness_score)
    }, [data])

    return (
        <ChartContainer
            title="Persona Effectiveness"
            description="Compare performance across different honeypot personas"
            icon={<Users className="h-4 w-4" />}
            isEmpty={!chartData.length}
            isLoading={isLoading}
            error={error?.message}
        >
            <ResponsiveContainer width="100%" height={320}>
                <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 5, right: 60, left: 10, bottom: 5 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={false}
                        stroke="hsl(var(--border))"
                    />

                    <XAxis
                        type="number"
                        domain={[0, 100]}
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                        axisLine={{ stroke: 'hsl(var(--border))' }}
                        tickFormatter={(value) => `${value}%`}
                    />

                    <YAxis
                        type="category"
                        dataKey="label"
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                        width={110}
                    />

                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))' }} />

                    <Bar
                        dataKey="effectiveness_score"
                        radius={[0, 4, 4, 0]}
                        maxBarSize={24}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                        <LabelList
                            dataKey="effectiveness_score"
                            position="right"
                            formatter={(value: number) => `${value.toFixed(1)}%`}
                            className="fill-foreground text-xs font-medium"
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/* Legend / Info */}
            <div className="mt-4 flex flex-wrap justify-center gap-3 border-t pt-4">
                {chartData.slice(0, 4).map((item, index) => (
                    <div
                        key={item.persona}
                        className="flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1 text-xs"
                    >
                        <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.fill }}
                        />
                        <span>{item.label}</span>
                        <span className="font-medium">{item.total_sessions}</span>
                    </div>
                ))}
            </div>
        </ChartContainer>
    )
}
