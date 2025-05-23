// app/blog/category/[category]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { 
  getCategoryBySlug, 
  getPostsByCategory,
  getAllCategories,
  Category,
  Post
} from '@/lib/blog/wp-api';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import BlogCard from '@/components/blog/BlogCard';
import Pagination from '@/components/ui/Pagination';
import BlogCategoryHeader from '@/components/blog/BlogCategoryHeader';

export const revalidate = 3600; // Revalidate every hour

// Generate static paths at build time for all categories
export async function generateStaticParams() {
  const categories = await getAllCategories();
  
  return categories.map((category: Category) => ({
    category: category.slug,
  }));
}

// Generate metadata
export async function generateMetadata(props: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const category = await getCategoryBySlug(params.category);
  
  if (!category) {
    return {
      title: 'Category Not Found | ImmortalSEO',
      description: 'The category you are looking for does not exist.',
    };
  }
  
  return {
    title: `${category.name} - ImmortalSEO Blog`,
    description: category.description || `Browse our articles about ${category.name} and discover expert insights and strategies.`,
    openGraph: {
      title: `${category.name} - ImmortalSEO Blog`,
      description: category.description || `Browse our articles about ${category.name} and discover expert insights and strategies.`,
      type: 'website',
      url: `https://immortalseo.com/blog/category/${category.slug}`,
    },
    alternates: {
      canonical: `https://immortalseo.com/blog/category/${category.slug}`,
    }
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const postsPerPage = 9; // Adjust based on your preference
  
  // Get category
  const category = await getCategoryBySlug(params.category);
  
  if (!category) {
    notFound();
  }
  
  // Get posts for this category with pagination
  const { posts, totalPosts, pagination } = await getPostsByCategory(
    category.id,
    currentPage,
    postsPerPage
  );
  
  return (
    <Layout>
      {/* Category Header */}
      <BlogCategoryHeader 
        title={category.name}
        description={category.description}
        postCount={totalPosts}
      />

      {/* Posts Grid */}
      <Section>
        <Container>
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: Post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
              
              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-16">
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    basePath={`/blog/category/${params.category}`}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">No posts found</h2>
              <p className="text-text-secondary mb-8">
                There are currently no posts in this category. Check back later or browse other categories.
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
      
      {/* Category CTA */}
      <Section background="light">
        <Container>
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Need Help with {category.name}?
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl">
                  Our team of SEO experts specializes in {category.name.toLowerCase()} strategies that drive real results. Get in touch for a customized approach.
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