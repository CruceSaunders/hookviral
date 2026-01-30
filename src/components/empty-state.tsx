"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Search,
  Bookmark,
  History,
  TrendingUp,
  Zap,
  FileText,
  Plus,
} from "lucide-react";

interface EmptyStateProps {
  type: "generate" | "saved" | "history" | "research" | "library" | "custom";
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const illustrations = {
  generate: {
    icon: Sparkles,
    color: "from-pink-500 to-purple-500",
    bgColor: "from-pink-500/20 to-purple-500/20",
    defaultTitle: "Create your first viral hook",
    defaultDescription: "Enter a topic above and let AI generate scroll-stopping hooks for your TikTok videos.",
  },
  saved: {
    icon: Bookmark,
    color: "from-pink-500 to-purple-500",
    bgColor: "from-pink-500/10 to-purple-500/10",
    defaultTitle: "No saved hooks yet",
    defaultDescription: "Save hooks you love to access them anytime. Click the bookmark icon on any hook to save it.",
  },
  history: {
    icon: History,
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-500/10 to-cyan-500/10",
    defaultTitle: "No generation history",
    defaultDescription: "Your generated hooks will appear here. Start creating to build your history.",
  },
  research: {
    icon: TrendingUp,
    color: "from-pink-500 to-purple-500",
    bgColor: "from-pink-500/10 to-purple-500/10",
    defaultTitle: "Research viral TikToks",
    defaultDescription: "Select a niche above to analyze 100+ viral videos and extract the hooks that made them successful.",
  },
  library: {
    icon: Search,
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-500/10 to-pink-500/10",
    defaultTitle: "No hooks found",
    defaultDescription: "Try adjusting your filters or search query to find hooks.",
  },
  custom: {
    icon: FileText,
    color: "from-gray-400 to-gray-500",
    bgColor: "from-gray-500/10 to-gray-400/10",
    defaultTitle: "Nothing here yet",
    defaultDescription: "This section is empty. Start creating to fill it up!",
  },
};

export function EmptyState({
  type,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  const config = illustrations[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("text-center py-16 px-4", className)}
    >
      {/* Animated icon */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative mx-auto mb-6"
      >
        {/* Glow effect */}
        <div className={cn(
          "absolute inset-0 blur-xl rounded-full bg-gradient-to-br",
          config.bgColor,
          "scale-150 opacity-50"
        )} />
        
        {/* Icon container */}
        <div className={cn(
          "relative w-20 h-20 rounded-full flex items-center justify-center",
          "bg-gradient-to-br",
          config.bgColor,
          "border border-white/10"
        )}>
          <Icon className={cn(
            "h-10 w-10 bg-gradient-to-br bg-clip-text",
            config.color
          )} style={{ color: "transparent", backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
          <Icon className={cn("h-10 w-10 absolute text-white/80")} />
        </div>

        {/* Floating particles */}
        <motion.div
          animate={{
            y: [-5, 5, -5],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-pink-500/50"
        />
        <motion.div
          animate={{
            y: [5, -5, 5],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-purple-500/50"
        />
      </motion.div>

      {/* Text content */}
      <h3 className="text-xl font-semibold text-white mb-2">
        {title || config.defaultTitle}
      </h3>
      <p className="text-white/50 max-w-md mx-auto mb-6">
        {description || config.defaultDescription}
      </p>

      {/* CTA button */}
      {action && (
        <Button
          onClick={action.onClick}
          variant="gradient"
          className="shadow-lg shadow-pink-500/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}

// Quick preset empty states
export function EmptyGenerateState({ onGenerate }: { onGenerate?: () => void }) {
  return (
    <EmptyState
      type="generate"
      action={onGenerate ? { label: "Generate Hooks", onClick: onGenerate } : undefined}
    />
  );
}

export function EmptySavedState({ onBrowse }: { onBrowse?: () => void }) {
  return (
    <EmptyState
      type="saved"
      action={onBrowse ? { label: "Browse Library", onClick: onBrowse } : undefined}
    />
  );
}

export function EmptyHistoryState({ onGenerate }: { onGenerate?: () => void }) {
  return (
    <EmptyState
      type="history"
      action={onGenerate ? { label: "Start Creating", onClick: onGenerate } : undefined}
    />
  );
}

export function EmptyResearchState({ onResearch }: { onResearch?: () => void }) {
  return (
    <EmptyState
      type="research"
      action={onResearch ? { label: "Start Research", onClick: onResearch } : undefined}
    />
  );
}

export function EmptySearchState({ onClear }: { onClear?: () => void }) {
  return (
    <EmptyState
      type="library"
      action={onClear ? { label: "Clear Filters", onClick: onClear } : undefined}
    />
  );
}
