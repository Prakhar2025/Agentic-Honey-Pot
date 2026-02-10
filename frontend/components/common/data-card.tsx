'use client'

import * as React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface DataCardProps {
    title: string
    value: string | number
    icon?: React.ReactNode
    trend?: {
        value: number
        direction: 'up' | 'down' | 'neutral'
    }
    comparison?: string
    loading?: boolean
    onClick?: () => void
    className?: string
    valueClassName?: string
    compact?: boolean
    sparkline?: React.ReactNode
}

function DataCard({
    title,
    value,
    icon,
    trend,
    comparison,
    loading = false,
    onClick,
    className,
    valueClassName,
    compact = false,
    sparkline,
}: DataCardProps) {
    const TrendIcon = trend?.direction === 'up'
        ? TrendingUp
        : trend?.direction === 'down'
            ? TrendingDown
            : Minus

    const trendColor = trend?.direction === 'up'
        ? 'text-green-600 dark:text-green-400'
        : trend?.direction === 'down'
            ? 'text-red-600 dark:text-red-400'
            : 'text-muted-foreground'

    if (loading) {
        return (
            <Card className={cn('relative overflow-hidden', className)}>
                <CardContent className={cn(compact ? 'p-4' : 'p-6')}>
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className={cn(compact ? 'h-6 w-16' : 'h-8 w-24')} />
                            <Skeleton className="h-3 w-28" />
                        </div>
                        <Skeleton className="h-10 w-10 rounded-lg" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card
            className={cn(
                'relative overflow-hidden transition-all duration-200',
                onClick && 'cursor-pointer hover:shadow-md hover:border-primary/50',
                className
            )}
            onClick={onClick}
        >
            <CardContent className={cn(compact ? 'p-4' : 'p-6')}>
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                            {title}
                        </p>
                        <p className={cn(
                            'font-bold tracking-tight',
                            compact ? 'text-xl' : 'text-2xl lg:text-3xl',
                            valueClassName
                        )}>
                            {value}
                        </p>
                        {(trend || comparison) && (
                            <div className="flex items-center gap-2 text-xs">
                                {trend && (
                                    <span className={cn('flex items-center gap-0.5 font-medium', trendColor)}>
                                        <TrendIcon className="h-3 w-3" />
                                        {Math.abs(trend.value)}%
                                    </span>
                                )}
                                {comparison && (
                                    <span className="text-muted-foreground">{comparison}</span>
                                )}
                            </div>
                        )}
                    </div>
                    {icon && (
                        <div className={cn(
                            'rounded-lg bg-primary/10 text-primary flex items-center justify-center',
                            compact ? 'h-8 w-8' : 'h-10 w-10'
                        )}>
                            {icon}
                        </div>
                    )}
                </div>
                {sparkline && (
                    <div className="mt-4">
                        {sparkline}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export { DataCard }
