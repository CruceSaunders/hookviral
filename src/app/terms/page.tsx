import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/">
            <Logo size="md" />
          </Link>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-white/60 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-white/60 mb-6">Last updated: January 2026</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-white/70 leading-relaxed">
                By accessing and using HookViral, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                HookViral provides AI-powered hook generation for content creators. You agree to use 
                this service only for lawful purposes and in accordance with these Terms.
              </p>
              <p className="text-white/70 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account and password. 
                You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
              <p className="text-white/70 leading-relaxed">
                The hooks you generate using our service are yours to use. However, the underlying 
                technology, design, and branding of HookViral remain our property. Our hook library 
                is provided for inspiration and reference only.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Subscription and Billing</h2>
              <p className="text-white/70 leading-relaxed">
                Paid subscriptions are billed on a recurring basis. You may cancel at any time, 
                and your access will continue until the end of the current billing period. 
                Lifetime plans are a one-time payment with no recurring charges.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
              <p className="text-white/70 leading-relaxed">
                HookViral is provided "as is" without warranty of any kind. We are not responsible 
                for the performance of content created using our generated hooks.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
              <p className="text-white/70 leading-relaxed">
                If you have any questions about these Terms, please contact us at{" "}
                <a href="mailto:legal@hookviral.com" className="text-pink-400 hover:text-pink-300">
                  legal@hookviral.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
