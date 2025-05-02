import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import HomePage from '@/app/homepage/page';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { SiteConfig } from '@/types/site';

// Use type assertion for the site config
const siteConfig = require('../../config/site.config') as SiteConfig;

export const metadata: Metadata = generatePageMetadata({
  title: 'Immortal SEO | Premium SEO Services for Sustainable Growth',
  description: 'Boost your online visibility with Immortal SEO\'s data-driven strategies. We help businesses dominate search rankings and drive targeted traffic.',
});

export default function Page() {
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
}