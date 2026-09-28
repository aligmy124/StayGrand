"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  RefreshCw,
  Megaphone,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdDetailsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Ad details error:", error);
  }, [error]);

  const isNetworkError =
    error.message?.toLowerCase().includes("network") ||
    error.message?.toLowerCase().includes("fetch");

  const isNotFound =
    error.message?.toLowerCase().includes("not found") ||
    error.message?.toLowerCase().includes("404");

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 ring-1 ring-red-100">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-[#1B1C1C]">
          {isNetworkError
            ? "Connection problem"
            : isNotFound
              ? "Ad not found"
              : "Couldn't load ad details"}
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-[#8A9189]">
          {isNetworkError
            ? "Check your internet connection and try again."
            : isNotFound
              ? "This ad may have been deleted or the link is invalid."
              : error.message ||
                "Something went wrong while loading ad details. Please try again."}
        </p>

        {error.digest && (
          <p className="mt-3 font-mono text-[11px] text-[#8A9189]">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            type="button"
            onClick={reset}
            variant="outline"
            className="h-11 gap-2 border-[#E4E7E2] hover:border-[#4E604F] hover:bg-[#F8F9F7] hover:text-[#4E604F]"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>

          <Button
            
            className="h-11 gap-2 bg-[#4E604F] hover:bg-[#3F4F40]"
          >
            <Link href="/dashboard/ads">
              <Megaphone className="h-4 w-4" />
              All ads
            </Link>
          </Button>
        </div>

        <Link
          href="/dashboard"
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-[#4E604F] underline-offset-2 hover:underline"
        >
          <LayoutDashboard className="h-3 w-3" />
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}