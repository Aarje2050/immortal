// config/site.config.js

/**
 * @typedef {import('../src/types/site').SiteConfig} SiteConfig
 */
const siteConfig = {
  name: 'Immortal SEO',
  description: 'We at Immortal SEO Agency have been delivering white-hat SEO services since 2008, helping businesses generate quality leads and achieve sustainable organic growth.',
  url: 'https://immortalseo.com',
  ogImage: '/images/og-image.jpg',
  links: {
    // twitter: 'https://twitter.com/immortalseo',
    linkedin: 'https://linkedin.com/company/immortalseo',
    // facebook: 'https://facebook.com/immortalseo',
    // instagram: 'https://instagram.com/immortalseo',
  },
  contact: {
    email: 'hello@immortalseo.com',
    phone: '+919649930799',
    address: {
      street: 'A9, Pratap Nagar',
      city: 'Chittorgarh',
      state: 'Rajasthan',
      zip: '312001',
      country: 'India',
    },
  },
  companyInfo: {
    founded: '2023',
    teamSize: '10-50',
    values: [
      'Data-driven strategies',
      'Transparency',
      'Sustainable growth',
      'Client education',
    ],
  },
  mainServices: [
    {
      id: 'technical-seo',
      name: 'Technical SEO',
      slug: 'technical-seo',
      shortDescription: 'Optimize your website infrastructure for search engines',
    },
    {
      id: 'content-seo',
      name: 'Content SEO',
      slug: 'content-seo',
      shortDescription: 'Create and optimize content that ranks and converts',
    },
    {
      id: 'local-seo',
      name: 'Local SEO',
      slug: 'local-seo',
      shortDescription: 'Dominate local search results and attract nearby customers',
    },
    {
      id: 'ecommerce-seo',
      name: 'E-commerce SEO',
      slug: 'ecommerce-seo',
      shortDescription: 'Optimize product pages and increase online store visibility',
    },
  ],
  navigation: {
    main: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Services', href: '/services', hasSubmenu: true },
      { name: 'Tools', href: '/tools', hasSubmenu: true },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Blog', href: '/blog' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Contact', href: '/contact' },
    ],
    services: [
      { name: 'Technical SEO', href: '/services/technical-seo' },
      { name: 'Content SEO', href: '/services/content-seo' },
      { name: 'Off-Page SEO', href: '/services/off-page-seo' },
      { name: 'Local SEO', href: '/services/local-seo' },
      { name: 'AI-Enhanced SEO', href: '/services/ai-enhanced-seo' },
      { name: 'Semantic SEO', href: '/services/semantic-seo' },
      { name: 'E-commerce SEO', href: '/services/ecommerce-seo' },
      { name: 'SaaS & B2B SEO', href: '/services/saas-seo' },
      { name: 'Small Business SEO', href: '/services/small-business-seo' },
      { name: 'Enterprise SEO', href: '/services/enterprise-seo' },
    ],
    tools: [
      { name: 'llms.txt Generator', href: '/tools/llms-txt-generator' },
      { name: 'Robots.txt Generator', href: '/tools/robots-txt-generator' },
      { name: 'SEO Audit Checklist', href: '/tools/seo-audit-checklist' },
      { name: 'SEO Cost Calculator', href: '/tools/seo-cost-calculator' },
      { name: 'Schema Markup Generator', href: '/tools/schema-generator' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      // { name: 'Cookie Policy', href: '/cookie-policy' },
    ],
  },
  // Service categories for organization
  serviceCategories: {
    'Core SEO Services': [
      { name: 'Technical SEO', href: '/services/technical-seo' },
      { name: 'Content SEO', href: '/services/content-seo' },
      { name: 'Off-Page SEO', href: '/services/off-page-seo' },
      { name: 'Local SEO', href: '/services/local-seo' },
    ],
    'Advanced SEO Solutions': [
      { name: 'AI-Enhanced SEO', href: '/services/ai-enhanced-seo' },
      { name: 'Semantic SEO', href: '/services/semantic-seo' },
    ],
    'Industry-Specific SEO': [
      { name: 'E-commerce SEO', href: '/services/ecommerce-seo' },
      { name: 'SaaS & B2B SEO', href: '/services/saas-seo' },
      { name: 'Small Business SEO', href: '/services/small-business-seo' },
      { name: 'Enterprise SEO', href: '/services/enterprise-seo' },
    ]
  },
  cta: {
    primary: {
      text: 'Free SEO Audit',
      href: '/contact'
    }
  }
};

module.exports = siteConfig;