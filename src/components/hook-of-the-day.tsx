"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NicheBadge } from "@/components/niche-badge";

// Daily hooks - rotate based on date
const dailyHooks = [
  {
    text: "The one thing successful people never tell you",
    niche: "Business",
    tip: "Creates curiosity gap + implies insider knowledge",
  },
  {
    text: "I tried this for 30 days and everything changed",
    niche: "Lifestyle",
    tip: "Personal story + transformation = emotional hook",
  },
  {
    text: "Stop doing this immediately if you want results",
    niche: "Fitness",
    tip: "Direct command + implied mistake creates urgency",
  },
  {
    text: "Nobody talks about this but it's the secret to...",
    niche: "Education",
    tip: "Controversy + exclusivity = must-watch content",
  },
  {
    text: "What if I told you everything you know is wrong?",
    niche: "General",
    tip: "Challenge beliefs = cognitive dissonance = engagement",
  },
  {
    text: "The hack that got me banned from TikTok",
    niche: "Tech",
    tip: "Implies forbidden knowledge - irresistible curiosity",
  },
  {
    text: "I was doing this completely wrong until...",
    niche: "General",
    tip: "Relatable mistake + promise of revelation",
  },
];

export function HookOfTheDay() {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  
  // Get hook based on day of year
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const todayHook = dailyHooks[dayOfYear % dailyHooks.length];

  const copyHook = () => {
    navigator.clipboard.writeText(todayHook.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Card className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/20 mb-6">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-pink-400" />
                  <span className="text-sm font-medium text-pink-400">
                    Hook of the Day
                  </span>
                  <NicheBadge niche={todayHook.niche} size="sm" />
                </div>
                <p className="text-lg font-medium text-white mb-2">
                  "{todayHook.text}"
                </p>
                <p className="text-sm text-white/50">
                  💡 {todayHook.tip}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyHook}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsVisible(false)}
                  className="text-white/40 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
