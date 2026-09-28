import Link from "next/link";
import type { Metadata } from "next";
import { Users, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Users not found",
  description: "The users page you're looking for doesn't exist.",
  robots: { index: false, follow: false },
};

export default function UsersNotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0F3EE] ring-1 ring-[#E4E7E2]">
          <Users className="h-8 w-8 text-[#4E604F]" />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#1B1C1C]">
          Users not found
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-[#8A9189]">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            
            variant="outline"
            className="h-11 gap-2 border-[#E4E7E2] hover:border-[#4E604F] hover:bg-[#F8F9F7] hover:text-[#4E604F]"
          >
            <Link href="/dashboard/users">
              <Users className="h-4 w-4" />
              All users
            </Link>
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
      </div>
    </main>
  );
}