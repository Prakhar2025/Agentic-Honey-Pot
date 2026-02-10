const getApiUrl = (): string => {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
}

export const config = {
    api: {
        baseUrl: getApiUrl(),
        version: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
        timeout: 30000,
    },
    app: {
        name: process.env.NEXT_PUBLIC_APP_NAME || 'ScamShield',
        description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'AI-Powered Scam Intelligence Platform',
        url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    },
    features: {
        analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
        chat: process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true',
        darkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === 'true',
    },
    auth: {
        apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
    },
} as const

export type Config = typeof config
