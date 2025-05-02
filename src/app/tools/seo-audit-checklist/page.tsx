// app/tools/seo-audit/page.tsx (server component)
import { Metadata } from 'next';
import SEOAuditChecklist from './SEOAuditChecklist';

export const metadata: Metadata = {
  title: 'SEO Audit Checklist | Free SEO Tools | ImmortalSEO',
  description: 'Comprehensive SEO audit checklist for traditional search engines and AI platforms. Identify and fix technical, content, and semantic optimization issues.',
  openGraph: {
    title: 'Free SEO Audit Checklist Tool | ImmortalSEO',
    description: 'Comprehensive SEO audit checklist for traditional search engines and AI platforms. Identify and fix technical, content, and semantic optimization issues.',
    url: 'https://immortalseo.com/tools/seo-audit',
    siteName: 'ImmortalSEO',
    images: [
      {
        url: 'https://immortalseo.com/images/og/seo-audit-checklist.jpg',
        width: 1200,
        height: 630,
        alt: 'ImmortalSEO Audit Checklist Tool'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function SEOAuditChecklistPage() {
  return <SEOAuditChecklist />;
}