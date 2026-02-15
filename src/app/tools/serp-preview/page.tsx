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
import SerpPreviewWidget from './SerpPreviewWidget';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
const pageUrl = `${baseUrl}/tools/serp-preview`;

export const metadata: Metadata = {
  title: 'Free Google SERP Preview Tool | SERP Snippet Simulator | ImmortalSEO',
  description:
    'Preview how your page title and meta description appear in Google search results. Optimize your SERP snippet for higher click-through rates with real-time desktop and mobile previews.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Free Google SERP Preview Tool | ImmortalSEO',
    description: 'Preview and optimize how your page appears in Google search results on desktop and mobile.',
    url: pageUrl,
    type: 'website',
  },
};

const faqs = [
  {
    question: 'What is a SERP snippet?',
    answer:
      'A SERP (Search Engine Results Page) snippet is the listing that appears for your page in Google search results. It typically consists of three parts: the title tag (blue clickable link), the URL/breadcrumb path, and the meta description (gray text below). Optimizing these elements directly impacts your click-through rate from search results.',
  },
  {
    question: 'What is the ideal title tag length for Google?',
    answer:
      'Google typically displays 50-60 characters of a title tag (approximately 580 pixels wide on desktop). Titles longer than this may be truncated with an ellipsis (...). For best results, keep your most important keywords within the first 50 characters and aim for a total length of 50-60 characters including your brand name.',
  },
  {
    question: 'What is the ideal meta description length?',
    answer:
      'For desktop, Google displays approximately 155-160 characters. For mobile, the limit is shorter at around 120 characters. Write your most compelling information within the first 120 characters to ensure it\'s visible on both devices. Google may also show longer descriptions (up to 300+ characters) for some queries.',
  },
  {
    question: 'Does Google always use my meta description?',
    answer:
      'No. Google rewrites meta descriptions for approximately 62% of search results, according to studies. Google generates its own snippet when it believes another section of your page better matches the user\'s query. However, having a well-written meta description increases the likelihood that Google will use it, especially for branded and navigational queries.',
  },
  {
    question: 'How do I improve my click-through rate from search results?',
    answer:
      'Key strategies include: using power words and numbers in your title (e.g., "7 Proven Tips"), including your target keyword early in the title, writing action-oriented meta descriptions with a clear value proposition, adding a call-to-action in the description, using structured data to get rich snippets (stars, prices, FAQ), and matching search intent closely.',
  },
  {
    question: 'Does the meta description affect search rankings?',
    answer:
      'Meta descriptions are not a direct ranking factor — Google has confirmed this. However, they significantly affect click-through rate (CTR), which can indirectly influence rankings. A compelling meta description that earns more clicks signals to Google that your result is relevant, potentially improving your position over time.',
  },
];

const relatedTools = [
  { name: 'Meta Tags Generator', href: '/tools/meta-tags-generator', description: 'Generate optimized title tags and meta descriptions' },
  { name: 'Word Counter', href: '/tools/word-counter', description: 'Count words, characters, and get reading time estimates' },
  { name: 'Schema Markup Generator', href: '/tools/schema-generator', description: 'Generate structured data for rich snippets in search results' },
];

export default function SerpPreviewPage() {
  const context = getSchemaContext();

  const webPageSchema = generateWebPageSchema({
    url: pageUrl,
    title: 'Free Google SERP Preview Tool',
    description: 'Preview how your page appears in Google search results with real-time desktop and mobile previews.',
    breadcrumbs: [
      { name: 'Home', url: baseUrl },
      { name: 'Tools', url: `${baseUrl}/tools` },
      { name: 'SERP Preview', url: pageUrl },
    ],
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: 'Google SERP Snippet Preview Tool',
    description: 'Free tool to preview and optimize how your page appears in Google search results on desktop and mobile.',
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
    { name: 'SERP Preview', href: '/tools/serp-preview' },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <JsonLd data={schemaGraph} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark via-primary-main to-primary-dark text-white">
        <Container>
          <div className="py-12 md:py-16 text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium mb-4">Free SEO Tool</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Google SERP Snippet Preview</h1>
            <p className="text-lg opacity-90">
              See exactly how your title tag and meta description will appear in Google search results — on desktop and mobile.
            </p>
          </div>
        </Container>
      </section>

      {/* Tool Widget */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <SerpPreviewWidget />
          </div>
        </Container>
      </Section>

      {/* How to Use */}
      <Section background="light">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">How to Use the SERP Preview Tool</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Enter your title tag', desc: 'Type or paste your page title. Keep it under 60 characters for best display. Include your primary keyword near the beginning.' },
                { step: '2', title: 'Write your meta description', desc: 'Craft a compelling description under 160 characters (120 for mobile). Include a value proposition and call-to-action.' },
                { step: '3', title: 'Add your URL', desc: 'Enter your page URL to see how Google displays it with breadcrumb-style navigation below the title.' },
                { step: '4', title: 'Toggle between devices', desc: 'Switch between desktop and mobile preview to ensure your snippet looks good on all devices. Mobile truncates descriptions earlier.' },
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

      {/* Educational Content */}
      <Section>
        <Container>
          <article className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">How to Write SERP Snippets That Drive Clicks</h2>

            <div className="prose prose-lg max-w-none text-text-secondary">
              <p>
                Your SERP snippet is the first impression potential visitors have of your website. Even if you rank #1 for a query, a poorly written title and description means users will click on a competitor instead. Optimizing your <strong>title tags</strong> and <strong>meta descriptions</strong> is one of the highest-ROI activities in search engine optimization.
              </p>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Title Tag Best Practices</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Lead with your keyword</strong> — place the primary keyword within the first 3-5 words for visibility and relevance signals</li>
                <li><strong>Use numbers and brackets</strong> — titles like &ldquo;7 Proven SEO Tips [2026 Guide]&rdquo; tend to have higher CTR</li>
                <li><strong>Include your brand</strong> — append your brand name at the end, separated by a pipe (|) or dash (—)</li>
                <li><strong>Match search intent</strong> — use action words for transactional queries and &ldquo;what/how/why&rdquo; for informational</li>
                <li><strong>Stay under 60 characters</strong> — longer titles get truncated, losing your carefully crafted messaging</li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Meta Description Best Practices</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Include a clear value proposition</strong> — tell users exactly what they&apos;ll get from clicking</li>
                <li><strong>Add a call-to-action</strong> — phrases like &ldquo;Learn more&rdquo;, &ldquo;Get started&rdquo;, or &ldquo;Find out how&rdquo; encourage clicks</li>
                <li><strong>Use your target keyword</strong> — Google bolds matching terms in the snippet, making it visually stand out</li>
                <li><strong>Create urgency</strong> — where appropriate, use phrases like &ldquo;Updated for 2026&rdquo; or &ldquo;Limited time&rdquo;</li>
                <li><strong>Keep it between 120-155 characters</strong> — this range works well for both desktop and mobile</li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Rich Snippets and Beyond</h3>
              <p>
                Beyond title and description, you can enhance your SERP appearance with <strong>structured data</strong> (schema markup). This enables rich snippets like star ratings, FAQ dropdowns, price ranges, and event dates. Use our{' '}
                <Link href="/tools/schema-generator" className="text-primary-main hover:underline">Schema Markup Generator</Link>{' '}
                to add these enhancements to your pages.
              </p>
            </div>

            <div className="mt-8 p-5 bg-primary-main/5 rounded-lg border-l-4 border-primary-main">
              <p className="text-sm text-text-secondary">
                <strong className="text-primary-main">Pro Tip:</strong> Test your snippets against the top 3 competitors for your target keyword. Your title and description should stand out visually and offer a clearer value proposition than what&apos;s already ranking.
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
            <h2 className="text-3xl font-bold mb-4">Want Higher Click-Through Rates?</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Our SEO experts optimize every element of your search presence — from meta tags to structured data — for maximum organic traffic.
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
