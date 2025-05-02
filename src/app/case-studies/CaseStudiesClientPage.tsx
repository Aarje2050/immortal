"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

// Case study interface
interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    trafficIncrease: string;
    rankingImprovement: string;
    conversionIncrease: string;
    additionalMetrics?: { [key: string]: string };
  };
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  featuredImage: string;
  services: string[];
  duration: string;
  tags: string[];
  featured: boolean;
}

// Sample case studies data
const caseStudiesData: CaseStudy[] = [
  {
    id: "omgs",
    title: "270% Organic Traffic Growth for OMGS.in Through AI-Enhanced SEO Strategy",
    slug: "omgs-in-organic-traffic-growth",
    client: "OMGS.in",
    industry: "Digital Marketing & Online Media",
    challenge: "OMGS.in was struggling to compete in a saturated digital marketing space, with stagnant organic traffic and limited visibility for key industry terms. Their content was high-quality but wasn't structured optimally for both traditional search engines and emerging AI platforms.",
    solution: "We implemented a comprehensive AI-enhanced SEO strategy including technical optimization, semantic structuring, entity-relationship mapping, and content restructuring for better LLM retrieval. We also developed specialized schemas to improve visibility across traditional and AI search platforms.",
    results: {
      trafficIncrease: "270%",
      rankingImprovement: "Top 3 positions for 65% of target keywords",
      conversionIncrease: "185%",
      additionalMetrics: {
        "AI Search Visibility": "350% increase in visibility on AI platforms",
        "Backlink Growth": "215% increase in quality backlinks",
        "Page Authority": "45% improvement across key pages"
      }
    },
    testimonial: {
      quote: "ImmortalSEO's dual-optimization approach transformed our online presence. Not only did our Google rankings improve dramatically, but we're now consistently featured in AI-powered search results which has opened up an entirely new traffic channel for our business.",
      author: "Rohit Sharma",
      position: "Marketing Director, OMGS.in"
    },
    featuredImage: "/images/case-studies/omgs-case-study.jpg",
    services: ["Technical SEO", "Semantic SEO", "AI-Enhanced Content Strategy", "Schema Implementation"],
    duration: "6 months",
    tags: ["Media", "Content", "Technical SEO", "AI Optimization"],
    featured: true
  },
  {
    id: "zencoder",
    title: "ZenCoder.ai Achieves 320% Growth in Organic Leads with AI-Ready Content Structure",
    slug: "zencoder-ai-lead-generation",
    client: "ZenCoder.ai",
    industry: "SaaS & AI Development",
    challenge: "As a relatively new AI development platform, ZenCoder.ai was struggling to build authority in a crowded niche dominated by established players. Their technical content wasn't optimized for discovery in either traditional or AI search environments.",
    solution: "We developed a comprehensive SEO strategy focused on establishing ZenCoder as an authority in the AI space. This included technical optimization, advanced entity structuring, LLM-optimized content development, and a targeted link building campaign to establish domain authority.",
    results: {
      trafficIncrease: "210%",
      rankingImprovement: "First page rankings for 80% of target keywords",
      conversionIncrease: "320%",
      additionalMetrics: {
        "Featured Snippets": "Captured 28 featured snippets for high-value queries",
        "Domain Authority": "Increased from 24 to 56 in 8 months",
        "Demo Requests": "485% increase in qualified leads"
      }
    },
    testimonial: {
      quote: "The ImmortalSEO team fundamentally changed how we approach our content strategy. Their understanding of how AI systems retrieve and present content gave us a massive advantage. We're now seeing consistent lead generation from both traditional search and AI platforms.",
      author: "Alex Chen",
      position: "CEO, ZenCoder.ai"
    },
    featuredImage: "/images/case-studies/zencoder-case-study.jpg",
    services: ["Technical SEO", "AI-Ready Content Structure", "Authority Building", "Conversion Rate Optimization"],
    duration: "8 months",
    tags: ["SaaS", "AI", "Technology", "Lead Generation"],
    featured: true
  },
  {
    id: "millioncases",
    title: "MillionCases.com Expands Global Reach with Multi-Platform SEO Strategy",
    slug: "millioncases-global-expansion",
    client: "MillionCases.com",
    industry: "E-commerce & Retail",
    challenge: "MillionCases.com, a premium phone case retailer, was facing intense competition and struggled to differentiate themselves in search results. Their international expansion efforts were hampered by poor visibility in global markets and minimal presence in AI-driven product recommendations.",
    solution: "We implemented a comprehensive international SEO strategy with hreflang implementation, market-specific keyword targeting, and multilingual schema markup. Additionally, we restructured their product content to enhance visibility in AI search platforms and voice search results.",
    results: {
      trafficIncrease: "340%",
      rankingImprovement: "Top 5 positions for 72% of target keywords across 8 markets",
      conversionIncrease: "225%",
      additionalMetrics: {
        "International Sales": "275% increase in cross-border transactions",
        "Voice Search Discovery": "180% increase in voice search visibility",
        "Shopping Cart Value": "32% increase in average order value"
      }
    },
    testimonial: {
      quote: "ImmortalSEO's approach to international SEO completely transformed our business. Their strategy for optimizing our product content for both traditional and AI search platforms gave us a competitive edge that directly translated to increased sales across all our target markets.",
      author: "James Wilson",
      position: "Global Marketing Manager, MillionCases.com"
    },
    featuredImage: "/images/case-studies/millioncases-case-study.jpg",
    services: ["International SEO", "E-commerce Optimization", "Voice Search Optimization", "AI-Enhanced Content Strategy"],
    duration: "9 months",
    tags: ["E-commerce", "International", "Product SEO", "Voice Search"],
    featured: true
  },
  {
    id: "cbd-niche",
    title: "CBD Brand Overcomes Industry Challenges with Strategic SEO Approach",
    slug: "cbd-brand-compliance-seo",
    client: "Confidential CBD Brand",
    industry: "Health & Wellness, CBD Products",
    challenge: "Our client in the CBD industry faced significant challenges with visibility due to strict advertising limitations, competitive keywords, and complex compliance requirements that restricted their marketing options.",
    solution: "We developed a specialized SEO strategy that focused on educational content, semantic entity optimization, and medical-grade E-E-A-T enhancement. Our approach balanced compliance requirements with effective organic visibility tactics for this restricted industry.",
    results: {
      trafficIncrease: "195%",
      rankingImprovement: "First page rankings for 60+ high-value informational terms",
      conversionIncrease: "145%",
      additionalMetrics: {
        "Organic Revenue": "230% increase in revenue from organic channels",
        "Content Authority": "Published in 12 industry publications",
        "User Engagement": "48% increase in time on site"
      }
    },
    testimonial: {
      quote: "The ImmortalSEO team understood the unique challenges of our industry and developed strategies that worked within our constraints. Their focus on educational content and semantic optimization helped us build authority in our niche while staying compliant with all regulations.",
      author: "Anonymous",
      position: "Marketing Director, CBD Brand"
    },
    featuredImage: "/images/case-studies/cbd-case-study.jpg",
    services: ["Technical SEO", "Content Strategy", "Authority Building", "Compliance-Focused Optimization"],
    duration: "12 months",
    tags: ["Health & Wellness", "Restricted Industry", "Educational Content", "Compliance"],
    featured: false
  },
  {
    id: "chittorpolyfab",
    title: "ChittorPolyFab.com Achieves 235% B2B Lead Growth Through Industry-Specific SEO",
    slug: "chittorpolyfab-b2b-lead-generation",
    client: "ChittorPolyFab.com",
    industry: "Manufacturing & Industrial",
    challenge: "ChittorPolyFab, a leading manufacturer of polymer products, had minimal digital presence despite their strong market position. Their website wasn't optimized for B2B search patterns, and they struggled to generate qualified leads through digital channels.",
    solution: "We implemented a B2B-focused SEO strategy centered on industry-specific technical terms, developed comprehensive product schema markup, and created authoritative content targeting key decision-makers in their industry. We also optimized for industry-specific search platforms beyond Google.",
    results: {
      trafficIncrease: "180%",
      rankingImprovement: "Top positions for 45+ industrial product terms",
      conversionIncrease: "235%",
      additionalMetrics: {
        "RFQ Submissions": "320% increase in qualified inquiries",
        "International Visibility": "Expanded to 8 new export markets",
        "Industry Directory Rankings": "Top listings in 12 industrial directories"
      }
    },
    testimonial: {
      quote: "ImmortalSEO took the time to understand our complex B2B sales process and industrial market. Their technical approach to SEO transformed our digital presence, making our website a powerful lead generation tool that has directly contributed to our business growth.",
      author: "Vikram Patel",
      position: "Director of Business Development, ChittorPolyFab"
    },
    featuredImage: "/images/case-studies/chittorpolyfab-case-study.jpg",
    services: ["B2B SEO", "Technical Content Optimization", "Industry-Specific Strategy", "Lead Generation"],
    duration: "7 months",
    tags: ["Manufacturing", "B2B", "Industrial", "Technical SEO"],
    featured: false
  }
];

// Filter types for case studies
type FilterType = 'all' | 'industry' | 'service' | 'result';

const CaseStudiesClientPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('');
  const [serviceFilter, setServiceFilter] = useState<string>('');
  const [resultFilter, setResultFilter] = useState<string>('');
  
  // Get unique industries, services, and result metrics for filters
  const industries = Array.from(new Set(caseStudiesData.map(cs => cs.industry)));
  const services = Array.from(new Set(caseStudiesData.flatMap(cs => cs.services)));
  const resultMetrics = ["Traffic Growth", "Ranking Improvements", "Conversion Increases"];
  
  // Filter case studies based on selected filters
  const filteredCaseStudies = caseStudiesData.filter(caseStudy => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'industry' && industryFilter) return caseStudy.industry === industryFilter;
    if (activeFilter === 'service' && serviceFilter) return caseStudy.services.includes(serviceFilter);
    if (activeFilter === 'result' && resultFilter) {
      if (resultFilter === "Traffic Growth") return parseInt(caseStudy.results.trafficIncrease) > 100;
      if (resultFilter === "Ranking Improvements") return caseStudy.results.rankingImprovement.includes("Top");
      if (resultFilter === "Conversion Increases") return parseInt(caseStudy.results.conversionIncrease) > 100;
    }
    return true;
  });
  
  // Featured case studies
  const featuredCaseStudies = caseStudiesData.filter(cs => cs.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-dark to-primary-main text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
        </div>
        
        <Container>
          <div className="py-20 md:py-28 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-4 backdrop-blur-sm">
                Real Results, Real Growth
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Our <span className="text-yellow-300">Success Stories</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                See how we've helped businesses achieve exceptional growth through strategic SEO optimization across traditional and AI search platforms.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  href="#featured-case-studies"
                  variant="secondary"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  View Success Stories
                </Button>
                <Button
                  href="/contact"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10 px-8"
                >
                  Discuss Your Project
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Case Studies Section */}
      <Section id="featured-case-studies">
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Featured Success Stories</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transformative SEO Results
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Explore how our strategic approach has helped these businesses achieve exceptional growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-12">
            {featuredCaseStudies.map((caseStudy, index) => (
              <div 
                key={caseStudy.id} 
                className={`bg-white rounded-xl shadow-md overflow-hidden ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="md:flex">
                  <div className="md:w-2/5 bg-background-paper flex items-center justify-center p-8">
                    <div className="aspect-video w-full rounded-lg bg-primary-main/10 flex items-center justify-center">
                      <span className="text-primary-main font-bold text-lg">{caseStudy.client} Image</span>
                    </div>
                  </div>
                  <div className="md:w-3/5 p-8">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {caseStudy.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{caseStudy.title}</h3>
                    <p className="text-text-secondary mb-6">{caseStudy.challenge.substring(0, 150)}...</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-background-paper rounded-lg">
                        <p className="text-sm text-text-secondary mb-1">Traffic Growth</p>
                        <p className="text-2xl font-bold text-primary-main">{caseStudy.results.trafficIncrease}</p>
                      </div>
                      <div className="text-center p-3 bg-background-paper rounded-lg">
                        <p className="text-sm text-text-secondary mb-1">Rankings</p>
                        <p className="text-lg font-bold text-primary-main">Top 5</p>
                      </div>
                      <div className="text-center p-3 bg-background-paper rounded-lg">
                        <p className="text-sm text-text-secondary mb-1">Conversions</p>
                        <p className="text-2xl font-bold text-primary-main">{caseStudy.results.conversionIncrease}</p>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/case-studies/${caseStudy.slug}`}
                      className="inline-flex items-center text-primary-main font-medium hover:text-primary-dark" 
                    >
                      Read Full Case Study
                      <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      
      {/* All Case Studies Section */}
      <Section background="light">
        <Container>
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">All Success Stories</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore All Case Studies
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Filter by industry, service, or results to find relevant success stories
            </p>
          </div>
          
          {/* Filter Controls */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-primary-main text-white'
                      : 'bg-background-paper text-text-secondary hover:text-text-primary'
                  }`}
                  onClick={() => setActiveFilter('all')}
                >
                  All Case Studies
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === 'industry'
                      ? 'bg-primary-main text-white'
                      : 'bg-background-paper text-text-secondary hover:text-text-primary'
                  }`}
                  onClick={() => setActiveFilter('industry')}
                >
                  By Industry
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === 'service'
                      ? 'bg-primary-main text-white'
                      : 'bg-background-paper text-text-secondary hover:text-text-primary'
                  }`}
                  onClick={() => setActiveFilter('service')}
                >
                  By Service
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === 'result'
                      ? 'bg-primary-main text-white'
                      : 'bg-background-paper text-text-secondary hover:text-text-primary'
                  }`}
                  onClick={() => setActiveFilter('result')}
                >
                  By Result
                </button>
              </div>
              
              {activeFilter === 'industry' && (
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <button
                      key={industry}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        industryFilter === industry
                          ? 'bg-primary-main text-white'
                          : 'bg-primary-main/10 text-primary-main hover:bg-primary-main/20'
                      }`}
                      onClick={() => setIndustryFilter(industry)}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              )}
              
              {activeFilter === 'service' && (
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => (
                    <button
                      key={service}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        serviceFilter === service
                          ? 'bg-primary-main text-white'
                          : 'bg-primary-main/10 text-primary-main hover:bg-primary-main/20'
                      }`}
                      onClick={() => setServiceFilter(service)}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              )}
              
              {activeFilter === 'result' && (
                <div className="flex flex-wrap gap-2">
                  {resultMetrics.map((metric) => (
                    <button
                      key={metric}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        resultFilter === metric
                          ? 'bg-primary-main text-white'
                          : 'bg-primary-main/10 text-primary-main hover:bg-primary-main/20'
                      }`}
                      onClick={() => setResultFilter(metric)}
                    >
                      {metric}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((caseStudy) => (
              <div 
                key={caseStudy.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="aspect-video w-full bg-primary-main/10 flex items-center justify-center">
                  <span className="text-primary-main font-medium">{caseStudy.client} Image</span>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {caseStudy.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="inline-block px-2 py-1 bg-primary-main/10 text-primary-main rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary-main transition-colors">{caseStudy.client}</h3>
                  <p className="text-text-secondary mb-4 line-clamp-2">{caseStudy.challenge.substring(0, 100)}...</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-text-secondary">Traffic Growth</p>
                      <p className="font-bold text-primary-main">{caseStudy.results.trafficIncrease}</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Duration</p>
                      <p className="font-medium">{caseStudy.duration}</p>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/case-studies/${caseStudy.slug}`}
                    className="inline-flex items-center text-primary-main font-medium hover:text-primary-dark" 
                  >
                    View Case Study
                    <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      
      {/* Testimonials Section */}
      <Section>
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Client Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Hear directly from the businesses we've helped grow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {caseStudiesData.filter(cs => cs.testimonial).slice(0, 4).map((caseStudy) => (
              <div 
                key={`testimonial-${caseStudy.id}`}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-main/10 flex items-center justify-center text-lg font-bold text-primary-main mr-4">
                    {caseStudy.testimonial!.author.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-semibold">{caseStudy.testimonial!.author}</h5>
                    <p className="text-sm text-text-secondary">{caseStudy.testimonial!.position}</p>
                  </div>
                </div>
                
                <blockquote className="text-text-secondary italic mb-4">
                  "{caseStudy.testimonial!.quote}"
                </blockquote>
                
                <Link 
                  href={`/case-studies/${caseStudy.slug}`}
                  className="inline-flex items-center text-primary-main text-sm font-medium hover:text-primary-dark" 
                >
                  View Case Study
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      
      {/* CTA Section */}
      <Section background="primary">
        <Container>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Become Our Next Success Story?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Get a comprehensive SEO audit worth $1,500 and discover untapped growth opportunities for your business.
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
    </Layout>
  );
};

export default CaseStudiesClientPage;