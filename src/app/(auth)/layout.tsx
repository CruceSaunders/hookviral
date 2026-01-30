import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <Sparkles className="h-6 w-6 text-pink-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            HookViral
          </span>
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-white/40 text-sm">
        © 2026 HookViral. All rights reserved.
      </footer>
    </div>
  );
}
