import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circular" | "text" | "card"
}

function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse bg-white/5",
        {
          "rounded-md": variant === "default" || variant === "text",
          "rounded-full": variant === "circular",
          "rounded-2xl": variant === "card",
        },
        className
      )}
      {...props}
    />
  )
}

// Preset skeleton components
function SkeletonText({ lines = 1, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={cn("h-4", i === lines - 1 ? "w-3/4" : "w-full")}
        />
      ))}
    </div>
  )
}

function SkeletonAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }
  return <Skeleton variant="circular" className={sizes[size]} />
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl bg-[#141414] border border-white/5 overflow-hidden", className)}>
      <Skeleton className="aspect-[9/16] rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <SkeletonAvatar size="sm" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

function SkeletonHookCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl bg-[#141414] border border-white/5 p-4", className)}>
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-5 w-4/5 mb-4" />
      <div className="flex gap-2 mb-3">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
      <Skeleton className="h-4 w-24" />
    </div>
  )
}

export { 
  Skeleton, 
  SkeletonText, 
  SkeletonAvatar, 
  SkeletonCard,
  SkeletonHookCard,
}
