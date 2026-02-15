// src/app/services/[service]/page.tsx
// Service detail page — server component for full SEO & LLM indexing

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/seo/JsonLd';
import { StepByStep } from '@/components/seo/FeaturedSnippet';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { 
  getSchemaContext, 
  generateWebPageSchema, 
  generateServiceSchema, 
  generateFAQPageSchema,
  generateSchemaGraph,
  generateHowToSchema,
  generateTestimonialSchema,
  generateAggregateRatingFromReviews,
  BaseSchema
} from '@/lib/schema';
import { ServiceData } from '@/types/service';
import fs from 'fs';
import path from 'path';

// ═══════════════════════════════════════════════════════════════════════════
// DATA LOADING
// ═══════════════════════════════════════════════════════════════════════════

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'services.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const servicesData = JSON.parse(fileContent);
  return Object.keys(servicesData).map(service => ({ service }));
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const service = params.service;
  const serviceData = await getServiceData(service);
  
  if (!serviceData) {
    return {
      title: 'Service Not Found',
      alternates: { canonical: 'https://www.immortalseo.com/services' },
    };
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
  const canonicalUrl = `${baseUrl}/services/${service}`;
  const baseMetadata = generatePageMetadata({
    title: serviceData.metaTitle,
    description: serviceData.metaDescription,
  });
  
  return {
    ...baseMetadata,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      ...(baseMetadata.openGraph || {}),
      url: canonicalUrl,
      type: 'website',
      title: serviceData.metaTitle,
      description: serviceData.metaDescription,
      images: [
        {
          url: `${baseUrl}/images/services/${service}-og.jpg`,
          width: 1200,
          height: 630,
          alt: serviceData.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: serviceData.metaTitle,
      description: serviceData.metaDescription,
      images: [`${baseUrl}/images/services/${service}-og.jpg`],
    },
  };
}

async function getServiceData(slug: string): Promise<ServiceData | null> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'services.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const servicesData = JSON.parse(fileContent);
    return servicesData[slug] || null;
  } catch (error) {
    console.error(`Error loading service data for ${slug}:`, error);
    return null;
  }
}

async function getRelatedServices(currentSlug: string, currentCategory: string) {
  const filePath = path.join(process.cwd(), 'src', 'data', 'services.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const servicesData = JSON.parse(fileContent);
  
  const sameCategory = Object.entries(servicesData)
    .filter(
      ([slug, service]: [string, any]) =>
      slug !== currentSlug && service.category === currentCategory
    )
    .slice(0, 2)
    .map(([slug, service]: [string, any]) => ({
      slug,
      name: service.name,
      shortDescription: service.shortDescription,
      icon: service.icon,
    }));
  
  if (sameCategory.length < 3) {
    const otherCategories = Object.entries(servicesData)
      .filter(
        ([slug, service]: [string, any]) =>
        slug !== currentSlug && service.category !== currentCategory
      )
      .slice(0, 3 - sameCategory.length)
      .map(([slug, service]: [string, any]) => ({
        slug,
        name: service.name,
        shortDescription: service.shortDescription,
        icon: service.icon,
      }));
    return [...sameCategory, ...otherCategories];
  }
  return sameCategory;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default async function ServiceDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ service: string }>;
}) {
  const params = await paramsPromise;
  const service = params.service;
  const serviceData = await getServiceData(service);
  
  if (!serviceData) {
    notFound();
  }
  
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
  const canonicalUrl = `${baseUrl}/services/${service}`;
  const context = getSchemaContext();
  const relatedServicesList = await getRelatedServices(
    params.service,
    serviceData.category
  );

  // ─── Schema generation ─────────────────────────────────────────────────
  const webPageSchema = generateWebPageSchema({
    url: canonicalUrl,
    title: serviceData.metaTitle || `${serviceData.name} | ImmortalSEO`,
    description: serviceData.metaDescription || serviceData.shortDescription,
    datePublished: serviceData.publishedDate || '2023-01-01T00:00:00Z',
    dateModified: serviceData.updatedDate || new Date().toISOString(),
    breadcrumbs: [
      { name: 'Home', url: baseUrl },
      { name: 'Services', url: `${baseUrl}/services` },
      { name: serviceData.name, url: canonicalUrl },
    ],
  });
  
  const serviceSchema = generateServiceSchema({
    url: canonicalUrl,
    name: serviceData.name,
    description: serviceData.longDescription || serviceData.shortDescription,
    serviceType: serviceData.category || 'SEO Service',
    offers: {
      price: serviceData.price,
      priceCurrency: 'USD',
      description: `${serviceData.name} starting at ${serviceData.price || '$X,XXX'}`,
    },
    provider: {
      '@type': 'Organization',
      name: 'ImmortalSEO',
      url: baseUrl,
    },
    areaServed: 'United States, Canada',
    sameAs: serviceData.sameAs || [],
  });

  if (relatedServicesList.length > 0) {
    (serviceSchema as any).relatedService = relatedServicesList.map(
      (r: any) => ({
      '@type': 'Service',
        name: r.name,
        url: `${baseUrl}/services/${r.slug}`,
      })
    );
  }

  const schemas: BaseSchema[] = [
    context.organization,
    context.website,
    webPageSchema,
    serviceSchema,
  ];
  
  if (serviceData.faq && serviceData.faq.length > 0) {
    schemas.push(
      generateFAQPageSchema(
        serviceData.faq.map((i: { question: string; answer: string }) => ({
          question: i.question,
          answer: i.answer,
        }))
      )
    );
  }

  if (serviceData.testimonials && serviceData.testimonials.length > 0) {
    serviceData.testimonials.forEach((t: any) => {
      schemas.push(
        generateTestimonialSchema({
          author: t.author || 'Client',
          reviewBody: t.quote,
          datePublished: new Date().toISOString(),
        itemReviewed: {
          '@type': 'Service',
          name: serviceData.name,
          url: canonicalUrl,
        },
          ratingValue: 5,
        })
      );
      });
    if (serviceData.testimonials.length > 1) {
      const agg = generateAggregateRatingFromReviews(
        serviceData.testimonials.map(() => ({ ratingValue: 5 }))
      );
      if (agg) schemas.push(agg);
    }
  }

  // Person schemas for founders who specialize in this service
  const teamMembers = [
    {
      name: 'Rajesh Jat',
      jobTitle: 'Co-Founder & SEO Strategist',
      url: `${baseUrl}/about#rajesh-jat`,
      specializesIn: [
        'technical-seo',
        'semantic-seo',
        'ai-enhanced-seo',
        'llm-content-strategy',
        'content-seo',
      ],
    },
    {
      name: 'Manish Lamrod',
      jobTitle: 'Co-Founder & Off-Page SEO Expert',
      url: `${baseUrl}/about#manish-lamrod`,
      specializesIn: [
        'off-page-seo',
        'local-seo',
        'small-business-seo',
        'enterprise-seo',
      ],
    },
  ];

  teamMembers.forEach((member) => {
    if (member.specializesIn.includes(service)) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${member.url}#person`,
        name: member.name,
        jobTitle: member.jobTitle,
        url: member.url,
        worksFor: { '@id': `${baseUrl}/#organization` },
        knowsAbout: serviceData.name,
      });
    }
  });

  if (serviceData.process && serviceData.process.length > 0) {
    schemas.push(
      generateHowToSchema({
      name: `How to Get ${serviceData.name}`,
      description: `Step-by-step process for getting ${serviceData.name} services`,
      steps: serviceData.process.map((step: any, index: number) => ({
        name: step.title || `Step ${index + 1}`,
        text: step.description || step.content || '',
          image: step.image || undefined,
        })),
        totalTime: 'PT2H',
        image: `${baseUrl}/images/services/${service}.jpg`,
      })
    );
  }

  if (context.localBusiness) schemas.push(context.localBusiness);

  const schemaGraph = generateSchemaGraph(schemas.filter(Boolean));
  
  // ─── Table of contents ─────────────────────────────────────────────────
  const tableOfContents = [
    { id: 'overview', label: 'Service Overview' },
  ];
  if (
    serviceData.serviceExamples &&
    serviceData.serviceExamples.length > 0
  ) {
    tableOfContents.push({ id: 'included', label: "What's Included" });
  }
  tableOfContents.push({ id: 'benefits', label: 'Key Benefits' });
  if (serviceData.process && serviceData.process.length > 0) {
    tableOfContents.push({ id: 'process', label: 'Our Process' });
  }
  if (serviceData.caseStudies && serviceData.caseStudies.length > 0) {
    tableOfContents.push({ id: 'case-studies', label: 'Success Stories' });
  }
  if (serviceData.faq && serviceData.faq.length > 0) {
    tableOfContents.push({ id: 'faq', label: 'FAQ' });
  }

  // Breadcrumbs
  const breadcrumbs = [
    { name: 'Services', href: '/services' },
    { name: serviceData.name, href: `/services/${service}` },
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <JsonLd data={schemaGraph} />
      
      {/* ────────────────────────────────────────────────────────────────── */}
      {/* 1. HERO                                                           */}
      {/* ────────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary-main to-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat" />
        </div>
        <Container>
          <div className="py-16 md:py-24 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-6 backdrop-blur-sm">
                {serviceData.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {serviceData.name}
              </h1>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                {serviceData.shortDescription}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  href="#benefits"
                  variant="secondary"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  View Benefits
                </Button>
                <Button
                  href="/contact"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10 px-8"
                >
                  Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* 2. TRUST METRICS BAR                                              */}
      {/* ────────────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <Container>
          <div className="py-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-text-secondary">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary-main" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <span>SEO Experts Since 2008</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.9/5 Client Rating</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary-main" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <span>250+ Businesses Served</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary-main" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span>94% Client Retention</span>
            </div>
          </div>
        </Container>
      </div>

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* 3. MAIN CONTENT + SIDEBAR                                         */}
      {/* ────────────────────────────────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* ── Main Content (8/12) ── */}
            <div className="lg:col-span-8">
              {/* Table of Contents */}
              <nav
                aria-label="Table of Contents"
                className="bg-white rounded-xl shadow-sm p-6 mb-8 border-l-4 border-primary-main"
              >
                <h2 className="text-lg font-semibold mb-3">On This Page</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a 
                          href={`#${item.id}`} 
                        className="flex items-center text-primary-main hover:text-primary-dark text-sm"
                        >
                        <svg className="w-3.5 h-3.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              
              <article>
                {/* ── Service Overview ── */}
                <section id="overview" className="scroll-mt-24 mb-10">
                  <h2 className="text-3xl font-bold mb-6">{serviceData.name}</h2>
                  <div className="prose prose-lg max-w-none text-text-secondary">
                    <p>{serviceData.longDescription}</p>
                  </div>
                  
                  {/* Supplementary content — why this service matters */}
                  {serviceData.supplementaryContent && (
                    <div className="mt-8 space-y-6">
                      {serviceData.supplementaryContent.importance && (
                        <div className="bg-primary-main/5 border-l-4 border-primary-main p-6 rounded-r-lg">
                          <h3 className="text-xl font-semibold mb-3">
                            Why {serviceData.name} Matters
                          </h3>
                          <p className="text-text-secondary leading-relaxed">
                            {serviceData.supplementaryContent.importance}
                          </p>
                  </div>
                      )}

                      {serviceData.supplementaryContent.challenges &&
                        serviceData.supplementaryContent.challenges.length >
                          0 && (
                          <div>
                            <h3 className="text-xl font-semibold mb-4">
                              Common Challenges We Solve
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {serviceData.supplementaryContent.challenges.map(
                                (
                                  challenge: {
                                    title: string;
                                    description: string;
                                  },
                                  i: number
                                ) => (
                                  <div
                                    key={i}
                                    className="bg-white rounded-lg p-4 border border-gray-100"
                                  >
                                    <h4 className="font-semibold text-text-primary mb-1">
                                      {challenge.title}
                                    </h4>
                                    <p className="text-sm text-text-secondary">
                                      {challenge.description}
                                    </p>
                                  </div>
                                )
                              )}
                      </div>
                    </div>
                  )}
                  
                      {serviceData.supplementaryContent.differences && (
                        <div>
                          <h3 className="text-xl font-semibold mb-3">
                            What Sets Our Approach Apart
                          </h3>
                          <p className="text-text-secondary leading-relaxed">
                            {serviceData.supplementaryContent.differences}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </section>

                {/* ── What's Included ── */}
                {serviceData.serviceExamples &&
                  serviceData.serviceExamples.length > 0 && (
                    <section
                      id="included"
                      className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-10 scroll-mt-24"
                    >
                      <h2 className="text-2xl font-bold mb-6">
                        What&apos;s Included
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {serviceData.serviceExamples.map(
                          (
                            example: { category: string; items: string[] },
                            i: number
                          ) => (
                            <div
                              key={i}
                              className="border border-gray-100 rounded-lg p-5"
                            >
                              <h3 className="text-lg font-semibold mb-3 text-primary-main">
                                {example.category}
                              </h3>
                              <ul className="space-y-2">
                                {example.items.map((item: string, j: number) => (
                                  <li
                                    key={j}
                                    className="flex items-start text-sm text-text-secondary"
                                  >
                                    <svg className="w-4 h-4 text-primary-main mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {item}
                                  </li>
                              ))}
                            </ul>
                      </div>
                          )
                  )}
                </div>
                    </section>
                  )}

                {/* ── Key Benefits ── */}
                <section
                  id="benefits"
                  className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-10 scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold mb-6">
                    Key Benefits of Our {serviceData.name}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceData.benefits.map(
                      (benefit: string, i: number) => (
                        <div key={i} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                          <p className="text-text-secondary text-sm leading-relaxed">
                            {benefit}
                          </p>
                      </div>
                      )
                    )}
                  </div>
                </section>
                
                {/* ── Our Process ── */}
                  {serviceData.process && serviceData.process.length > 0 && (
                  <section
                    id="process"
                    className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-10 scroll-mt-24"
                  >
                    <h2 className="text-2xl font-bold mb-6">Our Process</h2>
                      <StepByStep
                      title=""
                      steps={serviceData.process.map(
                        (
                          step: { title: string; description: string },
                          i: number
                        ) => ({
                          number: i + 1,
                          title: step.title,
                          description: step.description,
                        })
                      )}
                    />
                  </section>
                )}
                
                {/* ── Case Studies / Success Stories ── */}
                {serviceData.caseStudies &&
                  serviceData.caseStudies.length > 0 && (
                    <section
                      id="case-studies"
                      className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-10 scroll-mt-24"
                    >
                      <h2 className="text-2xl font-bold mb-6">
                        Success Stories
                      </h2>
                    <div className="space-y-8">
                        {serviceData.caseStudies.map(
                          (
                            cs: {
                              title: string;
                              description: string;
                              results: string[];
                            },
                            i: number
                          ) => (
                            <div
                              key={i}
                              className="border-l-4 border-primary-main pl-5 py-2"
                            >
                              <h3 className="text-xl font-semibold mb-2">
                                {cs.title}
                              </h3>
                              <p className="text-text-secondary mb-4">
                                {cs.description}
                              </p>
                              <h4 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-3">
                                Results Achieved
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {cs.results.map(
                                  (result: string, j: number) => (
                                    <div
                                      key={j}
                                      className="flex items-start"
                                    >
                                      <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                      <span className="text-sm">
                                        {result}
                                      </span>
                              </div>
                                  )
                                )}
                          </div>
                        </div>
                          )
                        )}
                      </div>
                      <div className="mt-6">
                        <Link
                          href="/case-studies"
                          className="inline-flex items-center text-primary-main font-medium hover:text-primary-dark text-sm"
                        >
                          View All Case Studies
                          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                    </div>
                  </section>
                )}
                
                {/* ── FAQ ── */}
                {serviceData.faq && serviceData.faq.length > 0 && (
                  <section
                    id="faq"
                    className="bg-white rounded-xl shadow-sm p-6 md:p-8 scroll-mt-24"
                  >
                    <h2 className="text-2xl font-bold mb-6">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-3">
                      {serviceData.faq.map(
                        (
                          item: { question: string; answer: string },
                          i: number
                        ) => (
                          <details
                            key={i}
                            className="group border border-gray-100 rounded-lg"
                          >
                            <summary className="flex justify-between items-center p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                              <h3 className="font-semibold text-base pr-4">
                                {item.question}
                              </h3>
                              <svg className="w-5 h-5 text-primary-main flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </summary>
                            <div className="px-4 pb-4">
                              <p className="text-text-secondary leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </details>
                        )
                      )}
                    </div>
                    
                    {/* CTA below FAQ */}
                    <div className="mt-8 bg-gray-50 p-5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold">
                          Have a specific question?
                        </p>
                        <p className="text-sm text-text-secondary">
                          Our SEO experts are ready to help.
                        </p>
                      </div>
                      <Link 
                        href="/contact"
                        className="inline-flex items-center bg-primary-main text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium flex-shrink-0"
                      >
                        Ask Your Question
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </Link>
                    </div>
                  </section>
                )}
              </article>
            </div>
            
            {/* ── Sidebar (4/12) ── */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Lead Capture Form */}
                <LeadCaptureForm 
                  title={`Get Started with ${serviceData.name}`}
                  description="Schedule a free consultation with our SEO experts"
                  service={serviceData.name} 
                  customSubject={`${serviceData.name} Service Inquiry`}
                  buttonText="Request Free Consultation"
                />
                
                {/* Why Choose ImmortalSEO */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-4">
                    Why Choose ImmortalSEO
                  </h3>
                  <ul className="space-y-3 text-sm">
                    {[
                      '15+ years of SEO expertise',
                      '94% client retention rate',
                      'AI-enhanced SEO strategies',
                      'Tailored strategies, not templates',
                      'Serving USA & Canada',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-primary-main mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                        <Link
                      href="/about"
                      className="text-primary-main text-sm font-medium hover:text-primary-dark inline-flex items-center"
                        >
                      Learn About Our Team
                          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>

                {/* Client Testimonial */}
                {serviceData.testimonials &&
                  serviceData.testimonials.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex mb-3">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                          <svg key={i} className="text-yellow-400 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <blockquote className="text-text-secondary text-sm italic leading-relaxed mb-4">
                        &ldquo;{serviceData.testimonials[0].quote}&rdquo;
                      </blockquote>
                      <div className="flex items-center">
                        <div className="w-9 h-9 bg-primary-main/10 rounded-full flex items-center justify-center text-primary-main font-bold text-sm mr-3 flex-shrink-0">
                          {serviceData.testimonials[0].author
                            ? serviceData.testimonials[0].author.charAt(0)
                            : 'C'}
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {serviceData.testimonials[0].author}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {serviceData.testimonials[0].position}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <Link
                          href="/testimonials"
                          className="text-primary-main text-xs font-medium hover:text-primary-dark"
                        >
                          Read more testimonials →
                        </Link>
                    </div>
                  </div>
                )}
                
                {/* Related Services */}
                {relatedServicesList.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold mb-4">
                      Related SEO Services
                    </h3>
                    <div className="space-y-3">
                      {relatedServicesList.map((rel: any) => (
                      <Link
                          key={rel.slug}
                          href={`/services/${rel.slug}`}
                          className="block p-3 bg-gray-50 rounded-lg hover:bg-primary-main/5 transition-colors"
                        >
                          <h4 className="font-semibold text-sm">
                            {rel.name}
                          </h4>
                          <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                            {rel.shortDescription}
                          </p>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Link
                        href="/services"
                        className="inline-flex items-center text-primary-main text-sm font-medium hover:text-primary-dark"
                      >
                        View All Services
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
                </div>
            </aside>
          </div>
        </Container>
      </Section>
      
      {/* ────────────────────────────────────────────────────────────────── */}
      {/* 4. RELATED INDUSTRIES                                             */}
      {/* ────────────────────────────────────────────────────────────────── */}
        <Section background="light">
          <Container>
            <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Industries We Serve with {serviceData.name}
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Our {serviceData.name.toLowerCase()} expertise spans across
              various industries, delivering tailored strategies for each
              sector.
              </p>
            </div>
            
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Dermatologist SEO', href: '/industries/dermatologist' },
              { name: 'IVF Hospitals SEO', href: '/industries/ivf-hospitals' },
              { name: 'Plumbing SEO', href: '/industries/plumbing-service' },
              { name: 'House Cleaning SEO', href: '/industries/house-cleaning' },
              { name: 'Towing Service SEO', href: '/industries/towing-service' },
              { name: 'Taxi Service SEO', href: '/industries/taxi-service' },
              { name: 'Restaurant SEO', href: '/industries/restaurants' },
              { name: 'E-commerce SEO', href: '/industries/e-commerce' },
              { name: 'Tattoo Shop SEO', href: '/industries/tattoo-shops' },
              { name: 'Garage Door SEO', href: '/industries/garage-door' },
              { name: 'Roofing Services SEO', href: '/industries/roofing-services' },
              { name: 'Dry Cleaning SEO', href: '/industries/dry-cleaning' },
            ].map((ind) => (
                    <Link 
                key={ind.href}
                href={ind.href}
                className="bg-white p-3 rounded-lg text-sm text-text-secondary hover:text-primary-main hover:shadow-sm transition-all text-center"
                    >
                {ind.name}
                    </Link>
              ))}
            </div>
          </Container>
        </Section>

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* 5. RELATED LOCATIONS                                              */}
      {/* ────────────────────────────────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {serviceData.name} by Location
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We provide {serviceData.name.toLowerCase()} services to businesses
              across the United States and Canada.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* USA Major Cities */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">
                United States
              </h3>
              <ul className="space-y-2">
                {[
                  { name: 'New York', slug: 'new-york' },
                  { name: 'Los Angeles', slug: 'los-angeles' },
                  { name: 'Chicago', slug: 'chicago' },
                  { name: 'Houston', slug: 'houston' },
                  { name: 'San Francisco', slug: 'san-francisco' },
                ].map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/services/${service}/locations/${city.slug}`}
                      className="text-text-secondary hover:text-primary-main transition-colors text-sm"
                    >
                      {serviceData.name} in {city.name}
                  </Link>
                </li>
                ))}
              </ul>
            </div>
            
            {/* More US Cities */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">
                More US Cities
              </h3>
              <ul className="space-y-2">
                {[
                  { name: 'Dallas', slug: 'dallas' },
                  { name: 'Seattle', slug: 'seattle' },
                  { name: 'Miami', slug: 'miami' },
                  { name: 'Boston', slug: 'boston' },
                  { name: 'Phoenix', slug: 'phoenix' },
                ].map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/services/${service}/locations/${city.slug}`}
                      className="text-text-secondary hover:text-primary-main transition-colors text-sm"
                    >
                      {serviceData.name} in {city.name}
                  </Link>
                </li>
                ))}
              </ul>
            </div>
            
            {/* Canada */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">
                Canada
              </h3>
              <ul className="space-y-2">
                {[
                  { name: 'Toronto', slug: 'toronto' },
                  { name: 'Vancouver', slug: 'vancouver' },
                  { name: 'Montreal', slug: 'montreal' },
                  { name: 'Calgary', slug: 'calgary' },
                  { name: 'Ottawa', slug: 'ottawa' },
                ].map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/services/${service}/locations/${city.slug}`}
                      className="text-text-secondary hover:text-primary-main transition-colors text-sm"
                    >
                      {serviceData.name} in {city.name}
                  </Link>
                </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* 6. FINAL CTA                                                      */}
      {/* ────────────────────────────────────────────────────────────────── */}
      <Section background="primary">
        <Container>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Improve Your{' '}
                  {serviceData.name.split(' ')[0]} Strategy?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Get a free consultation and personalized{' '}
                  {serviceData.name} strategy for your business.
                </p>

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.9/5 Rating
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Response Within 24 Hours
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button 
                  href={`/contact?service=${service}`}
                  variant="secondary" 
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Schedule Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}
