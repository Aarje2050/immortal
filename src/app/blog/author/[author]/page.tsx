// app/blog/author/[author]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { 
  getAuthorBySlug, 
  getAllAuthors
} from '@/lib/blog/wp-api';
import AuthorSkeleton from '@/components/blog/AuthorSkeleton';
import AuthorContent from '@/components/blog/AuthorContent';

export const revalidate = 3600; // Revalidate every hour
export const dynamicParams = true; // Allow params not returned by generateStaticParams

// Generate static paths at build time for all authors
export async function generateStaticParams() {
  try {
    const authors = await getAllAuthors();
    
    return authors.map(author => ({
      author: author.slug || author.name.toLowerCase().replace(/\s+/g, '-'),
    }));
  } catch (error) {
    console.error('Error generating static params for authors:', error);
    return []; // Return empty array on error
  }
}

// Generate metadata
export async function generateMetadata(props: {
  params: Promise<{ author: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const author = await getAuthorBySlug(params.author);
  
  if (!author) {
    return {
      title: 'Author Not Found | ImmortalSEO',
      description: 'The author you are looking for does not exist.',
    };
  }
  
  return {
    title: `${author.name} - Author at ImmortalSEO Blog`,
    description: author.description || `Read articles by ${author.name}, SEO expert at ImmortalSEO. Discover expert insights and strategies.`,
    openGraph: {
      title: `${author.name} - Author at ImmortalSEO Blog`,
      description: author.description || `Read articles by ${author.name}, SEO expert at ImmortalSEO. Discover expert insights and strategies.`,
      type: 'profile',
      url: `https://immortalseo.com/blog/author/${author.slug}`,
      images: author.avatar_urls?.['96'] ? [{ url: author.avatar_urls['96'] }] : undefined,
    },
    alternates: {
      canonical: `https://immortalseo.com/blog/author/${author.slug}`,
    }
  };
}

export default async function AuthorPage(props: {
  params: Promise<{ author: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  // Next.js 15 requires we await the params
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  // Check if author exists to handle 404 early
  const author = await getAuthorBySlug(params.author);
  if (!author) {
    notFound();
  }
  
  return (
    <Suspense fallback={<AuthorSkeleton />}>
      <AuthorContent authorSlug={params.author} searchParams={searchParams} />
    </Suspense>
  );
}