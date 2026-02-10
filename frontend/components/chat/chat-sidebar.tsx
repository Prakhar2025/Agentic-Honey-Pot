'use client'

import { memo, useState, useEffect } from 'react'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { Search, MessageSquare, Clock, Brain, ChevronRight } from 'lucide-react'
import { ScenarioCard } from './scenario-card'
import { SidebarSkeleton } from './chat-skeletons'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { ALL_SCENARIOS, ScamScenario } from '@/lib/constants/scenarios'
import { PERSONAS } from '@/lib/constants/personas'
import apiClient from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/endpoints'
import { cn } from '@/lib/utils/cn'

interface ChatSidebarProps {
    mode: 'scenarios' | 'history'
    onSelectScenario?: (params: { scammerMessage: string; persona?: string; scenario?: string }) => void
    onSelectSession?: (sessionId: string) => void
}

export const ChatSidebar = memo(function ChatSidebar({ mode, onSelectScenario, onSelectSession }: ChatSidebarProps) {
    const [search, setSearch] = useState('')

    if (mode === 'scenarios') {
        const filtered = ALL_SCENARIOS.filter(s =>
            !search || s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.description.toLowerCase().includes(search.toLowerCase())
        )

        return (
            <div className="flex flex-col h-full">
                <div className="p-3">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search scenarios..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-8 h-8 text-xs"
                        />
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    <div className="p-3 space-y-2">
                        {filtered.map((scenario) => (
                            <button
                                key={scenario.id}
                                onClick={() => onSelectScenario?.({
                                    scammerMessage: scenario.initialMessage,
                                    persona: scenario.suggestedPersona,
                                    scenario: scenario.id,
                                })}
                                className="w-full text-left p-3 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-all group"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-base">{scenario.icon}</span>
                                        <span className="text-xs font-medium">{scenario.name}</span>
                                    </div>
                                    <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">
                                    {scenario.description}
                                </p>
                                <div className="flex gap-1 mt-1.5">
                                    <Badge variant="outline" className="text-[9px] h-4">
                                        {scenario.scamType.replace(/_/g, ' ')}
                                    </Badge>
                                    <Badge variant="secondary" className="text-[9px] h-4">
                                        {scenario.difficulty}
                                    </Badge>
                                </div>
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        )
    }

    // History mode
    return <HistoryList search={search} setSearch={setSearch} onSelectSession={onSelectSession} />
})

interface HistoryListProps {
    search: string
    setSearch: (s: string) => void
    onSelectSession?: (id: string) => void
}

function HistoryList({ search, setSearch, onSelectSession }: HistoryListProps) {
    const { data, isLoading } = useQuery({
        queryKey: ['sessions', 'list'],
        queryFn: async () => {
            try {
                const res = await apiClient.get(API_ENDPOINTS.SESSIONS, {
                    params: { limit: 20, order: 'desc' }
                })
                return res.data
            } catch {
                return { sessions: [] }
            }
        },
        staleTime: 30000,
    })

    const sessions = data?.sessions || []
    const filtered = sessions.filter((s: any) =>
        !search ||
        s.scam_type?.toLowerCase().includes(search.toLowerCase()) ||
        s.persona?.toLowerCase().includes(search.toLowerCase())
    )

    if (isLoading) return <SidebarSkeleton />

    return (
        <div className="flex flex-col h-full">
            <div className="p-3">
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search history..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8 h-8 text-xs"
                    />
                </div>
            </div>
            <ScrollArea className="flex-1">
                <div className="p-3 space-y-2">
                    {filtered.length === 0 ? (
                        <div className="text-center py-8">
                            <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                            <p className="text-xs text-muted-foreground">No sessions yet</p>
                        </div>
                    ) : (
                        filtered.map((session: any) => {
                            const persona = PERSONAS[session.persona]
                            return (
                                <button
                                    key={session.id}
                                    onClick={() => onSelectSession?.(session.id)}
                                    className="w-full text-left p-3 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-all"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">{persona?.icon || '🤖'}</span>
                                            <span className="text-xs font-medium">
                                                {session.scam_type?.replace(/_/g, ' ') || 'Unknown'}
                                            </span>
                                        </div>
                                        <Badge
                                            variant={session.status === 'ACTIVE' ? 'default' : 'secondary'}
                                            className="text-[9px] h-4"
                                        >
                                            {session.status}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                                        <span className="flex items-center gap-0.5">
                                            <MessageSquare className="h-2.5 w-2.5" />
                                            {session.turn_count} turns
                                        </span>
                                        <span className="flex items-center gap-0.5">
                                            <Brain className="h-2.5 w-2.5" />
                                            {session.entities_count || 0} entities
                                        </span>
                                        <span className="ml-auto">
                                            {session.created_at ? format(new Date(session.created_at), 'MMM d, HH:mm') : ''}
                                        </span>
                                    </div>
                                </button>
                            )
                        })
                    )}
                </div>
            </ScrollArea>
        </div>
    )
}
