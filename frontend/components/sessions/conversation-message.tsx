'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
    Copy,
    Check,
    AlertTriangle,
    Brain,
    Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { highlightEntities, ExtractedEntity } from '@/lib/utils/entity-highlighter'
import { formatTime } from '@/lib/utils/date'
import { cn } from '@/lib/utils/cn'
import { toast } from 'sonner'

interface Message {
    id: string
    session_id: string
    role: 'scammer' | 'agent' | 'persona' | 'system'
    content: string
    timestamp: string
    turn_number?: number
    metadata_json?: Record<string, unknown> | null
}

interface ConversationMessageProps {
    message: Message
    searchQuery?: string
    showTimestamp?: boolean
}

const messageStyles = {
    scammer: {
        container: 'mr-auto bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50',
        header: 'text-red-700 dark:text-red-400',
        icon: '🎭',
        label: 'Scammer',
    },
    agent: {
        container: 'ml-auto bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50',
        header: 'text-blue-700 dark:text-blue-400',
        icon: '🤖',
        label: 'Agent (Persona)',
    },
    persona: {
        container: 'ml-auto bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50',
        header: 'text-blue-700 dark:text-blue-400',
        icon: '🤖',
        label: 'Persona',
    },
    system: {
        container: 'mx-auto bg-muted border-border max-w-full',
        header: 'text-muted-foreground',
        icon: '⚙️',
        label: 'System',
    },
}

export function ConversationMessage({
    message,
    searchQuery,
    showTimestamp = true
}: ConversationMessageProps) {
    const [copied, setCopied] = React.useState(false)
    const style = messageStyles[message.role] || messageStyles.system

    // Extract entities from metadata
    const extractedEntities = React.useMemo(() => {
        const entities = message.metadata_json?.extracted_entities as ExtractedEntity[] | undefined
        return entities || []
    }, [message.metadata_json])

    // Highlight entities in message content
    const highlightedContent = React.useMemo(() => {
        return highlightEntities(message.content, extractedEntities)
    }, [message.content, extractedEntities])

    // Highlight search matches
    const searchHighlightedContent = React.useMemo(() => {
        if (!searchQuery) return highlightedContent

        const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
        return highlightedContent.replace(
            regex,
            '<mark class="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">$1</mark>'
        )
    }, [highlightedContent, searchQuery])

    // Copy message to clipboard
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(message.content)
        setCopied(true)
        toast.success('Message copied')
        setTimeout(() => setCopied(false), 2000)
    }

    const hasEntities = extractedEntities.length > 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
                'group relative max-w-[80%] rounded-lg border p-4',
                style.container,
                message.role === 'system' && 'max-w-full'
            )}
        >
            {/* Header */}
            <div className={cn('flex items-center gap-2 mb-2 flex-wrap', style.header)}>
                <span className="text-lg">{style.icon}</span>
                <span className="font-medium text-sm">{style.label}</span>

                {message.turn_number !== undefined && (
                    <Badge variant="outline" className="text-xs h-5">
                        Turn {message.turn_number}
                    </Badge>
                )}

                {/* Entities indicator */}
                {hasEntities && (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Badge
                                variant="destructive"
                                className="text-xs gap-1 cursor-pointer hover:bg-destructive/80"
                            >
                                <AlertTriangle className="h-3 w-3" />
                                {extractedEntities.length} entities
                            </Badge>
                        </PopoverTrigger>
                        <PopoverContent className="w-64" side="top">
                            <div className="space-y-2">
                                <h4 className="font-medium text-sm">Extracted Entities</h4>
                                <div className="space-y-1.5">
                                    {extractedEntities.map((entity, i) => (
                                        <div key={i} className="flex items-center justify-between text-xs p-1.5 rounded bg-muted">
                                            <span className="text-muted-foreground">
                                                {entity.type.replace(/_/g, ' ')}
                                            </span>
                                            <span className="font-mono font-medium truncate max-w-[120px]">
                                                {entity.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                )}

                {/* Timestamp */}
                {showTimestamp && (
                    <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(message.timestamp)}
                    </span>
                )}
            </div>

            {/* Content */}
            <div
                className="text-sm whitespace-pre-wrap break-words leading-relaxed"
                dangerouslySetInnerHTML={{ __html: searchHighlightedContent }}
            />

            {/* Copy button (appears on hover) */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={copyToClipboard}
                        >
                            {copied ? (
                                <Check className="h-4 w-4 text-green-500" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy message</TooltipContent>
                </Tooltip>
            </div>
        </motion.div>
    )
}
