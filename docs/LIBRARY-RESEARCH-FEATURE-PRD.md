# Hook Viral: Library Research Feature PRD

## Overview

Transform the current static "Library" feature into a **real-time viral TikTok research tool**. Users will be able to research any niche, discover proven viral videos, and extract the hooks that made them successful.

This becomes the **core value proposition** of Hook Viral - real research backed by actual viral data, not AI assumptions.

## Key Value Proposition

> "Research 100+ viral TikToks in your niche, see exactly what hooks worked, and use proven formulas instead of guessing."

## Feature Requirements

### 1. Research Interface

**Location:** Replace current `/library` page (or merge functionality)

**User Flow:**
1. User selects/enters a niche (dropdown + custom input)
2. User sets minimum view count (slider or input, default 500K)
3. User optionally describes their video concept
4. User clicks "Research" → AI fetches ~100 viral TikToks matching criteria
5. Results display in browsable grid/list format

**Filter Options:**
- Niche/Topic (required)
- Minimum views (500K default, adjustable 100K - 10M+)
- Maximum views (optional, for finding "realistic" viral, not mega-viral)
- Date range (last 30 days, 90 days, year, all time)
- Video duration (shorts <30s, medium 30-60s, long 60s+)

### 2. Results Display

Each video card shows:
- **Thumbnail** - clickable, links to original TikTok
- **View count** - formatted (e.g., "2.3M views")
- **Hook/Opening line** - extracted from transcript (first 1-2 sentences)
- **Niche tag** - auto-categorized
- **One-sentence summary** - AI-generated "what this video is about"
- **Creator name** - with link to profile
- **Engagement metrics** - likes, comments, shares (smaller)

**Card Actions:**
- Click thumbnail → Opens modal with full details
- Copy hook button
- Save to personal library
- "Use this hook" → Opens Generate page with hook pre-filled

### 3. Video Detail Modal

When clicking a video:
- Larger thumbnail preview
- Full transcript (if available)
- Complete hook analysis:
  - Hook type (curiosity gap, story, controversy, etc.)
  - Why it works (AI analysis)
  - Similar hook templates
- Full engagement breakdown
- Link to original TikTok
- "Generate hooks like this" CTA

### 4. Personal Library (Saved Videos)

Users can save videos to their personal library for reference:
- Organized by niche/collection
- Notes field for each saved video
- Export functionality

---

## Technical Implementation

### Data Source: Apify TikTok Scrapers

**Primary Option:** Apify "Best TikTok Scraper"
- **Cost:** $1.88 / 1,000 results
- **Features:** Hashtags, profiles, search, trending, transcripts, full metadata

**Alternative Option:** Apify "TikTok Scraper (Pay Per Result)"  
- **Cost:** $0.30 / 1,000 posts (cheaper but may have fewer features)

**Transcript Extraction:** Apify "TikTok Transcript" actor
- Can extract captions/subtitles with AI translation

### API Architecture

```
User Request
    ↓
/api/research/tiktok (Next.js API route)
    ↓
Apify Actor API (run scraper with params)
    ↓
Raw TikTok Data (100 videos)
    ↓
AI Processing (OpenAI/Anthropic)
    - Extract hooks from transcripts
    - Categorize niches
    - Generate one-sentence summaries
    - Analyze hook types
    ↓
Processed Results → Database (cache)
    ↓
Response to Client
```

### Database Schema (Supabase)

```sql
-- Cached research results (reduce API costs)
CREATE TABLE research_cache (
  id UUID PRIMARY KEY,
  query_hash TEXT UNIQUE, -- hash of search params
  results JSONB,
  created_at TIMESTAMP,
  expires_at TIMESTAMP
);

-- User saved videos
CREATE TABLE saved_videos (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  tiktok_id TEXT,
  video_data JSONB,
  notes TEXT,
  collection TEXT,
  created_at TIMESTAMP
);

-- Extracted hooks (for the library)
CREATE TABLE extracted_hooks (
  id UUID PRIMARY KEY,
  tiktok_id TEXT,
  hook_text TEXT,
  hook_type TEXT,
  niche TEXT,
  view_count BIGINT,
  thumbnail_url TEXT,
  video_url TEXT,
  transcript TEXT,
  ai_summary TEXT,
  ai_analysis JSONB,
  created_at TIMESTAMP
);
```

### Cost Estimation

**Per research query (100 videos):**
- Apify scraping: ~$0.19 (100 × $0.00188)
- AI processing: ~$0.10-0.30 (depending on transcript length)
- **Total per query: ~$0.30-0.50**

**Caching strategy:**
- Cache results by query hash for 24 hours
- Popular niches can be pre-scraped daily
- Reduces costs significantly for common queries

### Implementation Phases

#### Phase 1: Core Infrastructure (Week 1)
- [ ] Set up Apify account and API integration
- [ ] Create `/api/research/tiktok` endpoint
- [ ] Implement basic scraping for hashtag/keyword search
- [ ] Set up database schema for caching

#### Phase 2: AI Processing Pipeline (Week 1-2)
- [ ] Hook extraction from transcripts
- [ ] Niche categorization
- [ ] One-sentence summary generation
- [ ] Hook type classification
- [ ] Implement OpenAI/Anthropic processing layer

#### Phase 3: New Library UI (Week 2)
- [ ] Research interface (niche select, filters)
- [ ] Results grid with video cards
- [ ] Video detail modal
- [ ] Loading states and pagination

#### Phase 4: User Features (Week 2-3)
- [ ] Save to personal library
- [ ] Collections/organization
- [ ] "Use this hook" integration with Generate page
- [ ] Export functionality

#### Phase 5: Optimization (Week 3)
- [ ] Caching layer for cost reduction
- [ ] Pre-populate popular niches
- [ ] Rate limiting and usage tracking
- [ ] Error handling and fallbacks

---

## Environment Variables Needed

```env
# Apify
APIFY_API_KEY=your_apify_key

# Already have these
OPENAI_API_KEY=xxx
ANTHROPIC_API_KEY=xxx
```

---

## Landing Page Updates

Update landing page to reflect TikTok focus:

**Current:**
> "AI-powered hooks that make people stop scrolling"

**Updated:**
> "AI-powered hooks optimized for TikTok. Research what actually goes viral, then generate hooks that work."

**Add specifics:**
- "Backed by real TikTok viral data"
- "Analyze 100+ viral videos in your niche"
- "Extract proven hooks from videos with 500K+ views"
- "Optimized specifically for TikTok's algorithm"

---

## Pricing Considerations

**Free Tier:**
- 5 research queries per month
- Access to pre-cached popular niches
- Save up to 20 hooks

**Pro Tier ($X/month):**
- Unlimited research queries
- Custom niche searches
- Unlimited saved hooks
- Export functionality
- Advanced filters

---

## Risk Mitigation

1. **TikTok blocking:** Apify handles anti-blocking, but have fallback to cached data
2. **Cost overruns:** Implement strict caching, rate limiting, usage caps
3. **Transcript quality:** Some videos have no transcript - fall back to video description
4. **Legal concerns:** Only scraping public data (legal per Bright Data v Meta ruling)

---

## Success Metrics

- Research queries per user
- Hooks saved from research
- Conversion: Research → Generate
- User retention improvement
- NPS score increase

---

## What I Need From Cruce

1. **Apify account setup** - Need to create account and get API key
2. **Budget approval** - Estimated $50-100/month for moderate usage
3. **Feature prioritization** - Which phases are most critical for MVP?
4. **Design review** - Want to approve mockups before building?

---

## Questions/Decisions Needed

1. Should we keep the current static hook library as a "curated" section, or fully replace?
2. What's the minimum view count threshold that makes a hook "proven"?
3. Should we limit niches to a preset list or allow custom keywords?
4. Do we want to show actual video thumbnails (might have copyright concerns) or generate abstract representations?

---

*Created: 2026-01-30*
*Author: Beru*
