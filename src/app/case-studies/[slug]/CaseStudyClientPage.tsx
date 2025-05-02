
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

// Case study interface - same as in the case studies list page
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

interface CaseStudyClientPageProps {
  caseStudy: CaseStudy;
}

const CaseStudyClientPage: React.FC<CaseStudyClientPageProps> = ({ caseStudy }) => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-dark to-primary-main text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
        </div>
        
        <Container>
          <div className="py-16 md:py-24 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                <Link href="/case-studies" className="inline-flex items-center text-white/80 hover:text-white text-sm font-medium">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Case Studies
                </Link>
                {caseStudy.tags.map((tag, i) => (
                  <span key={i} className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-xs font-medium backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {caseStudy.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-white/90">{caseStudy.client}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white/90">{caseStudy.industry}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white/90">{caseStudy.duration}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <p className="text-white/70 text-sm mb-1">Organic Traffic</p>
                  <p className="text-3xl font-bold">{caseStudy.results.trafficIncrease}</p>
                  <p className="text-white/70 text-sm">increase</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <p className="text-white/70 text-sm mb-1">Rankings</p>
                  <p className="text-xl font-bold">{caseStudy.results.rankingImprovement}</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <p className="text-white/70 text-sm mb-1">Conversions</p>
                  <p className="text-3xl font-bold">{caseStudy.results.conversionIncrease}</p>
                  <p className="text-white/70 text-sm">increase</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Section */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="aspect-video w-full mb-10 rounded-xl bg-primary-main/10 flex items-center justify-center">
                <span className="text-primary-main font-medium">{caseStudy.client} Featured Image</span>
              </div>
              
              <div className="prose max-w-none">
                <h2>The Challenge</h2>
                <p>{caseStudy.challenge}</p>
                
                <h2 className="mt-12">Our Solution</h2>
                <p>{caseStudy.solution}</p>
                
                <h2 className="mt-12">Key Services Implemented</h2>
                <ul>
                  {caseStudy.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
                
                <h2 className="mt-12">The Results</h2>
                <p>Our strategic implementation delivered exceptional results for {caseStudy.client}:</p>
                
                <ul>
                  <li><strong>Organic Traffic Growth:</strong> {caseStudy.results.trafficIncrease}</li>
                  <li><strong>Ranking Improvements:</strong> {caseStudy.results.rankingImprovement}</li>
                  <li><strong>Conversion Increase:</strong> {caseStudy.results.conversionIncrease}</li>
                  {caseStudy.results.additionalMetrics && Object.entries(caseStudy.results.additionalMetrics).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                  ))}
                </ul>
                
                {caseStudy.testimonial && (
                  <>
                    <h2 className="mt-12">Client Testimonial</h2>
                    <blockquote className="bg-background-paper p-6 rounded-xl not-italic">
                      <p className="mb-4">"{caseStudy.testimonial.quote}"</p>
                      <footer className="font-medium">
                        — {caseStudy.testimonial.author}, {caseStudy.testimonial.position}
                      </footer>
                    </blockquote>
                  </>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6">Ready to Achieve Similar Results?</h3>
                <p className="text-text-secondary mb-6">
                  Our strategic SEO approach can help your business achieve comparable growth. Contact us today for a free SEO audit and consultation.
                </p>
                
                <Button
                  href="/contact?ref=case-study"
                  variant="primary"
                  fullWidth
                  className="mb-4"
                >
                  Get a Free SEO Audit
                </Button>
                
                <Button
                  href="/services"
                  variant="outline"
                  fullWidth
                >
                  Explore Our Services
                </Button>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold mb-4">Project Overview</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-text-secondary">Client</p>
                      <p className="font-medium">{caseStudy.client}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-text-secondary">Industry</p>
                      <p className="font-medium">{caseStudy.industry}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-text-secondary">Project Duration</p>
                      <p className="font-medium">{caseStudy.duration}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-text-secondary">Services</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {caseStudy.services.map((service, index) => (
                          <span key={index} className="inline-block px-2 py-1 bg-primary-main/10 text-primary-main rounded-full text-xs font-medium">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Related Case Studies Section */}
      <Section background="light">
        <Container>
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">More Success Stories</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Explore Related Case Studies
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Discover how we've helped other businesses achieve exceptional results
            </p>
          </div>
          
          <div className="text-center mt-8">
            <Button 
              href="/case-studies" 
              variant="primary"
              className="hover:shadow-lg transition-shadow"
            >
              View All Case Studies
            </Button>
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
                  Ready to Achieve Similar Results?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Let's discuss how our strategic SEO approach can help your business grow. Get a free SEO audit worth $1,500 today.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button 
                  href="/contact" 
                  variant="secondary" 
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Get Your Free SEO Audit
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default CaseStudyClientPage;