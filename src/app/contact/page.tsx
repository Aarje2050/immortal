// src/app/contact/page.tsx

import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { SiteConfig, ServiceItem } from '@/types/site';
import JsonLd from '@/components/seo/JsonLd';
import ContactForm from '@/components/forms/ContactForm';
import { 
  getSchemaContext, 
  generateWebPageSchema, 
  generateSchemaGraph 
} from '@/lib/schema';

// Use type assertion for the site config
const siteConfig = require('../../../config/site.config') as SiteConfig;

// Define base URL for schema references
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
const pageUrl = `${baseUrl}/contact`;

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact Us | Immortal SEO',
  description: 'Get in touch with our SEO experts to discuss how we can help your business achieve sustainable growth through data-driven search strategies.',
});

export default function ContactPage() {
  // Get schema context with organization and website info
  const context = getSchemaContext();
  
  // Generate WebPage schema
  const webPageSchema = generateWebPageSchema({
    url: pageUrl,
    title: 'Contact Us | Immortal SEO',
    description: 'Get in touch with our SEO experts to discuss how we can help your business achieve sustainable growth through data-driven search strategies.',
    breadcrumbs: [
      { name: 'Home', url: baseUrl },
      { name: 'Contact', url: pageUrl },
    ],
  });
  
  // Generate ContactPage schema
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${pageUrl}#contactpage`,
    'name': 'Contact Immortal SEO',
    'description': 'Get in touch with our SEO experts',
    'url': pageUrl,
    'mainEntity': {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
    }
  };
  
  // Generate Place schema with more detail
  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${pageUrl}#place`,
    'name': `${siteConfig.name} Office`,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': siteConfig.contact.address.street,
      'addressLocality': siteConfig.contact.address.city,
      'addressRegion': siteConfig.contact.address.state,
      'postalCode': siteConfig.contact.address.zip,
      'addressCountry': siteConfig.contact.address.country,
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 24.88, // Replace with actual coordinates for your office
      'longitude': 74.61, // Replace with actual coordinates for your office
    },
    'telephone': siteConfig.contact.phone,
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '09:00',
        'closes': '18:00',
      }
    ]
  };
  
  // Enhance Contact Point schema
  const contactPointSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    '@id': `${pageUrl}#contactpoint`,
    'telephone': siteConfig.contact.phone,
    'email': siteConfig.contact.email,
    'contactType': 'customer service',
    'availableLanguage': ['English'],
    'areaServed': ['US', 'CA', 'IN'], // Countries served
    'hoursAvailable': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'],
      'opens': '09:00',
      'closes': '18:00',
    }
  };
  
  // Create schema graph with all schemas
  const schemaGraph = generateSchemaGraph([
    context.organization,
    context.website,
    webPageSchema,
    contactPageSchema,
    placeSchema,
    contactPointSchema
  ].filter(Boolean));

  return (
    <Layout>
      <JsonLd data={schemaGraph} />
      
      {/* Hero Section with Gradient Background - CENTERED like services page */}
      <section className="relative bg-gradient-to-r from-primary-dark to-primary-main text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
        </div>
        
        <Container>
          <div className="py-20 md:py-28 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-4 backdrop-blur-sm">
                Get In Touch With Us
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Contact <span className="text-yellow-300">ImmortalSEO</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Have questions or ready to grow your business? Our team of SEO experts is here to help.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  href="#contact-form"
                  variant="secondary"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Contact Us Now
                </Button>
                <Button
                  href="/services"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10 px-8"
                >
                  Explore Our Services
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Contact Section with Form and Info */}
      <Section id="contact-form">
        <Container>
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Contact Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We'd Love to Hear from You
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Whether you need help with your SEO strategy or have questions about our services, our team is ready to assist you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Information - 5 columns */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                <div className="p-8 bg-primary-main text-white">
                  <h3 className="text-2xl font-bold mb-2">Contact Information</h3>
                  <p>Get in touch with our expert team</p>
                </div>
                <div className="p-8">
                  <div className="space-y-8 mb-10">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Email Us</h4>
                        <a
                          href={`mailto:${siteConfig.contact.email}`}
                          className="text-primary-main hover:underline font-medium"
                        >
                          {siteConfig.contact.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Call Us</h4>
                        <a
                          href={`tel:${siteConfig.contact.phone}`}
                          className="text-primary-main hover:underline font-medium"
                        >
                          {siteConfig.contact.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Visit Our Office</h4>
                        <address className="text-text-secondary not-italic">
                          {siteConfig.contact.address.street}<br />
                          {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}<br />
                          {siteConfig.contact.address.country}
                        </address>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                    <div className="flex space-x-4">
                      <a
                        href={siteConfig.links.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="w-10 h-10 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center hover:bg-primary-main hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </a>
                      <a
                        href={siteConfig.links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                        className="w-10 h-10 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center hover:bg-primary-main hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                        </svg>
                      </a>
                      <a
                        href={siteConfig.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="w-10 h-10 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center hover:bg-primary-main hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      <a
                        href={siteConfig.links.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="w-10 h-10 rounded-full bg-primary-main/10 text-primary-main flex items-center justify-center hover:bg-primary-main hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form - 7 columns */}
            <div className="lg:col-span-7">
              <ContactForm services={siteConfig.mainServices} />
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Map Section */}
      <Section background="light">
        <Container>
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary-main/10 text-primary-main rounded-full text-sm font-medium mb-4">Our Location</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Visit Our Office
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              We're located in the heart of {siteConfig.contact.address.city}. Feel free to drop by during business hours.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 w-full bg-gray-200 flex items-center justify-center">
              {/* Google Map would be implemented here */}
              <div className="text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <p className="text-text-secondary max-w-md mx-auto">
                  Google Map integration would display our office location here.
                </p>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <h3 className="text-lg font-semibold mb-2">Address</h3>
                <address className="text-text-secondary not-italic">
                  {siteConfig.contact.address.street},<br />
                  {siteConfig.contact.address.city}
                </address>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
                <p className="text-text-secondary">
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact</h3>
                <p className="text-text-secondary">
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-primary-main hover:underline">{siteConfig.contact.phone}</a>
                </p>
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
                  Ready to Dominate Search Results?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Get a free SEO audit and discover untapped growth opportunities for your business.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button 
                  href="#contact-form" 
                  variant="secondary" 
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Contact Us Today
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}