// app/api/ai-seo-audit/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import OpenAI from 'openai';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    console.log("API Key available:", !!process.env.OPENAI_API_KEY);
    
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ message: 'URL is required' }, { status: 400 });
    }

    // Step 1: Fetch the website content
    try {
      const response = await axios.get(url, { 
        timeout: 30000,  // 30 second timeout
        maxContentLength: 10 * 1024 * 1024  // 10MB max
      });
      const html = response.data;
      const $ = cheerio.load(html);
      
      // Step 2: Extract key SEO elements
      const seoData = {
        url,
        title: $('title').text().trim(),
        metaDescription: $('meta[name="description"]').attr('content') || '',
        h1: $('h1').first().text().trim(),
        h1Count: $('h1').length,
        h2Count: $('h2').length,
        h3Count: $('h3').length,
        wordCount: $('body').text().trim().split(/\s+/).length,
        linkCount: $('a').length,
        imageCount: $('img').length,
        imagesWithoutAlt: $('img:not([alt])').length,
        hasViewport: $('meta[name="viewport"]').length > 0,
        hasCanonical: $('link[rel="canonical"]').length > 0,
        hasRobots: $('meta[name="robots"]').length > 0,
        hasSchema: $('script[type="application/ld+json"]').length > 0,
        hasSitemap: html.includes('sitemap.xml'),
        contentSample: $('body p').slice(0, 3).text().trim().substring(0, 500),
        hasMobileResponsiveness: $('meta[name="viewport"][content*="width=device-width"]').length > 0,
        hasHttps: url.startsWith('https://'),
      };

      // Step 3: Use OpenAI to analyze the SEO data
      const prompt = createAnalysisPrompt(seoData);
      
      // FIXED: Removed the response_format parameter that was causing the error
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert SEO analyst that provides detailed technical feedback. Analyze the website data and respond ONLY with a valid JSON object according to the format specified in the user's message. Do not include any text outside the JSON object."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        // The response_format parameter was removed as it's not supported
      });
      
      const analysisText = completion.choices[0].message.content || '{}';
      
      // Parse the JSON response
      let analysis;
      try {
        analysis = JSON.parse(analysisText);
      } catch (error) {
        console.error("Failed to parse OpenAI response:", error);
        console.error("Raw response:", analysisText);
        // Fallback if JSON parsing fails
        analysis = createFallbackAnalysis(seoData);
      }
      
      // Add timestamp
      analysis.timestamp = new Date().toISOString();
      
      return NextResponse.json(analysis);
    } catch (axiosError: any) {
      console.error("Error fetching URL:", axiosError.message);
      return NextResponse.json({ 
        message: 'Failed to fetch the website',
        error: axiosError.message 
      }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error analyzing website:', error);
    console.error('Error details:', error.response?.data || error.message);
    return NextResponse.json({ 
      message: 'Failed to analyze website',
      error: error.message,
      details: error.response?.data || 'No additional details'
    }, { status: 500 });
  }
}

// Helper function to create a detailed prompt
function createAnalysisPrompt(seoData: any) {
  return `
Analyze the following website SEO data and provide a comprehensive SEO audit report.

Website Data:
${JSON.stringify(seoData, null, 2)}

You must respond ONLY with a JSON object that uses exactly this structure:
{
  "url": "${seoData.url}",
  "overallScore": number (0-100 representing overall SEO health),
  "scoreDescription": string (brief qualitative assessment of the score),
  "categories": [
    {
      "name": "Technical SEO",
      "score": number (0-100),
      "description": string (brief assessment),
      "issues": [
        {
          "title": string (concise issue title),
          "description": string (detailed explanation),
          "priority": "critical" | "high" | "medium" | "low",
          "aiImpact": "high" | "medium" | "low" (relevance for AI search engines),
          "recommendation": string (actionable fix)
        }
      ]
    },
    {
      "name": "Content Quality",
      "score": number (0-100),
      "description": string (brief assessment),
      "issues": [...]
    },
    {
      "name": "On-Page SEO",
      "score": number (0-100),
      "description": string (brief assessment),
      "issues": [...]
    },
    {
      "name": "User Experience",
      "score": number (0-100),
      "description": string (brief assessment),
      "issues": [...]
    },
    {
      "name": "Semantic SEO & AI Optimization",
      "score": number (0-100),
      "description": string (brief assessment),
      "issues": [...]
    }
  ]
}

Carefully analyze all aspects of the website data and provide specific, actionable recommendations for each issue identified. Focus on modern SEO best practices, including optimization for AI search engines and semantic SEO.

For Technical SEO, evaluate aspects like HTTPS, mobile-friendliness, robots.txt, sitemap, and canonical tags.
For Content Quality, evaluate length, readability, structure, and relevance.
For On-Page SEO, evaluate title, meta description, headings, and internal linking.
For User Experience, evaluate mobile optimization, page elements, and navigation structure.
For Semantic SEO & AI Optimization, evaluate entity relationships, structured data, and content comprehensiveness.

Do not include issues where there is insufficient data to make a determination. Only include genuine issues with actionable recommendations.

IMPORTANT: Your entire response must be valid JSON only. Do not include any additional text, explanations, or markdown outside the JSON object.
`;
}

// Fallback analysis in case of parsing issues
function createFallbackAnalysis(seoData: any) {
  // Calculate basic technical score
  let technicalScore = 50;
  if (seoData.hasHttps) technicalScore += 10;
  if (seoData.hasViewport) technicalScore += 10;
  if (seoData.hasCanonical) technicalScore += 10;
  if (seoData.hasRobots) technicalScore += 10;
  if (seoData.hasSitemap) technicalScore += 10;
  technicalScore = Math.min(technicalScore, 100);
  
  // Calculate basic content score
  const minWordCount = 300;
  let contentScore = 50;
  if (seoData.wordCount > minWordCount) contentScore += 15;
  if (seoData.title && seoData.title.length > 10 && seoData.title.length < 70) contentScore += 15;
  if (seoData.metaDescription && seoData.metaDescription.length > 50 && seoData.metaDescription.length < 160) contentScore += 10;
  if (seoData.h1Count === 1) contentScore += 10;
  contentScore = Math.min(contentScore, 100);
  
  // Overall score is average of technical and content
  const overallScore = Math.round((technicalScore + contentScore) / 2);
  
  return {
    url: seoData.url,
    overallScore,
    scoreDescription: overallScore >= 80 ? "Good" : overallScore >= 60 ? "Fair" : "Needs Improvement",
    categories: [
      {
        name: "Technical SEO",
        score: technicalScore,
        description: "Basic technical SEO evaluation",
        issues: [
          {
            title: "Automated Analysis Fallback",
            description: "Our detailed AI analysis encountered an issue. This is a simplified analysis.",
            priority: "medium",
            aiImpact: "medium",
            recommendation: "Contact our team for a manual in-depth audit."
          }
        ]
      },
      {
        name: "Content Quality",
        score: contentScore,
        description: "Basic content quality evaluation",
        issues: [
          {
            title: "Content Length Check",
            description: `Your page has approximately ${seoData.wordCount} words. Comprehensive content typically has 1000+ words.`,
            priority: "medium",
            aiImpact: "high",
            recommendation: "Expand your content to provide more comprehensive information on your topic."
          }
        ]
      }
    ]
  };
}