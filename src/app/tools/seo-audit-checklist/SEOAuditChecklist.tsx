"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// Define the types for checklist items
interface ChecklistItem {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  aiRelevance: 'high' | 'medium' | 'low'; // How relevant is this for AI search engines
  checkType: 'yes-no' | 'na-option'; // Does this check have a N/A option
  resources?: string[]; // Optional links to resources
  tool?: string; // Optional link to related tool
}

// Define the SEO Audit Checklist component
const SEOAuditChecklist: React.FC = () => {
  // State to track all checklist item statuses
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [checklistStatus, setChecklistStatus] = useState<Record<string, 'passed' | 'failed' | 'na' | 'pending'>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showOnlyIssues, setShowOnlyIssues] = useState<boolean>(false);
  const [showAIRelevant, setShowAIRelevant] = useState<boolean>(false);
  const [progress, setProgress] = useState<{
    total: number;
    completed: number;
    passed: number;
    failed: number;
  }>({
    total: 0,
    completed: 0,
    passed: 0,
    failed: 0,
  });
  const [downloadReady, setDownloadReady] = useState<boolean>(false);
  const [checkedAllItems, setCheckedAllItems] = useState<boolean>(false);

  // Initialize checklist items with comprehensive SEO checks
  useEffect(() => {
    // All the checklist items
    const checklistItems: ChecklistItem[] = [
      // Technical SEO
      {
        id: 'crawl-index',
        category: 'technical',
        subcategory: 'Crawling & Indexing',
        title: 'Site is properly indexable',
        description: 'Ensure your robots.txt file doesn\'t block important content and that there are no noindex tags or headers on pages that should be indexed.',
        importance: 'critical',
        aiRelevance: 'high',
        checkType: 'yes-no',
        tool: '/tools/robots-txt-generator'
      },
      {
        id: 'sitemap',
        category: 'technical',
        subcategory: 'Crawling & Indexing',
        title: 'XML Sitemap exists and is properly configured',
        description: 'Your site should have an XML sitemap that lists all important URLs, is free of errors, and is submitted to search engines.',
        importance: 'high',
        aiRelevance: 'medium',
        checkType: 'yes-no'
      },
      {
        id: 'canonical',
        category: 'technical',
        subcategory: 'Crawling & Indexing',
        title: 'Canonical tags are properly implemented',
        description: 'Check that canonical tags are correctly pointing to the preferred version of each page to avoid duplicate content issues.',
        importance: 'high',
        aiRelevance: 'medium',
        checkType: 'yes-no'
      },
      {
        id: 'http-https',
        category: 'technical',
        subcategory: 'Site Security & Performance',
        title: 'Site uses HTTPS with proper redirects',
        description: 'Ensure your site uses HTTPS and that all HTTP URLs properly redirect to HTTPS versions.',
        importance: 'critical',
        aiRelevance: 'medium',
        checkType: 'yes-no'
      },
      {
        id: 'mobile-friendly',
        category: 'technical',
        subcategory: 'Mobile Optimization',
        title: 'Site is mobile-friendly',
        description: 'Ensure your site passes Google\'s mobile-friendly test and provides a good experience on all device types.',
        importance: 'critical',
        aiRelevance: 'medium',
        checkType: 'yes-no',
        resources: ['https://search.google.com/test/mobile-friendly']
      },
      {
        id: 'page-speed',
        category: 'technical',
        subcategory: 'Site Security & Performance',
        title: 'Page speed is optimized',
        description: 'Pages should load quickly on all devices. Check Core Web Vitals metrics (LCP, FID, CLS) and optimize as needed.',
        importance: 'high',
        aiRelevance: 'medium',
        checkType: 'yes-no',
        resources: ['https://pagespeed.web.dev/']
      },
      {
        id: 'structured-data',
        category: 'technical',
        subcategory: 'Structured Data',
        title: 'Structured data is implemented correctly',
        description: 'Ensure relevant schema markup is implemented correctly on appropriate pages to help search engines understand your content.',
        importance: 'high',
        aiRelevance: 'high',
        checkType: 'yes-no',
        tool: '/tools/schema-generator'
      },
      {
        id: 'crawl-budget',
        category: 'technical',
        subcategory: 'Crawling & Indexing',
        title: 'Crawl budget is optimized',
        description: 'Make sure search engines are focusing on your important pages by managing pagination, filtering URL parameters, and fixing excessive internal links.',
        importance: 'medium',
        aiRelevance: 'medium',
        checkType: 'yes-no'
      },
      {
        id: 'url-structure',
        category: 'technical',
        subcategory: 'URL Structure',
        title: 'URLs are SEO-friendly',
        description: 'URLs should be concise, descriptive, use hyphens, and include relevant keywords when appropriate.',
        importance: 'medium',
        aiRelevance: 'low',
        checkType: 'yes-no'
      },
      {
        id: 'broken-links',
        category: 'technical',
        subcategory: 'Site Structure',
        title: 'No broken links or 404 errors',
        description: 'Ensure there are no broken internal or external links on your site that lead to 404 errors.',
        importance: 'medium',
        aiRelevance: 'low',
        checkType: 'yes-no'
      },
      {
        id: 'hreflang',
        category: 'technical',
        subcategory: 'International SEO',
        title: 'Hreflang tags implemented correctly (if applicable)',
        description: 'If your site has multiple language or regional versions, ensure hreflang tags are implemented correctly.',
        importance: 'medium',
        aiRelevance: 'low',
        checkType: 'na-option'
      },
      
      // Content SEO
      {
        id: 'high-quality-content',
        category: 'content',
        subcategory: 'Content Quality',
        title: 'Content is high-quality and valuable',
        description: 'Content should be original, comprehensive, well-researched, and provide genuine value to users.',
        importance: 'critical',
        aiRelevance: 'high',
        checkType: 'yes-no'
      },
      {
        id: 'keyword-research',
        category: 'content',
        subcategory: 'Keywords',
        title: 'Keyword research performed for all content',
        description: 'Ensure thorough keyword research has been conducted to identify target terms, search volume, and competition.',
        importance: 'high',
        aiRelevance: 'medium',
        checkType: 'yes-no'
      },
      {
        id: 'target-keywords',
        category: 'content',
        subcategory: 'Keywords',
        title: 'Target keywords used appropriately',
        description: 'Primary and secondary keywords should be used naturally in titles, headings, and body text without keyword stuffing.',
        importance: 'high',
        aiRelevance: 'medium',
        checkType: 'yes-no'
      },
      {
        id: 'meta-titles',
        category: 'content',
        subcategory: 'Meta Information',
        title: 'Optimized meta titles',
        description: 'Each page should have a unique, descriptive title tag that includes the primary keyword and is 50-60 characters long.',
        importance: 'critical',
        aiRelevance: 'medium',
        checkType: 'yes-no',
        tool: '/tools/meta-tags-generator'
      },
      {
        id: 'meta-descriptions',
        category: 'content',
        subcategory: 'Meta Information',
        title: 'Optimized meta descriptions',
        description: 'Each page should have a unique meta description that includes keywords and compelling copy within 150-160 characters.',
        importance: 'high',
        aiRelevance: 'low',
        checkType: 'yes-no',
        tool: '/tools/meta-tags-generator'
      },
      {
        id: 'headings',
        category: 'content',
        subcategory: 'Content Structure',
        title: 'Proper heading structure',
        description: 'Content should use a logical hierarchy of headings (H1, H2, H3) with keywords included where appropriate.',
        importance: 'high',
        aiRelevance: 'high',
        checkType: 'yes-no'
      },
      {
        id: 'content-depth',
        category: 'content',
        subcategory: 'Content Quality',
        title: 'Content is comprehensive and in-depth',
        description: 'Pages should thoroughly cover their topics and be of sufficient length to satisfy user intent (typically 1000+ words for main pages).',
        importance: 'high',
        aiRelevance: 'high',
        checkType: 'yes-no'
      },
      {
        id: 'content-freshness',
        category: 'content',
        subcategory: 'Content Quality',
        title: 'Content is fresh and updated',
        description: 'Important pages are regularly reviewed and updated to ensure information remains accurate and current.',
        importance: 'medium',
        aiRelevance: 'high',
        checkType: 'yes-no'
      },
      {
        id: 'image-optimization',
        category: 'content',
        subcategory: 'Media Optimization',
        title: 'Images are optimized',
        description: 'Images should have descriptive filenames, appropriate alt text, and be compressed for fast loading.',
        importance: 'medium',
        aiRelevance: 'medium',
        checkType: 'yes-no'
      },
      {
        id: 'content-uniqueness',
        category: 'content',
        subcategory: 'Content Quality',
        title: 'Content is unique (no duplicate content)',
        description: 'All content should be original and not duplicated from other websites or within your own site.',
        importance: 'high',
        aiRelevance: 'high',
        checkType: 'yes-no'
      },
      
      // Semantic SEO & AI Optimization
      {
        id: 'entity-optimization',
        category: 'semantic',
        subcategory: 'Entity SEO',
        title: 'Content optimized for entities, not just keywords',
        description: 'Content should focus on named entities (people, places, things, concepts) and their relationships, not just keywords.',
        importance: 'high',
        aiRelevance: 'high',
        checkType: 'yes-no'
      },
      {
        id: 'topic-clusters',
        category: 'semantic',
        subcategory: 'Content Architecture',
        title: 'Topic clusters with internal linking',
        description: 'Related content should be organized into topic clusters with pillar pages and supporting content linked together.',
        importance: 'high',
        aiRelevance: 'high',
        checkType: 'yes-no'
      },
      {
        id: 'semantic-html',
        category: 'semantic',
        subcategory: 'Technical Semantics',
        title: 'Semantic HTML structure',
        description: 'Use semantic HTML elements (article, section, nav, etc.) to help machines understand content structure and relationships.',
        importance: 'medium',
        aiRelevance: 'high',
        checkType: 'yes-no'
      },
      {
        id: 'natural-language',
        category: 'semantic',
        subcategory: 'Content Style',
        title: 'Content uses natural language, not keyword-stuffed',
        description: 'Write naturally for humans first, using synonyms, related terms, and natural language patterns rather than artificially inserting keywords.',
        importance: 'high',
        aiRelevance: 'high',
        checkType: 'yes-no'
      },
      {
        id: 'context-relationships',
        category: 'semantic',
        subcategory: 'Entity SEO',
        title: 'Context and relationships are clearly established',
        description: 'Content explicitly establishes relationships between entities, concepts, and topics to help AI understand connections.',
        importance: 'high',
        aiRelevance: 'high',
        checkType: 'yes-no'
      },
      {
        id: 'structured-content',
        category: 'semantic',
        subcategory: 'Content Structure',
        title: 'Content is well-structured and organized',
        description: 'Content follows a logical structure with clear sections, subheadings, and organized information that\'s easy for both humans and AI to follow.',
        importance: 'high',
        aiRelevance: 'high',
        checkType: 'yes-no'
      },
      {
        id: 'citation-optimization',
        category: 'semantic',
        subcategory: 'AI Optimization',
        title: 'Content is optimized for AI citation',
        description: 'Key information, statistics, and statements are clearly presented in a way that makes them easy for AI to extract and cite.',
        importance: 'medium',
        aiRelevance: 'high',
        checkType: 'yes-no'
      },
      {
        id: 'qa-format',
        category: 'semantic',
        subcategory: 'AI Optimization',
        title: 'FAQ or Q&A format used when appropriate',
        description: 'Content includes FAQ sections or Q&A format where appropriate to directly answer common questions and improve featured snippet opportunities.',
        importance: 'medium',
        aiRelevance: 'high',
        checkType: 'yes-no'
      },
      {
        id: 'e-e-a-t-signals',
        category: 'semantic',
        subcategory: 'Authority',
        title: 'Content demonstrates E-E-A-T',
        description: 'Content provides clear signals of Experience, Expertise, Authoritativeness, and Trustworthiness with author bios, credentials, references, etc.',
        importance: 'high',
        aiRelevance: 'high',
        checkType: 'yes-no'
      },
      {
        id: 'multimedia-content',
        category: 'semantic',
        subcategory: 'Content Format',
        title: 'Incorporates multimedia content types',
        description: 'Content includes various media types (text, images, video, infographics) to provide comprehensive information in multiple formats.',
        importance: 'medium',
        aiRelevance: 'medium',
        checkType: 'yes-no'
      },
      
      // User Experience
      {
        id: 'clear-navigation',
        category: 'ux',
        subcategory: 'Navigation',
        title: 'Clear navigation and site structure',
        description: 'Site has intuitive navigation, logical hierarchy, and makes it easy for users to find what they\'re looking for.',
        importance: 'high',
        aiRelevance: 'medium',
        checkType: 'yes-no'
      },
      {
        id: 'internal-linking',
        category: 'ux',
        subcategory: 'Site Structure',
        title: 'Strategic internal linking',
        description: 'Pages link to other relevant content on your site with descriptive anchor text to help users and search engines navigate.',
        importance: 'high',
        aiRelevance: 'high',
        checkType: 'yes-no'
      },
      {
        id: 'mobile-usability',
        category: 'ux',
        subcategory: 'Mobile Optimization',
        title: 'No mobile usability issues',
        description: 'Site has no mobile-specific issues like tiny text, clickable elements too close together, or content wider than screen.',
        importance: 'high',
        aiRelevance: 'low',
        checkType: 'yes-no'
      },
      {
        id: 'user-signals',
        category: 'ux',
        subcategory: 'Engagement',
        title: 'Positive user engagement signals',
        description: 'Site has good metrics for time on page, pages per session, low bounce rate, and other engagement signals.',
        importance: 'high',
        aiRelevance: 'medium',
        checkType: 'yes-no'
      },
      {
        id: 'cta-conversion',
        category: 'ux',
        subcategory: 'Conversion',
        title: 'Clear CTAs and conversion paths',
        description: 'Pages have clear calls-to-action and well-designed conversion paths appropriate to the user journey stage.',
        importance: 'medium',
        aiRelevance: 'low',
        checkType: 'yes-no'
      },
      {
        id: 'accessibility',
        category: 'ux',
        subcategory: 'Accessibility',
        title: 'Site meets accessibility standards',
        description: 'Content is accessible to all users, including those with disabilities, following WCAG guidelines.',
        importance: 'medium',
        aiRelevance: 'medium',
        checkType: 'yes-no'
      },
      
      // Off-Site SEO
      {
        id: 'backlink-profile',
        category: 'off-site',
        subcategory: 'Backlinks',
        title: 'Healthy backlink profile',
        description: 'Site has a diverse set of high-quality, relevant backlinks from authoritative sites in your industry.',
        importance: 'high',
        aiRelevance: 'medium',
        checkType: 'yes-no'
      },
      {
        id: 'branded-search',
        category: 'off-site',
        subcategory: 'Brand Signals',
        title: 'Strong branded search volume',
        description: 'Your brand has significant search volume, indicating brand awareness and demand.',
        importance: 'medium',
        aiRelevance: 'medium',
        checkType: 'yes-no'
      },
      {
        id: 'social-signals',
        category: 'off-site',
        subcategory: 'Social Media',
        title: 'Active social media presence',
        description: 'Brand is active on relevant social platforms with engagement and sharing of content.',
        importance: 'medium',
        aiRelevance: 'low',
        checkType: 'yes-no'
      },
      {
        id: 'local-seo',
        category: 'off-site',
        subcategory: 'Local SEO',
        title: 'Local SEO optimized (if applicable)',
        description: 'For businesses with physical locations, Google Business Profile and local citations are optimized.',
        importance: 'medium',
        aiRelevance: 'medium',
        checkType: 'na-option'
      },
      {
        id: 'online-reputation',
        category: 'off-site',
        subcategory: 'Brand Signals',
        title: 'Positive online reputation',
        description: 'Reviews and mentions across the web are predominantly positive, with good management of any negative feedback.',
        importance: 'medium',
        aiRelevance: 'high',
        checkType: 'yes-no'
      }
    ];

    setChecklist(checklistItems);

    // Initialize status for all items
    const initialStatus: Record<string, 'passed' | 'failed' | 'na' | 'pending'> = {};
    checklistItems.forEach(item => {
      initialStatus[item.id] = 'pending';
    });
    setChecklistStatus(initialStatus);

    // Initialize notes for all items
    const initialNotes: Record<string, string> = {};
    checklistItems.forEach(item => {
      initialNotes[item.id] = '';
    });
    setNotes(initialNotes);

    // Calculate total items
    setProgress({
      total: checklistItems.length,
      completed: 0,
      passed: 0,
      failed: 0
    });
  }, []);

  // Update progress when checklist status changes
  useEffect(() => {
    const completed = Object.values(checklistStatus).filter(status => status !== 'pending').length;
    const passed = Object.values(checklistStatus).filter(status => status === 'passed').length;
    const failed = Object.values(checklistStatus).filter(status => status === 'failed').length;

    setProgress({
      total: checklist.length,
      completed,
      passed,
      failed
    });

    // Check if all items have been checked
    if (completed === checklist.length && checklist.length > 0) {
      setCheckedAllItems(true);
      setDownloadReady(true);
    }
  }, [checklistStatus, checklist]);

  // Handle status change for a checklist item
  const handleStatusChange = (id: string, status: 'passed' | 'failed' | 'na' | 'pending') => {
    setChecklistStatus(prev => ({
      ...prev,
      [id]: status
    }));
  };

  // Handle note change for a checklist item
  const handleNoteChange = (id: string, note: string) => {
    setNotes(prev => ({
      ...prev,
      [id]: note
    }));
  };

  // Calculate importance class
  const getImportanceClass = (importance: string) => {
    switch (importance) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate AI relevance class
  const getAIRelevanceClass = (relevance: string) => {
    switch (relevance) {
      case 'high':
        return 'bg-purple-100 text-purple-800';
      case 'medium':
        return 'bg-indigo-100 text-indigo-800';
      case 'low':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate progress percentage
  const progressPercentage = progress.total > 0 
    ? Math.round((progress.completed / progress.total) * 100) 
    : 0;

  // Calculate health score
  const healthScore = progress.completed > 0 
    ? Math.round((progress.passed / progress.completed) * 100) 
    : 0;

  // Get health score text and class
  const getHealthScoreText = () => {
    if (healthScore >= 90) return 'Excellent';
    if (healthScore >= 70) return 'Good';
    if (healthScore >= 50) return 'Fair';
    return 'Needs Improvement';
  };

  const getHealthScoreClass = () => {
    if (healthScore >= 90) return 'text-green-600';
    if (healthScore >= 70) return 'text-lime-600';
    if (healthScore >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Filter checklist items based on active category and other filters
  const filteredChecklist = checklist.filter(item => {
    // Filter by category
    if (activeCategory !== 'all' && item.category !== activeCategory) {
      return false;
    }
    
    // Filter by issues only
    if (showOnlyIssues && checklistStatus[item.id] !== 'failed') {
      return false;
    }

    // Filter by AI relevance
    if (showAIRelevant && item.aiRelevance !== 'high') {
      return false;
    }

    return true;
  });

  // Group checklist items by subcategory
  const groupedChecklist: Record<string, ChecklistItem[]> = {};
  filteredChecklist.forEach(item => {
    if (!groupedChecklist[item.subcategory]) {
      groupedChecklist[item.subcategory] = [];
    }
    groupedChecklist[item.subcategory].push(item);
  });

  // Generate PDF report
  const generateAuditReport = () => {
    const auditData = {
      date: new Date().toISOString().split('T')[0],
      progress,
      healthScore,
      items: Object.entries(checklistStatus).map(([id, status]) => {
        const item = checklist.find(i => i.id === id);
        if (!item) return null;
        
        return {
          id,
          title: item.title,
          category: item.category,
          subcategory: item.subcategory,
          status,
          note: notes[id] || ''
        };
      }).filter(Boolean)
    };
    
    // Create a JSON blob and download link
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `seo-audit-report-${auditData.date}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
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
                SEO Audit <span className="text-yellow-300">Checklist</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Comprehensive checklist to audit your website for both traditional search engines and AI platforms.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Tool Section */}
      <Section>
        <Container>
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Complete SEO Audit Checklist</h2>
            <p className="text-text-secondary mb-4">
              Use this comprehensive checklist to audit your website's SEO performance across technical, content, semantic, user experience, and off-site factors. Each item includes guidance for both traditional search engines and AI platforms.
            </p>
            <div className="bg-primary-main/5 rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How to use this checklist:
              </h3>
              <ol className="list-decimal list-inside text-text-secondary space-y-1 ml-4">
                <li>Review each item and mark it as Passed, Failed, or N/A if not applicable</li>
                <li>Add notes for items that need improvement or follow-up</li>
                <li>Focus on fixing critical and high-importance items first</li>
                <li>Pay special attention to items with high AI relevance for optimization across all search platforms</li>
                <li>Download your report when finished to track improvements over time</li>
              </ol>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Audit Progress Overview */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold mb-6">Audit Progress</h2>
                    
                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-text-secondary">Completion</span>
                        <span className="text-sm font-medium text-primary-main">{progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary-main h-2.5 rounded-full" 
                          style={{width: `${progressPercentage}%`}}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{progress.completed} of {progress.total} completed</span>
                      </div>
                    </div>
                    
                    {/* Health Score */}
                    {progress.completed > 0 && (
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-text-secondary">SEO Health Score</span>
                          <span className={`text-sm font-medium ${getHealthScoreClass()}`}>{healthScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              healthScore >= 90 ? 'bg-green-500' :
                              healthScore >= 70 ? 'bg-lime-500' :
                              healthScore >= 50 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{width: `${healthScore}%`}}
                          ></div>
                        </div>
                        <div className="mt-1 text-center">
                          <span className={`text-sm font-medium ${getHealthScoreClass()}`}>
                            {getHealthScoreText()}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Status Counts */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <p className="text-sm text-text-secondary mb-1">Passed</p>
                        <p className="text-2xl font-bold text-green-600">{progress.passed}</p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-3 text-center">
                        <p className="text-sm text-text-secondary mb-1">Failed</p>
                        <p className="text-2xl font-bold text-red-600">{progress.failed}</p>
                      </div>
                    </div>
                    
                    {/* Generate Report Button */}
                    <button
                      onClick={generateAuditReport}
                      disabled={!downloadReady}
                      className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                        downloadReady
                          ? 'bg-primary-main text-white hover:bg-primary-dark'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Audit Report
                    </button>
                    
                    {!checkedAllItems && (
                      <p className="text-xs text-center text-gray-500 mt-2">
                        Complete all checklist items to enable report download
                      </p>
                    )}
                  </div>
                  
                  <div className="p-6 bg-gray-50">
                    <h3 className="font-semibold mb-4">Audit Legend</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-800 flex items-center justify-center text-xs font-bold mr-2">
                          !
                        </div>
                        <div>
                          <p className="text-sm font-medium">Critical Priority</p>
                          <p className="text-xs text-text-secondary">Fix these issues immediately</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center text-xs font-bold mr-2">
                          !
                        </div>
                        <div>
                          <p className="text-sm font-medium">High Priority</p>
                          <p className="text-xs text-text-secondary">Fix these issues soon</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold mr-2">
                          AI
                        </div>
                        <div>
                          <p className="text-sm font-medium">High AI Relevance</p>
                          <p className="text-xs text-text-secondary">Important for AI search platforms</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-semibold mb-2">Filter by:</h3>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setShowOnlyIssues(!showOnlyIssues)}
                          className={`text-xs px-3 py-1.5 rounded-full ${
                            showOnlyIssues 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {showOnlyIssues ? 'Showing Issues Only' : 'Show Issues Only'}
                        </button>
                        <button
                          onClick={() => setShowAIRelevant(!showAIRelevant)}
                          className={`text-xs px-3 py-1.5 rounded-full ${
                            showAIRelevant 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {showAIRelevant ? 'Showing AI Relevant' : 'Show AI Relevant'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Checklist Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="border-b border-gray-200">
                  <div className="flex overflow-x-auto scrollbar-hide">
                    <button
                      className={`px-4 py-3 font-medium whitespace-nowrap border-b-2 ${
                        activeCategory === 'all'
                          ? 'border-primary-main text-primary-main'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveCategory('all')}
                    >
                      All Categories
                    </button>
                    <button
                      className={`px-4 py-3 font-medium whitespace-nowrap border-b-2 ${
                        activeCategory === 'technical'
                          ? 'border-primary-main text-primary-main'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveCategory('technical')}
                    >
                      Technical SEO
                    </button>
                    <button
                      className={`px-4 py-3 font-medium whitespace-nowrap border-b-2 ${
                        activeCategory === 'content'
                          ? 'border-primary-main text-primary-main'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveCategory('content')}
                    >
                      Content SEO
                    </button>
                    <button
                      className={`px-4 py-3 font-medium whitespace-nowrap border-b-2 ${
                        activeCategory === 'semantic'
                          ? 'border-primary-main text-primary-main'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveCategory('semantic')}
                    >
                      Semantic & AI
                    </button>
                    <button
                      className={`px-4 py-3 font-medium whitespace-nowrap border-b-2 ${
                        activeCategory === 'ux'
                          ? 'border-primary-main text-primary-main'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveCategory('ux')}
                    >
                      User Experience
                    </button>
                    <button
                      className={`px-4 py-3 font-medium whitespace-nowrap border-b-2 ${
                        activeCategory === 'off-site'
                          ? 'border-primary-main text-primary-main'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveCategory('off-site')}
                    >
                      Off-Site SEO
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  {Object.keys(groupedChecklist).length === 0 ? (
                    <div className="text-center py-8">
                      <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No items match your filters</h3>
                      <p className="text-gray-500">Try changing your filter settings to see more items</p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {Object.entries(groupedChecklist).map(([subcategory, items]) => (
                        <div key={subcategory}>
                          <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">{subcategory}</h3>
                          <div className="space-y-4">
                            {items.map(item => (
                              <div 
                                key={item.id}
                                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                              >
                                <div className="flex flex-wrap gap-2 mb-3">
                                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getImportanceClass(item.importance)}`}>
                                    {item.importance.charAt(0).toUpperCase() + item.importance.slice(1)}
                                  </span>
                                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getAIRelevanceClass(item.aiRelevance)}`}>
                                    AI: {item.aiRelevance.charAt(0).toUpperCase() + item.aiRelevance.slice(1)}
                                  </span>
                                </div>
                                
                                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                                <p className="text-text-secondary mb-4">{item.description}</p>
                                
                                {/* Status Buttons */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                  <button
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                                      checklistStatus[item.id] === 'passed'
                                        ? 'bg-green-100 text-green-800 border border-green-200'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                    onClick={() => handleStatusChange(item.id, 'passed')}
                                  >
                                    Passed
                                  </button>
                                  <button
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                                      checklistStatus[item.id] === 'failed'
                                        ? 'bg-red-100 text-red-800 border border-red-200'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                    onClick={() => handleStatusChange(item.id, 'failed')}
                                  >
                                    Failed
                                  </button>
                                  {item.checkType === 'na-option' && (
                                    <button
                                      className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                                        checklistStatus[item.id] === 'na'
                                          ? 'bg-gray-300 text-gray-800 border border-gray-400'
                                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                      }`}
                                      onClick={() => handleStatusChange(item.id, 'na')}
                                    >
                                      N/A
                                    </button>
                                  )}
                                </div>
                                
                                {/* Notes Field */}
                                <div>
                                  <label htmlFor={`note-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                                    Notes:
                                  </label>
                                  <textarea
                                    id={`note-${item.id}`}
                                    rows={2}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                                    placeholder="Add notes about this item..."
                                    value={notes[item.id]}
                                    onChange={(e) => handleNoteChange(item.id, e.target.value)}
                                  ></textarea>
                                </div>
                                
                                {/* Related Resources */}
                                {(item.resources || item.tool) && (
                                  <div className="mt-3 pt-3 border-t border-gray-100">
                                    <p className="text-sm font-medium mb-1">Resources:</p>
                                    <div className="flex flex-wrap gap-2">
                                      {item.resources?.map((resource, idx) => (
                                        <a
                                          key={idx}
                                          href={resource}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs text-primary-main hover:text-primary-dark hover:underline inline-flex items-center"
                                        >
                                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                          </svg>
                                          Testing Tool
                                        </a>
                                      ))}
                                      
                                      {item.tool && (
                                        <Link
                                          href={item.tool}
                                          className="text-xs text-primary-main hover:text-primary-dark hover:underline inline-flex items-center"
                                        >
                                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                          </svg>
                                          Use Our Tool
                                        </Link>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* SEO Audit Guidance */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">How to Conduct a Comprehensive SEO Audit</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Traditional SEO Audit</h3>
                <ol className="list-decimal list-inside space-y-2 text-text-secondary ml-4">
                  <li>Start with a technical analysis of your site's health and crawlability</li>
                  <li>Examine on-page factors like titles, meta descriptions, and content quality</li>
                  <li>Analyze your site structure and internal linking patterns</li>
                  <li>Review your backlink profile for quality and relevance</li>
                  <li>Check mobile usability and page speed performance</li>
                  <li>Identify and fix broken links and other technical issues</li>
                  <li>Evaluate your site against competitor benchmarks</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">AI-Enhanced SEO Audit</h3>
                <ol className="list-decimal list-inside space-y-2 text-text-secondary ml-4">
                  <li>Evaluate content for semantic richness and entity relationships</li>
                  <li>Assess topic comprehensiveness and contextual relevance</li>
                  <li>Check structured data implementation for all relevant content types</li>
                  <li>Analyze content presentation for AI extraction and citation</li>
                  <li>Examine content structure for logical information hierarchy</li>
                  <li>Verify clear demonstration of E-E-A-T signals</li>
                  <li>Test content performance in AI-powered search platforms</li>
                </ol>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary-main/5 rounded-lg">
              <h3 className="font-semibold mb-2">Best Practices:</h3>
              <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
                <li>Conduct regular audits (quarterly for most sites, monthly for large sites)</li>
                <li>Prioritize fixes based on impact and effort required</li>
                <li>Document all changes for future reference</li>
                <li>Monitor impact of changes on both traditional and AI search performance</li>
                <li>Use both automated tools and manual review for comprehensive results</li>
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
                  Need Expert SEO Guidance?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Our SEO specialists can conduct a comprehensive audit of your site and provide a detailed implementation plan for both traditional and AI search optimization.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button 
                  href="/contact?ref=audit-tool" 
                  variant="secondary" 
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Request Professional Audit
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default SEOAuditChecklist;