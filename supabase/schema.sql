-- HookViral Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  plan VARCHAR(20) DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'lifetime')),
  stripe_customer_id TEXT,
  generations_today INT DEFAULT 0,
  generations_total INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hooks library table
CREATE TABLE IF NOT EXISTS hooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL,
  niche VARCHAR(50) NOT NULL,
  style VARCHAR(50),
  source_url TEXT,
  view_count BIGINT,
  save_count INT DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User's saved hooks
CREATE TABLE IF NOT EXISTS saved_hooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  hook_id UUID REFERENCES hooks(id) ON DELETE SET NULL,
  custom_text TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generation history
CREATE TABLE IF NOT EXISTS generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  niche VARCHAR(50),
  style VARCHAR(50),
  hooks JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_hooks_niche ON hooks(niche);
CREATE INDEX IF NOT EXISTS idx_hooks_style ON hooks(style);
CREATE INDEX IF NOT EXISTS idx_saved_hooks_user ON saved_hooks(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_user ON generations(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_created ON generations(created_at DESC);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_hooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE hooks ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Saved hooks policies
CREATE POLICY "Users can view own saved hooks" ON saved_hooks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved hooks" ON saved_hooks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved hooks" ON saved_hooks
  FOR DELETE USING (auth.uid() = user_id);

-- Generations policies
CREATE POLICY "Users can view own generations" ON generations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generations" ON generations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Hooks library is public read
CREATE POLICY "Anyone can read hooks library" ON hooks
  FOR SELECT USING (true);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call function on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to reset daily generations (call via cron)
CREATE OR REPLACE FUNCTION reset_daily_generations()
RETURNS void AS $$
BEGIN
  UPDATE profiles SET generations_today = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment generation count
CREATE OR REPLACE FUNCTION increment_generation(user_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE profiles 
  SET 
    generations_today = generations_today + 1,
    generations_total = generations_total + 1,
    updated_at = NOW()
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
