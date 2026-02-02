// src/components/seo/ContextualLinks.tsx
// Component for semantic internal linking based on entity relationships

'use client';

import React from 'react';
import Link from 'next/link';

interface ContextualLink {
  url: string;
  text: string;
  title: string;
  description?: string;
  relationship?: string;
}

interface ContextualLinksProps {
  links: ContextualLink[];
  title?: string;
  className?: string;
  maxLinks?: number;
}

/**
 * ContextualLinks component for semantic internal linking
 * Displays related content based on entity relationships
 */
export default function ContextualLinks({
  links,
  title = 'Related Content',
  className = '',
  maxLinks = 5,
}: ContextualLinksProps) {
  if (!links || links.length === 0) {
    return null;
  }

  const displayLinks = links.slice(0, maxLinks);

  return (
    <div className={`bg-primary-main/5 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-primary-main">
        {title}
      </h3>
      <ul className="space-y-3">
        {displayLinks.map((link, index) => (
          <li key={index}>
            <Link
              href={link.url}
              className="block p-3 bg-white rounded-lg hover:bg-primary-main/10 transition-colors group"
            >
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-primary-main mr-3 flex-shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary group-hover:text-primary-main transition-colors">
                    {link.title}
                  </h4>
                  {link.description && (
                    <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                      {link.description}
                    </p>
                  )}
                  {link.relationship && (
                    <span className="inline-block mt-2 text-xs text-primary-main/70">
                      {link.relationship}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Hook to generate contextual links from entity relationships
 */
export function useContextualLinks(
  entityId: string,
  entityType: 'service' | 'industry' | 'location' | 'blog'
): ContextualLink[] {
  // This would integrate with the entity map
  // For now, return empty array - will be enhanced
  return [];
}
