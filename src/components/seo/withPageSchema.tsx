// src/components/seo/withPageSchema.tsx
import React from 'react';
import Head from 'next/head';
import JsonLd from './JsonLd';
import { generateWebPageSchema, generateSchemaGraph, getSchemaContext } from '@/lib/schema';
import { BaseSchema } from '@/lib/schema/types';

type WithPageSchemaProps = {
  url: string;
  title: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  additionalSchemas?: BaseSchema[];
};

/**
 * HOC that adds webpage schema to a component
 */
export function withPageSchema<P extends object>(
  Component: React.ComponentType<P>,
  pageProps: WithPageSchemaProps
) {
  // Return the enhanced component
  return function WithPageSchema(props: P) {
    const context = getSchemaContext();
    
    // Generate the webpage schema
    const webPageSchema = generateWebPageSchema({
      url: pageProps.url,
      title: pageProps.title,
      description: pageProps.description,
      image: pageProps.image,
      datePublished: pageProps.datePublished,
      dateModified: pageProps.dateModified,
      breadcrumbs: pageProps.breadcrumbs,
    });

    // Combine with additional schemas
    const schemas = [
      context.organization,
      context.website,
      webPageSchema,
      ...(pageProps.additionalSchemas || []),
    ];

    // If local business is available, add it
    if (context.localBusiness) {
      schemas.push(context.localBusiness);
    }

    // Create a schema graph
    const schemaGraph = generateSchemaGraph(schemas);

    return (
      <>
        <Head>
          <title>{pageProps.title}</title>
          {pageProps.description && (
            <meta name="description" content={pageProps.description} />
          )}
          {pageProps.image && (
            <meta property="og:image" content={pageProps.image} />
          )}
        </Head>
        <JsonLd data={schemaGraph} />
        <Component {...props} />
      </>
    );
  };
}