"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, Plus } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  // In production, this would fetch from Supabase
  const generations: any[] = [];

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Generation History</h1>
        <p className="text-white/60 mb-8">Your past hook generations</p>

        {generations.length === 0 ? (
          <Card className="bg-white/5 border-white/10">
            <CardContent className="py-16 text-center">
              <History className="h-12 w-12 mx-auto mb-4 text-white/20" />
              <h3 className="text-lg font-medium mb-2">No history yet</h3>
              <p className="text-white/40 mb-6">
                Your generated hooks will appear here
              </p>
              <Link href="/generate">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Your First Hooks
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* History items would render here */}
          </div>
        )}
      </div>
    </div>
  );
}
