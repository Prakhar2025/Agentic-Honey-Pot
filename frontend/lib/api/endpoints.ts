export const API_ENDPOINTS = {
    // Honeypot
    ENGAGE: '/v1/honeypot/engage',
    CONTINUE: '/v1/honeypot/continue',
    SESSION: (id: string) => `/v1/honeypot/session/${id}`,
    END_SESSION: (id: string) => `/v1/honeypot/session/${id}/end`,

    // Sessions
    SESSIONS: '/v1/sessions',
    SESSION_MESSAGES: (id: string) => `/v1/sessions/${id}/messages`,
    SESSION_INTELLIGENCE: (id: string) => `/v1/sessions/${id}/intelligence`,

    // Intelligence
    INTELLIGENCE: '/v1/intelligence',
    INTELLIGENCE_ENTITIES: '/v1/intelligence/entities',

    // Analytics
    ANALYTICS_SUMMARY: '/v1/analytics/summary',
    ANALYTICS_SCAM_TYPES: '/v1/analytics/scam-types',
    ANALYTICS_TIMELINE: '/v1/analytics/timeline',
    ANALYTICS_PERSONAS: '/v1/analytics/personas',

    // Health
    HEALTH: '/v1/health',
    HEALTH_READY: '/v1/health/ready',
    HEALTH_LIVE: '/v1/health/live',
} as const

export type ApiEndpoint = typeof API_ENDPOINTS
