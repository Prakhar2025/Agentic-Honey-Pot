'use client'

import { memo } from 'react'
import { TrendingUp, Clock, Zap, Target } from 'lucide-react'
import { SessionInfo } from '@/types/chat'
import { useChatStore } from '@/lib/stores/chat-store'

interface SessionMetricsProps {
    session: SessionInfo
}

export const SessionMetrics = memo(function SessionMetrics({ session }: SessionMetricsProps) {
    const { extractedEntities, messages } = useChatStore()

    const entitiesPerTurn = session.turn_count > 0
        ? (extractedEntities.length / session.turn_count).toFixed(1)
        : '0'

    const scammerMessages = messages.filter(m => m.role === 'scammer').length
    const victimMessages = messages.filter(m => m.role === 'victim').length

    return (
        <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Metrics
            </h4>
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        Entities/Turn
                    </span>
                    <span className="font-medium tabular-nums">{entitiesPerTurn}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                        <Zap className="h-3 w-3" />
                        Scammer Messages
                    </span>
                    <span className="font-medium tabular-nums">{scammerMessages}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                        <Target className="h-3 w-3" />
                        AI Responses
                    </span>
                    <span className="font-medium tabular-nums">{victimMessages}</span>
                </div>
            </div>
        </div>
    )
})
