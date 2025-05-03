"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

// Types remain the same as in your original file
import { SiteConfig } from '@/types/site';
const siteConfig = require('../../../config/site.config') as SiteConfig;

// Service interfaces remain unchanged
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

// Updated interface to include category
interface ServiceData {
  name: string;
  slug: string;
  category: string; // New field for categorization
  shortDescription: string;
  longDescription: string;
  metaTitle: string;
  metaDescription: string;
  icon: string;
  primaryKeywords?: string[]; // New field for better SEO insights
  benefits: string[];
  process: Process[];
  faq: FAQ[];
  caseStudies: CaseStudy[];
}

interface ServicesData {
  [key: string]: ServiceData;
}
// Add the new interface for grouped services with explicit key type
interface GroupedServicesType {
  [category: string]: Array<ServiceData & { key: string }>;
}


// Import services data
import servicesJsonData from '../../data/services.json';
const servicesData: ServicesData = servicesJsonData as ServicesData;

// Extended icon mapping function with additional icons
const getIconElement = (iconName: string) => {
  switch (iconName) {
    case 'GearIcon':
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'DocumentIcon':
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'BrainIcon':
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
    case 'LinkIcon':
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" />
        </svg>
      );
    case 'MapPinIcon':
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'DatabaseIcon':
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      );
    case 'ShoppingCartIcon':
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'CodeIcon':
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case 'StoreIcon':
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7V5a2 2 0 012-2h2M5 21h14a2 2 0 002-2v-2M5 21V7m0 0l6-6m4 6v14" />
        </svg>
      );
    case 'BuildingIcon':
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    // Default icon as fallback
    default:
      return (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
};

export default function ServicesPage() {
  // Group services by category with explicit typing
  const groupedServices: GroupedServicesType = {
    'Core SEO Services': Object.entries(servicesData)
      .filter(([_, service]) => service.category === 'Core SEO Services')
      .map(([key, service]) => ({ ...service, key })),
    
    'Advanced SEO Solutions': Object.entries(servicesData)
      .filter(([_, service]) => service.category === 'Advanced SEO Solutions')
      .map(([key, service]) => ({ ...service, key })),
    
    'Industry-Specific SEO': Object.entries(servicesData)
      .filter(([_, service]) => service.category === 'Industry-Specific SEO')
      .map(([key, service]) => ({ ...service, key })),

      'CMS-Specific SEO': Object.entries(servicesData)
      .filter(([_, service]) => service.category === 'CMS-Specific SEO')
      .map(([key, service]) => ({ ...service, key })),


      'Performance-Driven SEO': Object.entries(servicesData)
      .filter(([_, service]) => service.category === 'Performance-Driven SEO')
      .map(([key, service]) => ({ ...service, key }))


  };
  
  const [activeService, setActiveService] = useState<string | null>(null);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeCategory, setActiveCategory] = useState<string>('Core SEO Services');
  
  useEffect(() => {
    // Set the first service in the active category as the default
    if (groupedServices[activeCategory] && groupedServices[activeCategory].length > 0) {
      setActiveService(groupedServices[activeCategory][0].key);
    }
  }, [activeCategory]);

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
     {/* Hero Section with Consistency Matching About Page */}
<section className="relative overflow-hidden bg-gradient-to-r from-primary-dark to-primary-main text-white">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
  </div>
  
  <Container>
    <div className="py-20 md:py-28 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-4 backdrop-blur-sm">
          Complete SEO Services for 2025
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          SEO for <span className="text-yellow-300">Traditional</span> & <span className="text-yellow-300">AI Search</span>
        </h1>
        <p className="text-xl mb-8 opacity-90">
          Future-proof your digital presence with our comprehensive SEO strategies designed for both Google and emerging AI platforms like ChatGPT, SGE, and Perplexity.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            href="#services"
            variant="secondary"
            className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
          >
            Explore Services
          </Button>
          <Button
            href="/contact"
            variant="outline"
            className="text-white border-white hover:bg-white/10 px-8"
          >
            Free SEO Audit
          </Button>
        </div>
        
        {/* Optional trust indicators below buttons */}
        <div className="flex justify-center items-center space-x-6 flex-wrap mt-8">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm">15+ Years Experience</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">94% Client Retention</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">500+ Businesses Helped</span>
          </div>
        </div>
      </div>
    </div>
  </Container>
</section>

      {/* Services Category Navigation */}
      <Section id="services">
        <Container>
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive SEO Solutions
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
              Strategic approaches to help your business thrive in both traditional and AI-driven search environments
            </p>
            
           {/* Category Navigation Tabs - Enhanced for More Categories */}
<div className="mb-12">
  {/* Mobile Dropdown for Categories */}
  <div className="md:hidden mb-6">
    <div className="relative">
      <select
        value={activeCategory}
        onChange={(e) => setActiveCategory(e.target.value)}
        className="w-full py-3 px-4 bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-main text-text-primary font-medium"
      >
        {Object.keys(groupedServices).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
  
  {/* Desktop Horizontal Scrollable Tabs */}
  <div className="hidden md:block overflow-x-auto pb-4 scrollbar-hide">
    <div className="flex gap-4 min-w-max justify-center">
      {Object.keys(groupedServices).map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-5 py-2.5 rounded-full transition-colors whitespace-nowrap ${
            activeCategory === category
              ? 'bg-primary-main text-white shadow-md'
              : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
    
    {/* Optional Scroll Indicators */}
    <div className="flex justify-center mt-3">
      <div className="flex space-x-1">
        {Object.keys(groupedServices).map((category, index) => (
          <button
            key={`indicator-${index}`}
            onClick={() => setActiveCategory(category)}
            className={`w-2 h-2 rounded-full transition-colors ${
              activeCategory === category
                ? 'bg-primary-main'
                : 'bg-gray-300'
            }`}
            aria-label={`Go to ${category}`}
          />
        ))}
      </div>
    </div>
  </div>
</div>
          </div>
          
          {/* Service Cards with Expandable Content */}
          <div className="space-y-6">
            {groupedServices[activeCategory].map((service) => {
              const isActive = activeService === service.key;
              
              return (
                <div 
                  key={service.key}
                  className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all ${
                    isActive 
                      ? 'border-primary-main' 
                      : 'border-gray-100 hover:border-primary-main/30'
                  }`}
                >
                  {/* Service Header - Always Visible */}
                  <div 
                    className="p-6 cursor-pointer transition-colors flex items-start"
                    onClick={() => setActiveService(isActive ? null : service.key)}
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
                      
                      {/* Keywords Tags - Only visible for desktop */}
                      {service.primaryKeywords && (
                        <div className="mt-3 hidden md:flex flex-wrap gap-2">
                          {service.primaryKeywords.slice(0, 3).map((keyword, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-text-secondary rounded-full">
                              {keyword}
                            </span>
                          ))}
                          {service.primaryKeywords.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-gray-100 text-text-secondary rounded-full">
                              +{service.primaryKeywords.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
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
                          className={`px-4 py-2 font-medium whitespace-nowrap transition-colors rounded-lg mr-2 ${
                            activeTab === 'faq' 
                              ? 'bg-primary-main text-white' 
                              : 'hover:bg-gray-100 text-text-secondary'
                          }`}
                          onClick={() => setActiveTab('faq')}
                        >
                          FAQ
                        </button>
                        {service.caseStudies && service.caseStudies.length > 0 && (
                          <button
                            className={`px-4 py-2 font-medium whitespace-nowrap transition-colors rounded-lg ${
                              activeTab === 'case-studies' 
                                ? 'bg-primary-main text-white' 
                                : 'hover:bg-gray-100 text-text-secondary'
                            }`}
                            onClick={() => setActiveTab('case-studies')}
                          >
                            Results
                          </button>
                        )}
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
                              {service.benefits.map((benefit: string, index: number) => (
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
                            
                            {/* Primary Keywords Display */}
                            {service.primaryKeywords && (
                              <div className="mb-6">
                                <h4 className="text-sm uppercase tracking-wider text-text-secondary mb-2">Related Topics:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {service.primaryKeywords.map((keyword :string , idx: number) => (
                                    <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-text-secondary rounded-full">
                                      {keyword}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-6 pt-6 border-t border-gray-100">
                              <span className="text-sm text-text-secondary mb-4 sm:mb-0">
                                Want to learn more about this service?
                              </span>
                              <Button
                                href={`/services/${service.slug}`}
                                variant="primary"
                              >
                                View Full Details
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        {/* Process Tab Content */}
                        {activeTab === 'process' && (
                          <div>
                            <p className="text-text-secondary mb-6">
                              Our proven methodology ensures consistent results. Here's how we implement our {service.name} strategy:
                            </p>
                            
                            <div className="space-y-6">
                              {service.process.map((step, index: number) => (
                                <div key={index} className="bg-white border border-gray-100 rounded-lg p-5 flex">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-main text-white font-bold flex items-center justify-center mr-4">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-lg mb-2">{step.title}</h5>
                                    <p className="text-text-secondary">{step.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                              <p className="text-text-secondary mb-4">Ready to implement this strategy for your business?</p>
                              <Button
                                href={`/contact?service=${service.slug}`}
                                variant="primary"
                                size="lg"
                              >
                                Schedule a Strategy Call
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
                            
                            <div className="text-center mt-8">
                              <p className="text-text-secondary mb-4">Have more questions about this service?</p>
                              <Button
                                href="/contact"
                                variant="primary"
                              >
                                Talk to an SEO Expert
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        {/* Case Studies Tab Content */}
                        {activeTab === 'case-studies' && service.caseStudies && (
                          <div>
                            <p className="text-text-secondary mb-6">
                              See the real results we've achieved with our {service.name} strategies:
                            </p>
                            
                            <div className="space-y-8">
                              {service.caseStudies.map((caseStudy, index) => (
                                <div key={index} className="bg-white border border-gray-100 rounded-lg p-6">
                                  <h5 className="text-xl font-semibold mb-3">{caseStudy.title}</h5>
                                  <p className="text-text-secondary mb-4">{caseStudy.description}</p>
                                  
                                  <h6 className="text-sm uppercase tracking-wider text-text-secondary mb-3">Key Results:</h6>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {caseStudy.results.map((result, idx) => (
                                      <div key={idx} className="bg-primary-main/5 p-3 rounded-lg">
                                        <div className="flex items-start">
                                          <svg className="w-5 h-5 text-primary-main flex-shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                          <span className="font-medium">{result}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-8 text-center">
                              <Button
                                href="/case-studies"
                                variant="primary"
                              >
                                View All Case Studies
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
          
          {/* Enhanced CTA Box */}
          <div className="bg-primary-main/5 rounded-xl p-8 mt-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Not Sure Which Service You Need?</h3>
                <p className="text-text-secondary">
                  Our SEO experts will analyze your website, identify key opportunities, and recommend the most effective strategy for your specific goals and industry.
                </p>
              </div>
              <div className="md:w-1/3 text-center md:text-right">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  className="font-medium px-8"
                >
                  Get Your Free SEO Analysis
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* How We're Different Section */}
      <Section background="light">
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our Advantage</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Sets ImmortalSEO Apart
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Industry-leading expertise and innovative strategies that deliver measurable results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Advantage 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-14 h-14 rounded-full bg-primary-main/10 flex items-center justify-center text-2xl text-primary-main mb-4">
                🧠
              </div>
              <h3 className="text-xl font-bold mb-3">Dual-Optimization Strategy</h3>
              <p className="text-text-secondary mb-4">
                Our unique approach optimizes for both traditional search engines and AI platforms, ensuring maximum visibility regardless of how users search.
              </p>
              <div className="pt-4 border-t border-gray-100">
                <span className="text-primary-main font-medium">Future-proof your SEO investment</span>
              </div>
            </div>
            
            {/* Advantage 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-14 h-14 rounded-full bg-primary-main/10 flex items-center justify-center text-2xl text-primary-main mb-4">
                📊
              </div>
              <h3 className="text-xl font-bold mb-3">Data-Driven Approach</h3>
              <p className="text-text-secondary mb-4">
                Every strategy is backed by comprehensive data analysis, competitive research, and continuous performance monitoring for optimal results.
              </p>
              <div className="pt-4 border-t border-gray-100">
                <span className="text-primary-main font-medium">Measurable ROI from every campaign</span>
              </div>
            </div>
            
            {/* Advantage 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-14 h-14 rounded-full bg-primary-main/10 flex items-center justify-center text-2xl text-primary-main mb-4">
                🛠️
              </div>
              <h3 className="text-xl font-bold mb-3">15+ Years Experience</h3>
              <p className="text-text-secondary mb-4">
                We've navigated every major algorithm update since 2008, giving us unmatched expertise in adapting to search evolution and maintaining rankings.
              </p>
              <div className="pt-4 border-t border-gray-100">
                <span className="text-primary-main font-medium">Proven strategies that withstand changes</span>
              </div>
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-4xl font-bold text-primary-main mb-2">94%</p>
                <p className="text-text-secondary">Client retention rate</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary-main mb-2">187%</p>
                <p className="text-text-secondary">Avg. traffic increase</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary-main mb-2">15+</p>
                <p className="text-text-secondary">Years of SEO expertise</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary-main mb-2">250+</p>
                <p className="text-text-secondary">Businesses helped</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Social Proof Section - New Addition */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Client Success</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Real results and feedback from businesses we've helped grow
            </p>
          </div>
          
          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-main/10 flex items-center justify-center text-lg font-bold text-primary-main mr-4">
                  A
                </div>
                <div>
                  <h4 className="font-semibold">Archie Sharma</h4>
                  <p className="text-sm text-text-secondary">COO, Zencoder.ai</p>
                </div>
              </div>
              
              <div className="mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="inline-block w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-text-secondary italic mb-4">
                "ImmortalSEO helped us rank for our main keyword 'AI Coding Agent' in under 3 months. Their strategies improved our visibility across both Google and AI platforms."
              </blockquote>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between">
                <span className="text-sm font-medium text-primary-main">AI-Enhanced SEO</span>
                <span className="text-sm font-medium text-green-600">+35% Traffic</span>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-main/10 flex items-center justify-center text-lg font-bold text-primary-main mr-4">
                  N
                </div>
                <div>
                  <h4 className="font-semibold">Narendra Kumar</h4>
                  <p className="text-sm text-text-secondary">Founder, Omgs.in</p>
                </div>
              </div>
              
              <div className="mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="inline-block w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-text-secondary italic mb-4">
                "With ImmortalSEO's strategic support, we saw a significant increase in organic traffic for high-intent keywords like 'acrylic photo frames' and dominate our niche."
              </blockquote>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between">
                <span className="text-sm font-medium text-primary-main">E-commerce SEO</span>
                <span className="text-sm font-medium text-green-600">+192% Revenue</span>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-main/10 flex items-center justify-center text-lg font-bold text-primary-main mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-text-secondary">Marketing Director, TechSolutions</p>
                </div>
              </div>
              
              <div className="mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="inline-block w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-text-secondary italic mb-4">
                "What sets ImmortalSEO apart is their deep understanding of how search is evolving with AI. Their strategies helped us prepare for this shift years before our competitors."
              </blockquote>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between">
                <span className="text-sm font-medium text-primary-main">Technical SEO</span>
                <span className="text-sm font-medium text-green-600">+247% Traffic</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button
              href="/case-studies"
              variant="outline"
              className="hover:bg-primary-main hover:text-white transition-colors"
            >
              View All Success Stories
            </Button>
          </div>
        </Container>
      </Section>

      {/* Industries Section */}
      <Section background="light">
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Industries We Serve</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Specialized SEO for Your Industry
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Tailored strategies that address the unique challenges and opportunities in your business sector
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Industry Cards */}
            {[
              { name: 'E-commerce', icon: '🛒', slug: 'ecommerce-seo' },
              { name: 'SaaS', icon: '💻', slug: 'saas-seo' },
              { name: 'Healthcare', icon: '🏥', slug: 'healthcare' },
              { name: 'Local Business', icon: '🏬', slug: 'small-business-seo' },
              { name: 'Real Estate', icon: '🏢', slug: 'real-estate' },
              { name: 'Finance', icon: '💰', slug: 'finance' }
            ].map((industry) => (
              <Link
                key={industry.name}
                href={`/industries/${industry.slug}`}
                className="bg-white rounded-lg p-5 text-center hover:shadow-md transition-shadow group"
              >
                <div className="w-16 h-16 rounded-full bg-primary-main/10 flex items-center justify-center text-3xl mx-auto mb-4">
                  {industry.icon}
                </div>
                <h3 className="font-semibold group-hover:text-primary-main transition-colors">
                  {industry.name}
                </h3>
                <div className="mt-4 text-sm text-primary-main opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button
              href="/industries"
              variant="outline"
              className="hover:bg-primary-main hover:text-white transition-colors"
            >
              Explore All Industries
            </Button>
          </div>
        </Container>
      </Section>

      {/* Enhanced CTA Section */}
      <Section background="primary">
        <Container>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Transform Your Search Visibility?
                </h2>
                <p className="text-xl opacity-90 mb-6">
                  Start with a free, comprehensive SEO audit worth $1,500 and discover untapped growth opportunities for your business.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Technical SEO analysis to identify critical issues</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Competitor analysis and keyword opportunity report</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Customized strategy recommendations and action plan</span>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-4 text-center">
                <Button 
                  href="/contact" 
                  variant="secondary" 
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform w-full"
                >
                  Get Your Free SEO Audit
                </Button>
                <p className="text-sm mt-4 opacity-90">No obligation. Results in 3-5 business days.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}