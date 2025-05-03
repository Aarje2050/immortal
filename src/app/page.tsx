import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import HomePage from '@/app/homepage/page';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { SiteConfig } from '@/types/site';

// Use type assertion for the site config
const siteConfig = require('../../config/site.config') as SiteConfig;

export const metadata: Metadata = generatePageMetadata({
  title: 'Immortal SEO | Expert SEO Services for Sustainable Growth',
  description: 'Transform your organic search visibility with our data-driven SEO services. Technical SEO, content optimization, and AI-ready strategies for sustainable growth.',
});

export default function Page() {
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
}