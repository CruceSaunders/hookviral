"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    description: "Get started with basic features",
    price: "$0",
    period: "forever",
    features: [
      "5 hook generations per day",
      "Hook library preview",
      "Save up to 10 hooks",
      "Basic hook styles",
      "Community support",
    ],
    cta: "Get Started Free",
    ctaLink: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    description: "For serious content creators",
    price: "$12",
    period: "/month",
    yearlyPrice: "$99/year",
    features: [
      "Unlimited hook generations",
      "Full library access (10,000+ hooks)",
      "Hook rewriter tool",
      "Save unlimited hooks",
      "Generation history",
      "Priority AI processing",
      "All hook styles & tones",
      "Export to CSV",
      "Email support",
    ],
    cta: "Start Pro Trial",
    ctaLink: "/signup?plan=pro",
    popular: true,
  },
  {
    name: "Lifetime",
    description: "Pay once, use forever",
    price: "$79",
    period: "one-time",
    features: [
      "Everything in Pro",
      "No recurring payments",
      "All future features included",
      "Priority feature requests",
      "1-on-1 onboarding call",
      "Lifetime updates",
    ],
    cta: "Get Lifetime Access",
    ctaLink: "/signup?plan=lifetime",
    popular: false,
    badge: "Best Value",
  },
];

const faqs = [
  {
    q: "Is this just ChatGPT with a different UI?",
    a: "No. HookViral uses AI specifically fine-tuned on viral TikTok patterns. We've analyzed thousands of top-performing videos to understand what makes hooks work. Plus, our library of 10,000+ real hooks gives you proven inspiration that ChatGPT can't provide.",
  },
  {
    q: "Will my content sound generic?",
    a: "The opposite. We generate multiple unique options and explain the psychology behind each one so you can pick what fits YOUR style. No two creators will have the same hooks.",
  },
  {
    q: "What if I don't like the generated hooks?",
    a: "Regenerate as many times as you want (within your daily limit on Free, unlimited on Pro). We also have a Hook Rewriter to improve any hook you're working on.",
  },
  {
    q: "Can I cancel my Pro subscription?",
    a: "Yes, cancel anytime. Your access continues until the end of your billing period. No questions asked.",
  },
  {
    q: "Is the Lifetime deal really lifetime?",
    a: "Yes! Pay once, use forever. You'll get all current features plus any new features we add in the future. It's our way of rewarding early supporters.",
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-pink-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                HookViral
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-white/70 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge className="mb-4 bg-pink-500/10 text-pink-400 border-pink-500/20">
            Pricing
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Simple pricing.{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              No surprises.
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Start free, upgrade when you need more. Cancel anytime.
          </p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full ${
                  plan.popular 
                    ? "bg-gradient-to-b from-pink-500/20 to-purple-500/20 border-pink-500/30" 
                    : "bg-white/5 border-white/10"
                } relative`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-pink-500 text-white">Most Popular</Badge>
                    </div>
                  )}
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-green-500 text-white">{plan.badge}</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription className="text-white/60">
                      {plan.description}
                    </CardDescription>
                    <div className="pt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-white/60">{plan.period}</span>
                      {plan.yearlyPrice && (
                        <p className="text-sm text-white/40 mt-1">
                          or {plan.yearlyPrice} (save 17%)
                        </p>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                          <Check className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href={plan.ctaLink}>
                      <Button 
                        className={`w-full ${
                          plan.popular 
                            ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90" 
                            : ""
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.cta}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-white/60 text-sm">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to create viral hooks?</h2>
          <p className="text-white/60 mb-8">
            Join 500+ creators already using HookViral to boost their content.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-pink-500" />
            <span className="font-bold">HookViral</span>
          </div>
          <div className="flex gap-6 text-white/60 text-sm">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Contact</Link>
          </div>
          <p className="text-white/40 text-sm">© 2026 HookViral</p>
        </div>
      </footer>
    </div>
  );
}
