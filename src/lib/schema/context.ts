// src/lib/schema/context.ts
import { SchemaContext, OrganizationSchema, WebSiteSchema, LocalBusinessSchema } from './types';
import siteConfig from '../../../config/site.config';
import seoConfig from '../../../config/seo.config';

// Cache for the schema context
let schemaContextCache: SchemaContext | null = null;

/**
 * Gets the schema context for the site
 */
export function getSchemaContext(): SchemaContext {
  // Return cached context if available
  if (schemaContextCache) {
    return schemaContextCache;
  }

  // Base URL for the site
  const baseUrl = siteConfig.url;
  
  // Create organization schema
  const organization: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: siteConfig.name,
    url: baseUrl,
    logo: {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      url: `${baseUrl}/immortal-logo.svg`,
    },
    sameAs: Object.values(siteConfig.links).filter(Boolean) as string[],
    description: siteConfig.description,
    // Area served as proper GeoShape entities
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'India' },
    ],
    // Service catalog linking to all service pages
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'SEO Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Technical SEO', url: `${baseUrl}/services/technical-seo` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Content SEO', url: `${baseUrl}/services/content-seo` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Local SEO', url: `${baseUrl}/services/local-seo` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Off-Page SEO', url: `${baseUrl}/services/off-page-seo` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI-Enhanced SEO', url: `${baseUrl}/services/ai-enhanced-seo` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Semantic SEO', url: `${baseUrl}/services/semantic-seo` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-commerce SEO', url: `${baseUrl}/services/ecommerce-seo` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SaaS & B2B SEO', url: `${baseUrl}/services/saas-seo` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Small Business SEO', url: `${baseUrl}/services/small-business-seo` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Enterprise SEO', url: `${baseUrl}/services/enterprise-seo` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'WordPress SEO', url: `${baseUrl}/services/wordpress-seo` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shopify SEO', url: `${baseUrl}/services/shopify-seo` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'HubSpot SEO', url: `${baseUrl}/services/hubspot-seo-services` } },
      ],
    },
    // Founders
    founder: [
      {
        '@type': 'Person',
        name: 'Rajesh Jat',
        jobTitle: 'Co-Founder & SEO Strategist',
        url: `${baseUrl}/about#rajesh-jat`,
      },
      {
        '@type': 'Person',
        name: 'Manish Lamrod',
        jobTitle: 'Co-Founder & Off-Page SEO Expert',
        url: `${baseUrl}/about#manish-lamrod`,
      },
    ],
  } as any; // Using any for extended schema properties not in base type

  // Add contact points if available
  if (siteConfig.contact) {
    organization.contactPoint = [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phone,
        contactType: 'customer service',
        email: siteConfig.contact.email,
        areaServed: ['US', 'CA', 'IN'],
        availableLanguage: ['English'],
      },
    ];
  }

  // Create website schema
  const website: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description,
    publisher: organization,
    potentialAction: {
      '@context': 'https://schema.org',
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // Create local business schema if address is available
  let localBusiness: LocalBusinessSchema | undefined;
  
  if (siteConfig.contact && siteConfig.contact.address) {
    localBusiness = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${baseUrl}/#localbusiness`,
      name: siteConfig.name,
      url: baseUrl,
      logo: organization.logo,
      image: `${baseUrl}/images/office.webp`,
      telephone: siteConfig.contact.phone,
      priceRange: '$$',
      sameAs: organization.sameAs,
      address: {
        '@context': 'https://schema.org',
        '@type': 'PostalAddress',
        streetAddress: siteConfig.contact.address.street,
        addressLocality: siteConfig.contact.address.city,
        addressRegion: siteConfig.contact.address.state,
        postalCode: siteConfig.contact.address.zip,
        addressCountry: siteConfig.contact.address.country,
      },
      geo: {
        '@context': 'https://schema.org',
        '@type': 'GeoCoordinates',
        latitude: 24.88, // You should replace this with actual coordinates
        longitude: 74.61,
      },
      openingHoursSpecification: [
        {
          '@context': 'https://schema.org',
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
    };
  }

  // Create and cache the context
  schemaContextCache = {
    organization,
    website,
    localBusiness,
  };

  return schemaContextCache;
}

/**
 * Resets the schema context cache
 */
export function resetSchemaContext(): void {
  schemaContextCache = null;
}