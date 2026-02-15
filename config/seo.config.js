// config/seo.config.js
const site = require('./site.config');

const seoConfig = {
  titleTemplate: '%s',
  defaultTitle: 'Immortal SEO | Premium SEO Services for Sustainable Growth',
  defaultDescription: 'Boost your online visibility with Immortal SEO\'s data-driven strategies. We help businesses dominate search rankings and drive targeted traffic.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: `${site.url}${site.ogImage}`,
        width: 1200,
        height: 630,
        alt: 'Immortal SEO',
      },
    ],
  },
  twitter: {
    handle: '@immortalseo',
    site: '@immortalseo',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#0171CE',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/favicon/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/favicon/site.webmanifest',
    },
  ],
  robotsProps: {
    nosnippet: false,
    notranslate: false,
    noimageindex: false,
    noarchive: false,
    maxSnippet: -1,
    maxImagePreview: 'large',
    maxVideoPreview: -1,
  },
  schemaOrg: {
    organization: {
      name: site.name,
      logo: `${site.url}/immortal-logo.svg`,
      url: site.url,
      // Filter out empty strings so only real profile URLs appear in schema
      sameAs: [
        site.links.twitter,
        site.links.linkedin,
        site.links.facebook,
        site.links.instagram,
        site.links.youtube,
      ].filter(Boolean),
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: site.contact.phone,
          contactType: 'customer service',
          email: site.contact.email,
          areaServed: ['US', 'CA', 'IN'],
          availableLanguage: ['English'],
        },
      ],
    },
    localBusiness: {
      '@type': 'ProfessionalService',
      name: site.name,
      image: `${site.url}/images/office.jpg`,
      '@id': `${site.url}/#organization`,
      url: site.url,
      telephone: site.contact.phone,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.contact.address.street,
        addressLocality: site.contact.address.city,
        addressRegion: site.contact.address.state,
        postalCode: site.contact.address.zip,
        addressCountry: site.contact.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        // Chittorgarh, Rajasthan, India - matches the real business address
        latitude: 24.8887,
        longitude: 74.6269,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00',
        },
      ],
    },
  },
  // Default templates for dynamic pages
  templates: {
    location: {
      titleTemplate: '%s SEO Services | Immortal SEO',
      descriptionTemplate: 'Boost your %s business with our expert SEO services. Immortal SEO delivers data-driven strategies for sustainable growth in %s.',
    },
    industry: {
      titleTemplate: '%s SEO Services | Immortal SEO',
      descriptionTemplate: 'Specialized SEO solutions for %s businesses. Increase visibility, drive targeted traffic, and grow your %s business with our proven strategies.',
    },
    combined: {
      titleTemplate: '%s SEO Services in %s | Immortal SEO',
      descriptionTemplate: 'Custom SEO strategies for %s businesses in %s. Dominate local search results and outrank your competition with Immortal SEO.',
    },
  },
};

module.exports = seoConfig;