import { Shield } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface LogoProps {
    className?: string
    showText?: boolean
    size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className, showText = true, size = 'md' }: LogoProps) {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
    }

    const textSizeClasses = {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl',
    }

    return (
        <div className={cn('flex items-center gap-2', className)}>
            <Shield className={cn('text-primary', sizeClasses[size])} />
            {showText && (
                <span className={cn('font-bold', textSizeClasses[size])}>
                    ScamShield
                </span>
            )}
        </div>
    )
}
