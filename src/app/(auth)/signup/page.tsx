"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, Lock, User, AlertCircle, Check } from "lucide-react";
import { Logo } from "@/components/logo";
import { useAuth } from "@/lib/auth-context";
import { storeUserSignup } from "@/lib/store-signup";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const { user, signUp, signInWithGoogle, loading, error, clearError } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      router.push("/generate");
    }
  }, [user, loading, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    clearError();
    
    try {
      await signUp(email, password);
      // Store user in Firestore for your records
      await storeUserSignup(email, email, name, plan || "free");
      router.push("/generate");
    } catch (err) {
      // Error is handled by auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsSubmitting(true);
    clearError();
    
    try {
      await signInWithGoogle();
      router.push("/generate");
    } catch (err) {
      // Error is handled by auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Logo size="lg" />
          </Link>
        </div>
        
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Create your account</CardTitle>
            <CardDescription className="text-white/60">
              {plan ? `Start your ${plan} plan` : "Start generating viral hooks today"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            {/* Plan benefits reminder */}
            {plan && (
              <div className="p-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-lg">
                <p className="text-sm text-white/80 font-medium mb-2">
                  {plan === "pro" ? "Pro Plan - $12/month" : "Lifetime Access - $79 once"}
                </p>
                <ul className="text-xs text-white/60 space-y-1">
                  <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> Unlimited generations</li>
                  <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> Full library access</li>
                  <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> Priority support</li>
                </ul>
              </div>
            )}
            
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-white/70">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-white/70">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-white/70">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    required
                    minLength={6}
                    disabled={isSubmitting}
                  />
                </div>
                <p className="text-xs text-white/40">Must be at least 6 characters</p>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0A0A0A] px-2 text-white/40">Or continue with</span>
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignup}
              disabled={isSubmitting}
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              Continue with Google
            </Button>
            
            <p className="text-center text-sm text-white/60">
              Already have an account?{" "}
              <Link href="/login" className="text-pink-400 hover:text-pink-300">
                Sign in
              </Link>
            </p>
            
            <p className="text-center text-xs text-white/40">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-white/60">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-white/60">
                Privacy Policy
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}
