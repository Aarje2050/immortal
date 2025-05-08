import { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import PricingClientPage from './PricingClientPage';

export const metadata: Metadata = ({
  title: 'Transparent SEO Pricing Plans | ImmortalSEO',
  description: 'Explore our transparent, value-based SEO pricing packages. Choose between Essential ($2000/mo) and Advanced ($4000/mo) plans to boost your visibility across traditional and AI search platforms.',
  alternates: {
    canonical: 'https://www.immortalseo.com/pricing', // case studies canonical URL
  },
});

export default function PricingPage() {
  return <PricingClientPage />;
}