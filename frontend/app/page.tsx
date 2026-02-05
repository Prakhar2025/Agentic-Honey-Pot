import Link from 'next/link'
import { ArrowRight, Shield, Brain, BarChart3, MessageSquare, Zap, Lock } from 'lucide-react'

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold">ScamShield</span>
                    </div>
                    <nav className="hidden items-center gap-6 md:flex">
                        <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Features
                        </Link>
                        <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            How It Works
                        </Link>
                        <Link href="/dashboard" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                            Dashboard
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
                    <div className="container relative z-10">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-6 inline-flex items-center rounded-full border bg-muted px-4 py-1.5 text-sm">
                                <span className="mr-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">New</span>
                                India AI Impact Buildathon 2026
                            </div>
                            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                                AI-Powered{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Scam Intelligence
                                </span>{' '}
                                Platform
                            </h1>
                            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                                ScamShield autonomously engages scammers, extracts intelligence, and protects potential victims.
                                Powered by advanced AI to combat the ₹60 crore daily scam epidemic in India.
                            </p>
                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Link
                                    href="/dashboard"
                                    className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
                                >
                                    Open Dashboard
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                                <Link
                                    href="/chat"
                                    className="inline-flex h-12 items-center justify-center rounded-lg border border-input bg-background px-8 text-base font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    Try Chat Simulator
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
                        <div className="absolute right-0 top-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-3xl" />
                    </div>
                </section>

                {/* Stats Section */}
                <section className="border-y bg-muted/30 py-12">
                    <div className="container">
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                            {[
                                { value: '₹60Cr+', label: 'Daily Scam Losses in India' },
                                { value: '8+', label: 'Scam Types Detected' },
                                { value: '5', label: 'AI Personas' },
                                { value: '100+', label: 'Test Scenarios' },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
                                    <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20">
                    <div className="container">
                        <div className="mx-auto mb-16 max-w-2xl text-center">
                            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                                Powerful Features
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Everything you need to combat scams with AI-powered intelligence
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    icon: Brain,
                                    title: 'Agentic AI Core',
                                    description: 'Autonomous multi-turn conversations powered by LLaMA 3.3-70b. Engages scammers naturally.',
                                },
                                {
                                    icon: MessageSquare,
                                    title: 'Dynamic Personas',
                                    description: '5 realistic victim profiles that adapt behavior based on scammer tactics.',
                                },
                                {
                                    icon: Zap,
                                    title: 'Real-time Extraction',
                                    description: 'Capture phone numbers, UPI IDs, bank accounts, and phishing links instantly.',
                                },
                                {
                                    icon: BarChart3,
                                    title: 'Analytics Dashboard',
                                    description: 'Visualize scam patterns, track trends, and generate intelligence reports.',
                                },
                                {
                                    icon: Lock,
                                    title: 'Enterprise Security',
                                    description: 'API key authentication, rate limiting, and ethical safety boundaries.',
                                },
                                {
                                    icon: Shield,
                                    title: '8 Scam Types',
                                    description: 'Detect KYC fraud, lottery scams, tech support, investment fraud, and more.',
                                },
                            ].map((feature) => (
                                <div
                                    key={feature.title}
                                    className="group relative rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                                >
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section id="how-it-works" className="bg-muted/30 py-20">
                    <div className="container">
                        <div className="mx-auto mb-16 max-w-2xl text-center">
                            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                                How It Works
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Three simple steps to extract scammer intelligence
                            </p>
                        </div>
                        <div className="mx-auto max-w-4xl">
                            <div className="grid gap-8 md:grid-cols-3">
                                {[
                                    {
                                        step: '01',
                                        title: 'Receive Scam Message',
                                        description: 'Forward suspicious SMS, WhatsApp, or email messages to ScamShield.',
                                    },
                                    {
                                        step: '02',
                                        title: 'AI Engages Scammer',
                                        description: 'Our agentic AI adopts a persona and engages the scammer in conversation.',
                                    },
                                    {
                                        step: '03',
                                        title: 'Extract Intelligence',
                                        description: 'Automatically extract phone numbers, bank details, and phishing links.',
                                    },
                                ].map((item) => (
                                    <div key={item.step} className="relative text-center">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                                            {item.step}
                                        </div>
                                        <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20">
                    <div className="container">
                        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white md:p-12">
                            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                                Ready to Fight Scams with AI?
                            </h2>
                            <p className="mb-6 text-white/80">
                                Access the dashboard and start protecting potential victims today.
                            </p>
                            <Link
                                href="/dashboard"
                                className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-medium text-primary shadow-lg transition-all hover:bg-white/90"
                            >
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t py-8">
                <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <span className="font-semibold">ScamShield</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © 2026 ScamShield. Built for India AI Impact Buildathon.
                    </p>
                    <div className="flex gap-4">
                        <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
                            Docs
                        </Link>
                        <Link href="https://github.com/Prakhar2025/Agentic-Honey-Pot" className="text-sm text-muted-foreground hover:text-foreground">
                            GitHub
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
