import { Metadata } from 'next';
import { SiteConfig } from '@/types/site';
import { 
  getSchemaContext, 
  generateWebPageSchema, 
  generateSchemaGraph,
} from '@/lib/schema';
import JsonLd from '@/components/seo/JsonLd';
import Layout from '@/components/layout/Layout';
import AboutPage from './AboutPage';

const siteConfig = require('../../../config/site.config') as SiteConfig;
const baseUrl = siteConfig.url;
const pageUrl = `${baseUrl}/about`;

export const metadata: Metadata = {
  title: 'About Immortal SEO | SEO Experts & Consultants Since 2008',
  description: 'Meet the Immortal SEO team — experienced SEO experts and consultants delivering data-driven search optimization for businesses in the USA and Canada since 2008. Learn about our ethical approach to SEO.',
  keywords: ['SEO experts', 'SEO consultants', 'SEO specialists', 'Immortal SEO team', 'SEO agency team', 'search optimization experts'],
  alternates: {
    canonical: pageUrl,
  },
}

export default function AboutPageWrapper() {
  // Schema context
  const context = getSchemaContext();
  
  // WebPage schema for about page
  const webPageSchema = generateWebPageSchema({
    url: pageUrl,
    title: 'About Immortal SEO | SEO Experts & Consultants Since 2008',
    description: 'Meet the Immortal SEO team — experienced SEO experts and consultants delivering data-driven search optimization for businesses in the USA and Canada since 2008.',
    breadcrumbs: [
      { name: 'Home', url: baseUrl },
      { name: 'About', url: pageUrl },
    ],
  });

  // Person schema for Rajesh Jat
  const rajeshSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/about#rajesh-jat`,
    'name': 'Rajesh Jat',
    'jobTitle': 'Co-Founder & SEO Strategist',
    'description': 'Rajesh is a seasoned SEO professional with deep expertise in keyword research, competitive analysis, and decoding user search intent. With a strong technical background, he excels at leveraging AI to craft content that aligns with semantic search engine requirements.',
    'image': `${baseUrl}/images/team/rajesh-jat-seo.png`,
    'url': `${baseUrl}/about`,
    'worksFor': {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      'name': 'Immortal SEO',
    },
    'knowsAbout': [
      'Technical SEO',
      'Semantic SEO',
      'AI-Enhanced SEO',
      'Keyword Research',
      'Competitive Analysis',
      'Search Intent Optimization',
      'Content Strategy',
      'Schema Markup',
      'Core Web Vitals',
    ],
    'sameAs': [
      'https://linkedin.com/in/rajeshjatindia',
    ],
  };

  // Person schema for Manish Lamrod
  const manishSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/about#manish-lamrod`,
    'name': 'Manish Lamrod',
    'jobTitle': 'Co-Founder & Off-Page SEO Expert',
    'description': 'Manish is an expert in off-page SEO, specializing in white-hat link building and developing tailored SEO strategies based on client needs.',
    'image': `${baseUrl}/images/team/manish-lamrod-seo.png`,
    'url': `${baseUrl}/about`,
    'worksFor': {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      'name': 'Immortal SEO',
    },
    'knowsAbout': [
      'Off-Page SEO',
      'Link Building',
      'Digital PR',
      'SEO Strategy',
      'Client Relationship Management',
      'White-Hat SEO',
    ],
    'sameAs': [
      'https://linkedin.com/in/manishlamrod',
    ],
  };

  // AboutPage schema (enhanced ProfessionalService for this page)
  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${pageUrl}#aboutpage`,
    'url': pageUrl,
    'name': 'About Immortal SEO',
    'description': 'Learn about the experienced SEO experts and consultants behind Immortal SEO.',
    'mainEntity': {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
    },
  };

  // Collect all schemas
  const schemas = [
    context.organization,
    context.website,
    webPageSchema,
    aboutPageSchema,
    rajeshSchema,
    manishSchema,
  ].filter(Boolean);

  const schemaGraph = generateSchemaGraph(schemas);

  // Breadcrumbs
  const breadcrumbs = [
    { name: 'About', href: '/about' },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <JsonLd data={schemaGraph} />
      <AboutPage />
    </Layout>
  );
}
