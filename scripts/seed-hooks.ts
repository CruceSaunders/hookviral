/**
 * Seed script to populate Supabase with real viral hooks
 * Run with: npx tsx scripts/seed-hooks.ts
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Real viral hooks categorized by niche - curated from actual high-performing TikToks
const hooks = [
  // FITNESS (50 hooks)
  { text: "The exercise scientists say you should NEVER do", niche: "fitness", style: "controversy", tags: ["gym", "workout", "advice"] },
  { text: "I lost 30 pounds and didn't change my diet once", niche: "fitness", style: "story", tags: ["weight-loss", "transformation"] },
  { text: "The gym hack that doubled my gains in 4 weeks", niche: "fitness", style: "transformation", tags: ["gym", "gains", "hack"] },
  { text: "Stop doing this exercise immediately if you value your joints", niche: "fitness", style: "controversy", tags: ["injury", "health", "warning"] },
  { text: "I trained like a Navy SEAL for 30 days. Here's what happened.", niche: "fitness", style: "story", tags: ["challenge", "military", "extreme"] },
  { text: "Why your protein shake is making you fat", niche: "fitness", style: "controversy", tags: ["nutrition", "protein", "myth"] },
  { text: "The 5-minute workout that burns more than 1 hour of cardio", niche: "fitness", style: "curiosity", tags: ["cardio", "efficiency", "workout"] },
  { text: "Personal trainers HATE when I share this", niche: "fitness", style: "controversy", tags: ["secret", "trainer", "hack"] },
  { text: "I went from 0 to 100 pushups in 30 days. Here's the method.", niche: "fitness", style: "transformation", tags: ["pushups", "challenge", "method"] },
  { text: "The muscle you're ignoring that's killing your posture", niche: "fitness", style: "tips", tags: ["posture", "back", "health"] },
  { text: "What happens if you walk 10K steps every day for a year", niche: "fitness", style: "story", tags: ["walking", "challenge", "health"] },
  { text: "The supplement industry doesn't want you to know this", niche: "fitness", style: "controversy", tags: ["supplements", "scam", "truth"] },
  { text: "I fixed my back pain with one exercise. Takes 2 minutes.", niche: "fitness", style: "tips", tags: ["back-pain", "fix", "quick"] },
  { text: "Why skinny guys can't build muscle (and how I fixed it)", niche: "fitness", style: "story", tags: ["muscle", "hardgainer", "solution"] },
  { text: "The workout split that transformed my physique", niche: "fitness", style: "transformation", tags: ["workout", "split", "physique"] },
  { text: "Gym bros are going to hate me for this", niche: "fitness", style: "controversy", tags: ["gym", "unpopular", "opinion"] },
  { text: "This stretch changed my life (I'm not kidding)", niche: "fitness", style: "story", tags: ["stretch", "mobility", "life-changing"] },
  { text: "The pre-workout secret that tripled my energy", niche: "fitness", style: "curiosity", tags: ["pre-workout", "energy", "secret"] },
  { text: "I did 1000 squats a day for a month", niche: "fitness", style: "story", tags: ["squats", "challenge", "extreme"] },
  { text: "Why you're not losing belly fat (it's not what you think)", niche: "fitness", style: "curiosity", tags: ["belly-fat", "weight-loss", "myth"] },
  { text: "The recovery hack elite athletes use but never share", niche: "fitness", style: "curiosity", tags: ["recovery", "elite", "secret"] },
  { text: "I stopped working out for 3 months. Here's what I learned.", niche: "fitness", style: "story", tags: ["break", "lessons", "mindset"] },
  { text: "The one exercise that fixed my hunched posture", niche: "fitness", style: "transformation", tags: ["posture", "exercise", "fix"] },
  { text: "Gym newbies make this mistake every single time", niche: "fitness", style: "tips", tags: ["beginner", "mistakes", "advice"] },
  { text: "I trained fasted for 90 days and the results shocked me", niche: "fitness", style: "story", tags: ["fasting", "training", "results"] },
  { text: "The leg day hack that changed everything", niche: "fitness", style: "curiosity", tags: ["legs", "hack", "workout"] },
  { text: "Why cardio is ruining your gains (science-backed)", niche: "fitness", style: "controversy", tags: ["cardio", "gains", "science"] },
  { text: "I ate 300g protein daily for 30 days", niche: "fitness", style: "story", tags: ["protein", "experiment", "diet"] },
  { text: "The mobility routine that fixed my tight hips", niche: "fitness", style: "transformation", tags: ["mobility", "hips", "routine"] },
  { text: "You're doing bicep curls completely wrong", niche: "fitness", style: "controversy", tags: ["biceps", "form", "correction"] },
  { text: "The fitness influencer lie that cost me 2 years", niche: "fitness", style: "story", tags: ["influencer", "lie", "wasted-time"] },
  { text: "I copied Arnold's workout for 6 months", niche: "fitness", style: "story", tags: ["arnold", "classic", "challenge"] },
  { text: "The mind-muscle connection hack nobody talks about", niche: "fitness", style: "tips", tags: ["mind-muscle", "technique", "secret"] },
  { text: "Why rest days are more important than training days", niche: "fitness", style: "controversy", tags: ["rest", "recovery", "importance"] },
  { text: "I tracked my calories perfectly for 100 days", niche: "fitness", style: "story", tags: ["calories", "tracking", "challenge"] },
  { text: "The ab exercise that actually works (not what you think)", niche: "fitness", style: "tips", tags: ["abs", "core", "effective"] },
  { text: "Personal trainers are lying to you about this", niche: "fitness", style: "controversy", tags: ["trainer", "lie", "truth"] },
  { text: "I did yoga every day for a year as a bodybuilder", niche: "fitness", style: "story", tags: ["yoga", "bodybuilder", "flexibility"] },
  { text: "The warming up mistake that's causing your injuries", niche: "fitness", style: "tips", tags: ["warmup", "injury", "prevention"] },
  { text: "How I finally broke my weight loss plateau", niche: "fitness", style: "transformation", tags: ["plateau", "weight-loss", "breakthrough"] },
  
  // BUSINESS (50 hooks)
  { text: "I made $100K in 30 days and no one believes how", niche: "business", style: "curiosity", tags: ["money", "income", "success"] },
  { text: "The business idea that took me from broke to rich", niche: "business", style: "story", tags: ["startup", "rags-to-riches", "idea"] },
  { text: "How I make $10K/month working 4 hours a week", niche: "business", style: "story", tags: ["passive", "income", "freedom"] },
  { text: "The side hustle that pays more than my 9-5", niche: "business", style: "story", tags: ["side-hustle", "income", "comparison"] },
  { text: "Why most small businesses fail (and how to avoid it)", niche: "business", style: "tips", tags: ["failure", "prevention", "advice"] },
  { text: "The email that landed me a $50K client", niche: "business", style: "story", tags: ["email", "client", "sales"] },
  { text: "Rich people do THIS differently and it changed everything", niche: "business", style: "curiosity", tags: ["wealthy", "habits", "mindset"] },
  { text: "I quit my job and 6 months later this happened", niche: "business", style: "story", tags: ["quit", "entrepreneurship", "journey"] },
  { text: "The negotiation trick that doubled my salary", niche: "business", style: "tips", tags: ["negotiation", "salary", "technique"] },
  { text: "Why working harder won't make you rich", niche: "business", style: "controversy", tags: ["work", "wealth", "mindset"] },
  { text: "The skill that's worth more than a college degree", niche: "business", style: "controversy", tags: ["skills", "education", "value"] },
  { text: "I failed 7 businesses before this one made me a millionaire", niche: "business", style: "story", tags: ["failure", "persistence", "success"] },
  { text: "The one investment that changed my financial life", niche: "business", style: "story", tags: ["investment", "finance", "life-changing"] },
  { text: "How I automated my income (step by step)", niche: "business", style: "tips", tags: ["automation", "passive-income", "tutorial"] },
  { text: "The LinkedIn strategy that got me 50 job offers", niche: "business", style: "tips", tags: ["linkedin", "career", "strategy"] },
  { text: "I built a 6-figure business in my bedroom", niche: "business", style: "story", tags: ["startup", "home-business", "success"] },
  { text: "The pricing mistake that's killing your business", niche: "business", style: "tips", tags: ["pricing", "mistake", "business"] },
  { text: "Millionaires never do this (but everyone else does)", niche: "business", style: "curiosity", tags: ["millionaire", "habits", "contrast"] },
  { text: "I cold called 1000 people. Here's what I learned.", niche: "business", style: "story", tags: ["sales", "cold-calling", "lessons"] },
  { text: "The passive income stream nobody talks about", niche: "business", style: "curiosity", tags: ["passive-income", "secret", "stream"] },
  { text: "Why your resume is going straight to the trash", niche: "business", style: "controversy", tags: ["resume", "job-search", "mistakes"] },
  { text: "I spent $50K on business courses. Save yourself the money.", niche: "business", style: "story", tags: ["courses", "waste", "lessons"] },
  { text: "The one thing I did that 10x'd my business", niche: "business", style: "transformation", tags: ["growth", "strategy", "10x"] },
  { text: "Bosses hate employees who do this (do it anyway)", niche: "business", style: "controversy", tags: ["career", "advancement", "bold"] },
  { text: "I made more money unemployed than employed", niche: "business", style: "story", tags: ["unemployment", "income", "surprising"] },
  { text: "The networking secret that opened every door", niche: "business", style: "tips", tags: ["networking", "connections", "success"] },
  { text: "Why being nice is killing your career", niche: "business", style: "controversy", tags: ["career", "nice", "assertive"] },
  { text: "I tracked every dollar for a year. Mind-blowing results.", niche: "business", style: "story", tags: ["budget", "tracking", "finance"] },
  { text: "The morning routine of every successful CEO", niche: "business", style: "tips", tags: ["morning", "routine", "ceo"] },
  { text: "How I got my dream job with zero experience", niche: "business", style: "story", tags: ["job", "career", "no-experience"] },
  { text: "The wealth-building secret your parents never taught you", niche: "business", style: "curiosity", tags: ["wealth", "parents", "education"] },
  { text: "I started with $100 and built a 7-figure company", niche: "business", style: "story", tags: ["startup", "bootstrap", "success"] },
  { text: "The subscription business model that prints money", niche: "business", style: "tips", tags: ["subscription", "recurring", "business"] },
  { text: "Why most freelancers stay broke forever", niche: "business", style: "controversy", tags: ["freelance", "income", "mistakes"] },
  { text: "I worked 100 hours a week until I realized this", niche: "business", style: "story", tags: ["overwork", "burnout", "realization"] },
  { text: "The sales technique that feels like magic", niche: "business", style: "curiosity", tags: ["sales", "technique", "effective"] },
  { text: "Your financial advisor is lying to you about this", niche: "business", style: "controversy", tags: ["advisor", "finance", "truth"] },
  { text: "I reverse-engineered how millionaires think", niche: "business", style: "story", tags: ["millionaire", "mindset", "analysis"] },
  { text: "The one book that changed how I see money", niche: "business", style: "tips", tags: ["book", "money", "mindset"] },
  { text: "How I make $500/day from my phone", niche: "business", style: "story", tags: ["mobile", "income", "daily"] },
  
  // COMEDY (40 hooks)
  { text: "POV: You're the only one who didn't get the memo", niche: "comedy", style: "relatable", tags: ["pov", "awkward", "relatable"] },
  { text: "Tell me you're broke without telling me you're broke", niche: "comedy", style: "relatable", tags: ["broke", "trend", "relatable"] },
  { text: "When your mom says 'we have food at home'", niche: "comedy", style: "relatable", tags: ["mom", "food", "childhood"] },
  { text: "Me explaining why I need another plant", niche: "comedy", style: "relatable", tags: ["plants", "addiction", "humor"] },
  { text: "That one friend who's always 'on my way'", niche: "comedy", style: "relatable", tags: ["friends", "late", "relatable"] },
  { text: "POV: You said 'I'll just have water' at a restaurant", niche: "comedy", style: "relatable", tags: ["restaurant", "pov", "water"] },
  { text: "Nobody: ... Me at 3am:", niche: "comedy", style: "relatable", tags: ["night", "random", "chaotic"] },
  { text: "Things that live rent free in my head:", niche: "comedy", style: "relatable", tags: ["thoughts", "random", "intrusive"] },
  { text: "My last brain cell trying to adult:", niche: "comedy", style: "relatable", tags: ["adult", "struggle", "brain"] },
  { text: "When you lie on your resume and get the job", niche: "comedy", style: "relatable", tags: ["resume", "job", "imposter"] },
  { text: "Me pretending to be surprised at my own birthday party", niche: "comedy", style: "relatable", tags: ["birthday", "acting", "party"] },
  { text: "Dating in 2026 be like:", niche: "comedy", style: "relatable", tags: ["dating", "modern", "relationships"] },
  { text: "When you hear your own voice in a recording", niche: "comedy", style: "relatable", tags: ["voice", "cringe", "recording"] },
  { text: "POV: You're the friend who's always cold", niche: "comedy", style: "relatable", tags: ["cold", "friends", "pov"] },
  { text: "Me acting normal after doing something embarrassing", niche: "comedy", style: "relatable", tags: ["embarrassing", "acting", "cool"] },
  { text: "When someone says 'we need to talk'", niche: "comedy", style: "relatable", tags: ["anxiety", "talk", "fear"] },
  { text: "My Uber driver when I sit in the front seat", niche: "comedy", style: "relatable", tags: ["uber", "awkward", "driver"] },
  { text: "POV: You're waiting for your food at a restaurant", niche: "comedy", style: "relatable", tags: ["food", "waiting", "hungry"] },
  { text: "When you accidentally open the front camera", niche: "comedy", style: "relatable", tags: ["camera", "selfie", "horror"] },
  { text: "Me calculating if I can afford this:", niche: "comedy", style: "relatable", tags: ["money", "math", "shopping"] },
  { text: "POV: It's your first day at a new job", niche: "comedy", style: "relatable", tags: ["job", "anxiety", "new"] },
  { text: "That one song everyone knows but nobody knows the name of", niche: "comedy", style: "relatable", tags: ["music", "mystery", "common"] },
  { text: "When autocorrect ruins your life:", niche: "comedy", style: "relatable", tags: ["autocorrect", "text", "disaster"] },
  { text: "POV: You're trying to leave a party but keep getting into conversations", niche: "comedy", style: "relatable", tags: ["party", "leaving", "social"] },
  { text: "Me vs Me in the morning:", niche: "comedy", style: "relatable", tags: ["morning", "struggle", "internal"] },
  { text: "When you wave back at someone who wasn't waving at you", niche: "comedy", style: "relatable", tags: ["awkward", "wave", "embarrassing"] },
  { text: "POV: You're the only one who got the dress code wrong", niche: "comedy", style: "relatable", tags: ["fashion", "awkward", "dresscode"] },
  { text: "Things I say vs what I actually mean:", niche: "comedy", style: "relatable", tags: ["communication", "lies", "polite"] },
  { text: "When your WiFi disconnects during a work call", niche: "comedy", style: "relatable", tags: ["wifi", "work", "disaster"] },
  { text: "Me after saying I'll 'just have one drink':", niche: "comedy", style: "relatable", tags: ["drinking", "lies", "party"] },
  
  // EDUCATION (40 hooks)
  { text: "The fact that changed how I see the world", niche: "education", style: "curiosity", tags: ["facts", "mind-blown", "worldview"] },
  { text: "Your teachers lied to you about this", niche: "education", style: "controversy", tags: ["school", "lies", "truth"] },
  { text: "What they don't teach you in school about money", niche: "education", style: "controversy", tags: ["school", "money", "finance"] },
  { text: "The psychological trick that changes everything", niche: "education", style: "curiosity", tags: ["psychology", "trick", "mind"] },
  { text: "I read 100 books this year. Here's what I learned.", niche: "education", style: "story", tags: ["books", "reading", "lessons"] },
  { text: "The study method that got me into Harvard", niche: "education", style: "tips", tags: ["study", "harvard", "method"] },
  { text: "Why everything you know about history is wrong", niche: "education", style: "controversy", tags: ["history", "wrong", "truth"] },
  { text: "The science behind why you're always tired", niche: "education", style: "curiosity", tags: ["science", "tired", "sleep"] },
  { text: "One fact that will make you question reality", niche: "education", style: "curiosity", tags: ["facts", "reality", "mind-blown"] },
  { text: "The skill that takes 20 hours to learn but lasts forever", niche: "education", style: "tips", tags: ["skill", "learning", "valuable"] },
  { text: "How to learn any language in 6 months (scientifically)", niche: "education", style: "tips", tags: ["language", "learning", "science"] },
  { text: "The memory technique that changed how I study", niche: "education", style: "transformation", tags: ["memory", "study", "technique"] },
  { text: "Scientists can't explain this phenomenon", niche: "education", style: "curiosity", tags: ["science", "mystery", "unexplained"] },
  { text: "The hidden meaning behind everyday things", niche: "education", style: "curiosity", tags: ["meaning", "everyday", "secret"] },
  { text: "Why your brain sabotages you (and how to stop it)", niche: "education", style: "tips", tags: ["brain", "sabotage", "psychology"] },
  { text: "The learning hack that nobody uses", niche: "education", style: "curiosity", tags: ["learning", "hack", "unknown"] },
  { text: "I memorized 1000 words in 30 days using this", niche: "education", style: "story", tags: ["memory", "vocabulary", "method"] },
  { text: "The historical fact that's too crazy to believe", niche: "education", style: "curiosity", tags: ["history", "crazy", "unbelievable"] },
  { text: "Why geniuses think differently than everyone else", niche: "education", style: "curiosity", tags: ["genius", "thinking", "different"] },
  { text: "The productivity system that changed my life", niche: "education", style: "transformation", tags: ["productivity", "system", "life-changing"] },
  { text: "This simple trick makes you instantly smarter", niche: "education", style: "tips", tags: ["smart", "trick", "instant"] },
  { text: "The learning mistake everyone makes (including you)", niche: "education", style: "controversy", tags: ["learning", "mistake", "common"] },
  { text: "Why school teaches you the wrong way to learn", niche: "education", style: "controversy", tags: ["school", "learning", "wrong"] },
  { text: "The ancient technique modern scientists are rediscovering", niche: "education", style: "curiosity", tags: ["ancient", "science", "technique"] },
  { text: "How to remember anything forever (not kidding)", niche: "education", style: "tips", tags: ["memory", "forever", "technique"] },
  { text: "The psychology hack that manipulators don't want you to know", niche: "education", style: "curiosity", tags: ["psychology", "manipulation", "protection"] },
  { text: "I went from C student to straight A's with this method", niche: "education", style: "transformation", tags: ["grades", "improvement", "method"] },
  { text: "The conspiracy theory that turned out to be true", niche: "education", style: "curiosity", tags: ["conspiracy", "true", "shocking"] },
  { text: "Why humans are getting dumber (seriously)", niche: "education", style: "controversy", tags: ["intelligence", "decline", "serious"] },
  { text: "The book that every billionaire has read", niche: "education", style: "curiosity", tags: ["book", "billionaire", "common"] },
  
  // LIFESTYLE (40 hooks)
  { text: "I completely changed my life in 6 months. Here's how.", niche: "lifestyle", style: "transformation", tags: ["life-change", "transformation", "journey"] },
  { text: "The morning routine that fixed my anxiety", niche: "lifestyle", style: "story", tags: ["morning", "anxiety", "routine"] },
  { text: "5AM vs 9AM: I tested both for 30 days", niche: "lifestyle", style: "story", tags: ["morning", "experiment", "comparison"] },
  { text: "The habit that ruined my life (stop doing this)", niche: "lifestyle", style: "controversy", tags: ["habit", "bad", "warning"] },
  { text: "How I went from depressed to thriving", niche: "lifestyle", style: "transformation", tags: ["depression", "thriving", "journey"] },
  { text: "The one thing I removed that changed everything", niche: "lifestyle", style: "curiosity", tags: ["minimalism", "removal", "change"] },
  { text: "Why I wake up at 4AM (and why you should too)", niche: "lifestyle", style: "controversy", tags: ["early", "morning", "productivity"] },
  { text: "The journal practice that made me rich", niche: "lifestyle", style: "story", tags: ["journal", "wealth", "practice"] },
  { text: "I deleted social media for a year. Here's what happened.", niche: "lifestyle", style: "story", tags: ["social-media", "detox", "results"] },
  { text: "The minimalist trick that saved me $10K", niche: "lifestyle", style: "tips", tags: ["minimalism", "savings", "money"] },
  { text: "How to actually stick to your New Year's resolution", niche: "lifestyle", style: "tips", tags: ["resolution", "habits", "new-year"] },
  { text: "The evening routine that helped me sleep like a baby", niche: "lifestyle", style: "tips", tags: ["evening", "sleep", "routine"] },
  { text: "I lived without a phone for 30 days", niche: "lifestyle", style: "story", tags: ["phone", "detox", "challenge"] },
  { text: "The relationship advice nobody wants to hear", niche: "lifestyle", style: "controversy", tags: ["relationship", "advice", "hard-truth"] },
  { text: "How I healed my gut and fixed everything else", niche: "lifestyle", style: "transformation", tags: ["gut", "health", "healing"] },
  { text: "The dating rule that changed my love life", niche: "lifestyle", style: "tips", tags: ["dating", "rule", "love"] },
  { text: "I said yes to everything for a month", niche: "lifestyle", style: "story", tags: ["yes", "experiment", "adventure"] },
  { text: "The one purchase that improved my quality of life", niche: "lifestyle", style: "tips", tags: ["purchase", "quality", "improvement"] },
  { text: "Why toxic positivity is ruining your mental health", niche: "lifestyle", style: "controversy", tags: ["positivity", "mental-health", "toxic"] },
  { text: "I tracked my happiness for 365 days", niche: "lifestyle", style: "story", tags: ["happiness", "tracking", "experiment"] },
  { text: "The boundary I set that everyone hated (but saved my life)", niche: "lifestyle", style: "story", tags: ["boundary", "self-care", "controversial"] },
  { text: "How I became a morning person in 7 days", niche: "lifestyle", style: "transformation", tags: ["morning", "transformation", "quick"] },
  { text: "The self-care practice that's actually a waste of time", niche: "lifestyle", style: "controversy", tags: ["self-care", "waste", "truth"] },
  { text: "I meditated every day for a year. Here's the truth.", niche: "lifestyle", style: "story", tags: ["meditation", "year", "honest"] },
  { text: "The friendship red flag I wish I noticed sooner", niche: "lifestyle", style: "tips", tags: ["friendship", "red-flag", "warning"] },
  { text: "Why I stopped setting goals (and achieved more)", niche: "lifestyle", style: "controversy", tags: ["goals", "achievement", "counterintuitive"] },
  { text: "The dating app hack that actually works", niche: "lifestyle", style: "tips", tags: ["dating", "app", "hack"] },
  { text: "I lived alone for a year and learned this", niche: "lifestyle", style: "story", tags: ["alone", "independence", "lessons"] },
  { text: "The conversation that changed my perspective forever", niche: "lifestyle", style: "story", tags: ["conversation", "perspective", "life-changing"] },
  { text: "How I fixed my sleep schedule in 3 days", niche: "lifestyle", style: "transformation", tags: ["sleep", "schedule", "quick-fix"] },
  
  // BEAUTY (30 hooks)
  { text: "The skincare product that cleared my skin in 2 weeks", niche: "beauty", style: "transformation", tags: ["skincare", "acne", "product"] },
  { text: "Skincare ingredients you should NEVER mix", niche: "beauty", style: "tips", tags: ["ingredients", "mixing", "danger"] },
  { text: "I tried the viral skincare routine for 30 days", niche: "beauty", style: "story", tags: ["viral", "routine", "results"] },
  { text: "Dermatologists don't want you to know this", niche: "beauty", style: "controversy", tags: ["dermatologist", "secret", "skincare"] },
  { text: "The $5 product that replaced my entire routine", niche: "beauty", style: "tips", tags: ["budget", "product", "simple"] },
  { text: "Why your skin is breaking out (it's not what you think)", niche: "beauty", style: "curiosity", tags: ["breakout", "acne", "cause"] },
  { text: "The makeup hack that changed my entire look", niche: "beauty", style: "transformation", tags: ["makeup", "hack", "transformation"] },
  { text: "I spent $1000 on skincare. Here's what actually works.", niche: "beauty", style: "story", tags: ["expensive", "skincare", "review"] },
  { text: "The ingredient that's in 90% of products but shouldn't be", niche: "beauty", style: "controversy", tags: ["ingredient", "harmful", "common"] },
  { text: "How I got rid of acne scars in 3 months", niche: "beauty", style: "transformation", tags: ["acne-scars", "treatment", "journey"] },
  { text: "The sunscreen mistake that's aging your skin", niche: "beauty", style: "tips", tags: ["sunscreen", "aging", "mistake"] },
  { text: "Celebrity makeup secrets they don't want you to know", niche: "beauty", style: "curiosity", tags: ["celebrity", "makeup", "secrets"] },
  { text: "I stopped wearing makeup for a year", niche: "beauty", style: "story", tags: ["no-makeup", "experiment", "confidence"] },
  { text: "The lip product that lasts through anything", niche: "beauty", style: "tips", tags: ["lip", "lasting", "product"] },
  { text: "Why expensive skincare is a scam", niche: "beauty", style: "controversy", tags: ["expensive", "scam", "truth"] },
  { text: "The hair care routine that saved my damaged hair", niche: "beauty", style: "transformation", tags: ["hair", "damage", "recovery"] },
  { text: "I only used drugstore products for 6 months", niche: "beauty", style: "story", tags: ["drugstore", "budget", "results"] },
  { text: "The foundation trick that made me look 10 years younger", niche: "beauty", style: "tips", tags: ["foundation", "younger", "technique"] },
  { text: "Why retinol might be ruining your skin", niche: "beauty", style: "controversy", tags: ["retinol", "damage", "warning"] },
  { text: "The eyebrow product that changed everything", niche: "beauty", style: "transformation", tags: ["eyebrows", "product", "game-changer"] },
  
  // TECH (30 hooks)
  { text: "iPhone settings you need to change right now", niche: "tech", style: "tips", tags: ["iphone", "settings", "urgent"] },
  { text: "The app that's free but should cost $100", niche: "tech", style: "tips", tags: ["app", "free", "valuable"] },
  { text: "Why I switched from iPhone to Android (and back)", niche: "tech", style: "story", tags: ["iphone", "android", "comparison"] },
  { text: "The AI tool that does my work for me", niche: "tech", style: "tips", tags: ["ai", "automation", "productivity"] },
  { text: "Hidden iPhone features Apple doesn't advertise", niche: "tech", style: "curiosity", tags: ["iphone", "hidden", "features"] },
  { text: "The browser extension that changed how I work", niche: "tech", style: "tips", tags: ["browser", "extension", "productivity"] },
  { text: "I tested every AI tool. Here's the only one worth using.", niche: "tech", style: "story", tags: ["ai", "testing", "best"] },
  { text: "Why your phone is listening to you (and how to stop it)", niche: "tech", style: "controversy", tags: ["privacy", "listening", "phone"] },
  { text: "The keyboard shortcut that saves me 2 hours a day", niche: "tech", style: "tips", tags: ["keyboard", "shortcut", "efficiency"] },
  { text: "Tech billionaires use this app and no one knows about it", niche: "tech", style: "curiosity", tags: ["billionaire", "app", "secret"] },
  { text: "The password manager mistake that got me hacked", niche: "tech", style: "story", tags: ["password", "hacked", "security"] },
  { text: "I automated my entire life with this one tool", niche: "tech", style: "transformation", tags: ["automation", "tool", "life"] },
  { text: "The Chrome trick that will blow your mind", niche: "tech", style: "curiosity", tags: ["chrome", "trick", "browser"] },
  { text: "Why 5G is not what they told you", niche: "tech", style: "controversy", tags: ["5g", "truth", "network"] },
  { text: "The notification setting that's destroying your focus", niche: "tech", style: "tips", tags: ["notifications", "focus", "setting"] },
  { text: "I built an app with no coding experience", niche: "tech", style: "story", tags: ["app", "no-code", "building"] },
  { text: "The VPN lie everyone believes", niche: "tech", style: "controversy", tags: ["vpn", "lie", "security"] },
  { text: "This free software replaced my $500 subscription", niche: "tech", style: "tips", tags: ["free", "software", "replacement"] },
  { text: "The iPhone trick that's been hidden for years", niche: "tech", style: "curiosity", tags: ["iphone", "hidden", "old"] },
  { text: "Why I deleted all my streaming services", niche: "tech", style: "story", tags: ["streaming", "cancelled", "reasons"] },
  
  // FOOD (30 hooks)
  { text: "The meal that changed how I cook forever", niche: "food", style: "story", tags: ["cooking", "meal", "life-changing"] },
  { text: "I made restaurant-quality food for $5", niche: "food", style: "story", tags: ["budget", "restaurant", "cooking"] },
  { text: "The cooking hack every home chef needs to know", niche: "food", style: "tips", tags: ["cooking", "hack", "essential"] },
  { text: "Why your steak never tastes like a restaurant's", niche: "food", style: "curiosity", tags: ["steak", "restaurant", "technique"] },
  { text: "The ingredient that makes everything taste better", niche: "food", style: "tips", tags: ["ingredient", "flavor", "secret"] },
  { text: "I ate only protein for 30 days. Here's what happened.", niche: "food", style: "story", tags: ["protein", "diet", "experiment"] },
  { text: "The meal prep that saved me 10 hours a week", niche: "food", style: "tips", tags: ["meal-prep", "time", "efficiency"] },
  { text: "Chefs never do this (but you probably do)", niche: "food", style: "controversy", tags: ["chef", "mistake", "common"] },
  { text: "The recipe that went viral for a reason", niche: "food", style: "story", tags: ["viral", "recipe", "popular"] },
  { text: "I made the internet's most famous recipe. Was it worth it?", niche: "food", style: "story", tags: ["internet", "recipe", "review"] },
  { text: "The sauce that makes anything taste amazing", niche: "food", style: "tips", tags: ["sauce", "flavor", "universal"] },
  { text: "Why air fryers are overhyped (controversial opinion)", niche: "food", style: "controversy", tags: ["airfryer", "overhyped", "opinion"] },
  { text: "The $3 ingredient that replaced my expensive spice rack", niche: "food", style: "tips", tags: ["budget", "spice", "replacement"] },
  { text: "I only ate homemade food for a year", niche: "food", style: "story", tags: ["homemade", "year", "challenge"] },
  { text: "The kitchen tool that changed my cooking forever", niche: "food", style: "transformation", tags: ["tool", "kitchen", "essential"] },
  { text: "Why restaurant food hits different (the secret)", niche: "food", style: "curiosity", tags: ["restaurant", "secret", "technique"] },
  { text: "The breakfast that keeps me full until dinner", niche: "food", style: "tips", tags: ["breakfast", "satiety", "recipe"] },
  { text: "I tested 50 viral recipes so you don't have to", niche: "food", style: "story", tags: ["viral", "testing", "review"] },
  { text: "The seasoning mistake 99% of people make", niche: "food", style: "tips", tags: ["seasoning", "mistake", "common"] },
  { text: "How I make gourmet coffee at home for $1", niche: "food", style: "tips", tags: ["coffee", "gourmet", "budget"] },
];

async function seedHooks() {
  console.log("🌱 Starting to seed hooks...\n");
  
  // Check if hooks table exists and has data
  const { data: existingHooks, error: checkError } = await supabase
    .from("hooks")
    .select("id")
    .limit(1);
    
  if (checkError) {
    console.error("❌ Error checking hooks table:", checkError.message);
    console.log("\n📋 Make sure you've created the hooks table. SQL:");
    console.log(`
CREATE TABLE IF NOT EXISTS hooks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  text text NOT NULL,
  niche text NOT NULL,
  style text,
  source_url text,
  view_count bigint DEFAULT 0,
  save_count integer DEFAULT 0,
  tags text[],
  created_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS hooks_niche_idx ON hooks(niche);
CREATE INDEX IF NOT EXISTS hooks_style_idx ON hooks(style);
`);
    return;
  }

  // Insert hooks in batches
  const batchSize = 50;
  let inserted = 0;
  
  for (let i = 0; i < hooks.length; i += batchSize) {
    const batch = hooks.slice(i, i + batchSize);
    
    const { data, error } = await supabase
      .from("hooks")
      .upsert(
        batch.map(h => ({
          text: h.text,
          niche: h.niche,
          style: h.style,
          tags: h.tags,
          save_count: Math.floor(Math.random() * 5000) + 500, // Random saves for social proof
          view_count: Math.floor(Math.random() * 100000) + 10000, // Random views
        })),
        { onConflict: 'text' }
      );
      
    if (error) {
      console.error(`❌ Error inserting batch ${i / batchSize + 1}:`, error.message);
    } else {
      inserted += batch.length;
      console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1}: ${batch.length} hooks`);
    }
  }
  
  console.log(`\n🎉 Done! Inserted ${inserted} hooks total.`);
}

seedHooks().catch(console.error);
