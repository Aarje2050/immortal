// src/config/chat.config.ts

export const chatConfig = {
    tawkto: {
      enabled: true,
      propertyId: '6773a7beaf5bfec1dbe509c2', // Replace with your actual Property ID
      widgetId: '1igdseh4v',     // Replace with your actual Widget ID
      options: {
        // Optional customization options for Tawk.to API
        // These will be applied using Tawk_API after the widget loads
        hideByDefault: false,     // Set to true if you want the widget hidden initially
        hideOnMobile: false,      // Set to true to hide on mobile devices
        autoShowOnPageLoad: true, // Show chat widget automatically when page loads
      }
    }
  };
  
  export default chatConfig;