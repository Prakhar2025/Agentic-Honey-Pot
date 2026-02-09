// Intelligence Grid Component
'use client'

import { motion } from 'framer-motion'
import { EntityCard } from './entity-card'
import type { ExtractedEntity } from '@/types/intelligence'

interface IntelligenceGridProps {
    entities: ExtractedEntity[]
    selectedIds: string[]
    showMasked: boolean
    onEntityClick: (entity: ExtractedEntity) => void
    onSelectEntity?: (entity: ExtractedEntity, selected: boolean) => void
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.03 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

export function IntelligenceGrid({
    entities,
    selectedIds,
    showMasked,
    onEntityClick,
    onSelectEntity,
}: IntelligenceGridProps) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
            {entities.map((entity) => (
                <motion.div key={entity.id} variants={itemVariants}>
                    <EntityCard
                        entity={entity}
                        isSelected={selectedIds.includes(entity.id)}
                        showMasked={showMasked}
                        onClick={() => onEntityClick(entity)}
                        onSelect={
                            onSelectEntity
                                ? (selected) => onSelectEntity(entity, selected)
                                : undefined
                        }
                    />
                </motion.div>
            ))}
        </motion.div>
    )
}
