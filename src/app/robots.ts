import { MetadataRoute } from 'next';
import { generateRobots } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return generateRobots();
}