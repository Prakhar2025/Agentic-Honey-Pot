import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

export const metadata: Metadata = {
    title: {
        default: 'ScamShield | AI-Powered Scam Intelligence Platform',
        template: '%s | ScamShield',
    },
    description:
        'ScamShield is an AI-powered agentic honeypot that autonomously engages scammers and extracts intelligence to protect potential victims.',
    keywords: [
        'scam detection',
        'AI honeypot',
        'fraud prevention',
        'scam intelligence',
        'cybersecurity',
    ],
    authors: [{ name: 'ScamShield Team' }],
    creator: 'ScamShield Team',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://scamshield.app',
        siteName: 'ScamShield',
        title: 'ScamShield | AI-Powered Scam Intelligence Platform',
        description: 'Protect potential scam victims with AI-powered intelligence extraction',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'ScamShield Dashboard',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ScamShield | AI-Powered Scam Intelligence Platform',
        description: 'Protect potential scam victims with AI-powered intelligence extraction',
        images: ['/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
    },
}

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
    ],
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
