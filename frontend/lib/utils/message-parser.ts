// Message parsing utilities

import { format, isToday, isYesterday, parseISO } from 'date-fns'

export interface ParsedMessage {
    id: string
    session_id: string
    role: 'scammer' | 'agent' | 'persona' | 'system'
    content: string
    timestamp: string
    turn_number?: number
    metadata?: Record<string, unknown>
}

export function groupMessagesByDate(messages: ParsedMessage[]): Record<string, ParsedMessage[]> {
    const groups: Record<string, ParsedMessage[]> = {}

    for (const message of messages) {
        try {
            const date = parseISO(message.timestamp)
            let dateKey: string

            if (isToday(date)) {
                dateKey = 'Today'
            } else if (isYesterday(date)) {
                dateKey = 'Yesterday'
            } else {
                dateKey = format(date, 'MMMM d, yyyy')
            }

            if (!groups[dateKey]) {
                groups[dateKey] = []
            }
            groups[dateKey].push(message)
        } catch {
            // Skip invalid dates
        }
    }

    return groups
}

export function parseMessageContent(content: string): {
    text: string
    links: string[]
    mentions: string[]
    phoneNumbers: string[]
    emails: string[]
} {
    const linkRegex = /(https?:\/\/[^\s]+)/g
    const mentionRegex = /@(\w+)/g
    const phoneRegex = /(\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g

    const links = content.match(linkRegex) || []
    const mentions = (content.match(mentionRegex) || []).map(m => m.slice(1))
    const phoneNumbers = content.match(phoneRegex) || []
    const emails = content.match(emailRegex) || []

    return {
        text: content,
        links,
        mentions,
        phoneNumbers,
        emails,
    }
}

export function highlightSearchTerm(content: string, searchQuery: string): string {
    if (!searchQuery) return content

    const regex = new RegExp(`(${escapeRegExp(searchQuery)})`, 'gi')
    return content.replace(
        regex,
        '<mark class="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">$1</mark>'
    )
}

function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function truncateMessage(content: string, maxLength: number = 100): string {
    if (content.length <= maxLength) return content
    return content.slice(0, maxLength).trim() + '...'
}
