import { Metadata } from 'next';
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
  params: { location: string };
}): Promise<Metadata> {
  const locationData = await loadLocationData(params.location);
  
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

export default async function LocationPage({ params }: { params: { location: string } }) {
  const locationData = await loadLocationData(params.location);
  
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

  return (
    <Layout>
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