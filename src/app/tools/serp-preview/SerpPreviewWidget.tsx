"use client";

import React, { useState, useMemo } from 'react';

const SerpPreviewWidget: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  const TITLE_MAX = 60;
  const DESC_MAX_DESKTOP = 160;
  const DESC_MAX_MOBILE = 120;
  const descMax = device === 'desktop' ? DESC_MAX_DESKTOP : DESC_MAX_MOBILE;

  const analysis = useMemo(() => {
    const titleLen = title.length;
    const descLen = description.length;
    const issues: { type: 'error' | 'warning' | 'good'; message: string }[] = [];

    // Title analysis
    if (titleLen === 0) {
      issues.push({ type: 'error', message: 'Title tag is empty — add a title to appear in search results' });
    } else if (titleLen < 30) {
      issues.push({ type: 'warning', message: `Title is short (${titleLen} chars) — aim for 50-60 characters to maximize SERP real estate` });
    } else if (titleLen > 60) {
      issues.push({ type: 'warning', message: `Title may be truncated (${titleLen} chars) — Google typically displays 50-60 characters` });
    } else {
      issues.push({ type: 'good', message: `Title length is optimal (${titleLen}/60 chars)` });
    }

    // Description analysis
    if (descLen === 0) {
      issues.push({ type: 'error', message: 'Meta description is empty — Google may generate one automatically' });
    } else if (descLen < 70) {
      issues.push({ type: 'warning', message: `Description is short (${descLen} chars) — aim for 120-160 characters` });
    } else if (descLen > DESC_MAX_DESKTOP) {
      issues.push({ type: 'warning', message: `Description may be truncated on desktop (${descLen}/${DESC_MAX_DESKTOP} chars)` });
    } else {
      issues.push({ type: 'good', message: `Description length is good (${descLen}/${DESC_MAX_DESKTOP} chars)` });
    }

    // URL analysis
    if (url && url.length > 75) {
      issues.push({ type: 'warning', message: 'URL is long — shorter URLs are easier to read in search results' });
    }

    // Content quality checks
    if (title && !title.match(/[A-Z]/)) {
      issues.push({ type: 'warning', message: 'Title has no uppercase letters — consider using title case for better CTR' });
    }
    if (description && !description.includes(' ')) {
      issues.push({ type: 'error', message: 'Description appears to be a single word — write a complete sentence' });
    }

    return issues;
  }, [title, description, url]);

  const truncate = (text: string, max: number) => {
    if (text.length <= max) return text;
    return text.substring(0, max).trim() + '...';
  };

  const formatUrl = (rawUrl: string) => {
    if (!rawUrl) return 'www.example.com';
    try {
      const u = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
      const path = u.pathname === '/' ? '' : ` › ${u.pathname.split('/').filter(Boolean).join(' › ')}`;
      return `${u.hostname}${path}`;
    } catch {
      return rawUrl;
    }
  };

  const titleColor = title.length === 0 ? 'text-gray-400' : title.length > TITLE_MAX ? 'text-red-500' : 'text-green-600';
  const descColor = description.length === 0 ? 'text-gray-400' : description.length > descMax ? 'text-red-500' : 'text-green-600';

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Enter Your Meta Tags</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="serp-title" className="text-sm font-medium text-text-secondary">Title Tag</label>
              <span className={`text-xs font-medium ${titleColor}`}>{title.length}/{TITLE_MAX}</span>
            </div>
            <input
              id="serp-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your Page Title — Brand Name"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main text-sm"
              maxLength={120}
            />
            {/* Pixel width bar */}
            <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${title.length <= TITLE_MAX ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min(100, (title.length / TITLE_MAX) * 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="serp-desc" className="text-sm font-medium text-text-secondary">Meta Description</label>
              <span className={`text-xs font-medium ${descColor}`}>{description.length}/{descMax}</span>
            </div>
            <textarea
              id="serp-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a compelling description that encourages users to click through from search results..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main text-sm resize-none"
              rows={3}
              maxLength={320}
            />
            <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${description.length <= descMax ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min(100, (description.length / descMax) * 100)}%` }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="serp-url" className="block text-sm font-medium text-text-secondary mb-1.5">Page URL</label>
            <input
              id="serp-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.example.com/your-page"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main text-sm"
            />
          </div>
        </div>
      </div>

      {/* Device Toggle */}
      <div className="flex justify-center gap-2">
        {(['desktop', 'mobile'] as const).map((d) => (
          <button
            key={d}
            onClick={() => setDevice(d)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              device === d ? 'bg-primary-main text-white' : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
            }`}
          >
            {d === 'desktop' ? '🖥 Desktop' : '📱 Mobile'}
          </button>
        ))}
      </div>

      {/* SERP Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Google Search Preview</h2>

        <div className={`bg-white rounded-lg p-4 border border-gray-200 ${device === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
          {/* Favicon + URL line */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
              {url ? formatUrl(url).charAt(0).toUpperCase() : 'E'}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-700 truncate">{url ? (url.startsWith('http') ? url : `https://${url}`) : 'https://www.example.com'}</p>
              <p className="text-xs text-gray-500 truncate">{formatUrl(url)}</p>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer leading-snug mb-1 font-normal" style={{ fontFamily: 'Arial, sans-serif' }}>
            {title ? truncate(title, TITLE_MAX) : 'Your Page Title Will Appear Here'}
          </h3>

          {/* Description */}
          <p className="text-sm text-[#4d5156] leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>
            {description
              ? truncate(description, descMax)
              : 'Your meta description will appear here. Write a compelling description that encourages users to click through from search results.'}
          </p>
        </div>
      </div>

      {/* Analysis */}
      {analysis.length > 0 && (title || description) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4">Analysis & Recommendations</h2>
          <div className="space-y-2">
            {analysis.map((item, i) => (
              <div
                key={i}
                className={`flex items-start p-3 rounded-lg text-sm ${
                  item.type === 'error' ? 'bg-red-50' : item.type === 'warning' ? 'bg-yellow-50' : 'bg-green-50'
                }`}
              >
                <span className="flex-shrink-0 mr-2 mt-0.5">
                  {item.type === 'error' ? '❌' : item.type === 'warning' ? '⚠️' : '✅'}
                </span>
                <span className={item.type === 'error' ? 'text-red-700' : item.type === 'warning' ? 'text-yellow-700' : 'text-green-700'}>
                  {item.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SerpPreviewWidget;
