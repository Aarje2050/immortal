// src/lib/seo.ts
import fs from 'fs';
import path from 'path';
import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories } from './blog/wp-api';

// Define shared sitemap entry type
export type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency?: ChangeFrequency;
  priority?: number;
};

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

// Interface for case studies
interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  featured: boolean;
  // Add other properties as needed
}

// Interface for Tools
interface Tool {
  id: string;
  name: string;
  slug: string;
  status: 'available' | 'coming-soon';
  // Add other properties as needed
}

// Import the types from wp-api.ts if they're not duplicated
// We're also declaring them here for convenience in case the imports fail
// These should match the interfaces in wp-api.ts

// WordPress Post interface (simplified version - should match wp-api.ts)
interface Post {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  modified: string;
}

// WordPress Category interface (simplified version - should match wp-api.ts)
interface Category {
  id: number;
  count: number;
  description: string;
  name: string;
  slug: string;
  parent: number;
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
 * Loads all case studies
 */
export async function loadAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'case-studies.json');
    
    if (!fs.existsSync(filePath)) {
      // Use our file from caseStudiesData.ts as a fallback
      const caseStudiesDataPath = path.join(process.cwd(), 'src', 'data', 'caseStudiesData.ts');
      
      if (fs.existsSync(caseStudiesDataPath)) {
        // We can't directly import a TS file, so let's use a require trick
        // This is a workaround for the example - in production, use proper JSON files
        const caseStudiesModule = require(caseStudiesDataPath).default;
        return caseStudiesModule;
      }
      
      return [];
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    return data;
  } catch (error) {
    console.error('Error loading case studies data:', error);
    return [];
  }
}

/**
 * Loads all tools
 */
export async function loadAllTools(): Promise<Tool[]> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'tools.json');
    
    if (!fs.existsSync(filePath)) {
      // Fallback to hardcoded tools if needed
      return [
        {
          id: 'seo-cost-calculator',
          name: 'Free SEO Cost Calculator',
          slug: 'seo-cost-calculator',
          status: 'available'
        },
        {
          id: 'llms-txt',
          name: 'LLMs.txt Generator',
          slug: 'llms-txt-generator',
          status: 'available'
        },
        {
          id: 'robots-txt',
          name: 'Robots.txt Generator',
          slug: 'robots-txt-generator',
          status: 'available'
        },
        // Add more tools as needed
      ];
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    return data;
  } catch (error) {
    console.error('Error loading tools data:', error);
    return [];
  }
}

/**
 * Loads all services
 */
export async function loadAllServices(): Promise<Record<string, any>> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'services.json');
    
    if (!fs.existsSync(filePath)) return {};
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    return data;
  } catch (error) {
    console.error('Error loading services data:', error);
    return {};
  }
}

/**
 * Generates a robots.txt file
 */
export function generateRobots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: ['/',
      '?page=*'],
      disallow: [
        '/admin/', 
        '/api/',
        '*/amp/',        // Disallow AMP pages if you don't use them
        '*/print/',      // Disallow print versions
        '/wp-admin/',    // WordPress admin if using headless WordPress
        '/wp-includes/', // WordPress includes
        '*/preview/',    // Preview pages
        '*?*',           // URLs with query parameters if they duplicate content
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`, // Main sitemap index
  };
}

/**
 * Generates a sitemap index that links to all other sitemaps
 */
export async function generateSitemapIndex(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
  const lastModified = new Date();
  
  // Define sitemap index entries with proper type
  const sitemapIndex: SitemapEntry[] = [
    {
      url: `${baseUrl}/static-sitemap.xml`,
      lastModified,
    },
    {
      url: `${baseUrl}/services-sitemap.xml`,
      lastModified,
    },
    {
      url: `${baseUrl}/blog-sitemap.xml`,
      lastModified,
    },
    {
      url: `${baseUrl}/case-studies-sitemap.xml`,
      lastModified,
    },
    {
      url: `${baseUrl}/tools-sitemap.xml`,
      lastModified,
    },
    // Uncomment these when you're ready to add location and industry sitemaps
    /*
    {
      url: `${baseUrl}/locations-sitemap.xml`,
      lastModified,
    },
    {
      url: `${baseUrl}/industries-sitemap.xml`,
      lastModified,
    },
    {
      url: `${baseUrl}/location-industry-sitemap.xml`,
      lastModified,
    },
    */
  ];
  
  return sitemapIndex;
}

/**
 * Generates the static pages sitemap
 */
export async function generateStaticSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://immortalseo.com';
  
  // Static pages with their priorities and change frequencies
  const staticPages: SitemapEntry[] = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
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
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.9,
    },
  ];
  
  return staticPages;
}

/**
 * Generates the services sitemap
 */
export async function generateServicesSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://immortalseo.com';
  
  // Get services data
  const services = await loadAllServices();
  
  // Create sitemap entries for each service
  const servicePages: SitemapEntry[] = Object.entries(services).map(([slug, service]) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.8,
  }));
  
  return servicePages;
}

/**
 * Generates the blog sitemap from WordPress API
 */
export async function generateBlogSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://immortalseo.com';
  
  // Define the type for sitemap entries
  type SitemapEntry = {
    url: string;
    lastModified: Date;
    changeFrequency?: ChangeFrequency;
    priority?: number;
  };
  
  // Initialize with the correct type
  let blogEntries: SitemapEntry[] = [];
  
  try {
    // Get all posts from WordPress
    const postsData = await getAllPosts(1, 100);
    const posts = postsData.posts as Post[]; // Use the Post interface from wp-api.ts
    
    // Create sitemap entries for each blog post
    const postEntries: SitemapEntry[] = posts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.modified),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.7,
    }));
    
    blogEntries = [...postEntries];
    
    // Get all categories
    const categories = await getAllCategories() as Category[]; // Use the Category interface from wp-api.ts
    
    // Create sitemap entries for each category
    const categoryEntries: SitemapEntry[] = categories.map((category: Category) => ({
      url: `${baseUrl}/blog/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.6,
    }));
    
    blogEntries = [...blogEntries, ...categoryEntries];
    
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
  }
  
  return blogEntries;
}

/**
 * Generates the case studies sitemap
 */
export async function generateCaseStudiesSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://immortalseo.com';
  
  // Get case studies data
  const caseStudies = await loadAllCaseStudies();
  
  // Create sitemap entries for each case study
  const caseStudyPages: SitemapEntry[] = caseStudies.map(caseStudy => ({
    url: `${baseUrl}/case-studies/${caseStudy.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.8,
  }));
  
  return caseStudyPages;
}

/**
 * Generates the tools sitemap
 */
export async function generateToolsSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://immortalseo.com';
  
  // Get tools data
  const tools = await loadAllTools();
  
  // Create sitemap entries for each available tool
  const toolPages: SitemapEntry[] = tools
    .filter(tool => tool.status === 'available')
    .map(tool => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.7,
    }));
  
  return toolPages;
}

/**
 * Generates the locations sitemap
 */
export async function generateLocationsSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://immortalseo.com';
  
  // Get locations data
  const locations = await loadAllLocationData();
  
  // Create sitemap entries for each location
  const locationPages: SitemapEntry[] = locations.map(location => ({
    url: `${baseUrl}/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.7,
  }));
  
  return locationPages;
}

/**
 * Generates the industries sitemap
 */
export async function generateIndustriesSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://immortalseo.com';
  
  // Get industries data
  const industries = await loadAllIndustryData();
  
  // Create sitemap entries for each industry
  const industryPages: SitemapEntry[] = industries.map(industry => ({
    url: `${baseUrl}/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.7,
  }));
  
  return industryPages;
}

/**
 * Generates the location-industry combinations sitemap
 */
export async function generateLocationIndustrySitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://immortalseo.com';
  
  // Get locations and industries data
  const locations = await loadAllLocationData();
  const industries = await loadAllIndustryData();
  
  // Create sitemap entries for each location-industry combination
  const combinedPages: SitemapEntry[] = [];
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
  
  return combinedPages;
}

/**
 * Legacy function for backwards compatibility
 * Now directs to the sitemap index
 */
export async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  return await generateSitemapIndex();
}