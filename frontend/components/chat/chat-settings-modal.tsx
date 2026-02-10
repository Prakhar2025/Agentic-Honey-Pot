'use client'

import { memo } from 'react'
import { Volume2, VolumeX, ArrowDown, Eye, EyeOff, Type } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { useChatStore } from '@/lib/stores'

interface ChatSettingsModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const ChatSettingsModal = memo(function ChatSettingsModal({ open, onOpenChange }: ChatSettingsModalProps) {
    const {
        soundEnabled, setSoundEnabled,
        autoScroll, setAutoScroll,
    } = useChatStore()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Chat Settings</DialogTitle>
                    <DialogDescription>
                        Configure your chat experience preferences
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Sound */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                            <div>
                                <Label>Sound Notifications</Label>
                                <p className="text-xs text-muted-foreground">Play sound for new messages</p>
                            </div>
                        </div>
                        <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                    </div>

                    <Separator />

                    {/* Auto Scroll */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <ArrowDown className="h-4 w-4" />
                            <div>
                                <Label>Auto Scroll</Label>
                                <p className="text-xs text-muted-foreground">Scroll to new messages automatically</p>
                            </div>
                        </div>
                        <Switch checked={autoScroll} onCheckedChange={setAutoScroll} />
                    </div>

                    <Separator />

                    {/* Keyboard Shortcuts */}
                    <div>
                        <h4 className="text-sm font-medium mb-3">Keyboard Shortcuts</h4>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">New Chat</span>
                                <kbd className="px-2 py-0.5 bg-muted rounded text-[10px]">Ctrl+N</kbd>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Settings</span>
                                <kbd className="px-2 py-0.5 bg-muted rounded text-[10px]">Ctrl+E</kbd>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Send Message</span>
                                <kbd className="px-2 py-0.5 bg-muted rounded text-[10px]">Enter</kbd>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">New Line</span>
                                <kbd className="px-2 py-0.5 bg-muted rounded text-[10px]">Shift+Enter</kbd>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
})
