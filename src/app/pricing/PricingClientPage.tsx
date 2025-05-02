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
  essential: boolean | string;
  advanced: boolean | string;
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

  // Pricing features
  const pricingFeatures: PricingFeature[] = [
    { name: "Initial Comprehensive SEO Audit", essential: true, advanced: true, highlight: true },
    { name: "Keyword Research & Strategy", essential: "Up to 50 keywords", advanced: "Up to 150 keywords", highlight: true },
    { name: "Technical SEO Optimization", essential: "Basic", advanced: "Advanced", highlight: true },
    { name: "Content Optimization", essential: "5 pages/mo", advanced: "15 pages/mo" },
    { name: "Schema Markup Implementation", essential: "Basic", advanced: "Advanced" },
    { name: "Mobile Optimization", essential: true, advanced: true },
    { name: "Site Speed Optimization", essential: "Basic", advanced: "Advanced" },
    { name: "Semantic SEO & Entity Optimization", essential: "Basic", advanced: "Advanced", highlight: true },
    { name: "AI-Enhanced Content Strategy", essential: false, advanced: true, highlight: true },
    { name: "Voice Search Optimization", essential: false, advanced: true },
    { name: "LLM-Ready Content Structure", essential: "Limited", advanced: "Comprehensive", highlight: true },
    { name: "Monthly Backlink Building", essential: "3 quality links", advanced: "10 quality links" },
    { name: "Local SEO", essential: "Basic", advanced: "Advanced" },
    { name: "Competitor Analysis", essential: "Quarterly", advanced: "Monthly" },
    { name: "SEO Reporting", essential: "Monthly", advanced: "Bi-weekly" },
    { name: "Dedicated Account Manager", essential: true, advanced: true },
    { name: "Priority Support", essential: false, advanced: true },
    { name: "Strategy Meetings", essential: "Monthly", advanced: "Bi-weekly" },
    { name: "Content Calendar Development", essential: false, advanced: true },
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      question: "How do I know which plan is right for my business?",
      answer: "The Essential plan is ideal for small to medium-sized businesses looking to establish or improve their SEO foundation. The Advanced plan is better suited for businesses in competitive industries, e-commerce sites, or companies with ambitious growth goals that require comprehensive AI-enhanced SEO strategies. We also offer a free consultation to help you determine the best fit."
    },
    {
      question: "Do you require long-term contracts?",
      answer: "Our standard agreements are for 6 months, as SEO is a long-term strategy that typically takes 3-6 months to show significant results. However, we offer monthly options with a slightly higher rate. We recommend at least a 6-month commitment for optimal results and the most cost-effective pricing."
    },
    {
      question: "What happens after I sign up?",
      answer: "After signing up, we begin with a comprehensive audit of your website and competitive landscape. Within the first week, you'll meet your dedicated account manager who will walk you through our findings and the proposed strategy. Implementation begins immediately afterward, with regular updates and reports throughout the process."
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer: "Yes, you can upgrade your plan at any time. Downgrades can be made at the end of your current billing cycle. Your account manager will help ensure any transition between plans is smooth and aligned with your evolving business needs."
    },
    {
      question: "Do you offer custom pricing for unique needs?",
      answer: "Absolutely. While our standard plans work well for most businesses, we understand that some companies have specific requirements or face unique challenges. Contact us for a custom quote tailored to your specific situation and goals."
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
                Transparent Value-Based Pricing
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Invest in <span className="text-yellow-300">Sustainable</span> Growth
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Strategic SEO packages designed to deliver measurable ROI for your business across both traditional and AI search platforms.
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
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transparent, Value-Based Packages
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Choose the plan that aligns with your business goals and competitive landscape
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
            {/* Essential Plan */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Essential</h3>
                    <p className="text-text-secondary mb-4">Perfect for small to medium businesses</p>
                  </div>
                  <span className="bg-primary-main/10 text-primary-main text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
                
                <div className="mt-6 mb-6">
                  <div className="flex items-end">
                    <span className="text-5xl font-bold">${getPrice(2000)}</span>
                    <span className="text-text-secondary ml-2 mb-1">/{billingPeriod === 'monthly' ? 'mo' : 'mo (billed quarterly)'}</span>
                  </div>
                  {billingPeriod === 'quarterly' && (
                    <p className="text-sm text-green-600 font-medium mt-1">Save ${2000 * 3 * 0.1} per quarter</p>
                  )}
                </div>
                
                <Button
                  href="/contact?plan=essential"
                  variant="primary"
                  fullWidth
                  size="lg"
                  className="mb-6"
                >
                  Get Started
                </Button>
                
                <p className="text-sm text-text-secondary mb-6">
                  No long-term contract required. Cancel anytime with 30-day notice.
                </p>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Top features include:</h4>
                  {pricingFeatures.filter(f => f.highlight && (f.essential === true || typeof f.essential === 'string')).map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p>
                        <span className="font-medium">{feature.name}: </span>
                        <span className="text-text-secondary">
                          {typeof feature.essential === 'string' ? feature.essential : ''}
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
                    <span className="text-sm text-text-secondary">Small to medium-sized businesses</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-2 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-text-secondary">Local service providers</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-2 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-text-secondary">Startups establishing online presence</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-2 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-text-secondary">Businesses in less competitive niches</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Advanced Plan */}
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
                    <h3 className="text-2xl font-bold mb-2">Advanced</h3>
                    <p className="text-text-secondary mb-4">For businesses in competitive markets</p>
                  </div>
                </div>
                
                <div className="mt-6 mb-6">
                  <div className="flex items-end">
                    <span className="text-5xl font-bold">${getPrice(4000)}</span>
                    <span className="text-text-secondary ml-2 mb-1">/{billingPeriod === 'monthly' ? 'mo' : 'mo (billed quarterly)'}</span>
                  </div>
                  {billingPeriod === 'quarterly' && (
                    <p className="text-sm text-green-600 font-medium mt-1">Save ${4000 * 3 * 0.1} per quarter</p>
                  )}
                </div>
                
                <Button
                  href="/contact?plan=advanced"
                  variant="primary"
                  fullWidth
                  size="lg"
                  className="mb-6"
                >
                  Get Started
                </Button>
                
                <p className="text-sm text-text-secondary mb-6">
                  No long-term contract required. Cancel anytime with 30-day notice.
                </p>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Top features include:</h4>
                  {pricingFeatures.filter(f => f.highlight && (f.advanced === true || typeof f.advanced === 'string')).map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p>
                        <span className="font-medium">{feature.name}: </span>
                        <span className="text-text-secondary">
                          {typeof feature.advanced === 'string' ? feature.advanced : ''}
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
                    <span className="text-sm text-text-secondary">E-commerce businesses</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-2 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-text-secondary">SaaS & technology companies</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center mr-2 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-text-secondary">Businesses in highly competitive niches</span>
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
            <h3 className="text-xl font-bold mb-3">Need a Custom Solution?</h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              For larger businesses, enterprise clients, or companies with unique requirements, we offer custom packages tailored to your specific needs and goals.
            </p>
            <Button
              href="/contact?plan=enterprise"
              variant="outline"
              className="border-primary-main text-primary-main hover:bg-primary-main hover:text-white"
            >
              Contact Us for a Custom Quote
            </Button>
          </div>
        </Container>
      </Section>
      
      {/* Features Comparison Section */}
      <Section background="light">
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Detailed Plan Comparison
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Compare our plans to find the perfect fit for your business
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-max bg-white rounded-xl shadow-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="p-4 text-left font-bold text-lg">Feature</th>
                  <th className="p-4 text-center font-bold text-lg">Essential <span className="text-base font-medium text-primary-main block">${getPrice(2000)}/mo</span></th>
                  <th className="p-4 text-center font-bold text-lg">Advanced <span className="text-base font-medium text-primary-main block">${getPrice(4000)}/mo</span></th>
                </tr>
              </thead>
              <tbody>
                {pricingFeatures.map((feature, index) => (
                  <tr key={index} className={`border-b border-gray-100 ${feature.highlight ? 'bg-primary-main/5' : ''}`}>
                    <td className="p-4 font-medium">{feature.name}</td>
                    <td className="p-4 text-center">
                      {feature.essential === true ? (
                        <svg className="w-6 h-6 mx-auto text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : feature.essential === false ? (
                        <svg className="w-6 h-6 mx-auto text-text-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <span className="text-text-secondary">{feature.essential}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {feature.advanced === true ? (
                        <svg className="w-6 h-6 mx-auto text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : feature.advanced === false ? (
                        <svg className="w-6 h-6 mx-auto text-text-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <span className="text-text-secondary">{feature.advanced}</span>
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
              <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">What's Included</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Comprehensive SEO Services
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                All our plans include a holistic approach to SEO that combines traditional best practices with cutting-edge AI optimization techniques.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                    🔍
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Technical SEO Excellence</h3>
                    <p className="text-text-secondary">We ensure your website's foundation is solid with optimized crawling, indexing, site architecture, schema markup, and mobile-friendly design.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                    🧠
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Semantic SEO & Entity Optimization</h3>
                    <p className="text-text-secondary">We structure your content with clear entities and relationships to help search engines and AI platforms better understand your content.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                    🤖
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">AI-Enhanced Strategies</h3>
                    <p className="text-text-secondary">Our unique approach optimizes your content for both traditional search engines and AI platforms like ChatGPT, Perplexity, and other LLMs to maximize visibility across all search mediums.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                    🔄
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ongoing Optimization</h3>
                    <p className="text-text-secondary">SEO is not a one-time project. We continuously monitor, analyze, and refine our strategies to adapt to algorithm changes and stay ahead of competitors.</p>
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
                    <h4 className="font-semibold mb-1">Dual-Optimization Approach</h4>
                    <p className="text-text-secondary text-sm">We're pioneers in optimizing for both traditional search engines and AI platforms, future-proofing your digital presence.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Data-Driven Strategies</h4>
                    <p className="text-text-secondary text-sm">Every recommendation is backed by comprehensive data analysis, ensuring measurable results and ROI.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Complete Transparency</h4>
                    <p className="text-text-secondary text-sm">Regular reports, clear communication, and no black-box tactics. You'll always know exactly what we're doing and why.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Exceptional Results</h4>
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
              What to Expect When You Work With Us
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              A transparent, collaborative approach to achieving sustainable SEO growth
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
                    <h3 className="text-xl font-bold mb-3">Initial Consultation & Audit</h3>
                    <p className="text-text-secondary mb-4">
                      After you sign up, we conduct a comprehensive audit of your website, competitive landscape, and current SEO performance. We'll identify opportunities, issues, and priorities to create a strategic roadmap.
                    </p>
                    <p className="text-sm text-primary-main font-medium">Timeframe: Week 1-2</p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative md:pl-16">
                  <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-primary-main text-white flex items-center justify-center text-lg font-bold">
                    2
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold mb-3">Strategy Development & Planning</h3>
                    <p className="text-text-secondary mb-4">
                      Based on audit findings, we develop a tailored SEO strategy with clear goals, deliverables, and timelines. We'll review this with you to ensure alignment with your business objectives.
                    </p>
                    <p className="text-sm text-primary-main font-medium">Timeframe: Week 2-3</p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative md:pl-16">
                  <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-primary-main text-white flex items-center justify-center text-lg font-bold">
                    3
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold mb-3">Implementation & Optimization</h3>
                    <p className="text-text-secondary mb-4">
                      Our team begins implementing the strategy, focusing on high-impact changes first. This includes technical fixes, content optimization, semantic structuring, and other priority improvements.
                    </p>
                    <p className="text-sm text-primary-main font-medium">Timeframe: Month 1-2</p>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="relative md:pl-16">
                  <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-primary-main text-white flex items-center justify-center text-lg font-bold">
                    4
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold mb-3">Monitoring & Refinement</h3>
                    <p className="text-text-secondary mb-4">
                      We continuously track performance, make data-driven adjustments, and adapt our strategy based on results and algorithm changes. Regular reporting keeps you informed of progress and next steps.
                    </p>
                    <p className="text-sm text-primary-main font-medium">Timeframe: Ongoing</p>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="relative md:pl-16">
                  <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-primary-main text-white flex items-center justify-center text-lg font-bold">
                    5
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold mb-3">Growth & Expansion</h3>
                    <p className="text-text-secondary mb-4">
                      As we achieve initial goals, we identify new opportunities to expand your digital footprint, target additional keywords, and explore new content areas to drive continued growth.
                    </p>
                    <p className="text-sm text-primary-main font-medium">Timeframe: Month 3+</p>
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
              Common questions about our pricing and services
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
              <p className="text-lg mb-4">Still have questions?</p>
              <Button 
                href="/contact" 
                variant="primary"
                className="hover:shadow-lg"
              >
                Contact Our Team
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
                  Ready to Dominate Search Results?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Join the hundreds of businesses achieving sustainable growth with our proven SEO strategies. Your competition isn't waiting – neither should you.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button 
                  href="/contact" 
                  variant="secondary" 
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Start Your SEO Journey
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
              <h3 className="text-xl font-bold">Plan Features Comparison</h3>
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
                    <th className="p-3 text-left font-bold">Feature</th>
                    <th className="p-3 text-center font-bold">Essential</th>
                    <th className="p-3 text-center font-bold">Advanced</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingFeatures.map((feature, index) => (
                    <tr key={index} className={`border-b border-gray-100 ${feature.highlight ? 'bg-primary-main/5' : ''}`}>
                      <td className="p-3 font-medium">{feature.name}</td>
                      <td className="p-3 text-center">
                        {feature.essential === true ? (
                          <svg className="w-6 h-6 mx-auto text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : feature.essential === false ? (
                          <svg className="w-6 h-6 mx-auto text-text-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <span className="text-text-secondary">{feature.essential}</span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {feature.advanced === true ? (
                          <svg className="w-6 h-6 mx-auto text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : feature.advanced === false ? (
                          <svg className="w-6 h-6 mx-auto text-text-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <span className="text-text-secondary">{feature.advanced}</span>
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