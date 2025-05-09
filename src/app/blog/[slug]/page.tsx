// app/blog/[slug]/page.tsx (Server Component)
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getAllPostSlugs, getPostBySlug, Post } from '@/lib/blog/wp-api';
import BlogPost from '@/components/blog/BlogPost';
import BlogPostSkeleton from '@/components/blog/BlogPostSkeleton';
import JsonLd from '@/components/seo/JsonLd';
import { 
  getSchemaContext, 
  generateWebPageSchema, 
  generateArticleSchema,
  generateSchemaGraph,
} from '@/lib/schema';

// Add a sanitizeText function if not already in your schema utils
function sanitizeText(text: string): string {
  return text
    .replace(/<\/?[^>]+(>|$)/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .trim();
}

// Base URL for canonical URLs and schema
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';

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
      canonical: `${baseUrl}/blog/${slug}`,
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
  
  // Get schema context
  const context = getSchemaContext();
  
  // Post URL
  const postUrl = `${baseUrl}/blog/${slug}`;
  
  // Extract post metadata
  const postTitle = post.title.rendered;
  const postDescription = sanitizeText(post.excerpt.rendered).substring(0, 160);
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const imageAlt = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || postTitle;
  const datePublished = post.date;
  const dateModified = post.modified;
  
  // Get author information
  const author = post._embedded?.author?.[0];
  const authorName = author?.name || 'ImmortalSEO Team';
  const authorUrl = `${baseUrl}/blog/author/${author?.slug || 'team'}`;
  const authorAvatar = author?.avatar_urls?.['96'] || '';
  
  // Create author schema
  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${authorUrl}#person`,
    'name': authorName,
    'url': authorUrl,
    'image': authorAvatar || undefined,
  };
  
  // Extract categories and tags
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const tags = post._embedded?.['wp:term']?.[1] || [];
  
  // Combine all terms for keywords
  const keywords = [
    ...categories.map((term: any) => term.name),
    ...tags.map((term: any) => term.name)
  ].join(', ');
  
  // Main category for articleSection
  const mainCategory = categories.length > 0 ? categories[0].name : 'Blog';
  
  // Generate WebPage schema
  const webPageSchema = generateWebPageSchema({
    url: postUrl,
    title: postTitle,
    description: postDescription,
    image: featuredImage,
    datePublished,
    dateModified,
    breadcrumbs: [
      { name: 'Home', url: baseUrl },
      { name: 'Blog', url: `${baseUrl}/blog` },
      { name: mainCategory, url: `${baseUrl}/blog/category/${categories.length > 0 ? categories[0].slug : ''}` },
      { name: postTitle, url: postUrl },
    ],
  });
  
  // Generate ArticleSchema using our function or with direct object
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${postUrl}#article`,
    'headline': postTitle,
    'description': postDescription,
    'image': featuredImage ? {
      '@type': 'ImageObject',
      'url': featuredImage,
      'caption': imageAlt
    } : undefined,
    'datePublished': datePublished,
    'dateModified': dateModified,
    'author': {
      '@id': `${authorUrl}#person`
    },
    'publisher': {
      '@id': `${baseUrl}/#organization`
    },
    'mainEntityOfPage': {
      '@id': `${postUrl}#webpage`
    },
    'keywords': keywords,
    'articleSection': mainCategory,
    'inLanguage': 'en',
    'url': postUrl
  };
  
  // Create schema graph
  const schemaGraph = generateSchemaGraph([
    context.organization,
    context.website,
    webPageSchema,
    authorSchema,
    articleSchema
  ].filter(Boolean));
  
  return (
    <>
      <JsonLd data={schemaGraph} />
      <BlogPost post={post} />
    </>
  );
}