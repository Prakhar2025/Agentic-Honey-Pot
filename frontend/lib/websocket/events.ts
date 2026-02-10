// WebSocket event type constants

export const WS_EVENTS = {
    // Connection
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
    ERROR: 'error',

    // Chat
    MESSAGE_RECEIVED: 'message:received',
    MESSAGE_SENT: 'message:sent',
    TYPING_START: 'typing:start',
    TYPING_STOP: 'typing:stop',

    // Session
    SESSION_STARTED: 'session:started',
    SESSION_ENDED: 'session:ended',
    SESSION_UPDATED: 'session:updated',

    // Intelligence
    ENTITY_EXTRACTED: 'intelligence:entity',
    SCAM_DETECTED: 'intelligence:scam',
    RISK_UPDATED: 'intelligence:risk',
} as const

export type WebSocketEvent = typeof WS_EVENTS[keyof typeof WS_EVENTS]
