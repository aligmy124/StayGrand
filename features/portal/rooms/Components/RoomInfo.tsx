// features/rooms/Components/RoomInfo.tsx

import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Sparkles,
  Star,
  MessageCircle,
} from "lucide-react";
import { Room } from "../types/types";
import { formatPrice } from "@/lib/utils";

interface RoomInfoProps {
  room: Room;
}

export default function RoomInfo({ room }: RoomInfoProps) {
  const discountedPrice =
    room.discount > 0
      ? room.price - (room.price * room.discount) / 100
      : room.price;

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link
        href="/rooms"
        className="group inline-flex items-center gap-2 text-sm font-medium text-[#434842]/60 transition-colors hover:text-[#4E604F]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#4E604F]/10 bg-white shadow-sm transition-all group-hover:-translate-x-0.5 group-hover:border-[#4E604F]/20">
          <ArrowLeft className="h-4 w-4" />
        </span>

        Back to explore
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          {/* Small label */}
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4E604F]/[0.08] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4E604F]">
              <Sparkles className="h-3 w-3" />
              Premium stay
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl lg:text-[42px]">
            Room {room.roomNumber}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#434842]/55">
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              {room.capacity} Guests
            </span>

            <span className="h-1 w-1 rounded-full bg-[#434842]/25" />

            <span>
              {room.facilities?.length || 0} amenities
            </span>

            <span className="h-1 w-1 rounded-full bg-[#434842]/25" />

            <span className="inline-flex items-center gap-1.5 font-medium text-[#434842]/70">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              4.8
            </span>
{/* 
            <span className="inline-flex items-center gap-1 text-[#434842]/45">
              <MessageCircle className="h-3.5 w-3.5" />
              124 reviews
            </span> */}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end gap-3 lg:text-right">
          <div>
            {room.discount > 0 && (
              <p className="text-sm text-[#434842]/40 line-through">
                {formatPrice(room.price)}
              </p>
            )}

            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold tracking-tight text-[#4E604F]">
                {formatPrice(discountedPrice)}
              </span>

              <span className="text-sm text-[#434842]/45">
                / night
              </span>
            </div>
          </div>

          {room.discount > 0 && (
            <span className="mb-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
              Save {room.discount}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

