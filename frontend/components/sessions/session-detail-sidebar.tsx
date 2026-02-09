'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
    MessageSquare,
    Brain,
    Target,
    Clock,
    Phone,
    CreditCard,
    Building2,
    Link as LinkIcon,
    Mail,
    Hash,
    Copy,
    Check,
    ChevronDown
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useSessionIntelligence } from '@/lib/hooks/use-sessions'
import { formatDuration, formatDateTime, getSessionDuration } from '@/lib/utils/date'
import { cn } from '@/lib/utils/cn'
import { IntelligenceSkeleton } from './skeletons'
import { toast } from 'sonner'

interface SessionDetailSidebarProps {
    sessionId: string
    session: {
        id: string
        status: string
        turn_count: number
        started_at: string
        ended_at: string | null
        metadata_json?: Record<string, unknown> | null
    }
}

const entityIcons: Record<string, React.ElementType> = {
    PHONE_NUMBER: Phone,
    UPI_ID: CreditCard,
    BANK_ACCOUNT: Building2,
    URL: LinkIcon,
    EMAIL: Mail,
    IFSC_CODE: Hash,
}

const entityColors: Record<string, string> = {
    PHONE_NUMBER: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
    UPI_ID: 'text-green-500 bg-green-100 dark:bg-green-900/30',
    BANK_ACCOUNT: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30',
    URL: 'text-red-500 bg-red-100 dark:bg-red-900/30',
    EMAIL: 'text-pink-500 bg-pink-100 dark:bg-pink-900/30',
    IFSC_CODE: 'text-orange-500 bg-orange-100 dark:bg-orange-900/30',
}

export function SessionDetailSidebar({ sessionId, session }: SessionDetailSidebarProps) {
    const { data: intelligence, isLoading } = useSessionIntelligence(sessionId)
    const [copiedEntity, setCopiedEntity] = React.useState<string | null>(null)

    const duration = getSessionDuration(session.started_at, session.ended_at)
    const riskScore = session.metadata_json?.risk_score as number | undefined
    const confidence = session.metadata_json?.detection_confidence as number | undefined
    const isActive = session.status === 'ONGOING' || session.status === 'ACTIVE'

    const copyEntity = async (value: string) => {
        await navigator.clipboard.writeText(value)
        setCopiedEntity(value)
        toast.success('Copied to clipboard')
        setTimeout(() => setCopiedEntity(null), 2000)
    }

    // Group entities by type
    const groupedEntities: Record<string, any[]> = React.useMemo(() => {
        if (!intelligence?.entities) return {} as Record<string, any[]>
        return intelligence.entities.reduce((acc: Record<string, any[]>, entity: any) => {
            if (!acc[entity.type]) acc[entity.type] = []
            acc[entity.type].push(entity)
            return acc
        }, {} as Record<string, any[]>)
    }, [intelligence?.entities])

    return (
        <div className="w-80 border-l bg-muted/20 flex-col lg:flex hidden">
            <Tabs defaultValue="stats" className="flex-1 flex flex-col">
                <TabsList className="mx-4 mt-4 grid grid-cols-3">
                    <TabsTrigger value="stats">Stats</TabsTrigger>
                    <TabsTrigger value="intel">
                        Intel
                        {intelligence?.summary?.total > 0 && (
                            <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-xs">
                                {intelligence.summary.total}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>

                <ScrollArea className="flex-1 p-4">
                    {/* Stats Tab */}
                    <TabsContent value="stats" className="mt-0 space-y-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Session Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MessageSquare className="h-4 w-4" />
                                        Messages
                                    </span>
                                    <span className="font-semibold">{session.turn_count * 2}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Brain className="h-4 w-4" />
                                        Entities
                                    </span>
                                    <span className="font-semibold">{intelligence?.summary?.total || 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Target className="h-4 w-4" />
                                        Risk Score
                                    </span>
                                    <Badge variant={riskScore && riskScore > 7 ? 'destructive' : 'secondary'}>
                                        {riskScore?.toFixed(1) || 'N/A'}/10
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        Duration
                                    </span>
                                    <span className="font-semibold">
                                        {formatDuration(duration)}
                                        {isActive && '+'}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Detection confidence */}
                        {confidence !== undefined && (
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Detection Confidence</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Confidence Level</span>
                                            <span className="font-semibold text-primary">
                                                {(confidence * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                        <div className="overflow-hidden h-2 rounded-full bg-muted">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${confidence * 100}%` }}
                                                transition={{ duration: 0.5 }}
                                                className="h-full bg-primary rounded-full"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    {/* Intelligence Tab */}
                    <TabsContent value="intel" className="mt-0 space-y-4">
                        {isLoading ? (
                            <IntelligenceSkeleton />
                        ) : Object.keys(groupedEntities).length === 0 ? (
                            <div className="text-center py-8">
                                <Brain className="h-10 w-10 mx-auto text-muted-foreground/50" />
                                <p className="mt-2 text-sm text-muted-foreground">No entities extracted yet</p>
                            </div>
                        ) : (
                            Object.entries(groupedEntities).map(([type, entities]: [string, any[]]) => {
                                const Icon = entityIcons[type] || Hash
                                const colorClass = entityColors[type] || 'text-gray-500 bg-gray-100'

                                return (
                                    <Collapsible key={type} defaultOpen>
                                        <Card>
                                            <CollapsibleTrigger asChild>
                                                <CardHeader className="pb-2 cursor-pointer hover:bg-muted/50 transition-colors">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className={cn('p-1.5 rounded-md', colorClass.split(' ').slice(1).join(' '))}>
                                                                <Icon className={cn('h-4 w-4', colorClass.split(' ')[0])} />
                                                            </div>
                                                            <CardTitle className="text-sm font-medium">
                                                                {type.replace(/_/g, ' ')}
                                                            </CardTitle>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Badge variant="secondary">{entities.length}</Badge>
                                                            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform ui-open:rotate-180" />
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <CardContent className="pt-0 space-y-2">
                                                    {entities.map((entity, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center justify-between p-2 rounded-md bg-muted/50 group"
                                                        >
                                                            <span className="text-sm font-mono truncate flex-1 mr-2">
                                                                {entity.value}
                                                            </span>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-7 w-7 opacity-0 group-hover:opacity-100 shrink-0"
                                                                        onClick={() => copyEntity(entity.value)}
                                                                    >
                                                                        {copiedEntity === entity.value ? (
                                                                            <Check className="h-4 w-4 text-green-500" />
                                                                        ) : (
                                                                            <Copy className="h-4 w-4" />
                                                                        )}
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>Copy</TooltipContent>
                                                            </Tooltip>
                                                        </div>
                                                    ))}
                                                </CardContent>
                                            </CollapsibleContent>
                                        </Card>
                                    </Collapsible>
                                )
                            })
                        )}
                    </TabsContent>

                    {/* Timeline Tab */}
                    <TabsContent value="timeline" className="mt-0">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Session Timeline</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="relative space-y-4 before:absolute before:inset-0 before:ml-3 before:w-0.5 before:bg-border">
                                    <TimelineItem
                                        time={session.started_at}
                                        title="Session Started"
                                        description="Scam engagement initiated"
                                        type="start"
                                    />

                                    {intelligence?.entities?.slice(0, 5).map((entity: any, index: number) => (
                                        <TimelineItem
                                            key={index}
                                            time={entity.extracted_at || session.started_at}
                                            title="Entity Extracted"
                                            description={`${entity.type.replace(/_/g, ' ')}: ${entity.value.slice(0, 20)}${entity.value.length > 20 ? '...' : ''}`}
                                            type="entity"
                                        />
                                    ))}

                                    {session.status === 'COMPLETED' && session.ended_at && (
                                        <TimelineItem
                                            time={session.ended_at}
                                            title="Session Completed"
                                            description={`${session.turn_count} turns, ${intelligence?.summary?.total || 0} entities`}
                                            type="end"
                                        />
                                    )}

                                    {isActive && (
                                        <TimelineItem
                                            time={new Date().toISOString()}
                                            title="In Progress"
                                            description="Waiting for response..."
                                            type="active"
                                        />
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </ScrollArea>
            </Tabs>
        </div>
    )
}

interface TimelineItemProps {
    time: string
    title: string
    description: string
    type: 'start' | 'entity' | 'end' | 'active'
}

function TimelineItem({ time, title, description, type }: TimelineItemProps) {
    const colors = {
        start: 'bg-green-500',
        entity: 'bg-blue-500',
        end: 'bg-primary',
        active: 'bg-yellow-500 animate-pulse',
    }

    return (
        <div className="relative pl-8">
            <span className={cn(
                'absolute left-1 top-1.5 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-background',
                colors[type]
            )} />
            <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">
                    {formatDateTime(time)}
                </span>
                <span className="text-sm font-medium">{title}</span>
                <span className="text-xs text-muted-foreground line-clamp-1">{description}</span>
            </div>
        </div>
    )
}
