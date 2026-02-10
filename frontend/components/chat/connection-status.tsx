'use client'

import { memo } from 'react'
import { Wifi, WifiOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils/cn'

interface ConnectionStatusProps {
    isConnected?: boolean
    className?: string
}

export const ConnectionStatus = memo(function ConnectionStatus({
    isConnected = true,
    className
}: ConnectionStatusProps) {
    return (
        <Badge
            variant="outline"
            className={cn(
                'text-[10px] gap-1',
                isConnected
                    ? 'text-green-600 border-green-200'
                    : 'text-red-600 border-red-200',
                className
            )}
        >
            {isConnected ? (
                <>
                    <Wifi className="h-3 w-3" />
                    Connected
                </>
            ) : (
                <>
                    <WifiOff className="h-3 w-3" />
                    Disconnected
                </>
            )}
        </Badge>
    )
})
