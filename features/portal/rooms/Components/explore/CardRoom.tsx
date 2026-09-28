"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Wifi,
  Coffee,
  Car,
  Dumbbell,
  Sparkles,
  Share2,
  ChevronRight,
  Calendar,
  Shield,
  Eye,
} from "lucide-react";
import { Room } from "../../types/types";

interface CardRoomProps {
  rooms: Room[];
}

export default function CardRoom({ rooms }: CardRoomProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getFacilityIcon = (name: string) => {
    const lower = name.toLowerCase();

    if (lower.includes("wifi") || lower.includes("internet")) {
      return <Wifi className="h-3.5 w-3.5" />;
    }

    if (lower.includes("coffee") || lower.includes("breakfast")) {
      return <Coffee className="h-3.5 w-3.5" />;
    }

    if (lower.includes("parking") || lower.includes("car")) {
      return <Car className="h-3.5 w-3.5" />;
    }

    if (lower.includes("gym") || lower.includes("fitness")) {
      return <Dumbbell className="h-3.5 w-3.5" />;
    }

    return <Sparkles className="h-3.5 w-3.5" />;
  };

  const handleShare = async (
    room: Room,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${window.location.origin}/rooms/${room._id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Room ${room.roomNumber}`,
          text: "Check out this amazing room at StayCation!",
          url,
        });
      } catch {
        // User cancelled sharing
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        // Clipboard unavailable
      }
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
      {rooms.map((room, index) => {
        const firstImage = room.images?.[0] || "/images/hero2.jpg";

        const hasDiscount = room.discount > 0;

        const discountedPrice = hasDiscount
          ? room.price - (room.price * room.discount) / 100
          : room.price;

        return (
          <Link
            key={room._id}
            href={`/rooms/${room._id}`}
            className="group block h-full focus:outline-none"
          >
            <article className="relative h-full overflow-hidden rounded-[26px] border border-[#4E604F]/10 bg-white shadow-[0_10px_35px_-15px_rgba(27,28,28,0.25)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#4E604F]/20 hover:shadow-[0_25px_60px_-20px_rgba(27,28,28,0.32)]">
              {/* =====================================================
                  IMAGE
              ===================================================== */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#eef1eb]">
                <Image
                  src={firstImage}
                  alt={`Room ${room.roomNumber}`}
                  fill
                  priority={index < 3}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />

                {/* Image shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                {/* Top right actions */}
                <div className="absolute right-4 top-4 z-20">
                  <button
                    type="button"
                    onClick={(e) => handleShare(room, e)}
                    aria-label={`Share room ${room.roomNumber}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#4E604F] active:scale-95"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Discount */}
                {hasDiscount && (
                  <div className="absolute left-4 top-4 z-20">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold tracking-wide text-[#4E604F] shadow-lg backdrop-blur-md">
                      <Sparkles className="h-3.5 w-3.5" />
                      {room.discount}% OFF
                    </div>
                  </div>
                )}

                {/* Room number */}
                <div className="absolute bottom-4 left-5 z-10 text-white">
                  <p className="mb-0.5 text-[9px] font-medium uppercase tracking-[0.22em] text-white/60">
                    StayCation
                  </p>

                  <p className="text-lg font-semibold tracking-wide">
                    Room {room.roomNumber}
                  </p>
                </div>

                {/* Quick view */}
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <div className="flex translate-y-2 items-center gap-2 rounded-full border border-white/20 bg-white/95 px-5 py-2.5 text-xs font-semibold text-[#4E604F] shadow-2xl backdrop-blur-md transition-transform duration-500 group-hover:translate-y-0">
                    <Eye className="h-4 w-4" />
                    Quick View
                  </div>
                </div>
              </div>

              {/* =====================================================
                  CONTENT
              ===================================================== */}
              <div className="relative p-5 sm:p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-[18px] font-bold tracking-[-0.02em] text-[#1B1C1C] transition-colors duration-300 group-hover:text-[#4E604F]">
                      Room {room.roomNumber}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-1.5 text-sm text-[#434842]/55">
                      <Users className="h-4 w-4" />
                      <span>
                        {room.capacity}{" "}
                        {room.capacity === 1 ? "guest" : "guests"}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="shrink-0 text-right">
                    {hasDiscount && (
                      <p className="mb-0.5 text-[11px] text-[#434842]/40 line-through">
                        {formatPrice(room.price)}
                      </p>
                    )}

                    <p className="text-[20px] font-bold tracking-tight text-[#4E604F]">
                      {formatPrice(discountedPrice)}
                    </p>

                    <p className="mt-0.5 text-[10px] font-medium text-[#434842]/40">
                      per night
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-4 h-px bg-[#4E604F]/[0.07]" />

                {/* Facilities */}
                {room.facilities?.length > 0 && (
                  <div className="flex min-h-[28px] flex-wrap gap-1.5">
                    {room.facilities.slice(0, 3).map((facility) => (
                      <span
                        key={facility._id}
                        className="inline-flex max-w-[110px] items-center gap-1.5 rounded-full bg-[#4E604F]/[0.07] px-2.5 py-1.5 text-[10px] font-medium text-[#4E604F] transition-colors duration-300 group-hover:bg-[#4E604F]/10"
                      >
                        {getFacilityIcon(facility.name)}

                        <span className="truncate">{facility.name}</span>
                      </span>
                    ))}

                    {room.facilities.length > 3 && (
                      <span className="inline-flex items-center rounded-full bg-[#4E604F]/[0.07] px-2.5 py-1.5 text-[10px] font-semibold text-[#4E604F]">
                        +{room.facilities.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-[10px] font-medium text-[#434842]/45">
                      <Shield className="h-3.5 w-3.5 text-[#4E604F]/70" />
                      Secure
                    </span>

                    <span className="flex items-center gap-1.5 text-[10px] font-medium text-[#434842]/45">
                      <Calendar className="h-3.5 w-3.5 text-[#4E604F]/70" />
                      Instant
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4E604F] transition-all duration-300 group-hover:gap-2.5">
                    View
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-8 right-8 h-[2px] origin-center scale-x-0 bg-[#4E604F] opacity-70 transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}
