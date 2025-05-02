// src/components/chat/TawkToChat.tsx

import React, { useEffect } from 'react';

// Define interface for Tawk.to API
declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

interface TawkToChatOptions {
  hideByDefault?: boolean;
  hideOnMobile?: boolean;
  autoShowOnPageLoad?: boolean;
  visitorAttributes?: Record<string, any>;
}

interface TawkToChatProps {
  propertyId: string;
  widgetId: string;
  options?: TawkToChatOptions;
}

const TawkToChat: React.FC<TawkToChatProps> = ({ 
  propertyId, 
  widgetId,
  options = {}
}) => {
  useEffect(() => {
    // Skip if not in browser environment
    if (typeof window === 'undefined') return;
    
    // Skip if the component is disabled
    if (!propertyId || !widgetId) {
      return;
    }
    
    // Check if we should show on mobile
    const isMobile = window.innerWidth < 768;
    if (options.hideOnMobile && isMobile) {
      return;
    }
    
    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    
    // Handle visitor attributes
    if (options.visitorAttributes) {
      window.Tawk_API.visitor = options.visitorAttributes;
    }
    
    // Create script element
    const script = document.createElement('script');
    script.id = 'tawkto-script';
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    // Add event listener to reset widget when Tawk.to loads
    script.addEventListener('load', () => {
      if (window.Tawk_API) {
        if (options.hideByDefault) {
          window.Tawk_API.hideWidget?.();
        } else if (options.autoShowOnPageLoad) {
          window.Tawk_API.showWidget?.();
        }
      }
    });
    
    // Add script to document
    document.body.appendChild(script);
    
    // Cleanup function
    return () => {
      // Remove script
      const tawktoScript = document.getElementById('tawkto-script');
      if (tawktoScript) {
        tawktoScript.remove();
      }
      
      // Cleanup any Tawk.to DOM elements
      if (window.Tawk_API?.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };
  }, [propertyId, widgetId, options]);
  
  // This component doesn't render anything visible
  return null;
};

export default TawkToChat;