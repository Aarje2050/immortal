import { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import CaseStudiesClientPage from './CaseStudiesClientPage';


export const metadata: Metadata = {
  title: 'SEO Success Stories & Case Studies | ImmortalSEO',
  description: 'Explore our proven SEO success stories. See how ImmortalSEO helped businesses increase organic traffic, achieve higher rankings, and boost conversions through strategic optimization.',
  alternates: {
    canonical: 'https://www.immortalseo.com/case-studies', // case studies canonical URL
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesClientPage />;
}