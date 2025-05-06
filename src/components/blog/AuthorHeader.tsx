// components/blog/AuthorHeader.tsx
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { User } from '@/lib/blog/wp-api';
import { Facebook, Twitter, Linkedin, Globe } from 'lucide-react';

interface AuthorHeaderProps {
  author: User;
  postCount?: number;
}

export default function AuthorHeader({
  author,
  postCount
}: AuthorHeaderProps) {
  return (
    <section className="relative bg-gradient-to-r from-primary-dark to-primary-main text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
      </div>
      
      <Container>
        <div className="py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Author Avatar */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20 flex-shrink-0">
              {author.avatar_urls?.['96'] ? (
                <Image
                  src={author.avatar_urls['96']}
                  alt={author.name}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-primary-dark flex items-center justify-center">
                  <span className="text-4xl font-bold">
                    {author.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            {/* Author Info */}
            <div className="text-center md:text-left">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-4 backdrop-blur-sm">
                Author {postCount !== undefined && `• ${postCount} article${postCount !== 1 ? 's' : ''}`}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {author.name}
              </h1>
              {author.description && (
                <p className="text-xl mb-6 opacity-90">
                  {author.description}
                </p>
              )}
              
              {/* If no description is available, provide a default */}
              {!author.description && (
                <p className="text-xl mb-6 opacity-90">
                  SEO Specialist at ImmortalSEO with expertise in technical SEO and content optimization.
                </p>
              )}
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {author.meta?.facebook && (
                  <a 
                    href={author.meta.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={`${author.name} on Facebook`}
                  >
                    <Facebook size={18} />
                  </a>
                )}
                
                {author.meta?.twitter && (
                  <a 
                    href={`https://twitter.com/${author.meta.twitter}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={`${author.name} on Twitter`}
                  >
                    <Twitter size={18} />
                  </a>
                )}
                
                {author.meta?.linkedin && (
                  <a 
                    href={author.meta.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={`${author.name} on LinkedIn`}
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                
                {author.url && (
                  <a 
                    href={author.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={`${author.name}'s website`}
                  >
                    <Globe size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}