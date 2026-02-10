'use client'

import { memo } from 'react'
import { Flag, Bookmark, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Message } from '@/types/message'
import { toast } from 'sonner'

interface MessageActionsProps {
    message: Message
}

export const MessageActions = memo(function MessageActions({ message }: MessageActionsProps) {
    const handleFlag = () => {
        toast.info('Message flagged for review')
    }

    const handleBookmark = () => {
        toast.success('Message bookmarked')
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="h-3 w-3" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem onClick={handleFlag}>
                    <Flag className="h-3 w-3 mr-2" />
                    Flag
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleBookmark}>
                    <Bookmark className="h-3 w-3 mr-2" />
                    Bookmark
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
})
