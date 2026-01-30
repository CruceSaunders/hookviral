import { NextResponse } from "next/server";
import OpenAI from "openai";

// Lazy initialization - only create client when needed
function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

interface ExpandRequest {
  hook: string;
  niche: string;
  topic?: string;
  duration?: "short" | "medium" | "long"; // 15s, 30s, 60s
  contentType?: "storytime" | "tutorial" | "hot-take" | "listicle" | "reaction";
}

interface ExpandedScript {
  hook: string;
  context: string;
  body: string;
  twist: string;
  cta: string;
  fullScript: string;
  estimatedDuration: string;
  speakingTips: string[];
  visualSuggestions: string[];
}

export async function POST(request: Request) {
  try {
    const body: ExpandRequest = await request.json();
    const { 
      hook, 
      niche, 
      topic = "", 
      duration = "medium",
      contentType = "hot-take" 
    } = body;

    if (!hook) {
      return NextResponse.json(
        { error: "Hook text is required" },
        { status: 400 }
      );
    }

    const durationMap = {
      short: "15-20 seconds (about 50 words)",
      medium: "30-45 seconds (about 100 words)", 
      long: "60 seconds (about 150 words)"
    };

    const prompt = `You are a viral TikTok script writer with 100M+ views under your belt. Your scripts convert views into followers.

Take this hook and expand it into a complete TikTok script:

HOOK: "${hook}"

CONTEXT:
- Niche: ${niche}
- Topic context: ${topic || "Use the hook's implied topic"}
- Target duration: ${durationMap[duration]}
- Content type: ${contentType}

SCRIPT STRUCTURE (fill each section):

1. HOOK (0-3 seconds)
   - Use the provided hook exactly or slightly refined
   - Must stop the scroll

2. CONTEXT (3-8 seconds)
   - Quick setup: who you are / why this matters
   - Build credibility or relatability fast
   - 1-2 sentences max

3. BODY (main content)
   - Deliver the value/story/argument
   - Keep it punchy - short sentences
   - Include at least one "wait for it" moment
   - Use pattern interrupts to maintain attention

4. TWIST/PAYOFF (climax)
   - The satisfying revelation, punchline, or insight
   - This is what makes people share

5. CTA (last 3-5 seconds)
   - Natural call to action
   - NOT "like and subscribe" - be creative
   - Example: "Save this for later" / "Comment your take"

ALSO PROVIDE:
- 3 speaking tips (pacing, emphasis, emotion)
- 3 visual suggestions (what to show on screen)

Return as JSON with this exact structure:
{
  "hook": "The refined hook text",
  "context": "The context section",
  "body": "The main body content",
  "twist": "The twist/payoff moment",
  "cta": "The call to action",
  "fullScript": "The complete script as one flowing text (with section markers like [HOOK], [CONTEXT], etc.)",
  "estimatedDuration": "30 seconds",
  "speakingTips": ["tip1", "tip2", "tip3"],
  "visualSuggestions": ["visual1", "visual2", "visual3"]
}

Make it VIRAL. Make it feel natural when spoken aloud. No corporate speak.`;

    const openai = getOpenAI();
    if (!openai) {
      return NextResponse.json({
        script: getMockScript(),
        note: "Using mock data - set OPENAI_API_KEY for real generation",
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert TikTok script writer. You create scripts that feel authentic, engaging, and shareable. You respond only in valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    const script: ExpandedScript = JSON.parse(content);

    return NextResponse.json({
      script,
      originalHook: hook,
      niche,
      duration,
      contentType,
    });

  } catch (error: any) {
    console.error("Script expansion error:", error);
    
    // Return mock data if API fails (for development/demo)
    if (process.env.NODE_ENV === "development" || !process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        script: getMockScript(),
        note: "Using mock data - set OPENAI_API_KEY for real generation",
      });
    }

    return NextResponse.json(
      { error: "Failed to expand hook" },
      { status: 500 }
    );
  }
}

function getMockScript(): ExpandedScript {
  return {
    hook: "Nobody talks about this but it changed everything",
    context: "I've been in this space for 3 years, tried everything the gurus tell you, and none of it worked until I discovered this one thing.",
    body: "See, everyone focuses on the flashy tactics - the hacks, the shortcuts. But the real game-changer? Consistency over intensity. I stopped trying to go viral with one post. Instead, I showed up every single day for 90 days straight. Day 30, nothing. Day 60, still nothing. But day 78? Everything exploded.",
    twist: "The algorithm doesn't reward your best content. It rewards your most consistent presence. Your 'worst' video posted consistently beats your 'best' video posted randomly.",
    cta: "Save this and come back in 90 days to tell me I was right. Or prove me wrong in the comments.",
    fullScript: `[HOOK] Nobody talks about this but it changed everything.

[CONTEXT] I've been in this space for 3 years, tried everything the gurus tell you, and none of it worked until I discovered this one thing.

[BODY] See, everyone focuses on the flashy tactics - the hacks, the shortcuts. But the real game-changer? Consistency over intensity. I stopped trying to go viral with one post. Instead, I showed up every single day for 90 days straight. Day 30, nothing. Day 60, still nothing. But day 78? Everything exploded.

[TWIST] The algorithm doesn't reward your best content. It rewards your most consistent presence. Your 'worst' video posted consistently beats your 'best' video posted randomly.

[CTA] Save this and come back in 90 days to tell me I was right. Or prove me wrong in the comments.`,
    estimatedDuration: "35 seconds",
    speakingTips: [
      "Start slow and mysterious on the hook, then speed up",
      "Emphasize 'Day 78' with a pause before it",
      "End the CTA with a slight smirk/challenge in your voice"
    ],
    visualSuggestions: [
      "Text overlay showing '90 Day Challenge' appearing",
      "Split screen: 'Day 30' sad face vs 'Day 78' celebration",
      "Point at camera during the twist for emphasis"
    ]
  };
}
