// app/tools/page.tsx (server component)
import { Metadata } from 'next';
import ToolsPage from './ToolsPage';

export const metadata: Metadata = {
  title: 'Free SEO Tools | ImmortalSEO',
  description: 'Access our collection of free SEO tools to optimize your website for both traditional search engines and AI platforms.',
  openGraph: {
    title: 'Free SEO Tools | ImmortalSEO',
    description: 'Access our collection of free SEO tools to optimize your website for both traditional search engines and AI platforms.',
    url: 'https://immortalseo.com/tools',
    siteName: 'ImmortalSEO',
    images: [
      {
        url: 'https://immortalseo.com/images/og/tools-page.jpg',
        width: 1200,
        height: 630,
        alt: 'ImmortalSEO Tools'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function ToolsServerPage() {
  return <ToolsPage />;
}