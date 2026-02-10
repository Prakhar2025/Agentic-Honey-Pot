'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Brain, Phone, CreditCard, Building2, Link as LinkIcon, Mail,
    Hash, Wallet, Copy, ExternalLink, Shield, AlertTriangle
} from 'lucide-react'
import { IntelligenceItem } from './intelligence-item'
import { RiskMeter } from './risk-meter'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useChatStore } from '@/lib/stores/chat-store'
import { toast } from 'sonner'
import { cn } from '@/lib/utils/cn'

const ENTITY_ICONS: Record<string, typeof Phone> = {
    PHONE_NUMBER: Phone,
    UPI_ID: CreditCard,
    BANK_ACCOUNT: Building2,
    URL: LinkIcon,
    EMAIL: Mail,
    IFSC_CODE: Hash,
    CRYPTO_WALLET: Wallet,
}

const ENTITY_COLORS: Record<string, string> = {
    PHONE_NUMBER: 'text-blue-500 bg-blue-500/10',
    UPI_ID: 'text-green-500 bg-green-500/10',
    BANK_ACCOUNT: 'text-purple-500 bg-purple-500/10',
    URL: 'text-red-500 bg-red-500/10',
    EMAIL: 'text-pink-500 bg-pink-500/10',
    IFSC_CODE: 'text-orange-500 bg-orange-500/10',
    CRYPTO_WALLET: 'text-yellow-500 bg-yellow-500/10',
}

interface IntelligenceFeedProps {
    sessionId?: string
}

export function IntelligenceFeed({ sessionId }: IntelligenceFeedProps) {
    const { extractedEntities, riskScore, scamType } = useChatStore()

    const entities = extractedEntities

    // Group entities by type
    const groupedEntities = entities.reduce((acc, entity) => {
        if (!acc[entity.type]) acc[entity.type] = []
        acc[entity.type].push(entity)
        return acc
    }, {} as Record<string, typeof entities>)

    const totalEntities = entities.length
    const highConfidence = entities.filter(e => e.confidence >= 0.8).length

    const handleCopyAll = async () => {
        const text = entities.map(e => `${e.type}: ${e.value}`).join('\n')
        await navigator.clipboard.writeText(text)
        toast.success('All entities copied')
    }

    const handleExport = () => {
        const data = JSON.stringify({ entities, timestamp: new Date().toISOString() }, null, 2)
        const blob = new Blob([data], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `intelligence-${sessionId || 'export'}.json`
        a.click()
        URL.revokeObjectURL(url)
        toast.success('Intelligence exported')
    }

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">Intelligence Feed</h3>
                    </div>
                    <Badge variant="secondary" className="tabular-nums">
                        {totalEntities} extracted
                    </Badge>
                </div>

                {riskScore !== undefined && (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className={cn(
                                'h-4 w-4',
                                riskScore >= 0.7 ? 'text-red-500' :
                                    riskScore >= 0.4 ? 'text-yellow-500' : 'text-green-500'
                            )} />
                            <span className="text-sm font-medium">Risk Level</span>
                        </div>
                        <RiskMeter score={riskScore} size="sm" />
                    </div>
                )}

                {scamType && (
                    <div className="flex items-center justify-between mt-2 p-2 rounded-lg bg-destructive/10">
                        <span className="text-sm text-destructive font-medium">
                            {scamType.replace(/_/g, ' ')}
                        </span>
                        <Shield className="h-4 w-4 text-destructive" />
                    </div>
                )}
            </div>

            {/* Entity List */}
            <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                    {entities.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <Brain className="h-10 w-10 text-muted-foreground/50 mb-2" />
                            <p className="text-sm text-muted-foreground">
                                No intelligence extracted yet
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Entities will appear here as they are detected
                            </p>
                        </div>
                    )}

                    <AnimatePresence mode="popLayout">
                        {Object.entries(groupedEntities).map(([type, typeEntities]) => {
                            const Icon = ENTITY_ICONS[type] || Brain
                            const colorClass = ENTITY_COLORS[type] || 'text-gray-500 bg-gray-500/10'

                            return (
                                <motion.div
                                    key={type}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    layout
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={cn('p-1.5 rounded', colorClass)}>
                                            <Icon className="h-3 w-3" />
                                        </div>
                                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            {type.replace(/_/g, ' ')}
                                        </span>
                                        <Badge variant="outline" className="ml-auto text-[10px]">
                                            {typeEntities.length}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <AnimatePresence>
                                            {typeEntities.map((entity, i) => (
                                                <IntelligenceItem
                                                    key={entity.id || `${type}-${i}`}
                                                    entity={entity}
                                                    delay={i * 0.05}
                                                />
                                            ))}
                                        </AnimatePresence>
                                    </div>

                                    <Separator className="my-4" />
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>
            </ScrollArea>

            {/* Footer Actions */}
            {entities.length > 0 && (
                <div className="p-4 border-t">
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={handleCopyAll}>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy All
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" onClick={handleExport}>
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Export
                        </Button>
                    </div>
                    <p className="text-[10px] text-center text-muted-foreground mt-2">
                        {highConfidence} high confidence entities
                    </p>
                </div>
            )}
        </div>
    )
}
