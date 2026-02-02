// src/components/seo/FeaturedSnippet.tsx
// Components for featured snippet optimization

'use client';

import React from 'react';

interface DefinitionBoxProps {
  term: string;
  definition: string;
  className?: string;
}

/**
 * Definition box for "What is X?" queries
 * Optimized for featured snippets
 */
export function DefinitionBox({ term, definition, className = '' }: DefinitionBoxProps) {
  return (
    <div className={`bg-primary-main/5 border-l-4 border-primary-main p-6 rounded-lg ${className}`}>
      <h3 className="text-lg font-semibold mb-2 text-primary-main">
        What is {term}?
      </h3>
      <p className="text-text-primary leading-relaxed">
        {definition}
      </p>
    </div>
  );
}

interface ListBoxProps {
  title: string;
  items: string[];
  ordered?: boolean;
  className?: string;
}

/**
 * List box for numbered or bulleted lists
 * Optimized for featured snippets
 */
export function ListBox({ title, items, ordered = false, className = '' }: ListBoxProps) {
  const ListTag = ordered ? 'ol' : 'ul';
  const listClass = ordered 
    ? 'list-decimal list-inside space-y-2' 
    : 'list-disc list-inside space-y-2';

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-text-primary">
        {title}
      </h3>
      <ListTag className={`${listClass} text-text-secondary`}>
        {items.map((item, index) => (
          <li key={index} className="pl-2">
            {item}
          </li>
        ))}
      </ListTag>
    </div>
  );
}

interface ComparisonTableProps {
  title: string;
  items: Array<{
    feature: string;
    option1: string;
    option2: string;
  }>;
  option1Label: string;
  option2Label: string;
  className?: string;
}

/**
 * Comparison table for "X vs Y" queries
 * Optimized for featured snippets
 */
export function ComparisonTable({ 
  title, 
  items, 
  option1Label, 
  option2Label,
  className = '' 
}: ComparisonTableProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      <div className="bg-primary-main/10 p-4 border-b">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left p-4 font-semibold text-text-primary">Feature</th>
              <th className="text-left p-4 font-semibold text-text-primary">{option1Label}</th>
              <th className="text-left p-4 font-semibold text-text-primary">{option2Label}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-text-primary">{item.feature}</td>
                <td className="p-4 text-text-secondary">{item.option1}</td>
                <td className="p-4 text-text-secondary">{item.option2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface StepByStepProps {
  title: string;
  steps: Array<{
    number: number;
    title: string;
    description: string;
  }>;
  className?: string;
}

/**
 * Step-by-step guide for "How to X" queries
 * Optimized for featured snippets
 */
export function StepByStep({ title, steps, className = '' }: StepByStepProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-6 text-text-primary">{title}</h3>
      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.number} className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-main text-white rounded-full flex items-center justify-center font-bold mr-4">
              {step.number}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-text-primary mb-2">{step.title}</h4>
              <p className="text-text-secondary">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface PeopleAlsoAskProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
  className?: string;
}

/**
 * People Also Ask section
 * Optimized for PAA featured snippets
 */
export function PeopleAlsoAsk({ questions, className = '' }: PeopleAlsoAskProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      <div className="bg-primary-main/10 p-4 border-b">
        <h3 className="text-lg font-semibold text-text-primary">People Also Ask</h3>
      </div>
      <div className="divide-y">
        {questions.map((item, index) => (
          <details
            key={index}
            open={openIndex === index}
            className="group"
            onToggle={(e) => {
              if (e.currentTarget.open) {
                setOpenIndex(index);
              } else if (openIndex === index) {
                setOpenIndex(null);
              }
            }}
          >
            <summary className="p-4 cursor-pointer hover:bg-gray-50 font-medium text-text-primary list-none flex items-center justify-between">
              <span>{item.question}</span>
              <svg
                className={`w-5 h-5 text-primary-main transition-transform ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="p-4 pt-0 text-text-secondary">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
