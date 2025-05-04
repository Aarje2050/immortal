import { Metadata } from 'next';
import LlmsTxtGenerator from '@/app/tools/llms-txt-generator/LLMsTxtGenerator';

export const metadata: Metadata = {
  title: 'LLMs.txt Generator | ImmortalSEO',
  description: 'Create an LLMs.txt file to help AI models better understand and navigate your website content. Free tool by ImmortalSEO.',
  openGraph: {
    title: 'LLMs.txt Generator | ImmortalSEO',
    description: 'Create an LLMs.txt file to help AI models better understand and navigate your website content. Free tool by ImmortalSEO.',
    images: ['/images/og-llms-txt-generator.jpg'],
    type: 'website',
  },
};

export default function LlmsTxtGeneratorPage() {
  return <LlmsTxtGenerator />;
}