'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    Search,
    Book,
    Code,
    Layers,
    Users,
    Shield,
    Database,
    Globe,
    GitBranch,
    Zap,
    HelpCircle,
    ExternalLink,
    ArrowRight,
    Sparkles,
    Rocket,
    Terminal,
} from 'lucide-react'
import { DocsSearch } from '@/components/docs/docs-search'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

const DOC_CATEGORIES = [
    {
        title: 'Getting Started',
        description: 'Quick start guide and setup instructions',
        icon: Rocket,
        href: '/docs/api-reference',
        color: 'text-green-500 bg-green-500/10',
        popular: true,
    },
    {
        title: 'API Reference',
        description: 'Complete API documentation with examples',
        icon: Code,
        href: '/docs/api-reference',
        color: 'text-blue-500 bg-blue-500/10',
        popular: true,
    },
    {
        title: 'Architecture',
        description: 'System design and technical architecture',
        icon: Layers,
        href: '/docs/api-reference',
        color: 'text-purple-500 bg-purple-500/10',
    },
    {
        title: 'AI Personas',
        description: 'Documentation for all 5 victim personas',
        icon: Users,
        href: '/docs/api-reference',
        color: 'text-orange-500 bg-orange-500/10',
    },
    {
        title: 'Scam Types',
        description: 'Detected scam categories and patterns',
        icon: Shield,
        href: '/docs/api-reference',
        color: 'text-red-500 bg-red-500/10',
    },
    {
        title: 'Entity Extraction',
        description: 'Intelligence extraction documentation',
        icon: Database,
        href: '/docs/api-reference',
        color: 'text-cyan-500 bg-cyan-500/10',
    },
    {
        title: 'Deployment',
        description: 'Production deployment guides',
        icon: Globe,
        href: '/docs/api-reference',
        color: 'text-indigo-500 bg-indigo-500/10',
    },
    {
        title: 'Changelog',
        description: 'Version history and release notes',
        icon: GitBranch,
        href: '/docs/api-reference',
        color: 'text-gray-500 bg-gray-500/10',
    },
]

const QUICK_LINKS = [
    { title: 'Engage Scammer', href: '/docs/api-reference#engage', badge: 'POST' },
    { title: 'Continue Conversation', href: '/docs/api-reference#continue', badge: 'POST' },
    { title: 'List Sessions', href: '/docs/api-reference#list-sessions', badge: 'GET' },
    { title: 'Analytics Summary', href: '/docs/api-reference#analytics-summary', badge: 'GET' },
]

export default function DocsPage() {
    const [searchOpen, setSearchOpen] = useState(false)

    return (
        <div className="container max-w-6xl py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="flex justify-center mb-4">
                    <div className="relative">
                        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <Book className="h-8 w-8 text-primary" />
                        </div>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="absolute -top-1 -right-1"
                        >
                            <Sparkles className="h-5 w-5 text-yellow-500" />
                        </motion.div>
                    </div>
                </div>
                <h1 className="text-4xl font-bold mb-3">ScamShield Documentation</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Everything you need to integrate, deploy, and operate the AI-powered scam intelligence platform
                </p>
                <div className="flex justify-center gap-2 mt-4">
                    <Badge variant="outline" className="text-sm">v1.0.0</Badge>
                    <Badge variant="secondary" className="text-sm">API v1</Badge>
                    <Badge className="text-sm bg-green-500/90 hover:bg-green-500">Stable</Badge>
                </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-2xl mx-auto mb-12"
            >
                <div
                    className="relative cursor-pointer"
                    onClick={() => setSearchOpen(true)}
                >
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        readOnly
                        placeholder="Search documentation..."
                        className="pl-12 pr-20 h-14 text-lg rounded-xl border-2 focus-visible:ring-0 cursor-pointer"
                    />
                    <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                        Ctrl+K
                    </kbd>
                </div>
            </motion.div>

            {/* Category Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-12"
            >
                {DOC_CATEGORIES.map((category, i) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i }}
                    >
                        <Link href={category.href}>
                            <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all group cursor-pointer">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <div className={cn('p-2 rounded-lg', category.color)}>
                                            <category.icon className="h-5 w-5" />
                                        </div>
                                        {category.popular && (
                                            <Badge variant="secondary" className="text-[10px]">Popular</Badge>
                                        )}
                                    </div>
                                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                        {category.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{category.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {/* Quick Links */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-12"
            >
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Quick Links
                </h2>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                    {QUICK_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted transition-colors group"
                        >
                            <span className="text-sm font-medium">{link.title}</span>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-[10px]">{link.badge}</Badge>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </motion.div>

            {/* API Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid gap-4 md:grid-cols-4 mb-12"
            >
                {[
                    { value: '13', label: 'API Endpoints' },
                    { value: '5', label: 'AI Personas' },
                    { value: '8', label: 'Scam Types' },
                    { value: '7', label: 'Entity Types' },
                ].map((stat) => (
                    <Card key={stat.label} className="text-center p-4">
                        <p className="text-3xl font-bold text-primary">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </Card>
                ))}
            </motion.div>

            {/* External Links */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center gap-4"
            >
                <Button variant="outline" asChild>
                    <Link href="https://github.com/Prakhar2025/Agentic-Honey-Pot" target="_blank">
                        <span className="flex items-center gap-2">
                            <GitBranch className="h-4 w-4" />
                            GitHub Repository
                            <ExternalLink className="h-3 w-3" />
                        </span>
                    </Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/docs/api-reference">
                        <span className="flex items-center gap-2">
                            <Terminal className="h-4 w-4" />
                            API Reference
                        </span>
                    </Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/settings">
                        <span className="flex items-center gap-2">
                            <HelpCircle className="h-4 w-4" />
                            Get Help
                        </span>
                    </Link>
                </Button>
            </motion.div>

            {/* Search Modal */}
            <DocsSearch open={searchOpen} onOpenChange={setSearchOpen} />
        </div>
    )
}
