"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const LLMsTxtGenerator: React.FC = () => {
  // State for iframe height
  const [iframeHeight, setIframeHeight] = useState<number>(800);
  
  // State for the tool's explanation section
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);
  
  // Adjust iframe height on window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      // Set iframe height based on window height to make it responsive
      const newHeight = window.innerHeight * 0.7;
      setIframeHeight(Math.max(800, newHeight));
    };
    
    // Initialize height
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
                SEO Tools
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                LLMs.txt <span className="text-yellow-300">Generator</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Create an LLMs.txt file to help language models better understand and navigate your website.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Tool Section */}
      <Section>
        <Container>
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">What is an LLMs.txt file?</h2>
            <p className="text-text-secondary mb-4">
              An LLMs.txt file is a standardized Markdown file proposed to provide information to help Large Language Models (LLMs) better understand and navigate your website at inference time. It serves as a curated index of your website's most important content, presented in a format that's optimized for AI models.
            </p>
            <div className={`text-text-secondary ${showMoreInfo ? '' : 'line-clamp-3'} mb-4`}>
              <p className="mb-3">
                Similar to how robots.txt guides search engine crawlers, LLMs.txt helps AI systems quickly find and understand your website's structure and important content. This improves how AI models interact with your site, leading to better responses when users ask questions about your content.
              </p>
              <p className="mb-3">
                The LLMs.txt file uses Markdown format and typically includes:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                <li>An H1 header with the name of your website/project</li>
                <li>A blockquote summary that explains what your website is about</li>
                <li>Organized sections with links to key content (documentation, guides, policies, etc.)</li>
                <li>Optional sections that provide supplementary information</li>
              </ul>
              <p>
                By implementing an LLMs.txt file, you make your website more accessible to AI systems, ensuring they can provide more accurate information about your content to users.
              </p>
            </div>
            
            <button 
              onClick={() => setShowMoreInfo(!showMoreInfo)}
              className="text-primary-main hover:text-primary-dark font-medium flex items-center"
            >
              {showMoreInfo ? (
                <>
                  Show Less
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
            
            <div className="bg-primary-main/5 rounded-lg p-4 mt-6">
              <h3 className="font-semibold mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Important Notes:
              </h3>
              <ul className="list-disc list-inside text-text-secondary space-y-1">
                <li>Your LLMs.txt file should be placed at the root of your website (e.g., https://example.com/llms.txt).</li>
                <li>You can also create an LLMs-full.txt file that contains all your content in one document (for smaller sites).</li>
                <li>Consider what information is most valuable for AI models to understand about your site.</li>
                <li>Keep your LLMs.txt file updated as your website content changes.</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold mb-4">LLMs.txt Generator</h2>
                  
                  {/* Iframe with the external tool */}
                  <div className="w-full overflow-hidden rounded-lg border border-gray-200">
                    <iframe 
                      src="https://llmstxt-nextjs.vercel.app/" 
                      width="100%" 
                      height={iframeHeight} 
                      className="border-0"
                      title="LLMs.txt Generator"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold mb-4">Usage Guide</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Step 1: Enter your website URL</h3>
                        <p className="text-text-secondary">
                          Provide your website's URL in the generator to begin creating your LLMs.txt file.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Step 2: Customize your file</h3>
                        <p className="text-text-secondary">
                          Review and edit the content to make sure it accurately represents your site's structure and important information.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Step 3: Generate and download</h3>
                        <p className="text-text-secondary">
                          Once you're satisfied with the content, generate the final LLMs.txt file and download it.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Step 4: Upload to your website</h3>
                        <p className="text-text-secondary">
                          Upload the generated file to your website's root directory so it's accessible at yourdomain.com/llms.txt.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50">
                    <h3 className="font-semibold mb-2">Example LLMs.txt Format</h3>
                    <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-auto max-h-[300px]">
{`# Website Name

> Brief description of what your website or project is about.

Additional context and important information about your site.

## Core Documentation
- [Getting Started](/docs/getting-started.md): How to begin using our product
- [API Reference](/docs/api-reference.md): Complete API documentation

## Guides
- [Common Use Cases](/guides/use-cases.md): Popular ways to use our product
- [Tutorials](/guides/tutorials.md): Step-by-step instructions

## Optional
- [FAQ](/faq.md): Frequently asked questions
- [Release Notes](/releases.md): Product update history`}
                    </pre>
                    
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
          
          {/* Best Practices Section */}
          <div className="mt-12 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">LLMs.txt Best Practices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Do:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Provide a clear, concise summary of your website's purpose</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Include links to your most important content with brief descriptions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Use a clear, logical structure with appropriate Markdown headers</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Regularly update your LLMs.txt file as your website changes</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Don't:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Include every page on your website—focus on what's most important</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Use complex or technical jargon without explanation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Rely solely on LLMs.txt for content discovery by AI models</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Include sensitive or confidential information not meant for public access</span>
                  </li>
                </ul>
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
                  Need Help With AI-Enhanced SEO?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Our AI optimization experts can help prepare your website for both traditional search engines and AI platforms.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button 
                  href="/services/ai-enhanced-seo" 
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

export default LLMsTxtGenerator;