import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HookViral - AI TikTok Hook Generator",
  description: "Stop losing views in the first 3 seconds. AI-powered hooks that make people stop scrolling. Generate 10 viral hooks in 30 seconds.",
  keywords: ["TikTok", "hooks", "AI", "content creation", "viral", "social media", "TikTok marketing", "content creator tools", "hook generator"],
  authors: [{ name: "HookViral" }],
  creator: "HookViral",
  openGraph: {
    title: "HookViral - Stop Losing Views in the First 3 Seconds",
    description: "AI-powered TikTok hooks that make people stop scrolling. Generate 10 scroll-stopping hooks in 30 seconds. Used by 500+ creators.",
    type: "website",
    locale: "en_US",
    siteName: "HookViral",
  },
  twitter: {
    card: "summary_large_image",
    title: "HookViral - AI TikTok Hook Generator",
    description: "Stop losing views in the first 3 seconds. Generate scroll-stopping TikTok hooks with AI.",
    creator: "@hookviral",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification IDs later when setting up
    // google: "verification_token",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-black`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
