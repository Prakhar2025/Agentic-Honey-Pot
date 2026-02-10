// Detection Funnel Chart - Conversion Flow Visualization
'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Filter, ArrowDown, CheckCircle } from 'lucide-react'

import { ChartContainer } from '@/components/charts/chart-container'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { useDetectionFunnel } from '@/lib/hooks'
import { formatNumber, formatPercentage } from '@/lib/utils/format'
import { CHART_COLORS } from '@/lib/constants/chart-colors'

const STAGE_COLORS = [
    '#3b82f6', // blue-500
    '#8b5cf6', // violet-500
    '#22c55e', // green-500
    '#f59e0b', // amber-500
    '#ec4899', // pink-500
    '#06b6d4', // cyan-500
]

export function DetectionFunnel() {
    const { data, isLoading, error } = useDetectionFunnel()

    const stages = useMemo(() => {
        if (!data?.stages) return []
        return data.stages.map((stage, index) => ({
            ...stage,
            color: STAGE_COLORS[index % STAGE_COLORS.length],
        }))
    }, [data])

    const maxCount = stages[0]?.count || 1

    return (
        <ChartContainer
            title="Detection Funnel"
            description="Scam detection and intelligence gathering flow"
            icon={<Filter className="h-4 w-4" />}
            isEmpty={!stages.length}
            isLoading={isLoading}
            error={error?.message}
        >
            <div className="space-y-2">
                {stages.map((stage, index) => {
                    const width = (stage.count / maxCount) * 100
                    const isLast = index === stages.length - 1

                    return (
                        <motion.div
                            key={stage.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Funnel Bar */}
                            <div className="relative">
                                <div
                                    className="relative flex items-center justify-between rounded-lg p-3 transition-all hover:opacity-90"
                                    style={{
                                        backgroundColor: `${stage.color}15`,
                                        width: `${Math.max(width, 30)}%`,
                                        marginLeft: `${(100 - Math.max(width, 30)) / 2}%`,
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="h-3 w-3 rounded-full"
                                            style={{ backgroundColor: stage.color }}
                                        />
                                        <span className="text-sm font-medium">{stage.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold">
                                            {formatNumber(stage.count)}
                                        </span>
                                        {index > 0 && (
                                            <span className={cn(
                                                "text-xs px-2 py-0.5 rounded-full",
                                                stage.conversion_rate >= 80 ? "bg-green-500/20 text-green-600" :
                                                    stage.conversion_rate >= 60 ? "bg-yellow-500/20 text-yellow-600" :
                                                        "bg-red-500/20 text-red-600"
                                            )}>
                                                {formatPercentage(stage.conversion_rate)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div
                                    className="absolute bottom-0 left-0 h-1 rounded-b-lg transition-all"
                                    style={{
                                        backgroundColor: stage.color,
                                        width: `${Math.max(width, 30)}%`,
                                        marginLeft: `${(100 - Math.max(width, 30)) / 2}%`,
                                    }}
                                />
                            </div>

                            {/* Arrow Connector */}
                            {!isLast && (
                                <div className="flex justify-center py-1">
                                    <ArrowDown className="h-4 w-4 text-muted-foreground" />
                                </div>
                            )}
                        </motion.div>
                    )
                })}
            </div>

            {/* Summary Stats */}
            {stages.length > 0 && (
                <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg bg-muted/30 p-4">
                    <div className="text-center">
                        <p className="text-lg font-bold text-primary">
                            {formatNumber(stages[0]?.count || 0)}
                        </p>
                        <p className="text-xs text-muted-foreground">Input</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold text-green-500">
                            {formatNumber(stages[stages.length - 1]?.count || 0)}
                        </p>
                        <p className="text-xs text-muted-foreground">Output</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold">
                            {stages[0]?.count
                                ? formatPercentage((stages[stages.length - 1]?.count / stages[0].count) * 100)
                                : '0%'}
                        </p>
                        <p className="text-xs text-muted-foreground">Overall Rate</p>
                    </div>
                </div>
            )}
        </ChartContainer>
    )
}
