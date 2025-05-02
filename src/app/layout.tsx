import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import seoConfig from '../../config/seo.config';



// Define fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

// Metadata for the entire site
export const metadata: Metadata = {
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.defaultDescription,
  keywords: ['SEO', 'search engine optimization', 'digital marketing', 'online visibility'],
  authors: [{ name: 'Immortal SEO Team' }],
  creator: 'Immortal SEO',
  publisher: 'Immortal SEO',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://immortalseo.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    ...seoConfig.openGraph,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
  },
  twitter: {
    ...seoConfig.twitter,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    ...seoConfig.robotsProps,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  
}>)
 {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-background-default text-text-primary">
        {children}
      </body>
    </html>
  );
}