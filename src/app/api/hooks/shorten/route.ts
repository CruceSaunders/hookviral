import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ShortenRequest {
  hook: string;
  maxWords?: number;
}

export async function POST(request: Request) {
  try {
    const body: ShortenRequest = await request.json();
    const { hook, maxWords = 10 } = body;

    if (!hook) {
      return NextResponse.json(
        { error: "Hook text is required" },
        { status: 400 }
      );
    }

    const prompt = `You are a hook compression expert. Take this TikTok hook and compress it to ${maxWords} words or less while keeping the same emotional impact.

ORIGINAL HOOK: "${hook}"

RULES:
- Maximum ${maxWords} words
- Keep the core emotional trigger
- Remove filler words
- Make every word count
- Maintain the hook's scroll-stopping power
- Keep it speakable in 2-3 seconds

Return as JSON:
{
  "shortened": "The compressed hook here",
  "wordCount": 8,
  "technique": "What you removed/changed"
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You compress hooks to their most impactful form. You respond only in valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 200,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    const result = JSON.parse(content);

    return NextResponse.json({
      original: hook,
      shortened: result.shortened,
      wordCount: result.wordCount,
      technique: result.technique,
    });

  } catch (error: any) {
    console.error("Hook shortening error:", error);
    
    // Return mock data if API fails
    if (process.env.NODE_ENV === "development" || !process.env.OPENAI_API_KEY) {
      // Simple fallback: take first 10 words
      const words = request.body ? "" : "";
      return NextResponse.json({
        shortened: "This changed everything for me",
        wordCount: 5,
        technique: "Removed setup, kept the core intrigue",
        note: "Mock data - set OPENAI_API_KEY for real compression",
      });
    }

    return NextResponse.json(
      { error: "Failed to shorten hook" },
      { status: 500 }
    );
  }
}
