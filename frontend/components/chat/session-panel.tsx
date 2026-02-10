'use client'

import { memo } from 'react'
import { format } from 'date-fns'
import { Clock, MessageSquare, Brain, Shield, Activity, User } from 'lucide-react'
import { SessionMetrics } from './session-metrics'
import { SessionTimeline } from './session-timeline'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { SessionInfo } from '@/types/chat'
import { useChatStore } from '@/lib/stores'
import { PERSONAS } from '@/lib/constants/personas'
import { cn } from '@/lib/utils/cn'

interface SessionPanelProps {
    session: SessionInfo | null
}

export const SessionPanel = memo(function SessionPanel({ session }: SessionPanelProps) {
    const { messages, extractedEntities } = useChatStore()

    if (!session) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <Activity className="h-10 w-10 text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">No active session</p>
                <p className="text-xs text-muted-foreground mt-1">
                    Start a chat to see session details
                </p>
            </div>
        )
    }

    const persona = PERSONAS[session.persona_used]

    return (
        <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
                {/* Session Overview */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Session Details
                    </h3>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-lg bg-muted/50 p-3 text-center">
                            <MessageSquare className="h-4 w-4 mx-auto mb-1 text-primary" />
                            <p className="text-lg font-bold">{session.turn_count || messages.length}</p>
                            <p className="text-[10px] text-muted-foreground">Messages</p>
                        </div>
                        <div className="rounded-lg bg-muted/50 p-3 text-center">
                            <Brain className="h-4 w-4 mx-auto mb-1 text-primary" />
                            <p className="text-lg font-bold">{extractedEntities.length}</p>
                            <p className="text-[10px] text-muted-foreground">Entities</p>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Persona Info */}
                <div className="space-y-2">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        AI Persona
                    </h4>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                        <span className="text-2xl">{persona?.icon || '🤖'}</span>
                        <div>
                            <p className="text-sm font-medium">{persona?.label || session.persona_used}</p>
                            <p className="text-xs text-muted-foreground">{persona?.trait}</p>
                        </div>
                    </div>
                </div>

                {/* Scam Info */}
                {session.scam_type && (
                    <>
                        <Separator />
                        <div className="space-y-2">
                            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Detection
                            </h4>
                            <div className="flex items-center justify-between p-2 rounded-lg bg-destructive/5">
                                <div className="flex items-center gap-2">
                                    <Shield className="h-4 w-4 text-destructive" />
                                    <span className="text-sm font-medium">{session.scam_type.replace(/_/g, ' ')}</span>
                                </div>
                                <Badge variant="outline" className="text-destructive text-[10px]">
                                    {session.risk_level}
                                </Badge>
                            </div>
                        </div>
                    </>
                )}

                <Separator />

                {/* Session Metrics */}
                <SessionMetrics session={session} />

                <Separator />

                {/* Timeline */}
                <SessionTimeline messages={messages} />

                {/* Session ID */}
                <div className="pt-2">
                    <p className="text-[10px] text-muted-foreground text-center">
                        Session: {session.id}
                    </p>
                </div>
            </div>
        </ScrollArea>
    )
})
