"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Clock,
  Copy,
  Check,
  Wand2,
  MessageSquare,
  Lightbulb,
  Video,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

interface ExpandedScript {
  hook: string;
  context: string;
  body: string;
  twist: string;
  cta: string;
  fullScript: string;
  estimatedDuration: string;
  speakingTips: string[];
  visualSuggestions: string[];
}

interface ScriptExpanderProps {
  hookText: string;
  niche: string;
  topic?: string;
}

const contentTypes = [
  { value: "hot-take", label: "Hot Take", emoji: "🔥" },
  { value: "storytime", label: "Story Time", emoji: "📖" },
  { value: "tutorial", label: "Tutorial", emoji: "📚" },
  { value: "listicle", label: "Listicle", emoji: "📋" },
  { value: "reaction", label: "Reaction", emoji: "😱" },
];

const durations = [
  { value: "short", label: "15s Quick Hit" },
  { value: "medium", label: "30s Standard" },
  { value: "long", label: "60s Deep Dive" },
];

export function ScriptExpander({ hookText, niche, topic }: ScriptExpanderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [script, setScript] = useState<ExpandedScript | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [duration, setDuration] = useState("medium");
  const [contentType, setContentType] = useState("hot-take");
  const [showTips, setShowTips] = useState(false);
  const [showVisuals, setShowVisuals] = useState(false);

  const expandHook = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/hooks/expand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hook: hookText,
          niche,
          topic,
          duration,
          contentType,
        }),
      });

      const data = await response.json();
      if (data.script) {
        setScript(data.script);
      }
    } catch (error) {
      console.error("Failed to expand hook:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyScript = () => {
    if (script?.fullScript) {
      navigator.clipboard.writeText(script.fullScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sectionColors: Record<string, string> = {
    "[HOOK]": "text-pink-400",
    "[CONTEXT]": "text-blue-400",
    "[BODY]": "text-white",
    "[TWIST]": "text-yellow-400",
    "[CTA]": "text-green-400",
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="text-white/60 hover:text-white hover:bg-purple-500/20"
          title="Expand to full script"
        >
          <FileText className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-900 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-400" />
            Expand Hook to Full Script
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Original Hook */}
          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-sm text-white/50 mb-1">Original Hook:</p>
            <p className="font-medium">"{hookText}"</p>
          </div>

          {/* Options */}
          {!script && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/60 mb-2 block">Duration</label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/10">
                    {durations.map((d) => (
                      <SelectItem key={d.value} value={d.value}>
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-white/60 mb-2 block">Content Type</label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/10">
                    {contentTypes.map((ct) => (
                      <SelectItem key={ct.value} value={ct.value}>
                        {ct.emoji} {ct.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Generate Button */}
          {!script && (
            <Button
              onClick={expandHook}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
            >
              {isLoading ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                  Expanding your hook...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Full Script
                </>
              )}
            </Button>
          )}

          {/* Generated Script */}
          <AnimatePresence>
            {script && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {/* Duration Badge */}
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {script.estimatedDuration}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyScript}
                    className="border-white/20"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 mr-1 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4 mr-1" />
                    )}
                    {copied ? "Copied!" : "Copy Script"}
                  </Button>
                </div>

                {/* Script Sections */}
                <Card className="bg-black/50 border-white/10">
                  <CardContent className="p-4 space-y-4">
                    {/* Hook */}
                    <div>
                      <Badge className="bg-pink-500/20 text-pink-400 mb-2">HOOK (0-3s)</Badge>
                      <p className="text-lg font-medium">"{script.hook}"</p>
                    </div>

                    {/* Context */}
                    <div>
                      <Badge className="bg-blue-500/20 text-blue-400 mb-2">CONTEXT (3-8s)</Badge>
                      <p className="text-white/80">{script.context}</p>
                    </div>

                    {/* Body */}
                    <div>
                      <Badge className="bg-white/10 text-white/80 mb-2">BODY</Badge>
                      <p className="text-white/80">{script.body}</p>
                    </div>

                    {/* Twist */}
                    <div>
                      <Badge className="bg-yellow-500/20 text-yellow-400 mb-2">TWIST ⚡</Badge>
                      <p className="text-white/80 font-medium">{script.twist}</p>
                    </div>

                    {/* CTA */}
                    <div>
                      <Badge className="bg-green-500/20 text-green-400 mb-2">CTA</Badge>
                      <p className="text-white/80 italic">{script.cta}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Speaking Tips */}
                <div
                  className="cursor-pointer"
                  onClick={() => setShowTips(!showTips)}
                >
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-blue-400" />
                      <span className="font-medium">Speaking Tips</span>
                    </div>
                    {showTips ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                  <AnimatePresence>
                    {showTips && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-2 space-y-2 px-3 overflow-hidden"
                      >
                        {script.speakingTips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                            <Lightbulb className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                            {tip}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                {/* Visual Suggestions */}
                <div
                  className="cursor-pointer"
                  onClick={() => setShowVisuals(!showVisuals)}
                >
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-purple-400" />
                      <span className="font-medium">Visual Suggestions</span>
                    </div>
                    {showVisuals ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                  <AnimatePresence>
                    {showVisuals && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-2 space-y-2 px-3 overflow-hidden"
                      >
                        {script.visualSuggestions.map((visual, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                            <span className="text-purple-400">🎬</span>
                            {visual}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                {/* Regenerate Button */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setScript(null);
                  }}
                  className="w-full border-white/20"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Different Version
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
