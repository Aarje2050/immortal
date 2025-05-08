"use client";

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// Define types for the audit results
interface AuditResultCategory {
  name: string;
  score: number;
  description: string;
  issues: {
    title: string;
    description: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    aiImpact: 'high' | 'medium' | 'low';
    recommendation: string;
  }[];
}

interface AuditResult {
  url: string;
  overallScore: number;
  scoreDescription: string;
  categories: AuditResultCategory[];
  timestamp: string;
}

const AIAuditTool: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/ai-seo-audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze website');
      }
      
      const data = await response.json();
      setAuditResult(data);
      setActiveCategory('all');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackgroundColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAIImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-purple-100 text-purple-800';
      case 'medium': return 'bg-indigo-100 text-indigo-800';
      case 'low': return 'bg-slate-100 text-slate-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter issues based on active category
  const getFilteredIssues = () => {
    if (!auditResult) return [];
    
    if (activeCategory === 'all') {
      return auditResult.categories.flatMap(category => 
        category.issues.map(issue => ({
          ...issue,
          category: category.name
        }))
      );
    }
    
    return auditResult.categories
      .filter(category => category.name === activeCategory)
      .flatMap(category => 
        category.issues.map(issue => ({
          ...issue,
          category: category.name
        }))
      );
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
                SEO Tools
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                AI-Powered <span className="text-yellow-300">SEO Audit</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Get comprehensive SEO insights in seconds with our advanced AI analysis engine.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Tool Section */}
      <Section>
        <Container>
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Analyze Your Website</h2>
              <p className="text-text-secondary mb-6">
                Our AI-powered tool analyzes your website for SEO performance across technical, content, and semantic factors, providing instant actionable insights.
              </p>
              
              <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-grow">
                    <input
                      type="url"
                      placeholder="Enter website URL (e.g., https://example.com)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="px-8 py-3 text-center whitespace-nowrap"
                  >
                    {loading ? 'Analyzing...' : 'Analyze Now'}
                  </Button>
                </div>
              </form>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                  <p className="font-medium">Error</p>
                  <p>{error}</p>
                </div>
              )}

              {loading && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-main mb-4"></div>
                  <p className="text-lg font-medium">Analyzing your website...</p>
                  <p className="text-text-secondary">This may take up to 30 seconds</p>
                </div>
              )}
            </div>
          </div>
          
                    {/* Audit Results */}
                    {auditResult && !loading && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Score Overview */}
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-100 text-center">
                      <h2 className="text-xl font-bold mb-3">SEO Health Score</h2>
                      
                      <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBackgroundColor(auditResult.overallScore)} mb-4`}>
                        <span className={`text-4xl font-bold ${getScoreColor(auditResult.overallScore)}`}>
                          {auditResult.overallScore}
                        </span>
                      </div>
                      
                      <p className={`text-lg font-medium ${getScoreColor(auditResult.overallScore)} mb-1`}>
                        {auditResult.scoreDescription}
                      </p>
                      <p className="text-sm text-gray-500">
                        Analysis completed on {new Date(auditResult.timestamp).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="font-semibold mb-4">Category Scores</h3>
                      
                      <div className="space-y-4">
                        {auditResult.categories.map((category, index) => (
                          <div key={index} className="group">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-text-secondary group-hover:text-primary-main transition-colors">
                                {category.name}
                              </span>
                              <span className={`text-sm font-medium ${getScoreColor(category.score)}`}>
                                {category.score}/100
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  category.score >= 80 ? 'bg-green-500' :
                                  category.score >= 60 ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}
                                style={{width: `${category.score}%`}}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-semibold mb-4">Filter Issues By Category</h3>
                      
                      <div className="space-y-2">
                        <button
                          className={`w-full py-2 px-4 text-left rounded-lg text-sm font-medium transition-colors ${
                            activeCategory === 'all'
                              ? 'bg-primary-main text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          onClick={() => setActiveCategory('all')}
                        >
                          All Issues
                        </button>
                        
                        {auditResult.categories.map((category, index) => (
                          <button
                            key={index}
                            className={`w-full py-2 px-4 text-left rounded-lg text-sm font-medium transition-colors ${
                              activeCategory === category.name
                                ? 'bg-primary-main text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            onClick={() => setActiveCategory(category.name)}
                          >
                            {category.name} ({category.issues.length})
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Issues & Recommendations */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold mb-2">
                      {activeCategory === 'all' ? 'All Issues & Recommendations' : `${activeCategory} Issues`}
                    </h2>
                    <p className="text-text-secondary">
                      {getFilteredIssues().length} items found. Fix these issues to improve your SEO performance.
                    </p>
                  </div>
                  
                  <div className="p-6">
                    {getFilteredIssues().length === 0 ? (
                      <div className="text-center py-8">
                        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No issues found in this category</h3>
                        <p className="text-gray-500">Great work! Your website is performing well in this area.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {getFilteredIssues().map((issue, index) => (
                          <div 
                            key={index}
                            className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors"
                          >
                            <div className="flex flex-wrap gap-2 mb-3">
                              {activeCategory === 'all' && (
                                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  {issue.category}
                                </span>
                              )}
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                                {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                              </span>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getAIImpactColor(issue.aiImpact)}`}>
                                AI Impact: {issue.aiImpact.charAt(0).toUpperCase() + issue.aiImpact.slice(1)}
                              </span>
                            </div>
                            
                            <h3 className="text-lg font-semibold mb-2">{issue.title}</h3>
                            <p className="text-text-secondary mb-4">{issue.description}</p>
                            
                            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                              <h4 className="font-medium text-green-800 mb-2">Recommendation:</h4>
                              <p className="text-green-700">{issue.recommendation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Download Report Button */}
                <div className="mt-6 text-center">
                  <Button 
                    variant="secondary"
                    className="font-medium"
                    onClick={() => {
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditResult, null, 2));
                      const downloadAnchorNode = document.createElement('a');
                      downloadAnchorNode.setAttribute("href", dataStr);
                      downloadAnchorNode.setAttribute("download", `seo-audit-${auditResult.url.replace(/https?:\/\//i, '').replace(/[^a-z0-9]/gi, '-')}-${new Date().toISOString().split('T')[0]}.json`);
                      document.body.appendChild(downloadAnchorNode);
                      downloadAnchorNode.click();
                      downloadAnchorNode.remove();
                    }}
                  >
                    <svg className="w-5 h-5 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Full Report
                  </Button>
                </div>
              </div>
            {/* </div>
          )} */}
            </div>
          )}
          {/* Tool Features Section */}
          {!auditResult && !loading && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold mb-2">What Our AI-Powered SEO Audit Analyzes</h2>
                <p className="text-text-secondary">
                  Get comprehensive insights across all critical SEO factors with advanced AI analysis.
                </p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-5 rounded-lg border border-gray-200 hover:border-primary-light transition-colors">
                    <div className="w-12 h-12 bg-primary-main/10 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Technical SEO</h3>
                    <p className="text-text-secondary">
                      Analysis of crawlability, indexability, site structure, speed, and mobile-friendliness.
                    </p>
                  </div>
                  
                  <div className="p-5 rounded-lg border border-gray-200 hover:border-primary-light transition-colors">
                    <div className="w-12 h-12 bg-primary-main/10 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Content Quality</h3>
                    <p className="text-text-secondary">
                      Evaluation of content depth, relevance, readability, and keyword optimization.
                    </p>
                  </div>
                  
                  <div className="p-5 rounded-lg border border-gray-200 hover:border-primary-light transition-colors">
                    <div className="w-12 h-12 bg-primary-main/10 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
                    <p className="text-text-secondary">
                      Assessment of loading speed, Core Web Vitals, and performance optimization.
                    </p>
                  </div>
                  
                  <div className="p-5 rounded-lg border border-gray-200 hover:border-primary-light transition-colors">
                    <div className="w-12 h-12 bg-primary-main/10 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">On-Page Factors</h3>
                    <p className="text-text-secondary">
                      Analysis of meta tags, headings, internal linking, and URL structure.
                    </p>
                  </div>
                  
                  <div className="p-5 rounded-lg border border-gray-200 hover:border-primary-light transition-colors">
                    <div className="w-12 h-12 bg-primary-main/10 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Semantic Optimization</h3>
                    <p className="text-text-secondary">
                      Review of entity optimization, schema markup, and AI-friendliness.
                    </p>
                  </div>
                  
                  <div className="p-5 rounded-lg border border-gray-200 hover:border-primary-light transition-colors">
                    <div className="w-12 h-12 bg-primary-main/10 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Competitive Analysis</h3>
                    <p className="text-text-secondary">
                      Benchmark against competitors and industry standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="primary">
        <Container>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Need Advanced SEO Solutions?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Get expert help implementing the recommendations from your audit. Our team specializes in AI-optimized SEO strategies.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button 
                  href="/contact?ref=ai-audit-tool" 
                  variant="secondary" 
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default AIAuditTool