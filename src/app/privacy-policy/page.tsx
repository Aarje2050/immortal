// app/privacy-policy/page.tsx
import { Metadata } from 'next';
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Link from 'next/link';
import Layout from '@/components/layout/Layout';


// Define metadata for SEO
export const metadata: Metadata = {
  title: 'Privacy Policy | ImmortalSEO',
  description: 'Our privacy policy outlines how ImmortalSEO collects, uses, and protects your personal information when you use our website or services.',
  keywords: ['privacy policy', 'data protection', 'ImmortalSEO privacy', 'personal information protection'],
  alternates: {
    canonical: 'https://immortalseo.com/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// Structured data
const privacyPolicySchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  'name': 'Privacy Policy',
  'description': 'Privacy Policy for ImmortalSEO services',
  'publisher': {
    '@type': 'Organization',
    'name': 'ImmortalSEO',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://immortalseo.com/images/logo.png'
    }
  },
  'dateModified': '2025-05-07'  // Current date
};

export default function PrivacyPolicyPage() {
  return (
    <Layout>
    <div className="flex flex-col min-h-screen">
      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyPolicySchema) }}
      />
      
      {/* Header Section */}
      <section className="bg-primary-main text-white py-12">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Privacy Policy</h1>
          <p className="text-lg text-center max-w-3xl mx-auto">
            How we collect, use, and protect your personal information
          </p>
          <div className="flex justify-center mt-6">
            <p className="text-sm">Last Updated: May 7, 2025</p>
          </div>
        </Container>
      </section>
      
      {/* Main Content */}
      <Section>
        <Container>
          <div className="prose prose-lg max-w-4xl mx-auto">
            <div className="mb-12">
              <p>
                At ImmortalSEO, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using our website and services, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this Privacy Policy.
              </p>
            </div>
            
            <h2 id="information-we-collect" className="text-2xl font-bold mb-4">Information We Collect</h2>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
              <p>
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Fill out forms on our website</li>
                <li>Register for an account</li>
                <li>Subscribe to our newsletter</li>
                <li>Request a quote or consultation</li>
                <li>Contact us via email, phone, or other communication channels</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p>
                The personal information we may collect includes:
              </p>
              <ul className="list-disc pl-6">
                <li>Name, email address, phone number, and company name</li>
                <li>Billing information and payment details</li>
                <li>Website URL and business information</li>
                <li>Any other information you choose to provide</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Automatically Collected Information</h3>
              <p>
                When you visit our website, we automatically collect certain information about your device and browsing actions, including:
              </p>
              <ul className="list-disc pl-6">
                <li>IP address and geographical location</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on those pages</li>
                <li>Referral source</li>
                <li>Device information (e.g., device type and mobile device identifiers)</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Cookies and Tracking Technologies</h3>
              <p>
                We use cookies, web beacons, and similar tracking technologies to collect information about your browsing activities. These technologies help us analyze website traffic, customize content, and improve your experience.
              </p>
              <p>
                You can control cookies through your browser settings. However, disabling cookies may limit your access to certain features of our website.
              </p>
            </div>
            
            <h2 id="how-we-use-information" className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <div className="mb-8">
              <p>
                We may use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6">
                <li>Providing and maintaining our services</li>
                <li>Processing transactions and sending related information</li>
                <li>Responding to inquiries and providing customer support</li>
                <li>Sending administrative information, such as updates or changes to our terms and policies</li>
                <li>Sending marketing communications and promotional materials</li>
                <li>Conducting research and analysis to improve our services</li>
                <li>Protecting against fraudulent, unauthorized, or illegal activity</li>
                <li>Complying with legal obligations</li>
              </ul>
            </div>
            
            <h2 id="information-sharing" className="text-2xl font-bold mb-4">Information Sharing and Disclosure</h2>
            <div className="mb-8">
              <p>
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6">
                <li><strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting, and customer service.</li>
                <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                <li><strong>Protection of Rights:</strong> We may disclose your information to protect our rights, privacy, safety, or property, as well as that of our users or others.</li>
              </ul>
              <p>
                We do not sell, rent, or trade your personal information to third parties for their marketing purposes without your explicit consent.
              </p>
            </div>
            
            {/* Continue with remaining sections */}
            <h2 id="data-security" className="text-2xl font-bold mb-4">Data Security</h2>
            <div className="mb-8">
              <p>
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>
            
            <h2 id="your-rights" className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
            <div className="mb-8">
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6">
                <li>The right to access the personal information we hold about you</li>
                <li>The right to request correction of inaccurate or incomplete information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to restrict or object to processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent at any time</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </div>
            
            <h2 id="third-party-links" className="text-2xl font-bold mb-4">Third-Party Links</h2>
            <div className="mb-8">
              <p>
                Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties. We encourage you to review the privacy policies of any third-party websites or services you visit.
              </p>
            </div>
            
            <h2 id="children" className="text-2xl font-bold mb-4">Children's Privacy</h2>
            <div className="mb-8">
              <p>
                Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will take steps to delete such information.
              </p>
            </div>
            
            <h2 id="changes" className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
            <div className="mb-8">
              <p>
                We may update this Privacy Policy from time to time. The updated version will be effective as of the date stated at the top of this Privacy Policy. We encourage you to review this Privacy Policy periodically to stay informed about our information practices.
              </p>
            </div>
            
            <h2 id="contact" className="text-2xl font-bold mb-4">Contact Us</h2>
            <div className="mb-8">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-4">
                <p>ImmortalSEO</p>
                <p>Email: hello@immortalseo.com</p>
                <p>Address: A9, Pratap Nagar, Chittorgarh, Rajasthan 312001, Indiam</p>
                <p>Phone: +919649930799  </p>
              </div>
            </div>
          </div>
          
          {/* Table of Contents - Side Navigation */}
          <div className="fixed top-1/4 right-4 hidden xl:block">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Quick Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#information-we-collect" className="text-primary-main hover:underline">Information We Collect</a>
                </li>
                <li>
                  <a href="#how-we-use-information" className="text-primary-main hover:underline">How We Use Information</a>
                </li>
                <li>
                  <a href="#information-sharing" className="text-primary-main hover:underline">Information Sharing</a>
                </li>
                <li>
                  <a href="#data-security" className="text-primary-main hover:underline">Data Security</a>
                </li>
                <li>
                  <a href="#your-rights" className="text-primary-main hover:underline">Your Rights</a>
                </li>
                <li>
                  <a href="#contact" className="text-primary-main hover:underline">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Footer CTA */}
      <Section background="light">
        <Container>
          <div className="text-center py-8">
            <p className="mb-4">For more information about our services:</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link 
                href="/contact" 
                className="inline-flex items-center text-primary-main font-medium hover:text-primary-dark"
              >
                Contact Us
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link 
                href="/terms-of-service" 
                className="inline-flex items-center text-primary-main font-medium hover:text-primary-dark"
              >
                Terms of Service
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
    </Layout>);
  
}