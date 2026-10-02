"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Sparkles,
  Share2,
  ChevronRight,
  Calendar,
  Shield,
  Tag,
} from "lucide-react";
import type { IAds } from "@/features/portal/Ads/types/ads.type";


interface FeaturedCardAdsProps {
  ads: IAds[];
}

const CARD_LAYOUT = [

  {
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-2",
    minH: "min-h-[520px]",
    title: "text-3xl sm:text-4xl",
    price: "text-3xl",
    isFeatured: true,
    showExtras: true,
  },
  {
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-1",
    minH: "min-h-[240px]",
    title: "text-2xl",
    price: "text-2xl",
    isFeatured: true,
    showExtras: false,
  },
  {
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-1",
    minH: "min-h-[240px]",
    title: "text-xl",
    price: "text-xl",
    isFeatured: false,
    showExtras: false,
  },

  {
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-1",
    minH: "min-h-[240px]",
    title: "text-xl",
    price: "text-xl",
    isFeatured: false,
    showExtras: false,
  },
  {
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-1",
    minH: "min-h-[240px]",
    title: "text-xl",
    price: "text-xl",
    isFeatured: false,
    showExtras: false,
  },
];

export default function FeaturedCardAds({ ads }: FeaturedCardAdsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleShare = async (
    ad: IAds,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${window.location.origin}/ads/${ad._id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Room ${ad.room.roomNumber}`,
          text: "Check out this amazing deal at StayCation!",
          url,
        });
      } catch {
        // User cancelled
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
    <div
      className="
        grid grid-cols-1 gap-4
        md:grid-cols-2 md:gap-5
        lg:grid-cols-4 lg:grid-rows-2 lg:gap-5
      "
    >
      {ads.map((ad, index) => {
        const layout = CARD_LAYOUT[index % CARD_LAYOUT.length];
        const firstImage = ad.room.images?.[0] || "/images/hero2.jpg";
        const hasDiscount = ad.room.discount > 0;

        const discountedPrice = hasDiscount
          ? ad.room.price - (ad.room.price * ad.room.discount) / 100
          : ad.room.price;

        return (
          <Link
            key={ad._id}
            href={`/ads/${ad._id}`}
            className={`
              group block focus:outline-none
              ${layout.colSpan}
              ${layout.rowSpan}
            `}
          >
            <article
              className={`
                relative h-full w-full overflow-hidden rounded-[26px]
                border border-white/20
                bg-[#EEF1EB]
                shadow-[0_12px_40px_-18px_rgba(27,28,28,0.35)]
                transition-all duration-500
                hover:-translate-y-1
                hover:shadow-[0_25px_60px_-20px_rgba(27,28,28,0.45)]
                ${layout.minH}
              `}
            >
              {/* ============ IMAGE ============ */}
              <Image
                src={firstImage}
                alt={`Room ${ad.room.roomNumber}`}
                fill
                priority={index < 2}
                sizes={
                  layout.isFeatured
                    ? "(max-width: 1024px) 100vw, 50vw"
                    : "(max-width: 1024px) 50vw, 25vw"
                }
                className="
                  object-cover
                  transition-transform duration-700 ease-out
                  group-hover:scale-[1.06]
                "
              />

              {/* ============ OVERLAY ============ */}
              <div
                className={`
                  absolute inset-0 bg-gradient-to-t
                  ${
                    layout.isFeatured
                      ? "from-black/85 via-black/30 to-black/5"
                      : "from-black/80 via-black/20 to-transparent"
                  }
                `}
              />

              {/* ============ DISCOUNT ============ */}
              {hasDiscount && (
                <div className="absolute left-4 top-4 z-10">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-[10px] font-bold tracking-wide text-white shadow-lg">
                    <Tag className="h-3.5 w-3.5" />
                    {ad.room.discount}% OFF
                  </div>
                </div>
              )}

              {/* ============ SHARE ============ */}
              <button
                type="button"
                onClick={(e) => handleShare(ad, e)}
                aria-label={`Share room ${ad.room.roomNumber}`}
                className="
                  absolute right-4 top-4 z-20
                  flex h-9 w-9 items-center justify-center
                  rounded-full border border-white/20
                  bg-black/20 text-white backdrop-blur-md
                  transition-all duration-300
                  hover:scale-110 hover:bg-white hover:text-[#4E604F]
                "
              >
                <Share2 className="h-4 w-4" />
              </button>

              {/* ============ CONTENT ============ */}
              <div
                className={`
                  absolute inset-x-0 bottom-0 z-10
                  ${layout.isFeatured ? "p-6 sm:p-7" : "p-5 sm:p-6"}
                `}
              >
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    {layout.isFeatured && (
                      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                        <Sparkles className="h-3 w-3" />
                        Featured Deal
                      </div>
                    )}

                    <h3
                      className={`
                        font-bold tracking-tight text-white
                        ${layout.title}
                      `}
                    >
                      Room {ad.room.roomNumber}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-1.5 text-white/65">
                      <Users className="h-3.5 w-3.5" />

                      <span className="text-xs">
                        {ad.room.capacity}{" "}
                        {ad.room.capacity === 1 ? "guest" : "guests"}
                      </span>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="shrink-0 text-right">
                    {hasDiscount && (
                      <p className="text-[10px] text-white/45 line-through">
                        {formatPrice(ad.room.price)}
                      </p>
                    )}

                    <p className={`font-bold text-white ${layout.price}`}>
                      {formatPrice(discountedPrice)}
                    </p>

                    <p className="text-[9px] text-white/45">per night</p>
                  </div>
                </div>

                {/* Featured extra info */}
                {layout.showExtras && (
                  <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-[10px] text-white/60">
                        <Shield className="h-3.5 w-3.5" />
                        Secure booking
                      </span>

                      <span className="hidden items-center gap-1.5 text-[10px] text-white/60 sm:flex">
                        <Calendar className="h-3.5 w-3.5" />
                        Instant
                      </span>
                    </div>

                    <span className="flex items-center gap-1 text-xs font-semibold text-white transition-all group-hover:gap-2">
                      Explore
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                )}

                {/* Small cards CTA */}
                {!layout.showExtras && (
                  <div className="mt-3 flex justify-end">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-white/80 transition-all group-hover:gap-2 group-hover:text-white">
                      View Deal
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                )}
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}