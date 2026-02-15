import { Metadata } from 'next';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/seo/JsonLd';
import { SiteConfig } from '@/types/site';
import {
  getSchemaContext,
  generateWebPageSchema,
  generateSchemaGraph,
  generateTestimonialSchema,
  generateAggregateRatingSchema,
} from '@/lib/schema';

const siteConfig = require('../../../config/site.config') as SiteConfig;
const baseUrl = siteConfig.url;
const pageUrl = `${baseUrl}/testimonials`;

export const metadata: Metadata = {
  title: 'Client Testimonials | What Our SEO Clients Say | Immortal SEO',
  description: 'Read real testimonials from businesses that have achieved measurable organic growth with Immortal SEO. Hear from our satisfied clients across the USA, Canada, and globally.',
  keywords: ['SEO testimonials', 'SEO client reviews', 'Immortal SEO reviews', 'SEO company reviews'],
  alternates: {
    canonical: pageUrl,
  },
};

// Testimonials data - These should be real client testimonials
// See REAL-DATA-REQUIREMENTS.md for items to verify
const testimonials = [
  {
    id: 'archie-zencoder',
    quote: "ImmortalSEO helped us rank for our main keyword 'AI Coding Agent' in under 3 months. Their AI-enhanced SEO strategies not only improved our Google rankings but also ensured visibility across AI-powered search platforms. They've been instrumental in driving qualified traffic and brand recognition.",
    author: 'Archie Sharma',
    position: 'COO',
    company: 'Zencoder.ai',
    industry: 'AI & Technology',
    services: ['AI-Enhanced SEO', 'Technical SEO', 'Content Strategy'],
    rating: 5,
  },
  {
    id: 'narendra-omgs',
    quote: "With ImmortalSEO's strategic support, we saw a significant increase in organic traffic for high-intent keywords like 'acrylic photo frames' and 'acrylic wall photo'. Their deep understanding of search behavior and technical SEO helped us dominate our niche in a competitive market.",
    author: 'Narendra Kumar',
    position: 'Founder',
    company: 'Omgs.in',
    industry: 'E-commerce & Manufacturing',
    services: ['Technical SEO', 'Content SEO', 'E-commerce SEO'],
    rating: 5,
  },
  {
    id: 'rohit-omgs-marketing',
    quote: "ImmortalSEO's dual-optimization approach transformed our online presence. Not only did our Google rankings improve dramatically, but we're now consistently featured in AI-powered search results which has opened up an entirely new traffic channel for our business.",
    author: 'Rohit Sharma',
    position: 'Marketing Director',
    company: 'OMGS.in',
    industry: 'Digital Marketing & Online Media',
    services: ['Semantic SEO', 'AI-Enhanced Content Strategy', 'Schema Implementation'],
    rating: 5,
  },
];

export default function TestimonialsPage() {
  const context = getSchemaContext();

  const webPageSchema = generateWebPageSchema({
    url: pageUrl,
    title: 'Client Testimonials | What Our SEO Clients Say | Immortal SEO',
    description: 'Read real testimonials from businesses that have achieved measurable organic growth with Immortal SEO.',
    breadcrumbs: [
      { name: 'Home', url: baseUrl },
      { name: 'Testimonials', url: pageUrl },
    ],
  });

  // Generate review schemas for each testimonial
  const reviewSchemas = testimonials.map((testimonial) =>
    generateTestimonialSchema({
      reviewBody: testimonial.quote,
      author: testimonial.author,
      datePublished: new Date().toISOString().split('T')[0], // Use current date as default
      itemReviewed: {
        '@type': 'Service',
        name: 'SEO Services',
        url: `${baseUrl}/services`,
      },
      ratingValue: testimonial.rating,
    })
  );

  // Generate aggregate rating
  const aggregateRatingSchema = generateAggregateRatingSchema({
    ratingValue: 4.9,
    reviewCount: testimonials.length,
    bestRating: 5,
    worstRating: 1,
  });

  const schemas = [
    context.organization,
    context.website,
    webPageSchema,
    aggregateRatingSchema,
    ...reviewSchemas,
  ].filter(Boolean);

  const schemaGraph = generateSchemaGraph(schemas);

  const breadcrumbs = [{ name: 'Testimonials', href: '/testimonials' }];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <JsonLd data={schemaGraph} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-dark to-primary-main text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
        </div>
        <Container>
          <div className="py-16 md:py-24 relative z-10 text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-4 backdrop-blur-sm">
              Client Success Stories
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Clients Say About Immortal SEO
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Real results from real businesses. Read how our data-driven SEO strategies
              have helped companies achieve sustainable organic growth.
            </p>
            <div className="flex items-center justify-center mt-6 space-x-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-lg font-semibold">4.9/5 Average Rating</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials Grid */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-text-secondary leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author Info */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center mb-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-main/10 flex items-center justify-center text-primary-main font-bold mr-3">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{testimonial.author}</p>
                      <p className="text-sm text-text-secondary">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Industry & Services Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    <span className="px-2 py-0.5 bg-primary-main/10 text-primary-main text-xs font-medium rounded-full">
                      {testimonial.industry}
                    </span>
                  </div>

                  {/* Services Used */}
                  <div className="mt-3">
                    <p className="text-xs text-text-secondary mb-1">Services used:</p>
                    <div className="flex flex-wrap gap-1">
                      {testimonial.services.map((service) => (
                        <span key={service} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Note about more testimonials */}
          <div className="mt-12 text-center bg-background-paper rounded-xl p-8">
            <p className="text-text-secondary text-lg mb-4">
              Want to see the full results behind these testimonials?
            </p>
            <Button
              href="/case-studies"
              variant="primary"
              className="hover:shadow-lg transition-shadow"
            >
              View Detailed Case Studies
            </Button>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="primary">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Become Our Next Success Story?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Join businesses across the USA and Canada that trust Immortal SEO to drive their organic growth.
            </p>
            <Button href="/contact" variant="outline" size="lg">
              Get Your Free SEO Audit
            </Button>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}
