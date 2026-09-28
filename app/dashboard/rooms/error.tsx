"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  RefreshCw,
  DoorOpen,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RoomsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Rooms admin error:", error);
  }, [error]);

  const isNetworkError =
    error.message?.toLowerCase().includes("network") ||
    error.message?.toLowerCase().includes("fetch");

  const isAuthError =
    error.message?.toLowerCase().includes("unauthorized") ||
    error.message?.toLowerCase().includes("forbidden");

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 ring-1 ring-red-100">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-[#1B1C1C]">
          {isAuthError
            ? "Access denied"
            : isNetworkError
              ? "Connection problem"
              : "Couldn't load rooms"}
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-[#8A9189]">
          {isAuthError
            ? "You don't have permission to view rooms. Try logging in again."
            : isNetworkError
              ? "Check your internet connection and try again."
              : error.message ||
                "Something went wrong while loading rooms. Please try again."}
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
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        </div>

        <Link
          href="/dashboard/rooms"
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-[#4E604F] underline-offset-2 hover:underline"
        >
          <DoorOpen className="h-3 w-3" />
          Back to rooms
        </Link>
      </div>
    </main>
  );
}
