// components/blog/AuthorContent.tsx
import { notFound } from 'next/navigation';
import { 
  getAuthorBySlug, 
  getPostsByAuthor,
  Post
} from '@/lib/blog/wp-api';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import BlogCard from '@/components/blog/BlogCard';
import Pagination from '@/components/ui/Pagination';
import AuthorHeader from '@/components/blog/AuthorHeader';

interface AuthorContentProps {
  authorSlug: string;
  searchParams: { page?: string };
}

export default async function AuthorContent({ 
  authorSlug, 
  searchParams 
}: AuthorContentProps) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const postsPerPage = 9; // Adjust based on your preference
  
  // Get author
  const author = await getAuthorBySlug(authorSlug);
  
  if (!author) {
    notFound();
  }
  
  // Handle case where author data is found but ID might not be set correctly
  if (!author.id) {
    console.error(`Author found but no ID available for slug: ${authorSlug}`);
    notFound();
  }
  
  // Get posts for this author with pagination
  const { posts, totalPosts, pagination } = await getPostsByAuthor(
    author.id,
    currentPage,
    postsPerPage
  );
  
  return (
    <Layout>
      {/* Author Header */}
      <AuthorHeader 
        author={author}
        postCount={totalPosts}
      />

      {/* Posts Grid */}
      <Section>
        <Container>
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
              
              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-16">
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    basePath={`/blog/author/${authorSlug}`}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">No posts found</h2>
              <p className="text-text-secondary mb-8">
                There are currently no posts by this author. Check back later or browse other authors.
              </p>
              <a
                href="/blog"
                className="inline-block px-6 py-3 bg-primary-main text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Back to Blog
              </a>
            </div>
          )}
        </Container>
      </Section>
      
      {/* Author CTA */}
      <Section background="light">
        <Container>
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Work with Our SEO Experts
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl">
                  Our team of SEO specialists, including {author.name}, can help you achieve better rankings and increased traffic. Get in touch for a personalized strategy.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <a
                  href="/contact"
                  className="inline-block px-8 py-4 bg-primary-main text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  Get a Free Consultation
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}