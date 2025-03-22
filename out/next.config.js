/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Add this to help with client-side routing in static exports
  experimental: {
    // This will allow client-side navigation to work properly in static export
    scrollRestoration: true,
  }
}

module.exports = nextConfig
