'use client'

import { memo } from 'react'
import { Zap, FileText, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QUICK_START_SCENARIOS } from '@/lib/constants/scenarios'

interface ChatInputActionsProps {
    onSelectScenario: (message: string) => void
}

export const ChatInputActions = memo(function ChatInputActions({ onSelectScenario }: ChatInputActionsProps) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-1">
            {QUICK_START_SCENARIOS.slice(0, 4).map((scenario) => (
                <Button
                    key={scenario.id}
                    variant="outline"
                    size="sm"
                    className="shrink-0 text-xs gap-1.5 h-8"
                    onClick={() => onSelectScenario(scenario.initialMessage)}
                >
                    <span>{scenario.icon}</span>
                    {scenario.name}
                </Button>
            ))}
        </div>
    )
})
