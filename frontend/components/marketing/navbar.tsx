'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Menu, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

const NAV_LINKS = [
    { label: 'Features', href: '#features' },
    { label: 'Stats', href: '#stats' },
    { label: 'Tech Stack', href: '#tech' },
    { label: 'Docs', href: '/docs' },
]

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled
                    ? 'bg-background/80 backdrop-blur-xl border-b shadow-sm'
                    : 'bg-transparent'
            )}
        >
            <nav className="container flex items-center justify-between h-16">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                        <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <span>ScamShield</span>
                </Link>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-6">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Button asChild size="sm">
                        <Link href="/dashboard">
                            <span className="flex items-center gap-1">
                                Launch Dashboard
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </Link>
                    </Button>
                </div>

                {/* Mobile toggle */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </nav>

            {/* Mobile menu */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-background border-b p-4 space-y-3"
                >
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="block py-2 text-muted-foreground hover:text-foreground"
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Button asChild className="w-full">
                        <Link href="/dashboard">
                            <span>Launch Dashboard</span>
                        </Link>
                    </Button>
                </motion.div>
            )}
        </header>
    )
}
