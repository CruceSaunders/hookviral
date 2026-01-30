"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#1F1F1F] group-[.toaster]:text-white group-[.toaster]:border-white/10 group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl",
          title: "group-[.toast]:text-white group-[.toast]:font-medium",
          description: "group-[.toast]:text-white/70",
          actionButton:
            "group-[.toast]:bg-gradient-to-r group-[.toast]:from-pink-500 group-[.toast]:to-purple-500 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-white/10 group-[.toast]:text-white",
          success: "group-[.toaster]:border-green-500/30 group-[.toaster]:bg-green-500/10",
          error: "group-[.toaster]:border-red-500/30 group-[.toaster]:bg-red-500/10",
          warning: "group-[.toaster]:border-yellow-500/30 group-[.toaster]:bg-yellow-500/10",
          info: "group-[.toaster]:border-blue-500/30 group-[.toaster]:bg-blue-500/10",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
