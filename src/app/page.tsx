import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import HomePage from '@/app/homepage/page';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { SiteConfig } from '@/types/site';
import { 
  getSchemaContext, 
  generateWebPageSchema, 
  generateSchemaGraph,
  BaseSchema  // Add this import
} from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

// Use type assertion for the site config
const siteConfig = require('../../config/site.config') as SiteConfig;

export const metadata: Metadata = generatePageMetadata({
  title: 'Immortal SEO | Expert SEO Services for Sustainable Growth',
  description: 'Transform your organic search visibility with our data-driven SEO services. Technical SEO, content optimization, and AI-ready strategies for sustainable growth.',
});

export default function Page() {
  // Get schema context (organization, website)
  const context = getSchemaContext();
  
  // Generate homepage specific schema
  const webPageSchema = generateWebPageSchema({
    url: siteConfig.url,
    title: 'Immortal SEO | Expert SEO Services for Sustainable Growth',
    description: 'Transform your organic search visibility with our data-driven SEO services. Technical SEO, content optimization, and AI-ready strategies for sustainable growth.',
    datePublished: '2023-01-01T00:00:00Z', // Set actual publish date
    dateModified: new Date().toISOString(),
  });
  
// Create schema graph for the page - Simplest solution to fix type issues
const schemas = [];
if (context.organization) schemas.push(context.organization);
if (context.website) schemas.push(context.website);
if (webPageSchema) schemas.push(webPageSchema);
if (context.localBusiness) schemas.push(context.localBusiness);

const schemaGraph = generateSchemaGraph(schemas);

  return (
    <Layout>
      <JsonLd data={schemaGraph} />
      <HomePage />
    </Layout>
  );
}