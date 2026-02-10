// Chat helper utilities

import { Message } from '@/types/message'
import { ExtractedEntity } from '@/types/chat'

/**
 * Group messages by date for display
 */
export function groupMessagesByDate(messages: Message[]): Record<string, Message[]> {
    return messages.reduce((groups, message) => {
        const date = new Date(message.timestamp).toDateString()
        if (!groups[date]) groups[date] = []
        groups[date].push(message)
        return groups
    }, {} as Record<string, Message[]>)
}

/**
 * Format a duration in seconds to a human-readable string
 */
export function formatDuration(seconds: number): string {
    if (seconds < 60) return `${Math.round(seconds)}s`
    const minutes = Math.floor(seconds / 60)
    const secs = Math.round(seconds % 60)
    return `${minutes}m ${secs}s`
}

/**
 * Calculate entities per turn ratio
 */
export function calculateEntitiesPerTurn(entities: ExtractedEntity[], turnCount: number): number {
    if (turnCount === 0) return 0
    return Number((entities.length / turnCount).toFixed(2))
}

/**
 * Generate a unique message ID
 */
export function generateMessageId(): string {
    return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Truncate message content for display
 */
export function truncateMessage(content: string, maxLength = 100): string {
    if (content.length <= maxLength) return content
    return content.slice(0, maxLength).trim() + '...'
}

/**
 * Get risk level color class
 */
export function getRiskLevelColor(level: string): string {
    switch (level.toUpperCase()) {
        case 'CRITICAL': return 'text-red-600'
        case 'HIGH': return 'text-orange-600'
        case 'MEDIUM': return 'text-yellow-600'
        case 'LOW': return 'text-green-600'
        default: return 'text-gray-600'
    }
}

/**
 * Deduplicate entities by value
 */
export function deduplicateEntities(entities: ExtractedEntity[]): ExtractedEntity[] {
    const seen = new Set<string>()
    return entities.filter(entity => {
        const key = `${entity.type}:${entity.value}`
        if (seen.has(key)) return false
        seen.add(key)
        return true
    })
}
