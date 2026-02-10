'use client'

import { memo } from 'react'
import { Copy, Flag, Bookmark, RefreshCw } from 'lucide-react'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { Message } from '@/types/message'
import { toast } from 'sonner'

interface MessageContextMenuProps {
    message: Message
    children: React.ReactNode
}

export const MessageContextMenu = memo(function MessageContextMenu({ message, children }: MessageContextMenuProps) {
    const handleCopy = async () => {
        await navigator.clipboard.writeText(message.content)
        toast.success('Copied to clipboard')
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onClick={handleCopy}>
                    <Copy className="h-3.5 w-3.5 mr-2" />
                    Copy Message
                </ContextMenuItem>
                <ContextMenuItem>
                    <Bookmark className="h-3.5 w-3.5 mr-2" />
                    Bookmark
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>
                    <Flag className="h-3.5 w-3.5 mr-2" />
                    Flag for Review
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
})
