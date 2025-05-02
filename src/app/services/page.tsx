// app/services/page.tsx (server component)
import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Our SEO Services | ImmortalSEO',
  description: 'Comprehensive SEO solutions including technical SEO, content optimization, and AI-enhanced search strategies.',
  // Add more metadata as needed
};

export default function ServicesPage() {
  return <ClientPage />;
}