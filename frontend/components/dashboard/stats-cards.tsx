'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Activity,
    Radio,
    Brain,
    Target,
    TrendingUp,
    TrendingDown,
    Minus,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Sparkline } from '@/components/charts/sparkline'
import { useDashboardStats } from '@/lib/hooks/use-dashboard-data'
import { cn } from '@/lib/utils/cn'

interface StatCardProps {
    title: string
    value: number
    previousValue?: number
    format?: 'number' | 'percentage'
    icon: React.ReactNode
    iconColor: string
    iconBgColor: string
    sparklineData?: number[]
    href?: string
    live?: boolean
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

function formatNumber(value: number): string {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
    return value.toLocaleString()
}

export function StatsCards() {
    const { data, isLoading, error } = useDashboardStats()

    if (isLoading) return <StatsCardsSkeleton />
    if (error || !data) return <StatsCardsError />

    const stats: StatCardProps[] = [
        {
            title: 'Total Sessions',
            value: data.total_sessions,
            previousValue: data.previous_total_sessions,
            icon: <Activity className="h-5 w-5" />,
            iconColor: 'text-blue-600',
            iconBgColor: 'bg-blue-100 dark:bg-blue-900/30',
            sparklineData: data.sessions_trend,
            href: '/sessions',
        },
        {
            title: 'Active Sessions',
            value: data.active_sessions,
            icon: <Radio className="h-5 w-5" />,
            iconColor: 'text-green-600',
            iconBgColor: 'bg-green-100 dark:bg-green-900/30',
            live: true,
            href: '/sessions?status=active',
        },
        {
            title: 'Intelligence Extracted',
            value: data.total_intelligence,
            previousValue: data.previous_intelligence,
            icon: <Brain className="h-5 w-5" />,
            iconColor: 'text-purple-600',
            iconBgColor: 'bg-purple-100 dark:bg-purple-900/30',
            sparklineData: data.intelligence_trend,
            href: '/intelligence',
        },
        {
            title: 'Detection Rate',
            value: data.scam_detection_rate,
            previousValue: data.previous_detection_rate,
            format: 'percentage',
            icon: <Target className="h-5 w-5" />,
            iconColor: 'text-orange-600',
            iconBgColor: 'bg-orange-100 dark:bg-orange-900/30',
            href: '/analytics',
        },
    ]

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
            {stats.map((stat) => (
                <motion.div key={stat.title} variants={itemVariants}>
                    <StatCard {...stat} />
                </motion.div>
            ))}
        </motion.div>
    )
}

function StatCard({
    title,
    value,
    previousValue,
    format = 'number',
    icon,
    iconColor,
    iconBgColor,
    sparklineData,
    href,
    live,
}: StatCardProps) {
    const trend = previousValue ? ((value - previousValue) / previousValue) * 100 : 0
    const trendDirection = trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral'

    const formattedValue =
        format === 'percentage' ? `${value.toFixed(1)}%` : formatNumber(value)

    const content = (
        <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 cursor-pointer">
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                            {title}
                            {live && (
                                <span className="ml-2 inline-flex items-center">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                                    </span>
                                </span>
                            )}
                        </p>
                        <div className="flex items-baseline gap-2">
                            <motion.span
                                className="text-2xl font-bold tracking-tight"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: 'spring', stiffness: 100 }}
                            >
                                {formattedValue}
                            </motion.span>
                            {previousValue !== undefined && (
                                <TrendBadge direction={trendDirection} value={Math.abs(trend)} />
                            )}
                        </div>
                    </div>
                    <div className={cn('rounded-lg p-2.5', iconBgColor)}>
                        <span className={iconColor}>{icon}</span>
                    </div>
                </div>

                {sparklineData && sparklineData.length > 0 && (
                    <div className="mt-4 h-10">
                        <Sparkline
                            data={sparklineData}
                            color={trendDirection === 'up' ? '#22c55e' : trendDirection === 'down' ? '#ef4444' : '#6b7280'}
                        />
                    </div>
                )}
            </CardContent>

            {/* Hover gradient effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </Card>
    )

    return href ? <Link href={href}>{content}</Link> : content
}

function TrendBadge({
    direction,
    value,
}: {
    direction: 'up' | 'down' | 'neutral'
    value: number
}) {
    const colors = {
        up: 'text-green-600 bg-green-100 dark:bg-green-900/30',
        down: 'text-red-600 bg-red-100 dark:bg-red-900/30',
        neutral: 'text-gray-600 bg-gray-100 dark:bg-gray-800',
    }

    const icons = {
        up: <TrendingUp className="h-3 w-3" />,
        down: <TrendingDown className="h-3 w-3" />,
        neutral: <Minus className="h-3 w-3" />,
    }

    return (
        <span
            className={cn(
                'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium',
                colors[direction]
            )}
        >
            {icons[direction]}
            {value.toFixed(1)}%
        </span>
    )
}

export function StatsCardsSkeleton() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-8 w-20" />
                            </div>
                            <Skeleton className="h-10 w-10 rounded-lg" />
                        </div>
                        <Skeleton className="mt-4 h-10 w-full" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

function StatsCardsError() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="border-destructive/50">
                    <CardContent className="flex h-32 items-center justify-center p-6">
                        <p className="text-sm text-muted-foreground">Failed to load</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
