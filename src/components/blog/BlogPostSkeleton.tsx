// components/blog/BlogPostSkeleton.tsx
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { ArrowLeft } from 'lucide-react';

export default function BlogPostSkeleton() {
  return (
    <Layout>
      <article>
        {/* Hero Section */}
        <Section className="pt-8 md:pt-16 pb-0">
          <Container>
            {/* Categories + Return link */}
            <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="h-8 w-20 bg-gray-200 animate-pulse rounded-full"></div>
              </div>
              
              <Link 
                href="/blog"
                className="flex items-center text-text-secondary hover:text-primary-main transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                <span className="hidden sm:inline">Back to Blog</span>
              </Link>
            </div>
            
            {/* Title */}
            <div className="max-w-4xl mx-auto mb-6">
              <div className="h-14 bg-gray-200 animate-pulse rounded-lg mb-4"></div>
              <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded-lg mb-6"></div>
              
              {/* Meta info */}
              <div className="flex items-center gap-4 md:gap-6 mb-8">
                <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="h-6 w-40 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-full"></div>
              </div>
            </div>
          </Container>
        </Section>
        
        {/* Featured Image Skeleton */}
        <div className="w-full bg-gray-50 mb-12">
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
        </div>
        
        {/* Main Content */}
        <Section>
          <Container>
            <div className="flex flex-col md:flex-row gap-12">
              {/* Main Content Area */}
              <div className="md:w-2/3">
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  {/* Post content skeleton */}
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-6 bg-gray-200 animate-pulse rounded w-11/12"></div>
                    <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
                    
                    <div className="h-10 bg-gray-200 animate-pulse rounded mt-8"></div>
                    
                    <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-6 bg-gray-200 animate-pulse rounded w-11/12"></div>
                    <div className="h-6 bg-gray-200 animate-pulse rounded w-5/6"></div>
                    <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                    
                    <div className="h-40 bg-gray-200 animate-pulse rounded mt-6 mb-6"></div>
                    
                    <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-6 bg-gray-200 animate-pulse rounded w-11/12"></div>
                    <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-6 bg-gray-200 animate-pulse rounded w-4/5"></div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="md:w-1/3">
                <div className="space-y-8">
                  {/* Various sidebar skeletons */}
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="h-8 w-40 bg-gray-200 animate-pulse rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-6 w-4/5 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                  
                  <div className="bg-primary-main/5 p-6 rounded-xl">
                    <div className="h-8 w-40 bg-gray-200 animate-pulse rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-1"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-4"></div>
                    <div className="h-10 bg-gray-200 animate-pulse rounded mb-3"></div>
                    <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </article>
    </Layout>
  );
}