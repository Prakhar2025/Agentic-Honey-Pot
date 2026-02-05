import Link from 'next/link'
import { FileQuestion, Home } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="mx-auto max-w-md text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <FileQuestion className="h-8 w-8 text-muted-foreground" />
                </div>
                <h1 className="mb-2 text-4xl font-bold">404</h1>
                <h2 className="mb-2 text-xl font-semibold">Page Not Found</h2>
                <p className="mb-6 text-muted-foreground">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </div>
        </div>
    )
}
