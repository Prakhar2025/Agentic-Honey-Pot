'use client'

import { memo, useState } from 'react'
import { Download, FileText, FileJson, Copy, Check } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useChatStore } from '@/lib/stores'
import { toast } from 'sonner'

interface ChatExportModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const ChatExportModal = memo(function ChatExportModal({ open, onOpenChange }: ChatExportModalProps) {
    const [format, setFormat] = useState('json')
    const { messages, activeSession, extractedEntities } = useChatStore()

    const handleExport = () => {
        const exportData = {
            session: activeSession,
            messages: messages.map(m => ({
                role: m.role,
                content: m.content,
                timestamp: m.timestamp,
                entities: m.entities_extracted,
            })),
            intelligence: extractedEntities,
            exported_at: new Date().toISOString(),
        }

        let content: string
        let mimeType: string
        let extension: string

        if (format === 'json') {
            content = JSON.stringify(exportData, null, 2)
            mimeType = 'application/json'
            extension = 'json'
        } else {
            content = messages.map(m =>
                `[${new Date(m.timestamp).toLocaleTimeString()}] ${m.role.toUpperCase()}: ${m.content}`
            ).join('\n\n')
            mimeType = 'text/plain'
            extension = 'txt'
        }

        const blob = new Blob([content], { type: mimeType })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `scamshield-chat-${activeSession?.id || 'export'}.${extension}`
        a.click()
        URL.revokeObjectURL(url)

        toast.success('Chat exported successfully')
        onOpenChange(false)
    }

    const handleCopyAll = async () => {
        const text = messages.map(m =>
            `[${m.role.toUpperCase()}]: ${m.content}`
        ).join('\n\n')
        await navigator.clipboard.writeText(text)
        toast.success('Copied all messages')
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Export Conversation</DialogTitle>
                    <DialogDescription>
                        Export the conversation and extracted intelligence
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <RadioGroup value={format} onValueChange={setFormat}>
                        <div className="flex items-center space-x-2 p-3 rounded-lg border">
                            <RadioGroupItem value="json" id="json" />
                            <Label htmlFor="json" className="flex items-center gap-2 cursor-pointer flex-1">
                                <FileJson className="h-4 w-4" />
                                <div>
                                    <p className="text-sm font-medium">JSON</p>
                                    <p className="text-xs text-muted-foreground">Full data with intelligence</p>
                                </div>
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg border">
                            <RadioGroupItem value="text" id="text" />
                            <Label htmlFor="text" className="flex items-center gap-2 cursor-pointer flex-1">
                                <FileText className="h-4 w-4" />
                                <div>
                                    <p className="text-sm font-medium">Text</p>
                                    <p className="text-xs text-muted-foreground">Plain text conversation</p>
                                </div>
                            </Label>
                        </div>
                    </RadioGroup>

                    <div className="text-xs text-muted-foreground text-center">
                        {messages.length} messages • {extractedEntities.length} entities
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={handleCopyAll}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy All
                    </Button>
                    <Button onClick={handleExport}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
})
