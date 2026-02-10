'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import {
    Shield, Phone, Wifi, WifiOff, MoreVertical,
    Trash2, Download, RefreshCw
} from 'lucide-react'
import { PersonaAvatar } from './persona-avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SessionInfo } from '@/types/chat'
import { PERSONAS } from '@/lib/constants/personas'
import { cn } from '@/lib/utils/cn'

interface ChatHeaderProps {
    session: SessionInfo | null
}

const RISK_COLORS: Record<string, string> = {
    LOW: 'bg-green-500/10 text-green-600 border-green-200',
    MEDIUM: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
    HIGH: 'bg-orange-500/10 text-orange-600 border-orange-200',
    CRITICAL: 'bg-red-500/10 text-red-600 border-red-200',
}

export const ChatHeader = memo(function ChatHeader({ session }: ChatHeaderProps) {
    if (!session) return null

    const persona = PERSONAS[session.persona_used]
    const riskColor = RISK_COLORS[session.risk_level] || RISK_COLORS.LOW

    return (
        <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between border-b bg-background px-4 py-3"
        >
            <div className="flex items-center gap-3">
                <PersonaAvatar persona={session.persona_used} size="sm" />
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold">
                            {persona?.label || 'AI Persona'}
                        </h3>
                        <Badge
                            variant="outline"
                            className={cn('text-[10px] px-1.5 py-0', riskColor)}
                        >
                            {session.risk_level}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {session.scam_type && (
                            <span className="flex items-center gap-1">
                                <Shield className="h-3 w-3" />
                                {session.scam_type.replace(/_/g, ' ')}
                            </span>
                        )}
                        <span>•</span>
                        <span>Turn {session.turn_count || 0}</span>
                        <span>•</span>
                        <Badge
                            variant={session.status === 'ACTIVE' ? 'default' : 'secondary'}
                            className="text-[10px] h-4"
                        >
                            {session.status}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-1">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Export Chat
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh Session
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            End Session
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </motion.div>
    )
})
