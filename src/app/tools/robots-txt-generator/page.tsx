// app/tools/robots-txt-generator/page.tsx (server component)
import { Metadata } from 'next';
import RobotsTxtGenerator from './RobotsTxtGenerator';

export const metadata: Metadata = {
  title: 'Robots.txt Generator | Free SEO Tools | ImmortalSEO',
  description: 'Create a properly formatted robots.txt file for your website with our free robots.txt generator tool. Control how search engines crawl your site.',
  openGraph: {
    title: 'Free Robots.txt Generator Tool | ImmortalSEO',
    description: 'Create a properly formatted robots.txt file for your website with our free robots.txt generator tool. Control how search engines crawl your site.',
    url: 'https://immortalseo.com/tools/robots-txt-generator',
    siteName: 'ImmortalSEO',
    images: [
      {
        url: 'https://immortalseo.com/images/og/robots-txt-generator.jpg',
        width: 1200,
        height: 630,
        alt: 'ImmortalSEO Robots.txt Generator Tool'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RobotsTxtGeneratorPage() {
  return <RobotsTxtGenerator />;
}