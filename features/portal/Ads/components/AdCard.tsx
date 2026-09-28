import Image from "next/image";
import Link from "next/link";
import { Users, Tag, ImageIcon } from "lucide-react";
import type { IAds } from "../types/ads.type";

interface AdCardProps {
  ad: IAds;
}

export default function AdCard({ ad }: AdCardProps) {
  const finalPrice =
    ad.room.discount > 0
      ? ad.room.price * (1 - ad.room.discount / 100)
      : ad.room.price;

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#E4E7E2] bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#4E604F]/30 hover:shadow-lg">
      <Link
        href={`/ads/${ad._id}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E604F]/30 focus-visible:ring-offset-2"
        aria-label={`View ad for Room ${ad.room.roomNumber}`}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F6F2]">
          {ad.room.images?.[0] ? (
            <Image
              src={ad.room.images[0]}
              alt={`Room ${ad.room.roomNumber}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageIcon className="h-8 w-8 text-[#8A9189]" />
            </div>
          )}

          {/* Discount badge */}
          {ad.room.discount > 0 && (
            <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-lg">
              <Tag className="h-3 w-3" aria-hidden="true" />
              {ad.room.discount}% OFF
            </div>
          )}

          {/* Inactive overlay */}
          {!ad.isActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
              <span className="rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#666B65]">
                Inactive
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="truncate text-base font-bold text-[#1B1C1C]">
            Room {ad.room.roomNumber}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#8A9189]">
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" aria-hidden="true" />
              {ad.room.capacity} guests
            </span>
            <span aria-hidden="true">·</span>
            <span>by {ad.createdBy.userName}</span>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-end justify-between border-t border-[#F4F6F2] pt-3">
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-[#4E604F]">
                ${finalPrice.toFixed(2)}
              </span>
              <span className="text-[10px] text-[#8A9189]">per night</span>
            </div>

            {ad.room.discount > 0 && (
              <span className="text-xs text-[#8A9189] line-through">
                ${ad.room.price}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
