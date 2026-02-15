// src/app/about/AboutPage.tsx
// Server component — all content is server-rendered for SEO & LLM indexing

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import TimelineAccordion from "@/components/about/TimelineAccordion";

// ─── Timeline Data (exported for schema if needed) ────────────────────────────

export const companyTimeline = [
    {
      id: 0,
      year: "2008",
      title: "The Foundation",
      description:
      "Handsome SEO Services was founded by Manish Lamrod, focusing on early SEO techniques like directory submissions, keyword optimization, and manual link building — tactics that aligned with Google's ranking factors of that era.",
    },
    {
      id: 1,
      year: "2015",
      title: "Technical Evolution",
      description:
      "SEO strategist Rajesh Jat joined as Co-founder, bringing deep technical expertise in on-page optimization, semantic SEO, and user experience. Together, they developed the data-driven methodology that prioritizes sustainable growth over quick wins.",
    },
    {
      id: 2,
      year: "2016",
    title: "Rebranding to ImmortalSEO",
      description:
      "We rebranded to ImmortalSEO, reflecting our commitment to building lasting organic visibility. This period marked expansion into international SEO services and development of our proprietary audit process.",
    },
    {
      id: 3,
    year: "2016–2020",
      title: "Algorithm Mastery",
      description:
      "We developed deep expertise in adapting to every major Google algorithm update — Panda, Penguin, BERT, and Core Web Vitals. Our strategies evolved to focus on content quality, mobile optimization, and structured data.",
    },
    {
      id: 4,
      year: "2021–Present",
    title: "AI & Semantic SEO Era",
      description:
      "ImmortalSEO now leads in next-generation search optimization — creating content that performs in both traditional SERPs and AI platforms like ChatGPT, Google AI Overviews, and Perplexity.",
  },
  ];
  
// ─── Founders Data ────────────────────────────────────────────────────────────
  
const founders = [
    {
      id: 1,
    name: "Rajesh Jat",
    title: "Co-Founder & SEO Strategist",
    bio: "Rajesh is a seasoned SEO professional with deep expertise in keyword research, competitive analysis, and decoding user search intent. With a strong technical background, he excels at leveraging AI to craft content that aligns with semantic search engine requirements. His strategies consistently drive measurable organic growth across diverse industries.",
    expertise: ["Technical SEO", "Semantic SEO", "AI-Enhanced Content", "Schema Markup", "Core Web Vitals"],
    image: "/images/team/rajesh-jat-seo.png",
    linkedin: "https://linkedin.com/in/rajeshjatindia",
    },
    {
      id: 2,
    name: "Manish Lamrod",
    title: "Co-Founder & Off-Page SEO Expert",
    bio: "Manish is an expert in off-page SEO, specializing in white-hat link building and developing tailored SEO strategies based on client needs. With a strong grasp of relationship building and long-term client success, he ensures every campaign is backed by sustainable growth and ethical optimization practices.",
    expertise: ["Off-Page SEO", "Link Building", "Digital PR", "SEO Strategy", "Client Growth"],
    image: "/images/team/manish-lamrod-seo.png",
    linkedin: "https://linkedin.com/in/manishlamrod",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

  const testimonials = [
    {
      id: 1,
    text: "ImmortalSEO helped us rank for our main keyword 'AI Coding Agent' in under 3 months. Their AI-enhanced SEO strategies not only improved our Google rankings but also ensured visibility across AI-powered search platforms.",
      author: "Archie Sharma",
    position: "COO",
    company: "Zencoder.ai",
    rating: 5,
    },
    {
      id: 2,
    text: "With ImmortalSEO's strategic support, we saw a significant increase in organic traffic for high-intent keywords like 'acrylic photo frames' and 'acrylic wall photo'. Their deep understanding of search behavior and technical SEO helped us dominate our niche.",
      author: "Narendra Kumar",
    position: "Founder",
    company: "Omgs.in",
    rating: 5,
  },
];

// ─── Star Rating Component ────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-yellow-400" : "text-gray-200"}`}
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
// MAIN ABOUT PAGE COMPONENT (Server-rendered)
// ═════════════════════════════════════════════════════════════════════════════

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 1. HERO                                                             */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary-main to-primary-dark text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat" />
        </div>
        <Container>
          <div className="py-16 md:py-24 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-6 backdrop-blur-sm">
                SEO Experts Since 2008
</span>
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                The Team Behind{" "}
                <span className="text-yellow-300">ImmortalSEO</span>
</h1>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                From traditional search engine optimization to AI-powered content
                strategies, our experienced SEO consultants have been at the
                forefront of digital visibility for over 15 years.
</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  href="#our-approach"
                  variant="secondary"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Our Approach
                </Button>
                <Button
                  href="/contact"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10 px-8"
                >
                  Work With Us
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 2. OUR STORY + TIMELINE                                             */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Story narrative */}
          <div>
              <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
                Our SEO Journey
              </span>
  <h2 className="text-3xl md:text-4xl font-bold mb-6">
    From Traditional SEO to AI-Driven Search Optimization
  </h2>
              <div className="prose max-w-none text-text-secondary space-y-4">
                <p className="text-lg">
                  ImmortalSEO has been delivering <strong>results-driven SEO services</strong> since
                  2008, evolving alongside every major search algorithm update. Our journey
                  began when <strong>Manish Lamrod</strong> founded Handsome SEO Services during
                  the early days of search optimization — when directories, keywords, and
                  backlink quantity were the primary ranking factors.
                </p>
                <p>
                  In 2015, <strong>SEO strategist Rajesh Jat</strong> joined as Co-founder,
                  bringing deep technical expertise in on-page optimization and semantic search.
                  Together, they transformed the company&apos;s approach to focus on sustainable,
                  white-hat <strong>technical SEO</strong> strategies. This partnership led to
                  our official rebranding as <strong>ImmortalSEO</strong> in 2016 — a name that
                  reflects our commitment to creating lasting organic visibility.
                </p>
                <p>
                  Throughout our evolution, we&apos;ve successfully navigated every major algorithm
                  shift — from Google&apos;s <strong>Panda and Penguin updates</strong> to the
                  introduction of <strong>RankBrain</strong> and <strong>BERT</strong>. Our
                  adaptability and forward-thinking approach have resulted in a{" "}
                  <strong>94% client retention rate</strong> across diverse industries.
    </p>
    <p>
                  Today, we pioneer <strong>AI-enhanced SEO</strong> — optimizing content for both
                  traditional search engines and AI platforms like <strong>ChatGPT</strong>,{" "}
                  <strong>Google AI Overviews</strong>, and <strong>Perplexity</strong>. This
                  dual-optimization approach ensures maximum visibility in an evolving search
                  landscape where content discovery happens across multiple platforms.
    </p>
  </div>
  <div className="mt-8 flex flex-wrap gap-4">
    <Button 
      href="/case-studies" 
      variant="primary"
      className="hover:shadow-lg transition-shadow"
    >
                  See Our Success Stories
    </Button>
    <Button 
      href="/services" 
      variant="outline"
      className="hover:bg-primary-main hover:text-white transition-colors"
    >
                  Explore Our Services
    </Button>
  </div>
</div>

            {/* Timeline */}
            <div className="bg-background-paper rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-bold mb-6 text-center">
                Our Evolution
              </h3>
              <TimelineAccordion timeline={companyTimeline} />
            </div>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 3. FOUNDERS — E-E-A-T Section                                       */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <Section background="light">
        <Container>
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
              Our Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Founders
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              The SEO experts who have been pioneering search optimization
              strategies since 2008
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {founders.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl shadow-sm p-6 md:p-8"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <div className="w-36 h-36 relative rounded-full overflow-hidden flex-shrink-0 ring-4 ring-primary-main/10">
                  <Image
                    src={member.image}
                      alt={`${member.name} — ${member.title}`}
                      width={144}
                      height={144}
                    className="object-cover"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary-main font-medium mb-4 text-sm">
                      {member.title}
                    </p>
                    <p className="text-text-secondary mb-4 leading-relaxed text-sm">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Expertise tags */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-text-secondary mb-2 font-medium uppercase tracking-wider">
                    Areas of Expertise
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-primary-main/5 text-primary-main text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="mt-4">
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
        </Container>
      </Section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 4. OUR APPROACH — Dual Optimization Framework                       */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <Section id="our-approach">
  <Container>
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
              Our Methodology
            </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Dual-Optimization SEO Framework
      </h2>
      <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              We maximize your visibility across both traditional search engines
              and emerging AI platforms with a unified approach
      </p>
    </div>
    
    {/* Two-pillar approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Traditional SEO Pillar */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border-t-4 border-primary-main">
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 rounded-lg bg-primary-main text-white flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
          </div>
          <h3 className="text-xl font-bold">Traditional Search Excellence</h3>
        </div>
        <p className="text-text-secondary mb-5">
                Strategies that ensure your content ranks well in Google, Bing,
                and other search engines:
        </p>
        <ul className="space-y-3 mb-6">
                {[
                  { label: "Technical SEO", detail: "Site architecture, Core Web Vitals, mobile optimization" },
                  { label: "Content Strategy", detail: "Keyword research, user intent, topical authority" },
                  { label: "Link Building", detail: "Quality backlink acquisition, digital PR, outreach" },
                ].map((item) => (
                  <li key={item.label} className="flex items-start">
            <svg className="h-5 w-5 text-primary-main flex-shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
                    <span className="text-text-secondary text-sm">
                      <strong>{item.label}</strong>: {item.detail}
                    </span>
          </li>
                ))}
        </ul>
        <Link 
          href="/services/technical-seo" 
                className="text-primary-main font-medium hover:text-primary-dark inline-flex items-center text-sm"
        >
          View Technical SEO Services
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
      
      {/* AI-Enhanced SEO Pillar */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border-t-4 border-primary-light">
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 rounded-lg bg-primary-light text-white flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                  </svg>
          </div>
          <h3 className="text-xl font-bold">AI Search Innovation</h3>
        </div>
        <p className="text-text-secondary mb-5">
                Cutting-edge strategies for optimization across AI platforms like
                ChatGPT, Google AI Overviews, and Perplexity:
        </p>
        <ul className="space-y-3 mb-6">
                {[
                  { label: "Entity Optimization", detail: "Knowledge graph integration, semantic relationships" },
                  { label: "Structured Data", detail: "Advanced schema for better AI retrieval" },
                  { label: "E-E-A-T Enhancement", detail: "Authority signals for both humans and algorithms" },
                ].map((item) => (
                  <li key={item.label} className="flex items-start">
            <svg className="h-5 w-5 text-primary-light flex-shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
                    <span className="text-text-secondary text-sm">
                      <strong>{item.label}</strong>: {item.detail}
                    </span>
          </li>
                ))}
        </ul>
        <Link 
          href="/services/ai-enhanced-seo" 
                className="text-primary-light font-medium hover:text-primary-dark inline-flex items-center text-sm"
        >
          View AI-Enhanced SEO Services
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
    
          {/* Company Values — integrated below approach */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Data-Driven Innovation",
                description: "We analyze data patterns across traditional and AI search engines to develop strategies that deliver measurable results.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                ),
              },
              {
                title: "Continuous Evolution",
                description: "We constantly evolve our approaches to stay ahead of algorithm changes and emerging search technologies.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                  </svg>
                ),
              },
              {
                title: "Full Transparency",
                description: "We believe in complete transparency and client education, making complex SEO concepts understandable and actionable.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                title: "Sustainable Results",
                description: "We focus on long-term growth strategies that build lasting organic visibility, not quick fixes that fade.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary-main/10 text-primary-main mb-4 mx-auto">
                  {value.icon}
            </div>
                <h3 className="text-base font-semibold mb-2">{value.title}</h3>
                <p className="text-text-secondary text-sm">{value.description}</p>
          </div>
            ))}
    </div>
  </Container>
</Section>
      
      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 5. EXPERTISE — targets "SEO experts", "SEO consultants"             */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <Section background="light">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
                Our Expertise
              </span>
  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                SEO Experts Who Understand Both Search Engines &amp; AI
  </h2>
  <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Our SEO consultants bring deep, specialized knowledge across every
                facet of modern search optimization
  </p>
</div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Technical SEO Specialists",
                  description: "Our technical SEO experts handle site architecture, crawlability, Core Web Vitals, structured data implementation, and server-side optimization to ensure search engines can efficiently discover and index your content.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                },
                {
                  title: "Content & Semantic SEO Experts",
                  description: "Our content strategists specialize in entity-based optimization, topical authority building, and creating content that satisfies both user search intent and AI system comprehension through proper semantic structure.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  ),
                },
                {
                  title: "AI Search Optimization Consultants",
                  description: "Our AI SEO consultants optimize your digital presence for emerging platforms like Google's AI Overviews, ChatGPT, Perplexity, and Claude — ensuring your brand appears in AI-generated answers and recommendations.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  ),
                },
                {
                  title: "Local & International SEO Advisors",
                  description: "Our local SEO specialists help businesses dominate city-level search results in the USA and Canada, while our international SEO expertise ensures visibility across multiple geographic markets.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ),
                },
              ].map((area) => (
                <div
                  key={area.title}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center mr-3 flex-shrink-0">
                      {area.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-primary-main">
                      {area.title}
                    </h3>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white rounded-xl p-6 md:p-8 shadow-sm">
              <p className="text-text-secondary leading-relaxed">
                What sets our SEO experts apart is our commitment to continuous
                learning and adaptation. As search algorithms evolve — from
                Google&apos;s helpful content updates to the rise of AI-powered
                search — our consultants stay at the forefront, adapting strategies
                in real-time. Every member of our team holds expertise in both
                traditional search optimization and the emerging discipline of AI
                search visibility, ensuring your business is prepared for the future
                of digital discovery.
              </p>
              </div>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 6. TESTIMONIALS                                                     */}
      {/* ──────────────────────────────────────────────────────────────────── */}
<Section>
  <Container>
          <div className="text-center mb-14">
      <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
        Client Success
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        What Our Clients Say
      </h2>
      <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Hear directly from the businesses we&apos;ve helped grow
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
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>
                <div className="flex items-center border-t border-gray-100 pt-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-main/10 flex items-center justify-center text-primary-main font-bold mr-3">
              {testimonial.author.charAt(0)}
            </div>
            <div>
                    <p className="font-semibold text-text-primary">
                      {testimonial.author}
                    </p>
              <p className="text-sm text-text-secondary">
                {testimonial.position}, {testimonial.company}
              </p>
            </div>
          </div>
                <div className="mt-4">
          <Link
            href="/case-studies"
                    className="inline-flex items-center text-primary-main font-medium hover:text-primary-dark text-sm group"
          >
            Read Case Study
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
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
              View All Testimonials
            </Button>
          </div>
  </Container>
</Section>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* 7. FINAL CTA                                                        */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <Section background="primary">
  <Container>
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-2/3">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for SEO That Actually Works?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl">
                  Partner with ImmortalSEO to transform your organic visibility
                  with proven strategies that deliver measurable results. Get a
                  personalized SEO roadmap tailored to your business goals.
          </p>
        </div>
        <div className="md:w-1/3 md:text-right">
          <Button 
            href="/contact" 
            variant="secondary" 
            size="lg"
            className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
          >
            Request Your Free SEO Audit
          </Button>
        </div>
      </div>
    </div>
  </Container>
</Section>
    </div>
  );
}
     