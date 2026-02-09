'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    MessageSquare,
    ArrowRight,
    Clock,
    Bot,
    Brain,
    ChevronRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useRecentSessions } from '@/lib/hooks/use-dashboard-data'
import { SCAM_TYPES, PERSONAS } from '@/lib/constants'
import { cn } from '@/lib/utils/cn'

const statusColors = {
    active: 'bg-green-500',
    ongoing: 'bg-green-500',
    completed: 'bg-blue-500',
    failed: 'bg-red-500',
    terminated: 'bg-orange-500',
}

const statusBadgeVariants = {
    active: 'success',
    ongoing: 'success',
    completed: 'secondary',
    failed: 'destructive',
    terminated: 'warning',
} as const

function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
}

export function RecentSessions() {
    const { data: sessions, isLoading } = useRecentSessions(8)

    if (isLoading) return <SessionsSkeleton />

    return (
        <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg font-semibold">Recent Sessions</CardTitle>
                </div>
                <Link
                    href="/sessions"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    View All
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[320px] pr-4">
                    <AnimatePresence initial={false}>
                        {sessions?.map((session, index) => (
                            <motion.div
                                key={session.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <SessionRow session={session} />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {(!sessions || sessions.length === 0) && (
                        <div className="flex h-[200px] flex-col items-center justify-center text-center">
                            <MessageSquare className="h-10 w-10 text-muted-foreground/50" />
                            <p className="mt-2 text-sm text-muted-foreground">No sessions yet</p>
                            <Link href="/chat">
                                <Button variant="outline" size="sm" className="mt-4">
                                    Start New Session
                                </Button>
                            </Link>
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

interface SessionRowProps {
    session: {
        id: string
        status: 'active' | 'completed' | 'failed' | 'ongoing' | 'terminated'
        scam_type: string
        persona_used: string
        turn_count: number
        created_at: string
        extracted_count: number
    }
}

function SessionRow({ session }: SessionRowProps) {
    const persona = PERSONAS[session.persona_used as keyof typeof PERSONAS]
    const scamType = SCAM_TYPES[session.scam_type as keyof typeof SCAM_TYPES]

    return (
        <Link href={`/sessions/${session.id}`}>
            <div className="group flex items-center gap-4 rounded-lg border p-3 transition-all hover:bg-muted/50 hover:shadow-sm mb-2">
                {/* Status indicator */}
                <div className="relative">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                            {persona?.icon || '👤'}
                        </AvatarFallback>
                    </Avatar>
                    <span
                        className={cn(
                            'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background',
                            statusColors[session.status] || 'bg-gray-500'
                        )}
                    />
                    {(session.status === 'active' || session.status === 'ongoing') && (
                        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 animate-ping rounded-full bg-green-500" />
                    )}
                </div>

                {/* Session info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                            variant="outline"
                            className={cn('text-xs', scamType?.textColor)}
                            style={{ backgroundColor: `${scamType?.color}20` }}
                        >
                            {scamType?.label || session.scam_type}
                        </Badge>
                        <Badge
                            variant={statusBadgeVariants[session.status] || 'secondary'}
                            className="text-xs"
                        >
                            {session.status}
                        </Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Bot className="h-3 w-3" />
                            {persona?.label || session.persona_used}
                        </span>
                        <span>Turn {session.turn_count}</span>
                        <span className="flex items-center gap-1">
                            <Brain className="h-3 w-3" />
                            {session.extracted_count} entities
                        </span>
                    </div>
                </div>

                {/* Timestamp and arrow */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                    <Clock className="h-3 w-3" />
                    <span>{formatRelativeTime(session.created_at)}</span>
                    <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
            </div>
        </Link>
    )
}

function SessionsSkeleton() {
    return (
        <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-8 w-20" />
            </CardHeader>
            <CardContent className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-3 w-48" />
                        </div>
                        <Skeleton className="h-4 w-16" />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
