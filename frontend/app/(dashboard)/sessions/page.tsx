import { Metadata } from 'next'
import Link from 'next/link'
import { MessageSquare, Filter, Plus, Search, Eye } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const metadata: Metadata = {
    title: 'Sessions',
    description: 'View and manage scam engagement sessions',
}

// Mock data - in real app would come from API
const sessions = [
    {
        id: 'sess_abc123',
        scam_type: 'KYC_FRAUD',
        persona: 'elderly_victim',
        status: 'ONGOING',
        turn_count: 8,
        source_type: 'sms',
        started_at: '2026-02-04T18:30:00Z',
        entities: 3,
    },
    {
        id: 'sess_def456',
        scam_type: 'LOTTERY_SCAM',
        persona: 'eager_investor',
        status: 'COMPLETED',
        turn_count: 15,
        source_type: 'whatsapp',
        started_at: '2026-02-04T17:15:00Z',
        entities: 7,
    },
    {
        id: 'sess_ghi789',
        scam_type: 'TECH_SUPPORT',
        persona: 'tech_novice',
        status: 'COMPLETED',
        turn_count: 12,
        source_type: 'email',
        started_at: '2026-02-04T16:00:00Z',
        entities: 4,
    },
    {
        id: 'sess_jkl012',
        scam_type: 'OTP_FRAUD',
        persona: 'busy_professional',
        status: 'TERMINATED',
        turn_count: 4,
        source_type: 'sms',
        started_at: '2026-02-04T14:30:00Z',
        entities: 1,
    },
    {
        id: 'sess_mno345',
        scam_type: 'INVESTMENT_FRAUD',
        persona: 'eager_investor',
        status: 'COMPLETED',
        turn_count: 20,
        source_type: 'chat',
        started_at: '2026-02-04T12:00:00Z',
        entities: 9,
    },
]

const scamTypeColors: Record<string, string> = {
    KYC_FRAUD: 'bg-red-500/10 text-red-500 border-red-500/20',
    LOTTERY_SCAM: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    TECH_SUPPORT: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    INVESTMENT_FRAUD: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    OTP_FRAUD: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
    JOB_SCAM: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    LOAN_SCAM: 'bg-green-500/10 text-green-500 border-green-500/20',
    UNKNOWN: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
}

const statusColors: Record<string, string> = {
    INITIAL: 'bg-gray-500/10 text-gray-500',
    ONGOING: 'bg-blue-500/10 text-blue-500',
    COMPLETED: 'bg-green-500/10 text-green-500',
    TERMINATED: 'bg-red-500/10 text-red-500',
    MAX_TURNS_REACHED: 'bg-orange-500/10 text-orange-500',
    SAFETY_EXIT: 'bg-yellow-500/10 text-yellow-500',
}

const personaEmojis: Record<string, string> = {
    elderly_victim: '👵',
    tech_novice: '🤷',
    eager_investor: '💰',
    busy_professional: '👔',
    helpful_auntie: '👩',
}

export default function SessionsPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Sessions</h1>
                    <p className="text-muted-foreground">
                        View and manage all scam engagement sessions
                    </p>
                </div>
                <Button asChild>
                    <Link href="/chat">
                        <Plus className="mr-2 h-4 w-4" />
                        New Session
                    </Link>
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search sessions..." className="pl-8" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Sessions List */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        All Sessions
                    </CardTitle>
                    <CardDescription>
                        {sessions.length} sessions found
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {sessions.map((session) => (
                            <div
                                key={session.id}
                                className="flex flex-col gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xl">
                                        {personaEmojis[session.persona] || '🤖'}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-sm text-muted-foreground">
                                                {session.id}
                                            </span>
                                            <Badge variant="outline" className={scamTypeColors[session.scam_type]}>
                                                {session.scam_type.replace('_', ' ')}
                                            </Badge>
                                        </div>
                                        <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                                            <span>{session.turn_count} turns</span>
                                            <span>•</span>
                                            <span>{session.entities} entities</span>
                                            <span>•</span>
                                            <span>{session.source_type.toUpperCase()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge className={statusColors[session.status]}>
                                        {session.status}
                                    </Badge>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/sessions/${session.id}`}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
