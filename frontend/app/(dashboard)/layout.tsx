'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { cn } from '@/lib/utils/cn'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Sidebar */}
            <Sidebar />

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <div className="lg:pl-64">
                <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                <main className="p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
