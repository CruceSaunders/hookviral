// Niche profiles for AI hook generation
// Maps to the 50+ niches in niches.ts

export interface NicheProfile {
  id: string;
  name: string;
  vocabulary: string[];
  painPoints: string[];
  desires: string[];
  insiderTerms: string[];
  spiceExamples: {
    mild: string;
    medium: string;
    hot: string;
    extreme: string;
  };
}

// Extended niche profiles for AI generation
export const nicheProfiles: Record<string, NicheProfile> = {
  // HEALTH & FITNESS
  fitness: {
    id: "fitness",
    name: "Fitness",
    vocabulary: ["gains", "PR", "bulk", "cut", "macros", "pump", "reps", "progressive overload", "compound", "TDEE"],
    painPoints: ["plateau", "no time", "genetics", "motivation", "no results", "skinny fat"],
    desires: ["visible abs", "strength", "energy", "confidence", "muscle definition"],
    insiderTerms: ["newbie gains", "mind-muscle connection", "time under tension", "deload"],
    spiceExamples: { mild: "Why your workouts feel harder", medium: "Your trainer got this wrong", hot: "The exercise destroying your gains", extreme: "Fitness influencers lie about this" }
  },
  "weight-loss": {
    id: "weight-loss",
    name: "Weight Loss",
    vocabulary: ["deficit", "metabolism", "plateau", "body comp", "sustainable", "tracking"],
    painPoints: ["yo-yo dieting", "slow metabolism", "cravings", "motivation", "plateau"],
    desires: ["sustainable loss", "confidence", "energy", "fitting clothes", "health"],
    insiderTerms: ["NEAT", "reverse diet", "maintenance calories", "set point"],
    spiceExamples: { mild: "Why the scale isn't moving", medium: "The diet mistake everyone makes", hot: "Why calorie counting fails", extreme: "The weight loss industry is lying" }
  },
  nutrition: {
    id: "nutrition",
    name: "Nutrition",
    vocabulary: ["macros", "micronutrients", "whole foods", "processed", "gut health", "inflammation"],
    painPoints: ["conflicting advice", "expensive", "time consuming", "cravings"],
    desires: ["energy", "clarity", "longevity", "performance", "gut health"],
    insiderTerms: ["bioavailability", "nutrient timing", "glycemic index", "satiety"],
    spiceExamples: { mild: "This food is actually healthy", medium: "Why your 'healthy' diet isn't", hot: "The superfood that's overhyped", extreme: "Nutritionists won't tell you this" }
  },
  "mental-health": {
    id: "mental-health",
    name: "Mental Health",
    vocabulary: ["anxiety", "boundaries", "healing", "self-care", "therapy", "mindfulness"],
    painPoints: ["overwhelm", "burnout", "loneliness", "stigma", "not knowing where to start"],
    desires: ["peace", "stability", "connection", "self-acceptance", "clarity"],
    insiderTerms: ["nervous system regulation", "inner child", "attachment style", "somatic"],
    spiceExamples: { mild: "A small change that helped my anxiety", medium: "Why self-care isn't working", hot: "The toxic positivity problem", extreme: "What therapists don't tell you" }
  },
  skincare: {
    id: "skincare",
    name: "Skincare",
    vocabulary: ["routine", "glow", "texture", "hydration", "SPF", "retinol", "serum", "barrier"],
    painPoints: ["acne", "aging", "dullness", "breakouts", "sensitivity"],
    desires: ["glass skin", "clear skin", "youthful", "radiant", "confidence"],
    insiderTerms: ["skin cycling", "double cleanse", "moisture barrier", "purging"],
    spiceExamples: { mild: "Your skincare order might be wrong", medium: "Why expensive products fail", hot: "The ingredient ruining your skin", extreme: "Dermatologists won't tell you this" }
  },
  haircare: {
    id: "haircare",
    name: "Haircare",
    vocabulary: ["growth", "damage", "hydration", "scalp health", "protein", "porosity"],
    painPoints: ["hair loss", "damage", "frizz", "thinning", "breakage"],
    desires: ["thick hair", "growth", "shine", "volume", "healthy scalp"],
    insiderTerms: ["protein-moisture balance", "clarifying", "low porosity", "protective styling"],
    spiceExamples: { mild: "Why your hair isn't growing", medium: "The shampoo mistake you're making", hot: "This ingredient is damaging your hair", extreme: "Hair brands don't want you to know" }
  },
  wellness: {
    id: "wellness",
    name: "Wellness",
    vocabulary: ["routine", "habits", "balance", "holistic", "mindfulness", "self-care"],
    painPoints: ["burnout", "stress", "no time", "overwhelm", "inconsistency"],
    desires: ["peace", "energy", "balance", "longevity", "presence"],
    insiderTerms: ["circadian rhythm", "nervous system", "grounding", "breathwork"],
    spiceExamples: { mild: "A morning habit that changed everything", medium: "Why your wellness routine isn't working", hot: "The trend that's making you worse", extreme: "Wellness influencers are lying" }
  },
  sleep: {
    id: "sleep",
    name: "Sleep",
    vocabulary: ["REM", "deep sleep", "circadian", "melatonin", "sleep hygiene", "insomnia"],
    painPoints: ["can't fall asleep", "waking up tired", "racing thoughts", "inconsistent schedule"],
    desires: ["restful sleep", "energy", "recovery", "focus", "longevity"],
    insiderTerms: ["sleep debt", "adenosine", "sleep pressure", "chronotype"],
    spiceExamples: { mild: "Why you wake up tired", medium: "The sleep hack everyone ignores", hot: "This habit is destroying your sleep", extreme: "Sleep experts are wrong about this" }
  },

  // MONEY & BUSINESS
  business: {
    id: "business",
    name: "Business",
    vocabulary: ["revenue", "scaling", "leverage", "ROI", "conversion", "funnel", "MRR"],
    painPoints: ["burnout", "cash flow", "competition", "growth plateau", "pricing"],
    desires: ["freedom", "wealth", "impact", "automation", "recognition"],
    insiderTerms: ["product-market fit", "runway", "traction", "moat"],
    spiceExamples: { mild: "A business mistake I made for years", medium: "Why most businesses stay small", hot: "The lie about passive income", extreme: "Business gurus are scamming you" }
  },
  finance: {
    id: "finance",
    name: "Personal Finance",
    vocabulary: ["compound", "portfolio", "diversify", "index", "FIRE", "budget", "net worth"],
    painPoints: ["debt", "paycheck to paycheck", "inflation", "retirement fear"],
    desires: ["financial freedom", "wealth", "security", "early retirement"],
    insiderTerms: ["expense ratio", "dollar cost averaging", "tax loss harvesting"],
    spiceExamples: { mild: "A money habit that changed everything", medium: "Why budgeting apps don't work", hot: "The advice keeping you broke", extreme: "Banks profit when you do this" }
  },
  investing: {
    id: "investing",
    name: "Investing",
    vocabulary: ["portfolio", "diversification", "compound", "returns", "risk", "allocation"],
    painPoints: ["fear of losing", "not knowing where to start", "timing the market"],
    desires: ["wealth building", "passive income", "retirement", "financial freedom"],
    insiderTerms: ["alpha", "beta", "yield", "P/E ratio", "market cap"],
    spiceExamples: { mild: "Why I changed my portfolio", medium: "The investing mistake I see constantly", hot: "This popular strategy is broken", extreme: "Wall Street doesn't want you to know" }
  },
  "side-hustles": {
    id: "side-hustles",
    name: "Side Hustles",
    vocabulary: ["passive income", "scalable", "low startup", "online", "automation"],
    painPoints: ["no time", "no money to start", "scams", "saturation"],
    desires: ["extra income", "freedom", "quit job", "financial security"],
    insiderTerms: ["recurring revenue", "productized service", "arbitrage"],
    spiceExamples: { mild: "A side hustle that actually works", medium: "Why most side hustles fail", hot: "The side hustle nobody talks about", extreme: "Gurus won't share this one" }
  },
  career: {
    id: "career",
    name: "Career",
    vocabulary: ["promotion", "salary", "networking", "skills", "resume", "interview"],
    painPoints: ["stuck", "underpaid", "toxic boss", "burnout", "no growth"],
    desires: ["promotion", "better salary", "work-life balance", "fulfillment"],
    insiderTerms: ["comp band", "skip level", "PIP", "leverage"],
    spiceExamples: { mild: "How I got promoted", medium: "Why you're not getting raises", hot: "The career advice that's hurting you", extreme: "HR doesn't want you to know this" }
  },
  "real-estate": {
    id: "real-estate",
    name: "Real Estate",
    vocabulary: ["appreciation", "cash flow", "leverage", "equity", "mortgage", "cap rate"],
    painPoints: ["high prices", "competition", "down payment", "market timing"],
    desires: ["passive income", "wealth building", "financial freedom"],
    insiderTerms: ["BRRRR", "house hacking", "1031 exchange", "ARV"],
    spiceExamples: { mild: "My first property mistake", medium: "Why waiting to buy is wrong", hot: "The housing market lie", extreme: "Realtors don't want you to know" }
  },
  ecommerce: {
    id: "ecommerce",
    name: "E-commerce",
    vocabulary: ["conversion", "AOV", "CAC", "LTV", "dropshipping", "fulfillment"],
    painPoints: ["competition", "ad costs", "returns", "inventory"],
    desires: ["passive income", "scaling", "freedom", "brand building"],
    insiderTerms: ["CRO", "upsell", "cart abandonment", "retargeting"],
    spiceExamples: { mild: "My store's biggest win", medium: "Why most stores fail", hot: "The product strategy nobody uses", extreme: "Gurus hide this from beginners" }
  },
  crypto: {
    id: "crypto",
    name: "Crypto & Web3",
    vocabulary: ["blockchain", "DeFi", "NFT", "wallet", "staking", "yield"],
    painPoints: ["volatility", "scams", "complexity", "FOMO"],
    desires: ["wealth", "early adoption", "decentralization", "financial freedom"],
    insiderTerms: ["gas fees", "liquidity pool", "rug pull", "diamond hands"],
    spiceExamples: { mild: "Crypto lesson I learned", medium: "Why most lose money in crypto", hot: "The coin nobody's talking about", extreme: "Crypto influencers are lying to you" }
  },

  // LIFESTYLE
  lifestyle: {
    id: "lifestyle",
    name: "Lifestyle",
    vocabulary: ["routine", "habits", "intentional", "growth", "balance", "mindset"],
    painPoints: ["burnout", "comparison", "overwhelm", "procrastination"],
    desires: ["fulfillment", "peace", "purpose", "productivity", "confidence"],
    insiderTerms: ["habit stacking", "time blocking", "deep work"],
    spiceExamples: { mild: "A small change that shifted everything", medium: "Why productivity hacks don't work", hot: "The habit secretly draining you", extreme: "Self-help gurus are lying" }
  },
  travel: {
    id: "travel",
    name: "Travel",
    vocabulary: ["budget", "hidden gems", "local", "itinerary", "hack", "points"],
    painPoints: ["expensive", "tourist traps", "planning stress", "safety"],
    desires: ["adventure", "culture", "memories", "freedom", "bucket list"],
    insiderTerms: ["award travel", "positioning flight", "mistake fare"],
    spiceExamples: { mild: "A travel tip that saved me money", medium: "Why popular destinations are overrated", hot: "The tourist trap everyone falls for", extreme: "Travel influencers fake this" }
  },
  food: {
    id: "food",
    name: "Food",
    vocabulary: ["recipe", "flavor", "seasoning", "technique", "meal prep", "homemade"],
    painPoints: ["time", "bland food", "healthy eating", "budget"],
    desires: ["delicious", "impressive", "quick", "healthy", "restaurant quality"],
    insiderTerms: ["mise en place", "fond", "deglaze", "emulsify"],
    spiceExamples: { mild: "The ingredient that elevates everything", medium: "Why your food tastes bland", hot: "Restaurants don't want you to know", extreme: "Stop following recipe times" }
  },
  fashion: {
    id: "fashion",
    name: "Fashion",
    vocabulary: ["capsule", "staples", "trends", "styling", "thrift", "investment pieces"],
    painPoints: ["nothing to wear", "trends change", "expensive", "body type"],
    desires: ["style", "confidence", "compliments", "effortless", "timeless"],
    insiderTerms: ["cost per wear", "color theory", "silhouette", "proportion"],
    spiceExamples: { mild: "A styling tip that changed my outfits", medium: "Why trends are making you look worse", hot: "The fashion rule you should break", extreme: "Fashion brands lie about this" }
  },
  beauty: {
    id: "beauty",
    name: "Beauty",
    vocabulary: ["glam", "natural", "technique", "products", "transformation", "routine"],
    painPoints: ["products don't work", "expensive", "time consuming", "trends"],
    desires: ["confidence", "looks", "glowing", "put together", "compliments"],
    insiderTerms: ["color theory", "undertone", "setting", "baking"],
    spiceExamples: { mild: "A makeup tip that changed my look", medium: "Why your makeup isn't lasting", hot: "The beauty product that's overhyped", extreme: "Beauty gurus lie about this" }
  },
  home: {
    id: "home",
    name: "Home & Decor",
    vocabulary: ["organize", "declutter", "aesthetic", "cozy", "functional", "minimalist"],
    painPoints: ["clutter", "small space", "budget", "rental restrictions"],
    desires: ["cozy home", "organized", "aesthetic", "functional", "peaceful"],
    insiderTerms: ["negative space", "focal point", "rule of thirds"],
    spiceExamples: { mild: "A home hack that changed my space", medium: "Why your space feels cluttered", hot: "The decor trend that's actually tacky", extreme: "Interior designers overcharge for this" }
  },
  minimalism: {
    id: "minimalism",
    name: "Minimalism",
    vocabulary: ["declutter", "intentional", "capsule", "quality", "less is more"],
    painPoints: ["overwhelm", "consumerism", "clutter", "decision fatigue"],
    desires: ["peace", "clarity", "freedom", "intentionality", "space"],
    insiderTerms: ["KonMari", "one in one out", "capsule wardrobe"],
    spiceExamples: { mild: "What I got rid of this month", medium: "Why decluttering doesn't work", hot: "The minimalist lie nobody admits", extreme: "Minimalism influencers are faking it" }
  },
  luxury: {
    id: "luxury",
    name: "Luxury",
    vocabulary: ["investment", "quality", "craftsmanship", "exclusive", "heritage", "worth it"],
    painPoints: ["price", "fakes", "worth it", "judgment"],
    desires: ["status", "quality", "experience", "investment", "exclusivity"],
    insiderTerms: ["cost per wear", "resale value", "authentication"],
    spiceExamples: { mild: "Was this luxury item worth it", medium: "Why this designer is overrated", hot: "The luxury brand that's declining", extreme: "Luxury brands are scamming you" }
  },

  // ENTERTAINMENT
  comedy: {
    id: "comedy",
    name: "Comedy",
    vocabulary: ["bit", "timing", "punchline", "callback", "roast", "deadpan"],
    painPoints: ["bombing", "hecklers", "awkward silence"],
    desires: ["laughs", "viral moment", "recognition", "timing"],
    insiderTerms: ["tight five", "closer", "tag", "misdirect"],
    spiceExamples: { mild: "Nobody laughed until I changed this", medium: "Why your jokes aren't landing", hot: "The reason comedians hate this", extreme: "This comedy advice is killing careers" }
  },
  gaming: {
    id: "gaming",
    name: "Gaming",
    vocabulary: ["meta", "grind", "build", "loadout", "nerf", "buff", "rank"],
    painPoints: ["hardstuck", "toxic teammates", "lag", "grind fatigue"],
    desires: ["rank up", "go pro", "content creation", "skills"],
    insiderTerms: ["frame data", "tech skill", "matchup", "spacing"],
    spiceExamples: { mild: "The setting most players ignore", medium: "Why you're hardstuck", hot: "Pro players abuse this", extreme: "Devs broke this on purpose" }
  },
  movies: {
    id: "movies",
    name: "Movies & TV",
    vocabulary: ["plot", "character", "cinematography", "directing", "twist", "underrated"],
    painPoints: ["nothing to watch", "spoilers", "bad recommendations"],
    desires: ["entertainment", "emotional experience", "discussion"],
    insiderTerms: ["cold open", "bottle episode", "fan service"],
    spiceExamples: { mild: "A movie that surprised me", medium: "Why this popular movie is overrated", hot: "The film industry's biggest problem", extreme: "This 'masterpiece' is actually bad" }
  },
  music: {
    id: "music",
    name: "Music",
    vocabulary: ["flow", "production", "lyrics", "genre", "underrated", "classic"],
    painPoints: ["nothing new to listen to", "industry politics"],
    desires: ["discover new music", "emotional connection", "community"],
    insiderTerms: ["sample", "interpolation", "ghostwriter"],
    spiceExamples: { mild: "A song that changed my perspective", medium: "Why this artist is underrated", hot: "The artist who doesn't write their songs", extreme: "The music industry's biggest lie" }
  },
  sports: {
    id: "sports",
    name: "Sports",
    vocabulary: ["GOAT", "clutch", "dynasty", "trade", "draft", "stats"],
    painPoints: ["team losing", "bad calls", "injuries"],
    desires: ["wins", "entertainment", "community", "predictions"],
    insiderTerms: ["advanced stats", "cap space", "trade value"],
    spiceExamples: { mild: "My take on this game", medium: "Why this player is overrated", hot: "The hot take nobody wants to hear", extreme: "The league is rigged" }
  },
  celebrity: {
    id: "celebrity",
    name: "Celebrity & Pop Culture",
    vocabulary: ["drama", "tea", "relationship", "feud", "comeback", "scandal"],
    painPoints: ["keeping up", "fake news", "parasocial"],
    desires: ["entertainment", "gossip", "being in the know"],
    insiderTerms: ["PR relationship", "planted story", "crisis management"],
    spiceExamples: { mild: "What I think about this drama", medium: "Why this celebrity is problematic", hot: "The celebrity nobody talks about", extreme: "Hollywood's biggest secret" }
  },
  asmr: {
    id: "asmr",
    name: "ASMR",
    vocabulary: ["tingles", "triggers", "whisper", "tapping", "satisfying", "relaxing"],
    painPoints: ["immunity", "finding new triggers"],
    desires: ["relaxation", "sleep", "tingles", "comfort"],
    insiderTerms: ["immunity", "tingle intensity", "visual triggers"],
    spiceExamples: { mild: "A new trigger I discovered", medium: "Why this ASMR type is underrated", hot: "The ASMR mistake creators make", extreme: "ASMR is better than this" }
  },

  // EDUCATION
  education: {
    id: "education",
    name: "Education",
    vocabulary: ["learning", "study", "tips", "hack", "efficient", "retention"],
    painPoints: ["boring", "hard to focus", "no motivation"],
    desires: ["understanding", "grades", "knowledge", "efficiency"],
    insiderTerms: ["spaced repetition", "active recall", "Feynman technique"],
    spiceExamples: { mild: "A study tip that helped", medium: "Why traditional studying fails", hot: "The education system is broken", extreme: "Teachers don't want you to know this" }
  },
  history: {
    id: "history",
    name: "History",
    vocabulary: ["ancient", "events", "forgotten", "impact", "discovery", "timeline"],
    painPoints: ["boring presentation", "biased sources"],
    desires: ["interesting stories", "context", "understanding"],
    insiderTerms: ["primary source", "revisionist", "oral history"],
    spiceExamples: { mild: "A history fact you didn't know", medium: "Why history books got this wrong", hot: "The historical figure who was actually terrible", extreme: "History is a lie" }
  },
  science: {
    id: "science",
    name: "Science",
    vocabulary: ["experiment", "discovery", "theory", "research", "breakthrough", "study"],
    painPoints: ["complexity", "misinformation"],
    desires: ["understanding", "wonder", "knowledge"],
    insiderTerms: ["peer review", "replication", "p-value"],
    spiceExamples: { mild: "A mind-blowing science fact", medium: "Why this 'fact' is actually wrong", hot: "The study everyone misunderstands", extreme: "Scientists are hiding this" }
  },
  languages: {
    id: "languages",
    name: "Languages",
    vocabulary: ["fluent", "pronunciation", "grammar", "immersion", "vocab", "native"],
    painPoints: ["plateau", "pronunciation", "motivation"],
    desires: ["fluency", "connection", "travel", "career"],
    insiderTerms: ["comprehensible input", "immersion", "output"],
    spiceExamples: { mild: "A language hack that helped", medium: "Why language apps don't work", hot: "The mistake keeping you from fluency", extreme: "Language teachers are wrong about this" }
  },
  "study-tips": {
    id: "study-tips",
    name: "Study Tips",
    vocabulary: ["focus", "productivity", "notes", "retention", "exam", "technique"],
    painPoints: ["procrastination", "burnout", "forgetting", "overwhelm"],
    desires: ["good grades", "efficiency", "understanding", "less stress"],
    insiderTerms: ["active recall", "pomodoro", "Cornell notes"],
    spiceExamples: { mild: "How I improved my focus", medium: "Why highlighting doesn't work", hot: "The study method that's wasting your time", extreme: "What schools don't teach you" }
  },
  college: {
    id: "college",
    name: "College Life",
    vocabulary: ["dorm", "major", "freshman", "campus", "advisor", "credits"],
    painPoints: ["stress", "money", "social life", "grades balance"],
    desires: ["success", "fun", "connections", "future career"],
    insiderTerms: ["rate my professor", "office hours", "credit load"],
    spiceExamples: { mild: "College advice I wish I knew", medium: "Why your major doesn't matter", hot: "The college advice that's wrong", extreme: "College is a scam" }
  },

  // CREATIVE
  art: {
    id: "art",
    name: "Art",
    vocabulary: ["technique", "medium", "style", "composition", "inspiration", "process"],
    painPoints: ["art block", "comparison", "not good enough"],
    desires: ["improvement", "style", "recognition", "expression"],
    insiderTerms: ["gesture", "value", "composition", "reference"],
    spiceExamples: { mild: "A technique that improved my art", medium: "Why this art advice is wrong", hot: "The art supply that's a waste of money", extreme: "Art school is a scam" }
  },
  photography: {
    id: "photography",
    name: "Photography",
    vocabulary: ["composition", "lighting", "edit", "RAW", "aperture", "exposure"],
    painPoints: ["gear anxiety", "editing time", "consistency"],
    desires: ["stunning photos", "style", "recognition", "clients"],
    insiderTerms: ["golden hour", "bokeh", "histogram", "crop factor"],
    spiceExamples: { mild: "A photography tip that changed my shots", medium: "Why expensive gear doesn't matter", hot: "The editing trend ruining photos", extreme: "Photography 'rules' are fake" }
  },
  diy: {
    id: "diy",
    name: "DIY & Crafts",
    vocabulary: ["project", "tutorial", "hack", "upcycle", "handmade", "budget"],
    painPoints: ["time", "fails", "supplies cost", "complexity"],
    desires: ["save money", "unique items", "satisfaction", "creativity"],
    insiderTerms: ["seam allowance", "grain", "cure time"],
    spiceExamples: { mild: "A DIY that actually worked", medium: "Why Pinterest fails happen", hot: "The DIY that's not worth it", extreme: "Craft stores don't want you to know" }
  },
  writing: {
    id: "writing",
    name: "Writing",
    vocabulary: ["draft", "edit", "voice", "plot", "character", "publish"],
    painPoints: ["writer's block", "rejection", "imposter syndrome"],
    desires: ["publication", "readers", "craft improvement", "expression"],
    insiderTerms: ["query", "manuscript", "beta reader", "POV"],
    spiceExamples: { mild: "A writing tip that helped me", medium: "Why writing advice is often wrong", hot: "The writing rule you should break", extreme: "Publishing is broken" }
  },
  "content-creation": {
    id: "content-creation",
    name: "Content Creation",
    vocabulary: ["algorithm", "engagement", "niche", "consistency", "growth", "monetize"],
    painPoints: ["no views", "burnout", "algorithm changes", "hate comments"],
    desires: ["growth", "income", "influence", "freedom"],
    insiderTerms: ["watch time", "CTR", "retention", "CPM"],
    spiceExamples: { mild: "What grew my account", medium: "Why posting more doesn't work", hot: "The content strategy nobody uses", extreme: "Platforms are suppressing you" }
  },

  // RELATIONSHIPS
  dating: {
    id: "dating",
    name: "Dating",
    vocabulary: ["connection", "chemistry", "red flag", "green flag", "boundaries"],
    painPoints: ["ghosting", "rejection", "situationships", "trust issues"],
    desires: ["love", "connection", "understanding", "partnership"],
    insiderTerms: ["love bombing", "breadcrumbing", "avoidant", "anxious"],
    spiceExamples: { mild: "What I wish I knew about dating", medium: "Why they're not texting back", hot: "The dating advice keeping you single", extreme: "Relationship coaches are lying" }
  },
  relationships: {
    id: "relationships",
    name: "Relationships",
    vocabulary: ["communication", "boundaries", "love language", "attachment", "trust"],
    painPoints: ["conflict", "growing apart", "trust issues", "communication"],
    desires: ["healthy relationship", "understanding", "growth together"],
    insiderTerms: ["stonewalling", "repair attempt", "bid for connection"],
    spiceExamples: { mild: "What improved my relationship", medium: "Why couples therapy isn't working", hot: "The relationship mistake everyone makes", extreme: "Marriage counselors are wrong about this" }
  },
  parenting: {
    id: "parenting",
    name: "Parenting",
    vocabulary: ["toddler", "routine", "milestone", "behavior", "gentle parenting"],
    painPoints: ["no sleep", "tantrums", "guilt", "work balance"],
    desires: ["happy kids", "connection", "balance", "good parent"],
    insiderTerms: ["regression", "leap", "attachment parenting"],
    spiceExamples: { mild: "A parenting hack that worked", medium: "Why gentle parenting is hard", hot: "The parenting advice that's wrong", extreme: "Parenting experts don't have kids" }
  },
  family: {
    id: "family",
    name: "Family",
    vocabulary: ["boundaries", "dynamics", "traditions", "support", "communication"],
    painPoints: ["toxic family", "boundaries", "expectations", "drama"],
    desires: ["harmony", "connection", "support", "healthy dynamics"],
    insiderTerms: ["enmeshment", "triangulation", "family system"],
    spiceExamples: { mild: "What helped my family relationship", medium: "Why family advice doesn't work", hot: "The family dynamic nobody talks about", extreme: "You can cut off family" }
  },
  friendship: {
    id: "friendship",
    name: "Friendship",
    vocabulary: ["boundaries", "support", "growing apart", "making friends", "trust"],
    painPoints: ["loneliness", "growing apart", "drama", "making friends as adult"],
    desires: ["connection", "support", "fun", "understanding"],
    insiderTerms: ["friend breakup", "parasocial", "reciprocity"],
    spiceExamples: { mild: "How I made friends as an adult", medium: "Why friendships fade", hot: "The friendship red flag nobody sees", extreme: "You don't need that many friends" }
  },

  // TECH
  tech: {
    id: "tech",
    name: "Tech",
    vocabulary: ["automation", "workflow", "hack", "integration", "optimize"],
    painPoints: ["overwhelm", "distraction", "complexity", "cost"],
    desires: ["efficiency", "simplicity", "speed", "control"],
    insiderTerms: ["tech stack", "API", "automation", "workflow"],
    spiceExamples: { mild: "A tool that changed my workflow", medium: "Why that popular app is overrated", hot: "Stop paying for this software", extreme: "Big tech doesn't want you using this" }
  },
  ai: {
    id: "ai",
    name: "AI & Tools",
    vocabulary: ["prompt", "automation", "workflow", "ChatGPT", "productivity"],
    painPoints: ["learning curve", "quality concerns", "job fears"],
    desires: ["efficiency", "creativity", "staying relevant"],
    insiderTerms: ["prompt engineering", "hallucination", "fine-tuning"],
    spiceExamples: { mild: "An AI tool that surprised me", medium: "Why most AI prompts fail", hot: "The AI tool replacing jobs", extreme: "AI companies are lying about capabilities" }
  },
  apps: {
    id: "apps",
    name: "Apps & Software",
    vocabulary: ["feature", "hidden", "hack", "shortcut", "productivity"],
    painPoints: ["too many apps", "learning curve", "subscriptions"],
    desires: ["efficiency", "organization", "simplicity"],
    insiderTerms: ["power user", "keyboard shortcut", "workflow"],
    spiceExamples: { mild: "A hidden app feature I found", medium: "Why you don't need that app", hot: "The app feature companies hide", extreme: "Apps are designed to waste your time" }
  },
  productivity: {
    id: "productivity",
    name: "Productivity",
    vocabulary: ["system", "routine", "focus", "deep work", "batch", "automate"],
    painPoints: ["distraction", "procrastination", "overwhelm", "burnout"],
    desires: ["efficiency", "accomplishment", "work-life balance"],
    insiderTerms: ["time blocking", "Parkinson's law", "Eisenhower matrix"],
    spiceExamples: { mild: "A system that improved my focus", medium: "Why productivity apps don't work", hot: "The productivity advice that's wrong", extreme: "Hustle culture is killing you" }
  },
  coding: {
    id: "coding",
    name: "Coding",
    vocabulary: ["debug", "deploy", "framework", "stack", "optimize", "ship"],
    painPoints: ["imposter syndrome", "bugs", "learning curve"],
    desires: ["job", "build products", "solve problems"],
    insiderTerms: ["refactor", "technical debt", "CI/CD", "PR"],
    spiceExamples: { mild: "What helped me learn to code", medium: "Why tutorials don't work", hot: "The coding bootcamp lie", extreme: "CS degrees are overrated" }
  },
};

export function getNicheProfile(nicheId: string): NicheProfile {
  // Check direct match
  if (nicheProfiles[nicheId]) {
    return nicheProfiles[nicheId];
  }
  
  // Try to find by lowercased/normalized name
  const normalized = nicheId.toLowerCase().replace(/\s+/g, "-");
  if (nicheProfiles[normalized]) {
    return nicheProfiles[normalized];
  }
  
  // Default to lifestyle
  return nicheProfiles.lifestyle;
}

export function getAllNiches(): { id: string; name: string }[] {
  return Object.values(nicheProfiles).map(p => ({ id: p.id, name: p.name }));
}
