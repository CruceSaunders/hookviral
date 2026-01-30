"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const hooks = [
  "Why your first 3 seconds are failing",
  "The hook formula that went viral",
  "Stop losing viewers immediately",
  "30 pounds down. No diet change.",
  "I got banned for saying this",
  "The creator secret nobody shares",
];

export function HeroMockup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [copied, setCopied] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const hook = hooks[currentIndex];
    setIsTyping(true);
    setDisplayText("");
    
    let i = 0;
    const timer = setInterval(() => {
      if (i < hook.length) {
        setDisplayText(hook.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const generateNew = () => {
    setCurrentIndex((prev) => (prev + 1) % hooks.length);
  };

  const copyHook = () => {
    navigator.clipboard.writeText(hooks[currentIndex]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative max-w-lg mx-auto"
    >
      {/* Glow effect behind card */}
      <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl" />
      
      {/* Main card */}
      <div className="relative bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/30">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
              hookviral.com
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-white/40 text-sm mb-2">Generated hook:</p>
          
          {/* Hook display with typing cursor */}
          <div className="min-h-[72px] flex items-center">
            <p className="text-2xl font-semibold text-white">
              "{displayText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-0.5 h-6 bg-pink-500 ml-1 align-middle"
                />
              )}
              "
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              onClick={generateNew}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate
            </Button>
            <Button
              variant="outline"
              onClick={copyHook}
              className="border-white/20 hover:bg-white/10"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="px-6 py-3 border-t border-white/10 bg-black/20 flex justify-between text-sm">
          <span className="text-white/40">7 words</span>
          <span className="text-pink-400">⚡ High engagement</span>
        </div>
      </div>
    </motion.div>
  );
}
