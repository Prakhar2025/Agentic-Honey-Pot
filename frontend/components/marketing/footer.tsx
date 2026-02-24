'use client'

import Link from 'next/link'
import { Shield, Github, Twitter, Globe } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const FOOTER_LINKS = {
    Product: [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Chat Simulator', href: '/chat' },
        { label: 'Intelligence', href: '/intelligence' },
        { label: 'Analytics', href: '/analytics' },
    ],
    Resources: [
        { label: 'Documentation', href: '/docs' },
        { label: 'API Reference', href: '/docs/api-reference' },
        { label: 'Changelog', href: '/docs' },
        { label: 'Support', href: '/settings' },
    ],
    Company: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Contact', href: '#' },
        { label: 'Privacy', href: '#' },
    ],
}

export function Footer() {
    return (
        <footer className="bg-muted/30 border-t">
            <div className="container py-12">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-3">
                            <Shield className="h-5 w-5 text-primary" />
                            ScamShield
                        </Link>
                        <p className="text-sm text-muted-foreground mb-4">
                            AI-powered scam intelligence platform for detecting and combating digital fraud.
                        </p>
                        <div className="flex gap-3">
                            <Link href="https://github.com/Prakhar2025/Agentic-Honey-Pot" target="_blank" className="text-muted-foreground hover:text-foreground">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <Globe className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="font-semibold mb-3">{category}</h3>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© 2026 ScamShield. Built with ❤️ to fight digital fraud.</p>
                    <p>Powered by Groq LLaMA 3.3-70b</p>
                </div>
            </div>
        </footer>
    )
}
