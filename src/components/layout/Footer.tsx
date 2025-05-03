import React from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import { SiteConfig, NavigationItem } from '@/types/site';

// Use require with type assertion for the site config
const siteConfig = require('../../../config/site.config') as SiteConfig;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text-primary text-white">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Immortal SEO</h3>
            <p className="mb-4 text-gray-300">
            We at Immortal SEO Agency have been delivering white-hat SEO services since 2008, helping businesses generate quality leads and achieve sustainable organic growth.
            </p>
            <div className="flex space-x-4">
              {Object.entries(siteConfig.links).map(([platform, url]) => (
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
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {siteConfig.navigation.main.map((item: NavigationItem) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {siteConfig.navigation.services.map((item: NavigationItem) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="mb-2 text-gray-300">{siteConfig.contact.address.street}</p>
              <p className="mb-2 text-gray-300">
                {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
              </p>
              <p className="mb-2 text-gray-300">{siteConfig.contact.address.country}</p>
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
            </address>
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