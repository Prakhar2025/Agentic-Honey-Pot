'use client'

import { memo } from 'react'
import { Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QUICK_START_SCENARIOS } from '@/lib/constants/scenarios'

interface QuickScenarioPickerProps {
    onSelect: (message: string) => void
}

export const QuickScenarioPicker = memo(function QuickScenarioPicker({ onSelect }: QuickScenarioPickerProps) {
    return (
        <div className="space-y-2 p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Zap className="h-3 w-3" />
                Quick Scenarios
            </div>
            <div className="space-y-1">
                {QUICK_START_SCENARIOS.map((scenario) => (
                    <Button
                        key={scenario.id}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-xs h-auto py-2"
                        onClick={() => onSelect(scenario.initialMessage)}
                    >
                        <span className="mr-2">{scenario.icon}</span>
                        <span className="truncate">{scenario.name}</span>
                    </Button>
                ))}
            </div>
        </div>
    )
})
