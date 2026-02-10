'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from './code-block'

interface CodeTab {
    label: string
    language: string
    code: string
}

interface TabsCodeProps {
    tabs: CodeTab[]
}

export function TabsCode({ tabs }: TabsCodeProps) {
    if (tabs.length === 0) return null

    return (
        <Tabs defaultValue={tabs[0].label} className="w-full">
            <TabsList className="bg-zinc-900 border border-zinc-800 rounded-t-lg rounded-b-none w-full justify-start h-auto p-0">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.label}
                        value={tab.label}
                        className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-50 text-zinc-400 rounded-none first:rounded-tl-lg px-4 py-2.5 text-sm"
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab) => (
                <TabsContent key={tab.label} value={tab.label} className="mt-0">
                    <CodeBlock code={tab.code} language={tab.language} />
                </TabsContent>
            ))}
        </Tabs>
    )
}
