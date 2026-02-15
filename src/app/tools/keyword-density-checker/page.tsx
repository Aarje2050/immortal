import { Metadata } from 'next';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/seo/JsonLd';
import {
  getSchemaContext,
  generateWebPageSchema,
  generateSchemaGraph,
  generateFAQPageSchema,
  generateSoftwareApplicationSchema,
} from '@/lib/schema';
import KeywordDensityWidget from './KeywordDensityWidget';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
const pageUrl = `${baseUrl}/tools/keyword-density-checker`;

export const metadata: Metadata = {
  title: 'Free Keyword Density Checker Tool | SEO Keyword Analyzer | ImmortalSEO',
  description:
    'Analyze keyword density, frequency, and prominence in your content. Check 1-word, 2-word, and 3-word phrase distribution to optimize for search engines without keyword stuffing.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Free Keyword Density Checker Tool | ImmortalSEO',
    description: 'Analyze keyword density and N-gram phrase distribution in your content for SEO optimization.',
    url: pageUrl,
    type: 'website',
  },
};

const faqs = [
  {
    question: 'What is keyword density?',
    answer:
      'Keyword density is the percentage of times a specific keyword or phrase appears in a piece of content relative to the total word count. For example, if a keyword appears 5 times in a 500-word article, the density is 1%. It helps you understand how prominently a keyword features in your content without over-optimization.',
  },
  {
    question: 'What is the ideal keyword density for SEO?',
    answer:
      'Most SEO experts recommend a keyword density between 1% and 2.5% for your primary keyword. This range signals topical relevance to search engines without crossing into keyword stuffing territory. However, there is no perfect number — focus on writing naturally while ensuring your target keyword appears in key positions like the title, first paragraph, headings, and conclusion.',
  },
  {
    question: 'What is keyword stuffing and how do I avoid it?',
    answer:
      'Keyword stuffing is the practice of excessively repeating keywords in content to manipulate search rankings. Google\'s algorithms actively penalize this. Signs include densities above 3-4%, unnatural repetition, and keywords forced into irrelevant contexts. The best approach is to write for humans first and use LSI (Latent Semantic Indexing) keywords — related terms and synonyms — to signal topical relevance naturally.',
  },
  {
    question: 'What is keyword prominence?',
    answer:
      'Keyword prominence refers to where a keyword appears in the content. Keywords appearing in the title, first paragraph, headings (H1-H3), and meta description carry more weight than those buried in the middle of the text. Our tool checks if your target keyword appears within the first 100 words, which is a strong relevance signal for search engines.',
  },
  {
    question: 'What are N-grams and why are they useful for SEO?',
    answer:
      'N-grams are phrases of N consecutive words. 1-grams are single words, 2-grams are two-word phrases (like "seo services"), and 3-grams are three-word phrases (like "technical seo audit"). Analyzing N-grams helps you discover the natural themes and topics in your content, identify which multi-word phrases you\'re targeting, and find opportunities to add important semantic keywords.',
  },
  {
    question: 'How does keyword density relate to semantic SEO?',
    answer:
      'Modern SEO has moved beyond exact-match keyword density to semantic understanding. Search engines and AI platforms analyze topical coverage — whether your content addresses related concepts, entities, and questions around a topic. While keyword density remains a useful baseline metric, the most effective approach combines target keyword optimization with comprehensive coverage of semantically related terms.',
  },
];

const relatedTools = [
  { name: 'Word Counter', href: '/tools/word-counter', description: 'Count words, characters, and get SEO content-length insights' },
  { name: 'Content Readability Analyzer', href: '/tools/readability-checker', description: 'Check Flesch-Kincaid score and reading level' },
  { name: 'SERP Snippet Preview', href: '/tools/serp-preview', description: 'Preview your page in Google search results' },
];

export default function KeywordDensityPage() {
  const context = getSchemaContext();

  const webPageSchema = generateWebPageSchema({
    url: pageUrl,
    title: 'Free Keyword Density Checker Tool',
    description: 'Analyze keyword density and N-gram phrase distribution in your content.',
    breadcrumbs: [
      { name: 'Home', url: baseUrl },
      { name: 'Tools', url: `${baseUrl}/tools` },
      { name: 'Keyword Density Checker', url: pageUrl },
    ],
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: 'Keyword Density Checker',
    description: 'Free tool to analyze keyword density, frequency, and N-gram distribution in your content for SEO optimization.',
    url: pageUrl,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web browser',
    offers: { price: '0', priceCurrency: 'USD' },
    author: { name: 'ImmortalSEO', url: baseUrl },
  });

  const faqSchema = generateFAQPageSchema(faqs);
  const schemas = [context.organization, context.website, webPageSchema, softwareSchema, faqSchema].filter(Boolean);
  const schemaGraph = generateSchemaGraph(schemas);

  const breadcrumbs = [
    { name: 'Tools', href: '/tools' },
    { name: 'Keyword Density Checker', href: '/tools/keyword-density-checker' },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <JsonLd data={schemaGraph} />

      <section className="bg-gradient-to-br from-primary-dark via-primary-main to-primary-dark text-white">
        <Container>
          <div className="py-12 md:py-16 text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium mb-4">Free SEO Tool</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Keyword Density Checker</h1>
            <p className="text-lg opacity-90">
              Analyze keyword frequency, density, and prominence. Discover top 1-word, 2-word, and 3-word phrases in your content.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <KeywordDensityWidget />
          </div>
        </Container>
      </Section>

      <Section background="light">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">How to Use This Keyword Density Checker</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Enter your target keyword', desc: 'Type the keyword or phrase you\'re optimizing for. This can be a single word like "SEO" or a multi-word phrase like "technical seo services".' },
                { step: '2', title: 'Paste your content', desc: 'Paste the full text of your page, blog post, or article. The tool works with any text length.' },
                { step: '3', title: 'Review density and prominence', desc: 'Check if your keyword density is in the optimal 1-2.5% range and whether your keyword appears in the first 100 words.' },
                { step: '4', title: 'Explore N-gram analysis', desc: 'Switch between 1-word, 2-word, and 3-word phrase views to see what topics and themes dominate your content.' },
              ].map((item) => (
                <div key={item.step} className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-main text-white flex items-center justify-center text-sm font-bold mr-4">{item.step}</span>
                  <div>
                    <strong className="block">{item.title}</strong>
                    <p className="text-text-secondary text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <article className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Understanding Keyword Density in Modern SEO</h2>
            <div className="prose prose-lg max-w-none text-text-secondary">
              <p>
                Keyword density has been an SEO metric since the earliest days of search engines. While its importance has evolved significantly, understanding how keywords are distributed in your content remains a valuable optimization signal — especially for avoiding unintentional <strong>keyword stuffing</strong> that can trigger Google penalties.
              </p>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">From Keyword Density to Semantic Relevance</h3>
              <p>
                Modern search engines use <strong>natural language processing (NLP)</strong> and <strong>semantic analysis</strong> to understand content. Google&apos;s BERT and MUM models understand context, synonyms, and related concepts. This means that instead of repeating &ldquo;technical SEO services&rdquo; ten times, your content should naturally cover related entities like <strong>site architecture</strong>, <strong>crawlability</strong>, <strong>Core Web Vitals</strong>, and <strong>structured data</strong>.
              </p>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Practical Guidelines</h3>
              <div className="overflow-x-auto not-prose">
                <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-semibold">Density Range</th>
                      <th className="text-left p-3 font-semibold">Assessment</th>
                      <th className="text-left p-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['0 - 0.5%', 'Under-optimized', 'Add more natural mentions of the keyword'],
                      ['0.5 - 2.5%', 'Optimal', 'Good balance — focus on content quality'],
                      ['2.5 - 4%', 'High', 'Review for readability and natural flow'],
                      ['4%+', 'Keyword stuffing risk', 'Reduce usage, use synonyms and related terms'],
                    ].map(([range, assessment, action]) => (
                      <tr key={range} className="border-t border-gray-100">
                        <td className="p-3 font-medium text-text-primary">{range}</td>
                        <td className="p-3">{assessment}</td>
                        <td className="p-3">{action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Keyword Optimization for AI Search</h3>
              <p>
                AI search platforms like <strong>Google SGE</strong> and <strong>ChatGPT</strong> analyze content semantically. They evaluate whether your content comprehensively covers a topic, not just whether it mentions a keyword frequently. Use this tool to ensure your target keyword is present and naturally distributed, then focus on covering the full spectrum of related subtopics for <strong>topical authority</strong>.
              </p>
            </div>

            <div className="mt-8 p-5 bg-primary-main/5 rounded-lg border-l-4 border-primary-main">
              <p className="text-sm text-text-secondary">
                <strong className="text-primary-main">Pro Tip:</strong> Use the N-gram analysis to find which multi-word phrases dominate your content. If your target keyword isn&apos;t in the top 5 two-word phrases, you may need to add more natural mentions. Combine with our{' '}
                <Link href="/tools/readability-checker" className="text-primary-main hover:underline">Readability Checker</Link> to ensure your optimization doesn&apos;t hurt readability.
              </p>
            </div>
          </article>
        </Container>
      </Section>

      <Section background="light">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white rounded-lg border border-gray-100">
                  <summary className="flex justify-between items-center p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="font-semibold text-base pr-4">{faq.question}</h3>
                    <svg className="w-5 h-5 text-primary-main flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-text-secondary leading-relaxed text-sm">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-2xl font-bold mb-8 text-center">Related SEO Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {relatedTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5">
                <h3 className="font-semibold mb-2">{tool.name}</h3>
                <p className="text-sm text-text-secondary">{tool.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="primary">
        <Container>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Expert Content Optimization?</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Our SEO experts build data-driven content strategies optimized for both search engines and AI platforms.
            </p>
            <Button href="/services/semantic-seo" variant="secondary" size="lg" className="font-semibold text-primary-main px-8">
              Explore Semantic SEO Services
            </Button>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}
