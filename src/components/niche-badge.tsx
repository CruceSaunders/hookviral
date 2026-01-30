"use client";

import { cn } from "@/lib/utils";
import { getNicheById, NICHES } from "@/lib/niches";

interface NicheBadgeProps {
  niche: string;
  showEmoji?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function NicheBadge({ niche, showEmoji = true, size = "md", className }: NicheBadgeProps) {
  const nicheKey = niche.toLowerCase().replace(/\s+/g, '-');
  const nicheData = getNicheById(nicheKey);
  
  const colors = nicheData?.color || {
    bg: "from-gray-500/20 to-gray-500/10",
    border: "border-gray-500/30",
    text: "text-gray-400",
  };
  const emoji = nicheData?.emoji || "📌";

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
      {showEmoji && <span>{emoji}</span>}
      <span className="capitalize">{nicheData?.name || niche}</span>
    </span>
  );
}

// Export for backward compatibility
export const nicheColors = Object.fromEntries(
  NICHES.map(n => [n.id, { ...n.color, emoji: n.emoji }])
);
