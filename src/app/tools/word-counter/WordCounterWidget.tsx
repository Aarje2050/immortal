"use client";

import React, { useState, useMemo } from 'react';

interface TopWord {
  word: string;
  count: number;
  density: string;
}

const WordCounterWidget: React.FC = () => {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    if (!text.trim()) {
      return {
        words: 0, chars: 0, charsNoSpace: 0, sentences: 0,
        paragraphs: 0, readingTime: '0 min', speakingTime: '0 min',
        avgWordLength: '0', avgSentenceLength: '0', topWords: [] as TopWord[],
      };
    }

    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const sentenceArr = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentences = sentenceArr.length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length || 1;
    const readingMin = Math.max(1, Math.ceil(wordCount / 238));
    const speakingMin = Math.max(1, Math.ceil(wordCount / 130));
    const avgWordLen = wordCount > 0 ? (charsNoSpace / wordCount).toFixed(1) : '0';
    const avgSentLen = sentences > 0 ? (wordCount / sentences).toFixed(0) : '0';

    // Top words (exclude common stop words)
    const stopWords = new Set([
      'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
      'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
      'should', 'may', 'might', 'shall', 'can', 'to', 'of', 'in', 'for',
      'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during',
      'before', 'after', 'above', 'below', 'between', 'and', 'but', 'or',
      'nor', 'not', 'so', 'yet', 'both', 'either', 'neither', 'each',
      'every', 'all', 'any', 'few', 'more', 'most', 'other', 'some',
      'such', 'no', 'only', 'own', 'same', 'than', 'too', 'very',
      'just', 'because', 'if', 'when', 'while', 'that', 'this', 'these',
      'those', 'it', 'its', 'i', 'me', 'my', 'we', 'our', 'you', 'your',
      'he', 'him', 'his', 'she', 'her', 'they', 'them', 'their', 'what',
      'which', 'who', 'whom', 'how', 'about', 'up', 'out', 'then',
    ]);
    const freq: Record<string, number> = {};
    words.forEach(w => {
      const lw = w.toLowerCase().replace(/[^a-z0-9'-]/g, '');
      if (lw.length > 1 && !stopWords.has(lw)) {
        freq[lw] = (freq[lw] || 0) + 1;
      }
    });
    const topWords: TopWord[] = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / wordCount) * 100).toFixed(1),
      }));

    return {
      words: wordCount, chars, charsNoSpace, sentences, paragraphs,
      readingTime: `${readingMin} min`, speakingTime: `${speakingMin} min`,
      avgWordLength: avgWordLen, avgSentenceLength: avgSentLen, topWords,
    };
  }, [text]);

  const seoInsight = useMemo(() => {
    const w = stats.words;
    if (w === 0) return null;
    if (w < 300) return { text: 'Short content — suitable for product descriptions, FAQs, or social posts', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (w < 800) return { text: 'Medium length — good for blog posts, service pages, and landing pages', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (w < 1500) return { text: 'Long-form — great for in-depth articles, pillar content, and how-to guides', color: 'text-green-600', bg: 'bg-green-50' };
    if (w < 3000) return { text: 'Comprehensive — ideal for ultimate guides, whitepapers, and research content', color: 'text-green-700', bg: 'bg-green-50' };
    return { text: 'Very long — consider splitting into multiple pages or a content series for better readability', color: 'text-orange-600', bg: 'bg-orange-50' };
  }, [stats.words]);

  const handleClear = () => setText('');

  const handlePasteSample = () => {
    setText(
      `Search Engine Optimization (SEO) is the practice of improving a website's visibility in search engine results pages. When done correctly, SEO drives organic traffic to your website without paying for ads.\n\nModern SEO goes beyond simple keyword placement. It involves technical optimization, content strategy, link building, and user experience improvements. Search engines like Google use hundreds of ranking factors to determine which pages appear first for any given query.\n\nAI-powered search engines are changing how people discover content online. Platforms like Google SGE, ChatGPT, and Perplexity are summarizing web content directly in their responses. This means your content needs to be structured for both traditional search crawlers and large language models.\n\nKey areas of SEO include:\n\n1. Technical SEO — ensuring your website is crawlable, fast, and mobile-friendly\n2. On-page SEO — optimizing content, headings, meta tags, and internal links\n3. Off-page SEO — building quality backlinks and brand mentions\n4. Local SEO — optimizing for location-based search queries\n5. Content SEO — creating valuable, comprehensive content that answers user questions\n\nA well-executed SEO strategy takes time but delivers compounding returns. Unlike paid advertising, organic traffic continues to grow as your website builds authority and trust with search engines.`
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold">Enter Your Content</h2>
        <div className="flex gap-2">
          <button
            onClick={handlePasteSample}
            className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-text-secondary transition-colors"
          >
            Try Sample Text
          </button>
          <button
            onClick={handleClear}
            className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-text-secondary transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your content here to get word count, character count, reading time, and SEO insights..."
        className="w-full h-56 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main resize-y text-sm leading-relaxed"
        spellCheck={false}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 mt-6">
        {[
          { label: 'Words', value: stats.words.toLocaleString(), icon: 'W' },
          { label: 'Characters', value: stats.chars.toLocaleString(), icon: 'C' },
          { label: 'Without Spaces', value: stats.charsNoSpace.toLocaleString(), icon: '–' },
          { label: 'Sentences', value: stats.sentences.toLocaleString(), icon: 'S' },
          { label: 'Paragraphs', value: stats.paragraphs.toLocaleString(), icon: '¶' },
          { label: 'Reading Time', value: stats.readingTime, icon: '⏱' },
          { label: 'Avg Word Length', value: `${stats.avgWordLength} chars`, icon: 'A' },
          { label: 'Avg Sentence Length', value: `${stats.avgSentenceLength} words`, icon: 'L' },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-primary-main">{stat.value}</div>
            <div className="text-xs text-text-secondary mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* SEO Insight */}
      {seoInsight && (
        <div className={`mt-4 p-3 rounded-lg ${seoInsight.bg} text-sm`}>
          <span className={`font-semibold ${seoInsight.color}`}>SEO Content Length Insight: </span>
          <span className="text-text-secondary">{seoInsight.text}</span>
        </div>
      )}

      {/* Top Keywords */}
      {stats.topWords.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-3">Top Keywords Found</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 font-medium text-text-secondary">Keyword</th>
                  <th className="text-right py-2 px-4 font-medium text-text-secondary">Count</th>
                  <th className="text-right py-2 pl-4 font-medium text-text-secondary">Density</th>
                </tr>
              </thead>
              <tbody>
                {stats.topWords.map((tw) => (
                  <tr key={tw.word} className="border-b border-gray-50">
                    <td className="py-2 pr-4 font-medium">{tw.word}</td>
                    <td className="text-right py-2 px-4">{tw.count}</td>
                    <td className="text-right py-2 pl-4 text-primary-main">{tw.density}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordCounterWidget;
