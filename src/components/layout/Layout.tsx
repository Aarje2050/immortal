"use client";


// src/components/layout/Layout.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb, { BreadcrumbItem } from '@/components/ui/Breadcrumb';
import Container from '@/components/ui/Container';
import { chatConfig } from '../../../config/chat.config';

// Define layout props interface
interface LayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

// Load TawkToChat component dynamically with no SSR to avoid hydration issues
const TawkToChat = dynamic(
  () => import('@/components/chat/TawkToChat'),
  { ssr: false }
);

const Layout: React.FC<LayoutProps> = ({ children, breadcrumbs }) => {
  const { tawkto } = chatConfig;
  
  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb Navigation */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="bg-gray-50 border-b border-gray-200">
            <Container>
              <div className="py-3">
                <Breadcrumb items={breadcrumbs} />
              </div>
            </Container>
          </div>
        )}
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