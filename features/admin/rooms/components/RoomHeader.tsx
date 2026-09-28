"use client";

import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Download,
  LayoutGrid,
  List,
} from "lucide-react";
import { useState } from "react";
import { IRoom } from "../types/type.room";

interface RoomHeaderProps {
  totalCount?: number;
  rooms: IRoom[]
}

export default function RoomHeader({
  totalCount = 0,
  rooms
}: RoomHeaderProps) {
  return (
    <div className="mb-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Title */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="text-2xl font-bold text-[#1B1C1C] sm:text-3xl">
              Rooms
            </h1>

            <span className="inline-flex shrink-0 items-center rounded-full bg-[#F0F3EE] px-2.5 py-1 text-xs font-semibold text-[#4E604F]">
              {totalCount} total
            </span>
          </div>

          <p className="mt-1 text-sm text-[#8A9189]">
            Manage all rooms, availability, and pricing.
          </p>
        </div>

        {/* Actions */}
        <div className="flex w-full items-center gap-2 md:w-auto">

          {/* Add Room */}
          <Link
            href="/dashboard/rooms/create"
            className="
              group relative inline-flex h-10 min-w-0 flex-1
              items-center justify-center gap-2 overflow-hidden
              rounded-xl bg-[#4E604F] px-3 sm:flex-none sm:px-4
              text-sm font-semibold text-white
              shadow-sm transition-all duration-200
              hover:bg-[#3F4F40]
              hover:shadow-lg hover:shadow-[#4E604F]/25
              focus:outline-none focus-visible:ring-2
              focus-visible:ring-[#4E604F]/50 focus-visible:ring-offset-2
              active:scale-[0.98]
            "
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <Plus className="relative h-4 w-4 shrink-0 transition-transform duration-200 group-hover:rotate-90" />

            <span className="relative whitespace-nowrap">Add Room</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

