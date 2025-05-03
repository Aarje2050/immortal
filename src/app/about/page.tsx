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
      title: "The Beginning",
      description:
        "Handsome SEO Services was founded by Manish Lamrod with a focus on early SEO tactics like keyword stuffing and directory submissions, which were effective before major Google algorithm updates.",
      icon: "🌱"
    },
    {
      id: 1,
      year: "2015",
      title: "Rajesh Jat Joins",
      description:
        "Rajesh Jat joined as Co-founder, bringing deep technical insight and strategic thinking. Together, we laid the foundation for scalable, algorithm-friendly SEO services.",
      icon: "🤝"
    },
    {
      id: 2,
      year: "2016",
      title: "Rebranding to Immortal SEO",
      description:
        "We rebranded from Handsome SEO to Immortal SEO, marking a shift toward sustainable, semantic SEO strategies that aligned with evolving search engine algorithms.",
      icon: "🔁"
    },
    {
      id: 3,
      year: "2016-2020",
      title: "Adapting to the Algorithm Era",
      description:
        "We embraced Google’s major updates (Panda, Penguin, RankBrain) and transitioned our methods to focus on user intent, mobile-first indexing, and structured content.",
      icon: "📊"
    },
    {
      id: 4,
      year: "2021–Present",
      title: "AI & Semantic SEO",
      description:
        "Immortal SEO now pioneers AI-enhanced, semantic SEO strategies — optimizing content for both search engines and AI models like ChatGPT, Gemini, and Perplexity.",
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
      text: "ImmortalSEO transformed our online presence with their AI-enhanced strategies. Our content now ranks well in both Google and appears prominently in AI search results. The ROI has been exceptional.",
      author: "Archie",
      position: "COO, Zencoder.ai.",
      company: "Zencoder"
    },
    {
      id: 2,
      text: "What sets ImmortalSEO apart is their deep understanding of how search is evolving with AI. Their strategies helped us prepare for this shift years before our competitors, giving us a significant advantage.",
      author: "Michael Rodriguez",
      position: "CEO, HealthFirst Network",
      company: "HealthFirst Network"
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
                Pioneering SEO Since 2008
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                The Story Behind <span className="text-yellow-300">ImmortalSEO</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                From traditional search to AI platforms, we've been at the forefront of SEO evolution for over 15 years.
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
              <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Evolving With Search Since 2008
              </h2>
              <div className="prose max-w-none text-text-secondary">
                <p className="text-lg mb-4">
                  ImmortalSEO was founded in 2008 with a clear vision: to help businesses achieve sustainable growth through honest, transparent, and effective search engine optimization strategies.
                </p>
                <p className="mb-4">
                  What began as a traditional SEO agency has evolved into a pioneer in the integration of AI and SEO. Throughout our journey, we've stayed ahead of industry shifts—from keyword-focused strategies to user intent, from desktop to mobile-first, and now from traditional search to AI-powered discovery platforms.
                </p>
                <p className="mb-4">
                  Today, we're leading the charge in optimizing for both traditional search engines and AI platforms like ChatGPT, Perplexity, and Gemini. Our approaches combine time-tested SEO fundamentals with cutting-edge innovations, ensuring your content performs exceptionally well regardless of how users search.
                </p>
                <p>
                  This adaptability and forward-thinking approach have allowed us to maintain a 94% client retention rate and deliver consistent results across changing digital landscapes.
                </p>
              </div>
              <div className="mt-8">
                <Button 
                  href="/case-studies" 
                  variant="primary"
                  className="hover:shadow-lg transition-shadow"
                >
                  See Our Results
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
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How We Can Help You
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Comprehensive SEO solutions for the modern digital landscape
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
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Modern SEO for a New Era
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              We've pioneered strategies that work for both traditional search engines and next-generation AI platforms
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="prose max-w-none">
                <h3 className="text-2xl font-bold mb-4">Traditional Search Excellence</h3>
                <p className="mb-6">
                  Our foundation remains strong in traditional SEO best practices that ensure your content ranks well in Google, Bing, and other search engines:
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-main flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Technical optimization for flawless crawling and indexing</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-main flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Strategic content development focused on user intent</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-main flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Authority building through quality backlinks</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-main flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>UX optimization for engagement and conversion</span>
                  </li>
                </ul>
                
                <h3 className="text-2xl font-bold mb-4">AI Search Innovation</h3>
                <p className="mb-6">
                  We've pioneered strategies to optimize for AI-powered platforms like ChatGPT, Perplexity, and Gemini:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-main flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Content structured for AI retrieval and citation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-main flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Entity-focused optimization for knowledge graphs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-main flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>E-E-A-T enhancement for authoritative recognition</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary-main flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Semantic connectivity optimization for comprehensive understanding</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Button 
                  href="/services/ai-enhanced-seo" 
                  variant="primary"
                  className="hover:shadow-lg transition-shadow"
                >
                  Learn About AI-Enhanced SEO
                </Button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-background-paper to-background-accent rounded-xl p-8 shadow-md">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary-main rounded-full opacity-10 blur-2xl"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-main rounded-full opacity-10 blur-2xl"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 text-center">The Future of Search</h3>
                  
                  <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                        📊
                      </div>
                      <h4 className="text-xl font-semibold">Our Research</h4>
                    </div>
                    <p className="text-text-secondary mb-4">
                      Our ongoing research into AI search patterns has revealed key differences in how content is retrieved, evaluated, and presented compared to traditional search engines.
                    </p>
                    <p className="text-text-secondary">
                      This insight allows us to develop strategies that ensure your content performs exceptionally across all platforms.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                        🔮
                      </div>
                      <h4 className="text-xl font-semibold">Our Prediction</h4>
                    </div>
                    <p className="text-text-secondary mb-4">
                      AI search will continue to grow in importance, but traditional search engines will remain crucial. The most successful businesses will be those whose content is optimized for both ecosystems.
                    </p>
                    <p className="text-text-secondary">
                      Our dual-optimization approach ensures you're prepared for this evolving landscape.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Core Values Section */}
      <Section background="light">
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Principles That Guide Us
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              The foundation of our approach to delivering exceptional results
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
                  Ready to Dominate Both Traditional & AI Search?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Partner with ImmortalSEO to future-proof your digital presence with strategies that work across all search platforms.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button 
                  href="/contact" 
                  variant="secondary" 
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Get in Touch
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
      
     