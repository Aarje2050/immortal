// src/lib/topics/topicClusters.ts
// Topic cluster architecture for semantic SEO

export interface TopicCluster {
  id: string;
  pillarPage: {
    slug: string;
    title: string;
    url: string;
    description: string;
  };
  supportingContent: Array<{
    slug: string;
    title: string;
    url: string;
    type: 'service' | 'blog' | 'industry' | 'case-study' | 'tool';
    relationship: 'supports' | 'explains' | 'demonstrates' | 'compares';
  }>;
  entities: string[]; // Related entities
  keywords: string[]; // Cluster keywords
}

/**
 * Define topic clusters for ImmortalSEO
 */
export const topicClusters: TopicCluster[] = [
  {
    id: 'technical-seo-cluster',
    pillarPage: {
      slug: 'technical-seo',
      title: 'Technical SEO & Site Architecture',
      url: '/services/technical-seo',
      description: 'Comprehensive guide to technical SEO optimization',
    },
    supportingContent: [
      { slug: 'site-speed-optimization', title: 'Site Speed Optimization', url: '/blog/site-speed-optimization', type: 'blog', relationship: 'explains' },
      { slug: 'crawl-optimization', title: 'Crawl Budget Optimization', url: '/blog/crawl-optimization', type: 'blog', relationship: 'explains' },
      { slug: 'structured-data', title: 'Schema Markup Implementation', url: '/blog/structured-data', type: 'blog', relationship: 'explains' },
      { slug: 'mobile-seo', title: 'Mobile SEO Best Practices', url: '/blog/mobile-seo', type: 'blog', relationship: 'supports' },
      { slug: 'robots-txt-generator', title: 'Robots.txt Generator', url: '/tools/robots-txt-generator', type: 'tool', relationship: 'demonstrates' },
      { slug: 'schema-generator', title: 'Schema Markup Generator', url: '/tools/schema-generator', type: 'tool', relationship: 'demonstrates' },
    ],
    entities: ['Technical SEO', 'Site Architecture', 'Crawlability', 'Indexation', 'Page Speed'],
    keywords: ['technical SEO', 'site architecture', 'crawl optimization', 'indexation', 'page speed', 'mobile SEO'],
  },
  {
    id: 'content-seo-cluster',
    pillarPage: {
      slug: 'content-seo',
      title: 'Content SEO & Topic Authority',
      url: '/services/content-seo',
      description: 'Strategic content optimization for search engines',
    },
    supportingContent: [
      { slug: 'topic-authority', title: 'Building Topic Authority', url: '/blog/topic-authority', type: 'blog', relationship: 'explains' },
      { slug: 'e-e-a-t-optimization', title: 'E-E-A-T Optimization Guide', url: '/blog/e-e-a-t-optimization', type: 'blog', relationship: 'explains' },
      { slug: 'keyword-research', title: 'Advanced Keyword Research', url: '/blog/keyword-research', type: 'blog', relationship: 'supports' },
      { slug: 'content-strategy', title: 'Content Strategy Development', url: '/blog/content-strategy', type: 'blog', relationship: 'supports' },
    ],
    entities: ['Content SEO', 'Topic Authority', 'E-E-A-T', 'Keyword Research', 'Content Strategy'],
    keywords: ['content SEO', 'topic authority', 'E-E-A-T', 'content strategy', 'keyword optimization'],
  },
  {
    id: 'ai-seo-cluster',
    pillarPage: {
      slug: 'ai-enhanced-seo',
      title: 'AI-Enhanced SEO & SGE Optimization',
      url: '/services/ai-enhanced-seo',
      description: 'Optimization for AI search platforms',
    },
    supportingContent: [
      { slug: 'llm-content-strategy', title: 'LLM-Ready Content Strategy', url: '/services/llm-content-strategy', type: 'service', relationship: 'supports' },
      { slug: 'semantic-seo', title: 'Semantic SEO & Entity Optimization', url: '/services/semantic-seo', type: 'service', relationship: 'supports' },
      { slug: 'chatgpt-optimization', title: 'ChatGPT Optimization Guide', url: '/blog/chatgpt-optimization', type: 'blog', relationship: 'explains' },
      { slug: 'llms-txt-generator', title: 'LLMs.txt Generator', url: '/tools/llms-txt-generator', type: 'tool', relationship: 'demonstrates' },
    ],
    entities: ['AI SEO', 'ChatGPT', 'Perplexity', 'Google SGE', 'LLM Optimization', 'Semantic SEO'],
    keywords: ['AI SEO', 'ChatGPT optimization', 'LLM content', 'semantic SEO', 'AI search'],
  },
  {
    id: 'local-seo-cluster',
    pillarPage: {
      slug: 'local-seo',
      title: 'Local SEO & Google Business Optimization',
      url: '/services/local-seo',
      description: 'Local search optimization strategies',
    },
    supportingContent: [
      { slug: 'google-business-profile', title: 'Google Business Profile Optimization', url: '/blog/google-business-profile', type: 'blog', relationship: 'explains' },
      { slug: 'local-citations', title: 'Local Citation Building', url: '/blog/local-citations', type: 'blog', relationship: 'explains' },
      { slug: 'map-pack-ranking', title: 'Local Pack Ranking Strategies', url: '/blog/map-pack-ranking', type: 'blog', relationship: 'supports' },
      { slug: 'local-seo-guide-usa', title: 'Local SEO Guide for USA Small Businesses', url: '/blog/local-seo-guide-usa', type: 'blog', relationship: 'explains' },
    ],
    entities: ['Local SEO', 'Google Business Profile', 'Local Citations', 'Map Pack', 'Local Search'],
    keywords: ['local SEO', 'Google Business Profile', 'local citations', 'map pack', 'near me SEO'],
  },
  {
    id: 'off-page-seo-cluster',
    pillarPage: {
      slug: 'off-page-seo',
      title: 'Off-Page SEO & Link Building',
      url: '/services/off-page-seo',
      description: 'Ethical link building and off-page authority strategies',
    },
    supportingContent: [
      { slug: 'link-building-strategies', title: 'White-Hat Link Building Strategies for 2026', url: '/blog/link-building-strategies', type: 'blog', relationship: 'explains' },
      { slug: 'digital-pr-seo', title: 'Digital PR for SEO: Earning Authority Links', url: '/blog/digital-pr-seo', type: 'blog', relationship: 'explains' },
      { slug: 'brand-mentions-seo', title: 'How Brand Mentions Impact SEO Rankings', url: '/blog/brand-mentions-seo', type: 'blog', relationship: 'supports' },
      { slug: 'competitor-backlink-analysis', title: 'Competitor Backlink Analysis Guide', url: '/blog/competitor-backlink-analysis', type: 'blog', relationship: 'explains' },
    ],
    entities: ['Off-Page SEO', 'Link Building', 'Digital PR', 'Brand Mentions', 'Domain Authority', 'Backlink Analysis'],
    keywords: ['off-page SEO', 'link building', 'backlink strategy', 'digital PR', 'domain authority', 'white-hat link building'],
  },
  {
    id: 'ecommerce-seo-cluster',
    pillarPage: {
      slug: 'ecommerce-seo',
      title: 'E-commerce SEO & Product Optimization',
      url: '/services/ecommerce-seo',
      description: 'Search optimization strategies for online stores',
    },
    supportingContent: [
      { slug: 'product-page-seo', title: 'How to Optimize Product Pages for SEO', url: '/blog/product-page-seo', type: 'blog', relationship: 'explains' },
      { slug: 'category-page-optimization', title: 'E-commerce Category Page Optimization', url: '/blog/category-page-optimization', type: 'blog', relationship: 'explains' },
      { slug: 'shopify-seo', title: 'Shopify SEO Services', url: '/services/shopify-seo', type: 'service', relationship: 'supports' },
      { slug: 'e-commerce', title: 'SEO for E-commerce Businesses', url: '/industries/e-commerce', type: 'industry', relationship: 'demonstrates' },
      { slug: 'schema-for-products', title: 'Product Schema Markup Guide', url: '/blog/schema-for-products', type: 'blog', relationship: 'explains' },
    ],
    entities: ['E-commerce SEO', 'Product Optimization', 'Shopify', 'WooCommerce', 'Product Schema', 'Category Pages'],
    keywords: ['e-commerce SEO', 'product page SEO', 'Shopify SEO', 'online store optimization', 'product schema markup'],
  },
  {
    id: 'saas-b2b-seo-cluster',
    pillarPage: {
      slug: 'saas-seo',
      title: 'SaaS & B2B SEO Strategies',
      url: '/services/saas-seo',
      description: 'Search optimization for SaaS companies and B2B businesses',
    },
    supportingContent: [
      { slug: 'saas-content-strategy', title: 'Content Strategy for SaaS Companies', url: '/blog/saas-content-strategy', type: 'blog', relationship: 'explains' },
      { slug: 'b2b-lead-generation-seo', title: 'B2B Lead Generation Through SEO', url: '/blog/b2b-lead-generation-seo', type: 'blog', relationship: 'explains' },
      { slug: 'comparison-page-optimization', title: 'How to Optimize Comparison & Alternative Pages', url: '/blog/comparison-page-optimization', type: 'blog', relationship: 'supports' },
      { slug: 'enterprise-seo', title: 'Enterprise SEO Services', url: '/services/enterprise-seo', type: 'service', relationship: 'supports' },
    ],
    entities: ['SaaS SEO', 'B2B SEO', 'Lead Generation', 'Content Marketing', 'Product-Led Growth', 'Comparison Pages'],
    keywords: ['SaaS SEO', 'B2B SEO', 'SaaS content strategy', 'B2B lead generation', 'enterprise SEO'],
  },
  {
    id: 'cms-seo-cluster',
    pillarPage: {
      slug: 'wordpress-seo',
      title: 'WordPress SEO & CMS Optimization',
      url: '/services/wordpress-seo',
      description: 'SEO optimization for WordPress and other CMS platforms',
    },
    supportingContent: [
      { slug: 'wordpress-vs-shopify-seo', title: 'WordPress vs Shopify: SEO Comparison', url: '/blog/wordpress-vs-shopify-seo', type: 'blog', relationship: 'compares' },
      { slug: 'wordpress-speed-optimization', title: 'WordPress Site Speed Optimization', url: '/blog/wordpress-speed-optimization', type: 'blog', relationship: 'explains' },
      { slug: 'hubspot-seo-services', title: 'HubSpot SEO Services', url: '/services/hubspot-seo-services', type: 'service', relationship: 'supports' },
      { slug: 'shopify-seo', title: 'Shopify SEO Services', url: '/services/shopify-seo', type: 'service', relationship: 'supports' },
      { slug: 'cms-seo-best-practices', title: 'CMS SEO Best Practices for 2026', url: '/blog/cms-seo-best-practices', type: 'blog', relationship: 'explains' },
    ],
    entities: ['WordPress SEO', 'Shopify SEO', 'HubSpot SEO', 'CMS Optimization', 'Plugin Optimization'],
    keywords: ['WordPress SEO', 'Shopify SEO', 'HubSpot SEO', 'CMS optimization', 'WordPress speed'],
  },
];

/**
 * Get topic cluster for a page
 */
export function getTopicClusterForPage(slug: string, pageType: 'service' | 'blog' | 'industry'): TopicCluster | null {
  // Check if it's a pillar page
  const pillarCluster = topicClusters.find(cluster => cluster.pillarPage.slug === slug);
  if (pillarCluster) return pillarCluster;

  // Check if it's supporting content
  for (const cluster of topicClusters) {
    const supporting = cluster.supportingContent.find(content => content.slug === slug);
    if (supporting) return cluster;
  }

  return null;
}

/**
 * Get supporting content for a pillar page
 */
export function getSupportingContent(pillarSlug: string): TopicCluster['supportingContent'] {
  const cluster = topicClusters.find(c => c.pillarPage.slug === pillarSlug);
  return cluster?.supportingContent || [];
}

/**
 * Get related clusters
 */
export function getRelatedClusters(clusterId: string): TopicCluster[] {
  const currentCluster = topicClusters.find(c => c.id === clusterId);
  if (!currentCluster) return [];

  // Find clusters with shared entities or keywords
  return topicClusters
    .filter(c => c.id !== clusterId)
    .filter(c => {
      const sharedEntities = c.entities.filter(e => currentCluster.entities.includes(e));
      const sharedKeywords = c.keywords.filter(k => currentCluster.keywords.includes(k));
      return sharedEntities.length > 0 || sharedKeywords.length > 0;
    })
    .slice(0, 2);
}

export default topicClusters;
