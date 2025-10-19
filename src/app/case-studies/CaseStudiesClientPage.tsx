"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import caseStudiesData from './caseStudiesData';

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
                    <Image
          src={`${caseStudy.featuredImage}`}
          alt={`${caseStudy.client} Featured Image`}
          width={1280}
          height={720}
          className="object-cover w-full h-full"
          priority
        />
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