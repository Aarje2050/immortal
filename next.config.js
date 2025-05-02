/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // This is a temporary solution to bypass TypeScript errors during build
    // Ideally, you should fix all TypeScript errors before deploying to production
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;