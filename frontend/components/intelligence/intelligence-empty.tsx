// Intelligence Empty State Component
'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { SearchX, Database, Plus, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface IntelligenceEmptyProps {
    hasFilters?: boolean
}

export function IntelligenceEmpty({ hasFilters = false }: IntelligenceEmptyProps) {
    const router = useRouter()

    const clearFilters = () => {
        router.push('/intelligence')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 px-4 text-center"
        >
            <div className="rounded-full bg-muted p-4 mb-4">
                {hasFilters ? (
                    <SearchX className="h-10 w-10 text-muted-foreground" />
                ) : (
                    <Database className="h-10 w-10 text-muted-foreground" />
                )}
            </div>

            <h3 className="text-lg font-semibold mb-2">
                {hasFilters ? 'No entities match your filters' : 'No intelligence data yet'}
            </h3>

            <p className="text-muted-foreground max-w-md mb-6">
                {hasFilters
                    ? 'Try adjusting your search or filter criteria to find what you\'re looking for.'
                    : 'Intelligence data will appear here as entities are extracted from scam sessions. Start a new honeypot session to begin collecting intelligence.'}
            </p>

            <div className="flex items-center gap-3">
                {hasFilters ? (
                    <Button variant="outline" onClick={clearFilters}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Clear Filters
                    </Button>
                ) : (
                    <Button asChild>
                        <a href="/sessions">
                            <span className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Start Session
                            </span>
                        </a>
                    </Button>
                )}
            </div>
        </motion.div>
    )
}
