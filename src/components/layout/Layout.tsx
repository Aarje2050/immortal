"use client";


// src/components/layout/Layout.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { chatConfig } from '../../../config/chat.config';

// Define layout props interface
interface LayoutProps {
  children: React.ReactNode;
}

// Load TawkToChat component dynamically with no SSR to avoid hydration issues
const TawkToChat = dynamic(
  () => import('@/components/chat/TawkToChat'),
  { ssr: false }
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { tawkto } = chatConfig;
  
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      
      {/* Add TawkToChat component if enabled */}
      {tawkto.enabled && (
        <TawkToChat
          propertyId={tawkto.propertyId}
          widgetId={tawkto.widgetId}
          options={tawkto.options}
        />
      )}
    </>
  );
};

export default Layout;