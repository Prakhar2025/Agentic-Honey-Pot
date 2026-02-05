import { Metadata } from 'next'
import { BarChart3, TrendingUp, PieChart, Calendar, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata: Metadata = {
    title: 'Analytics',
    description: 'ScamShield analytics and reports',
}

// Mock data for charts
const scamTypeData = [
    { type: 'KYC Fraud', count: 423, percentage: 34.2 },
    { type: 'Lottery Scam', count: 287, percentage: 23.2 },
    { type: 'Investment Fraud', count: 198, percentage: 16.0 },
    { type: 'Tech Support', count: 156, percentage: 12.6 },
    { type: 'Job Scam', count: 89, percentage: 7.2 },
    { type: 'Other', count: 84, percentage: 6.8 },
]

const timelineData = [
    { date: 'Jan 29', sessions: 45, entities: 123 },
    { date: 'Jan 30', sessions: 52, entities: 145 },
    { date: 'Jan 31', sessions: 38, entities: 98 },
    { date: 'Feb 01', sessions: 67, entities: 187 },
    { date: 'Feb 02', sessions: 73, entities: 201 },
    { date: 'Feb 03', sessions: 58, entities: 167 },
    { date: 'Feb 04', sessions: 49, entities: 134 },
]

const personaData = [
    { persona: 'Elderly Victim', count: 412, emoji: '👵' },
    { persona: 'Eager Investor', count: 298, emoji: '💰' },
    { persona: 'Tech Novice', count: 256, emoji: '🤷' },
    { persona: 'Busy Professional', count: 178, emoji: '👔' },
    { persona: 'Helpful Auntie', count: 103, emoji: '👩' },
]

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
                    <p className="text-muted-foreground">
                        Visualize scam patterns and trends
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Last 7 Days
                    </Button>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                {[
                    { title: 'Total Sessions', value: '1,247', change: '+12.5%', positive: true },
                    { title: 'Entities Extracted', value: '3,891', change: '+18.2%', positive: true },
                    { title: 'Avg Turns/Session', value: '8.4', change: '-2.1%', positive: false },
                    { title: 'Detection Rate', value: '94.2%', change: '+3.1%', positive: true },
                ].map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className={`text-xs ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.change} from last week
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="scam-types">Scam Types</TabsTrigger>
                    <TabsTrigger value="personas">Personas</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 lg:grid-cols-2">
                        {/* Scam Types Distribution */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PieChart className="h-4 w-4" />
                                    Scam Type Distribution
                                </CardTitle>
                                <CardDescription>Breakdown by scam category</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {scamTypeData.map((item) => (
                                        <div key={item.type} className="flex items-center gap-3">
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>{item.type}</span>
                                                    <span className="font-medium">{item.count}</span>
                                                </div>
                                                <div className="mt-1 h-2 rounded-full bg-muted">
                                                    <div
                                                        className="h-full rounded-full bg-primary"
                                                        style={{ width: `${item.percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="w-12 text-right text-sm text-muted-foreground">
                                                {item.percentage}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Persona Usage */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" />
                                    Persona Effectiveness
                                </CardTitle>
                                <CardDescription>Usage by AI persona</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {personaData.map((item) => (
                                        <div key={item.persona} className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xl">
                                                {item.emoji}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium">{item.persona}</span>
                                                    <span className="text-sm text-muted-foreground">
                                                        {item.count} sessions
                                                    </span>
                                                </div>
                                                <div className="mt-1 h-2 rounded-full bg-muted">
                                                    <div
                                                        className="h-full rounded-full bg-primary"
                                                        style={{ width: `${(item.count / 412) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="scam-types">
                    <Card>
                        <CardHeader>
                            <CardTitle>Scam Types Analysis</CardTitle>
                            <CardDescription>Detailed breakdown of detected scam categories</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {scamTypeData.map((item) => (
                                    <div key={item.type} className="rounded-lg border p-4">
                                        <div className="text-2xl font-bold">{item.count}</div>
                                        <div className="text-sm font-medium">{item.type}</div>
                                        <div className="mt-2 text-xs text-muted-foreground">
                                            {item.percentage}% of total
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="personas">
                    <Card>
                        <CardHeader>
                            <CardTitle>Persona Performance</CardTitle>
                            <CardDescription>How each AI persona performs in scam engagements</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {personaData.map((item) => (
                                    <div key={item.persona} className="flex flex-col items-center rounded-lg border p-6 text-center">
                                        <span className="text-4xl">{item.emoji}</span>
                                        <div className="mt-2 text-lg font-bold">{item.persona}</div>
                                        <div className="text-2xl font-bold text-primary">{item.count}</div>
                                        <div className="text-xs text-muted-foreground">sessions completed</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="timeline">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" />
                                Activity Timeline
                            </CardTitle>
                            <CardDescription>Sessions and entities over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {timelineData.map((day) => (
                                    <div key={day.date} className="flex items-center gap-4">
                                        <div className="w-16 text-sm text-muted-foreground">{day.date}</div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <div className="h-4 rounded bg-primary" style={{ width: `${(day.sessions / 73) * 100}%` }} />
                                                <span className="text-sm">{day.sessions} sessions</span>
                                            </div>
                                            <div className="mt-1 flex items-center gap-2">
                                                <div className="h-4 rounded bg-green-500" style={{ width: `${(day.entities / 201) * 100}%` }} />
                                                <span className="text-sm text-muted-foreground">{day.entities} entities</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
