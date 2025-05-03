"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

// This component would be imported in the main page.tsx file
const AboutPage: React.FC = () => {
  // State for timeline navigation
  const [activeEra, setActiveEra] = useState<number>(3);
  
  // Founders data
  const founders = [
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
    }
  ];
  
  // Timeline data showing company evolution
  const timeline = [
    {
      id: 0,
      year: "2008",
      title: "The Foundation",
      description:
        "Handsome SEO Services was founded by Manish Lamrod, focusing on early SEO techniques like directory submissions, keyword optimization, and manual link building—tactics that aligned with Google's ranking factors of that era.",
      icon: "🌱"
    },
    {
      id: 1,
      year: "2015",
      title: "Technical Evolution",
      description:
        "SEO strategist Rajesh Jat joined as Co-founder, bringing technical expertise in on-page optimization, semantic SEO, and user experience. Together, they developed our data-driven methodology that prioritizes sustainable growth over quick wins.",
      icon: "🤝"
    },
    {
      id: 2,
      year: "2016",
      title: "Rebranding & Expansion",
      description:
        "We rebranded to ImmortalSEO, reflecting our commitment to sustainable organic visibility. This period marked our expansion into international SEO services and the development of our proprietary SEO audit process incorporating technical, on-page, and off-page factors.",
      icon: "🔁"
    },
    {
      id: 3,
      year: "2016-2020",
      title: "Algorithm Mastery",
      description:
        "We developed deep expertise in adapting to major Google algorithm updates including Panda, Penguin, BERT, and Core Web Vitals. Our strategies evolved to focus on comprehensive content quality, mobile optimization, page experience, and structured data implementation.",
      icon: "📊"
    },
    {
      id: 4,
      year: "2021–Present",
      title: "AI & Semantic SEO",
      description:
        "ImmortalSEO now leads in next-generation search optimization—creating content that performs in both traditional SERPs and AI-powered platforms. Our strategies leverage entity optimization, E-E-A-T enhancement, and knowledge graph connections for maximum digital visibility.",
      icon: "🧠"
    }
  ];
  
  
  // Core values data
  const values = [
    {
      id: 1,
      title: "Data-Driven Innovation",
      description: "We analyze data patterns across traditional and AI search engines to develop strategies that deliver measurable results.",
      icon: "📊"
    },
    {
      id: 2,
      title: "Adaptation & Evolution",
      description: "We constantly evolve our approaches to stay ahead of algorithm changes and emerging technologies.",
      icon: "🔄"
    },
    {
      id: 3,
      title: "Transparency & Education",
      description: "We believe in complete transparency and client education, making complex SEO concepts understandable and actionable.",
      icon: "🔍"
    },
    {
      id: 4,
      title: "Sustainable Results",
      description: "We focus on long-term growth strategies that build lasting organic visibility, not quick fixes that fade.",
      icon: "🌱"
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      text: "ImmortalSEO helped us rank for our main keyword 'AI Coding Agent' in under 3 months. Their AI-enhanced SEO strategies not only improved our Google rankings but also ensured visibility across AI-powered search platforms. They've been instrumental in driving qualified traffic and brand recognition.",
      author: "Archie Sharma",
      position: "COO, Zencoder.ai",
      company: "forgoodai"
    },
    {
      id: 2,
      text: "With ImmortalSEO's strategic support, we saw a significant increase in organic traffic for high-intent keywords like 'acrylic photo frames' and 'acrylic wall photo'. Their deep understanding of search behavior and technical SEO helped us dominate our niche in a competitive market.",
      author: "Narendra Kumar",
      position: "Founder, Omgs.in",
      company: "Maxgrade Pvt Ltd"
    }
  ];
  
  
  // Service highlights (for interlinking)
  const serviceHighlights = [
    {
      id: 1,
      title: "Technical SEO & Crawl Optimization",
      icon: "⚙️",
      description:
        "Ensure your website is fast, indexable, and crawl-friendly for both search engines and AI crawlers. We fix crawl errors, enhance performance, and optimize your site's architecture.",
      link: "technical-seo",
    },
    {
      id: 2,
      title: "Semantic SEO & NLP Structuring",
      icon: "🧠",
      description:
        "Organize your content with entities, topics, and context so LLMs and search engines can deeply understand and index it with precision.",
      link: "semantic-seo",
    },
    {
      id: 6,
      title: "AI Tools for SEO Automation",
      icon: "🔗",
      description:
        "Leverage AI tools to automate SEO tasks like keyword research, content generation, and performance analysis.",
      link: "ai-tools-in-seo",
    }
  ];

  return (
    <Layout>
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-dark to-primary-main text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
        </div>
        
        <Container>
          <div className="py-20 md:py-28 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-4 backdrop-blur-sm">
  Award-Winning SEO Experts Since 2008
</span>
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
  The Team Behind <span className="text-yellow-300">ImmortalSEO</span>
</h1>
<p className="text-xl mb-8 opacity-90">
  From traditional search engine optimization to AI-powered content strategies, our experienced SEO consultants have been at the forefront of digital visibility for over 15 years.
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

      

      {/* Our Story Section */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
  <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our SEO Journey</span>
  <h2 className="text-3xl md:text-4xl font-bold mb-6">
    From Traditional SEO to AI-Driven Search Optimization
  </h2>
  <div className="prose max-w-none text-text-secondary">
    <p className="text-lg mb-4">
      ImmortalSEO has been delivering <strong>results-driven SEO services</strong> since 2008, evolving alongside every major search algorithm update. Our journey began when <strong>Manish Lamrod</strong> founded Handsome SEO Services during the early days of search optimization—when directories, keywords, and backlink quantity were the primary ranking factors.
    </p>
    <p className="mb-4">
      In 2015, <strong>SEO strategist Rajesh Jat</strong> joined as Co-founder, bringing deep technical expertise in on-page optimization and semantic search. Together, they transformed the company's approach to focus on sustainable, white-hat <strong>technical SEO</strong> strategies. This partnership led to our official rebranding as <strong>ImmortalSEO</strong> in 2016—a name that reflects our commitment to creating lasting organic visibility.
    </p>
    <p className="mb-4">
      Throughout our evolution, we've successfully navigated every major algorithm shift—from Google's <strong>Panda and Penguin updates</strong> to the introduction of <strong>RankBrain</strong> and <strong>BERT</strong>. We've helped clients maintain and grow their search visibility through mobile-first indexing, voice search optimization, and the rise of featured snippets. Our adaptability and forward-thinking approach have resulted in a <strong>94% client retention rate</strong> across diverse industries.
    </p>
    <p className="mb-4">
      Today, we're pioneering the new frontier of <strong>AI-enhanced SEO</strong>. Our specialized strategies optimize content for both traditional search engines and AI platforms like <strong>ChatGPT</strong>, <strong>Google SGE</strong>, <strong>Gemini</strong>, and <strong>Perplexity</strong>. This dual-optimization approach ensures maximum visibility in an evolving search landscape where content discovery happens across multiple platforms.
    </p>
    <p>
      Whether you're a local business seeking <strong>local SEO services</strong>, an e-commerce store needing <strong>product optimization</strong>, or an enterprise requiring <strong>comprehensive SEO strategy</strong>, our team delivers customized solutions backed by data and proven expertise.
    </p>
  </div>
  <div className="mt-8 flex flex-wrap gap-4">
    <Button 
      href="/case-studies" 
      variant="primary"
      className="hover:shadow-lg transition-shadow"
    >
      See Our Client Success Stories
    </Button>
    <Button 
      href="/services" 
      variant="outline"
      className="hover:bg-primary-main hover:text-white transition-colors"
    >
      Explore Our SEO Services
    </Button>
  </div>
</div>


            
            
            {/* Timeline navigation */}
            <div className="bg-background-paper rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-center">Our Evolution</h3>
              <div className="space-y-6">
                {timeline.map((era) => (
                  <button
                    key={era.id}
                    className={`w-full text-left transition-all ${
                      activeEra === era.id 
                        ? 'bg-primary-main text-white' 
                        : 'bg-white hover:bg-primary-main/5'
                    } p-4 rounded-lg shadow-sm`}
                    onClick={() => setActiveEra(era.id)}
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl mr-3 ${
                        activeEra === era.id
                          ? 'bg-white text-primary-main'
                          : 'bg-primary-main/10 text-primary-main'
                      }`}>
                        {era.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{era.year}</p>
                        <h4 className="text-lg font-semibold">{era.title}</h4>
                      </div>
                    </div>
                    
                    {activeEra === era.id && (
                      <p className="mt-3 pl-12 pr-2">{era.description}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Section - Strategic Interlinking */}
      <Section background="light">
        <Container>
        <div className="text-center mb-16">
  <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">SEO Services</span>
  <h2 className="text-3xl md:text-4xl font-bold mb-4">
    Comprehensive Search Optimization Solutions
  </h2>
  <p className="text-lg text-text-secondary max-w-3xl mx-auto">
    From technical foundation to advanced AI optimization, our tailored SEO services drive sustainable organic growth
  </p>
</div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceHighlights.map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:translate-y-[-5px] group"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary-main/10 text-primary-main mb-5 text-2xl">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-main transition-colors">{service.title}</h3>
                <p className="text-text-secondary mb-5">{service.description}</p>
                <Link 
                  href={service.link}
                  className="inline-flex items-center text-primary-main font-medium hover:text-primary-dark" 
                >
                  Learn More
                  <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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

      {/* Founders Section */}
      <Section background="light">
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our Leadership</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Founders
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Visionaries who've been pioneering SEO strategies since 2008
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {founders.map((member, index) => (
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
        </Container>
      </Section>

      {/* Modern SEO Approach Section */}
      <Section id="our-approach">
  <Container>
    <div className="text-center mb-12">
      <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our Methodology</span>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Dual-Optimization SEO Framework
      </h2>
      <p className="text-lg text-text-secondary max-w-3xl mx-auto">
        Maximizing visibility across both traditional search engines and AI platforms
      </p>
    </div>
    
    {/* Two-pillar approach */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Traditional SEO Pillar */}
      <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-primary-main h-full">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-primary-main text-white flex items-center justify-center text-xl mr-3 flex-shrink-0">
            🔍
          </div>
          <h3 className="text-xl font-bold">Traditional Search Excellence</h3>
        </div>
        
        <p className="text-text-secondary mb-5">
          Strategies that ensure your content ranks well in Google, Bing, and other search engines:
        </p>
        
        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-primary-main flex-shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-text-secondary"><strong>Technical SEO</strong>: Site architecture, Core Web Vitals, mobile optimization</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-primary-main flex-shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-text-secondary"><strong>Content Strategy</strong>: Keyword research, user intent, topical authority</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-primary-main flex-shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-text-secondary"><strong>Link Building</strong>: Quality backlink acquisition, digital PR, outreach</span>
          </li>
        </ul>
        
        <Link 
          href="/services/technical-seo" 
          className="text-primary-main font-medium hover:text-primary-dark inline-flex items-center" 
        >
          View Technical SEO Services
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
      
      {/* AI-Enhanced SEO Pillar */}
      <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-primary-light h-full">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-primary-light text-white flex items-center justify-center text-xl mr-3 flex-shrink-0">
            🤖
          </div>
          <h3 className="text-xl font-bold">AI Search Innovation</h3>
        </div>
        
        <p className="text-text-secondary mb-5">
          Cutting-edge strategies for optimization across AI platforms like ChatGPT, Google SGE, and Perplexity:
        </p>
        
        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-primary-light flex-shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-text-secondary"><strong>Entity Optimization</strong>: Knowledge graph integration, semantic relationships</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-primary-light flex-shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-text-secondary"><strong>Structured Data</strong>: Advanced schema implementation for better AI retrieval</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-primary-light flex-shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-text-secondary"><strong>E-E-A-T Enhancement</strong>: Authority signals for both humans and algorithms</span>
          </li>
        </ul>
        
        <Link 
          href="/services/ai-enhanced-seo" 
          className="text-primary-light font-medium hover:text-primary-dark inline-flex items-center" 
        >
          View AI-Enhanced SEO Services
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
    
    {/* Implementation Process - More Mobile-Friendly */}
    <div className="mt-16">
      <h3 className="text-xl font-bold mb-6 text-center">Our 4-Step Implementation Process</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Step 1 */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-primary-main/70">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-primary-main text-white flex items-center justify-center font-bold mr-3 flex-shrink-0">
              1
            </div>
            <h4 className="font-semibold">Comprehensive Audit</h4>
          </div>
          <p className="text-text-secondary text-sm">
            We analyze your website's technical health, content, backlinks, and competitive landscape to identify specific opportunities.
          </p>
        </div>
        
        {/* Step 2 */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-primary-main/70">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-primary-main text-white flex items-center justify-center font-bold mr-3 flex-shrink-0">
              2
            </div>
            <h4 className="font-semibold">Strategic Planning</h4>
          </div>
          <p className="text-text-secondary text-sm">
            We develop a customized roadmap with clear milestones based on your business goals and audit findings.
          </p>
        </div>
        
        {/* Step 3 */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-primary-main/70">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-primary-main text-white flex items-center justify-center font-bold mr-3 flex-shrink-0">
              3
            </div>
            <h4 className="font-semibold">Implementation</h4>
          </div>
          <p className="text-text-secondary text-sm">
            Our team executes the strategy with precision, focusing on high-impact changes that deliver measurable results.
          </p>
        </div>
        
        {/* Step 4 */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-primary-main/70">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-primary-main text-white flex items-center justify-center font-bold mr-3 flex-shrink-0">
              4
            </div>
            <h4 className="font-semibold">Monitoring & Refinement</h4>
          </div>
          <p className="text-text-secondary text-sm">
            We continuously track performance across all platforms, making data-driven adjustments to maximize results.
          </p>
        </div>
      </div>
    </div>
    
    {/* Results Section - Simplified */}
    <div className="mt-16 bg-background-paper rounded-xl p-6 md:p-8">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold">Our Approach Delivers Results</h3>
        <p className="text-text-secondary mt-2">
          Real-world SEO success stories across industries
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Result 1 */}
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <span className="px-2 py-1 bg-primary-main/10 text-primary-main text-xs font-medium rounded-full">E-commerce</span>
            <span className="text-green-600 font-bold">+218% Traffic</span>
          </div>
          <p className="text-text-secondary text-sm">
            Technical optimization and schema markup implementation for a national retail brand's product pages.
          </p>
        </div>
        
        {/* Result 2 */}
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <span className="px-2 py-1 bg-primary-main/10 text-primary-main text-xs font-medium rounded-full">SaaS</span>
            <span className="text-green-600 font-bold">+342% Leads</span>
          </div>
          <p className="text-text-secondary text-sm">
            Content strategy and entity optimization for a B2B software company targeting decision-makers.
          </p>
        </div>
        
        {/* Result 3 */}
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <span className="px-2 py-1 bg-primary-main/10 text-primary-main text-xs font-medium rounded-full">Healthcare</span>
            <span className="text-green-600 font-bold">5x Local Visibility</span>
          </div>
          <p className="text-text-secondary text-sm">
            Local SEO strategy and E-E-A-T enhancement for a multi-location healthcare provider.
          </p>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <Button 
          href="/case-studies" 
          variant="primary"
        >
          View Detailed Case Studies
        </Button>
      </div>
    </div>
  </Container>
</Section>
      
      {/* Core Values Section */}
      <Section background="light">
        <Container>
        <div className="text-center mb-16">
  <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our SEO Methodology</span>
  <h2 className="text-3xl md:text-4xl font-bold mb-4">
    Dual-Optimization for Complete Search Visibility
  </h2>
  <p className="text-lg text-text-secondary max-w-3xl mx-auto">
    Our innovative approach ensures your content performs exceptionally well in both traditional search engines and emerging AI discovery platforms
  </p>
</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div 
                key={value.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-primary-main/10 text-primary-main mb-5 text-3xl mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{value.title}</h3>
                <p className="text-text-secondary text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonials Section */}
<Section>
  <Container>
    <div className="text-center mb-16">
      <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
        Client Success
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        What Our Clients Say
      </h2>
      <p className="text-lg text-text-secondary max-w-3xl mx-auto">
        Hear directly from the businesses we've helped grow.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-main/10 flex items-center justify-center text-lg font-bold text-primary-main mr-4">
              {testimonial.author.charAt(0)}
            </div>
            <div>
              <h5 className="font-semibold text-lg">{testimonial.author}</h5>
              <p className="text-sm text-text-secondary">
                {testimonial.position}, {testimonial.company}
              </p>
            </div>
          </div>

          <blockquote className="text-text-secondary italic mb-4 leading-relaxed">
            “{testimonial.text}”
          </blockquote>

          <Link
            href="/case-studies"
            className="inline-flex items-center text-primary-main font-medium hover:text-primary-dark group"
          >
            Read Case Study
            <svg
              className="w-5 h-5 ml-1 transition-transform duration-200 group-hover:translate-x-1"
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
  </Container>
</Section>

      
      {/* Final CTA Section */}
      <Section background="primary">
  <Container>
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-2/3 mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for SEO That Actually Works?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl">
            Partner with ImmortalSEO to transform your organic visibility with proven strategies that deliver measurable results. Get a personalized SEO roadmap tailored to your specific business goals.
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
    </Layout>);
};

export default AboutPage;
      
     