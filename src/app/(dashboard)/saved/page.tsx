"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bookmark, 
  Plus, 
  Copy, 
  Check, 
  Trash2, 
  Share2,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface SavedHook {
  id: string;
  text: string;
  niche: string;
  savedAt: string;
  source: string;
}

export default function SavedPage() {
  const [savedHooks, setSavedHooks] = useState<SavedHook[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved hooks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("hookviral_saved");
    if (stored) {
      try {
        setSavedHooks(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading saved hooks:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever hooks change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("hookviral_saved", JSON.stringify(savedHooks));
    }
  }, [savedHooks, isLoaded]);

  const copyHook = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteHook = (id: string) => {
    setSavedHooks(prev => prev.filter(h => h.id !== id));
  };

  const shareHook = (text: string) => {
    const tweetText = `🎣 TikTok hook idea:\n\n"${text}"\n\nGenerated with HookViral ⚡`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Saved Hooks</h1>
            <p className="text-white/60">Your collection of favorite hooks</p>
          </div>
          <Badge variant="outline" className="border-pink-500/30 text-pink-400">
            <Bookmark className="h-3 w-3 mr-1" />
            {savedHooks.length} saved
          </Badge>
        </div>

        {savedHooks.length === 0 ? (
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Bookmark className="h-8 w-8 text-white/40" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No saved hooks yet</h3>
              <p className="text-white/60 mb-6">
                Generate hooks and click the bookmark icon to save your favorites here.
              </p>
              <div className="flex gap-3 justify-center">
                <Link href="/generate">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Hooks
                  </Button>
                </Link>
                <Link href="/library">
                  <Button variant="outline" className="border-white/20">
                    Browse Library
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {savedHooks.map((hook) => (
                <motion.div
                  key={hook.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                >
                  <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-lg font-medium mb-3">&ldquo;{hook.text}&rdquo;</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Badge variant="secondary" className="bg-white/10">
                              {hook.niche}
                            </Badge>
                            <Badge variant="outline" className="border-white/10 text-white/60">
                              {hook.source === "generated" ? "Generated" : "From Library"}
                            </Badge>
                            <span className="text-white/40">{hook.savedAt}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyHook(hook.id, hook.text)}
                            className="text-white/60 hover:text-white"
                          >
                            {copiedId === hook.id ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => shareHook(hook.text)}
                            className="text-white/60 hover:text-white"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteHook(hook.id)}
                            className="text-white/60 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
