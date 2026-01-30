"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wand2, 
  Copy, 
  Check, 
  RefreshCw,
  ArrowRight,
  Sparkles,
  Lightbulb
} from "lucide-react";
import { Logo } from "@/components/logo";

interface RewrittenHook {
  text: string;
  improvement: string;
}

const improvementOptions = [
  { value: "more_specific", label: "More Specific", desc: "Add concrete details" },
  { value: "add_urgency", label: "Add Urgency", desc: "Create FOMO" },
  { value: "controversial", label: "More Controversial", desc: "Challenge beliefs" },
  { value: "curiosity", label: "More Curiosity", desc: "Create info gap" },
  { value: "shorter", label: "Make Shorter", desc: "Cut to essentials" },
  { value: "story", label: "Story Format", desc: "Personal angle" },
];

export default function RewritePage() {
  const [originalHook, setOriginalHook] = useState("");
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>([]);
  const [rewrites, setRewrites] = useState<RewrittenHook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toggleImprovement = (value: string) => {
    setSelectedImprovements(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const rewriteHook = async () => {
    if (!originalHook.trim()) return;
    
    setIsLoading(true);
    
    // Simulated API call - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response
    const mockRewrites: RewrittenHook[] = [
      {
        text: `The ${originalHook.split(' ').slice(1, 3).join(' ')} secret that changed everything`,
        improvement: "Added mystery and transformation angle",
      },
      {
        text: `Nobody's talking about this ${originalHook.split(' ').slice(-2).join(' ')} hack`,
        improvement: "Added exclusivity and insider knowledge feel",
      },
      {
        text: `I tried ${originalHook.toLowerCase().replace(/[?.!]/g, '')} for 30 days...`,
        improvement: "Converted to personal story format with curiosity",
      },
      {
        text: `Stop! Here's what you're doing wrong with ${originalHook.split(' ').slice(0, 2).join(' ').toLowerCase()}`,
        improvement: "Added urgency and implied mistake",
      },
      {
        text: `The truth about ${originalHook.toLowerCase().replace(/[?.!]/g, '')} no one wants to admit`,
        improvement: "Added controversy and forbidden knowledge angle",
      },
    ];
    
    setRewrites(mockRewrites);
    setIsLoading(false);
  };

  const copyHook = (index: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Wand2 className="h-8 w-8 text-purple-500" />
            Hook Rewriter
          </h1>
          <p className="text-white/60">
            Turn "meh" hooks into scroll-stoppers with AI-powered improvements
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Side */}
          <div className="space-y-6">
            <Card glass className="border-white/10">
              <CardHeader>
                <CardTitle className="text-lg">Your Hook</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your hook here... e.g., 'How to lose weight fast'"
                  value={originalHook}
                  onChange={(e) => setOriginalHook(e.target.value)}
                  className="bg-white/5 border-white/10 text-white min-h-[120px] text-lg"
                />
                
                <div>
                  <label className="text-sm text-white/60 mb-2 block flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    How should we improve it?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {improvementOptions.map((option) => (
                      <Badge
                        key={option.value}
                        variant={selectedImprovements.includes(option.value) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          selectedImprovements.includes(option.value)
                            ? "bg-purple-500 hover:bg-purple-600"
                            : "border-white/20 hover:border-white/40"
                        }`}
                        onClick={() => toggleImprovement(option.value)}
                      >
                        {option.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={rewriteHook}
                  disabled={!originalHook.trim() || isLoading}
                  variant="gradient"
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Rewriting...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Rewrite My Hook
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="bg-purple-500/10 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-purple-300 text-sm mb-1">Pro Tip</p>
                    <p className="text-sm text-white/60">
                      The best hooks create an "information gap" - viewers NEED to know more. Try combining controversy + curiosity for maximum impact.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Output Side */}
          <div>
            <Card className="bg-white/5 border-white/10 h-full">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Improved Versions</span>
                  {rewrites.length > 0 && (
                    <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                      {rewrites.length} rewrites
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {rewrites.length === 0 ? (
                  <div className="text-center py-12 text-white/40">
                    <Wand2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Paste a hook and click Rewrite to see improvements</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    <div className="space-y-4">
                      {rewrites.map((rewrite, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="bg-black/50 border-white/10 hover:border-purple-500/30 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <p className="text-lg font-medium mb-2">"{rewrite.text}"</p>
                                  <p className="text-sm text-purple-400 flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3" />
                                    {rewrite.improvement}
                                  </p>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyHook(index, rewrite.text)}
                                  className="text-white/60 hover:text-white shrink-0"
                                >
                                  {copiedIndex === index ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatePresence>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
