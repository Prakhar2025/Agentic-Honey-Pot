'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Activity,
    MessageSquare,
    CheckCircle,
    AlertTriangle,
    Brain,
    XCircle,
    Clock,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useActivityFeed } from '@/lib/hooks'
import { cn } from '@/lib/utils/cn'

const activityConfig = {
    session_started: {
        icon: MessageSquare,
        color: 'text-blue-500',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        label: 'Session Started',
    },
    session_completed: {
        icon: CheckCircle,
        color: 'text-green-500',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        label: 'Session Completed',
    },
    intelligence_extracted: {
        icon: Brain,
        color: 'text-purple-500',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        label: 'Intel Extracted',
    },
    threat_elevated: {
        icon: AlertTriangle,
        color: 'text-orange-500',
        bgColor: 'bg-orange-100 dark:bg-orange-900/30',
        label: 'Threat Elevated',
    },
    session_failed: {
        icon: XCircle,
        color: 'text-red-500',
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        label: 'Session Failed',
    },
}

function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return date.toLocaleDateString()
}

export function ActivityFeed() {
    const { data: activities, isLoading } = useActivityFeed()

    if (isLoading) return <ActivitySkeleton />

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg font-semibold">Live Activity</CardTitle>
                    </div>
                    <Badge variant="outline" className="gap-1 text-xs">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                        </span>
                        Live
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[280px] pr-4">
                    <AnimatePresence initial={false}>
                        {activities?.map((activity, index) => {
                            const config = activityConfig[activity.type]
                            const Icon = config?.icon || Activity

                            return (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, x: -20, height: 0 }}
                                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                                    exit={{ opacity: 0, x: 20, height: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.03 }}
                                    className="relative flex gap-3 pb-4"
                                >
                                    {/* Timeline connector */}
                                    {index < (activities?.length || 0) - 1 && (
                                        <div className="absolute left-4 top-8 h-full w-px bg-border" />
                                    )}

                                    {/* Icon */}
                                    <div
                                        className={cn(
                                            'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                                            config?.bgColor || 'bg-gray-100'
                                        )}
                                    >
                                        <Icon className={cn('h-4 w-4', config?.color || 'text-gray-500')} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {config?.label || activity.type}
                                                </p>
                                                {activity.details && (
                                                    <p className="text-xs text-muted-foreground truncate">
                                                        {activity.details}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                                                <Clock className="h-3 w-3" />
                                                {formatRelativeTime(activity.timestamp)}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>

                    {(!activities || activities.length === 0) && (
                        <div className="flex h-[200px] flex-col items-center justify-center text-center">
                            <Activity className="h-10 w-10 text-muted-foreground/50" />
                            <p className="mt-2 text-sm text-muted-foreground">
                                No recent activity
                            </p>
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

function ActivitySkeleton() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                        <div className="flex-1 space-y-1">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-48" />
                        </div>
                        <Skeleton className="h-3 w-16" />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

// Compact variant for sidebar
export function ActivityFeedCompact({ limit = 5 }: { limit?: number }) {
    const { data: activities, isLoading } = useActivityFeed()

    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: limit }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-2">
            {activities?.slice(0, limit).map((activity) => {
                const config = activityConfig[activity.type]
                const Icon = config?.icon || Activity

                return (
                    <div
                        key={activity.id}
                        className="flex items-center gap-2 rounded-md p-2 hover:bg-muted/50"
                    >
                        <Icon className={cn('h-4 w-4', config?.color || 'text-gray-500')} />
                        <span className="text-xs truncate flex-1">
                            {config?.label || activity.type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {formatRelativeTime(activity.timestamp)}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
