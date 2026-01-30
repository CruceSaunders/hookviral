// Comprehensive niche system for HookViral
// 50 niches covering all major content categories on TikTok, Instagram, YouTube

export interface NicheInfo {
  id: string;
  name: string;
  emoji: string;
  category: NicheCategory;
  tip: string;
  defaultStyle: string;
  defaultSpice: number;
}

export type NicheCategory = 
  | "health"
  | "money"
  | "lifestyle"
  | "entertainment"
  | "education"
  | "creative"
  | "relationships"
  | "tech";

export const nicheCategories: Record<NicheCategory, { name: string; color: string }> = {
  health: { name: "Health & Wellness", color: "green" },
  money: { name: "Money & Career", color: "yellow" },
  lifestyle: { name: "Lifestyle", color: "purple" },
  entertainment: { name: "Entertainment", color: "pink" },
  education: { name: "Education", color: "blue" },
  creative: { name: "Creative", color: "orange" },
  relationships: { name: "Relationships", color: "red" },
  tech: { name: "Tech & Digital", color: "cyan" },
};

export const niches: NicheInfo[] = [
  // HEALTH & WELLNESS (8)
  { id: "fitness", name: "Fitness", emoji: "💪", category: "health", tip: "Transformation stories and before/after hooks work best", defaultStyle: "story", defaultSpice: 5 },
  { id: "weight-loss", name: "Weight Loss", emoji: "⚖️", category: "health", tip: "Results-focused hooks with specific numbers perform well", defaultStyle: "proof", defaultSpice: 6 },
  { id: "nutrition", name: "Nutrition", emoji: "🥗", category: "health", tip: "Debunking diet myths gets massive engagement", defaultStyle: "controversy", defaultSpice: 5 },
  { id: "mental-health", name: "Mental Health", emoji: "🧠", category: "health", tip: "Relatable struggles and coping tips resonate deeply", defaultStyle: "story", defaultSpice: 3 },
  { id: "skincare", name: "Skincare", emoji: "✨", category: "health", tip: "Before/after and ingredient callouts hook viewers", defaultStyle: "shock", defaultSpice: 4 },
  { id: "haircare", name: "Haircare", emoji: "💇", category: "health", tip: "Transformation reveals and product failures engage", defaultStyle: "story", defaultSpice: 4 },
  { id: "wellness", name: "Wellness", emoji: "🧘", category: "health", tip: "Morning routines and habit hooks perform well", defaultStyle: "curiosity", defaultSpice: 3 },
  { id: "sleep", name: "Sleep", emoji: "😴", category: "health", tip: "Sleep hacks and bedtime routines get saves", defaultStyle: "curiosity", defaultSpice: 4 },

  // MONEY & CAREER (8)
  { id: "business", name: "Business", emoji: "💼", category: "money", tip: "Money numbers and contrarian takes perform well", defaultStyle: "curiosity", defaultSpice: 6 },
  { id: "finance", name: "Personal Finance", emoji: "💰", category: "money", tip: "Specific dollar amounts stop the scroll", defaultStyle: "proof", defaultSpice: 5 },
  { id: "investing", name: "Investing", emoji: "📈", category: "money", tip: "Hot takes on stocks/crypto drive comments", defaultStyle: "controversy", defaultSpice: 7 },
  { id: "side-hustles", name: "Side Hustles", emoji: "🚀", category: "money", tip: "Income proof and 'how I made $X' hooks crush", defaultStyle: "proof", defaultSpice: 6 },
  { id: "career", name: "Career", emoji: "👔", category: "money", tip: "Job interview tips and salary secrets engage", defaultStyle: "curiosity", defaultSpice: 5 },
  { id: "real-estate", name: "Real Estate", emoji: "🏠", category: "money", tip: "House tours and market hot takes perform", defaultStyle: "shock", defaultSpice: 5 },
  { id: "ecommerce", name: "E-commerce", emoji: "🛒", category: "money", tip: "Revenue screenshots and store reveals hook", defaultStyle: "proof", defaultSpice: 6 },
  { id: "crypto", name: "Crypto & Web3", emoji: "🪙", category: "money", tip: "Bold predictions and 'this coin' hooks engage", defaultStyle: "controversy", defaultSpice: 8 },

  // LIFESTYLE (8)
  { id: "lifestyle", name: "Lifestyle", emoji: "✨", category: "lifestyle", tip: "Day-in-the-life and routine hooks connect emotionally", defaultStyle: "story", defaultSpice: 4 },
  { id: "travel", name: "Travel", emoji: "✈️", category: "lifestyle", tip: "Hidden gems and travel mistakes create intrigue", defaultStyle: "story", defaultSpice: 4 },
  { id: "food", name: "Food", emoji: "🍕", category: "lifestyle", tip: "Unusual combinations and secret ingredients hook", defaultStyle: "shock", defaultSpice: 5 },
  { id: "fashion", name: "Fashion", emoji: "👗", category: "lifestyle", tip: "Outfit reveals and style hacks get saves", defaultStyle: "story", defaultSpice: 4 },
  { id: "beauty", name: "Beauty", emoji: "💄", category: "lifestyle", tip: "Hot takes on trends get massive engagement", defaultStyle: "controversy", defaultSpice: 5 },
  { id: "home", name: "Home & Decor", emoji: "🏡", category: "lifestyle", tip: "Room reveals and organization hacks perform", defaultStyle: "story", defaultSpice: 3 },
  { id: "minimalism", name: "Minimalism", emoji: "🪴", category: "lifestyle", tip: "Declutter journeys and 'I got rid of' hooks work", defaultStyle: "story", defaultSpice: 4 },
  { id: "luxury", name: "Luxury", emoji: "💎", category: "lifestyle", tip: "Price reveals and 'worth it?' hooks engage", defaultStyle: "shock", defaultSpice: 5 },

  // ENTERTAINMENT (7)
  { id: "comedy", name: "Comedy", emoji: "😂", category: "entertainment", tip: "The more unexpected, the better - push the envelope", defaultStyle: "shock", defaultSpice: 8 },
  { id: "gaming", name: "Gaming", emoji: "🎮", category: "entertainment", tip: "Hot takes on games drive comments", defaultStyle: "controversy", defaultSpice: 7 },
  { id: "movies", name: "Movies & TV", emoji: "🎬", category: "entertainment", tip: "Hot takes and 'unpopular opinion' hooks crush", defaultStyle: "controversy", defaultSpice: 6 },
  { id: "music", name: "Music", emoji: "🎵", category: "entertainment", tip: "Song rankings and artist takes drive debate", defaultStyle: "controversy", defaultSpice: 6 },
  { id: "sports", name: "Sports", emoji: "⚽", category: "entertainment", tip: "Hot takes and predictions get engagement", defaultStyle: "controversy", defaultSpice: 7 },
  { id: "celebrity", name: "Celebrity & Pop Culture", emoji: "⭐", category: "entertainment", tip: "Drama recaps and hot takes go viral", defaultStyle: "shock", defaultSpice: 7 },
  { id: "asmr", name: "ASMR", emoji: "🎧", category: "entertainment", tip: "Unique sounds and satisfying content hooks", defaultStyle: "curiosity", defaultSpice: 2 },

  // EDUCATION (6)
  { id: "education", name: "Education", emoji: "📚", category: "education", tip: "Challenge assumptions gently, make them curious", defaultStyle: "curiosity", defaultSpice: 3 },
  { id: "history", name: "History", emoji: "🏛️", category: "education", tip: "'Things you didn't know' hooks perform well", defaultStyle: "curiosity", defaultSpice: 4 },
  { id: "science", name: "Science", emoji: "🔬", category: "education", tip: "Mind-blowing facts and experiments engage", defaultStyle: "shock", defaultSpice: 4 },
  { id: "languages", name: "Languages", emoji: "🗣️", category: "education", tip: "Common mistakes and pronunciation hooks work", defaultStyle: "curiosity", defaultSpice: 3 },
  { id: "study-tips", name: "Study Tips", emoji: "📝", category: "education", tip: "Productivity hacks and 'how I studied' hooks", defaultStyle: "story", defaultSpice: 4 },
  { id: "college", name: "College Life", emoji: "🎓", category: "education", tip: "Relatable college content and advice hooks", defaultStyle: "story", defaultSpice: 5 },

  // CREATIVE (5)
  { id: "art", name: "Art", emoji: "🎨", category: "creative", tip: "Process reveals and 'how I made this' hooks", defaultStyle: "story", defaultSpice: 3 },
  { id: "photography", name: "Photography", emoji: "📸", category: "creative", tip: "Before/after edits and technique reveals", defaultStyle: "story", defaultSpice: 3 },
  { id: "diy", name: "DIY & Crafts", emoji: "🛠️", category: "creative", tip: "Transformation reveals and 'I made this' hooks", defaultStyle: "story", defaultSpice: 3 },
  { id: "writing", name: "Writing", emoji: "✍️", category: "creative", tip: "Writing tips and author journey hooks", defaultStyle: "curiosity", defaultSpice: 3 },
  { id: "content-creation", name: "Content Creation", emoji: "📱", category: "creative", tip: "Behind-the-scenes and growth tips engage", defaultStyle: "story", defaultSpice: 5 },

  // RELATIONSHIPS (5)
  { id: "dating", name: "Dating", emoji: "💕", category: "relationships", tip: "Red flags and dating advice get engagement", defaultStyle: "controversy", defaultSpice: 6 },
  { id: "relationships", name: "Relationships", emoji: "💑", category: "relationships", tip: "Couple content and advice hooks perform", defaultStyle: "story", defaultSpice: 5 },
  { id: "parenting", name: "Parenting", emoji: "👶", category: "relationships", tip: "Relatable parenting moments and tips", defaultStyle: "story", defaultSpice: 4 },
  { id: "family", name: "Family", emoji: "👨‍👩‍👧", category: "relationships", tip: "Family dynamics and relatable moments", defaultStyle: "story", defaultSpice: 3 },
  { id: "friendship", name: "Friendship", emoji: "🤝", category: "relationships", tip: "Friend group content and advice hooks", defaultStyle: "story", defaultSpice: 4 },

  // TECH & DIGITAL (5)
  { id: "tech", name: "Tech", emoji: "🚀", category: "tech", tip: "Future predictions and hidden features perform", defaultStyle: "curiosity", defaultSpice: 5 },
  { id: "ai", name: "AI & Tools", emoji: "🤖", category: "tech", tip: "Tool reveals and 'AI can do this' hooks", defaultStyle: "shock", defaultSpice: 6 },
  { id: "apps", name: "Apps & Software", emoji: "📲", category: "tech", tip: "Hidden features and app reveals engage", defaultStyle: "curiosity", defaultSpice: 4 },
  { id: "productivity", name: "Productivity", emoji: "⚡", category: "tech", tip: "System reveals and efficiency hacks work", defaultStyle: "curiosity", defaultSpice: 4 },
  { id: "coding", name: "Coding", emoji: "💻", category: "tech", tip: "Project reveals and 'I built this' hooks", defaultStyle: "story", defaultSpice: 4 },
];

// Helper functions
export function getNicheById(id: string): NicheInfo | undefined {
  return niches.find(n => n.id === id);
}

export function getNichesByCategory(category: NicheCategory): NicheInfo[] {
  return niches.filter(n => n.category === category);
}

export function getAllNicheIds(): string[] {
  return niches.map(n => n.id);
}

export function getNichePresets(): Record<string, { style: string; spicy: number; emoji: string; tip: string }> {
  const presets: Record<string, { style: string; spicy: number; emoji: string; tip: string }> = {};
  for (const niche of niches) {
    presets[niche.name] = {
      style: niche.defaultStyle,
      spicy: niche.defaultSpice,
      emoji: niche.emoji,
      tip: niche.tip,
    };
  }
  return presets;
}
