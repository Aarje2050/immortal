"use client";

import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const LlmsTxtGenerator: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [maxPages, setMaxPages] = useState<number>(50);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');
  
  // Ref for scrolling to results
  const resultsRef = useRef<HTMLDivElement>(null);

  // Example websites for quick selection
  const exampleWebsites = [
    { name: 'Blog', url: 'https://blog.example.com' },
    { name: 'E-commerce', url: 'https://store.example.com' },
    { name: 'SaaS', url: 'https://app.example.com' },
    { name: 'Documentation', url: 'https://docs.example.com' }
  ];

  // Handle URL input change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  // Handle max pages input change
  const handleMaxPagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setMaxPages(value);
    }
  };

  // Apply example website URL
  const applyExampleUrl = (exampleUrl: string) => {
    setUrl(exampleUrl);
  };

 // Generate LLMs.txt content
const generateLlmsTxt = async () => {
  // Reset states
  setError(null);
  setGeneratedContent('');
  setIsLoading(true);

  try {
    // Validate URL
    if (!url) {
      throw new Error('Please enter a valid URL');
    }

    // Normalize URL if needed
    let normalizedUrl = url;
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = 'https://' + normalizedUrl;
    }

    // Make API request using POST method with proper JSON body
    const apiUrl = `https://llmstxt-backend.onrender.com/api/scrape`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls: [normalizedUrl],
        bulkMode: false
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    // The response is now JSON, not plain text
    const data = await response.json();
    
    // Extract the LLMs.txt content from the response structure
    if (data[normalizedUrl] && data[normalizedUrl].status === 'success') {
      setGeneratedContent(data[normalizedUrl].llms_txt);
    } else {
      throw new Error(`Failed to generate LLMs.txt for ${normalizedUrl}`);
    }
    
    // Scroll to results after a short delay
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
    
  } catch (err: any) {
    console.error('Error generating LLMs.txt:', err);
    setError(err.message || 'An error occurred while generating LLMs.txt content');
  } finally {
    setIsLoading(false);
  }
};

  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Download LLMs.txt file
  const downloadLlmsTxt = () => {
    const blob = new Blob([generatedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'llms.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
                AI Optimization Tools
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                LLMs.txt <span className="text-yellow-300">Generator</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Create an LLMs.txt file to help AI models better understand and navigate your website content.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Tool Section - Moved to the top */}
      <Section className="-mt-8">
        <Container>
          {/* Tool Card with shadow for emphasis */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl border border-gray-100">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary-main">Generate your LLMs.txt file</h2>
                
                {/* Tabs for Basic/Advanced */}
                <div className="hidden sm:flex bg-gray-100 rounded-md p-1">
                  <button 
                    onClick={() => setActiveTab('basic')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'basic' 
                        ? 'bg-white shadow-sm text-primary-main' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Basic
                  </button>
                  <button 
                    onClick={() => setActiveTab('advanced')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'advanced' 
                        ? 'bg-white shadow-sm text-primary-main' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Advanced
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-2">Enter your website URL:</label>
                <div className="flex flex-col sm:flex-row">
                  <input
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                    placeholder="e.g., example.com"
                    className="flex-grow border border-gray-300 rounded-md sm:rounded-r-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main mb-2 sm:mb-0"
                  />
                  <button
                    onClick={generateLlmsTxt}
                    disabled={isLoading}
                    className="bg-primary-main text-white rounded-md sm:rounded-l-none px-6 py-3 font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </span>
                    ) : (
                      'Generate LLMs.txt'
                    )}
                  </button>
                </div>
                {error && (
                  <p className="text-red-500 mt-2">{error}</p>
                )}
              </div>
              
              {/* Example Websites */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Try with an example:</h3>
                  <span className="text-xs text-gray-400">(Click to populate URL)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {exampleWebsites.map((website, index) => (
                    <button
                      key={index}
                      onClick={() => applyExampleUrl(website.url)}
                      className="px-4 py-2 rounded-full bg-primary-main/10 text-primary-main hover:bg-primary-main/20 transition-colors text-sm"
                    >
                      {website.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Advanced Options */}
              <div className={`mb-6 ${activeTab === 'advanced' ? 'block' : 'hidden sm:hidden'}`}>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-md font-semibold mb-3">Advanced Options</h3>
                  <div className="flex items-center">
                    <label className="block font-medium mr-3">Maximum Pages to Crawl:</label>
                    <input
                      type="number"
                      value={maxPages}
                      onChange={handleMaxPagesChange}
                      min="1"
                      max="100"
                      className="w-20 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                    />
                    <span className="ml-2 text-sm text-gray-500">
                      Higher values may take longer
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results Section - conditionally visible */}
            {(isLoading || generatedContent) && (
              <div 
                ref={resultsRef}
                className="border-t border-gray-100 bg-gray-50 p-6 md:p-8"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Generated LLMs.txt</h2>
                  {generatedContent && !isLoading && (
                    <div className="flex space-x-2">
                      <button
                        onClick={copyToClipboard}
                        className="text-primary-main hover:text-primary-dark flex items-center px-3 py-1 border border-primary-main/30 rounded-md hover:bg-primary-main/5 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <span className="text-green-500 flex items-center text-sm">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                          </span>
                        ) : (
                          <span className="flex items-center text-sm">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                          </span>
                        )}
                      </button>
                      <button
                        onClick={downloadLlmsTxt}
                        className="text-primary-main hover:text-primary-dark flex items-center px-3 py-1 border border-primary-main/30 rounded-md hover:bg-primary-main/5 transition-colors text-sm"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-auto max-h-[500px]">
                  {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                      <p className="ml-3">Generating LLMs.txt, please wait...</p>
                    </div>
                  ) : generatedContent ? (
                    <pre className="whitespace-pre-wrap">{generatedContent}</pre>
                  ) : (
                    <p className="py-8 text-center text-gray-400">Generated LLMs.txt will appear here</p>
                  )}
                </div>
                
                {generatedContent && !isLoading && (
                  <div className="mt-4 bg-green-50 border border-green-100 rounded-lg p-4">
                    <h3 className="font-semibold text-green-700 flex items-center mb-2">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Next Steps:
                    </h3>
                    <ol className="list-decimal list-inside text-green-700 space-y-1 ml-6 text-sm">
                      <li>Download the generated LLMs.txt file</li>
                      <li>Upload it to the root directory of your website</li>
                      <li>Verify it works by visiting yourdomain.com/llms.txt</li>
                      <li>Test with an AI assistant to see improved understanding of your content</li>
                    </ol>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* How It Works Section - Highly visual, concise explanation */}
          <div className="mt-12">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium">
                How It Works
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                Simple process, powerful results
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center text-2xl mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold mb-2">Enter Your URL</h3>
                <p className="text-sm text-text-secondary">
                  Provide the website you want to create an LLMs.txt file for
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center text-2xl mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold mb-2">Website Analysis</h3>
                <p className="text-sm text-text-secondary">
                  Our tool crawls your site to understand its structure
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center text-2xl mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold mb-2">File Generation</h3>
                <p className="text-sm text-text-secondary">
                  A properly formatted LLMs.txt file is created in markdown
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center text-2xl mx-auto mb-4">
                  4
                </div>
                <h3 className="font-semibold mb-2">Implementation</h3>
                <p className="text-sm text-text-secondary">
                  Download and upload to your website's root directory
                </p>
              </div>
            </div>
          </div>
          
          {/* What is LLMs.txt Section */}
          <div className="mt-16 bg-white p-8 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-3">
                  What is LLMs.txt
                </span>
                <h2 className="text-2xl font-bold mb-4">Make your website AI-friendly</h2>
                <p className="text-text-secondary mb-4">
                  The LLMs.txt file is a standardized markdown file that helps AI systems like ChatGPT, Claude, and Gemini better understand your website. It provides a concise, structured summary of your site's content, improving how these AI tools reference and interact with your information.
                </p>
                <p className="text-text-secondary mb-4">
                  While similar in concept to robots.txt (which guides search engine crawlers), LLMs.txt specifically addresses the needs of large language models by offering clean, context-optimized content in markdown format.
                </p>
                
                <div className="bg-primary-main/5 rounded-lg p-4 mt-6">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Key Benefits:
                  </h3>
                  <ul className="list-disc list-inside text-text-secondary space-y-1">
                    <li>Improves how AI models understand your website's content</li>
                    <li>Helps AI provide more accurate answers about your content</li>
                    <li>Optimizes for AI discovery and efficient context usage</li>
                    <li>Ensures proper citation and attribution of your information</li>
                  </ul>
                </div>
              </div>
              
              <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Example LLMs.txt File</h3>
                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm mb-4 overflow-auto max-h-[300px]">
                  <pre className="whitespace-pre-wrap"># Example Company

{/* > Example Company provides AI-powered productivity solutions for remote teams. */}

## Key Products

- [TaskMaster](https://example.com/products/taskmaster): AI task management
- [MeetingMate](https://example.com/products/meetingmate): Intelligent meeting scheduler
- [TeamSync](https://example.com/products/teamsync): Team coordination platform

## Documentation

- [API Reference](https://docs.example.com/api): Full API documentation
- [Tutorials](https://docs.example.com/tutorials): Step-by-step guides
- [FAQs](https://docs.example.com/faq): Frequently asked questions

## Company Info

- [About Us](https://example.com/about): Company mission and team
- [Blog](https://example.com/blog): Latest updates and articles
- [Contact](https://example.com/contact): Get in touch</pre>
                </div>
                <p className="text-sm text-text-secondary italic">
                  This simple markdown format helps AI models quickly understand the site's main sections, important pages, and how information is organized.
                </p>
              </div>
            </div>
          </div>
          
          {/* Best Practices */}
          <div className="mt-12 bg-white p-8 rounded-xl shadow-md">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium">
                Best Practices
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                LLMs.txt Implementation Guide
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Do's
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-medium">Include a clear summary</span>
                      <p className="text-sm text-text-secondary">Add a concise blockquote describing your site's purpose</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-medium">Organize with meaningful headings</span>
                      <p className="text-sm text-text-secondary">Use H2 and H3 headings to structure content logically</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-medium">Link to important pages</span>
                      <p className="text-sm text-text-secondary">Include markdown links to your most valuable content</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-medium">Keep it updated</span>
                      <p className="text-sm text-text-secondary">Refresh your LLMs.txt file when site structure changes</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  Don'ts
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <div>
                      <span className="font-medium">Include private information</span>
                      <p className="text-sm text-text-secondary">Never include sensitive or private content not intended for public access</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <div>
                      <span className="font-medium">Create overly complex files</span>
                      <p className="text-sm text-text-secondary">Keep it simple and focused on the most important information</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <div>
                      <span className="font-medium">Neglect regular updates</span>
                      <p className="text-sm text-text-secondary">Outdated LLMs.txt files can lead to inaccurate AI responses</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <div>
                      <span className="font-medium">Include broken links</span>
                      <p className="text-sm text-text-secondary">All links should be functional and point to active pages</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Common Questions */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium">
                FAQ
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                Common Questions
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {[
                  {
                    question: "What's the difference between LLMs.txt and robots.txt?",
                    answer: "While robots.txt controls how search engine crawlers access your website, LLMs.txt is designed specifically for AI language models. It provides a structured, human-readable summary of your content to help AI systems better understand and interact with your website."
                  },
                  {
                    question: "Will LLMs.txt improve my SEO?",
                    answer: "LLMs.txt isn't directly related to traditional SEO, but as AI-powered search becomes more prevalent, having a well-structured LLMs.txt file can improve how your content is understood and referenced by AI systems, potentially increasing visibility in AI-driven search experiences."
                  },
                  {
                    question: "Do I need to update my LLMs.txt file regularly?",
                    answer: "Yes, it's recommended to update your LLMs.txt file whenever your website structure changes significantly or when you add important new content. This ensures AI models have the most accurate and up-to-date information about your site."
                  },
                  {
                    question: "How do I know if my LLMs.txt file is working?",
                    answer: "You can test your LLMs.txt implementation by asking AI assistants like Claude or ChatGPT questions about your website. If they provide accurate answers and properly attribute information to your site, your LLMs.txt file is likely working effectively."
                  },
                  {
                    question: "Can I customize the LLMs.txt file after generation?",
                    answer: "Absolutely! The generated file is a starting point. You're encouraged to customize it by adding more detailed information, organizing it into logical sections, and highlighting your most important content to maximize its effectiveness."
                  }
                ].map((faq, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                  >
                    <details className="group">
                      <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                        <h3 className="text-lg font-semibold">{faq.question}</h3>
                        <svg
                          className="w-5 h-5 text-primary-main transition-transform group-open:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 pb-6">
                        <p className="text-text-secondary">{faq.answer}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* User Testimonials */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium">
                Success Stories
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                What our users are saying
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-main/10 flex items-center justify-center text-lg font-bold text-primary-main mr-4">
                    R
                  </div>
                  <div>
                    <h5 className="font-semibold">Rachel Chen</h5>
                    <p className="text-sm text-text-secondary">Tech Writer</p>
                  </div>
                </div>
                <p className="italic text-text-secondary">
                  "After implementing LLMs.txt on our documentation site, we've seen a significant improvement in how AI assistants reference our content. Much more accurate!"
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-main/10 flex items-center justify-center text-lg font-bold text-primary-main mr-4">
                    D
                  </div>
                  <div>
                    <h5 className="font-semibold">David Okonkwo</h5>
                    <p className="text-sm text-text-secondary">E-commerce Manager</p>
                  </div>
                </div>
                <p className="italic text-text-secondary">
                  "Our product information is now being properly cited by AI tools, which has helped reduce misinformation and increase customer confidence in our brand."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-main/10 flex items-center justify-center text-lg font-bold text-primary-main mr-4">
                    M
                  </div>
                  <div>
                    <h5 className="font-semibold">Mira Patel</h5>
                    <p className="text-sm text-text-secondary">Content Strategist</p>
                  </div>
                </div>
                <p className="italic text-text-secondary">
                  "I was skeptical at first, but after adding LLMs.txt to our blog, we've noticed AI assistants are providing more accurate summaries and better citations of our articles."
                </p>
              </div>
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
                  Need Help With AI Optimization?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Our experts can help optimize your website for both traditional search engines and AI platforms.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button 
                  href="/services/ai-optimization" 
                  variant="secondary" 
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default LlmsTxtGenerator;