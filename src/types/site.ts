// src/types/site.ts

export interface NavigationItem {
    name: string;
    href: string;
  }
  
  export interface ContactInfo {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  }
  
  export interface CompanyInfo {
    founded: string;
    teamSize: string;
    values: string[];
  }
  
  export interface ServiceItem {
    id: string;
    name: string;
    slug: string;
    shortDescription: string;
  }
  
  export interface SocialLinks {
    twitter: string;
    linkedin: string;
    facebook: string;
    instagram: string;
    [key: string]: string;
  }
  
  export interface Navigation {
    main: NavigationItem[];
    services: NavigationItem[];
    legal: NavigationItem[];
    [key: string]: NavigationItem[];
  }
  
  export interface SiteConfig {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    links: SocialLinks;
    contact: ContactInfo;
    companyInfo: CompanyInfo;
    mainServices: ServiceItem[];
    navigation: Navigation;
  }
  
  export interface LocationData {
    slug: string;
    country: string;
    name: string;
    province?: string;
    population?: number;
    keyIndustries?: string[];
    localKeywords?: string[];
    competitionLevel?: string;
    metaTitle?: string;
    metaDescription?: string;
    headerImage?: string;
    customContent?: {
      intro?: string;
      challenges?: string;
      solutions?: string;
    };
    localStatistics?: {
      internetPenetration?: number;
      mobileUsage?: number;
      localSearches?: string;
      voiceSearchTrend?: string;
      [key: string]: any;
    };
    faq?: Array<{ question: string; answer: string }>;
    testimonials?: Array<{ quote: string; author: string; position: string; company: string }>;
    [key: string]: any;
  }
  
  export interface IndustryData {
    slug: string;
    name: string;
    description?: string;
    keyPhrases?: string[];
    challenges?: string[];
    metaTitle?: string;
    metaDescription?: string;
    headerImage?: string;
    sections?: {
      intro?: string;
      painPoints?: string;
      approach?: string;
      [key: string]: any;
    };
    strategies?: Array<{ name: string; description: string }>;
    statistics?: Record<string, string | number>;
    faq?: Array<{ question: string; answer: string }>;
    caseStudies?: Array<{ title: string; summary: string; results: string[] }>;
    relatedServices?: string[];
    [key: string]: any;
  }
  
  export interface ServiceData {
    name: string;
    slug: string;
    shortDescription: string;
    longDescription: string;
    metaTitle: string;
    metaDescription: string;
    icon: string;
    benefits: string[];
    process: Array<{
      title: string;
      description: string;
    }>;
    faq?: Array<{
      question: string;
      answer: string;
    }>;
    caseStudies?: Array<{
      title: string;
      description: string;
      results: string[];
    }>;
  }
  
  export interface ServicesData {
    [key: string]: ServiceData;
  }
  
  // Allowed values for changeFrequency in sitemap
  export type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';