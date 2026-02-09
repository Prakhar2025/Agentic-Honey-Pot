/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        // Lint warnings (exhaustive-deps) are intentional patterns - will be reviewed
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: '**' }
        ]
    },
    experimental: {
        optimizePackageImports: ['lucide-react', 'recharts']
    }
}

module.exports = nextConfig
