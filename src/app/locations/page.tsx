import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import PageHeader from '@/components/sections/PageHeader';
import Button from '@/components/ui/Button';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { loadAllLocationData } from '@/lib/seo';
import { LocationData } from '@/types/site';

export const metadata: Metadata = generatePageMetadata({
  title: 'Locations | Immortal SEO',
  description: 'We provide specialized SEO services for businesses across North America. Find location-specific SEO strategies for your city or region.',
});

export default async function LocationsPage() {
  const allLocations = await loadAllLocationData();
  
  // Group locations by country
  const locationsByCountry: Record<string, LocationData[]> = {};
  
  allLocations.forEach((location) => {
    if (!locationsByCountry[location.country]) {
      locationsByCountry[location.country] = [];
    }
    locationsByCountry[location.country].push(location);
  });

  return (
    <Layout>
      <PageHeader
        title="SEO Services by Location"
        subtitle="Specialized strategies for businesses in cities and regions across North America"
      />
      
      <Section>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-center mb-12">
            Our local SEO experts understand the unique challenges and opportunities of each market. 
            Find location-specific SEO strategies tailored to your city or region.
          </p>
          
          {Object.entries(locationsByCountry).map(([country, locations]) => (
            <div key={country} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-gray-200">
                {country}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {locations.map((location) => (
                  <div
                    key={location.slug}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                    {location.province && (
                      <p className="text-text-secondary text-sm mb-2">{location.province}</p>
                    )}
                    <p className="text-text-secondary mb-3">
                      Population: {location.population?.toLocaleString()}
                    </p>
                    <Button href={`/locations/${location.slug}`} variant="text">
                      SEO in {location.name} &rarr;
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
      
      <Section background="light">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Don't See Your Location?
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            We serve businesses worldwide. Contact us to learn how we can help with your specific location.
          </p>
          <Button href="/contact" size="lg">
            Contact Us
          </Button>
        </div>
      </Section>
    </Layout>
  );
}