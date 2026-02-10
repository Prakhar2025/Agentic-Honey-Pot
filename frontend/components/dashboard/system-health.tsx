'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
    Server,
    Database,
    Brain,
    Wifi,
    CheckCircle,
    AlertCircle,
    XCircle,
    Clock,
    Activity,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useSystemHealth } from '@/lib/hooks'
import { cn } from '@/lib/utils/cn'

const statusIcons = {
    healthy: CheckCircle,
    degraded: AlertCircle,
    unhealthy: XCircle,
}

const statusColors = {
    healthy: 'text-green-500',
    degraded: 'text-yellow-500',
    unhealthy: 'text-red-500',
}

const statusBg = {
    healthy: 'bg-green-500/10',
    degraded: 'bg-yellow-500/10',
    unhealthy: 'bg-red-500/10',
}

function formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const mins = Math.floor((seconds % 3600) / 60)

    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${mins}m`
    return `${mins}m`
}

export function SystemHealth() {
    const { data, isLoading } = useSystemHealth()

    if (isLoading) return <HealthSkeleton />

    const StatusIcon = statusIcons[data?.status || 'healthy']
    const overallStatus = data?.status || 'healthy'

    const components = [
        {
            name: 'Database',
            icon: Database,
            status: data?.components.database.status || 'healthy',
            metric: data?.components.database.latency_ms,
            metricLabel: 'Latency',
            metricUnit: 'ms',
        },
        {
            name: 'LLM Service',
            icon: Brain,
            status: data?.components.llm.status || 'healthy',
            metric: data?.components.llm.latency_ms,
            metricLabel: 'Latency',
            metricUnit: 'ms',
        },
        {
            name: 'API Gateway',
            icon: Server,
            status: data?.components.api.status || 'healthy',
            metric: data?.components.api.requests_per_minute,
            metricLabel: 'Req/min',
            metricUnit: '',
        },
    ]

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg font-semibold">System Health</CardTitle>
                    </div>
                    <Badge
                        variant={overallStatus === 'healthy' ? 'secondary' : overallStatus === 'degraded' ? 'warning' : 'destructive'}
                        className="gap-1"
                    >
                        <StatusIcon className="h-3 w-3" />
                        {overallStatus}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Uptime bar */}
                <div className={cn('rounded-lg p-3', statusBg[overallStatus])}>
                    <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Uptime
                        </span>
                        <span className="font-medium">{data?.uptime_percentage || 99.9}%</span>
                    </div>
                    <Progress value={data?.uptime_percentage || 99.9} className="mt-2 h-2" />
                    <p className="mt-1 text-xs text-muted-foreground">
                        Running for {formatUptime(data?.uptime_seconds || 0)}
                    </p>
                </div>

                {/* Components */}
                <div className="space-y-3">
                    {components.map((component, index) => {
                        const Icon = component.icon
                        const StatusIcon2 = statusIcons[component.status]

                        return (
                            <motion.div
                                key={component.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn('rounded-lg p-2', statusBg[component.status])}>
                                        <Icon className={cn('h-4 w-4', statusColors[component.status])} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{component.name}</p>
                                        {component.metric !== undefined && (
                                            <p className="text-xs text-muted-foreground">
                                                {component.metricLabel}: {component.metric}{component.metricUnit}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span className="cursor-help">
                                                <StatusIcon2 className={cn('h-5 w-5', statusColors[component.status])} />
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{component.status}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Version info */}
                <div className="flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
                    <span>Version</span>
                    <Badge variant="outline" className="text-xs">
                        v{data?.version || '1.0.0'}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}

function HealthSkeleton() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-16 w-full rounded-lg" />
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-8 w-8 rounded-lg" />
                            <div className="space-y-1">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                        <Skeleton className="h-5 w-5 rounded-full" />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
