// import { Metadata } from 'next';
// import { notFound } from 'next/navigation';
// import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
// import CaseStudyClientPage from './CaseStudyClientPage';

// // Fetch case study data
// const getCaseStudies = async () => {
//   const data = await import('../caseStudiesData');
//   return data.default;
// };

// // Generate metadata for the page
// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   const caseStudies = await getCaseStudies();
//   const caseStudy = caseStudies.find((cs: any) => cs.slug === params.slug);

//   if (!caseStudy) {
//     return generatePageMetadata({
//       title: 'Case Study Not Found',
//       description: 'The requested case study could not be found.',
//     });
//   }

//   return generatePageMetadata({
//     title: `${caseStudy.title} | ImmortalSEO Case Study`,
//     description: `${caseStudy.challenge.substring(0, 150)}... See how ImmortalSEO helped ${caseStudy.client} achieve ${caseStudy.results.trafficIncrease} traffic growth through strategic SEO optimization.`,
//   });
// }

// // Generate static params
// export async function generateStaticParams() {
//   const caseStudies = await getCaseStudies();

//   return caseStudies.map((caseStudy: any) => ({
//     slug: caseStudy.slug,
//   }));
// }

// // Default page component
// export default async function CaseStudyPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const caseStudies = await getCaseStudies();
//   const caseStudy = caseStudies.find((cs: any) => cs.slug === params.slug);

//   if (!caseStudy) {
//     notFound();
//   }

//   return <CaseStudyClientPage caseStudy={caseStudy} />;
// }
