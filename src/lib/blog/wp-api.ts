// lib/blog/wp-api.ts
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://blog.immortalseo.com/wp-json/wp/v2';

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
  try {
    const res = await fetch(`${API_URL}/posts?_fields=slug&per_page=100`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch post slugs: ${res.status}`);
    }
    
    const posts = await res.json();
    return posts.map((post: { slug: string }) => ({
      params: {
        slug: post.slug,
      },
    }));
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

// Function to get a post by slug
export async function getPostBySlug(slug: string) {
  try {
    const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.status}`);
    }
    
    const posts = await res.json();
    if (posts.length === 0) return null;
    return posts[0];
  } catch (error) {
    console.error(`Error fetching post by slug (${slug}):`, error);
    return null;
  }
}

// Function to get all posts with pagination
export async function getAllPosts(page = 1, perPage = 10) {
  try {
    const res = await fetch(
      `${API_URL}/posts?page=${page}&per_page=${perPage}&_embed`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }
    
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
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      posts: [],
      pagination: {
        currentPage: page,
        totalPages: 0,
        totalPosts: 0
      }
    };
  }
}

// Function to get all categories
export async function getAllCategories() {
  try {
    const res = await fetch(`${API_URL}/categories?per_page=100`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Function to get a category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await fetch(
      `${API_URL}/categories?slug=${slug}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch category: ${response.status}`);
    }
    
    const categories = await response.json();
    
    if (categories.length === 0) {
      return null;
    }
    
    return categories[0] as Category;
  } catch (error) {
    console.error(`Error fetching category by slug (${slug}):`, error);
    return null;
  }
}

// Function to get posts by category
export async function getPostsByCategory(categoryId: number, page = 1, perPage = 10) {
  try {
    const res = await fetch(
      `${API_URL}/posts?categories=${categoryId}&page=${page}&per_page=${perPage}&_embed`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch posts by category: ${res.status}`);
    }
    
    const posts = await res.json();
    
    // Get total posts from headers
    const totalPosts = parseInt(res.headers.get('x-wp-total') || '0', 10);
    const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '0', 10);
    
    return {
      posts,
      totalPosts,
      pagination: { 
        currentPage: page, 
        totalPages 
      }
    };
  } catch (error) {
    console.error(`Error fetching posts by category (${categoryId}):`, error);
    return {
      posts: [],
      totalPosts: 0,
      pagination: { 
        currentPage: page, 
        totalPages: 0 
      }
    };
  }
}

// Function to get all tags
export async function getAllTags() {
  try {
    const res = await fetch(`${API_URL}/tags?per_page=100`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch tags: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

// Function to get a tag by slug
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  try {
    const response = await fetch(
      `${API_URL}/tags?slug=${slug}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tag: ${response.status}`);
    }
    
    const tags = await response.json();
    
    if (tags.length === 0) {
      return null;
    }
    
    return tags[0] as Tag;
  } catch (error) {
    console.error(`Error fetching tag by slug (${slug}):`, error);
    return null;
  }
}

// Function to get posts by tag
export async function getPostsByTag(tagId: number, page = 1, perPage = 10) {
  try {
    const res = await fetch(
      `${API_URL}/posts?tags=${tagId}&page=${page}&per_page=${perPage}&_embed`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch posts by tag: ${res.status}`);
    }
    
    const posts = await res.json();
    
    // Get total posts from headers
    const totalPosts = parseInt(res.headers.get('x-wp-total') || '0', 10);
    const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '0', 10);
    
    return {
      posts,
      totalPosts,
      pagination: { 
        currentPage: page, 
        totalPages 
      }
    };
  } catch (error) {
    console.error(`Error fetching posts by tag (${tagId}):`, error);
    return {
      posts: [],
      totalPosts: 0,
      pagination: { 
        currentPage: page, 
        totalPages: 0 
      }
    };
  }
}

// Function to get related posts
export async function getRelatedPosts(postId: number, categoryIds: number[] = [], tagIds: number[] = [], limit = 3) {
  try {
    // Build query parameters
    let queryParams = '';
    
    if (categoryIds.length > 0) {
      queryParams = `categories=${categoryIds.join(',')}`;
    } else if (tagIds.length > 0) {
      queryParams = `tags=${tagIds.join(',')}`;
    }
    
    // Always exclude current post
    queryParams += `&exclude=${postId}`;
    
    // Limit and add _embed
    queryParams += `&per_page=${limit}&_embed`;
    
    const res = await fetch(`${API_URL}/posts?${queryParams}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch related posts: ${res.status}`);
    }
    
    const posts = await res.json();
    
    // If we don't have enough posts, get more without category/tag filters
    if (posts.length < limit) {
      const moreRes = await fetch(
        `${API_URL}/posts?exclude=${postId}&per_page=${limit - posts.length}&_embed`,
        { next: { revalidate: 3600 } } // Cache for 1 hour
      );
      
      if (!moreRes.ok) {
        throw new Error(`Failed to fetch additional related posts: ${moreRes.status}`);
      }
      
      const morePosts = await moreRes.json();
      return [...posts, ...morePosts].slice(0, limit);
    }
    
    return posts;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

// These are the functions to add to your existing wp-api.ts file

// These are the functions to add to your existing wp-api.ts file

// User/Author type definition
export interface User {
    id: number;
    name: string;
    url: string;
    description: string;
    slug: string;
    avatar_urls: {
      '24': string;
      '48': string;
      '96': string;
      'full'?: string;
    };
    meta?: {
      facebook?: string;
      twitter?: string;
      linkedin?: string;
      position?: string;
      specialty?: string;
    };
  }
  
  // Get all authors
  export async function getAllAuthors(): Promise<User[]> {
    try {
      const res = await fetch(`${API_URL}/users?per_page=100`, {
        next: { revalidate: 3600 } // Cache for 1 hour
      });
      
      if (!res.ok) {
        console.error('Failed to fetch authors:', res.statusText);
        return []; // Return empty array instead of throwing
      }
      
      const authors = await res.json();
      
      // Create slugs for authors based on their names if slug is not present
      return authors.map((author: User) => ({
        ...author,
        slug: author.slug || author.name.toLowerCase().replace(/\s+/g, '-')
      }));
    } catch (error) {
      console.error('Error fetching all authors:', error);
      return []; // Return empty array on error
    }
  }
  
  // Get author by slug
  export async function getAuthorBySlug(slug: string): Promise<User | null> {
    try {
      // WordPress REST API doesn't support direct user lookup by slug
      // So we need to fetch all users and filter manually
      const res = await fetch(`${API_URL}/users?per_page=100`, {
        next: { revalidate: 3600 } // Cache for 1 hour
      });
      
      if (!res.ok) {
        console.error('Failed to fetch users:', res.statusText);
        return null;
      }
      
      const users = await res.json();
      
      // Find the author with a matching slug
      // We convert the author name to a slug format for comparison
      const author = users.find((user: User) => 
        user.slug === slug || 
        user.name.toLowerCase().replace(/\s+/g, '-') === slug
      );
      
      if (!author) {
        console.error(`No author found with slug: ${slug}`);
        return null;
      }
      
      // Add slug to the author data to ensure consistency
      return {
        ...author,
        slug: slug
      };
    } catch (error) {
      console.error('Error fetching author by slug:', error);
      return null;
    }
  }
  
  // Get posts by author with pagination
  export async function getPostsByAuthor(
    authorId: number,
    page: number = 1,
    perPage: number = 9
  ): Promise<{ 
    posts: Post[]; 
    totalPosts: number;
    pagination: {
      currentPage: number;
      totalPages: number;
    }
  }> {
    try {
      const res = await fetch(
        `${API_URL}/posts?author=${authorId}&page=${page}&per_page=${perPage}&_embed=1`,
        {
          next: { revalidate: 3600 } // Cache for 1 hour
        }
      );
      
      if (!res.ok) {
        console.error(`Failed to fetch posts by author ${authorId}:`, res.statusText);
        // Return empty result rather than throwing
        return {
          posts: [],
          totalPosts: 0,
          pagination: {
            currentPage: page,
            totalPages: 0
          }
        };
      }
      
      const posts = await res.json();
      
      // Get total posts and total pages from headers
      const totalPosts = parseInt(res.headers.get('X-WP-Total') || '0', 10);
      const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '0', 10);
      
      return {
        posts,
        totalPosts,
        pagination: {
          currentPage: page,
          totalPages
        }
      };
    } catch (error) {
      console.error('Error fetching posts by author:', error);
      // Return empty result instead of throwing
      return {
        posts: [],
        totalPosts: 0,
        pagination: {
          currentPage: page,
          totalPages: 0
        }
      };
    }
  }