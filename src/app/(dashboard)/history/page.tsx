"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  History, 
  ChevronDown, 
  ChevronUp,
  Copy,
  Check,
  Clock,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface HistoryEntry {
  id: string;
  topic: string;
  niche: string;
  generatedAt: string;
  hooks: string[];
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedHook, setCopiedHook] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("hookviral_history");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
        if (parsed.length > 0) {
          setExpandedId(parsed[0].id);
        }
      } catch (e) {
        console.error("Error loading history:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const copyHook = (hook: string) => {
    navigator.clipboard.writeText(hook);
    setCopiedHook(hook);
    setTimeout(() => setCopiedHook(null), 2000);
  };

  const copyAll = (hooks: string[]) => {
    navigator.clipboard.writeText(hooks.join("\n\n"));
    setCopiedHook("all");
    setTimeout(() => setCopiedHook(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Generation History</h1>
            <p className="text-white/60">Your past hook generations</p>
          </div>
          <Badge variant="outline" className="border-white/10">
            <Clock className="h-3 w-3 mr-1" />
            {history.length} generations
          </Badge>
        </div>

        {history.length === 0 ? (
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <History className="h-8 w-8 text-white/40" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No generations yet</h3>
              <p className="text-white/60 mb-6">
                Your hook generation history will appear here after you generate your first hooks.
              </p>
              <Link href="/generate">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Your First Hooks
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {history.map((generation) => (
              <Card 
                key={generation.id}
                className="bg-white/5 border-white/10 hover:border-white/20 transition-colors overflow-hidden"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedId(expandedId === generation.id ? null : generation.id)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-pink-400" />
                      </div>
                      <div>
                        <p className="font-medium">&ldquo;{generation.topic}&rdquo;</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="bg-white/10 text-xs">
                            {generation.niche}
                          </Badge>
                          <span className="text-white/40 text-sm">{generation.generatedAt}</span>
                          <span className="text-white/40 text-sm">• {generation.hooks.length} hooks</span>
                        </div>
                      </div>
                    </div>
                    {expandedId === generation.id ? (
                      <ChevronUp className="h-5 w-5 text-white/40" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-white/40" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedId === generation.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 border-t border-white/10">
                          <div className="flex justify-end pt-4 mb-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyAll(generation.hooks)}
                              className="text-white/60 hover:text-white"
                            >
                              {copiedHook === "all" ? (
                                <Check className="h-4 w-4 mr-2 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4 mr-2" />
                              )}
                              Copy All
                            </Button>
                          </div>
                          <div className="space-y-3">
                            {generation.hooks.map((hook, index) => (
                              <div 
                                key={index}
                                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-white/40 text-sm w-6">{index + 1}.</span>
                                  <p className="text-white/90">&ldquo;{hook}&rdquo;</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => copyHook(hook)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity text-white/60 hover:text-white"
                                >
                                  {copiedHook === hook ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <Link href="/generate">
                              <Button variant="ghost" className="text-pink-400 hover:text-pink-300">
                                <Sparkles className="h-4 w-4 mr-2" />
                                Generate more like this
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
