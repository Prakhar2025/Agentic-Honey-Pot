import { Metadata } from 'next'
import { Brain, Phone, CreditCard, Building, Link, Copy, Download, Filter } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata: Metadata = {
    title: 'Intelligence',
    description: 'View extracted scam intelligence entities',
}

// Mock data
const stats = [
    { label: 'Phone Numbers', value: 156, icon: Phone, color: 'blue' },
    { label: 'UPI IDs', value: 89, icon: CreditCard, color: 'green' },
    { label: 'Bank Accounts', value: 34, icon: Building, color: 'purple' },
    { label: 'Phishing Links', value: 67, icon: Link, color: 'red' },
]

const entities = [
    { type: 'PHONE_NUMBER', value: '+91-9876543210', confidence: 0.95, session: 'sess_abc123', time: '2 min ago' },
    { type: 'UPI_ID', value: 'scammer@ybl', confidence: 0.98, session: 'sess_abc123', time: '2 min ago' },
    { type: 'URL', value: 'http://fake-bank.in/kyc', confidence: 0.99, session: 'sess_abc123', time: '2 min ago' },
    { type: 'PHONE_NUMBER', value: '+91-8765432109', confidence: 0.92, session: 'sess_def456', time: '15 min ago' },
    { type: 'BANK_ACCOUNT', value: '1234567890123456', confidence: 0.88, session: 'sess_def456', time: '15 min ago' },
    { type: 'UPI_ID', value: 'lottery@paytm', confidence: 0.96, session: 'sess_def456', time: '15 min ago' },
    { type: 'URL', value: 'http://lottery-winner.com/claim', confidence: 0.97, session: 'sess_ghi789', time: '1 hour ago' },
    { type: 'PHONE_NUMBER', value: '+91-7654321098', confidence: 0.90, session: 'sess_ghi789', time: '1 hour ago' },
]

const typeColors: Record<string, string> = {
    PHONE_NUMBER: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    UPI_ID: 'bg-green-500/10 text-green-600 border-green-500/20',
    BANK_ACCOUNT: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    URL: 'bg-red-500/10 text-red-600 border-red-500/20',
    IFSC_CODE: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    EMAIL: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
}

const typeIcons: Record<string, typeof Phone> = {
    PHONE_NUMBER: Phone,
    UPI_ID: CreditCard,
    BANK_ACCOUNT: Building,
    URL: Link,
}

export default function IntelligencePage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Intelligence</h1>
                    <p className="text-muted-foreground">
                        Extracted entities from scam engagements
                    </p>
                </div>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <CardContent className="flex items-center gap-4 p-4">
                            <div className={`rounded-full bg-${stat.color}-500/10 p-3`}>
                                <stat.icon className={`h-5 w-5 text-${stat.color}-500`} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Entities Table */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Brain className="h-4 w-4" />
                                All Entities
                            </CardTitle>
                            <CardDescription>
                                {entities.length} entities extracted
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Input placeholder="Search entities..." className="w-64" />
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="phones">Phones</TabsTrigger>
                            <TabsTrigger value="upi">UPI</TabsTrigger>
                            <TabsTrigger value="links">Links</TabsTrigger>
                            <TabsTrigger value="banks">Banks</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all" className="mt-4">
                            <div className="space-y-3">
                                {entities.map((entity, index) => {
                                    const Icon = typeIcons[entity.type] || Brain
                                    return (
                                        <div
                                            key={index}
                                            className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`rounded-lg p-2 ${typeColors[entity.type]?.split(' ')[0]}`}>
                                                    <Icon className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="font-mono text-sm font-medium">{entity.value}</p>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <Badge variant="outline" className={typeColors[entity.type]}>
                                                            {entity.type.replace('_', ' ')}
                                                        </Badge>
                                                        <span>•</span>
                                                        <span>{Math.round(entity.confidence * 100)}% confidence</span>
                                                        <span>•</span>
                                                        <span>{entity.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm">
                                                    <Copy className="mr-2 h-3 w-3" />
                                                    Copy
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </TabsContent>
                        <TabsContent value="phones" className="mt-4">
                            <div className="space-y-3">
                                {entities.filter(e => e.type === 'PHONE_NUMBER').map((entity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-4 w-4 text-blue-500" />
                                            <span className="font-mono">{entity.value}</span>
                                        </div>
                                        <Badge variant="outline">{Math.round(entity.confidence * 100)}%</Badge>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="upi" className="mt-4">
                            <div className="space-y-3">
                                {entities.filter(e => e.type === 'UPI_ID').map((entity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <CreditCard className="h-4 w-4 text-green-500" />
                                            <span className="font-mono">{entity.value}</span>
                                        </div>
                                        <Badge variant="outline">{Math.round(entity.confidence * 100)}%</Badge>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="links" className="mt-4">
                            <div className="space-y-3">
                                {entities.filter(e => e.type === 'URL').map((entity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Link className="h-4 w-4 text-red-500" />
                                            <span className="font-mono text-sm">{entity.value}</span>
                                        </div>
                                        <Badge variant="outline">{Math.round(entity.confidence * 100)}%</Badge>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="banks" className="mt-4">
                            <div className="space-y-3">
                                {entities.filter(e => e.type === 'BANK_ACCOUNT').map((entity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Building className="h-4 w-4 text-purple-500" />
                                            <span className="font-mono">{entity.value}</span>
                                        </div>
                                        <Badge variant="outline">{Math.round(entity.confidence * 100)}%</Badge>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
