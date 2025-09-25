// app/blog/page.tsx (Server Component)
import { Metadata } from 'next';
import { getAllPosts, Post } from '@/lib/blog/wp-api'; // Import Post type
import BlogList from '@/components/blog/BlogList';
import Layout from '@/components/layout/Layout';
import JsonLd from '@/components/seo/JsonLd';
import { 
  getSchemaContext, 
  generateWebPageSchema, 
  generateSchemaGraph 
} from '@/lib/schema';

// Base URL for canonical URLs and schema
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
const pageUrl = `${baseUrl}/blog`;

export const metadata: Metadata = {
  title: 'Blog | ImmortalSEO',
  description: 'Discover the latest SEO strategies, tips, and insights from our experts at ImmortalSEO.',
  alternates: {
    canonical: pageUrl,
  },
};

export const revalidate = 3600; // Revalidate every hour

// Define posts per page (match your current setting)
const POSTS_PER_PAGE = 10; // Adjust if your API uses a different value

// In Next.js 15, we need to properly handle dynamic props
export default async function BlogPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Next.js 15 requires we await the searchParams
  const searchParams = await props.searchParams;
  
  // Now we can safely access properties
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  
  const { posts, pagination } = await getAllPosts(page);
  
  // Get schema context
  const context = getSchemaContext();
  
  // Generate WebPage schema (CollectionPage type for listings)
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#webpage`,
    'url': pageUrl,
    'name': 'Blog | ImmortalSEO',
    'description': 'Discover the latest SEO strategies, tips, and insights from our experts at ImmortalSEO.',
    'isPartOf': {
      '@id': `${baseUrl}/#website`
    },
    'about': {
      '@id': `${baseUrl}/#organization`
    },
    'breadcrumb': {
      '@id': `${pageUrl}#breadcrumb`
    },
    'inLanguage': 'en',
  };
  
  // Generate Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': baseUrl
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Blog',
        'item': pageUrl
      }
    ]
  };
  
  // Generate ItemList schema for blog posts
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': posts.map((post: Post, index: number) => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
      
      return {
        '@type': 'ListItem',
        'position': index + 1 + ((page - 1) * POSTS_PER_PAGE),
        'url': postUrl,
        'item': {
          '@type': 'BlogPosting',
          '@id': `${postUrl}#article`,
          'headline': post.title.rendered,
          'description': post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 160),
          'url': postUrl,
          'author': {
            '@type': 'Person',
            'name': post._embedded?.author?.[0]?.name || 'ImmortalSEO Team'
          },
          'publisher': {
            '@id': `${baseUrl}/#organization`
          },
          'image': featuredImage ? {
            '@type': 'ImageObject',
            'url': featuredImage
          } : undefined,
          'datePublished': post.date,
          'dateModified': post.modified,
          'mainEntityOfPage': {
            '@id': `${postUrl}#webpage`
          }
        }
      };
    })
  };
  
  // Create schema graph
  const schemaGraph = generateSchemaGraph([
    context.organization,
    context.website,
    webPageSchema,
    breadcrumbSchema,
    itemListSchema
  ].filter(Boolean));
  
  // Define breadcrumbs
  const breadcrumbs = [
    { name: 'Blog', href: '/blog' }
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <JsonLd data={schemaGraph} />
      <BlogList posts={posts} pagination={pagination} />
    </Layout>
  );
}