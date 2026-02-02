// src/components/seo/EntityRichContent.tsx
// Entity-rich content blocks for AI search optimization

'use client';

import React from 'react';
import Link from 'next/link';

interface EntityMention {
  entity: string;
  description: string;
  url?: string;
  type: 'service' | 'industry' | 'location' | 'concept' | 'person';
}

interface EntityRichContentProps {
  title: string;
  entities: EntityMention[];
  className?: string;
}

/**
 * Entity-rich content block
 * Helps AI systems understand entity relationships
 */
export function EntityRichContent({ title, entities, className = '' }: EntityRichContentProps) {
  return (
    <div className={`bg-gradient-to-br from-primary-main/5 to-primary-main/10 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-primary-main">{title}</h3>
      <div className="space-y-3">
        {entities.map((entity, index) => (
          <div key={index} className="bg-white/50 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-main rounded-full mt-2 mr-3"></div>
              <div className="flex-1">
                <h4 className="font-semibold text-text-primary mb-1">
                  {entity.url ? (
                    <Link href={entity.url} className="hover:text-primary-main transition-colors">
                      {entity.entity}
                    </Link>
                  ) : (
                    entity.entity
                  )}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {entity.description}
                </p>
                {entity.type && (
                  <span className="inline-block mt-2 text-xs text-primary-main/70 bg-primary-main/10 px-2 py-1 rounded">
                    {entity.type}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SemanticRelationshipProps {
  title: string;
  relationships: Array<{
    from: string;
    relationship: string;
    to: string;
    description?: string;
  }>;
  className?: string;
}

/**
 * Semantic relationship visualization
 * Shows how entities relate to each other
 */
export function SemanticRelationship({ title, relationships, className = '' }: SemanticRelationshipProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-text-primary">{title}</h3>
      <div className="space-y-4">
        {relationships.map((rel, index) => (
          <div key={index} className="flex items-center flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-text-primary">{rel.from}</span>
            <span className="text-primary-main font-medium">{rel.relationship}</span>
            <span className="font-medium text-text-primary">{rel.to}</span>
            {rel.description && (
              <span className="text-sm text-text-secondary ml-2">({rel.description})</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface ContextBlockProps {
  title: string;
  content: string;
  relatedEntities?: string[];
  className?: string;
}

/**
 * Context block with entity mentions
 * Provides context for AI understanding
 */
export function ContextBlock({ title, content, relatedEntities, className = '' }: ContextBlockProps) {
  return (
    <div className={`bg-white border-l-4 border-primary-main p-6 rounded-lg ${className}`}>
      <h3 className="text-lg font-semibold mb-3 text-text-primary">{title}</h3>
      <p className="text-text-secondary leading-relaxed mb-4">{content}</p>
      {relatedEntities && relatedEntities.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-sm text-text-secondary">Related:</span>
          {relatedEntities.map((entity, index) => (
            <span
              key={index}
              className="text-sm bg-primary-main/10 text-primary-main px-3 py-1 rounded-full"
            >
              {entity}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
