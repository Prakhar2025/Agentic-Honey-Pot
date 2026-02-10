'use client'

import { memo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { PERSONAS } from '@/lib/constants/personas'
import { cn } from '@/lib/utils/cn'

interface PersonaInfoCardProps {
    persona: string
}

export const PersonaInfoCard = memo(function PersonaInfoCard({ persona }: PersonaInfoCardProps) {
    const config = PERSONAS[persona]
    if (!config) return null

    return (
        <div className="space-y-3 p-4">
            <div className="flex items-center gap-3">
                <span className="text-3xl">{config.icon}</span>
                <div>
                    <h4 className="font-semibold">{config.label}</h4>
                    <p className="text-xs text-muted-foreground">{config.trait}</p>
                </div>
            </div>

            <p className="text-sm text-muted-foreground">{config.description}</p>

            <div>
                <h5 className="text-xs font-medium mb-1">Characteristics</h5>
                <div className="flex flex-wrap gap-1">
                    {config.characteristics.slice(0, 3).map((c, i) => (
                        <Badge key={i} variant="secondary" className="text-[10px]">
                            {c}
                        </Badge>
                    ))}
                </div>
            </div>

            <div>
                <h5 className="text-xs font-medium mb-2">Effectiveness</h5>
                <div className="space-y-1.5">
                    {Object.entries(config.effectiveness)
                        .filter(([key]) => key !== 'overall')
                        .map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2">
                                <span className="text-[10px] w-20 text-muted-foreground capitalize">
                                    {key.replace(/_/g, ' ')}
                                </span>
                                <Progress value={value} className="h-1.5 flex-1" />
                                <span className="text-[10px] tabular-nums w-8 text-right">{value}%</span>
                            </div>
                        ))}
                </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t text-xs">
                <span className="text-muted-foreground">Overall Score</span>
                <Badge
                    className={cn(
                        'text-[10px]',
                        config.effectiveness.overall >= 80
                            ? 'bg-green-500/10 text-green-600'
                            : 'bg-yellow-500/10 text-yellow-600'
                    )}
                >
                    {config.effectiveness.overall}%
                </Badge>
            </div>
        </div>
    )
})
