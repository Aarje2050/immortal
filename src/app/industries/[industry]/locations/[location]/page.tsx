import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/sections/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import Button from '@/components/ui/Button';
import { 
  loadAllLocationData, 
  loadLocationData, 
  loadAllIndustryData, 
  loadIndustryData 
} from '@/lib/seo';
import { generateMetadata as generatePageMetadata, generateStructuredData } from '@/lib/metadata';

// Generate static parameters for all industry/location combinations
export async function generateStaticParams() {
  const industries = await loadAllIndustryData();
  const locations = await loadAllLocationData();
  
  const params = [];
  
  for (const industry of industries) {
    for (const location of locations) {
      params.push({
        industry: industry.slug,
        location: location.slug
      });
    }
  }
  
  return params;
}

// Generate metadata for each combined page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string; location: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const industryData = await loadIndustryData(resolvedParams.industry);
  const locationData = await loadLocationData(resolvedParams.location);
  
  if (!industryData || !locationData) {
    return {
      title: 'Page Not Found',
    };
  }
  
  return generatePageMetadata({
    title: `${industryData.name} SEO Services in ${locationData.name}`,
    description: `Specialized ${industryData.name} SEO strategies for businesses in ${locationData.name}. Increase visibility and grow your business with our industry-specific SEO services.`,
    industry: {
      name: industryData.name,
    },
    location: {
      name: locationData.name,
      region: locationData.province,
      country: locationData.country,
    },
  });
}

export default async function IndustryLocationPage({ 
  params 
}: { 
  params: Promise<{ industry: string; location: string }> 
}) {
  const resolvedParams = await params;
  const industryData = await loadIndustryData(resolvedParams.industry);
  const locationData = await loadLocationData(resolvedParams.location);
  
  if (!industryData || !locationData) {
    return (
      <Layout>
        <Section>
          <h1>Page Not Found</h1>
          <p>The requested industry/location page could not be found.</p>
        </Section>
      </Layout>
    );
  }
  
  const structuredData = generateStructuredData({
    type: 'Service',
    industry: {
      name: industryData.name,
    },
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
        title={`${industryData.name} SEO Services in ${locationData.name}`}
        subtitle={`Specialized SEO strategies for ${industryData.name} businesses in ${locationData.name}. Dominate local search results and outrank your competition.`}
        backgroundImage={industryData.headerImage}
      />
      
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {industryData.name} SEO Services for {locationData.name} Businesses
            </h2>
            
            <div className="prose max-w-none">
              <p className="text-lg mb-4">
                In the competitive {locationData.name} market, {industryData.name.toLowerCase()} businesses need specialized SEO strategies to stand out. Immortal SEO combines industry-specific expertise with local market knowledge to deliver results-driven solutions.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">
                Challenges for {locationData.name} {industryData.name} Businesses
              </h3>
              <p>
                {industryData.name} businesses in {locationData.name} face unique challenges including {
                  industryData.challenges && industryData.challenges.length > 0 
                    ? `${industryData.challenges[0].toLowerCase()}, ${industryData.challenges.length > 1 ? industryData.challenges[1].toLowerCase() : ''}`
                    : 'various industry-specific challenges'
                }, and adapting to {locationData.name}'s specific market conditions 
                {locationData.customContent?.challenges 
                  ? ` where ${locationData.customContent.challenges.toLowerCase()}`
                  : ''}.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">
                Our {locationData.name} {industryData.name} SEO Approach
              </h3>
              <p>
                We combine our deep understanding of {industryData.name.toLowerCase()} best practices with local {locationData.name} market insights. 
                {industryData.sections?.approach ? ` ${industryData.sections.approach}` : ''} 
                Additionally, we leverage our knowledge of the {locationData.name} market
                {locationData.customContent?.solutions 
                  ? `, where ${locationData.customContent.solutions.toLowerCase()}`
                  : ''}.
              </p>
            </div>
            
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Get Your Free {locationData.name} {industryData.name} SEO Audit
              </Button>
            </div>
          </div>
          
          <div className="bg-background-paper p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              Why Choose Specialized {industryData.name} SEO
            </h3>
            <ul className="space-y-3">
              {industryData.strategies?.slice(0, 4).map((strategy: { name: string }, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-main mr-2">✓</span>
                  <span>{strategy.name}</span>
                </li>
              )) || (
                <li className="flex items-start">
                  <span className="text-primary-main mr-2">✓</span>
                  <span>Specialized industry-specific SEO strategies</span>
                </li>
              )}
            </ul>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">
              {locationData.name} Market Insights
            </h3>
            <ul className="space-y-3">
              <li className="flex flex-col">
                <span className="text-sm text-text-secondary">Population</span>
                <span className="text-lg font-medium">{locationData.population?.toLocaleString() || 'Data coming soon'}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-sm text-text-secondary">Internet Penetration</span>
                <span className="text-lg font-medium">{locationData.localStatistics?.internetPenetration || 'N/A'}%</span>
              </li>
              <li className="flex flex-col">
                <span className="text-sm text-text-secondary">Local Search Volume</span>
                <span className="text-lg font-medium">{locationData.localStatistics?.localSearches || 'N/A'}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-sm text-text-secondary">Competition Level</span>
                <span className="text-lg font-medium">{locationData.competitionLevel || 'N/A'}</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>
      
      <Section background="light">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Our {industryData.name} SEO Strategies for {locationData.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industryData.strategies?.map((strategy: { name: string; description: string }, index: number) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-3">{strategy.name}</h3>
              <p>{strategy.description}</p>
            </div>
          )) || (
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Custom SEO Strategy</h3>
              <p>We develop tailored SEO strategies for {industryData.name} businesses in {locationData.name}.</p>
            </div>
          )}
        </div>
      </Section>
      
      {/* Combined FAQs from both industry and location */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions About {industryData.name} SEO in {locationData.name}
        </h2>
        <div className="max-w-3xl mx-auto">
          {/* Take 2 FAQs from industry and 2 from location if they exist */}
          {[
            ...(industryData.faq ? industryData.faq.slice(0, 2) : []),
            ...(locationData.faq ? locationData.faq.slice(0, 2) : [])
          ].map((item: { question: string; answer: string }, index: number) => (
            <div 
              key={index}
              className="mb-6 p-6 bg-background-paper rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
          
          {/* If no FAQs exist, show a default one */}
          {(!industryData.faq || industryData.faq.length === 0) && 
           (!locationData.faq || locationData.faq.length === 0) && (
            <div className="mb-6 p-6 bg-background-paper rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                How can SEO help my {industryData.name} business in {locationData.name}?
              </h3>
              <p>
                Specialized SEO strategies can help your {industryData.name} business in {locationData.name} 
                attract more qualified leads, increase visibility in local search results, and outperform competitors.
                Contact us for a personalized strategy tailored to your specific needs.
              </p>
            </div>
          )}
        </div>
      </Section>
      
      {/* Case Studies Section */}
      {industryData.caseStudies && industryData.caseStudies.length > 0 && (
        <Section background="light">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {industryData.name} SEO Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industryData.caseStudies.slice(0, 2).map((caseStudy: { title: string; summary: string; results: string[] }, index: number) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow"
              >
                <h3 className="text-xl font-semibold mb-3">{caseStudy.title}</h3>
                <p className="mb-4">{caseStudy.summary}</p>
                <h4 className="font-medium mb-2">Results:</h4>
                <ul className="space-y-1">
                  {caseStudy.results.map((result, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary-main mr-2">✓</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}
      
      {/* Testimonials from location */}
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
            Ready to Dominate {industryData.name} Search Results in {locationData.name}?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Our team of SEO experts specializes in the {industryData.name} industry and knows the {locationData.name} market inside and out.
          </p>
          <Button href="/contact" variant="outline" size="lg">
            Get Your Free SEO Audit
          </Button>
        </div>
      </Section>
    </Layout>
  );
}