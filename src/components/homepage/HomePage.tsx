// src/components/homepage/HomePage.tsx
// Server component — all content is server-rendered for optimal SEO & LLM indexing

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import FAQAccordion from "@/components/homepage/FAQAccordion";

// ─── Service Data ─────────────────────────────────────────────────────────────

const featuredServices = [
  {
    id: 1,
    name: "Technical SEO",
    slug: "technical-seo",
    description:
      "Optimize site architecture, crawlability, indexation, and Core Web Vitals so search engines and AI crawlers can fully access and understand your website.",
  },
  {
    id: 2,
    name: "Content SEO",
    slug: "content-seo",
    description:
      "Build topical authority with E-E-A-T optimized content, strategic topic clusters, and semantic structuring that resonates with both users and search algorithms.",
  },
  {
    id: 3,
    name: "Off-Page SEO",
    slug: "off-page-seo",
    description:
      "Earn high-quality backlinks through ethical outreach, digital PR, and brand signal development that builds lasting domain authority.",
  },
  {
    id: 4,
    name: "Local SEO",
    slug: "local-seo",
    description:
      "Dominate local search results with Google Business Profile optimization, local citations, review management, and map pack strategies.",
  },
  {
    id: 5,
    name: "AI-Enhanced SEO",
    slug: "ai-enhanced-seo",
    description:
      "Dual-optimize your content for traditional SERPs and AI platforms like ChatGPT, Perplexity, Google AI Overviews, and Claude.",
  },
  {
    id: 6,
    name: "E-commerce SEO",
    slug: "ecommerce-seo",
    description:
      "Boost product visibility and conversions with product schema, category optimization, and buyer-intent keyword strategies for online stores.",
  },
];

const additionalServices = [
  { name: "Semantic SEO", slug: "semantic-seo" },
  { name: "SaaS & B2B SEO", slug: "saas-seo" },
  { name: "Small Business SEO", slug: "small-business-seo" },
  { name: "Enterprise SEO", slug: "enterprise-seo" },
];

// ─── Service Icons (Inline SVGs — no external dependencies) ────────────────

function ServiceIcon({ slug }: { slug: string }) {
  const cls = "w-6 h-6";
  switch (slug) {
    case "technical-seo":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "content-seo":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    case "off-page-seo":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      );
    case "local-seo":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      );
    case "ai-enhanced-seo":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      );
    case "ecommerce-seo":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      );
    default:
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      );
  }
}

// ─── Why Choose Us Data ───────────────────────────────────────────────────────

const benefits = [
  {
    id: 1,
    title: "Data-Driven SEO Analysis",
    description:
      "Decisions backed by comprehensive audits, competitor research, and advanced analytics to identify high-impact opportunities.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Transparent Performance Tracking",
    description:
      "Real-time dashboards showing organic traffic growth, keyword rankings, conversion improvements, and ROI metrics.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Custom SEO Strategies",
    description:
      "Every business receives a tailored plan addressing your specific goals, industry challenges, and competitive landscape.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Algorithm-Proof Optimization",
    description:
      "Semantic SEO techniques that build entity relationships and maintain rankings through updates by focusing on E-E-A-T principles.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

// ─── Approach Steps ───────────────────────────────────────────────────────────

const approachSteps = [
  {
    id: 1,
    title: "SEO Audit & Analysis",
    description:
      "We analyze your website architecture, crawlability, indexation, performance metrics, and competitive landscape to identify opportunities.",
  },
  {
    id: 2,
    title: "Strategy Development",
    description:
      "We create a tailored roadmap targeting the right keywords, topics, and entities based on search intent analysis and business objectives.",
  },
  {
    id: 3,
    title: "Implementation",
    description:
      "Our team implements technical fixes, content enhancements, schema markup, and builds high-quality backlinks from relevant websites.",
  },
  {
    id: 4,
    title: "Tracking & Refinement",
    description:
      "We continuously measure rankings, traffic, conversions, and revenue impact, making data-driven adjustments to maximize results.",
  },
];

// ─── Team Data ────────────────────────────────────────────────────────────────

const teamMembers = [
  {
    id: 1,
    name: "Rajesh Jat",
    title: "Co-Founder & SEO Strategist",
    bio: "Rajesh is a seasoned SEO professional with deep expertise in keyword research, competitive analysis, and decoding user search intent. With a strong technical background, he excels at leveraging AI to craft content that aligns with semantic search engine requirements. His strategies consistently drive measurable organic growth across diverse industries.",
    image: "/images/team/rajesh-jat-seo.png",
    linkedin: "https://linkedin.com/in/rajeshjatindia",
  },
  {
    id: 2,
    name: "Manish Lamrod",
    title: "Co-Founder & Off-Page SEO Expert",
    bio: "Manish is an expert in off-page SEO, specializing in white-hat link building and developing tailored SEO strategies based on client needs. With a strong grasp of relationship building and long-term client success, he ensures every campaign is backed by sustainable growth and ethical optimization practices.",
    image: "/images/team/manish-lamrod-seo.png",
    linkedin: "https://linkedin.com/in/manishlamrod",
  },
];

// ─── Testimonials (shared with /testimonials page) ────────────────────────────

const testimonials = [
  {
    id: "archie-zencoder",
    quote:
      "ImmortalSEO helped us rank for our main keyword 'AI Coding Agent' in under 3 months. Their AI-enhanced SEO strategies not only improved our Google rankings but also ensured visibility across AI-powered search platforms.",
    author: "Archie Sharma",
    position: "COO",
    company: "Zencoder.ai",
    industry: "AI & Technology",
    rating: 5,
  },
  {
    id: "narendra-omgs",
    quote:
      "With ImmortalSEO's strategic support, we saw a significant increase in organic traffic for high-intent keywords like 'acrylic photo frames' and 'acrylic wall photo'. Their deep understanding of search behavior and technical SEO helped us dominate our niche.",
    author: "Narendra Kumar",
    position: "Founder",
    company: "Omgs.in",
    industry: "E-commerce",
    rating: 5,
  },
];

// ─── FAQ Data — exported for schema generation in page.tsx ────────────────────

export const homepageFAQs = [
  {
    id: 1,
    question: "How long does it take to see results from professional SEO services?",
    answer:
      "SEO is a long-term strategy with both short and long-term impacts. Technical improvements often show results within 2-4 weeks. Content and on-page optimization typically begin showing meaningful traffic improvements in 2-3 months. Competitive keywords and new websites generally require 4-6 months for significant ranking improvements. Our transparent reporting shows progress at every stage of your SEO campaign.",
  },
  {
    id: 2,
    question: "How much do your SEO services cost?",
    answer:
      "Our customized SEO packages start at $2,000/month, with pricing based on your business goals, website size, competitive landscape, and specific SEO needs. We offer specialized services for local SEO, e-commerce SEO, enterprise SEO, and international SEO. Every client receives a tailored proposal after a comprehensive audit identifies your specific optimization opportunities.",
  },
  {
    id: 3,
    question: "What makes ImmortalSEO different from other SEO agencies?",
    answer:
      "Unlike many SEO companies that rely on outdated tactics, we combine technical expertise with advanced AI-driven strategies. Our unique approach includes semantic SEO optimization for both traditional search engines and AI platforms, comprehensive schema markup implementation, and entity-based content strategies that establish topical authority. We maintain a 94% client retention rate by focusing on measurable business outcomes, not just rankings.",
  },
  {
    id: 4,
    question: "Do you offer specialized SEO for different industries?",
    answer:
      "Yes, we have deep expertise in industry-specific SEO strategies for e-commerce, SaaS, healthcare, professional services, and local businesses. Our SEO consultants understand the unique challenges and opportunities in each vertical, including compliance requirements, competitive dynamics, and audience behaviors. This specialized knowledge allows us to create more effective, targeted SEO campaigns.",
  },
  {
    id: 5,
    question: "How does AI impact SEO, and how do you adapt your strategies?",
    answer:
      "AI is transforming search with Google's AI Overviews, Bing AI, and independent platforms like ChatGPT and Perplexity. We've pioneered techniques for optimizing content to perform well in both traditional SERPs and AI-generated responses. This includes semantic entity optimization, E-E-A-T enhancement, comprehensive schema markup, and content structured for featured snippets and knowledge panels that AI systems frequently reference.",
  },
];

// ─── Location Data ────────────────────────────────────────────────────────────

const usaCities = [
  { name: "New York", slug: "new-york" },
  { name: "Los Angeles", slug: "los-angeles" },
  { name: "Chicago", slug: "chicago" },
  { name: "Houston", slug: "houston" },
  { name: "Phoenix", slug: "phoenix" },
  { name: "Dallas", slug: "dallas" },
  { name: "San Francisco", slug: "san-francisco" },
  { name: "Seattle", slug: "seattle" },
  { name: "Miami", slug: "miami" },
  { name: "Boston", slug: "boston" },
];

const canadaCities = [
  { name: "Toronto", slug: "toronto" },
  { name: "Vancouver", slug: "vancouver" },
  { name: "Montreal", slug: "montreal" },
  { name: "Calgary", slug: "calgary" },
  { name: "Ottawa", slug: "ottawa" },
  { name: "Winnipeg", slug: "winnipeg" },
  { name: "Quebec City", slug: "quebec-city" },
];

// ─── Star Rating Component ────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN HOMEPAGE COMPONENT (Server-rendered)
// ═════════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen">
      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION                                                     */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary-main to-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat" />
        </div>

        <Container>
          <div className="flex flex-col lg:flex-row items-center py-16 md:py-24 relative z-10 gap-12">
            {/* Left column */}
            <div className="lg:w-1/2">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-6 backdrop-blur-sm">
                Trusted SEO Partner Since 2008
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-6 leading-tight">
                SEO Services That Drive{" "}
                <span className="text-yellow-300">Measurable Business Growth</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90 max-w-xl leading-relaxed">
                Immortal SEO helps businesses across the USA and Canada achieve sustainable
                organic growth through data-driven strategies — optimized for both Google
                and AI search platforms like ChatGPT, Perplexity, and Google AI Overviews.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Get a Free SEO Audit
                </Button>
                <Button
                  href="/services"
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white/10 px-8"
                >
                  View Our Services
                </Button>
              </div>

              {/* Inline trust metrics — real, verifiable numbers */}
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <span className="flex items-center gap-1.5">
                  <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">4.9/5</span> Client Rating
                </span>
                <span className="hidden sm:block w-px h-4 bg-white/30" />
                <span className="font-medium">250+ Businesses Ranked</span>
                <span className="hidden sm:block w-px h-4 bg-white/30" />
                <span className="font-medium">94% Client Retention</span>
              </div>
            </div>

            {/* Right column — hero image */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-yellow-300 rounded-full opacity-20 blur-2xl" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-3xl" />
                <div className="bg-white rounded-xl shadow-2xl p-2 sm:p-4 md:p-6 relative z-10">
                  <div className="bg-gradient-to-br from-background-paper to-background-accent rounded-lg overflow-hidden">
                    <Image
                      src="/images/homepage/immortalseo.webp"
                      alt="Immortal SEO Dashboard — Advanced SEO Analytics View"
                      width={1200}
                      height={675}
                      priority
                      quality={90}
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 2. SOCIAL PROOF BAR                                                 */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <Container>
          <div className="py-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-main">15+</p>
              <p className="text-sm text-text-secondary mt-1">Years of SEO Experience</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-main">250+</p>
              <p className="text-sm text-text-secondary mt-1">Businesses Ranked on Page 1</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-main">94%</p>
              <p className="text-sm text-text-secondary mt-1">Client Retention Rate</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-main">187%</p>
              <p className="text-sm text-text-secondary mt-1">Avg. Organic Traffic Growth</p>
            </div>
          </div>
        </Container>
      </div>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 3. SERVICES SECTION                                                 */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
              Comprehensive SEO Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Data-Driven SEO Services for {currentYear} &amp; Beyond
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              From technical optimization to AI-ready content strategies, our tailored
              services help businesses of all sizes achieve sustainable organic growth
              in both traditional and AI-powered search environments.
            </p>
          </div>

          {/* Featured Services — 6 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group block"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary-main/10 text-primary-main mb-5">
                  <ServiceIcon slug={service.slug} />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-main transition-colors">
                  {service.name}
                </h3>
                <p className="text-text-secondary mb-4 leading-relaxed">
                  {service.description}
                </p>
                <span className="inline-flex items-center text-primary-main font-medium text-sm">
                  Learn More
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          {/* Additional Services — compact row */}
          <div className="mt-10 bg-background-paper rounded-xl p-6">
            <p className="text-sm font-medium text-text-secondary mb-3 text-center">Also explore:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {additionalServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium text-text-primary hover:text-primary-main hover:border-primary-main transition-colors"
                >
                  {service.name}
                  <svg className="w-3.5 h-3.5 ml-1.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Button
              href="/services"
              variant="outline"
              className="hover:bg-primary-main hover:text-white transition-colors"
            >
              View All Services
            </Button>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 4. WHY CHOOSE US + STATS                                            */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <Section background="light">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
                Why Choose ImmortalSEO?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Proven SEO Expertise Since 2008
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                With over 15 years of experience optimizing websites for search engines,
                ImmortalSEO has evolved alongside every major algorithm update. Our SEO
                consultants combine time-tested strategies with cutting-edge AI techniques
                to deliver measurable results across both traditional and AI-powered search platforms.
              </p>

              <div className="space-y-5">
                {benefits.map((benefit) => (
                  <div key={benefit.id} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main text-white flex items-center justify-center mr-4">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-text-secondary text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button href="/about" variant="primary" className="hover:shadow-lg transition-shadow">
                  Learn More About Us
                </Button>
              </div>
            </div>

            {/* Stats cards */}
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-primary-main/5 rounded-full blur-3xl" />
                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-4xl md:text-5xl font-bold text-primary-main mb-2">94%</p>
                    <p className="text-text-secondary text-sm">Client retention rate, well above industry average</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-4xl md:text-5xl font-bold text-primary-main mb-2">187%</p>
                    <p className="text-text-secondary text-sm">Average increase in organic traffic within 6 months</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-4xl md:text-5xl font-bold text-primary-main mb-2">15+</p>
                    <p className="text-text-secondary text-sm">Years of combined SEO expertise since 2008</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-4xl md:text-5xl font-bold text-primary-main mb-2">250+</p>
                    <p className="text-text-secondary text-sm">Businesses successfully ranked on page one</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 5. CASE STUDIES — Results-focused                                   */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
              Real Results
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SEO Success Stories
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              See how our custom SEO strategies have delivered massive growth for
              real businesses across industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/case-studies/omgs-in" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group block">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-text-secondary">E-commerce</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  +400% Organic Traffic
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-main transition-colors">
                OMGS.in — Acrylic Photo Prints
              </h3>
              <p className="text-text-secondary mb-4">
                We helped OMGS dominate the Indian search landscape for acrylic photo
                products, taking them from near invisibility to 400% growth in organic
                traffic within 12 months.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary-main font-medium">12-month campaign</span>
                <span className="text-text-secondary">Top rankings for product keywords</span>
              </div>
            </Link>

            <Link href="/case-studies/zencoder-ai" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group block">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-text-secondary">AI / SaaS</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  #1 for &quot;AI Coding Agent&quot;
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-main transition-colors">
                Zencoder.ai
              </h3>
              <p className="text-text-secondary mb-4">
                In just 3 months, we ranked Zencoder.ai for its main keyword &quot;AI Coding
                Agent,&quot; establishing authority in a rapidly growing niche with focused
                entity-based SEO.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary-main font-medium">3-month sprint</span>
                <span className="text-text-secondary">Ranked core keyword to #1</span>
              </div>
            </Link>

            <Link href="/case-studies/cbd-brand" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group block">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-text-secondary">CBD Industry</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  14,000 Monthly Visitors
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-main transition-colors">
                CBD Brand (Confidential)
              </h3>
              <p className="text-text-secondary mb-4">
                We scaled a CBD brand&apos;s organic traffic from just 100 to over 14,000
                monthly visitors in one of the most competitive niches — without paid ads
                or shortcuts.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary-main font-medium">12-month timeline</span>
                <span className="text-text-secondary">100 → 14,000 organic visits</span>
              </div>
            </Link>
          </div>

          <div className="text-center mt-10">
            <Button href="/case-studies" variant="primary" className="hover:shadow-lg">
              View All Case Studies
            </Button>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 6. TESTIMONIALS — Real client proof                                 */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <Section background="light">
        <Container>
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
              Client Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Real feedback from businesses that achieved measurable results with
              our SEO services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
              >
                <StarRating rating={testimonial.rating} />
                <blockquote className="mt-4 text-text-secondary leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center border-t border-gray-100 pt-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-main/10 flex items-center justify-center text-primary-main font-bold mr-3">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">{testimonial.author}</p>
                    <p className="text-sm text-text-secondary">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                  <span className="ml-auto px-2 py-0.5 bg-primary-main/10 text-primary-main text-xs font-medium rounded-full">
                    {testimonial.industry}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              href="/testimonials"
              variant="outline"
              className="hover:bg-primary-main hover:text-white transition-colors"
            >
              Read More Testimonials
            </Button>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 7. CTA — After all proof sections                                   */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <Section background="primary">
        <Container>
          <div className="text-center py-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Grow Your Organic Traffic?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Get a free comprehensive SEO audit and discover untapped growth
              opportunities for your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
              >
                Get Your Free SEO Audit
              </Button>
              <Button
                href="/pricing"
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white/10"
              >
                View Pricing Plans
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 8. OUR APPROACH — 4-step methodology                                */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
              Our SEO Methodology
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A Systematic Process Built for Results
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Our proven 4-step framework combines technical expertise with content
              optimization to deliver sustainable organic growth for businesses across industries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {approachSteps.map((step) => (
              <div key={step.id} className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary-main text-white font-bold flex items-center justify-center text-sm">
                  {step.id}
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                </div>
                {/* Connector arrow (desktop only) */}
                {step.id < approachSteps.length && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-main/30">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-primary-main" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href="/contact" variant="primary" className="hover:shadow-lg">
              Start Your SEO Journey
            </Button>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 9. LEADERSHIP TEAM — E-E-A-T                                        */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <Section background="light">
        <Container>
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
              Our Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet the Experts Behind ImmortalSEO
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Our experienced SEO experts have helped hundreds of businesses achieve
              sustainable organic growth since 2008.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col sm:flex-row gap-6 items-center sm:items-start bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="w-32 h-32 relative rounded-full overflow-hidden flex-shrink-0 ring-4 ring-primary-main/10">
                  <Image
                    src={member.image}
                    alt={`${member.name} — ${member.title}`}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary-main font-medium mb-3 text-sm">{member.title}</p>
                  <p className="text-text-secondary text-sm leading-relaxed mb-3">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-main hover:text-primary-dark text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              href="/about"
              variant="outline"
              className="hover:bg-primary-main hover:text-white transition-colors"
            >
              Learn Our Full Story
            </Button>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 10. FAQ — Optimized for featured snippets & LLM                     */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Common Questions About SEO Services
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Expert answers to help you understand how strategic SEO solutions
              can grow your business.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={homepageFAQs} />

            <div className="text-center mt-10">
              <p className="text-lg mb-4 text-text-secondary">Have a specific question?</p>
              <Button href="/contact" variant="primary" className="hover:shadow-lg">
                Ask Us Directly
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 11. WHERE WE SERVE — Location internal links                        */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <Section background="light">
        <Container>
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
              Where We Serve
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SEO Services Across the United States &amp; Canada
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              We help businesses improve their search visibility in competitive markets
              across North America. Our team delivers location-aware SEO strategies
              tailored to each city&apos;s unique business landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">🇺🇸</span> United States
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {usaCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/locations/${city.slug}`}
                    className="text-text-secondary hover:text-primary-main transition-colors py-1 text-sm"
                  >
                    SEO in {city.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">🇨🇦</span> Canada
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {canadaCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/locations/${city.slug}`}
                    className="text-text-secondary hover:text-primary-main transition-colors py-1 text-sm"
                  >
                    SEO in {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button
              href="/locations"
              variant="outline"
              className="hover:bg-primary-main hover:text-white transition-colors"
            >
              View All Locations
            </Button>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 12. FINAL CTA                                                       */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <Section background="primary">
        <Container>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Dominate Search Results?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Join the 250+ businesses that have achieved sustainable organic growth
                  with our data-driven SEO services. Get a customized strategy tailored
                  to your specific business goals.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Get Your Free SEO Audit
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
