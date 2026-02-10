// Intelligence Overview Statistics Component
'use client'

import { motion } from 'framer-motion'
import {
    Phone,
    CreditCard,
    Building2,
    Link as LinkIcon,
    Mail,
    Hash,
    AlertTriangle,
    CheckCircle2,
    TrendingUp,
    TrendingDown,
    Wallet,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useIntelligenceStats } from '@/lib/hooks/use-intelligence'
import { IntelligenceStatsSkeleton } from './skeletons'
import { cn } from '@/lib/utils'
import { formatNumber, formatPercentage } from '@/lib/utils/entity-formatters'
import Link from 'next/link'

const entityTypeConfig: Record<string, {
    icon: React.ComponentType<{ className?: string }>
    label: string
    color: string
    bgColor: string
    href: string
}> = {
    PHONE_NUMBER: {
        icon: Phone,
        label: 'Phone Numbers',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        href: '?type=PHONE_NUMBER',
    },
    UPI_ID: {
        icon: CreditCard,
        label: 'UPI IDs',
        color: 'text-green-600',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        href: '?type=UPI_ID',
    },
    BANK_ACCOUNT: {
        icon: Building2,
        label: 'Bank Accounts',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        href: '?type=BANK_ACCOUNT',
    },
    URL: {
        icon: LinkIcon,
        label: 'Phishing Links',
        color: 'text-red-600',
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        href: '?type=URL',
    },
    EMAIL: {
        icon: Mail,
        label: 'Email Addresses',
        color: 'text-pink-600',
        bgColor: 'bg-pink-100 dark:bg-pink-900/30',
        href: '?type=EMAIL',
    },
    IFSC_CODE: {
        icon: Hash,
        label: 'IFSC Codes',
        color: 'text-orange-600',
        bgColor: 'bg-orange-100 dark:bg-orange-900/30',
        href: '?type=IFSC_CODE',
    },
    CRYPTO_WALLET: {
        icon: Wallet,
        label: 'Crypto Wallets',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        href: '?type=CRYPTO_WALLET',
    },
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

export function IntelligenceOverview() {
    const { data: stats, isLoading } = useIntelligenceStats()

    if (isLoading) {
        return <IntelligenceStatsSkeleton />
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
        >
            {/* Entity Type Stats */}
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {Object.entries(entityTypeConfig).slice(0, 6).map(([type, config]) => {
                    const count = stats?.total_by_type?.[type] || 0
                    const trend = stats?.trends?.[type] || 0

                    return (
                        <motion.div key={type} variants={itemVariants}>
                            <Link href={`/intelligence${config.href}`}>
                                <Card className="group cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 h-full">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className={cn('rounded-lg p-2.5', config.bgColor)}>
                                                <config.icon className={cn('h-5 w-5', config.color)} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-2xl font-bold tabular-nums">
                                                    {formatNumber(count)}
                                                </p>
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {config.label}
                                                </p>
                                            </div>
                                        </div>
                                        {trend !== 0 && (
                                            <div
                                                className={cn(
                                                    'mt-2 flex items-center gap-1 text-xs',
                                                    trend > 0 ? 'text-green-600' : 'text-red-600'
                                                )}
                                            >
                                                {trend > 0 ? (
                                                    <TrendingUp className="h-3 w-3" />
                                                ) : (
                                                    <TrendingDown className="h-3 w-3" />
                                                )}
                                                <span>{Math.abs(trend)}% this week</span>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    )
                })}
            </div>

            {/* Risk & Verification Stats */}
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                <motion.div variants={itemVariants}>
                    <Link href="/intelligence?risk_level=critical,high">
                        <Card className="cursor-pointer transition-all hover:shadow-md border-red-200 dark:border-red-900">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-2.5">
                                        <AlertTriangle className="h-5 w-5 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold tabular-nums text-red-600">
                                            {formatNumber(
                                                (stats?.total_by_risk?.critical || 0) +
                                                (stats?.total_by_risk?.high || 0)
                                            )}
                                        </p>
                                        <p className="text-xs text-muted-foreground">High Risk</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Link href="/intelligence?verified=true">
                        <Card className="cursor-pointer transition-all hover:shadow-md border-green-200 dark:border-green-900">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-2.5">
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold tabular-nums text-green-600">
                                            {formatPercentage(stats?.verified_percentage || 0)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">Verified</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="transition-all hover:shadow-md">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2.5">
                                    <TrendingUp className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold tabular-nums">
                                        {formatNumber(stats?.extraction_rate?.today || 0)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">Today</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="transition-all hover:shadow-md">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-2.5">
                                    <TrendingUp className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold tabular-nums">
                                        {formatNumber(stats?.extraction_rate?.this_week || 0)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">This Week</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    )
}
