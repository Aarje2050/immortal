// components/blog/BlogPost.tsx (Server Component with Client Islands)
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Post } from '@/lib/blog/wp-api';
import ClientTableOfContents from './ClientTableOfContents';
import ClientShareButtons from './ClientShareButtons';

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  // Format the date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Calculate reading time
  const text = post.content.rendered.replace(/<\/?[^>]+(>|$)/g, '');
  const words = text.split(/\s+/).length;
  const readingTime = `${Math.ceil(words / 200)} min read`;
  
  // Get author info
  const author = post._embedded?.author?.[0];
  
  // Get categories and tags
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const tags = post._embedded?.['wp:term']?.[1] || [];
  
  // Create the canonical URL for sharing
  const shareUrl = `https://immortalseo.com/blog/${post.slug}`;
  
  return (
    <Layout>
      {/* Main Content */}
      <article className="blog-post">
        {/* Hero Section */}
        <Section className="pt-8 md:pt-16 pb-0">
          <Container>
            {/* Categories + Return link */}
            <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link 
                    key={`cat-${category.id}`}
                    href={`/blog/category/${category.slug}`}
                    className="px-3 py-1 bg-primary-main/10 text-primary-main text-sm font-medium rounded-full hover:bg-primary-main/20 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              
              <Link 
                href="/blog"
                className="flex items-center text-text-secondary hover:text-primary-main transition-colors"
                aria-label="Back to blog"
              >
                <ArrowLeft size={16} className="mr-2" />
                <span className="hidden sm:inline">Back to Blog</span>
              </Link>
            </div>
            
            {/* Title */}
            <div className="max-w-4xl mx-auto mb-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {post.title.rendered}
              </h1>
              
              {/* Meta info */}
              <div className="flex flex-wrap items-center text-text-secondary gap-4 md:gap-6 mb-8">
                {author && (
                  <div className="flex items-center">
                    <User size={16} className="mr-2" aria-hidden="true" />
                    <span className="font-medium">{author.name}</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" aria-hidden="true" />
                  <time dateTime={new Date(post.date).toISOString()}>{formattedDate}</time>
                </div>
                
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" aria-hidden="true" />
                  <span>{readingTime}</span>
                </div>
                
                {/* Share buttons (desktop) - Client Component */}
                <div className="hidden md:block ml-auto">
                  <ClientShareButtons url={shareUrl} title={post.title.rendered} />
                </div>
              </div>
            </div>
          </Container>
        </Section>
        
        {/* Featured Image */}
        {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
          <div className="w-full bg-gray-50 mb-8 md:mb-12">
            <div className="max-w-5xl mx-auto">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={post.title.rendered}
                  width={1200}
                  height={630}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content Section */}
        <Section>
          <Container>
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
              {/* Main Content Area */}
              <div className="md:w-2/3">
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm post-content-wrapper">
                  {/* Post content */}
                  <div 
                    className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-primary-main prose-a:font-medium prose-img:rounded-xl prose-blockquote:border-primary-main prose-blockquote:bg-primary-main/5 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-figcaption:text-text-secondary prose-strong:text-text-primary"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                  />
                  
                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-100">
                      <h3 className="text-lg font-semibold mb-3">Topics:</h3>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Link 
                            key={`tag-${tag.id}`}
                            href={`/blog/tag/${tag.slug}`}
                            className="px-3 py-1 bg-gray-100 text-text-secondary text-sm rounded-full hover:bg-gray-200 transition-colors"
                          >
                            {tag.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Author Bio (Mobile) */}
                  {author && (
                    <div className="mt-8 pt-8 border-t border-gray-100 md:hidden">
                      <h3 className="text-lg font-semibold mb-3">About the Author</h3>
                      <div className="flex items-start">
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 mr-4">
                          {author.avatar_urls?.['96'] && (
                            <Image
                              src={author.avatar_urls['96']}
                              alt={author.name}
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">{author.name}</h4>
                          <p className="text-sm text-text-secondary mt-1">
                            SEO Specialist at ImmortalSEO with expertise in technical SEO and content optimization.
                          </p>
                          <Link 
                            href={`/blog/author/${author.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-primary-main text-sm font-medium mt-2 inline-block hover:underline"
                          >
                            View all posts
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Mobile Share Buttons - Client Component */}
                  <div className="mt-8 pt-8 border-t border-gray-100 md:hidden">
                    <h3 className="text-lg font-semibold mb-3">Share This Article</h3>
                    <ClientShareButtons url={shareUrl} title={post.title.rendered} />
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="md:w-1/3">
                <div className="sticky top-24 space-y-8">
                  {/* Table of Contents - Client Component */}
                  <div className="hidden md:block">
                    <ClientTableOfContents />
                  </div>
                  
                  {/* Author Bio (Desktop) */}
                  {author && (
                    <div className="hidden md:block bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-xl font-semibold mb-4">About the Author</h3>
                      <div className="flex items-start">
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 mr-4">
                          {author.avatar_urls?.['96'] && (
                            <Image
                              src={author.avatar_urls['96']}
                              alt={author.name}
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">{author.name}</h4>
                          <p className="text-sm text-text-secondary mt-1">
                            SEO Specialist at ImmortalSEO with expertise in technical SEO and content optimization.
                          </p>
                          <Link 
                            href={`/blog/author/${author.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-primary-main text-sm font-medium mt-2 inline-block hover:underline"
                          >
                            View all posts
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Newsletter Signup */}
                  {/* <div className="bg-primary-main/5 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-3">Get SEO Updates</h3>
                    <p className="text-text-secondary mb-4">
                      Subscribe to our newsletter for the latest SEO strategies and insights.
                    </p>
                    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                      <label htmlFor="email-signup" className="sr-only">Email address</label>
                      <input
                        id="email-signup"
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main"
                        required
                      />
                      <Button
                        variant="primary"
                        fullWidth
                        type="submit"
                      >
                        Subscribe
                      </Button>
                    </form>
                  </div> */}
                  
                  {/* Services Promotion */}
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-3">Need SEO Help?</h3>
                    <p className="text-text-secondary mb-4">
                      Our expert team can help implement these strategies for your business.
                    </p>
                    <Button
                      href="/contact"
                      variant="primary"
                      fullWidth
                    >
                      Get a Free SEO Audit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </article>
      
      {/* CTA Section */}
      <Section background="primary">
        <Container>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Apply These Strategies?
                </h2>
                <p className="text-xl opacity-90 max-w-2xl">
                  Turn these insights into real results for your business with our custom SEO services. Get a free SEO audit and discover your growth opportunities.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Button
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="font-semibold text-primary-main px-8 hover:scale-105 transition-transform"
                >
                  Get Your Free SEO Audit
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}