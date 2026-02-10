'use client'

import { useState, memo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import { ScenarioCard } from './scenario-card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ALL_SCENARIOS, SCENARIO_CATEGORIES, ScamScenario } from '@/lib/constants/scenarios'
import { cn } from '@/lib/utils/cn'

interface ScenarioLibraryProps {
    onSelectScenario: (scenario: ScamScenario) => void
}

export const ScenarioLibrary = memo(function ScenarioLibrary({ onSelectScenario }: ScenarioLibraryProps) {
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('all')

    const filteredScenarios = ALL_SCENARIOS.filter((s) => {
        const matchesSearch = !search ||
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.description.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = activeCategory === 'all' ||
            s.category.toLowerCase().includes(activeCategory.toLowerCase())
        return matchesSearch && matchesCategory
    })

    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search scenarios..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-1">
                {SCENARIO_CATEGORIES.map((cat) => (
                    <Badge
                        key={cat.id}
                        variant={activeCategory === cat.id ? 'default' : 'outline'}
                        className="cursor-pointer whitespace-nowrap"
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        {cat.label} ({cat.count})
                    </Badge>
                ))}
            </div>

            {/* Scenario Grid */}
            <div className="grid gap-3 sm:grid-cols-2">
                {filteredScenarios.map((scenario, i) => (
                    <motion.div
                        key={scenario.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <ScenarioCard scenario={scenario} onSelect={onSelectScenario} />
                    </motion.div>
                ))}
            </div>

            {filteredScenarios.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No scenarios match your search</p>
                </div>
            )}
        </div>
    )
})
