// lib/blog/wp-api.ts
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://immortalseo.com/wp-json/wp/v2';

// Types for WordPress content
export interface Post {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  modified: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
    author?: Array<{
      name: string;
      avatar_urls?: {
        [key: string]: string;
      };
    }>;
  };
}

export interface Category {
  id: number;
  count: number;
  description: string;
  name: string;
  slug: string;
  parent: number;
}

export interface Tag {
  id: number;
  count: number;
  description: string;
  name: string;
  slug: string;
}

// Function to get all post slugs (for static generation)
export async function getAllPostSlugs() {
  const res = await fetch(`${API_URL}/posts?_fields=slug&per_page=100`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  const posts = await res.json();
  return posts.map((post: { slug: string }) => ({
    params: {
      slug: post.slug,
    },
  }));
}

// Function to get a post by slug
export async function getPostBySlug(slug: string) {
  const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  const posts = await res.json();
  if (posts.length === 0) return null;
  return posts[0];
}

// Function to get all posts with pagination
export async function getAllPosts(page = 1, perPage = 10) {
  const res = await fetch(
    `${API_URL}/posts?page=${page}&per_page=${perPage}&_embed`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );
  const posts = await res.json();
  
  // Get total pages from headers
  const totalPosts = parseInt(res.headers.get('x-wp-total') || '0', 10);
  const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '0', 10);
  
  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages,
      totalPosts
    }
  };
}

// Additional functions for categories, tags, etc.
// ...