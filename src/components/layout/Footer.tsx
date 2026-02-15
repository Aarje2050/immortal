import React from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import { SiteConfig, NavigationItem } from '@/types/site';

// Use require with type assertion for the site config
const siteConfig = require('../../../config/site.config') as SiteConfig;

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
    <footer className="bg-text-primary text-white">
      <Container>
        {/* Main Footer Content */}
        <div className="py-12">
          {/* Top Section - Company Info */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Company Info */}
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold mb-4">Immortal SEO</h3>
                <p className="mb-6 text-gray-300 text-lg">
                  We at Immortal SEO Agency have been delivering white-hat SEO services since 2008, helping businesses generate quality leads and achieve sustainable organic growth.
                </p>
                <div className="flex space-x-4">
                  {Object.entries(siteConfig.links)
                    .filter(([, url]) => url && typeof url === 'string' && url.length > 0)
                    .map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={platform}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.507 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <address className="not-italic">
                    <p className="mb-2 text-gray-300">{siteConfig.contact.address.street}</p>
                    <p className="mb-2 text-gray-300">
                      {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
                    </p>
                    <p className="mb-2 text-gray-300">{siteConfig.contact.address.country}</p>
                  </address>
                  <div>
                    <p className="mb-2">
                      <a href={`tel:${siteConfig.contact.phone}`} className="text-gray-300 hover:text-white transition-colors">
                        {siteConfig.contact.phone}
                      </a>
                    </p>
                    <p>
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-gray-300 hover:text-white transition-colors">
                        {siteConfig.contact.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6">SEO Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(footerData.services).map(([category, services]) => (
                <div key={category}>
                  <h4 className="text-lg font-medium mb-4 text-primary-light">{category}</h4>
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
          </div>

          {/* Industries Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6">Industries We Serve</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(footerData.industries).map(([category, industries]) => (
                <div key={category}>
                  <h4 className="text-lg font-medium mb-4 text-primary-light">{category}</h4>
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
          </div>

          {/* Locations Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6">SEO Services by Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(footerData.locations).map(([region, locations]) => (
                <div key={region}>
                  <h4 className="text-lg font-medium mb-4 text-primary-light">{region}</h4>
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
          </div>

          {/* Quick Links */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {siteConfig.navigation.main.map((item: NavigationItem) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/tools" className="text-gray-300 hover:text-white transition-colors text-sm">
                SEO Tools
              </Link>
              <Link href="/case-studies" className="text-gray-300 hover:text-white transition-colors text-sm">
                Case Studies
              </Link>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="py-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-gray-400">
              &copy; {currentYear} Immortal SEO. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
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