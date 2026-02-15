import { Metadata } from 'next';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/sections/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import Button from '@/components/ui/Button';
import { loadLocationData, loadAllLocationData } from '@/lib/seo';
import { generateMetadata as generatePageMetadata, generateStructuredData } from '@/lib/metadata';
import { getSchemaContext, generateWebPageSchema, generateServiceSchema, generateSchemaGraph } from '@/lib/schema';

// Import services data
import servicesJsonData from '@/data/services.json';

// Generate static parameters for all service-location combinations dynamically
export async function generateStaticParams() {
  const services = Object.keys(servicesJsonData);
  const allLocations = await loadAllLocationData();
  
  const params = [];
  for (const service of services) {
    for (const location of allLocations) {
      params.push({ service, location: location.slug });
    }
  }
  
  return params;
}

// Generate metadata for each service-location page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; location: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const serviceData = servicesJsonData[resolvedParams.service as keyof typeof servicesJsonData];
  const locationData = await loadLocationData(resolvedParams.location);
  
  if (!serviceData || !locationData) {
    return {
      title: 'Page Not Found',
    };
  }
  
  const title = `${serviceData.name} Services in ${locationData.name} | ImmortalSEO`;
  const description = `Expert ${serviceData.name.toLowerCase()} services for ${locationData.name} businesses. Local SEO strategies tailored for ${locationData.name} market.`;
  
  return generatePageMetadata({
    title,
    description,
    location: {
      name: locationData.name,
      region: locationData.province || locationData.state,
      country: locationData.country,
    },
  });
}

export default async function ServiceLocationPage({ 
  params 
}: { 
  params: Promise<{ service: string; location: string }> 
}) {
  const resolvedParams = await params;
  const serviceData = servicesJsonData[resolvedParams.service as keyof typeof servicesJsonData];
  const locationData = await loadLocationData(resolvedParams.location);
  
  if (!serviceData || !locationData) {
    return (
      <Layout>
        <Section>
          <h1>Page Not Found</h1>
          <p>The requested service-location page could not be found.</p>
        </Section>
      </Layout>
    );
  }
  
  // Base URL for schemas
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
  const canonicalUrl = `${baseUrl}/services/${resolvedParams.service}/locations/${resolvedParams.location}`;
  
  // Get schema context
  const context = getSchemaContext();
  
  // Generate WebPage schema
  const webPageSchema = generateWebPageSchema({
    url: canonicalUrl,
    title: `${serviceData.name} Services in ${locationData.name}`,
    description: `Expert ${serviceData.name.toLowerCase()} services for ${locationData.name} businesses.`,
    datePublished: '2023-01-01T00:00:00Z',
    dateModified: new Date().toISOString(),
    breadcrumbs: [
      { name: 'Home', url: baseUrl },
      { name: 'Services', url: `${baseUrl}/services` },
      { name: serviceData.name, url: `${baseUrl}/services/${resolvedParams.service}` },
      { name: `${locationData.name} SEO`, url: canonicalUrl },
    ],
  });
  
  // Generate Service schema
  const serviceSchema = generateServiceSchema({
    url: canonicalUrl,
    name: `${serviceData.name} Services in ${locationData.name}`,
    description: `Professional ${serviceData.name.toLowerCase()} services tailored for ${locationData.name} businesses.`,
    serviceType: serviceData.name,
    areaServed: locationData.name,
    provider: {
      '@type': 'Organization',
      name: 'ImmortalSEO',
      url: baseUrl
    },
  });
  
  // Create schema graph
  const schemaGraph = generateSchemaGraph([
    context.organization,
    context.website,
    webPageSchema,
    serviceSchema,
  ].filter(Boolean));
  
  // Define breadcrumbs
  const breadcrumbs = [
    { name: 'Services', href: '/services' },
    { name: serviceData.name, href: `/services/${resolvedParams.service}` },
    { name: `${locationData.name} SEO`, href: `/services/${resolvedParams.service}/locations/${resolvedParams.location}` }
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <JsonLd data={schemaGraph} />
      
      <PageHeader
        title={`${serviceData.name} Services in ${locationData.name}`}
        subtitle={`Expert ${serviceData.name.toLowerCase()} strategies tailored for ${locationData.name} businesses. Drive local growth with our specialized approach.`}
        backgroundImage={locationData.headerImage}
      />
      
      {/* Service Overview Section */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Our {serviceData.name} Services in {locationData.name}?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {serviceData.shortDescription} Our {locationData.name} team understands the unique challenges and opportunities in this market, delivering results that matter to your local business.
              </p>
              
              <div className="space-y-4">
                {serviceData.benefits.slice(0, 4).map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-primary-main mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {locationData.name} Market Insights
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Population:</span>
                  <span className="font-semibold">{locationData.population?.toLocaleString() || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Competition Level:</span>
                  <span className="font-semibold capitalize">{locationData.competitionLevel || 'Medium'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Internet Penetration:</span>
                  <span className="font-semibold">{locationData.localStatistics?.internetPenetration || 'N/A'}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mobile Usage:</span>
                  <span className="font-semibold">{locationData.localStatistics?.mobileUsage || 'N/A'}%</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Service Process Section */}
      <Section className="bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our {serviceData.name} Process for {locationData.name} Businesses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We follow a proven methodology to deliver exceptional results for {locationData.name} businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceData.process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-main text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Related Industries Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Industries We Serve in {locationData.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our {serviceData.name.toLowerCase()} expertise spans across various industries in {locationData.name}.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Healthcare Industries */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary-main">Healthcare</h3>
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
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary-main">Services</h3>
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
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary-main">Retail & Food</h3>
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

      {/* FAQ Section */}
      {serviceData.faq && serviceData.faq.length > 0 && (
        <Section className="bg-gray-50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Common questions about our {serviceData.name.toLowerCase()} services in {locationData.name}.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {serviceData.faq.slice(0, 4).map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
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
                  Ready to Grow Your {locationData.name} Business?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Get started with our {serviceData.name.toLowerCase()} services tailored for {locationData.name} businesses.
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
                  href={`/contact?service=${resolvedParams.service}&location=${resolvedParams.location}`}
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
