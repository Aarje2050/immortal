// app/sitemap.xml/route.ts - Main sitemap index file
import { generateSitemapIndex } from '@/lib/seo';

export const dynamic = 'force-dynamic'; // Always generate fresh sitemaps
export const revalidate = 3600; // Revalidate every hour

export async function GET(): Promise<Response> {
  const sitemap = await generateSitemapIndex();
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemap.map(entry => `
        <sitemap>
          <loc>${entry.url}</loc>
          ${entry.lastModified ? 
            `<lastmod>${typeof entry.lastModified === 'string' 
              ? entry.lastModified 
              : entry.lastModified.toISOString()}</lastmod>` 
            : ''}
        </sitemap>
      `).join('')}
    </sitemapindex>`,
    {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    }
  );
}