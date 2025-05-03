"use client";

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// Pricing toggle type
type BillingPeriod = 'monthly' | 'quarterly';

// Pricing feature interface
interface PricingFeature {
  name: string;
  local: boolean | string;
  national: boolean | string;
  highlight?: boolean;
}

const PricingClientPage: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [showFeaturesModal, setShowFeaturesModal] = useState<boolean>(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);

  // Toggle FAQ accordion
  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  // Calculate price based on billing period
  const getPrice = (basePrice: number): number => {
    if (billingPeriod === 'quarterly') {
      return Math.round(basePrice * 0.9); // 10% discount for quarterly billing
    }
    return basePrice;
  };

  // Pricing features based on competition level rather than arbitrary keyword limits
  const pricingFeatures: PricingFeature[] = [
    { name: "Comprehensive SEO Audit & Strategy", local: true, national: true, highlight: true },
    { name: "Competitive Analysis Depth", local: "Local competitors", national: "National/global competitors", highlight: true },
    { name: "Technical SEO Optimization", local: "Standard", national: "Advanced", highlight: true },
    { name: "Content Strategy & Optimization", local: "Local focus", national: "Industry authority building", highlight: true },
    { name: "Schema & Structured Data Implementation", local: "Essential schemas", national: "Comprehensive schema strategy" },
    { name: "User Experience & Core Web Vitals", local: true, national: true },
    { name: "Mobile Optimization", local: true, national: true },
    { name: "Local SEO & Google Business Profile", local: "Comprehensive", national: "Multiple location management" },
    { name: "Semantic SEO & Entity Optimization", local: "Foundational", national: "Advanced", highlight: true },
    { name: "AI-Enhanced Content Strategy", local: "Basic implementation", national: "Comprehensive strategy", highlight: true },
    { name: "Voice Search Optimization", local: "Local queries", national: "Industry-wide queries" },
    { name: "Authority Building (Backlinks)", local: "Local relevance focus", national: "Industry authority focus", highlight: true },
    { name: "Reporting & Analytics", local: "Monthly", national: "Bi-weekly" },
    { name: "Rank Tracking Scope", local: "Local SERPs", national: "Multiple locations/global" },
    { name: "Strategy Recalibration", local: "Quarterly", national: "Monthly" },
    { name: "Dedicated SEO Strategist", local: true, national: true },
    { name: "Priority Support", local: "24-48 hours", national: "Same day" },
    { name: "Strategy Meetings", local: "Monthly", national: "Bi-weekly" },
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      question: "How do you determine which plan is right for my business?",
      answer: "We assess your business goals, current online presence, and the competitive landscape of your industry. Local businesses primarily serving specific geographic areas typically benefit from our Local Domination plan. Businesses competing on a national or international level, or in highly competitive industries, are better suited for our National Authority plan. We offer a complimentary consultation to evaluate your specific needs."
    },
    {
      question: "What makes your approach different from other SEO agencies?",
      answer: "Unlike agencies that focus on arbitrary keyword quotas, we build comprehensive strategies based on competitive analysis and sustainable growth. Our dual-optimization approach targets both traditional search and AI platforms, and we emphasize building genuine authority rather than chasing algorithm tricks. We're transparent about our methods and focus on delivering measurable business impact, not just ranking vanity metrics."
    },
    {
      question: "How long does it typically take to see results?",
      answer: "SEO is a strategic investment that builds compounding value over time. Most clients see initial improvements within 2-3 months and significant results within 4-6 months. Highly competitive industries may require 6-9 months for substantial position improvements. We provide clear timelines and milestones as part of your custom strategy and focus on generating early wins while building long-term authority."
    },
    {
      question: "Do you require long-term contracts?",
      answer: "We recommend a 6-month minimum commitment as SEO requires consistent effort to achieve sustainable results. However, we offer flexible terms with month-to-month options available at a slightly higher rate. Our 94% client retention rate demonstrates that most clients choose to continue well beyond the initial period as they see the ongoing value of our work."
    },
    {
      question: "Do you guarantee specific rankings or results?",
      answer: "We don't make specific ranking guarantees as search algorithms constantly evolve and no ethical SEO company can control Google's rankings. Instead, we focus on measurable improvements in organic traffic, conversions, and revenue. We establish clear KPIs at the beginning of our engagement and provide transparent reporting on progress towards these goals."
    }
  ];

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
                Competition-Based Pricing
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Invest in <span className="text-yellow-300">Real SEO</span> Results
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Strategic investments scaled to your competition level, delivering measurable ROI across both traditional and AI search platforms.
              </p>
              <div className="flex justify-center">
                <Button
                  href="#pricing"
                  variant="secondary"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  View Pricing Plans
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <Section id="pricing">
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Competition-Based SEO Investment
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Our pricing reflects the reality of SEO – the effort required depends on your competitive landscape, not arbitrary keyword quotas
            </p>

            {/* Billing Toggle */}
            <div className="flex justify-center items-center mt-8 mb-12">
              <div className="bg-background-paper rounded-full p-1 inline-flex">
                <button
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    billingPeriod === 'monthly'
                      ? 'bg-primary-main text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  onClick={() => setBillingPeriod('monthly')}
                >
                  Monthly
                </button>
                <button
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    billingPeriod === 'quarterly'
                      ? 'bg-primary-main text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                  onClick={() => setBillingPeriod('quarterly')}
                >
                  Quarterly <span className="text-xs font-bold text-primary-main">Save 10%</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Local Domination Plan */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Local Domination</h3>
                    <p className="text-text-secondary mb-4">For businesses focused on regional markets</p>
                  </div>
                  <span className="bg-primary-main/10 text-primary-main text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
                
                <div className="mt-6 mb-6">
                  <div className="flex items-end">
                    <span className="text-5xl font-bold">Starting at ${getPrice(2000)}</span>
                    <span className="text-text-secondary ml-2 mb-1">/{billingPeriod === 'monthly' ? 'mo' : 'mo (billed quarterly)'}</span>
                  </div>
                  {billingPeriod === 'quarterly' && (
                    <p className="text-sm text-green-600 font-medium mt-1">Save ${2000 * 3 * 0.1} per quarter</p>
                  )}
                  <p className="text-sm text-text-secondary mt-3">*Final pricing depends on your specific competitive landscape</p>
                </div>
                
                <Button
                  href="/contact?plan=local-domination"
                  variant="primary"
                  fullWidth
                  size="lg"
                  className="mb-6"
                >
                  Get Started
                </Button>
                
                <p className="text-sm text-text-secondary mb-6">
                  6-month recommended commitment for optimal results. Flexible options available.
                </p>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Strategy focuses on:</h4>
                  {pricingFeatures.filter(f => f.highlight && (f.local === true || typeof f.local === 'string')).map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p>
                        <span className="font-medium">{feature.name}: </span>
                        <span className="text-text-secondary">
                          {typeof feature.local === 'string' ? feature.local : ''}
                        </span>
                      </p>
                    </div>
                  ))}
                  
                  <button
                    className="text-primary-main hover:text-primary-dark text-sm font-medium mt-2 flex items-center"
                    onClick={() => setShowFeaturesModal(true)}
                  >
                    See all features
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-100 bg-background-paper p-6">
                <h4 className="font-semibold mb-3">Perfect for:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-2 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-text-secondary">Local service businesses (lawyers, dentists, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-2 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-text-secondary">Regional retail businesses</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-2 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-text-secondary">Businesses targeting specific metro areas</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-2 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-text-secondary">Low to moderate local competition industries</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* National Authority Plan */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-primary-main hover:shadow-xl transition-shadow duration-300 relative">
              {/* Recommended Badge */}
              <div className="absolute top-0 right-0">
                <div className="bg-primary-main text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
                  Recommended
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">National Authority</h3>
                    <p className="text-text-secondary mb-4">For businesses in competitive markets</p>
                  </div>
                </div>
                
                <div className="mt-6 mb-6">
                  <div className="flex items-end">
                    <span className="text-5xl font-bold">Starting at ${getPrice(4000)}</span>
                    <span className="text-text-secondary ml-2 mb-1">/{billingPeriod === 'monthly' ? 'mo' : 'mo (billed quarterly)'}</span>
                  </div>
                  {billingPeriod === 'quarterly' && (
                    <p className="text-sm text-green-600 font-medium mt-1">Save ${4000 * 3 * 0.1} per quarter</p>
                  )}
                  <p className="text-sm text-text-secondary mt-3">*Custom pricing for highly competitive industries</p>
                </div>
                
                <Button
                  href="/contact?plan=national-authority"
                  variant="primary"
                  fullWidth
                  size="lg"
                  className="mb-6"
                >
                  Get Started
                </Button>
                
                <p className="text-sm text-text-secondary mb-6">
                  6-month recommended commitment for optimal results. Flexible options available.
                </p>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Strategy focuses on:</h4>
                  {pricingFeatures.filter(f => f.highlight && (f.national === true || typeof f.national === 'string')).map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p>
                        <span className="font-medium">{feature.name}: </span>
                        <span className="text-text-secondary">
                          {typeof feature.national === 'string' ? feature.national : ''}
                        </span>
                      </p>
                    </div>
                  ))}
                  
                  <button
                    className="text-primary-main hover:text-primary-dark text-sm font-medium mt-2 flex items-center"
                    onClick={() => setShowFeaturesModal(true)}
                  >
                    See all features
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-100 bg-background-paper p-6">
                <h4 className="font-semibold mb-3">Perfect for:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-2 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-text-secondary">E-commerce and SaaS businesses</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-2 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-text-secondary">Businesses in highly competitive industries</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-2 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-text-secondary">National or international target markets</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-2 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-text-secondary">Companies seeking aggressive growth</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Enterprise Option */}
          <div className="max-w-5xl mx-auto mt-12 bg-background-accent p-8 rounded-xl shadow-sm text-center">
            <h3 className="text-xl font-bold mb-3">Enterprise & High-Competition Industries</h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              For businesses in ultra-competitive markets, enterprise clients, or multi-location businesses, we offer custom strategies tailored to your unique competitive landscape.
            </p>
            <Button
              href="/contact?plan=enterprise"
              variant="outline"
              className="border-primary-main text-primary-main hover:bg-primary-main hover:text-white"
            >
              Contact Us for a Custom Strategy
            </Button>
          </div>
        </Container>
      </Section>
      
      {/* Features Comparison Section */}
      <Section background="light">
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Investment Comparison</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Strategy & Effort Comparison
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Compare our strategic approaches based on your competitive landscape
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-max bg-white rounded-xl shadow-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="p-4 text-left font-bold text-lg">Strategic Element</th>
                  <th className="p-4 text-center font-bold text-lg">Local Domination <span className="text-base font-medium text-primary-main block">Starting at ${getPrice(2000)}/mo</span></th>
                  <th className="p-4 text-center font-bold text-lg">National Authority <span className="text-base font-medium text-primary-main block">Starting at ${getPrice(4000)}/mo</span></th>
                </tr>
              </thead>
              <tbody>
                {pricingFeatures.map((feature, index) => (
                  <tr key={index} className={`border-b border-gray-100 ${feature.highlight ? 'bg-primary-main/5' : ''}`}>
                    <td className="p-4 font-medium">{feature.name}</td>
                    <td className="p-4 text-center">
                      {feature.local === true ? (
                        <svg className="w-6 h-6 mx-auto text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : feature.local === false ? (
                        <svg className="w-6 h-6 mx-auto text-text-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <span className="text-text-secondary">{feature.local}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {feature.national === true ? (
                        <svg className="w-6 h-6 mx-auto text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : feature.national === false ? (
                        <svg className="w-6 h-6 mx-auto text-text-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <span className="text-text-secondary">{feature.national}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>
      
      {/* What's Included Section */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our Methodology</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Strategic SEO Investment
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Our approach focuses on the factors that actually determine SEO success: competitive landscape analysis, market positioning, and sustainable authority building.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                    🔍
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Competition-Based Strategy</h3>
                    <p className="text-text-secondary">Unlike fixed-keyword packages, our approach scales based on your actual competitive landscape. More challenging markets require greater effort and strategic depth to succeed.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                    🧠
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Dual Search Optimization</h3>
                    <p className="text-text-secondary">We optimize for both traditional search engines and emerging AI platforms like ChatGPT, Google SGE, and Perplexity, ensuring comprehensive visibility as search evolves.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                    🏆
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Authority Building Focus</h3>
                    <p className="text-text-secondary">Rather than chasing algorithms, we build genuine topical and domain authority that withstands algorithm updates and delivers sustainable, long-term growth.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                    📊
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Data-Driven Results</h3>
                    <p className="text-text-secondary">Every strategy is informed by comprehensive data analysis, with clear KPIs and transparent reporting that focuses on business impact metrics, not just ranking positions.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-bold mb-6">The ImmortalSEO Difference</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">15+ Years of Experience</h4>
                    <p className="text-text-secondary text-sm">Our team has navigated every major algorithm update since 2008, giving us unparalleled insight into search evolution.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Custom Strategic Roadmaps</h4>
                    <p className="text-text-secondary text-sm">We develop tailored strategies based on your specific industry, competition, and business goals rather than one-size-fits-all approaches.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Continuous Adaptation</h4>
                    <p className="text-text-secondary text-sm">Our strategies evolve with algorithm changes, competitive shifts, and your business needs to ensure consistent performance improvement.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Transparency & Education</h4>
                    <p className="text-text-secondary text-sm">We demystify SEO with clear communication, comprehensive reporting, and client education to ensure you understand the value of your investment.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Proven Results</h4>
                    <p className="text-text-secondary text-sm">Our clients achieve an average of 187% increase in organic traffic within six months, with a 94% client retention rate.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <Link
                  href="/case-studies"
                  className="inline-flex items-center text-primary-main font-medium hover:text-primary-dark" 
                >
                  View Our Case Studies
                  <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Process Section */}
      <Section background="light">
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Strategic SEO Implementation
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              A transparent, methodical approach to building sustainable search visibility
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-0 bottom-0 left-6 w-1 bg-primary-main/20 hidden md:block"></div>
              
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative md:pl-16">
                  <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-primary-main text-white flex items-center justify-center text-lg font-bold">
                    1
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold mb-3">Competitive Landscape Analysis</h3>
                    <p className="text-text-secondary mb-4">
                      We analyze your market position, competitive landscape, and current SEO performance to identify exactly where you stand and what it will take to dominate your target market.
                    </p>
                    <p className="text-sm text-primary-main font-medium">Timeframe: Week 1</p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative md:pl-16">
                  <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-primary-main text-white flex items-center justify-center text-lg font-bold">
                    2
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold mb-3">Strategic Roadmap Development</h3>
                    <p className="text-text-secondary mb-4">
                      Based on our analysis, we develop a custom strategy with specific action plans, timelines, and measurable KPIs aligned with your business goals and competitive reality.
                    </p>
                    <p className="text-sm text-primary-main font-medium">Timeframe: Week 2</p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative md:pl-16">
                  <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-primary-main text-white flex items-center justify-center text-lg font-bold">
                    3
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold mb-3">Technical Foundation Optimization</h3>
                    <p className="text-text-secondary mb-4">
                      We implement critical technical improvements to ensure search engines can properly crawl, index, and understand your site, establishing the essential foundation for all other SEO efforts.
                    </p>
                    <p className="text-sm text-primary-main font-medium">Timeframe: Weeks 3-4</p>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="relative md:pl-16">
                  <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-primary-main text-white flex items-center justify-center text-lg font-bold">
                    4
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold mb-3">Authority & Content Development</h3>
                    <p className="text-text-secondary mb-4">
                      We execute ongoing content optimization, strategic authority building, and semantic structuring to establish your site as a relevant, trustworthy resource for both users and search algorithms.
                    </p>
                    <p className="text-sm text-primary-main font-medium">Timeframe: Month 2 onward</p>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="relative md:pl-16">
                  <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-primary-main text-white flex items-center justify-center text-lg font-bold">
                    5
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold mb-3">Continuous Optimization & Growth</h3>
                    <p className="text-text-secondary mb-4">
                      We consistently analyze performance data, adapt to algorithm changes, and refine our approach to maximize results and identify new growth opportunities as your market position strengthens.
                    </p>
                    <p className="text-sm text-primary-main font-medium">Timeframe: Ongoing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* FAQs Section */}
      <Section>
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Common questions about our approach to SEO investment
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={expandedFAQ === index}
                  >
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <svg
                      className={`w-5 h-5 text-primary-main transition-transform ${expandedFAQ === index ? 'transform rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    className={`px-6 pb-4 transition-all duration-200 ${expandedFAQ === index ? 'block' : 'hidden'}`}
                  >
                    <p className="text-text-secondary">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-lg mb-4">Have more questions about our approach?</p>
              <Button 
                href="/contact" 
                variant="primary"
                className="hover:shadow-lg"
              >
                Schedule a Consultation
              </Button>
            </div>
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
                  Ready for Strategic SEO Growth?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Join the hundreds of businesses achieving sustainable organic visibility with our competition-based SEO strategies. Your competition isn't waiting – neither should you.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button 
                  href="/contact" 
                  variant="secondary" 
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Get Your Custom Strategy
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Features Modal */}
      {showFeaturesModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold">Strategic Approach Comparison</h3>
              <button
                onClick={() => setShowFeaturesModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="p-3 text-left font-bold">Strategic Element</th>
                    <th className="p-3 text-center font-bold">Local Domination</th>
                    <th className="p-3 text-center font-bold">National Authority</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingFeatures.map((feature, index) => (
                    <tr key={index} className={`border-b border-gray-100 ${feature.highlight ? 'bg-primary-main/5' : ''}`}>
                      <td className="p-3 font-medium">{feature.name}</td>
                      <td className="p-3 text-center">
                        {feature.local === true ? (
                          <svg className="w-6 h-6 mx-auto text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : feature.local === false ? (
                          <svg className="w-6 h-6 mx-auto text-text-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <span className="text-text-secondary">{feature.local}</span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {feature.national === true ? (
                          <svg className="w-6 h-6 mx-auto text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : feature.national === false ? (
                          <svg className="w-6 h-6 mx-auto text-text-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <span className="text-text-secondary">{feature.national}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 border-t border-gray-100 flex justify-between items-center">
              <p className="text-text-secondary">
                Need a custom solution? <Link href="/contact" className="text-primary-main hover:underline">Contact us</Link> for enterprise pricing.
              </p>
              <Button
                onClick={() => setShowFeaturesModal(false)}
                variant="outline"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PricingClientPage;