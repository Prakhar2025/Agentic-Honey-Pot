'use client'

import { useState } from 'react'
import {
    ChevronDown,
    ChevronRight,
    Play,
    Copy,
    Check,
    Code,
} from 'lucide-react'
import { CodeBlock } from './code-block'
import { TabsCode } from './tabs-code'
import { SchemaViewer } from './schema-viewer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils/cn'
import { toast } from 'sonner'
import type { EndpointDoc } from '@/lib/constants/api-docs'

interface ApiEndpointProps {
    id: string
    endpoint: EndpointDoc
}

export function ApiEndpoint({ id, endpoint }: ApiEndpointProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [activeTab, setActiveTab] = useState<'overview' | 'examples'>('overview')
    const [copied, setCopied] = useState(false)

    const methodColors: Record<string, string> = {
        GET: 'bg-green-500/10 text-green-600 border-green-500/30',
        POST: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
        PUT: 'bg-orange-500/10 text-orange-600 border-orange-500/30',
        DELETE: 'bg-red-500/10 text-red-600 border-red-500/30',
        PATCH: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
    }

    const copyPath = async () => {
        await navigator.clipboard.writeText(endpoint.path)
        setCopied(true)
        toast.success('Path copied to clipboard')
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Card id={id} className="scroll-mt-20">
            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 min-w-0">
                                <Badge
                                    variant="outline"
                                    className={cn('font-mono text-xs shrink-0', methodColors[endpoint.method])}
                                >
                                    {endpoint.method}
                                </Badge>
                                <code className="text-sm font-mono text-muted-foreground truncate">
                                    {endpoint.path}
                                </code>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        copyPath()
                                    }}
                                >
                                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                </Button>
                                {isExpanded ? (
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                )}
                            </div>
                        </div>
                        <div className="mt-2">
                            <h3 className="font-semibold">{endpoint.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{endpoint.description}</p>
                        </div>
                    </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <CardContent className="pt-0">
                        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'overview' | 'examples')}>
                            <TabsList className="mb-4">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="examples">
                                    <Code className="h-3 w-3 mr-1" />
                                    Examples
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-6">
                                {/* Parameters */}
                                {endpoint.parameters && endpoint.parameters.length > 0 && (
                                    <div>
                                        <h4 className="font-medium mb-3">Parameters</h4>
                                        <div className="border rounded-lg overflow-hidden">
                                            <table className="w-full text-sm">
                                                <thead className="bg-muted">
                                                    <tr>
                                                        <th className="text-left p-3">Name</th>
                                                        <th className="text-left p-3">Type</th>
                                                        <th className="text-left p-3">Required</th>
                                                        <th className="text-left p-3">Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {endpoint.parameters.map((param) => (
                                                        <tr key={param.name} className="border-t">
                                                            <td className="p-3 font-mono text-xs">{param.name}</td>
                                                            <td className="p-3">
                                                                <Badge variant="outline" className="text-xs">{param.type}</Badge>
                                                            </td>
                                                            <td className="p-3">
                                                                {param.required ? (
                                                                    <Badge className="text-xs">Required</Badge>
                                                                ) : (
                                                                    <span className="text-muted-foreground">Optional</span>
                                                                )}
                                                            </td>
                                                            <td className="p-3 text-muted-foreground">{param.description}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Request Body */}
                                {endpoint.requestBody && (
                                    <div>
                                        <h4 className="font-medium mb-3">Request Body</h4>
                                        <p className="text-sm text-muted-foreground mb-3">{endpoint.requestBody.description}</p>
                                        <SchemaViewer
                                            schema={endpoint.requestBody.schema}
                                            example={endpoint.requestBody.example}
                                        />
                                    </div>
                                )}

                                {/* Responses */}
                                <div>
                                    <h4 className="font-medium mb-3">Responses</h4>
                                    <div className="space-y-3">
                                        {Object.entries(endpoint.responses).map(([code, response]) => (
                                            <div key={code} className="border rounded-lg overflow-hidden">
                                                <div className="flex items-center gap-2 p-3 bg-muted">
                                                    <Badge
                                                        variant="outline"
                                                        className={cn(
                                                            'text-xs',
                                                            code.startsWith('2') && 'border-green-500 text-green-500',
                                                            code.startsWith('4') && 'border-red-500 text-red-500',
                                                            code.startsWith('5') && 'border-orange-500 text-orange-500'
                                                        )}
                                                    >
                                                        {code}
                                                    </Badge>
                                                    <span className="text-sm">{response.description}</span>
                                                </div>
                                                {response.example && (
                                                    <div className="p-3">
                                                        <CodeBlock
                                                            language="json"
                                                            code={JSON.stringify(response.example, null, 2)}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="examples">
                                <TabsCode
                                    tabs={[
                                        { label: 'cURL', language: 'bash', code: endpoint.examples.curl },
                                        { label: 'Python', language: 'python', code: endpoint.examples.python },
                                        { label: 'JavaScript', language: 'javascript', code: endpoint.examples.javascript },
                                    ]}
                                />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    )
}
