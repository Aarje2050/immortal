// app/services-sitemap.xml/route.ts - Services sitemap
import { generateServicesSitemap } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // Daily revalidation

export async function GET(): Promise<Response> {
  const sitemap = await generateServicesSitemap();
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
        'Cache-Control': 'public, max-age=86400, s-maxage=86400'
      }
    }
  );
}