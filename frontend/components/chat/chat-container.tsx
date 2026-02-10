'use client'

import { useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ChatHeader } from './chat-header'
import { ChatMessages } from './chat-messages'
import { ChatInput } from './chat-input'
import { ChatTypingIndicator } from './chat-typing-indicator'
import { ChatStatusBar } from './chat-status-bar'
import { ScamDetectionAlert } from './scam-detection-alert'
import { ChatEmptyState } from './chat-empty-state'
import { SessionInfo, ScamDetection } from '@/types/chat'
import { Message } from '@/types/message'

interface ChatContainerProps {
    session: SessionInfo | null
    messages: Message[]
    isTyping: boolean
    isLoading: boolean
    scamDetection: ScamDetection | null
    onSendMessage: (message: string) => Promise<void>
    onRetryMessage?: (messageId: string) => void
}

export function ChatContainer({
    session,
    messages,
    isTyping,
    isLoading,
    scamDetection,
    onSendMessage,
    onRetryMessage,
}: ChatContainerProps) {
    const scrollRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages.length, isTyping])

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <ChatHeader session={session} />

            {/* Scam Detection Alert */}
            <AnimatePresence>
                {scamDetection?.is_scam && (
                    <ScamDetectionAlert detection={scamDetection} />
                )}
            </AnimatePresence>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
                {messages.length === 0 && !isLoading ? (
                    <ChatEmptyState />
                ) : (
                    <ChatMessages
                        messages={messages}
                        isLoading={isLoading}
                        onRetry={onRetryMessage}
                    />
                )}

                {/* Typing Indicator */}
                <AnimatePresence>
                    {isTyping && (
                        <ChatTypingIndicator persona={session?.persona_used} />
                    )}
                </AnimatePresence>
            </div>

            {/* Status Bar */}
            <ChatStatusBar session={session} />

            {/* Input */}
            <ChatInput
                onSend={onSendMessage}
                disabled={!session || session.status !== 'ACTIVE'}
                placeholder={
                    !session
                        ? 'Start a session first...'
                        : session.status !== 'ACTIVE'
                            ? 'Session ended'
                            : 'Type a scammer message...'
                }
            />
        </div>
    )
}
