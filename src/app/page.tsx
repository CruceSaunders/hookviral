"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, Zap, Copy, Check, ArrowRight, Play, Star, FileText, Scissors, Flame } from "lucide-react";
import { Logo } from "@/components/logo";

const exampleHooks = [
  "The TikTok hack that got me banned",
  "I lost 30 pounds and didn't change my diet once",
  "Why your followers aren't watching past 3 seconds",
  "The one thing successful creators never do",
  "I made $10K in a week and no one believes how",
];

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [currentHook, setCurrentHook] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyHook = () => {
    navigator.clipboard.writeText(exampleHooks[currentHook]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo size="md" />
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white/70 hover:text-white">
                Pricing
              </Button>
              <Button variant="ghost" className="text-white/70 hover:text-white">
                Login
              </Button>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90">
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6 bg-pink-500/10 text-pink-400 border-pink-500/20">
              <Zap className="h-3 w-3 mr-1" />
              Used by 500+ TikTok creators
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-bold mb-6 leading-tight"
          >
            Stop Losing Views in the{" "}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text">
              First 3 Seconds
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-white/60 mb-8 max-w-2xl mx-auto"
          >
            AI-powered hooks that make people stop scrolling. Generate 10 scroll-stopping TikTok openers in 30 seconds.
          </motion.p>

          {/* Demo Hook Generator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-white/40 text-sm ml-2">hookviral.com/generate</span>
                </div>
                
                <div className="bg-black/50 rounded-lg p-4 mb-4">
                  <p className="text-white/40 text-sm mb-2">Your hook:</p>
                  <motion.p
                    key={currentHook}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl font-medium text-white"
                  >
                    "{exampleHooks[currentHook]}"
                  </motion.p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setCurrentHook((prev) => (prev + 1) % exampleHooks.length)}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Another
                  </Button>
                  <Button
                    variant="outline"
                    onClick={copyHook}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-lg px-8">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8">
              <Play className="mr-2 h-5 w-5" />
              See Demo
            </Button>
          </motion.div>

          <p className="text-white/40 text-sm mt-4">No credit card required • 5 free hooks/day</p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              70% of viewers decide to scroll in the{" "}
              <span className="text-pink-500">first 3 seconds</span>
            </h2>
            <p className="text-white/60 text-lg">
              Your content might be amazing. But if your hook sucks, nobody will ever know.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "😴", title: "Starting with 'Hey guys!'", desc: "Instant death for watch time" },
              { icon: "⏰", title: "Spending hours on hooks", desc: "When you could be creating" },
              { icon: "📋", title: "Copying competitors", desc: "Your content blends in" },
              { icon: "🤷", title: "Guessing what works", desc: "No idea why some hooks hit" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 border-white/10 h-full">
                  <CardContent className="p-6 text-center">
                    <span className="text-4xl mb-4 block">{item.icon}</span>
                    <h3 className="font-semibold mb-2 text-white">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-purple-900/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
              Features
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Everything you need to hook viewers</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="h-8 w-8 text-pink-500" />,
                title: "AI Hook Generator",
                desc: "Input your video topic, get 10 scroll-stopping hooks in seconds. Each one explained so you know WHY it works.",
              },
              {
                icon: <FileText className="h-8 w-8 text-purple-500" />,
                title: "Hook → Full Script",
                desc: "One click turns any hook into a complete 30-60 second TikTok script with structure, timing, and CTA.",
              },
              {
                icon: <Flame className="h-8 w-8 text-orange-500" />,
                title: "Controversy Slider",
                desc: "Dial up the spice. Adjust hook intensity from safe-for-work to 'might get cancelled' with one slider.",
              },
              {
                icon: <Zap className="h-8 w-8 text-yellow-500" />,
                title: "10,000+ Hook Library",
                desc: "Browse proven viral hooks by niche. Fitness, business, comedy, education—find what works and make it yours.",
              },
              {
                icon: <Scissors className="h-8 w-8 text-cyan-500" />,
                title: "Make It Shorter",
                desc: "One click compresses any hook to 10 words or less while keeping the emotional punch.",
              },
              {
                icon: <Star className="h-8 w-8 text-green-500" />,
                title: "Niche Presets",
                desc: "Auto-optimized settings for every content type. Fitness, comedy, business—get perfect hooks instantly.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 border-white/10 h-full hover:border-white/20 transition-colors">
                  <CardContent className="p-8">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                    <p className="text-white/60">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
              Pricing
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Simple pricing. No BS.</h2>
            <p className="text-white/60">Start free, upgrade when you're ready.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-2">Free</h3>
                <p className="text-4xl font-bold mb-4">$0<span className="text-lg text-white/60">/mo</span></p>
                <ul className="space-y-3 mb-6 text-white/70">
                  <li>✓ 5 hook generations/day</li>
                  <li>✓ Hook library preview</li>
                  <li>✓ Save up to 10 hooks</li>
                </ul>
                <Button className="w-full" variant="outline">Get Started</Button>
              </CardContent>
            </Card>

            {/* Pro Tier */}
            <Card className="bg-gradient-to-b from-pink-500/20 to-purple-500/20 border-pink-500/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-pink-500 text-white">Most Popular</Badge>
              </div>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-2">Pro</h3>
                <p className="text-4xl font-bold mb-4">$12<span className="text-lg text-white/60">/mo</span></p>
                <ul className="space-y-3 mb-6 text-white/70">
                  <li>✓ Unlimited generations</li>
                  <li>✓ Full library access</li>
                  <li>✓ Hook rewriter</li>
                  <li>✓ Save unlimited hooks</li>
                  <li>✓ Priority generation</li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Start Pro</Button>
              </CardContent>
            </Card>

            {/* Lifetime Tier */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-2">Lifetime</h3>
                <p className="text-4xl font-bold mb-4">$79<span className="text-lg text-white/60"> once</span></p>
                <ul className="space-y-3 mb-6 text-white/70">
                  <li>✓ Everything in Pro</li>
                  <li>✓ Pay once, use forever</li>
                  <li>✓ All future features</li>
                  <li>✓ No recurring fees</li>
                </ul>
                <Button className="w-full" variant="outline">Get Lifetime</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Stop scrolling past success</h2>
          <p className="text-white/60 text-lg mb-8">
            Every video that flopped had a weak hook. Every viral video had a strong one.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 whitespace-nowrap">
              Get Started Free
            </Button>
          </div>
          
          <p className="text-white/40 text-sm mt-4">
            ✓ No credit card required • ✓ 5 free hooks/day • ✓ Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <Logo size="sm" />
          <div className="flex gap-6 text-white/60 text-sm">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
          <p className="text-white/40 text-sm">© 2026 HookViral</p>
        </div>
      </footer>
    </div>
  );
}
