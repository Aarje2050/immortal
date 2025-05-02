import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import PageHeader from '@/components/sections/PageHeader';
import Button from '@/components/ui/Button';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { loadAllIndustryData } from '@/lib/seo';
import { IndustryData } from '@/types/site';

export const metadata: Metadata = generatePageMetadata({
  title: 'Industry-Specific SEO Services | Immortal SEO',
  description: 'Explore our specialized SEO strategies for different industries. Find tailored solutions for your specific business sector.',
});

export default async function IndustriesPage() {
  const allIndustries = await loadAllIndustryData();

  return (
    <Layout>
      <PageHeader
        title="Industry-Specific SEO Services"
        subtitle="Tailored strategies for your unique business sector"
      />
      
      <Section>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-center mb-12">
            Every industry has unique challenges and opportunities in search. Our industry-specific 
            SEO strategies are designed to address the particular needs of your business sector.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allIndustries.map((industry) => (
              <div
                key={industry.slug}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-bold mb-3">{industry.name} SEO</h2>
                <p className="text-text-secondary mb-4">
                  {industry.description || `Specialized SEO strategies for ${industry.name.toLowerCase()} businesses.`}
                </p>
                
                {industry.keyPhrases && industry.keyPhrases.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Key Focus Areas:</h3>
                    <div className="flex flex-wrap gap-2">
                      {industry.keyPhrases.slice(0, 3).map((phrase) => (
                        <span
                          key={phrase}
                          className="px-3 py-1 bg-primary-light bg-opacity-10 text-primary-main rounded-full text-sm"
                        >
                          {phrase}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <Button href={`/industries/${industry.slug}`} variant="text">
                  Learn More &rarr;
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Section>
      
      <Section background="light">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Don't See Your Industry?
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            We work with businesses across many sectors. Contact us to learn how we can help with your specific industry.
          </p>
          <Button href="/contact" size="lg">
            Contact Us
          </Button>
        </div>
      </Section>
    </Layout>
  );
}