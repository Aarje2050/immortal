"use client";

import React, { useState } from "react";

interface TimelineEra {
  id: number;
  year: string;
  title: string;
  description: string;
}

interface TimelineAccordionProps {
  timeline: TimelineEra[];
}

export default function TimelineAccordion({ timeline }: TimelineAccordionProps) {
  const [activeEra, setActiveEra] = useState<number>(timeline.length - 1);

  return (
    <div className="space-y-3">
      {timeline.map((era) => (
        <button
          key={era.id}
          className={`w-full text-left transition-all ${
            activeEra === era.id
              ? "bg-primary-main text-white shadow-md"
              : "bg-white hover:bg-primary-main/5"
          } p-4 rounded-lg shadow-sm`}
          onClick={() => setActiveEra(activeEra === era.id ? -1 : era.id)}
          aria-expanded={activeEra === era.id}
        >
          <div className="flex items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold mr-4 flex-shrink-0 ${
                activeEra === era.id
                  ? "bg-white text-primary-main"
                  : "bg-primary-main/10 text-primary-main"
              }`}
            >
              {era.year.substring(0, 4)}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${activeEra === era.id ? "opacity-80" : "text-text-secondary"}`}>
                {era.year}
              </p>
              <h4 className="text-lg font-semibold">{era.title}</h4>
            </div>
            <svg
              className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                activeEra === era.id ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Content always in DOM for SEO crawlability */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              activeEra === era.id ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
            }`}
          >
            <p className="pl-16 pr-2 leading-relaxed">{era.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
