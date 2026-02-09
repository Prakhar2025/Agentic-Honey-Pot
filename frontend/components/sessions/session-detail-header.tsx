'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    ArrowLeft,
    Download,
    Tag,
    FileText,
    MoreHorizontal,
    Copy,
    Check,
    ExternalLink,
    Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SessionStatusBadge } from './session-status-badge'
import { SCAM_TYPES, PERSONAS } from '@/lib/constants'
import { formatDateTime, formatDuration, getSessionDuration } from '@/lib/utils/date'
import { toast } from 'sonner'

interface SessionDetailHeaderProps {
    session: {
        id: string
        scam_type: string | null
        persona_id: string
        status: string
        turn_count: number
        started_at: string
        created_at: string
        ended_at: string | null
        metadata_json?: Record<string, unknown> | null
    }
}

export function SessionDetailHeader({ session }: SessionDetailHeaderProps) {
    const [copied, setCopied] = React.useState(false)
    const scamType = session.scam_type
        ? SCAM_TYPES[session.scam_type as keyof typeof SCAM_TYPES]
        : null
    const persona = PERSONAS[session.persona_id as keyof typeof PERSONAS]
    const duration = getSessionDuration(session.started_at, session.ended_at)
    const isActive = session.status === 'ONGOING' || session.status === 'ACTIVE'

    const copySessionId = async () => {
        await navigator.clipboard.writeText(session.id)
        setCopied(true)
        toast.success('Session ID copied')
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <motion.div
            className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Back button row */}
            <div className="flex items-center gap-2 px-4 py-2 border-b bg-muted/30">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/sessions" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Sessions
                    </Link>
                </Button>
            </div>

            {/* Main header content */}
            <div className="px-6 py-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    {/* Left side - Session info */}
                    <div className="space-y-3">
                        {/* Title row */}
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl font-bold tracking-tight">
                                Session #{session.id.slice(0, 8)}
                            </h1>
                            <SessionStatusBadge status={session.status} />
                            {isActive && (
                                <Badge variant="outline" className="gap-1.5 bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                                    </span>
                                    Live
                                </Badge>
                            )}
                        </div>

                        {/* Metadata row */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                {scamType && <span className="text-base">{scamType.icon}</span>}
                                <span className="font-medium text-foreground">
                                    {scamType?.label || session.scam_type || 'Unknown'}
                                </span>
                            </span>
                            <span className="text-muted-foreground/50">•</span>
                            <span className="flex items-center gap-1.5">
                                <span className="text-base">{persona?.icon || '🤖'}</span>
                                <span>{persona?.label || session.persona_id} persona</span>
                            </span>
                            <span className="text-muted-foreground/50">•</span>
                            <span>Started: {formatDateTime(session.started_at)}</span>
                            <span className="text-muted-foreground/50">•</span>
                            <span>Duration: {formatDuration(duration)}</span>
                            <span className="text-muted-foreground/50">•</span>
                            <span>Turn {session.turn_count} of ∞</span>
                        </div>
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex items-center gap-2">
                        {/* Copy ID button */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={copySessionId}
                            className="gap-2"
                        >
                            {copied ? (
                                <Check className="h-4 w-4 text-green-500" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                            Copy ID
                        </Button>

                        {/* Export dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Download className="h-4 w-4" />
                                    Export
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Export as JSON</DropdownMenuItem>
                                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* More actions */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="h-9 w-9">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Tag className="mr-2 h-4 w-4" />
                                    Add Tags
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Add Notes
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Open in New Tab
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Session
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
