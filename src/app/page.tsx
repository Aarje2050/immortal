import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import HomePage, { homepageFAQs } from '@/components/homepage/HomePage';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { SiteConfig } from '@/types/site';
import { 
  getSchemaContext, 
  generateWebPageSchema, 
  generateSchemaGraph,
  generateAggregateRatingSchema,
  generateFAQPageSchema,
  BaseSchema
} from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';

// Use type assertion for the site config
const siteConfig = require('../../config/site.config') as SiteConfig;

export const metadata: Metadata = generatePageMetadata({
  title: 'Immortal SEO | SEO Services & SEO Company for Sustainable Growth',
  description: 'Immortal SEO is a data-driven SEO company offering expert SEO services for businesses in the USA and Canada. Technical SEO, content optimization, AI-ready strategies, and local search solutions since 2008.',
});

export default function Page() {
  // Get schema context (organization, website)
  const context = getSchemaContext();
  
  // Generate homepage specific schema
  const webPageSchema = generateWebPageSchema({
    url: siteConfig.url,
    title: 'Immortal SEO | SEO Services & SEO Company for Sustainable Growth',
    description: 'Immortal SEO is a data-driven SEO company offering expert SEO services for businesses in the USA and Canada. Technical SEO, content optimization, AI-ready strategies, and local search solutions since 2008.',
    datePublished: '2008-01-01T00:00:00Z',
    dateModified: new Date().toISOString(),
  });
  
  // Generate AggregateRating schema
  const aggregateRatingSchema = generateAggregateRatingSchema({
    ratingValue: 4.9,
    reviewCount: 127,
    bestRating: 5,
    worstRating: 1,
  });

  // Generate FAQPage schema from homepage FAQ data
  const faqPageSchema = generateFAQPageSchema(
    homepageFAQs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    }))
  );

  // Create schema graph for the page
  const schemas: BaseSchema[] = [];
  if (context.organization) schemas.push(context.organization);
  if (context.website) schemas.push(context.website);
  if (webPageSchema) schemas.push(webPageSchema);
  if (context.localBusiness) schemas.push(context.localBusiness);
  if (aggregateRatingSchema) schemas.push(aggregateRatingSchema);
  if (faqPageSchema) schemas.push(faqPageSchema as unknown as BaseSchema);

  const schemaGraph = generateSchemaGraph(schemas);

  return (
    <Layout>
      <JsonLd data={schemaGraph} />
      <HomePage />
    </Layout>
  );
}
