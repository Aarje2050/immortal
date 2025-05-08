// app/blog-sitemap.xml/route.ts - Blog sitemap
import { MetadataRoute } from 'next';
import { generateBlogSitemap } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Hourly revalidation for blog content

export async function GET(): Promise<Response> {
  const sitemap = await generateBlogSitemap();
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemap.map(entry => `
       <url>
          <loc>${entry.url}</loc>
          ${entry.lastModified ? 
            `<lastmod>${typeof entry.lastModified === 'string' 
              ? entry.lastModified 
              : entry.lastModified.toISOString()}</lastmod>` 
            : ''}
          ${entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ''}
          ${entry.priority !== undefined ? `<priority>${entry.priority}</priority>` : ''}
        </url>
      `).join('')}
    </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    }
  );
}