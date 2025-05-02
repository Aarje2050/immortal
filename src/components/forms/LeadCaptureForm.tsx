"use client";
// src/components/forms/LeadCaptureForm.tsx

import React, { useState } from 'react';
import Button from '@/components/ui/Button';

interface LeadCaptureFormProps {
  title?: string;
  description?: string;
  service?: string;
  customSubject?: string;
  redirectUrl?: string;
  buttonText?: string;
  showWebsiteField?: boolean;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  title = "Ready to Get Started?",
  description = "Schedule a free consultation with our experts",
  service = "",
  customSubject = "",
  redirectUrl = "",
  buttonText = "Request Free Consultation",
  showWebsiteField = true
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  // Replace with your Web3Forms API key
  const WEB3FORMS_ACCESS_KEY = "8ece146a-6c76-401a-8bb6-2b912555beb8";
  
  // Determine the subject based on props
  const formSubject = customSubject || (service 
    ? `New Lead for ${service} Service - ImmortalSEO` 
    : "New Lead Request - ImmortalSEO");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(true);
        // Reset the form
        (e.target as HTMLFormElement).reset();
        
        // Redirect if URL is provided
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 bg-primary-main text-white">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p>{description}</p>
      </div>
      <div className="p-6">
        {success ? (
          <div className="text-center">
            <div className="text-3xl mb-3">✅</div>
            <h4 className="text-lg font-semibold mb-2 text-primary-main">Thank You!</h4>
            <p className="text-text-secondary mb-4">
              Your request has been received. We'll contact you shortly to discuss your needs.
            </p>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => setSuccess(false)}
            >
              Submit Another Request
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Web3Forms Hidden Fields */}
            <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
            <input type="hidden" name="subject" value={formSubject} />
            <input type="hidden" name="from_name" value="ImmortalSEO Website" />
            {service && <input type="hidden" name="service" value={service} />}
            
            {/* Honeypot field to prevent spam */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
            
            {/* Error message */}
            {error && (
              <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                <p>{error}</p>
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                placeholder="Enter your email"
                required
              />
            </div>
            
            {showWebsiteField && (
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-text-secondary mb-1">Website URL</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            )}
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? "Sending..." : buttonText}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LeadCaptureForm;