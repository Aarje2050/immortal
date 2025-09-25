// src/app/tools/llms-txt-generator/page.tsx
import { Metadata } from 'next';
import LlmsTxtGenerator from '@/app/tools/llms-txt-generator/LLMsTxtGenerator';
import JsonLd from '@/components/seo/JsonLd';
import { 
  getSchemaContext, 
  generateWebPageSchema, 
  generateSchemaGraph,
  generateFAQPageSchema,
  generateSoftwareApplicationSchema
} from '@/lib/schema'; 
import { llmsTxtGeneratorData } from '@/data/tools/llmsTxtGenerator';
// We'll create this

// Site URL
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
const toolUrl = `${baseUrl}/tools/llms-txt-generator`;

export const metadata: Metadata = {
  title: llmsTxtGeneratorData.metaTitle,
  description: llmsTxtGeneratorData.metaDescription,
  openGraph: {
    title: llmsTxtGeneratorData.metaTitle,
    description: llmsTxtGeneratorData.metaDescription,
    images: ['/images/tools/llms-txt-generator.jpg'],
    type: 'website',
  },
  alternates: { canonical: toolUrl }
};

export default function LlmsTxtGeneratorPage() {
  // Get schema context with organization and website info
  const context = getSchemaContext();
  
 // Generate WebPage schema
 const webPageSchema = generateWebPageSchema({
  url: toolUrl,
  title: llmsTxtGeneratorData.metaTitle,
  description: llmsTxtGeneratorData.metaDescription,
  image: `${baseUrl}/images/tools/llms-txt-generator.jpg`,
  breadcrumbs: [
    { name: 'Home', url: baseUrl },
    { name: 'Tools', url: `${baseUrl}/tools` },
    { name: llmsTxtGeneratorData.name, url: toolUrl },
  ],
});

  
  // Generate SoftwareApplication schema
  const toolSchema = generateSoftwareApplicationSchema({
    name: llmsTxtGeneratorData.name,
    description: llmsTxtGeneratorData.description,
    url: toolUrl,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web browser',
    offers: {
      price: '0',
      priceCurrency: 'USD',
    },
    screenshot: `${baseUrl}/images/tools/llms-txt-generator.jpg`,
    author: {
      name: 'ImmortalSEO',
      url: baseUrl
    }
  });
  
  // Generate FAQ schema
  const faqSchema = generateFAQPageSchema(llmsTxtGeneratorData.faqs);

  // Create schema array
  const schemas: any[] = [
    context.organization,
    context.website,
    webPageSchema,
    toolSchema,
    faqSchema
  ].filter(Boolean);
  
  // Create schema graph
  const schemaGraph = generateSchemaGraph(schemas);
  return (
    <>
      <JsonLd data={schemaGraph} />
      <LlmsTxtGenerator />
    </>
  );
}