import { NextResponse } from "next/server";
import OpenAI from "openai";

function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) return null;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

interface AnalyzeRequest {
  url?: string;
  manualDescription?: string;
  captureScreenshots?: boolean;
}

/**
 * Extracts video ID and platform from various social media URLs
 */
function parseVideoUrl(url: string): { platform: string; videoId: string | null } {
  const urlLower = url.toLowerCase();
  
  // TikTok
  if (urlLower.includes('tiktok.com')) {
    const match = url.match(/video\/(\d+)/);
    return { platform: 'tiktok', videoId: match ? match[1] : null };
  }
  
  // Instagram Reels
  if (urlLower.includes('instagram.com/reel')) {
    const match = url.match(/reel\/([A-Za-z0-9_-]+)/);
    return { platform: 'instagram', videoId: match ? match[1] : null };
  }
  
  // YouTube Shorts
  if (urlLower.includes('youtube.com/shorts')) {
    const match = url.match(/shorts\/([A-Za-z0-9_-]+)/);
    return { platform: 'youtube', videoId: match ? match[1] : null };
  }
  
  return { platform: 'unknown', videoId: null };
}

/**
 * Main analysis function that uses GPT-4 Vision to analyze video content
 * Since we can't watch videos directly, we work with:
 * 1. Screenshots captured from the video (3 per second)
 * 2. User-provided descriptions
 * 3. URL metadata when available
 */
async function analyzeWithAI(
  openai: OpenAI,
  context: {
    url?: string;
    platform?: string;
    description?: string;
    screenshots?: string[]; // base64 encoded images
  }
) {
  const systemPrompt = `You are a viral video analyst who specializes in reverse-engineering successful TikTok, Instagram Reels, and YouTube Shorts videos. Your job is to provide EXACT replication instructions.

You analyze videos and provide:
1. Hook analysis - the exact opening line/visual and why it works
2. Complete script breakdown with timing
3. Visual breakdown - camera angles, lighting, text overlays
4. Audio analysis - music type, voice style, sound effects
5. Step-by-step replication guide

Be SPECIFIC and ACTIONABLE. Don't give generic advice - give exact instructions that someone could follow to recreate this video.`;

  let userPrompt = "";

  if (context.screenshots && context.screenshots.length > 0) {
    userPrompt = `Analyze this viral video based on these ${context.screenshots.length} screenshots captured at 3 frames per second.

Platform: ${context.platform || 'TikTok'}
URL: ${context.url || 'Not provided'}
${context.description ? `Additional context: ${context.description}` : ''}

Based on these visual frames, provide a complete breakdown of:
1. What happens in each section of the video
2. The exact hook used (text and/or visual)
3. The script/dialogue if any
4. Visual techniques (camera angles, text overlays, transitions)
5. Estimated audio/music style
6. Step-by-step guide to recreate this exact video`;

  } else if (context.description) {
    userPrompt = `Create a replication guide for this video based on the user's description:

"${context.description}"

Platform: ${context.platform || 'TikTok'}

Even without screenshots, provide a complete breakdown assuming this is a viral video:
1. Optimize and refine the hook
2. Create a full script breakdown
3. Suggest visual techniques
4. Recommend audio approach
5. Provide step-by-step replication instructions`;
  } else {
    throw new Error("No screenshots or description provided");
  }

  const responseFormat = `
Respond in this exact JSON format:
{
  "hookAnalysis": {
    "text": "The exact hook text spoken/shown",
    "technique": "The psychological technique used (curiosity gap, controversy, etc.)",
    "whyItWorks": "Explanation of why this hook is effective",
    "timeSeconds": 3
  },
  "scriptBreakdown": {
    "hook": {
      "text": "Exact hook text",
      "timing": "0-3s",
      "technique": "What makes this hook work"
    },
    "context": {
      "text": "The context/setup portion",
      "timing": "3-8s",
      "purpose": "What this section accomplishes"
    },
    "body": {
      "text": "Main content",
      "timing": "8-25s",
      "keyPoints": ["Point 1", "Point 2", "Point 3"]
    },
    "twist": {
      "text": "The twist or payoff (if any)",
      "timing": "25-28s",
      "impact": "Why this moment hits"
    },
    "cta": {
      "text": "Call to action",
      "timing": "28-30s",
      "type": "save/follow/comment/share"
    }
  },
  "visualBreakdown": {
    "openingShot": "Description of first frame",
    "cameraAngles": ["Front-facing", "Close-up", etc.],
    "textOverlays": ["Text shown on screen"],
    "bRoll": ["Any cutaway footage"],
    "transitions": ["Cut", "Zoom", etc.],
    "lighting": "Description of lighting setup",
    "colorGrading": "Color/filter style"
  },
  "audioAnalysis": {
    "musicType": "Trending sound, original audio, etc.",
    "musicTiming": "When music starts/peaks",
    "voiceStyle": "Energetic, calm, whisper, etc.",
    "soundEffects": ["whoosh", "ding", etc.],
    "pacing": "Fast/medium/slow"
  },
  "replicationGuide": {
    "step1_hook": "Exact instructions for recreating the hook",
    "step2_setup": "How to set up the shot",
    "step3_filming": "Filming instructions",
    "step4_editing": "Editing instructions",
    "step5_captions": "Caption/text overlay instructions",
    "step6_audio": "Audio/music instructions",
    "equipment": ["Phone", "Ring light", etc.],
    "estimatedTime": "2-3 hours",
    "difficultyLevel": "Easy|Medium|Hard"
  }
}`;

  // Build message content
  const messageContent: any[] = [
    { type: "text", text: userPrompt + "\n\n" + responseFormat }
  ];

  // Add screenshots if available (GPT-4 Vision)
  if (context.screenshots && context.screenshots.length > 0) {
    // Send up to 10 screenshots evenly distributed throughout the video
    const maxScreenshots = 10;
    const step = Math.max(1, Math.floor(context.screenshots.length / maxScreenshots));
    const selectedScreenshots = context.screenshots.filter((_, i) => i % step === 0).slice(0, maxScreenshots);

    for (const screenshot of selectedScreenshots) {
      messageContent.push({
        type: "image_url",
        image_url: {
          url: screenshot.startsWith('data:') ? screenshot : `data:image/jpeg;base64,${screenshot}`,
          detail: "low" // Use low detail to reduce tokens
        }
      });
    }
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: messageContent }
    ],
    response_format: { type: "json_object" },
    max_tokens: 4000,
    temperature: 0.7,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from OpenAI");
  }

  return JSON.parse(content);
}

/**
 * Generate mock analysis for demo/development
 */
function getMockAnalysis(url?: string, description?: string) {
  return {
    videoUrl: url || "",
    platform: "tiktok",
    hookAnalysis: {
      text: "Nobody talks about this but it changed everything",
      technique: "Curiosity Gap + Exclusivity",
      whyItWorks: "Creates FOMO by implying secret knowledge that mainstream ignores. Viewers feel they're about to learn something valuable that others don't know.",
      timeSeconds: 3,
    },
    scriptBreakdown: {
      hook: {
        text: "Nobody talks about this but it changed everything",
        timing: "0-3s",
        technique: "Curiosity gap with implied transformation",
      },
      context: {
        text: "I've been in this space for 3 years, tried everything the gurus tell you, and none of it worked until I discovered this one thing.",
        timing: "3-10s",
        purpose: "Establish credibility and relatability while building anticipation",
      },
      body: {
        text: "See, everyone focuses on the flashy tactics - the hacks, the shortcuts. But the real game-changer? Consistency over intensity. I stopped trying to go viral with one post. Instead, I showed up every single day for 90 days straight.",
        timing: "10-25s",
        keyPoints: [
          "Contrasts common advice with the 'real' solution",
          "Uses specific numbers (90 days) for credibility",
          "Pattern interrupt: 'But the real game-changer?'",
        ],
      },
      twist: {
        text: "Day 30, nothing. Day 60, still nothing. But day 78? Everything exploded. The algorithm doesn't reward your best content. It rewards your most consistent presence.",
        timing: "25-32s",
        impact: "The delayed payoff creates tension and makes the insight feel earned",
      },
      cta: {
        text: "Save this and come back in 90 days to tell me I was right. Or prove me wrong in the comments.",
        timing: "32-35s",
        type: "save + comment engagement",
      },
    },
    visualBreakdown: {
      openingShot: "Direct eye contact, close-up face shot, casual background",
      cameraAngles: [
        "Front-facing selfie angle",
        "Slight low angle for authority",
        "Occasional zoom for emphasis",
      ],
      textOverlays: [
        "Hook text at top of screen",
        "'90 DAYS' with dramatic font",
        "Key numbers highlighted",
        "CTA text at end",
      ],
      bRoll: [
        "Screenshots of analytics",
        "Quick cuts of content creation process",
      ],
      transitions: [
        "Jump cuts between sentences",
        "Zoom transition on key words",
        "Flash transition before twist",
      ],
      lighting: "Natural light from window, soft and diffused, positioned at 45 degrees",
      colorGrading: "Slightly warm tones, increased contrast, subtle vignette",
    },
    audioAnalysis: {
      musicType: "Trending ambient/lo-fi beat, non-distracting",
      musicTiming: "Starts low under hook, builds during body, peaks at twist",
      voiceStyle: "Conversational but confident, slight urgency in hook, slower for emphasis on key points",
      soundEffects: [
        "Subtle whoosh on transitions",
        "Notification sound effect at 'exploded'",
        "Rising tension sound before twist",
      ],
      pacing: "Fast hook, medium body, slow on twist, fast CTA",
    },
    replicationGuide: {
      step1_hook: "Start recording with direct eye contact. Say 'Nobody talks about this but it changed everything' with slight intensity and pause at 'everything'. Add hook text overlay that appears word by word.",
      step2_setup: "Position yourself in front of a neutral, uncluttered background. Use natural light from a window to your left. Set phone at eye level, slightly below for a subtle hero angle.",
      step3_filming: "Record in one continuous take. Speak naturally but with energy. Use hand gestures sparingly. Make brief pauses before key revelations. Film multiple takes and pick the most natural one.",
      step4_editing: "Cut dead air between sentences (jump cuts). Add zoom effect at 'But the real game-changer?' Use flash transition before the twist. Keep total length under 35 seconds.",
      step5_captions: "Add auto-captions for accessibility. Highlight key words in pink/bold. Add large text overlay for '90 DAYS' moment. Include CTA text at the end.",
      step6_audio: "Use a trending lo-fi beat at 20% volume. Add whoosh sound effects on transitions. Include a notification 'ding' when mentioning 'exploded'. Ensure voice is clear above music.",
      equipment: [
        "Smartphone with good front camera",
        "Ring light or window light",
        "Phone tripod or stable surface",
        "Editing app (CapCut, InShot)",
        "Wireless earbuds for audio monitoring",
      ],
      estimatedTime: "1-2 hours (filming + editing)",
      difficultyLevel: "Easy" as const,
    },
    screenshots: [],
    status: "complete" as const,
  };
}

export async function POST(request: Request) {
  try {
    const body: AnalyzeRequest = await request.json();
    const { url, manualDescription, captureScreenshots } = body;

    if (!url && !manualDescription) {
      return NextResponse.json(
        { error: "Please provide either a video URL or description" },
        { status: 400 }
      );
    }

    // Parse URL if provided
    let platform = "tiktok";
    let videoId = null;
    if (url) {
      const parsed = parseVideoUrl(url);
      platform = parsed.platform;
      videoId = parsed.videoId;
    }

    const openai = getOpenAI();

    // If no API key, return mock data
    if (!openai) {
      console.log("No OpenAI API key - returning mock analysis");
      return NextResponse.json({
        analysis: getMockAnalysis(url, manualDescription),
        note: "Using mock data - set OPENAI_API_KEY for real analysis",
      });
    }

    // For now, we'll use the AI to generate analysis based on description
    // In production, you'd integrate screenshot capture here
    // Options:
    // 1. Use a headless browser to capture screenshots from the video page
    // 2. Use a video download API + ffmpeg to extract frames
    // 3. Ask user to paste screenshots directly

    let screenshots: string[] = [];

    // If URL provided and screenshot capture requested, attempt to get screenshots
    // This is where you'd integrate with a screenshot service
    // For MVP, we'll rely on manual description or mock data
    if (url && captureScreenshots) {
      // TODO: Integrate screenshot capture service
      // Options:
      // - Browserless.io
      // - Puppeteer with screenshot intervals
      // - TikTok unofficial API + video download + ffmpeg
      console.log("Screenshot capture requested but not yet implemented");
      console.log("Using description-based analysis instead");
    }

    // Analyze with AI
    const analysis = await analyzeWithAI(openai, {
      url,
      platform,
      description: manualDescription,
      screenshots,
    });

    return NextResponse.json({
      analysis: {
        ...analysis,
        videoUrl: url || "",
        platform,
        screenshots,
        status: "complete",
      },
    });

  } catch (error: any) {
    console.error("Video analysis error:", error);

    // Return mock data on error in development
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json({
        analysis: getMockAnalysis(),
        note: "Error occurred - using mock data",
        error: error.message,
      });
    }

    return NextResponse.json(
      { error: error.message || "Failed to analyze video" },
      { status: 500 }
    );
  }
}
