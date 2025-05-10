// src/types/service.ts

export interface ServiceChallenge {
    title: string;
    description: string;
  }
  
  export interface SupplementaryContent {
    importance?: string;
    challenges?: ServiceChallenge[];
    differences?: string;
  }
  
  export interface ServiceExampleCategory {
    category: string;
    items: string[];
  }
  
  export interface ComparisonPoint {
    feature: string;
    hasFeature: boolean;
    partialText?: string;
    competitors: boolean[];
  }
  
  export interface ResourceItem {
    title: string;
    description: string;
    url: string;
    icon: string;
  }
  
  export interface Testimonial {
    quote: string;
    author: string;
    position: string;
    avatar?: string;
  }
  
  export interface ServiceData {
    name: string;
    slug: string;
    category: string;
    shortDescription: string;
    longDescription: string;
    metaTitle: string;
    metaDescription: string;
    icon: string;
    primaryKeywords?: string[];
    benefits: string[];
    process: Array<{ title: string; description: string }>;
    faq?: Array<{ question: string; answer: string }>;
    caseStudies?: Array<{ 
      title: string; 
      description: string; 
      results: string[];
    }>;
    price?: string;
    publishedDate?: string;
    updatedDate?: string;
    sameAs?: string[];
    
    // Enhanced fields for SEO optimization
    supplementaryContent?: SupplementaryContent;
    serviceExamples?: ServiceExampleCategory[];
    comparisonPoints?: ComparisonPoint[];
    resources?: ResourceItem[];
    testimonials?: Testimonial[];
    
    // Additional optional fields
    displaySections?: {
      supplementaryContent?: boolean;
      serviceExamples?: boolean;
      comparison?: boolean;
      resources?: boolean;
      testimonials?: boolean;
    };
  }