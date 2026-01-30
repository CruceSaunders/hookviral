-- HookViral: Viral Videos Research Schema
-- Run this in Supabase SQL Editor AFTER the main schema

-- ============================================
-- VIRAL VIDEOS TABLE
-- Stores research data from 500+ viral TikTok videos
-- ============================================

CREATE TABLE IF NOT EXISTS viral_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tiktok_url TEXT NOT NULL UNIQUE,
  creator_username TEXT,
  view_count BIGINT NOT NULL CHECK (view_count >= 500000),
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
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- NULL for preset, user_id for user-added
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_viral_videos_niche ON viral_videos(niche);
CREATE INDEX IF NOT EXISTS idx_viral_videos_style ON viral_videos(hook_style);
CREATE INDEX IF NOT EXISTS idx_viral_videos_pattern ON viral_videos(hook_pattern);
CREATE INDEX IF NOT EXISTS idx_viral_videos_views ON viral_videos(view_count DESC);
CREATE INDEX IF NOT EXISTS idx_viral_videos_preset ON viral_videos(is_preset);
CREATE INDEX IF NOT EXISTS idx_viral_videos_user ON viral_videos(user_id);

-- ============================================
-- UPDATE HOOKS TABLE
-- Link hooks back to source videos
-- ============================================

ALTER TABLE hooks ADD COLUMN IF NOT EXISTS source_video_id UUID REFERENCES viral_videos(id) ON DELETE SET NULL;
ALTER TABLE hooks ADD COLUMN IF NOT EXISTS is_preset BOOLEAN DEFAULT false;
ALTER TABLE hooks ADD COLUMN IF NOT EXISTS hook_pattern VARCHAR(100);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE viral_videos ENABLE ROW LEVEL SECURITY;

-- Anyone can read preset videos (is_preset = true)
CREATE POLICY "Anyone can read preset viral videos" ON viral_videos
  FOR SELECT USING (is_preset = true);

-- Users can read their own added videos
CREATE POLICY "Users can read own viral videos" ON viral_videos
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own videos
CREATE POLICY "Users can insert viral videos" ON viral_videos
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- ============================================
-- NICHE STATISTICS VIEW
-- ============================================

CREATE OR REPLACE VIEW niche_stats AS
SELECT 
  niche,
  COUNT(*) as video_count,
  AVG(view_count) as avg_views,
  MAX(view_count) as max_views,
  COUNT(DISTINCT hook_style) as style_variety,
  COUNT(DISTINCT hook_pattern) as pattern_variety
FROM viral_videos
WHERE is_preset = true
GROUP BY niche
ORDER BY video_count DESC;

-- ============================================
-- HOOK PATTERNS TABLE (Reference)
-- ============================================

CREATE TABLE IF NOT EXISTS hook_patterns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  template TEXT NOT NULL,
  description TEXT,
  example TEXT,
  effectiveness_score DECIMAL(3,2), -- 0.00 to 1.00
  best_niches TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert common patterns
INSERT INTO hook_patterns (name, template, description, example, effectiveness_score, best_niches) VALUES
  ('curiosity_gap', 'The [thing] that [surprising outcome]', 'Creates information gap viewer needs to close', 'The exercise that doctors say you should NEVER do', 0.85, ARRAY['fitness', 'health', 'business']),
  ('personal_story', 'I [did action] and [unexpected result]', 'Personal narrative that draws viewer in', 'I quit my 6-figure job and here''s what happened', 0.80, ARRAY['business', 'lifestyle', 'self-improvement']),
  ('pov_relatable', 'POV: [relatable situation]', 'First-person perspective viewer relates to', 'POV: when you finally hit your protein goal', 0.75, ARRAY['comedy', 'lifestyle', 'fitness']),
  ('stop_doing', 'Stop [common action] if you want [goal]', 'Challenges common behavior', 'Stop stretching before workouts if you want to get stronger', 0.82, ARRAY['fitness', 'productivity', 'self-improvement']),
  ('hidden_truth', 'Nobody talks about [hidden truth]', 'Reveals insider information', 'Nobody talks about the dark side of entrepreneurship', 0.78, ARRAY['business', 'career', 'education']),
  ('authority_secret', '[Authority] don''t want you to know', 'Positions info as suppressed knowledge', 'Dermatologists don''t want you to know this', 0.70, ARRAY['beauty', 'health', 'finance']),
  ('simple_change', 'This [simple thing] changed my [life aspect]', 'Simple solution to complex problem', 'This 5-minute routine changed my productivity forever', 0.83, ARRAY['productivity', 'lifestyle', 'self-improvement']),
  ('reason_why', 'The reason you''re not [achieving goal]', 'Addresses failure directly', 'The reason you''re not losing weight has nothing to do with diet', 0.79, ARRAY['fitness', 'business', 'dating']),
  ('discovery', 'I found out why [mystery/problem]', 'Promises revelation', 'I finally found out why I was always tired', 0.76, ARRAY['health', 'science', 'psychology']),
  ('expert_secret', 'What [experts] won''t tell you about [topic]', 'Insider knowledge angle', 'What real estate agents won''t tell you about buying a house', 0.74, ARRAY['real-estate', 'finance', 'career']),
  ('number_list', '[Number] [things] that will [outcome]', 'Numbered list format', '5 habits that made me a millionaire', 0.77, ARRAY['business', 'self-improvement', 'productivity']),
  ('transformation', 'How I went from [bad state] to [good state]', 'Before/after journey', 'How I went from broke to $10K/month in 90 days', 0.81, ARRAY['business', 'fitness', 'self-improvement']),
  ('controversial_take', '[Unpopular opinion] and here''s why', 'Hot take that sparks engagement', 'College is a scam and here''s why', 0.72, ARRAY['education', 'career', 'finance']),
  ('warning', 'Don''t [action] until you see this', 'Urgency and warning combined', 'Don''t buy an iPhone 16 until you see this', 0.73, ARRAY['tech', 'finance', 'shopping']),
  ('myth_bust', 'Everyone thinks [myth] but actually [truth]', 'Corrects common misconception', 'Everyone thinks cardio burns the most fat but actually...', 0.78, ARRAY['fitness', 'science', 'education'])
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- HOOK STYLES TABLE (Reference)
-- ============================================

CREATE TABLE IF NOT EXISTS hook_styles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  key_elements TEXT[],
  tone TEXT,
  best_for TEXT[],
  avoid_for TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO hook_styles (name, description, key_elements, tone, best_for, avoid_for) VALUES
  ('curiosity', 'Creates an information gap that compels viewer to watch', ARRAY['incomplete information', 'surprising claim', 'mystery element'], 'intriguing, teasing', ARRAY['education', 'science', 'business'], ARRAY['comedy', 'emotional content']),
  ('story', 'Opens a narrative thread the viewer wants to follow', ARRAY['personal element', 'journey implied', 'emotional stake'], 'personal, engaging', ARRAY['lifestyle', 'transformation', 'business'], ARRAY['technical how-to']),
  ('controversy', 'Challenges conventional wisdom or popular opinion', ARRAY['contrarian claim', 'authority challenge', 'bold statement'], 'provocative, confident', ARRAY['education', 'fitness', 'business'], ARRAY['sensitive topics', 'beginner audiences']),
  ('relatable', 'Connects through shared experiences', ARRAY['POV format', 'common scenario', 'emotional truth'], 'friendly, empathetic', ARRAY['comedy', 'lifestyle', 'mental health'], ARRAY['expert positioning']),
  ('tips', 'Promises actionable value upfront', ARRAY['clear benefit', 'numbered/structured', 'practical'], 'helpful, direct', ARRAY['tech', 'productivity', 'cooking'], ARRAY['entertainment focus']),
  ('transformation', 'Shows dramatic change or progress', ARRAY['before/after', 'journey element', 'proof'], 'inspiring, evidence-based', ARRAY['fitness', 'business', 'self-improvement'], ARRAY['instant results claims']),
  ('challenge', 'Directly engages or calls out the viewer', ARRAY['direct address', 'competitive element', 'action prompt'], 'energetic, direct', ARRAY['fitness', 'motivation', 'gaming'], ARRAY['passive audiences']),
  ('shock', 'Opens with unexpected or surprising element', ARRAY['unexpected twist', 'pattern interrupt', 'emotional jolt'], 'dramatic, attention-grabbing', ARRAY['comedy', 'science', 'news'], ARRAY['trust-building content']),
  ('list', 'Structures content as numbered items', ARRAY['number in hook', 'clear quantity', 'organized promise'], 'organized, scannable', ARRAY['productivity', 'tips', 'rankings'], ARRAY['emotional storytelling']),
  ('question', 'Opens with a direct question to the viewer', ARRAY['direct question', 'viewer involvement', 'thought prompt'], 'conversational, engaging', ARRAY['education', 'philosophy', 'self-improvement'], ARRAY['urgent/breaking content'])
ON CONFLICT (name) DO NOTHING;
