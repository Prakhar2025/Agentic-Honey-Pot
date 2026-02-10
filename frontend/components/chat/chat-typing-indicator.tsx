'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { PERSONAS } from '@/lib/constants/personas'

interface ChatTypingIndicatorProps {
    persona?: string
}

export const ChatTypingIndicator = memo(function ChatTypingIndicator({
    persona
}: ChatTypingIndicatorProps) {
    const personaConfig = persona ? PERSONAS[persona] : null

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-3 px-4 py-3"
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm">
                {personaConfig?.icon || '🤖'}
            </div>
            <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3 rounded-tl-none">
                <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="h-2 w-2 rounded-full bg-muted-foreground/40"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="h-2 w-2 rounded-full bg-muted-foreground/40"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="h-2 w-2 rounded-full bg-muted-foreground/40"
                />
            </div>
            <span className="text-xs text-muted-foreground">
                {personaConfig?.label || 'AI'} is typing...
            </span>
        </motion.div>
    )
})
