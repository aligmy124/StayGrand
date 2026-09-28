import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Tag,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IAds } from "../types/ads.type";

interface AdDetailsProps {
  ad: IAds;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function AdDetails({ ad }: AdDetailsProps) {
  const finalPrice =
    ad.room.discount > 0
      ? ad.room.price * (1 - ad.room.discount / 100)
      : ad.room.price;

  return (
    <article className="group overflow-hidden rounded-[28px] border border-[#E6EAE3] bg-white shadow-[0_12px_40px_rgba(27,28,28,0.06)] transition-shadow duration-300 hover:shadow-[0_18px_50px_rgba(27,28,28,0.1)]">
      {/* ================= IMAGE ================= */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F3F5F1] sm:aspect-[21/10]">
        {ad.room.images?.[0] ? (
          <Image
            src={ad.room.images[0]}
            alt={`Room ${ad.room.roomNumber}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Sparkles className="h-12 w-12 text-[#9AA198]" />
          </div>
        )}

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/5" />

        {/* Top badges */}
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          {ad.room.discount > 0 && (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-[#B42318] shadow-lg">
              <Tag className="h-3.5 w-3.5" />
              {ad.room.discount}% OFF
            </div>
          )}

          <div
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold shadow-lg backdrop-blur-sm ${
              ad.isActive
                ? "bg-emerald-500/95 text-white"
                : "bg-white/90 text-[#555B55]"
            }`}
          >
            {ad.isActive ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <XCircle className="h-3.5 w-3.5" />
            )}

            {ad.isActive ? "Active" : "Inactive"}
          </div>
        </div>

        {/* Top right room label */}
        <div className="absolute right-5 top-5">
          <div className="rounded-full bg-black/35 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md">
            Ad #{ad._id.slice(-8)}
          </div>
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            {/* Room */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-white/80" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  Featured Room
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Room {ad.room.roomNumber}
              </h1>
            </div>

            {/* Price */}
            <div className="rounded-2xl bg-black/25 px-4 py-3 backdrop-blur-md sm:px-5">
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">
                Starting from
              </p>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  ${finalPrice.toFixed(2)}
                </span>

                <span className="text-sm text-white/60">/ night</span>
              </div>

              {ad.room.discount > 0 && (
                <p className="mt-0.5 text-right text-xs text-white/50 line-through">
                  ${ad.room.price.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="grid grid-cols-1 divide-y divide-[#ECEFEA] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <MetaCard
          icon={Users}
          label="Capacity"
          value={`${ad.room.capacity} guests`}
        />

        <MetaCard
          icon={Tag}
          label="Special offer"
          value={
            ad.room.discount > 0
              ? `${ad.room.discount}% discount`
              : "No discount"
          }
        />

        <MetaCard
          icon={Calendar}
          label="Published"
          value={formatDate(ad.createdAt)}
        />
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="flex flex-col gap-3 border-t border-[#ECEFEA] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-semibold text-[#1B1C1C]">
            Interested in this room?
          </p>

          <p className="mt-0.5 text-xs text-[#8A9189]">
            Explore the room and check its availability.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button className="h-11 rounded-xl bg-[#4E604F] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#3F4F40]">
            <Link
              href={`/rooms/${ad.room._id}`}
              className="flex items-center justify-center gap-2"
            >
              <span>View Room</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </Link>
          </Button>

          <Button
            variant="outline"
            className="h-11 rounded-xl border-[#E2E6DF] bg-white px-5 text-sm font-semibold text-[#303530] hover:border-[#4E604F] hover:bg-[#F7F9F5] hover:text-[#4E604F]"
          >
            <Link
              href="/ads"
              className="flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" />
              <span>Back to Ads</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="flex items-center justify-between gap-4 border-t border-[#ECEFEA] bg-[#FAFBF9] px-5 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4E604F]/10 text-xs font-bold text-[#4E604F]">
            {ad.createdBy?.userName?.charAt(0).toUpperCase() ?? "A"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#303530]">
              {ad.createdBy?.userName ?? "Unknown"}
            </p>

            <p className="text-xs text-[#8A9189]">Advertisement publisher</p>
          </div>
        </div>

        <div className="hidden text-right sm:block">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9AA198]">
            Advertisement
          </p>

          <p className="mt-0.5 font-mono text-[11px] text-[#737A72]">
            #{ad._id.slice(-8)}
          </p>
        </div>
      </footer>
    </article>
  );
}

function MetaCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-4 sm:px-6 sm:py-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F5F1] text-[#4E604F]">
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#929991]">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold text-[#1B1C1C]">
          {value}
        </p>
      </div>
    </div>
  );
}
