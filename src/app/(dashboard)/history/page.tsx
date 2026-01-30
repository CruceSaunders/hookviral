"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  History, 
  Plus, 
  ChevronDown, 
  ChevronUp,
  Copy,
  Check,
  Clock,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Demo data - in production this comes from Supabase
const demoHistory = [
  {
    id: "1",
    topic: "morning routines for productivity",
    niche: "Lifestyle",
    generatedAt: "2 hours ago",
    hooks: [
      "The morning routine that made me a millionaire",
      "Why 5AM is ruining your life (controversial take)",
      "I tried 10 morning routines. Only one worked.",
      "The one thing successful people do before 7AM",
      "Stop doing this in the morning immediately",
    ]
  },
  {
    id: "2",
    topic: "weight loss without dieting",
    niche: "Fitness",
    generatedAt: "Yesterday",
    hooks: [
      "I lost 30 pounds and didn't change my diet once",
      "The exercise no one talks about for weight loss",
      "Why calories don't matter (hear me out)",
      "I did this for 2 weeks and lost 10 pounds",
      "Trainers hate this one simple trick",
    ]
  },
  {
    id: "3",
    topic: "side hustles for beginners",
    niche: "Business",
    generatedAt: "3 days ago",
    hooks: [
      "The side hustle that pays more than my 9-5",
      "I made $5K in my first month doing this",
      "Why everyone is lying about passive income",
      "The skill that's worth more than a degree",
      "How I quit my job in 6 months",
    ]
  },
  {
    id: "4",
    topic: "iPhone tips and tricks",
    niche: "Tech",
    generatedAt: "1 week ago",
    hooks: [
      "iPhone settings you need to change right now",
      "The feature Apple doesn't want you to know about",
      "I've had an iPhone for 10 years and just learned this",
      "Your iPhone can do THIS and no one knows",
      "The setting that's draining your battery",
    ]
  },
];

export default function HistoryPage() {
  const [history] = useState(demoHistory);
  const [expandedId, setExpandedId] = useState<string | null>("1");
  const [copiedHook, setCopiedHook] = useState<string | null>(null);

  const copyHook = (hook: string) => {
    navigator.clipboard.writeText(hook);
    setCopiedHook(hook);
    setTimeout(() => setCopiedHook(null), 2000);
  };

  const copyAll = (hooks: string[]) => {
    const text = hooks.map((h, i) => `${i + 1}. "${h}"`).join('\n\n');
    navigator.clipboard.writeText(text);
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
          {history.length > 0 && (
            <Badge variant="outline" className="border-purple-500/30 text-purple-400">
              <Clock className="h-3 w-3 mr-1" />
              {history.length} generations
            </Badge>
          )}
        </div>

        {history.length === 0 ? (
          <Card className="bg-white/5 border-white/10">
            <CardContent className="py-16 text-center">
              <History className="h-12 w-12 mx-auto mb-4 text-white/20" />
              <h3 className="text-lg font-medium mb-2">No history yet</h3>
              <p className="text-white/40 mb-6">
                Your generated hooks will appear here
              </p>
              <Link href="/generate">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Your First Hooks
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {history.map((generation, index) => (
              <motion.div
                key={generation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-white/5 border-white/10 overflow-hidden">
                  <div
                    className="p-4 cursor-pointer hover:bg-white/5 transition-colors"
                    onClick={() => setExpandedId(expandedId === generation.id ? null : generation.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-pink-400" />
                        </div>
                        <div>
                          <p className="font-medium">"{generation.topic}"</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs border-white/20">
                              {generation.niche}
                            </Badge>
                            <span className="text-xs text-white/40">{generation.generatedAt}</span>
                            <span className="text-xs text-white/40">• {generation.hooks.length} hooks</span>
                          </div>
                        </div>
                      </div>
                      {expandedId === generation.id ? (
                        <ChevronUp className="h-5 w-5 text-white/40" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-white/40" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedId === generation.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/10"
                      >
                        <CardContent className="p-4 pt-4 space-y-3">
                          <div className="flex justify-end mb-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyAll(generation.hooks)}
                              className="border-white/20 text-xs"
                            >
                              {copiedHook === "all" ? (
                                <><Check className="h-3 w-3 mr-1 text-green-400" /> Copied!</>
                              ) : (
                                <><Copy className="h-3 w-3 mr-1" /> Copy All</>
                              )}
                            </Button>
                          </div>
                          {generation.hooks.map((hook, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between p-3 bg-black/30 rounded-lg group"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-white/30 text-sm">{i + 1}.</span>
                                <p className="text-white/80">"{hook}"</p>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyHook(hook)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-white/60 hover:text-white"
                              >
                                {copiedHook === hook ? (
                                  <Check className="h-4 w-4 text-green-400" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          ))}
                          <div className="flex justify-center pt-2">
                            <Link href="/generate">
                              <Button variant="ghost" className="text-pink-400 hover:text-pink-300">
                                <Sparkles className="h-4 w-4 mr-2" />
                                Generate more like this
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Usage tip */}
        {history.length > 0 && (
          <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-lg">
            <p className="text-sm text-white/60">
              💡 <strong className="text-white/80">Pro tip:</strong> Click on any generation to expand it. 
              Use "Generate more like this" to create similar hooks for the same topic.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
