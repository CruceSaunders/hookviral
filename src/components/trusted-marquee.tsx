"use client";

import { motion } from "framer-motion";

// Extended list of trusted names
const trustedNames = [
  "Creator Academy",
  "TikTok Mastery", 
  "Viral Vault",
  "Content Club",
  "Growth Lab",
  "Influence Pro",
  "Hook School",
  "Reel Masters",
  "Short Form U",
  "Creator Hacks",
  "Viral Nation",
  "Content Kings",
  "Social Surge",
  "Fame Factory",
  "Boost Academy",
];

export function TrustedMarquee() {
  // Duplicate the list for seamless loop
  const doubledNames = [...trustedNames, ...trustedNames];
  
  return (
    <section className="relative py-8 overflow-hidden">
      {/* Subtle gradient bar background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-white/[0.04] to-white/[0.02]" />
      
      {/* Top and bottom subtle lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Static label */}
      <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-6">
        Trusted by Creators From
      </p>
      
      {/* Scrolling marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling content */}
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{
            x: [0, -50 * trustedNames.length],
          }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {doubledNames.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-white/30 font-medium text-lg inline-block"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
