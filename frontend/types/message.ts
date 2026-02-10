// Message TypeScript type definitions

export type MessageRole = 'scammer' | 'victim' | 'system'
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'error'

export interface Message {
    id: string
    role: MessageRole
    content: string
    timestamp: string
    persona?: string
    status: MessageStatus
    entities_extracted?: Array<{
        type: string
        value: string
        confidence?: number
    }>
    metadata?: {
        processing_time_ms?: number
        model_used?: string
        tokens_used?: number
    }
    error?: {
        code: string
        message: string
        retry_available: boolean
    }
}

export interface MessageGroup {
    date: string
    messages: Message[]
}
