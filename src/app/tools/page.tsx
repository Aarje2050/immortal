// app/tools/page.tsx
import { Metadata } from 'next';
import ToolsPage from './ToolsPage'; // Assuming this is your client component
import JsonLd from '@/components/seo/JsonLd';
import { 
  getSchemaContext, 
  generateWebPageSchema, 
  generateSchemaGraph 
} from '@/lib/schema';

// Define the site URL
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
const pageUrl = `${baseUrl}/tools`;

export const metadata: Metadata = {
  title: 'Free SEO Tools | ImmortalSEO',
  description: 'Get access to our collection of free SEO tools designed to help you optimize your website, generate critical files, and improve your search visibility.',
  openGraph: {
    title: 'Free SEO & AI Tools | ImmortalSEO',
    description: 'Enhance your website optimization with our free SEO and AI tools. Generate robots.txt, LLMs.txt, analyze your site, and more.',
    images: '/images/og-seo-tools.jpg',
  },
  alternates: {
    canonical: pageUrl
  }
};

// Define TypeScript interfaces for tool data
interface ToolData {
  name: string;
  slug: string;
  description: string;
  category: string;
  isFree: boolean;
  screenshot?: string;
  featureList?: string[];
}

// Interface for tool categories
interface ToolCategoriesType {
  [category: string]: Array<{
    '@type': string;
    name: string;
    url: string;
    applicationCategory: string;
    description: string;
    offers?: {
      '@type': string;
      price: string;
      priceCurrency: string;
    };
  }>;
}

// Define tool data (you should replace this with your actual data source)
const toolsData: ToolData[] = [
  {
    name: 'LLMs.txt Generator',
    slug: 'llms-txt-generator',
    description: 'Create an LLMs.txt file to help AI models better understand and navigate your website content.',
    category: 'AI Tools',
    isFree: true
  },
  {
    name: 'Robots.txt Generator',
    slug: 'robots-txt-generator',
    description: 'Create a properly formatted robots.txt file to control how search engines crawl your website.',
    category: 'SEO Tools',
    isFree: true
  },
  {
    name: 'SEO Audit Checklist',
    slug: 'seo-audit-checklist',
    description: 'A comprehensive checklist to help you identify and fix SEO issues on your website.',
    category: 'SEO Tools',
    isFree: true
  },
  {
    name: 'Schema Markup Generator',
    slug: 'schema-generator',
    description: 'Generate schema markup for your website to enhance your search engine listings.',
    category: 'SEO Tools',
    isFree: true
  },
  {
    name: 'SEO Cost Calculator',
    slug: 'seo-cost-calculator',
    description: 'Calculate the estimated cost of SEO services based on your website and business needs.',
    category: 'SEO Tools',
    isFree: true
  }
];

export default function ToolsIndexPage() {
  // Get schema context
  const context = getSchemaContext();
  
  // Generate WebPage schema
  const webPageSchema = generateWebPageSchema({
    url: pageUrl,
    title: 'Free SEO Tools | ImmortalSEO',
    description: 'Get access to our collection of free SEO tools designed to help you optimize your website, generate critical files, and improve your search visibility.',
    image: `${baseUrl}/images/og-seo-tools.jpg`,
    breadcrumbs: [
      { name: 'Home', url: baseUrl },
      { name: 'Tools', url: pageUrl },
    ],
  });
  
  // Create ItemList schema for tools
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': toolsData.map((tool, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'SoftwareApplication',
        'name': tool.name,
        'url': `${baseUrl}/tools/${tool.slug}`,
        'applicationCategory': 'WebApplication',
        'operatingSystem': 'Web browser',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
          'availability': 'https://schema.org/OnlineOnly'
        },
        'description': tool.description,
        'provider': {
          '@type': 'Organization',
          '@id': `${baseUrl}/#organization`
        }
      }
    }))
  };
  
  // Group tools by category
  const toolCategories: ToolCategoriesType = {};
  
  toolsData.forEach(tool => {
    if (!toolCategories[tool.category]) {
      toolCategories[tool.category] = [];
    }
    
    toolCategories[tool.category].push({
      '@type': 'SoftwareApplication',
      'name': tool.name,
      'url': `${baseUrl}/tools/${tool.slug}`,
      'applicationCategory': 'WebApplication',
      'description': tool.description,
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    });
  });
  
  // Create collection schema for each category
  const toolCollectionSchemas = Object.entries(toolCategories).map(([category, tools]) => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': category,
    'url': `${pageUrl}#${category.toLowerCase().replace(/\s+/g, '-')}`,
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': tools.map((tool, toolIndex) => ({
        '@type': 'ListItem',
        'position': toolIndex + 1,
        'item': tool
      }))
    }
  }));
  
  // Collect all schemas
  const schemas = [
    context.organization,
    context.website,
    webPageSchema,
    itemListSchema,
    ...toolCollectionSchemas
  ].filter(Boolean);
  
  // Create schema graph
  const schemaGraph = generateSchemaGraph(schemas);
  
  return (
    <>
      <JsonLd data={schemaGraph} />
      <ToolsPage />
    </>
  );
}