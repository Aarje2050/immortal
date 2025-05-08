import { Metadata } from 'next';
import AboutPage from './AboutPage';


export const metadata: Metadata = {
  title: 'About ImmortalSEO | Our Team & Evolution in SEO Since 2008',
  description: 'Meet the ImmortalSEO team — pioneers in search optimization since 2008 with expertise spanning traditional SEO to AI-driven strategies. Learn about our journey from conventional SEO to cutting-edge AI search visibility.',
  keywords: ['SEO agency', 'SEO experts', 'Immortal SEO team', 'SEO services', 'AI SEO', 'technical SEO'],
  alternates: {
    canonical: 'https://www.immortalseo.com/about',
  },
}

export default function CaseStudiesPage() {
  return <AboutPage />;
}