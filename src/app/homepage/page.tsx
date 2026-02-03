"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { EntityRichContent, SemanticRelationship } from "@/components/seo/EntityRichContent";
import { ListBox } from "@/components/seo/FeaturedSnippet";

const HomePage: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const services = [
    {
      id: 1,
      name: "Technical SEO & Crawl Optimization",
      icon: "⚙️",
      description:
        "Ensure your website is fast, indexable, and crawl-friendly for both search engines and AI crawlers. We fix crawl errors, enhance performance, and optimize your site's architecture.",
      slug: "technical-seo",
    },
    {
      id: 2,
      name: "Semantic SEO & NLP Structuring",
      icon: "🧠",
      description:
        "Organize your content with entities, topics, and context so LLMs and search engines can deeply understand and index it with precision.",
      slug: "semantic-seo",
    },
    {
      id: 3,
      name: "Voice Search Optimization",
      icon: "🎙️",
      description:
        "Target natural language queries to help your content appear in voice searches on Alexa, Siri, and Google Assistant.",
      slug: "voice-search-optimization",
    },
    {
      id: 4,
      name: "LLM-Ready Content Strategy",
      icon: "🤖",
      description:
        "Craft expert-level content optimized for visibility across AI platforms like ChatGPT, Perplexity, Gemini, and Claude.",
      slug: "llm-content-strategy",
    },
    {
      id: 5,
      name: "E-commerce SEO",
      icon: "🛒",
      description:
        "Boost product visibility and conversions with SEO tailored for online stores. We target buyer intent and optimize every step of the funnel.",
      slug: "ecommerce-seo",
    },
    {
      id: 6,
      name: "AI Tools for SEO Automation",
      icon: "🔗",
      description:
        "Leverage AI tools to automate SEO tasks like keyword research, content generation, and performance analysis.",
      slug: "ai-tools-in-seo",
    },
  ];

  // Optimized benefits data
  const benefits = [
    {
      id: 1,
      title: "Data-Driven SEO Analysis",
      description:
        "Our decisions are backed by comprehensive SEO audits, competitor research, and advanced analytics to identify high-impact opportunities.",
      icon: "📊",
    },
    {
      id: 2,
      title: "Transparent Performance Tracking",
      description:
        "Access real-time SEO dashboards showing organic traffic growth, keyword rankings, conversion improvements, and ROI metrics.",
      icon: "📈",
    },
    {
      id: 3,
      title: "Custom SEO Strategies",
      description:
        "Every business receives a tailored SEO plan addressing your specific goals, industry challenges, and competitive landscape.",
      icon: "🎯",
    },
    {
      id: 4,
      title: "Algorithm-Proof Optimization",
      description:
        "Our semantic SEO techniques build entity relationships that maintain rankings through updates by focusing on E-E-A-T principles.",
      icon: "🚀",
    },
  ];

  // Optimized approach steps
  const approachSteps = [
    {
      id: 1,
      title: "Technical SEO Audit & Analysis",
      description:
        "We analyze your website architecture, crawlability, indexation, performance metrics, and competitive landscape to identify opportunities and obstacles.",
      icon: "🔍",
    },
    {
      id: 2,
      title: "Custom SEO Strategy Development",
      description:
        "We create a tailored roadmap targeting the right keywords, topics, and entities based on search intent analysis and business objectives.",
      icon: "📋",
    },
    {
      id: 3,
      title: "On-Page & Off-Page Optimization",
      description:
        "Our team implements technical fixes, content enhancements, schema markup, and builds high-quality backlinks from relevant websites.",
      icon: "⚙️",
    },
    {
      id: 4,
      title: "Performance Tracking & Refinement",
      description:
        "We continuously measure organic rankings, traffic, conversions, and revenue impact, making data-driven adjustments to maximize results.",
      icon: "📊",
    },
  ];

  // Real team data
  const teamMembers = [
    {
      id: 1,
      name: "Rajesh Jat",
      title: "Co-Founder & SEO Strategist",
      bio: "Rajesh is a seasoned SEO professional with deep expertise in keyword research, competitive analysis, and decoding user search intent. With a strong technical background, he excels at leveraging AI to craft content that aligns with semantic search engine requirements. His strategies consistently drive measurable organic growth across diverse industries.",
      image: "/images/team/rajesh-jat-seo.png",
      linkedin: "https://linkedin.com/in/rajesh-jat",
    },
    {
      id: 2,
      name: "Manish Lamrod",
      title: "Co-Founder & Off-Page SEO Expert",
      bio: "Manish is an expert in off-page SEO, specializing in white-hat link building and developing tailored SEO strategies based on client needs. With a strong grasp of relationship building and long-term client success, he ensures every campaign is backed by sustainable growth and ethical optimization practices.",
      image: "/images/team/manish-lamrod-seo.png",
      linkedin: "https://linkedin.com/in/manish-lamrod",
    },
  ];

  // Real FAQ data
  const faqs = [
    {
      id: 1,
      question:
        "How long does it take to see results from professional SEO services?",
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
        "AI is transforming search with Google's SGE, Bard, Bing AI, and independent platforms like ChatGPT. We've pioneered techniques for optimizing content to perform well in both traditional SERPs and AI-generated responses. This includes semantic entity optimization, E-E-A-T enhancement, comprehensive schema markup, and content structured for featured snippets and knowledge panels that AI systems frequently reference.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-dark to-primary-main text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
        </div>

        <Container>
          <div className="flex flex-col md:flex-row items-center py-16 md:py-24 relative z-10">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-4 backdrop-blur-sm">
                #1 Rated SEO Agency
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your Online Visibility with{" "}
                <span className="text-yellow-300">AI-Enhanced</span> SEO
                Services
              </h1>
              <p className="text-xl mb-8 opacity-90 max-w-lg">
                Our data-driven SEO agency combines technical expertise with
                cutting-edge AI strategies to help businesses dominate search
                rankings, increase organic traffic, and maximize ROI.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
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
                  Our Services
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-12">
                <p className="text-sm uppercase tracking-wider opacity-75 mb-3">
                  Trusted By:
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  {/* Replace with actual client logos */}
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-24 bg-white/20 rounded-md backdrop-blur-sm"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            

            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-yellow-300 rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>

                {/* Main card – Image only Hero Section */}
<div className="bg-white rounded-xl shadow-2xl p-2 sm:p-4 md:p-6 relative z-10">
  <div className="bg-gradient-to-br from-background-paper to-background-accent rounded-lg overflow-hidden">
    <Image
      src="/images/homepage/immortalseo.webp"
      alt="Immortal SEO Dashboard – Advanced SEO Analytics View"
      width={1200}
      height={675}
      priority
      quality={90}
      sizes="(max-width: 768px) 100vw, 1200px"
      className="w-full h-auto object-cover"
    />
  </div>
</div>

              </div>
            </div>
          </div>
          
        </Container>
        
      </section>

      {/* Services Section */}
      <Section>
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
              Comprehensive SEO Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Data-Driven SEO Services for 2025 & Beyond
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              From technical optimization to AI-ready content strategies, our
              tailored SEO services help businesses of all sizes achieve
              sustainable organic growth in both traditional and AI-powered
              search environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:translate-y-[-5px] group"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary-main/10 text-primary-main mb-5 text-2xl">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-main transition-colors">
                  {service.name}
                </h3>
                <p className="text-text-secondary mb-5">
                  {service.description}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center text-primary-main font-medium hover:text-primary-dark"
                >
                  Learn More
                  <svg
                    className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
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

      {/* Why Choose Us Section */}
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
                With over 15 years of experience optimizing websites for search
                engines, ImmortalSEO has evolved alongside every major algorithm
                update. Our certified SEO consultants combine time-tested
                strategies with cutting-edge AI techniques to deliver measurable
                results across both traditional and semantic search platforms.
              </p>

              <div className="space-y-6">
                {benefits.map((benefit) => (
                  <div key={benefit.id} className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-text-secondary">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button
                  href="/about"
                  variant="primary"
                  className="hover:shadow-lg transition-shadow"
                >
                  Learn More About Us
                </Button>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-primary-main/5 rounded-full blur-3xl"></div>

                {/* Stats cards */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-5xl font-bold text-primary-main mb-2">
                      94%
                    </p>
                    <p className="text-text-secondary">
                      Client retention rate, well above industry average
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md transform translate-y-8">
                    <p className="text-5xl font-bold text-primary-main mb-2">
                      187%
                    </p>
                    <p className="text-text-secondary">
                      Average increase in organic traffic within 6 months
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md transform translate-y-4">
                    <p className="text-5xl font-bold text-primary-main mb-2">
                      15+
                    </p>
                    <p className="text-text-secondary">
                      Years of combined SEO experience
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <p className="text-5xl font-bold text-primary-main mb-2">
                      250+
                    </p>
                    <p className="text-text-secondary">
                      Businesses successfully ranked on first page
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Our Approach */}
      <Section>
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
              Our SEO Methodology
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Systematic SEO Process Built for Results
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Our proven 4-step SEO framework combines technical expertise with
              content optimization to deliver sustainable organic growth for
              businesses across industries
            </p>
          </div>

          {/* ListBox for Featured Snippet - Benefits of our approach */}
          <div className="max-w-3xl mx-auto mb-12">
            <ListBox
              title="Why Our Approach Works"
              items={[
                'Data-driven decision making based on comprehensive audits',
                'Custom strategies tailored to your business goals',
                'Technical and content optimization working together',
                'Continuous monitoring and refinement for maximum results',
              ]}
              ordered={false}
            />
          </div>

          <div className="relative">
            {/* Timeline bar */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary-main/20 hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {approachSteps.map((step) => (
    <div 
      key={step.id}
      className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      {/* Step Number Circle */}
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary-main text-white font-bold flex items-center justify-center">
        {step.id}
      </div>
      
      {/* Step Content */}
      <div className="mt-6">
        <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-lg bg-primary-main/10 text-primary-main mb-4 text-2xl">
          {step.icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
        <p className="text-text-secondary text-center">{step.description}</p>
      </div>
      
      {/* Connector Line (except for last item) */}
      {step.id < approachSteps.length && (
        <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-1 bg-primary-main/30">
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-primary-main"></div>
        </div>
      )}
    </div>
  ))}
</div>
          </div>

          <div className="text-center mt-16">
            <Button
              href="/contact"
              variant="primary"
              className="hover:shadow-lg"
            >
              Start Your SEO Journey
            </Button>
          </div>
        </Container>
      </Section>

      {/* Topic Cluster Overview Section */}
      <Section>
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
              Comprehensive SEO Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our SEO Topic Clusters
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              We build comprehensive topic authority across key SEO domains, ensuring your content performs well in both traditional search and AI-powered platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-primary-main">Technical SEO</h3>
              <p className="text-text-secondary mb-4">Site architecture, crawlability, indexation, and performance optimization.</p>
              <Link href="/services/technical-seo" className="text-primary-main hover:text-primary-dark font-medium">
                Learn More →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-primary-main">Content SEO</h3>
              <p className="text-text-secondary mb-4">Topic authority, E-E-A-T optimization, and strategic content development.</p>
              <Link href="/services/content-seo" className="text-primary-main hover:text-primary-dark font-medium">
                Learn More →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-primary-main">AI-Enhanced SEO</h3>
              <p className="text-text-secondary mb-4">Optimization for ChatGPT, Perplexity, Google SGE, and other AI platforms.</p>
              <Link href="/services/ai-enhanced-seo" className="text-primary-main hover:text-primary-dark font-medium">
                Learn More →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-primary-main">Local SEO</h3>
              <p className="text-text-secondary mb-4">Google Business Profile optimization, local citations, and map pack rankings.</p>
              <Link href="/services/local-seo" className="text-primary-main hover:text-primary-dark font-medium">
                Learn More →
              </Link>
            </div>
          </div>

          {/* Entity-Rich Content */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <EntityRichContent
              title="Core SEO Services & Concepts"
              entities={[
                {
                  entity: 'Technical SEO',
                  description: 'Foundation for all SEO success - ensures search engines can crawl, index, and understand your site',
                  url: '/services/technical-seo',
                  type: 'service',
                },
                {
                  entity: 'Semantic SEO',
                  description: 'Entity-based optimization that helps search engines understand context and relationships',
                  url: '/services/semantic-seo',
                  type: 'service',
                },
                {
                  entity: 'AI Search Optimization',
                  description: 'Future-proof your content for AI-powered search platforms like ChatGPT and Perplexity',
                  url: '/services/ai-enhanced-seo',
                  type: 'service',
                },
                {
                  entity: 'E-E-A-T',
                  description: 'Experience, Expertise, Authoritativeness, and Trustworthiness - critical for modern SEO',
                  type: 'concept',
                },
                {
                  entity: 'Topic Clusters',
                  description: 'Comprehensive content strategy that establishes authority across related topics',
                  type: 'concept',
                },
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* Case studies section */}
      <Section background="light">
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
              Real Results
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SEO Success Stories
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              See how our custom SEO strategies have delivered massive growth
              for real businesses across industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-text-secondary">E-commerce</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  +400% Organic Traffic
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                OMGS.in - Acrylic Photo Prints
              </h3>
              <p className="text-text-secondary mb-4">
                We helped OMGS dominate the Indian search landscape for acrylic
                photo products, taking them from near invisibility to 400%
                growth in organic traffic within 12 months.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary-main font-medium">
                  12-month campaign
                </span>
                <span className="text-sm text-text-secondary">
                  Top rankings for product keywords
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-text-secondary">AI / SaaS</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  #1 for “AI Coding Agent”
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Zencoder.ai</h3>
              <p className="text-text-secondary mb-4">
                In just 3 months, we ranked Zencoder.ai for its main keyword “AI
                Coding Agent,” establishing authority in a rapidly growing niche
                with focused entity-based SEO.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary-main font-medium">
                  3-month sprint
                </span>
                <span className="text-sm text-text-secondary">
                  Ranked core keyword
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-text-secondary">
                  CBD Industry
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  14,000 Monthly Visitors
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                CBD Brand (Confidential)
              </h3>
              <p className="text-text-secondary mb-4">
                We scaled a CBD brand’s organic traffic from just 100 to over
                14,000 monthly visitors in one of the most competitive niches
                online—without paid ads or shortcuts.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary-main font-medium">
                  12-month timeline
                </span>
                <span className="text-sm text-text-secondary">
                  100→14,000 organic visits
                </span>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button
              href="/case-studies"
              variant="primary"
              className="hover:shadow-lg"
            >
              View Detailed Case Studies
            </Button>
          </div>
        </Container>
      </Section>

      {/* First CTA Section */}
      <Section background="primary">
        <Container>
          <div className="text-center py-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Boost Your Online Visibility?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Get a free comprehensive SEO audit worth $1,500 and discover
              untapped growth opportunities for your business.
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
                Our Pricing
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Our Leadership Team */}
      <Section>
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
              Our Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet the Experts Behind ImmortalSEO
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Our experienced SEO Experts has helped hundreds of businesses
              achieve sustainable growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="flex flex-col md:flex-row gap-6 items-center md:items-start"
              >
                <div className="w-48 h-48 relative rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.title}`}
                    width={192}
                    height={192}
                    className="object-cover"
                    priority={index === 0} // Prioritize first image for LCP
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary-main font-medium mb-4">
                    {member.title}
                  </p>
                  <p className="text-text-secondary mb-4">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-main hover:text-primary-dark"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              href="/about"
              variant="outline"
              className="hover:bg-primary-main hover:text-white transition-colors"
            >
              Meet Our Full Team
            </Button>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section background="light">
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
              SEO Knowledge Hub
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Common Questions About SEO Services
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Expert answers to help you understand how our strategic SEO
              solutions can grow your business
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <svg
                      className={`w-5 h-5 text-primary-main transition-transform ${
                        activeAccordion === index ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`px-6 pb-4 ${
                      activeAccordion === index ? "block" : "hidden"
                    }`}
                  >
                    <p className="text-text-secondary">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-lg mb-4">Don't see your question here?</p>
              <Button
                href="/contact"
                variant="primary"
                className="hover:shadow-lg"
              >
                Ask Us Directly
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA Section */}
      <Section background="primary">
        <Container>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Dominate Search Results?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Join the 250+ businesses that have achieved sustainable
                  organic growth with our data-driven SEO services. Get a
                  customized strategy tailored to your specific business goals.
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
};

export default HomePage;
