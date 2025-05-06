// components/blog/BlogCard.tsx (Server Component)
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/blog/wp-api';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/blog-placeholder.jpg';
  const altText = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered;
  
  // Format the date
  const date = new Date(post.date);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
  
  // Get the first category
  const category = post._embedded?.['wp:term']?.[0]?.[0];
  
  // Get the excerpt and clean it
  const excerpt = post.excerpt.rendered
    .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
    .replace(/&hellip;/g, "...") // Replace HTML entities
    .substring(0, 150) + "..."; // Limit length

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:translate-y-[-5px] group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-52 mb-4 rounded-lg overflow-hidden">
          <Image
            src={featuredImage}
            alt={altText}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {category && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-primary-main/80 text-white text-sm font-medium rounded-full backdrop-blur-sm">
              {category.name}
            </span>
          )}
        </div>
      </Link>
      
      <div className="text-sm text-text-secondary mb-2">
        {formattedDate}
      </div>
      
      <Link href={`/blog/${post.slug}`} className="block">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-main transition-colors">
          {post.title.rendered}
        </h3>
      </Link>
      
      <p className="text-text-secondary mb-4">
        {excerpt}
      </p>
      
      <Link 
        href={`/blog/${post.slug}`}
        className="inline-flex items-center text-primary-main font-medium hover:text-primary-dark"
      >
        Read More
        <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
}