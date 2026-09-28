import Image from "next/image";
import {
  BadgePercent,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  CircleUserRound,
  Hash,
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
          <p className="mb-1 text-sm font-medium text-[#4E604F]">
            Advertisement
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-[#1B1C1C] sm:text-3xl">
            Room {roomNumber}
          </h1>

          <p className="mt-1 max-w-xl text-sm text-[#434842]/65">
            View the advertisement, room details, pricing, and publishing
            information.
          </p>
        </div>

        <div
          role="status"
          aria-label={`Advertisement status: ${
            isActive ? "Active" : "Inactive"
          }`}
          className={`inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold ${
            isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-2 w-2 rounded-full ${
              isActive ? "bg-green-600" : "bg-red-500"
            }`}
          />

          {isActive ? "Active" : "Inactive"}
        </div>
      </header>

      {/* Gallery + Room Summary */}
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* Gallery */}
        <section
          aria-labelledby="room-gallery-heading"
          className="overflow-hidden rounded-2xl border border-[#4E604F]/10 bg-white p-2 shadow-sm"
        >
          <h2 id="room-gallery-heading" className="sr-only">
            Room images
          </h2>

          {images.length > 0 ? (
            <div className="grid min-h-[320px] grid-cols-2 gap-2">
              {/* Main Image */}
              <div className="relative row-span-2 min-h-[320px] overflow-hidden rounded-xl">
                <Image
                  src={images[0]}
                  alt={`Room ${roomNumber} main view`}
                  fill
                  priority
                  sizes="(max-width: 1280px) 66vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Secondary Images */}
              {images.slice(1, 3).map((image, index) => (
                <div
                  key={image}
                  className="relative min-h-[155px] overflow-hidden rounded-xl"
                >
                  <Image
                    src={image}
                    alt={`Room ${roomNumber} view ${index + 2}`}
                    fill
                    sizes="(max-width: 1280px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[320px] items-center justify-center rounded-xl bg-[#4E604F]/5">
              <p className="text-sm text-[#434842]/60">
                No room images available.
              </p>
            </div>
          )}
        </section>

        {/* Room Information */}
        <section
          aria-labelledby="room-information-heading"
          className="rounded-2xl border border-[#4E604F]/10 bg-white p-6 shadow-sm"
        >
          <div className="mb-6 flex items-center gap-3">
            <div
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4E604F]/10 text-[#4E604F]"
            >
              <BedDouble className="h-5 w-5" />
            </div>

            <div>
              <h2
                id="room-information-heading"
                className="font-semibold text-[#1B1C1C]"
              >
                Room Information
              </h2>

              <p className="text-sm text-[#434842]/60">
                Room and pricing details
              </p>
            </div>
          </div>

          <dl className="space-y-0">
            {/* Room Number */}
            <div className="flex items-center justify-between gap-4 border-b border-[#4E604F]/10 py-4 first:pt-0">
              <dt className="flex items-center gap-2 text-sm text-[#434842]/65">
                <Hash aria-hidden="true" className="h-4 w-4 shrink-0" />
                Room Number
              </dt>

              <dd className="font-semibold text-[#1B1C1C]">{roomNumber}</dd>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between gap-4 border-b border-[#4E604F]/10 py-4">
              <dt className="text-sm text-[#434842]/65">Price</dt>

              <dd className="text-lg font-bold text-[#1B1C1C]">${price}</dd>
            </div>

            {/* Capacity */}
            <div className="flex items-center justify-between gap-4 border-b border-[#4E604F]/10 py-4">
              <dt className="flex items-center gap-2 text-sm text-[#434842]/65">
                <Users aria-hidden="true" className="h-4 w-4 shrink-0" />
                Capacity
              </dt>

              <dd className="font-medium text-[#1B1C1C]">
                {capacity} {capacity === 1 ? "Guest" : "Guests"}
              </dd>
            </div>

            {/* Discount */}
            <div className="flex items-center justify-between gap-4 pt-4">
              <dt className="flex items-center gap-2 text-sm text-[#434842]/65">
                <BadgePercent aria-hidden="true" className="h-4 w-4 shrink-0" />
                Discount
              </dt>

              <dd>
                {discount > 0 ? (
                  <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">
                    {discount}% OFF
                  </span>
                ) : (
                  <span className="text-sm text-[#434842]/50">No discount</span>
                )}
              </dd>
            </div>
          </dl>
        </section>
      </div>

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
                  className="rounded-lg bg-[#4E604F]/5 px-3 py-2 text-sm font-medium text-[#434842]"
                >
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
                <CircleUserRound
                  aria-hidden="true"
                  className="h-4 w-4 text-[#4E604F]"
                />

                {createdBy?.userName ?? "Unknown"}
              </dd>
            </div>

            {/* Advertisement Created */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <dt className="flex items-center gap-2 text-sm text-[#434842]/60">
                <CalendarDays
                  aria-hidden="true"
                  className="h-4 w-4 text-[#4E604F]"
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
