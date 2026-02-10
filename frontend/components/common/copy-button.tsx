'use client'

import * as React from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { toast } from 'sonner'

interface CopyButtonProps {
    value: string
    className?: string
    variant?: 'default' | 'ghost' | 'outline'
    size?: 'default' | 'sm' | 'icon' | 'icon-sm'
    showTooltip?: boolean
    tooltipText?: string
    successMessage?: string
    onCopy?: () => void
}

function CopyButton({
    value,
    className,
    variant = 'ghost',
    size = 'icon-sm',
    showTooltip = true,
    tooltipText = 'Copy to clipboard',
    successMessage = 'Copied to clipboard',
    onCopy,
}: CopyButtonProps) {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            toast.success(successMessage)
            onCopy?.()

            setTimeout(() => {
                setCopied(false)
            }, 2000)
        } catch (err) {
            toast.error('Failed to copy')
        }
    }

    const button = (
        <Button
            variant={variant}
            size={size}
            onClick={handleCopy}
            className={cn('transition-all', className)}
            aria-label={copied ? 'Copied' : tooltipText}
        >
            {copied ? (
                <Check className="h-4 w-4 text-green-500" />
            ) : (
                <Copy className="h-4 w-4" />
            )}
        </Button>
    )

    if (!showTooltip) return button

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {button}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{copied ? 'Copied!' : tooltipText}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

// Inline copy component for text with copy button
interface CopyableTextProps {
    value: string
    className?: string
    maskValue?: boolean
    visibleChars?: number
}

function CopyableText({
    value,
    className,
    maskValue = false,
    visibleChars = 4,
}: CopyableTextProps) {
    const displayValue = maskValue && value.length > visibleChars
        ? `${'*'.repeat(value.length - visibleChars)}${value.slice(-visibleChars)}`
        : value

    return (
        <span className={cn('inline-flex items-center gap-1.5 font-mono text-sm', className)}>
            <span className="select-all">{displayValue}</span>
            <CopyButton value={value} size="icon-sm" />
        </span>
    )
}

export { CopyButton, CopyableText }
