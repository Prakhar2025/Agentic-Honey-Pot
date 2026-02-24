'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    Shield,
    Brain,
    Zap,
    Database,
    Users,
    BarChart3,
    ArrowRight,
    Check,
    Star,
    Sparkles,
    Lock,
    TrendingUp,
    Github,
    MessageSquare,
    Activity,
    Menu,
    X,
} from 'lucide-react'
import { TechStack } from '@/components/marketing/tech-stack'
import { Footer } from '@/components/marketing/footer'
import { Navbar } from '@/components/marketing/navbar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const FEATURES = [
    {
        title: 'AI-Powered Personas',
        description: '5 distinct victim personas powered by LLaMA 3.3-70b for realistic scam engagement',
        icon: Users,
        color: 'text-blue-500 bg-blue-500/10',
    },
    {
        title: 'Real-time Intelligence',
        description: 'Automatic extraction of phone numbers, UPI IDs, bank accounts, and phishing URLs',
        icon: Brain,
        color: 'text-purple-500 bg-purple-500/10',
    },
    {
        title: 'Scam Detection',
        description: '8 scam type classifications with confidence scoring and risk assessment',
        icon: Shield,
        color: 'text-red-500 bg-red-500/10',
    },
    {
        title: 'Agentic Architecture',
        description: 'Autonomous decision-making engine that adapts responses based on scam patterns',
        icon: Zap,
        color: 'text-yellow-500 bg-yellow-500/10',
    },
    {
        title: 'Analytics Dashboard',
        description: 'Comprehensive analytics with charts, reports, and trend analysis',
        icon: BarChart3,
        color: 'text-green-500 bg-green-500/10',
    },
    {
        title: 'Secure & Compliant',
        description: 'Enterprise-grade security with data protection and ethical guidelines',
        icon: Lock,
        color: 'text-cyan-500 bg-cyan-500/10',
    },
]

const STATS = [
    { value: '₹60Cr+', label: 'Daily Losses Prevented (Target)', icon: TrendingUp },
    { value: '13', label: 'REST API Endpoints', icon: Database },
    { value: '5', label: 'AI Personas', icon: Users },
    { value: '8', label: 'Scam Types Detected', icon: Shield },
]

const HOW_IT_WORKS = [
    {
        step: '01',
        title: 'Scammer Initiates Contact',
        description: 'When a scammer sends a fraudulent message, the honeypot automatically intercepts and analyzes it.',
        icon: MessageSquare,
    },
    {
        step: '02',
        title: 'AI Engages Intelligently',
        description: 'Our AI selects the optimal persona and generates realistic responses to keep the scammer engaged.',
        icon: Brain,
    },
    {
        step: '03',
        title: 'Intelligence Extracted',
        description: 'Financial intelligence like phone numbers, UPI IDs and bank accounts are automatically extracted.',
        icon: Database,
    },
    {
        step: '04',
        title: 'Analytics & Reporting',
        description: 'All data flows into a comprehensive dashboard for analysis, pattern detection, and reporting.',
        icon: Activity,
    },
]

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-24 pb-16 md:pt-36 md:pb-28">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

                <div className="container relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex justify-center mb-6"
                        >
                            <Badge variant="outline" className="px-4 py-1.5 text-sm border-primary/30 bg-primary/5">
                                <Sparkles className="h-3 w-3 mr-2 text-primary" />
                                Agentic AI Honeypot System
                            </Badge>
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                AI-Powered
                            </span>
                            <br />
                            Scam Intelligence Platform
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Autonomous honeypot that engages scammers, extracts intelligence,
                            and protects millions from digital fraud
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Button size="lg" asChild className="text-lg px-8 h-14 shadow-lg shadow-primary/25">
                                <Link href="/dashboard">
                                    <span className="flex items-center gap-2">
                                        Launch Dashboard
                                        <ArrowRight className="h-5 w-5" />
                                    </span>
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="text-lg px-8 h-14">
                                <Link href="/docs">
                                    <span>View API Docs</span>
                                </Link>
                            </Button>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                            {[
                                { icon: Check, label: 'Open Source', color: 'text-green-500' },
                                { icon: Check, label: 'Production Ready', color: 'text-green-500' },
                                { icon: Check, label: 'Free to Use', color: 'text-green-500' },
                                { icon: Star, label: 'Groq Powered', color: 'text-yellow-500' },
                            ].map((badge) => (
                                <div key={badge.label} className="flex items-center gap-1">
                                    <badge.icon className={`h-4 w-4 ${badge.color}`} />
                                    {badge.label}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-16 relative"
                    >
                        <div className="relative rounded-xl overflow-hidden border-2 border-primary/10 shadow-2xl bg-gradient-to-b from-muted/50 to-background">
                            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
                                <div className="text-center space-y-4">
                                    <div className="inline-flex p-4 rounded-2xl bg-primary/10">
                                        <Shield className="h-12 w-12 text-primary" />
                                    </div>
                                    <p className="text-lg font-medium text-muted-foreground">ScamShield Dashboard</p>
                                    <Button asChild variant="outline" size="sm">
                                        <Link href="/dashboard">
                                            <span>View Live Dashboard →</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="absolute -left-4 top-1/4 hidden lg:block"
                        >
                            <Card className="w-48 shadow-lg border-primary/10">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-red-500/10">
                                            <Shield className="h-5 w-5 text-red-500" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">156</p>
                                            <p className="text-xs text-muted-foreground">Scams Detected</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="absolute -right-4 top-1/3 hidden lg:block"
                        >
                            <Card className="w-48 shadow-lg border-primary/10">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-green-500/10">
                                            <Brain className="h-5 w-5 text-green-500" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">423</p>
                                            <p className="text-xs text-muted-foreground">Entities Extracted</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section id="stats" className="py-16 bg-muted/30 border-y">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {STATS.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="flex justify-center mb-3">
                                    <div className="p-3 rounded-xl bg-primary/10">
                                        <stat.icon className="h-6 w-6 text-primary" />
                                    </div>
                                </div>
                                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-20">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <Badge variant="outline" className="mb-4">Features</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise-Grade Scam Intelligence</h2>
                        <p className="text-lg text-muted-foreground">
                            Built with cutting-edge AI technology to combat the rising tide of digital fraud in India
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FEATURES.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-lg hover:border-primary/20 transition-all">
                                    <CardContent className="p-6">
                                        <div className={`p-3 rounded-xl w-fit mb-4 ${feature.color}`}>
                                            <feature.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-muted/30 border-y">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <Badge variant="outline" className="mb-4">How It Works</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligent Scam Interception</h2>
                        <p className="text-lg text-muted-foreground">
                            From scammer contact to actionable intelligence in seconds
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {HOW_IT_WORKS.map((step, i) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                            >
                                <Card className="h-full text-center hover:shadow-lg transition-all relative overflow-hidden">
                                    <CardContent className="p-6 pt-8">
                                        <span className="absolute top-2 right-3 text-5xl font-bold text-primary/5">
                                            {step.step}
                                        </span>
                                        <div className="p-3 rounded-xl bg-primary/10 w-fit mx-auto mb-4">
                                            <step.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="font-semibold mb-2">{step.title}</h3>
                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <TechStack />

            {/* CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5" />
                <div className="container relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Fight Digital Fraud?</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Join the mission to protect millions from scams. Start using ScamShield today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild className="shadow-lg shadow-primary/25">
                                <Link href="/dashboard">
                                    <span className="flex items-center gap-2">
                                        Get Started Free
                                        <ArrowRight className="h-4 w-4" />
                                    </span>
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="https://github.com/Prakhar2025/Agentic-Honey-Pot" target="_blank">
                                    <span className="flex items-center gap-2">
                                        <Github className="h-4 w-4" />
                                        Star on GitHub
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
