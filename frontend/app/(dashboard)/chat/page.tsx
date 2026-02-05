'use client'

import { useState, useRef, useEffect } from 'react'
import { Metadata } from 'next'
import { Send, Bot, User, Loader2, Settings, RefreshCw, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

interface Message {
    id: string
    role: 'scammer' | 'agent'
    content: string
    timestamp: Date
}

interface ExtractedIntel {
    phones: string[]
    upis: string[]
    links: string[]
}

const SAMPLE_MESSAGES = [
    "Dear customer, your bank account KYC has expired. Update now or account will be blocked. Click: http://fake-kyc.in",
    "Congratulations! You won Rs. 50 lakhs in lucky draw! Send Rs. 999 processing fee to UPI: lottery@ybl",
    "This is Microsoft support. Your computer has virus. Call +91-9876543210 immediately for free fix.",
    "Urgent job opportunity! Work from home. Earn 50k/month. No experience needed. WhatsApp +91-8765432109",
]

const PERSONAS = [
    { id: 'elderly_victim', name: 'Elderly Victim', emoji: '👵' },
    { id: 'tech_novice', name: 'Tech Novice', emoji: '🤷' },
    { id: 'eager_investor', name: 'Eager Investor', emoji: '💰' },
    { id: 'busy_professional', name: 'Busy Professional', emoji: '👔' },
    { id: 'helpful_auntie', name: 'Helpful Auntie', emoji: '👩' },
]

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [sessionId, setSessionId] = useState<string | null>(null)
    const [selectedPersona, setSelectedPersona] = useState('elderly_victim')
    const [scamType, setScamType] = useState<string | null>(null)
    const [intelligence, setIntelligence] = useState<ExtractedIntel>({ phones: [], upis: [], links: [] })
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim() || loading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'scammer',
            content: input.trim(),
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInput('')
        setLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock response
        const responses = [
            "Oh my! This is very concerning. Can you tell me more about what I need to do? I am not very good with computers...",
            "Wait, let me get my reading glasses. You said something about my account? Which bank are you calling from?",
            "Rs. 999? That seems like a lot of money. My grandson told me to be careful with these calls. How do I know you are really from the bank?",
            "UPI? What is UPI? I only know how to go to bank branch. Can you explain slowly?",
            "Oh no, virus on my computer? But I don't even use computer much. Let me call my neighbor's son who knows computers...",
        ]

        const agentMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'agent',
            content: responses[Math.floor(Math.random() * responses.length)],
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, agentMessage])
        setLoading(false)

        // Mock intelligence extraction
        const phoneMatch = input.match(/\+91[-\s]?\d{10}/g)
        const upiMatch = input.match(/[\w.-]+@[\w]+/g)
        const linkMatch = input.match(/https?:\/\/[^\s]+/gi)

        if (phoneMatch) {
            setIntelligence((prev) => ({ ...prev, phones: [...new Set([...prev.phones, ...phoneMatch])] }))
        }
        if (upiMatch) {
            setIntelligence((prev) => ({ ...prev, upis: [...new Set([...prev.upis, ...upiMatch])] }))
        }
        if (linkMatch) {
            setIntelligence((prev) => ({ ...prev, links: [...new Set([...prev.links, ...linkMatch])] }))
        }

        // Set scam type based on keywords
        if (!scamType) {
            if (input.toLowerCase().includes('kyc')) setScamType('KYC_FRAUD')
            else if (input.toLowerCase().includes('lottery') || input.toLowerCase().includes('won')) setScamType('LOTTERY_SCAM')
            else if (input.toLowerCase().includes('microsoft') || input.toLowerCase().includes('virus')) setScamType('TECH_SUPPORT')
            else if (input.toLowerCase().includes('job') || input.toLowerCase().includes('work from home')) setScamType('JOB_SCAM')
            else if (input.toLowerCase().includes('otp')) setScamType('OTP_FRAUD')
        }

        if (!sessionId) {
            setSessionId(`sess_${Date.now()}`)
        }
    }

    const handleReset = () => {
        setMessages([])
        setSessionId(null)
        setScamType(null)
        setIntelligence({ phones: [], upis: [], links: [] })
    }

    const handleSampleMessage = (msg: string) => {
        setInput(msg)
    }

    return (
        <div className="flex h-[calc(100vh-8rem)] gap-6">
            {/* Chat Panel */}
            <div className="flex flex-1 flex-col">
                <Card className="flex flex-1 flex-col">
                    <CardHeader className="border-b">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Bot className="h-5 w-5" />
                                    Scam Chat Simulator
                                </CardTitle>
                                <CardDescription>
                                    Test how the AI engages with scam messages
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                {sessionId && (
                                    <Badge variant="outline" className="font-mono">
                                        {sessionId}
                                    </Badge>
                                )}
                                <Button variant="outline" size="sm" onClick={handleReset}>
                                    <RefreshCw className="mr-2 h-3 w-3" />
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 p-0">
                        <ScrollArea className="h-[400px] p-4" ref={scrollRef}>
                            {messages.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center text-center">
                                    <Bot className="mb-4 h-12 w-12 text-muted-foreground" />
                                    <h3 className="mb-2 text-lg font-semibold">Start a Scam Simulation</h3>
                                    <p className="mb-4 max-w-sm text-sm text-muted-foreground">
                                        Type a scam message to see how the AI persona would respond. Try one of the sample messages below.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {SAMPLE_MESSAGES.slice(0, 2).map((msg, i) => (
                                            <Button
                                                key={i}
                                                variant="outline"
                                                size="sm"
                                                className="max-w-[200px] truncate"
                                                onClick={() => handleSampleMessage(msg)}
                                            >
                                                {msg.slice(0, 30)}...
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.role === 'agent' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`flex max-w-[80%] items-start gap-2 ${message.role === 'agent' ? 'flex-row-reverse' : ''
                                                    }`}
                                            >
                                                <div
                                                    className={`flex h-8 w-8 items-center justify-center rounded-full ${message.role === 'agent' ? 'bg-primary' : 'bg-destructive'
                                                        }`}
                                                >
                                                    {message.role === 'agent' ? (
                                                        <Bot className="h-4 w-4 text-primary-foreground" />
                                                    ) : (
                                                        <AlertCircle className="h-4 w-4 text-destructive-foreground" />
                                                    )}
                                                </div>
                                                <div
                                                    className={`rounded-lg p-3 ${message.role === 'agent'
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'bg-muted'
                                                        }`}
                                                >
                                                    <p className="text-sm">{message.content}</p>
                                                    <p
                                                        className={`mt-1 text-xs ${message.role === 'agent'
                                                                ? 'text-primary-foreground/70'
                                                                : 'text-muted-foreground'
                                                            }`}
                                                    >
                                                        {message.timestamp.toLocaleTimeString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {loading && (
                                        <div className="flex justify-end">
                                            <div className="flex items-center gap-2 rounded-lg bg-primary p-3 text-primary-foreground">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                <span className="text-sm">Thinking...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </ScrollArea>
                    </CardContent>

                    <div className="border-t p-4">
                        <div className="flex gap-2">
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a scam message to test the AI response..."
                                className="min-h-[60px] resize-none"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        handleSend()
                                    }
                                }}
                            />
                            <Button onClick={handleSend} disabled={loading || !input.trim()}>
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Sidebar */}
            <div className="hidden w-80 space-y-4 lg:block">
                {/* Persona Selector */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <Settings className="h-4 w-4" />
                            AI Persona
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {PERSONAS.map((persona) => (
                            <button
                                key={persona.id}
                                className={`flex w-full items-center gap-3 rounded-lg border p-2 text-left transition-colors ${selectedPersona === persona.id
                                        ? 'border-primary bg-primary/5'
                                        : 'hover:bg-muted'
                                    }`}
                                onClick={() => setSelectedPersona(persona.id)}
                            >
                                <span className="text-xl">{persona.emoji}</span>
                                <span className="text-sm font-medium">{persona.name}</span>
                            </button>
                        ))}
                    </CardContent>
                </Card>

                {/* Session Info */}
                {sessionId && (
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Session Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Status</span>
                                <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                                    ONGOING
                                </Badge>
                            </div>
                            {scamType && (
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Scam Type</span>
                                    <Badge variant="outline" className="bg-red-500/10 text-red-500">
                                        {scamType.replace('_', ' ')}
                                    </Badge>
                                </div>
                            )}
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Turns</span>
                                <span>{messages.length}</span>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Extracted Intelligence */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Extracted Intelligence</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {intelligence.phones.length > 0 && (
                            <div>
                                <p className="mb-1 text-xs text-muted-foreground">📱 Phone Numbers</p>
                                {intelligence.phones.map((phone, i) => (
                                    <Badge key={i} variant="outline" className="mr-1 mb-1">
                                        {phone}
                                    </Badge>
                                ))}
                            </div>
                        )}
                        {intelligence.upis.length > 0 && (
                            <div>
                                <p className="mb-1 text-xs text-muted-foreground">💳 UPI IDs</p>
                                {intelligence.upis.map((upi, i) => (
                                    <Badge key={i} variant="outline" className="mr-1 mb-1 bg-green-500/10 text-green-600">
                                        {upi}
                                    </Badge>
                                ))}
                            </div>
                        )}
                        {intelligence.links.length > 0 && (
                            <div>
                                <p className="mb-1 text-xs text-muted-foreground">🔗 Links</p>
                                {intelligence.links.map((link, i) => (
                                    <div key={i} className="rounded bg-red-500/10 px-2 py-1 text-xs text-red-600">
                                        {link}
                                    </div>
                                ))}
                            </div>
                        )}
                        {intelligence.phones.length === 0 && intelligence.upis.length === 0 && intelligence.links.length === 0 && (
                            <p className="text-xs text-muted-foreground">No entities extracted yet</p>
                        )}
                    </CardContent>
                </Card>

                {/* Sample Messages */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Sample Scam Messages</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {SAMPLE_MESSAGES.map((msg, i) => (
                            <button
                                key={i}
                                className="block w-full rounded border p-2 text-left text-xs transition-colors hover:bg-muted"
                                onClick={() => handleSampleMessage(msg)}
                            >
                                {msg.slice(0, 60)}...
                            </button>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
