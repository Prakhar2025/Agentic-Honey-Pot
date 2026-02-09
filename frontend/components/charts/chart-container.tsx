'use client'

import * as React from 'react'
import { RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface ChartContainerProps {
    children: React.ReactNode
    title?: string
    description?: string
    icon?: React.ReactNode
    actions?: React.ReactNode
    isEmpty?: boolean
    isLoading?: boolean
    isError?: boolean
    error?: Error | string | null
    onRetry?: () => void
    height?: number | string
    className?: string
    loadingComponent?: React.ReactNode
    errorComponent?: React.ReactNode
}

export function ChartContainer({
    children,
    title,
    description,
    icon,
    actions,
    isEmpty = false,
    isLoading = false,
    isError = false,
    error,
    onRetry,
    height,
    className,
    loadingComponent,
    errorComponent,
}: ChartContainerProps) {
    const errorMessage = typeof error === 'string' ? error : error?.message

    const renderHeader = () => {
        if (!title) return null
        return (
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {icon && <span className="text-muted-foreground">{icon}</span>}
                        <div>
                            <CardTitle className="text-base">{title}</CardTitle>
                            {description && <CardDescription>{description}</CardDescription>}
                        </div>
                    </div>
                    {actions && <div className="flex-shrink-0">{actions}</div>}
                </div>
            </CardHeader>
        )
    }

    if (isLoading) {
        return (
            <Card className={cn('overflow-hidden', className)}>
                {renderHeader()}
                <CardContent className={title ? '' : 'p-0'}>
                    {loadingComponent || (
                        <div
                            className="flex items-center justify-center"
                            style={{ height: height || 300 }}
                        >
                            <ChartSkeleton height={height || 300} />
                        </div>
                    )}
                </CardContent>
            </Card>
        )
    }

    if (isError) {
        return (
            <Card className={cn('overflow-hidden', className)}>
                {renderHeader()}
                <CardContent>
                    {errorComponent || (
                        <div
                            className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-6"
                            style={{ height: height || 300 }}
                        >
                            <p className="text-sm text-muted-foreground">
                                {errorMessage || 'Failed to load chart data'}
                            </p>
                            {onRetry && (
                                <Button variant="outline" size="sm" onClick={onRetry}>
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Retry
                                </Button>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        )
    }

    if (isEmpty) {
        return (
            <Card className={cn('overflow-hidden', className)}>
                {renderHeader()}
                <CardContent>
                    <div
                        className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center"
                        style={{ height: height || 200 }}
                    >
                        <p className="text-sm text-muted-foreground">No data available</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className={cn('overflow-hidden', className)}>
            {renderHeader()}
            <CardContent className={title ? '' : 'p-0'}>
                {children}
            </CardContent>
        </Card>
    )
}

// Chart skeleton component
export function ChartSkeleton({ height = 300 }: { height?: number | string }) {
    return (
        <div className="w-full space-y-3 p-4" style={{ height }}>
            <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex-1 flex items-end gap-2 pt-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton
                        key={i}
                        className="flex-1"
                        style={{ height: `${30 + Math.random() * 60}%` }}
                    />
                ))}
            </div>
            <div className="flex justify-between pt-2">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-3 w-8" />
                ))}
            </div>
        </div>
    )
}

// Chart legend component
interface LegendItem {
    name: string
    color: string
    value?: number | string
}

interface ChartLegendProps {
    items: LegendItem[]
    className?: string
    orientation?: 'horizontal' | 'vertical'
}

export function ChartLegend({
    items,
    className,
    orientation = 'horizontal',
}: ChartLegendProps) {
    return (
        <div
            className={cn(
                'flex gap-4 text-sm',
                orientation === 'vertical' && 'flex-col gap-2',
                className
            )}
        >
            {items.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                    <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                    {item.value !== undefined && (
                        <span className="font-medium">{item.value}</span>
                    )}
                </div>
            ))}
        </div>
    )
}
