"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, Lock, User, Check } from "lucide-react";
import { Logo } from "@/components/logo";
// import { createClient } from "@/lib/supabase/client";

const features = [
  "5 free hook generations per day",
  "Access to hook library preview",
  "Save up to 10 favorite hooks",
];

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // const supabase = createClient();
      // const { error } = await supabase.auth.signUp({
      //   email,
      //   password,
      //   options: {
      //     data: { name },
      //   },
      // });
      // if (error) throw error;
      
      // For demo, just redirect
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push("/generate");
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      // const supabase = createClient();
      // await supabase.auth.signInWithOAuth({
      //   provider: "google",
      //   options: {
      //     redirectTo: `${window.location.origin}/auth/callback`,
      //   },
      // });
      
      // For demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push("/generate");
    } catch (err: any) {
      setError(err.message || "Failed to sign up with Google");
      setIsLoading(false);
    }
  };

  return (
    <Card glass className="w-full max-w-md border-white/10">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Logo size="lg" />
        </div>
        <CardTitle className="text-2xl text-white">Create an account</CardTitle>
        <CardDescription className="text-white/60">
          Start creating viral hooks in seconds
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Free features */}
        <div className="mb-6 p-4 rounded-lg bg-pink-500/10 border border-pink-500/20">
          <p className="text-sm font-medium text-pink-400 mb-2">Free plan includes:</p>
          <ul className="space-y-1">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                <Check className="h-3 w-3 text-pink-400" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-white/60">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="pl-10 bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/60">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/60">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="pl-10 bg-white/5 border-white/10 text-white"
              />
            </div>
            <p className="text-xs text-white/40">Minimum 8 characters</p>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            variant="gradient"
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-black px-2 text-white/40">or continue with</span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleGoogleSignup}
          disabled={isLoading}
          className="w-full border-white/20 text-white hover:bg-white/10"
        >
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
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
          Google
        </Button>

        <p className="mt-6 text-center text-sm text-white/60">
          Already have an account?{" "}
          <Link href="/login" className="text-pink-400 hover:text-pink-300">
            Sign in
          </Link>
        </p>

        <p className="mt-4 text-center text-xs text-white/40">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-white/60">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-white/60">
            Privacy Policy
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
