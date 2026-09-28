// app/admin/dashboard/error.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 ring-1 ring-red-100">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-[#1B1C1C]">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-[#8A9189]">
          {error.message || "Please try again."}
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={reset} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <Button className="gap-2 bg-[#4E604F] hover:bg-[#3F4F40]">
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}