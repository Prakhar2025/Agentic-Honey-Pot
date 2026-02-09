'use client'

import * as React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts'
import { PieChart as PieChartIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useScamTypesData } from '@/lib/hooks/use-dashboard-data'
import { SCAM_TYPES } from '@/lib/constants'

const COLORS: Record<string, string> = {
    KYC_FRAUD: '#ef4444',
    LOTTERY_SCAM: '#f97316',
    TECH_SUPPORT: '#eab308',
    INVESTMENT_FRAUD: '#8b5cf6',
    JOB_SCAM: '#3b82f6',
    LOAN_SCAM: '#22c55e',
    OTP_FRAUD: '#ec4899',
    UNKNOWN: '#6b7280',
}

export function ScamTypesChart() {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
    const { data, isLoading } = useScamTypesData()

    if (isLoading) return <ChartSkeleton />

    const renderActiveShape = (props: any) => {
        const {
            cx,
            cy,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
            percent,
        } = props

        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 8}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 10}
                    outerRadius={outerRadius + 12}
                    fill={fill}
                />
                <text
                    x={cx}
                    y={cy - 10}
                    textAnchor="middle"
                    className="fill-foreground text-sm font-bold"
                >
                    {formatScamType(payload.scam_type)}
                </text>
                <text
                    x={cx}
                    y={cy + 15}
                    textAnchor="middle"
                    className="fill-muted-foreground text-xs"
                >
                    {(percent * 100).toFixed(1)}%
                </text>
            </g>
        )
    }

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg font-semibold">Scam Distribution</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                activeIndex={activeIndex !== null ? activeIndex : undefined}
                                activeShape={renderActiveShape}
                                data={data?.distribution || []}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={70}
                                paddingAngle={2}
                                dataKey="count"
                                onMouseEnter={(_, index) => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                {data?.distribution.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[entry.scam_type] || COLORS.UNKNOWN}
                                        className="cursor-pointer transition-opacity hover:opacity-80"
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Custom Legend */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                    {data?.distribution.slice(0, 6).map((item) => (
                        <div
                            key={item.scam_type}
                            className="flex items-center gap-2 text-sm"
                        >
                            <span
                                className="h-3 w-3 rounded-full shrink-0"
                                style={{ backgroundColor: COLORS[item.scam_type] || COLORS.UNKNOWN }}
                            />
                            <span className="truncate text-muted-foreground">
                                {formatScamType(item.scam_type)}
                            </span>
                            <Badge variant="secondary" className="ml-auto text-xs shrink-0">
                                {item.percentage}%
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function formatScamType(type: string): string {
    return SCAM_TYPES[type as keyof typeof SCAM_TYPES]?.label || type.replace(/_/g, ' ')
}

function ChartSkeleton() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
                <Skeleton className="mx-auto h-[200px] w-[200px] rounded-full" />
                <div className="mt-4 grid grid-cols-2 gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Skeleton className="h-3 w-3 rounded-full" />
                            <Skeleton className="h-4 flex-1" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
