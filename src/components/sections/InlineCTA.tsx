// src/components/sections/InlineCTA.tsx

import React from 'react';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';

interface InlineCTAProps {
  title?: string;
  description?: string;
  context?: string; // e.g., "blog", "homepage", "service-page"
  contentType?: string; // e.g., "SEO", "Content Marketing", "Local SEO"
  bgColor?: 'white' | 'light' | 'primary' | 'dark';
  layout?: 'standard' | 'compact' | 'split';
}

const InlineCTA: React.FC<InlineCTAProps> = ({
  title = "Boost Your Online Presence",
  description = "Get expert SEO strategies tailored to your business needs",
  context = "general",
  contentType = "",
  bgColor = 'white',
  layout = 'standard'
}) => {
  // Determine the background color class
  const getBgColorClass = () => {
    switch (bgColor) {
      case 'light': return 'bg-gray-50';
      case 'primary': return 'bg-primary-main text-white';
      case 'dark': return 'bg-gray-800 text-white';
      default: return 'bg-white';
    }
  };
  
  // Create a custom subject line based on context
  const getSubjectLine = () => {
    if (contentType) {
      return `Lead from ${context} - ${contentType} - ImmortalSEO`;
    }
    return `Lead from ${context} section - ImmortalSEO`;
  };
  
  // For compact layout, show a minimal version with just a button
  if (layout === 'compact') {
    return (
      <div className={`py-6 ${getBgColorClass()}`}>
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-xl font-bold mb-1">{title}</h3>
              <p className={`${bgColor === 'primary' || bgColor === 'dark' ? 'text-white/80' : 'text-text-secondary'}`}>
                {description}
              </p>
            </div>
            <Button
              href="/contact"
              variant={bgColor === 'primary' || bgColor === 'dark' ? 'secondary' : 'primary'}
              className={bgColor === 'primary' ? 'text-primary-main' : ''}
            >
              Get Started
            </Button>
          </div>
        </Container>
      </div>
    );
  }
  
  // For split layout, show form alongside content
  if (layout === 'split') {
    return (
      <div className={`py-12 ${getBgColorClass()}`}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
              <p className={`text-lg mb-6 ${bgColor === 'primary' || bgColor === 'dark' ? 'text-white/80' : 'text-text-secondary'}`}>
                {description}
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className={`w-5 h-5 ${bgColor === 'primary' || bgColor === 'dark' ? 'text-white' : 'text-primary-main'} mr-2 flex-shrink-0 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom strategy tailored to your business</span>
                </li>
                <li className="flex items-start">
                  <svg className={`w-5 h-5 ${bgColor === 'primary' || bgColor === 'dark' ? 'text-white' : 'text-primary-main'} mr-2 flex-shrink-0 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Detailed analysis of your current performance</span>
                </li>
                <li className="flex items-start">
                  <svg className={`w-5 h-5 ${bgColor === 'primary' || bgColor === 'dark' ? 'text-white' : 'text-primary-main'} mr-2 flex-shrink-0 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Expert recommendations for growth</span>
                </li>
              </ul>
            </div>
            <div>
              <div className={bgColor === 'primary' || bgColor === 'dark' ? 'bg-white rounded-xl overflow-hidden' : ''}>
                <LeadCaptureForm
                  title="Get Your Free SEO Consultation"
                  description="Fill in your details and we'll contact you within 24 hours"
                  customSubject={getSubjectLine()}
                  buttonText="Get Your Free Analysis"
                  showWebsiteField={true}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  
  // Standard layout (default)
  return (
    <div className={`py-12 ${getBgColorClass()}`}>
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          <p className={`text-lg ${bgColor === 'primary' || bgColor === 'dark' ? 'text-white/80' : 'text-text-secondary'}`}>
            {description}
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className={bgColor === 'primary' || bgColor === 'dark' ? 'bg-white rounded-xl overflow-hidden' : ''}>
            <LeadCaptureForm
              title="Ready to Grow Your Business?"
              description="Schedule a free consultation with our experts"
              customSubject={getSubjectLine()}
              buttonText="Get Started"
              showWebsiteField={true}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default InlineCTA;