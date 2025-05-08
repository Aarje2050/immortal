// app/services/page.tsx (server component)
import { Metadata } from 'next';
import ClientPage from './ClientPage';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = ({
  title: 'Expert SEO Services | Traditional & AI Search Optimization | ImmortalSEO',
  description: 'Comprehensive SEO services for both traditional search engines and AI platforms. Technical optimization, content strategy, off-page authority building, and industry-specific solutions.',
  openGraph: {
    title: 'SEO Services for 2025 & Beyond | ImmortalSEO',
    description: 'Dominate search results with our data-driven SEO services. From technical optimization to AI-enhanced content strategies, we deliver sustainable organic growth.',
    images: '/images/seo-services-immortalseo.jpg',
  },
  
  alternates: {
    canonical :'https://immortalseo.com/servcies'
  }
});

// JSON-LD Schema for Services Page
const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'item': {
        '@type': 'Service',
        'name': 'Technical SEO & Site Architecture',
        'url': 'https://immortalseo.com/services/technical-seo',
        'provider': {
          '@type': 'ProfessionalService',
          'name': 'ImmortalSEO',
          'url': 'https://immortalseo.com'
        },
        'description': 'Build a solid technical foundation that ensures search engines and AI crawlers can efficiently discover, index, and understand your entire website.'
      }
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'item': {
        '@type': 'Service',
        'name': 'AI-Enhanced SEO & SGE Optimization',
        'url': 'https://immortalseo.com/services/ai-enhanced-seo',
        'provider': {
          '@type': 'ProfessionalService',
          'name': 'ImmortalSEO',
          'url': 'https://immortalseo.com'
        },
        'description': 'Optimize your digital presence for both traditional search engines and AI discovery platforms like Google SGE, ChatGPT, and Perplexity.'
      }
    },
    {
      '@type': 'ListItem',
      'position': 3,
      'item': {
        '@type': 'Service',
        'name': 'Content SEO & Topic Authority',
        'url': 'https://immortalseo.com/services/content-seo',
        'provider': {
          '@type': 'ProfessionalService',
          'name': 'ImmortalSEO',
          'url': 'https://immortalseo.com'
        },
        'description': 'Develop strategic content that ranks well, addresses user intent, and establishes your brand as an authoritative source in your industry.'
      }
    }
    // Note: You can add all services here, but these are the main ones for brevity
  ]
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <ClientPage />
    </>
  );
}