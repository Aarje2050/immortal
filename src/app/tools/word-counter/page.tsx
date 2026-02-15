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
import WordCounterWidget from './WordCounterWidget';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
const pageUrl = `${baseUrl}/tools/word-counter`;

export const metadata: Metadata = {
  title: 'Free Word Counter & Character Counter Tool | ImmortalSEO',
  description:
    'Count words, characters, sentences, and paragraphs instantly. Get reading time estimates and SEO content-length recommendations for your text.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Free Word Counter & Character Counter Tool | ImmortalSEO',
    description:
      'Count words, characters, sentences, and paragraphs. Get reading time and SEO insights.',
    url: pageUrl,
    type: 'website',
  },
};

const faqs = [
  {
    question: 'How many words should a blog post be for SEO?',
    answer:
      'The ideal blog post length varies by topic and competition. For informational content, 1,200-2,000 words typically performs well in search results. In-depth guides and pillar pages often exceed 2,500 words. However, quality matters more than quantity — your content should fully answer the user\'s query without unnecessary filler. Google\'s helpful content update emphasizes depth and expertise over word count alone.',
  },
  {
    question: 'What is a good reading time for web content?',
    answer:
      'Studies show that articles with a 7-minute reading time (roughly 1,600 words) receive the highest average engagement. For service pages and landing pages, shorter content (300-800 words) focused on conversion works better. Blog posts and guides benefit from longer formats. The key is matching content length to user intent — informational queries deserve thorough answers.',
  },
  {
    question: 'Does word count affect search engine rankings?',
    answer:
      'Word count is not a direct ranking factor. Google has confirmed they don\'t use word count as a signal. However, longer content tends to rank better because it provides more comprehensive coverage of a topic, naturally includes more relevant entities and keywords, and earns more backlinks. The correlation exists because comprehensive content better satisfies user intent.',
  },
  {
    question: 'How is reading time calculated?',
    answer:
      'Reading time is calculated by dividing the total word count by the average adult reading speed of 238 words per minute. Speaking time uses a slower pace of approximately 130 words per minute, accounting for natural pauses in speech. These are averages — actual reading speed varies by content complexity and the reader\'s familiarity with the subject.',
  },
  {
    question: 'What is keyword density and why does this tool show it?',
    answer:
      'Keyword density is the percentage of times a keyword appears relative to the total word count. Our tool shows the top recurring keywords in your content to help you identify natural keyword patterns. While keyword stuffing hurts rankings, having your target keywords appear naturally at 1-2% density signals topical relevance to search engines. The goal is natural, readable content — not artificial keyword placement.',
  },
  {
    question: 'How do I optimize content length for AI search engines?',
    answer:
      'AI search engines like Google SGE and ChatGPT prioritize content that provides clear, well-structured answers. Use headings (H2, H3) to organize topics, include concise definitions, and structure information in easily extractable formats like lists and tables. Content depth matters more than length — ensure every section adds genuine value to help AI systems cite your content accurately.',
  },
];

const relatedTools = [
  { name: 'Keyword Density Checker', href: '/tools/keyword-density-checker', description: 'Analyze keyword frequency and density in your content' },
  { name: 'Content Readability Analyzer', href: '/tools/readability-checker', description: 'Check reading level and readability scores' },
  { name: 'SERP Snippet Preview', href: '/tools/serp-preview', description: 'Preview how your page appears in Google search results' },
];

export default function WordCounterPage() {
  const context = getSchemaContext();

  const webPageSchema = generateWebPageSchema({
    url: pageUrl,
    title: 'Free Word Counter & Character Counter Tool',
    description: 'Count words, characters, sentences, and paragraphs instantly with SEO content-length recommendations.',
    breadcrumbs: [
      { name: 'Home', url: baseUrl },
      { name: 'Tools', url: `${baseUrl}/tools` },
      { name: 'Word Counter', url: pageUrl },
    ],
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: 'Word Counter & Character Counter',
    description: 'Free online tool to count words, characters, sentences, paragraphs, and get reading time estimates with SEO insights.',
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
    { name: 'Word Counter', href: '/tools/word-counter' },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <JsonLd data={schemaGraph} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark via-primary-main to-primary-dark text-white">
        <Container>
          <div className="py-12 md:py-16 text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium mb-4">
              Free SEO Tool
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Word Counter & Character Counter
            </h1>
            <p className="text-lg opacity-90">
              Count words, characters, sentences, and paragraphs. Get reading time estimates and SEO content-length recommendations instantly.
            </p>
          </div>
        </Container>
      </section>

      {/* Tool Widget */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <WordCounterWidget />
          </div>
        </Container>
      </Section>

      {/* How to Use */}
      <Section background="light">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">How to Use This Word Counter</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Paste or type your content', desc: 'Enter the text you want to analyze in the text area above. You can paste from any document, webpage, or write directly.' },
                { step: '2', title: 'Review your statistics', desc: 'The tool instantly calculates word count, character count, sentence count, paragraph count, and estimated reading time.' },
                { step: '3', title: 'Check top keywords', desc: 'See which words appear most frequently in your content and their density percentage — useful for SEO optimization.' },
                { step: '4', title: 'Use the SEO insight', desc: 'The content-length recommendation tells you if your content is the right length for its intended purpose based on SEO best practices.' },
              ].map((item) => (
                <div key={item.step} className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-main text-white flex items-center justify-center text-sm font-bold mr-4">
                    {item.step}
                  </span>
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

      {/* Educational Content */}
      <Section>
        <Container>
          <article className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Why Content Length Matters for SEO</h2>

            <div className="prose prose-lg max-w-none text-text-secondary">
              <p>
                Content length is one of the most debated topics in search engine optimization. While Google has stated that word count is not a direct ranking factor, comprehensive analysis of search results consistently shows that longer, more in-depth content tends to rank higher for competitive queries. This correlation exists because thorough content naturally covers more <strong>semantic entities</strong>, answers more user questions, and demonstrates greater <strong>topical authority</strong>.
              </p>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Content Length Guidelines by Page Type</h3>

              <div className="overflow-x-auto not-prose">
                <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-semibold">Page Type</th>
                      <th className="text-left p-3 font-semibold">Recommended Words</th>
                      <th className="text-left p-3 font-semibold">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Product Description', '150–300', 'Concise, conversion-focused'],
                      ['Service Page', '500–1,000', 'Benefits, process, trust signals'],
                      ['Blog Post', '1,200–2,000', 'In-depth topic coverage'],
                      ['Pillar / Guide', '2,500–5,000', 'Comprehensive authority content'],
                      ['Landing Page', '300–800', 'Focused conversion copy'],
                      ['FAQ Page', '1,000–2,000', 'Thorough question coverage'],
                    ].map(([type, words, purpose]) => (
                      <tr key={type} className="border-t border-gray-100">
                        <td className="p-3 font-medium text-text-primary">{type}</td>
                        <td className="p-3">{words}</td>
                        <td className="p-3">{purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Content Length for AI Search Optimization</h3>
              <p>
                With the rise of AI-powered search engines like <strong>Google SGE</strong>, <strong>ChatGPT</strong>, and <strong>Perplexity</strong>, content structure matters as much as length. These platforms extract and summarize information, so your content should be organized with clear headings, concise paragraphs, and well-defined sections. A 1,500-word article with clear H2/H3 structure will outperform a 3,000-word wall of text in AI citations.
              </p>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Quality Over Quantity</h3>
              <p>
                The most important metric isn&apos;t word count — it&apos;s whether your content fully satisfies the searcher&apos;s intent. Google&apos;s <strong>Helpful Content Update</strong> specifically targets content that appears written primarily for search engines rather than humans. Every paragraph should add genuine value. If you can answer a question in 500 words, don&apos;t pad it to 2,000.
              </p>
            </div>

            <div className="mt-8 p-5 bg-primary-main/5 rounded-lg border-l-4 border-primary-main">
              <p className="text-sm text-text-secondary">
                <strong className="text-primary-main">Pro Tip:</strong> Use this word counter alongside our{' '}
                <Link href="/tools/keyword-density-checker" className="text-primary-main hover:underline">
                  Keyword Density Checker
                </Link>{' '}
                and{' '}
                <Link href="/tools/readability-checker" className="text-primary-main hover:underline">
                  Readability Analyzer
                </Link>{' '}
                to ensure your content is the right length, properly optimized, and easy to read.
              </p>
            </div>
          </article>
        </Container>
      </Section>

      {/* FAQ */}
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

      {/* Related Tools */}
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

      {/* CTA */}
      <Section background="primary">
        <Container>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Professional Content Optimization?</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Our Content SEO experts create data-driven content strategies that rank in both traditional search and AI platforms.
            </p>
            <Button href="/services/content-seo" variant="secondary" size="lg" className="font-semibold text-primary-main px-8">
              Explore Content SEO Services
            </Button>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}
