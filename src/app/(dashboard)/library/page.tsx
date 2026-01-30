"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NicheBadge } from "@/components/niche-badge";
import { motion } from "framer-motion";
import { 
  Search,
  Copy, 
  Check, 
  Bookmark, 
  Sparkles,
  Filter,
  TrendingUp
} from "lucide-react";

// Sample hook library data - in production this comes from Supabase
const hookLibrary = [
  // FITNESS (15 hooks)
  { id: "1", text: "The exercise scientists say you should NEVER do", niche: "fitness", style: "curiosity", saves: 1245 },
  { id: "2", text: "I lost 30 pounds and didn't change my diet once", niche: "fitness", style: "story", saves: 892 },
  { id: "3", text: "The gym hack that doubled my gains in 4 weeks", niche: "fitness", style: "transformation", saves: 2341 },
  { id: "4", text: "Stop doing this exercise immediately if you value your joints", niche: "fitness", style: "controversy", saves: 1876 },
  { id: "5", text: "I trained like a Navy SEAL for 30 days. Here's what happened.", niche: "fitness", style: "story", saves: 3421 },
  { id: "6", text: "Why your protein shake is making you fat", niche: "fitness", style: "controversy", saves: 2109 },
  { id: "7", text: "The 5-minute workout that burns more than 1 hour of cardio", niche: "fitness", style: "curiosity", saves: 4567 },
  { id: "8", text: "Personal trainers HATE when I share this", niche: "fitness", style: "controversy", saves: 2890 },
  { id: "9", text: "I went from 0 to 100 pushups in 30 days. Here's the method.", niche: "fitness", style: "transformation", saves: 1543 },
  { id: "10", text: "The muscle you're ignoring that's killing your posture", niche: "fitness", style: "tips", saves: 1234 },
  { id: "11", text: "What happens if you walk 10K steps every day for a year", niche: "fitness", style: "story", saves: 3456 },
  { id: "12", text: "The supplement industry doesn't want you to know this", niche: "fitness", style: "controversy", saves: 2789 },
  { id: "13", text: "I fixed my back pain with one exercise. Takes 2 minutes.", niche: "fitness", style: "tips", saves: 5678 },
  { id: "14", text: "Why skinny guys can't build muscle (and how I fixed it)", niche: "fitness", style: "story", saves: 1987 },
  { id: "15", text: "The workout split that transformed my physique", niche: "fitness", style: "transformation", saves: 2345 },
  
  // BUSINESS (15 hooks)
  { id: "16", text: "I made $100K in 30 days and no one believes how", niche: "business", style: "curiosity", saves: 2341 },
  { id: "17", text: "The business idea that took me from broke to rich", niche: "business", style: "story", saves: 1567 },
  { id: "18", text: "How I make $10K/month working 4 hours a week", niche: "business", style: "story", saves: 4567 },
  { id: "19", text: "The side hustle that pays more than my 9-5", niche: "business", style: "story", saves: 3456 },
  { id: "20", text: "Why most small businesses fail (and how to avoid it)", niche: "business", style: "tips", saves: 2345 },
  { id: "21", text: "The email that landed me a $50K client", niche: "business", style: "story", saves: 1876 },
  { id: "22", text: "Rich people do THIS differently and it changed everything", niche: "business", style: "curiosity", saves: 5678 },
  { id: "23", text: "I quit my job and 6 months later this happened", niche: "business", style: "story", saves: 4321 },
  { id: "24", text: "The negotiation trick that doubled my salary", niche: "business", style: "tips", saves: 2987 },
  { id: "25", text: "Why working harder won't make you rich", niche: "business", style: "controversy", saves: 3654 },
  { id: "26", text: "The skill that's worth more than a college degree", niche: "business", style: "controversy", saves: 2876 },
  { id: "27", text: "I failed 7 businesses before this one made me a millionaire", niche: "business", style: "story", saves: 4567 },
  { id: "28", text: "The one investment that changed my financial life", niche: "business", style: "story", saves: 3210 },
  { id: "29", text: "How I automated my income (step by step)", niche: "business", style: "tips", saves: 5432 },
  { id: "30", text: "The LinkedIn strategy that got me 50 job offers", niche: "business", style: "tips", saves: 2198 },

  // COMEDY (12 hooks)
  { id: "31", text: "POV: You're the only one who didn't get the memo", niche: "comedy", style: "relatable", saves: 3421 },
  { id: "32", text: "Tell me you're broke without telling me you're broke", niche: "comedy", style: "relatable", saves: 2890 },
  { id: "33", text: "When your mom says 'we have food at home'", niche: "comedy", style: "relatable", saves: 4567 },
  { id: "34", text: "Me explaining why I need another plant", niche: "comedy", style: "relatable", saves: 3456 },
  { id: "35", text: "That one friend who's always 'on my way'", niche: "comedy", style: "relatable", saves: 5678 },
  { id: "36", text: "POV: You said 'I'll just have water' at a restaurant", niche: "comedy", style: "relatable", saves: 2345 },
  { id: "37", text: "Nobody: ... Me at 3am:", niche: "comedy", style: "relatable", saves: 4321 },
  { id: "38", text: "Things that live rent free in my head:", niche: "comedy", style: "relatable", saves: 3987 },
  { id: "39", text: "My last brain cell trying to adult:", niche: "comedy", style: "relatable", saves: 4567 },
  { id: "40", text: "When you lie on your resume and get the job", niche: "comedy", style: "relatable", saves: 5432 },
  { id: "41", text: "Me pretending to be surprised at my own birthday party", niche: "comedy", style: "relatable", saves: 2876 },
  { id: "42", text: "Dating in 2026 be like:", niche: "comedy", style: "relatable", saves: 6543 },

  // EDUCATION (12 hooks)
  { id: "43", text: "The fact that changed how I see the world", niche: "education", style: "curiosity", saves: 1234 },
  { id: "44", text: "Your teachers lied to you about this", niche: "education", style: "controversy", saves: 1876 },
  { id: "45", text: "What they don't teach you in school about money", niche: "education", style: "controversy", saves: 3456 },
  { id: "46", text: "The psychological trick that changes everything", niche: "education", style: "curiosity", saves: 2345 },
  { id: "47", text: "I read 100 books this year. Here's what I learned.", niche: "education", style: "story", saves: 4567 },
  { id: "48", text: "The study method that got me into Harvard", niche: "education", style: "tips", saves: 5678 },
  { id: "49", text: "Why everything you know about history is wrong", niche: "education", style: "controversy", saves: 2987 },
  { id: "50", text: "The science behind why you're always tired", niche: "education", style: "curiosity", saves: 3654 },
  { id: "51", text: "One fact that will make you question reality", niche: "education", style: "curiosity", saves: 4321 },
  { id: "52", text: "The skill that takes 20 hours to learn but lasts forever", niche: "education", style: "tips", saves: 2876 },
  { id: "53", text: "How to learn any language in 6 months (scientifically)", niche: "education", style: "tips", saves: 5432 },
  { id: "54", text: "The memory technique that changed how I study", niche: "education", style: "transformation", saves: 3210 },

  // LIFESTYLE (12 hooks)
  { id: "55", text: "I completely changed my life in 6 months. Here's how.", niche: "lifestyle", style: "transformation", saves: 2109 },
  { id: "56", text: "The morning routine that fixed my anxiety", niche: "lifestyle", style: "story", saves: 1543 },
  { id: "57", text: "5AM vs 9AM: I tested both for 30 days", niche: "lifestyle", style: "story", saves: 4567 },
  { id: "58", text: "The habit that ruined my life (stop doing this)", niche: "lifestyle", style: "controversy", saves: 3456 },
  { id: "59", text: "How I went from depressed to thriving", niche: "lifestyle", style: "transformation", saves: 5678 },
  { id: "60", text: "The one thing I removed that changed everything", niche: "lifestyle", style: "curiosity", saves: 2345 },
  { id: "61", text: "Why I wake up at 4AM (and why you should too)", niche: "lifestyle", style: "controversy", saves: 4321 },
  { id: "62", text: "The journal practice that made me rich", niche: "lifestyle", style: "story", saves: 3987 },
  { id: "63", text: "I deleted social media for a year. Here's what happened.", niche: "lifestyle", style: "story", saves: 6543 },
  { id: "64", text: "The minimalist trick that saved me $10K", niche: "lifestyle", style: "tips", saves: 2876 },
  { id: "65", text: "How to actually stick to your New Year's resolution", niche: "lifestyle", style: "tips", saves: 4567 },
  { id: "66", text: "The evening routine that helped me sleep like a baby", niche: "lifestyle", style: "tips", saves: 3210 },

  // BEAUTY (12 hooks)
  { id: "67", text: "The skincare product that cleared my skin in 2 weeks", niche: "beauty", style: "transformation", saves: 1876 },
  { id: "68", text: "Skincare ingredients you should NEVER mix", niche: "beauty", style: "tips", saves: 2234 },
  { id: "69", text: "I tried the viral skincare routine for 30 days", niche: "beauty", style: "story", saves: 4567 },
  { id: "70", text: "Dermatologists don't want you to know this", niche: "beauty", style: "controversy", saves: 5678 },
  { id: "71", text: "The $5 product that replaced my entire routine", niche: "beauty", style: "tips", saves: 3456 },
  { id: "72", text: "Why your skin is breaking out (it's not what you think)", niche: "beauty", style: "curiosity", saves: 2987 },
  { id: "73", text: "The makeup hack that changed my entire look", niche: "beauty", style: "transformation", saves: 4321 },
  { id: "74", text: "I spent $1000 on skincare. Here's what actually works.", niche: "beauty", style: "story", saves: 5432 },
  { id: "75", text: "The ingredient that's in 90% of products but shouldn't be", niche: "beauty", style: "controversy", saves: 3654 },
  { id: "76", text: "How I got rid of acne scars in 3 months", niche: "beauty", style: "transformation", saves: 6543 },
  { id: "77", text: "The sunscreen mistake that's aging your skin", niche: "beauty", style: "tips", saves: 2876 },
  { id: "78", text: "Celebrity makeup secrets they don't want you to know", niche: "beauty", style: "curiosity", saves: 4567 },

  // TECH (12 hooks)
  { id: "79", text: "iPhone settings you need to change right now", niche: "tech", style: "tips", saves: 3456 },
  { id: "80", text: "The app that's free but should cost $100", niche: "tech", style: "tips", saves: 2789 },
  { id: "81", text: "Why I switched from iPhone to Android (and back)", niche: "tech", style: "story", saves: 4567 },
  { id: "82", text: "The AI tool that does my work for me", niche: "tech", style: "tips", saves: 6789 },
  { id: "83", text: "Hidden iPhone features Apple doesn't advertise", niche: "tech", style: "curiosity", saves: 5678 },
  { id: "84", text: "The browser extension that changed how I work", niche: "tech", style: "tips", saves: 3456 },
  { id: "85", text: "I tested every AI tool. Here's the only one worth using.", niche: "tech", style: "story", saves: 7890 },
  { id: "86", text: "Why your phone is listening to you (and how to stop it)", niche: "tech", style: "controversy", saves: 5432 },
  { id: "87", text: "The keyboard shortcut that saves me 2 hours a day", niche: "tech", style: "tips", saves: 4321 },
  { id: "88", text: "Tech billionaires use this app and no one knows about it", niche: "tech", style: "curiosity", saves: 3987 },
  { id: "89", text: "The password manager mistake that got me hacked", niche: "tech", style: "story", saves: 2876 },
  { id: "90", text: "I automated my entire life with this one tool", niche: "tech", style: "transformation", saves: 5678 },

  // FOOD (12 hooks)
  { id: "91", text: "The meal that changed how I cook forever", niche: "food", style: "story", saves: 1234 },
  { id: "92", text: "I made restaurant-quality food for $5", niche: "food", style: "story", saves: 1567 },
  { id: "93", text: "The cooking hack every home chef needs to know", niche: "food", style: "tips", saves: 3456 },
  { id: "94", text: "Why your steak never tastes like a restaurant's", niche: "food", style: "curiosity", saves: 4567 },
  { id: "95", text: "The ingredient that makes everything taste better", niche: "food", style: "tips", saves: 5678 },
  { id: "96", text: "I ate only protein for 30 days. Here's what happened.", niche: "food", style: "story", saves: 3987 },
  { id: "97", text: "The meal prep that saved me 10 hours a week", niche: "food", style: "tips", saves: 2876 },
  { id: "98", text: "Chefs never do this (but you probably do)", niche: "food", style: "controversy", saves: 4321 },
  { id: "99", text: "The recipe that went viral for a reason", niche: "food", style: "story", saves: 6543 },
  { id: "100", text: "I made the internet's most famous recipe. Was it worth it?", niche: "food", style: "story", saves: 5432 },
  { id: "101", text: "The sauce that makes anything taste amazing", niche: "food", style: "tips", saves: 3654 },
  { id: "102", text: "Why air fryers are overhyped (controversial opinion)", niche: "food", style: "controversy", saves: 4567 },
];

const niches = ["All", "Fitness", "Business", "Comedy", "Education", "Lifestyle", "Beauty", "Tech", "Food"];
const styles = ["All", "Curiosity", "Story", "Controversy", "Relatable", "Tips", "Transformation"];

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedHooks, setSavedHooks] = useState<Set<string>>(new Set());

  const filteredHooks = hookLibrary.filter(hook => {
    const matchesSearch = hook.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNiche = selectedNiche === "All" || hook.niche.toLowerCase() === selectedNiche.toLowerCase();
    const matchesStyle = selectedStyle === "All" || hook.style.toLowerCase() === selectedStyle.toLowerCase();
    return matchesSearch && matchesNiche && matchesStyle;
  });

  const copyHook = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const saveHook = (id: string) => {
    setSavedHooks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {/* Header hidden - using nav bar */}

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Hook Library</h1>
          <p className="text-white/60">Browse 10,000+ proven viral hooks by niche</p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/5 border-white/10 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  placeholder="Search hooks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>

            {/* Niche Filters */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="h-4 w-4 text-white/40" />
                <span className="text-sm text-white/60">Niche</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {niches.map((niche) => (
                  <Badge
                    key={niche}
                    variant={selectedNiche === niche ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedNiche === niche 
                        ? "bg-pink-500 hover:bg-pink-600" 
                        : "border-white/20 hover:border-white/40"
                    }`}
                    onClick={() => setSelectedNiche(niche)}
                  >
                    {niche}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Style Filters */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-white/40" />
                <span className="text-sm text-white/60">Style</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {styles.map((style) => (
                  <Badge
                    key={style}
                    variant={selectedStyle === style ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedStyle === style 
                        ? "bg-purple-500 hover:bg-purple-600" 
                        : "border-white/20 hover:border-white/40"
                    }`}
                    onClick={() => setSelectedStyle(style)}
                  >
                    {style}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-4 text-white/60 text-sm">
          Showing {filteredHooks.length} hooks
        </div>

        {/* Hook Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHooks.map((hook, index) => (
            <motion.div
              key={hook.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-all h-full">
                <CardContent className="p-4">
                  <p className="text-white mb-3 font-medium leading-relaxed">
                    "{hook.text}"
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <NicheBadge niche={hook.niche} size="sm" />
                    <Badge variant="outline" className="text-xs border-white/20 text-white/60">
                      {hook.style}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">
                      {hook.saves.toLocaleString()} saves
                    </span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyHook(hook.id, hook.text)}
                        className="h-8 w-8 p-0 text-white/60 hover:text-white"
                      >
                        {copiedId === hook.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => saveHook(hook.id)}
                        className={`h-8 w-8 p-0 ${
                          savedHooks.has(hook.id) 
                            ? "text-pink-500" 
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        <Bookmark className={`h-4 w-4 ${savedHooks.has(hook.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {filteredHooks.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" className="border-white/20">
              Load More Hooks
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredHooks.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-12 w-12 mx-auto mb-4 text-white/20" />
            <p className="text-white/40">No hooks found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
