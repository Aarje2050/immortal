// src/lib/schema/generators.ts
import { 
    BaseSchema, OrganizationSchema, WebSiteSchema, WebPageSchema, 
    ArticleSchema, ServiceSchema, FAQPageSchema, ProductSchema,
    BreadcrumbListSchema, ListItemSchema, QuestionSchema,
    LocalBusinessSchema, PersonSchema
  } from './types';
  import { getSchemaContext } from './context';
  import { addId } from './utils';
  
  /**
   * Generates WebPage schema
   */
  export function generateWebPageSchema({
    url,
    title,
    description,
    image,
    datePublished,
    dateModified,
    breadcrumbs,
  }: {
    url: string;
    title: string;
    description?: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    breadcrumbs?: Array<{ name: string; url: string }>;
  }): WebPageSchema {
    const context = getSchemaContext();
    const schema: WebPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url,
      name: title,
      description: description || undefined,
      isPartOf: context.website,
      datePublished: datePublished || new Date().toISOString(),
      dateModified: dateModified || new Date().toISOString(),
    };
  
    if (image) {
      schema.primaryImageOfPage = {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        url: image,
      };
    }
  
    if (breadcrumbs && breadcrumbs.length) {
      schema.breadcrumb = generateBreadcrumbListSchema(breadcrumbs);
    }
  
    return addId(schema, url);
  }
  
  /**
   * Generates Article schema (BlogPosting extends Article)
   */
  export function generateArticleSchema({
    type = 'Article',
    url,
    title,
    description,
    image,
    datePublished,
    dateModified,
    author,
    content,
    keywords,
  }: {
    type?: 'Article' | 'BlogPosting' | 'NewsArticle';
    url: string;
    title: string;
    description?: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    author: PersonSchema | { name: string; url?: string };
    content?: string;
    keywords?: string;
  }): ArticleSchema {
    const context = getSchemaContext();
    
    // Ensure author has proper schema format
    const authorSchema: PersonSchema = (author as PersonSchema)['@type'] 
      ? author as PersonSchema
      : {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: (author as { name: string }).name,
          url: (author as { url?: string }).url,
        };
  
    const schema: ArticleSchema = {
      '@context': 'https://schema.org',
      '@type': type,
      headline: title,
      description: description,
      author: authorSchema,
      publisher: context.organization,
      datePublished,
      dateModified: dateModified || datePublished,
      mainEntityOfPage: url,
      keywords: keywords,
    };
  
    if (image) {
      schema.image = {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        url: image,
      };
    }
  
    if (content) {
      schema.articleBody = content;
    }
  
    return addId(schema, url);
  }
  
  /**
 * Generates Service schema
 */
export function generateServiceSchema({
    url,
    name,
    description,
    serviceType,
    areaServed,
    offers,
  }: {
    url: string;
    name: string;
    description?: string;
    serviceType?: string;
    areaServed?: string | { name: string; geo?: { latitude: number; longitude: number } };
    offers?: { price?: number; priceCurrency?: string; description?: string };
  }): ServiceSchema {
    const context = getSchemaContext();
    
    const schema: ServiceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      description,
      provider: context.organization,
      serviceType: serviceType || name,
    };
  
    // Handle areaServed properly
    if (areaServed) {
      if (typeof areaServed === 'string') {
        schema.areaServed = areaServed;
      } else {
        // Create a PlaceSchema object with the correct structure
        const placeSchema: any = {
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: areaServed.name,
        };
        
        // Add geo coordinates if provided
        if (areaServed.geo) {
          placeSchema.geo = {
            '@context': 'https://schema.org',
            '@type': 'GeoCoordinates',
            latitude: areaServed.geo.latitude,
            longitude: areaServed.geo.longitude,
          };
        }
        
        schema.areaServed = placeSchema;
      }
    }
  
    // Handle offers if provided
    if (offers) {
      schema.offers = {
        '@context': 'https://schema.org',
        '@type': 'Offer',
        price: offers.price,
        priceCurrency: offers.priceCurrency,
      };
    }
  
    return addId(schema, url);
  }
  /**
   * Generates BreadcrumbList schema
   */
  export function generateBreadcrumbListSchema(
    items: Array<{ name: string; url: string }>
  ): BreadcrumbListSchema {
    const schema: BreadcrumbListSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@context': 'https://schema.org',
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  
    return schema;
  }
  
  /**
   * Generates FAQPage schema
   */
  export function generateFAQPageSchema(
    faqs: Array<{ question: string; answer: string }>
  ): FAQPageSchema {
    const schema: FAQPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@context': 'https://schema.org',
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@context': 'https://schema.org',
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  
    return schema;
  }
  
  /**
   * Generates LocalBusiness schema
   */
  export function generateLocalBusinessSchema({
    name,
    url,
    logo,
    description,
    telephone,
    email,
    address,
    geo,
    openingHours,
    priceRange,
    sameAs,
  }: {
    name: string;
    url: string;
    logo?: string;
    description?: string;
    telephone: string;
    email?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    geo?: { latitude: number; longitude: number };
    openingHours?: Array<{
      days: string[];
      opens: string;
      closes: string;
    }>;
    priceRange?: string;
    sameAs?: string[];
  }): LocalBusinessSchema {
    const schema: LocalBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${url}#localbusiness`,
      name,
      url,
      description,
      telephone,
      priceRange,
      sameAs,
      address: {
        '@context': 'https://schema.org',
        '@type': 'PostalAddress',
        streetAddress: address.street,
        addressLocality: address.city,
        addressRegion: address.state,
        postalCode: address.zip,
        addressCountry: address.country,
      },
    };
  
    if (logo) {
      schema.logo = {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        url: logo,
      };
    }
  
    if (geo) {
      schema.geo = {
        '@context': 'https://schema.org',
        '@type': 'GeoCoordinates',
        latitude: geo.latitude,
        longitude: geo.longitude,
      };
    }
  
    if (openingHours && openingHours.length) {
      schema.openingHoursSpecification = openingHours.map(hours => ({
        '@context': 'https://schema.org',
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: hours.days,
        opens: hours.opens,
        closes: hours.closes,
      }));
    }
  
    if (email) {
      schema.contactPoint = [
        {
          '@context': 'https://schema.org',
          '@type': 'ContactPoint',
          telephone,
          contactType: 'customer service',
          email,
        },
      ];
    }
  
    return schema;
  }
  
  /**
   * Combines multiple schema objects into a graph
   */
  export function generateSchemaGraph(schemas: BaseSchema[]): Record<string, any> {
    return {
      '@context': 'https://schema.org',
      '@graph': schemas,
    };
  }