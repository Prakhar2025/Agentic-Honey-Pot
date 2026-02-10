'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, FileText, Code, ArrowRight } from 'lucide-react'
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'

interface DocsSearchProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const SEARCH_ITEMS = [
    { title: 'Getting Started', href: '/docs', category: 'Guides', badge: 'Guide' },
    { title: 'API Reference', href: '/docs/api-reference', category: 'API', badge: 'Reference' },
    { title: 'Engage Scammer', href: '/docs/api-reference#engage', category: 'API', badge: 'POST' },
    { title: 'Continue Conversation', href: '/docs/api-reference#continue', category: 'API', badge: 'POST' },
    { title: 'List Sessions', href: '/docs/api-reference#list-sessions', category: 'API', badge: 'GET' },
    { title: 'Get Intelligence', href: '/docs/api-reference#list-intelligence', category: 'API', badge: 'GET' },
    { title: 'Analytics Summary', href: '/docs/api-reference#analytics-summary', category: 'API', badge: 'GET' },
    { title: 'Health Check', href: '/docs/api-reference#health', category: 'API', badge: 'GET' },
    { title: 'AI Personas', href: '/docs', category: 'Guides', badge: 'Guide' },
    { title: 'Scam Types', href: '/docs', category: 'Guides', badge: 'Guide' },
    { title: 'Architecture', href: '/docs', category: 'Guides', badge: 'Guide' },
    { title: 'Deployment', href: '/docs', category: 'Guides', badge: 'Guide' },
    { title: 'Dashboard', href: '/dashboard', category: 'Pages', badge: 'Page' },
    { title: 'Chat', href: '/chat', category: 'Pages', badge: 'Page' },
    { title: 'Sessions', href: '/sessions', category: 'Pages', badge: 'Page' },
    { title: 'Intelligence', href: '/intelligence', category: 'Pages', badge: 'Page' },
    { title: 'Analytics', href: '/analytics', category: 'Pages', badge: 'Page' },
    { title: 'Settings', href: '/settings', category: 'Pages', badge: 'Page' },
]

export function DocsSearch({ open, onOpenChange }: DocsSearchProps) {
    const router = useRouter()

    const navigate = useCallback((href: string) => {
        router.push(href)
        onOpenChange(false)
    }, [router, onOpenChange])

    const groups = SEARCH_ITEMS.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = []
        acc[item.category].push(item)
        return acc
    }, {} as Record<string, typeof SEARCH_ITEMS>)

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput placeholder="Search documentation..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {Object.entries(groups).map(([category, items], i) => (
                    <div key={category}>
                        {i > 0 && <CommandSeparator />}
                        <CommandGroup heading={category}>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.href}
                                    value={item.title}
                                    onSelect={() => navigate(item.href)}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-2">
                                        {item.category === 'API' ? (
                                            <Code className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span>{item.title}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-[10px]">{item.badge}</Badge>
                                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </div>
                ))}
            </CommandList>
        </CommandDialog>
    )
}
