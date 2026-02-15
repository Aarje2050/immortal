"use client";

import React, { useState } from "react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={faq.id}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <button
            className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50/50 transition-colors"
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            aria-expanded={openIndex === index}
          >
            <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
            <svg
              className={`w-5 h-5 text-primary-main flex-shrink-0 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {/* Content always in DOM for SEO crawlability — uses max-height for visual toggle */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openIndex === index
                ? "max-h-[600px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 pb-5">
              <p className="text-text-secondary leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
