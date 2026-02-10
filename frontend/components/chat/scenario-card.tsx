'use client'

import { memo } from 'react'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScamScenario } from '@/lib/constants/scenarios'

interface ScenarioCardProps {
    scenario: ScamScenario
    onSelect: (scenario: ScamScenario) => void
}

const DIFFICULTY_COLORS = {
    easy: 'bg-green-500/10 text-green-600',
    medium: 'bg-yellow-500/10 text-yellow-600',
    hard: 'bg-red-500/10 text-red-600',
}

export const ScenarioCard = memo(function ScenarioCard({ scenario, onSelect }: ScenarioCardProps) {
    return (
        <Card
            className="cursor-pointer hover:border-primary/50 transition-all group"
            onClick={() => onSelect(scenario)}
        >
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <span>{scenario.icon}</span>
                        {scenario.name}
                    </CardTitle>
                    <Badge
                        variant="outline"
                        className={`text-[10px] ${DIFFICULTY_COLORS[scenario.difficulty]}`}
                    >
                        {scenario.difficulty}
                    </Badge>
                </div>
                <CardDescription className="text-xs">{scenario.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
                <p className="text-xs italic text-muted-foreground border-l-2 pl-2 line-clamp-2">
                    &ldquo;{scenario.initialMessage}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        <Badge variant="secondary" className="text-[10px]">
                            {scenario.scamType.replace(/_/g, ' ')}
                        </Badge>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
            </CardContent>
        </Card>
    )
})
