// app/admin/dashboard/not-found.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { Search, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function DashboardNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0F3EE] ring-1 ring-[#E4E7E2]">
          <Search className="h-8 w-8 text-[#4E604F]" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#1B1C1C]">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-[#8A9189]">
          The dashboard page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="mt-8 flex justify-center">
          <Button  className="gap-2 bg-[#4E604F] hover:bg-[#3F4F40]">
            <Link href="/admin/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              Back to dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}