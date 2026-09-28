"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Users,
  Sparkles,
  ChevronRight,
  Calendar,
  ShieldCheck,
  Eye,
  MapPin,
  Clock3,
  Crown,
  Award,
  HeartOff,
  X,
} from "lucide-react";
import { useActionState } from "react";
import { remove_from_favourite } from "../actions/favourite.action";
import { cn } from "@/lib/utils";

interface FavouriteContentProps {
  favourites: any;
}

const initialState = {
  success: false,
  message: "",
};

export default function FavouriteContent({
  favourites,
}: FavouriteContentProps) {
  const [state, action, pending] = useActionState(
    remove_from_favourite,
    initialState,
  );

  const allRooms =
    favourites?.data?.favoriteRooms?.flatMap((entry: any) =>
      entry.rooms.map((room: any) => ({
        room,
        favoriteId: entry._id,
      })),
    ) || [];

  /* -------------------------------- Empty State -------------------------------- */

  if (!allRooms.length) {
    return (
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        {/* Ambient background */}{" "}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
        ```
        <div className="relative mx-auto flex max-w-md flex-col items-center px-6 text-center">
          <div className="relative mb-7">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />

            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-primary/10 bg-card shadow-xl">
              <HeartOff className="h-10 w-10 text-primary/60" />
            </div>
          </div>

          <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Your collection
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nothing saved yet
          </h2>

          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Save rooms you love and they’ll appear here, ready whenever you’re
            planning your next stay.
          </p>

          <Link
            href="/rooms"
            className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
          >
            Explore rooms
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      {/* -------------------------------- Header -------------------------------- */}
      ```
      <header className="flex flex-col gap-5 border-b border-border/60 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Saved for later
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              My Favourites
            </h1>

            <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold text-muted-foreground">
              {allRooms.length} {allRooms.length === 1 ? "room" : "rooms"}
            </span>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Your handpicked rooms in one place.
          </p>
        </div>

        <Link
          href="/rooms"
          className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary"
        >
          Discover more
          <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </header>
      {/* -------------------------------- Message -------------------------------- */}
      {state.message && (
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm",
            state.success
              ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
              : "border-destructive/20 bg-destructive/5 text-destructive",
          )}
        >
          <span
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs",
              state.success ? "bg-emerald-500/10" : "bg-destructive/10",
            )}
          >
            {state.success ? "✓" : "!"}
          </span>

          <span className="font-medium">{state.message}</span>
        </div>
      )}
      {/* -------------------------------- Grid -------------------------------- */}
      <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 xl:grid-cols-3">
        {allRooms.map(({ room, favoriteId }: any, index: number) => {
          const firstImage = room.images?.[0] || "/images/hero2.jpg";

          const hasDiscount = room.discount > 0;

          const discountedPrice = hasDiscount
            ? room.price - (room.price * room.discount) / 100
            : room.price;

          return (
            <article
              key={room._id}
              className={cn(
                "group relative overflow-hidden rounded-[28px] border border-border/70 bg-card",
                "shadow-sm transition-all duration-500",
                "hover:-translate-y-1 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10",
                pending && "pointer-events-none opacity-60",
              )}
            >
              {/* -------------------------------- Image -------------------------------- */}

              <div className="relative aspect-[4/3] overflow-hidden">
                <Link href={`/rooms/${room._id}`} className="absolute inset-0">
                  <Image
                    src={firstImage}
                    alt={`Room ${room.roomNumber}`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/10 opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                  {/* Quick view */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-100">
                      <Eye className="h-4 w-4" />
                      View room
                    </span>
                  </div>
                </Link>

                {/* Premium badge */}
                {index % 3 === 0 && (
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md">
                      <Crown className="h-3.5 w-3.5 text-amber-300" />
                      Premium
                    </span>
                  </div>
                )}

                {/* Remove */}
                <form action={action} className="absolute right-4 top-4 z-10">
                  <input type="hidden" name="roomId" value={favoriteId} />

                  <input type="hidden" name="favoriteId" value={room._id} />

                  <button
                    type="submit"
                    disabled={pending}
                    aria-label="Remove from favourites"
                    className="group/remove relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-red-400/40 hover:bg-red-500/20"
                  >
                    {pending ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <>
                        <Heart className="h-4 w-4 fill-white text-white transition-all duration-200 group-hover/remove:scale-0 group-hover/remove:opacity-0" />

                        <X className="absolute h-4 w-4 scale-0 text-red-300 opacity-0 transition-all duration-200 group-hover/remove:scale-100 group-hover/remove:opacity-100" />
                      </>
                    )}

                    <span className="pointer-events-none absolute right-0 top-[calc(100%+8px)] whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] font-medium text-background opacity-0 shadow-lg transition-opacity duration-200 group-hover/remove:opacity-100">
                      Remove
                    </span>
                  </button>
                </form>

                {/* Discount */}
                {hasDiscount && (
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold text-primary-foreground shadow-lg shadow-primary/20">
                      <Sparkles className="h-3.5 w-3.5" />
                      {room.discount}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* -------------------------------- Content -------------------------------- */}

              <div className="p-5 sm:p-6">
                {/* Title + Price */}

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Link href={`/rooms/${room._id}`}>
                      <h2 className="truncate text-xl font-bold tracking-tight text-foreground transition-colors duration-200 hover:text-primary">
                        Room {room.roomNumber}
                      </h2>
                    </Link>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        {room.capacity} guests
                      </span>

                      <span className="h-1 w-1 rounded-full bg-border" />

                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        Prime location
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="shrink-0 text-right">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-2xl font-bold tracking-tight text-foreground">
                        ${discountedPrice}
                      </span>

                      <span className="text-[10px] font-medium text-muted-foreground">
                        /night
                      </span>
                    </div>

                    {hasDiscount && (
                      <span className="text-xs text-muted-foreground line-through">
                        ${room.price}
                      </span>
                    )}
                  </div>
                </div>

                {/* Divider */}

                <div className="my-5 h-px bg-border/70" />

                {/* Meta */}

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                      Secure
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      Instant
                    </span>

                    {index % 2 === 0 && (
                      <span className="hidden items-center gap-1.5 text-[11px] font-medium text-amber-500 sm:inline-flex">
                        <Award className="h-3.5 w-3.5" />
                        Verified
                      </span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/60">
                    <Clock3 className="h-3 w-3" />
                    {new Date(room.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* CTA */}

                <Link
                  href={`/rooms/${room._id}`}
                  className="group/cta mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-primary/15 bg-primary/5 text-sm font-semibold text-primary transition-all duration-300 hover:border-primary/30 hover:bg-primary hover:text-primary-foreground"
                >
                  View details
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                </Link>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-primary transition-all duration-500 group-hover:w-1/2" />
            </article>
          );
        })}
      </div>
    </section>
  );
}
