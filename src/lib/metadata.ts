// src/lib/metadata.ts
import { Metadata } from 'next';
import seoConfig from '../../config/seo.config';
import siteConfig from '../../config/site.config';

export type MetadataParams = {
  title?: string;
  description?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: string | string[];
  };
  location?: {
    name: string;
    region?: string;
    country?: string;
  };
  industry?: {
    name: string;
  };
  noIndex?: boolean;
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
};

/**
 * Generates metadata for pages
 */
export function generateMetadata({
  title,
  description,
  openGraph,
  location,
  industry,
  noIndex = false,
}: MetadataParams): Metadata {
  // Generate title
  let pageTitle = title || seoConfig.defaultTitle;
  
  // If location or industry are provided, use templates
  if (location && industry) {
    pageTitle = seoConfig.templates.combined.titleTemplate
      .replace('%s', industry.name)
      .replace('%s', location.name);
  } else if (location) {
    pageTitle = seoConfig.templates.location.titleTemplate
      .replace('%s', location.name);
  } else if (industry) {
    pageTitle = seoConfig.templates.industry.titleTemplate
      .replace('%s', industry.name);
  }
  
  // Generate description
  let pageDescription = description || seoConfig.defaultDescription;
  
  // If location or industry are provided, use templates
  if (location && industry) {
    pageDescription = seoConfig.templates.combined.descriptionTemplate
      .replace('%s', industry.name)
      .replace('%s', location.name);
  } else if (location) {
    pageDescription = seoConfig.templates.location.descriptionTemplate
      .replace('%s', location.name)
      .replace('%s', location.name);
  } else if (industry) {
    pageDescription = seoConfig.templates.industry.descriptionTemplate
      .replace('%s', industry.name)
      .replace('%s', industry.name);
  }

  // Construct open graph images
  const ogImages = openGraph?.images
    ? Array.isArray(openGraph.images)
      ? openGraph.images.map(img => ({ url: img }))
      : [{ url: openGraph.images }]
    : seoConfig.openGraph.images;

  // Base metadata object
  const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      ...seoConfig.openGraph,
      title: openGraph?.title || pageTitle,
      description: openGraph?.description || pageDescription,
      images: ogImages,
    },
    twitter: {
      ...seoConfig.twitter,
      title: pageTitle,
      description: pageDescription,
    },
    alternates: {
      canonical: `${siteConfig.url}${location ? `/${location.name.toLowerCase()}` : ''}${industry ? `/${industry.name.toLowerCase().replace(/\s+/g, '-')}` : ''}`,
    },
  };

  // Add robots directives if noIndex is true
  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
      ...seoConfig.robotsProps,
    };
  }

  return metadata;
}

/**
 * Generates structured data (JSON-LD) for pages
 */
export function generateStructuredData({
  type = 'WebPage',
  location,
  industry,
  ...props
}: {
  type?: 'WebPage' | 'BlogPosting' | 'Service' | 'FAQPage';
  location?: MetadataParams['location'];
  industry?: MetadataParams['industry'];
  [key: string]: any;
}) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    name: props.title || seoConfig.defaultTitle,
    description: props.description || seoConfig.defaultDescription,
    url: `${siteConfig.url}${location ? `/${location.name.toLowerCase()}` : ''}${industry ? `/${industry.name.toLowerCase().replace(/\s+/g, '-')}` : ''}`,
    datePublished: props.datePublished || new Date().toISOString(),
    dateModified: props.dateModified || new Date().toISOString(),
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
  };

  // Add type-specific properties
  switch (type) {
    case 'BlogPosting':
      return {
        ...baseSchema,
        author: {
          '@type': 'Person',
          name: props.author || 'Immortal SEO Team',
        },
        image: props.image || `${siteConfig.url}${siteConfig.ogImage}`,
        headline: props.headline || props.title || seoConfig.defaultTitle,
      };
    case 'Service':
      return {
        ...baseSchema,
        provider: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url,
        },
        areaServed: location ? {
          '@type': 'Place',
          name: location.name,
          address: {
            '@type': 'PostalAddress',
            addressLocality: location.name,
            addressRegion: location.region,
            addressCountry: location.country,
          },
        } : undefined,
        serviceType: industry?.name || props.serviceType || 'SEO Services',
      };
    case 'FAQPage':
      return {
        ...baseSchema,
        mainEntity: props.faqs || [],
      };
    default:
      return baseSchema;
  }
}