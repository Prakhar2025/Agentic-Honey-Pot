import {
    LayoutDashboard,
    MessageSquare,
    Brain,
    BarChart3,
    MessagesSquare,
    Settings,
    FileText,
    HelpCircle,
    type LucideIcon,
} from 'lucide-react'

export interface NavItem {
    title: string
    href: string
    icon: LucideIcon
    description?: string
    badge?: string
}

export const NAVIGATION_ITEMS: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        description: 'Overview and statistics',
    },
    {
        title: 'Sessions',
        href: '/sessions',
        icon: MessageSquare,
        description: 'Scam engagement sessions',
    },
    {
        title: 'Intelligence',
        href: '/intelligence',
        icon: Brain,
        description: 'Extracted entities',
    },
    {
        title: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
        description: 'Charts and reports',
    },
    {
        title: 'Chat',
        href: '/chat',
        icon: MessagesSquare,
        description: 'Test scam scenarios',
        badge: 'Live',
    },
]

export const SECONDARY_NAVIGATION: NavItem[] = [
    {
        title: 'Documentation',
        href: '/docs',
        icon: FileText,
    },
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
    },
    {
        title: 'Help',
        href: '/help',
        icon: HelpCircle,
    },
]
