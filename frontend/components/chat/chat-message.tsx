'use client'

import { memo, useState } from 'react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Copy, Check, RefreshCw, AlertCircle } from 'lucide-react'
import { MessageContextMenu } from './message-context-menu'
import { EntityHighlight } from './entity-highlight'
import { PersonaAvatar } from './persona-avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Message } from '@/types/message'
import { PERSONAS } from '@/lib/constants/personas'
import { toast } from 'sonner'
import { cn } from '@/lib/utils/cn'

interface ChatMessageProps {
    message: Message
    onRetry?: (messageId: string) => void
}

export const ChatMessage = memo(function ChatMessage({ message, onRetry }: ChatMessageProps) {
    const [copied, setCopied] = useState(false)
    const isScammer = message.role === 'scammer'
    const isSystem = message.role === 'system'
    const isError = message.status === 'error'
    const persona = message.persona ? PERSONAS[message.persona] : null

    const handleCopy = async () => {
        await navigator.clipboard.writeText(message.content)
        setCopied(true)
        toast.success('Copied')
        setTimeout(() => setCopied(false), 2000)
    }

    if (isSystem) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center py-2"
            >
                <span className="px-3 py-1 bg-muted/50 text-[10px] text-muted-foreground rounded-full">
                    {message.content}
                </span>
            </motion.div>
        )
    }

    return (
        <MessageContextMenu message={message}>
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={cn(
                    'flex gap-2 py-1.5 group',
                    isScammer ? 'flex-row' : 'flex-row-reverse'
                )}
            >
                {/* Avatar */}
                <div className="flex-shrink-0 mt-1">
                    {isScammer ? (
                        <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center text-sm">
                            🦹
                        </div>
                    ) : (
                        <PersonaAvatar persona={message.persona || 'elderly_victim'} size="sm" />
                    )}
                </div>

                {/* Message Bubble */}
                <div className={cn('max-w-[75%] space-y-1', isScammer ? 'items-start' : 'items-end')}>
                    {/* Sender Label */}
                    <div className={cn('flex items-center gap-2', isScammer ? '' : 'flex-row-reverse')}>
                        <span className="text-[10px] font-medium text-muted-foreground">
                            {isScammer ? 'Scammer' : (persona?.label || 'AI Persona')}
                        </span>
                        {message.status === 'sending' && (
                            <Badge variant="outline" className="text-[9px] h-3.5 animate-pulse">
                                Sending...
                            </Badge>
                        )}
                    </div>

                    {/* Bubble */}
                    <div
                        className={cn(
                            'relative rounded-2xl px-4 py-3 text-sm leading-relaxed',
                            isScammer
                                ? 'bg-muted rounded-tl-none'
                                : 'bg-primary text-primary-foreground rounded-tr-none',
                            isError && 'border-2 border-destructive/50'
                        )}
                    >
                        {/* Content with Entity Highlights */}
                        <div className="whitespace-pre-wrap break-words">
                            {message.entities_extracted && message.entities_extracted.length > 0
                                ? renderWithEntities(message.content, message.entities_extracted)
                                : message.content}
                        </div>

                        {/* Entity Badges */}
                        {message.entities_extracted && message.entities_extracted.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-current/10">
                                {message.entities_extracted.map((entity, i) => (
                                    <Badge
                                        key={i}
                                        variant="outline"
                                        className={cn(
                                            'text-[9px]',
                                            isScammer
                                                ? 'bg-background/50'
                                                : 'bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground'
                                        )}
                                    >
                                        {entity.type.replace(/_/g, ' ')}: {entity.value}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Error State */}
                        {isError && message.error && (
                            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-destructive/20">
                                <AlertCircle className="h-3 w-3 text-destructive shrink-0" />
                                <span className="text-xs text-destructive">{message.error.message}</span>
                                {message.error.retry_available && onRetry && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5 ml-auto"
                                        onClick={() => onRetry(message.id)}
                                    >
                                        <RefreshCw className="h-3 w-3" />
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className={cn(
                        'flex items-center gap-2 px-1',
                        isScammer ? '' : 'flex-row-reverse'
                    )}>
                        <span className="text-[10px] text-muted-foreground">
                            {format(new Date(message.timestamp), 'HH:mm')}
                        </span>

                        {/* Copy button - visible on hover */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={handleCopy}
                        >
                            {copied ? (
                                <Check className="h-2.5 w-2.5 text-green-500" />
                            ) : (
                                <Copy className="h-2.5 w-2.5" />
                            )}
                        </Button>

                        {/* Processing metadata */}
                        {message.metadata?.processing_time_ms && (
                            <span className="text-[9px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                {message.metadata.processing_time_ms}ms
                            </span>
                        )}
                    </div>
                </div>
            </motion.div>
        </MessageContextMenu>
    )
})

function renderWithEntities(content: string, entities: Array<{ type: string; value: string }>) {
    if (!entities.length) return content

    // Simple approach: just return content with entity highlights as React elements
    let result = content
    const parts: Array<string | { type: string; value: string }> = []
    let remaining = content

    // Sort by position in content
    const entityPositions = entities
        .map(e => ({ ...e, index: content.indexOf(e.value) }))
        .filter(e => e.index >= 0)
        .sort((a, b) => a.index - b.index)

    let lastIndex = 0
    for (const entity of entityPositions) {
        if (entity.index >= lastIndex) {
            // Add text before entity
            if (entity.index > lastIndex) {
                parts.push(content.slice(lastIndex, entity.index))
            }
            // Add entity
            parts.push({ type: entity.type, value: entity.value })
            lastIndex = entity.index + entity.value.length
        }
    }
    // Add remaining text
    if (lastIndex < content.length) {
        parts.push(content.slice(lastIndex))
    }

    return (
        <>
            {parts.map((part, i) => {
                if (typeof part === 'string') {
                    return <span key={i}>{part}</span>
                }
                return <EntityHighlight key={i} type={part.type} value={part.value} />
            })}
        </>
    )
}
