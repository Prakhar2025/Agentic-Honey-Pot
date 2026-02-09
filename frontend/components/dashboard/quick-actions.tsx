'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Zap,
    MessageSquare,
    Brain,
    BarChart3,
    Settings,
    Plus,
    ArrowRight,
    Sparkles,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

interface QuickAction {
    title: string
    description: string
    icon: React.ElementType
    href: string
    color: string
    bgColor: string
    primary?: boolean
}

const actions: QuickAction[] = [
    {
        title: 'Start New Session',
        description: 'Engage with a scammer',
        icon: MessageSquare,
        href: '/chat',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        primary: true,
    },
    {
        title: 'Intelligence Hub',
        description: 'Browse extracted data',
        icon: Brain,
        href: '/intelligence',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
        title: 'Analytics',
        description: 'View reports & charts',
        icon: BarChart3,
        href: '/analytics',
        color: 'text-green-600',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
        title: 'Settings',
        description: 'Configure system',
        icon: Settings,
        href: '/settings',
        color: 'text-gray-600',
        bgColor: 'bg-gray-100 dark:bg-gray-800',
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
}

export function QuickActions() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-2"
                >
                    {actions.map((action) => (
                        <motion.div key={action.title} variants={itemVariants}>
                            <QuickActionButton action={action} />
                        </motion.div>
                    ))}
                </motion.div>
            </CardContent>
        </Card>
    )
}

function QuickActionButton({ action }: { action: QuickAction }) {
    return (
        <Link href={action.href}>
            <div
                className={cn(
                    'group flex items-center gap-3 rounded-lg border p-3 transition-all duration-200',
                    'hover:bg-muted/50 hover:shadow-sm hover:-translate-y-0.5',
                    action.primary && 'border-primary/50 bg-primary/5'
                )}
            >
                <div className={cn('rounded-lg p-2.5', action.bgColor)}>
                    <action.icon className={cn('h-4 w-4', action.color)} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{action.title}</p>
                        {action.primary && (
                            <Sparkles className="h-3 w-3 text-primary" />
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                        {action.description}
                    </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
            </div>
        </Link>
    )
}

// Compact variant for smaller spaces
export function QuickActionsCompact() {
    const compactActions = actions.slice(0, 4)

    return (
        <div className="grid grid-cols-2 gap-2">
            {compactActions.map((action) => (
                <Link key={action.title} href={action.href}>
                    <div
                        className={cn(
                            'flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-all',
                            'hover:bg-muted/50 hover:shadow-sm',
                            action.primary && 'border-primary/50 bg-primary/5'
                        )}
                    >
                        <div className={cn('rounded-lg p-2', action.bgColor)}>
                            <action.icon className={cn('h-5 w-5', action.color)} />
                        </div>
                        <span className="text-xs font-medium">{action.title}</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}
