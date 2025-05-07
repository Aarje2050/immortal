/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['immortalseo.com', 'secure.gravatar.com'],
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

  // async redirects() {
  //   return [
  //     {
  //       source: '/:slug((?!blog).*)', // match all slugs NOT starting with /blog
  //       destination: '/blog/:slug',   // redirect to /blog/:slug
  //       permanent: true,              // 308 Permanent Redirect (good for SEO)
  //     },
  //   ];
  // },
};

module.exports = nextConfig;