import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import HomePage from '@/app/homepage/page';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { SiteConfig } from '@/types/site';
import { 
  getSchemaContext, 
  generateWebPageSchema, 
  generateSchemaGraph,
  generateAggregateRatingSchema,
  BaseSchema
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
  
// Generate AggregateRating schema for homepage (example ratings)
const aggregateRatingSchema = generateAggregateRatingSchema({
  ratingValue: 4.9,
  reviewCount: 127,
  bestRating: 5,
  worstRating: 1
});

// Create schema graph for the page - Enhanced with ratings
const schemas = [];
if (context.organization) schemas.push(context.organization);
if (context.website) schemas.push(context.website);
if (webPageSchema) schemas.push(webPageSchema);
if (context.localBusiness) schemas.push(context.localBusiness);
if (aggregateRatingSchema) schemas.push(aggregateRatingSchema);

const schemaGraph = generateSchemaGraph(schemas);

  return (
    <Layout>
      <JsonLd data={schemaGraph} />
      <HomePage />
    </Layout>
  );
}