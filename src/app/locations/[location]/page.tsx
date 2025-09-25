import { Metadata } from 'next';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/sections/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import Button from '@/components/ui/Button';
import { loadAllLocationData, loadLocationData } from '@/lib/seo';
import { generateMetadata as generatePageMetadata, generateStructuredData } from '@/lib/metadata';

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
      region: locationData.province,
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
  
  const structuredData = generateStructuredData({
    type: 'Service',
    location: {
      name: locationData.name,
      region: locationData.province,
      country: locationData.country,
    },
  });

  // Define breadcrumbs
  const breadcrumbs = [
    { name: 'Locations', href: '/locations' },
    { name: `${locationData.name} SEO`, href: `/locations/${resolvedParams.location}` }
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <JsonLd data={structuredData} />
      
      <PageHeader
        title={`${locationData.name} SEO Services`}
        subtitle={`Expert SEO services designed to help ${locationData.name} businesses grow and succeed online.`}
        backgroundImage={locationData.headerImage}
      />
      
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              SEO Services in {locationData.name}
            </h2>
            <div className="prose max-w-none">
              {/* Use optional chaining for potentially undefined properties */}
              <p className="text-lg mb-4">{locationData.customContent?.intro || 
                `We provide specialized SEO services for businesses in ${locationData.name}.`}</p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">
                Challenges for {locationData.name} Businesses
              </h3>
              <p>{locationData.customContent?.challenges || 
                `Businesses in ${locationData.name} face unique challenges in the digital landscape.`}</p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">
                Our {locationData.name} SEO Solutions
              </h3>
              <p>{locationData.customContent?.solutions || 
                `Our team of SEO experts develops tailored strategies for businesses in ${locationData.name}.`}</p>
            </div>
            
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Get Your Free {locationData.name} SEO Audit
              </Button>
            </div>
          </div>
          
          <div className="bg-background-paper p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              {locationData.name} SEO Statistics
            </h3>
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
              Key Industries in {locationData.name}
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
      </Section>
      
      {locationData.faq && locationData.faq.length > 0 && (
        <Section background="light">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions About SEO in {locationData.name}
          </h2>
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
        </Section>
      )}
      
      {locationData.testimonials && locationData.testimonials.length > 0 && (
        <Section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            What Our {locationData.name} Clients Say
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
        </Section>
      )}
      
      {/* Related Services Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              SEO Services for {locationData.name} Businesses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive SEO solutions to help {locationData.name} businesses dominate local search results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Core SEO Services */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary-main">Core SEO Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`/services/technical-seo/locations/${resolvedParams.location}`} className="text-gray-700 hover:text-primary-main transition-colors">
                    Technical SEO {locationData.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/services/content-seo/locations/${resolvedParams.location}`} className="text-gray-700 hover:text-primary-main transition-colors">
                    Content SEO {locationData.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/services/local-seo/locations/${resolvedParams.location}`} className="text-gray-700 hover:text-primary-main transition-colors">
                    Local SEO {locationData.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/services/off-page-seo/locations/${resolvedParams.location}`} className="text-gray-700 hover:text-primary-main transition-colors">
                    Off-Page SEO {locationData.name}
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Advanced Solutions */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary-main">Advanced Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`/services/ai-enhanced-seo/locations/${resolvedParams.location}`} className="text-gray-700 hover:text-primary-main transition-colors">
                    AI-Enhanced SEO {locationData.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/services/semantic-seo/locations/${resolvedParams.location}`} className="text-gray-700 hover:text-primary-main transition-colors">
                    Semantic SEO {locationData.name}
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Industry-Specific */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary-main">Industry-Specific</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`/services/small-business-seo/locations/${resolvedParams.location}`} className="text-gray-700 hover:text-primary-main transition-colors">
                    Small Business SEO {locationData.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/services/enterprise-seo/locations/${resolvedParams.location}`} className="text-gray-700 hover:text-primary-main transition-colors">
                    Enterprise SEO {locationData.name}
                  </Link>
                </li>
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
              Industries We Serve in {locationData.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide specialized SEO services to various industries in {locationData.name}.
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
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Dominate {locationData.name}'s Search Results?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Our team of SEO experts is ready to help your {locationData.name} business grow.
          </p>
          <Button href="/contact" variant="outline" size="lg">
            Get Your Free SEO Audit
          </Button>
        </div>
      </Section>
    </Layout>
  );
}