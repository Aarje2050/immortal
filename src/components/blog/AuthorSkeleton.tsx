// components/blog/AuthorSkeleton.tsx
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Layout from '@/components/layout/Layout';

export default function AuthorSkeleton() {
  return (
    <Layout>
      {/* Header Skeleton */}
      <section className="relative bg-gradient-to-r from-primary-dark to-primary-main text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
        </div>
        
        <Container>
          <div className="py-16 md:py-24 relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Author Avatar Skeleton */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/20 animate-pulse"></div>
              
              {/* Author Info Skeleton */}
              <div className="text-center md:text-left">
                <div className="h-8 w-36 bg-white/20 animate-pulse rounded-full mb-4 mx-auto md:mx-0"></div>
                <div className="h-10 bg-white/20 animate-pulse rounded mb-4 w-3/4 mx-auto md:mx-0"></div>
                <div className="h-8 bg-white/20 animate-pulse rounded mb-4 w-full mx-auto md:mx-0"></div>
                <div className="h-8 bg-white/20 animate-pulse rounded mb-6 w-5/6 mx-auto md:mx-0"></div>
                
                {/* Social Links Skeleton */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse"></div>
                  <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse"></div>
                  <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Content Skeleton */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Post Card Skeletons */}
            {Array(6).fill(0).map((_, i) => (
              <div key={`skeleton-${i}`} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="relative h-52 mb-4 rounded-lg bg-gray-200 animate-pulse"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded mb-3"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6 mb-3"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-4"></div>
                <div className="h-5 bg-gray-200 animate-pulse rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </Layout>
  );
}