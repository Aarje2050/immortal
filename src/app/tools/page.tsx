// app/tools/page.tsx
import { Metadata } from 'next';
import ToolsPage from './ToolsPage'; // Assuming this is your client component
import JsonLd from '@/components/seo/JsonLd';
import { 
  getSchemaContext, 
  generateWebPageSchema, 
  generateSchemaGraph,
  generateCollectionPageSchema,
  generateSoftwareApplicationSchema
} from '@/lib/schema';

// Define the site URL
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
const pageUrl = `${baseUrl}/tools`;

export const metadata: Metadata = {
  title: 'Free SEO Tools — Word Counter, SERP Preview, Readability Checker & More | ImmortalSEO',
  description: 'Free SEO tools built by experts: word counter, SERP snippet preview, keyword density checker, readability analyzer, page size checker, schema generator, and more.',
  openGraph: {
    title: 'Free SEO Tools | ImmortalSEO',
    description: '11+ free SEO tools: word counter, SERP preview, keyword density checker, readability analyzer, page size checker, robots.txt generator, schema markup, and more.',
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

const toolsData: ToolData[] = [
  // Content & Analysis Tools
  {
    name: 'Word Counter & Character Counter',
    slug: 'word-counter',
    description: 'Count words, characters, sentences, paragraphs, and get reading time estimates with SEO content-length insights.',
    category: 'Content Tools',
    isFree: true,
  },
  {
    name: 'Keyword Density Checker',
    slug: 'keyword-density-checker',
    description: 'Analyze keyword density, frequency, and N-gram phrase distribution to optimize content without keyword stuffing.',
    category: 'Content Tools',
    isFree: true,
  },
  {
    name: 'Content Readability Analyzer',
    slug: 'readability-checker',
    description: 'Check Flesch Reading Ease, Flesch-Kincaid Grade Level, and Gunning Fog Index with improvement tips.',
    category: 'Content Tools',
    isFree: true,
  },
  {
    name: 'Google SERP Snippet Preview',
    slug: 'serp-preview',
    description: 'Preview how your title and meta description appear in Google search results on desktop and mobile.',
    category: 'Content Tools',
    isFree: true,
  },
  {
    name: 'Meta Tags Generator',
    slug: 'meta-tags-generator',
    description: 'Create optimized title tags, meta descriptions, and Open Graph tags for better search visibility and CTR.',
    category: 'Content Tools',
    isFree: true,
  },
  // Technical SEO Tools
  {
    name: 'Website Page Size Checker',
    slug: 'page-size-checker',
    description: "Check your page's raw HTML size against Google's 2 MB crawl limit with percentile comparison.",
    category: 'Technical SEO',
    isFree: true,
  },
  {
    name: 'Robots.txt Generator',
    slug: 'robots-txt-generator',
    description: 'Create a properly formatted robots.txt file to control how search engines crawl your website.',
    category: 'Technical SEO',
    isFree: true,
  },
  {
    name: 'Schema Markup Generator',
    slug: 'schema-generator',
    description: 'Generate JSON-LD structured data markup for rich snippets in Google search results.',
    category: 'Technical SEO',
    isFree: true,
  },
  // Analysis Tools
  {
    name: 'SEO Audit Checklist',
    slug: 'seo-audit-checklist',
    description: 'Comprehensive interactive checklist covering technical, on-page, and content SEO best practices.',
    category: 'Analysis Tools',
    isFree: true,
  },
  {
    name: 'SEO Cost Calculator',
    slug: 'seo-cost-calculator',
    description: 'Estimate the cost of SEO services based on your website size, industry, and business goals.',
    category: 'Analysis Tools',
    isFree: true,
  },
  // AI Tools
  {
    name: 'LLMs.txt Generator',
    slug: 'llms-txt-generator',
    description: 'Create an LLMs.txt file to help AI models better understand and navigate your website content.',
    category: 'AI Tools',
    isFree: true,
  },
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
  
  // Generate individual SoftwareApplication schemas for each tool
  const softwareApplicationSchemas = toolsData.map(tool => 
    generateSoftwareApplicationSchema({
      name: tool.name,
      description: tool.description,
      url: `${baseUrl}/tools/${tool.slug}`,
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web browser',
      offers: {
        price: '0',
        priceCurrency: 'USD'
      },
      author: {
        name: 'ImmortalSEO',
        url: baseUrl
      }
    })
  );

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
  
  // Create collection schema for each category using the new generator
  const toolCollectionSchemas = Object.entries(toolCategories).map(([category, tools]) => 
    generateCollectionPageSchema({
      url: `${pageUrl}#${category.toLowerCase().replace(/\s+/g, '-')}`,
      name: category,
      description: `Collection of ${category.toLowerCase()} tools`,
      mainEntity: tools,
      numberOfItems: tools.length
    })
  );
  
  // Collect all schemas
  const schemas = [
    context.organization,
    context.website,
    webPageSchema,
    itemListSchema,
    ...softwareApplicationSchemas,
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