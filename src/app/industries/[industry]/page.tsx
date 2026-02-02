// src/app/industries/[industry]/page.tsx

import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/sections/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { DefinitionBox, ListBox, StepByStep } from '@/components/seo/FeaturedSnippet';
import { EntityRichContent, SemanticRelationship, ContextBlock } from '@/components/seo/EntityRichContent';
import TopicClusterNav from '@/components/seo/TopicClusterNav';
import ContextualLinks from '@/components/seo/ContextualLinks';
import { generateTestimonialSchema, generateAggregateRatingFromReviews } from '@/lib/schema';
import { loadAllIndustryData, loadIndustryData } from '@/lib/seo';
import { 
  generateMetadata as generatePageMetadata, 
} from '@/lib/metadata';
import { 
  generateSchemaGraph, 
  generateWebPageSchema, 
  generateServiceSchema, 
  generateFAQPageSchema,
  BaseSchema,
  getSchemaContext
} from '@/lib/schema';

// Generate static parameters for all industries
export async function generateStaticParams() {
  const industries = await loadAllIndustryData();
  return industries.map(industry => ({
    industry: industry.slug
  }));
}

// Generate metadata for each industry page
export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  // Wait for params to resolve
  const params = await paramsPromise;
  const industryData = await loadIndustryData(params.industry);
  
  if (!industryData) {
    return {
      title: 'Industry Not Found',
    };
  }
  
  // Define base URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
  
  // Generate canonical URL
  const canonicalUrl = `${baseUrl}/industries/${params.industry}`;
  
  // Get base metadata 
  const baseMetadata = generatePageMetadata({
    title: industryData.metaTitle || `${industryData.name} SEO Services | ImmortalSEO`,
    description: industryData.metaDescription || `Specialized SEO solutions for ${industryData.name} businesses. Increase visibility, drive targeted traffic, and grow your ${industryData.name} business with our proven strategies.`,
    industry: {
      name: industryData.name,
    },
  });
  
  // Enhanced metadata
  return {
    ...baseMetadata,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      ...(baseMetadata.openGraph || {}),
      url: canonicalUrl,
      type: 'website',
      title: industryData.metaTitle || `${industryData.name} SEO Services | ImmortalSEO`,
      description: industryData.metaDescription || `Specialized SEO solutions for ${industryData.name} businesses. Increase visibility and grow your business.`,
      images: [
        {
          url: `${baseUrl}/images/industries/${params.industry}-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${industryData.name} SEO Services`,
        }
      ],
    },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const resolvedParams = await params;
  const industryData = await loadIndustryData(resolvedParams.industry);
  
  if (!industryData) {
    return (
      <Layout>
        <Section>
          <h1>Industry Not Found</h1>
          <p>The requested industry page could not be found.</p>
        </Section>
      </Layout>
    );
  }
  
  // Base URL for schemas
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
  const canonicalUrl = `${baseUrl}/industries/${resolvedParams.industry}`;
  
  // Get schema context
  const context = getSchemaContext();
  
  // Generate WebPage schema
  const webPageSchema = generateWebPageSchema({
    url: canonicalUrl,
    title: industryData.metaTitle || `${industryData.name} SEO Services | ImmortalSEO`,
    description: industryData.metaDescription || `Specialized SEO for ${industryData.name} businesses`,
    dateModified: new Date().toISOString(),
    breadcrumbs: [
      { name: 'Home', url: baseUrl },
      { name: 'Industries', url: `${baseUrl}/industries` },
      { name: `${industryData.name} SEO`, url: canonicalUrl },
    ],
  });
  
  // Generate Service schema
  const serviceSchema = generateServiceSchema({
    url: canonicalUrl,
    name: `${industryData.name} SEO Services`,
    description: industryData.metaDescription || `Specialized SEO solutions for ${industryData.name} businesses.`,
    serviceType: 'SEO Service',
    provider: {
      '@type': 'Organization',
      name: 'ImmortalSEO',
      url: baseUrl,
    },
  });
  
  // Initialize schemas array
  const schemas: BaseSchema[] = [
    context.organization,
    context.website,
    webPageSchema,
    serviceSchema,
  ];
  
  // Add FAQ schema if FAQs exist
  if (industryData.faq && industryData.faq.length > 0) {
    const faqs = industryData.faq.map(item => ({
      question: item.question,
      answer: item.answer
    }));
    
    schemas.push(generateFAQPageSchema(faqs));
  }

  // Add Review schemas for testimonials
  if (industryData.testimonials && industryData.testimonials.length > 0) {
    industryData.testimonials.forEach((testimonial: any) => {
      const reviewSchema = generateTestimonialSchema({
        author: testimonial.author || 'Client',
        reviewBody: testimonial.quote,
        datePublished: new Date().toISOString(),
        itemReviewed: {
          '@type': 'Service',
          name: `${industryData.name} SEO Services`,
          url: canonicalUrl,
        },
        ratingValue: 5,
      });
      schemas.push(reviewSchema);
    });

    // Add AggregateRating if we have multiple reviews
    if (industryData.testimonials.length > 1) {
      const aggregateRating = generateAggregateRatingFromReviews(
        industryData.testimonials.map(() => ({ ratingValue: 5 }))
      );
      if (aggregateRating) {
        schemas.push(aggregateRating);
      }
    }
  }
  
  // Add local business if available
  if (context.localBusiness) {
    schemas.push(context.localBusiness);
  }
  
  // Create schema graph with all schemas
  const schemaGraph = generateSchemaGraph(schemas.filter(Boolean));
  
  // Table of contents items
  const tableOfContents = [
    { id: 'overview', label: 'Industry Overview' },
    { id: 'challenges', label: 'Industry Challenges' },
    { id: 'approaches', label: 'Our Approach' },
  ];
  
  // Add conditional TOC entries
  if (industryData.strategies && industryData.strategies.length > 0) {
    tableOfContents.push({ id: 'strategies', label: 'SEO Strategies' });
  }
  
  if (industryData.marketTrends || industryData.insightSection) {
    tableOfContents.push({ id: 'insights', label: 'Industry Insights' });
  }
  
  if (industryData.caseStudies && industryData.caseStudies.length > 0) {
    tableOfContents.push({ id: 'case-studies', label: 'Success Stories' });
  }
  
  if (industryData.faq && industryData.faq.length > 0) {
    tableOfContents.push({ id: 'faq', label: 'FAQ' });
  }

  // Define breadcrumbs
  const breadcrumbs = [
    { name: 'Industries', href: '/industries' },
    { name: industryData.name, href: `/industries/${resolvedParams.industry}` }
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <JsonLd data={schemaGraph} />
      
      <PageHeader
        title={industryData.metaTitle || `${industryData.name} SEO Services`}
        subtitle={industryData.metaDescription || `Specialized SEO strategies designed for ${industryData.name} businesses to increase visibility, traffic, and revenue.`}
        backgroundImage={industryData.headerImage}
      />
      
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
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
              
              {/* Overview Section */}
              <article>
                <div id="overview" className="scroll-mt-24 mb-12">
                  <h2 className="text-3xl font-bold mb-6">
                    Industry SEO Services
                  </h2>
                  
                  <div className="prose max-w-none mb-8">
                    {industryData.extendedIntro ? (
                      <div dangerouslySetInnerHTML={{ __html: industryData.extendedIntro }} />
                    ) : (
                      <>
                        <p className="text-lg mb-4">
                          {industryData.sections?.intro || 
                            `Our specialized SEO services for ${industryData.name} businesses are designed to address the unique challenges and opportunities in your industry. We combine industry-specific expertise with advanced SEO techniques to deliver sustainable growth and increased online visibility.`}
                        </p>
                        
                        <p>
                          The ${industryData.name} sector presents unique digital marketing challenges that require specialized SEO knowledge and experience. Using our industry-focused approach, we create tailored strategies that align with your specific business goals, target audience, and competitive landscape.
                        </p>
                      </>
                    )}
                  </div>
                  
                  {/* Key Phrases / Topics */}
                  {industryData.keyPhrases && industryData.keyPhrases.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-text-secondary mb-3">Key Focus Areas:</h3>
                      <div className="flex flex-wrap gap-2">
                        {industryData.keyPhrases.map((phrase: string) => (
                          <span
                            key={phrase}
                            className="px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm"
                          >
                            {phrase}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Definition Box for "What is X SEO?" queries */}
                  <DefinitionBox
                    term={`${industryData.name} SEO`}
                    definition={industryData.sections?.intro || `Specialized SEO services designed to address the unique challenges and opportunities in the ${industryData.name} industry, combining industry-specific expertise with advanced SEO techniques.`}
                    className="mb-8"
                  />

                  {/* Semantic Relationship Block - Unique per industry */}
                  {(() => {
                    const relationships = [];
                    
                    // Add relationship to related services
                    if (industryData.relatedServices && industryData.relatedServices.length > 0) {
                      relationships.push({
                        from: 'Industry SEO',
                        relationship: 'includes',
                        to: industryData.relatedServices[0],
                        description: 'Essential service for this industry',
                      });
                    }
                    
                    // Add industry-specific relationships
                    if (industryData.keyPhrases && industryData.keyPhrases.length > 0) {
                      relationships.push({
                        from: industryData.keyPhrases[0],
                        relationship: 'drives',
                        to: 'Organic visibility',
                        description: 'Key focus area for industry success',
                      });
                    }
                    
                    relationships.push({
                      from: 'Specialized strategies',
                      relationship: 'target',
                      to: 'Industry-specific search behavior',
                      description: 'Addresses unique market dynamics',
                    });
                    
                    return relationships.length > 0 ? (
                      <SemanticRelationship
                        title="Strategic Connections"
                        relationships={relationships}
                        className="mb-8"
                      />
                    ) : null;
                  })()}
                </div>
                
                {/* Challenges Section - Using ListBox to avoid duplication */}
                <div id="challenges" className="scroll-mt-24 mb-12">
                  <div className="bg-white rounded-xl shadow-sm p-8">
                    <h2 className="text-2xl font-bold mb-6">
                      Common Challenges
                    </h2>
                    
                    {(() => {
                      const challenges = industryData.challenges || [
                        'Intense competition for industry-specific keywords',
                        'Rapidly evolving industry trends and terminology',
                        'Complex buyer journeys requiring sophisticated content strategies'
                      ];

                      return (
                        <>
                          <p className="mb-6 text-text-secondary">
                            {industryData.sections?.painPoints || 
                              `Businesses in this industry face specific challenges in the digital landscape that require specialized SEO strategies.`}
                          </p>
                          
                          {/* ListBox for Featured Snippet - Single display */}
                          <ListBox
                            title="Key Challenges"
                            items={challenges}
                            ordered={false}
                            className="mb-6"
                          />
                          
                          <p className="text-text-secondary">
                            Our specialized SEO services are designed to overcome these challenges through targeted strategies that address your specific industry requirements.
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </div>
                
                {/* Our Approach Section - Using StepByStep to avoid duplication */}
                <div id="approaches" className="scroll-mt-24 mb-12">
                  <div className="bg-white rounded-xl shadow-sm p-8">
                    <h2 className="text-2xl font-bold mb-6">
                      Our Approach
                    </h2>
                    
                    {(() => {
                      // Create process steps from approach data
                      const processSteps = industryData.strategies && industryData.strategies.length > 0
                        ? industryData.strategies.map((strategy: { name: string; description: string }, index: number) => ({
                            number: index + 1,
                            title: strategy.name,
                            description: strategy.description,
                          }))
                        : [
                            {
                              number: 1,
                              title: 'Industry-Specific Research',
                              description: 'We conduct in-depth analyses of your market, competitors, and target audience to identify SEO opportunities specific to your sector.',
                            },
                            {
                              number: 2,
                              title: 'Targeted Content Strategy',
                              description: 'Our team develops content that addresses industry-specific questions, challenges, and search behaviors to establish your authority.',
                            },
                            {
                              number: 3,
                              title: 'Industry-Relevant Link Building',
                              description: 'We build connections with authoritative sources within your industry to enhance your domain authority and search visibility.',
                            },
                            {
                              number: 4,
                              title: 'Continuous Optimization & Reporting',
                              description: 'Our team monitors performance and industry trends to continuously refine your strategy with transparent, comprehensive reporting.',
                            },
                          ];

                      return (
                        <>
                          <p className="mb-6 text-text-secondary">
                            {industryData.sections?.approach || 
                              `We take a data-driven approach to SEO, focusing on the tactics and strategies that deliver the best results for your specific industry needs.`}
                          </p>
                          
                          {/* StepByStep Component - Single display */}
                          <div itemScope itemType="https://schema.org/HowTo">
                            <StepByStep
                              title="Our Process"
                              steps={processSteps}
                              className="mb-6"
                            />
                          </div>
                          
                          <div className="mt-8">
                            <Button href="/contact" size="lg">
                              Get Your Free SEO Audit
                            </Button>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
                
                {/* Industry Insights Section - Conditional */}
                {(industryData.marketTrends || industryData.insightSection) && (
                  <div id="insights" className="scroll-mt-24 mb-12">
                    <div className="bg-white rounded-xl shadow-sm p-8">
                      <h2 className="text-2xl font-bold mb-6">
                        Industry Insights
                      </h2>
                      
                      <div className="prose max-w-none">
                        {industryData.insightSection ? (
                          <div dangerouslySetInnerHTML={{ __html: industryData.insightSection }} />
                        ) : (
                          <>
                            <p className="mb-6">
                              Understanding current trends and developments in the {industryData.name} industry is essential for an effective SEO strategy. Here are key insights that inform our approach:
                            </p>
                            
                            {industryData.marketTrends && (
                              <div className="space-y-6 mb-8">
                                {industryData.marketTrends.map((trend: {title: string; description: string}, idx: number) => (
                                  <div key={idx} className="border-l-4 border-primary-main pl-4 py-2">
                                    <h3 className="font-semibold text-xl mb-2">{trend.title}</h3>
                                    <p>{trend.description}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <p>
                              Our {industryData.name} SEO strategies leverage these insights to ensure your business stays ahead of industry developments and captures emerging opportunities.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Strategies Section removed - already shown in Approach section StepByStep to avoid duplication */}
                
                {/* Case Studies Section */}
                {industryData.caseStudies && industryData.caseStudies.length > 0 && (
                  <div id="case-studies" className="scroll-mt-24 mb-12">
                    <div className="bg-white rounded-xl shadow-sm p-8">
                      <h2 className="text-2xl font-bold mb-6">
                        Success Stories
                      </h2>
                      
                      <div className="space-y-8">
                        {industryData.caseStudies.map((caseStudy: { title: string; summary: string; results: string[] }, index: number) => (
                          <div
                            key={index}
                            className="border-l-4 border-primary-main pl-6 py-2"
                          >
                            <h3 className="text-xl font-semibold mb-3">{caseStudy.title}</h3>
                            <p className="mb-4">{caseStudy.summary}</p>
                            <h4 className="font-medium mb-2 text-text-secondary">Results:</h4>
                            <ul className="space-y-2">
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
                    </div>
                  </div>
                )}
                
                {/* FAQ Section */}
                {industryData.faq && industryData.faq.length > 0 && (
                  <div id="faq" className="scroll-mt-24">
                    <div className="bg-white rounded-xl shadow-sm p-8">
                      <h2 className="text-2xl font-bold mb-6">
                        Frequently Asked Questions
                      </h2>
                      
                      {/* Context Block for AI Understanding */}
                      <ContextBlock
                        title="Why This Matters for Your Business"
                        content={`Effective SEO requires understanding both industry-specific search behavior and broader digital marketing trends. Our approach integrates specialized knowledge with modern SEO techniques.`}
                        relatedEntities={industryData.keyPhrases?.slice(0, 5) || []}
                        className="mb-8"
                      />
                      
                      <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                        {industryData.faq.map((item: { question: string; answer: string }, index: number) => (
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
                        <h3 className="text-xl font-semibold mb-2">Have more questions?</h3>
                        <p className="text-text-secondary mb-4">Our SEO experts are ready to help with any specific questions about industry SEO strategies.</p>
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
                    </div>
                  </div>
                )}
              </article>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Industry Statistics */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-primary-main text-white p-4">
                    <h3 className="text-lg font-semibold">{industryData.name} Industry Stats</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      {industryData.statistics && Object.entries(industryData.statistics).map(([key, value]) => (
                        <li key={key} className="flex flex-col">
                          <span className="text-sm text-text-secondary">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                          <span className="text-lg font-medium">{value}</span>
                        </li>
                      ))}
                      {(!industryData.statistics || Object.keys(industryData.statistics).length === 0) && (
                        <li className="flex flex-col">
                          <span className="text-sm text-text-secondary">Industry Growth</span>
                          <span className="text-lg font-medium">Statistics coming soon</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                
                {/* Lead Capture Form */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">Get Your Free SEO Analysis</h3>
                    <p className="text-text-secondary mb-6">Discover how we can improve your business's search visibility with a customized SEO strategy.</p>
                    
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-main focus:border-primary-main"
                          placeholder="John Smith"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-main focus:border-primary-main"
                          placeholder="john@example.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                        <input
                          type="url"
                          id="website"
                          name="website"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-main focus:border-primary-main"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full bg-primary-main text-white font-medium py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
                      >
                        Request Free Analysis
                      </button>
                    </form>
                  </div>
                </div>
                
                {/* Topic Cluster Navigation */}
                <TopicClusterNav
                  pillarSlug={resolvedParams.industry}
                  currentPageType="industry"
                  className="mb-6"
                />

                {/* Contextual Links - Related Services */}
                {industryData.relatedServices && industryData.relatedServices.length > 0 && (
                  <ContextualLinks
                    links={industryData.relatedServices.slice(0, 5).map((service: string) => ({
                      url: `/services/${service.toLowerCase().replace(/\s+/g, '-')}`,
                      text: service,
                      title: service,
                      description: `Essential SEO service for your industry`,
                      relationship: 'Related service',
                    }))}
                    title="Related SEO Services"
                    maxLinks={5}
                  />
                )}
               
               {/* Testimonial */}
               {industryData.testimonials && industryData.testimonials.length > 0 && (
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
                       {industryData.testimonials[0].quote}
                     </blockquote>
                     
                     <div className="flex items-center">
                       <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                         <svg className="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                           <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                         </svg>
                       </div>
                       <div className="ml-3">
                         <p className="font-medium">{industryData.testimonials[0].author}</p>
                         <p className="text-sm text-gray-500">{industryData.testimonials[0].position}, {industryData.testimonials[0].company}</p>
                       </div>
                     </div>
                   </div>
                 </div>
               )}
               
               {/* Why Choose ImmortalSEO */}
               <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                 <div className="p-6">
                   <h3 className="text-xl font-bold mb-4">Why Choose ImmortalSEO</h3>
                   <ul className="space-y-3">
                     <li className="flex items-start">
                       <svg className="w-5 h-5 text-primary-main mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                       </svg>
                       <span>{industryData.name} industry expertise</span>
                     </li>
                     <li className="flex items-start">
                       <svg className="w-5 h-5 text-primary-main mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                       </svg>
                       <span>Tailored strategies for your business</span>
                     </li>
                     <li className="flex items-start">
                       <svg className="w-5 h-5 text-primary-main mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                       </svg>
                       <span>Transparent reporting and results</span>
                     </li>
                     <li className="flex items-start">
                       <svg className="w-5 h-5 text-primary-main mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                       </svg>
                       <span>Proven track record of success</span>
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
     
     {/* Related Services Section */}
     <Section className="bg-white">
       <Container>
         <div className="text-center mb-12">
           <h2 className="text-3xl font-bold text-gray-900 mb-4">
             SEO Services for {industryData.name} Businesses
           </h2>
           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
             We provide comprehensive SEO solutions tailored specifically for {industryData.name} companies.
           </p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* Core SEO Services */}
           <div className="bg-gray-50 p-6 rounded-lg">
             <h3 className="text-xl font-semibold mb-4 text-primary-main">Core SEO Services</h3>
             <ul className="space-y-2">
               <li>
                 <Link href="/services/technical-seo" className="text-gray-700 hover:text-primary-main transition-colors">
                   Technical SEO
                 </Link>
               </li>
               <li>
                 <Link href="/services/content-seo" className="text-gray-700 hover:text-primary-main transition-colors">
                   Content SEO
                 </Link>
               </li>
               <li>
                 <Link href="/services/local-seo" className="text-gray-700 hover:text-primary-main transition-colors">
                   Local SEO
                 </Link>
               </li>
               <li>
                 <Link href="/services/off-page-seo" className="text-gray-700 hover:text-primary-main transition-colors">
                   Off-Page SEO
                 </Link>
               </li>
             </ul>
           </div>
           
           {/* Advanced Solutions */}
           <div className="bg-gray-50 p-6 rounded-lg">
             <h3 className="text-xl font-semibold mb-4 text-primary-main">Advanced Solutions</h3>
             <ul className="space-y-2">
               <li>
                 <Link href="/services/ai-enhanced-seo" className="text-gray-700 hover:text-primary-main transition-colors">
                   AI-Enhanced SEO
                 </Link>
               </li>
               <li>
                 <Link href="/services/semantic-seo" className="text-gray-700 hover:text-primary-main transition-colors">
                   Semantic SEO
                 </Link>
               </li>
             </ul>
           </div>
           
           {/* Industry-Specific */}
           <div className="bg-gray-50 p-6 rounded-lg">
             <h3 className="text-xl font-semibold mb-4 text-primary-main">Industry-Specific</h3>
             <ul className="space-y-2">
               <li>
                 <Link href="/services/small-business-seo" className="text-gray-700 hover:text-primary-main transition-colors">
                   Small Business SEO
                 </Link>
               </li>
               <li>
                 <Link href="/services/enterprise-seo" className="text-gray-700 hover:text-primary-main transition-colors">
                   Enterprise SEO
                 </Link>
               </li>
             </ul>
           </div>
         </div>
       </Container>
     </Section>

     {/* Related Locations Section */}
     <Section className="bg-gray-50">
       <Container>
         <div className="text-center mb-12">
           <h2 className="text-3xl font-bold text-gray-900 mb-4">
             {industryData.name} SEO Services by Location
           </h2>
           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
             We provide specialized {industryData.name} SEO services to businesses across major Canadian cities.
           </p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <div className="bg-white p-6 rounded-lg shadow-sm">
             <h3 className="text-lg font-semibold mb-3 text-primary-main">Major Cities</h3>
             <ul className="space-y-2">
               <li>
                 <Link href="/services/local-seo/locations/toronto" className="text-gray-700 hover:text-primary-main transition-colors">
                   Toronto {industryData.name} SEO
                 </Link>
               </li>
               <li>
                 <Link href="/services/local-seo/locations/vancouver" className="text-gray-700 hover:text-primary-main transition-colors">
                   Vancouver {industryData.name} SEO
                 </Link>
               </li>
               <li>
                 <Link href="/services/local-seo/locations/montreal" className="text-gray-700 hover:text-primary-main transition-colors">
                   Montreal {industryData.name} SEO
                 </Link>
               </li>
               <li>
                 <Link href="/services/local-seo/locations/calgary" className="text-gray-700 hover:text-primary-main transition-colors">
                   Calgary {industryData.name} SEO
                 </Link>
               </li>
             </ul>
           </div>
           
           <div className="bg-white p-6 rounded-lg shadow-sm">
             <h3 className="text-lg font-semibold mb-3 text-primary-main">Additional Cities</h3>
             <ul className="space-y-2">
               <li>
                 <Link href="/services/local-seo/locations/ottawa" className="text-gray-700 hover:text-primary-main transition-colors">
                   Ottawa {industryData.name} SEO
                 </Link>
               </li>
               <li>
                 <Link href="/services/local-seo/locations/winnipeg" className="text-gray-700 hover:text-primary-main transition-colors">
                   Winnipeg {industryData.name} SEO
                 </Link>
               </li>
               <li>
                 <Link href="/services/local-seo/locations/quebec-city" className="text-gray-700 hover:text-primary-main transition-colors">
                   Québec City {industryData.name} SEO
                 </Link>
               </li>
             </ul>
           </div>
         </div>
       </Container>
     </Section>

     {/* Final CTA Section */}
     <Section background="primary">
       <Container>
         <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12">
           <div className="flex flex-col md:flex-row items-center">
             <div className="md:w-2/3 mb-8 md:mb-0">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">
                 Ready to Transform Your {industryData.name} Business?
               </h2>
               <p className="text-xl opacity-90 max-w-2xl">
                 Our team of SEO experts specializes in the {industryData.name} industry and is ready to help you grow.
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
                 href={`/contact?industry=${resolvedParams.industry}`}
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
}