"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { SiteConfig, NavigationItem } from '@/types/site';

// Use require with type assertion for the site config
const siteConfig = require('../../../config/site.config') as SiteConfig;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
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
          <nav className="hidden md:flex items-center space-x-8">
            {siteConfig.navigation.main.map((item: NavigationItem) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-text-secondary hover:text-primary-main transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Button href="/contact" size="sm">
              Get a Free Audit
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
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

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <Container>
            <nav className="flex flex-col py-4 space-y-4">
              {siteConfig.navigation.main.map((item: NavigationItem) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-text-secondary hover:text-primary-main transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                href="/contact"
                size="sm"
                fullWidth
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get a Free Audit
              </Button>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;