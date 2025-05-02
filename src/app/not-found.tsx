import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Layout>
      <Section>
        <div className="text-center py-16 md:py-24">
          <h1 className="text-6xl md:text-8xl font-bold text-primary-main mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Page Not Found</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button href="/" size="lg">
              Return to Homepage
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>

      <Section background="light">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">
            You might be looking for:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-3">Our Services</h4>
              <p className="text-text-secondary mb-4">
                Learn about our comprehensive SEO services and solutions.
              </p>
              <Button href="/services" variant="text">
                View Services &rarr;
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-3">About Us</h4>
              <p className="text-text-secondary mb-4">
                Learn more about Immortal SEO and our approach to digital marketing.
              </p>
              <Button href="/about" variant="text">
                About Immortal SEO &rarr;
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-3">Contact Information</h4>
              <p className="text-text-secondary mb-4">
                Get in touch with our team for questions or to start a project.
              </p>
              <Button href="/contact" variant="text">
                Contact Us &rarr;
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-3">Free SEO Audit</h4>
              <p className="text-text-secondary mb-4">
                Get a comprehensive analysis of your website's SEO performance.
              </p>
              <Button href="/contact" variant="text">
                Get Free Audit &rarr;
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}