"use client";

import React, { useState, useMemo } from 'react';

interface PhraseData {
  phrase: string;
  count: number;
  density: string;
}

const KeywordDensityWidget: React.FC = () => {
  const [content, setContent] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [ngramSize, setNgramSize] = useState<1 | 2 | 3>(1);

  const analysis = useMemo(() => {
    if (!content.trim()) return null;

    const words = content
      .toLowerCase()
      .replace(/[^a-z0-9\s'-]/g, ' ')
      .split(/\s+/)
      .filter(Boolean);
    const totalWords = words.length;

    if (totalWords === 0) return null;

    // Target keyword analysis
    let targetCount = 0;
    let targetDensity = '0.00';
    let targetProminence = 'Not found';
    if (targetKeyword.trim()) {
      const kw = targetKeyword.toLowerCase().trim();
      const kwWords = kw.split(/\s+/);
      const kwLen = kwWords.length;

      for (let i = 0; i <= words.length - kwLen; i++) {
        const slice = words.slice(i, i + kwLen).join(' ');
        if (slice === kw) targetCount++;
      }
      targetDensity = ((targetCount / totalWords) * 100).toFixed(2);

      // Check prominence (appears in first 100 words?)
      const first100 = words.slice(0, 100).join(' ');
      if (first100.includes(kw)) {
        targetProminence = 'Found in first 100 words (good for SEO)';
      } else if (targetCount > 0) {
        targetProminence = 'Not in first 100 words — consider moving it earlier';
      }
    }

    // N-gram analysis
    const stopWords = new Set([
      'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
      'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
      'should', 'may', 'might', 'shall', 'can', 'to', 'of', 'in', 'for',
      'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during',
      'and', 'but', 'or', 'nor', 'not', 'so', 'yet', 'both', 'either',
      'it', 'its', 'i', 'me', 'my', 'we', 'our', 'you', 'your',
      'he', 'him', 'his', 'she', 'her', 'they', 'them', 'their', 'this',
      'that', 'these', 'those', 'what', 'which', 'who', 'how', 'about',
    ]);

    const ngramFreq: Record<string, number> = {};
    for (let i = 0; i <= words.length - ngramSize; i++) {
      const ngram = words.slice(i, i + ngramSize);
      // For 1-grams, filter stop words
      if (ngramSize === 1 && (stopWords.has(ngram[0]) || ngram[0].length < 2)) continue;
      // For multi-grams, filter if starts or ends with stop word
      if (ngramSize > 1 && (stopWords.has(ngram[0]) || stopWords.has(ngram[ngram.length - 1]))) continue;
      const phrase = ngram.join(' ');
      ngramFreq[phrase] = (ngramFreq[phrase] || 0) + 1;
    }

    const topPhrases: PhraseData[] = Object.entries(ngramFreq)
      .filter(([, count]) => count >= 2) // Only show phrases appearing 2+ times
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([phrase, count]) => ({
        phrase,
        count,
        density: ((count / totalWords) * 100).toFixed(2),
      }));

    return {
      totalWords,
      targetCount,
      targetDensity: parseFloat(targetDensity),
      targetDensityStr: targetDensity,
      targetProminence,
      topPhrases,
    };
  }, [content, targetKeyword, ngramSize]);

  const getDensityColor = (density: number) => {
    if (density === 0) return 'text-gray-400';
    if (density < 0.5) return 'text-yellow-600';
    if (density <= 2.5) return 'text-green-600';
    if (density <= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  const getDensityLabel = (density: number) => {
    if (density === 0) return 'Not found';
    if (density < 0.5) return 'Low density — may need more mentions';
    if (density <= 2.5) return 'Optimal range for natural content';
    if (density <= 4) return 'High — review for natural readability';
    return 'Very high — risk of keyword stuffing';
  };

  const handleClear = () => {
    setContent('');
    setTargetKeyword('');
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold">Analyze Your Content</h2>
          <button onClick={handleClear} className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-text-secondary transition-colors">
            Clear All
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="kd-keyword" className="block text-sm font-medium text-text-secondary mb-1.5">
              Target Keyword <span className="text-xs text-gray-400">(optional)</span>
            </label>
            <input
              id="kd-keyword"
              type="text"
              value={targetKeyword}
              onChange={(e) => setTargetKeyword(e.target.value)}
              placeholder="e.g., seo services, technical seo"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main text-sm"
            />
          </div>

          <div>
            <label htmlFor="kd-content" className="block text-sm font-medium text-text-secondary mb-1.5">Content to Analyze</label>
            <textarea
              id="kd-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste the text content of your page or blog post here..."
              className="w-full h-48 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main text-sm resize-y leading-relaxed"
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      {/* Target Keyword Results */}
      {analysis && targetKeyword.trim() && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4">Target Keyword Analysis</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary-main">{analysis.targetCount}</div>
              <div className="text-xs text-text-secondary mt-1">Occurrences</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className={`text-3xl font-bold ${getDensityColor(analysis.targetDensity)}`}>
                {analysis.targetDensityStr}%
              </div>
              <div className="text-xs text-text-secondary mt-1">Keyword Density</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary-main">{analysis.totalWords}</div>
              <div className="text-xs text-text-secondary mt-1">Total Words</div>
            </div>
          </div>

          {/* Density gauge */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-text-secondary mb-1">
              <span>0%</span>
              <span className="text-green-600 font-medium">Optimal 1-2.5%</span>
              <span>5%+</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden relative">
              <div className="absolute left-[20%] right-[50%] h-full bg-green-100 rounded" />
              <div
                className={`h-full rounded-full transition-all relative z-10 ${
                  analysis.targetDensity <= 2.5 ? 'bg-green-500' : analysis.targetDensity <= 4 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(100, (analysis.targetDensity / 5) * 100)}%` }}
              />
            </div>
          </div>

          <p className={`text-sm ${getDensityColor(analysis.targetDensity)}`}>
            {getDensityLabel(analysis.targetDensity)}
          </p>
          <p className="text-xs text-text-secondary mt-2">{analysis.targetProminence}</p>
        </div>
      )}

      {/* N-gram Analysis */}
      {analysis && analysis.topPhrases.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold">Top Phrases Found</h2>
            <div className="flex gap-1">
              {([1, 2, 3] as const).map((n) => (
                <button
                  key={n}
                  onClick={() => setNgramSize(n)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    ngramSize === n ? 'bg-primary-main text-white' : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                  }`}
                >
                  {n}-Word
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 font-medium text-text-secondary">#</th>
                  <th className="text-left py-2 pr-4 font-medium text-text-secondary">Phrase</th>
                  <th className="text-right py-2 px-4 font-medium text-text-secondary">Count</th>
                  <th className="text-right py-2 pl-4 font-medium text-text-secondary">Density</th>
                </tr>
              </thead>
              <tbody>
                {analysis.topPhrases.map((p, i) => (
                  <tr key={p.phrase} className="border-b border-gray-50">
                    <td className="py-2 pr-4 text-text-secondary">{i + 1}</td>
                    <td className="py-2 pr-4 font-medium">{p.phrase}</td>
                    <td className="text-right py-2 px-4">{p.count}</td>
                    <td className="text-right py-2 pl-4 text-primary-main">{p.density}%</td>
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

export default KeywordDensityWidget;
