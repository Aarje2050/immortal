// app/tools/llms-txt-generator/page.tsx (server component)
import { Metadata } from 'next';
import LLMsTxtGenerator from './LLMsTxtGenerator';

export const metadata: Metadata = {
  title: 'LLMs.txt Generator | Free SEO Tools | ImmortalSEO',
  description: 'Create an LLMs.txt file to help AI models better understand your website with our free LLMs.txt generator tool. Optimize your site for AI platforms.',
  openGraph: {
    title: 'Free LLMs.txt Generator Tool | ImmortalSEO',
    description: 'Create an LLMs.txt file to help AI models better understand your website with our free LLMs.txt generator tool. Optimize your site for AI platforms.',
    url: 'https://immortalseo.com/tools/llms-txt-generator',
    siteName: 'ImmortalSEO',
    images: [
      {
        url: 'https://immortalseo.com/images/og/llms-txt-generator.jpg',
        width: 1200,
        height: 630,
        alt: 'ImmortalSEO LLMs.txt Generator Tool'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function LLMsTxtGeneratorPage() {
  return <LLMsTxtGenerator />;
}