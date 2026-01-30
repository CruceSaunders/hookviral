// Niche profiles that deeply influence hook generation

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

export const nicheProfiles: Record<string, NicheProfile> = {
  fitness: {
    id: "fitness",
    name: "Fitness & Health",
    vocabulary: ["gains", "PR", "bulk", "cut", "macros", "pump", "reps", "sets", "progressive overload", "compound", "isolation", "TDEE", "deficit", "surplus"],
    painPoints: ["plateau", "no time", "genetics", "motivation", "soreness", "no results", "skinny fat", "stubborn fat", "weak lifts"],
    desires: ["visible abs", "strength", "energy", "confidence", "discipline", "muscle definition", "endurance", "flexibility"],
    insiderTerms: ["newbie gains", "mind-muscle connection", "time under tension", "deload", "accessory work", "failure"],
    spiceExamples: {
      mild: "Why your workouts feel harder than they should",
      medium: "Your trainer probably got this wrong",
      hot: "The exercise destroying your gains",
      extreme: "Fitness influencers are lying about this"
    }
  },
  business: {
    id: "business",
    name: "Business & Entrepreneur",
    vocabulary: ["revenue", "scaling", "leverage", "ROI", "conversion", "funnel", "MRR", "churn", "CAC", "LTV", "bootstrap", "raise"],
    painPoints: ["burnout", "cash flow", "competition", "hiring", "growth plateau", "imposter syndrome", "overwhelm", "pricing"],
    desires: ["freedom", "wealth", "impact", "automation", "recognition", "passive income", "exit", "authority"],
    insiderTerms: ["product-market fit", "runway", "traction", "pivot", "moat", "unit economics"],
    spiceExamples: {
      mild: "A pricing mistake I made for years",
      medium: "Why most businesses stay small",
      hot: "The lie gurus sell about passive income",
      extreme: "Your business mentor is scamming you"
    }
  },
  comedy: {
    id: "comedy",
    name: "Comedy & Entertainment",
    vocabulary: ["bit", "timing", "punchline", "callback", "roast", "deadpan", "improv", "crowd work"],
    painPoints: ["bombing", "hecklers", "awkward silence", "stolen jokes", "getting booked"],
    desires: ["laughs", "viral moment", "recognition", "timing", "unique voice"],
    insiderTerms: ["tight five", "closer", "tag", "act out", "misdirect"],
    spiceExamples: {
      mild: "Nobody laughed until I changed this",
      medium: "Why your jokes aren't landing",
      hot: "The reason comedians hate this trend",
      extreme: "This comedy advice is killing your career"
    }
  },
  beauty: {
    id: "beauty",
    name: "Beauty & Skincare",
    vocabulary: ["routine", "glow", "texture", "hydration", "SPF", "retinol", "serum", "barrier", "purging", "slugging"],
    painPoints: ["acne", "aging", "dullness", "breakouts", "sensitivity", "hyperpigmentation", "dryness"],
    desires: ["glass skin", "clear skin", "youthful", "radiant", "natural beauty", "confidence"],
    insiderTerms: ["skin cycling", "double cleanse", "active ingredients", "moisture barrier", "pH balance"],
    spiceExamples: {
      mild: "Your skincare order might be wrong",
      medium: "Why expensive products fail",
      hot: "The ingredient ruining your skin",
      extreme: "Dermatologists won't tell you this"
    }
  },
  tech: {
    id: "tech",
    name: "Tech & Productivity",
    vocabulary: ["automation", "workflow", "API", "no-code", "stack", "optimize", "hack", "integration"],
    painPoints: ["overwhelm", "distraction", "complexity", "cost", "learning curve", "security"],
    desires: ["efficiency", "simplicity", "speed", "control", "knowledge", "edge"],
    insiderTerms: ["tech stack", "boilerplate", "ship it", "iterate", "deploy"],
    spiceExamples: {
      mild: "A tool that changed my workflow",
      medium: "Why that popular app is overrated",
      hot: "Stop paying for this software",
      extreme: "Big tech doesn't want you using this"
    }
  },
  finance: {
    id: "finance",
    name: "Personal Finance",
    vocabulary: ["compound", "portfolio", "diversify", "index", "FIRE", "budget", "debt", "net worth", "assets"],
    painPoints: ["debt", "paycheck to paycheck", "inflation", "retirement fear", "emergency fund", "credit score"],
    desires: ["financial freedom", "wealth", "security", "early retirement", "passive income"],
    insiderTerms: ["expense ratio", "dollar cost averaging", "tax loss harvesting", "emergency fund"],
    spiceExamples: {
      mild: "A money habit that changed everything",
      medium: "Why budgeting apps don't work",
      hot: "The financial advice keeping you broke",
      extreme: "Banks profit when you do this"
    }
  },
  dating: {
    id: "dating",
    name: "Dating & Relationships",
    vocabulary: ["connection", "chemistry", "red flag", "green flag", "boundaries", "attachment", "communication"],
    painPoints: ["ghosting", "rejection", "situationships", "trust issues", "loneliness", "mixed signals"],
    desires: ["love", "connection", "understanding", "partnership", "intimacy", "commitment"],
    insiderTerms: ["love bombing", "breadcrumbing", "avoidant", "anxious attachment", "secure"],
    spiceExamples: {
      mild: "What I wish I knew about dating earlier",
      medium: "Why they're not texting back",
      hot: "The dating advice that's keeping you single",
      extreme: "Your therapist won't tell you this"
    }
  },
  food: {
    id: "food",
    name: "Food & Cooking",
    vocabulary: ["recipe", "flavor", "seasoning", "technique", "fresh", "homemade", "meal prep", "crispy"],
    painPoints: ["time", "bland food", "burning", "healthy eating", "budget", "picky eaters"],
    desires: ["delicious", "impressive", "quick", "healthy", "restaurant quality"],
    insiderTerms: ["mise en place", "fond", "deglaze", "emulsify", "rest the meat"],
    spiceExamples: {
      mild: "The ingredient that elevates everything",
      medium: "Why your food tastes bland",
      hot: "Restaurants don't want you to know this",
      extreme: "Stop following recipe times"
    }
  },
  lifestyle: {
    id: "lifestyle",
    name: "Lifestyle & Self-Improvement",
    vocabulary: ["routine", "habits", "mindset", "intentional", "growth", "balance", "energy", "clarity"],
    painPoints: ["burnout", "comparison", "lack of direction", "overwhelm", "procrastination"],
    desires: ["fulfillment", "peace", "purpose", "productivity", "confidence", "authenticity"],
    insiderTerms: ["morning routine", "habit stacking", "time blocking", "deep work"],
    spiceExamples: {
      mild: "A small change that shifted everything",
      medium: "Why productivity hacks don't work",
      hot: "The habit that's secretly draining you",
      extreme: "Self-help gurus are lying to you"
    }
  },
  gaming: {
    id: "gaming",
    name: "Gaming",
    vocabulary: ["meta", "grind", "build", "loadout", "nerf", "buff", "rank", "carry", "clutch"],
    painPoints: ["hardstuck", "toxic teammates", "lag", "tilt", "grind fatigue"],
    desires: ["rank up", "go pro", "content creation", "community", "skills"],
    insiderTerms: ["frame data", "tech skill", "matchup", "spacing", "punish"],
    spiceExamples: {
      mild: "The setting most players ignore",
      medium: "Why you're hardstuck in ranked",
      hot: "Pro players abuse this and you don't",
      extreme: "The devs broke this on purpose"
    }
  }
};

export function getNicheProfile(nicheId: string): NicheProfile {
  return nicheProfiles[nicheId] || nicheProfiles.lifestyle;
}

export function getAllNiches(): { id: string; name: string }[] {
  return Object.values(nicheProfiles).map(p => ({ id: p.id, name: p.name }));
}
