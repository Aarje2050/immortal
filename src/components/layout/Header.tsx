"use client";

import React, { useState, useEffect } from 'react';
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

// Tools data
const toolsData = [
  { name: 'llms.txt Generator', href: '/tools/llms-txt-generator' },
  { name: 'Robots.txt Generator', href: '/tools/robots-txt-generator' },
  { name: 'SEO Audit Checklist', href: '/tools/seo-audit-checklist' },
  { name: 'SEO Cost Calculator', href: '/tools/seo-cost-calculator' },
  { name: 'Schema Markup Generator', href: '/tools/schema-generator' },
  { name: 'View All Tools', href: '/tools' },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track scroll position for styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(prevState => prevState === name ? null : name);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  // Function to handle mobile submenu link clicks
  const handleMobileLinkClick = (href: string) => {
    // Close the menu
    closeMenu();
    // Navigate programmatically
    window.location.href = href;
  };

  const headerClass = `sticky top-0 z-50 transition-all duration-200 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
  }`;

  return (
    <header className={headerClass}>
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
          <nav className="hidden lg:flex items-center space-x-6">
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
                <div 
                  className="absolute left-0 mt-2 w-64 bg-white shadow-xl rounded-lg overflow-hidden z-50"
                >
                  <div className="p-4">
                    {Object.entries(servicesData).map(([category, services]) => (
                      <div key={category} className="mb-4">
                        <h3 className="text-sm font-bold text-text-primary mb-2">{category}</h3>
                        <ul className="space-y-1">
                          {services.map((service) => (
                            <li key={service.name}>
                              <Link
                                href={service.href}
                                className="block py-1 text-text-secondary hover:text-primary-main transition-colors"
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
                        className="text-primary-main font-medium hover:text-primary-dark inline-flex items-center"
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
                <div 
                  className="absolute left-0 mt-2 w-64 bg-white shadow-xl rounded-lg overflow-hidden z-50"
                >
                  <div className="p-4">
                    <ul className="space-y-2">
                      {toolsData.slice(0, -1).map((tool) => (
                        <li key={tool.name}>
                          <Link
                            href={tool.href}
                            className="block py-2 px-3 rounded hover:bg-gray-50 text-text-secondary hover:text-primary-main"
                            onClick={closeMenu}
                          >
                            {tool.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href="/tools"
                          className="block py-2 px-3 rounded text-primary-main font-medium hover:text-primary-dark mt-2 pt-2 border-t border-gray-100"
                          onClick={closeMenu}
                        >
                          View All Tools
                        </Link>
                      </li>
                    </ul>
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
              href="/blog"
              className="text-text-secondary hover:text-primary-main transition-colors font-medium px-2 py-2"
            >
              Blog
            </Link>
            <Link
              href="/pricing"
              className="text-text-secondary hover:text-primary-main transition-colors font-medium px-2 py-2"
            >
              Pricing
            </Link>
            
            {/* CTA Button */}
            <Button href="/contact" size="sm">
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

      {/* Mobile Navigation - Completely restructured */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t overflow-y-auto max-h-[80vh]">
          <Container>
            <nav className="flex flex-col py-4">
              {/* Home and About links */}
              <a
                href="/"
                className="text-text-secondary hover:text-primary-main transition-colors font-medium py-3 border-b border-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileLinkClick('/');
                }}
              >
                Home
              </a>
              <a
                href="/about"
                className="text-text-secondary hover:text-primary-main transition-colors font-medium py-3 border-b border-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileLinkClick('/about');
                }}
              >
                About
              </a>
              
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
                        <h4 className="font-semibold text-sm uppercase text-text-secondary mt-3 mb-2">{category}</h4>
                        <ul className="space-y-2">
                          {services.map((service) => (
                            <li key={service.name}>
                              <a
                                href={service.href}
                                className="text-text-secondary hover:text-primary-main transition-colors block py-1"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleMobileLinkClick(service.href);
                                }}
                              >
                                {service.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    
                    <div className="mt-3">
                      <a
                        href="/services"
                        className="text-primary-main font-medium hover:text-primary-dark inline-flex items-center"
                        onClick={(e) => {
                          e.preventDefault();
                          handleMobileLinkClick('/services');
                        }}
                      >
                        View All Services
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
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
                    <ul className="space-y-2">
                      {toolsData.slice(0, -1).map((tool) => (
                        <li key={tool.name}>
                          <a
                            href={tool.href}
                            className="text-text-secondary hover:text-primary-main transition-colors block py-1"
                            onClick={(e) => {
                              e.preventDefault();
                              handleMobileLinkClick(tool.href);
                            }}
                          >
                            {tool.name}
                          </a>
                        </li>
                      ))}
                      <li>
                        <a
                          href="/tools"
                          className="text-primary-main font-medium hover:text-primary-dark inline-flex items-center mt-2"
                          onClick={(e) => {
                            e.preventDefault();
                            handleMobileLinkClick('/tools');
                          }}
                        >
                          View All Tools
                          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Case Studies and Pricing links */}
              <a
                href="/case-studies"
                className="text-text-secondary hover:text-primary-main transition-colors font-medium py-3 border-b border-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileLinkClick('/case-studies');
                }}
              >
                Case Studies
              </a>
              <a
                href="/blog"
                className="text-text-secondary hover:text-primary-main transition-colors font-medium py-3 border-b border-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileLinkClick('/blog');
                }}
              >
                Blog
              </a>
              <a
                href="/pricing"
                className="text-text-secondary hover:text-primary-main transition-colors font-medium py-3 border-b border-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileLinkClick('/pricing');
                }}
              >
                Pricing
              </a>
              
              <div className="mt-4">
                <Button
                  href="/contact"
                  size="sm"
                  fullWidth
                  onClick={() => handleMobileLinkClick('/contact')}
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