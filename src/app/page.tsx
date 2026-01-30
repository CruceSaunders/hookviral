"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { storeEmailSignup } from "@/lib/store-signup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Sparkles, Zap, ArrowRight, Play, Star, Check, X,
  Clock, Target, TrendingUp, Lightbulb, Users, Shield
} from "lucide-react";
import { Logo } from "@/components/logo";
import { AnimatedMeshGradient, FloatingParticles, GradientText } from "@/components/animated-background";
import { HeroMockup } from "@/components/hero-mockup";

// Trusted by logos (placeholder names)
const trustedBy = [
  "Creator Academy", "TikTok Mastery", "Viral Vault", "Content Club", "Growth Lab"
];

// Features with icons
const features = [
  {
    icon: Zap,
    title: "Generate in Seconds",
    description: "Get 10 scroll-stopping hooks instantly. No more staring at blank screens."
  },
  {
    icon: Target,
    title: "Niche-Optimized",
    description: "Hooks tailored for fitness, business, comedy, beauty, and 10+ more niches."
  },
  {
    icon: TrendingUp,
    title: "Proven Formulas",
    description: "Based on analysis of 10,000+ viral TikToks. What works, distilled."
  },
  {
    icon: Lightbulb,
    title: "Style Control",
    description: "Curiosity, controversy, story, shock—pick your angle and spice level."
  },
];

// Testimonials
const testimonials = [
  {
    quote: "My watch time went from 2 seconds to 15 seconds average. Game changer.",
    author: "Sarah K.",
    role: "Fitness Creator, 50K followers"
  },
  {
    quote: "I was spending hours on hooks. Now it takes me 30 seconds.",
    author: "Mike T.",
    role: "Business Content, 120K followers"
  },
  {
    quote: "Finally something that actually understands TikTok hooks.",
    author: "Jess L.",
    role: "Lifestyle Creator, 80K followers"
  },
];

// FAQ items
const faqs = [
  {
    q: "How many hooks can I generate?",
    a: "Free users get 5 generations per day (50 hooks). Pro users get unlimited generations."
  },
  {
    q: "Will the hooks sound generic?",
    a: "No! Our AI is trained on viral TikTok patterns and generates unique, topic-specific hooks—not templates."
  },
  {
    q: "What niches are supported?",
    a: "Fitness, business, comedy, education, beauty, tech, food, gaming, lifestyle, and more. Each has optimized settings."
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, cancel with one click. No questions asked, no hidden fees."
  },
];

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Refs for scroll animations
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });

  // Show email popup after 10 seconds
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hookviralEmailPopup");
    if (hasSeenPopup) return;

    const timer = setTimeout(() => {
      setShowEmailPopup(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    await storeEmailSignup(email, "popup_discount");
    localStorage.setItem("hookviralEmailPopup", "true");
    setEmailSubmitted(true);
    
    setTimeout(() => setShowEmailPopup(false), 2000);
  };

  const closePopup = () => {
    localStorage.setItem("hookviralEmailPopup", "true");
    setShowEmailPopup(false);
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      {/* Animated Background */}
      <AnimatedMeshGradient />
      <FloatingParticles />

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
            className="relative bg-gray-900 border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl"
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
                    Join 500+ creators getting weekly hook inspiration.
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
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Logo size="md" />
            </Link>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="text-white/70 hover:text-white hidden sm:flex"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Pricing
              </Button>
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
      <section className="pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="text-center lg:text-left">
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
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                Stop Losing Views in the{" "}
                <GradientText>First 3 Seconds</GradientText>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-white/60 mb-8 max-w-xl mx-auto lg:mx-0"
              >
                AI-powered hooks that make people stop scrolling. Generate 10 viral TikTok openers in 30 seconds.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link href="/signup">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 shadow-lg shadow-pink-500/25 bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition-transform w-full sm:w-auto"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/generate">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-lg px-8 border-white/20 hover:bg-white/10 w-full sm:w-auto"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Try Demo
                  </Button>
                </Link>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/40 text-sm mt-4"
              >
                No credit card required • 5 free hooks/day
              </motion.p>
            </div>

            {/* Right: Interactive Mockup */}
            <div className="relative">
              <HeroMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-white/40 text-sm mb-6">TRUSTED BY CREATORS FROM</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {trustedBy.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * i }}
                className="text-white/30 font-semibold text-lg"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to <GradientText>Go Viral</GradientText>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Stop guessing what hooks work. Our AI has analyzed thousands of viral TikToks so you don't have to.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-white/60">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-24 px-4 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Creators Love <GradientText>HookViral</GradientText>
            </h2>
            <p className="text-white/60 text-lg">See what they're saying</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <Card className="bg-white/5 border-white/10 h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-white/80 mb-4">"{t.quote}"</p>
                    <div>
                      <p className="font-semibold">{t.author}</p>
                      <p className="text-white/50 text-sm">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, <GradientText>Transparent</GradientText> Pricing
            </h2>
            <p className="text-white/60 text-lg">Start free. Upgrade when you're ready.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Free Plan */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <p className="text-white/60 mb-6">Perfect for trying it out</p>
                <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-white/40">/mo</span></div>
                <ul className="space-y-3 mb-8">
                  {["5 generations/day", "All niches", "All styles", "History & saved hooks"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-white/70">
                      <Check className="h-4 w-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-gradient-to-b from-pink-500/10 to-purple-500/10 border-pink-500/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                  Most Popular
                </Badge>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-white/60 mb-6">For serious creators</p>
                <div className="text-4xl font-bold mb-6">$9<span className="text-lg text-white/40">/mo</span></div>
                <ul className="space-y-3 mb-8">
                  {["Unlimited generations", "Hook rewriter", "Script expander", "Priority support", "Early access to features"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-white/70">
                      <Check className="h-4 w-4 text-pink-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/signup?plan=pro">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked <GradientText>Questions</GradientText>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Card 
                  className={`bg-white/5 border-white/10 cursor-pointer transition-all ${openFaq === i ? 'border-white/20' : ''}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{faq.q}</h3>
                      <motion.span
                        animate={{ rotate: openFaq === i ? 180 : 0 }}
                        className="text-white/40"
                      >
                        ▼
                      </motion.span>
                    </div>
                    {openFaq === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-white/60 mt-4"
                      >
                        {faq.a}
                      </motion.p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to <GradientText>Stop the Scroll?</GradientText>
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Join 500+ creators who are getting more views with better hooks.
            </p>
            <Link href="/signup">
              <Button 
                size="lg" 
                className="text-lg px-8 shadow-lg shadow-pink-500/25 bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition-transform"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-white/40 text-sm mt-4">No credit card required</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="text-white/40">© 2025 HookViral</span>
          </div>
          <div className="flex gap-6 text-white/40">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <a href="mailto:support@hookviral.com" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
