import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import CaseStudyClientPage from './CaseStudyClientPage';

// Define the proper types for case studies
interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    trafficIncrease: string;
    rankingImprovement: string;
    conversionIncrease: string;
    additionalMetrics?: { [key: string]: string };
  };
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  featuredImage: string;
  services: string[];
  duration: string;
  tags: string[];
  featured: boolean;
}

// Type-safe function to get case studies
const getCaseStudies = async (): Promise<CaseStudy[]> => {
  const data = await import('../caseStudiesData');
  return data.default;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const caseStudies = await getCaseStudies();
  const caseStudy = caseStudies.find((cs) => cs.slug === params.slug);

  if (!caseStudy) {
    return generatePageMetadata({
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.',
    });
  }

  return generatePageMetadata({
    title: `${caseStudy.title} | ImmortalSEO Case Study`,
    description: `${caseStudy.challenge.substring(0, 150)}... See how ImmortalSEO helped ${caseStudy.client} achieve ${caseStudy.results.trafficIncrease} traffic growth through strategic SEO optimization.`,
  });
}

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();

  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

// Fix the params type by using React.FC with the appropriate props type
interface PageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const caseStudies = await getCaseStudies();
  const caseStudy = caseStudies.find((cs) => cs.slug === params.slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyClientPage caseStudy={caseStudy} />;
}