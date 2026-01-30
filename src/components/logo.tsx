"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showText?: boolean;
}

const sizeMap = {
  sm: { icon: 24, text: "text-lg" },
  md: { icon: 32, text: "text-xl" },
  lg: { icon: 40, text: "text-2xl" },
  xl: { icon: 56, text: "text-3xl" },
};

export function Logo({ 
  variant = "full", 
  size = "md", 
  className,
  showText = true 
}: LogoProps) {
  const { icon, text } = sizeMap[size];

  if (variant === "icon") {
    return (
      <div className={cn("relative", className)} style={{ width: icon, height: icon }}>
        <Image
          src="/logo.png"
          alt="HookViral"
          width={icon}
          height={icon}
          className="object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative" style={{ width: icon, height: icon }}>
        <Image
          src="/logo.png"
          alt="HookViral"
          width={icon}
          height={icon}
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span className={cn(
          "font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-transparent bg-clip-text",
          text
        )}>
          HookViral
        </span>
      )}
    </div>
  );
}

// Animated logo for loading states
export function LogoAnimated({ size = "lg" }: { size?: "sm" | "md" | "lg" | "xl" }) {
  const iconSize = sizeMap[size].icon;
  
  return (
    <div 
      className="relative animate-pulse"
      style={{ width: iconSize, height: iconSize }}
    >
      <Image
        src="/logo.png"
        alt="Loading..."
        width={iconSize}
        height={iconSize}
        className="object-contain"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
    </div>
  );
}
