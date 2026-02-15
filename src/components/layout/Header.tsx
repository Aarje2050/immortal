"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../ui/Container';
import Button from '../ui/Button';

// Define navigation data structures for easy maintenance
const mainNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Blog', href: '/blog' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' }
];

// Services data organized by category
const servicesData = {
  'Core SEO Services': [
    { name: 'Technical SEO', href: '/services/technical-seo' },
    { name: 'Content SEO', href: '/services/content-seo' },
    { name: 'Off-Page SEO', href: '/services/off-page-seo' },
    { name: 'Local SEO', href: '/services/local-seo' },
  ],
  'Advanced SEO Solutions': [
    { name: 'AI-Enhanced SEO', href: '/services/ai-enhanced-seo' },
    { name: 'Semantic SEO', href: '/services/semantic-seo' },
  ],
  'Industry-Specific SEO': [
    { name: 'E-commerce SEO', href: '/services/ecommerce-seo' },
    { name: 'SaaS & B2B SEO', href: '/services/saas-seo' },
    { name: 'Small Business SEO', href: '/services/small-business-seo' },
    { name: 'Enterprise SEO', href: '/services/enterprise-seo' },
  ]
};

// Tools data organized by category, with optional badge for highlighted items
const toolsData: Record<string, { name: string; href: string; badge?: 'new' | 'popular' }[]> = {
  'Content Tools': [
    { name: 'Word Counter', href: '/tools/word-counter', badge: 'new' },
    { name: 'SERP Snippet Preview', href: '/tools/serp-preview', badge: 'new' },
    { name: 'Keyword Density Checker', href: '/tools/keyword-density-checker', badge: 'new' },
    { name: 'Readability Analyzer', href: '/tools/readability-checker', badge: 'new' },
    { name: 'Meta Tags Generator', href: '/tools/meta-tags-generator' },
  ],
  'Technical SEO': [
    { name: 'Page Size Checker', href: '/tools/page-size-checker', badge: 'popular' },
    { name: 'Schema Markup Generator', href: '/tools/schema-generator' },
    { name: 'Robots.txt Generator', href: '/tools/robots-txt-generator' },
    { name: 'LLMs.txt Generator', href: '/tools/llms-txt-generator' },
  ],
};

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  
  // Track scroll position for styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click and Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(prevState => prevState === name ? null : name);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const headerClass = `sticky top-0 z-50 transition-all duration-200 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
  }`;

  return (
    <header className={headerClass} ref={navRef}>
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 relative z-10">
            <div className="relative h-10 w-40 flex items-center">
              <Image
                src="/immortal-logo.svg"
                alt="Immortal SEO Logo"
                width={150}
                height={40}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-5">
            {/* Home and About links */}
            <Link
              href="/"
              className="text-text-secondary hover:text-primary-main transition-colors font-medium px-2 py-2"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-text-secondary hover:text-primary-main transition-colors font-medium px-2 py-2"
            >
              About
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button 
                className={`flex items-center text-text-secondary hover:text-primary-main transition-colors font-medium px-2 py-2 ${activeDropdown === 'services' ? 'text-primary-main' : ''}`}
                onClick={() => toggleDropdown('services')}
                aria-expanded={activeDropdown === 'services'}
                type="button"
              >
                <span>Services</span>
                <svg className={`ml-1 w-4 h-4 transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Services Dropdown Menu */}
              {activeDropdown === 'services' && (
                <div className="absolute left-0 mt-2 w-64 bg-white shadow-xl rounded-lg overflow-hidden z-50 border border-gray-100">
                  <div className="p-4">
                    {Object.entries(servicesData).map(([category, services]) => (
                      <div key={category} className="mb-4 last:mb-0">
                        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">{category}</h3>
                        <ul className="space-y-1">
                          {services.map((service) => (
                            <li key={service.name}>
                              <Link
                                href={service.href}
                                className="block py-1.5 text-text-secondary hover:text-primary-main transition-colors text-sm"
                                onClick={closeMenu}
                              >
                                {service.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="pt-3 mt-3 border-t border-gray-100">
                      <Link
                        href="/services"
                        className="text-primary-main font-medium hover:text-primary-dark inline-flex items-center text-sm"
                        onClick={closeMenu}
                      >
                        View All Services
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Tools Dropdown */}
            <div className="relative">
              <button 
                className={`flex items-center text-text-secondary hover:text-primary-main transition-colors font-medium px-2 py-2 ${activeDropdown === 'tools' ? 'text-primary-main' : ''}`}
                onClick={() => toggleDropdown('tools')}
                aria-expanded={activeDropdown === 'tools'}
                type="button"
              >
                <span>Tools</span>
                <svg className={`ml-1 w-4 h-4 transition-transform ${activeDropdown === 'tools' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Tools Dropdown Menu */}
              {activeDropdown === 'tools' && (
                <div className="absolute left-0 mt-2 w-72 bg-white shadow-xl rounded-lg overflow-hidden z-50 border border-gray-100">
                  <div className="p-4">
                    {Object.entries(toolsData).map(([category, tools]) => (
                      <div key={category} className="mb-4 last:mb-0">
                        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">{category}</h3>
                        <ul className="space-y-0.5">
                          {tools.map((tool) => (
                            <li key={tool.name}>
                              <Link
                                href={tool.href}
                                className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-50 text-text-secondary hover:text-primary-main text-sm transition-colors"
                                onClick={closeMenu}
                              >
                                {tool.name}
                                {tool.badge === 'popular' && (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-100 text-orange-600">
                                    🔥 Hot
                                  </span>
                                )}
                                {tool.badge === 'new' && (
                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-green-100 text-green-700">
                                    New
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="pt-3 mt-3 border-t border-gray-100">
                      <Link
                        href="/tools"
                        className="text-primary-main font-medium hover:text-primary-dark inline-flex items-center text-sm"
                        onClick={closeMenu}
                      >
                        View All 11 Tools
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Case Studies and Pricing links */}
            <Link
              href="/case-studies"
              className="text-text-secondary hover:text-primary-main transition-colors font-medium px-2 py-2"
            >
              Case Studies
            </Link>
            <Link
              href="/pricing"
              className="text-text-secondary hover:text-primary-main transition-colors font-medium px-2 py-2"
            >
              Pricing
            </Link>

            {/* CTA Button — primary conversion action */}
            <Button
              href="/contact"
              size="sm"
              className="!bg-primary-main hover:!bg-primary-dark text-white font-semibold px-5 shadow-sm hover:shadow-md transition-all"
            >
              Free SEO Audit
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* ─── Mobile Navigation ─── */}
      {/* Uses proper Next.js <Link> components for SPA navigation (no full page reloads) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t overflow-y-auto max-h-[80vh]">
          <Container>
            <nav className="flex flex-col py-4">
              {/* Main links */}
              <Link
                href="/"
                className="text-text-secondary hover:text-primary-main transition-colors font-medium py-3 border-b border-gray-100"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-text-secondary hover:text-primary-main transition-colors font-medium py-3 border-b border-gray-100"
                onClick={closeMenu}
              >
                About
              </Link>
              
              {/* Mobile Services Accordion */}
              <div className="border-b border-gray-100">
                <button
                  className={`flex justify-between items-center w-full text-left text-text-secondary hover:text-primary-main transition-colors font-medium py-3 ${activeDropdown === 'mobile-services' ? 'text-primary-main' : ''}`}
                  onClick={() => toggleDropdown('mobile-services')}
                  aria-expanded={activeDropdown === 'mobile-services'}
                  type="button"
                >
                  <span>Services</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${activeDropdown === 'mobile-services' ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeDropdown === 'mobile-services' && (
                  <div className="pl-4 pb-3">
                    {Object.entries(servicesData).map(([category, services]) => (
                      <div key={category} className="mb-3">
                        <h4 className="font-semibold text-xs uppercase tracking-wider text-text-secondary mt-3 mb-2">{category}</h4>
                        <ul className="space-y-2">
                          {services.map((service) => (
                            <li key={service.name}>
                              <Link
                                href={service.href}
                                className="text-text-secondary hover:text-primary-main transition-colors block py-1"
                                onClick={closeMenu}
                              >
                                {service.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="mt-3">
                      <Link
                        href="/services"
                        className="text-primary-main font-medium hover:text-primary-dark inline-flex items-center text-sm"
                        onClick={closeMenu}
                      >
                        View All Services
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Mobile Tools Accordion */}
              <div className="border-b border-gray-100">
                <button
                  className={`flex justify-between items-center w-full text-left text-text-secondary hover:text-primary-main transition-colors font-medium py-3 ${activeDropdown === 'mobile-tools' ? 'text-primary-main' : ''}`}
                  onClick={() => toggleDropdown('mobile-tools')}
                  aria-expanded={activeDropdown === 'mobile-tools'}
                  type="button"
                >
                  <span>Tools</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${activeDropdown === 'mobile-tools' ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeDropdown === 'mobile-tools' && (
                  <div className="pl-4 pb-3">
                    {Object.entries(toolsData).map(([category, tools]) => (
                      <div key={category} className="mb-3">
                        <h4 className="font-semibold text-xs uppercase tracking-wider text-text-secondary mt-3 mb-2">{category}</h4>
                        <ul className="space-y-2">
                          {tools.map((tool) => (
                            <li key={tool.name}>
                              <Link
                                href={tool.href}
                                className="flex items-center gap-2 text-text-secondary hover:text-primary-main transition-colors py-1"
                                onClick={closeMenu}
                              >
                                {tool.name}
                                {tool.badge === 'popular' && (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-100 text-orange-600">
                                    🔥 Hot
                                  </span>
                                )}
                                {tool.badge === 'new' && (
                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-green-100 text-green-700">
                                    New
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <Link
                        href="/tools"
                        className="text-primary-main font-medium hover:text-primary-dark inline-flex items-center text-sm"
                        onClick={closeMenu}
                      >
                        View All 11 Tools
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Case Studies and Pricing links */}
              <Link
                href="/case-studies"
                className="text-text-secondary hover:text-primary-main transition-colors font-medium py-3 border-b border-gray-100"
                onClick={closeMenu}
              >
                Case Studies
              </Link>
              <Link
                href="/pricing"
                className="text-text-secondary hover:text-primary-main transition-colors font-medium py-3 border-b border-gray-100"
                onClick={closeMenu}
              >
                Pricing
              </Link>
              <Link
                href="/testimonials"
                className="text-text-secondary hover:text-primary-main transition-colors font-medium py-3 border-b border-gray-100"
                onClick={closeMenu}
              >
                Testimonials
              </Link>

              {/* Mobile CTA area */}
              <div className="mt-4 space-y-3">
                <a
                  href="mailto:hello@immortalseo.com"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-primary-main text-primary-main rounded-lg font-medium hover:bg-primary-main/5 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  hello@immortalseo.com
                </a>
                <Button
                  href="/contact"
                  size="sm"
                  fullWidth
                  onClick={closeMenu}
                >
                  Get Your Free SEO Audit
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;
