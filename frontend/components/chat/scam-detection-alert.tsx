'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Shield, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScamDetection } from '@/types/chat'
import { cn } from '@/lib/utils/cn'

interface ScamDetectionAlertProps {
    detection: ScamDetection
    onDismiss?: () => void
}

const RISK_STYLES: Record<string, { bg: string; border: string; text: string }> = {
    LOW: { bg: 'bg-green-50 dark:bg-green-950/30', border: 'border-green-200 dark:border-green-800', text: 'text-green-700 dark:text-green-300' },
    MEDIUM: { bg: 'bg-yellow-50 dark:bg-yellow-950/30', border: 'border-yellow-200 dark:border-yellow-800', text: 'text-yellow-700 dark:text-yellow-300' },
    HIGH: { bg: 'bg-orange-50 dark:bg-orange-950/30', border: 'border-orange-200 dark:border-orange-800', text: 'text-orange-700 dark:text-orange-300' },
    CRITICAL: { bg: 'bg-red-50 dark:bg-red-950/30', border: 'border-red-200 dark:border-red-800', text: 'text-red-700 dark:text-red-300' },
}

export const ScamDetectionAlert = memo(function ScamDetectionAlert({ detection, onDismiss }: ScamDetectionAlertProps) {
    const styles = RISK_STYLES[detection.risk_level] || RISK_STYLES.LOW

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={cn('border-b', styles.bg, styles.border)}
        >
            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2">
                    <AlertTriangle className={cn('h-4 w-4', styles.text)} />
                    <span className={cn('text-sm font-medium', styles.text)}>
                        Scam Detected: {detection.scam_type.replace(/_/g, ' ')}
                    </span>
                    <Badge variant="outline" className={cn('text-[10px]', styles.text)}>
                        {detection.risk_level}
                    </Badge>
                    <Badge variant="outline" className="text-[10px]">
                        {Math.round(detection.confidence * 100)}% confidence
                    </Badge>
                </div>
                {onDismiss && (
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onDismiss}>
                        <X className="h-3 w-3" />
                    </Button>
                )}
            </div>
        </motion.div>
    )
})
