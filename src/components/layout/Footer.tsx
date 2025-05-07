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
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.507 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
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