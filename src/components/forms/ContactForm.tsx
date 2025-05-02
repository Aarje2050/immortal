"use client";
// src/components/forms/ContactForm.tsx

import React, { useState } from 'react';
import Button from '@/components/ui/Button';

interface ContactFormProps {
  services: {
    id: string;
    name: string;
  }[];
}

const ContactForm: React.FC<ContactFormProps> = ({ services }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  // Replace with your Web3Forms API key (get it from https://web3forms.com/)
  const WEB3FORMS_ACCESS_KEY = "8ece146a-6c76-401a-8bb6-2b912555beb8";
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(true);
        // Reset the form on success
        (e.target as HTMLFormElement).reset();
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8 bg-primary-main text-white">
        <h3 className="text-2xl font-bold mb-2">Send Us a Message</h3>
        <p>Fill out the form below and we'll get back to you within 24 hours</p>
      </div>
      
      {success ? (
        <div className="p-8 text-center">
          <div className="mb-6 text-5xl">✅</div>
          <h3 className="text-2xl font-bold mb-2 text-primary-main">Thank You!</h3>
          <p className="text-lg mb-6">Your message has been sent successfully. We'll get back to you soon.</p>
          <Button 
            variant="primary" 
            onClick={() => setSuccess(false)}
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Web3Forms Access Key (Hidden) */}
          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
          
          {/* Honeypot field to prevent spam */}
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
          
          {/* Subject field (Hidden) */}
          <input type="hidden" name="subject" value="New Contact Form Submission - ImmortalSEO" />
          
          {/* Error message */}
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-text-secondary mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main transition-colors"
                placeholder="Your first name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-text-secondary mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main transition-colors"
                placeholder="Your last name"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main transition-colors"
                placeholder="Your phone number"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-text-secondary mb-2">
              Website URL*
            </label>
            <input
              type="url"
              id="website"
              name="website"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main transition-colors"
              placeholder="https://yourwebsite.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-text-secondary mb-2">
              Service You're Interested In
            </label>
            <select
              id="service"
              name="service"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main transition-colors"
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
              Your Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main transition-colors"
              placeholder="Tell us about your project and specific requirements"
              required
            ></textarea>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="privacy"
                name="privacy"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-main"
                required
              />
            </div>
            <label htmlFor="privacy" className="ml-2 text-sm text-text-secondary">
              I agree to the <a href="/privacy-policy" className="text-primary-main hover:underline">Privacy Policy</a> and consent to having my data processed.
            </label>
          </div>
          
          <div>
            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              fullWidth 
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
            <p className="text-xs text-text-secondary mt-2 text-center">
              We'll never share your information with anyone else.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;