// Case study interface
export interface CaseStudy {
    id: string;
    title: string;
    slug: string;
    client: string;
    industry: string;
   
    challenge: string;
    solution: string;
    results: {
      trafficIncrease: string;
      rankingImprovement: string;
      conversionIncrease: string;
      additionalMetrics?: { [key: string]: string };
    };
    testimonial?: {
      quote: string;
      author: string;
      position: string;
    };
    featuredImage: string;
    services: string[];
    duration: string;
    tags: string[];
    featured: boolean;
  }
  
  // Sample case studies data
  const caseStudiesData: CaseStudy[] = [
    {
      id: "omgs",
      title: "270% Organic Traffic Growth for OMGS.in Through AI-Enhanced SEO Strategy",
      slug: "omgs-in-organic-traffic-growth",
      client: "OMGS.in",
      industry: "Digital Marketing & Online Media",
      challenge: "OMGS.in was struggling to compete in a saturated digital marketing space, with stagnant organic traffic and limited visibility for key industry terms. Their content was high-quality but wasn't structured optimally for both traditional search engines and emerging AI platforms.",
      solution: "We implemented a comprehensive AI-enhanced SEO strategy including technical optimization, semantic structuring, entity-relationship mapping, and content restructuring for better LLM retrieval. We also developed specialized schemas to improve visibility across traditional and AI search platforms.",
      results: {
        trafficIncrease: "270%",
        rankingImprovement: "Top 3 positions for 65% of target keywords",
        conversionIncrease: "185%",
        additionalMetrics: {
          "AI Search Visibility": "350% increase in visibility on AI platforms",
          "Backlink Growth": "215% increase in quality backlinks",
          "Page Authority": "45% improvement across key pages"
        }
      },
      testimonial: {
        quote: "ImmortalSEO's dual-optimization approach transformed our online presence. Not only did our Google rankings improve dramatically, but we're now consistently featured in AI-powered search results which has opened up an entirely new traffic channel for our business.",
        author: "Rohit Sharma",
        position: "Marketing Director, OMGS.in"
      },
      featuredImage: "/images/case-studies/omgs-seo-case-study.webp",
      services: ["Technical SEO", "Semantic SEO", "AI-Enhanced Content Strategy", "Schema Implementation"],
      duration: "6 months",
      tags: ["Media", "Content", "Technical SEO", "AI Optimization"],
      featured: true
    },
    {
      id: "zencoder",
      title: "ZenCoder.ai Achieves 320% Growth in Organic Leads with AI-Ready Content Structure",
      slug: "zencoder-ai-lead-generation",
      client: "ZenCoder.ai",
      industry: "SaaS & AI Development",
      challenge: "As a relatively new AI development platform, ZenCoder.ai was struggling to build authority in a crowded niche dominated by established players. Their technical content wasn't optimized for discovery in either traditional or AI search environments.",
      solution: "We developed a comprehensive SEO strategy focused on establishing ZenCoder as an authority in the AI space. This included technical optimization, advanced entity structuring, LLM-optimized content development, and a targeted link building campaign to establish domain authority.",
      results: {
        trafficIncrease: "210%",
        rankingImprovement: "First page rankings for 80% of target keywords",
        conversionIncrease: "320%",
        additionalMetrics: {
          "Featured Snippets": "Captured 28 featured snippets for high-value queries",
          "Domain Authority": "Increased from 24 to 56 in 8 months",
          "Demo Requests": "485% increase in qualified leads"
        }
      },
      testimonial: {
        quote: "The ImmortalSEO team fundamentally changed how we approach our content strategy. Their understanding of how AI systems retrieve and present content gave us a massive advantage. We're now seeing consistent lead generation from both traditional search and AI platforms.",
        author: "Archie Sharma",
        position: "COO, ZenCoder.ai"
      },
      featuredImage: "/images/case-studies/zencoder-seo-boost-min.webp",
      services: ["Technical SEO", "AI-Ready Content Structure", "Authority Building", "Conversion Rate Optimization"],
      duration: "8 months",
      tags: ["SaaS", "AI", "Technology", "Lead Generation"],
      featured: true
    },
    {
      id: "millioncases",
      title: "MillionCases.com Expands Global Reach with Multi-Platform SEO Strategy",
      slug: "millioncases-global-expansion",

      client: "MillionCases.com",
      industry: "E-commerce & Retail",
      challenge: "MillionCases.com, a premium phone case retailer, was facing intense competition and struggled to differentiate themselves in search results. Their international expansion efforts were hampered by poor visibility in global markets and minimal presence in AI-driven product recommendations.",
      solution: "We implemented a comprehensive international SEO strategy with hreflang implementation, market-specific keyword targeting, and multilingual schema markup. Additionally, we restructured their product content to enhance visibility in AI search platforms and voice search results.",
      results: {
        trafficIncrease: "340%",
        rankingImprovement: "Top 5 positions for 72% of target keywords across 8 markets",
        conversionIncrease: "225%",
        additionalMetrics: {
          "International Sales": "275% increase in cross-border transactions",
          "Voice Search Discovery": "180% increase in voice search visibility",
          "Shopping Cart Value": "32% increase in average order value"
        }
      },
      testimonial: {
        quote: "ImmortalSEO's approach to international SEO completely transformed our business. Their strategy for optimizing our product content for both traditional and AI search platforms gave us a competitive edge that directly translated to increased sales across all our target markets.",
        author: "Krishan Kumar",
        position: "CEO, MillionCases.com"
      },
      featuredImage: "/images/case-studies/zencoder-seo-boost-min.webp",
      services: ["International SEO", "E-commerce Optimization", "Voice Search Optimization", "AI-Enhanced Content Strategy"],
      duration: "9 months",
      tags: ["E-commerce", "International", "Product SEO", "Voice Search"],
      featured: true
    },
    {
      id: "cbd-niche",
      title: "CBD Brand Overcomes Industry Challenges with Strategic SEO Approach",
      slug: "cbd-canada-seo-case-study",

      client: "Confidential CBD Brand",
      industry: "Health & Wellness, CBD Products",
      challenge: "Our client in the CBD industry faced significant challenges with visibility due to strict advertising limitations, competitive keywords, and complex compliance requirements that restricted their marketing options.",
      solution: "We developed a specialized SEO strategy that focused on educational content, semantic entity optimization, and medical-grade E-E-A-T enhancement. Our approach balanced compliance requirements with effective organic visibility tactics for this restricted industry.",
      results: {
        trafficIncrease: "195%",
        rankingImprovement: "First page rankings for 60+ high-value informational terms",
        conversionIncrease: "145%",
        additionalMetrics: {
          "Organic Revenue": "230% increase in revenue from organic channels",
          "Content Authority": "Published in 12 industry publications",
          "User Engagement": "48% increase in time on site"
        }
      },
      testimonial: {
        quote: "The ImmortalSEO team understood the unique challenges of our industry and developed strategies that worked within our constraints. Their focus on educational content and semantic optimization helped us build authority in our niche while staying compliant with all regulations.",
        author: "Anonymous",
        position: "Marketing Director, CBD Brand"
      },
      featuredImage: "/images/case-studies/cbd-case-study.jpg",
      services: ["Technical SEO", "Content Strategy", "Authority Building", "Compliance-Focused Optimization"],
      duration: "12 months",
      tags: ["Health & Wellness", "Restricted Industry", "Educational Content", "Compliance"],
      featured: false
    },
    {
      id: "chittorpolyfab",
      title: "ChittorPolyFab.com Achieves 235% B2B Lead Growth Through Industry-Specific SEO",
      slug: "chittorpolyfab-b2b-lead-generation",

      client: "ChittorPolyFab.com",
      industry: "Manufacturing & Industrial",
      challenge: "ChittorPolyFab, a leading manufacturer of polymer products, had minimal digital presence despite their strong market position. Their website wasn't optimized for B2B search patterns, and they struggled to generate qualified leads through digital channels.",
      solution: "We implemented a B2B-focused SEO strategy centered on industry-specific technical terms, developed comprehensive product schema markup, and created authoritative content targeting key decision-makers in their industry. We also optimized for industry-specific search platforms beyond Google.",
      results: {
        trafficIncrease: "180%",
        rankingImprovement: "Top positions for 45+ industrial product terms",
        conversionIncrease: "235%",
        additionalMetrics: {
          "RFQ Submissions": "320% increase in qualified inquiries",
          "International Visibility": "Expanded to 8 new export markets",
          "Industry Directory Rankings": "Top listings in 12 industrial directories"
        }
      },
      testimonial: {
        quote: "ImmortalSEO took the time to understand our complex B2B sales process and industrial market. Their technical approach to SEO transformed our digital presence, making our website a powerful lead generation tool that has directly contributed to our business growth.",
        author: "Samdhani",
        position: "Director of Business Development, ChittorPolyFab"
      },
      featuredImage: "/images/case-studies/chittorpolyfab-case-study.jpg",
      services: ["B2B SEO", "Technical Content Optimization", "Industry-Specific Strategy", "Lead Generation"],
      duration: "7 months",
      tags: ["Manufacturing", "B2B", "Industrial", "Technical SEO"],
      featured: false
    },
    {
      id: "bherunath-pest-control",
      title: "Bherunath Pest Control Dominates Local Search in Chittorgarh with Comprehensive Local SEO Strategy",
      slug: "bherunath-pest-control-local-seo-success",
      client: "Bherunath Pest Control",
      industry: "Pest Control Services",
      challenge: "Bherunath Pest Control, a local pest control service in Chittorgarh, was struggling to compete with larger regional competitors despite offering superior service quality. Their website had poor technical foundation, limited local search visibility, and minimal presence in AI-powered search results, making it difficult to attract quality organic leads in their service area.",
      solution: "We implemented a comprehensive local SEO strategy that included technical optimization, semantic structuring, and AI-enhanced content development. Our approach focused on improving crawl budget efficiency, implementing local schema markup, and creating educational content that established the business as a local authority while optimizing for both traditional search engines and AI platforms like ChatGPT and Perplexity.",
      results: {
        trafficIncrease: "185%",
        rankingImprovement: "Top 3 positions for all major local pest control keywords",
        conversionIncrease: "220%",
        additionalMetrics: {
          "Local Search Visibility": "Ranked #1 for 'pest control Chittorgarh' and related terms",
          "AI Search Mentions": "Featured in ChatGPT and Perplexity responses for local pest control queries",
          "Lead Quality": "95% increase in qualified service inquiries",
          "Google My Business": "Enhanced profile optimization with 40% increase in profile views"
        }
      },
      testimonial: {
        quote: "ImmortalSEO transformed our local presence in Chittorgarh. Even though the search volume is lower in our area, we're now getting high-quality organic leads consistently. The fact that we're being mentioned in AI search engines like ChatGPT has been incredible for our business credibility.",
        author: "Bherunath Pest Control Team",
        position: "Management Team"
      },
      featuredImage: "/images/case-studies/bherunath-pest-control-case-study.jpg",
      services: ["Local SEO", "Technical SEO", "Semantic SEO", "AI-Enhanced Content Strategy", "Google My Business Optimization"],
      duration: "3 months",
      tags: ["Local SEO", "Pest Control", "Chittorgarh", "AI Optimization", "Technical SEO"],
      featured: true
    },
    {
      id: "nikhar-jewellers",
      title: "Nikhar Jewellers Achieves Complete Local Market Dominance with Multi-Platform SEO Strategy",
      slug: "nikhar-jewellers-local-seo-dominance",
      client: "Nikhar Jewellers",
      industry: "Jewelry & Retail",
      challenge: "Nikhar Jewellers, a family-owned jewelry store in Chittorgarh, needed to establish strong online presence to compete with both local competitors and online jewelry retailers. Their website lacked proper optimization, Google My Business profile was incomplete, and they had no presence on video platforms, limiting their ability to showcase their craftsmanship and attract local customers.",
      solution: "We developed a comprehensive multi-platform SEO strategy that included website optimization, Google My Business enhancement, YouTube channel optimization, and targeted long-tail keyword strategies. Our approach combined semantic SEO techniques with technical optimization to ensure visibility across all platforms where potential customers might discover their jewelry services.",
      results: {
        trafficIncrease: "250%",
        rankingImprovement: "Top positions for all jewelry-related keywords in Chittorgarh",
        conversionIncrease: "180%",
        additionalMetrics: {
          "Google My Business": "Complete profile optimization with 60% increase in profile interactions",
          "YouTube Visibility": "Optimized video content ranking for jewelry-related searches",
          "Long-tail Keywords": "Ranked for 50+ specific jewelry and wedding-related terms",
          "Local Authority": "Established as top jewelry destination in Chittorgarh"
        }
      },
      testimonial: {
        quote: "ImmortalSEO's comprehensive approach exceeded our expectations. They didn't just optimize our website - they transformed our entire digital presence. We're now ranking for all jewelry-related keywords in Chittorgarh, and our Google My Business profile and YouTube videos are bringing in customers we never reached before. Sandeep Mehta is extremely happy with the results.",
        author: "Sandeep Mehta",
        position: "Owner, Nikhar Jewellers"
      },
      featuredImage: "/images/case-studies/nikhar-jewellers-case-study.jpg",
      services: ["Local SEO", "Google My Business Optimization", "YouTube SEO", "Semantic SEO", "Technical SEO", "Long-tail Keyword Strategy"],
      duration: "2 months",
      tags: ["Jewelry", "Local SEO", "Chittorgarh", "Multi-platform", "Retail"],
      featured: true
    }
  ];
  
  export default caseStudiesData;