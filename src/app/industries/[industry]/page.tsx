import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/sections/PageHeader';
import JsonLd from '@/components/seo/JsonLd';
import Button from '@/components/ui/Button';
import { loadAllIndustryData, loadIndustryData } from '@/lib/seo';
import { generateMetadata as generatePageMetadata, generateStructuredData } from '@/lib/metadata';

// Generate static parameters for all industries
export async function generateStaticParams() {
  const industries = await loadAllIndustryData();
  return industries.map(industry => ({
    industry: industry.slug
  }));
}

// Generate metadata for each industry page
export async function generateMetadata({
  params,
}: {
  params: { industry: string };
}): Promise<Metadata> {
  const industryData = await loadIndustryData(params.industry);
  
  if (!industryData) {
    return {
      title: 'Industry Not Found',
    };
  }
  
  return generatePageMetadata({
    title: industryData.metaTitle,
    description: industryData.metaDescription,
    industry: {
      name: industryData.name,
    },
  });
}

export default async function IndustryPage({ params }: { params: { industry: string } }) {
  const industryData = await loadIndustryData(params.industry);
  
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
  
  const structuredData = generateStructuredData({
    type: 'Service',
    industry: {
      name: industryData.name,
    },
  });

  return (
    <Layout>
      <JsonLd data={structuredData} />
      
      <PageHeader
        title={`${industryData.name} SEO Services`}
        subtitle={`Specialized SEO strategies designed for ${industryData.name} businesses to increase visibility, traffic, and revenue.`}
        backgroundImage={industryData.headerImage}
      />
      
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              SEO for {industryData.name} Businesses
            </h2>
            <div className="prose max-w-none">
              <p className="text-lg mb-4">{industryData.sections?.intro || 
                `Our specialized SEO services for ${industryData.name} businesses are designed to address the unique challenges and opportunities in your industry.`}</p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">
                Challenges for {industryData.name} Businesses
              </h3>
              <p>{industryData.sections?.painPoints || 
                `${industryData.name} businesses face specific challenges in the digital landscape that require specialized SEO strategies.`}</p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">
                Our {industryData.name} SEO Approach
              </h3>
              <p>{industryData.sections?.approach || 
                `We take a data-driven approach to ${industryData.name} SEO, focusing on the tactics and strategies that deliver the best results for your specific industry.`}</p>
            </div>
            
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Get Your Free {industryData.name} SEO Audit
              </Button>
            </div>
          </div>
          
          <div className="bg-background-paper p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              {industryData.name} SEO Statistics
            </h3>
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
            
            <h3 className="text-xl font-semibold mt-8 mb-4">
              Key Focus Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {industryData.keyPhrases?.map((phrase: string) => (
                <span
                  key={phrase}
                  className="px-3 py-1 bg-primary-light bg-opacity-10 text-primary-main rounded-full text-sm"
                >
                  {phrase}
                </span>
              )) || (
                <span className="text-text-secondary">
                  Custom strategies for {industryData.name} businesses
                </span>
              )}
            </div>
          </div>
        </div>
      </Section>
      
      <Section background="light">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Our {industryData.name} SEO Strategies
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
            <div className="p-6 bg-white rounded-lg shadow-sm col-span-full text-center">
              <h3 className="text-xl font-semibold mb-3">Customized Strategy Development</h3>
              <p>
                We develop tailored SEO strategies specific to the {industryData.name} industry.
                Contact us to learn how we can help your business grow.
              </p>
            </div>
          )}
        </div>
      </Section>
      
      {industryData.faq && industryData.faq.length > 0 && (
        <Section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions About {industryData.name} SEO
          </h2>
          <div className="max-w-3xl mx-auto">
            {industryData.faq.map((item: { question: string; answer: string }, index: number) => (
              <div 
                key={index}
                className="mb-6 p-6 bg-background-paper rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </Section>
      )}
      
      {industryData.caseStudies && industryData.caseStudies.length > 0 && (
        <Section background="light">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {industryData.name} SEO Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industryData.caseStudies.map((caseStudy: { title: string; summary: string; results: string[] }, index: number) => (
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
      
      <Section background="primary">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your {industryData.name} Business?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Our team of SEO experts specializes in the {industryData.name} industry and is ready to help you grow.
          </p>
          <Button href="/contact" variant="outline" size="lg">
            Get Your Free SEO Audit
          </Button>
        </div>
      </Section>
    </Layout>
  );
}