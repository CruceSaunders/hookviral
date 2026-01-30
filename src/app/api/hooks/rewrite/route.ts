import { NextResponse } from "next/server";
import OpenAI from "openai";

function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) return null;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

interface RewriteRequest {
  originalHook: string;
  improvements?: string[];
}

interface RewrittenHook {
  text: string;
  improvement: string;
}

export async function POST(request: Request) {
  try {
    const body: RewriteRequest = await request.json();
    const { originalHook, improvements = [] } = body;

    if (!originalHook) {
      return NextResponse.json(
        { error: "Original hook is required" },
        { status: 400 }
      );
    }

    const improvementInstructions = improvements.length > 0
      ? `Focus on these improvements: ${improvements.join(", ")}`
      : "Apply a variety of improvement techniques";

    const prompt = `You are a viral TikTok hook expert. Rewrite this hook to be more scroll-stopping:

ORIGINAL HOOK: "${originalHook}"

INSTRUCTIONS: ${improvementInstructions}

IMPROVEMENT TECHNIQUES:
- Add specificity (concrete numbers, details)
- Create urgency (FOMO, time pressure)
- Add controversy (challenge beliefs)
- Increase curiosity (information gaps)
- Shorten (cut to essentials)
- Story format (personal narrative)

Provide 5 improved versions. Each must be:
- 5-20 words maximum
- More attention-grabbing than the original
- Different from each other

For each rewrite, explain what you improved.

Return as JSON:
{
  "rewrites": [
    {
      "text": "The improved hook",
      "improvement": "What was changed and why (1 sentence)"
    }
  ]
}`;

    const openai = getOpenAI();
    if (!openai) {
      return NextResponse.json({
        variations: getMockRewrites(originalHook),
        note: "Using mock data - set OPENAI_API_KEY for real generation",
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a viral content expert. Respond only in valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.9,
      max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    const parsed = JSON.parse(content);
    const rewrites: RewrittenHook[] = (parsed.rewrites || [])
      .filter((r: any) => r.text && r.improvement)
      .map((r: any) => ({
        text: r.text.trim(),
        improvement: r.improvement.trim(),
      }));

    return NextResponse.json({
      rewrites,
      count: rewrites.length,
      originalHook,
    });

  } catch (error: any) {
    console.error("Hook rewrite error:", error);
    
    // Return mock data if API fails
    if (process.env.NODE_ENV === "development" || !process.env.OPENAI_API_KEY) {
      const { originalHook } = await request.json().catch(() => ({ originalHook: "your hook" }));
      return NextResponse.json({
        rewrites: getMockRewrites(originalHook),
        count: 5,
        note: "Using mock data - set OPENAI_API_KEY for real generation",
      });
    }

    return NextResponse.json(
      { error: "Failed to rewrite hook" },
      { status: 500 }
    );
  }
}

function getMockRewrites(originalHook: string): RewrittenHook[] {
  const words = originalHook.split(' ');
  return [
    {
      text: `The ${words.slice(0, 2).join(' ')} secret that changed everything`,
      improvement: "Added mystery and transformation angle",
    },
    {
      text: `Nobody's talking about this ${words.slice(-2).join(' ')} hack`,
      improvement: "Added exclusivity and insider knowledge feel",
    },
    {
      text: `I tried ${originalHook.toLowerCase().replace(/[?.!]/g, '')} for 30 days...`,
      improvement: "Converted to personal story format with curiosity",
    },
    {
      text: `Stop! Here's what you're doing wrong with ${words[0].toLowerCase()}`,
      improvement: "Added urgency and implied mistake",
    },
    {
      text: `The truth about ${words.slice(0, 3).join(' ').toLowerCase()} no one wants to admit`,
      improvement: "Added controversy and forbidden knowledge angle",
    },
  ];
}
