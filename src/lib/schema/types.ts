// Adding types for all Schemas //

// Base Schema type that all schemas will extend
export interface BaseSchema {
    '@context': string;
    '@type': string;
    '@id'?: string;
    [key: string]: any; 
  }
  
  // Organization schema
  export interface OrganizationSchema extends BaseSchema {
    name: string;
    url: string;
    logo?: ImageSchema;
    sameAs?: string[];
    description?: string;
    contactPoint?: ContactPointSchema[];
    address?: PostalAddressSchema;
    foundingDate?: string;
  }
  
  // WebSite schema
  export interface WebSiteSchema extends BaseSchema {
    name: string;
    url: string;
    description?: string;
    publisher?: OrganizationSchema;
    potentialAction?: SearchActionSchema;
  }
  
  // WebPage schema
  export interface WebPageSchema extends BaseSchema {
    url: string;
    name: string;
    description?: string;
    isPartOf?: WebSiteSchema;
    primaryImageOfPage?: ImageSchema;
    datePublished?: string;
    dateModified?: string;
    breadcrumb?: BreadcrumbListSchema;
  }
  
  // BreadcrumbList schema
  export interface BreadcrumbListSchema extends BaseSchema {
    itemListElement: ListItemSchema[];
  }
  
  // ListItem schema (for breadcrumbs)
  export interface ListItemSchema extends BaseSchema {
    position: number;
    name: string;
    item: string;
  }
  
  // Product schema
  export interface ProductSchema extends BaseSchema {
    name: string;
    description?: string;
    image?: string | string[] | ImageSchema;
    offers?: OfferSchema;
    brand?: OrganizationSchema;
    sku?: string;
  }
  
  // Service schema
  export interface ServiceSchema extends BaseSchema {
    name: string;
    description?: string;
    provider?: OrganizationSchema;
    serviceType?: string;
    areaServed?: string | GeoSchema;
    offers?: OfferSchema;
  }
  
  // Article/BlogPosting schema
  export interface ArticleSchema extends BaseSchema {
    headline: string;
    image?: string | string[] | ImageSchema;
    datePublished: string;
    dateModified?: string;
    author: PersonSchema | OrganizationSchema;
    publisher: OrganizationSchema;
    description?: string;
    articleBody?: string;
    keywords?: string;
    mainEntityOfPage?: string | WebPageSchema;
  }
  
  // FAQPage schema
  export interface FAQPageSchema extends BaseSchema {
    mainEntity: QuestionSchema[];
  }
  
  // Question schema for FAQs
  export interface QuestionSchema extends BaseSchema {
    name: string;
    acceptedAnswer: AnswerSchema;
  }
  
  // Answer schema for FAQs
  export interface AnswerSchema extends BaseSchema {
    text: string;
  }
  
  // ImageObject schema
  export interface ImageSchema extends BaseSchema {
    url: string;
    width?: number;
    height?: number;
    caption?: string;
  }
  
  // SearchAction schema
  export interface SearchActionSchema extends BaseSchema {
    target: string;
    'query-input': string;
  }
  
  // ContactPoint schema
  export interface ContactPointSchema extends BaseSchema {
    telephone: string;
    contactType: string;
    email?: string;
    areaServed?: string | string[];
    availableLanguage?: string | string[];
  }
  
  // PostalAddress schema
  export interface PostalAddressSchema extends BaseSchema {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  }
  
  // Offer schema
  export interface OfferSchema extends BaseSchema {
    price?: number;
    priceCurrency?: string;
    availability?: string;
    url?: string;
    priceValidUntil?: string;
  }
  
  // Person schema
  export interface PersonSchema extends BaseSchema {
    name: string;
    url?: string;
    image?: string | ImageSchema;
    jobTitle?: string;
    worksFor?: OrganizationSchema;
    sameAs?: string[];
  }
  
  // Geo schema
  export interface GeoSchema extends BaseSchema {
    latitude: number;
    longitude: number;
    
  }
  
  // LocalBusiness schema
  export interface LocalBusinessSchema extends OrganizationSchema {
    priceRange?: string;
    address: PostalAddressSchema;
    geo?: GeoSchema;
    openingHoursSpecification?: OpeningHoursSpecificationSchema[];
    image?: string; 
    telephone?: string;
  }
  
  // OpeningHoursSpecification schema
  export interface OpeningHoursSpecificationSchema extends BaseSchema {
    dayOfWeek: string | string[];
    opens: string;
    closes: string;
  }
  
  // Schema context type for organization-wide data
  export interface SchemaContext {
    organization: OrganizationSchema;
    website: WebSiteSchema;
    localBusiness?: LocalBusinessSchema;
  }

  // Review/Testimonial schema
export interface ReviewSchema extends BaseSchema {
  author: PersonSchema;
  reviewBody: string;
  datePublished: string;
  itemReviewed: ProductSchema | ServiceSchema | OrganizationSchema;
  reviewRating?: {
    '@type': string;
    ratingValue: number;
    bestRating?: number;
    worstRating?: number;
  };
}

// HowTo schema
export interface HowToSchema extends BaseSchema {
  name: string;
  description: string;
  step: HowToStepSchema[];
  totalTime?: string;
  image?: ImageSchema;
}

// HowToStep schema
export interface HowToStepSchema extends BaseSchema {
  position: number;
  name: string;
  text: string;
  image?: ImageSchema;
}

// Course schema
export interface CourseSchema extends BaseSchema {
  name: string;
  description: string;
  provider: OrganizationSchema;
  url: string;
  courseCode?: string;
  coursePrerequisites?: string | string[];
  educationalLevel?: string;
  learningResourceType?: string;
  hasCourseInstance?: CourseInstanceSchema[];
}

// CourseInstance schema
export interface CourseInstanceSchema extends BaseSchema {
  name: string;
  startDate: string;
  endDate: string;
  location?: PlaceSchema;
}

// Place schema
export interface PlaceSchema extends BaseSchema {
  name: string;
  address?: PostalAddressSchema;
  geo?: GeoSchema;
}