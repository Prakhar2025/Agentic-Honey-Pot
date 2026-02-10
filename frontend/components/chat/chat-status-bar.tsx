'use client'

import { memo } from 'react'
import { Wifi, Clock, MessageSquare, Brain } from 'lucide-react'
import { SessionInfo } from '@/types/chat'
import { useChatStore } from '@/lib/stores'
import { cn } from '@/lib/utils/cn'

interface ChatStatusBarProps {
    session: SessionInfo | null
}

export const ChatStatusBar = memo(function ChatStatusBar({ session }: ChatStatusBarProps) {
    const { extractedEntities } = useChatStore()

    return (
        <div className="flex items-center justify-between border-t bg-muted/30 px-4 py-1.5 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                    <Wifi className="h-3 w-3 text-green-500" />
                    Connected
                </span>
                {session && (
                    <>
                        <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {session.turn_count || 0} turns
                        </span>
                        <span className="flex items-center gap-1">
                            <Brain className="h-3 w-3" />
                            {extractedEntities.length} entities
                        </span>
                    </>
                )}
            </div>
            <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Session {session?.status || 'IDLE'}</span>
            </div>
        </div>
    )
})
