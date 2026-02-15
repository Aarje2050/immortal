"use client";

import React, { useState, useMemo } from 'react';

// Approximate syllable count for a word
function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length <= 2) return 1;
  let count = 0;
  const vowels = 'aeiouy';
  let prevVowel = false;
  for (let i = 0; i < w.length; i++) {
    const isVowel = vowels.includes(w[i]);
    if (isVowel && !prevVowel) count++;
    prevVowel = isVowel;
  }
  // Adjust for silent e
  if (w.endsWith('e') && count > 1) count--;
  // Adjust for common suffixes
  if (w.endsWith('le') && w.length > 2 && !vowels.includes(w[w.length - 3])) count++;
  return Math.max(1, count);
}

interface ScoreResult {
  fleschEase: number;
  fleschGrade: number;
  gunningFog: number;
  avgSentenceLen: number;
  avgWordLen: number;
  totalSyllables: number;
  complexWords: number;
  complexPercent: number;
  passiveSentences: number;
  passivePercent: number;
  totalWords: number;
  totalSentences: number;
}

const ReadabilityWidget: React.FC = () => {
  const [text, setText] = useState('');

  const scores: ScoreResult | null = useMemo(() => {
    if (!text.trim()) return null;

    const words = text.trim().split(/\s+/).filter(Boolean);
    const totalWords = words.length;
    if (totalWords < 10) return null;

    const sentenceEnders = text.match(/[.!?]+/g);
    const totalSentences = sentenceEnders ? sentenceEnders.length : 1;

    let totalSyllables = 0;
    let complexWords = 0; // Words with 3+ syllables
    words.forEach((w) => {
      const s = countSyllables(w);
      totalSyllables += s;
      if (s >= 3) complexWords++;
    });

    const avgSentenceLen = totalWords / totalSentences;
    const avgSyllablesPerWord = totalSyllables / totalWords;
    const avgWordLen = words.reduce((acc, w) => acc + w.replace(/[^a-z]/gi, '').length, 0) / totalWords;

    // Flesch Reading Ease: 206.835 - 1.015(words/sentences) - 84.6(syllables/words)
    const fleschEase = Math.max(0, Math.min(100, 206.835 - 1.015 * avgSentenceLen - 84.6 * avgSyllablesPerWord));

    // Flesch-Kincaid Grade Level
    const fleschGrade = Math.max(0, 0.39 * avgSentenceLen + 11.8 * avgSyllablesPerWord - 15.59);

    // Gunning Fog Index
    const complexPercent = (complexWords / totalWords) * 100;
    const gunningFog = 0.4 * (avgSentenceLen + complexPercent);

    // Passive voice detection (simple heuristic)
    const passivePatterns = /\b(is|are|was|were|be|been|being)\s+(being\s+)?\w+ed\b/gi;
    const passiveMatches = text.match(passivePatterns);
    const passiveSentences = passiveMatches ? passiveMatches.length : 0;
    const passivePercent = (passiveSentences / totalSentences) * 100;

    return {
      fleschEase: Math.round(fleschEase * 10) / 10,
      fleschGrade: Math.round(fleschGrade * 10) / 10,
      gunningFog: Math.round(gunningFog * 10) / 10,
      avgSentenceLen: Math.round(avgSentenceLen * 10) / 10,
      avgWordLen: Math.round(avgWordLen * 10) / 10,
      totalSyllables,
      complexWords,
      complexPercent: Math.round(complexPercent * 10) / 10,
      passiveSentences,
      passivePercent: Math.round(passivePercent * 10) / 10,
      totalWords,
      totalSentences,
    };
  }, [text]);

  const getEaseLabel = (score: number) => {
    if (score >= 90) return { label: 'Very Easy', desc: '5th grade level — understood by everyone', color: 'text-green-600', bg: 'bg-green-500' };
    if (score >= 80) return { label: 'Easy', desc: '6th grade — conversational English', color: 'text-green-600', bg: 'bg-green-500' };
    if (score >= 70) return { label: 'Fairly Easy', desc: '7th grade — ideal for web content', color: 'text-green-600', bg: 'bg-green-500' };
    if (score >= 60) return { label: 'Standard', desc: '8th-9th grade — plain English', color: 'text-blue-600', bg: 'bg-blue-500' };
    if (score >= 50) return { label: 'Fairly Difficult', desc: '10th-12th grade — some college', color: 'text-yellow-600', bg: 'bg-yellow-500' };
    if (score >= 30) return { label: 'Difficult', desc: 'College level — academic content', color: 'text-orange-600', bg: 'bg-orange-500' };
    return { label: 'Very Difficult', desc: 'College graduate — professional/scientific', color: 'text-red-600', bg: 'bg-red-500' };
  };

  const handleClear = () => setText('');

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold">Enter Your Content</h2>
          <button onClick={handleClear} className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-text-secondary transition-colors">
            Clear
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your content here (at least 10 words) to analyze readability..."
          className="w-full h-56 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main text-sm resize-y leading-relaxed"
          spellCheck={false}
        />
        {text.trim() && text.trim().split(/\s+/).length < 10 && (
          <p className="text-xs text-yellow-600 mt-2">Enter at least 10 words for accurate readability analysis.</p>
        )}
      </div>

      {/* Results */}
      {scores && (
        <>
          {/* Main Score */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Readability Score</h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Big score circle */}
              <div className="flex-shrink-0 w-32 h-32 rounded-full border-4 border-gray-100 flex items-center justify-center relative">
                <div className={`text-4xl font-bold ${getEaseLabel(scores.fleschEase).color}`}>
                  {scores.fleschEase}
                </div>
                <div className="absolute -bottom-1 text-xs text-text-secondary">/ 100</div>
              </div>
              <div className="text-center md:text-left">
                <h3 className={`text-2xl font-bold ${getEaseLabel(scores.fleschEase).color}`}>
                  {getEaseLabel(scores.fleschEase).label}
                </h3>
                <p className="text-text-secondary mt-1">{getEaseLabel(scores.fleschEase).desc}</p>
                <p className="text-sm text-text-secondary mt-3">
                  <strong>SEO Recommendation:</strong> For most web content, aim for a Flesch Reading Ease score of 60-70 (standard/plain English). Blog posts targeting a general audience should score 70+ for better engagement.
                </p>
              </div>
            </div>

            {/* Score bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs text-text-secondary mb-1">
                <span>Very Difficult (0)</span>
                <span>Very Easy (100)</span>
              </div>
              <div className="h-3 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full relative">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full shadow"
                  style={{ left: `${Math.min(97, Math.max(3, scores.fleschEase))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { label: 'Flesch-Kincaid Grade', value: scores.fleschGrade, suffix: '', desc: 'US grade level' },
              { label: 'Gunning Fog Index', value: scores.gunningFog, suffix: '', desc: 'Years of education needed' },
              { label: 'Avg Sentence Length', value: scores.avgSentenceLen, suffix: ' words', desc: 'Aim for 15-20' },
              { label: 'Avg Word Length', value: scores.avgWordLen, suffix: ' chars', desc: 'Shorter = easier' },
              { label: 'Complex Words', value: `${scores.complexWords} (${scores.complexPercent}%)`, suffix: '', desc: '3+ syllables' },
              { label: 'Passive Voice', value: `${scores.passiveSentences} (${scores.passivePercent}%)`, suffix: '', desc: 'Aim for <10%' },
              { label: 'Total Words', value: scores.totalWords, suffix: '', desc: '' },
              { label: 'Total Sentences', value: scores.totalSentences, suffix: '', desc: '' },
            ].map((metric) => (
              <div key={metric.label} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="text-xl font-bold text-primary-main">
                  {metric.value}{metric.suffix}
                </div>
                <div className="text-xs font-medium text-text-primary mt-1">{metric.label}</div>
                {metric.desc && <div className="text-xs text-text-secondary mt-0.5">{metric.desc}</div>}
              </div>
            ))}
          </div>

          {/* Improvement Tips */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Improvement Suggestions</h2>
            <div className="space-y-3">
              {scores.fleschEase < 60 && (
                <div className="flex items-start p-3 bg-yellow-50 rounded-lg text-sm">
                  <span className="mr-2 mt-0.5">⚠️</span>
                  <div>
                    <strong className="text-yellow-700">Readability is below recommended level.</strong>
                    <p className="text-yellow-600 mt-1">Break long sentences into shorter ones. Replace complex words with simpler alternatives. Aim for 15-20 words per sentence.</p>
                  </div>
                </div>
              )}
              {scores.avgSentenceLen > 25 && (
                <div className="flex items-start p-3 bg-yellow-50 rounded-lg text-sm">
                  <span className="mr-2 mt-0.5">⚠️</span>
                  <div>
                    <strong className="text-yellow-700">Sentences are too long (avg {scores.avgSentenceLen} words).</strong>
                    <p className="text-yellow-600 mt-1">Split long sentences. Aim for 15-20 words per sentence for web content. Vary sentence length for rhythm.</p>
                  </div>
                </div>
              )}
              {scores.passivePercent > 15 && (
                <div className="flex items-start p-3 bg-yellow-50 rounded-lg text-sm">
                  <span className="mr-2 mt-0.5">⚠️</span>
                  <div>
                    <strong className="text-yellow-700">High passive voice usage ({scores.passivePercent}%).</strong>
                    <p className="text-yellow-600 mt-1">Convert passive constructions to active voice. Instead of &ldquo;The site was optimized by our team,&rdquo; write &ldquo;Our team optimized the site.&rdquo;</p>
                  </div>
                </div>
              )}
              {scores.complexPercent > 20 && (
                <div className="flex items-start p-3 bg-yellow-50 rounded-lg text-sm">
                  <span className="mr-2 mt-0.5">⚠️</span>
                  <div>
                    <strong className="text-yellow-700">Too many complex words ({scores.complexPercent}%).</strong>
                    <p className="text-yellow-600 mt-1">Replace multi-syllable words with simpler alternatives where possible. Use &ldquo;use&rdquo; instead of &ldquo;utilize,&rdquo; &ldquo;help&rdquo; instead of &ldquo;facilitate.&rdquo;</p>
                  </div>
                </div>
              )}
              {scores.fleschEase >= 60 && scores.avgSentenceLen <= 25 && scores.passivePercent <= 15 && (
                <div className="flex items-start p-3 bg-green-50 rounded-lg text-sm">
                  <span className="mr-2 mt-0.5">✅</span>
                  <div>
                    <strong className="text-green-700">Your content reads well!</strong>
                    <p className="text-green-600 mt-1">Readability is at a good level for web content. Focus on content depth and topical coverage for maximum SEO impact.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReadabilityWidget;
