// src/components/seo/TopicClusterNav.tsx
// Topic cluster navigation component

'use client';

import React from 'react';
import Link from 'next/link';
import { TopicCluster, getSupportingContent } from '@/lib/topics/topicClusters';

interface TopicClusterNavProps {
  pillarSlug: string;
  currentPageType: 'service' | 'blog' | 'industry';
  className?: string;
}

/**
 * Topic Cluster Navigation
 * Shows related content in the topic cluster
 */
export default function TopicClusterNav({ 
  pillarSlug, 
  currentPageType,
  className = '' 
}: TopicClusterNavProps) {
  const supportingContent = getSupportingContent(pillarSlug);
  
  if (supportingContent.length === 0) {
    return null;
  }

  // Filter to show different types of content
  const blogPosts = supportingContent.filter(c => c.type === 'blog');
  const relatedServices = supportingContent.filter(c => c.type === 'service');
  const tools = supportingContent.filter(c => c.type === 'tool');

  return (
    <div className={`bg-primary-main/5 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-primary-main">
        Explore Related Content
      </h3>
      
      {relatedServices.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wide">
            Related Services
          </h4>
          <ul className="space-y-2">
            {relatedServices.map((content, index) => (
              <li key={index}>
                <Link
                  href={content.url}
                  className="flex items-start text-text-primary hover:text-primary-main transition-colors group"
                >
                  <svg
                    className="w-4 h-4 text-primary-main mr-2 flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>{content.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {blogPosts.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wide">
            Learn More
          </h4>
          <ul className="space-y-2">
            {blogPosts.slice(0, 3).map((content, index) => (
              <li key={index}>
                <Link
                  href={content.url}
                  className="flex items-start text-text-primary hover:text-primary-main transition-colors group"
                >
                  <svg
                    className="w-4 h-4 text-primary-main mr-2 flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>{content.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tools.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wide">
            Free Tools
          </h4>
          <ul className="space-y-2">
            {tools.map((content, index) => (
              <li key={index}>
                <Link
                  href={content.url}
                  className="flex items-start text-text-primary hover:text-primary-main transition-colors group"
                >
                  <svg
                    className="w-4 h-4 text-primary-main mr-2 flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>{content.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
