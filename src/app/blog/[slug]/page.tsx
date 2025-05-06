// app/blog/[slug]/page.tsx (Server Component)
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog/wp-api';
import BlogPost from '@/components/blog/BlogPost';
import BlogPostSkeleton from '@/components/blog/BlogPostSkeleton';

// Generate static paths at build time
export async function generateStaticParams() {
  const paths = await getAllPostSlugs();
  return paths;
}

// Generate dynamic metadata for each blog post
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Next.js 15 requires we await the params
  const params = await props.params;
  const slug = params.slug;
  
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | ImmortalSEO',
      description: 'The post you are looking for does not exist.',
    };
  }
  
  // Clean description from HTML
  const description = post.excerpt.rendered
    .replace(/<\/?[^>]+(>|$)/g, '')
    .substring(0, 160);
  
  // Get featured image
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  
  return {
    title: `${post.title.rendered} | ImmortalSEO Blog`,
    description,
    openGraph: {
      title: post.title.rendered,
      description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: featuredImage ? [{ url: featuredImage }] : undefined,
    },
    alternates: {
      canonical: `https://immortalseo.com/blog/${slug}`,
    }
  };
}

// Enable ISR
export const revalidate = 3600; // Revalidate every hour

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  // Next.js 15 requires we await the params
  const params = await props.params;
  const slug = params.slug;
  
  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPostContent slug={slug} />
    </Suspense>
  );
}

// Separate component for content with loading handling
async function BlogPostContent({ slug }: { slug: string }) {
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  return <BlogPost post={post} />;
}