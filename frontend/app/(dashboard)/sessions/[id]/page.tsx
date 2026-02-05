import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, MessageSquare, Brain, Globe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

export const metadata: Metadata = {
    title: 'Session Details',
    description: 'View session conversation and extracted intelligence',
}

// Mock data - in real app would come from API based on params
const session = {
    id: 'sess_abc123',
    scam_type: 'KYC_FRAUD',
    persona: 'elderly_victim',
    persona_label: 'Elderly Victim',
    status: 'COMPLETED',
    turn_count: 8,
    source_type: 'sms',
    started_at: '2026-02-04T18:30:00Z',
    ended_at: '2026-02-04T18:45:00Z',
}

const messages = [
    { role: 'scammer', content: 'Dear customer, your bank KYC has expired. Update immediately or account will be blocked. Click: http://fake-bank.in/kyc' },
    { role: 'agent', content: 'Oh my! My account will be blocked? What is this KYC you are talking about beta? I am not very good with computers...' },
    { role: 'scammer', content: 'Yes aunty, very urgent. You must update today only. Just share your account number and OTP.' },
    { role: 'agent', content: 'OTP? What is OTP? You mean the message that comes on phone? Wait, I will ask my grandson... He knows all this computer things.' },
    { role: 'scammer', content: 'No no aunty, dont tell grandson. This is confidential bank matter. Just tell me OTP when it comes. Which bank you have account?' },
    { role: 'agent', content: 'I have State Bank only. My husband opened account in 1982. But wait, which bank you are calling from? You dont sound like bank person...' },
    { role: 'scammer', content: 'I am senior manager from SBI head office aunty. Send payment of Rs. 999 to UPI id: scammer@ybl for KYC verification charges.' },
    { role: 'agent', content: 'Rs 999? But bank never asks for money on phone. My grandson told me about these fraud people. Are you trying to cheat me? I am calling police!' },
]

const intelligence = {
    phone_numbers: ['+91-9876543210'],
    upi_ids: ['scammer@ybl'],
    phishing_links: ['http://fake-bank.in/kyc'],
    bank_accounts: [],
}

export default function SessionDetailPage({ params }: { params: { id: string } }) {
    return (
        <div className="space-y-6">
            {/* Back button and header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/sessions">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Session Details</h1>
                    <p className="font-mono text-sm text-muted-foreground">{params.id}</p>
                </div>
            </div>

            {/* Session Info Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className="rounded-full bg-red-500/10 p-2">
                            <Globe className="h-4 w-4 text-red-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Scam Type</p>
                            <p className="font-medium">{session.scam_type.replace('_', ' ')}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className="rounded-full bg-blue-500/10 p-2">
                            <User className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Persona</p>
                            <p className="font-medium">{session.persona_label}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className="rounded-full bg-green-500/10 p-2">
                            <MessageSquare className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Turns</p>
                            <p className="font-medium">{session.turn_count} messages</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className="rounded-full bg-purple-500/10 p-2">
                            <Clock className="h-4 w-4 text-purple-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Status</p>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                                {session.status}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Conversation */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Conversation
                        </CardTitle>
                        <CardDescription>Full transcript of the engagement</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[500px] pr-4">
                            <div className="space-y-4">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.role === 'agent' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-lg p-3 ${message.role === 'agent'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted'
                                                }`}
                                        >
                                            <p className="text-sm">{message.content}</p>
                                            <p className={`mt-1 text-xs ${message.role === 'agent' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                                {message.role === 'agent' ? '🤖 Agent' : '🚨 Scammer'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Extracted Intelligence */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Brain className="h-4 w-4" />
                            Extracted Intelligence
                        </CardTitle>
                        <CardDescription>Entities identified from conversation</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {intelligence.phone_numbers.length > 0 && (
                            <div>
                                <p className="mb-2 text-sm font-medium">📱 Phone Numbers</p>
                                <div className="space-y-1">
                                    {intelligence.phone_numbers.map((phone, i) => (
                                        <Badge key={i} variant="outline" className="mr-1">
                                            {phone}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Separator />

                        {intelligence.upi_ids.length > 0 && (
                            <div>
                                <p className="mb-2 text-sm font-medium">💳 UPI IDs</p>
                                <div className="space-y-1">
                                    {intelligence.upi_ids.map((upi, i) => (
                                        <Badge key={i} variant="outline" className="mr-1 bg-green-500/10 text-green-600">
                                            {upi}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Separator />

                        {intelligence.phishing_links.length > 0 && (
                            <div>
                                <p className="mb-2 text-sm font-medium">🔗 Phishing Links</p>
                                <div className="space-y-1">
                                    {intelligence.phishing_links.map((link, i) => (
                                        <div key={i} className="rounded bg-red-500/10 px-2 py-1 text-xs text-red-600">
                                            {link}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {intelligence.bank_accounts.length === 0 &&
                            intelligence.phone_numbers.length === 0 &&
                            intelligence.upi_ids.length === 0 &&
                            intelligence.phishing_links.length === 0 && (
                                <p className="text-sm text-muted-foreground">
                                    No entities extracted from this session yet.
                                </p>
                            )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
