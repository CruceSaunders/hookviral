"use client";

import { cn } from "@/lib/utils";

const nicheColors: Record<string, { bg: string; border: string; text: string; emoji: string }> = {
  fitness: { 
    bg: "from-green-500/20 to-green-500/10", 
    border: "border-green-500/30", 
    text: "text-green-400",
    emoji: "💪"
  },
  business: { 
    bg: "from-blue-500/20 to-blue-500/10", 
    border: "border-blue-500/30", 
    text: "text-blue-400",
    emoji: "💰"
  },
  comedy: { 
    bg: "from-yellow-500/20 to-yellow-500/10", 
    border: "border-yellow-500/30", 
    text: "text-yellow-400",
    emoji: "😂"
  },
  education: { 
    bg: "from-purple-500/20 to-purple-500/10", 
    border: "border-purple-500/30", 
    text: "text-purple-400",
    emoji: "📚"
  },
  lifestyle: { 
    bg: "from-pink-500/20 to-pink-500/10", 
    border: "border-pink-500/30", 
    text: "text-pink-400",
    emoji: "✨"
  },
  beauty: { 
    bg: "from-rose-500/20 to-rose-500/10", 
    border: "border-rose-500/30", 
    text: "text-rose-400",
    emoji: "💄"
  },
  tech: { 
    bg: "from-cyan-500/20 to-cyan-500/10", 
    border: "border-cyan-500/30", 
    text: "text-cyan-400",
    emoji: "🚀"
  },
  food: { 
    bg: "from-orange-500/20 to-orange-500/10", 
    border: "border-orange-500/30", 
    text: "text-orange-400",
    emoji: "🍕"
  },
  travel: { 
    bg: "from-sky-500/20 to-sky-500/10", 
    border: "border-sky-500/30", 
    text: "text-sky-400",
    emoji: "✈️"
  },
  gaming: { 
    bg: "from-violet-500/20 to-violet-500/10", 
    border: "border-violet-500/30", 
    text: "text-violet-400",
    emoji: "🎮"
  },
};

interface NicheBadgeProps {
  niche: string;
  showEmoji?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function NicheBadge({ niche, showEmoji = true, size = "md", className }: NicheBadgeProps) {
  const nicheKey = niche.toLowerCase();
  const colors = nicheColors[nicheKey] || {
    bg: "from-gray-500/20 to-gray-500/10",
    border: "border-gray-500/30",
    text: "text-gray-400",
    emoji: "📌"
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        `bg-gradient-to-r ${colors.bg}`,
        `border ${colors.border}`,
        colors.text,
        sizeClasses[size],
        className
      )}
    >
      {showEmoji && <span>{colors.emoji}</span>}
      <span className="capitalize">{niche}</span>
    </span>
  );
}

// Export colors for use elsewhere
export { nicheColors };
