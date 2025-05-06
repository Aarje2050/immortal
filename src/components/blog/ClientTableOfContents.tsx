// components/blog/ClientTableOfContents.tsx (Client Component)
'use client';

import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function ClientTableOfContents() {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Initialize TOC on client side only
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    // Find content wrapper
    const contentWrapper = document.querySelector('.post-content-wrapper');
    if (!contentWrapper) return;
    
    // Get all headings
    const headings = Array.from(contentWrapper.querySelectorAll('h2, h3, h4'));
    if (headings.length === 0) return;
    
    // Track used IDs to ensure uniqueness
    const usedIds = new Map<string, number>();
    
    // Create TOC items
    const tocItems = headings.map((heading, index) => {
      const headingElement = heading as HTMLElement;
      const text = headingElement.textContent?.trim() || `Section ${index + 1}`;
      
      // Create base ID from text
      let baseId = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      if (!baseId) baseId = `section-${index}`;
      
      // Ensure ID uniqueness
      const count = usedIds.get(baseId) || 0;
      usedIds.set(baseId, count + 1);
      
      // Final ID
      const id = count > 0 ? `${baseId}-${count}` : baseId;
      
      // Set ID on heading
      headingElement.id = id;
      
      // Add scroll margin for header
      headingElement.style.scrollMarginTop = '100px';
      
      return {
        id,
        text,
        level: parseInt(headingElement.tagName.charAt(1))
      };
    });
    
    setItems(tocItems);
    
    // Set up intersection observer for scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );
    
    // Observe all headings
    headings.forEach(heading => observer.observe(heading));
    
    // Cleanup
    return () => observer.disconnect();
  }, []);

  // Handle TOC item click
  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    
    const heading = document.getElementById(id);
    if (!heading) return;
    
    // Set active ID
    setActiveId(id);
    
    // Calculate offset position
    const headerOffset = 100;
    const elementPosition = heading.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
    // Scroll to element
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Update URL hash without causing a jump
    if (history.pushState) {
      history.pushState(null, '', `#${id}`);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm">
      <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
        <List size={20} className="mr-2 text-primary-main" aria-hidden="true" />
        Table of Contents
      </h3>
      <nav aria-label="Table of contents">
        <ul className="space-y-1">
          {items.map((item, index) => (
            <li 
              key={`toc-${index}-${item.id}`}
              className={`transition-colors ${
                item.level === 2 ? 'ml-0' : item.level === 3 ? 'ml-3' : 'ml-5'
              }`}
            >
              <a
                href={`#${item.id}`}
                className={`block py-1 border-l-2 pl-3 text-sm md:text-base hover:text-primary-main transition-colors ${
                  activeId === item.id
                    ? 'border-primary-main text-primary-main font-medium'
                    : 'border-transparent text-text-secondary'
                }`}
                onClick={(e) => handleClick(e, item.id)}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}