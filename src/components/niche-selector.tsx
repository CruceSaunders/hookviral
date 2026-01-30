"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Lightbulb, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { niches as allNiches, nicheCategories, NicheCategory, NicheInfo } from "@/lib/niches";

interface NicheSelectorProps {
  selectedNiche: string;
  selectNiche: (niche: string) => void;
  usePresets: boolean;
  setUsePresets: (value: boolean) => void;
  nichePresets: Record<string, { style: string; spicy: number; emoji: string; tip: string }>;
}

// Group niches by category
const nichesByCategory: Record<NicheCategory, NicheInfo[]> = {
  health: allNiches.filter(n => n.category === "health"),
  money: allNiches.filter(n => n.category === "money"),
  lifestyle: allNiches.filter(n => n.category === "lifestyle"),
  entertainment: allNiches.filter(n => n.category === "entertainment"),
  education: allNiches.filter(n => n.category === "education"),
  creative: allNiches.filter(n => n.category === "creative"),
  relationships: allNiches.filter(n => n.category === "relationships"),
  tech: allNiches.filter(n => n.category === "tech"),
};

// Popular niches to show at top
const popularNiches = ["fitness", "business", "comedy", "lifestyle", "beauty", "tech", "food", "gaming"];

export function NicheSelector({ 
  selectedNiche, 
  selectNiche, 
  usePresets, 
  setUsePresets, 
  nichePresets 
}: NicheSelectorProps) {
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get currently selected niche info
  const selectedNicheInfo = allNiches.find(n => n.name === selectedNiche || n.id === selectedNiche);
  
  // Filter niches by search
  const filteredNiches = searchQuery 
    ? allNiches.filter(n => 
        n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;
  
  // Get popular niches for quick access
  const quickAccessNiches = allNiches.filter(n => popularNiches.includes(n.id));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-white/60">Niche</label>
        <label className="flex items-center gap-2 text-xs text-white/50 cursor-pointer">
          <input
            type="checkbox"
            checked={usePresets}
            onChange={(e) => setUsePresets(e.target.checked)}
            className="rounded border-white/20 bg-white/5"
          />
          Auto-optimize settings
        </label>
      </div>

      {/* Quick Access - Popular Niches */}
      <div className="flex flex-wrap gap-2 mb-3">
        {quickAccessNiches.map((niche) => (
          <Badge
            key={niche.id}
            variant={selectedNiche === niche.name ? "default" : "outline"}
            className={`cursor-pointer transition-all ${
              selectedNiche === niche.name 
                ? "bg-pink-500 hover:bg-pink-600" 
                : "border-white/20 hover:border-white/40"
            }`}
            onClick={() => selectNiche(niche.name)}
          >
            {niche.emoji} {niche.name}
          </Badge>
        ))}
      </div>

      {/* Expand to see all niches */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-2"
      >
        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        {expanded ? "Show less" : `Show all 50 niches`}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                type="text"
                placeholder="Search niches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white text-sm"
              />
            </div>

            {/* Search Results or Categories */}
            {filteredNiches ? (
              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {filteredNiches.map((niche) => (
                  <Badge
                    key={niche.id}
                    variant={selectedNiche === niche.name ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      selectedNiche === niche.name 
                        ? "bg-pink-500 hover:bg-pink-600" 
                        : "border-white/20 hover:border-white/40"
                    }`}
                    onClick={() => {
                      selectNiche(niche.name);
                      setSearchQuery("");
                      setExpanded(false);
                    }}
                  >
                    {niche.emoji} {niche.name}
                  </Badge>
                ))}
                {filteredNiches.length === 0 && (
                  <p className="text-white/40 text-sm">No niches found</p>
                )}
              </div>
            ) : (
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {(Object.keys(nichesByCategory) as NicheCategory[]).map((category) => (
                  <div key={category}>
                    <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                      {nicheCategories[category].name}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {nichesByCategory[category].map((niche) => (
                        <Badge
                          key={niche.id}
                          variant={selectedNiche === niche.name ? "default" : "outline"}
                          className={`cursor-pointer text-xs transition-all ${
                            selectedNiche === niche.name 
                              ? "bg-pink-500 hover:bg-pink-600" 
                              : "border-white/20 hover:border-white/40"
                          }`}
                          onClick={() => {
                            selectNiche(niche.name);
                            setExpanded(false);
                          }}
                        >
                          {niche.emoji} {niche.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Niche tip */}
      {usePresets && selectedNicheInfo && (
        <motion.div
          key={selectedNicheInfo.id}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-2 bg-pink-500/10 border border-pink-500/20 rounded-lg"
        >
          <p className="text-xs text-pink-300 flex items-start gap-1">
            <Lightbulb className="h-3 w-3 shrink-0 mt-0.5" />
            {selectedNicheInfo.tip}
          </p>
        </motion.div>
      )}
    </div>
  );
}
