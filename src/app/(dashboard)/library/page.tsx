"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NicheBadge } from "@/components/niche-badge";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { 
  Search,
  Copy, 
  Check, 
  Bookmark, 
  Sparkles,
  Filter,
  TrendingUp,
  Loader2,
  FileText,
  RefreshCw,
  Play,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  ExternalLink,
  Zap,
  Clock,
  ChevronRight,
  ArrowRight,
  Flame,
} from "lucide-react";

// Types for research results
interface ResearchedVideo {
  id: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  creator: string;
  creatorHandle: string;
  hookText: string;
  hookType: string;
  aiSummary: string;
  transcript?: string;
  videoUrl: string;
  duration: number;
  niche: string;
  postedAt: string;
}

interface HookAnalysis {
  hookType: string;
  whyItWorks: string;
  similarTemplates: string[];
}

// Niches for research
const niches = [
  { id: "fitness", label: "Fitness", emoji: "💪" },
  { id: "business", label: "Business", emoji: "💰" },
  { id: "comedy", label: "Comedy", emoji: "😂" },
  { id: "education", label: "Education", emoji: "📚" },
  { id: "lifestyle", label: "Lifestyle", emoji: "✨" },
  { id: "beauty", label: "Beauty", emoji: "💄" },
  { id: "tech", label: "Tech", emoji: "🚀" },
  { id: "food", label: "Food", emoji: "🍕" },
  { id: "finance", label: "Finance", emoji: "📈" },
  { id: "gaming", label: "Gaming", emoji: "🎮" },
];

// Mock research results (will be replaced with Apify data)
const getMockResults = (niche: string, minViews: number): ResearchedVideo[] => {
  const templates = [
    { hook: "The ${niche} mistake that's costing you everything", type: "curiosity" },
    { hook: "I tried this for 30 days and now I can't stop", type: "story" },
    { hook: "Nobody talks about this but it changed my ${niche}", type: "controversy" },
    { hook: "Stop doing this immediately if you want results", type: "command" },
    { hook: "The one thing successful people never tell you", type: "exclusivity" },
    { hook: "POV: You finally figured out ${niche}", type: "relatable" },
    { hook: "This ${niche} hack got me banned", type: "shock" },
    { hook: "What if I told you everything you know is wrong?", type: "challenge" },
    { hook: "The secret nobody wants to share about ${niche}", type: "curiosity" },
    { hook: "I was doing ${niche} wrong for 10 years", type: "story" },
  ];

  const creators = ["@fitnessguru", "@moneymaestro", "@techwhiz", "@lifestyleboss", "@comedyking"];
  
  return templates.map((t, i) => ({
    id: `vid-${niche}-${i}`,
    thumbnail: `https://picsum.photos/seed/${niche}${i}/400/600`,
    views: Math.floor(minViews + Math.random() * 5000000),
    likes: Math.floor(50000 + Math.random() * 500000),
    comments: Math.floor(1000 + Math.random() * 50000),
    shares: Math.floor(5000 + Math.random() * 100000),
    creator: `${niche.charAt(0).toUpperCase() + niche.slice(1)} Creator ${i + 1}`,
    creatorHandle: creators[i % creators.length],
    hookText: t.hook.replace(/\$\{niche\}/g, niche),
    hookType: t.type,
    aiSummary: `A viral ${niche} video that uses the ${t.type} technique to hook viewers in the first 3 seconds.`,
    videoUrl: `https://tiktok.com/@example/video/${Date.now() + i}`,
    duration: 15 + Math.floor(Math.random() * 45),
    niche,
    postedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

export default function ResearchPage() {
  // Research state
  const [selectedNiche, setSelectedNiche] = useState("fitness");
  const [customKeyword, setCustomKeyword] = useState("");
  const [minViews, setMinViews] = useState([500000]);
  const [dateRange, setDateRange] = useState("30days");
  
  // Results state
  const [results, setResults] = useState<ResearchedVideo[]>([]);
  const [isResearching, setIsResearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // UI state
  const [selectedVideo, setSelectedVideo] = useState<ResearchedVideo | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedVideos, setSavedVideos] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const doResearch = async () => {
    setIsResearching(true);
    setHasSearched(true);
    
    // TODO: Replace with actual Apify API call
    // For now, simulate API delay and return mock data
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResults = getMockResults(selectedNiche, minViews[0]);
    setResults(mockResults);
    setIsResearching(false);
    
    toast.success(`Found ${mockResults.length} viral videos in ${selectedNiche}!`);
  };

  const copyHook = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Hook copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const saveVideo = (id: string) => {
    setSavedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        toast("Removed from saved");
      } else {
        newSet.add(id);
        toast.success("Saved to your library!");
      }
      return newSet;
    });
  };

  const useHook = (hookText: string) => {
    // Navigate to generate page with hook pre-filled
    navigator.clipboard.writeText(hookText);
    toast.success("Hook copied! Go to Generate to create variations.");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/20">
              <Search className="h-5 w-5 text-pink-400" />
            </div>
            <h1 className="text-3xl font-bold">TikTok Research</h1>
            <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">Beta</Badge>
          </div>
          <p className="text-white/60">Research viral TikToks in any niche and extract proven hooks</p>
        </div>

        {/* Research Controls */}
        <Card glass className="border-white/10 mb-8">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Niche Selection */}
              <div>
                <label className="text-sm text-white/60 mb-3 block flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Select Niche
                </label>
                <div className="flex flex-wrap gap-2">
                  {niches.map((niche) => (
                    <Badge
                      key={niche.id}
                      variant={selectedNiche === niche.id ? "default" : "outline"}
                      className={`cursor-pointer text-sm py-1.5 px-3 transition-all ${
                        selectedNiche === niche.id 
                          ? "bg-gradient-to-r from-pink-500 to-purple-500 border-0 shadow-lg shadow-pink-500/20" 
                          : "border-white/10 hover:border-white/30 bg-white/5"
                      }`}
                      onClick={() => setSelectedNiche(niche.id)}
                    >
                      <span className="mr-1">{niche.emoji}</span>
                      {niche.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Custom Keyword (Optional) */}
              <div>
                <label className="text-sm text-white/60 mb-2 block">
                  Custom keyword (optional)
                </label>
                <Input
                  placeholder="e.g., morning routine, weight loss, side hustle..."
                  value={customKeyword}
                  onChange={(e) => setCustomKeyword(e.target.value)}
                  icon={<Search className="h-4 w-4" />}
                />
              </div>

              {/* Filters Row */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Min Views */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-white/60 flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Minimum Views
                    </label>
                    <span className="text-sm font-medium text-pink-400">
                      {formatNumber(minViews[0])}+
                    </span>
                  </div>
                  <Slider
                    value={minViews}
                    onValueChange={setMinViews}
                    min={100000}
                    max={10000000}
                    step={100000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-white/30 mt-1">
                    <span>100K</span>
                    <span>10M+</span>
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <label className="text-sm text-white/60 mb-2 block flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Date Range
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: "7days", label: "7 days" },
                      { value: "30days", label: "30 days" },
                      { value: "90days", label: "90 days" },
                      { value: "all", label: "All time" },
                    ].map((option) => (
                      <Badge
                        key={option.value}
                        variant={dateRange === option.value ? "default" : "outline"}
                        className={`cursor-pointer ${
                          dateRange === option.value 
                            ? "bg-white/10 border-white/20" 
                            : "border-white/10 hover:border-white/20"
                        }`}
                        onClick={() => setDateRange(option.value)}
                      >
                        {option.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Research Button */}
              <Button 
                onClick={doResearch}
                disabled={isResearching}
                className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-lg hover:shadow-pink-500/25 transition-all text-base font-medium"
              >
                {isResearching ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Researching viral videos...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Research 100+ Viral TikToks
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-center text-white/40 text-xs">
                This will analyze ~100 viral TikToks and extract proven hooks
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isResearching && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-[#141414] border-white/5 overflow-hidden">
                <div className="aspect-[9/16] bg-white/5 skeleton" />
                <CardContent className="p-4 space-y-3">
                  <div className="h-4 bg-white/5 rounded skeleton w-3/4" />
                  <div className="h-3 bg-white/5 rounded skeleton w-1/2" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-white/5 rounded-full skeleton w-16" />
                    <div className="h-6 bg-white/5 rounded-full skeleton w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Results */}
        {!isResearching && hasSearched && results.length > 0 && (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Zap className="h-3 w-3 mr-1" />
                  {results.length} videos found
                </Badge>
                <span className="text-white/40 text-sm">
                  in {niches.find(n => n.id === selectedNiche)?.label}
                </span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {results.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.05, 0.3) }}
                  >
                    <Card 
                      className="bg-[#141414] border-white/5 hover:border-white/20 transition-all cursor-pointer group overflow-hidden"
                      onClick={() => setSelectedVideo(video)}
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-[9/16] bg-[#0A0A0A] overflow-hidden">
                        <img 
                          src={video.thumbnail} 
                          alt="" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        
                        {/* View count badge */}
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-black/60 backdrop-blur-sm border-0 text-white">
                            <Eye className="h-3 w-3 mr-1" />
                            {formatNumber(video.views)}
                          </Badge>
                        </div>

                        {/* Duration badge */}
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-black/60 backdrop-blur-sm border-0 text-white text-xs">
                            {formatDuration(video.duration)}
                          </Badge>
                        </div>

                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Play className="h-6 w-6 text-white ml-1" fill="white" />
                          </div>
                        </div>

                        {/* Hook text at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white font-medium text-sm leading-tight line-clamp-2">
                            "{video.hookText}"
                          </p>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        {/* Creator info */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-500" />
                          <span className="text-white/60 text-sm truncate">{video.creatorHandle}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <Badge className="bg-pink-500/10 text-pink-400 border-pink-500/20 text-xs">
                            {video.hookType}
                          </Badge>
                          <NicheBadge niche={video.niche} size="sm" />
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-xs text-white/40">
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {formatNumber(video.likes)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {formatNumber(video.comments)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="h-3 w-3" />
                            {formatNumber(video.shares)}
                          </span>
                        </div>

                        {/* Quick actions */}
                        <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyHook(video.id, video.hookText);
                            }}
                            className="flex-1 h-8 text-xs bg-white/5 hover:bg-white/10"
                          >
                            {copiedId === video.id ? (
                              <><Check className="h-3 w-3 mr-1 text-green-400" /> Copied</>
                            ) : (
                              <><Copy className="h-3 w-3 mr-1" /> Copy Hook</>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              saveVideo(video.id);
                            }}
                            className={`h-8 w-8 p-0 ${
                              savedVideos.has(video.id) 
                                ? "text-pink-500 bg-pink-500/10" 
                                : "bg-white/5 hover:bg-white/10"
                            }`}
                          >
                            <Bookmark className={`h-4 w-4 ${savedVideos.has(video.id) ? "fill-current" : ""}`} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* Empty State */}
        {!isResearching && !hasSearched && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
              <TrendingUp className="h-10 w-10 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Research what actually goes viral</h3>
            <p className="text-white/50 max-w-md mx-auto mb-6">
              Select a niche above and we'll analyze 100+ viral TikToks to extract the hooks that made them successful.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-white/40">
              <Flame className="h-4 w-4 text-orange-400" />
              Real data from videos with 500K+ views
            </div>
          </div>
        )}

        {/* Video Detail Modal */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedVideo && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500" />
                    <div>
                      <div className="font-semibold">{selectedVideo.creator}</div>
                      <div className="text-sm text-white/50 font-normal">{selectedVideo.creatorHandle}</div>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Hook Section */}
                  <div className="p-4 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-xl border border-pink-500/20">
                    <div className="flex items-center gap-2 text-pink-400 text-sm mb-2">
                      <Sparkles className="h-4 w-4" />
                      Extracted Hook
                    </div>
                    <p className="text-xl font-medium text-white">"{selectedVideo.hookText}"</p>
                    
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        onClick={() => copyHook(selectedVideo.id, selectedVideo.hookText)}
                        className="bg-white/10 hover:bg-white/20"
                      >
                        {copiedId === selectedVideo.id ? (
                          <><Check className="h-4 w-4 mr-2 text-green-400" /> Copied!</>
                        ) : (
                          <><Copy className="h-4 w-4 mr-2" /> Copy Hook</>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => useHook(selectedVideo.hookText)}
                        className="bg-gradient-to-r from-pink-500 to-purple-500"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Similar
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-lg font-bold">{formatNumber(selectedVideo.views)}</div>
                      <div className="text-xs text-white/50">Views</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-lg font-bold">{formatNumber(selectedVideo.likes)}</div>
                      <div className="text-xs text-white/50">Likes</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-lg font-bold">{formatNumber(selectedVideo.comments)}</div>
                      <div className="text-xs text-white/50">Comments</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-lg font-bold">{formatNumber(selectedVideo.shares)}</div>
                      <div className="text-xs text-white/50">Shares</div>
                    </div>
                  </div>

                  {/* Hook Analysis */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-400" />
                      Why This Hook Works
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                        <Badge className="bg-pink-500/20 text-pink-300 border-0 shrink-0">
                          {selectedVideo.hookType}
                        </Badge>
                        <p className="text-white/70 text-sm">{selectedVideo.aiSummary}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-white/10"
                      onClick={() => window.open(selectedVideo.videoUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Watch on TikTok
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => saveVideo(selectedVideo.id)}
                      className={`border-white/10 ${savedVideos.has(selectedVideo.id) ? "text-pink-500" : ""}`}
                    >
                      <Bookmark className={`h-4 w-4 mr-2 ${savedVideos.has(selectedVideo.id) ? "fill-current" : ""}`} />
                      {savedVideos.has(selectedVideo.id) ? "Saved" : "Save"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
