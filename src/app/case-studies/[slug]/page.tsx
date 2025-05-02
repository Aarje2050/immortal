import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import CaseStudyClientPage from './CaseStudyClientPage';

// Define shared props type
type PageProps = {
  params: {
    slug: string;
  };
};

// Dummy data fetch function (replace with real data source in production)
const getCaseStudies = async () => {
  const data = await import('../caseStudiesData');
  return data.default;
};

// Metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const caseStudies = await getCaseStudies();
  const caseStudy = caseStudies.find((cs: any) => cs.slug === params.slug);

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

// Static params for build
export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();

  return caseStudies.map((caseStudy: any) => ({
    slug: caseStudy.slug,
  }));
}

// Page component
export default async function CaseStudyPage({ params }: PageProps) {
  const caseStudies = await getCaseStudies();
  const caseStudy = caseStudies.find((cs: any) => cs.slug === params.slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyClientPage caseStudy={caseStudy} />;
}
