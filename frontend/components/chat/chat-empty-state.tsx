'use client'

import { memo } from 'react'
import { MessageSquare } from 'lucide-react'

export const ChatEmptyState = memo(function ChatEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Messages Yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
                Start a conversation by entering a scam message below.
                The AI persona will respond and begin extracting intelligence.
            </p>
        </div>
    )
})
