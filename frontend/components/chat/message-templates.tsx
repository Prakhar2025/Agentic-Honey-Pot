'use client'

import { memo } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const TEMPLATES = [
    {
        category: 'KYC Fraud',
        templates: [
            'Dear Customer, your SBI account has been suspended due to incomplete KYC.',
            'Your PAN card is not linked with your bank account. Link now or account will be frozen.',
            'Urgent: Your Aadhaar verification is pending. Update within 24 hours.',
        ],
    },
    {
        category: 'Lottery Scam',
        templates: [
            'Congratulations! You won ₹10 Lakh in the Jio Lucky Draw!',
            'You have been selected for a cash prize of ₹25,00,000. Claim now!',
            'Your mobile number has won ₹50 Lakhs in the Google Lottery.',
        ],
    },
    {
        category: 'Tech Support',
        templates: [
            'This is Microsoft Security. Your computer has been infected with malware.',
            'Alert: Suspicious activity detected on your Windows license.',
            'Your antivirus subscription has expired. Renew immediately to stay protected.',
        ],
    },
    {
        category: 'Investment',
        templates: [
            'Earn ₹1 Lakh daily with crypto trading! Join our WhatsApp group.',
            'Special IPO allocation available. Guaranteed 200% returns in 30 days.',
            'Exclusive forex trading opportunity. Start with just ₹5000.',
        ],
    },
]

interface MessageTemplatesProps {
    onSelect: (message: string) => void
}

export const MessageTemplates = memo(function MessageTemplates({ onSelect }: MessageTemplatesProps) {
    return (
        <ScrollArea className="h-72">
            <div className="p-3 space-y-4">
                {TEMPLATES.map((group) => (
                    <div key={group.category}>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-[10px]">
                                {group.category}
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            {group.templates.map((template, i) => (
                                <Button
                                    key={i}
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start text-xs h-auto py-2 text-left whitespace-normal"
                                    onClick={() => onSelect(template)}
                                >
                                    <span className="line-clamp-2">{template}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
})
