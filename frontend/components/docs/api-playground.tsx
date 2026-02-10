'use client'

import { useState, useCallback } from 'react'
import { Loader2, Copy, Check, Clock, AlertCircle, Play } from 'lucide-react'
import { CodeBlock } from './code-block'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { cn } from '@/lib/utils/cn'

interface ApiPlaygroundProps {
    endpoint: {
        method: string
        path: string
        parameters?: Array<{
            name: string
            type: string
            required: boolean
            description: string
            example?: string
        }>
        requestBody?: {
            example: object
        }
    }
}

interface PlaygroundResponse {
    status: number
    statusText: string
    data: unknown
    time: number
}

export function ApiPlayground({ endpoint }: ApiPlaygroundProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState<PlaygroundResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    const [requestBody, setRequestBody] = useState(
        endpoint.requestBody?.example ? JSON.stringify(endpoint.requestBody.example, null, 2) : ''
    )

    const [pathParams, setPathParams] = useState<Record<string, string>>({})
    const [queryParams, setQueryParams] = useState<Record<string, string>>({})

    // Build the final URL with parameters
    const buildUrl = useCallback(() => {
        let url = endpoint.path

        // Replace path parameters
        Object.entries(pathParams).forEach(([key, value]) => {
            url = url.replace(`{${key}}`, value)
        })

        // Add query parameters
        const queryString = Object.entries(queryParams)
            .filter(([_, value]) => value)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&')

        if (queryString) {
            url += `?${queryString}`
        }

        return url
    }, [endpoint.path, pathParams, queryParams])

    // Execute the request
    const executeRequest = async () => {
        setIsLoading(true)
        setError(null)
        setResponse(null)

        const startTime = Date.now()

        try {
            let body: object | undefined
            if (requestBody && endpoint.method !== 'GET') {
                try {
                    body = JSON.parse(requestBody)
                } catch {
                    throw new Error('Invalid JSON in request body')
                }
            }

            const url = buildUrl()
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
            const fullUrl = `${baseUrl}${url}`

            const res = await fetch(fullUrl, {
                method: endpoint.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body ? JSON.stringify(body) : undefined,
            })

            const time = Date.now() - startTime
            const data = await res.json()

            setResponse({
                status: res.status,
                statusText: res.statusText,
                data,
                time,
            })

            if (res.ok) {
                toast.success('Request successful')
            } else {
                toast.error('Request failed')
            }
        } catch (err: any) {
            const time = Date.now() - startTime
            setError(err.message || 'Request failed')
            toast.error(err.message || 'Request failed')
        } finally {
            setIsLoading(false)
        }
    }

    // Copy response
    const copyResponse = async () => {
        if (!response) return
        await navigator.clipboard.writeText(JSON.stringify(response.data, null, 2))
        setCopied(true)
        toast.success('Response copied to clipboard')
        setTimeout(() => setCopied(false), 2000)
    }

    // Extract path parameters from endpoint path
    const pathParamNames = endpoint.path.match(/\{(\w+)\}/g)?.map((p) => p.slice(1, -1)) || []

    // Extract query parameters from endpoint parameters
    const queryParamDefs = endpoint.parameters?.filter((p) => !pathParamNames.includes(p.name)) || []

    return (
        <div className="space-y-6">
            {/* Request Builder */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Left: Parameters */}
                <div className="space-y-4">
                    <h4 className="font-medium">Request</h4>

                    {/* Path Parameters */}
                    {pathParamNames.length > 0 && (
                        <div className="space-y-3">
                            <Label>Path Parameters</Label>
                            {pathParamNames.map((param) => (
                                <div key={param} className="flex items-center gap-2">
                                    <span className="text-sm font-mono text-muted-foreground w-32">{param}</span>
                                    <Input
                                        placeholder={`Enter ${param}`}
                                        value={pathParams[param] || ''}
                                        onChange={(e) => setPathParams((prev) => ({ ...prev, [param]: e.target.value }))}
                                        className="flex-1"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Query Parameters */}
                    {queryParamDefs.length > 0 && (
                        <div className="space-y-3">
                            <Label>Query Parameters</Label>
                            {queryParamDefs.map((param) => (
                                <div key={param.name} className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-mono flex-1">
                                            {param.name}
                                            {param.required && <span className="text-red-500 ml-1">*</span>}
                                        </span>
                                        <Badge variant="outline" className="text-xs">
                                            {param.type}
                                        </Badge>
                                    </div>
                                    <Input
                                        placeholder={param.example || `Enter ${param.name}`}
                                        value={queryParams[param.name] || ''}
                                        onChange={(e) =>
                                            setQueryParams((prev) => ({ ...prev, [param.name]: e.target.value }))
                                        }
                                    />
                                    <p className="text-xs text-muted-foreground">{param.description}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Request Body */}
                    {endpoint.method !== 'GET' && endpoint.requestBody && (
                        <div className="space-y-2">
                            <Label>Request Body</Label>
                            <Textarea
                                value={requestBody}
                                onChange={(e) => setRequestBody(e.target.value)}
                                rows={10}
                                className="font-mono text-sm"
                                placeholder="Enter JSON request body..."
                            />
                        </div>
                    )}

                    {/* Execute Button */}
                    <Button onClick={executeRequest} disabled={isLoading} className="w-full" size="lg">
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Play className="h-4 w-4 mr-2" />
                                Send Request
                            </>
                        )}
                    </Button>
                </div>

                {/* Right: Response */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium">Response</h4>
                        {response && (
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        response.status >= 200 && response.status < 300 && 'border-green-500 text-green-500',
                                        response.status >= 400 && response.status < 500 && 'border-red-500 text-red-500',
                                        response.status >= 500 && 'border-orange-500 text-orange-500'
                                    )}
                                >
                                    {response.status} {response.statusText}
                                </Badge>
                                <Badge variant="secondary" className="gap-1">
                                    <Clock className="h-3 w-3" />
                                    {response.time}ms
                                </Badge>
                                <Button variant="ghost" size="sm" onClick={copyResponse}>
                                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                </Button>
                            </div>
                        )}
                    </div>

                    <Card className="min-h-[300px] border-2 overflow-hidden bg-muted/30">
                        {!response && !error && !isLoading && (
                            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                                <p className="text-sm">Click &quot;Send Request&quot; to see the response</p>
                            </div>
                        )}

                        {isLoading && (
                            <div className="flex items-center justify-center h-[300px]">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        )}

                        {error && (
                            <div className="flex flex-col items-center justify-center h-[300px] text-destructive">
                                <AlertCircle className="h-8 w-8 mb-2" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        {response && (
                            <div className="p-0">
                                <CodeBlock language="json" code={JSON.stringify(response.data, null, 2)} />
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    )
}
