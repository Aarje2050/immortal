// components/blog/ClientShareButtons.tsx (Client Component)
'use client';

import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Share2, Check } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  compact?: boolean;
}

export default function ClientShareButtons({ url, title, compact = false }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  // Encode for sharing
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  // Social share URLs
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;
  
  // Handle copy to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Styling based on compact prop
  const buttonSize = compact ? "w-8 h-8" : "w-10 h-10";
  const iconSize = compact ? 16 : 18;
  
  return (
    <div className="flex items-center space-x-2">
      {!compact && <span className="text-sm text-text-secondary mr-1">Share:</span>}
      
      <a 
        href={facebookShareUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`${buttonSize} rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors`}
        aria-label="Share on Facebook"
      >
        <Facebook size={iconSize} />
      </a>
      
      <a 
        href={twitterShareUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`${buttonSize} rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-colors`}
        aria-label="Share on Twitter"
      >
        <Twitter size={iconSize} />
      </a>
      
      <a 
        href={linkedinShareUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`${buttonSize} rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-colors`}
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={iconSize} />
      </a>
      
      <button 
        onClick={handleCopyLink}
        className={`${buttonSize} rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 transition-colors group relative`}
        aria-label="Copy link"
      >
        {copied ? <Check size={iconSize} className="text-green-600" /> : <Share2 size={iconSize} />}
        
        {/* Tooltip */}
        <span 
          className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded pointer-events-none transition-opacity ${
            copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          {copied ? 'Copied!' : 'Copy link'}
        </span>
      </button>
    </div>
  );
}