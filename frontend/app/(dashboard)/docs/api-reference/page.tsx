'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    Code,
    ChevronDown,
    ChevronRight,
    Zap,
    Shield,
    MessageSquare,
    Brain,
    BarChart3,
    Heart,
} from 'lucide-react'
import { ApiEndpoint } from '@/components/docs/api-endpoint'
import { TabsCode } from '@/components/docs/tabs-code'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { API_ENDPOINTS_DOCS } from '@/lib/constants/api-docs'
import { cn } from '@/lib/utils/cn'

const ENDPOINT_GROUPS = [
    {
        id: 'honeypot',
        title: 'Honeypot',
        icon: Shield,
        description: 'Core scam engagement endpoints',
        endpoints: ['engage', 'continue', 'session', 'delete-session'],
    },
    {
        id: 'sessions',
        title: 'Sessions',
        icon: MessageSquare,
        description: 'Session management and history',
        endpoints: ['list-sessions', 'session-intelligence'],
    },
    {
        id: 'intelligence',
        title: 'Intelligence',
        icon: Brain,
        description: 'Extracted entity management',
        endpoints: ['list-intelligence'],
    },
    {
        id: 'analytics',
        title: 'Analytics',
        icon: BarChart3,
        description: 'Statistics and reporting',
        endpoints: ['analytics-summary', 'scam-types', 'timeline'],
    },
    {
        id: 'health',
        title: 'Health',
        icon: Heart,
        description: 'System health monitoring',
        endpoints: ['health', 'health-detailed'],
    },
]

export default function ApiReferencePage() {
    const [activeEndpoint, setActiveEndpoint] = useState<string | null>(null)
    const [expandedGroups, setExpandedGroups] = useState<string[]>(['honeypot'])

    const toggleGroup = (groupId: string) => {
        setExpandedGroups((prev) =>
            prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
        )
    }

    return (
        <div className="flex h-full">
            {/* Sidebar Navigation */}
            <div className="w-64 border-r hidden lg:block">
                <div className="p-4 border-b">
                    <h2 className="font-semibold flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        API Reference
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">v1 • REST API</p>
                </div>
                <ScrollArea className="h-[calc(100vh-12rem)]">
                    <div className="p-2">
                        {ENDPOINT_GROUPS.map((group) => (
                            <Collapsible
                                key={group.id}
                                open={expandedGroups.includes(group.id)}
                                onOpenChange={() => toggleGroup(group.id)}
                            >
                                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-muted text-left">
                                    <div className="flex items-center gap-2">
                                        <group.icon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">{group.title}</span>
                                    </div>
                                    {expandedGroups.includes(group.id) ? (
                                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="ml-6 space-y-1 py-1">
                                        {group.endpoints.map((endpointId) => {
                                            const endpoint = API_ENDPOINTS_DOCS[endpointId]
                                            if (!endpoint) return null
                                            return (
                                                <Link
                                                    key={endpointId}
                                                    href={`#${endpointId}`}
                                                    onClick={() => setActiveEndpoint(endpointId)}
                                                    className={cn(
                                                        'flex items-center gap-2 p-2 rounded text-sm transition-colors',
                                                        activeEndpoint === endpointId
                                                            ? 'bg-primary/10 text-primary'
                                                            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                                    )}
                                                >
                                                    <Badge
                                                        variant="outline"
                                                        className={cn(
                                                            'text-[10px] w-12 justify-center',
                                                            endpoint.method === 'GET' && 'border-green-500 text-green-500',
                                                            endpoint.method === 'POST' && 'border-blue-500 text-blue-500',
                                                            endpoint.method === 'DELETE' && 'border-red-500 text-red-500'
                                                        )}
                                                    >
                                                        {endpoint.method}
                                                    </Badge>
                                                    <span className="truncate">{endpoint.title}</span>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="max-w-4xl mx-auto py-8 px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold mb-2">API Reference</h1>
                        <p className="text-muted-foreground">
                            Complete documentation for the ScamShield REST API. All endpoints support JSON.
                        </p>
                        <Card className="mt-6">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div>
                                        <p className="text-sm font-medium mb-1">Base URL</p>
                                        <code className="text-sm bg-muted px-2 py-1 rounded">
                                            https://scamshield-honeypot.onrender.com/api/v1
                                        </code>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium mb-1">Format</p>
                                        <code className="text-sm bg-muted px-2 py-1 rounded">
                                            JSON
                                        </code>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Quick Start */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-12"
                    >
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Zap className="h-5 w-5 text-yellow-500" />
                            Quick Start
                        </h2>
                        <Card>
                            <CardContent className="p-0">
                                <TabsCode
                                    tabs={[
                                        {
                                            label: 'cURL',
                                            language: 'bash',
                                            code: `curl -X POST https://scamshield-honeypot.onrender.com/api/v1/honeypot/engage \\
  -H "Content-Type: application/json" \\
  -d '{
    "scammer_message": "Dear Customer, your KYC is pending...",
    "persona": "elderly_victim"
  }'`,
                                        },
                                        {
                                            label: 'Python',
                                            language: 'python',
                                            code: `import requests

response = requests.post(
    "https://scamshield-honeypot.onrender.com/api/v1/honeypot/engage",
    json={
        "scammer_message": "Dear Customer, your KYC is pending...",
        "persona": "elderly_victim"
    }
)
print(response.json())`,
                                        },
                                        {
                                            label: 'JavaScript',
                                            language: 'javascript',
                                            code: `const response = await fetch(
  'https://scamshield-honeypot.onrender.com/api/v1/honeypot/engage',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      scammer_message: 'Dear Customer, your KYC is pending...',
      persona: 'elderly_victim'
    })
  }
);
const data = await response.json();
console.log(data);`,
                                        },
                                    ]}
                                />
                            </CardContent>
                        </Card>
                    </motion.div>

                    <Separator className="my-8" />

                    {/* All Endpoints */}
                    {ENDPOINT_GROUPS.map((group) => (
                        <motion.div
                            key={group.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-12"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <group.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">{group.title}</h2>
                                    <p className="text-sm text-muted-foreground">{group.description}</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                {group.endpoints.map((endpointId) => {
                                    const endpoint = API_ENDPOINTS_DOCS[endpointId]
                                    if (!endpoint) return null
                                    return (
                                        <ApiEndpoint key={endpointId} id={endpointId} endpoint={endpoint} />
                                    )
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
