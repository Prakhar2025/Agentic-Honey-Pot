'use client'

import * as React from 'react'
import { Line, LineChart, ResponsiveContainer } from 'recharts'

interface SparklineProps {
    data: number[]
    color?: string
    height?: number
    strokeWidth?: number
    className?: string
}

export function Sparkline({
    data,
    color = '#3b82f6',
    height = 40,
    strokeWidth = 2,
    className,
}: SparklineProps) {
    const chartData = React.useMemo(
        () => data.map((value, index) => ({ value, index })),
        [data]
    )

    if (!data || data.length === 0) {
        return null
    }

    return (
        <div className={className} style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        dot={false}
                        isAnimationActive={true}
                        animationDuration={500}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

// Area sparkline variant
interface AreaSparklineProps extends SparklineProps {
    fillOpacity?: number
}

export function AreaSparkline({
    data,
    color = '#3b82f6',
    height = 40,
    strokeWidth = 2,
    fillOpacity = 0.2,
    className,
}: AreaSparklineProps) {
    const chartData = React.useMemo(
        () => data.map((value, index) => ({ value, index })),
        [data]
    )

    if (!data || data.length === 0) {
        return null
    }

    return (
        <div className={className} style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <defs>
                        <linearGradient id={`sparkline-gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={fillOpacity} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        dot={false}
                        fill={`url(#sparkline-gradient-${color.replace('#', '')})`}
                        isAnimationActive={true}
                        animationDuration={500}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
