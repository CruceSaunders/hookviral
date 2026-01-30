"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Link2,
  Sparkles,
  Copy,
  Check,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Camera,
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Loader2,
  FileText,
  Music,
  Palette,
  Volume2,
  Film,
  Zap,
  Target,
  RefreshCw,
} from "lucide-react";

interface VideoAnalysis {
  // Metadata
  videoUrl: string;
  platform: string;
  creator?: string;
  viewCount?: string;
  likeCount?: string;
  commentCount?: string;
  shareCount?: string;
  
  // Analysis
  hookText: string;
  hookAnalysis: {
    text: string;
    technique: string;
    whyItWorks: string;
    timeSeconds: number;
  };
  scriptBreakdown: {
    hook: { text: string; timing: string; technique: string };
    context: { text: string; timing: string; purpose: string };
    body: { text: string; timing: string; keyPoints: string[] };
    twist?: { text: string; timing: string; impact: string };
    cta: { text: string; timing: string; type: string };
  };
  visualBreakdown: {
    openingShot: string;
    cameraAngles: string[];
    textOverlays: string[];
    bRoll: string[];
    transitions: string[];
    lighting: string;
    colorGrading: string;
  };
  audioAnalysis: {
    musicType: string;
    musicTiming: string;
    voiceStyle: string;
    soundEffects: string[];
    pacing: string;
  };
  replicationGuide: {
    step1_hook: string;
    step2_setup: string;
    step3_filming: string;
    step4_editing: string;
    step5_captions: string;
    step6_audio: string;
    equipment: string[];
    estimatedTime: string;
    difficultyLevel: "Easy" | "Medium" | "Hard";
  };
  
  // Screenshots
  screenshots: string[];
  
  // Status
  status: "idle" | "loading" | "analyzing" | "complete" | "error";
  error?: string;
}

const initialAnalysis: VideoAnalysis = {
  videoUrl: "",
  platform: "tiktok",
  hookText: "",
  hookAnalysis: { text: "", technique: "", whyItWorks: "", timeSeconds: 0 },
  scriptBreakdown: {
    hook: { text: "", timing: "", technique: "" },
    context: { text: "", timing: "", purpose: "" },
    body: { text: "", timing: "", keyPoints: [] },
    cta: { text: "", timing: "", type: "" },
  },
  visualBreakdown: {
    openingShot: "",
    cameraAngles: [],
    textOverlays: [],
    bRoll: [],
    transitions: [],
    lighting: "",
    colorGrading: "",
  },
  audioAnalysis: {
    musicType: "",
    musicTiming: "",
    voiceStyle: "",
    soundEffects: [],
    pacing: "",
  },
  replicationGuide: {
    step1_hook: "",
    step2_setup: "",
    step3_filming: "",
    step4_editing: "",
    step5_captions: "",
    step6_audio: "",
    equipment: [],
    estimatedTime: "",
    difficultyLevel: "Medium",
  },
  screenshots: [],
  status: "idle",
};

export default function CopyVideoPage() {
  const [url, setUrl] = useState("");
  const [analysis, setAnalysis] = useState<VideoAnalysis>(initialAnalysis);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["script", "visuals", "audio", "replication"])
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [manualMode, setManualMode] = useState(false);
  const [manualDescription, setManualDescription] = useState("");

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const analyzeVideo = async () => {
    if (!url.trim() && !manualMode) return;
    if (manualMode && !manualDescription.trim()) return;

    setAnalysis((prev) => ({ ...prev, status: "loading", videoUrl: url }));

    try {
      const response = await fetch("/api/video/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: manualMode ? undefined : url,
          manualDescription: manualMode ? manualDescription : undefined,
          captureScreenshots: !manualMode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setAnalysis({
        ...data.analysis,
        status: "complete",
      });
    } catch (error: any) {
      setAnalysis((prev) => ({
        ...prev,
        status: "error",
        error: error.message || "Failed to analyze video",
      }));
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Easy":
        return "text-green-400 border-green-500/30 bg-green-500/10";
      case "Medium":
        return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
      case "Hard":
        return "text-red-400 border-red-500/30 bg-red-500/10";
      default:
        return "text-white/60";
    }
  };

  const getFullReplicationGuide = () => {
    const guide = analysis.replicationGuide;
    return `🎬 VIDEO REPLICATION GUIDE

📍 HOOK (First 3 Seconds)
${guide.step1_hook}

🎯 SETUP
${guide.step2_setup}

📹 FILMING
${guide.step3_filming}

✂️ EDITING
${guide.step4_editing}

📝 CAPTIONS
${guide.step5_captions}

🎵 AUDIO
${guide.step6_audio}

🛠️ EQUIPMENT NEEDED:
${guide.equipment.map((e) => `- ${e}`).join("\n")}

⏱️ Estimated Time: ${guide.estimatedTime}
📊 Difficulty: ${guide.difficultyLevel}`;
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg">
              <Video className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Copy Viral Video</h1>
          </div>
          <p className="text-white/60">
            Paste a TikTok URL and get exact replication instructions. We analyze the
            hook, script, visuals, audio, and give you a step-by-step recreation guide.
          </p>
        </div>

        {/* Input Section */}
        <Card className="bg-white/5 border-white/10 mb-8">
          <CardContent className="p-6">
            {/* Mode Toggle */}
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant={!manualMode ? "default" : "outline"}
                size="sm"
                onClick={() => setManualMode(false)}
                className={!manualMode ? "bg-pink-500" : "border-white/20"}
              >
                <Link2 className="h-4 w-4 mr-2" />
                Paste URL
              </Button>
              <Button
                variant={manualMode ? "default" : "outline"}
                size="sm"
                onClick={() => setManualMode(true)}
                className={manualMode ? "bg-purple-500" : "border-white/20"}
              >
                <FileText className="h-4 w-4 mr-2" />
                Describe Video
              </Button>
            </div>

            {!manualMode ? (
              <>
                <label className="text-sm text-white/60 mb-2 block">
                  Paste TikTok, Instagram Reels, or YouTube Shorts URL
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      placeholder="https://www.tiktok.com/@creator/video/..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <Button
                    onClick={analyzeVideo}
                    disabled={
                      !url.trim() ||
                      analysis.status === "loading" ||
                      analysis.status === "analyzing"
                    }
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
                  >
                    {analysis.status === "loading" ||
                    analysis.status === "analyzing" ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Analyze Video
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <label className="text-sm text-white/60 mb-2 block">
                  Describe the video you want to replicate
                </label>
                <Textarea
                  placeholder="Describe the video in detail: What's the hook? What happens in the video? What's the style? What text/captions appear? What's the music like?..."
                  value={manualDescription}
                  onChange={(e) => setManualDescription(e.target.value)}
                  className="bg-white/5 border-white/10 text-white min-h-[120px] mb-3"
                />
                <Button
                  onClick={analyzeVideo}
                  disabled={
                    !manualDescription.trim() ||
                    analysis.status === "loading" ||
                    analysis.status === "analyzing"
                  }
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                >
                  {analysis.status === "loading" ||
                  analysis.status === "analyzing" ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Guide...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Replication Guide
                    </>
                  )}
                </Button>
              </>
            )}

            {/* Status Messages */}
            <AnimatePresence>
              {analysis.status === "loading" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                >
                  <div className="flex items-center gap-2 text-blue-400">
                    <Camera className="h-4 w-4 animate-pulse" />
                    <span className="text-sm">
                      Capturing screenshots and analyzing video...
                    </span>
                  </div>
                </motion.div>
              )}
              {analysis.status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <div className="flex items-center gap-2 text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{analysis.error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysis.status === "complete" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Screenshots Preview */}
            {analysis.screenshots && analysis.screenshots.length > 0 && (
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Camera className="h-5 w-5 text-pink-400" />
                    Video Screenshots
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
                    {analysis.screenshots.slice(0, 14).map((src, i) => (
                      <div
                        key={i}
                        className="aspect-[9/16] bg-white/5 rounded-lg overflow-hidden"
                      >
                        <img
                          src={src}
                          alt={`Frame ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-white/40 mt-2">
                    Captured at 3 frames/second for visual analysis
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Hook Analysis */}
            <Card className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-500/20">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-5 w-5 text-pink-400" />
                      <span className="text-sm font-medium text-pink-400">
                        THE HOOK
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs border-pink-500/30"
                      >
                        First {analysis.hookAnalysis.timeSeconds}s
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold mb-3">
                      "{analysis.hookAnalysis.text}"
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Badge className="bg-purple-500/20 text-purple-400 shrink-0">
                          Technique
                        </Badge>
                        <span className="text-white/70">
                          {analysis.hookAnalysis.technique}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge className="bg-green-500/20 text-green-400 shrink-0">
                          Why It Works
                        </Badge>
                        <span className="text-white/70">
                          {analysis.hookAnalysis.whyItWorks}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(analysis.hookAnalysis.text, "hook")
                    }
                    className="text-white/60 hover:text-white"
                  >
                    {copiedField === "hook" ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Script Breakdown */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader
                className="cursor-pointer"
                onClick={() => toggleSection("script")}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-400" />
                    Script Breakdown
                  </CardTitle>
                  {expandedSections.has("script") ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </CardHeader>
              <AnimatePresence>
                {expandedSections.has("script") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <CardContent className="space-y-4">
                      {/* Hook Section */}
                      <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-pink-500 text-white">HOOK</Badge>
                          <span className="text-xs text-white/50">
                            {analysis.scriptBreakdown.hook.timing}
                          </span>
                        </div>
                        <p className="text-white mb-2">
                          "{analysis.scriptBreakdown.hook.text}"
                        </p>
                        <p className="text-sm text-white/50">
                          Technique: {analysis.scriptBreakdown.hook.technique}
                        </p>
                      </div>

                      {/* Context Section */}
                      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-blue-500 text-white">
                            CONTEXT
                          </Badge>
                          <span className="text-xs text-white/50">
                            {analysis.scriptBreakdown.context.timing}
                          </span>
                        </div>
                        <p className="text-white mb-2">
                          "{analysis.scriptBreakdown.context.text}"
                        </p>
                        <p className="text-sm text-white/50">
                          Purpose: {analysis.scriptBreakdown.context.purpose}
                        </p>
                      </div>

                      {/* Body Section */}
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-white/20 text-white">BODY</Badge>
                          <span className="text-xs text-white/50">
                            {analysis.scriptBreakdown.body.timing}
                          </span>
                        </div>
                        <p className="text-white mb-3">
                          "{analysis.scriptBreakdown.body.text}"
                        </p>
                        <div className="space-y-1">
                          <p className="text-xs text-white/50 mb-1">
                            Key Points:
                          </p>
                          {analysis.scriptBreakdown.body.keyPoints.map(
                            (point, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-sm text-white/70"
                              >
                                <span className="text-pink-400">•</span>
                                {point}
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Twist Section (if exists) */}
                      {analysis.scriptBreakdown.twist && (
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-yellow-500 text-black">
                              TWIST
                            </Badge>
                            <span className="text-xs text-white/50">
                              {analysis.scriptBreakdown.twist.timing}
                            </span>
                          </div>
                          <p className="text-white mb-2">
                            "{analysis.scriptBreakdown.twist.text}"
                          </p>
                          <p className="text-sm text-white/50">
                            Impact: {analysis.scriptBreakdown.twist.impact}
                          </p>
                        </div>
                      )}

                      {/* CTA Section */}
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-green-500 text-white">CTA</Badge>
                          <span className="text-xs text-white/50">
                            {analysis.scriptBreakdown.cta.timing}
                          </span>
                        </div>
                        <p className="text-white mb-2">
                          "{analysis.scriptBreakdown.cta.text}"
                        </p>
                        <p className="text-sm text-white/50">
                          Type: {analysis.scriptBreakdown.cta.type}
                        </p>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Visual Breakdown */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader
                className="cursor-pointer"
                onClick={() => toggleSection("visuals")}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Film className="h-5 w-5 text-purple-400" />
                    Visual Breakdown
                  </CardTitle>
                  {expandedSections.has("visuals") ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </CardHeader>
              <AnimatePresence>
                {expandedSections.has("visuals") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Opening Shot */}
                        <div className="p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-2 mb-2 text-purple-400">
                            <Camera className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              Opening Shot
                            </span>
                          </div>
                          <p className="text-white/70 text-sm">
                            {analysis.visualBreakdown.openingShot}
                          </p>
                        </div>

                        {/* Lighting */}
                        <div className="p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-2 mb-2 text-yellow-400">
                            <Palette className="h-4 w-4" />
                            <span className="text-sm font-medium">Lighting</span>
                          </div>
                          <p className="text-white/70 text-sm">
                            {analysis.visualBreakdown.lighting}
                          </p>
                        </div>
                      </div>

                      {/* Camera Angles */}
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2 mb-2 text-blue-400">
                          <Video className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            Camera Angles
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysis.visualBreakdown.cameraAngles.map(
                            (angle, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="border-blue-500/30 text-blue-300"
                              >
                                {angle}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>

                      {/* Text Overlays */}
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2 mb-2 text-green-400">
                          <FileText className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            Text Overlays
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {analysis.visualBreakdown.textOverlays.map(
                            (text, i) => (
                              <li
                                key={i}
                                className="text-white/70 text-sm flex items-center gap-2"
                              >
                                <span className="text-green-400">•</span>
                                {text}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Transitions */}
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2 mb-2 text-pink-400">
                          <Sparkles className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            Transitions
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysis.visualBreakdown.transitions.map(
                            (trans, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="border-pink-500/30 text-pink-300"
                              >
                                {trans}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Audio Analysis */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader
                className="cursor-pointer"
                onClick={() => toggleSection("audio")}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Music className="h-5 w-5 text-cyan-400" />
                    Audio Analysis
                  </CardTitle>
                  {expandedSections.has("audio") ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </CardHeader>
              <AnimatePresence>
                {expandedSections.has("audio") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-2 mb-2 text-cyan-400">
                            <Music className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              Music Type
                            </span>
                          </div>
                          <p className="text-white/70 text-sm">
                            {analysis.audioAnalysis.musicType}
                          </p>
                        </div>

                        <div className="p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-2 mb-2 text-orange-400">
                            <Volume2 className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              Voice Style
                            </span>
                          </div>
                          <p className="text-white/70 text-sm">
                            {analysis.audioAnalysis.voiceStyle}
                          </p>
                        </div>

                        <div className="p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-2 mb-2 text-green-400">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              Music Timing
                            </span>
                          </div>
                          <p className="text-white/70 text-sm">
                            {analysis.audioAnalysis.musicTiming}
                          </p>
                        </div>

                        <div className="p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-2 mb-2 text-purple-400">
                            <Target className="h-4 w-4" />
                            <span className="text-sm font-medium">Pacing</span>
                          </div>
                          <p className="text-white/70 text-sm">
                            {analysis.audioAnalysis.pacing}
                          </p>
                        </div>
                      </div>

                      {/* Sound Effects */}
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2 mb-2 text-yellow-400">
                          <Sparkles className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            Sound Effects
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysis.audioAnalysis.soundEffects.map((sfx, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="border-yellow-500/30 text-yellow-300"
                            >
                              {sfx}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Replication Guide - The Main Event */}
            <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/20">
              <CardHeader
                className="cursor-pointer"
                onClick={() => toggleSection("replication")}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-400" />
                    Step-by-Step Replication Guide
                    <Badge
                      className={getDifficultyColor(
                        analysis.replicationGuide.difficultyLevel
                      )}
                    >
                      {analysis.replicationGuide.difficultyLevel}
                    </Badge>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(getFullReplicationGuide(), "guide");
                      }}
                      className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                    >
                      {copiedField === "guide" ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy Full Guide
                        </>
                      )}
                    </Button>
                    {expandedSections.has("replication") ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <AnimatePresence>
                {expandedSections.has("replication") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <CardContent className="space-y-4">
                      {/* Steps */}
                      <div className="space-y-3">
                        {[
                          {
                            num: 1,
                            title: "Hook",
                            content:
                              analysis.replicationGuide.step1_hook,
                            color: "pink",
                          },
                          {
                            num: 2,
                            title: "Setup",
                            content:
                              analysis.replicationGuide.step2_setup,
                            color: "blue",
                          },
                          {
                            num: 3,
                            title: "Filming",
                            content:
                              analysis.replicationGuide.step3_filming,
                            color: "purple",
                          },
                          {
                            num: 4,
                            title: "Editing",
                            content:
                              analysis.replicationGuide.step4_editing,
                            color: "yellow",
                          },
                          {
                            num: 5,
                            title: "Captions",
                            content:
                              analysis.replicationGuide.step5_captions,
                            color: "green",
                          },
                          {
                            num: 6,
                            title: "Audio",
                            content:
                              analysis.replicationGuide.step6_audio,
                            color: "cyan",
                          },
                        ].map((step) => (
                          <div
                            key={step.num}
                            className="flex gap-4 p-4 bg-white/5 rounded-lg"
                          >
                            <div
                              className={`flex-shrink-0 w-8 h-8 rounded-full bg-${step.color}-500/20 flex items-center justify-center text-${step.color}-400 font-bold`}
                            >
                              {step.num}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1 text-white">
                                {step.title}
                              </h4>
                              <p className="text-white/70 text-sm">
                                {step.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Equipment */}
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Camera className="h-4 w-4 text-orange-400" />
                          Equipment Needed
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {analysis.replicationGuide.equipment.map(
                            (item, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="border-orange-500/30 text-orange-300"
                              >
                                {item}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>

                      {/* Time Estimate */}
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-white/60" />
                          <span className="text-white/60">Estimated Time:</span>
                          <span className="font-semibold">
                            {analysis.replicationGuide.estimatedTime}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}

        {/* Empty State */}
        {analysis.status === "idle" && (
          <div className="text-center py-16">
            <Video className="h-16 w-16 mx-auto mb-4 text-white/20" />
            <h3 className="text-xl font-semibold mb-2 text-white/60">
              No video analyzed yet
            </h3>
            <p className="text-white/40 max-w-md mx-auto">
              Paste a TikTok, Instagram Reels, or YouTube Shorts URL above to get
              a complete breakdown of how to recreate the video.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
