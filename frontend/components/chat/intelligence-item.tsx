'use client'

import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { cn } from '@/lib/utils/cn'

interface IntelligenceItemProps {
    entity: {
        id?: string
        type: string
        value: string
        confidence: number
        verified?: boolean
    }
    delay?: number
}

export const IntelligenceItem = memo(function IntelligenceItem({ entity, delay = 0 }: IntelligenceItemProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(entity.value)
        setCopied(true)
        toast.success('Copied to clipboard')
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay }}
            className="flex items-center justify-between p-2 rounded-lg bg-background border group hover:border-primary/30 transition-colors"
        >
            <div className="flex-1 min-w-0 mr-2">
                <p className="text-sm font-mono truncate">{entity.value}</p>
                <div className="flex items-center gap-1 mt-0.5">
                    <Badge variant="outline" className="text-[9px] h-4">
                        {Math.round(entity.confidence * 100)}%
                    </Badge>
                    {entity.verified && (
                        <Badge className="text-[9px] h-4 bg-green-500/10 text-green-600">
                            Verified
                        </Badge>
                    )}
                </div>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleCopy}
            >
                {copied ? (
                    <Check className="h-3 w-3 text-green-500" />
                ) : (
                    <Copy className="h-3 w-3" />
                )}
            </Button>
        </motion.div>
    )
})
