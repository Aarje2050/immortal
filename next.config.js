/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['blog.immortalseo.com','immortalseo.com', 'secure.gravatar.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // This is a temporary solution to bypass TypeScript errors during build
    // Ideally, you should fix all TypeScript errors before deploying to production
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      {
        source: '/llms-text-generator', // old url
        destination: '/tools/llms-txt-generator',   // redirect to tools page
        permanent: true,              // 308 Permanent Redirect (good for SEO)
      },
      {
        source: '/cbd-canada-seo-case-study', // old url
        destination: '/case-studies/cbd-canada-seo-case-study',   // redirect to tools page
        permanent: true,              // 308 Permanent Redirect (good for SEO)
      },
      {
        source: '/hubspot-seo-services', // old url
        destination: '/services/hubspot-seo-services',   // redirect to tools page
        permanent: true,              // 308 Permanent Redirect (good for SEO)
      },
    ];
  },
};

module.exports = nextConfig;