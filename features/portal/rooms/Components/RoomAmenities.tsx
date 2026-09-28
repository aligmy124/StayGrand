// features/rooms/Components/RoomAmenities.tsx

import {
  Wifi,
  Coffee,
  Car,
  Dumbbell,
  Sparkles,
  Tv,
  Utensils,
  Snowflake,
  Sun,
  Wind,
  ShowerHead,
  ConciergeBell,
  Layout,
  PawPrint,
  Flame,
  Check,
} from "lucide-react";

import { Room } from "../types/types";

interface RoomAmenitiesProps {
  room: Room;
}

export default function RoomAmenities({ room }: RoomAmenitiesProps) {
  const getFacilityIcon = (name: string) => {
    const lower = name.toLowerCase();

    if (lower.includes("wifi") || lower.includes("internet"))
      return Wifi;

    if (lower.includes("coffee") || lower.includes("breakfast"))
      return Coffee;

    if (lower.includes("parking") || lower.includes("car"))
      return Car;

    if (lower.includes("gym") || lower.includes("fitness"))
      return Dumbbell;

    if (lower.includes("bathroom") || lower.includes("shower"))
      return ShowerHead;

    if (lower.includes("tv") || lower.includes("television"))
      return Tv;

    if (lower.includes("restaurant") || lower.includes("dining"))
      return Utensils;

    if (lower.includes("air") || lower.includes("ac"))
      return Snowflake;

    if (lower.includes("pool") || lower.includes("swimming"))
      return Sun;

    if (lower.includes("wind") || lower.includes("fan"))
      return Wind;

    if (lower.includes("room service") || lower.includes("concierge"))
      return ConciergeBell;

    if (lower.includes("view") || lower.includes("balcony"))
      return Layout;

    if (lower.includes("pet"))
      return PawPrint;

    if (lower.includes("fireplace") || lower.includes("heating"))
      return Flame;

    return Sparkles;
  };

  if (!room.facilities?.length) {
    return null;
  }

  return (
    <section className="rounded-[28px] border border-[#4E604F]/10 bg-white shadow-[0_10px_40px_-25px_rgba(27,28,28,0.25)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#4E604F]/[0.07] px-6 py-5 sm:px-7">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4E604F]/[0.08]">
              <Sparkles className="h-4 w-4 text-[#4E604F]" />
            </div>

            <div>
              <h2 className="text-base font-bold text-[#1B1C1C]">
                Amenities
              </h2>

              <p className="text-xs text-[#434842]/45">
                Everything included with your stay
              </p>
            </div>
          </div>
        </div>

        <span className="rounded-full bg-[#f5f6f3] px-3 py-1 text-xs font-semibold text-[#434842]/55">
          {room.facilities.length} included
        </span>
      </div>

      {/* Amenities */}
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-b-[28px] bg-[#4E604F]/[0.06] sm:grid-cols-2 lg:grid-cols-3">
        {room.facilities.map((facility) => {
          const Icon = getFacilityIcon(facility.name);

          return (
            <div
              key={facility._id}
              className="group flex items-center gap-3 bg-white px-5 py-4 transition-colors hover:bg-[#4E604F]/[0.025]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f5f6f3] transition-all duration-300 group-hover:bg-[#4E604F]/[0.08]">
                <Icon className="h-4 w-4 text-[#4E604F]" />
              </div>

              <span className="min-w-0 flex-1 truncate text-sm font-medium text-[#434842]/75">
                {facility.name}
              </span>

              <Check className="h-3.5 w-3.5 shrink-0 text-[#4E604F]/50" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

