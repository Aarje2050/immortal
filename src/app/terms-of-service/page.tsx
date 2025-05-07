// app/terms-of-service/page.tsx
import { Metadata } from 'next';
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'Terms of Service | ImmortalSEO',
  description: 'The terms and conditions governing your use of ImmortalSEO services and website. Read our legal agreement before using our SEO services.',
  keywords: ['terms of service', 'terms and conditions', 'ImmortalSEO terms', 'service agreement', 'legal terms'],
  alternates: {
    canonical: 'https://immortalseo.com/terms-of-service',
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
const termsSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  'name': 'Terms of Service',
  'description': 'Terms and conditions for using ImmortalSEO services',
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

export default function TermsOfServicePage() {
  return (
    <Layout>
    <div className="flex flex-col min-h-screen">
      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
      />
      
      {/* Header Section */}
      <section className="bg-primary-main text-white py-12">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Terms of Service</h1>
          <p className="text-lg text-center max-w-3xl mx-auto">
            Please read these terms carefully before using our services
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
                Welcome to ImmortalSEO. These Terms of Service ("Terms") govern your access to and use of ImmortalSEO's website, products, and services ("Services"). Please read these Terms carefully before using our Services.
              </p>
              <p>
                By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you should not access or use our Services.
              </p>
            </div>
            
            <h2 id="account-terms" className="text-2xl font-bold mb-4">1. Account Terms</h2>
            <div className="mb-8">
              <p>
                When you create an account with us, you must provide accurate, complete, and up-to-date information. You are responsible for safeguarding your account password and for any activities or actions under your account. We are not liable for any losses or damages arising from your failure to comply with these requirements.
              </p>
              <p>
                You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
              <p>
                We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion.
              </p>
            </div>
            
            <h2 id="service-terms" className="text-2xl font-bold mb-4">2. Service Terms</h2>
            <div className="mb-8">
              <p>
                We provide SEO and digital marketing services to help improve your online visibility and organic traffic. While we strive to deliver the best possible results, we cannot guarantee specific rankings, traffic increases, or conversion rates. Search engine algorithms and digital marketing environments are constantly changing and outside of our direct control.
              </p>
              <p>
                Our Services require your active participation and cooperation. This includes providing necessary access to websites, accounts, and information as requested, as well as implementing recommended changes in a timely manner.
              </p>
              <p>
                We will provide regular updates and reports as specified in your service agreement. Any additional services not included in your original agreement may incur extra charges.
              </p>
              <p>
                We reserve the right to modify, suspend, or discontinue any part of our Services at any time without prior notice.
              </p>
            </div>
            
            <h2 id="payment-terms" className="text-2xl font-bold mb-4">3. Payment Terms</h2>
            <div className="mb-8">
              <p>
                You agree to pay all fees associated with your selected Services as outlined in your service agreement. All payments are due according to the payment schedule specified in your agreement.
              </p>
              <p>
                Late payments may result in service suspension and may incur additional fees. If you fail to pay any amounts owed, we reserve the right to pursue collection actions.
              </p>
              <p>
                We may change our fees and payment structure for new service agreements. Any changes to fees for existing services will be communicated with at least 30 days' notice.
              </p>
              <p>
                All fees are exclusive of all taxes, levies, or duties imposed by taxing authorities, and you shall be responsible for payment of all such taxes, levies, or duties.
              </p>
            </div>
            
            <h2 id="intellectual-property" className="text-2xl font-bold mb-4">4. Intellectual Property Rights</h2>
            <div className="mb-8">
              <p>
                The content, features, and functionality of our website, including but not limited to text, graphics, logos, images, and software, are owned by ImmortalSEO and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                We grant you a limited, non-exclusive, non-transferable, and revocable license to use our Services for their intended purposes in accordance with these Terms.
              </p>
              <p>
                Content we create for you as part of our Services (such as SEO strategies, keyword research, content recommendations, etc.) becomes your property upon full payment of all applicable fees. However, we reserve the right to use anonymized data and general methodologies for research, development, and service improvement.
              </p>
              <p>
                You retain ownership of your pre-existing content and materials. By providing content to us, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute such content solely for the purpose of providing our Services to you.
              </p>
            </div>
            
            <h2 id="acceptable-use" className="text-2xl font-bold mb-4">5. Acceptable Use</h2>
            <div className="mb-8">
              <p>
                You agree not to use our Services for any purpose that is unlawful, prohibited by these Terms, or harmful to others. Prohibited activities include, but are not limited to:
              </p>
              <ul className="list-disc pl-6">
                <li>Engaging in any illegal activities or promoting illegal content</li>
                <li>Attempting to gain unauthorized access to our systems or interfering with their normal functioning</li>
                <li>Using our Services to distribute malware, spam, or other harmful content</li>
                <li>Misrepresenting your identity or affiliation with any person or organization</li>
                <li>Using our Services to infringe upon the intellectual property rights of others</li>
                <li>Using our Services to promote hate speech, discrimination, or violence</li>
                <li>Engaging in activities that violate search engine terms of service or guidelines</li>
              </ul>
              <p>
                We reserve the right to terminate your access to our Services immediately and without notice if we determine, in our sole discretion, that you have violated these acceptable use policies.
              </p>
            </div>
            
            <h2 id="limitation-liability" className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
            <div className="mb-8">
              <p>
                To the maximum extent permitted by law, ImmortalSEO and its directors, employees, partners, and service providers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses resulting from:
              </p>
              <ol className="list-decimal pl-6">
                <li>Your use or inability to use our Services</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                <li>Any changes to or discontinuation of our Services</li>
                <li>Any actions we take or fail to take as a result of communications you send to us</li>
                <li>Any changes in search engine algorithms or digital marketing environments</li>
              </ol>
              <p>
                In any event, our total liability to you for all claims arising from or relating to these Terms or your use of our Services shall not exceed the amount paid by you to us during the six (6) months preceding the event giving rise to the liability.
              </p>
            </div>
            
            <h2 id="indemnification" className="text-2xl font-bold mb-4">7. Indemnification</h2>
            <div className="mb-8">
              <p>
                You agree to indemnify, defend, and hold harmless ImmortalSEO and its directors, employees, partners, and service providers from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:
              </p>
              <ul className="list-disc pl-6">
                <li>Your violation of these Terms</li>
                <li>Your use of our Services</li>
                <li>Your violation of any rights of a third party, including intellectual property rights</li>
                <li>Your violation of any applicable laws, rules, or regulations</li>
                <li>Any content that you submit to us or our Services</li>
              </ul>
            </div>
            
            <h2 id="termination" className="text-2xl font-bold mb-4">8. Termination</h2>
            <div className="mb-8">
              <p>
                We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including, but not limited to, a breach of these Terms.
              </p>
              <p>
                You may terminate your service agreement with us according to the cancellation terms specified in your agreement. Typically, this requires written notice at least 30 days prior to the next billing cycle.
              </p>
              <p>
                Upon termination, your right to use our Services will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive termination, including, but not limited to, ownership provisions, warranty disclaimers, indemnification, and limitations of liability.
              </p>
            </div>
            
            <h2 id="modifications" className="text-2xl font-bold mb-4">9. Modifications to Terms</h2>
            <div className="mb-8">
              <p>
                We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <p>
                By continuing to access or use our Services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use our Services.
              </p>
            </div>
            
            <h2 id="governing-law" className="text-2xl font-bold mb-4">10. Governing Law</h2>
            <div className="mb-8">
              <p>
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Udaipur, Rajasthan, India.
              </p>
            </div>
            
            <h2 id="miscellaneous" className="text-2xl font-bold mb-4">11. Miscellaneous</h2>
            <div className="mb-8">
              <p>
                <strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy and any service agreements you have entered into with us, constitute the entire agreement between you and ImmortalSEO regarding your use of our Services.
              </p>
              <p>
                <strong>Waiver:</strong> Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions of these Terms will remain in effect.
              </p>
              <p>
                <strong>Assignment:</strong> You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written consent. Any attempt by you to assign or transfer these Terms without such consent will be null and void. We may freely assign or transfer these Terms without restriction.
              </p>
              <p>
                <strong>Notices:</strong> Any notices or other communications provided by us under these Terms, including those regarding modifications to these Terms, will be posted on our website or sent to you via email.
              </p>
              <p>
                <strong>Force Majeure:</strong> We shall not be liable for any delay or failure to perform resulting from causes outside our reasonable control, including, but not limited to, acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, or shortages of transportation facilities, fuel, energy, labor, or materials.
              </p>
            </div>
            
            <h2 id="contact" className="text-2xl font-bold mb-4">12. Contact Us</h2>
            <div className="mb-8">
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-4">
                <p>ImmortalSEO</p>
                <p>Email: legal@immortalseo.com</p>
                <p>Address: 123 SEO Street, Udaipur, Rajasthan, 313001, India</p>
                <p>Phone: +91-1234567890</p>
              </div>
            </div>
          </div>
          
          {/* Table of Contents - Side Navigation */}
          <div className="fixed top-1/4 right-4 hidden xl:block">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Quick Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#account-terms" className="text-primary-main hover:underline">1. Account Terms</a>
                </li>
                <li>
                  <a href="#service-terms" className="text-primary-main hover:underline">2. Service Terms</a>
                </li>
                <li>
                  <a href="#payment-terms" className="text-primary-main hover:underline">3. Payment Terms</a>
                </li>
                <li>
                  <a href="#intellectual-property" className="text-primary-main hover:underline">4. Intellectual Property</a>
                </li>
                <li>
                  <a href="#acceptable-use" className="text-primary-main hover:underline">5. Acceptable Use</a>
                </li>
                <li>
                  <a href="#limitation-liability" className="text-primary-main hover:underline">6. Limitation of Liability</a>
                </li>
                <li>
                  <a href="#indemnification" className="text-primary-main hover:underline">7. Indemnification</a>
                </li>
                <li>
                  <a href="#termination" className="text-primary-main hover:underline">8. Termination</a>
                </li>
                <li>
                  <a href="#contact" className="text-primary-main hover:underline">12. Contact Us</a>
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
                href="/privacy-policy" 
                className="inline-flex items-center text-primary-main font-medium hover:text-primary-dark"
              >
                Privacy Policy
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