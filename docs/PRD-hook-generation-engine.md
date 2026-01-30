# PRD: HookViral AI Hook Generation Engine v2.0

## Problem Statement

Current hook generation is:
- **Templated** - Outputs feel like mad-libs ("I was doing [topic] wrong until...")
- **Generic** - Niche, style, and spice settings don't meaningfully affect output
- **Too long** - Many hooks exceed 10 words (should be 3-8 words max)
- **Predictable** - Same structural patterns regardless of input
- **Low value** - Users could get same results from a template sheet

## Success Criteria

1. Hooks feel **genuinely creative and unique** - not templated
2. **Niche deeply influences** vocabulary, references, and angle
3. **Style setting dramatically changes** hook structure and approach
4. **Spice level creates real variation** from safe to edgy
5. Hooks are **3-10 words max** (under 3 seconds spoken)
6. Users say "I couldn't have thought of that" for 50%+ of hooks

---

## Core Architecture

### 1. Multi-Stage Generation Pipeline

```
User Input → Context Builder → Style Transformer → Hook Generator → Quality Filter → Output
```

**Stage 1: Context Builder**
- Deeply analyze the topic
- Pull niche-specific vocabulary, pain points, desires
- Identify emotional triggers for that niche

**Stage 2: Style Transformer**
- Apply style-specific structural patterns
- Adjust tone, word choice, and psychological angle
- Apply spice level modifications

**Stage 3: Hook Generator**
- Generate 20+ raw hooks
- Use different "hook formulas" but ADAPT them creatively
- Force true creativity by requiring topic-specific words

**Stage 4: Quality Filter**
- Remove any hook over 10 words
- Remove generic/template-feeling hooks
- Score for uniqueness and creativity
- Return top 10

---

## Niche System

Each niche has a **Niche Profile** that influences generation:

### Fitness Niche Profile
```json
{
  "niche": "fitness",
  "vocabulary": ["gains", "PR", "bulk", "cut", "macros", "pump", "progressive overload"],
  "painPoints": ["plateau", "no time", "genetics", "motivation", "soreness"],
  "desires": ["visible abs", "strength", "energy", "confidence", "discipline"],
  "references": ["gym culture", "bodybuilding", "wellness", "transformation"],
  "spiceExamples": {
    "mild": "Why your workouts aren't working",
    "medium": "Your trainer is lying to you about this",
    "hot": "The exercise everyone does that's destroying your body"
  }
}
```

### Business/Entrepreneur Profile
```json
{
  "niche": "business",
  "vocabulary": ["revenue", "scaling", "leverage", "passive income", "exit", "funnel"],
  "painPoints": ["burnout", "cash flow", "competition", "hiring", "growth plateau"],
  "desires": ["freedom", "wealth", "impact", "automation", "recognition"],
  "references": ["startup culture", "hustle", "wealth building"],
  "spiceExamples": {
    "mild": "The business mistake I made for 3 years",
    "medium": "Why most businesses fail (it's not what you think)",
    "hot": "The lie every business guru tells you"
  }
}
```

### Create profiles for: Comedy, Education, Beauty, Tech, Gaming, Food, Travel, Parenting, Dating, Finance, Lifestyle, DIY, Pets

---

## Style System

### Style Definitions (with examples)

**1. Curiosity Gap**
- Creates information void viewer MUST fill
- Structure: Tease without reveal
- Examples:
  - "The thing nobody tells you about [specific aspect]"
  - "Why [unexpected thing] actually works"
  - Word limit: 5-8 words

**2. Controversy/Hot Take**
- Challenges conventional wisdom
- Structure: Bold claim that invites debate
- Examples:
  - "[Common practice] is a scam"
  - "Stop doing [popular thing]"
  - Word limit: 3-7 words

**3. Story Hook**
- Begins mid-narrative
- Structure: Start at the interesting part
- Examples:
  - "Day 47: I finally understood"
  - "That's when everything changed"
  - Word limit: 4-8 words

**4. Shock/Pattern Interrupt**
- Unexpected statement that stops scroll
- Structure: Contradiction or surprise
- Examples:
  - "I got fired for this"
  - "This ruined my life (in a good way)"
  - Word limit: 4-7 words

**5. Direct Challenge**
- Calls viewer out directly
- Structure: "You" focused, accusatory or intriguing
- Examples:
  - "You're doing this wrong"
  - "This is why you're stuck"
  - Word limit: 4-7 words

**6. Social Proof/Result**
- Lead with outcome or achievement
- Structure: Result first, mystery after
- Examples:
  - "$50K in 30 days. Here's how."
  - "10,000 followers in a week."
  - Word limit: 4-8 words

---

## Spice Level System

### Level 1: Mild (Safe for brands/sensitive topics)
- No controversy
- Positive framing
- No accusations
- Example: "A better way to approach [topic]"

### Level 2: Medium (Standard viral hooks)
- Light controversy okay
- Challenge conventional wisdom
- Slight edginess
- Example: "Why [common practice] doesn't work"

### Level 3: Hot (Maximum engagement, risk of backlash)
- Bold controversial claims
- Accusatory language okay
- Provocative statements
- Example: "[Authority figures] have been lying about this"

### Level 4: Viral-or-Banned (Use at own risk)
- Extreme statements
- Highly provocative
- May trigger strong reactions
- Example: "The [industry] doesn't want you to know this"

---

## AI Prompt Engineering

### System Prompt v2.0

```
You are a viral TikTok hook genius who has studied 10,000+ viral videos. You understand that hooks are NOT templates - they are creative micro-stories that stop thumbs.

CRITICAL RULES:
1. NEVER use generic templates like "I was doing X wrong until Y"
2. EVERY hook must contain at least one SPECIFIC word from the user's topic
3. Hooks must be 3-10 words MAX (under 3 seconds spoken)
4. Each hook must feel like it could ONLY be about this specific topic
5. Avoid filler words: "actually", "just", "really", "basically"
6. Start with the most interesting/shocking word, not "I" or "The"

NICHE CONTEXT:
{niche_profile}

STYLE FOCUS: {style}
SPICE LEVEL: {spice_level}/4

Generate hooks that:
- Feel SPECIFIC to "{topic}" not generic
- Use vocabulary from the {niche} world
- Match the {style} structure
- Hit the {spice_level} intensity

ANTI-PATTERNS (NEVER USE):
- "What if I told you..."
- "The one thing..."
- "Nobody talks about..."
- "I tried X for Y days..."
- Starting with "I" "The" "This" "So"

GOOD PATTERNS:
- Start with a number, result, or time
- Start with an action verb
- Start with "Why" "How" "When" only if followed by specific content
- Use the user's exact niche terminology
```

### User Prompt Template

```
TOPIC: {topic}
NICHE: {niche}
STYLE: {style}
SPICE: {spice_level}

Generate 15 hooks. For EACH hook:
1. Text (3-10 words, MUST include a word from the topic)
2. Why it works for THIS specific topic (1 sentence)
3. Scroll-stop rating (1-10)

Format as JSON array. Be wildly creative. No templates.
```

---

## Technical Implementation

### API Endpoint Changes

```typescript
// New request interface
interface GenerateRequest {
  topic: string;           // What the video is about
  niche: string;           // fitness, business, comedy, etc.
  style: string;           // curiosity, controversy, story, shock, challenge, proof
  spiceLevel: number;      // 1-4
  count?: number;          // How many hooks (default 10)
}

// Processing pipeline
async function generateHooks(req: GenerateRequest) {
  // 1. Load niche profile
  const nicheProfile = getNicheProfile(req.niche);
  
  // 2. Build context-rich prompt
  const prompt = buildPrompt(req, nicheProfile);
  
  // 3. Generate with higher token count for creativity
  const rawHooks = await generateWithOpenAI(prompt, {
    temperature: 1.0,  // Maximum creativity
    topP: 0.95,
    presencePenalty: 0.6,  // Avoid repetition
    frequencyPenalty: 0.5,
  });
  
  // 4. Quality filter
  const filteredHooks = filterHooks(rawHooks, {
    maxWords: 10,
    requireTopicWord: true,
    removeTemplates: true,
  });
  
  // 5. Return top hooks
  return filteredHooks.slice(0, req.count || 10);
}
```

### Quality Filter Function

```typescript
function filterHooks(hooks: Hook[], options: FilterOptions): Hook[] {
  const templatePatterns = [
    /^I was doing/i,
    /^What if I told you/i,
    /^The one thing/i,
    /^Nobody talks about/i,
    /^Here's what/i,
    /^This is why/i,
  ];
  
  return hooks.filter(hook => {
    // Word count check
    const wordCount = hook.text.split(' ').length;
    if (wordCount > options.maxWords) return false;
    
    // Template check
    if (templatePatterns.some(p => p.test(hook.text))) return false;
    
    // Topic relevance check (must contain topic-related word)
    if (options.requireTopicWord) {
      // Use fuzzy matching to ensure topic relevance
    }
    
    return true;
  });
}
```

---

## UI/UX Changes

### Generate Page Updates

1. **Style Selector** - Visual cards showing example of each style
2. **Spice Slider** - Visual indicator from "Brand Safe" to "Maximum Viral"
3. **Niche Dropdown** - With icons and descriptions
4. **Word Count Badge** - Show word count on each generated hook
5. **Regenerate Single** - Button to regenerate just one hook if user doesn't like it
6. **"Why This Works"** - Expandable explanation for each hook

### Quality Indicators

- 🟢 3-5 words (optimal)
- 🟡 6-8 words (good)
- 🔴 9-10 words (acceptable but long)
- ❌ 11+ words (filtered out)

---

## Testing & Validation

### Test Cases

1. **Same topic, different niches** - Should produce dramatically different hooks
2. **Same topic, different styles** - Should have different structures
3. **Same topic, different spice** - Should range from safe to edgy
4. **Multiple generations** - Should NOT produce same hooks
5. **Template detection** - Zero hooks should match template patterns

### A/B Testing

- Compare v1 vs v2 hooks
- Measure: User satisfaction, regeneration rate, copy rate

---

## Implementation Phases

### Phase 1: Core Engine (Today)
- [ ] Implement new prompt system
- [ ] Add niche profiles (5 niches)
- [ ] Add quality filter
- [ ] Deploy and test

### Phase 2: Full Niche Library (Tomorrow)
- [ ] Add all 15 niche profiles
- [ ] Refine prompts based on testing
- [ ] Add style examples to UI

### Phase 3: Advanced Features (This Week)
- [ ] Single hook regeneration
- [ ] Hook history/favorites
- [ ] Export to clipboard with formatting

---

## Success Metrics

1. **Uniqueness Score**: <5% of hooks match known templates
2. **Niche Relevance**: 80%+ hooks contain niche-specific vocabulary
3. **Word Count**: 90%+ hooks under 10 words
4. **User Satisfaction**: "These are creative" rating 4+/5
5. **Regeneration Rate**: Users regenerate <2x on average (means first results are good)
