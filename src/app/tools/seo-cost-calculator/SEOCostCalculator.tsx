"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// Define calculator input types
interface CalculatorInputs {
  industry: string;
  websiteSize: string;
  competitionLevel: string;
  targetLocation: string;
  currentPosition: string;
  serviceLevel: string;
  additionalServices: string[];
}

// Define calculator results type
interface CalculatorResults {
  monthlyEstimate: {
    min: number;
    max: number;
  };
  oneTimeEstimate: {
    min: number;
    max: number;
  };
  hoursPerMonth: {
    min: number;
    max: number;
  };
  breakdown: {
    [key: string]: {
      min: number;
      max: number;
      percentage: number;
    };
  };
  recommendedServices: string[];
}

const SEOCostCalculator: React.FC = () => {
  // Default values
  const defaultInputs: CalculatorInputs = {
    industry: 'general',
    websiteSize: 'medium',
    competitionLevel: 'medium',
    targetLocation: 'national',
    currentPosition: 'page2-3',
    serviceLevel: 'standard',
    additionalServices: []
  };
  
  // State for form inputs and results
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  
  // Industry multipliers (affects overall cost)
  const industryMultipliers = {
    general: 1.0,             // Baseline
    ecommerce: 1.4,           // E-commerce is typically more complex
    healthcare: 1.3,          // Healthcare requires specialized knowledge
    legal: 1.25,              // Legal requires specialized knowledge
    tech: 1.2,                // Tech is competitive
    finance: 1.3,             // Finance is highly regulated and competitive
    realestate: 1.15,         // Real estate is location-focused
    travel: 1.2,              // Travel involves significant content
    education: 1.1,           // Education requires specific approaches
    manufacturing: 1.05,      // Manufacturing can be less complex
    local: 0.9,               // Local businesses may need simpler strategies
    nonprofit: 0.85,          // Non-profits often have smaller budgets
    entertainment: 1.1,       // Entertainment involves significant content
    food: 1.0,                // Food & beverage is average complexity
  };
  
  // Website size multipliers
  const sizeMultipliers = {
    small: 0.7,               // Small sites (< 10 pages)
    medium: 1.0,              // Medium sites (10-50 pages)
    large: 1.4,               // Large sites (50-200 pages)
    enterprise: 2.0           // Enterprise sites (200+ pages)
  };
  
  // Competition level multipliers
  const competitionMultipliers = {
    low: 0.75,                // Low competition keywords/industry
    medium: 1.0,              // Medium competition
    high: 1.4,                // High competition
    veryHigh: 1.8             // Very high competition (e.g., insurance, loans)
  };
  
  // Target location multipliers
  const locationMultipliers = {
    local: 0.7,               // Local SEO (city/region)
    national: 1.0,            // National SEO (country-wide)
    international: 1.5        // International SEO (multiple countries/languages)
  };
  
  // Current position multipliers
  const positionMultipliers = {
    notRanking: 1.3,          // Not ranking at all for target keywords
    'page3+': 1.2,            // Ranking on page 3 or higher
    'page2-3': 1.0,           // Ranking on page 2-3
    'page1Bottom': 0.85,      // Ranking on page 1 (positions 6-10)
    'page1Top': 0.7           // Ranking on page 1 (positions 1-5)
  };
  
  // Service level multipliers
  // const serviceLevelMultipliers = {
  //   basic: 0.7,               // Basic SEO services
  //   standard: 1.0,            // Standard comprehensive SEO
  //   premium: 1.6,             // Premium full-service SEO
  //   enterprise: 2.5           // Enterprise-level SEO with dedicated team
  // };
  
  // Additional service costs (monthly)
  const additionalServiceCosts = {
    contentCreation: {
      min: 300,
      max: 1500
    },
    linkBuilding: {
      min: 200,
      max: 1000
    },
    localSEO: {
      min: 150,
      max: 600
    },
    ecommerceSEO: {
      min: 200,
      max: 1200
    },
    internationalSEO: {
      min: 300,
      max: 1500
    },
    technicalSEO: {
      min: 200,
      max: 1000
    },
    aiOptimization: {
      min: 250,
      max: 1200
    }
  };
  
  // Base costs
  const baseMonthlyCost = {
    min: 1200,
    max: 2000
  };
  
  const baseOneTimeCost = {
    min: 1500,
    max: 5000
  };
  
  // Handle input changes
  const handleInputChange = (name: keyof CalculatorInputs, value: string | string[]) => {
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle checkbox changes for additional services
  const handleCheckboxChange = (service: string) => {
    setInputs(prev => {
      const currentServices = [...prev.additionalServices];
      if (currentServices.includes(service)) {
        return {
          ...prev,
          additionalServices: currentServices.filter(s => s !== service)
        };
      } else {
        return {
          ...prev,
          additionalServices: [...currentServices, service]
        };
      }
    });
  };
  
  // Calculate cost estimates
  const calculateCosts = () => {
    // Calculate multipliers
    const industryMult = industryMultipliers[inputs.industry as keyof typeof industryMultipliers] || 1.0;
    const sizeMult = sizeMultipliers[inputs.websiteSize as keyof typeof sizeMultipliers] || 1.0;
    const competitionMult = competitionMultipliers[inputs.competitionLevel as keyof typeof competitionMultipliers] || 1.0;
    const locationMult = locationMultipliers[inputs.targetLocation as keyof typeof locationMultipliers] || 1.0;
    const positionMult = positionMultipliers[inputs.currentPosition as keyof typeof positionMultipliers] || 1.0;
    // const serviceLevelMult = serviceLevelMultipliers[inputs.serviceLevel as keyof typeof serviceLevelMultipliers] || 1.0;
    
    // Calculate core monthly cost
    const monthlyCoreMin = Math.round(baseMonthlyCost.min * industryMult * sizeMult * competitionMult * locationMult * positionMult);
    const monthlyCoreMax = Math.round(baseMonthlyCost.max * industryMult * sizeMult * competitionMult * locationMult * positionMult);
    
    // Calculate one-time costs
    const oneTimeCoreMin = Math.round(baseOneTimeCost.min * industryMult * sizeMult * competitionMult);
    const oneTimeCoreMax = Math.round(baseOneTimeCost.max * industryMult * sizeMult * competitionMult);
    
    // // Calculate additional service costs
    // let additionalMonthlyMin = 0;
    // let additionalMonthlyMax = 0;
    
    // inputs.additionalServices.forEach(service => {
    //   const serviceCost = additionalServiceCosts[service as keyof typeof additionalServiceCosts];
    //   if (serviceCost) {
    //     additionalMonthlyMin += serviceCost.min;
    //     additionalMonthlyMax += serviceCost.max;
    //   }
    // });
    
    // // Calculate hours per month
    const hoursMin = Math.round((monthlyCoreMin ) / 100);
    const hoursMax = Math.round((monthlyCoreMax ) / 100);
    
    // // Create cost breakdown
    const totalMonthlyMin = monthlyCoreMin ;
    const totalMonthlyMax = monthlyCoreMax ;
    
    const breakdown: CalculatorResults['breakdown'] = {
      'Technical SEO': {
        min: Math.round(totalMonthlyMin * 0.25),
        max: Math.round(totalMonthlyMax * 0.25),
        percentage: 25
      },
      'Content Optimization': {
        min: Math.round(totalMonthlyMin * 0.30),
        max: Math.round(totalMonthlyMax * 0.30),
        percentage: 30
      },
      'On-Page SEO': {
        min: Math.round(totalMonthlyMin * 0.20),
        max: Math.round(totalMonthlyMax * 0.20),
        percentage: 20
      },
      'Off-Page SEO': {
        min: Math.round(totalMonthlyMin * 0.15),
        max: Math.round(totalMonthlyMax * 0.15),
        percentage: 15
      },
      'Reporting & Analysis': {
        min: Math.round(totalMonthlyMin * 0.10),
        max: Math.round(totalMonthlyMax * 0.10),
        percentage: 10
      }
    };
    
    // Get recommended services based on inputs
    const recommendedServices = getRecommendedServices(inputs);
    
    // Set results
    const calculatedResults: CalculatorResults = {
      monthlyEstimate: {
        min: totalMonthlyMin,
        max: totalMonthlyMax
      },
      oneTimeEstimate: {
        min: oneTimeCoreMin,
        max: oneTimeCoreMax
      },
      hoursPerMonth: {
        min: hoursMin,
        max: hoursMax
      },
      breakdown,
      recommendedServices
    };
    
    setResults(calculatedResults);
    setShowResults(true);
    setActiveStep(2);
  };
  
  // Get recommended services based on inputs
  const getRecommendedServices = (inputs: CalculatorInputs): string[] => {
    const recommended = [];
    
    // Always recommend technical SEO
    recommended.push('Technical SEO Audit');
    
    // Website size recommendations
    if (inputs.websiteSize === 'large' || inputs.websiteSize === 'enterprise') {
      recommended.push('Site Architecture Optimization');
      recommended.push('Crawl Budget Optimization');
    }
    
    // Competition level recommendations
    if (inputs.competitionLevel === 'high' || inputs.competitionLevel === 'veryHigh') {
      recommended.push('Competitor Analysis');
      recommended.push('Advanced Link Building');
    }
    
    // Target location recommendations
    if (inputs.targetLocation === 'local') {
      recommended.push('Local SEO & Google Business Profile Optimization');
    } else if (inputs.targetLocation === 'international') {
      recommended.push('International SEO Strategy');
      recommended.push('Hreflang Implementation');
    }
    
    // Current position recommendations
    if (inputs.currentPosition === 'notRanking' || inputs.currentPosition === 'page3+') {
      recommended.push('Comprehensive Keyword Research');
      recommended.push('Content Gap Analysis');
    }
    
    // Industry-specific recommendations
    if (inputs.industry === 'ecommerce') {
      recommended.push('E-commerce Product Optimization');
      recommended.push('Schema Markup Implementation');
    } else if (inputs.industry === 'healthcare' || inputs.industry === 'finance' || inputs.industry === 'legal') {
      recommended.push('E-E-A-T Content Enhancement');
      recommended.push('Compliance Review');
    }
    
    // AI Optimization for modern businesses
    recommended.push('AI Search Optimization');
    
    return recommended;
  };
  
  // Reset calculator
  const resetCalculator = () => {
    setInputs(defaultInputs);
    setResults(null);
    setShowResults(false);
    setActiveStep(1);
  };
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Industry options
  const industryOptions = [
    { value: 'general', label: 'General / Other' },
    { value: 'ecommerce', label: 'E-commerce / Retail' },
    { value: 'healthcare', label: 'Healthcare & Medical' },
    { value: 'legal', label: 'Legal Services' },
    { value: 'tech', label: 'Technology & SaaS' },
    { value: 'finance', label: 'Finance & Insurance' },
    { value: 'realestate', label: 'Real Estate' },
    { value: 'travel', label: 'Travel & Hospitality' },
    { value: 'education', label: 'Education & E-Learning' },
    { value: 'manufacturing', label: 'Manufacturing & Industrial' },
    { value: 'local', label: 'Local Business / Service' },
    { value: 'nonprofit', label: 'Non-Profit / NGO' },
    { value: 'entertainment', label: 'Entertainment & Media' },
    { value: 'food', label: 'Food & Beverage' }
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
          <div className="py-16 md:py-20 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Link 
                href="/tools" 
                className="inline-flex items-center text-white/80 hover:text-white mb-4"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Tools
              </Link>
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-4 backdrop-blur-sm">
                Free SEO Tool
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                SEO Cost <span className="text-yellow-300">Calculator</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Get an accurate estimate of your SEO investment based on your specific business needs and industry.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Calculator Section */}
      <Section>
        <Container>
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Estimate Your SEO Investment</h2>
            <p className="text-text-secondary mb-4">
              Use our calculator to get a customized estimate of your SEO costs based on your website, industry, and goals. This tool provides realistic estimates for both monthly retainer costs and one-time project costs.
            </p>
            <div className="bg-primary-main/5 rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Why SEO Costs Vary:
              </h3>
              <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
                <li>Different industries have varying levels of competition and complexity</li>
                <li>Website size and technical needs significantly impact required work</li>
                <li>Your current search position affects the effort needed</li>
                <li>Geographic targeting (local vs. national vs. international) changes strategy</li>
                <li>Additional specialized services may be required for your specific goals</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      activeStep >= 1 ? 'bg-primary-main text-white' : 'bg-gray-200 text-gray-500'
                    } text-sm font-bold mr-3`}>
                      1
                    </div>
                    <h2 className="text-xl font-bold">SEO Calculator Inputs</h2>
                  </div>
                  
                  {!showResults ? (
                    <div className="space-y-6">
                      {/* Industry Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Industry
                        </label>
                        <select
                          value={inputs.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                        >
                          {industryOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Website Size */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Website Size
                        </label>
                        <select
                          value={inputs.websiteSize}
                          onChange={(e) => handleInputChange('websiteSize', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                        >
                          <option value="small">Small (Less than 10 pages)</option>
                          <option value="medium">Medium (10-50 pages)</option>
                          <option value="large">Large (50-200 pages)</option>
                          <option value="enterprise">Enterprise (200+ pages)</option>
                        </select>
                      </div>
                      
                      {/* Competition Level */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Competition Level in Your Industry
                        </label>
                        <select
                          value={inputs.competitionLevel}
                          onChange={(e) => handleInputChange('competitionLevel', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                        >
                          <option value="low">Low (Niche market, few competitors)</option>
                          <option value="medium">Medium (Moderate competition)</option>
                          <option value="high">High (Many established competitors)</option>
                          <option value="veryHigh">Very High (Extremely competitive market)</option>
                        </select>
                      </div>
                      
                      {/* Target Location */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Target Location
                        </label>
                        <select
                          value={inputs.targetLocation}
                          onChange={(e) => handleInputChange('targetLocation', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                        >
                          <option value="local">Local (City or Region)</option>
                          <option value="national">National (Single Country)</option>
                          <option value="international">International (Multiple Countries)</option>
                        </select>
                      </div>
                      
                      {/* Current Position */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Search Position
                        </label>
                        <select
                          value={inputs.currentPosition}
                          onChange={(e) => handleInputChange('currentPosition', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                        >
                          <option value="notRanking">Not ranking for target keywords</option>
                          <option value="page3+">Ranking on page 3 or higher</option>
                          <option value="page2-3">Ranking on page 2-3</option>
                          <option value="page1Bottom">Ranking on page 1 (positions 6-10)</option>
                          <option value="page1Top">Ranking on page 1 (positions 1-5)</option>
                        </select>
                      </div>
                      
                      {/* Service Level */}
                      {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Desired Service Level
                        </label>
                        <select
                          value={inputs.serviceLevel}
                          onChange={(e) => handleInputChange('serviceLevel', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                        >
                          <option value="basic">Basic (Essential SEO services)</option>
                          <option value="standard">Standard (Comprehensive SEO strategy)</option>
                          <option value="premium">Premium (Advanced strategy with priority support)</option>
                          <option value="enterprise">Enterprise (Dedicated team with custom strategy)</option>
                        </select>
                      </div> */}
                      
                      {/* Additional Services */}
                      {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Additional Services (Optional)
                        </label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="contentCreation"
                              checked={inputs.additionalServices.includes('contentCreation')}
                              onChange={() => handleCheckboxChange('contentCreation')}
                              className="h-4 w-4 text-primary-main focus:ring-primary-main border-gray-300 rounded"
                            />
                            <label htmlFor="contentCreation" className="ml-2 text-text-secondary">
                              Content Creation & Strategy
                            </label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="linkBuilding"
                              checked={inputs.additionalServices.includes('linkBuilding')}
                              onChange={() => handleCheckboxChange('linkBuilding')}
                              className="h-4 w-4 text-primary-main focus:ring-primary-main border-gray-300 rounded"
                            />
                            <label htmlFor="linkBuilding" className="ml-2 text-text-secondary">
                              Link Building & Outreach
                            </label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="localSEO"
                              checked={inputs.additionalServices.includes('localSEO')}
                              onChange={() => handleCheckboxChange('localSEO')}
                              className="h-4 w-4 text-primary-main focus:ring-primary-main border-gray-300 rounded"
                            />
                            <label htmlFor="localSEO" className="ml-2 text-text-secondary">
                              Local SEO & Google Business Profile
                            </label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="ecommerceSEO"
                              checked={inputs.additionalServices.includes('ecommerceSEO')}
                              onChange={() => handleCheckboxChange('ecommerceSEO')}
                              className="h-4 w-4 text-primary-main focus:ring-primary-main border-gray-300 rounded"
                            />
                            <label htmlFor="ecommerceSEO" className="ml-2 text-text-secondary">
                              E-commerce SEO
                            </label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="internationalSEO"
                              checked={inputs.additionalServices.includes('internationalSEO')}
                              onChange={() => handleCheckboxChange('internationalSEO')}
                              className="h-4 w-4 text-primary-main focus:ring-primary-main border-gray-300 rounded"
                            />
                            <label htmlFor="internationalSEO" className="ml-2 text-text-secondary">
                              International SEO
                            </label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="technicalSEO"
                              checked={inputs.additionalServices.includes('technicalSEO')}
                              onChange={() => handleCheckboxChange('technicalSEO')}
                              className="h-4 w-4 text-primary-main focus:ring-primary-main border-gray-300 rounded"
                            />
                            <label htmlFor="technicalSEO" className="ml-2 text-text-secondary">
                              Technical SEO & Site Speed Optimization
                            </label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="aiOptimization"
                              checked={inputs.additionalServices.includes('aiOptimization')}
                              onChange={() => handleCheckboxChange('aiOptimization')}
                              className="h-4 w-4 text-primary-main focus:ring-primary-main border-gray-300 rounded"
                            />
                            <label htmlFor="aiOptimization" className="ml-2 text-text-secondary">
                              AI Search Optimization
                            </label>
                          </div>
                        </div>
                      </div>
                       */}
                      <div>
                        <Button 
                          onClick={calculateCosts}
                          variant="primary"
                          className="w-full"
                        >
                          Calculate SEO Costs
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-main text-white text-sm font-bold mr-3">
                          2
                        </div>
                        <h2 className="text-xl font-bold">Your SEO Cost Estimate</h2>
                      </div>
                      
                      {results && (
                        <div>
                          {/* Primary Estimate Display */}
                          <div className="bg-primary-main/5 p-6 rounded-xl mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="text-sm font-medium text-text-secondary mb-1">
                                  Monthly SEO Investment:
                                </h3>
                                <p className="text-3xl font-bold text-primary-main">
                                  {formatCurrency(results.monthlyEstimate.min)} - {formatCurrency(results.monthlyEstimate.max)}
                                </p>
                                <p className="text-sm text-text-secondary mt-1">
                                  Estimated {results.hoursPerMonth.min}-{results.hoursPerMonth.max} hours per month
                                </p>
                              </div>
                              
                              <div>
                                <h3 className="text-sm font-medium text-text-secondary mb-1">
                                  One-Time Setup/Audit:
                                </h3>
                                <p className="text-3xl font-bold text-primary-main">
                                  {formatCurrency(results.oneTimeEstimate.min)} - {formatCurrency(results.oneTimeEstimate.max)}
                                </p>
                                <p className="text-sm text-text-secondary mt-1">
                                  Initial research, audits, and setup
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Cost Breakdown */}
                          <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Monthly Cost Breakdown</h3>
                            <div className="space-y-4">
                              {Object.entries(results.breakdown).map(([service, data]) => (
                                <div key={service}>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-text-secondary">{service}</span>
                                    <span className="text-text-secondary font-medium">
                                      {formatCurrency(data.min)} - {formatCurrency(data.max)}
                                    </span>
                                  </div>
                                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-primary-main"
                                      style={{ width: `${data.percentage}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-xs text-right mt-1 text-text-secondary">
                                    {data.percentage}% of total
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Recommended Services */}
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4">Recommended Services</h3>
                            <p className="text-text-secondary mb-4">
                              Based on your inputs, we recommend the following services for optimal results:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {results.recommendedServices.map((service, index) => (
                                <div 
                                  key={index}
                                  className="flex items-center bg-primary-main/5 p-3 rounded-lg"
                                >
                                  <svg className="w-5 h-5 text-primary-main flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span className="text-gray-800">{service}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Input Summary */}
                          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-medium mb-3">Your Input Summary:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                              <div className="flex justify-between">
                                <span className="text-text-secondary">Industry:</span>
                                <span className="font-medium">
                                  {industryOptions.find(option => option.value === inputs.industry)?.label || inputs.industry}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary">Website Size:</span>
                                <span className="font-medium">{inputs.websiteSize.charAt(0).toUpperCase() + inputs.websiteSize.slice(1)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary">Competition Level:</span>
                                <span className="font-medium">{inputs.competitionLevel.charAt(0).toUpperCase() + inputs.competitionLevel.slice(1)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary">Target Location:</span>
                                <span className="font-medium">{inputs.targetLocation.charAt(0).toUpperCase() + inputs.targetLocation.slice(1)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary">Current Position:</span>
                                <span className="font-medium">
                                  {inputs.currentPosition === 'notRanking' ? 'Not Ranking' :
                                   inputs.currentPosition === 'page3+' ? 'Page 3+' :
                                   inputs.currentPosition === 'page2-3' ? 'Page 2-3' :
                                   inputs.currentPosition === 'page1Bottom' ? 'Page 1 (Bottom)' :
                                   inputs.currentPosition === 'page1Top' ? 'Page 1 (Top)' : 
                                   inputs.currentPosition}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-text-secondary">Service Level:</span>
                                <span className="font-medium">{inputs.serviceLevel.charAt(0).toUpperCase() + inputs.serviceLevel.slice(1)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between gap-4">
                            <Button 
                              onClick={resetCalculator}
                              variant="outline"
                              className="flex-1"
                            >
                              Recalculate
                            </Button>
                            <Button 
                              href="/contact?ref=seo-calculator"
                              variant="primary"
                              className="flex-1"
                            >
                              Get Custom Quote
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold mb-4">Understanding SEO Costs</h2>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                          🏢
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">Industry Factors</h3>
                          <p className="text-text-secondary">Competitive industries like finance and healthcare typically require higher investments.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                          🌐
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">Site Complexity</h3>
                          <p className="text-text-secondary">Larger sites with more pages require more work for optimization and maintenance.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                          📈
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">Competition Level</h3>
                          <p className="text-text-secondary">Highly competitive niches require more aggressive and comprehensive strategies.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                          📍
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">Geographic Reach</h3>
                          <p className="text-text-secondary">International campaigns require more resources than local SEO efforts.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50">
                    <h3 className="font-semibold mb-4">Typical SEO Pricing Models:</h3>
                    <ul className="space-y-3 text-text-secondary">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-primary-main mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span><strong>Monthly Retainers:</strong> Ongoing SEO services typically range from $500-$10,000+ per month</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-primary-main mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span><strong>Project-Based:</strong> One-time projects typically range from $1,000-$30,000+ depending on scope</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-primary-main mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span><strong>Hourly Consulting:</strong> Expert SEO consultants typically charge $100-$300+ per hour</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-primary-main mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span><strong>Performance-Based:</strong> Some agencies offer pricing tied to specific ranking or traffic goals</span>
                      </li>
                    </ul>
                    
                    <div className="mt-6">
                      <Link 
                        href="/tools" 
                        className="text-primary-main hover:text-primary-dark flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to All Tools
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* SEO Investment Guide */}
          <div className="mt-12 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">SEO Investment Guide: What to Expect</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Good SEO Investment Includes:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Comprehensive technical site audit and optimization</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Thorough keyword research and competitive analysis</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>On-page optimization of existing content</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Strategic content creation focused on both users and search engines</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Quality link building and digital PR</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Regular reporting with meaningful metrics and insights</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>AI search optimization for next-generation visibility</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Red Flags to Watch For:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Guarantees of specific rankings or timeframes</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Pricing that seems too good to be true (extremely low-cost SEO)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>No clear explanation of strategies or tactics</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Focus only on outdated metrics like keyword density</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>No reporting or transparency about work being done</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Agencies that use black hat techniques that risk penalties</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Long-term contracts with no performance clauses</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary-main/5 rounded-lg">
              <h3 className="font-semibold mb-2">ROI Expectations:</h3>
              <p className="text-text-secondary mb-4">
                SEO is a long-term investment that typically takes 3-6 months to show significant results. However, good SEO can deliver excellent ROI over time:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
                <li>Sustainable traffic growth that continues after active investment</li>
                <li>Higher conversion rates compared to many paid channels</li>
                <li>Increased brand visibility and authority in your industry</li>
                <li>Compounding returns as your site builds authority over time</li>
                <li>Lower cost-per-acquisition in the long run compared to paid advertising</li>
              </ul>
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
                  Ready for a Custom SEO Strategy?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Get a detailed proposal with a tailored strategy and transparent pricing based on your specific business needs.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button 
                  href="/contact?ref=seo-calculator" 
                  variant="secondary" 
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Request a Custom Quote
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default SEOCostCalculator;