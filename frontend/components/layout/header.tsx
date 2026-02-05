'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Bell, Search, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/theme-toggle'
import { Logo } from '@/components/common/logo'

interface HeaderProps {
    onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
    const pathname = usePathname()

    // Get page title from pathname
    const getPageTitle = () => {
        const path = pathname.split('/').filter(Boolean)[0] || 'dashboard'
        return path.charAt(0).toUpperCase() + path.slice(1)
    }

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
            {/* Mobile menu button */}
            <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={onMenuClick}
            >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
            </Button>

            {/* Mobile logo */}
            <div className="lg:hidden">
                <Link href="/">
                    <Logo size="sm" showText={false} />
                </Link>
            </div>

            {/* Page title */}
            <div className="hidden lg:block">
                <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Search */}
            <div className="hidden w-full max-w-sm md:block">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search sessions, entities..."
                        className="pl-8"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <ThemeToggle />
            </div>
        </header>
    )
}
