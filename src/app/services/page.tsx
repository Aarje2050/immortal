// app/services/page.tsx (server component)
import { Metadata } from 'next';
import ClientPage from './ClientPage';
import Layout from '@/components/layout/Layout';
import { generateMetadata } from '@/lib/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { 
  getSchemaContext, 
  generateWebPageSchema, 
  generateSchemaGraph 
} from '@/lib/schema';

// Define the site URL
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
const pageUrl = `${baseUrl}/services`;

export const metadata: Metadata = ({
  title: 'Expert SEO Services | Traditional & AI Search Optimization | ImmortalSEO',
  description: 'Comprehensive SEO services for both traditional search engines and AI platforms. Technical optimization, content strategy, off-page authority building, and industry-specific solutions.',
  openGraph: {
    title: 'SEO Services for 2025 & Beyond | ImmortalSEO',
    description: 'Dominate search results with our data-driven SEO services. From technical optimization to AI-enhanced content strategies, we deliver sustainable organic growth.',
    images: '/images/seo-services-immortalseo.jpg',
  },
  alternates: {
    canonical: pageUrl
  }
});

// Define TypeScript interfaces for our data
interface ServiceProcess {
  title: string;
  description: string;
}

interface ServiceFAQ {
  question: string;
  answer: string;
}

interface ServiceCaseStudy {
  title: string;
  description: string;
  results: string[];
}

interface ServiceData {
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  metaTitle: string;
  metaDescription: string;
  icon: string;
  primaryKeywords?: string[];
  benefits: string[];
  process: ServiceProcess[];
  faq: ServiceFAQ[];
  caseStudies: ServiceCaseStudy[];
}

interface ServicesData {
  [key: string]: ServiceData;
}

// Define interface for service categories
interface ServiceCategoriesType {
  [category: string]: Array<{
    '@type': string;
    name: string;
    url: string;
    description: string;
  }>;
}

// Import services data
import servicesJsonData from '../../data/services.json';
const servicesData: ServicesData = servicesJsonData as ServicesData;

export default function ServicesPage() {
  // Get schema context
  const context = getSchemaContext();
  
  // Generate WebPage schema
  const webPageSchema = generateWebPageSchema({
    url: pageUrl,
    title: 'Expert SEO Services | Traditional & AI Search Optimization | ImmortalSEO',
    description: 'Comprehensive SEO services for both traditional search engines and AI platforms. Technical optimization, content strategy, off-page authority building, and industry-specific solutions.',
    image: `${baseUrl}/images/seo-services-immortalseo.jpg`,
    breadcrumbs: [
      { name: 'Home', url: baseUrl },
      { name: 'Services', url: pageUrl },
    ],
  });
  
  // Create ItemList schema for services
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': Object.entries(servicesData).map(([slug, service], index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Service',
        'name': service.name,
        'url': `${baseUrl}/services/${slug}`,
        'provider': {
          '@type': 'Organization',
          '@id': `${baseUrl}/#organization`
        },
        'description': service.shortDescription
      }
    }))
  };
  
  // Group services by category for ServiceCollection schema
  const serviceCategories: ServiceCategoriesType = {};
  
  Object.entries(servicesData).forEach(([slug, service]) => {
    if (!serviceCategories[service.category]) {
      serviceCategories[service.category] = [];
    }
    
    serviceCategories[service.category].push({
      '@type': 'Service',
      'name': service.name,
      'url': `${baseUrl}/services/${slug}`,
      'description': service.shortDescription
    });
  });
  
  // Create ServiceCollection schema for each category
  const serviceCollectionSchemas = Object.entries(serviceCategories).map(([category, services], index) => ({
    '@context': 'https://schema.org',
    '@type': 'ServiceCollection',
    'name': category,
    'url': `${pageUrl}#${category.toLowerCase().replace(/\s+/g, '-')}`,
    'provider': {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`
    },
    'serviceOutput': {
      '@type': 'ItemList',
      'itemListElement': services.map((service, serviceIndex) => ({
        '@type': 'ListItem',
        'position': serviceIndex + 1,
        'item': service
      }))
    }
  }));
  
  // Collect all schemas
  const schemas = [
    context.organization,
    context.website,
    webPageSchema,
    itemListSchema,
    ...serviceCollectionSchemas
  ].filter(Boolean);
  
  // Create schema graph
  const schemaGraph = generateSchemaGraph(schemas);
  
  // Define breadcrumbs
  const breadcrumbs = [
    { name: 'Services', href: '/services' }
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <JsonLd data={schemaGraph} />
      <ClientPage />
    </Layout>
  );
}