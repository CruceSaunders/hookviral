import { NextRequest, NextResponse } from "next/server";

// Types
interface ResearchRequest {
  niche: string;
  keyword?: string;
  minViews: number;
  maxViews?: number;
  dateRange: "7days" | "30days" | "90days" | "all";
}

interface TikTokVideo {
  id: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  creator: string;
  creatorHandle: string;
  hookText: string;
  hookType: string;
  aiSummary: string;
  transcript?: string;
  videoUrl: string;
  duration: number;
  niche: string;
  postedAt: string;
}

// Hook type classifier
function classifyHookType(hookText: string): string {
  const lowerHook = hookText.toLowerCase();
  
  if (lowerHook.includes("?") || lowerHook.includes("what if")) {
    return "question";
  }
  if (lowerHook.includes("nobody") || lowerHook.includes("secret") || lowerHook.includes("never tell")) {
    return "exclusivity";
  }
  if (lowerHook.includes("mistake") || lowerHook.includes("wrong") || lowerHook.includes("stop")) {
    return "controversy";
  }
  if (lowerHook.includes("tried") || lowerHook.includes("i was") || lowerHook.includes("my")) {
    return "story";
  }
  if (lowerHook.includes("pov") || lowerHook.includes("when you")) {
    return "relatable";
  }
  if (lowerHook.includes("banned") || lowerHook.includes("shocking") || lowerHook.includes("can't believe")) {
    return "shock";
  }
  
  return "curiosity";
}

// Generate mock data for now - will be replaced with Apify integration
function generateMockResults(params: ResearchRequest): TikTokVideo[] {
  const { niche, minViews } = params;
  
  const hookTemplates = [
    { hook: `The ${niche} mistake that's costing you everything`, type: "curiosity" },
    { hook: `I tried this ${niche} hack for 30 days and can't stop`, type: "story" },
    { hook: `Nobody talks about this ${niche} secret`, type: "exclusivity" },
    { hook: `Stop doing this if you want ${niche} results`, type: "controversy" },
    { hook: `The one ${niche} thing successful people never tell you`, type: "exclusivity" },
    { hook: `POV: You finally figured out ${niche}`, type: "relatable" },
    { hook: `This ${niche} hack got me banned from TikTok`, type: "shock" },
    { hook: `What if everything you know about ${niche} is wrong?`, type: "question" },
    { hook: `The ${niche} secret that changed my life`, type: "curiosity" },
    { hook: `I was doing ${niche} wrong for 10 years`, type: "story" },
  ];

  const creators = [
    { name: "Fitness Expert", handle: "@fitnessguru" },
    { name: "Money Mentor", handle: "@moneymaestro" },
    { name: "Tech Wizard", handle: "@techwhiz" },
    { name: "Lifestyle Boss", handle: "@lifestyleboss" },
    { name: "Comedy King", handle: "@comedyking" },
    { name: "Beauty Queen", handle: "@beautyqueen" },
    { name: "Food Master", handle: "@foodmaster" },
    { name: "Finance Bro", handle: "@financebro" },
  ];

  return hookTemplates.map((template, i) => {
    const creator = creators[i % creators.length];
    const views = minViews + Math.floor(Math.random() * 5000000);
    
    return {
      id: `vid-${niche}-${i}-${Date.now()}`,
      thumbnail: `https://picsum.photos/seed/${niche}${i}/400/600`,
      views,
      likes: Math.floor(views * (0.05 + Math.random() * 0.15)),
      comments: Math.floor(views * (0.005 + Math.random() * 0.02)),
      shares: Math.floor(views * (0.01 + Math.random() * 0.05)),
      creator: creator.name,
      creatorHandle: creator.handle,
      hookText: template.hook,
      hookType: template.type,
      aiSummary: `This viral ${niche} video uses the ${template.type} hook technique to capture attention in the first 3 seconds. The creator leverages emotional triggers to maximize watch time.`,
      videoUrl: `https://tiktok.com/@example/video/${Date.now() + i}`,
      duration: 15 + Math.floor(Math.random() * 45),
      niche,
      postedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: ResearchRequest = await request.json();
    
    const { niche, keyword, minViews = 500000, dateRange = "30days" } = body;
    
    if (!niche) {
      return NextResponse.json(
        { error: "Niche is required" },
        { status: 400 }
      );
    }

    // Check for Apify API key
    const apifyKey = process.env.APIFY_API_KEY;
    
    if (apifyKey) {
      // TODO: Implement real Apify integration
      // For now, fall through to mock data
      console.log("Apify key found, but using mock data for now");
    }

    // Generate mock results
    const results = generateMockResults(body);
    
    // Sort by views descending
    results.sort((a, b) => b.views - a.views);

    return NextResponse.json({
      success: true,
      count: results.length,
      niche,
      minViews,
      results,
    });
    
  } catch (error) {
    console.error("Research API error:", error);
    return NextResponse.json(
      { error: "Failed to research TikToks" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "TikTok Research API",
    usage: "POST with { niche, keyword?, minViews, dateRange }",
    endpoints: {
      research: "POST /api/research/tiktok",
    },
  });
}
