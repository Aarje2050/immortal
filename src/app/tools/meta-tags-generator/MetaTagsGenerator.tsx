"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// Define types with refined error structure
interface MetaTags {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  canonical: string;
  robots: string;
}

// Enhanced error type to support warnings
interface ValidationMessage {
  message: string;
  type: 'error' | 'warning';
}

const MetaTagsGenerator: React.FC = () => {
  // State for form inputs
  const [metaTags, setMetaTags] = useState<MetaTags>({
    title: '',
    description: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogUrl: '',
    twitterCard: 'summary_large_image',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    canonical: '',
    robots: 'index, follow'
  });
  
  // State for generated tags
  const [generatedHTML, setGeneratedHTML] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, ValidationMessage>>({});
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'standard' | 'social' | 'advanced' | 'preview'>('standard');
  const [previewType, setPreviewType] = useState<'google' | 'facebook' | 'twitter'>('google');
  
  // Recommended character limits
  const maxLengths = {
    title: 60,
    description: 160,
    ogTitle: 95, // Facebook allows longer titles
    ogDescription: 200,
    twitterTitle: 70,
    twitterDescription: 200
  };
  
  // Auto-populate social fields when standard fields change
  useEffect(() => {
    if (metaTags.title && !metaTags.ogTitle) {
      setMetaTags(prev => ({...prev, ogTitle: prev.title}));
    }
    if (metaTags.title && !metaTags.twitterTitle) {
      setMetaTags(prev => ({...prev, twitterTitle: prev.title}));
    }
    if (metaTags.description && !metaTags.ogDescription) {
      setMetaTags(prev => ({...prev, ogDescription: prev.description}));
    }
    if (metaTags.description && !metaTags.twitterDescription) {
      setMetaTags(prev => ({...prev, twitterDescription: prev.description}));
    }
    
    // Validate in real-time
    validateFieldLengths();
  }, [metaTags]);
  
  // Handle input changes
  const handleInputChange = (name: keyof MetaTags, value: string) => {
    setMetaTags(prev => ({...prev, [name]: value}));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Real-time validation for field lengths
  const validateFieldLengths = () => {
    const newErrors: Record<string, ValidationMessage> = { ...errors };
    
    // Check title length
    if (metaTags.title && metaTags.title.length > maxLengths.title) {
      newErrors.title = { 
        message: `Exceeds recommended ${maxLengths.title} characters - may be truncated in search results`,
        type: 'warning'
      };
    } else if (newErrors.title && newErrors.title.type === 'warning') {
      delete newErrors.title;
    }
    
    // Check description length
    if (metaTags.description && metaTags.description.length > maxLengths.description) {
      newErrors.description = {
        message: `Exceeds recommended ${maxLengths.description} characters - may be truncated in search results`,
        type: 'warning'
      };
    } else if (newErrors.description && newErrors.description.type === 'warning') {
      delete newErrors.description;
    }
    
    // Similar checks for other fields
    if (metaTags.ogTitle && metaTags.ogTitle.length > maxLengths.ogTitle) {
      newErrors.ogTitle = {
        message: `Exceeds recommended ${maxLengths.ogTitle} characters for Facebook`,
        type: 'warning'
      };
    } else if (newErrors.ogTitle && newErrors.ogTitle.type === 'warning') {
      delete newErrors.ogTitle;
    }
    
    if (metaTags.ogDescription && metaTags.ogDescription.length > maxLengths.ogDescription) {
      newErrors.ogDescription = {
        message: `Exceeds recommended ${maxLengths.ogDescription} characters for Facebook`,
        type: 'warning'
      };
    } else if (newErrors.ogDescription && newErrors.ogDescription.type === 'warning') {
      delete newErrors.ogDescription;
    }
    
    if (metaTags.twitterTitle && metaTags.twitterTitle.length > maxLengths.twitterTitle) {
      newErrors.twitterTitle = {
        message: `Exceeds recommended ${maxLengths.twitterTitle} characters for Twitter`,
        type: 'warning'
      };
    } else if (newErrors.twitterTitle && newErrors.twitterTitle.type === 'warning') {
      delete newErrors.twitterTitle;
    }
    
    if (metaTags.twitterDescription && metaTags.twitterDescription.length > maxLengths.twitterDescription) {
      newErrors.twitterDescription = {
        message: `Exceeds recommended ${maxLengths.twitterDescription} characters for Twitter`,
        type: 'warning'
      };
    } else if (newErrors.twitterDescription && newErrors.twitterDescription.type === 'warning') {
      delete newErrors.twitterDescription;
    }
    
    setErrors(newErrors);
  };
  
  // Validate form inputs
  const validateForm = (): boolean => {
    const newErrors: Record<string, ValidationMessage> = {};
    let isValid = true;
    
    // Required fields
    if (!metaTags.title.trim()) {
      newErrors.title = { message: 'Title is required', type: 'error' };
      isValid = false;
    }
    
    if (!metaTags.description.trim()) {
      newErrors.description = { message: 'Description is required', type: 'error' };
      isValid = false;
    }
    
    // URL validations
    const urlFields = ['ogImage', 'ogUrl', 'twitterImage', 'canonical'];
    urlFields.forEach(field => {
      if (metaTags[field as keyof MetaTags] && !isValidUrl(metaTags[field as keyof MetaTags] as string)) {
        newErrors[field] = { message: 'Please enter a valid URL', type: 'error' };
        isValid = false;
      }
    });
    
    // Length warnings (don't affect validity)
    if (metaTags.title.length > maxLengths.title) {
      newErrors.title = { 
        message: `Exceeds recommended ${maxLengths.title} characters - may be truncated in search results`,
        type: 'warning'
      };
    }
    
    if (metaTags.description.length > maxLengths.description) {
      newErrors.description = {
        message: `Exceeds recommended ${maxLengths.description} characters - may be truncated in search results`,
        type: 'warning'
      };
    }
    
    // Preserve previous warnings
    Object.entries(errors).forEach(([key, value]) => {
      if (value.type === 'warning' && !newErrors[key]) {
        newErrors[key] = value;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };
  
  // URL validation helper
  const isValidUrl = (url: string): boolean => {
    if (!url) return true; // Empty URLs are allowed
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  // Generate meta tags HTML
  const generateMetaTags = () => {
    if (!validateForm()) {
      return;
    }
    
    let html = '';
    
    // Title tag
    html += `<title>${metaTags.title}</title>\n`;
    
    // Standard meta tags
    html += `<meta name="description" content="${metaTags.description}" />\n`;
    
    // Keywords tag (if provided)
    if (metaTags.keywords) {
      html += `<meta name="keywords" content="${metaTags.keywords}" />\n`;
    }
    
    // Robots tag
    html += `<meta name="robots" content="${metaTags.robots}" />\n`;
    
    // Canonical URL (if provided)
    if (metaTags.canonical) {
      html += `<link rel="canonical" href="${metaTags.canonical}" />\n`;
    }
    
    // Open Graph tags
    if (metaTags.ogTitle || metaTags.ogDescription || metaTags.ogImage || metaTags.ogUrl) {
      html += '\n<!-- Open Graph / Facebook -->\n';
      html += `<meta property="og:type" content="website" />\n`;
      
      if (metaTags.ogTitle) {
        html += `<meta property="og:title" content="${metaTags.ogTitle}" />\n`;
      }
      
      if (metaTags.ogDescription) {
        html += `<meta property="og:description" content="${metaTags.ogDescription}" />\n`;
      }
      
      if (metaTags.ogImage) {
        html += `<meta property="og:image" content="${metaTags.ogImage}" />\n`;
      }
      
      if (metaTags.ogUrl) {
        html += `<meta property="og:url" content="${metaTags.ogUrl}" />\n`;
      }
    }
    
    // Twitter Card tags
    if (metaTags.twitterTitle || metaTags.twitterDescription || metaTags.twitterImage) {
      html += '\n<!-- Twitter -->\n';
      html += `<meta name="twitter:card" content="${metaTags.twitterCard}" />\n`;
      
      if (metaTags.twitterTitle) {
        html += `<meta name="twitter:title" content="${metaTags.twitterTitle}" />\n`;
      }
      
      if (metaTags.twitterDescription) {
        html += `<meta name="twitter:description" content="${metaTags.twitterDescription}" />\n`;
      }
      
      if (metaTags.twitterImage) {
        html += `<meta name="twitter:image" content="${metaTags.twitterImage}" />\n`;
      }
    }
    
    setGeneratedHTML(html);
    setPreviewMode(true);
  };
  
  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedHTML).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // Reset form function
  const resetForm = () => {
    setMetaTags({
      title: '',
      description: '',
      keywords: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      ogUrl: '',
      twitterCard: 'summary_large_image',
      twitterTitle: '',
      twitterDescription: '',
      twitterImage: '',
      canonical: '',
      robots: 'index, follow'
    });
    setGeneratedHTML('');
    setErrors({});
    setPreviewMode(false);
    setActiveTab('standard');
  };
  
  // Progress helper for character count
  const getProgressClass = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage <= 70) return 'bg-green-500';
    if (percentage <= 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  // Simulate optimizing meta tags with AI (in a real implementation, this would call an API)
  const suggestOptimizedTags = () => {
    if (!metaTags.title && !metaTags.description) {
      alert('Please enter at least a basic title or description to optimize');
      return;
    }
    
    // In a real implementation, this would be an API call to generate optimized meta tags
    // For now, we'll simulate it with a simple enhancement
    
    const sampleKeywords = ['SEO', 'meta tags', 'search optimization', 'website visibility'];
    
    setMetaTags(prev => {
      const enhancedTitle = prev.title 
        ? prev.title.length < 40 
          ? `${prev.title} - Optimized for Search Engines` 
          : prev.title
        : 'Optimized Page Title for Better Search Rankings';
        
      const enhancedDescription = prev.description
        ? prev.description
        : 'This page has been optimized with meta tags to improve search visibility and click-through rates from search engines and social media platforms.';
      
      return {
        ...prev,
        title: enhancedTitle,
        description: enhancedDescription,
        keywords: prev.keywords || sampleKeywords.join(', '),
        ogTitle: enhancedTitle,
        ogDescription: enhancedDescription,
        twitterTitle: enhancedTitle,
        twitterDescription: enhancedDescription
      };
    });
  };
  
  // Live preview renderer
  const renderPreview = () => {
    switch (previewType) {
      case 'google':
        return (
          <div className="bg-white p-4 rounded border border-gray-200">
            <p className="text-[#1a0dab] text-xl font-medium mb-1 truncate">
              {metaTags.title || "Page Title"}
            </p>
            <p className="text-[#006621] text-sm mb-1 truncate">
              {metaTags.ogUrl || metaTags.canonical || "https://example.com/page-url"}
            </p>
            <p className="text-gray-600 text-sm line-clamp-2">
              {metaTags.description || "Page description will appear here."}
            </p>
          </div>
        );
      case 'facebook':
        return (
          <div className="bg-[#f2f3f5] p-4 rounded border border-gray-300">
            <div className="bg-white rounded shadow">
              {metaTags.ogImage ? (
                <div className="w-full h-48 bg-gray-200 rounded-t overflow-hidden flex items-center justify-center">
                  <img src={metaTags.ogImage} alt="Preview" className="w-full object-cover" onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x630?text=Image+Preview';
                  }} />
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-t flex items-center justify-center text-gray-500">
                  No image provided
                </div>
              )}
              <div className="p-3">
                <p className="text-[#385898] text-sm font-semibold">
                  {metaTags.ogUrl || metaTags.canonical || "example.com"}
                </p>
                <p className="text-gray-900 font-bold">
                  {metaTags.ogTitle || metaTags.title || "Your Page Title"}
                </p>
                <p className="text-gray-500 text-sm line-clamp-3">
                  {metaTags.ogDescription || metaTags.description || "Your page description will appear here."}
                </p>
              </div>
            </div>
          </div>
        );
      case 'twitter':
        return (
          <div className="bg-[#e6ecf0] p-4 rounded border border-gray-300">
            <div className="bg-white rounded-xl shadow overflow-hidden">
              {metaTags.twitterImage ? (
                <div className="w-full h-48 bg-gray-200 overflow-hidden flex items-center justify-center">
                  <img src={metaTags.twitterImage} alt="Preview" className="w-full object-cover" onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x600?text=Twitter+Image';
                  }} />
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  No image provided
                </div>
              )}
              <div className="p-4">
                <p className="text-gray-900 font-bold text-lg mb-1">
                  {metaTags.twitterTitle || metaTags.title || "Your Twitter Card Title"}
                </p>
                <p className="text-gray-500 text-sm mb-2">
                  {metaTags.twitterDescription || metaTags.description || "Your Twitter card description will appear here."}
                </p>
                <p className="text-[#1da1f2] text-sm">
                  {metaTags.ogUrl || metaTags.canonical || "example.com"}
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
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
                Meta Tags <span className="text-yellow-300">Generator</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Create optimized meta tags to improve click-through rates and visibility in search results and social media.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Tool Section */}
      <Section>
        <Container>
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Generate Optimized Meta Tags</h2>
            <p className="text-text-secondary mb-4">
              Meta tags help search engines and social platforms understand your content. Our tool recommends optimal lengths for different platforms, but allows you to customize based on your needs.
            </p>
            <div className="bg-primary-main/5 rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recommended Lengths:
              </h3>
              <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
                <li>Page Title: Up to 60 characters (Google typically displays 50-60)</li>
                <li>Meta Description: Up to 160 characters (Google typically displays 150-160)</li>
                <li>Open Graph Title: Up to 95 characters (Facebook optimal length)</li>
                <li>Twitter Title: Up to 70 characters (Twitter optimal length)</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {!previewMode ? (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Meta Tags Form</h2>
                      <Button 
                        onClick={suggestOptimizedTags}
                        variant="outline"
                        className="text-sm"
                      >
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.5 14.5L5.5 18.5L3.5 19.5L4.5 17.5L8.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5.5 15.5L8.5 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 6L18 10M12.9 3.99999L20 11.1L12.9 18.2L5.8 11.1L12.9 3.99999Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        AI Optimize Tags
                      </Button>
                    </div>
                    
                    {/* Tabs Navigation */}
                    <div className="border-b border-gray-200 mb-6">
                      <div className="flex overflow-x-auto scrollbar-hide">
                        <button
                          className={`px-4 py-2 font-medium whitespace-nowrap border-b-2 ${
                            activeTab === 'standard'
                              ? 'border-primary-main text-primary-main'
                              : 'border-transparent text-gray-500 hover:text-gray-700'
                          }`}
                          onClick={() => setActiveTab('standard')}
                        >
                          Standard Meta Tags
                        </button>
                        <button
                          className={`px-4 py-2 font-medium whitespace-nowrap border-b-2 ${
                            activeTab === 'social'
                              ? 'border-primary-main text-primary-main'
                              : 'border-transparent text-gray-500 hover:text-gray-700'
                          }`}
                          onClick={() => setActiveTab('social')}
                        >
                          Social Media Tags
                        </button>
                        <button
                          className={`px-4 py-2 font-medium whitespace-nowrap border-b-2 ${
                            activeTab === 'advanced'
                              ? 'border-primary-main text-primary-main'
                              : 'border-transparent text-gray-500 hover:text-gray-700'
                          }`}
                          onClick={() => setActiveTab('advanced')}
                        >
                          Advanced Options
                        </button>
                        <button
                          className={`px-4 py-2 font-medium whitespace-nowrap border-b-2 ${
                            activeTab === 'preview'
                              ? 'border-primary-main text-primary-main'
                              : 'border-transparent text-gray-500 hover:text-gray-700'
                          }`}
                          onClick={() => setActiveTab('preview')}
                        >
                          Live Preview
                        </button>
                      </div>
                    </div>
                    
                    {/* Standard Meta Tags */}
                    {activeTab === 'standard' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title Tag <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={metaTags.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="e.g., Best SEO Practices for 2025 | Company Name"
                            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main ${
                              errors.title?.type === 'error' ? 'border-red-500' : 
                              errors.title?.type === 'warning' ? 'border-amber-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.title && (
                            <p className={`text-sm mt-1 ${
                              errors.title.type === 'error' ? 'text-red-500' : 'text-amber-500'
                            }`}>
                              {errors.title.message}
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-1">
                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mr-2">
                              <div 
                                className={`h-full ${getProgressClass(metaTags.title.length, maxLengths.title)}`} 
                                style={{ width: `${Math.min((metaTags.title.length / maxLengths.title) * 100, 100)}%` }}
                              ></div>
                            </div>
                            <span className={`text-xs font-medium ${
                              metaTags.title.length > maxLengths.title ? 'text-amber-500' : 'text-gray-500'
                            }`}>
                              {metaTags.title.length}/{maxLengths.title} recommended
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Meta Description <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            value={metaTags.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="e.g., Discover the latest SEO practices to improve your website's visibility in search engines and drive more organic traffic."
                            rows={3}
                            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main ${
                              errors.description?.type === 'error' ? 'border-red-500' : 
                              errors.description?.type === 'warning' ? 'border-amber-500' : 'border-gray-300'
                            }`}
                          ></textarea>
                          {errors.description && (
                            <p className={`text-sm mt-1 ${
                              errors.description.type === 'error' ? 'text-red-500' : 'text-amber-500'
                            }`}>
                              {errors.description.message}
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-1">
                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mr-2">
                              <div 
                                className={`h-full ${getProgressClass(metaTags.description.length, maxLengths.description)}`} 
                                style={{ width: `${Math.min((metaTags.description.length / maxLengths.description) * 100, 100)}%` }}
                              ></div>
                            </div>
                            <span className={`text-xs font-medium ${
                              metaTags.description.length > maxLengths.description ? 'text-amber-500' : 'text-gray-500'
                            }`}>
                              {metaTags.description.length}/{maxLengths.description} recommended
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Keywords (Optional)
                          </label>
                          <input
                            type="text"
                            value={metaTags.keywords}
                            onChange={(e) => handleInputChange('keywords', e.target.value)}
                            placeholder="e.g., SEO, search engine optimization, Google ranking"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Separate keywords with commas. While less important for search engines today, keywords can help with internal site search and content organization.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Social Media Tags */}
                    {activeTab === 'social' && (
                      <div>
                        <div className="mb-6">
                          <h3 className="text-lg font-medium mb-4">Open Graph (Facebook/LinkedIn)</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                OG Title
                              </label>
                              <input
                                type="text"
                                value={metaTags.ogTitle}
                                onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                                placeholder="Same as meta title, or customize for social sharing"
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main ${
                                  errors.ogTitle?.type === 'error' ? 'border-red-500' : 
                                  errors.ogTitle?.type === 'warning' ? 'border-amber-500' : 'border-gray-300'
                                }`}
                              />
                              {errors.ogTitle && (
                                <p className={`text-sm mt-1 ${
                                  errors.ogTitle.type === 'error' ? 'text-red-500' : 'text-amber-500'
                                }`}>
                                  {errors.ogTitle.message}
                                </p>
                              )}
                              <div className="flex justify-between items-center mt-1">
                                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mr-2">
                                  <div 
                                    className={`h-full ${getProgressClass(metaTags.ogTitle.length, maxLengths.ogTitle)}`} 
                                    style={{ width: `${Math.min((metaTags.ogTitle.length / maxLengths.ogTitle) * 100, 100)}%` }}
                                  ></div>
                                </div>
                                <span className={`text-xs font-medium ${
                                  metaTags.ogTitle.length > maxLengths.ogTitle ? 'text-amber-500' : 'text-gray-500'
                                }`}>
                                  {metaTags.ogTitle.length}/{maxLengths.ogTitle} recommended
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                OG Description
                              </label>
                              <textarea
                                value={metaTags.ogDescription}
                                onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                                placeholder="Same as meta description, or customize for social sharing"
                                rows={2}
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main ${
                                  errors.ogDescription?.type === 'error' ? 'border-red-500' : 
                                  errors.ogDescription?.type === 'warning' ? 'border-amber-500' : 'border-gray-300'
                                }`}
                              ></textarea>
                              {errors.ogDescription && (
                                <p className={`text-sm mt-1 ${
                                  errors.ogDescription.type === 'error' ? 'text-red-500' : 'text-amber-500'
                                }`}>
                                  {errors.ogDescription.message}
                                </p>
                              )}
                              <div className="flex justify-between items-center mt-1">
                                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mr-2">
                                  <div 
                                    className={`h-full ${getProgressClass(metaTags.ogDescription.length, maxLengths.ogDescription)}`} 
                                    style={{ width: `${Math.min((metaTags.ogDescription.length / maxLengths.ogDescription) * 100, 100)}%` }}
                                  ></div>
                                </div>
                                <span className={`text-xs font-medium ${
                                  metaTags.ogDescription.length > maxLengths.ogDescription ? 'text-amber-500' : 'text-gray-500'
                                }`}>
                                  {metaTags.ogDescription.length}/{maxLengths.ogDescription} recommended
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                OG Image URL
                              </label>
                              <input
                                type="url"
                                value={metaTags.ogImage}
                                onChange={(e) => handleInputChange('ogImage', e.target.value)}
                                placeholder="e.g., https://example.com/images/og-image.jpg"
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main ${
                                  errors.ogImage?.type === 'error' ? 'border-red-500' : 'border-gray-300'
                                }`}
                              />
                              {errors.ogImage && (
                                <p className={`text-sm mt-1 ${
                                  errors.ogImage.type === 'error' ? 'text-red-500' : 'text-amber-500'
                                }`}>
                                  {errors.ogImage.message}
                                </p>
                              )}
                              <p className="text-xs text-gray-500 mt-1">
                                Recommended size: 1200×630 pixels for optimal display on Facebook
                              </p>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                OG URL
                              </label>
                              <input
                                type="url"
                                value={metaTags.ogUrl}
                                onChange={(e) => handleInputChange('ogUrl', e.target.value)}
                                placeholder="e.g., https://example.com/page-url"
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main ${
                                  errors.ogUrl?.type === 'error' ? 'border-red-500' : 'border-gray-300'
                                }`}
                              />
                              {errors.ogUrl && (
                                <p className={`text-sm mt-1 ${
                                  errors.ogUrl.type === 'error' ? 'text-red-500' : 'text-amber-500'
                                }`}>
                                  {errors.ogUrl.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Twitter Card</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Twitter Card Type
                              </label>
                              <select
                                value={metaTags.twitterCard}
                                onChange={(e) => handleInputChange('twitterCard', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                              >
                                <option value="summary_large_image">Summary Large Image</option>
                                <option value="summary">Summary</option>
                                <option value="app">App</option>
                                <option value="player">Player</option>
                              </select>
                              <p className="text-xs text-gray-500 mt-1">
                                'Summary Large Image' is recommended for most content with images
                              </p>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Twitter Title
                              </label>
                              <input
                                type="text"
                                value={metaTags.twitterTitle}
                                onChange={(e) => handleInputChange('twitterTitle', e.target.value)}
                                placeholder="Same as OG title, or customize for Twitter"
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main ${
                                  errors.twitterTitle?.type === 'error' ? 'border-red-500' : 
                                  errors.twitterTitle?.type === 'warning' ? 'border-amber-500' : 'border-gray-300'
                                }`}
                              />
                              {errors.twitterTitle && (
                                <p className={`text-sm mt-1 ${
                                  errors.twitterTitle.type === 'error' ? 'text-red-500' : 'text-amber-500'
                                }`}>
                                  {errors.twitterTitle.message}
                                </p>
                              )}
                              <div className="flex justify-between items-center mt-1">
                                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mr-2">
                                  <div 
                                    className={`h-full ${getProgressClass(metaTags.twitterTitle.length, maxLengths.twitterTitle)}`} 
                                    style={{ width: `${Math.min((metaTags.twitterTitle.length / maxLengths.twitterTitle) * 100, 100)}%` }}
                                  ></div>
                                </div>
                                <span className={`text-xs font-medium ${
                                  metaTags.twitterTitle.length > maxLengths.twitterTitle ? 'text-amber-500' : 'text-gray-500'
                                }`}>
                                  {metaTags.twitterTitle.length}/{maxLengths.twitterTitle} recommended
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Twitter Description
                              </label>
                              <textarea
                                value={metaTags.twitterDescription}
                                onChange={(e) => handleInputChange('twitterDescription', e.target.value)}
                                placeholder="Same as OG description, or customize for Twitter"
                                rows={2}
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main ${
                                  errors.twitterDescription?.type === 'error' ? 'border-red-500' : 
                                  errors.twitterDescription?.type === 'warning' ? 'border-amber-500' : 'border-gray-300'
                                }`}
                              ></textarea>
                              {errors.twitterDescription && (
                                <p className={`text-sm mt-1 ${
                                  errors.twitterDescription.type === 'error' ? 'text-red-500' : 'text-amber-500'
                                }`}>
                                  {errors.twitterDescription.message}
                                </p>
                              )}
                              <div className="flex justify-between items-center mt-1">
                                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mr-2">
                                  <div 
                                    className={`h-full ${getProgressClass(metaTags.twitterDescription.length, maxLengths.twitterDescription)}`} 
                                    style={{ width: `${Math.min((metaTags.twitterDescription.length / maxLengths.twitterDescription) * 100, 100)}%` }}
                                  ></div>
                                </div>
                                <span className={`text-xs font-medium ${
                                  metaTags.twitterDescription.length > maxLengths.twitterDescription ? 'text-amber-500' : 'text-gray-500'
                                }`}>
                                  {metaTags.twitterDescription.length}/{maxLengths.twitterDescription} recommended
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Twitter Image URL
                              </label>
                              <input
                                type="url"
                                value={metaTags.twitterImage}
                                onChange={(e) => handleInputChange('twitterImage', e.target.value)}
                                placeholder="e.g., https://example.com/images/twitter-image.jpg"
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main ${
                                  errors.twitterImage?.type === 'error' ? 'border-red-500' : 'border-gray-300'
                                }`}
                              />
                              {errors.twitterImage && (
                                <p className={`text-sm mt-1 ${
                                  errors.twitterImage.type === 'error' ? 'text-red-500' : 'text-amber-500'
                                }`}>
                                  {errors.twitterImage.message}
                                </p>
                              )}
                              <p className="text-xs text-gray-500 mt-1">
                                Recommended size: 1200×628 pixels for optimal display on Twitter
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Advanced Options */}
                    {activeTab === 'advanced' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Canonical URL
                          </label>
                          <input
                            type="url"
                            value={metaTags.canonical}
                            onChange={(e) => handleInputChange('canonical', e.target.value)}
                            placeholder="e.g., https://example.com/original-page"
                            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main ${
                              errors.canonical?.type === 'error' ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.canonical && (
                            <p className={`text-sm mt-1 ${
                              errors.canonical.type === 'error' ? 'text-red-500' : 'text-amber-500'
                            }`}>
                              {errors.canonical.message}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Use canonical tags to indicate the preferred URL when you have duplicate or similar content on multiple pages
                          </p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Robots Meta Tag
                          </label>
                          <select
                            value={metaTags.robots}
                            onChange={(e) => handleInputChange('robots', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                          >
                            <option value="index, follow">index, follow (Default - Allow indexing and follow links)</option>
                            <option value="noindex, follow">noindex, follow (Don't index, but follow links)</option>
                            <option value="index, nofollow">index, nofollow (Index, but don't follow links)</option>
                            <option value="noindex, nofollow">noindex, nofollow (Don't index and don't follow links)</option>
                            <option value="max-snippet:-1, max-image-preview:large, max-video-preview:-1">Full rich snippet control (Recommended for most pages)</option>
                          </select>
                          <p className="text-xs text-gray-500 mt-1">
                            Controls how search engines crawl and index your page. Use "noindex" with caution as it prevents your page from appearing in search results.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Live Preview Tab */}
                    {activeTab === 'preview' && (
                      <div>
                        <div className="mb-4">
                          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              className={`flex-1 px-4 py-2 ${previewType === 'google' ? 'bg-primary-main text-white' : 'bg-gray-50 text-gray-700'}`}
                              onClick={() => setPreviewType('google')}
                            >
                              Google
                            </button>
                            <button
                              className={`flex-1 px-4 py-2 ${previewType === 'facebook' ? 'bg-primary-main text-white' : 'bg-gray-50 text-gray-700'}`}
                              onClick={() => setPreviewType('facebook')}
                            >
                              Facebook
                            </button>
                            <button
                              className={`flex-1 px-4 py-2 ${previewType === 'twitter' ? 'bg-primary-main text-white' : 'bg-gray-50 text-gray-700'}`}
                              onClick={() => setPreviewType('twitter')}
                            >
                              Twitter
                            </button>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h3 className="font-medium mb-3">
                            {previewType === 'google' ? 'Google Search Result Preview' : 
                             previewType === 'facebook' ? 'Facebook Share Preview' : 
                             'Twitter Card Preview'}
                          </h3>
                          
                          {renderPreview()}
                        </div>
                        
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                          <h4 className="font-medium text-yellow-800 mb-1">Preview Note</h4>
                          <p className="text-sm text-yellow-700">
                            This preview is an approximation. Actual appearance may vary based on platform updates, device type, and other factors.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-8 flex justify-between">
                      <Button 
                        onClick={resetForm}
                        variant="outline"
                        className="hover:bg-gray-50"
                      >
                        Reset Form
                      </Button>
                      <Button 
                        onClick={generateMetaTags}
                        variant="primary"
                      >
                        Generate Meta Tags
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Generated Meta Tags</h2>
                      <button
                        onClick={() => setPreviewMode(false)}
                        className="text-primary-main hover:text-primary-dark flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Form
                      </button>
                    </div>
                    
                    <div className="relative mb-6">
                      <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-auto max-h-[400px]">
                        <pre>{generatedHTML}</pre>
                      </div>
                      <button
                        onClick={copyToClipboard}
                        className="absolute top-2 right-2 bg-white rounded-md p-1.5 hover:bg-gray-200 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">How to implement:</h3>
                      <ol className="list-decimal list-inside space-y-2 text-text-secondary ml-4">
                        <li>Copy the generated HTML code</li>
                        <li>Paste it in the <code>&lt;head&gt;</code> section of your HTML document</li>
                        <li>Place it before the closing <code>&lt;/head&gt;</code> tag</li>
                      </ol>
                    </div>
                    
                    <div className="bg-primary-main/5 p-4 rounded-lg mb-6">
                      <h3 className="font-semibold mb-2">Search Result Preview:</h3>
                      <div className="bg-white p-4 rounded border border-gray-200">
                        <p className="text-[#1a0dab] text-xl font-medium mb-1 truncate">
                          {metaTags.title || "Page Title"}
                        </p>
                        <p className="text-[#006621] text-sm mb-1 truncate">
                          {metaTags.ogUrl || metaTags.canonical || "https://example.com/page-url"}
                        </p>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {metaTags.description || "Page description will appear here."}
                        </p>
                      </div>
                    </div>
                    
                    {/* Warning messages about length issues */}
                    {(metaTags.title.length > maxLengths.title || 
                      metaTags.description.length > maxLengths.description) && (
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-6">
                        <h4 className="font-medium text-amber-800 mb-1">Length Warnings</h4>
                        <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
                          {metaTags.title.length > maxLengths.title && (
                            <li>Your title exceeds the recommended {maxLengths.title} characters and may be truncated in search results</li>
                          )}
                          {metaTags.description.length > maxLengths.description && (
                            <li>Your description exceeds the recommended {maxLengths.description} characters and may be truncated in search results</li>
                          )}
                        </ul>
                      </div>
                    )}
                    
                    <div className="mt-8 flex justify-between">
                      <Button 
                        onClick={() => setPreviewMode(false)}
                        variant="outline"
                        className="hover:bg-gray-50"
                      >
                        Edit Meta Tags
                      </Button>
                      <Button 
                        onClick={copyToClipboard}
                        variant="primary"
                      >
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold mb-4">Meta Tags Guide</h2>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                          🏷️
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">Title Tag</h3>
                          <p className="text-text-secondary">The main title of your page, appearing in search results and browser tabs.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                          📝
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">Meta Description</h3>
                          <p className="text-text-secondary">A summary of your page content that appears in search results below your title.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                          💬
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">Social Media Tags</h3>
                          <p className="text-text-secondary">Control how your content appears when shared on social platforms like Facebook and Twitter.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                          🔍
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">SEO Impact</h3>
                          <p className="text-text-secondary">Well-optimized meta tags can improve click-through rates and search visibility.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50">
                    <h3 className="font-semibold mb-4">Writing Tips:</h3>
                    <ul className="space-y-3 text-text-secondary">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Write compelling, action-oriented descriptions</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Use unique titles and descriptions for each page</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Match search intent with clear value propositions</span>
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
          
          {/* Meta Tags Best Practices */}
          <div className="mt-12 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Meta Tags Best Practices for SEO</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Traditional SEO</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Keep titles under 60 characters to avoid truncation in SERPs (but longer titles may still be beneficial)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Craft enticing meta descriptions under 160 characters (longer descriptions may be truncated but can provide more context)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Include primary keywords naturally in titles and descriptions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Use branded terms in titles when appropriate</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Implement canonical tags to avoid duplicate content issues</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">AI and Modern SEO</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Focus on clarity and semantic context rather than keyword density</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Use descriptive, benefit-oriented meta descriptions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Include related entities and concepts in titles and descriptions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Optimize social meta tags for improved sharing and AI context</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Use schema markup alongside meta tags for richer search results</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary-main/5 rounded-lg">
              <h3 className="font-semibold mb-2">Understanding Character Limits</h3>
              <p className="text-text-secondary mb-4">
                While we provide recommended character limits based on display patterns, search engines don't have strict cutoff points. The actual display depends on pixel width, device size, and platform policies.
              </p>
              <p className="text-text-secondary">
                A longer, more descriptive title or description can sometimes be valuable for both users and search engines, even if it gets truncated in some displays. Focus on creating compelling, informative content first, with character counts serving as guidelines rather than strict rules.
              </p>
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
                  Need Professional SEO Support?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Our SEO experts can optimize your entire site for both traditional search engines and AI platforms to maximize your visibility and conversions.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button 
                  href="/services/content-optimization" 
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

export default MetaTagsGenerator;