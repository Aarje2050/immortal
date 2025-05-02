// src/lib/seo.ts
import fs from 'fs';
import path from 'path';
import { MetadataRoute } from 'next';

// Define types for our data structures
interface LocationData {
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
  localStatistics?: Record<string, any>;
  faq?: Array<{ question: string; answer: string }>;
  testimonials?: Array<{ quote: string; author: string; position: string; company: string }>;
  [key: string]: any;
}

interface IndustryData {
  slug: string;
  name: string;
  description?: string;
  keyPhrases?: string[];
  challenges?: string[];
  metaTitle?: string;
  metaDescription?: string;
  headerImage?: string;
  sections?: Record<string, any>;
  strategies?: Array<{ name: string; description: string }>;
  statistics?: Record<string, string | number>;
  faq?: Array<{ question: string; answer: string }>;
  caseStudies?: Array<{ title: string; summary: string; results: string[] }>;
  relatedServices?: string[];
  [key: string]: any;
}

// Allowed values for changeFrequency in sitemap
type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

/**
 * Loads all location data
 */
export async function loadAllLocationData(): Promise<LocationData[]> {
  const countries = ['canada', 'usa', 'india'];
  let allLocations: LocationData[] = [];

  for (const country of countries) {
    try {
      const countryDir = path.join(process.cwd(), 'src', 'data', 'locations', country);
      
      if (!fs.existsSync(countryDir)) continue;
      
      const files = fs.readdirSync(countryDir);
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(countryDir, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const data = JSON.parse(fileContent);
          
          // Transform the object format to array format
          const locations = Object.entries(data).map(([slug, details]: [string, any]) => ({
            slug,
            country,
            ...details,
          }));
          
          allLocations = [...allLocations, ...locations];
        }
      }
    } catch (error) {
      console.error(`Error loading locations for ${country}:`, error);
    }
  }

  return allLocations;
}

/**
 * Loads data for a specific location
 */
export async function loadLocationData(slug: string): Promise<LocationData | null> {
  const countries = ['canada', 'usa', 'india'];
  
  for (const country of countries) {
    try {
      const countryDir = path.join(process.cwd(), 'src', 'data', 'locations', country);
      
      if (!fs.existsSync(countryDir)) continue;
      
      const files = fs.readdirSync(countryDir);
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(countryDir, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const data = JSON.parse(fileContent);
          
          if (data[slug]) {
            return {
              ...data[slug],
              slug,
              country,
            };
          }
        }
      }
    } catch (error) {
      console.error(`Error loading location ${slug} for ${country}:`, error);
    }
  }

  return null;
}

/**
 * Loads all industry data
 */
export async function loadAllIndustryData(): Promise<IndustryData[]> {
  try {
    const industriesDir = path.join(process.cwd(), 'src', 'data', 'industries');
    const files = fs.readdirSync(industriesDir);
    
    let allIndustries: IndustryData[] = [];
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(industriesDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);
        
        allIndustries.push({
          slug: file.replace('.json', ''),
          ...data,
        });
      }
    }
    
    return allIndustries;
  } catch (error) {
    console.error('Error loading industry data:', error);
    return [];
  }
}

/**
 * Loads data for a specific industry
 */
export async function loadIndustryData(slug: string): Promise<IndustryData | null> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'industries', `${slug}.json`);
    
    if (!fs.existsSync(filePath)) return null;
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    return {
      ...data,
      slug,
    };
  } catch (error) {
    console.error(`Error loading industry data for ${slug}:`, error);
    return null;
  }
}

/**
 * Generates a robots.txt file
 */
export function generateRobots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: 'https://immortalseo.com/sitemap.xml',
  };
}

/**
 * Generates a sitemap
 */
export async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://immortalseo.com';
  
  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.9,
    },
  ];
  
  // Service pages
  const services = require('../data/services.json');
  const servicePages = Object.keys(services).map(service => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.8,
  }));
  
  // Location pages
  const locations = await loadAllLocationData();
  const locationPages = locations.map(location => ({
    url: `${baseUrl}/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.7,
  }));
  
  // Industry pages
  const industries = await loadAllIndustryData();
  const industryPages = industries.map(industry => ({
    url: `${baseUrl}/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.7,
  }));
  
  // Combined Industry + Location pages
  const combinedPages = [];
  for (const industry of industries) {
    for (const location of locations) {
      combinedPages.push({
        url: `${baseUrl}/${industry.slug}/${location.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as ChangeFrequency,
        priority: 0.6,
      });
    }
  }
  
  return [...staticPages, ...servicePages, ...locationPages, ...industryPages, ...combinedPages];
}