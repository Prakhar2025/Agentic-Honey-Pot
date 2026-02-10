// WebSocket client for real-time communication (optional enhancement)

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws'

export type WebSocketEventHandler = (data: any) => void

interface WebSocketClientOptions {
    url?: string
    autoReconnect?: boolean
    reconnectDelay?: number
    maxReconnects?: number
}

class WebSocketClient {
    private ws: WebSocket | null = null
    private url: string
    private autoReconnect: boolean
    private reconnectDelay: number
    private maxReconnects: number
    private reconnectCount = 0
    private handlers: Map<string, Set<WebSocketEventHandler>> = new Map()
    private isConnected = false

    constructor(options: WebSocketClientOptions = {}) {
        this.url = options.url || WS_URL
        this.autoReconnect = options.autoReconnect ?? true
        this.reconnectDelay = options.reconnectDelay ?? 3000
        this.maxReconnects = options.maxReconnects ?? 5
    }

    connect(): void {
        if (this.isConnected) return

        try {
            this.ws = new WebSocket(this.url)

            this.ws.onopen = () => {
                this.isConnected = true
                this.reconnectCount = 0
                this.emit('connected', {})
            }

            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data)
                    if (data.type) {
                        this.emit(data.type, data.payload)
                    }
                } catch {
                    // Non-JSON message
                }
            }

            this.ws.onclose = () => {
                this.isConnected = false
                this.emit('disconnected', {})
                if (this.autoReconnect && this.reconnectCount < this.maxReconnects) {
                    this.reconnectCount++
                    setTimeout(() => this.connect(), this.reconnectDelay)
                }
            }

            this.ws.onerror = () => {
                this.emit('error', { message: 'WebSocket error' })
            }
        } catch {
            // WebSocket not available
        }
    }

    disconnect(): void {
        this.autoReconnect = false
        this.ws?.close()
        this.ws = null
        this.isConnected = false
    }

    send(type: string, payload: any): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ type, payload }))
        }
    }

    on(event: string, handler: WebSocketEventHandler): void {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, new Set())
        }
        this.handlers.get(event)!.add(handler)
    }

    off(event: string, handler: WebSocketEventHandler): void {
        this.handlers.get(event)?.delete(handler)
    }

    private emit(event: string, data: any): void {
        this.handlers.get(event)?.forEach(handler => handler(data))
    }

    getStatus(): boolean {
        return this.isConnected
    }
}

// Singleton instance
let wsClient: WebSocketClient | null = null

export function getWebSocketClient(): WebSocketClient {
    if (!wsClient) {
        wsClient = new WebSocketClient()
    }
    return wsClient
}

export default WebSocketClient
