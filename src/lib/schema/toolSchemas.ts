// src/lib/schema/toolSchemas.ts

import { BaseSchema, OrganizationSchema } from './types';

/**
 * Generates SoftwareApplication schema for tools
 */
export function generateSoftwareApplicationSchema({
  name,
  description,
  url,
  applicationCategory,
  operatingSystem,
  offers,
  screenshot,
  provider,
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
  screenshot?: string;
  provider?: OrganizationSchema;
}): any {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory,
    operatingSystem,
  };

  // Add offers if provided
  if (offers) {
    schema.offers = {
      '@type': 'Offer',
      price: offers.price,
      priceCurrency: offers.priceCurrency,
      availability: offers.availability,
    };
  }

  // Add screenshot if provided
  if (screenshot) {
    schema.screenshot = {
      '@type': 'ImageObject',
      url: screenshot,
    };
  }

  // Add provider if provided
  if (provider) {
    schema.provider = provider;
  }

  return schema;
}

/**
 * Generates WebApplication schema for web-based tools
 */
export function generateWebApplicationSchema({
  name,
  description,
  url,
  category,
  offers,
  screenshot,
  featureList,
  provider,
}: {
  name: string;
  description: string;
  url: string;
  category?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
  screenshot?: string;
  featureList?: string[];
  provider?: OrganizationSchema;
}): any {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
  };

  // Add application category if provided
  if (category) {
    schema.applicationCategory = category;
  }

  // Add offers if provided
  if (offers) {
    schema.offers = {
      '@type': 'Offer',
      price: offers.price,
      priceCurrency: offers.priceCurrency,
      availability: offers.availability,
    };
  }

  // Add screenshot if provided
  if (screenshot) {
    schema.screenshot = {
      '@type': 'ImageObject',
      url: screenshot,
    };
  }

  // Add feature list if provided
  if (featureList && featureList.length > 0) {
    schema.featureList = featureList.join(', ');
  }

  // Add provider if provided
  if (provider) {
    schema.provider = provider;
  }

  return schema;
}