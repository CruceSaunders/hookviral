# TikTok Hook Research - Master Plan of Attack

**Created:** January 30, 2026
**Status:** IN PROGRESS
**Estimated Completion:** 8-12 hours of work

---

## 📋 Executive Summary

This document outlines the comprehensive plan to research, analyze, and implement a viral TikTok hooks library with 500+ real viral videos across 50 niches, culminating in AI-powered hook generation fine-tuned by actual viral data.

### Key Deliverables:
1. **50 Niche Definitions** - Comprehensive list of TikTok content categories
2. **500 Viral Videos** - 10 videos per niche, all 500K+ views
3. **Hook Extraction** - Transcripts and hook identification from each video
4. **TikTok Hook Research Document** - Master analysis of what makes hooks work
5. **AI Prompt Guidelines** - Fine-tuned instructions for hook generation
6. **Live Library Population** - Real data in Supabase, no mock data

---

## 🎯 Phase 1: Define 50 TikTok Niches

### Current Niches (10):
1. Fitness
2. Business
3. Comedy
4. Education
5. Lifestyle
6. Beauty
7. Tech
8. Food
9. Travel
10. Gaming

### Expanded Niches (40 additional):
11. Personal Finance / Money
12. Self-Improvement / Growth
13. Relationships / Dating
14. Parenting
15. Fashion
16. Home Decor / Interior Design
17. DIY / Crafts
18. Cars / Automotive
19. Real Estate
20. Crypto / Web3
21. Mental Health
22. Productivity
23. Career / Jobs
24. Side Hustles
25. Motivation / Inspiration
26. Science / Facts
27. History
28. Psychology
29. Philosophy
30. Spirituality
31. Pets / Animals
32. Music
33. Art / Creative
34. Books / Reading
35. Movies / TV
36. Sports
37. Outdoor / Adventure
38. Photography
39. Health / Wellness
40. Skincare
41. Hair Care
42. Cooking / Recipes
43. Baking
44. Coffee / Drinks
45. Fitness Equipment / Home Gym
46. Yoga / Meditation
47. Running / Cardio
48. Weightlifting / Bodybuilding
49. Student Life / College
50. Entrepreneur / Startup

---

## 🔍 Phase 2: Research Methodology

### Approach for Finding Viral Videos:

**Method 1: TikTok Direct Search (Primary)**
- Search niche keywords
- Filter by "Most liked" or scroll through top results
- Verify view count 500K+

**Method 2: Web Search for Curated Lists**
- Search "best [niche] TikTok accounts 2024/2025"
- Search "viral [niche] TikTok videos"
- Use these as starting points

**Method 3: TikTok Creator Discovery**
- Find top creators in each niche
- Pull their most viewed videos
- Extract hooks from proven performers

### Data to Collect Per Video:
```typescript
interface ViralVideo {
  id: string;
  tiktok_url: string;
  creator_username: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  share_count: number;
  niche: string;
  hook_text: string;           // First 3-5 seconds transcript
  full_transcript: string;      // Complete video transcript
  hook_style: string;          // Classification (curiosity, story, etc.)
  hook_pattern: string;        // Pattern name (POV, Never X, etc.)
  hook_duration_seconds: number;
  video_duration_seconds: number;
  date_posted: string;
  date_researched: string;
  notes: string;
}
```

### Hook Classification Styles:
1. **Curiosity Gap** - Creates information gap that needs closing
2. **Story/Narrative** - Begins a personal story
3. **Controversy/Hot Take** - Challenges conventional wisdom
4. **Relatable/POV** - "POV: when you..." format
5. **Tips/How-To** - Educational value proposition
6. **Transformation** - Before/after or journey
7. **Challenge/Call-out** - Directly addresses viewer
8. **Shock/Surprise** - Unexpected statement
9. **List/Number** - "3 things..." format
10. **Question** - Direct question to viewer

### Hook Patterns to Identify:
- "The [thing] that [surprising result]"
- "I [did X] and [unexpected outcome]"
- "POV: [relatable situation]"
- "Stop [common action] if you [goal]"
- "Nobody talks about [hidden truth]"
- "[Authority] don't want you to know"
- "This [simple thing] changed my [life aspect]"
- "The reason you're not [achieving goal]"
- "I found out why [mystery]"
- "What [experts] won't tell you about [topic]"

---

## 🛠️ Phase 3: Technical Implementation

### Step 3.1: Update Database Schema
```sql
-- Add new table for viral video research
CREATE TABLE IF NOT EXISTS viral_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tiktok_url TEXT NOT NULL UNIQUE,
  creator_username TEXT,
  view_count BIGINT NOT NULL,
  like_count BIGINT,
  comment_count BIGINT,
  share_count BIGINT,
  niche VARCHAR(50) NOT NULL,
  hook_text TEXT NOT NULL,
  full_transcript TEXT,
  hook_style VARCHAR(50),
  hook_pattern VARCHAR(100),
  hook_duration_seconds DECIMAL(4,1),
  video_duration_seconds DECIMAL(6,1),
  date_posted DATE,
  date_researched TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  is_preset BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for efficient queries
CREATE INDEX idx_viral_videos_niche ON viral_videos(niche);
CREATE INDEX idx_viral_videos_style ON viral_videos(hook_style);
CREATE INDEX idx_viral_videos_views ON viral_videos(view_count DESC);
```

### Step 3.2: Update Hooks Table
```sql
-- Add source tracking to hooks
ALTER TABLE hooks ADD COLUMN IF NOT EXISTS source_video_id UUID REFERENCES viral_videos(id);
ALTER TABLE hooks ADD COLUMN IF NOT EXISTS is_preset BOOLEAN DEFAULT false;
ALTER TABLE hooks ADD COLUMN IF NOT EXISTS hook_pattern VARCHAR(100);
```

### Step 3.3: Expand Niche Colors
Update `src/components/niche-badge.tsx` with all 50 niches and their colors/emojis.

### Step 3.4: Create Research Scripts
1. `scripts/research-niches.ts` - Tracks progress per niche
2. `scripts/add-viral-video.ts` - Adds video to database
3. `scripts/extract-hook.ts` - Processes video to extract hook
4. `scripts/populate-library.ts` - Converts viral videos to hooks

---

## 📊 Phase 4: Research Execution (The Big Work)

### Workflow Per Niche:
1. Search TikTok/web for viral videos in niche
2. Verify video has 500K+ views
3. Get video URL
4. Use transcript extraction (manual or tool)
5. Identify and extract hook (first 3-5 seconds)
6. Classify hook style and pattern
7. Add to viral_videos table
8. Repeat 10x per niche

### Progress Tracking:
| Niche | Videos Found | Hooks Extracted | Status |
|-------|-------------|-----------------|--------|
| Fitness | 0/10 | 0/10 | Not Started |
| Business | 0/10 | 0/10 | Not Started |
| ... | ... | ... | ... |

### Time Estimates Per Niche:
- Finding 10 videos: ~15 minutes
- Extracting hooks from 10 videos: ~20 minutes
- Classifying and adding to database: ~10 minutes
- **Total per niche: ~45 minutes**
- **Total for 50 niches: ~37.5 hours**

### Optimization Strategy:
- Batch similar niches (all fitness-related together)
- Use browser automation where possible
- Parallel research across multiple tabs
- Focus on quality over speed

---

## 📝 Phase 5: TikTok Hook Research Document

### Document Structure:
```markdown
# TikTok Hook Research: The Science of Viral Hooks

## Executive Summary
- Key findings from 500 viral video analysis
- Top 5 most effective hook patterns
- Niche-specific insights

## Chapter 1: What Is a Hook?
- Definition and purpose
- Psychology of attention capture
- The 1-3 second rule

## Chapter 2: Hook Anatomy
- Opening word patterns
- Emotional triggers
- Curiosity mechanisms
- Authority signals

## Chapter 3: Hook Styles Deep Dive
- [Each of the 10 styles with examples]
- When to use each style
- Niche-style compatibility matrix

## Chapter 4: Hook Patterns Library
- [Each pattern with 5+ examples]
- Fill-in-the-blank templates
- Pattern effectiveness by niche

## Chapter 5: Niche-Specific Insights
- [Key findings for each of 50 niches]
- Best performing patterns per niche
- Audience expectations by niche

## Chapter 6: What Makes Hooks Fail
- Common mistakes
- Overused patterns to avoid
- Authenticity factors

## Chapter 7: Advanced Techniques
- Pattern combinations
- Trend-jacking hooks
- Sound-synchronized hooks

## Appendix: Raw Data
- All 500 hooks with metadata
- Statistical analysis
```

---

## 🤖 Phase 6: AI Prompt Engineering

### Hook Generation System Prompt:
```markdown
You are an expert TikTok hook writer trained on 500+ viral videos 
across 50 niches. Your hooks have generated millions of views.

## Your Training Data:
- 500 viral videos analyzed (all 500K+ views)
- 50 different niches mastered
- 10 hook styles perfected
- 20+ hook patterns in your toolkit

## Hook Writing Rules:
1. ALWAYS hook in the first 1-3 seconds
2. Create an immediate curiosity gap
3. Be specific - vague hooks fail
4. Match the niche's tone
5. Use proven patterns, not generic templates

## Style Guidelines:
[Dynamically inject based on selected style]

## Niche Context:
[Dynamically inject niche-specific patterns]

## Output Format:
[Structured hook with metadata]
```

### Dynamic Prompt Injection:
- User selects niche → inject niche-specific patterns
- User selects style → inject style guidelines
- User provides topic → match with similar viral hooks

---

## 🚧 Obstacles & Solutions

### Potential Obstacle 1: TikTok Transcript Extraction
**Problem:** TikTok doesn't provide easy transcript access
**Solutions to try:**
1. Manual transcription (slow but accurate)
2. Browser-based audio extraction + Whisper
3. Third-party transcript tools (DownSub, etc.)
4. TikTok auto-captions screenshot + OCR
5. Screen recording + local transcription

### Potential Obstacle 2: Rate Limiting / Access Issues
**Problem:** TikTok may block automated access
**Solutions to try:**
1. Manual research (slower but reliable)
2. Different IP addresses
3. Browser automation with delays
4. Research via curated lists/databases
5. Use TikTok embeds on third-party sites

### Potential Obstacle 3: View Count Verification
**Problem:** Need to verify 500K+ views consistently
**Solutions to try:**
1. Screenshot evidence
2. Third-party analytics tools
3. Trust but verify approach
4. Focus on obviously viral content
5. Use social proof (shares, comments)

### Potential Obstacle 4: Scale of Data Entry
**Problem:** 500 videos is a lot of manual work
**Solutions to try:**
1. Create efficient input workflow
2. Batch processing scripts
3. Clipboard shortcuts
4. CSV import capability
5. Parallel processing

### Potential Obstacle 5: Supabase Connection
**Problem:** Need live database connection
**Solutions to try:**
1. Verify .env.local configuration
2. Test connection script
3. Check Supabase dashboard
4. Row-level security policies
5. Service role key if needed

---

## ✅ Execution Checklist

### Phase 1: Setup (Est. 2 hours)
- [ ] Create viral_videos table in Supabase
- [ ] Update hooks table with new columns
- [ ] Expand niche-badge.tsx to 50 niches
- [ ] Create data entry script/tool
- [ ] Test database connectivity

### Phase 2: Research (Est. 30-40 hours)
- [ ] Niches 1-10 (Fitness, Business, Comedy, Education, Lifestyle, Beauty, Tech, Food, Travel, Gaming)
- [ ] Niches 11-20 (Finance, Self-Improvement, Dating, Parenting, Fashion, Home, DIY, Cars, Real Estate, Crypto)
- [ ] Niches 21-30 (Mental Health, Productivity, Career, Side Hustle, Motivation, Science, History, Psychology, Philosophy, Spirituality)
- [ ] Niches 31-40 (Pets, Music, Art, Books, Movies, Sports, Outdoor, Photography, Health, Skincare)
- [ ] Niches 41-50 (Hair, Cooking, Baking, Coffee, Equipment, Yoga, Running, Lifting, Student, Startup)

### Phase 3: Analysis (Est. 4 hours)
- [ ] Aggregate all hook data
- [ ] Identify patterns and trends
- [ ] Calculate effectiveness metrics
- [ ] Create style-niche matrix
- [ ] Document key insights

### Phase 4: Documentation (Est. 4 hours)
- [ ] Write TikTok Hook Research document
- [ ] Create AI prompt guidelines
- [ ] Update app with new prompts
- [ ] Test new generation quality

### Phase 5: Deployment (Est. 2 hours)
- [ ] Verify all data in Supabase
- [ ] Update frontend to show new niches
- [ ] Test library filtering
- [ ] Verify hook generation
- [ ] Final QA pass

---

## 📈 Success Metrics

1. **Quantitative:**
   - 50 niches fully researched
   - 500 viral videos documented
   - 500 hooks extracted and classified
   - 0 mock data in production

2. **Qualitative:**
   - Hooks library feels "real" and valuable
   - AI-generated hooks match quality of examples
   - Research document is comprehensive and actionable
   - System is extensible for user research

---

## 🚀 Let's Begin

Starting with Phase 1: Database setup and niche expansion.
Then immediately into Phase 2: Research execution.

**First niche to research: Fitness** (most familiar, good for testing workflow)
