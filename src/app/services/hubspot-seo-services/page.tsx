// Custom HubSpot SEO Services landing page — full SEO & AI search optimization
// Permalink: /services/hubspot-seo-services (unchanged)

import { Metadata } from 'next';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/seo/JsonLd';
import { StepByStep, ComparisonTable } from '@/components/seo/FeaturedSnippet';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';
import {
  getSchemaContext,
  generateWebPageSchema,
  generateServiceSchema,
  generateFAQPageSchema,
  generateSchemaGraph,
  generateHowToSchema,
  generateTestimonialSchema,
  generateAggregateRatingFromReviews,
  BaseSchema,
} from '@/lib/schema';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
const canonicalUrl = `${baseUrl}/services/hubspot-seo-services`;
const serviceName = 'HubSpot SEO Services';

// ─── Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'HubSpot SEO Services | CMS Hub & Content Hub Optimization | ImmortalSEO',
  description:
    'Specialized SEO services for HubSpot CMS. We optimize your HubSpot website\'s technical foundation, blog, landing pages, and content strategy for higher rankings and more leads. 15+ years of SEO expertise.',
  alternates: { canonical: canonicalUrl },
  openGraph: {
    url: canonicalUrl,
    type: 'website',
    title: 'HubSpot SEO Services | CMS Hub & Content Hub Optimization | ImmortalSEO',
    description:
      'Specialized SEO services for HubSpot CMS. Technical optimization, blog & landing page SEO, schema markup, and content strategy for sustainable organic growth.',
    images: [{ url: `${baseUrl}/images/services/hubspot-seo-services-og.jpg`, width: 1200, height: 630, alt: serviceName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HubSpot SEO Services | CMS Hub & Content Hub Optimization | ImmortalSEO',
    description: 'Specialized SEO for HubSpot websites. Technical, content, and conversion-focused optimization.',
    images: [`${baseUrl}/images/services/hubspot-seo-services-og.jpg`],
  },
};

// ─── FAQ data (detailed answers for PAA & AI search) ───────────────────────
const faqs = [
  {
    question: 'Is HubSpot good for SEO?',
    answer:
      'Yes. HubSpot CMS Hub provides a solid foundation for SEO: built-in SSL, CDN, mobile-responsive themes, and native tools like the SEO recommendations panel and topic clusters. However, out-of-the-box setups often need expert optimization—template-level heading hierarchy, HubL performance, schema markup, and content strategy—to compete at scale. Our HubSpot SEO services bridge that gap so your site can rank and convert.',
  },
  {
    question: 'What are the main SEO limitations of HubSpot CMS?',
    answer:
      'Common limitations include limited control over robots.txt and server-side redirects compared to self-hosted platforms, default themes that may have poor heading structure or bloated HTML, HubL template output that can affect Core Web Vitals if not optimized, and advanced schema or custom technical implementations that often require developer or specialist input. We work within these constraints and apply best practices specific to the HubSpot environment.',
  },
  {
    question: 'How much do HubSpot SEO services cost?',
    answer:
      'HubSpot SEO engagements typically start in the range of dedicated monthly retainers, depending on site size, competition, and scope (technical only vs. full content and strategy). We offer custom proposals after a free HubSpot SEO audit. Pricing is transparent and aligned with clear deliverables and reporting.',
  },
  {
    question: 'Can HubSpot websites rank on the first page of Google?',
    answer:
      'Absolutely. HubSpot-hosted sites can and do rank on page one when technical SEO, content strategy, and off-page signals are properly aligned. We focus on crawlability, Core Web Vitals, keyword-targeted content in your blog and landing pages, and internal linking so search engines can discover and rank your pages. Many of our clients achieve first-page rankings within several months of consistent optimization.',
  },
  {
    question: 'How long does it take to see results from HubSpot SEO?',
    answer:
      'Initial improvements (indexation, technical fixes, schema) can show within weeks. Meaningful traffic and ranking gains usually appear in 3–6 months, with competitive terms sometimes taking 6–12 months. We set realistic expectations and provide monthly reporting so you can track progress against your goals.',
  },
  {
    question: 'Does HubSpot have built-in SEO tools?',
    answer:
      'Yes. HubSpot includes an SEO recommendations tool, topic cluster suggestions, on-page SEO checks, and meta field management. These are helpful for basics but don’t replace a full technical audit, custom schema implementation, or strategic content and link building. We use HubSpot’s tools and supplement them with enterprise-grade crawlers and analytics to deliver deeper optimization.',
  },
  {
    question: 'Should I use HubSpot\'s topic clusters feature for SEO?',
    answer:
      'Yes, when used correctly. Topic clusters help organize content around pillar pages and support pages, which aligns with how search engines understand topical authority. We help you define clusters, optimize existing blog content into that structure, and improve internal linking so both users and crawlers benefit. We also ensure pillar and cluster URLs and canonicals are set up correctly for SEO.',
  },
  {
    question: 'How do you implement schema markup on HubSpot?',
    answer:
      'We implement schema via HubSpot’s template and module system—either through custom HubL modules, embed blocks, or coordinated work with your developers. We add Organization, WebSite, FAQPage, Service, BreadcrumbList, and article-specific markup where relevant. All markup is validated and tested so it appears correctly in search results and doesn’t trigger errors in Google’s tools.',
  },
  {
    question: 'Can you optimize our existing HubSpot blog for SEO?',
    answer:
      'Yes. We audit your current blog structure, URLs, meta data, and internal links; align posts with a topic cluster strategy; refresh underperforming content; and improve headings, keywords, and featured snippet opportunities. We can also optimize HubSpot blog templates and listing pages for better crawlability and relevance.',
  },
  {
    question: 'What\'s the difference between HubSpot CMS Hub and Content Hub for SEO?',
    answer:
      'CMS Hub is the website and landing page platform; Content Hub (including the blog and content tools) is where you manage blog posts, topic clusters, and content strategy. Both need to be optimized together: CMS Hub for technical and landing page SEO, Content Hub for blog structure, internal linking, and content discoverability. Our services cover both so your entire HubSpot presence is aligned for search.',
  },
  {
    question: 'Do you work with HubSpot Enterprise and Professional tiers?',
    answer:
      'Yes. We work with Professional and Enterprise HubSpot accounts, as well as teams on CMS Hub. Our approach adapts to your tier—taking advantage of advanced features where available—while keeping core SEO best practices consistent across plans.',
  },
  {
    question: 'Can you help migrate our site to HubSpot without losing rankings?',
    answer:
      'Yes. We provide HubSpot migration SEO: URL mapping and redirect strategy, content migration checklists, canonical and hreflang handling, and post-launch monitoring. The goal is to preserve equity and fix any structural issues so you don’t lose rankings during the move. We recommend starting planning before the migration date.',
  },
];

// ─── Process steps (HubSpot-specific) ──────────────────────────────────────
const processSteps = [
  {
    number: 1,
    title: 'HubSpot SEO Audit',
    description:
      'We run a full crawl with Screaming Frog and other tools, review your HubSpot SEO recommendations, audit CMS modules and templates for performance and structure, and identify indexation, redirect, and schema gaps specific to your HubSpot setup.',
  },
  {
    number: 2,
    title: 'Competitive & Keyword Analysis',
    description:
      'We analyze competitors on and off HubSpot, map keyword gaps to your existing blog and landing pages, and prioritize terms that align with your business goals and HubSpot’s content and campaign structure.',
  },
  {
    number: 3,
    title: 'Technical Optimization',
    description:
      'We optimize HubL templates for speed and semantics, improve Core Web Vitals, implement and validate schema markup, fix crawl directives and redirects, and ensure mobile and UX signals support SEO.',
  },
  {
    number: 4,
    title: 'Content Strategy & Optimization',
    description:
      'We design topic clusters and pillar pages using HubSpot’s content tools, optimize blog and landing page copy and meta data, strengthen internal linking, and target featured snippets and question-based queries where relevant.',
  },
  {
    number: 5,
    title: 'Off-Page & Authority Building',
    description:
      'We build a natural backlink profile and brand mentions, including opportunities within the HubSpot ecosystem (partner directory, integration pages, and relevant industry sites) to strengthen authority and rankings.',
  },
  {
    number: 6,
    title: 'Monitoring & Iteration',
    description:
      'We set up monthly SEO dashboards (in HubSpot and/or GA4 and GSC), track rankings, traffic, and conversions, and iterate on content and technical changes based on data and algorithm updates.',
  },
];

// ─── Testimonials (real client reviews) ────────────────────────────────────
const testimonials = [
  {
    quote:
      'ImmortalSEO optimized our HubSpot site for core terms like AI coding agent, managed our glossary and blog pages, set up SEO reporting, and delivered solid semantic SEO across the CMS. They know HubSpot inside out.',
    author: 'Archie Sharma',
    position: 'GTM Strategist, Zencoder.ai',
  },
  {
    quote:
      'ImmortalSEO improved the technical SEO of our HubSpot CMS website and implemented schema markup the right way. Professional, thorough, and easy to work with.',
    author: 'Andrew Genskow',
    position: 'Digital Marketing Lead, PALO IT',
  },
];

// ─── Comparison data (HubSpot vs WordPress) ─────────────────────────────────
const comparisonItems = [
  { feature: 'SEO flexibility', option1: 'Good (template/CMS constraints)', option2: 'Very high (plugins, full control)' },
  { feature: 'Built-in SEO tools', option1: 'Yes (recommendations, topic clusters)', option2: 'Via plugins (Yoast, Rank Math, etc.)' },
  { feature: 'Best for', option1: 'Marketing teams, all-in-one CRM + CMS', option2: 'Blogs, e‑commerce, custom builds' },
];

export default async function HubSpotSEOServicesPage() {
  const context = getSchemaContext();

  const webPageSchema = generateWebPageSchema({
    url: canonicalUrl,
    title: metadata.title as string,
    description: metadata.description as string,
    datePublished: '2023-01-01T00:00:00Z',
    dateModified: new Date().toISOString(),
    breadcrumbs: [
      { name: 'Home', url: baseUrl },
      { name: 'Services', url: `${baseUrl}/services` },
      { name: serviceName, url: canonicalUrl },
    ],
  });

  const serviceSchema = generateServiceSchema({
    url: canonicalUrl,
    name: serviceName,
    description:
      'Specialized SEO services for HubSpot CMS Hub and Content Hub. We optimize technical foundation, blog and landing pages, schema markup, and content strategy for higher rankings and lead generation. Serving B2B, SaaS, and marketing teams on HubSpot.',
    serviceType: 'CMS-Specific SEO',
    offers: {
      price: '$1,500',
      priceCurrency: 'USD',
      description: 'HubSpot SEO Services starting at $1,500/month',
    },
    provider: { '@type': 'Organization', name: 'ImmortalSEO', url: baseUrl },
    areaServed: 'United States, Canada',
  });

  (serviceSchema as any).relatedService = [
    { '@type': 'Service', name: 'WordPress SEO Services', url: `${baseUrl}/services/wordpress-seo` },
    { '@type': 'Service', name: 'Shopify SEO Services', url: `${baseUrl}/services/shopify-seo` },
    { '@type': 'Service', name: 'Technical SEO & Site Architecture', url: `${baseUrl}/services/technical-seo` },
  ];

  const faqSchema = generateFAQPageSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })));
  const howToSchema = generateHowToSchema({
    name: `How to Get ${serviceName}`,
    description: `Step-by-step process for getting ${serviceName} from ImmortalSEO`,
    steps: processSteps.map((s) => ({ name: s.title, text: s.description })),
    totalTime: 'PT2H',
    image: `${baseUrl}/images/services/hubspot-seo-services.jpg`,
  });

  const schemas: BaseSchema[] = [
    context.organization,
    context.website,
    webPageSchema,
    serviceSchema,
    faqSchema,
    howToSchema,
  ];

  testimonials.forEach((t) => {
    schemas.push(
      generateTestimonialSchema({
        author: t.author,
        reviewBody: t.quote,
        datePublished: new Date().toISOString(),
        itemReviewed: { '@type': 'Service', name: serviceName, url: canonicalUrl },
        ratingValue: 5,
      })
    );
  });
  schemas.push(generateAggregateRatingFromReviews(testimonials.map(() => ({ ratingValue: 5 }))));
  if (context.localBusiness) schemas.push(context.localBusiness);

  const schemaGraph = generateSchemaGraph(schemas.filter(Boolean));

  const tableOfContents = [
    { id: 'problem', label: 'Why HubSpot Websites Struggle to Rank' },
    { id: 'services', label: 'Our HubSpot SEO Services' },
    { id: 'who-for', label: 'Who This Is For' },
    { id: 'process', label: 'Our HubSpot SEO Process' },
    { id: 'results', label: 'HubSpot SEO Results' },
    { id: 'comparison', label: 'HubSpot vs Other Platforms' },
    { id: 'testimonials', label: 'What Clients Say' },
    { id: 'faq', label: 'Frequently Asked Questions' },
    { id: 'resources', label: 'HubSpot SEO Resources' },
    { id: 'industries', label: 'Industries We Serve' },
    { id: 'locations', label: 'Locations' },
  ];

  const breadcrumbs = [
    { name: 'Services', href: '/services' },
    { name: serviceName, href: '/services/hubspot-seo-services' },
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <JsonLd data={schemaGraph} />

      {/* ─── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary-main to-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat" />
        </div>
        <Container>
          <div className="py-16 md:py-24 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-6 backdrop-blur-sm">
                CMS-Specific SEO
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                HubSpot SEO Services
              </h1>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                We optimize HubSpot CMS Hub and Content Hub for search engines and AI platforms—from technical architecture and blog SEO to landing pages and lead generation.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm">HubSpot CMS Specialists</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm">15+ Years SEO Experience</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm">Full CMS Hub + Content Hub</span>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="#problem" variant="secondary" className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform">
                  See The Challenge
                </Button>
                <Button href="/contact?service=hubspot-seo-services" variant="outline" className="text-white border-white hover:bg-white/10 px-8">
                  Get Free HubSpot SEO Audit
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 2. TRUST BAR ────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <Container>
          <div className="py-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-text-secondary">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary-main" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <span>SEO Experts Since 2008</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.9/5 Client Rating</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary-main" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <span>250+ Businesses Served</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary-main" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span>94% Client Retention</span>
            </div>
          </div>
        </Container>
      </div>

      {/* ─── 3. MAIN CONTENT + SIDEBAR ───────────────────────────────────── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <nav aria-label="On this page" className="bg-white rounded-xl shadow-sm p-6 mb-8 border-l-4 border-primary-main">
                <h2 className="text-lg font-semibold mb-3">On This Page</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="flex items-center text-primary-main hover:text-primary-dark text-sm">
                        <svg className="w-3.5 h-3.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <article>
                {/* ─── Why HubSpot Websites Struggle ──────────────────────── */}
                <section id="problem" className="scroll-mt-24 mb-10">
                  <h2 className="text-3xl font-bold mb-6">Why HubSpot Websites Struggle to Rank</h2>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    HubSpot CMS Hub gives you a strong base: built-in SSL, CDN, mobile-responsive themes, and native SEO tools like the recommendations panel and topic clusters. But without expert optimization, many HubSpot sites underperform in search.
                  </p>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    Default themes often ship with weak heading hierarchy (e.g. H1 in the logo), and HubL templates can output heavy or non-semantic HTML that hurts Core Web Vitals. JavaScript-rendered modules need to be crawlable; HubDB-driven and programmatic pages need clear canonicals and pagination. HubSpot’s robots.txt and server-side redirect options are more limited than on self-hosted setups, and advanced schema or custom technical SEO usually requires specialist input. Content staging and publishing workflows also rarely account for SEO testing by default.
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    Our HubSpot SEO services address these gaps so your site can rank and convert without leaving the platform. We work inside HubSpot’s architecture—templates, Content Hub, and reporting—so you get results that stick.
                  </p>
                </section>

                {/* ─── Our HubSpot SEO Services (6 pillars) ───────────────── */}
                <section id="services" className="scroll-mt-24 mb-10">
                  <h2 className="text-3xl font-bold mb-6">Our HubSpot SEO Services</h2>
                  <p className="text-text-secondary mb-8 max-w-3xl">
                    We optimize every layer of your HubSpot presence: technical foundation, blog and content hub, landing pages, schema, analytics, and migrations.
                  </p>

                  <div className="space-y-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
                      <h3 className="text-xl font-bold text-primary-main mb-3">1. HubSpot Technical SEO & CMS Optimization</h3>
                      <p className="text-text-secondary leading-relaxed">
                        We optimize template code and HubL for performance and semantics, improve Core Web Vitals, fix crawl and indexation issues, and manage robots.txt and sitemaps. We also tighten redirects, SSL, and CDN configuration so search engines can crawl and rank your pages efficiently.
                      </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
                      <h3 className="text-xl font-bold text-primary-main mb-3">2. HubSpot Blog & Content Hub SEO</h3>
                      <p className="text-text-secondary leading-relaxed">
                        We align your blog with a topic cluster strategy using HubSpot’s content tools, audit and optimize existing posts, improve internal linking and pillar structure, and target featured snippets and question-based queries. Blog templates and listing pages are tuned for crawlability and relevance.
                      </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
                      <h3 className="text-xl font-bold text-primary-main mb-3">3. HubSpot Landing Page SEO</h3>
                      <p className="text-text-secondary leading-relaxed">
                        We optimize landing page templates for both search and conversion: clear headings, meta data, and structure that support rankings while keeping forms and CTAs effective. We ensure A/B tests and variants don’t harm SEO and that key landing pages are fully crawlable and indexable.
                      </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
                      <h3 className="text-xl font-bold text-primary-main mb-3">4. HubSpot Schema & Structured Data</h3>
                      <p className="text-text-secondary leading-relaxed">
                        HubSpot doesn’t offer a one-click schema plugin like some other CMSs. We implement Organization, WebSite, FAQPage, Service, BreadcrumbList, and article-specific markup through custom HubL modules or embed blocks, then validate and monitor so rich results appear correctly and without errors.
                      </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
                      <h3 className="text-xl font-bold text-primary-main mb-3">5. HubSpot Analytics & SEO Reporting</h3>
                      <p className="text-text-secondary leading-relaxed">
                        We connect GA4 and Search Console to your HubSpot property, build custom SEO dashboards (in HubSpot or your BI tool), and set up conversion and attribution tracking so you can see how organic search drives leads and revenue. Reports are tailored to your goals and updated regularly.
                      </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
                      <h3 className="text-xl font-bold text-primary-main mb-3">6. HubSpot Migration SEO</h3>
                      <p className="text-text-secondary leading-relaxed">
                        Moving to HubSpot from WordPress, Drupal, or a custom build? We plan URL mapping and redirects, content migration checklists, canonical and hreflang handling, and post-launch monitoring so you don’t lose rankings. We recommend involving SEO from the start of any migration.
                      </p>
                    </div>
                  </div>
                </section>

                {/* ─── Who This Is For ────────────────────────────────────── */}
                <section id="who-for" className="scroll-mt-24 mb-10">
                  <h2 className="text-3xl font-bold mb-6">Who Our HubSpot SEO Services Are For</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mt-0.5">✓</span>
                      <div>
                        <strong className="text-text-primary">B2B companies on HubSpot CMS Hub</strong>
                        <p className="text-text-secondary text-sm mt-1">You use HubSpot as your primary website and want more organic traffic and leads without leaving the platform.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mt-0.5">✓</span>
                      <div>
                        <strong className="text-text-primary">SaaS and technology marketers</strong>
                        <p className="text-text-secondary text-sm mt-1">Your marketing site lives on HubSpot and you need blog and landing page SEO that supports product-led and sales-led motions.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mt-0.5">✓</span>
                      <div>
                        <strong className="text-text-primary">Teams with large HubSpot blogs</strong>
                        <p className="text-text-secondary text-sm mt-1">You have dozens or hundreds of posts and need topic clusters, internal linking, and refresh strategies to maximize rankings.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mt-0.5">✓</span>
                      <div>
                        <strong className="text-text-primary">Companies migrating to HubSpot</strong>
                        <p className="text-text-secondary text-sm mt-1">You’re moving from WordPress, Drupal, or another CMS and want to preserve rankings and fix structure during the move.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mt-0.5">✓</span>
                      <div>
                        <strong className="text-text-primary">Agencies managing client HubSpot accounts</strong>
                        <p className="text-text-secondary text-sm mt-1">You run multiple HubSpot sites and need a partner who can scale SEO across properties with consistent methodology.</p>
                      </div>
                    </li>
                  </ul>
                </section>

                {/* ─── Our Process ────────────────────────────────────────── */}
                <section id="process" className="scroll-mt-24 mb-10">
                  <h2 className="text-3xl font-bold mb-6">Our HubSpot SEO Process</h2>
                  <StepByStep title="" steps={processSteps} />
                </section>

                {/* ─── Case Studies / Results ────────────────────────────── */}
                <section id="results" className="scroll-mt-24 mb-10">
                  <h2 className="text-3xl font-bold mb-6">HubSpot SEO Results We&apos;ve Delivered</h2>
                  <div className="space-y-8">
                    <div className="border-l-4 border-primary-main pl-5 py-2">
                      <h3 className="text-xl font-semibold mb-2">Cable Manufacturer Achieves 327% Traffic Increase</h3>
                      <p className="text-text-secondary mb-4">
                        A cable connector manufacturer on HubSpot CMS saw flat organic traffic and low lead quality. We audited their templates, restructured their blog into topic clusters, optimized landing pages for high-intent keywords, and implemented schema. Within six months, organic traffic and qualified leads grew substantially.
                      </p>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-3">Results</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-text-secondary">
                        <li className="flex items-center gap-2">
                          <span className="text-green-600">✓</span> 327% increase in organic traffic
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-600">✓</span> 156% growth in qualified leads
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-600">✓</span> 42% increase in conversion rate
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link href="/case-studies" className="inline-flex items-center text-primary-main font-medium hover:text-primary-dark text-sm">
                      View All Case Studies
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </section>

                {/* ─── Comparison ────────────────────────────────────────── */}
                <section id="comparison" className="scroll-mt-24 mb-10">
                  <h2 className="text-3xl font-bold mb-6">How HubSpot SEO Compares to Other Platforms</h2>
                  <p className="text-text-secondary mb-6 max-w-3xl">
                    HubSpot excels for marketing teams that want an all-in-one CRM and CMS; WordPress offers more flexibility and plugin ecosystems; Webflow is strong for design-led marketing sites. We support all three. If you’re comparing options, see our <Link href="/services/wordpress-seo" className="text-primary-main hover:underline">WordPress SEO services</Link> and <Link href="/services/shopify-seo" className="text-primary-main hover:underline">Shopify SEO services</Link> for platform-specific approaches.
                  </p>
                  <ComparisonTable
                    title="HubSpot vs WordPress for SEO"
                    option1Label="HubSpot"
                    option2Label="WordPress"
                    items={comparisonItems}
                  />
                </section>

                {/* ─── Testimonials ───────────────────────────────────────── */}
                <section id="testimonials" className="scroll-mt-24 mb-10">
                  <h2 className="text-3xl font-bold mb-6">What Clients Say About Our HubSpot SEO Work</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((t, i) => (
                      <blockquote key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex mb-3">
                          {[1, 2, 3, 4, 5].map((_, j) => (
                            <svg key={j} className="text-yellow-400 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-text-secondary italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                        <footer className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-main/10 rounded-full flex items-center justify-center text-primary-main font-bold text-sm flex-shrink-0">
                            {t.author.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{t.author}</p>
                            <p className="text-xs text-text-secondary">{t.position}</p>
                          </div>
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link href="/testimonials" className="text-primary-main text-sm font-medium hover:text-primary-dark inline-flex items-center">
                      Read more testimonials →
                    </Link>
                  </div>
                </section>

                {/* ─── FAQ ────────────────────────────────────────────────── */}
                <section id="faq" className="scroll-mt-24 mb-10">
                  <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions About HubSpot SEO</h2>
                  <div className="space-y-3">
                    {faqs.map((item, i) => (
                      <details key={i} className="group border border-gray-100 rounded-lg">
                        <summary className="flex justify-between items-center p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                          <h3 className="font-semibold text-base pr-4">{item.question}</h3>
                          <svg className="w-5 h-5 text-primary-main flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="px-4 pb-4">
                          <p className="text-text-secondary leading-relaxed">{item.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                  <div className="mt-8 bg-gray-50 p-5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold">Have a specific question?</p>
                      <p className="text-sm text-text-secondary">Our SEO experts are ready to help.</p>
                    </div>
                    <Link
                      href="/contact?service=hubspot-seo-services"
                      className="inline-flex items-center bg-primary-main text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium flex-shrink-0"
                    >
                      Ask Your Question
                      <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </Link>
                  </div>
                </section>

                {/* ─── Related Resources ──────────────────────────────────── */}
                <section id="resources" className="scroll-mt-24">
                  <h2 className="text-3xl font-bold mb-6">HubSpot SEO Resources</h2>
                  <p className="text-text-secondary mb-6">
                    Dive deeper with our guides and compare platforms. For broader technical or content strategy beyond your CMS, see our <Link href="/services/technical-seo" className="text-primary-main hover:underline">Technical SEO</Link> and <Link href="/services/content-seo" className="text-primary-main hover:underline">Content SEO</Link> services.
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <span className="text-text-secondary font-medium inline-flex items-center gap-2">
                        Ultimate Guide to HubSpot SEO
                      </span>
                      <span className="text-xs text-text-disabled ml-2">(coming soon)</span>
                    </li>
                    <li>
                      <span className="text-text-secondary font-medium inline-flex items-center gap-2">
                        HubSpot SEO vs WordPress SEO
                      </span>
                      <span className="text-xs text-text-disabled ml-2">(coming soon)</span>
                    </li>
                    <li>
                      <span className="text-text-secondary font-medium inline-flex items-center gap-2">
                        10 HubSpot SEO Tips Every Marketer Should Know
                      </span>
                      <span className="text-xs text-text-disabled ml-2">(coming soon)</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link href="/services" className="inline-flex items-center text-primary-main text-sm font-medium hover:text-primary-dark">
                      View All Services
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </section>
              </article>
            </div>

            {/* ─── SIDEBAR ────────────────────────────────────────────────── */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                <LeadCaptureForm
                  title="Get Started with HubSpot SEO"
                  description="Schedule a free HubSpot SEO audit and consultation"
                  service={serviceName}
                  customSubject="HubSpot SEO Services Inquiry"
                  buttonText="Request Free Consultation"
                />
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-4">Why Choose ImmortalSEO</h3>
                  <ul className="space-y-3 text-sm">
                    {['15+ years of SEO expertise', '94% client retention rate', 'AI-enhanced SEO strategies', 'Tailored strategies, not templates', 'Serving USA & Canada'].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-primary-main mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <Link href="/about" className="text-primary-main text-sm font-medium hover:text-primary-dark inline-flex items-center">
                      Learn About Our Team
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-4">Related SEO Services</h3>
                  <div className="space-y-3">
                    <Link href="/services/wordpress-seo" className="block p-3 bg-gray-50 rounded-lg hover:bg-primary-main/5 transition-colors">
                      <h4 className="font-semibold text-sm">WordPress SEO Services</h4>
                      <p className="text-xs text-text-secondary mt-1">Maximize your WordPress site’s organic visibility with SEO tailored for the WordPress ecosystem.</p>
                    </Link>
                    <Link href="/services/shopify-seo" className="block p-3 bg-gray-50 rounded-lg hover:bg-primary-main/5 transition-colors">
                      <h4 className="font-semibold text-sm">Shopify SEO Services</h4>
                      <p className="text-xs text-text-secondary mt-1">Optimize your Shopify store for higher visibility, faster performance, and more conversions.</p>
                    </Link>
                    <Link href="/services/technical-seo" className="block p-3 bg-gray-50 rounded-lg hover:bg-primary-main/5 transition-colors">
                      <h4 className="font-semibold text-sm">Technical SEO & Site Architecture</h4>
                      <p className="text-xs text-text-secondary mt-1">Build a solid technical foundation for search engines and AI crawlers.</p>
                    </Link>
                  </div>
                  <div className="mt-4 text-center">
                    <Link href="/services" className="inline-flex items-center text-primary-main text-sm font-medium hover:text-primary-dark">
                      View All Services
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* ─── 4. CONTEXTUAL INDUSTRIES ─────────────────────────────────────── */}
      <Section background="light">
        <Container>
          <div className="text-center mb-10">
            <h2 id="industries" className="text-2xl md:text-3xl font-bold mb-3 scroll-mt-24">
              Industries We Serve with HubSpot SEO
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We work with B2B, SaaS, professional services, and marketing teams that run on HubSpot CMS.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'SaaS & B2B SEO', href: '/services/saas-seo' },
              { name: 'E-commerce SEO', href: '/industries/e-commerce' },
              { name: 'Professional Services', href: '/services/small-business-seo' },
              { name: 'Healthcare Marketing', href: '/industries/ivf-hospitals' },
              { name: 'Financial Services', href: '/services/enterprise-seo' },
              { name: 'Education & EdTech', href: '/industries/dermatologist' },
            ].map((ind) => (
              <Link
                key={ind.href}
                href={ind.href}
                className="bg-white p-3 rounded-lg text-sm text-text-secondary hover:text-primary-main hover:shadow-sm transition-all text-center"
              >
                {ind.name}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── 5. LOCATIONS (streamlined) ───────────────────────────────────── */}
      <Section>
        <Container>
          <div className="text-center mb-10">
            <h2 id="locations" className="text-2xl md:text-3xl font-bold mb-3 scroll-mt-24">
              HubSpot SEO Services by Location
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We serve businesses across the United States and Canada. Select your city for local-focused information.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">United States</h3>
              <ul className="space-y-2">
                {['New York', 'Los Angeles', 'Chicago', 'Houston', 'San Francisco'].map((city) => (
                  <li key={city}>
                    <Link
                      href={`/services/hubspot-seo-services/locations/${city.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-text-secondary hover:text-primary-main transition-colors text-sm"
                    >
                      HubSpot SEO Services in {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">More US Cities</h3>
              <ul className="space-y-2">
                {['Dallas', 'Seattle', 'Miami', 'Boston', 'Phoenix'].map((city) => (
                  <li key={city}>
                    <Link
                      href={`/services/hubspot-seo-services/locations/${city.toLowerCase()}`}
                      className="text-text-secondary hover:text-primary-main transition-colors text-sm"
                    >
                      HubSpot SEO Services in {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">Canada</h3>
              <ul className="space-y-2">
                {['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'].map((city) => (
                  <li key={city}>
                    <Link
                      href={`/services/hubspot-seo-services/locations/${city.toLowerCase()}`}
                      className="text-text-secondary hover:text-primary-main transition-colors text-sm"
                    >
                      HubSpot SEO Services in {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── 6. FINAL CTA ────────────────────────────────────────────────── */}
      <Section background="primary">
        <Container>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Improve Your HubSpot Strategy?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Get a free HubSpot SEO audit and a personalized strategy for your business.
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.9/5 Rating
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Response Within 24 Hours
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button
                  href="/contact?service=hubspot-seo-services"
                  variant="secondary"
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Get Free HubSpot SEO Audit
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}
