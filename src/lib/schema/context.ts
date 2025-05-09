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
  };

  // Add contact points if available
  if (siteConfig.contact) {
    organization.contactPoint = [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phone,
        contactType: 'customer service',
        email: siteConfig.contact.email,
        areaServed: 'CA US IN', // Matches what you already have in seo.config.js
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
        latitude: 43.6452, // You should replace this with actual coordinates
        longitude: -79.3806,
      },
      openingHoursSpecification: [
        {
          '@context': 'https://schema.org',
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00',
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