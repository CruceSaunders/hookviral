import { NextResponse } from "next/server";
import OpenAI from "openai";

function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) return null;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

interface GenerateRequest {
  topic: string;
  niche: string;
  style?: string;
  tone?: string;
}

interface GeneratedHook {
  text: string;
  style: string;
  explanation: string;
  rating: number;
}

export async function POST(request: Request) {
  try {
    const body: GenerateRequest = await request.json();
    const { topic, niche, style = "mixed", tone = "energetic" } = body;

    if (!topic || !niche) {
      return NextResponse.json(
        { error: "Topic and niche are required" },
        { status: 400 }
      );
    }

    const prompt = `You are a viral TikTok hook expert. Your hooks have generated millions of views. Generate 10 scroll-stopping hooks for a video about: "${topic}"

CONTEXT:
- Niche: ${niche}
- Preferred style: ${style}
- Tone: ${tone}

REQUIREMENTS:
- Each hook must be 5-20 words MAX (first 3 seconds of speech)
- Create IMMEDIATE curiosity or emotional reaction
- NO generic openings like "Hey guys" or "In this video"
- Make viewers NEED to keep watching
- Mix different psychological triggers

STYLES TO USE:
- Curiosity Gap: Create an information gap they need to fill
- Controversy: Challenge common beliefs or practices
- Story: Start an intriguing personal narrative
- Shock: Unexpected statement that stops scrolling
- Question: Ask something they can't ignore

For each hook, provide:
1. The hook text (5-20 words)
2. The psychological style it uses
3. WHY this hook works (1 sentence)
4. Effectiveness rating 1-10

Return as JSON array with this exact structure:
[
  {
    "text": "The hook text here",
    "style": "curiosity",
    "explanation": "Why this works",
    "rating": 9
  }
]

Generate exactly 10 hooks. Be creative, specific, and viral.`;

    const openai = getOpenAI();
    if (!openai) {
      return NextResponse.json({
        hooks: getMockHooks(request),
        note: "Using mock data - set OPENAI_API_KEY for real generation",
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a viral content expert who specializes in TikTok hooks. You respond only in valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.9,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    const parsed = JSON.parse(content);
    const hooks: GeneratedHook[] = parsed.hooks || parsed;

    // Validate and sanitize hooks
    const validHooks = hooks
      .filter((h: any) => h.text && h.style && h.explanation && h.rating)
      .map((h: any) => ({
        text: h.text.trim(),
        style: h.style.toLowerCase(),
        explanation: h.explanation.trim(),
        rating: Math.min(10, Math.max(1, parseInt(h.rating))),
      }));

    return NextResponse.json({
      hooks: validHooks,
      count: validHooks.length,
      topic,
      niche,
    });

  } catch (error: any) {
    console.error("Hook generation error:", error);
    
    // Return mock data if API fails (for development/demo)
    if (process.env.NODE_ENV === "development" || !process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        hooks: getMockHooks(request),
        count: 10,
        note: "Using mock data - set OPENAI_API_KEY for real generation",
      });
    }

    return NextResponse.json(
      { error: "Failed to generate hooks" },
      { status: 500 }
    );
  }
}

function getMockHooks(request: Request): GeneratedHook[] {
  return [
    {
      text: "The mistake that's costing you everything",
      style: "curiosity",
      explanation: "Creates urgency by implying they're making a costly error",
      rating: 9
    },
    {
      text: "I tried this for 30 days and now I can't stop",
      style: "story",
      explanation: "Personal transformation story hooks viewers emotionally",
      rating: 8
    },
    {
      text: "Nobody talks about this but it changed everything",
      style: "controversy",
      explanation: "Implies secret knowledge that mainstream ignores",
      rating: 9
    },
    {
      text: "What if I told you everything you know is wrong?",
      style: "shock",
      explanation: "Challenges existing beliefs, creates cognitive dissonance",
      rating: 8
    },
    {
      text: "The one thing successful people never tell you",
      style: "curiosity",
      explanation: "Implies insider knowledge and exclusivity",
      rating: 9
    },
    {
      text: "Stop doing this immediately if you want results",
      style: "controversy",
      explanation: "Direct command with implied negative consequences",
      rating: 7
    },
    {
      text: "I was doing this completely wrong until I learned this",
      style: "story",
      explanation: "Relatable mistake + promise of solution",
      rating: 8
    },
    {
      text: "The hack that got me banned from TikTok",
      style: "shock",
      explanation: "Implies something so powerful it's almost forbidden",
      rating: 9
    },
    {
      text: "Why this is easier than you think (controversial take)",
      style: "controversy",
      explanation: "Challenges difficulty perception, invites debate",
      rating: 7
    },
    {
      text: "Here's what actually works (not what influencers say)",
      style: "curiosity",
      explanation: "Positions as authentic truth vs fake advice",
      rating: 8
    },
  ];
}
