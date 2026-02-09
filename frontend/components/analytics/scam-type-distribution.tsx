// Scam Type Distribution - Interactive Donut Chart
'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    Sector,
} from 'recharts'
import { PieChart as PieChartIcon, TrendingUp, TrendingDown } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer } from '@/components/charts/chart-container'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useScamTypeDistribution } from '@/lib/hooks/use-analytics'
import { formatNumber, formatPercentage } from '@/lib/utils/format'
import { SCAM_TYPE_COLORS, SERIES_COLORS } from '@/lib/constants/chart-colors'

// Scam type display labels
const SCAM_TYPE_LABELS: Record<string, string> = {
    KYC_FRAUD: 'KYC Fraud',
    LOTTERY_SCAM: 'Lottery Scam',
    INVESTMENT_FRAUD: 'Investment Fraud',
    TECH_SUPPORT: 'Tech Support',
    JOB_SCAM: 'Job Scam',
    ROMANCE_SCAM: 'Romance Scam',
    PHISHING: 'Phishing',
    IMPERSONATION: 'Impersonation',
    PRIZE_SCAM: 'Prize Scam',
    CUSTOMS_FRAUD: 'Customs Fraud',
    OTHER: 'Other',
    UNKNOWN: 'Unknown',
}

interface CustomTooltipProps {
    active?: boolean
    payload?: Array<{
        payload: {
            scam_type: string
            count: number
            percentage: number
            avg_turns: number
            success_rate: number
            trend: number
        }
    }>
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload || !payload[0]) return null

    const data = payload[0].payload
    const label = SCAM_TYPE_LABELS[data.scam_type] || data.scam_type

    return (
        <div className="rounded-lg border bg-popover/95 p-3 shadow-lg backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
                <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: SCAM_TYPE_COLORS[data.scam_type] || SERIES_COLORS[0] }}
                />
                <span className="font-medium">{label}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <span className="text-muted-foreground">Count:</span>
                <span className="font-medium">{formatNumber(data.count)}</span>
                <span className="text-muted-foreground">Percentage:</span>
                <span className="font-medium">{formatPercentage(data.percentage)}</span>
                <span className="text-muted-foreground">Avg Turns:</span>
                <span className="font-medium">{data.avg_turns.toFixed(1)}</span>
                <span className="text-muted-foreground">Success Rate:</span>
                <span className="font-medium">{formatPercentage(data.success_rate)}</span>
                <span className="text-muted-foreground">Trend:</span>
                <span className={cn(
                    "flex items-center gap-1 font-medium",
                    data.trend > 0 ? "text-green-500" : data.trend < 0 ? "text-red-500" : ""
                )}>
                    {data.trend > 0 ? <TrendingUp className="h-3 w-3" /> : data.trend < 0 ? <TrendingDown className="h-3 w-3" /> : null}
                    {data.trend > 0 ? '+' : ''}{data.trend.toFixed(1)}%
                </span>
            </div>
        </div>
    )
}

interface ActiveShapeProps {
    cx: number
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    startAngle: number
    endAngle: number
    fill: string
    payload: { scam_type: string; percentage: number }
    percent: number
    value: number
}

const renderActiveShape = (props: ActiveShapeProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
    const RADIAN = Math.PI / 180
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)

    return (
        <g>
            <text x={cx} y={cy - 10} textAnchor="middle" className="fill-foreground text-base font-bold">
                {formatNumber(value)}
            </text>
            <text x={cx} y={cy + 10} textAnchor="middle" className="fill-muted-foreground text-xs">
                {formatPercentage(payload.percentage)}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 6}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 8}
                outerRadius={outerRadius + 12}
                fill={fill}
            />
        </g>
    )
}

function CustomLegend({ payload }: { payload?: Array<{ value: string; color: string }> }) {
    if (!payload) return null

    return (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
            {payload.map((entry, index) => (
                <div
                    key={`legend-${index}`}
                    className="flex items-center gap-1.5 rounded-full bg-muted/50 px-2.5 py-1 text-xs"
                >
                    <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span>{SCAM_TYPE_LABELS[entry.value] || entry.value}</span>
                </div>
            ))}
        </div>
    )
}

export function ScamTypeDistribution() {
    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
    const { data, isLoading, error } = useScamTypeDistribution()

    const chartData = useMemo(() => {
        if (!data?.data) return []
        return data.data.map((item, index) => ({
            ...item,
            fill: SCAM_TYPE_COLORS[item.scam_type] || SERIES_COLORS[index % SERIES_COLORS.length],
        }))
    }, [data])

    const onPieEnter = (_: unknown, index: number) => {
        setActiveIndex(index)
    }

    const onPieLeave = () => {
        setActiveIndex(undefined)
    }

    return (
        <ChartContainer
            title="Scam Type Distribution"
            description="Breakdown of detected scam categories"
            icon={<PieChartIcon className="h-4 w-4" />}
            isEmpty={!chartData.length}
            isLoading={isLoading}
            error={error?.message}
        >
            <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape as unknown as (props: unknown) => JSX.Element}
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="count"
                        nameKey="scam_type"
                        onMouseEnter={onPieEnter}
                        onMouseLeave={onPieLeave}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.fill}
                                stroke="transparent"
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegend />} />
                </PieChart>
            </ResponsiveContainer>

            {/* Stats Grid Below Chart */}
            {data && (
                <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold">{formatNumber(data.total)}</p>
                        <p className="text-xs text-muted-foreground">Total Sessions</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">{chartData.length}</p>
                        <p className="text-xs text-muted-foreground">Scam Types</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">
                            {chartData[0] ? SCAM_TYPE_LABELS[chartData[0].scam_type] || chartData[0].scam_type : '-'}
                        </p>
                        <p className="text-xs text-muted-foreground">Top Category</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">
                            {chartData[0] ? formatPercentage(chartData[0].percentage) : '-'}
                        </p>
                        <p className="text-xs text-muted-foreground">Top Percentage</p>
                    </div>
                </div>
            )}
        </ChartContainer>
    )
}
