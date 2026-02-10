/** @type {import('next').NextConfig} */
const nextConfig = {
    // React strict mode
    reactStrictMode: true,

    // ESLint config
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Optimize images
    images: {
        remotePatterns: [{ protocol: 'https', hostname: '**' }],
        formats: ['image/avif', 'image/webp'],
    },

    // Experimental optimizations
    experimental: {
        optimizePackageImports: [
            'lucide-react',
            'recharts',
            'framer-motion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
        ],
    },

    // Compiler options
    compiler: {
        removeConsole:
            process.env.NODE_ENV === 'production'
                ? { exclude: ['error', 'warn'] }
                : false,
    },

    // Output standalone for Docker
    output: 'standalone',

    // Remove X-Powered-By header
    poweredByHeader: false,

    // Enable compression
    compress: true,

    // Generate ETags
    generateEtags: true,

    // Security headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-DNS-Prefetch-Control', value: 'on' },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.scamshield.ai https://scamshield-honeypot.onrender.com; frame-ancestors 'none';",
                    },
                ],
            },
        ]
    },

    // Webpack configuration for bundle analysis
    webpack: (config, { isServer }) => {
        if (process.env.ANALYZE === 'true') {
            const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
            config.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                    openAnalyzer: true,
                    generateStatsFile: true,
                })
            )
        }
        return config
    },

    // Environment variables
    env: {
        NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version || '1.0.0',
        NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
    },
}

module.exports = nextConfig
