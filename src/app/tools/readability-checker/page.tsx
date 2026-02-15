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
import ReadabilityWidget from './ReadabilityWidget';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
const pageUrl = `${baseUrl}/tools/readability-checker`;

export const metadata: Metadata = {
  title: 'Free Readability Checker | Flesch-Kincaid Score Calculator | ImmortalSEO',
  description:
    'Check the readability of your content with Flesch Reading Ease, Flesch-Kincaid Grade Level, and Gunning Fog Index scores. Get actionable improvement suggestions for better SEO and user engagement.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Free Readability Checker | Flesch Score Calculator | ImmortalSEO',
    description: 'Analyze content readability with Flesch-Kincaid, Gunning Fog, and passive voice detection.',
    url: pageUrl,
    type: 'website',
  },
};

const faqs = [
  {
    question: 'What is the Flesch Reading Ease score?',
    answer:
      'The Flesch Reading Ease score measures how easy a text is to read on a scale of 0-100. Higher scores indicate easier reading. The formula considers average sentence length and average syllables per word. A score of 60-70 is considered standard (8th-9th grade level) and ideal for most web content. Scores above 70 are easily understood by a general audience.',
  },
  {
    question: 'What Flesch Reading Ease score should I aim for?',
    answer:
      'For web content and blog posts targeting a general audience, aim for 60-70 (standard reading level). For B2B or technical audiences, 50-60 is acceptable. Consumer-facing content performs best at 70+ (easy to fairly easy). Google has not confirmed readability as a direct ranking factor, but user engagement metrics improve significantly with more readable content.',
  },
  {
    question: 'What is the Flesch-Kincaid Grade Level?',
    answer:
      'The Flesch-Kincaid Grade Level converts readability into a U.S. school grade level. A score of 8.0 means the content is understandable by an average 8th grader. For web content, aim for a grade level between 7 and 9. Most popular online content, including top-ranking pages, is written at an 8th-grade level or lower.',
  },
  {
    question: 'What is the Gunning Fog Index?',
    answer:
      'The Gunning Fog Index estimates the years of formal education needed to understand a text on first reading. It factors in sentence length and the percentage of complex words (3+ syllables). For web content, aim for a Fog Index of 7-12. Scores above 12 indicate the content may be too complex for a general online audience.',
  },
  {
    question: 'Does readability affect SEO rankings?',
    answer:
      'While Google hasn\'t confirmed readability as a direct ranking factor, there is strong evidence that readability impacts rankings indirectly. Readable content keeps users on the page longer (reducing bounce rate), encourages sharing and linking, and is more likely to be cited by AI search engines. Google\'s Helpful Content Update rewards content written for humans, and readability is a key component of that.',
  },
  {
    question: 'How do I improve the readability of my content?',
    answer:
      'Key strategies include: use shorter sentences (15-20 words average), choose simpler words over complex alternatives, break content into short paragraphs (2-4 sentences), use subheadings every 200-300 words, replace passive voice with active constructions, use bullet points and numbered lists, and add transition words to improve flow. Our tool highlights specific areas for improvement.',
  },
];

const relatedTools = [
  { name: 'Word Counter', href: '/tools/word-counter', description: 'Count words, characters, and get content-length insights' },
  { name: 'Keyword Density Checker', href: '/tools/keyword-density-checker', description: 'Analyze keyword frequency and distribution' },
  { name: 'SERP Snippet Preview', href: '/tools/serp-preview', description: 'Preview your page in Google search results' },
];

export default function ReadabilityCheckerPage() {
  const context = getSchemaContext();

  const webPageSchema = generateWebPageSchema({
    url: pageUrl,
    title: 'Free Readability Checker & Flesch Score Calculator',
    description: 'Check content readability with Flesch-Kincaid, Gunning Fog, and passive voice detection.',
    breadcrumbs: [
      { name: 'Home', url: baseUrl },
      { name: 'Tools', url: `${baseUrl}/tools` },
      { name: 'Readability Checker', url: pageUrl },
    ],
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: 'Content Readability Checker',
    description: 'Free readability analyzer with Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog Index, and passive voice detection.',
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
    { name: 'Readability Checker', href: '/tools/readability-checker' },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <JsonLd data={schemaGraph} />

      <section className="bg-gradient-to-br from-primary-dark via-primary-main to-primary-dark text-white">
        <Container>
          <div className="py-12 md:py-16 text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium mb-4">Free SEO Tool</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Content Readability Analyzer</h1>
            <p className="text-lg opacity-90">
              Check Flesch Reading Ease, Flesch-Kincaid Grade Level, and Gunning Fog Index. Get actionable tips to improve your content&apos;s readability for better SEO and user engagement.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <ReadabilityWidget />
          </div>
        </Container>
      </Section>

      <Section background="light">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">How to Use This Readability Checker</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Paste your content', desc: 'Enter at least 10 words for accurate analysis. Paste your blog post, page content, or any text you want to check.' },
                { step: '2', title: 'Review the Flesch score', desc: 'The main readability score (0-100) shows how easy your content is to read. For web content, aim for 60-70.' },
                { step: '3', title: 'Check detailed metrics', desc: 'Review grade level, Gunning Fog Index, sentence length, complex word count, and passive voice usage.' },
                { step: '4', title: 'Follow improvement suggestions', desc: 'The tool provides specific, actionable recommendations based on the areas where your content can improve.' },
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
            <h2 className="text-2xl font-bold mb-6">Why Readability Matters for SEO</h2>
            <div className="prose prose-lg max-w-none text-text-secondary">
              <p>
                Readability is one of the most overlooked factors in <strong>search engine optimization</strong>. While Google doesn&apos;t explicitly use readability scores as a ranking factor, there are strong indirect connections between readable content and higher search rankings.
              </p>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">The Readability-Rankings Connection</h3>
              <p>
                Studies of top-ranking pages show that most pages ranking in the top 10 for competitive keywords have a Flesch Reading Ease score between 50 and 70. This isn&apos;t because Google measures Flesch scores — it&apos;s because readable content naturally leads to better <strong>user engagement signals</strong>:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Lower bounce rate</strong> — users stay longer when content is easy to read</li>
                <li><strong>Higher time on page</strong> — readable content is consumed more thoroughly</li>
                <li><strong>More shares and links</strong> — people share content they can understand and find valuable</li>
                <li><strong>Better conversion rates</strong> — clear communication builds trust and drives action</li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Readability Scores Explained</h3>
              <div className="overflow-x-auto not-prose">
                <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-semibold">Flesch Score</th>
                      <th className="text-left p-3 font-semibold">Grade Level</th>
                      <th className="text-left p-3 font-semibold">Difficulty</th>
                      <th className="text-left p-3 font-semibold">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['90-100', '5th grade', 'Very Easy', 'Children, simple instructions'],
                      ['80-89', '6th grade', 'Easy', 'Conversational content'],
                      ['70-79', '7th grade', 'Fairly Easy', 'Consumer web content'],
                      ['60-69', '8th-9th', 'Standard', 'Most web content, blogs'],
                      ['50-59', '10th-12th', 'Fairly Difficult', 'B2B, technical audiences'],
                      ['30-49', 'College', 'Difficult', 'Academic, professional'],
                      ['0-29', 'Graduate', 'Very Difficult', 'Scientific, legal'],
                    ].map(([score, grade, diff, best]) => (
                      <tr key={score} className="border-t border-gray-100">
                        <td className="p-3 font-medium text-text-primary">{score}</td>
                        <td className="p-3">{grade}</td>
                        <td className="p-3">{diff}</td>
                        <td className="p-3">{best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Readability for AI Search</h3>
              <p>
                AI search platforms like <strong>Google SGE</strong> and <strong>ChatGPT</strong> prefer content that is clearly structured and easy to parse. Content with clear headings, short paragraphs, and plain language is more likely to be selected for AI-generated summaries and citations. This makes readability even more important in the era of <strong>AI-powered search</strong>.
              </p>
            </div>

            <div className="mt-8 p-5 bg-primary-main/5 rounded-lg border-l-4 border-primary-main">
              <p className="text-sm text-text-secondary">
                <strong className="text-primary-main">Pro Tip:</strong> After improving readability, use our{' '}
                <Link href="/tools/keyword-density-checker" className="text-primary-main hover:underline">Keyword Density Checker</Link> to ensure your keyword optimization stayed intact, and the{' '}
                <Link href="/tools/word-counter" className="text-primary-main hover:underline">Word Counter</Link> to verify content length.
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
            <h2 className="text-3xl font-bold mb-4">Need Professional Content That Ranks?</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Our content SEO experts create readable, engaging content optimized for both search engines and AI platforms.
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
