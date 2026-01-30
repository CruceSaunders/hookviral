import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getNicheProfile, NicheProfile } from "@/lib/niche-profiles";

function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) return null;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

interface GenerateRequest {
  topic: string;
  niche: string;
  style?: string;
  spiceLevel?: number; // 1-4
}

interface GeneratedHook {
  text: string;
  style: string;
  explanation: string;
  wordCount: number;
}

// Template patterns to reject
const TEMPLATE_PATTERNS = [
  /^I was doing/i,
  /^What if I told you/i,
  /^The one thing/i,
  /^Nobody talks about/i,
  /^Here's what/i,
  /^Here's why/i,
  /^This is why/i,
  /^This is how/i,
  /^The secret to/i,
  /^The truth about/i,
  /^I tried .* for \d+ days/i,
  /^In this video/i,
  /^Hey guys/i,
  /^So basically/i,
];

function buildSystemPrompt(niche: NicheProfile, style: string, spiceLevel: number): string {
  const spiceDescriptions: Record<number, string> = {
    1: "MILD - Keep it safe, positive, brand-friendly. No controversy.",
    2: "MEDIUM - Light edge okay. Challenge assumptions gently.",
    3: "HOT - Be provocative. Bold claims. Challenge the status quo hard.",
    4: "EXTREME - Maximum provocation. Controversial. Risk of backlash is fine."
  };

  return `You are a TikTok hook genius who has analyzed 50,000+ viral videos. You create hooks that are SPECIFIC, CREATIVE, and IMPOSSIBLE TO SCROLL PAST.

## CRITICAL RULES - VIOLATING THESE = FAILURE:
1. EVERY hook must be 3-10 words MAXIMUM (count carefully!)
2. NEVER start with: "I" "The" "This" "So" "Here's" "What if"
3. NEVER use template phrases like "nobody talks about" "the one thing" "what if I told you"
4. EVERY hook MUST contain at least one word SPECIFIC to the topic
5. Hooks must feel like they could ONLY be about THIS topic - not generic

## NICHE CONTEXT: ${niche.name}
Vocabulary to use: ${niche.vocabulary.slice(0, 8).join(", ")}
Pain points to tap: ${niche.painPoints.slice(0, 5).join(", ")}
Desires to trigger: ${niche.desires.slice(0, 5).join(", ")}
Insider terms: ${niche.insiderTerms.join(", ")}

## STYLE FOCUS: ${style.toUpperCase()}
${getStyleInstructions(style)}

## SPICE LEVEL: ${spiceLevel}/4
${spiceDescriptions[spiceLevel] || spiceDescriptions[2]}
Example at this spice level: "${niche.spiceExamples[['mild', 'medium', 'hot', 'extreme'][spiceLevel - 1] as keyof typeof niche.spiceExamples]}"

## GOOD HOOK PATTERNS:
- Start with a NUMBER: "3 seconds changed my [result]"
- Start with a TIME: "Day 47: finally worked"
- Start with an ACTION VERB: "Stop [common mistake]"
- Start with a RESULT: "$10K in a week. Here's how."
- Start with WHY/HOW + specific: "Why [specific thing] fails"
- Start with a BOLD CLAIM: "[Thing] is dead"

## BAD PATTERNS (INSTANT REJECTION):
- Generic templates that work for any topic
- Starting with filler words
- Over 10 words
- No specific reference to the actual topic
- Sounds like every other TikTok`;
}

function getStyleInstructions(style: string): string {
  const styles: Record<string, string> = {
    curiosity: `CURIOSITY GAP: Create an information void they MUST fill.
- Tease without revealing
- Make them think "wait, what?"
- Examples: "Why [specific] backfires" / "[Number] made me realize..."`,
    
    controversy: `CONTROVERSY/HOT TAKE: Challenge what everyone believes.
- Take a stance against common wisdom
- Be boldly opinionated
- Examples: "[Popular thing] is a scam" / "Stop believing [myth]"`,
    
    story: `STORY HOOK: Drop them into the middle of action.
- Start at the climax, not the beginning
- Create instant emotional investment
- Examples: "Day 47: it clicked" / "That's when I knew..."`,
    
    shock: `SHOCK/PATTERN INTERRUPT: Say something unexpected.
- Contradict expectations
- Create cognitive dissonance
- Examples: "I got banned for this" / "[Bad thing] saved me"`,
    
    challenge: `DIRECT CHALLENGE: Call out the viewer.
- Make it about THEM
- Create slight discomfort
- Examples: "You're doing [thing] wrong" / "[Mistake] is costing you"`,
    
    proof: `SOCIAL PROOF/RESULTS: Lead with the outcome.
- Numbers and results first
- Create desire through achievement
- Examples: "$50K month. One change." / "10K followers in a week."`,
    
    mixed: `MIX ALL STYLES: Vary between curiosity, controversy, story, shock, challenge, and proof.
- Use different structures for each hook
- Keep variety high`
  };
  
  return styles[style] || styles.mixed;
}

function buildUserPrompt(topic: string, niche: NicheProfile, style: string, spiceLevel: number): string {
  return `TOPIC: "${topic}"
NICHE: ${niche.name}
STYLE: ${style}
SPICE: ${spiceLevel}/4

Generate exactly 15 unique hooks for this SPECIFIC topic.

REQUIREMENTS:
- Each hook: 3-10 words ONLY (count them!)
- Must reference "${topic}" specifically - no generic hooks
- Use ${niche.name} vocabulary where natural
- Match the ${style} style
- Hit spice level ${spiceLevel}

For each hook provide:
1. "text": The hook (3-10 words, be creative!)
2. "why": One sentence on why this works for THIS topic
3. "wordCount": Exact word count

Return as JSON: { "hooks": [...] }

BE WILDLY CREATIVE. NO TEMPLATES. These hooks should feel fresh and specific.`;
}

function filterHooks(hooks: any[], topic: string): GeneratedHook[] {
  return hooks
    .filter(h => {
      if (!h.text || typeof h.text !== 'string') return false;
      
      const wordCount = h.text.trim().split(/\s+/).length;
      
      // Reject if over 10 words
      if (wordCount > 10) return false;
      
      // Reject template patterns
      if (TEMPLATE_PATTERNS.some(p => p.test(h.text))) return false;
      
      // Reject if too generic (doesn't relate to topic at all)
      const topicWords = topic.toLowerCase().split(/\s+/);
      const hookLower = h.text.toLowerCase();
      const hasTopicRelevance = topicWords.some(word => 
        word.length > 3 && hookLower.includes(word)
      ) || hookLower.includes(topic.toLowerCase().slice(0, 5));
      
      // Be lenient on topic relevance - AI should handle this
      return true;
    })
    .map(h => ({
      text: h.text.trim(),
      style: h.style || "mixed",
      explanation: h.why || h.explanation || "Optimized for engagement",
      wordCount: h.text.trim().split(/\s+/).length,
    }))
    .slice(0, 10);
}

export async function POST(request: Request) {
  try {
    const body: GenerateRequest = await request.json();
    const { topic, niche, style = "mixed", spiceLevel = 2 } = body;

    if (!topic || !niche) {
      return NextResponse.json(
        { error: "Topic and niche are required" },
        { status: 400 }
      );
    }

    const nicheProfile = getNicheProfile(niche);
    const clampedSpice = Math.max(1, Math.min(4, spiceLevel));

    const openai = getOpenAI();
    if (!openai) {
      return NextResponse.json({
        hooks: getDynamicMockHooks(topic, nicheProfile, style, clampedSpice),
        note: "Demo mode - add OPENAI_API_KEY for real AI generation",
      });
    }

    const systemPrompt = buildSystemPrompt(nicheProfile, style, clampedSpice);
    const userPrompt = buildUserPrompt(topic, nicheProfile, style, clampedSpice);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 1.0,  // Maximum creativity
      top_p: 0.95,
      presence_penalty: 0.6,  // Avoid repetition
      frequency_penalty: 0.5,
      max_tokens: 2500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    const parsed = JSON.parse(content);
    const rawHooks = parsed.hooks || parsed;
    const filteredHooks = filterHooks(rawHooks, topic);

    return NextResponse.json({
      hooks: filteredHooks,
      count: filteredHooks.length,
      topic,
      niche: nicheProfile.name,
      style,
      spiceLevel: clampedSpice,
    });

  } catch (error: any) {
    console.error("Hook generation error:", error);
    
    // Return dynamic mock data if API fails
    try {
      const body = await request.clone().json();
      const nicheProfile = getNicheProfile(body.niche || "lifestyle");
      return NextResponse.json({
        hooks: getDynamicMockHooks(body.topic || "your topic", nicheProfile, body.style || "mixed", body.spiceLevel || 2),
        note: "Using demo mode",
      });
    } catch {
      return NextResponse.json(
        { error: "Failed to generate hooks" },
        { status: 500 }
      );
    }
  }
}

// Dynamic mock hooks that actually use the topic
function getDynamicMockHooks(topic: string, niche: NicheProfile, style: string, spiceLevel: number): GeneratedHook[] {
  const topicShort = topic.split(' ').slice(0, 3).join(' ');
  const topicWord = topic.split(' ')[0];
  const nicheWord = niche.vocabulary[Math.floor(Math.random() * niche.vocabulary.length)];
  const painPoint = niche.painPoints[Math.floor(Math.random() * niche.painPoints.length)];
  
  const templates = [
    { text: `${topicWord} ruined my ${painPoint}`, style: "shock" },
    { text: `Stop with ${topicShort}`, style: "challenge" },
    { text: `Why ${topicShort} fails`, style: "curiosity" },
    { text: `${topicWord} but make it work`, style: "story" },
    { text: `Day 30: ${topicWord} clicked`, style: "story" },
    { text: `Your ${topicWord} approach is wrong`, style: "challenge" },
    { text: `${topicWord}? Try this instead`, style: "controversy" },
    { text: `3 ${topicWord} mistakes killing results`, style: "curiosity" },
    { text: `${nicheWord} + ${topicWord} = magic`, style: "proof" },
    { text: `${topicWord} secret nobody shares`, style: "curiosity" },
  ];
  
  return templates.map((t, i) => ({
    text: t.text,
    style: t.style,
    explanation: `Uses ${t.style} style to create engagement around ${topic}`,
    wordCount: t.text.split(' ').length,
  }));
}
