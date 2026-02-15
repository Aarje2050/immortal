import { Metadata } from 'next';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/sections/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import Button from '@/components/ui/Button';
import { DefinitionBox, ListBox, StepByStep } from '@/components/seo/FeaturedSnippet';
import { EntityRichContent, SemanticRelationship, ContextBlock } from '@/components/seo/EntityRichContent';
import ContextualLinks from '@/components/seo/ContextualLinks';
import { generateTestimonialSchema, generateAggregateRatingFromReviews, getSchemaContext, generateWebPageSchema, generateFAQPageSchema, generateSchemaGraph, BaseSchema } from '@/lib/schema';
import { loadAllLocationData, loadLocationData } from '@/lib/seo';
import { generateMetadata as generatePageMetadata, generateStructuredData } from '@/lib/metadata';
import fs from 'fs';
import path from 'path';

// Generate static parameters for all locations
export async function generateStaticParams() {
  const locations = await loadAllLocationData();
  return locations.map(location => ({
    location: location.slug
  }));
}

// Generate metadata for each location page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locationData = await loadLocationData(resolvedParams.location);
  
  if (!locationData) {
    return {
      title: 'Location Not Found',
    };
  }
  
  return generatePageMetadata({
    title: locationData.metaTitle,
    description: locationData.metaDescription,
    location: {
      name: locationData.name,
      region: locationData.province || locationData.state,
      country: locationData.country,
    },
  });
}

export default async function LocationPage({ params }: { params: Promise<{ location: string }> }) {
  const resolvedParams = await params;
  const locationData = await loadLocationData(resolvedParams.location);
  
  if (!locationData) {
    return (
      <Layout>
        <Section>
          <h1>Location Not Found</h1>
          <p>The requested location page could not be found.</p>
        </Section>
      </Layout>
    );
  }
  
  // Base URL for schemas
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
  const canonicalUrl = `${baseUrl}/locations/${resolvedParams.location}`;

  // Get schema context
  const context = getSchemaContext();

  // Generate WebPage schema
  const webPageSchema = generateWebPageSchema({
    url: canonicalUrl,
    title: locationData.metaTitle || `${locationData.name} SEO Services | ImmortalSEO`,
    description: locationData.metaDescription || `Expert SEO services for businesses in ${locationData.name}`,
    dateModified: new Date().toISOString(),
    breadcrumbs: [
      { name: 'Home', url: baseUrl },
      { name: 'Locations', url: `${baseUrl}/locations` },
      { name: `${locationData.name} SEO`, url: canonicalUrl },
    ],
  });

  // Initialize schemas array
  const schemas: BaseSchema[] = [
    context.organization,
    context.website,
    webPageSchema,
  ];

  // Add LocalBusiness schema if available
  if (context.localBusiness) {
    const localBusinessSchema = {
      ...context.localBusiness,
      address: {
        '@type': 'PostalAddress',
        addressLocality: locationData.name,
        addressRegion: locationData.province || locationData.state,
        addressCountry: locationData.country,
      },
    };
    schemas.push(localBusinessSchema);
  }

  // Add FAQ schema if FAQs exist
  if (locationData.faq && locationData.faq.length > 0) {
    const faqs = locationData.faq.map((item: { question: string; answer: string }) => ({
      question: item.question,
      answer: item.answer
    }));
    
    schemas.push(generateFAQPageSchema(faqs));
  }

  // Add Review schemas for testimonials
  if (locationData.testimonials && locationData.testimonials.length > 0) {
    locationData.testimonials.forEach((testimonial: any) => {
      const reviewSchema = generateTestimonialSchema({
        author: testimonial.author || 'Client',
        reviewBody: testimonial.quote,
        datePublished: new Date().toISOString(),
        itemReviewed: {
          '@type': 'Service',
          name: `${locationData.name} SEO Services`,
          url: canonicalUrl,
        },
        ratingValue: 5,
      });
      schemas.push(reviewSchema);
    });

    // Add AggregateRating if we have multiple reviews
    if (locationData.testimonials.length > 1) {
      const aggregateRating = generateAggregateRatingFromReviews(
        locationData.testimonials.map(() => ({ ratingValue: 5 }))
      );
      if (aggregateRating) {
        schemas.push(aggregateRating);
      }
    }
  }

  // Create schema graph
  const schemaGraph = generateSchemaGraph(schemas.filter(Boolean));

  // Define breadcrumbs
  const breadcrumbs = [
    { name: 'Locations', href: '/locations' },
    { name: `${locationData.name} SEO`, href: `/locations/${resolvedParams.location}` }
  ];

  // Find related industries for this location
  const relatedIndustries = (() => {
    try {
      const industriesPath = path.join(process.cwd(), 'src', 'data', 'industries');
      const industryFiles = fs.readdirSync(industriesPath).filter((f: string) => f.endsWith('.json'));
      return industryFiles
        .map((file: string) => {
          const filePath = path.join(industriesPath, file);
          const industryData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          const slug = file.replace('.json', '');
          // Match industries based on keyIndustries in location data
          if (locationData.keyIndustries && locationData.keyIndustries.some((ki: string) => 
            industryData.name.toLowerCase().includes(ki.toLowerCase()) || 
            ki.toLowerCase().includes(industryData.name.toLowerCase())
          )) {
            return {
              slug,
              name: industryData.name,
              url: `/industries/${slug}`,
              description: industryData.metaDescription?.substring(0, 100),
            };
          }
          return null;
        })
        .filter((item): item is { slug: string; name: string; url: string; description: string } => item !== null)
        .slice(0, 5);
    } catch (error) {
      return [];
    }
  })();

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <JsonLd data={schemaGraph} />
      
      <PageHeader
        title={`${locationData.name} SEO Services`}
        subtitle={`Expert SEO services designed to help ${locationData.name} businesses grow and succeed online.`}
        backgroundImage={locationData.headerImage}
      />
      
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-8">
              <article>
                <div id="overview" className="scroll-mt-24 mb-12">
                  <h2 className="text-3xl font-bold mb-6">
                    Local SEO Services
                  </h2>
                  
                  <div className="prose max-w-none mb-8">
                    <p className="text-lg mb-4">
                      {locationData.customContent?.intro || 
                        `We provide specialized SEO services for businesses in ${locationData.name}, combining local market knowledge with advanced SEO techniques to help you dominate local search results.`}
                    </p>
                  </div>

                  {/* Definition Box for "What is [Location] SEO?" queries */}
                  <DefinitionBox
                    term={`${locationData.name} SEO`}
                    definition={locationData.customContent?.intro || `Specialized SEO services designed to help businesses in ${locationData.name} improve their local search visibility, attract nearby customers, and grow their online presence.`}
                    className="mb-8"
                  />

                  {/* Semantic Relationship Block - Unique per location */}
                  {(() => {
                    const relationships = [];
                    
                    // Add relationship to key industries
                    if (locationData.keyIndustries && locationData.keyIndustries.length > 0) {
                      relationships.push({
                        from: 'Local SEO',
                        relationship: 'serves',
                        to: locationData.keyIndustries[0],
                        description: 'Primary industry in this location',
                      });
                    }
                    
                    relationships.push({
                      from: 'Location-based strategies',
                      relationship: 'target',
                      to: 'Local search queries',
                      description: 'Optimizes for "near me" and location-specific searches',
                    });
                    
                    relationships.push({
                      from: 'Google Business Profile',
                      relationship: 'enhances visibility in',
                      to: 'Map pack results',
                      description: 'Critical for local business discovery',
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
                      Common Local Challenges
                    </h2>
                    
                    {(() => {
                      const challenges = locationData.customContent?.challenges 
                        ? [locationData.customContent.challenges]
                        : [
                            'Intense competition for local search rankings',
                            'Limited visibility in Google Maps and local pack',
                            'Difficulty reaching nearby customers effectively',
                            'Managing online reputation across multiple platforms',
                          ];

                      return (
                        <>
                          <p className="mb-6 text-text-secondary">
                            Businesses in this area face unique challenges in the digital landscape that require specialized local SEO strategies.
                          </p>
                          
                          {/* ListBox for Featured Snippet - Single display */}
                          <ListBox
                            title="Key Challenges"
                            items={challenges}
                            ordered={false}
                            className="mb-6"
                          />
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Solutions Section - Using StepByStep */}
                <div id="solutions" className="scroll-mt-24 mb-12">
                  <div className="bg-white rounded-xl shadow-sm p-8">
                    <h2 className="text-2xl font-bold mb-6">
                      Our Local SEO Approach
            </h2>
                    
                    {(() => {
                      const processSteps = [
                        {
                          number: 1,
                          title: 'Google Business Profile Optimization',
                          description: 'We optimize your Google Business Profile with accurate information, photos, and regular updates to improve your visibility in local search and map results.',
                        },
                        {
                          number: 2,
                          title: 'Local Citation Building',
                          description: 'We build consistent citations across local directories and industry-specific platforms to establish your business as a trusted local authority.',
                        },
                        {
                          number: 3,
                          title: 'Location-Specific Content',
                          description: 'We create content that targets local keywords and addresses location-specific search queries to attract nearby customers.',
                        },
                        {
                          number: 4,
                          title: 'Local Link Building',
                          description: 'We build relationships with local businesses, organizations, and media to earn quality local backlinks that boost your local authority.',
                        },
                        {
                          number: 5,
                          title: 'Ongoing Monitoring & Optimization',
                          description: 'We continuously monitor your local rankings, track competitor activity, and optimize your strategy to maintain and improve your local visibility.',
                        },
                      ];

                      return (
                        <>
                          <p className="mb-6 text-text-secondary">
                            {locationData.customContent?.solutions || 
                              `Our team of SEO experts develops tailored strategies for businesses in this area, focusing on local search optimization and community engagement.`}
                          </p>
                          
                          {/* StepByStep Component - Single display */}
                          <div itemScope itemType="https://schema.org/HowTo">
                            <StepByStep
                              title="Our Local SEO Process"
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

                {/* Entity-Rich Content Section */}
                <section className="bg-white rounded-xl shadow-sm p-8 mb-12">
                  <EntityRichContent
                    title="Related Industries & Services"
                    entities={[
                      ...relatedIndustries.slice(0, 3).map((industry) => ({
                        entity: industry.name,
                        description: industry.description,
                        url: industry.url,
                        type: 'industry' as const,
                      })),
                      {
                        entity: 'Local SEO',
                        description: 'Essential service for location-based businesses',
                        url: '/services/local-seo',
                        type: 'service' as const,
                      },
                      {
                        entity: 'Google Business Profile',
                        description: 'Critical for local business visibility',
                        type: 'concept' as const,
                      },
                    ]}
                  />
                </section>

                {/* Context Block for AI Understanding */}
                <section className="bg-white rounded-xl shadow-sm p-8 mb-12">
                  <ContextBlock
                    title="Why Local SEO Matters"
                    content={`Effective local SEO for businesses in ${locationData.name} requires understanding both local search behavior and broader digital marketing trends. Our approach integrates location-specific knowledge with modern SEO techniques to ensure visibility across all platforms where your target audience searches.`}
                    relatedEntities={[
                      ...(locationData.keyIndustries?.slice(0, 5) || []),
                      'Local SEO',
                      'Google Business Profile',
                      'Local Citations',
                    ]}
                  />
                </section>
              </article>
          </div>
          
            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Location Statistics */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-primary-main text-white p-4">
                    <h3 className="text-lg font-semibold">Local SEO Statistics</h3>
                  </div>
                  <div className="p-6">
            <ul className="space-y-4">
              <li className="flex flex-col">
                <span className="text-sm text-text-secondary">Internet Penetration</span>
                <span className="text-lg font-medium">{locationData.localStatistics?.internetPenetration || 'N/A'}%</span>
              </li>
              <li className="flex flex-col">
                <span className="text-sm text-text-secondary">Mobile Usage</span>
                <span className="text-lg font-medium">{locationData.localStatistics?.mobileUsage || 'N/A'}%</span>
              </li>
              <li className="flex flex-col">
                <span className="text-sm text-text-secondary">Local Search Volume</span>
                <span className="text-lg font-medium">{locationData.localStatistics?.localSearches || 'N/A'}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-sm text-text-secondary">Voice Search Trend</span>
                <span className="text-lg font-medium">{locationData.localStatistics?.voiceSearchTrend || 'N/A'}</span>
              </li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">
                      Key Industries
            </h3>
            <div className="flex flex-wrap gap-2">
              {locationData.keyIndustries?.map((industry: string) => (
                <span
                  key={industry}
                  className="px-3 py-1 bg-primary-light bg-opacity-10 text-primary-main rounded-full text-sm"
                >
                  {industry}
                </span>
              )) || <p>Information about key industries coming soon.</p>}
            </div>
          </div>
        </div>

                {/* Contextual Links - Related Industries */}
                {relatedIndustries.length > 0 && (
                  <ContextualLinks
                    links={relatedIndustries.map((industry) => ({
                      url: industry.url,
                      text: industry.name,
                      title: `${industry.name} SEO`,
                      description: industry.description,
                      relationship: 'Industry we serve',
                    }))}
                    title="Industries We Serve"
                    maxLinks={5}
                  />
                )}

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
                      
                      <button
                        type="submit"
                        className="w-full bg-primary-main text-white font-medium py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
                      >
                        Request Free Analysis
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      {locationData.faq && locationData.faq.length > 0 && (
        <Section background="light">
          <Container>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions
          </h2>
            
            {/* Context Block for AI Understanding */}
            <ContextBlock
              title="Why Local SEO Matters for Your Business"
              content={`Effective local SEO requires understanding both location-specific search behavior and broader digital marketing trends. Our approach integrates local knowledge with modern SEO techniques.`}
              relatedEntities={locationData.keyIndustries?.slice(0, 5) || []}
              className="mb-8 max-w-3xl mx-auto"
            />
          <div className="max-w-3xl mx-auto">
            {locationData.faq.map((item: { question: string; answer: string }, index: number) => (
              <div 
                key={index}
                className="mb-6 p-6 bg-white rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
          </Container>
        </Section>
      )}
      
      {locationData.testimonials && locationData.testimonials.length > 0 && (
        <Section>
          <Container>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Client Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locationData.testimonials.map((testimonial: { quote: string; author: string; position: string; company: string }, index: number) => (
              <div
                key={index}
                className="p-6 bg-background-paper rounded-lg"
              >
                <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-text-secondary">
                    {testimonial.position}, {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
          </Container>
        </Section>
      )}
      
      {/* Related Services Section - Links to service+location combo pages */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              SEO Services Available in {locationData.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our specialized SEO services tailored for {locationData.name} businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Core SEO Services */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary-main">Core SEO Services</h3>
              <ul className="space-y-2">
                {[
                  { name: 'Technical SEO', slug: 'technical-seo' },
                  { name: 'Content SEO', slug: 'content-seo' },
                  { name: 'Local SEO', slug: 'local-seo' },
                  { name: 'Off-Page SEO', slug: 'off-page-seo' },
                ].map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}/locations/${resolvedParams.location}`} className="text-gray-700 hover:text-primary-main transition-colors">
                      {service.name} in {locationData.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Advanced Solutions */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary-main">Advanced Solutions</h3>
              <ul className="space-y-2">
                {[
                  { name: 'AI-Enhanced SEO', slug: 'ai-enhanced-seo' },
                  { name: 'Semantic SEO', slug: 'semantic-seo' },
                  { name: 'E-commerce SEO', slug: 'ecommerce-seo' },
                ].map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}/locations/${resolvedParams.location}`} className="text-gray-700 hover:text-primary-main transition-colors">
                      {service.name} in {locationData.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Business-Specific */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary-main">Business-Specific</h3>
              <ul className="space-y-2">
                {[
                  { name: 'Small Business SEO', slug: 'small-business-seo' },
                  { name: 'Enterprise SEO', slug: 'enterprise-seo' },
                  { name: 'SaaS & B2B SEO', slug: 'saas-seo' },
                ].map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}/locations/${resolvedParams.location}`} className="text-gray-700 hover:text-primary-main transition-colors">
                      {service.name} in {locationData.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Industries Section */}
      <Section className="bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide specialized SEO services to various industries in this area.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Healthcare Industries */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-primary-main">Healthcare</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/industries/dermatologist" className="text-gray-700 hover:text-primary-main transition-colors">
                    Dermatologist SEO
                  </Link>
                </li>
                <li>
                  <Link href="/industries/ivf-hospitals" className="text-gray-700 hover:text-primary-main transition-colors">
                    IVF Hospitals SEO
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Service Industries */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-primary-main">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/industries/plumbing-service" className="text-gray-700 hover:text-primary-main transition-colors">
                    Plumbing SEO
                  </Link>
                </li>
                <li>
                  <Link href="/industries/house-cleaning" className="text-gray-700 hover:text-primary-main transition-colors">
                    House Cleaning SEO
                  </Link>
                </li>
                <li>
                  <Link href="/industries/towing-service" className="text-gray-700 hover:text-primary-main transition-colors">
                    Towing Service SEO
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Retail & Food */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-primary-main">Retail & Food</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/industries/restaurants" className="text-gray-700 hover:text-primary-main transition-colors">
                    Restaurant SEO
                  </Link>
                </li>
                <li>
                  <Link href="/industries/e-commerce" className="text-gray-700 hover:text-primary-main transition-colors">
                    E-commerce SEO
                  </Link>
                </li>
                <li>
                  <Link href="/industries/tattoo-shops" className="text-gray-700 hover:text-primary-main transition-colors">
                    Tattoo Shop SEO
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="primary">
        <Container>
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Dominate Local Search Results?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Our team of SEO experts is ready to help your business grow and succeed online.
          </p>
          <Button href="/contact" variant="outline" size="lg">
            Get Your Free SEO Audit
          </Button>
        </div>
        </Container>
      </Section>
    </Layout>
  );
}