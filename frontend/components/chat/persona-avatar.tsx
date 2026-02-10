'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { PERSONAS } from '@/lib/constants/personas'
import { cn } from '@/lib/utils/cn'

interface PersonaAvatarProps {
    persona: string
    size?: 'sm' | 'md' | 'lg'
    animated?: boolean
    showStatus?: boolean
}

const SIZES = {
    sm: 'h-8 w-8 text-base',
    md: 'h-10 w-10 text-lg',
    lg: 'h-14 w-14 text-2xl',
}

export const PersonaAvatar = memo(function PersonaAvatar({
    persona,
    size = 'md',
    animated = false,
    showStatus = false,
}: PersonaAvatarProps) {
    const config = PERSONAS[persona]
    const icon = config?.icon || (persona === 'scammer' ? '🦹' : '🤖')
    const color = config?.color || '#6b7280'

    return (
        <motion.div
            animate={animated ? { scale: [1, 1.05, 1] } : undefined}
            transition={animated ? { duration: 2, repeat: Infinity } : undefined}
            className="relative"
        >
            <div
                className={cn(
                    'rounded-full flex items-center justify-center',
                    'ring-2 ring-offset-2 ring-offset-background',
                    SIZES[size]
                )}
                style={{ backgroundColor: `${color}15`, borderColor: color, ['--tw-ring-color' as any]: color }}
            >
                <span>{icon}</span>
            </div>
            {showStatus && (
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
            )}
        </motion.div>
    )
})
