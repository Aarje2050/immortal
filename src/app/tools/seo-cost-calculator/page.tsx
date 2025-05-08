// app/tools/seo-cost-calculator/page.tsx (server component)
import { Metadata } from 'next';
import SEOCostCalculator from './SEOCostCalculator';

export const metadata: Metadata = {
  title: 'Free SEO Cost Calculator | ImmortalSEO',
  description: 'Estimate your SEO investment costs with our free calculator. Get accurate pricing based on your industry, website size, competition level, and business goals.',
  openGraph: {
    title: 'Free SEO Cost Calculator Tool | ImmortalSEO',
    description: 'Estimate your SEO investment costs with our free calculator. Get accurate pricing based on your industry, website size, competition level, and business goals.',
    url: 'https://immortalseo.com/tools/seo-cost-calculator',
    siteName: 'ImmortalSEO',
    images: [
      {
        url: 'https://immortalseo.com/images/og/seo-cost-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'ImmortalSEO Cost Calculator Tool'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates : {canonical : "https://www.immortalseo.com/tools/seo-cost-calculator"}

};

export default function SEOCostCalculatorPage() {
  return <SEOCostCalculator />;
}