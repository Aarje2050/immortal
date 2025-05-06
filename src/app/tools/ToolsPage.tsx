"use client";

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// Define types for our tools
interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'available' | 'coming-soon';
  category: 'content' | 'technical' | 'analysis' | 'ai';
  url: string;
}

const ToolsPage: React.FC = () => {
  // State for category filtering
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Tools data
  const tools: Tool[] = [
    {
      id: 'seo-cost-calculator',
      name: 'Free SEO Cost Calculator',
      description: 'Free SEO Cost Calculator tool that helps users estimate their SEO costs across various industries.',
      icon: '🤖',
      status: 'available',
      category: 'technical',
      url: '/tools/seo-cost-calculator'
    },
    {
      id: 'llms-txt',
      name: 'LLMs.txt Generator',
      description: 'Create an LLMs.txt file to help AI models better understand and navigate your website content.',
      icon: '🧠',
      status: 'available',
      category: 'ai',
      url: '/tools/llms-txt-generator'
    },
    {
      id: 'robots-txt',
      name: 'Robots.txt Generator',
      description: 'Create a properly formatted robots.txt file customized for your website needs with our easy-to-use generator.',
      icon: '🤖',
      status: 'available',
      category: 'technical',
      url: '/tools/robots-txt-generator'
    },
    {
      id: 'schema-markup',
      name: 'Schema Markup Generator',
      description: 'Generate structured data markup (JSON-LD) for better search engine understanding of your content.',
      icon: '📝',
      status: 'available',
      category: 'technical',
      url: '/tools/schema-generator'
    },
    {
      id: 'meta-tags',
      name: 'Meta Tags Generator',
      description: 'Create optimized title tags and meta descriptions for better click-through rates from search results.',
      icon: '🏷️',
      status: 'available',
      category: 'content',
      url: '/tools/meta-tags-generator'
    },
    {
      id: 'keyword-research',
      name: 'Keyword Research Tool',
      description: 'Discover valuable keywords for your content with search volume estimates and difficulty scores.',
      icon: '🔍',
      status: 'coming-soon',
      category: 'content',
      url: '/tools/keyword-research'
    },
    {
      id: 'content-analyzer',
      name: 'AI Content Analyzer',
      description: 'Analyze your content for AI search optimization opportunities and get recommendations for improvement.',
      icon: '🧠',
      status: 'coming-soon',
      category: 'ai',
      url: '/tools/content-analyzer'
    },
    {
      id: 'seo-audit',
      name: 'SEO Audit Checklist',
      description: 'Comprehensive checklist to audit your website for common SEO issues and improvement opportunities.',
      icon: '📋',
      status: 'available',
      category: 'analysis',
      url: '/tools/seo-audit-checklist'
    },
    {
      id: 'image-optimizer',
      name: 'Image SEO Optimizer',
      description: 'Optimize your image alt text and filenames for better search engine visibility.',
      icon: '🖼️',
      status: 'coming-soon',
      category: 'content',
      url: '/tools/image-optimizer'
    },
    {
      id: 'citation-generator',
      name: 'Local Citation Generator',
      description: 'Generate consistent NAP (Name, Address, Phone) information for local business listings.',
      icon: '📍',
      status: 'coming-soon',
      category: 'technical',
      url: '/tools/citation-generator'
    },
    {
      id: 'ai-prompt-generator',
      name: 'AI Prompt Generator',
      description: 'Create effective prompts for AI platforms to ensure your content gets properly cited and referenced.',
      icon: '💬',
      status: 'coming-soon',
      category: 'ai',
      url: '/tools/ai-prompt-generator'
    },
    {
      id: 'title-generator',
      name: 'Blog Title Generator',
      description: 'Generate engaging, SEO-friendly blog titles that attract both readers and search engines.',
      icon: '✏️',
      status: 'coming-soon',
      category: 'content',
      url: '/tools/title-generator'
    },
    {
      id: 'text-readability',
      name: 'Readability Analyzer',
      description: 'Check the readability score of your content and get suggestions for improvement.',
      icon: '📖',
      status: 'coming-soon',
      category: 'content',
      url: '/tools/readability'
    },
    {
      id: 'sitemap-generator',
      name: 'XML Sitemap Generator',
      description: 'Create a comprehensive XML sitemap for your website to improve search engine crawling.',
      icon: '🗺️',
      status: 'coming-soon',
      category: 'technical',
      url: '/tools/sitemap-generator'
    }
  ];

  // Filter tools based on active category
  const filteredTools = activeCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  // Get available tools count
  const availableToolsCount = tools.filter(tool => tool.status === 'available').length;
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Tools', icon: '🧰' },
    { id: 'content', name: 'Content Tools', icon: '📄' },
    { id: 'technical', name: 'Technical SEO', icon: '⚙️' },
    { id: 'analysis', name: 'Analysis Tools', icon: '📊' },
    { id: 'ai', name: 'AI Optimization', icon: '🤖' }
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
                Free SEO Resources
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                ImmortalSEO <span className="text-yellow-300">Toolbox</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Free tools to help you optimize your website for both traditional search engines and AI platforms.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  href="#tools"
                  variant="secondary"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Explore Tools
                </Button>
                <Button
                  href="/contact"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10 px-8"
                >
                  Request a Tool
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tools Section */}
      <Section id="tools">
        <Container>
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">
              SEO Toolbox
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Free SEO Tools & Resources
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              {availableToolsCount} tools available now, with more coming soon to help you improve your search visibility.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all flex items-center ${
                  activeCategory === category.id
                    ? 'bg-primary-main text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-text-secondary'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:translate-y-[-5px] group ${
                  tool.status === 'coming-soon' ? 'opacity-70' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary-main/10 text-primary-main text-2xl">
                    {tool.icon}
                  </div>
                  {tool.status === 'coming-soon' && (
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-main transition-colors">
                  {tool.name}
                </h3>
                <p className="text-text-secondary mb-5">{tool.description}</p>
                {tool.status === 'available' ? (
                  <Link 
                    href={tool.url}
                    className="inline-flex items-center text-primary-main font-medium hover:text-primary-dark" 
                  >
                    Use Tool
                    <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                ) : (
                  <button
                    className="inline-flex items-center text-gray-400 font-medium cursor-not-allowed"
                    disabled
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {/* Empty state if no tools match filter */}
          {filteredTools.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold mb-2">No tools found</h3>
              <p className="text-text-secondary mb-6">
                We couldn't find any tools matching your current filter.
              </p>
              <Button
                onClick={() => setActiveCategory('all')}
                variant="primary"
              >
                View All Tools
              </Button>
            </div>
          )}
        </Container>
      </Section>

      {/* Why Use Our Tools Section */}
      <Section background="light">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Why Our Tools</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Built by SEO Experts for Real Results
              </h2>
              <p className="text-lg text-text-secondary mb-6">
                Our tools are developed by the same experts who have been optimizing websites since 2008. We've incorporated our deep knowledge of both traditional and AI search algorithms to create tools that deliver real-world results.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                    🔄
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Regularly Updated</h3>
                    <p className="text-text-secondary">Our tools are continuously updated to reflect the latest algorithm changes and SEO best practices.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                    🤖
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">AI-Enhanced Features</h3>
                    <p className="text-text-secondary">Many of our tools include AI-optimization features to help your content perform well in both traditional and AI search platforms.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                    🔒
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Privacy First</h3>
                    <p className="text-text-secondary">Your data stays private. We don't store your inputs or outputs unless you explicitly save them to your account.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main text-white flex items-center justify-center text-xl mr-4">
                    💯
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Actually Free</h3>
                    <p className="text-text-secondary">No hidden fees, no forced sign-ups, and no usage limits on our free tools.</p>
                  </div>
                </div>
              </div>
              
              <Button 
                href="/services" 
                variant="primary"
                className="hover:shadow-lg transition-shadow"
              >
                See Our Professional Services
              </Button>
            </div>
            
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-primary-main/5 rounded-full blur-3xl"></div>
              
              {/* Testimonial cards */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-main/10 flex items-center justify-center text-lg font-bold text-primary-main mr-4">
                      M
                    </div>
                    <div>
                      <h5 className="font-semibold">Mark Thompson</h5>
                      <p className="text-sm text-text-secondary">E-commerce Store Owner</p>
                    </div>
                  </div>
                  <p className="italic text-text-secondary">"The Robots.txt Generator simplified what would have been a complex technical task. I was able to properly configure my file in minutes instead of hours of research."</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md ml-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-main/10 flex items-center justify-center text-lg font-bold text-primary-main mr-4">
                      S
                    </div>
                    <div>
                      <h5 className="font-semibold">Sarah Rodriguez</h5>
                      <p className="text-sm text-text-secondary">Digital Marketing Manager</p>
                    </div>
                  </div>
                  <p className="italic text-text-secondary">"The Schema Generator has been a game-changer for our rich snippets in search results. We've seen a significant increase in CTR since implementing the markup."</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-main/10 flex items-center justify-center text-lg font-bold text-primary-main mr-4">
                      J
                    </div>
                    <div>
                      <h5 className="font-semibold">James Wilson</h5>
                      <p className="text-sm text-text-secondary">Small Business Owner</p>
                    </div>
                  </div>
                  <p className="italic text-text-secondary">"As someone new to SEO, these tools made it accessible. The interface is intuitive, and the explanations helped me understand why each optimization matters."</p>
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
              Common questions about our SEO tools
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                {
                  question: "Are these tools really free to use?",
                  answer: "Yes, all tools listed on this page are completely free to use without any usage limits. We may offer premium versions with additional features in the future, but the core functionality will always remain free."
                },
                {
                  question: "Do I need to create an account to use the tools?",
                  answer: "No, you can use our tools without creating an account. However, creating a free account allows you to save your generated content and settings for future reference."
                },
                {
                  question: "How often are the tools updated?",
                  answer: "We update our tools regularly to reflect the latest SEO best practices and algorithm changes. Major updates are announced on our blog and newsletter."
                },
                {
                  question: "Can I suggest a new tool to be added?",
                  answer: "Absolutely! We welcome suggestions for new tools that would help the SEO community. Please use our contact form to share your ideas."
                },
                {
                  question: "Are these tools suitable for beginners?",
                  answer: "Yes, we've designed our tools to be user-friendly for SEO beginners while still providing value to experienced professionals. Each tool includes explanations and best practice recommendations."
                }
              ].map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
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

      {/* CTA Section */}
      <Section background="primary">
        <Container>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Need More Advanced SEO Solutions?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Our professional SEO services provide customized strategies tailored to your business goals and industry challenges.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button 
                  href="/services" 
                  variant="secondary" 
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Explore Our Services
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default ToolsPage;