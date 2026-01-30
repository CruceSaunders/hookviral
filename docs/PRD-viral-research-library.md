# PRD: Viral TikTok Research Library

## Overview

Transform HookViral's library from static example hooks into a **real-time AI research tool** that finds and analyzes viral TikTok videos, extracts their hooks, and presents them in a browsable format.

## Core Value Proposition

**"AI researches viral TikToks so you don't have to."**

Users can discover what hooks are actually working RIGHT NOW by browsing real viral videos with their hooks extracted and analyzed.

---

## Feature: Viral Research Library

### User Flow

1. **User opens Library**
2. **Sets filters:**
 - Niche (fitness, business, comedy, etc.)
 - Min/Max view count (e.g., 500K - 10M)
 - Optional: describe video type they want to make
3. **Clicks "Research"**
4. **AI does the work:**
 - Searches TikTok for videos matching criteria
 - Pulls videos with view counts in range
 - Downloads/transcribes each video
 - Extracts the hook (first 3-5 seconds)
 - Analyzes what makes the hook work
5. **User browses results:**
 - Grid of video thumbnails
 - Each shows: thumbnail, view count, hook text
 - Click to expand: full details, link to original

### Research Results Card

```
┌─────────────────────────────────────┐
│ [THUMBNAIL]                         │
│                                     │
│ 👁 2.3M views                       │
│ 🎯 Fitness                          │
│                                     │
│ HOOK: "I lost 30 pounds and        │
│ didn't change my diet once"         │
│                                     │
│ [View Details] [Copy Hook]          │
└─────────────────────────────────────┘
```

### Expanded View (on click)

- **Video thumbnail/preview**
- **View count** (and likes if available)
- **Hook text** (first 3-5 seconds transcribed)
- **Why it works** (AI analysis)
- **Video summary** (1 sentence on what video is about)
- **Niche/category**
- **Link to original TikTok**
- **Copy hook button**
- **Save to favorites**

---

## Technical Architecture

### Option 1: Third-Party TikTok API (Recommended for MVP)

**Services to evaluate:**
- **Apify TikTok Scraper** - $49/mo, searches by hashtag, returns video data
- **RapidAPI TikTok APIs** - Various providers, pay per request
- **Tikapi.io** - Official-ish API access
- **Ensembl Data** - TikTok data provider

**What we need from API:**
- Search by hashtag/keyword
- Filter by view count
- Get video URL, thumbnail, view count, description
- Ideally: captions/transcript

### Option 2: Browser Automation (Backup)

- Use Playwright/Puppeteer to search TikTok
- Scrape results
- More fragile but free

### Transcription Pipeline

1. **If API provides captions** → Use directly
2. **If not:**
 - Download video (yt-dlp or similar)
 - Extract audio
 - Transcribe with Whisper API
 - Extract first 3-5 seconds as hook

### Hook Analysis

Use GPT-4 to analyze:
- What makes this hook effective
- Which hook formula it uses (curiosity, controversy, story, etc.)
- Why it works for this niche

---

## Database Schema

```typescript
interface ResearchedVideo {
 id: string;
 platform: "tiktok" | "instagram";
 videoUrl: string;
 thumbnailUrl: string;
 viewCount: number;
 likeCount?: number;
 niche: string;
 hookText: string;
 hookAnalysis: string;
 videoSummary: string;
 creatorUsername: string;
 researchedAt: Date;
 savedByUsers: string[]; // user IDs who saved this
}

interface ResearchQuery {
 id: string;
 userId: string;
 niche: string;
 minViews: number;
 maxViews?: number;
 videoDescription?: string;
 createdAt: Date;
 resultCount: number;
}
```

---

## Implementation Phases

### Phase 1: API Research & Selection (Today)
- [ ] Evaluate TikTok API options
- [ ] Test 2-3 services for reliability and data quality
- [ ] Select best option for MVP
- [ ] Set up API keys

### Phase 2: Backend Pipeline (1-2 days)
- [ ] Create `/api/research/tiktok` endpoint
- [ ] Implement TikTok search via selected API
- [ ] Implement transcription pipeline (if needed)
- [ ] Implement hook extraction
- [ ] Implement AI analysis
- [ ] Store results in Firebase

### Phase 3: Library UI Redesign (1 day)
- [ ] Replace static library with research interface
- [ ] Add filter controls (niche, view count range)
- [ ] Create video card grid
- [ ] Create expanded detail view
- [ ] Add "Research" button with loading state

### Phase 4: Landing Page Update (Today)
- [ ] Update value prop to emphasize TikTok research
- [ ] Add "TikTok-optimized" messaging
- [ ] Show example of research results

### Phase 5: Polish & Caching (1 day)
- [ ] Cache research results to reduce API costs
- [ ] Add "Trending Now" pre-researched section
- [ ] Add user favorites/saved hooks
- [ ] Rate limiting for free users

---

## API Cost Estimates

| Service | Cost | Notes |
|---------|------|-------|
| Apify TikTok | ~$0.50/1000 videos | Good data quality |
| RapidAPI | Varies | $0.001-0.01 per request |
| Whisper API | $0.006/min | Only if no captions |
| GPT-4 Analysis | ~$0.01/video | Hook analysis |

**Estimated cost per research query (100 videos):** $1-5

**Monetization:** Free users get 1 research/day, Pro gets unlimited

---

## Landing Page Messaging Updates

### Hero
"AI researches viral TikToks and extracts the hooks that are working RIGHT NOW"

### Features Section
- "Real-time TikTok research" 
- "Hooks from videos with 500K+ views"
- "See what's actually working today"

### Add new section: "How It Works"
1. Pick your niche
2. AI researches viral TikToks
3. Get hooks that are proven to work

---

## Questions to Resolve

1. **Which TikTok API to use?** - Need to test options
2. **How to handle rate limits?** - Cache aggressively, limit free users
3. **Should we pre-populate library?** - Yes, with trending content
4. **Instagram Reels too?** - Phase 2, focus on TikTok first

---

## Success Metrics

- Users complete research queries
- Hooks copied from research results
- Time spent browsing library
- Conversion from library to generate (using researched hooks as inspiration)
