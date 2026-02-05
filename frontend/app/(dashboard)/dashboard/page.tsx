import { Metadata } from 'next'
import {
    MessageSquare,
    Brain,
    BarChart3,
    Activity,
    TrendingUp,
    Users,
    Shield,
    Zap,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'ScamShield Dashboard - Overview and statistics',
}

// Stats cards data
const stats = [
    {
        title: 'Total Sessions',
        value: '1,247',
        change: '+12%',
        changeType: 'positive' as const,
        icon: MessageSquare,
        description: 'All time scam sessions',
    },
    {
        title: 'Active Sessions',
        value: '23',
        change: '+3',
        changeType: 'positive' as const,
        icon: Activity,
        description: 'Currently ongoing',
    },
    {
        title: 'Entities Extracted',
        value: '3,891',
        change: '+156',
        changeType: 'positive' as const,
        icon: Brain,
        description: 'Phone, UPI, Banks, URLs',
    },
    {
        title: 'Detection Rate',
        value: '94.2%',
        change: '+2.1%',
        changeType: 'positive' as const,
        icon: TrendingUp,
        description: 'Scam classification accuracy',
    },
]

const recentSessions = [
    { id: '1', scamType: 'KYC_FRAUD', status: 'ONGOING', turns: 5, time: '2 min ago' },
    { id: '2', scamType: 'LOTTERY_SCAM', status: 'COMPLETED', turns: 12, time: '15 min ago' },
    { id: '3', scamType: 'TECH_SUPPORT', status: 'COMPLETED', turns: 8, time: '1 hour ago' },
    { id: '4', scamType: 'OTP_FRAUD', status: 'TERMINATED', turns: 3, time: '2 hours ago' },
    { id: '5', scamType: 'INVESTMENT_FRAUD', status: 'COMPLETED', turns: 15, time: '3 hours ago' },
]

const scamTypeColors: Record<string, string> = {
    KYC_FRAUD: 'bg-red-500',
    LOTTERY_SCAM: 'bg-orange-500',
    TECH_SUPPORT: 'bg-yellow-500',
    INVESTMENT_FRAUD: 'bg-purple-500',
    OTP_FRAUD: 'bg-pink-500',
}

const statusColors: Record<string, string> = {
    ONGOING: 'bg-blue-500',
    COMPLETED: 'bg-green-500',
    TERMINATED: 'bg-red-500',
}

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome to ScamShield. Here&apos;s your intelligence overview.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="gap-1">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                        System Healthy
                    </Badge>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="flex items-center gap-2 text-xs">
                                <span
                                    className={
                                        stat.changeType === 'positive'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }
                                >
                                    {stat.change}
                                </span>
                                <span className="text-muted-foreground">{stat.description}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Sessions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Recent Sessions
                        </CardTitle>
                        <CardDescription>Latest scam engagement sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentSessions.map((session) => (
                                <div
                                    key={session.id}
                                    className="flex items-center justify-between rounded-lg border p-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`h-2 w-2 rounded-full ${scamTypeColors[session.scamType] || 'bg-gray-500'}`}
                                        />
                                        <div>
                                            <p className="text-sm font-medium">
                                                {session.scamType.replace('_', ' ')}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {session.turns} turns · {session.time}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={`text-white ${statusColors[session.status]}`}
                                    >
                                        {session.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            Quick Actions
                        </CardTitle>
                        <CardDescription>Common tasks and shortcuts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                {
                                    title: 'Start Chat Session',
                                    description: 'Test scam scenarios',
                                    icon: MessageSquare,
                                    href: '/chat',
                                },
                                {
                                    title: 'View Intelligence',
                                    description: 'Browse extracted entities',
                                    icon: Brain,
                                    href: '/intelligence',
                                },
                                {
                                    title: 'Analytics',
                                    description: 'View charts & reports',
                                    icon: BarChart3,
                                    href: '/analytics',
                                },
                                {
                                    title: 'All Sessions',
                                    description: 'Browse all sessions',
                                    icon: Users,
                                    href: '/sessions',
                                },
                            ].map((action) => (
                                <a
                                    key={action.title}
                                    href={action.href}
                                    className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted"
                                >
                                    <div className="rounded-md bg-primary/10 p-2">
                                        <action.icon className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{action.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {action.description}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Scam Types Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Scam Types Detected
                    </CardTitle>
                    <CardDescription>Distribution of scam types encountered</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { type: 'KYC Fraud', count: 423, color: 'bg-red-500' },
                            { type: 'Lottery Scam', count: 287, color: 'bg-orange-500' },
                            { type: 'Tech Support', count: 156, color: 'bg-yellow-500' },
                            { type: 'Investment Fraud', count: 198, color: 'bg-purple-500' },
                            { type: 'Job Scam', count: 89, color: 'bg-blue-500' },
                            { type: 'Loan Scam', count: 45, color: 'bg-green-500' },
                            { type: 'OTP Fraud', count: 34, color: 'bg-pink-500' },
                            { type: 'Unknown', count: 15, color: 'bg-gray-500' },
                        ].map((scam) => (
                            <div key={scam.type} className="flex items-center gap-3">
                                <div className={`h-3 w-3 rounded-full ${scam.color}`} />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{scam.type}</p>
                                    <p className="text-xs text-muted-foreground">{scam.count} sessions</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
