"use client";

import React, { useState } from 'react';

interface SizeResult {
  success: boolean;
  url: string;
  htmlSizeBytes: number;
  htmlSizeKB: string;
  estimatedGzipKB: string;
  characterCount: number;
  isUnderLimit: boolean;
  percentOfLimit: string;
  percentile: string;
  loadTime: number;
  statusCode: number;
  contentType: string;
  domIndicators: {
    scriptTags: number;
    styleTags: number;
    inlineStyles: number;
    divCount: number;
  };
  googleCrawlLimitBytes: number;
  error?: string;
}

const PageSizeWidget: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SizeResult | null>(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/check-page-size', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else if (data.success) {
        setResult(data);
      }
    } catch {
      setError('Failed to check the page. Please verify the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCheck();
  };

  const getStatusColor = (isUnder: boolean) => isUnder ? 'text-green-600' : 'text-red-600';
  const getStatusBg = (isUnder: boolean) => isUnder ? 'bg-green-50' : 'bg-red-50';

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Check Your Page Size</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="https://www.example.com"
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main text-sm"
            disabled={loading}
          />
          <button
            onClick={handleCheck}
            disabled={loading || !url.trim()}
            className="px-6 py-2.5 bg-primary-main text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Checking...
              </span>
            ) : 'Check Size'}
          </button>
        </div>
        <p className="text-xs text-text-secondary mt-2">
          Enter any webpage URL to check its raw HTML size against Google&apos;s 2 MB crawl limit.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <>
          {/* Main Verdict */}
          <div className={`rounded-xl p-6 border ${result.isUnderLimit ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{result.isUnderLimit ? '✅' : '❌'}</span>
              <div>
                <h3 className={`text-xl font-bold ${getStatusColor(result.isUnderLimit)}`}>
                  {result.isUnderLimit ? 'Within Google\'s 2 MB Crawl Limit' : 'Exceeds Google\'s 2 MB Crawl Limit!'}
                </h3>
                <p className="text-sm text-text-secondary truncate max-w-xl">{result.url}</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary">
              {result.isUnderLimit
                ? `Your page HTML is ${result.htmlSizeKB} KB — only ${result.percentOfLimit}% of Google's 2 MB limit. This is well within safe bounds.`
                : `Your page HTML is ${formatBytes(result.htmlSizeBytes)} — ${result.percentOfLimit}% of Google's 2 MB limit. Google may not crawl the full content.`}
            </p>
          </div>

          {/* Size Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center">
              <div className="text-2xl font-bold text-primary-main">{result.htmlSizeKB} KB</div>
              <div className="text-xs text-text-secondary mt-1">Raw HTML Size</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center">
              <div className="text-2xl font-bold text-primary-main">~{result.estimatedGzipKB} KB</div>
              <div className="text-xs text-text-secondary mt-1">Est. Gzipped Size</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center">
              <div className="text-2xl font-bold text-primary-main">{result.characterCount.toLocaleString()}</div>
              <div className="text-xs text-text-secondary mt-1">Characters</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center">
              <div className="text-2xl font-bold text-primary-main">{result.loadTime} ms</div>
              <div className="text-xs text-text-secondary mt-1">Response Time</div>
            </div>
          </div>

          {/* 2 MB Gauge */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold mb-3">Size vs. Google&apos;s 2 MB Crawl Limit</h3>
            <div className="relative">
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${result.isUnderLimit ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(100, parseFloat(result.percentOfLimit))}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>0 KB</span>
                <span className="font-medium">Median: 33 KB</span>
                <span className="font-medium">90th: 155 KB</span>
                <span>2,048 KB (2 MB)</span>
              </div>
            </div>
            <p className="text-sm text-text-secondary mt-3">{result.percentile}</p>
          </div>

          {/* DOM Indicators */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold mb-3">HTML Composition Indicators</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Script Tags', value: result.domIndicators.scriptTags, warn: result.domIndicators.scriptTags > 15 },
                { label: 'Style Tags', value: result.domIndicators.styleTags, warn: result.domIndicators.styleTags > 5 },
                { label: 'Inline Styles', value: result.domIndicators.inlineStyles, warn: result.domIndicators.inlineStyles > 50 },
                { label: 'Div Elements', value: result.domIndicators.divCount, warn: result.domIndicators.divCount > 500 },
              ].map((item) => (
                <div key={item.label} className={`rounded-lg p-3 text-center ${item.warn ? 'bg-yellow-50' : 'bg-gray-50'}`}>
                  <div className={`text-xl font-bold ${item.warn ? 'text-yellow-600' : 'text-text-primary'}`}>{item.value}</div>
                  <div className="text-xs text-text-secondary">{item.label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-secondary mt-3">
              High numbers of inline scripts, styles, and excessive DOM elements contribute to HTML bloat. Consider externalizing scripts and styles, and reducing DOM depth.
            </p>
          </div>

          {/* Technical Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold mb-3">Technical Details</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <dt className="text-text-secondary">Status Code</dt>
                <dd className={`font-medium ${result.statusCode === 200 ? 'text-green-600' : 'text-yellow-600'}`}>{result.statusCode}</dd>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <dt className="text-text-secondary">Content Type</dt>
                <dd className="font-medium truncate ml-4">{result.contentType.split(';')[0]}</dd>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <dt className="text-text-secondary">Raw Size</dt>
                <dd className="font-medium">{formatBytes(result.htmlSizeBytes)}</dd>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <dt className="text-text-secondary">% of 2 MB Limit</dt>
                <dd className={`font-medium ${getStatusColor(result.isUnderLimit)}`}>{result.percentOfLimit}%</dd>
              </div>
            </dl>
          </div>
        </>
      )}
    </div>
  );
};

export default PageSizeWidget;
