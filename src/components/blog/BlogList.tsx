// components/blog/BlogList.tsx (Server Component)
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import BlogCard from '@/components/blog/BlogCard';
// import Pagination from '@/components/ui/Pagination';
import { Post } from '@/lib/blog/wp-api';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalPosts?: number;
}

interface BlogListProps {
  posts: Post[];
  pagination: PaginationProps;
}

export default function BlogList({ posts, pagination }: BlogListProps) {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-dark to-primary-main text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
        </div>
        
        <Container>
          <div className="py-20 md:py-28 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-4 backdrop-blur-sm">
                SEO Knowledge Hub
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Latest <span className="text-yellow-300">SEO</span> Insights & Strategies
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Stay ahead of the competition with actionable SEO tips, in-depth guides, and industry updates from our expert team.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Blog Content */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Blog Posts */}
            <div className="md:col-span-2">
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                  <h2 className="text-2xl font-bold mb-4">No posts found</h2>
                  <p className="text-text-secondary">
                    Check back soon for new content.
                  </p>
                </div>
              )}
              
              {/* Pagination */}
              {/* {pagination.totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    basePath="/blog"
                  />
                </div>
              )} */}
            </div>
            
            {/* Sidebar - Similar to your existing pages */}
            <div className="md:col-span-1">
              {/* Sidebar content - e.g., categories, recent posts, etc. */}
              <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                <h3 className="text-xl font-semibold mb-4">Categories</h3>
                {/* Categories list would go here */}
              </div>
              
              <div className="bg-primary-main/5 p-6 rounded-xl mb-8">
                <h3 className="text-xl font-semibold mb-3">Subscribe to Updates</h3>
                <p className="text-text-secondary mb-4">
                  Get the latest SEO tips and updates delivered to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary-main text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}