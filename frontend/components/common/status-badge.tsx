'use client'

import * as React from 'react'
import { cn } from '@/lib/utils/cn'
import { Badge, badgeVariants } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type SessionStatus = 'active' | 'completed' | 'failed' | 'pending' | 'processing' | 'paused'

interface StatusBadgeProps {
    status: SessionStatus
    showDot?: boolean
    showTooltip?: boolean
    tooltipContent?: string
    className?: string
}

const statusConfig: Record<SessionStatus, {
    label: string
    variant: 'active' | 'completed' | 'failed' | 'pending' | 'processing'
    description: string
}> = {
    active: {
        label: 'Active',
        variant: 'active',
        description: 'Session is currently active and running',
    },
    completed: {
        label: 'Completed',
        variant: 'completed',
        description: 'Session completed successfully',
    },
    failed: {
        label: 'Failed',
        variant: 'failed',
        description: 'Session encountered an error',
    },
    pending: {
        label: 'Pending',
        variant: 'pending',
        description: 'Session is waiting to start',
    },
    processing: {
        label: 'Processing',
        variant: 'processing',
        description: 'Session is processing data',
    },
    paused: {
        label: 'Paused',
        variant: 'pending',
        description: 'Session is temporarily paused',
    },
}

function StatusBadge({
    status,
    showDot = true,
    showTooltip = true,
    tooltipContent,
    className,
}: StatusBadgeProps) {
    const config = statusConfig[status]

    const badge = (
        <Badge
            variant={config.variant}
            dot={showDot}
            pulse={status === 'active' || status === 'processing'}
            className={className}
        >
            {config.label}
        </Badge>
    )

    if (!showTooltip) return badge

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {badge}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipContent || config.description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

// Scam type badge
type ScamType = 'kyc_fraud' | 'lottery_scam' | 'tech_support' | 'investment_fraud' | 'job_scam' | 'loan_scam' | 'otp_fraud' | 'unknown'

interface ScamTypeBadgeProps {
    type: ScamType
    showTooltip?: boolean
    className?: string
}

const scamTypeConfig: Record<ScamType, { label: string; description: string }> = {
    kyc_fraud: { label: 'KYC Fraud', description: 'Know Your Customer fraud attempt' },
    lottery_scam: { label: 'Lottery Scam', description: 'Fake lottery or prize winnings' },
    tech_support: { label: 'Tech Support', description: 'Technical support scam' },
    investment_fraud: { label: 'Investment Fraud', description: 'Fraudulent investment scheme' },
    job_scam: { label: 'Job Scam', description: 'Fake job or employment offer' },
    loan_scam: { label: 'Loan Scam', description: 'Fraudulent loan or credit offer' },
    otp_fraud: { label: 'OTP Fraud', description: 'One-Time Password phishing' },
    unknown: { label: 'Unknown', description: 'Unidentified scam type' },
}

function ScamTypeBadge({
    type,
    showTooltip = true,
    className,
}: ScamTypeBadgeProps) {
    const config = scamTypeConfig[type]
    const variant = type === 'unknown' ? 'secondary' : type

    const badge = (
        <Badge variant={variant as any} className={className}>
            {config.label}
        </Badge>
    )

    if (!showTooltip) return badge

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {badge}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{config.description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export { StatusBadge, ScamTypeBadge }
export type { SessionStatus, ScamType }
