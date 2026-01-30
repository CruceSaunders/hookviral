"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Sparkles, Zap, Copy, Check, ArrowRight, Play, Star, FileText, Scissors, Flame,
  Moon, Clock, ClipboardList, HelpCircle, X
} from "lucide-react";
import { Logo } from "@/components/logo";

const exampleHooks = [
  "The TikTok hack that got me banned",
  "I lost 30 pounds and didn't change my diet once",
  "Why your followers aren't watching past 3 seconds",
  "The one thing successful creators never do",
  "I made $10K in a week and no one believes how",
];

// Problem section icons (replacing emojis)
const problemIcons = [
  { icon: Moon, color: "text-gray-400" },
  { icon: Clock, color: "text-yellow-400" },
  { icon: ClipboardList, color: "text-blue-400" },
  { icon: HelpCircle, color: "text-purple-400" },
];

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [currentHook, setCurrentHook] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect for background
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  const copyHook = () => {
    navigator.clipboard.writeText(exampleHooks[currentHook]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Show email popup after 8 seconds or 40% scroll
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hookviralEmailPopup");
    if (hasSeenPopup) return;

    const timer = setTimeout(() => {
      setShowEmailPopup(true);
    }, 8000);

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.4 && !showEmailPopup) {
        setShowEmailPopup(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showEmailPopup]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Store email (in production, send to backend)
    localStorage.setItem("hookviralEmailPopup", "true");
    localStorage.setItem("hookviralEmail", email);
    setEmailSubmitted(true);
    
    setTimeout(() => {
      setShowEmailPopup(false);
    }, 2000);
  };

  const closePopup = () => {
    localStorage.setItem("hookviralEmailPopup", "true");
    setShowEmailPopup(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Email Capture Popup */}
      {showEmailPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            
            {!emailSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Get 10% Off Pro</h3>
                  <p className="text-white/60">
                    Join 500+ creators getting weekly hook inspiration and exclusive discounts.
                  </p>
                </div>
                
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    required
                  />
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500"
                  >
                    Claim My 10% Discount
                  </Button>
                </form>
                
                <p className="text-white/40 text-xs text-center mt-4">
                  No spam. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">You're In!</h3>
                <p className="text-white/60">Check your email for your discount code.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Logo size="md" />
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/pricing">
                <Button variant="ghost" className="text-white/70 hover:text-white">
                  Pricing
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" className="text-white/70 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Animated gradient background with parallax */}
        <motion.div 
          className="absolute inset-0 -z-10"
          style={{ y: backgroundY }}
        >
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[128px]"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]"
            animate={{ 
              x: [0, -30, 0],
              y: [0, 20, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[128px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
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
            <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300">
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl font-medium text-white"
                  >
                    &ldquo;{exampleHooks[currentHook]}&rdquo;
                  </motion.p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setCurrentHook((prev) => (prev + 1) % exampleHooks.length)}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-[1.02] transition-transform"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Another
                  </Button>
                  <Button
                    variant="outline"
                    onClick={copyHook}
                    className="border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all"
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
            <Link href="/signup">
              <Button 
                size="lg" 
                className="text-lg px-8 shadow-lg shadow-pink-500/25 bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition-transform"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/generate">
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 border-white/20 hover:bg-white/10"
              >
                <Play className="mr-2 h-5 w-5" />
                Try Demo
              </Button>
            </Link>
          </motion.div>

          <p className="text-white/40 text-sm mt-4">No credit card required • 5 free hooks/day</p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              70% of viewers decide to scroll in the{" "}
              <span className="text-pink-500">first 3 seconds</span>
            </h2>
            <p className="text-white/60 text-lg">
              Your content might be amazing. But if your hook sucks, nobody will ever know.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Moon, color: "text-gray-400", title: "Starting with 'Hey guys!'", desc: "Instant death for watch time" },
              { Icon: Clock, color: "text-yellow-400", title: "Spending hours on hooks", desc: "When you could be creating" },
              { Icon: ClipboardList, color: "text-blue-400", title: "Copying competitors", desc: "Your content blends in" },
              { Icon: HelpCircle, color: "text-purple-400", title: "Guessing what works", desc: "No idea why some hooks hit" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <Card className="bg-white/5 border-white/10 h-full hover:border-white/20 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-4 ${item.color}`}>
                      <item.Icon className="h-6 w-6" />
                    </div>
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
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
              Features
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Everything you need to hook viewers</h2>
          </motion.div>

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
                whileHover={{ scale: 1.02, y: -3 }}
              >
                <Card className="bg-white/5 border-white/10 h-full hover:border-white/20 transition-all duration-300">
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
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
              Pricing
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Simple pricing. No BS.</h2>
            <p className="text-white/60">Start free, upgrade when you&apos;re ready.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-white/5 border-white/10 h-full">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-2">Free</h3>
                  <p className="text-4xl font-bold mb-4">$0<span className="text-lg text-white/60">/mo</span></p>
                  <ul className="space-y-3 mb-6 text-white/70">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> 5 hook generations/day</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Hook library preview</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Save up to 10 hooks</li>
                  </ul>
                  <Link href="/signup">
                    <Button className="w-full" variant="outline">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pro Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-gradient-to-b from-pink-500/20 to-purple-500/20 border-pink-500/30 relative h-full">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-pink-500 text-white">Most Popular</Badge>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-2">Pro</h3>
                  <p className="text-4xl font-bold mb-4">$12<span className="text-lg text-white/60">/mo</span></p>
                  <ul className="space-y-3 mb-6 text-white/70">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Unlimited generations</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Full library access</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Hook rewriter</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Save unlimited hooks</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Priority generation</li>
                  </ul>
                  <Link href="/signup?plan=pro">
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Start Pro</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Lifetime Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-white/5 border-white/10 h-full">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-2">Lifetime</h3>
                  <p className="text-4xl font-bold mb-4">$79<span className="text-lg text-white/60"> once</span></p>
                  <ul className="space-y-3 mb-6 text-white/70">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Everything in Pro</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Pay once, use forever</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> All future features</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> No recurring fees</li>
                  </ul>
                  <Link href="/signup?plan=lifetime">
                    <Button className="w-full" variant="outline">Get Lifetime</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Stop scrolling past success</h2>
            <p className="text-white/60 text-lg mb-8">
              Every video that flopped had a weak hook. Every viral video had a strong one.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition-transform"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <p className="text-white/40 text-sm mt-4 flex items-center justify-center gap-4">
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-green-500" /> No credit card required</span>
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-green-500" /> 5 free hooks/day</span>
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-green-500" /> Cancel anytime</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/">
            <Logo size="sm" />
          </Link>
          <div className="flex gap-6 text-white/60 text-sm">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <a href="mailto:support@hookviral.com" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-white/40 text-sm">© 2026 HookViral</p>
        </div>
      </footer>
    </div>
  );
}
