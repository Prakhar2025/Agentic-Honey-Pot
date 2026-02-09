// Entity Card Component for Grid View
'use client'

import {
    Phone,
    CreditCard,
    Building2,
    Link as LinkIcon,
    Mail,
    Hash,
    Wallet,
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { EntityTypeBadge } from './entity-type-badge'
import { EntityRiskBadge } from './entity-risk-badge'
import { EntityConfidenceBar } from './entity-confidence-bar'
import { EntityVerificationBadge } from './entity-verification-badge'
import { EntityCopyButton } from './entity-copy-button'
import { EntityActionsMenu } from './entity-actions-menu'
import { maskSensitiveValue, formatEntityValue } from '@/lib/utils/entity-formatters'
import { formatRelativeTime } from '@/lib/utils/date'
import type { ExtractedEntity } from '@/types/intelligence'
import { cn } from '@/lib/utils'

interface EntityCardProps {
    entity: ExtractedEntity
    isSelected?: boolean
    showMasked?: boolean
    onClick?: () => void
    onSelect?: (selected: boolean) => void
}

const entityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    PHONE_NUMBER: Phone,
    UPI_ID: CreditCard,
    BANK_ACCOUNT: Building2,
    URL: LinkIcon,
    EMAIL: Mail,
    IFSC_CODE: Hash,
    CRYPTO_WALLET: Wallet,
}

export function EntityCard({
    entity,
    isSelected = false,
    showMasked = true,
    onClick,
    onSelect,
}: EntityCardProps) {
    const Icon = entityIcons[entity.type] || Hash

    return (
        <Card
            className={cn(
                'group cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5',
                isSelected && 'ring-2 ring-primary'
            )}
            onClick={onClick}
        >
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {onSelect && (
                            <Checkbox
                                checked={isSelected}
                                onCheckedChange={(checked) => {
                                    onSelect(!!checked)
                                }}
                                onClick={(e) => e.stopPropagation()}
                                aria-label="Select entity"
                            />
                        )}
                        <EntityTypeBadge type={entity.type} size="sm" />
                    </div>
                    <EntityRiskBadge score={entity.risk_score} />
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {/* Value */}
                <div className="flex items-center gap-2">
                    <code className="text-sm font-mono font-medium truncate flex-1">
                        {showMasked
                            ? maskSensitiveValue(entity.value, entity.type)
                            : formatEntityValue(entity.value, entity.type)}
                    </code>
                    <EntityCopyButton value={entity.value} />
                </div>

                {/* Confidence and verification */}
                <div className="flex items-center justify-between gap-2">
                    <EntityConfidenceBar confidence={entity.confidence} size="sm" />
                    <EntityVerificationBadge verified={entity.verified} size="sm" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(entity.first_seen)}
                    </span>
                    <div onClick={(e) => e.stopPropagation()}>
                        <EntityActionsMenu entity={entity} onViewDetails={onClick} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
