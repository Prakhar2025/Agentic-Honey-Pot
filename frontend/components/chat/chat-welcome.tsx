'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    MessageSquare, Zap, Shield, Users, ArrowRight,
    Sparkles, Play
} from 'lucide-react'
import { PersonaSelector } from './persona-selector'
import { ScenarioLibrary } from './scenario-library'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { QUICK_START_SCENARIOS } from '@/lib/constants/scenarios'
import { cn } from '@/lib/utils/cn'

interface ChatWelcomeProps {
    onStartSession: (params: {
        scammerMessage: string
        persona?: string
        scenario?: string
    }) => void
}

export function ChatWelcome({ onStartSession }: ChatWelcomeProps) {
    const [selectedPersona, setSelectedPersona] = useState<string | undefined>()
    const [customMessage, setCustomMessage] = useState('')
    const [activeTab, setActiveTab] = useState<'quick' | 'custom' | 'scenarios'>('quick')

    const handleQuickStart = (scenario: typeof QUICK_START_SCENARIOS[0]) => {
        onStartSession({
            scammerMessage: scenario.initialMessage,
            persona: selectedPersona || scenario.suggestedPersona,
            scenario: scenario.id,
        })
    }

    const handleCustomStart = () => {
        if (!customMessage.trim()) return
        onStartSession({
            scammerMessage: customMessage,
            persona: selectedPersona,
        })
    }

    return (
        <div className="h-full overflow-auto">
            <div className="container max-w-4xl mx-auto py-8 px-4">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <Shield className="h-8 w-8 text-primary" />
                            </div>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-1 -right-1"
                            >
                                <Sparkles className="h-5 w-5 text-yellow-500" />
                            </motion.div>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Scam Simulator</h1>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Test how AI-powered victim personas engage with scammers and extract intelligence in real-time
                    </p>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex justify-center gap-6 mb-8"
                >
                    <div className="text-center">
                        <p className="text-2xl font-bold text-primary">5</p>
                        <p className="text-xs text-muted-foreground">AI Personas</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-primary">8</p>
                        <p className="text-xs text-muted-foreground">Scam Types</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-primary">7</p>
                        <p className="text-xs text-muted-foreground">Entity Types</p>
                    </div>
                </motion.div>

                {/* Persona Selection */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <h2 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Select AI Persona (Optional)
                    </h2>
                    <PersonaSelector
                        selected={selectedPersona}
                        onSelect={setSelectedPersona}
                    />
                </motion.div>

                {/* Start Options */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                        <TabsList className="grid w-full grid-cols-3 mb-6">
                            <TabsTrigger value="quick" className="gap-2">
                                <Zap className="h-4 w-4" />
                                Quick Start
                            </TabsTrigger>
                            <TabsTrigger value="custom" className="gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Custom
                            </TabsTrigger>
                            <TabsTrigger value="scenarios" className="gap-2">
                                <Play className="h-4 w-4" />
                                Library
                            </TabsTrigger>
                        </TabsList>

                        {/* Quick Start */}
                        <TabsContent value="quick" className="mt-0">
                            <div className="grid gap-4 sm:grid-cols-2">
                                {QUICK_START_SCENARIOS.map((scenario, i) => (
                                    <motion.div
                                        key={scenario.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                    >
                                        <Card
                                            className="cursor-pointer hover:border-primary transition-colors group"
                                            onClick={() => handleQuickStart(scenario)}
                                        >
                                            <CardHeader className="pb-2">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <CardTitle className="text-base flex items-center gap-2">
                                                            <span>{scenario.icon}</span>
                                                            {scenario.name}
                                                        </CardTitle>
                                                        <CardDescription className="text-xs mt-1">
                                                            {scenario.description}
                                                        </CardDescription>
                                                    </div>
                                                    <Badge variant="outline" className="text-[10px]">
                                                        {scenario.scamType.replace(/_/g, ' ')}
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-0">
                                                <p className="text-sm italic text-muted-foreground border-l-2 pl-3 line-clamp-2">
                                                    &ldquo;{scenario.initialMessage}&rdquo;
                                                </p>
                                                <div className="flex items-center justify-between mt-3">
                                                    <Badge variant="secondary" className="text-[10px]">
                                                        {scenario.suggestedPersona.replace(/_/g, ' ')}
                                                    </Badge>
                                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Custom Message */}
                        <TabsContent value="custom" className="mt-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Enter Scammer&apos;s Message</CardTitle>
                                    <CardDescription>
                                        Type the initial scam message to test how the AI persona responds
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="e.g., Dear Customer, your KYC is pending. Click here to verify..."
                                            value={customMessage}
                                            onChange={(e) => setCustomMessage(e.target.value)}
                                            className="h-12"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Tip: Include scam indicators like urgency, financial requests, or suspicious links
                                        </p>
                                    </div>
                                    <Button
                                        onClick={handleCustomStart}
                                        disabled={!customMessage.trim()}
                                        className="w-full"
                                    >
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        Start Simulation
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Full Scenario Library */}
                        <TabsContent value="scenarios" className="mt-0">
                            <ScenarioLibrary onSelectScenario={(scenario) => {
                                onStartSession({
                                    scammerMessage: scenario.initialMessage,
                                    persona: selectedPersona || scenario.suggestedPersona,
                                    scenario: scenario.id,
                                })
                            }} />
                        </TabsContent>
                    </Tabs>
                </motion.div>

                {/* Footer Tips */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center"
                >
                    <p className="text-xs text-muted-foreground">
                        💡 The AI will automatically detect scam type, extract intelligence, and respond as a convincing victim
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
