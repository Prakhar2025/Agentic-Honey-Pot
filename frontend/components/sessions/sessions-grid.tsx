'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { SessionCard } from './session-card'

interface Session {
    id: string
    scam_type: string | null
    persona_id: string
    status: string
    turn_count: number
    extracted_count?: number
    metadata_json?: Record<string, unknown> | null
    started_at: string
    created_at: string
    ended_at: string | null
}

interface SessionsGridProps {
    sessions: Session[]
    selectedIds: string[]
    onSelectSession?: (id: string, selected: boolean) => void
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}

export function SessionsGrid({
    sessions,
    selectedIds,
    onSelectSession
}: SessionsGridProps) {
    return (
        <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            {sessions.map((session) => (
                <motion.div key={session.id} variants={itemVariants}>
                    <SessionCard
                        session={session}
                        isSelected={selectedIds.includes(session.id)}
                        onSelect={(selected) => onSelectSession?.(session.id, selected)}
                    />
                </motion.div>
            ))}
        </motion.div>
    )
}
