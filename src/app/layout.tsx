import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HookViral - AI TikTok Hook Generator",
  description: "Stop losing views in the first 3 seconds. AI-powered hooks that make people stop scrolling.",
  keywords: ["TikTok", "hooks", "AI", "content creation", "viral", "social media"],
  openGraph: {
    title: "HookViral - AI TikTok Hook Generator",
    description: "Generate scroll-stopping TikTok hooks in 30 seconds",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
