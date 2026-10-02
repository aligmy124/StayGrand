import Image from "next/image";
import {
  BadgePercent,
  BedDouble,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleUserRound,
  Hash,
  ImageOff,
  Megaphone,
  Users,
} from "lucide-react";
import React from "react";
import { Ads } from "../types/type.ads";

interface AdsDetailsProps {
  ads: Ads;
}

export default function AdsDetails({ ads }: AdsDetailsProps) {
  const { room, isActive, createdBy } = ads;

  const {
    roomNumber,
    price,
    capacity,
    discount,
    facilities,
    images,
    createdAt,
    updatedAt,
  } = room;

  const createdDate = new Date(createdAt).toLocaleDateString();
  const updatedDate = new Date(updatedAt).toLocaleDateString();

  const roomCreatedDate = new Date(room.createdAt).toLocaleDateString();
  const roomUpdatedDate = new Date(room.updatedAt).toLocaleDateString();

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-4 border-b border-[#4E604F]/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 flex items-center gap-1.5 text-sm font-medium text-[#4E604F]">
            <Megaphone className="h-3.5 w-3.5" aria-hidden="true" />
            Advertisement
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-[#1B1C1C] sm:text-3xl">
            Room {roomNumber}
          </h1>

          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[#434842]/65">
            View the advertisement, room details, pricing, and publishing
            information.
          </p>
        </div>

        <div
          role="status"
          aria-label={`Advertisement status: ${
            isActive ? "Active" : "Inactive"
          }`}
          className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold shadow-sm transition-colors ${
            isActive
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          <span
            aria-hidden="true"
            className={`relative flex h-2 w-2 ${isActive ? "" : ""}`}
          >
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isActive ? "animate-ping bg-green-500" : "bg-red-500"
              }`}
            />
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                isActive ? "bg-green-600" : "bg-red-500"
              }`}
            />
          </span>

          {isActive ? "Active" : "Inactive"}
        </div>
      </header>

      {/* Gallery + Room Summary */}
      {/* Gallery */}
      <section
        aria-labelledby="room-gallery-heading"
        className="overflow-hidden rounded-2xl border border-[#4E604F]/10 bg-white p-2 shadow-sm"
      >
        <h2 id="room-gallery-heading" className="sr-only">
          Room images
        </h2>

        {images.length === 0 ? (
          /* ============ 0 images — Empty state ============ */
          <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-xl bg-[#4E604F]/5 sm:min-h-[320px]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              <ImageOff
                className="h-5 w-5 text-[#4E604F]/50"
                aria-hidden="true"
              />
            </div>
            <p className="text-sm text-[#434842]/60">
              No room images available.
            </p>
          </div>
        ) : images.length === 1 ? (
          /* ============ 1 image — full width ============ */
          <div className="group relative h-[240px] overflow-hidden rounded-xl sm:h-[360px] lg:h-[420px]">
            <Image
              src={images[0]}
              alt={`Room ${roomNumber} main view`}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 60vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ) : images.length === 2 ? (
          /* ============ 2 images — stacked on mobile, side-by-side on sm+ ============ */
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {images.map((image, index) => (
              <div
                key={image}
                className="group relative h-[200px] overflow-hidden rounded-xl sm:h-[360px] lg:h-[420px]"
              >
                <Image
                  src={image}
                  alt={`Room ${roomNumber} view ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        ) : (
          /* ============ 3+ images ============ */
          <>
            {/* ---- Mobile: horizontal scroll snap carousel ---- */}
            <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide sm:hidden">
              {images.map((image, index) => (
                <div
                  key={image}
                  className="group relative h-[240px] w-[85%] shrink-0 snap-center overflow-hidden rounded-xl"
                >
                  <Image
                    src={image}
                    alt={`Room ${roomNumber} view ${index + 1}`}
                    fill
                    priority={index === 0}
                    sizes="85vw"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                  {/* Image counter */}
                  <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {index + 1} / {images.length}
                  </span>
                </div>
              ))}
            </div>

            {/* ---- Tablet & Desktop: hero + stacked grid ---- */}
            <div className="hidden h-[360px] grid-cols-2 grid-rows-2 gap-2 sm:grid lg:h-[420px]">
              {/* Main image — full height on left */}
              <div className="group relative row-span-2 overflow-hidden rounded-xl">
                <Image
                  src={images[0]}
                  alt={`Room ${roomNumber} main view`}
                  fill
                  priority
                  sizes="(max-width: 1280px) 50vw, 40vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Secondary images — right column stacked */}
              {images.slice(1, 3).map((image, index) => (
                <div
                  key={image}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <Image
                    src={image}
                    alt={`Room ${roomNumber} view ${index + 2}`}
                    fill
                    sizes="(max-width: 1280px) 25vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* +N overlay on last visible image */}
                  {index === 1 && images.length > 3 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
                      <span className="text-lg font-bold text-white">
                        +{images.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Additional Information */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Facilities */}
        <section
          aria-labelledby="facilities-heading"
          className="rounded-2xl border border-[#4E604F]/10 bg-white p-6 shadow-sm"
        >
          <div className="mb-5">
            <h2
              id="facilities-heading"
              className="font-semibold text-[#1B1C1C]"
            >
              Facilities
            </h2>

            <p className="mt-1 text-sm text-[#434842]/60">
              Available facilities for this room.
            </p>
          </div>

          {facilities.length > 0 ? (
            <ul className="flex flex-wrap gap-2" aria-label="Room facilities">
              {facilities.map((facility) => (
                <li
                  key={facility._id}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#4E604F]/10 bg-[#4E604F]/5 px-3 py-1.5 text-sm font-medium text-[#434842] transition-colors hover:bg-[#4E604F]/10"
                >
                  <Check
                    className="h-3.5 w-3.5 text-[#4E604F]"
                    aria-hidden="true"
                  />
                  {facility.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[#434842]/50">
              No facilities available.
            </p>
          )}
        </section>

        {/* Advertisement Information */}
        <section
          aria-labelledby="advertisement-information-heading"
          className="rounded-2xl border border-[#4E604F]/10 bg-white p-6 shadow-sm"
        >
          <div className="mb-5">
            <h2
              id="advertisement-information-heading"
              className="font-semibold text-[#1B1C1C]"
            >
              Advertisement Information
            </h2>

            <p className="mt-1 text-sm text-[#434842]/60">
              Publishing and ownership information.
            </p>
          </div>

          <dl className="space-y-4">
            {/* Created By */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <dt className="text-sm text-[#434842]/60">Created By</dt>

              <dd className="flex items-center gap-2 text-sm font-medium text-[#1B1C1C]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4E604F]/10">
                  <CircleUserRound
                    aria-hidden="true"
                    className="h-4 w-4 text-[#4E604F]"
                  />
                </span>

                {createdBy?.userName ?? "Unknown"}
              </dd>
            </div>

            {/* Advertisement Created */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <dt className="flex items-center gap-2 text-sm text-[#434842]/60">
                <CalendarDays
                  aria-hidden="true"
                  className="h-4 w-4 text-[#4E604F]/70"
                />
                Ad Created
              </dt>

              <dd className="text-sm text-[#434842]">{createdDate}</dd>
            </div>

            {/* Advertisement Updated */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <dt className="text-sm text-[#434842]/60">Ad Updated</dt>

              <dd className="text-sm text-[#434842]">{updatedDate}</dd>
            </div>

            {/* Room Created */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <dt className="text-sm text-[#434842]/60">Room Created</dt>

              <dd className="text-sm text-[#434842]">{roomCreatedDate}</dd>
            </div>

            {/* Room Updated */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <dt className="text-sm text-[#434842]/60">Room Updated</dt>

              <dd className="text-sm text-[#434842]">{roomUpdatedDate}</dd>
            </div>

            {/* Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#4E604F]/10 pt-4">
              <dt className="text-sm text-[#434842]/60">
                Advertisement Status
              </dt>

              <dd
                className={`inline-flex items-center gap-1.5 text-sm font-semibold ${
                  isActive ? "text-green-700" : "text-red-700"
                }`}
              >
                {isActive ? (
                  <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-red-500"
                  />
                )}

                {isActive ? "Active" : "Inactive"}
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
