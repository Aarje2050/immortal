// app/blog/page.tsx (Server Component)
import { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog/wp-api';
import BlogList from '@/components/blog/BlogList';

export const metadata: Metadata = {
  title: 'Blog | ImmortalSEO',
  description: 'Discover the latest SEO strategies, tips, and insights from our experts at ImmortalSEO.',
};

export const revalidate = 3600; // Revalidate every hour

// In Next.js 15, we need to properly handle dynamic props
export default async function BlogPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Next.js 15 requires we await the searchParams
  const searchParams = await props.searchParams;
  
  // Now we can safely access properties
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  
  const { posts, pagination } = await getAllPosts(page);
  
  return <BlogList posts={posts} pagination={pagination} />;
}