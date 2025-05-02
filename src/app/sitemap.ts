import { MetadataRoute } from 'next';
import { generateSitemap } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return generateSitemap();
}