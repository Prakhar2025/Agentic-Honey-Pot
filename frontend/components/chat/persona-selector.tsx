'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { PersonaAvatar } from './persona-avatar'
import { PersonaInfoCard } from './persona-info-card'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import { PERSONAS } from '@/lib/constants/personas'
import { cn } from '@/lib/utils/cn'

interface PersonaSelectorProps {
    selected?: string
    onSelect: (persona: string | undefined) => void
    compact?: boolean
}

export function PersonaSelector({ selected, onSelect, compact = false }: PersonaSelectorProps) {
    const personas = Object.entries(PERSONAS)

    const handleSelect = (personaId: string) => {
        if (selected === personaId) {
            onSelect(undefined)
        } else {
            onSelect(personaId)
        }
    }

    if (compact) {
        return (
            <div className="flex gap-2 overflow-x-auto pb-2">
                {personas.map(([id, persona]) => (
                    <motion.button
                        key={id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelect(id)}
                        className={cn(
                            'flex items-center gap-2 px-3 py-2 rounded-full border whitespace-nowrap transition-colors',
                            selected === id
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50'
                        )}
                    >
                        <span className="text-lg">{persona.icon}</span>
                        <span className="text-sm">{persona.label}</span>
                        {selected === id && <Check className="h-3 w-3 text-primary" />}
                    </motion.button>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {personas.map(([id, persona]) => (
                <HoverCard key={id} openDelay={300}>
                    <HoverCardTrigger asChild>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelect(id)}
                            className={cn(
                                'relative flex flex-col items-center p-4 rounded-xl border-2 transition-all',
                                selected === id
                                    ? 'border-primary bg-primary/5 shadow-md'
                                    : 'border-transparent bg-muted/50 hover:bg-muted hover:border-border'
                            )}
                        >
                            {selected === id && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center"
                                >
                                    <Check className="h-3 w-3 text-primary-foreground" />
                                </motion.div>
                            )}

                            <PersonaAvatar persona={id} size="lg" animated={selected === id} />

                            <span className="mt-2 text-sm font-medium">{persona.label}</span>
                            <span className="text-[10px] text-muted-foreground mt-0.5">
                                {persona.trait}
                            </span>
                        </motion.button>
                    </HoverCardTrigger>
                    <HoverCardContent side="top" className="w-72 p-0">
                        <PersonaInfoCard persona={id} />
                    </HoverCardContent>
                </HoverCard>
            ))}
        </div>
    )
}
