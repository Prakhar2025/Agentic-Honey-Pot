'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    MessageSquare,
    Brain,
    Clock,
    ArrowRight,
    User
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { SessionStatusBadge } from './session-status-badge'
import { SessionActionsMenu } from './session-actions-menu'
import { SCAM_TYPES, PERSONAS } from '@/lib/constants'
import { formatRelativeTime, getSessionDuration, formatDuration } from '@/lib/utils/date'
import { cn } from '@/lib/utils/cn'

interface SessionCardProps {
    session: {
        id: string
        scam_type: string | null
        persona_id: string
        status: string
        turn_count: number
        extracted_count?: number
        metadata_json?: Record<string, unknown> | null
        started_at: string
        created_at: string
        ended_at: string | null
    }
    isSelected?: boolean
    onSelect?: (selected: boolean) => void
}

export function SessionCard({ session, isSelected = false, onSelect }: SessionCardProps) {
    const scamType = session.scam_type
        ? SCAM_TYPES[session.scam_type as keyof typeof SCAM_TYPES]
        : null
    const persona = PERSONAS[session.persona_id as keyof typeof PERSONAS]
    const duration = getSessionDuration(session.started_at, session.ended_at)
    const initialMessage = session.metadata_json?.initial_message as string

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            whileHover={{ y: -2 }}
        >
            <Card className={cn(
                'relative overflow-hidden transition-all duration-200',
                'hover:shadow-lg hover:border-primary/50',
                isSelected && 'ring-2 ring-primary border-primary'
            )}>
                {/* Selection checkbox */}
                <div className="absolute top-3 left-3 z-10">
                    <Checkbox
                        checked={isSelected}
                        onCheckedChange={onSelect}
                        aria-label="Select session"
                    />
                </div>

                {/* Actions menu */}
                <div className="absolute top-2 right-2 z-10">
                    <SessionActionsMenu session={session} />
                </div>

                <CardHeader className="pt-3 pb-2 pl-10">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <SessionStatusBadge status={session.status} />
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pb-4 space-y-3">
                    {/* Scam type */}
                    <div>
                        <div className="flex items-center gap-2">
                            {scamType && <span className="text-xl">{scamType.icon}</span>}
                            <h3 className="font-semibold text-lg">
                                {scamType?.label || session.scam_type || 'Unknown'}
                            </h3>
                        </div>
                        {initialMessage && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                "{initialMessage}"
                            </p>
                        )}
                    </div>

                    {/* Persona */}
                    <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-lg">{persona?.icon || '🤖'}</span>
                        <span className="text-muted-foreground">
                            {persona?.label || session.persona_id}
                        </span>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{session.turn_count}</span>
                            <span className="text-muted-foreground">turns</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Brain className="h-4 w-4 text-muted-foreground" />
                            <Badge variant={session.extracted_count ? 'default' : 'secondary'} className="h-5 px-1.5">
                                {session.extracted_count || 0}
                            </Badge>
                            <span className="text-muted-foreground">entities</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{formatRelativeTime(session.created_at)}</span>
                            {duration > 0 && (
                                <>
                                    <span>•</span>
                                    <span>{formatDuration(duration)}</span>
                                </>
                            )}
                        </div>

                        <Button variant="ghost" size="sm" className="gap-1" asChild>
                            <Link href={`/sessions/${session.id}`}>
                                View
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
