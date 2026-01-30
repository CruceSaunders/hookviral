// Comprehensive hook library with examples for all 50 niches

export interface LibraryHook {
  id: string;
  text: string;
  niche: string;
  style: string;
  saves: number;
}

// Generate random saves count
const randSaves = () => Math.floor(Math.random() * 5000) + 500;

export const hookLibrary: LibraryHook[] = [
  // HEALTH & WELLNESS
  // Fitness
  { id: "f1", text: "The exercise scientists say you should NEVER do", niche: "fitness", style: "curiosity", saves: randSaves() },
  { id: "f2", text: "I lost 30 pounds and didn't change my diet once", niche: "fitness", style: "story", saves: randSaves() },
  { id: "f3", text: "The gym hack that doubled my gains in 4 weeks", niche: "fitness", style: "proof", saves: randSaves() },
  { id: "f4", text: "Stop doing this exercise immediately", niche: "fitness", style: "controversy", saves: randSaves() },
  { id: "f5", text: "Personal trainers HATE when I share this", niche: "fitness", style: "controversy", saves: randSaves() },
  
  // Weight Loss
  { id: "wl1", text: "Why the scale lies about your progress", niche: "weight-loss", style: "curiosity", saves: randSaves() },
  { id: "wl2", text: "I broke my plateau with this one change", niche: "weight-loss", style: "story", saves: randSaves() },
  { id: "wl3", text: "The calorie myth keeping you stuck", niche: "weight-loss", style: "controversy", saves: randSaves() },
  { id: "wl4", text: "50 pounds down. Here's what actually worked.", niche: "weight-loss", style: "proof", saves: randSaves() },
  
  // Nutrition
  { id: "n1", text: "The 'healthy' food that's making you tired", niche: "nutrition", style: "controversy", saves: randSaves() },
  { id: "n2", text: "What I eat in a day for energy", niche: "nutrition", style: "story", saves: randSaves() },
  { id: "n3", text: "Your gut is lying to you about cravings", niche: "nutrition", style: "curiosity", saves: randSaves() },
  { id: "n4", text: "I fixed my bloating by removing this one thing", niche: "nutrition", style: "story", saves: randSaves() },
  
  // Mental Health
  { id: "mh1", text: "The anxiety trick therapists don't tell you", niche: "mental-health", style: "curiosity", saves: randSaves() },
  { id: "mh2", text: "How I regulate my nervous system in 2 minutes", niche: "mental-health", style: "story", saves: randSaves() },
  { id: "mh3", text: "Why 'positive vibes only' is toxic", niche: "mental-health", style: "controversy", saves: randSaves() },
  { id: "mh4", text: "Day 100 of healing. This is what changed.", niche: "mental-health", style: "story", saves: randSaves() },
  
  // Skincare
  { id: "sk1", text: "The ingredient destroying your skin barrier", niche: "skincare", style: "controversy", saves: randSaves() },
  { id: "sk2", text: "Glass skin in 30 days. Here's how.", niche: "skincare", style: "proof", saves: randSaves() },
  { id: "sk3", text: "Dermatologists won't tell you this", niche: "skincare", style: "curiosity", saves: randSaves() },
  { id: "sk4", text: "I fixed my acne by doing LESS", niche: "skincare", style: "story", saves: randSaves() },
  
  // Haircare
  { id: "hc1", text: "Why your hair isn't growing", niche: "haircare", style: "curiosity", saves: randSaves() },
  { id: "hc2", text: "The shampoo ingredient causing hair loss", niche: "haircare", style: "controversy", saves: randSaves() },
  { id: "hc3", text: "1 year hair growth transformation", niche: "haircare", style: "proof", saves: randSaves() },
  
  // Wellness
  { id: "w1", text: "The morning routine that changed my life", niche: "wellness", style: "story", saves: randSaves() },
  { id: "w2", text: "Why your wellness routine is backfiring", niche: "wellness", style: "controversy", saves: randSaves() },
  { id: "w3", text: "The habit that costs $0 and adds years to your life", niche: "wellness", style: "curiosity", saves: randSaves() },
  
  // Sleep
  { id: "sl1", text: "Why you wake up tired every day", niche: "sleep", style: "curiosity", saves: randSaves() },
  { id: "sl2", text: "The sleep hack that changed my life", niche: "sleep", style: "story", saves: randSaves() },
  { id: "sl3", text: "What happens when you fix your circadian rhythm", niche: "sleep", style: "story", saves: randSaves() },

  // MONEY & BUSINESS
  // Business
  { id: "b1", text: "I made $100K in 30 days. Here's how.", niche: "business", style: "proof", saves: randSaves() },
  { id: "b2", text: "The business mistake that cost me everything", niche: "business", style: "story", saves: randSaves() },
  { id: "b3", text: "Why most businesses fail in year one", niche: "business", style: "curiosity", saves: randSaves() },
  { id: "b4", text: "The email that landed me a $50K client", niche: "business", style: "story", saves: randSaves() },
  { id: "b5", text: "Rich people do THIS differently", niche: "business", style: "curiosity", saves: randSaves() },
  
  // Finance
  { id: "fi1", text: "The money rule that made me rich", niche: "finance", style: "story", saves: randSaves() },
  { id: "fi2", text: "Why budgeting apps are making you broke", niche: "finance", style: "controversy", saves: randSaves() },
  { id: "fi3", text: "$0 to $100K saved. The method.", niche: "finance", style: "proof", saves: randSaves() },
  { id: "fi4", text: "Banks don't want you to know this", niche: "finance", style: "curiosity", saves: randSaves() },
  
  // Investing
  { id: "inv1", text: "The investment that changed my portfolio", niche: "investing", style: "story", saves: randSaves() },
  { id: "inv2", text: "Why index funds are overrated", niche: "investing", style: "controversy", saves: randSaves() },
  { id: "inv3", text: "What $1000 invested 10 years ago looks like", niche: "investing", style: "curiosity", saves: randSaves() },
  
  // Side Hustles
  { id: "sh1", text: "The side hustle that pays more than my job", niche: "side-hustles", style: "proof", saves: randSaves() },
  { id: "sh2", text: "$5K/month side hustle. No experience needed.", niche: "side-hustles", style: "proof", saves: randSaves() },
  { id: "sh3", text: "Why most side hustles fail", niche: "side-hustles", style: "curiosity", saves: randSaves() },
  
  // Career
  { id: "ca1", text: "The negotiation trick that doubled my salary", niche: "career", style: "story", saves: randSaves() },
  { id: "ca2", text: "Why you're not getting promoted", niche: "career", style: "curiosity", saves: randSaves() },
  { id: "ca3", text: "I got 10 job offers in one week. Here's how.", niche: "career", style: "proof", saves: randSaves() },
  
  // Real Estate
  { id: "re1", text: "How I bought my first house at 23", niche: "real-estate", style: "story", saves: randSaves() },
  { id: "re2", text: "The housing market truth nobody talks about", niche: "real-estate", style: "controversy", saves: randSaves() },
  { id: "re3", text: "Passive income from real estate. The method.", niche: "real-estate", style: "proof", saves: randSaves() },
  
  // E-commerce
  { id: "ec1", text: "$10K/month store. No inventory.", niche: "ecommerce", style: "proof", saves: randSaves() },
  { id: "ec2", text: "Why your store isn't converting", niche: "ecommerce", style: "curiosity", saves: randSaves() },
  { id: "ec3", text: "The product that sells itself", niche: "ecommerce", style: "story", saves: randSaves() },
  
  // Crypto
  { id: "cr1", text: "The crypto mistake that cost me $50K", niche: "crypto", style: "story", saves: randSaves() },
  { id: "cr2", text: "Why this coin is about to explode", niche: "crypto", style: "curiosity", saves: randSaves() },
  { id: "cr3", text: "I turned $1K into $100K. Here's how.", niche: "crypto", style: "proof", saves: randSaves() },

  // LIFESTYLE
  // Lifestyle
  { id: "lf1", text: "The habit that changed my entire life", niche: "lifestyle", style: "story", saves: randSaves() },
  { id: "lf2", text: "A day in my life making $X/month", niche: "lifestyle", style: "story", saves: randSaves() },
  { id: "lf3", text: "Why I wake up at 5AM (and you should too)", niche: "lifestyle", style: "controversy", saves: randSaves() },
  
  // Travel
  { id: "tr1", text: "The country nobody talks about", niche: "travel", style: "curiosity", saves: randSaves() },
  { id: "tr2", text: "Travel hack that saved me $5000", niche: "travel", style: "proof", saves: randSaves() },
  { id: "tr3", text: "The tourist trap you should avoid", niche: "travel", style: "controversy", saves: randSaves() },
  
  // Food
  { id: "fo1", text: "The ingredient restaurants don't want you to know", niche: "food", style: "curiosity", saves: randSaves() },
  { id: "fo2", text: "Why your food tastes bland", niche: "food", style: "curiosity", saves: randSaves() },
  { id: "fo3", text: "5 minute meal that tastes like a chef made it", niche: "food", style: "proof", saves: randSaves() },
  
  // Fashion
  { id: "fa1", text: "The outfit formula that always works", niche: "fashion", style: "proof", saves: randSaves() },
  { id: "fa2", text: "Why expensive clothes aren't worth it", niche: "fashion", style: "controversy", saves: randSaves() },
  { id: "fa3", text: "I built a wardrobe for $500. Here's how.", niche: "fashion", style: "proof", saves: randSaves() },
  
  // Beauty
  { id: "be1", text: "The makeup trick that changed my face", niche: "beauty", style: "story", saves: randSaves() },
  { id: "be2", text: "Why your makeup never lasts", niche: "beauty", style: "curiosity", saves: randSaves() },
  { id: "be3", text: "The $5 product that replaced my entire routine", niche: "beauty", style: "proof", saves: randSaves() },
  
  // Home
  { id: "ho1", text: "The organizing hack that changed my home", niche: "home", style: "story", saves: randSaves() },
  { id: "ho2", text: "Why your space feels cluttered", niche: "home", style: "curiosity", saves: randSaves() },
  { id: "ho3", text: "Room transformation with $100", niche: "home", style: "proof", saves: randSaves() },
  
  // Minimalism
  { id: "mi1", text: "I got rid of 90% of my stuff. Best decision.", niche: "minimalism", style: "story", saves: randSaves() },
  { id: "mi2", text: "Why minimalism is harder than you think", niche: "minimalism", style: "controversy", saves: randSaves() },
  { id: "mi3", text: "The things minimalists never declutter", niche: "minimalism", style: "curiosity", saves: randSaves() },
  
  // Luxury
  { id: "lu1", text: "Is this luxury bag worth $5000?", niche: "luxury", style: "curiosity", saves: randSaves() },
  { id: "lu2", text: "The luxury brand that's declining in quality", niche: "luxury", style: "controversy", saves: randSaves() },
  { id: "lu3", text: "Rich people don't buy this", niche: "luxury", style: "curiosity", saves: randSaves() },

  // ENTERTAINMENT
  // Comedy
  { id: "co1", text: "POV: You're the only one who didn't get the memo", niche: "comedy", style: "story", saves: randSaves() },
  { id: "co2", text: "Tell me you're broke without telling me", niche: "comedy", style: "story", saves: randSaves() },
  { id: "co3", text: "When your mom says 'we have food at home'", niche: "comedy", style: "story", saves: randSaves() },
  { id: "co4", text: "My last brain cell trying to adult", niche: "comedy", style: "story", saves: randSaves() },
  
  // Gaming
  { id: "ga1", text: "The game mechanic nobody talks about", niche: "gaming", style: "curiosity", saves: randSaves() },
  { id: "ga2", text: "Why you're hardstuck (the real reason)", niche: "gaming", style: "controversy", saves: randSaves() },
  { id: "ga3", text: "The setting that changed my gameplay", niche: "gaming", style: "story", saves: randSaves() },
  
  // Movies
  { id: "mo1", text: "The movie detail you definitely missed", niche: "movies", style: "curiosity", saves: randSaves() },
  { id: "mo2", text: "Why this 'masterpiece' is actually overrated", niche: "movies", style: "controversy", saves: randSaves() },
  { id: "mo3", text: "The best movie nobody's talking about", niche: "movies", style: "curiosity", saves: randSaves() },
  
  // Music
  { id: "mu1", text: "The artist who doesn't write their songs", niche: "music", style: "controversy", saves: randSaves() },
  { id: "mu2", text: "Why this song is a masterpiece", niche: "music", style: "story", saves: randSaves() },
  { id: "mu3", text: "The sample you never noticed", niche: "music", style: "curiosity", saves: randSaves() },
  
  // Sports
  { id: "sp1", text: "The hot take nobody wants to hear", niche: "sports", style: "controversy", saves: randSaves() },
  { id: "sp2", text: "Why this player is overrated", niche: "sports", style: "controversy", saves: randSaves() },
  { id: "sp3", text: "The stat that proves everything", niche: "sports", style: "proof", saves: randSaves() },
  
  // Celebrity
  { id: "ce1", text: "The drama nobody's talking about", niche: "celebrity", style: "curiosity", saves: randSaves() },
  { id: "ce2", text: "Why this celebrity is problematic", niche: "celebrity", style: "controversy", saves: randSaves() },
  { id: "ce3", text: "The PR relationship that's fake", niche: "celebrity", style: "controversy", saves: randSaves() },
  
  // ASMR
  { id: "as1", text: "The trigger that gives instant tingles", niche: "asmr", style: "curiosity", saves: randSaves() },
  { id: "as2", text: "New ASMR trigger I discovered", niche: "asmr", style: "story", saves: randSaves() },

  // EDUCATION
  // Education
  { id: "ed1", text: "The fact that changed how I see the world", niche: "education", style: "curiosity", saves: randSaves() },
  { id: "ed2", text: "Your teachers lied to you about this", niche: "education", style: "controversy", saves: randSaves() },
  { id: "ed3", text: "What they don't teach in school about money", niche: "education", style: "controversy", saves: randSaves() },
  
  // History
  { id: "hi1", text: "The historical figure who was actually terrible", niche: "history", style: "controversy", saves: randSaves() },
  { id: "hi2", text: "The event history books got wrong", niche: "history", style: "curiosity", saves: randSaves() },
  { id: "hi3", text: "What really happened at this historical event", niche: "history", style: "curiosity", saves: randSaves() },
  
  // Science
  { id: "sc1", text: "The science experiment that changed everything", niche: "science", style: "story", saves: randSaves() },
  { id: "sc2", text: "The 'fact' that's actually false", niche: "science", style: "controversy", saves: randSaves() },
  { id: "sc3", text: "Mind-blowing science in 60 seconds", niche: "science", style: "curiosity", saves: randSaves() },
  
  // Languages
  { id: "la1", text: "The mistake keeping you from fluency", niche: "languages", style: "curiosity", saves: randSaves() },
  { id: "la2", text: "How I learned Spanish in 3 months", niche: "languages", style: "story", saves: randSaves() },
  { id: "la3", text: "Why language apps don't work", niche: "languages", style: "controversy", saves: randSaves() },
  
  // Study Tips
  { id: "st1", text: "The study method that got me into Harvard", niche: "study-tips", style: "proof", saves: randSaves() },
  { id: "st2", text: "Why highlighting is useless", niche: "study-tips", style: "controversy", saves: randSaves() },
  { id: "st3", text: "I went from C's to A's with this method", niche: "study-tips", style: "proof", saves: randSaves() },
  
  // College
  { id: "cl1", text: "College advice I wish I knew as a freshman", niche: "college", style: "story", saves: randSaves() },
  { id: "cl2", text: "Why your major doesn't matter", niche: "college", style: "controversy", saves: randSaves() },
  { id: "cl3", text: "How to actually survive college", niche: "college", style: "story", saves: randSaves() },

  // CREATIVE
  // Art
  { id: "ar1", text: "The technique that transformed my art", niche: "art", style: "story", saves: randSaves() },
  { id: "ar2", text: "Why your art looks amateur", niche: "art", style: "curiosity", saves: randSaves() },
  { id: "ar3", text: "0 to 100 art transformation", niche: "art", style: "proof", saves: randSaves() },
  
  // Photography
  { id: "ph1", text: "The camera setting pros use", niche: "photography", style: "curiosity", saves: randSaves() },
  { id: "ph2", text: "Why expensive gear doesn't matter", niche: "photography", style: "controversy", saves: randSaves() },
  { id: "ph3", text: "Edit like a pro in 5 minutes", niche: "photography", style: "proof", saves: randSaves() },
  
  // DIY
  { id: "di1", text: "The DIY hack that actually works", niche: "diy", style: "proof", saves: randSaves() },
  { id: "di2", text: "Why Pinterest DIYs fail", niche: "diy", style: "curiosity", saves: randSaves() },
  { id: "di3", text: "$20 room transformation", niche: "diy", style: "proof", saves: randSaves() },
  
  // Writing
  { id: "wr1", text: "The writing trick that changed everything", niche: "writing", style: "story", saves: randSaves() },
  { id: "wr2", text: "Why 'write every day' is bad advice", niche: "writing", style: "controversy", saves: randSaves() },
  { id: "wr3", text: "From 0 readers to 100K", niche: "writing", style: "proof", saves: randSaves() },
  
  // Content Creation
  { id: "cc1", text: "The algorithm hack nobody talks about", niche: "content-creation", style: "curiosity", saves: randSaves() },
  { id: "cc2", text: "Why posting more doesn't work", niche: "content-creation", style: "controversy", saves: randSaves() },
  { id: "cc3", text: "0 to 100K followers. Here's how.", niche: "content-creation", style: "proof", saves: randSaves() },

  // RELATIONSHIPS
  // Dating
  { id: "da1", text: "The red flag nobody talks about", niche: "dating", style: "curiosity", saves: randSaves() },
  { id: "da2", text: "Why they're not texting back", niche: "dating", style: "curiosity", saves: randSaves() },
  { id: "da3", text: "The dating advice keeping you single", niche: "dating", style: "controversy", saves: randSaves() },
  
  // Relationships
  { id: "rl1", text: "The thing that saved my relationship", niche: "relationships", style: "story", saves: randSaves() },
  { id: "rl2", text: "Why 'communicate more' doesn't work", niche: "relationships", style: "controversy", saves: randSaves() },
  { id: "rl3", text: "10 years together. This is what I learned.", niche: "relationships", style: "story", saves: randSaves() },
  
  // Parenting
  { id: "pa1", text: "The parenting hack that changed bedtime", niche: "parenting", style: "story", saves: randSaves() },
  { id: "pa2", text: "Why gentle parenting isn't working", niche: "parenting", style: "controversy", saves: randSaves() },
  { id: "pa3", text: "What I wish I knew before having kids", niche: "parenting", style: "story", saves: randSaves() },
  
  // Family
  { id: "fm1", text: "The boundary that saved my family", niche: "family", style: "story", saves: randSaves() },
  { id: "fm2", text: "Toxic family dynamics nobody talks about", niche: "family", style: "curiosity", saves: randSaves() },
  
  // Friendship
  { id: "fr1", text: "How I made friends as an adult", niche: "friendship", style: "story", saves: randSaves() },
  { id: "fr2", text: "The friend red flag nobody sees", niche: "friendship", style: "curiosity", saves: randSaves() },

  // TECH
  // Tech
  { id: "te1", text: "The app that changed my productivity", niche: "tech", style: "story", saves: randSaves() },
  { id: "te2", text: "Why that popular app is overrated", niche: "tech", style: "controversy", saves: randSaves() },
  { id: "te3", text: "The setting you need to change right now", niche: "tech", style: "curiosity", saves: randSaves() },
  
  // AI
  { id: "ai1", text: "The AI tool that's replacing jobs", niche: "ai", style: "curiosity", saves: randSaves() },
  { id: "ai2", text: "Why your AI prompts don't work", niche: "ai", style: "curiosity", saves: randSaves() },
  { id: "ai3", text: "What AI can do now is insane", niche: "ai", style: "shock", saves: randSaves() },
  
  // Apps
  { id: "ap1", text: "The hidden iPhone feature you need", niche: "apps", style: "curiosity", saves: randSaves() },
  { id: "ap2", text: "Apps that are actually worth paying for", niche: "apps", style: "proof", saves: randSaves() },
  { id: "ap3", text: "Delete these apps immediately", niche: "apps", style: "controversy", saves: randSaves() },
  
  // Productivity
  { id: "pr1", text: "The system that 10x'd my output", niche: "productivity", style: "proof", saves: randSaves() },
  { id: "pr2", text: "Why productivity apps don't work", niche: "productivity", style: "controversy", saves: randSaves() },
  { id: "pr3", text: "I tried every productivity system. This won.", niche: "productivity", style: "story", saves: randSaves() },
  
  // Coding
  { id: "cd1", text: "I learned to code in 30 days. Here's how.", niche: "coding", style: "proof", saves: randSaves() },
  { id: "cd2", text: "Why tutorials don't teach you to code", niche: "coding", style: "controversy", saves: randSaves() },
  { id: "cd3", text: "The project that got me hired", niche: "coding", style: "story", saves: randSaves() },
];

// Get hooks by niche
export function getHooksByNiche(niche: string): LibraryHook[] {
  return hookLibrary.filter(h => h.niche === niche);
}

// Get all unique niches in library
export function getLibraryNiches(): string[] {
  return [...new Set(hookLibrary.map(h => h.niche))];
}

// Search hooks
export function searchHooks(query: string): LibraryHook[] {
  const lowerQuery = query.toLowerCase();
  return hookLibrary.filter(h => 
    h.text.toLowerCase().includes(lowerQuery) ||
    h.niche.toLowerCase().includes(lowerQuery) ||
    h.style.toLowerCase().includes(lowerQuery)
  );
}
