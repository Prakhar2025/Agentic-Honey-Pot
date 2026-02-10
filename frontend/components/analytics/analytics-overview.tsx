// Analytics Overview - KPI Cards with Sparklines
'use client'

import { motion } from 'framer-motion'
import {
    Activity,
    MessageSquare,
    Shield,
    Users,
    TrendingUp,
    TrendingDown,
    Clock,
    Target,
    Zap,
    CheckCircle
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Sparkline } from '@/components/charts/sparkline'
import { cn } from '@/lib/utils'
import { useAnalyticsOverview } from '@/lib/hooks'
import { formatNumber, formatPercentage, formatDuration } from '@/lib/utils/format'
import { CHART_COLORS } from '@/lib/constants/chart-colors'
import { useAnalyticsStore } from '@/lib/stores'
import { TIME_RANGES } from '@/lib/constants/time-ranges'

interface KPICardProps {
    title: string
    value: string
    change?: number
    changeLabel?: string
    icon: React.ReactNode
    sparklineData?: number[]
    sparklineColor?: string
    tooltip?: string
    index: number
}

function KPICard({
    title,
    value,
    change,
    changeLabel,
    icon,
    sparklineData,
    sparklineColor = CHART_COLORS.primary,
    tooltip,
    index
}: KPICardProps) {
    const hasChange = change !== undefined && change !== null
    const isPositive = hasChange && change > 0
    const isNegative = hasChange && change < 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <Tooltip>
                <TooltipTrigger asChild>
                    <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/5">
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                        <CardContent className="relative p-4">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    {/* Icon and Title */}
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                            {icon}
                                        </div>
                                        <span className="text-sm font-medium text-muted-foreground">
                                            {title}
                                        </span>
                                    </div>

                                    {/* Value */}
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold tracking-tight">
                                            {value}
                                        </span>

                                        {/* Change Indicator */}
                                        {hasChange && (
                                            <span className={cn(
                                                "flex items-center gap-0.5 text-xs font-medium",
                                                isPositive && "text-green-500",
                                                isNegative && "text-red-500",
                                                !isPositive && !isNegative && "text-muted-foreground"
                                            )}>
                                                {isPositive ? (
                                                    <TrendingUp className="h-3 w-3" />
                                                ) : isNegative ? (
                                                    <TrendingDown className="h-3 w-3" />
                                                ) : null}
                                                {isPositive ? '+' : ''}{change.toFixed(1)}%
                                            </span>
                                        )}
                                    </div>

                                    {/* Change Label */}
                                    {changeLabel && (
                                        <p className="text-xs text-muted-foreground">
                                            {changeLabel}
                                        </p>
                                    )}
                                </div>

                                {/* Sparkline */}
                                {sparklineData && sparklineData.length > 0 && (
                                    <div className="h-12 w-20">
                                        <Sparkline
                                            data={sparklineData}
                                            color={sparklineColor}
                                        />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                {tooltip && (
                    <TooltipContent>
                        <p>{tooltip}</p>
                    </TooltipContent>
                )}
            </Tooltip>
        </motion.div>
    )
}

function KPICardSkeleton() {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-8 w-8 rounded-lg" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                        <Skeleton className="h-7 w-24" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-12 w-20" />
                </div>
            </CardContent>
        </Card>
    )
}

export function AnalyticsOverview() {
    const { data, isLoading, error } = useAnalyticsOverview()
    const { timeRange, compareEnabled } = useAnalyticsStore()

    const comparisonLabel = compareEnabled
        ? `vs ${TIME_RANGES[timeRange]?.comparisonLabel || 'previous period'}`
        : undefined

    if (isLoading) {
        return (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <KPICardSkeleton key={i} />
                ))}
            </div>
        )
    }

    if (error || !data) {
        return (
            <Card className="border-destructive/50 bg-destructive/5">
                <CardContent className="flex items-center justify-center p-8">
                    <p className="text-destructive">Failed to load analytics overview</p>
                </CardContent>
            </Card>
        )
    }

    const { summary, comparison } = data

    // Generate mock sparkline data (would come from API in real implementation)
    const generateSparklineData = (base: number, variance: number = 0.2) => {
        return Array.from({ length: 7 }, () =>
            Math.floor(base * (1 + (Math.random() - 0.5) * variance))
        )
    }

    const kpis = [
        {
            title: 'Total Sessions',
            value: formatNumber(summary.total_sessions),
            change: comparison?.sessions_change,
            changeLabel: comparisonLabel,
            icon: <Activity className="h-4 w-4 text-primary" />,
            sparklineData: generateSparklineData(200),
            sparklineColor: CHART_COLORS.primary,
            tooltip: 'Total honeypot sessions in the selected period',
        },
        {
            title: 'Active Now',
            value: formatNumber(summary.active_sessions),
            icon: <Zap className="h-4 w-4 text-green-500" />,
            sparklineData: generateSparklineData(20, 0.4),
            sparklineColor: CHART_COLORS.success,
            tooltip: 'Currently active honeypot sessions',
        },
        {
            title: 'Entities Extracted',
            value: formatNumber(summary.total_entities),
            change: comparison?.entities_change,
            changeLabel: comparisonLabel,
            icon: <Target className="h-4 w-4 text-violet-500" />,
            sparklineData: generateSparklineData(500),
            sparklineColor: CHART_COLORS.secondary,
            tooltip: 'Total scam-related entities extracted (phone numbers, UPIs, etc.)',
        },
        {
            title: 'Success Rate',
            value: formatPercentage(summary.success_rate),
            change: comparison?.success_rate_change,
            changeLabel: comparisonLabel,
            icon: <CheckCircle className="h-4 w-4 text-emerald-500" />,
            sparklineData: generateSparklineData(90, 0.05),
            sparklineColor: CHART_COLORS.success,
            tooltip: 'Percentage of sessions that successfully gathered intelligence',
        },
        {
            title: 'Avg Duration',
            value: formatDuration(summary.avg_session_duration),
            change: comparison?.duration_change,
            changeLabel: comparisonLabel,
            icon: <Clock className="h-4 w-4 text-amber-500" />,
            sparklineData: generateSparklineData(600),
            sparklineColor: CHART_COLORS.warning,
            tooltip: 'Average session duration in minutes',
        },
    ]

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {kpis.map((kpi, index) => (
                <KPICard key={kpi.title} {...kpi} index={index} />
            ))}
        </div>
    )
}

// Export skeleton for use in page loading
export function AnalyticsOverviewSkeleton() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
                <KPICardSkeleton key={i} />
            ))}
        </div>
    )
}
