"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';

interface RobotRule {
  userAgent: string;
  allow: string[];
  disallow: string[];
}

interface SitemapEntry {
  url: string;
}

const RobotsTxtGenerator: React.FC = () => {
  // Default state with common examples
  const [rules, setRules] = useState<RobotRule[]>([
    {
      userAgent: '*',
      allow: [],
      disallow: []
    }
  ]);
  
  const [sitemaps, setSitemaps] = useState<SitemapEntry[]>([
    { url: '' }
  ]);
  
  const [crawlDelay, setCrawlDelay] = useState<string>('');
  const [hostDirective, setHostDirective] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  
  // Predefined templates for common scenarios
  const templates = [
    {
      name: 'Allow All',
      rules: [
        {
          userAgent: '*',
          allow: ['/'],
          disallow: []
        }
      ],
      sitemaps: [{ url: 'https://example.com/sitemap.xml' }],
      crawlDelay: '',
      hostDirective: ''
    },
    {
      name: 'Block All',
      rules: [
        {
          userAgent: '*',
          allow: [],
          disallow: ['/']
        }
      ],
      sitemaps: [],
      crawlDelay: '',
      hostDirective: ''
    },
    {
      name: 'Standard Blog',
      rules: [
        {
          userAgent: '*',
          allow: [],
          disallow: [
            '/wp-admin/',
            '/wp-includes/',
            '/search',
            '/tag/',
            '/author/',
            '*/trackback/',
            '*/feed/'
          ]
        }
      ],
      sitemaps: [{ url: 'https://example.com/sitemap.xml' }],
      crawlDelay: '10',
      hostDirective: 'example.com'
    },
    {
      name: 'E-commerce',
      rules: [
        {
          userAgent: '*',
          allow: [],
          disallow: [
            '/cart/',
            '/checkout/',
            '/my-account/',
            '/search',
            '/tag/',
            '/customer-service/',
            '/*?sort=',
            '/*?filter='
          ]
        }
      ],
      sitemaps: [
        { url: 'https://example.com/product-sitemap.xml' },
        { url: 'https://example.com/category-sitemap.xml' }
      ],
      crawlDelay: '5',
      hostDirective: 'example.com'
    },
  ];
  
  // Handlers for user interactions
  const addRule = () => {
    setRules([...rules, { userAgent: '', allow: [], disallow: [] }]);
  };
  
  const removeRule = (index: number) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };
  
  const updateUserAgent = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index].userAgent = value;
    setRules(newRules);
  };
  
  const addAllow = (ruleIndex: number) => {
    const newRules = [...rules];
    newRules[ruleIndex].allow.push('');
    setRules(newRules);
  };
  
  const updateAllow = (ruleIndex: number, allowIndex: number, value: string) => {
    const newRules = [...rules];
    newRules[ruleIndex].allow[allowIndex] = value;
    setRules(newRules);
  };
  
  const removeAllow = (ruleIndex: number, allowIndex: number) => {
    const newRules = [...rules];
    newRules[ruleIndex].allow.splice(allowIndex, 1);
    setRules(newRules);
  };
  
  const addDisallow = (ruleIndex: number) => {
    const newRules = [...rules];
    newRules[ruleIndex].disallow.push('');
    setRules(newRules);
  };
  
  const updateDisallow = (ruleIndex: number, disallowIndex: number, value: string) => {
    const newRules = [...rules];
    newRules[ruleIndex].disallow[disallowIndex] = value;
    setRules(newRules);
  };
  
  const removeDisallow = (ruleIndex: number, disallowIndex: number) => {
    const newRules = [...rules];
    newRules[ruleIndex].disallow.splice(disallowIndex, 1);
    setRules(newRules);
  };
  
  const addSitemap = () => {
    setSitemaps([...sitemaps, { url: '' }]);
  };
  
  const updateSitemap = (index: number, value: string) => {
    const newSitemaps = [...sitemaps];
    newSitemaps[index].url = value;
    setSitemaps(newSitemaps);
  };
  
  const removeSitemap = (index: number) => {
    const newSitemaps = [...sitemaps];
    newSitemaps.splice(index, 1);
    setSitemaps(newSitemaps);
  };
  
  const applyTemplate = (templateIndex: number) => {
    const template = templates[templateIndex];
    setRules(template.rules);
    setSitemaps(template.sitemaps);
    setCrawlDelay(template.crawlDelay);
    setHostDirective(template.hostDirective);
  };
  
  // Generate the robots.txt content
  const generateRobotsTxt = () => {
    let output = '';
    
    // Add user-agent rules
    rules.forEach(rule => {
      if (rule.userAgent) {
        output += `User-agent: ${rule.userAgent}\n`;
        
        // Add allow directives
        rule.allow.forEach(allow => {
          if (allow) {
            output += `Allow: ${allow}\n`;
          }
        });
        
        // Add disallow directives
        rule.disallow.forEach(disallow => {
          if (disallow) {
            output += `Disallow: ${disallow}\n`;
          }
        });
        
        // Add crawl delay if specified
        if (crawlDelay && rule.userAgent !== '') {
          output += `Crawl-delay: ${crawlDelay}\n`;
        }
        
        output += '\n';
      }
    });
    
    // Add host directive if specified
    if (hostDirective) {
      output += `Host: ${hostDirective}\n\n`;
    }
    
    // Add sitemaps
    sitemaps.forEach(sitemap => {
      if (sitemap.url) {
        output += `Sitemap: ${sitemap.url}\n`;
      }
    });
    
    setGeneratedCode(output);
  };
  
  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // Trigger generation when form values change
  useEffect(() => {
    generateRobotsTxt();
  }, [rules, sitemaps, crawlDelay, hostDirective]);
  
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
                Robots.txt <span className="text-yellow-300">Generator</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Create a properly formatted robots.txt file to control how search engines crawl your website.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Tool Section */}
      <Section>
        <Container>
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">What is a robots.txt file?</h2>
            <p className="text-text-secondary mb-4">
              A robots.txt file tells search engine crawlers which pages or files the crawler can or can't request from your site. This is used mainly to avoid overloading your site with requests.
            </p>
            <p className="text-text-secondary mb-4">
              While robots.txt can be used to keep a web page out of Google, it's not a reliable method for preventing indexing. To keep a page out of Google, use more comprehensive methods like password protection or a noindex directive.
            </p>
            <div className="bg-primary-main/5 rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Important Notes:
              </h3>
              <ul className="list-disc list-inside text-text-secondary space-y-1">
                <li>Your robots.txt file should be placed at the root of your website (e.g., https://example.com/robots.txt).</li>
                <li>Different crawlers might interpret the rules differently, so be specific in your directives.</li>
                <li>For more advanced control, consider using meta robots tags or the X-Robots-Tag HTTP header.</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold mb-4">Robots.txt Generator</h2>
                  
                  {/* Templates Section */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Quick Templates:</h3>
                    <div className="flex flex-wrap gap-2">
                      {templates.map((template, index) => (
                        <button
                          key={index}
                          onClick={() => applyTemplate(index)}
                          className="px-4 py-2 rounded-md bg-primary-main/10 text-primary-main hover:bg-primary-main/20 transition-colors"
                        >
                          {template.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* User-Agent Rules */}
                  <div className="space-y-6 mb-6">
                    <h3 className="text-lg font-semibold">User-Agent Rules:</h3>
                    
                    {rules.map((rule, ruleIndex) => (
                      <div key={ruleIndex} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <label className="font-medium mr-2">User-agent:</label>
                            <input
                              type="text"
                              value={rule.userAgent}
                              onChange={(e) => updateUserAgent(ruleIndex, e.target.value)}
                              placeholder="e.g., * or Googlebot"
                              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                            />
                          </div>
                          
                          {rules.length > 1 && (
                            <button
                              onClick={() => removeRule(ruleIndex)}
                              className="text-red-500 hover:text-red-700"
                              title="Remove rule"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                        
                        {/* Allow Directives */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">Allow:</h4>
                            <button
                              onClick={() => addAllow(ruleIndex)}
                              className="text-primary-main hover:text-primary-dark text-sm flex items-center"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                              Add Allow
                            </button>
                          </div>
                          
                          {rule.allow.length === 0 ? (
                            <div className="text-gray-400 text-sm italic">No allow directives</div>
                          ) : (
                            <div className="space-y-2">
                              {rule.allow.map((allow, allowIndex) => (
                                <div key={allowIndex} className="flex items-center">
                                  <input
                                    type="text"
                                    value={allow}
                                    onChange={(e) => updateAllow(ruleIndex, allowIndex, e.target.value)}
                                    placeholder="e.g., /allowed-directory/"
                                    className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                                  />
                                  <button
                                    onClick={() => removeAllow(ruleIndex, allowIndex)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                    title="Remove allow directive"
                                  >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Disallow Directives */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">Disallow:</h4>
                            <button
                              onClick={() => addDisallow(ruleIndex)}
                              className="text-primary-main hover:text-primary-dark text-sm flex items-center"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                              Add Disallow
                            </button>
                          </div>
                          
                          {rule.disallow.length === 0 ? (
                            <div className="text-gray-400 text-sm italic">No disallow directives</div>
                          ) : (
                            <div className="space-y-2">
                              {rule.disallow.map((disallow, disallowIndex) => (
                                <div key={disallowIndex} className="flex items-center">
                                  <input
                                    type="text"
                                    value={disallow}
                                    onChange={(e) => updateDisallow(ruleIndex, disallowIndex, e.target.value)}
                                    placeholder="e.g., /admin/"
                                    className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                                  />
                                  <button
                                    onClick={() => removeDisallow(ruleIndex, disallowIndex)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                    title="Remove disallow directive"
                                  >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <button
                      onClick={addRule}
                      className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-primary-main hover:border-primary-main transition-colors"
                    >
                      <svg className="w-5 h-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Another User-agent Rule
                    </button>
                  </div>
                  
                  {/* Additional Options */}
                  <div className="space-y-6">
                    {/* Sitemaps */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Sitemaps:</h3>
                      
                      {sitemaps.map((sitemap, sitemapIndex) => (
                        <div key={sitemapIndex} className="flex items-center mb-2">
                          <input
                            type="text"
                            value={sitemap.url}
                            onChange={(e) => updateSitemap(sitemapIndex, e.target.value)}
                            placeholder="e.g., https://example.com/sitemap.xml"
                            className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                          />
                          <button
                            onClick={() => removeSitemap(sitemapIndex)}
                            className="ml-2 text-red-500 hover:text-red-700"
                            title="Remove sitemap"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      
                      <button
                        onClick={addSitemap}
                        className="text-primary-main hover:text-primary-dark text-sm flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Sitemap
                      </button>
                    </div>
                    
                    {/* Crawl Delay */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Crawl Delay (Optional):</h3>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={crawlDelay}
                          onChange={(e) => setCrawlDelay(e.target.value)}
                          placeholder="e.g., 10"
                          className="w-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                        />
                        <span className="ml-2 text-gray-500">seconds</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Note: Crawl-delay is not supported by all search engines.
                      </p>
                    </div>
                    
                    {/* Host Directive */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Host Directive (Optional):</h3>
                      <input
                        type="text"
                        value={hostDirective}
                        onChange={(e) => setHostDirective(e.target.value)}
                        placeholder="e.g., example.com"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Note: Host directive is primarily used by Yandex.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Generated Code Output */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">Generated Code</h2>
                      <button
                        onClick={copyToClipboard}
                        className="text-primary-main hover:text-primary-dark flex items-center"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <span className="text-green-500 flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                          </span>
                        )}
                      </button>
                    </div>
                    
                    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-auto max-h-[500px]">
                      <pre>{generatedCode || '# Your robots.txt will appear here'}</pre>
                    </div>
                    
                    <div className="mt-4">
                      <a
                        href={`data:text/plain;charset=utf-8,${encodeURIComponent(generatedCode)}`}
                        download="robots.txt"
                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download robots.txt
                      </a>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50">
                    <h3 className="font-semibold mb-2">Next Steps:</h3>
                    <ol className="list-decimal list-inside text-text-secondary space-y-2">
                      <li>Download the generated robots.txt file</li>
                      <li>Upload it to the root directory of your website</li>
                      <li>Verify it works by visiting yourdomain.com/robots.txt</li>
                      <li>Test your robots.txt using Google Search Console</li>
                    </ol>
                    
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
          
          {/* SEO Best Practices */}
          <div className="mt-12 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Robots.txt Best Practices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Do:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Use robots.txt to prevent crawler overload and exclude non-public parts of your site</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Include sitemap URL(s) in your robots.txt file</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Be specific with your directives and user-agents</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Test your robots.txt file using Google Search Console</span>
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
                    <span>Rely solely on robots.txt for content security or preventing indexing</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Block CSS and JavaScript files that help search engines render your pages</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Use complex regular expressions that might confuse crawlers</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Block important pages that should be indexed and discoverable</span>
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
                  Need Help With Technical SEO?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Our technical SEO experts can help optimize your website's structure for better crawling, indexing, and ranking.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button 
                  href="/services/technical-seo" 
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

export default RobotsTxtGenerator;
