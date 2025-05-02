"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// Define schema types and their properties
interface SchemaProperty {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'url' | 'date' | 'select' | 'boolean';
  description: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
}

interface SchemaType {
  id: string;
  name: string;
  description: string;
  icon: string;
  properties: SchemaProperty[];
}

const SchemaMarkupGenerator: React.FC = () => {
  // Available schema types
  const schemaTypes: SchemaType[] = [
    {
      id: 'localBusiness',
      name: 'Local Business',
      description: 'Markup for a local business like a restaurant, store, or service provider.',
      icon: '🏪',
      properties: [
        {
          name: 'name',
          label: 'Business Name',
          type: 'text',
          description: 'The name of your business',
          required: true,
          placeholder: 'e.g., Joe\'s Pizza'
        },
        {
          name: 'description',
          label: 'Business Description',
          type: 'textarea',
          description: 'A description of your business',
          placeholder: 'e.g., Joe\'s Pizza serves authentic New York style pizza in downtown Chicago.'
        },
        {
          name: 'url',
          label: 'Website URL',
          type: 'url',
          description: 'The URL of your business website',
          required: true,
          placeholder: 'e.g., https://www.joespizza.com'
        },
        {
          name: 'telephone',
          label: 'Telephone',
          type: 'text',
          description: 'The phone number of your business',
          placeholder: 'e.g., +1-312-555-1234'
        },
        {
          name: 'addressStreet',
          label: 'Street Address',
          type: 'text',
          description: 'The street address of your business',
          required: true,
          placeholder: 'e.g., 123 Main St'
        },
        {
          name: 'addressLocality',
          label: 'City',
          type: 'text',
          description: 'The city where your business is located',
          required: true,
          placeholder: 'e.g., Chicago'
        },
        {
          name: 'addressRegion',
          label: 'State/Province',
          type: 'text',
          description: 'The state or province where your business is located',
          required: true,
          placeholder: 'e.g., IL'
        },
        {
          name: 'postalCode',
          label: 'Postal Code',
          type: 'text',
          description: 'The postal code of your business location',
          required: true,
          placeholder: 'e.g., 60601'
        },
        {
          name: 'addressCountry',
          label: 'Country',
          type: 'text',
          description: 'The country where your business is located',
          required: true,
          placeholder: 'e.g., US'
        },
        {
          name: 'priceRange',
          label: 'Price Range',
          type: 'select',
          description: 'The price range of your business',
          options: [
            { value: '$', label: '$ (Inexpensive)' },
            { value: '$$', label: '$$ (Moderate)' },
            { value: '$$$', label: '$$$ (Expensive)' },
            { value: '$$$$', label: '$$$$ (Very Expensive)' }
          ]
        },
        {
          name: 'openingHours',
          label: 'Opening Hours',
          type: 'textarea',
          description: 'Your business hours in ISO 8601 format, one per line (e.g., Mo-Fr 09:00-17:00)',
          placeholder: 'Mo-Fr 09:00-17:00\nSa 10:00-17:00\nSu 10:00-14:00'
        }
      ]
    },
    {
      id: 'article',
      name: 'Article',
      description: 'Markup for a news, blog, or informational article.',
      icon: '📰',
      properties: [
        {
          name: 'headline',
          label: 'Headline',
          type: 'text',
          description: 'The headline of the article',
          required: true,
          placeholder: 'e.g., How to Implement Schema Markup for SEO'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          description: 'A brief description of the article',
          placeholder: 'e.g., Learn how to implement schema markup to improve your website\'s visibility in search results.'
        },
        {
          name: 'articleBody',
          label: 'Article Content (Optional)',
          type: 'textarea',
          description: 'The full content of the article',
          placeholder: 'Full article content...'
        },
        {
          name: 'author',
          label: 'Author Name',
          type: 'text',
          description: 'The name of the author',
          required: true,
          placeholder: 'e.g., Jane Smith'
        },
        {
          name: 'authorUrl',
          label: 'Author URL (Optional)',
          type: 'url',
          description: 'The URL of the author\'s profile page',
          placeholder: 'e.g., https://example.com/authors/jane-smith'
        },
        {
          name: 'publisherName',
          label: 'Publisher Name',
          type: 'text',
          description: 'The name of the publisher',
          required: true,
          placeholder: 'e.g., Example News'
        },
        {
          name: 'publisherLogo',
          label: 'Publisher Logo URL',
          type: 'url',
          description: 'The URL of the publisher\'s logo',
          required: true,
          placeholder: 'e.g., https://example.com/logo.png'
        },
        {
          name: 'publishDate',
          label: 'Publish Date',
          type: 'date',
          description: 'The date the article was published',
          required: true
        },
        {
          name: 'modifiedDate',
          label: 'Modified Date (Optional)',
          type: 'date',
          description: 'The date the article was last modified'
        },
        {
          name: 'url',
          label: 'Article URL',
          type: 'url',
          description: 'The URL of the article',
          required: true,
          placeholder: 'e.g., https://example.com/articles/schema-markup'
        },
        {
          name: 'image',
          label: 'Image URL',
          type: 'url',
          description: 'The URL of the main image for the article',
          required: true,
          placeholder: 'e.g., https://example.com/images/schema-markup.jpg'
        }
      ]
    },
    {
      id: 'product',
      name: 'Product',
      description: 'Markup for a product on an e-commerce site.',
      icon: '🛍️',
      properties: [
        {
          name: 'name',
          label: 'Product Name',
          type: 'text',
          description: 'The name of the product',
          required: true,
          placeholder: 'e.g., Premium Ergonomic Office Chair'
        },
        {
          name: 'description',
          label: 'Product Description',
          type: 'textarea',
          description: 'A description of the product',
          placeholder: 'e.g., Adjustable ergonomic office chair with lumbar support and breathable mesh backing.'
        },
        {
          name: 'sku',
          label: 'SKU',
          type: 'text',
          description: 'The Stock Keeping Unit, a unique identifier for the product',
          placeholder: 'e.g., EC-123-BLK'
        },
        {
          name: 'brand',
          label: 'Brand Name',
          type: 'text',
          description: 'The brand of the product',
          placeholder: 'e.g., ErgoComfort'
        },
        {
          name: 'url',
          label: 'Product URL',
          type: 'url',
          description: 'The URL of the product page',
          required: true,
          placeholder: 'e.g., https://example.com/products/ergonomic-chair'
        },
        {
          name: 'image',
          label: 'Image URL',
          type: 'url',
          description: 'The URL of the product image',
          required: true,
          placeholder: 'e.g., https://example.com/images/ergonomic-chair.jpg'
        },
        {
          name: 'price',
          label: 'Price',
          type: 'text',
          description: 'The price of the product',
          required: true,
          placeholder: 'e.g., 199.99'
        },
        {
          name: 'priceCurrency',
          label: 'Price Currency',
          type: 'text',
          description: 'The currency of the price (ISO 4217)',
          required: true,
          placeholder: 'e.g., USD'
        },
        {
          name: 'availability',
          label: 'Availability',
          type: 'select',
          description: 'The availability status of the product',
          required: true,
          options: [
            { value: 'InStock', label: 'In Stock' },
            { value: 'OutOfStock', label: 'Out of Stock' },
            { value: 'PreOrder', label: 'Pre-Order' },
            { value: 'Discontinued', label: 'Discontinued' }
          ]
        },
        {
          name: 'ratingValue',
          label: 'Rating Value (Optional)',
          type: 'number',
          description: 'The average rating of the product (1-5)',
          placeholder: 'e.g., 4.5'
        },
        {
          name: 'ratingCount',
          label: 'Rating Count (Optional)',
          type: 'number',
          description: 'The number of ratings',
          placeholder: 'e.g., 87'
        }
      ]
    },
    {
      id: 'faq',
      name: 'FAQ Page',
      description: 'Markup for a page with frequently asked questions.',
      icon: '❓',
      properties: [
        {
          name: 'title',
          label: 'FAQ Page Title',
          type: 'text',
          description: 'The title of your FAQ page',
          required: true,
          placeholder: 'e.g., Frequently Asked Questions About Our Services'
        },
        {
          name: 'url',
          label: 'FAQ Page URL',
          type: 'url',
          description: 'The URL of your FAQ page',
          required: true,
          placeholder: 'e.g., https://example.com/faq'
        },
        {
          name: 'questions',
          label: 'FAQs (One per line, separate question and answer with "|")',
          type: 'textarea',
          description: 'Enter each question and answer pair on its own line, separated by a pipe character (|)',
          required: true,
          placeholder: 'What payment methods do you accept? | We accept credit cards, PayPal, and bank transfers.\nDo you offer international shipping? | Yes, we ship to over 100 countries worldwide.'
        }
      ]
    }
  ];

  // State management
  const [selectedType, setSelectedType] = useState<string>(schemaTypes[0].id);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [generatedSchema, setGeneratedSchema] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeStep, setActiveStep] = useState<number>(1);

  // Get the currently selected schema type
  const currentSchemaType = schemaTypes.find(type => type.id === selectedType) || schemaTypes[0];

  // Reset form data when changing schema type
  useEffect(() => {
    setFormData({});
    setErrors({});
  }, [selectedType]);

  // Handle form input changes
  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    currentSchemaType.properties.forEach(prop => {
      if (prop.required && (!formData[prop.name] || formData[prop.name].trim() === '')) {
        newErrors[prop.name] = `${prop.label} is required`;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  // Generate schema markup based on form data
  const generateSchemaMarkup = () => {
    if (!validateForm()) {
      return;
    }
    
    let schema: any = {
      "@context": "https://schema.org",
    };
    
    switch (selectedType) {
      case 'localBusiness':
        schema["@type"] = "LocalBusiness";
        schema.name = formData.name;
        if (formData.description) schema.description = formData.description;
        schema.url = formData.url;
        if (formData.telephone) schema.telephone = formData.telephone;
        schema.address = {
          "@type": "PostalAddress",
          "streetAddress": formData.addressStreet,
          "addressLocality": formData.addressLocality,
          "addressRegion": formData.addressRegion,
          "postalCode": formData.postalCode,
          "addressCountry": formData.addressCountry
        };
        if (formData.priceRange) schema.priceRange = formData.priceRange;
        if (formData.openingHours) {
          const hours = formData.openingHours.split('\n').filter((line: string) => line.trim() !== '');
          schema.openingHoursSpecification = hours.map((hour: string) => ({
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": hour.split(' ')[0],
            "opens": hour.split(' ')[1].split('-')[0],
            "closes": hour.split(' ')[1].split('-')[1]
          }));
        }
        break;
        
      case 'article':
        schema["@type"] = "Article";
        schema.headline = formData.headline;
        if (formData.description) schema.description = formData.description;
        if (formData.articleBody) schema.articleBody = formData.articleBody;
        schema.author = {
          "@type": "Person",
          "name": formData.author
        };
        if (formData.authorUrl) schema.author.url = formData.authorUrl;
        schema.publisher = {
          "@type": "Organization",
          "name": formData.publisherName,
          "logo": {
            "@type": "ImageObject",
            "url": formData.publisherLogo
          }
        };
        schema.datePublished = formData.publishDate;
        if (formData.modifiedDate) schema.dateModified = formData.modifiedDate;
        schema.url = formData.url;
        schema.image = formData.image;
        break;
        
      case 'product':
        schema["@type"] = "Product";
        schema.name = formData.name;
        if (formData.description) schema.description = formData.description;
        if (formData.sku) schema.sku = formData.sku;
        if (formData.brand) {
          schema.brand = {
            "@type": "Brand",
            "name": formData.brand
          };
        }
        schema.url = formData.url;
        schema.image = formData.image;
        schema.offers = {
          "@type": "Offer",
          "price": formData.price,
          "priceCurrency": formData.priceCurrency,
          "availability": "https://schema.org/" + formData.availability,
          "url": formData.url
        };
        if (formData.ratingValue && formData.ratingCount) {
          schema.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": formData.ratingValue,
            "ratingCount": formData.ratingCount
          };
        }
        break;
        
      case 'faq':
        schema["@type"] = "FAQPage";
        const questionsRaw = formData.questions.split('\n').filter((line: string) => line.includes('|'));
        schema.mainEntity = questionsRaw.map((line: string) => {
          const parts = line.split('|');
          return {
            "@type": "Question",
            "name": parts[0].trim(),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": parts[1].trim()
            }
          };
        });
        break;
    }
    
    setGeneratedSchema(JSON.stringify(schema, null, 2));
    setActiveStep(3); // Move to the final step
  };

  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSchema).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Get implementation instructions based on schema type
  const getImplementationInstructions = (): string => {
    return `
1. Copy the JSON-LD schema markup.
2. Add it to your webpage inside a <script type="application/ld+json"> tag in the <head> section.
3. Example:

<head>
    <!-- Other head elements -->
    <script type="application/ld+json">
${generatedSchema}
    </script>
</head>
    `;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-dark to-primary-main text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
        </div>
        
        <Container>
          <div className="py-16 md:py-20 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Link 
                href="/tools" 
                className="inline-flex items-center text-white/80 hover:text-white mb-4"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Tools
              </Link>
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-4 backdrop-blur-sm">
                SEO Tools
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Schema Markup <span className="text-yellow-300">Generator</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Create structured data markup (JSON-LD) to help search engines better understand your content.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Tool Section */}
      <Section>
        <Container>
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">What is Schema Markup?</h2>
            <p className="text-text-secondary mb-4">
              Schema markup is a type of structured data that helps search engines understand the content of your webpages. When implemented correctly, schema markup can result in rich snippets in search results, which can improve click-through rates.
            </p>
            <p className="text-text-secondary mb-4">
              This tool generates JSON-LD, which is Google's recommended format for schema markup. Simply select a schema type, fill in the required information, and copy the generated code to your website.
            </p>
            <div className="bg-primary-main/5 rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Benefits of Using Schema Markup:
              </h3>
              <ul className="list-disc list-inside text-text-secondary space-y-1">
                <li>Enhanced search results with rich snippets (ratings, prices, FAQ answers, etc.)</li>
                <li>Improved understanding of your content by search engines</li>
                <li>Potential for better rankings and increased click-through rates</li>
                <li>Preparation for voice search and AI-driven platforms</li>
              </ul>
            </div>
          </div>
          
          {/* Step Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                activeStep >= 1 ? 'bg-primary-main text-white' : 'bg-gray-200 text-gray-500'
              } font-bold`}>
                1
              </div>
              <div className={`flex-1 h-1 mx-2 ${
                activeStep >= 2 ? 'bg-primary-main' : 'bg-gray-200'
              }`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                activeStep >= 2 ? 'bg-primary-main text-white' : 'bg-gray-200 text-gray-500'
              } font-bold`}>
                2
              </div>
              <div className={`flex-1 h-1 mx-2 ${
                activeStep >= 3 ? 'bg-primary-main' : 'bg-gray-200'
              }`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                activeStep >= 3 ? 'bg-primary-main text-white' : 'bg-gray-200 text-gray-500'
              } font-bold`}>
                3
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <div className={activeStep >= 1 ? 'text-primary-main font-medium' : 'text-gray-500'}>Select Type</div>
              <div className={activeStep >= 2 ? 'text-primary-main font-medium' : 'text-gray-500'}>Enter Details</div>
              <div className={activeStep >= 3 ? 'text-primary-main font-medium' : 'text-gray-500'}>Get Code</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold mb-6">Schema Markup Generator</h2>
                  
                  {/* Step 1: Choose Schema Type */}
                  {activeStep === 1 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Step 1: Select Schema Type</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {schemaTypes.map(type => (
                          <div 
                            key={type.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              selectedType === type.id 
                                ? 'border-primary-main bg-primary-main/5' 
                                : 'border-gray-200 hover:border-primary-main/50 hover:bg-gray-50'
                            }`}
                            onClick={() => setSelectedType(type.id)}
                          >
                            <div className="flex items-center mb-2">
                              <div className="text-3xl mr-3">{type.icon}</div>
                              <h4 className="text-lg font-semibold">{type.name}</h4>
                            </div>
                            <p className="text-text-secondary text-sm">{type.description}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex justify-end">
                        <Button 
                          variant="primary"
                          onClick={() => setActiveStep(2)}
                        >
                          Continue to Details
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Enter Details */}
                  {activeStep === 2 && (
                    <div>
                      <div className="flex items-center mb-6">
                        <button 
                          onClick={() => setActiveStep(1)}
                          className="text-primary-main hover:text-primary-dark mr-3"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <h3 className="text-lg font-semibold">Step 2: Enter {currentSchemaType.name} Details</h3>
                      </div>
                      
                      <div className="space-y-6">
                        {currentSchemaType.properties.map(prop => (
                          <div key={prop.name} className="space-y-2">
                            <label className="block font-medium">
                              {prop.label}
                              {prop.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            
                            {prop.type === 'text' && (
                              <input
                                type="text"
                                value={formData[prop.name] || ''}
                                onChange={(e) => handleInputChange(prop.name, e.target.value)}
                                placeholder={prop.placeholder}
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main ${
                                  errors[prop.name] ? 'border-red-500' : 'border-gray-300'
                                }`}
                              />
                            )}
                            
                            {prop.type === 'textarea' && (
                              <textarea
                                value={formData[prop.name] || ''}
                                onChange={(e) => handleInputChange(prop.name, e.target.value)}
                                placeholder={prop.placeholder}
                                rows={4}
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main ${
                                  errors[prop.name] ? 'border-red-500' : 'border-gray-300'
                                }`}
                              />
                            )}
                            
                            {prop.type === 'number' && (
                              <input
                                type="number"
                                value={formData[prop.name] || ''}
                                onChange={(e) => handleInputChange(prop.name, e.target.value)}
                                placeholder={prop.placeholder}
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main ${
                                  errors[prop.name] ? 'border-red-500' : 'border-gray-300'
                                }`}
                              />
                            )}
                            
                            {prop.type === 'url' && (
                              <input
                                type="url"
                                value={formData[prop.name] || ''}
                                onChange={(e) => handleInputChange(prop.name, e.target.value)}
                                placeholder={prop.placeholder}
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main ${
                                  errors[prop.name] ? 'border-red-500' : 'border-gray-300'
                                }`}
                              />
                            )}
                            
                            {prop.type === 'date' && (
                              <input
                                type="date"
                                value={formData[prop.name] || ''}
                                onChange={(e) => handleInputChange(prop.name, e.target.value)}
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main ${
                                  errors[prop.name] ? 'border-red-500' : 'border-gray-300'
                                }`}
                              />
                            )}
                            
                            {prop.type === 'select' && prop.options && (
                              <select
                                value={formData[prop.name] || ''}
                                onChange={(e) => handleInputChange(prop.name, e.target.value)}
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main ${
                                  errors[prop.name] ? 'border-red-500' : 'border-gray-300'
                                }`}
                              >
                                <option value="">Select an option</option>
                                {prop.options.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            )}
                            
                            {prop.type === 'boolean' && (
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData[prop.name] || false}
                                  onChange={(e) => handleInputChange(prop.name, e.target.checked)}
                                  className="h-4 w-4 text-primary-main focus:ring-primary-main border-gray-300 rounded"
                                />
                                <label className="ml-2 text-text-secondary">
                                  {prop.label}
                                </label>
                              </div>
                            )}
                            
                            {errors[prop.name] && (
                              <p className="text-red-500 text-sm mt-1">{errors[prop.name]}</p>
                            )}
                            
                            <p className="text-sm text-gray-500 mt-1">{prop.description}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex justify-between">
                        <Button 
                          variant="outline"
                          onClick={() => setActiveStep(1)}
                        >
                          Back to Schema Types
                        </Button>
                        <Button 
                          variant="primary"
                          onClick={generateSchemaMarkup}
                        >
                          Generate Schema
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Generated Schema */}
                  {activeStep === 3 && (
                    <div>
                      <div className="flex items-center mb-6">
                        <button 
                          onClick={() => setActiveStep(2)}
                          className="text-primary-main hover:text-primary-dark mr-3"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <h3 className="text-lg font-semibold">Step 3: Your Generated Schema Markup</h3>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">JSON-LD Schema:</h4>
                        <div className="relative">
                          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-auto max-h-[400px]">
                            <pre>{generatedSchema}</pre>
                          </div>
                          <button
                            onClick={copyToClipboard}
                            className="absolute top-2 right-2 bg-white rounded-md p-1.5 hover:bg-gray-200 transition-colors"
                            title="Copy to clipboard"
                          >
                            {copied ? (
                              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <h4 className="font-semibold mb-2">Implementation Instructions:</h4>
                        <div className="bg-background-paper rounded-lg p-4 font-mono text-sm overflow-auto">
                          <pre>{getImplementationInstructions()}</pre>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Testing Your Schema:</h4>
                        <p className="text-text-secondary mb-4">
                          After implementing the schema on your website, use these tools to validate it:
                        </p>
                        <ul className="list-disc list-inside text-text-secondary space-y-2">
                          <li>
                            <a 
                              href="https://validator.schema.org/" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-primary-main hover:underline"
                            >
                              Schema.org Validator
                            </a>
                          </li>
                          <li>
                            <a 
                              href="https://search.google.com/test/rich-results" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-primary-main hover:underline"
                            >
                              Google Rich Results Test
                            </a>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setActiveStep(2);
                          }}
                        >
                          Edit Details
                        </Button>
                        <Button 
                          variant="primary"
                          onClick={() => {
                            setSelectedType(schemaTypes[0].id);
                            setFormData({});
                            setErrors({});
                            setGeneratedSchema('');
                            setActiveStep(1);
                          }}
                        >
                          Create Another Schema
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold mb-4">Schema Markup Benefits</h2>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                          🔍
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">Enhanced Search Results</h3>
                          <p className="text-text-secondary">Help search engines display rich snippets with ratings, prices, and more.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                          👁️
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">Improved Visibility</h3>
                          <p className="text-text-secondary">Stand out in search results with eye-catching rich snippets.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                          🤖
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">AI Readiness</h3>
                          <p className="text-text-secondary">Help AI platforms understand and reference your content correctly.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-main/10 text-primary-main flex items-center justify-center text-xl mr-4">
                          📱
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">Voice Search Ready</h3>
                          <p className="text-text-secondary">Structured data helps voice assistants find and use your content.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50">
                    <h3 className="font-semibold mb-4">Need Custom Schema?</h3>
                    <p className="text-text-secondary mb-4">
                      For complex schema implementations or custom structured data needs, our SEO experts can help.
                    </p>
                    <Button 
                      href="/contact?service=schema" 
                      variant="primary"
                      fullWidth
                    >
                      Get Expert Help
                    </Button>
                    
                    <div className="mt-6">
                      <Link 
                        href="/tools" 
                        className="text-primary-main hover:text-primary-dark flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to All Tools
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Schema Best Practices */}
          <div className="mt-12 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Schema Markup Best Practices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Do:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Use JSON-LD format (recommended by Google) rather than Microdata or RDFa</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Implement schema that's relevant to your page content</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Be specific with your schema types and properties</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Test your schema with validation tools before implementing</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Don't:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Use schema for content that doesn't exist on your page</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Add schema markup for hidden content not visible to users</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Overuse schema types that aren't relevant to your business</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Include personally identifiable information in your schema</span>
                  </li>
                </ul>
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
                  Need Advanced Schema Implementation?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Our SEO experts can implement complex schema structures to maximize your visibility in both traditional and AI search platforms.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button 
                  href="/services/technical-seo" 
                  variant="secondary" 
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default SchemaMarkupGenerator;
