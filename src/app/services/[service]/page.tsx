// src/app/services/[service]/page.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/seo/JsonLd';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { 
  getSchemaContext, 
  generateWebPageSchema, 
  generateServiceSchema, 
  generateFAQPageSchema,
  generateSchemaGraph,
  BaseSchema
} from '@/lib/schema';
import { ServiceData } from '@/types/service';
import fs from 'fs';
import path from 'path';

// Generate static paths for all services
export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'services.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const servicesData = JSON.parse(fileContent);
  
  return Object.keys(servicesData).map(service => ({
    service
  }));
}

// Generate metadata for each service page
export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  // Wait for params to resolve
  const params = await paramsPromise;
  const service = params.service;
  
  // Get service data
  const serviceData = await getServiceData(service);
  
  if (!serviceData) {
    return {
      title: 'Service Not Found',
      alternates: {
        canonical: 'https://www.immortalseo.com/services',
      },
    };
  }
  
  // Define base URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
  
  // Generate canonical URL
  const canonicalUrl = `${baseUrl}/services/${service}`;
  
  // Get base metadata and add canonical
  const baseMetadata = generatePageMetadata({
    title: serviceData.metaTitle,
    description: serviceData.metaDescription,
  });
  
  // Enhanced metadata for better SERP CTR
  return {
    ...baseMetadata,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      ...(baseMetadata.openGraph || {}),
      url: canonicalUrl,
      type: 'website',
      title: serviceData.metaTitle,
      description: serviceData.metaDescription,
      images: [
        {
          url: `${baseUrl}/images/services/${service}-og.jpg`, // Service-specific OG image
          width: 1200,
          height: 630,
          alt: serviceData.name,
        }
      ],
    },
    // Add Twitter card
    twitter: {
      card: 'summary_large_image',
      title: serviceData.metaTitle,
      description: serviceData.metaDescription,
      images: [`${baseUrl}/images/services/${service}-og.jpg`],
    }
  };
}

// Get service data
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

// Helper function for icon display
function getIconElement(iconName: string) {
  // Same implementation as before
  switch (iconName) {
    case 'GearIcon':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    // Add other cases
    default:
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
}

// Find related services
async function getRelatedServices(currentSlug: string, currentCategory: string) {
  // Same implementation as before
  const filePath = path.join(process.cwd(), 'src', 'data', 'services.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const servicesData = JSON.parse(fileContent);
  
  // First get services in the same category
  const sameCategory = Object.entries(servicesData)
    .filter(([slug, service]: [string, any]) => 
      slug !== currentSlug && service.category === currentCategory
    )
    .slice(0, 2)
    .map(([slug, service]: [string, any]) => ({
      slug,
      name: service.name,
      shortDescription: service.shortDescription,
      icon: service.icon
    }));
  
  // If we need more, get from other categories
  if (sameCategory.length < 3) {
    const otherCategories = Object.entries(servicesData)
      .filter(([slug, service]: [string, any]) => 
        slug !== currentSlug && service.category !== currentCategory
      )
      .slice(0, 3 - sameCategory.length)
      .map(([slug, service]: [string, any]) => ({
        slug,
        name: service.name,
        shortDescription: service.shortDescription,
        icon: service.icon
      }));
    
    return [...sameCategory, ...otherCategories];
  }
  
  return sameCategory;
}

export default async function ServiceDetailPage({ params: paramsPromise }: { params: Promise<{ service: string }> }) {
  // Wait for params to resolve
  const params = await paramsPromise;
  const service = params.service;
  
  const serviceData = await getServiceData(service);
  
  if (!serviceData) {
    notFound();
  }
  
  // Base URL for canonical and structured data
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
  const canonicalUrl = `${baseUrl}/services/${service}`;
  
  // Get schema context
  const context = getSchemaContext();
  
  // Get related services
  const relatedServicesList = await getRelatedServices(params.service, serviceData.category);
  
  
  
  // Generate WebPage schema
  const webPageSchema = generateWebPageSchema({
    url: canonicalUrl,
    title: serviceData.metaTitle || `${serviceData.name} | ImmortalSEO`,
    description: serviceData.metaDescription || serviceData.shortDescription,
    datePublished: serviceData.publishedDate || '2023-01-01T00:00:00Z',
    dateModified: serviceData.updatedDate || new Date().toISOString(),
    // Add breadcrumbs for semantic navigation
    breadcrumbs: [
      { name: 'Home', url: baseUrl },
      { name: 'Services', url: `${baseUrl}/services` },
      { name: serviceData.name, url: canonicalUrl },
    ],
  });
  
  // Generate Service schema
  const serviceSchema = generateServiceSchema({
    url: canonicalUrl,
    name: serviceData.name,
    description: serviceData.longDescription || serviceData.shortDescription,
    serviceType: serviceData.category || 'SEO Service',
    // Add service-specific details
    offers: {
      price: serviceData.price,
      priceCurrency: 'USD',
      description: `${serviceData.name} starting at ${serviceData.price || '$X,XXX'}`
    },
    // Add provider details
    provider: {
      '@type': 'Organization',
      name: 'ImmortalSEO',
      url: baseUrl,
    },
    // Add area served
    areaServed: 'Worldwide',
    // Add same as references if available
    sameAs: serviceData.sameAs || [],
  });
  
  // Initialize schemas array with existing schemas
  const schemas: BaseSchema[] = [
    context.organization,
    context.website,
    webPageSchema,
    serviceSchema,
  ];
  
  // Add FAQ schema if FAQs exist
  if (serviceData.faq && serviceData.faq.length > 0) {
    // Transform data format for our generator function
    const faqs = serviceData.faq.map((item: { question: string; answer: string }) => ({
      question: item.question,
      answer: item.answer
    }));
    
    schemas.push(generateFAQPageSchema(faqs));
  }
  
  // Add local business if available
  if (context.localBusiness) {
    schemas.push(context.localBusiness);
  }
  
  // Create schema graph with all schemas
  const schemaGraph = generateSchemaGraph(schemas.filter(Boolean));
  
  // Create table of contents for better UX and crawlability
  const tableOfContents = [
    { id: 'overview', label: 'Service Overview' },
    { id: 'benefits', label: 'Key Benefits' },
    { id: 'approach', label: 'Our Approach' },
  ];
  
  // Add conditional TOC entries based on available sections
  if (serviceData.caseStudies && serviceData.caseStudies.length > 0) {
    tableOfContents.push({ id: 'case-studies', label: 'Success Stories' });
  }
  
  
  if (serviceData.faq && serviceData.faq.length > 0) {
    tableOfContents.push({ id: 'faq', label: 'Frequently Asked Questions' });
  }
  
  // Helper to determine if a section should be displayed
  const shouldDisplaySection = (sectionName: string): boolean => {
    if (!serviceData.displaySections) return true;
    return serviceData.displaySections[sectionName as keyof typeof serviceData.displaySections] !== false;
  };

  return (
    <Layout>
      <JsonLd data={schemaGraph} />
      
      {/* Hero Section with Centered Format */}
      <section className="relative bg-gradient-to-r from-primary-dark to-primary-main text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
        </div>
        
        <Container>
          <div className="py-20 md:py-28 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-4 backdrop-blur-sm">
                {serviceData.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {serviceData.name}
              </h1>
              <p className="text-xl mb-8 opacity-90">
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

      {/* Main Content Section */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content Column - 8 columns on desktop */}
            <div className="lg:col-span-8">
              {/* Enhanced Table of Contents */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border-l-4 border-primary-main">
                <h2 className="text-xl font-semibold mb-4">On This Page</h2>
                <nav aria-label="Table of Contents">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a 
                          href={`#${item.id}`} 
                          className="flex items-center text-primary-main hover:text-primary-dark"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              
              {/* Service Overview with Schema-Friendly Markup */}
              <article>
                <div id="overview" className="scroll-mt-24">
                  <div className="flex items-center mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center mr-4">
                      {getIconElement(serviceData.icon)}
                    </div>
                    <h2 className="text-3xl font-bold">{serviceData.name}</h2>
                  </div>
                  
                  <div className="prose max-w-none mb-8">
                    <p className="text-lg text-text-secondary">{serviceData.longDescription}</p>
                  </div>

                  {/* Primary Keywords Section - Enhanced for Entity Optimization */}
                  {serviceData.primaryKeywords && (
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-text-secondary mb-3">Key Topics & Services:</h3>
                      <div className="flex flex-wrap gap-2">
                        {serviceData.primaryKeywords.map((keyword: string, index: number) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm"
                            itemProp="keywords"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Supplementary Content Section for Entity Relevance */}
                  {shouldDisplaySection('supplementaryContent') && serviceData.supplementaryContent && (
                    <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                      <h3 className="text-2xl font-bold mb-4">Why {serviceData.name} Is Important</h3>
                      
                      <div className="prose max-w-none">
                        {serviceData.supplementaryContent.importance && (
                          <p className="mb-4">{serviceData.supplementaryContent.importance}</p>
                        )}
                        
                        {serviceData.supplementaryContent.challenges && serviceData.supplementaryContent.challenges.length > 0 && (
                          <>
                            <h4 className="text-xl font-semibold mt-6 mb-3">Challenges with {serviceData.name}</h4>
                            <ul className="list-disc pl-6 mb-6">
                              {serviceData.supplementaryContent.challenges.map((challenge, index) => (
                                <li key={index}><strong>{challenge.title}</strong> - {challenge.description}</li>
                              ))}
                            </ul>
                          </>
                        )}
                        
                        {serviceData.supplementaryContent.differences && (
                          <>
                            <h4 className="text-xl font-semibold mt-6 mb-3">How {serviceData.name} Differs</h4>
                            <p>{serviceData.supplementaryContent.differences}</p>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Benefits Section */}
                <section id="benefits" className="bg-white rounded-xl shadow-sm p-8 mb-8 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-6">Key Benefits of Our {serviceData.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceData.benefits.map((benefit: string, index: number) => (
                      <div key={index} className="flex items-start" itemProp="offers" itemScope itemType="http://schema.org/Offer">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-text-secondary" itemProp="description">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </section>
                
                {/* Our Process Section */}
                <section id="approach" className="bg-white rounded-xl shadow-sm p-8 mb-8 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-6">Our {serviceData.name} Approach</h2>
                  <div className="space-y-6">
                    {serviceData.process.map((step: { title: string; description: string }, index: number) => (
                      <div key={index} className="flex" itemProp="workPerformed" itemScope itemType="http://schema.org/Action">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-main text-white font-semibold flex items-center justify-center mr-4">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2" itemProp="name">{step.title}</h3>
                          <p className="text-text-secondary" itemProp="description">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                
                {/* Service Examples Section */}
                {shouldDisplaySection('serviceExamples') && serviceData.serviceExamples && serviceData.serviceExamples.length > 0 && (
                  <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6">What Our {serviceData.name} Include</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {serviceData.serviceExamples.map((example, index) => (
                        <div key={index} className="border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                          <h3 className="text-xl font-semibold mb-3">{example.category}</h3>
                          <ul className="space-y-2 text-text-secondary">
                            {example.items.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <svg className="w-5 h-5 text-primary-main mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                
                {/* Case Studies Section */}
                {serviceData.caseStudies && serviceData.caseStudies.length > 0 && (
                  <section id="case-studies" className="bg-white rounded-xl shadow-sm p-8 mb-8 scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-6">{serviceData.name} Success Stories</h2>
                    <div className="space-y-8">
                      {serviceData.caseStudies.map((caseStudy: { title: string; description: string; results: string[] }, index: number) => (
                        <div 
                          key={index} 
                          className="border-l-4 border-primary-main pl-4 py-2"
                          itemScope 
                          itemType="http://schema.org/Review"
                        >
                          <meta itemProp="itemReviewed" content={serviceData.name} />
                          
                          <h3 className="text-xl font-semibold mb-2" itemProp="name">{caseStudy.title}</h3>
                          <p className="text-text-secondary mb-4" itemProp="reviewBody">{caseStudy.description}</p>
                          
                          <h4 className="text-lg font-medium mb-3">Results Achieved:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {caseStudy.results.map((result, idx) => (
                              <div key={idx} className="flex items-start">
                                <svg className="w-5 h-5 text-primary-main mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm">{result}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                
                
                {/* FAQ Section */}
                {serviceData.faq && serviceData.faq.length > 0 && (
                  <section id="faq" className="bg-white rounded-xl shadow-sm p-8 scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions about {serviceData.name}</h2>
                    <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
                      {serviceData.faq.map((item: { question: string; answer: string }, index: number) => (
                        <div 
                          key={index} 
                          className="border border-gray-100 rounded-lg"
                          itemScope 
                          itemProp="mainEntity" 
                          itemType="https://schema.org/Question"
                        >
                          <details className="group">
                            <summary className="flex justify-between items-center p-4 cursor-pointer list-none">
                              <h3 className="font-semibold text-lg" itemProp="name">{item.question}</h3>
                              <svg className="w-5 h-5 text-primary-main transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </summary>
                            <div 
                              className="p-4 pt-0"
                              itemScope 
                              itemProp="acceptedAnswer" 
                              itemType="https://schema.org/Answer"
                            >
                              <div itemProp="text">
                                <p className="text-text-secondary">{item.answer}</p>
                              </div>
                            </div>
                          </details>
                        </div>
                      ))}
                    </div>
                    
                    {/* Have a Question CTA */}
                    <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-2">Have a question not answered here?</h3>
                      <p className="text-text-secondary mb-4">Our SEO experts are ready to help with any specific questions about our {serviceData.name}.</p>
                      <Link 
                        href="/contact"
                        className="inline-flex items-center bg-primary-main text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
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
            
            {/* Sidebar Column - 4 columns on desktop */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Lead Capture Component */}
                <LeadCaptureForm 
                  title={`Get Started with ${serviceData.name}`}
                  description="Schedule a free consultation with our SEO experts"
                  service={serviceData.name} 
                  customSubject={`${serviceData.name} Service Inquiry`}
                  buttonText="Request Free Consultation"
                />
                
                {/* Recent Results Widget */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-primary-main text-white p-4">
                    <h3 className="text-lg font-semibold">Recent Results</h3>
                  </div>
                  <div className="p-4">
                    {serviceData.caseStudies && serviceData.caseStudies.length > 0 && (
                      <div className="space-y-4">
                        {serviceData.caseStudies[0].results.slice(0, 4).map((result, index) => {
                          // Extract number and text from result (e.g. "156% increase in organic traffic")
                          const matches = result.match(/^([+]?\d+%?|\d+[.x]?\d*) (.+)$/i);
                          
                          if (matches && matches.length >= 3) {
                            return (
                              <div key={index} className="flex items-center justify-between border-b pb-3">
                                <span className="font-medium">{matches[2]}</span>
                                <span className="text-green-600 font-bold">{matches[1]}</span>
                              </div>
                            );
                          }
                          
                          return (
                            <div key={index} className="flex items-center justify-between border-b pb-3">
                              <span className="font-medium">{result}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div className="mt-4 text-sm text-text-secondary">
                      <p>Results vary based on industry, competition, and timeline. Contact us for an estimate specific to your business.</p>
                    </div>
                  </div>
                </div>
                
                {/* Related Services */}
                {relatedServicesList.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4">Related SEO Services</h3>
                      <div className="space-y-4">
                        {relatedServicesList.map((service: any) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="block p-4 bg-gray-50 rounded-lg hover:bg-primary-main/5 transition-colors"
                          >
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-8 h-8 bg-primary-main/10 text-primary-main rounded-lg flex items-center justify-center mr-3">
                                {getIconElement(service.icon)}
                              </div>
                              <div>
                                <h4 className="font-semibold">{service.name}</h4>
                                <p className="text-sm text-text-secondary line-clamp-2 mt-1">{service.shortDescription}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <Link
                          href="/services"
                          className="inline-flex items-center text-primary-main text-sm font-medium hover:text-primary-dark"
                        >
                          View All SEO Services
                          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Testimonial */}
                {shouldDisplaySection('testimonials') && serviceData.testimonials && serviceData.testimonials.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                          <svg key={i} className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      <blockquote className="italic text-text-secondary mb-4">
                        {serviceData.testimonials[0].quote}
                      </blockquote>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                          {serviceData.testimonials[0].avatar ? (
                            <Image 
                              src={serviceData.testimonials[0].avatar} 
                              alt={serviceData.testimonials[0].author}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          ) : (
                            <svg className="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">{serviceData.testimonials[0].author}</p>
                          <p className="text-sm text-gray-500">{serviceData.testimonials[0].position}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Why Choose Us Box */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">Why Choose ImmortalSEO</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-primary-main mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>15+ years of SEO expertise</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-primary-main mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>94% client retention rate</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-primary-main mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>AI-enhanced SEO strategies</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-primary-main mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Tailored strategies, not templates</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link
                        href="/about"
                        className="text-primary-main text-sm font-medium hover:text-primary-dark inline-flex items-center"
                      >
                        Learn More About Us
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Related Resources Section */}
      {shouldDisplaySection('resources') && serviceData.resources && serviceData.resources.length > 0 && (
        <Section background="light">
          <Container>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2">Related Resources</h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Explore our guides and articles about {serviceData.name}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {serviceData.resources.map((resource, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-40 bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center bg-primary-main/10 text-primary-main">
                      {getIconElement(resource.icon)}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                    <p className="text-text-secondary mb-4 line-clamp-2">
                      {resource.description}
                    </p>
                    <Link 
                      href={resource.url}
                      className="inline-flex items-center text-primary-main hover:text-primary-dark"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center bg-primary-main text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Explore All Resources
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </Container>
        </Section>
      )}
      
      {/* CTA Section */}
      <Section background="primary">
        <Container>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Improve Your {serviceData.name.split(' ')[0]} Strategy?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Get a free consultation and personalized {serviceData.name} strategy for your business.
                </p>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium">4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-white mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm font-medium">100% Satisfaction Guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-white mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">Response Within 24 Hours</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button 
                  href={`/contact?service=${params.service}`}
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