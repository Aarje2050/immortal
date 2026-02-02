import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import CaseStudyClientPage from './CaseStudyClientPage';
import caseStudiesData from '../caseStudiesData';
import { CaseStudy } from '../caseStudiesData';

// Define correct params type according to Next.js 15 App Router
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const caseStudy = caseStudiesData.find((cs) => cs.slug === resolvedParams.slug);

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
export default async function CaseStudyPage({ params }: Props) {
  const resolvedParams = await params;
  const caseStudy = caseStudiesData.find((cs) => cs.slug === resolvedParams.slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyClientPage caseStudy={caseStudy} />;
}