// app/tools/ai-seo-audit/page.tsx (server component)
import { Metadata } from 'next';
import AIAuditTool from './AIAuditTool';

export const metadata: Metadata = {
  title: 'AI-Powered SEO Audit Tool | Free SEO Tools | ImmortalSEO',
  description: 'Get instant, AI-powered SEO insights for your website. Our advanced audit tool analyzes content quality, keyword optimization, technical SEO, and more.',
  openGraph: {
    title: 'AI-Powered SEO Audit Tool | ImmortalSEO',
    description: 'Get instant, AI-powered SEO insights for your website. Our advanced audit tool analyzes content quality, keyword optimization, technical SEO, and more.',
    url: 'https://immortalseo.com/tools/ai-seo-audit',
    siteName: 'ImmortalSEO',
    images: [
      {
        url: 'https://immortalseo.com/images/og/ai-seo-audit-tool.jpg',
        width: 1200,
        height: 630,
        alt: 'ImmortalSEO AI-Powered Audit Tool'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function AIAuditPage() {
  return <AIAuditTool />;
}