"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  { id: "1", text: "The exercise scientists say you should NEVER do", niche: "fitness", style: "curiosity", saves: 1245 },
  { id: "2", text: "I lost 30 pounds and didn't change my diet once", niche: "fitness", style: "story", saves: 892 },
  { id: "3", text: "I made $100K in 30 days and no one believes how", niche: "business", style: "curiosity", saves: 2341 },
  { id: "4", text: "The business idea that took me from broke to rich", niche: "business", style: "story", saves: 1567 },
  { id: "5", text: "POV: You're the only one who didn't get the memo", niche: "comedy", style: "relatable", saves: 3421 },
  { id: "6", text: "Tell me you're broke without telling me you're broke", niche: "comedy", style: "relatable", saves: 2890 },
  { id: "7", text: "The fact that changed how I see the world", niche: "education", style: "curiosity", saves: 1234 },
  { id: "8", text: "Your teachers lied to you about this", niche: "education", style: "controversy", saves: 1876 },
  { id: "9", text: "I completely changed my life in 6 months. Here's how.", niche: "lifestyle", style: "transformation", saves: 2109 },
  { id: "10", text: "The morning routine that fixed my anxiety", niche: "lifestyle", style: "story", saves: 1543 },
  { id: "11", text: "The skincare product that cleared my skin in 2 weeks", niche: "beauty", style: "transformation", saves: 1876 },
  { id: "12", text: "Skincare ingredients you should NEVER mix", niche: "beauty", style: "warning", saves: 2234 },
  { id: "13", text: "iPhone settings you need to change right now", niche: "tech", style: "tips", saves: 3456 },
  { id: "14", text: "The app that's free but should cost $100", niche: "tech", style: "recommendation", saves: 2789 },
  { id: "15", text: "The meal that changed how I cook forever", niche: "food", style: "story", saves: 1234 },
  { id: "16", text: "I made restaurant-quality food for $5", niche: "food", style: "challenge", saves: 1567 },
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-pink-500" />
            <span className="text-xl font-bold">HookViral</span>
          </div>
          <Button variant="outline" size="sm">Upgrade to Pro</Button>
        </div>

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
                    <Badge variant="outline" className="text-xs border-pink-500/30 text-pink-400">
                      {hook.niche}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-400">
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
