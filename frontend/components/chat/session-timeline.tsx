'use client'

import { memo } from 'react'
import { format } from 'date-fns'
import { MessageSquare, Brain, Shield } from 'lucide-react'
import { Message } from '@/types/message'
import { cn } from '@/lib/utils/cn'

interface SessionTimelineProps {
    messages: Message[]
}

export const SessionTimeline = memo(function SessionTimeline({ messages }: SessionTimelineProps) {
    // Show last 10 messages as timeline events
    const timelineMessages = messages.slice(-10)

    return (
        <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Timeline
            </h4>
            <div className="space-y-0">
                {timelineMessages.map((msg, i) => {
                    const hasEntities = msg.entities_extracted && msg.entities_extracted.length > 0
                    return (
                        <div key={msg.id} className="flex gap-3 relative">
                            {/* Connector Line */}
                            {i < timelineMessages.length - 1 && (
                                <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
                            )}
                            {/* Dot */}
                            <div className={cn(
                                'h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 z-10',
                                msg.role === 'scammer'
                                    ? 'bg-destructive/10 text-destructive'
                                    : 'bg-primary/10 text-primary'
                            )}>
                                {hasEntities ? (
                                    <Brain className="h-3 w-3" />
                                ) : (
                                    <MessageSquare className="h-3 w-3" />
                                )}
                            </div>
                            {/* Content */}
                            <div className="pb-3 flex-1 min-w-0">
                                <p className="text-xs font-medium">
                                    {msg.role === 'scammer' ? 'Scammer' : 'AI Response'}
                                </p>
                                <p className="text-[10px] text-muted-foreground truncate">
                                    {msg.content.slice(0, 50)}...
                                </p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">
                                    {format(new Date(msg.timestamp), 'HH:mm:ss')}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
})
