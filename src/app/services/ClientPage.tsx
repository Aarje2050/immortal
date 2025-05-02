
"use client";

import { Metadata } from 'next';
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';



import { SiteConfig } from '@/types/site';

const siteConfig = require('../../../config/site.config') as SiteConfig;

// Define a type for the service data
interface Process {
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface CaseStudy {
  title: string;
  description: string;
  results: string[];
}

interface ServiceData {
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  metaTitle: string;
  metaDescription: string;
  icon: string;
  benefits: string[];
  process: Process[];
  faq: FAQ[];
  caseStudies: CaseStudy[];
}

// Define a type for the services object
interface ServicesData {
  [key: string]: ServiceData;
}

// Import services data
import servicesJsonData from '../../data/services.json';
const servicesData: ServicesData = servicesJsonData as ServicesData;

// Icons mapping for service icons
const getIconElement = (iconName: string) => {
  switch (iconName) {
    case 'GearIcon':
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'LanguageIcon':
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      );
    case 'MicrophoneIcon':
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      );
    case 'DocumentIcon':
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'RobotIcon':
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    default:
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
};

export default function ServicesPage() {
  const serviceKeys = Object.keys(servicesData);
  const defaultKey = serviceKeys.length > 0 ? serviceKeys[0] : null;
  
  const [activeService, setActiveService] = useState<string | null>(defaultKey);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<string>('overview'); // New state for tab navigation
  
  const toggleFaq = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  // Get the active service data safely
  const getActiveServiceData = (): ServiceData | null => {
    if (!activeService || !servicesData[activeService]) return null;
    return servicesData[activeService];
  };

  const activeServiceData = getActiveServiceData();
  
  // Get the FAQs for the active service
  const getActiveFaqs = (): FAQ[] => {
    if (!activeServiceData) return [];
    return activeServiceData.faq;
  };

  const activeFaqs = getActiveFaqs();

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
                Expert SEO Services
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Modern SEO for the <span className="text-yellow-300">AI Era</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Comprehensive solutions designed for both traditional search engines and emerging AI platforms.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  href="#services"
                  variant="secondary"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Explore Our Services
                </Button>
                <Button
                  href="/contact"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10 px-8"
                >
                  Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

{/* Services Overview - Completely Redesigned Layout */}
<Section id="services">
  <Container>
    <div className="text-center mb-12">
      <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our Services</span>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Comprehensive SEO Solutions
      </h2>
      <p className="text-lg text-text-secondary max-w-3xl mx-auto">
        Strategic approaches to help your business thrive in both traditional and AI-driven search environments
      </p>
    </div>
    
    {/* Service Cards with Expandable Content */}
    <div className="space-y-6">
      {serviceKeys.map((serviceKey) => {
        const service = servicesData[serviceKey];
        const isActive = activeService === serviceKey;
        
        return (
          <div 
            key={serviceKey}
            className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all ${
              isActive 
                ? 'border-primary-main' 
                : 'border-gray-100 hover:border-primary-main/30'
            }`}
          >
            {/* Service Header - Always Visible */}
            <div 
              className="p-6 cursor-pointer transition-colors flex items-start"
              onClick={() => setActiveService(isActive ? null : serviceKey)}
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-lg mr-4 flex items-center justify-center ${
                isActive
                  ? 'bg-primary-main text-white' 
                  : 'bg-primary-main/10 text-primary-main'
              }`}>
                {getIconElement(service.icon)}
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">
                    {service.name}
                  </h3>
                  <div className={`transform transition-transform ${isActive ? 'rotate-180' : ''}`}>
                    <svg 
                      className="w-5 h-5 text-primary-main" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <p className="text-text-secondary mt-1">
                  {service.shortDescription}
                </p>
              </div>
            </div>
            
            {/* Expandable Content */}
            {isActive && (
              <div className="border-t border-gray-100">
                {/* Tab Navigation */}
                <div className="bg-gray-50 px-6 py-2 flex overflow-x-auto scrollbar-hide">
                  <button
                    className={`px-4 py-2 font-medium whitespace-nowrap transition-colors rounded-lg mr-2 ${
                      activeTab === 'overview' 
                        ? 'bg-primary-main text-white' 
                        : 'hover:bg-gray-100 text-text-secondary'
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`px-4 py-2 font-medium whitespace-nowrap transition-colors rounded-lg mr-2 ${
                      activeTab === 'process' 
                        ? 'bg-primary-main text-white' 
                        : 'hover:bg-gray-100 text-text-secondary'
                    }`}
                    onClick={() => setActiveTab('process')}
                  >
                    Our Approach
                  </button>
                  <button
                    className={`px-4 py-2 font-medium whitespace-nowrap transition-colors rounded-lg ${
                      activeTab === 'faq' 
                        ? 'bg-primary-main text-white' 
                        : 'hover:bg-gray-100 text-text-secondary'
                    }`}
                    onClick={() => setActiveTab('faq')}
                  >
                    FAQ
                  </button>
                </div>
                
                {/* Tab Content */}
                <div className="p-6">
                  {/* Overview Tab Content */}
                  {activeTab === 'overview' && (
                    <div>
                      <p className="text-lg text-text-secondary mb-6">
                        {service.longDescription}
                      </p>
                      
                      <h4 className="text-lg font-semibold mb-4">Key Benefits</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {service.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-3 mt-0.5">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="text-text-secondary">{benefit}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-end">
                        <Button
                          href={`/services/${service.slug}`}
                          variant="primary"
                        >
                          Learn More About {service.name}
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Process Tab Content */}
                  {activeTab === 'process' && (
                    <div>
                      <p className="text-text-secondary mb-6">
                        Our proven methodology ensures consistent results for your business. Here's how we implement our {service.name.toLowerCase()} strategy:
                      </p>
                      
                      <div className="space-y-4">
                        {service.process.map((step, index) => (
                          <div key={index} className="bg-white border border-gray-100 rounded-lg p-4 flex">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-main text-white font-bold flex items-center justify-center mr-4">
                              {index + 1}
                            </div>
                            <div>
                              <h5 className="font-semibold mb-1">{step.title}</h5>
                              <p className="text-text-secondary">{step.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-end mt-6">
                        <Button
                          href={`/contact?service=${service.slug}`}
                          variant="primary"
                        >
                          Schedule a Consultation
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* FAQ Tab Content */}
                  {activeTab === 'faq' && (
                    <div>
                      <p className="text-text-secondary mb-6">
                        Common questions about our {service.name} services and how we can help your business.
                      </p>
                      
                      <div className="space-y-4">
                        {service.faq.map((faq, index) => (
                          <div key={index} className="border border-gray-100 rounded-lg overflow-hidden">
                            <details className="group">
                              <summary className="flex justify-between items-center p-4 cursor-pointer list-none">
                                <h5 className="font-semibold pr-4">{faq.question}</h5>
                                <svg 
                                  className="w-5 h-5 text-primary-main flex-shrink-0 transition-transform group-open:rotate-180" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </summary>
                              <div className="p-4 pt-0 border-t border-gray-100">
                                <p className="text-text-secondary">{faq.answer}</p>
                              </div>
                            </details>
                          </div>
                        ))}
                        
                        {service.faq.length === 0 && (
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-text-secondary">No FAQs available for this service yet.</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-end mt-6">
                        <Button
                          href="/contact"
                          variant="primary"
                        >
                          Have More Questions?
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
    
    {/* Not sure CTA */}
    <div className="bg-primary-main/5 rounded-xl p-6 mt-12 text-center">
      <h3 className="text-xl font-semibold mb-2">Not Sure Which Service You Need?</h3>
      <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
        Our SEO experts can help determine the best strategy for your business based on your goals, industry, and current online presence.
      </p>
      <Button
        href="/contact"
        variant="primary"
        className="font-medium"
      >
        Get Expert Advice
      </Button>
    </div>
  </Container>
</Section>

      {/* Why Choose Our Services */}
      <Section background="light">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The ImmortalSEO Advantage
              </h2>
              <p className="text-lg text-text-secondary mb-6">
                Since 2008, we've been at the forefront of SEO innovation, continuously adapting our strategies to match evolving search technologies. Our approach integrates both traditional SEO expertise and cutting-edge AI optimization techniques.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                    🔍
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">15+ Years of SEO Expertise</h3>
                    <p className="text-text-secondary">Our team has navigated every major algorithm update since 2008, giving us unparalleled insight into search evolution.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                    🤖
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">AI Search Pioneers</h3>
                    <p className="text-text-secondary">We've developed proprietary methodologies for optimizing content for AI platforms like ChatGPT, Perplexity, and Gemini.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                    📊
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Data-Driven Strategies</h3>
                    <p className="text-text-secondary">Every recommendation is backed by comprehensive data analysis and testing, ensuring measurable results.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                    🎯
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Customized Solutions</h3>
                    <p className="text-text-secondary">We tailor our approach to your specific industry, goals, and audience, ensuring maximum relevance and impact.</p>
                  </div>
                </div>
              </div>
              
              <Button 
                href="/about" 
                variant="primary"
                className="hover:shadow-lg transition-shadow"
              >
                Learn More About Our Approach
              </Button>
            </div>
            
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-primary-main/5 rounded-full blur-3xl"></div>
              
              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <p className="text-5xl font-bold text-primary-main mb-2">94%</p>
                  <p className="text-text-secondary">Client retention rate, well above industry average</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md transform translate-y-8">
                  <p className="text-5xl font-bold text-primary-main mb-2">187%</p>
                  <p className="text-text-secondary">Average increase in organic traffic within 6 months</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md transform translate-y-4">
                  <p className="text-5xl font-bold text-primary-main mb-2">15+</p>
                  <p className="text-text-secondary">Years of SEO experience spanning all algorithm updates</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <p className="text-5xl font-bold text-primary-main mb-2">250+</p>
                  <p className="text-text-secondary">Businesses successfully ranked on first page</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section>
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Common questions about our SEO services and approach
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {activeFaqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <svg
                      className={`w-5 h-5 text-primary-main transition-transform ${activeFaqIndex === index ? 'transform rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    className={`px-6 pb-4 ${activeFaqIndex === index ? 'block' : 'hidden'}`}
                  >
                    <p className="text-text-secondary">{faq.answer}</p>
                  </div>
                </div>
              ))}
              
              {/* General FAQs */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(activeFaqs.length)}
                >
                  <h3 className="text-lg font-semibold">How long does it take to see results from SEO?</h3>
                  <svg
                    className={`w-5 h-5 text-primary-main transition-transform ${activeFaqIndex === activeFaqs.length ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`px-6 pb-4 ${activeFaqIndex === activeFaqs.length ? 'block' : 'hidden'}`}
                >
                  <p className="text-text-secondary">SEO is a long-term strategy. While some improvements can be seen within weeks, significant results typically take 3-6 months. This varies based on your industry, competition, current website status, and the specific strategies implemented. With AI-enhanced strategies, we often see initial visibility improvements in AI search platforms more quickly.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(activeFaqs.length + 1)}
                >
                  <h3 className="text-lg font-semibold">What makes ImmortalSEO different from other agencies?</h3>
                  <svg
                    className={`w-5 h-5 text-primary-main transition-transform ${activeFaqIndex === activeFaqs.length + 1 ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`px-6 pb-4 ${activeFaqIndex === activeFaqs.length + 1 ? 'block' : 'hidden'}`}
                >
                  <p className="text-text-secondary">Our dual-optimization approach for both traditional search engines and AI platforms sets us apart. Since 2008, we've evolved with every major algorithm change, giving us unparalleled experience. We combine technical expertise with creative strategy, emphasize transparency with detailed reporting, focus on business results beyond just rankings, and bring extensive experience across diverse industries. Our retention rate of 94% speaks to our commitment to client success.</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-lg mb-4">Have more questions?</p>
              <Button 
                href="/contact" 
                variant="primary"
                className="hover:shadow-lg"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Industries We Serve */}
      <Section background="light">
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Industries</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Industry-Specific SEO Solutions
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Tailored strategies for your unique industry challenges
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample industries */}
            {[
              { name: 'E-commerce', icon: '🛒', description: 'Boost product visibility and drive sales with specialized e-commerce SEO strategies' },
              { name: 'Healthcare', icon: '🏥', description: 'Build trust and authority while navigating complex compliance requirements' },
              { name: 'SaaS & Technology', icon: '💻', description: 'Generate qualified leads with content that speaks to both users and algorithms' },
              { name: 'Legal Services', icon: '⚖️', description: 'Establish expertise and authority in competitive legal verticals' },
              { name: 'Real Estate', icon: '🏢', description: 'Capture local search traffic and showcase properties effectively' },
              { name: 'Finance', icon: '💰', description: 'Build credibility while meeting strict industry compliance standards' }
            ].map((industry) => (
              <div
                key={industry.name}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:translate-y-[-5px] group"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary-main/10 text-primary-main mb-5 text-2xl">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-main transition-colors">{industry.name}</h3>
                <p className="text-text-secondary mb-5">{industry.description}</p>
                <Link 
                  href={`/industries/${industry.name.toLowerCase().replace(/\s+/g, '-')}`}
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
              href="/industries" 
              variant="outline"
              className="hover:bg-primary-main hover:text-white transition-colors"
            >
              View All Industries
            </Button>
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
                  Ready to Dominate Search Results?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Get a free, comprehensive SEO audit worth $1,500 and discover untapped growth opportunities for your business.
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
}