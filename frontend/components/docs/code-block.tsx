'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'
import { toast } from 'sonner'

interface CodeBlockProps {
    code: string
    language?: string
    showLineNumbers?: boolean
    className?: string
}

export function CodeBlock({ code, language = 'json', showLineNumbers = false, className }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)

    const copyCode = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        toast.success('Copied to clipboard')
        setTimeout(() => setCopied(false), 2000)
    }

    const lines = code.split('\n')

    return (
        <div className={cn('relative group rounded-lg bg-zinc-950 text-zinc-50 overflow-hidden', className)}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                <span className="text-xs text-zinc-400 uppercase font-mono">{language}</span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyCode}
                    className="h-7 px-2 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
                >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span className="ml-1.5 text-xs">{copied ? 'Copied' : 'Copy'}</span>
                </Button>
            </div>
            {/* Code */}
            <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                <code>
                    {showLineNumbers
                        ? lines.map((line, i) => (
                            <div key={i} className="flex">
                                <span className="select-none text-zinc-600 w-8 text-right mr-4 shrink-0">{i + 1}</span>
                                <span>{line}</span>
                            </div>
                        ))
                        : code}
                </code>
            </pre>
        </div>
    )
}
