"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Room page error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-semibold text-[#1B1C1C]">
          Something went wrong
        </h2>
        <p className="mt-2 text-[#434842]/70">
          We couldn&apos;t load this room. Please try again.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} size="lg">
            Try Again
          </Button>
          <a
            href="/rooms"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#4E604F]/20 px-6 py-3 text-sm font-semibold text-[#434842] transition-all hover:bg-[#4E604F]/5"
          >
            Browse Rooms
          </a>
        </div>
      </div>
    </div>
  );
}