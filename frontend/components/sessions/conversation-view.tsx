'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search,
    ArrowDown,
    Loader2,
    MessageSquare,
    RefreshCw,
    X
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ConversationMessage } from './conversation-message'
import { useSessionMessages } from '@/lib/hooks/use-sessions'
import { groupMessagesByDate } from '@/lib/utils/message-parser'
import { cn } from '@/lib/utils/cn'

interface ConversationViewProps {
    sessionId: string
    initialSession: {
        status: string
        turn_count: number
    }
}

export function ConversationView({ sessionId, initialSession }: ConversationViewProps) {
    const bottomRef = React.useRef<HTMLDivElement>(null)
    const scrollContainerRef = React.useRef<HTMLDivElement>(null)
    const [autoScroll, setAutoScroll] = React.useState(true)
    const [searchQuery, setSearchQuery] = React.useState('')
    const [showSearch, setShowSearch] = React.useState(false)

    const isActive = initialSession.status === 'ONGOING' || initialSession.status === 'ACTIVE'

    // Fetch messages with real-time polling for active sessions
    const {
        data: messagesData,
        isLoading,
        isFetching,
        refetch
    } = useSessionMessages(sessionId, {
        refetchInterval: isActive ? 3000 : false,
    })

    const messages = messagesData?.messages || []
    const groupedMessages = groupMessagesByDate(
        messages.map(m => ({
            ...m,
            timestamp: m.created_at,
            role: m.role as 'scammer' | 'agent' | 'persona' | 'system'
        }))
    )

    // Filter messages by search
    const hasSearchMatch = React.useCallback((content: string) => {
        if (!searchQuery) return true
        return content.toLowerCase().includes(searchQuery.toLowerCase())
    }, [searchQuery])

    const matchCount = React.useMemo(() => {
        if (!searchQuery) return 0
        return messages.filter(m => hasSearchMatch(m.content)).length
    }, [messages, searchQuery, hasSearchMatch])

    // Auto-scroll to bottom when new messages arrive
    React.useEffect(() => {
        if (autoScroll && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages.length, autoScroll])

    // Detect when user scrolls up to disable auto-scroll
    const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        const isAtBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 100
        setAutoScroll(isAtBottom)
    }, [])

    // Scroll to bottom
    const scrollToBottom = React.useCallback(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
        setAutoScroll(true)
    }, [])

    return (
        <div className="flex flex-col h-full">
            {/* Header with controls */}
            <div className="flex items-center justify-between gap-4 border-b px-4 py-2 bg-muted/30">
                <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                        Conversation
                    </span>
                    <Badge variant="secondary" className="text-xs">
                        {messages.length} messages
                    </Badge>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search toggle */}
                    <Button
                        variant={showSearch ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setShowSearch(!showSearch)}
                    >
                        <Search className="h-4 w-4" />
                    </Button>

                    {/* Refresh button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => refetch()}
                        disabled={isFetching}
                    >
                        <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
                    </Button>

                    {/* Auto-scroll toggle */}
                    <div className="flex items-center gap-2">
                        <Switch
                            id="auto-scroll"
                            checked={autoScroll}
                            onCheckedChange={setAutoScroll}
                            className="scale-90"
                        />
                        <Label htmlFor="auto-scroll" className="text-xs text-muted-foreground cursor-pointer">
                            Auto-scroll
                        </Label>
                    </div>
                </div>
            </div>

            {/* Search bar */}
            <AnimatePresence>
                {showSearch && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-b px-4 py-2 bg-muted/20"
                    >
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search in conversation..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-20"
                                autoFocus
                            />
                            {searchQuery && (
                                <>
                                    <Badge variant="secondary" className="absolute right-10 top-1/2 -translate-y-1/2 text-xs">
                                        {matchCount} match{matchCount !== 1 ? 'es' : ''}
                                    </Badge>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                                        onClick={() => setSearchQuery('')}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Messages area */}
            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-auto p-4 space-y-4"
                onScroll={handleScroll}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <MessageSquare className="h-12 w-12 text-muted-foreground/50" />
                        <p className="mt-4 text-lg font-medium">No messages yet</p>
                        <p className="text-sm text-muted-foreground">
                            Messages will appear here as the conversation progresses
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Grouped messages */}
                        {Object.entries(groupedMessages).map(([dateKey, dateMessages]) => (
                            <div key={dateKey} className="space-y-4">
                                {/* Date separator */}
                                <div className="flex items-center gap-4 py-2">
                                    <div className="flex-1 border-t" />
                                    <span className="text-xs font-medium text-muted-foreground bg-background px-2">
                                        {dateKey}
                                    </span>
                                    <div className="flex-1 border-t" />
                                </div>

                                {/* Messages for this date */}
                                {dateMessages.map((message, index) => {
                                    const isMatch = searchQuery ? hasSearchMatch(message.content) : true
                                    return (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: isMatch ? 1 : 0.3, y: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ConversationMessage
                                                message={message}
                                                searchQuery={searchQuery}
                                                showTimestamp={
                                                    index === 0 ||
                                                    new Date(message.timestamp).getTime() -
                                                    new Date(dateMessages[index - 1]?.timestamp).getTime() > 300000
                                                }
                                            />
                                        </motion.div>
                                    )
                                })}
                            </div>
                        ))}

                        {/* Live indicator for active sessions */}
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center justify-center gap-2 py-4"
                            >
                                <span className="relative flex h-3 w-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                                </span>
                                <span className="text-sm text-muted-foreground">Waiting for response...</span>
                                {isFetching && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                            </motion.div>
                        )}

                        {/* Scroll anchor */}
                        <div ref={bottomRef} />
                    </>
                )}
            </div>

            {/* Scroll to bottom button */}
            <AnimatePresence>
                {!autoScroll && messages.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2"
                    >
                        <Button
                            variant="secondary"
                            size="sm"
                            className="shadow-lg gap-2"
                            onClick={scrollToBottom}
                        >
                            <ArrowDown className="h-4 w-4" />
                            Jump to latest
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
