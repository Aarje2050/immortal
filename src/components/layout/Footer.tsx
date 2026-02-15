import React from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import { SiteConfig, NavigationItem } from '@/types/site';

// Use require with type assertion for the site config
const siteConfig = require('../../../config/site.config') as SiteConfig;

// Platform-specific social icons
function SocialIcon({ platform }: { platform: string }) {
  const cls = "h-5 w-5";
  switch (platform) {
    case 'facebook':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.507 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      );
  }
}

// Enhanced footer data structure
const footerData = {
  services: {
    'Core SEO Services': [
      { name: 'Technical SEO', href: '/services/technical-seo' },
      { name: 'Content SEO', href: '/services/content-seo' },
      { name: 'Off-Page SEO', href: '/services/off-page-seo' },
      { name: 'Local SEO', href: '/services/local-seo' },
    ],
    'Advanced Solutions': [
      { name: 'AI-Enhanced SEO', href: '/services/ai-enhanced-seo' },
      { name: 'Semantic SEO', href: '/services/semantic-seo' },
    ],
    'Industry-Specific': [
      { name: 'E-commerce SEO', href: '/services/ecommerce-seo' },
      { name: 'SaaS & B2B SEO', href: '/services/saas-seo' },
      { name: 'Small Business SEO', href: '/services/small-business-seo' },
      { name: 'Enterprise SEO', href: '/services/enterprise-seo' },
    ],
    'CMS-Specific': [
      { name: 'WordPress SEO', href: '/services/wordpress-seo' },
      { name: 'Shopify SEO', href: '/services/shopify-seo' },
      { name: 'HubSpot SEO', href: '/services/hubspot-seo-services' },
    ]
  },
  industries: {
    'Healthcare': [
      { name: 'Dermatologist SEO', href: '/industries/dermatologist' },
      { name: 'IVF Hospitals SEO', href: '/industries/ivf-hospitals' },
    ],
    'Services': [
      { name: 'Plumbing SEO', href: '/industries/plumbing-service' },
      { name: 'House Cleaning SEO', href: '/industries/house-cleaning' },
      { name: 'Towing Service SEO', href: '/industries/towing-service' },
      { name: 'Taxi Service SEO', href: '/industries/taxi-service' },
    ],
    'Retail & Food': [
      { name: 'Restaurant SEO', href: '/industries/restaurants' },
      { name: 'E-commerce SEO', href: '/industries/e-commerce' },
      { name: 'Tattoo Shop SEO', href: '/industries/tattoo-shops' },
    ],
    'Professional': [
      { name: 'Garage Door SEO', href: '/industries/garage-door' },
      { name: 'Roofing Services SEO', href: '/industries/roofing-services' },
      { name: 'Dry Cleaning SEO', href: '/industries/dry-cleaning' },
    ]
  },
  locations: {
    'United States': [
      { name: 'New York SEO', href: '/locations/new-york' },
      { name: 'Los Angeles SEO', href: '/locations/los-angeles' },
      { name: 'Chicago SEO', href: '/locations/chicago' },
      { name: 'Houston SEO', href: '/locations/houston' },
      { name: 'San Francisco SEO', href: '/locations/san-francisco' },
    ],
    'More US Cities': [
      { name: 'Dallas SEO', href: '/locations/dallas' },
      { name: 'Seattle SEO', href: '/locations/seattle' },
      { name: 'Miami SEO', href: '/locations/miami' },
      { name: 'Boston SEO', href: '/locations/boston' },
      { name: 'Phoenix SEO', href: '/locations/phoenix' },
    ],
    'Canada': [
      { name: 'Toronto SEO', href: '/locations/toronto' },
      { name: 'Vancouver SEO', href: '/locations/vancouver' },
      { name: 'Montreal SEO', href: '/locations/montreal' },
      { name: 'Calgary SEO', href: '/locations/calgary' },
      { name: 'Ottawa SEO', href: '/locations/ottawa' },
    ]
  }
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text-primary text-white" role="contentinfo">
      {/* ─── Footer CTA Bar ─── */}
      <div className="bg-primary-dark">
        <Container>
          <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                Ready to Improve Your Search Rankings?
              </h2>
              <p className="text-white/80 mt-1">
                Get a free SEO audit and discover untapped growth opportunities.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="mailto:hello@immortalseo.com"
                className="flex items-center gap-2 px-5 py-3 border border-white/30 rounded-lg text-white hover:bg-white/10 transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                hello@immortalseo.com
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 bg-white text-primary-dark rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Free SEO Audit
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        {/* ─── Main Footer Content ─── */}
        <div className="py-12">
          {/* Top Section — Company Info + Contact + Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 pb-12 border-b border-gray-700">
            {/* Company Description */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-4">Immortal SEO</h3>
              <p className="mb-5 text-gray-300 text-sm leading-relaxed">
                Immortal SEO is a data-driven SEO company helping businesses across
                the USA and Canada achieve sustainable organic growth since 2008. Our
                SEO experts combine technical excellence with AI-enhanced strategies.
              </p>
              <div className="flex space-x-3">
                {Object.entries(siteConfig.links)
                  .filter(([, url]) => url && typeof url === 'string' && url.length > 0)
                  .map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Immortal SEO on ${platform}`}
                    className="w-9 h-9 rounded-lg bg-gray-700 hover:bg-primary-main flex items-center justify-center text-gray-300 hover:text-white transition-all"
                  >
                    <SocialIcon platform={platform} />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Contact Us</h3>
              <address className="not-italic space-y-3 text-sm">
                <p className="text-gray-300">
                  {siteConfig.contact.address.street}<br />
                  {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}<br />
                  {siteConfig.contact.address.country}
                </p>
                <p>
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    +91 96499-30799
                  </a>
                </p>
                <p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    {siteConfig.contact.email}
                  </a>
                </p>
              </address>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Quick Links</h3>
              <nav aria-label="Quick links">
                <ul className="space-y-2 text-sm">
                  {siteConfig.navigation.main.map((item: NavigationItem) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/testimonials" className="text-gray-300 hover:text-white transition-colors">
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href="/case-studies" className="text-gray-300 hover:text-white transition-colors">
                      Case Studies
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Tools */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Free SEO Tools</h3>
              <nav aria-label="SEO tools">
                <ul className="space-y-2 text-sm">
                  <li><Link href="/tools" className="text-gray-300 hover:text-white transition-colors">All SEO Tools</Link></li>
                  <li><Link href="/tools/seo-audit-checklist" className="text-gray-300 hover:text-white transition-colors">SEO Audit Checklist</Link></li>
                  <li><Link href="/tools/schema-generator" className="text-gray-300 hover:text-white transition-colors">Schema Generator</Link></li>
                  <li><Link href="/tools/seo-cost-calculator" className="text-gray-300 hover:text-white transition-colors">SEO Cost Calculator</Link></li>
                  <li><Link href="/tools/meta-tags-generator" className="text-gray-300 hover:text-white transition-colors">Meta Tags Generator</Link></li>
                  <li><Link href="/tools/llms-txt-generator" className="text-gray-300 hover:text-white transition-colors">llms.txt Generator</Link></li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-10 pb-10 border-b border-gray-700">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">SEO Services</h3>
            <nav aria-label="SEO services">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {Object.entries(footerData.services).map(([category, services]) => (
                  <div key={category}>
                    <h4 className="text-sm font-semibold mb-3 text-primary-light">{category}</h4>
                    <ul className="space-y-2">
                      {services.map((service) => (
                        <li key={service.name}>
                          <Link
                            href={service.href}
                            className="text-gray-300 hover:text-white transition-colors text-sm"
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          </div>

          {/* Industries + Locations — compact side-by-side layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10 pb-10 border-b border-gray-700">
            {/* Industries */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Industries We Serve</h3>
              <nav aria-label="Industry SEO services">
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(footerData.industries).map(([category, industries]) => (
                    <div key={category}>
                      <h4 className="text-sm font-semibold mb-3 text-primary-light">{category}</h4>
                      <ul className="space-y-2">
                        {industries.map((industry) => (
                          <li key={industry.name}>
                            <Link
                              href={industry.href}
                              className="text-gray-300 hover:text-white transition-colors text-sm"
                            >
                              {industry.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </nav>
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">SEO Services by Location</h3>
              <nav aria-label="Location SEO services">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {Object.entries(footerData.locations).map(([region, locations]) => (
                    <div key={region}>
                      <h4 className="text-sm font-semibold mb-3 text-primary-light">{region}</h4>
                      <ul className="space-y-2">
                        {locations.map((location) => (
                          <li key={location.name}>
                            <Link
                              href={location.href}
                              className="text-gray-300 hover:text-white transition-colors text-sm"
                            >
                              {location.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* ─── Legal & Copyright ─── */}
        <div className="py-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Immortal SEO. All rights reserved. Serving businesses in the USA, Canada &amp; worldwide since 2008.
            </p>
            <div className="flex space-x-6">
              {siteConfig.navigation.legal.map((item: NavigationItem) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
