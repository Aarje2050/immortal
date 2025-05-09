// src/components/seo/withArticleSchema.tsx
import React from 'react';
import { withPageSchema } from './withPageSchema';
import { generateArticleSchema } from '@/lib/schema';
import { BaseSchema, PersonSchema } from '@/lib/schema/types';

type WithArticleSchemaProps = {
  url: string;
  title: string;
  description?: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  author: PersonSchema | { name: string; url?: string };
  content?: string;
  keywords?: string;
  articleType?: 'Article' | 'BlogPosting' | 'NewsArticle';
  additionalSchemas?: BaseSchema[];
};

/**
 * HOC that adds article schema to a component
 */
export function withArticleSchema<P extends object>(
  Component: React.ComponentType<P>,
  articleProps: WithArticleSchemaProps
) {
  // Generate article schema
  const articleSchema = generateArticleSchema({
    type: articleProps.articleType || 'BlogPosting',
    url: articleProps.url,
    title: articleProps.title,
    description: articleProps.description,
    image: articleProps.image,
    datePublished: articleProps.datePublished,
    dateModified: articleProps.dateModified,
    author: articleProps.author,
    content: articleProps.content,
    keywords: articleProps.keywords,
  });

  // Apply the webpage schema HOC with article schema
  return withPageSchema(Component, {
    ...articleProps,
    additionalSchemas: [
      articleSchema,
      ...(articleProps.additionalSchemas || []),
    ],
  });
}