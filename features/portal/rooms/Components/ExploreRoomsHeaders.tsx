"use client";

import { Hotel, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExploreRoomsHeadersProps {
  totalRooms?: number;
  className?: string;
}

export default function ExploreRoomsHeaders({
  totalRooms = 0,
  className,
}: ExploreRoomsHeadersProps) {
  return (
    <section className={cn("relative", className)}>
      <div className="relative overflow-hidden rounded-[28px] border border-[#4E604F]/10 bg-white shadow-[0_20px_60px_-30px_rgba(78,96,79,0.25)]">
        {/* Background Decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#4E604F]/[0.06] blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-[#4E604F]/[0.04] blur-3xl" />

          {/* Subtle Grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(#4E604F 1px, transparent 1px), linear-gradient(90deg, #4E604F 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative flex flex-col gap-7 px-6 py-7 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-9">
          {/* Left */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Icon */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-[#4E604F]/20 blur-xl" />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#4E604F]/10 bg-[#4E604F] shadow-lg shadow-[#4E604F]/20 sm:h-16 sm:w-16">
                <Hotel className="h-6 w-6 text-white sm:h-7 sm:w-7" />
              </div>

              {/* Sparkle */}
              <div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#eef1eb]">
                <Sparkles className="h-2.5 w-2.5 text-[#4E604F]" />
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4E604F]/60">
                  StayCation
                </span>

                <span className="h-1 w-1 rounded-full bg-[#4E604F]/30" />

                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#434842]/40">
                  Collection
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[#1B1C1C] sm:text-3xl lg:text-[34px]">
                Explore Rooms
              </h1>

              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-[#434842]/60 sm:text-[15px]">
                Discover thoughtfully selected rooms designed for your perfect
                stay.
              </p>
            </div>
          </div>

          {/* Right Stats */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Rooms Count */}
            <div className="group flex items-center gap-3 rounded-2xl border border-[#4E604F]/10 bg-[#eef1eb]/50 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:border-[#4E604F]/20 hover:bg-[#eef1eb]/80">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                <Hotel className="h-4 w-4 text-[#4E604F]" />
              </div>

              <div>
                <p className="text-xl font-bold leading-none text-[#1B1C1C]">
                  {totalRooms}
                </p>

                <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-[#434842]/50">
                  Available Rooms
                </p>
              </div>
            </div>

            {/* Explore Indicator */}
            <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-[#4E604F]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4E604F]/20 hover:shadow-md sm:flex">
              <ArrowUpRight className="h-5 w-5 text-[#4E604F]" />
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4E604F]/20 to-transparent" />
      </div>

      {/* Small Section Label */}
      <div className="mt-5 flex items-center gap-3 px-1">
        <div className="h-px flex-1 bg-gradient-to-r from-[#4E604F]/15 to-transparent" />

        <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#434842]/35">
          <span className="h-1 w-1 rounded-full bg-[#4E604F]/30" />
          Find your stay
          <span className="h-1 w-1 rounded-full bg-[#4E604F]/30" />
        </span>

        <div className="h-px flex-1 bg-gradient-to-l from-[#4E604F]/15 to-transparent" />
      </div>
    </section>
  );
}

