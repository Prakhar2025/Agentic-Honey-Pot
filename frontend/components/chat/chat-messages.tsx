'use client'

import { memo, useRef, useEffect, useMemo } from 'react'
import { format, isToday, isYesterday, isSameDay } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatMessage } from './chat-message'
import { ChatMessageSkeleton } from './chat-skeletons'
import { Message } from '@/types/message'

interface ChatMessagesProps {
    messages: Message[]
    isLoading?: boolean
    onRetry?: (messageId: string) => void
}

export const ChatMessages = memo(function ChatMessages({
    messages,
    isLoading = false,
    onRetry,
}: ChatMessagesProps) {
    const endRef = useRef<HTMLDivElement>(null)

    // Auto-scroll on new messages
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages.length])

    // Generate messages with date separators
    const renderedItems = useMemo(() => {
        const items: Array<{ type: 'date' | 'message'; content: string | Message; key: string }> = []
        let lastDate: Date | null = null

        for (const msg of messages) {
            const msgDate = new Date(msg.timestamp)
            if (!lastDate || !isSameDay(lastDate, msgDate)) {
                items.push({
                    type: 'date',
                    content: formatDateSeparator(msgDate),
                    key: `date-${msgDate.toDateString()}`,
                })
                lastDate = msgDate
            }
            items.push({
                type: 'message',
                content: msg,
                key: msg.id,
            })
        }

        return items
    }, [messages])

    return (
        <div className="px-4 py-2 space-y-1">
            {/* Loading Skeletons */}
            {isLoading && (
                <div className="space-y-2">
                    <ChatMessageSkeleton />
                    <ChatMessageSkeleton />
                    <ChatMessageSkeleton />
                </div>
            )}

            {/* Messages */}
            <AnimatePresence initial={false}>
                {renderedItems.map((item) => {
                    if (item.type === 'date') {
                        return (
                            <motion.div
                                key={item.key}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-center py-3"
                            >
                                <span className="px-3 py-1 bg-muted text-[10px] text-muted-foreground rounded-full font-medium">
                                    {item.content as string}
                                </span>
                            </motion.div>
                        )
                    }

                    const msg = item.content as Message
                    return (
                        <ChatMessage
                            key={item.key}
                            message={msg}
                            onRetry={onRetry}
                        />
                    )
                })}
            </AnimatePresence>

            <div ref={endRef} />
        </div>
    )
})

function formatDateSeparator(date: Date): string {
    if (isToday(date)) return 'Today'
    if (isYesterday(date)) return 'Yesterday'
    return format(date, 'MMMM d, yyyy')
}
