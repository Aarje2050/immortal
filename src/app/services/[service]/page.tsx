// src/app/services/[service]/page.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/seo/JsonLd';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';
import { generateMetadata as generatePageMetadata, generateStructuredData } from '@/lib/metadata';
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
  params,
}: {
  params: { service: string };
}): Promise<Metadata> {
  const serviceData = await getServiceData(params.service);
  
  if (!serviceData) {
    return {
      title: 'Service Not Found',
    };
  }
  
  return generatePageMetadata({
    title: serviceData.metaTitle,
    description: serviceData.metaDescription,
  });
}

async function getServiceData(slug: string) {
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
  switch (iconName) {
    case 'GearIcon':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'LanguageIcon':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      );
    case 'MicrophoneIcon':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      );
    case 'DocumentIcon':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'RobotIcon':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
}

export default async function ServiceDetailPage({ params }: { params: { service: string } }) {
  const serviceData = await getServiceData(params.service);
  
  if (!serviceData) {
    notFound();
  }
  
  // Generate structured data for rich snippets
  const structuredData = generateStructuredData({
    type: 'Service',
    name: serviceData.name,
    description: serviceData.longDescription,
    provider: {
      name: 'ImmortalSEO',
      url: 'https://immortalseo.com'
    }
  });
  
  // Generate FAQ structured data
  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": serviceData.faq ? serviceData.faq.map((item: { question: string; answer: string }) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    })) : []
  };

  // Find related services (up to 3, excluding current service)
  const relatedServices = async () => {
    const filePath = path.join(process.cwd(), 'src', 'data', 'services.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const servicesData = JSON.parse(fileContent);
    
    return Object.entries(servicesData)
      .filter(([slug, _]) => slug !== params.service)
      .slice(0, 3)
      .map(([slug, service]: [string, any]) => ({
        slug,
        name: service.name,
        shortDescription: service.shortDescription,
        icon: service.icon
      }));
  };
  
  const relatedServicesList = await relatedServices();

  return (
    <Layout>
      <JsonLd data={structuredData} />
      <JsonLd data={faqSchemaData} />
      
      {/* Hero Section with Gradient Background */}
      <section className="relative bg-gradient-to-r from-primary-dark to-primary-main text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
        </div>
        
        <Container>
          <div className="py-20 md:py-28 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-4 backdrop-blur-sm">
                Expert SEO Services
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
                  Explore Benefits
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

      {/* Service Overview Section */}
      <Section id="overview">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content - 8 columns */}
            <div className="lg:col-span-8">
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center mr-4">
                  {getIconElement(serviceData.icon)}
                </div>
                <h2 className="text-3xl font-bold">{serviceData.name}</h2>
              </div>
              
              <div className="prose max-w-none mb-8">
                <p className="text-lg text-text-secondary">{serviceData.longDescription}</p>
              </div>
              
              {/* Benefits Section */}
              <div id="benefits" className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6">Key Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceData.benefits.map((benefit: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-text-secondary">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Our Process Section */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6">Our Approach</h3>
                <div className="space-y-6">
                  {serviceData.process.map((step: { title: string; description: string }, index: number) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-main text-white font-semibold flex items-center justify-center mr-4">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                        <p className="text-text-secondary">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Case Studies Section (if available) */}
              {serviceData.caseStudies && serviceData.caseStudies.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                  <h3 className="text-2xl font-bold mb-6">Success Stories</h3>
                  {serviceData.caseStudies.map((caseStudy: { title: string; description: string; results: string[] }, index: number) => (
                    <div key={index}>
                      <h4 className="text-xl font-semibold mb-3">{caseStudy.title}</h4>
                      <p className="text-text-secondary mb-4">{caseStudy.description}</p>
                      <h5 className="font-semibold mb-2">Results:</h5>
                      <ul className="space-y-2 mb-0">
                        {caseStudy.results.map((result, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="w-5 h-5 text-primary-main mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              
              {/* FAQ Section */}
              {serviceData.faq && serviceData.faq.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {serviceData.faq.map((item: { question: string; answer: string }, index: number) => (
                      <details
                        key={index}
                        className="group bg-gray-50 rounded-lg overflow-hidden"
                      >
                        <summary className="flex justify-between items-center p-4 cursor-pointer list-none">
                          <h4 className="font-semibold text-lg">{item.question}</h4>
                          <svg className="w-5 h-5 text-primary-main transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="p-4 pt-0">
                          <p className="text-text-secondary">{item.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar - 4 columns */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* CTA Box - Using our new component */}
                <LeadCaptureForm 
                  title="Ready to Get Started?"
                  description="Schedule a free consultation with our experts"
                  service={serviceData.name} 
                  customSubject={`New Lead for ${serviceData.name} Service - ImmortalSEO`}
                  buttonText="Request Free Consultation"
                />
                
                {/* Related Services */}
                {relatedServicesList.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4">Related Services</h3>
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
                              </div>
                            </div>
                          </Link>
                        ))}
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
                        <span>Proven results with 94% client retention</span>
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
                        <span>Transparent reporting and communication</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link
                        href="/about"
                        className="inline-flex items-center text-primary-main font-medium hover:text-primary-dark"
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
      
      {/* CTA Section */}
      <Section background="primary">
        <Container>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Enhance Your {serviceData.name.split(' ')[0]} Strategy?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Get a free consultation and discover how our {serviceData.name.toLowerCase()} services can help your business grow.
                </p>
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