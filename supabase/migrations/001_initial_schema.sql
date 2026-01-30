-- HookViral Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  name text,
  plan text DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'lifetime')),
  stripe_customer_id text,
  generations_today integer DEFAULT 0,
  generations_total integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Hooks library table (10,000+ hooks)
CREATE TABLE IF NOT EXISTS hooks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  text text NOT NULL UNIQUE,
  niche text NOT NULL,
  style text,
  source_url text,
  view_count bigint DEFAULT 0,
  save_count integer DEFAULT 0,
  tags text[],
  created_at timestamp with time zone DEFAULT now()
);

-- User saved hooks
CREATE TABLE IF NOT EXISTS saved_hooks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  hook_id uuid REFERENCES hooks(id) ON DELETE SET NULL,
  custom_text text, -- For hooks they generated, not from library
  notes text,
  created_at timestamp with time zone DEFAULT now()
);

-- Generation history
CREATE TABLE IF NOT EXISTS generations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  topic text NOT NULL,
  niche text,
  style text,
  hooks jsonb NOT NULL, -- Array of generated hooks
  created_at timestamp with time zone DEFAULT now()
);

-- Video analysis table (for Copy Viral Video feature)
CREATE TABLE IF NOT EXISTS video_analyses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  video_url text NOT NULL,
  platform text DEFAULT 'tiktok',
  -- Extracted metadata
  creator_username text,
  creator_followers text,
  view_count text,
  like_count text,
  comment_count text,
  share_count text,
  -- Analysis results
  hook_text text,
  script_breakdown jsonb,
  visual_breakdown jsonb,
  audio_analysis jsonb,
  replication_guide jsonb,
  -- Screenshots
  screenshot_urls text[], -- Array of screenshot URLs
  -- Status
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_message text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Scripts generated from hooks
CREATE TABLE IF NOT EXISTS scripts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  hook_text text NOT NULL,
  hook_id uuid REFERENCES hooks(id) ON DELETE SET NULL,
  niche text,
  duration text, -- 'short', 'medium', 'long'
  content_type text, -- 'hot-take', 'storytime', etc.
  -- Script sections
  hook_section text,
  context_section text,
  body_section text,
  twist_section text,
  cta_section text,
  full_script text,
  -- Tips
  speaking_tips text[],
  visual_suggestions text[],
  estimated_duration text,
  created_at timestamp with time zone DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS hooks_niche_idx ON hooks(niche);
CREATE INDEX IF NOT EXISTS hooks_style_idx ON hooks(style);
CREATE INDEX IF NOT EXISTS hooks_text_search_idx ON hooks USING gin(to_tsvector('english', text));
CREATE INDEX IF NOT EXISTS saved_hooks_user_idx ON saved_hooks(user_id);
CREATE INDEX IF NOT EXISTS generations_user_idx ON generations(user_id);
CREATE INDEX IF NOT EXISTS video_analyses_user_idx ON video_analyses(user_id);
CREATE INDEX IF NOT EXISTS scripts_user_idx ON scripts(user_id);

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_hooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE scripts ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only see/update their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Hooks: everyone can read, no one can modify directly
CREATE POLICY "Anyone can read hooks" ON hooks
  FOR SELECT USING (true);

-- Saved hooks: users can CRUD their own
CREATE POLICY "Users can manage own saved hooks" ON saved_hooks
  FOR ALL USING (auth.uid() = user_id);

-- Generations: users can CRUD their own
CREATE POLICY "Users can manage own generations" ON generations
  FOR ALL USING (auth.uid() = user_id);

-- Video analyses: users can CRUD their own
CREATE POLICY "Users can manage own video analyses" ON video_analyses
  FOR ALL USING (auth.uid() = user_id);

-- Scripts: users can CRUD their own
CREATE POLICY "Users can manage own scripts" ON scripts
  FOR ALL USING (auth.uid() = user_id);

-- Function to update save_count when hooks are saved
CREATE OR REPLACE FUNCTION increment_hook_saves()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.hook_id IS NOT NULL THEN
    UPDATE hooks SET save_count = save_count + 1 WHERE id = NEW.hook_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_hook_saved
  AFTER INSERT ON saved_hooks
  FOR EACH ROW
  EXECUTE FUNCTION increment_hook_saves();

-- Function to decrement save_count when hooks are unsaved
CREATE OR REPLACE FUNCTION decrement_hook_saves()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.hook_id IS NOT NULL THEN
    UPDATE hooks SET save_count = GREATEST(0, save_count - 1) WHERE id = OLD.hook_id;
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_hook_unsaved
  AFTER DELETE ON saved_hooks
  FOR EACH ROW
  EXECUTE FUNCTION decrement_hook_saves();

-- Function to reset daily generation counts (run via cron)
CREATE OR REPLACE FUNCTION reset_daily_generations()
RETURNS void AS $$
BEGIN
  UPDATE profiles SET generations_today = 0;
END;
$$ LANGUAGE plpgsql;
