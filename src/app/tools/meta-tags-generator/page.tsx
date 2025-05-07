// app/tools/meta-tags-generator/page.tsx (server component)
import { Metadata } from 'next';
// import MetaTagsGenerator from './MetaTagsGenerator';
import MetaTagsGenerator from './MetaTagsGenerator';

export const metadata: Metadata = {
  title: 'Meta Tags Generator | Free SEO Tools | ImmortalSEO',
  description: 'Create optimized title tags and meta descriptions for better click-through rates from search results with our free meta tags generator tool.',
  openGraph: {
    title: 'Free Meta Tags Generator Tool | ImmortalSEO',
    description: 'Create optimized title tags and meta descriptions for better click-through rates from search results with our free meta tags generator tool.',
    url: 'https://immortalseo.com/tools/meta-tags-generator',
    siteName: 'ImmortalSEO',
    images: [
      {
        url: 'https://immortalseo.com/images/og/meta-tags-generator.jpg',
        width: 1200,
        height: 630,
        alt: 'ImmortalSEO Meta Tags Generator Tool'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function MetaTagsGeneratorPage() {
  return <MetaTagsGenerator />;
}