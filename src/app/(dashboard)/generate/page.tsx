"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Copy, 
  Check, 
  Bookmark, 
  RefreshCw, 
  ChevronDown,
  Zap,
  Info,
  Flame,
  AlertTriangle,
  FileText,
  Scissors,
  ArrowRight
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { HookOfTheDay } from "@/components/hook-of-the-day";
import { ScriptExpander } from "@/components/script-expander";

interface GeneratedHook {
  text: string;
  style: string;
  explanation: string;
  rating: number;
}

const niches = [
  "Fitness", "Business", "Comedy", "Education", "Lifestyle", 
  "Beauty", "Tech", "Food", "Travel", "Gaming"
];

const styles = [
  { value: "curiosity", label: "Curiosity Gap", desc: "Make them need to know more" },
  { value: "controversy", label: "Controversy", desc: "Challenge common beliefs" },
  { value: "story", label: "Story", desc: "Start an intriguing narrative" },
  { value: "shock", label: "Shock", desc: "Unexpected statement" },
  { value: "question", label: "Question", desc: "Ask something they can't ignore" },
];

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("Fitness");
  const [selectedStyle, setSelectedStyle] = useState("curiosity");
  const [hooks, setHooks] = useState<GeneratedHook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [savedHooks, setSavedHooks] = useState<Set<number>>(new Set());
  const [spicyLevel, setSpicyLevel] = useState([5]); // 1-10 controversy slider
  const [shorteningIndex, setShorteningIndex] = useState<number | null>(null);
  const [shortenedVersions, setShortenedVersions] = useState<Map<number, string>>(new Map());

  const getSpicyLabel = (level: number) => {
    if (level <= 2) return { label: "Safe", color: "text-green-400", emoji: "😇" };
    if (level <= 4) return { label: "Mild", color: "text-blue-400", emoji: "🙂" };
    if (level <= 6) return { label: "Spicy", color: "text-yellow-400", emoji: "🌶️" };
    if (level <= 8) return { label: "Hot", color: "text-orange-400", emoji: "🔥" };
    return { label: "DANGEROUS", color: "text-red-400", emoji: "💀" };
  };

  const generateHooks = async () => {
    if (!topic.trim()) return;
    
    setIsLoading(true);
    
    // Simulated API call - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response - in production this comes from OpenAI
    const mockHooks: GeneratedHook[] = [
      {
        text: `The ${selectedNiche.toLowerCase()} mistake that's costing you everything`,
        style: "curiosity",
        explanation: "Creates urgency by implying they're making a costly error",
        rating: 9
      },
      {
        text: `I tried this for 30 days and now I can't stop`,
        style: "story",
        explanation: "Personal transformation story hooks viewers emotionally",
        rating: 8
      },
      {
        text: `Nobody talks about this but it changed everything`,
        style: "controversy",
        explanation: "Implies secret knowledge that mainstream ignores",
        rating: 9
      },
      {
        text: `What if I told you everything you know about ${topic} is wrong?`,
        style: "shock",
        explanation: "Challenges existing beliefs, creates cognitive dissonance",
        rating: 8
      },
      {
        text: `The one thing successful people never tell you about ${topic}`,
        style: "curiosity",
        explanation: "Implies insider knowledge and exclusivity",
        rating: 9
      },
      {
        text: `Stop doing this immediately if you want results`,
        style: "controversy",
        explanation: "Direct command with implied negative consequences",
        rating: 7
      },
      {
        text: `I was doing ${topic} completely wrong until I learned this`,
        style: "story",
        explanation: "Relatable mistake + promise of solution",
        rating: 8
      },
      {
        text: `The ${topic} hack that got me banned from TikTok`,
        style: "shock",
        explanation: "Implies something so powerful it's almost forbidden",
        rating: 9
      },
      {
        text: `Why ${topic} is easier than you think (controversial take)`,
        style: "controversy",
        explanation: "Challenges difficulty perception, invites debate",
        rating: 7
      },
      {
        text: `Here's what actually works for ${topic} (not what influencers say)`,
        style: "curiosity",
        explanation: "Positions as authentic truth vs fake advice",
        rating: 8
      },
    ];
    
    setHooks(mockHooks);
    setIsLoading(false);
  };

  const copyHook = (index: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const saveHook = (index: number) => {
    setSavedHooks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const shortenHook = async (index: number, hookText: string) => {
    setShorteningIndex(index);
    try {
      const response = await fetch("/api/hooks/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hook: hookText, maxWords: 10 }),
      });
      const data = await response.json();
      if (data.shortened) {
        setShortenedVersions(prev => new Map(prev).set(index, data.shortened));
      }
    } catch (error) {
      console.error("Failed to shorten hook:", error);
    } finally {
      setShorteningIndex(null);
    }
  };

  const useShortened = (index: number) => {
    const shortened = shortenedVersions.get(index);
    if (shortened) {
      setHooks(prev => prev.map((h, i) => 
        i === index ? { ...h, text: shortened } : h
      ));
      setShortenedVersions(prev => {
        const newMap = new Map(prev);
        newMap.delete(index);
        return newMap;
      });
    }
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
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-pink-500/30 text-pink-400">
              <Zap className="h-3 w-3 mr-1" />
              5 hooks remaining today
            </Badge>
            <Button variant="outline" size="sm">Upgrade to Pro</Button>
          </div>
        </div>

        {/* Hook of the Day */}
        <HookOfTheDay />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-lg">Generate Hooks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Topic Input */}
                <div>
                  <label className="text-sm text-white/60 mb-2 block">
                    What's your video about?
                  </label>
                  <Textarea
                    placeholder="e.g., how to lose belly fat, making money online, morning routine..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="bg-white/5 border-white/10 text-white min-h-[100px]"
                  />
                </div>

                {/* Niche Selection */}
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Niche</label>
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

                {/* Style Selection */}
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Hook Style</label>
                  <div className="space-y-2">
                    {styles.map((style) => (
                      <div
                        key={style.value}
                        onClick={() => setSelectedStyle(style.value)}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          selectedStyle === style.value
                            ? "bg-pink-500/20 border border-pink-500/50"
                            : "bg-white/5 border border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="font-medium text-sm">{style.label}</div>
                        <div className="text-xs text-white/50">{style.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Controversy Slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-white/60 flex items-center gap-2">
                      <Flame className="h-4 w-4" />
                      Spicy Level
                    </label>
                    <span className={`text-sm font-medium ${getSpicyLabel(spicyLevel[0]).color}`}>
                      {getSpicyLabel(spicyLevel[0]).emoji} {getSpicyLabel(spicyLevel[0]).label}
                    </span>
                  </div>
                  <Slider
                    value={spicyLevel}
                    onValueChange={setSpicyLevel}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-white/40">
                    <span>Safe for work</span>
                    <span>Might get cancelled</span>
                  </div>
                  {spicyLevel[0] >= 9 && (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <span className="text-xs text-red-400">
                        High controversy - use at your own risk! 😈
                      </span>
                    </div>
                  )}
                </div>

                {/* Generate Button */}
                <Button 
                  onClick={generateHooks}
                  disabled={!topic.trim() || isLoading}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate 10 Hooks
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Generated Hooks</span>
                  {hooks.length > 0 && (
                    <span className="text-sm font-normal text-white/50">
                      {hooks.length} hooks
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {hooks.length === 0 ? (
                  <div className="text-center py-16 text-white/40">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Enter a topic and click Generate to create hooks</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    <div className="space-y-4">
                      {hooks.map((hook, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="bg-black/50 border-white/10 hover:border-white/20 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <p className="text-lg font-medium mb-2">"{hook.text}"</p>
                                  
                                  {/* Shortened version display */}
                                  {shortenedVersions.has(index) && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      className="mb-3 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg"
                                    >
                                      <div className="flex items-center gap-2 text-xs text-orange-400 mb-1">
                                        <Scissors className="h-3 w-3" />
                                        Shortened version:
                                      </div>
                                      <p className="text-white font-medium">"{shortenedVersions.get(index)}"</p>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => useShortened(index)}
                                        className="mt-2 text-orange-400 hover:text-orange-300 hover:bg-orange-500/20 text-xs"
                                      >
                                        <ArrowRight className="h-3 w-3 mr-1" />
                                        Use this version
                                      </Button>
                                    </motion.div>
                                  )}
                                  
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <Badge variant="outline" className="text-xs border-white/20">
                                      {hook.style}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-yellow-500 text-xs">
                                      {"★".repeat(Math.round(hook.rating / 2))}
                                      <span className="text-white/40 ml-1">{hook.rating}/10</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs border-white/10 text-white/40">
                                      {hook.text.split(" ").length} words
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-white/50 mt-2 flex items-start gap-1">
                                    <Info className="h-4 w-4 shrink-0 mt-0.5" />
                                    {hook.explanation}
                                  </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <div className="flex gap-1">
                                    <ScriptExpander
                                      hookText={hook.text}
                                      niche={selectedNiche}
                                      topic={topic}
                                    />
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => shortenHook(index, hook.text)}
                                      disabled={shorteningIndex === index || hook.text.split(" ").length <= 10}
                                      className="text-white/60 hover:text-white hover:bg-orange-500/20"
                                      title="Make it shorter"
                                    >
                                      {shorteningIndex === index ? (
                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                      ) : (
                                        <Scissors className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  <div className="flex gap-1">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => copyHook(index, hook.text)}
                                      className="text-white/60 hover:text-white"
                                    >
                                      {copiedIndex === index ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => saveHook(index)}
                                      className={savedHooks.has(index) ? "text-pink-500" : "text-white/60 hover:text-white"}
                                    >
                                      <Bookmark className={`h-4 w-4 ${savedHooks.has(index) ? "fill-current" : ""}`} />
                                    </Button>
                                  </div>
                                </div>
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
