import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import CaseStudyClientPage from './CaseStudyClientPage';
import caseStudiesData from '../caseStudiesData';
import { CaseStudy } from '../caseStudiesData';

// Define correct params type according to Next.js App Router
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const caseStudy = caseStudiesData.find((cs) => cs.slug === params.slug);

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

export function generateStaticParams() {
  return caseStudiesData.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

// Use the correct Props type here
export default function CaseStudyPage({ params }: Props) {
  const caseStudy = caseStudiesData.find((cs) => cs.slug === params.slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyClientPage caseStudy={caseStudy} />;
}