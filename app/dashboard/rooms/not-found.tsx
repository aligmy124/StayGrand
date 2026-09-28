import Link from "next/link";
import type { Metadata } from "next";
import { DoorOpen, LayoutDashboard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Rooms not found",
  description: "The rooms page you're looking for doesn't exist.",
  robots: { index: false, follow: false },
};

export default function RoomsNotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0F3EE] ring-1 ring-[#E4E7E2]">
          <DoorOpen className="h-8 w-8 text-[#4E604F]" />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#1B1C1C]">
          Rooms not found
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
            <Link href="/dashboard/rooms">
              <DoorOpen className="h-4 w-4" />
              All rooms
            </Link>
          </Button>

          <Button
            
            className="h-11 gap-2 bg-[#4E604F] hover:bg-[#3F4F40]"
          >
            <Link href="/dashboard/rooms/create">
              <Plus className="h-4 w-4" />
              Create room
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