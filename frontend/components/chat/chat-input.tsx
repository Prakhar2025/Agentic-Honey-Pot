'use client'

import { useState, useRef, useCallback, useEffect, KeyboardEvent, ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Zap, Loader2, X } from 'lucide-react'
import { ChatInputActions } from './chat-input-actions'
import { MessageTemplates } from './message-templates'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
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
import { cn } from '@/lib/utils/cn'

interface ChatInputProps {
    onSend: (message: string) => Promise<void>
    disabled?: boolean
    placeholder?: string
    maxLength?: number
}

export function ChatInput({
    onSend,
    disabled = false,
    placeholder = "Type a message...",
    maxLength = 2000,
}: ChatInputProps) {
    const [message, setMessage] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [showTemplates, setShowTemplates] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
        }
    }, [message])

    // Focus textarea on mount
    useEffect(() => {
        if (!disabled) {
            textareaRef.current?.focus()
        }
    }, [disabled])

    // Handle send
    const handleSend = useCallback(async () => {
        const trimmedMessage = message.trim()
        if (!trimmedMessage || isSending || disabled) return

        setIsSending(true)
        try {
            await onSend(trimmedMessage)
            setMessage('')
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto'
            }
        } finally {
            setIsSending(false)
            textareaRef.current?.focus()
        }
    }, [message, isSending, disabled, onSend])

    // Handle keyboard
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    // Handle input change
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        if (value.length <= maxLength) {
            setMessage(value)
        }
    }

    // Insert template
    const handleTemplateSelect = (template: string) => {
        setMessage(prev => prev ? `${prev}\n${template}` : template)
        setShowTemplates(false)
        textareaRef.current?.focus()
    }

    // Clear input
    const handleClear = () => {
        setMessage('')
        textareaRef.current?.focus()
    }

    const isOverLimit = message.length >= maxLength * 0.9
    const charCount = message.length

    return (
        <div className="border-t bg-background p-4">
            {/* Quick Actions Bar */}
            <AnimatePresence>
                {!message && !disabled && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-3"
                    >
                        <ChatInputActions onSelectScenario={handleTemplateSelect} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Input Area */}
            <div className="flex items-end gap-2">
                {/* Template Button */}
                <Popover open={showTemplates} onOpenChange={setShowTemplates}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 shrink-0"
                            disabled={disabled}
                        >
                            <Zap className="h-5 w-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent side="top" align="start" className="w-80 p-0">
                        <MessageTemplates onSelect={handleTemplateSelect} />
                    </PopoverContent>
                </Popover>

                {/* Input Container */}
                <div className="flex-1 relative">
                    <Textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        disabled={disabled || isSending}
                        rows={1}
                        className={cn(
                            'min-h-[44px] max-h-[200px] resize-none pr-10 py-3',
                            'rounded-2xl border-2 focus-visible:ring-0 focus-visible:ring-offset-0',
                            'focus-visible:border-primary',
                            disabled && 'opacity-50 cursor-not-allowed'
                        )}
                    />

                    {/* Clear button */}
                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute right-3 top-3"
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 rounded-full"
                                    onClick={handleClear}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Send Button */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            size="icon"
                            className={cn(
                                'h-10 w-10 shrink-0 rounded-full transition-all',
                                message.trim() ? 'scale-100' : 'scale-95 opacity-50'
                            )}
                            disabled={!message.trim() || isSending || disabled}
                            onClick={handleSend}
                        >
                            {isSending ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <Send className="h-5 w-5" />
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {disabled ? 'Start a session first' : 'Send message (Enter)'}
                    </TooltipContent>
                </Tooltip>
            </div>

            {/* Character Counter */}
            <div className="flex justify-between items-center mt-2 px-2">
                <span className="text-[10px] text-muted-foreground">
                    Press <kbd className="px-1 py-0.5 bg-muted rounded text-[9px]">Enter</kbd> to send,{' '}
                    <kbd className="px-1 py-0.5 bg-muted rounded text-[9px]">Shift + Enter</kbd> for new line
                </span>
                <span className={cn(
                    'text-[10px] tabular-nums',
                    isOverLimit ? 'text-destructive' : 'text-muted-foreground'
                )}>
                    {charCount}/{maxLength}
                </span>
            </div>
        </div>
    )
}
