// Entity Detail Panel Component
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Phone,
    CreditCard,
    Building2,
    Link as LinkIcon,
    Mail,
    Hash,
    Wallet,
    Copy,
    Check,
    ExternalLink,
    Calendar,
    Clock,
    Eye,
    AlertTriangle,
    CheckCircle2,
    Flag,
    MessageSquarePlus,
    RefreshCw,
    X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { RiskScoreGauge } from './risk-score-gauge'
import { ConfidenceMeter } from './confidence-meter'
import { EntityTypeBadge } from './entity-type-badge'
import { EntityVerificationBadge } from './entity-verification-badge'
import { useEntityDetail } from '@/lib/hooks/use-intelligence'
import { useAddEntityNote, useVerifyEntity } from '@/lib/hooks/use-entity-detail'
import { EntityDetailSkeleton } from './skeletons'
import { formatEntityValue, maskSensitiveValue } from '@/lib/utils/entity-formatters'
import { formatRelativeTime, formatDateTime } from '@/lib/utils/date'
import type { ExtractedEntity } from '@/types/intelligence'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface EntityDetailPanelProps {
    entity: ExtractedEntity
    onClose?: () => void
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

export function EntityDetailPanel({ entity, onClose }: EntityDetailPanelProps) {
    const [showFullValue, setShowFullValue] = useState(false)
    const [copied, setCopied] = useState(false)
    const [noteContent, setNoteContent] = useState('')
    const [isNotesOpen, setIsNotesOpen] = useState(false)
    const [isSessionsOpen, setIsSessionsOpen] = useState(true)

    const { data: fullEntity, isLoading, refetch } = useEntityDetail(entity.id)
    const addNoteMutation = useAddEntityNote()
    const verifyMutation = useVerifyEntity()

    const currentEntity = fullEntity || entity
    const Icon = entityIcons[currentEntity.type] || Hash

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(currentEntity.value)
            setCopied(true)
            toast.success('Copied to clipboard')
            setTimeout(() => setCopied(false), 2000)
        } catch {
            toast.error('Failed to copy')
        }
    }

    const handleAddNote = () => {
        if (!noteContent.trim()) return
        addNoteMutation.mutate(
            { entityId: currentEntity.id, content: noteContent.trim() },
            { onSuccess: () => setNoteContent('') }
        )
    }

    const handleVerify = () => {
        verifyMutation.mutate({
            entityId: currentEntity.id,
            verified: !currentEntity.verified,
            source: 'manual_review',
        })
    }

    if (isLoading) {
        return (
            <div className="p-6">
                <EntityDetailSkeleton />
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 p-1"
        >
            {/* Header */}
            <div className="flex items-start gap-4">
                <div className="rounded-xl bg-muted p-3">
                    <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <EntityTypeBadge type={currentEntity.type} />
                        <EntityVerificationBadge
                            verified={currentEntity.verified}
                            verificationSource={currentEntity.verification_source}
                        />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                        First seen {formatRelativeTime(currentEntity.first_seen)}
                    </p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Value Card */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                        <code className="text-lg font-mono font-medium break-all flex-1">
                            {showFullValue
                                ? formatEntityValue(currentEntity.value, currentEntity.type)
                                : maskSensitiveValue(currentEntity.value, currentEntity.type)}
                        </code>
                        <div className="flex items-center gap-1 shrink-0">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setShowFullValue(!showFullValue)}
                            >
                                <Eye className={cn('h-4 w-4', showFullValue && 'text-primary')} />
                            </Button>
                            <Button variant="outline" size="icon" onClick={handleCopy}>
                                {copied ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-4 flex flex-col items-center">
                        <RiskScoreGauge score={currentEntity.risk_score} size="sm" />
                        <p className="text-xs font-medium text-muted-foreground mt-2">Risk Score</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex flex-col items-center">
                        <ConfidenceMeter confidence={currentEntity.confidence} size="sm" />
                        <p className="text-xs font-medium text-muted-foreground mt-2">Confidence</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <p className="text-3xl font-bold tabular-nums">
                            {currentEntity.occurrence_count}
                        </p>
                        <p className="text-xs font-medium text-muted-foreground mt-1">Occurrences</p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 flex-wrap">
                <Button
                    variant={currentEntity.verified ? 'secondary' : 'default'}
                    size="sm"
                    onClick={handleVerify}
                    disabled={verifyMutation.isPending}
                >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    {currentEntity.verified ? 'Verified' : 'Verify'}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsNotesOpen(!isNotesOpen)}>
                    <MessageSquarePlus className="mr-2 h-4 w-4" />
                    Add Note
                </Button>
                <Button variant="outline" size="sm" onClick={() => refetch()}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                </Button>
            </div>

            {/* Add Note */}
            {isNotesOpen && (
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Add Note</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Textarea
                            placeholder="Add a note about this entity..."
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                            rows={3}
                        />
                        <div className="flex justify-end gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setNoteContent('')
                                    setIsNotesOpen(false)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleAddNote}
                                disabled={!noteContent.trim() || addNoteMutation.isPending}
                            >
                                Save Note
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Timeline */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Timeline
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">First Seen</span>
                        <span>{formatDateTime(currentEntity.first_seen)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last Seen</span>
                        <span>{formatDateTime(currentEntity.last_seen)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Created</span>
                        <span>{formatDateTime(currentEntity.created_at)}</span>
                    </div>
                </CardContent>
            </Card>

            {/* Related Sessions */}
            <Collapsible open={isSessionsOpen} onOpenChange={setIsSessionsOpen}>
                <Card>
                    <CollapsibleTrigger asChild>
                        <CardHeader className="pb-2 cursor-pointer hover:bg-muted/50 rounded-t-lg">
                            <CardTitle className="text-sm flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <ExternalLink className="h-4 w-4" />
                                    Related Sessions
                                </span>
                                <Badge variant="secondary">
                                    {currentEntity.sessions?.length || 0}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <CardContent>
                            {currentEntity.sessions && currentEntity.sessions.length > 0 ? (
                                <ScrollArea className="h-40">
                                    <div className="space-y-2">
                                        {currentEntity.sessions.map((session) => (
                                            <a
                                                key={session.id}
                                                href={`/sessions/${session.id}`}
                                                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
                                            >
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {session.scammer_persona || 'Unknown Scammer'}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {formatRelativeTime(session.created_at)}
                                                    </p>
                                                </div>
                                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                            </a>
                                        ))}
                                    </div>
                                </ScrollArea>
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    No related sessions found
                                </p>
                            )}
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>

            {/* Notes */}
            {currentEntity.notes && currentEntity.notes.length > 0 && (
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <MessageSquarePlus className="h-4 w-4" />
                            Notes ({currentEntity.notes.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-40">
                            <div className="space-y-3">
                                {currentEntity.notes.map((note) => (
                                    <div
                                        key={note.id}
                                        className="p-3 rounded-lg bg-muted/50 space-y-1"
                                    >
                                        <p className="text-sm">{note.content}</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>{note.author}</span>
                                            <span>•</span>
                                            <span>{formatRelativeTime(note.created_at)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            )}

            {/* Analysis */}
            {currentEntity.analysis && (
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Risk Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Threat Level</span>
                            <Badge variant={
                                currentEntity.analysis.threat_level === 'critical' ? 'destructive' :
                                    currentEntity.analysis.threat_level === 'high' ? 'destructive' :
                                        'secondary'
                            }>
                                {currentEntity.analysis.threat_level}
                            </Badge>
                        </div>
                        {currentEntity.analysis.associated_scam_types.length > 0 && (
                            <div className="space-y-1">
                                <span className="text-xs text-muted-foreground">Associated Scam Types</span>
                                <div className="flex flex-wrap gap-1">
                                    {currentEntity.analysis.associated_scam_types.map((type) => (
                                        <Badge key={type} variant="outline" className="text-xs">
                                            {type.replace(/_/g, ' ')}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </motion.div>
    )
}
