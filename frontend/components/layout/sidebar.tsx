'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { Logo } from '@/components/common/logo'
import { NAVIGATION_ITEMS, SECONDARY_NAVIGATION } from '@/lib/constants/navigation'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r bg-background lg:block">
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-16 items-center border-b px-6">
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>

                {/* Navigation */}
                <ScrollArea className="flex-1 px-4 py-6">
                    <nav className="space-y-2">
                        {NAVIGATION_ITEMS.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                        isActive
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span className="flex-1">{item.title}</span>
                                    {item.badge && (
                                        <Badge variant="secondary" className="text-xs">
                                            {item.badge}
                                        </Badge>
                                    )}
                                </Link>
                            )
                        })}
                    </nav>

                    <Separator className="my-6" />

                    <nav className="space-y-2">
                        {SECONDARY_NAVIGATION.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                        isActive
                                            ? 'bg-muted text-foreground'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.title}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </ScrollArea>

                {/* Footer */}
                <div className="border-t px-4 py-4">
                    <div className="rounded-lg bg-muted px-3 py-2">
                        <p className="text-xs text-muted-foreground">
                            ScamShield v1.0.0
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Open Source Project
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    )
}
