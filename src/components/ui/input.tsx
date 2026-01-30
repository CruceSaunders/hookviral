import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  suffix?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, suffix, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
            {icon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          data-slot="input"
          className={cn(
            // Base styles
            "w-full min-w-0 rounded-xl bg-white/5 border border-white/10",
            "px-4 py-3 text-base text-white",
            "placeholder:text-white/30",
            "transition-all duration-200",
            // Focus styles with pink glow
            "focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20",
            "focus:bg-white/[0.07]",
            // Hover styles
            "hover:border-white/20 hover:bg-white/[0.07]",
            // Disabled styles
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            // File input styles
            "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white",
            // Icon padding
            icon && "pl-10",
            suffix && "pr-10",
            className
          )}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
            {suffix}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
