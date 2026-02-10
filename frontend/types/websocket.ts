// WebSocket type definitions

export interface WebSocketMessage {
    type: string
    payload: unknown
    timestamp: string
}

export interface WebSocketConfig {
    url: string
    autoReconnect: boolean
    reconnectDelay: number
    maxReconnects: number
}

export interface WebSocketStatus {
    isConnected: boolean
    reconnectCount: number
    lastError?: string
}
