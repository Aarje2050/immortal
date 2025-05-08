// app/tools/schema-generator/page.tsx (server component)
import { Metadata } from 'next';
import SchemaMarkupGenerator from './SchemaMarkupGenerator';

export const metadata: Metadata = {
  title: 'Schema Markup Generator | Free SEO Tools | ImmortalSEO',
  description: 'Create structured data markup (JSON-LD) for better search engine understanding of your content with our free schema generator tool.',
  openGraph: {
    title: 'Free Schema Markup Generator Tool | ImmortalSEO',
    description: 'Create structured data markup (JSON-LD) for better search engine understanding of your content with our free schema generator tool.',
    url: 'https://immortalseo.com/tools/schema-generator',
    siteName: 'ImmortalSEO',
    images: [
      {
        url: 'https://immortalseo.com/images/og/schema-generator.jpg',
        width: 1200,
        height: 630,
        alt: 'ImmortalSEO Schema Markup Generator Tool'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates : {canonical : "https://www.immortalseo.com/tools/schema-generator"}

};

export default function SchemaMarkupGeneratorPage() {
  return <SchemaMarkupGenerator />;
}