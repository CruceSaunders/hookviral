"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bookmark, 
  Plus, 
  Copy, 
  Check, 
  Trash2, 
  FileText,
  Share2
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Demo data - in production this comes from Supabase
const demoSavedHooks = [
  { 
    id: "1", 
    text: "I tried this for 30 days and now I can't stop", 
    niche: "Fitness", 
    savedAt: "2 hours ago",
    source: "generated"
  },
  { 
    id: "2", 
    text: "The business mistake that cost me everything", 
    niche: "Business", 
    savedAt: "Yesterday",
    source: "generated"
  },
  { 
    id: "3", 
    text: "Nobody talks about this but it changed my life", 
    niche: "Lifestyle", 
    savedAt: "2 days ago",
    source: "library"
  },
  { 
    id: "4", 
    text: "iPhone settings you need to change right now", 
    niche: "Tech", 
    savedAt: "3 days ago",
    source: "library"
  },
  { 
    id: "5", 
    text: "The morning routine that fixed my anxiety", 
    niche: "Lifestyle", 
    savedAt: "1 week ago",
    source: "generated"
  },
];

export default function SavedPage() {
  const [savedHooks, setSavedHooks] = useState(demoSavedHooks);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
          {savedHooks.length > 0 && (
            <Badge variant="outline" className="border-pink-500/30 text-pink-400">
              <Bookmark className="h-3 w-3 mr-1 fill-current" />
              {savedHooks.length} saved
            </Badge>
          )}
        </div>

        {savedHooks.length === 0 ? (
          <Card className="bg-white/5 border-white/10">
            <CardContent className="py-16 text-center">
              <Bookmark className="h-12 w-12 mx-auto mb-4 text-white/20" />
              <h3 className="text-lg font-medium mb-2">No saved hooks yet</h3>
              <p className="text-white/40 mb-6">
                Start saving hooks from the generator or library
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/generate">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500">
                    <Plus className="h-4 w-4 mr-2" />
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
          <AnimatePresence>
            <div className="space-y-4">
              {savedHooks.map((hook, index) => (
                <motion.div
                  key={hook.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-lg font-medium mb-2">"{hook.text}"</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs border-white/20">
                              {hook.niche}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-white/10 text-white/40">
                              {hook.source === "generated" ? "Generated" : "From Library"}
                            </Badge>
                            <span className="text-xs text-white/40">{hook.savedAt}</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyHook(hook.id, hook.text)}
                            className="text-white/60 hover:text-white"
                            title="Copy hook"
                          >
                            {copiedId === hook.id ? (
                              <Check className="h-4 w-4 text-green-400" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => shareHook(hook.text)}
                            className="text-white/60 hover:text-white hover:bg-blue-500/20"
                            title="Share on Twitter"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteHook(hook.id)}
                            className="text-white/60 hover:text-red-400 hover:bg-red-500/20"
                            title="Remove from saved"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}

        {/* Quick tip */}
        {savedHooks.length > 0 && (
          <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-lg">
            <p className="text-sm text-white/60">
              💡 <strong className="text-white/80">Pro tip:</strong> Use saved hooks as templates. 
              Generate new hooks with similar styles by copying and using them as inspiration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
