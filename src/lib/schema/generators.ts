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
  provider,
  sameAs,
}: {
  url: string;
  name: string;
  description?: string;
  serviceType?: string;
  areaServed?: string | { name: string; geo?: { latitude: number; longitude: number } };
  offers?: { 
    price?: string | number; // Accept both string and number
    priceCurrency?: string; 
    description?: string;
  };
  provider?: {
    '@type': string;
    name: string;
    url: string;
  };
  sameAs?: string[];
}): any {
  const context = getSchemaContext();
  
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: provider || context.organization,
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
    // Parse price to number if it's a string
    let numericPrice: number | undefined = undefined;
    
    if (offers.price !== undefined) {
      if (typeof offers.price === 'string') {
        // Extract numeric part from string (e.g., "$1,500/month" -> 1500)
        const matches = offers.price.match(/[\d,.]+/);
        if (matches && matches.length > 0) {
          numericPrice = parseFloat(matches[0].replace(/,/g, ''));
        }
      } else {
        numericPrice = offers.price;
      }
    }
    
    schema.offers = {
      '@context': 'https://schema.org',
      '@type': 'Offer',
      ...(numericPrice !== undefined && { price: numericPrice }),
      priceCurrency: offers.priceCurrency || 'USD',
      ...(offers.description && { description: offers.description }),
    };
  }

  // Add sameAs if provided
  if (sameAs && sameAs.length > 0) {
    schema.sameAs = sameAs;
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
 * Generates TableOfContents schema (as ItemList)
 */
export function generateTableOfContentsSchema({
  name,
  itemListElement,
}: {
  name: string;
  itemListElement: Array<{ position: number; name: string; url: string }>;
}): any {
  // Use 'any' here or create a specific interface
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: itemListElement.map(item => ({
      '@context': 'https://schema.org',
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generates Testimonial/Review schema
 */
export function generateTestimonialSchema({
  author,
  reviewBody,
  datePublished,
  itemReviewed,
  ratingValue,
  bestRating = 5,
  worstRating = 1,
}: {
  author: string;
  reviewBody: string;
  datePublished: string;
  itemReviewed: {
    '@type': string;
    name: string;
    url?: string;
  };
  ratingValue?: number;
  bestRating?: number;
  worstRating?: number;
}): any {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: author,
    },
    reviewBody,
    datePublished,
    itemReviewed: {
      '@context': 'https://schema.org',
      ...itemReviewed,
    },
  };

  if (ratingValue !== undefined) {
    schema.reviewRating = {
      '@context': 'https://schema.org',
      '@type': 'Rating',
      ratingValue,
      bestRating,
      worstRating,
    };
  }

  return schema;
}

/**
 * Generates AggregateRating schema for multiple reviews
 */
export function generateAggregateRatingFromReviews(
  reviews: Array<{
    ratingValue?: number;
  }>
): any {
  const ratings = reviews
    .map(r => r.ratingValue)
    .filter((r): r is number => r !== undefined);
  
  if (ratings.length === 0) return null;

  const averageRating = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    reviewCount: ratings.length,
    bestRating: 5,
    worstRating: 1,
  };
}

/**
 * Generates Comparison schema (as ItemList)
 */
export function generateComparisonSchema({
  name,
  itemListElement,
}: {
  name: string;
  itemListElement: Array<{ 
    position: number; 
    name: string; 
    description: string;
    url?: string;
  }>;
}): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: itemListElement.map(item => ({
      '@context': 'https://schema.org',
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      description: item.description,
      ...(item.url && { url: item.url }),
    })),
  };
}

/**
 * Generates HowTo schema for step-by-step processes
 */
export function generateHowToSchema({
  name,
  description,
  steps,
  totalTime,
  image,
}: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string; image?: string }>;
  totalTime?: string; // ISO 8601 duration format, e.g., "PT2H30M"
  image?: string;
}): any {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@context': 'https://schema.org',
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: {
          '@context': 'https://schema.org',
          '@type': 'ImageObject',
          url: step.image,
        },
      }),
    })),
  };

  if (totalTime) {
    schema.totalTime = totalTime;
  }

  if (image) {
    schema.image = {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      url: image,
    };
  }

  return schema;
}

/**
 * Generates CourseSchema for educational content
 */
export function generateCourseSchema({
  name,
  description,
  provider,
  url,
  courseCode,
  coursePrerequisites,
  educationalLevel,
  learningResourceType,
  hasCourseInstance,
}: {
  name: string;
  description: string;
  provider: {
    name: string;
    url?: string;
  };
  url: string;
  courseCode?: string;
  coursePrerequisites?: string | string[];
  educationalLevel?: string;
  learningResourceType?: string;
  hasCourseInstance?: Array<{
    name: string;
    startDate: string;
    endDate: string;
    location?: string;
  }>;
}): any {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: provider.name,
      ...(provider.url && { url: provider.url }),
    },
    url,
  };

  if (courseCode) {
    schema.courseCode = courseCode;
  }

  if (coursePrerequisites) {
    schema.coursePrerequisites = coursePrerequisites;
  }

  if (educationalLevel) {
    schema.educationalLevel = educationalLevel;
  }

  if (learningResourceType) {
    schema.learningResourceType = learningResourceType;
  }

  if (hasCourseInstance && hasCourseInstance.length > 0) {
    schema.hasCourseInstance = hasCourseInstance.map(instance => ({
      '@context': 'https://schema.org',
      '@type': 'CourseInstance',
      name: instance.name,
      startDate: instance.startDate,
      endDate: instance.endDate,
      ...(instance.location && {
        location: {
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: instance.location,
        },
      }),
    }));
  }

  return schema;
}

/**
 * Generates SoftwareApplication schema for SEO tools
 */
export function generateSoftwareApplicationSchema({
  name,
  description,
  url,
  applicationCategory,
  operatingSystem,
  offers,
  screenshot,
  author,
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price?: string | number;
    priceCurrency?: string;
  };
  screenshot?: string;
  author?: {
    name: string;
    url?: string;
  };
}): any {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
  };

  if (applicationCategory) {
    schema.applicationCategory = applicationCategory;
  }

  if (operatingSystem) {
    schema.operatingSystem = operatingSystem;
  }

  if (offers) {
    schema.offers = {
      '@context': 'https://schema.org',
      '@type': 'Offer',
      ...(offers.price && { price: offers.price }),
      priceCurrency: offers.priceCurrency || 'USD',
    };
  }

  if (screenshot) {
    schema.screenshot = {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      url: screenshot,
    };
  }

  if (author) {
    schema.author = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: author.name,
      ...(author.url && { url: author.url }),
    };
  }

  return addId(schema, url);
}

/**
 * Generates CollectionPage schema for listing pages
 */
export function generateCollectionPageSchema({
  url,
  name,
  description,
  mainEntity,
  numberOfItems,
}: {
  url: string;
  name: string;
  description?: string;
  mainEntity?: any[];
  numberOfItems?: number;
}): any {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url,
    name,
    ...(description && { description }),
    ...(numberOfItems && { numberOfItems }),
  };

  if (mainEntity && mainEntity.length > 0) {
    schema.mainEntity = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      numberOfItems: mainEntity.length,
      itemListElement: mainEntity.map((item, index) => ({
        '@context': 'https://schema.org',
        '@type': 'ListItem',
        position: index + 1,
        item: item,
      })),
    };
  }

  return addId(schema, url);
}

/**
 * Generates Event schema for webinars, workshops, etc.
 */
export function generateEventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  organizer,
  offers,
  eventStatus,
  eventAttendanceMode,
}: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: {
    name: string;
    address?: string;
    url?: string;
  };
  organizer: {
    name: string;
    url?: string;
  };
  offers?: {
    price?: string | number;
    priceCurrency?: string;
    availability?: string;
  };
  eventStatus?: string;
  eventAttendanceMode?: string;
}): any {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate,
    organizer: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: organizer.name,
      ...(organizer.url && { url: organizer.url }),
    },
  };

  if (endDate) {
    schema.endDate = endDate;
  }

  if (location) {
    schema.location = {
      '@context': 'https://schema.org',
      '@type': 'Place',
      name: location.name,
      ...(location.address && { address: location.address }),
      ...(location.url && { url: location.url }),
    };
  }

  if (offers) {
    schema.offers = {
      '@context': 'https://schema.org',
      '@type': 'Offer',
      ...(offers.price && { price: offers.price }),
      priceCurrency: offers.priceCurrency || 'USD',
      ...(offers.availability && { availability: offers.availability }),
    };
  }

  if (eventStatus) {
    schema.eventStatus = eventStatus;
  }

  if (eventAttendanceMode) {
    schema.eventAttendanceMode = eventAttendanceMode;
  }

  return schema;
}

/**
 * Generates VideoObject schema for video content
 */
export function generateVideoObjectSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  publisher,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
  publisher: {
    name: string;
    url?: string;
  };
}): any {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      url: thumbnailUrl,
    },
    uploadDate,
    publisher: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: publisher.name,
      ...(publisher.url && { url: publisher.url }),
    },
  };

  if (duration) {
    schema.duration = duration;
  }

  if (contentUrl) {
    schema.contentUrl = contentUrl;
  }

  if (embedUrl) {
    schema.embedUrl = embedUrl;
  }

  return schema;
}

/**
 * Generates AggregateRating schema for reviews/ratings
 */
export function generateAggregateRatingSchema({
  ratingValue,
  reviewCount,
  bestRating = 5,
  worstRating = 1,
}: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue,
    reviewCount,
    bestRating,
    worstRating,
  };
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