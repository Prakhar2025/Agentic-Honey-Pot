'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from './code-block'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils/cn'

interface SchemaViewerProps {
    schema: Record<string, unknown>
    example?: Record<string, unknown>
}

export function SchemaViewer({ schema, example }: SchemaViewerProps) {
    return (
        <Tabs defaultValue="example" className="w-full">
            <TabsList className="h-9">
                <TabsTrigger value="example" className="text-xs">Example</TabsTrigger>
                <TabsTrigger value="schema" className="text-xs">Schema</TabsTrigger>
            </TabsList>
            <TabsContent value="example">
                {example ? (
                    <CodeBlock code={JSON.stringify(example, null, 2)} language="json" />
                ) : (
                    <p className="text-sm text-muted-foreground p-4">No example available</p>
                )}
            </TabsContent>
            <TabsContent value="schema">
                <CodeBlock code={JSON.stringify(schema, null, 2)} language="json" />
            </TabsContent>
        </Tabs>
    )
}
