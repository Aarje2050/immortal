// config/site.config.js

/**
 * @typedef {import('../src/types/site').SiteConfig} SiteConfig
 * @type {SiteConfig}
 */
const siteConfig = {
  name: 'Immortal SEO',
  description: 'Premium SEO services to help your business dominate search rankings and drive targeted traffic.',
  url: 'https://immortalseo.com',
  ogImage: '/images/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/immortalseo',
    linkedin: 'https://linkedin.com/company/immortalseo',
    facebook: 'https://facebook.com/immortalseo',
    instagram: 'https://instagram.com/immortalseo',
  },
  contact: {
    email: 'info@immortalseo.com',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 SEO Avenue',
      city: 'Toronto',
      state: 'Ontario',
      zip: 'M5V 2N4',
      country: 'Canada',
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
      { name: 'Services', href: '/services' },
      { name: 'Case studies', href: '/case-studies' },
      { name: 'Tools', href: '/tools' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
      {
        name: "Pricing",
        href: "/pricing"
      }
    ],
    services: [
      { name: 'Technical SEO', href: '/services/technical-seo' },
      { name: 'Content SEO', href: '/services/content-seo' },
      { name: 'Local SEO', href: '/services/local-seo' },
      { name: 'E-commerce SEO', href: '/services/ecommerce-seo' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
    ],
  },
};

module.exports = siteConfig;