// components/blog/BlogCategoryHeader.tsx
import Container from '@/components/ui/Container';

interface BlogCategoryHeaderProps {
  title: string;
  description?: string;
  postCount?: number;
}

export default function BlogCategoryHeader({
  title,
  description,
  postCount
}: BlogCategoryHeaderProps) {
  return (
    <section className="relative bg-gradient-to-r from-primary-dark to-primary-main text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
      </div>
      
      <Container>
        <div className="py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-4 backdrop-blur-sm">
              Category {postCount !== undefined && `• ${postCount} article${postCount !== 1 ? 's' : ''}`}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            {description && (
              <p className="text-xl mb-8 opacity-90">
                {description}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}