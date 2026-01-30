"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Wand2, 
  Library, 
  Bookmark, 
  History,
  Settings,
  Zap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/generate", label: "Generate", icon: Wand2 },
  { href: "/rewrite", label: "Rewrite", icon: Sparkles },
  { href: "/library", label: "Library", icon: Library },
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/history", label: "History", icon: History },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-pink-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                HookViral
              </span>
            </Link>

            {/* Center Navigation */}
            <div className="hidden sm:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      className={`${
                        isActive 
                          ? "bg-white/10 text-white" 
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="hidden sm:flex border-pink-500/30 text-pink-400">
                <Zap className="h-3 w-3 mr-1" />
                Free Plan
              </Badge>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
              >
                Upgrade
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden fixed bottom-0 w-full z-50 bg-black/90 backdrop-blur-lg border-t border-white/10">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <div className={`flex flex-col items-center py-2 ${
                  isActive ? "text-pink-500" : "text-white/60"
                }`}>
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 pb-20 sm:pb-0">
        {children}
      </main>
    </div>
  );
}
