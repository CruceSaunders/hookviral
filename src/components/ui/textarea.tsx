import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  showCount?: boolean
  maxLength?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, showCount, maxLength, value, onChange, ...props }, ref) => {
    const [charCount, setCharCount] = React.useState(
      typeof value === 'string' ? value.length : 0
    )

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length)
      onChange?.(e)
    }

    return (
      <div className="relative w-full">
        <textarea
          ref={ref}
          data-slot="textarea"
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          className={cn(
            // Base styles
            "w-full min-h-[120px] rounded-xl bg-white/5 border border-white/10",
            "px-4 py-3 text-base text-white resize-y",
            "placeholder:text-white/30",
            "transition-all duration-200",
            // Focus styles with pink glow
            "focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20",
            "focus:bg-white/[0.07]",
            // Hover styles
            "hover:border-white/20 hover:bg-white/[0.07]",
            // Disabled styles
            "disabled:cursor-not-allowed disabled:opacity-50",
            // Scrollbar styles
            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10",
            showCount && "pb-8",
            className
          )}
          {...props}
        />
        {showCount && maxLength && (
          <div className={cn(
            "absolute bottom-3 right-4 text-xs",
            charCount > maxLength * 0.9 
              ? "text-yellow-500" 
              : charCount >= maxLength 
                ? "text-red-500" 
                : "text-white/30"
          )}>
            {charCount}/{maxLength}
          </div>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
