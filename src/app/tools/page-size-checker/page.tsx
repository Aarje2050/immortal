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
import PageSizeWidget from './PageSizeWidget';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
const pageUrl = `${baseUrl}/tools/page-size-checker`;

export const metadata: Metadata = {
  title: 'Free Website Page Size Checker | HTML Size & 2MB Crawl Limit Test | ImmortalSEO',
  description:
    'Check your webpage\'s raw HTML size against Google\'s 2 MB crawl limit. See where your page ranks compared to typical websites and get optimization recommendations.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Free Website Page Size Checker | 2MB Crawl Limit Test | ImmortalSEO',
    description: 'Check if your page\'s HTML exceeds Google\'s 2 MB crawl limit. Get percentile comparison and optimization tips.',
    url: pageUrl,
    type: 'website',
  },
};

const faqs = [
  {
    question: 'What is Google\'s 2 MB crawl limit?',
    answer:
      'Googlebot downloads and processes the first 2 megabytes (2,097,152 bytes) of a page\'s raw HTML. Any content beyond this limit is effectively invisible to Google. This applies to the HTML document itself — not external CSS, JavaScript, or images that are loaded separately. According to HTTPArchive data, the median webpage HTML is only 33 KB, so 99.99% of websites are well under this limit.',
  },
  {
    question: 'What does "raw HTML size" mean?',
    answer:
      'Raw HTML size is the total weight of the HTML document text that a browser (or crawler) downloads. It includes all markup tags like <div>, <span>, <script>, and <style>, as well as any inline JavaScript, inline CSS, and the text content itself. It does NOT include external files linked via <link> or <script src="..."> tags — those are separate requests.',
  },
  {
    question: 'What is a normal HTML page size?',
    answer:
      'Based on the latest HTTPArchive data, the median HTML page size is approximately 33 KB. The 75th percentile is around 80 KB, and the 90th percentile is about 155 KB. Pages exceeding 500 KB of raw HTML are considered unusually large and may benefit from optimization. Pages over 2 MB are extreme outliers.',
  },
  {
    question: 'What causes large HTML page sizes?',
    answer:
      'Common causes of HTML bloat include: inline JavaScript and CSS (instead of external files), server-side rendered content with heavy hydration data (common in React/Next.js apps), excessive DOM elements (deeply nested divs), large inline SVGs, embedded base64 images, auto-generated code from page builders, and large data payloads embedded in the HTML for client-side rendering.',
  },
  {
    question: 'How do I reduce my page\'s HTML size?',
    answer:
      'Key optimization strategies include: externalize inline JavaScript and CSS into separate files, minimize SSR hydration data, reduce DOM depth and element count, compress or externalize SVGs, remove unused HTML elements, use lazy loading for below-the-fold content, implement code splitting, and avoid embedding large JSON data blobs in the HTML. Server-side compression (gzip/brotli) also significantly reduces transfer size.',
  },
  {
    question: 'Does HTML size affect page speed and SEO?',
    answer:
      'Yes, larger HTML files take longer to download, parse, and render, which directly impacts Core Web Vitals metrics like Largest Contentful Paint (LCP) and Interaction to Next Paint (INP). While the 2 MB crawl limit is rarely an issue, unnecessarily large HTML can slow down page rendering, increase Time to Interactive, and negatively affect user experience — all of which indirectly impact search rankings.',
  },
  {
    question: 'Is the gzipped size or raw size what matters for Google\'s limit?',
    answer:
      'Google\'s 2 MB limit applies to the raw (uncompressed) HTML size, not the compressed transfer size. While gzip/brotli compression significantly reduces the data transferred over the network (typically by 60-80%), Googlebot measures the uncompressed HTML document size for its crawl limit. Our tool shows both the raw size and an estimated gzipped size for reference.',
  },
];

const relatedTools = [
  { name: 'Schema Markup Generator', href: '/tools/schema-generator', description: 'Generate structured data for enhanced search results' },
  { name: 'Robots.txt Generator', href: '/tools/robots-txt-generator', description: 'Create a robots.txt to control crawler access' },
  { name: 'SEO Audit Checklist', href: '/tools/seo-audit-checklist', description: 'Comprehensive checklist for technical SEO issues' },
];

export default function PageSizeCheckerPage() {
  const context = getSchemaContext();

  const webPageSchema = generateWebPageSchema({
    url: pageUrl,
    title: 'Free Website Page Size Checker',
    description: "Check your webpage's raw HTML size against Google's 2 MB crawl limit.",
    breadcrumbs: [
      { name: 'Home', url: baseUrl },
      { name: 'Tools', url: `${baseUrl}/tools` },
      { name: 'Page Size Checker', url: pageUrl },
    ],
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: 'Website Page Size Checker',
    description: "Free tool to check webpage HTML size against Google's 2 MB crawl limit with percentile comparison and optimization tips.",
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
    { name: 'Page Size Checker', href: '/tools/page-size-checker' },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <JsonLd data={schemaGraph} />

      <section className="bg-gradient-to-br from-primary-dark via-primary-main to-primary-dark text-white">
        <Container>
          <div className="py-12 md:py-16 text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium mb-4">Free SEO Tool</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Website Page Size Checker</h1>
            <p className="text-lg opacity-90">
              Check your webpage&apos;s raw HTML size against Google&apos;s 2 MB crawl limit. See how your page compares to typical websites based on HTTPArchive data.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <PageSizeWidget />
          </div>
        </Container>
      </Section>

      {/* Context Bar */}
      <Section background="light">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="text-3xl font-bold text-primary-main">33 KB</div>
                <div className="text-sm text-text-secondary mt-1">Median HTML size across the web</div>
                <div className="text-xs text-text-secondary">(50th percentile — HTTPArchive)</div>
              </div>
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="text-3xl font-bold text-primary-main">155 KB</div>
                <div className="text-sm text-text-secondary mt-1">90th percentile HTML size</div>
                <div className="text-xs text-text-secondary">(Heavier than 90% of websites)</div>
              </div>
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="text-3xl font-bold text-primary-main">2 MB</div>
                <div className="text-sm text-text-secondary mt-1">Google&apos;s crawl cutoff limit</div>
                <div className="text-xs text-text-secondary">(Affects &lt;0.01% of sites)</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* How to Use */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">How to Use This Page Size Checker</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Enter any webpage URL', desc: 'Paste the full URL of the page you want to check. The tool fetches the raw HTML and measures its size.' },
                { step: '2', title: 'Review the verdict', desc: "See immediately whether your page is within Google's 2 MB crawl limit and what percentage of the limit it uses." },
                { step: '3', title: 'Check your percentile', desc: 'Compare your page against real-world data from HTTPArchive to understand how your page size ranks globally.' },
                { step: '4', title: 'Analyze HTML composition', desc: 'Review inline scripts, styles, and DOM element counts to identify what may be contributing to page size.' },
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
      <Section background="light">
        <Container>
          <article className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Understanding Google&apos;s 2 MB HTML Crawl Limit</h2>
            <div className="prose prose-lg max-w-none text-text-secondary">
              <p>
                In February 2026, <a href="https://www.searchenginejournal.com/new-data-shows-googlebots-2-mb-crawl-limit-is-enough/566881/" target="_blank" rel="noopener noreferrer" className="text-primary-main hover:underline">new data from Search Engine Journal</a> confirmed that Googlebot&apos;s 2 MB crawl limit for raw HTML is more than adequate for virtually all websites. The <strong>HTTPArchive</strong> study showed that the median web page HTML weighs just 33 kilobytes — a fraction of the 2 MB limit.
              </p>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">What This Means for Your Website</h3>
              <p>
                For <strong>99.99% of websites</strong>, the 2 MB limit is a non-issue. However, understanding your page&apos;s HTML weight is still valuable for several reasons:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Performance</strong> — Smaller HTML means faster page parsing, better <strong>Core Web Vitals</strong>, and improved user experience</li>
                <li><strong>Crawl efficiency</strong> — Lighter pages allow Googlebot to crawl more pages within your crawl budget</li>
                <li><strong>Mobile experience</strong> — Users on slow connections benefit from leaner HTML</li>
                <li><strong>Edge cases</strong> — Sites using heavy server-side rendering, page builders, or embedded data may be closer to the limit than expected</li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">What Causes HTML Bloat?</h3>
              <p>
                While most sites are well under the limit, some common patterns can inflate HTML size significantly:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Inline JavaScript and CSS</strong> — Frameworks that inline critical CSS and JS can add significant weight to the HTML document</li>
                <li><strong>SSR hydration data</strong> — React, Next.js, and similar frameworks embed serialized data for client-side hydration</li>
                <li><strong>Page builders</strong> — WordPress page builders (Elementor, Divi) generate verbose, deeply nested HTML</li>
                <li><strong>Inline SVGs</strong> — Complex SVG illustrations embedded directly in HTML can be surprisingly large</li>
                <li><strong>Excessive DOM depth</strong> — Hundreds of nested div elements add up quickly</li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">The SEO Connection</h3>
              <p>
                While the 2 MB limit itself affects almost nobody, <strong>page weight optimization</strong> is a core component of <strong>technical SEO</strong>. Search engines and AI platforms prefer fast, lean pages. Google&apos;s <strong>Core Web Vitals</strong> — which are confirmed ranking factors — directly benefit from smaller, more efficient HTML. A page with 30 KB of HTML will consistently outperform a 500 KB page on speed metrics, all else being equal.
              </p>
            </div>

            <div className="mt-8 p-5 bg-primary-main/5 rounded-lg border-l-4 border-primary-main">
              <p className="text-sm text-text-secondary">
                <strong className="text-primary-main">Pro Tip:</strong> Use this tool alongside our{' '}
                <Link href="/tools/seo-audit-checklist" className="text-primary-main hover:underline">SEO Audit Checklist</Link> for a comprehensive technical SEO review. If your pages have excessive inline scripts and styles, our{' '}
                <Link href="/services/technical-seo" className="text-primary-main hover:underline">Technical SEO services</Link> can help you optimize your site architecture.
              </p>
            </div>
          </article>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
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
      <Section background="light">
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
            <h2 className="text-3xl font-bold mb-4">Need Technical SEO Optimization?</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Our technical SEO experts optimize page speed, crawlability, Core Web Vitals, and site architecture for maximum search performance.
            </p>
            <Button href="/services/technical-seo" variant="secondary" size="lg" className="font-semibold text-primary-main px-8">
              Explore Technical SEO Services
            </Button>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}
