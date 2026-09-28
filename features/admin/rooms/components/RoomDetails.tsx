"use client"
import Image from "next/image";
import {
  Users,
  DollarSign,
  Tag,
  Sparkles,
  Calendar,
  Clock3,
} from "lucide-react";
import { IRoom } from "../types/type.room";

interface IRoomAdminDetailsProps {
  room: IRoom;
}

export default function RoomAdminDetails({
  room,
}: IRoomAdminDetailsProps) {

    
  const finalPrice =
    room.discount > 0
      ? room.price * (1 - room.discount / 100)
      : room.price;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <article className="overflow-hidden rounded-3xl border border-[#E4E7E2] bg-white shadow-[0_8px_30px_rgba(27,28,28,0.05)]">

      {/* ================= IMAGE ================= */}
      <div className="relative aspect-[16/8] min-h-[280px] w-full overflow-hidden bg-[#F4F6F2] sm:aspect-[21/8]">
        {room.images?.[0] ? (
          <Image
            src={room.images[0]}
            alt={`Room ${room.roomNumber}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Sparkles className="h-12 w-12 text-[#8A9189]" />
          </div>
        )}

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* Discount */}
        {room.discount > 0 && (
          <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-red-600 shadow-lg">
            <Tag className="h-3.5 w-3.5" />
            {room.discount}% OFF
          </div>
        )}

        {/* Image content */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            {/* Room identity */}
            <div className="min-w-0">
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-white/65">
                Room
              </p>

              <h1 className="truncate text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {room.roomNumber}
              </h1>

              <p className="mt-1 font-mono text-[11px] text-white/50">
                ID #{room._id.slice(-8)}
              </p>
            </div>

            {/* Price */}
            <div className="shrink-0">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white sm:text-4xl">
                  ${finalPrice.toFixed(2)}
                </span>

                <span className="text-sm text-white/60">
                  / night
                </span>
              </div>

              {room.discount > 0 && (
                <p className="mt-0.5 text-right text-xs text-white/55 line-through">
                  ${room.price.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= META ================= */}
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3 sm:p-5">
        <MetaCard
          icon={Users}
          label="Capacity"
          value={`${room.capacity} guests`}
        />

        <MetaCard
          icon={DollarSign}
          label="Base Price"
          value={`$${room.price.toFixed(2)} / night`}
        />

        <MetaCard
          icon={Calendar}
          label="Created"
          value={formatDate(room.createdAt)}
        />
      </div>

      {/* ================= FACILITIES ================= */}
      <div className="border-t border-[#F0F2EE] px-5 py-5 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0F3EE]">
              <Sparkles className="h-4 w-4 text-[#4E604F]" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#1B1C1C]">
                Facilities
              </h2>

              <p className="text-xs text-[#8A9189]">
                Available amenities
              </p>
            </div>
          </div>

          <span className="rounded-full bg-[#F4F6F2] px-2.5 py-1 text-xs font-semibold text-[#4E604F]">
            {room.facilities?.length ?? 0}
          </span>
        </div>

        {room.facilities?.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {room.facilities.map((facility) => (
              <li
                key={facility._id}
                className="
                  inline-flex items-center gap-1.5
                  rounded-lg border border-[#E4E7E2]
                  bg-white px-3 py-1.5
                  text-xs font-medium text-[#4E604F]
                  shadow-sm
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#7B8C78]" />
                {facility.name}
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-dashed border-[#E4E7E2] bg-[#FAFBF9] px-4 py-5 text-center">
            <p className="text-sm text-[#8A9189]">
              No facilities added to this room.
            </p>
          </div>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="flex flex-col gap-3 border-t border-[#F0F2EE] bg-[#FAFBF9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

        {/* Creator */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4E604F]/10 text-xs font-bold text-[#4E604F]">
            {room.createdBy?.userName?.charAt(0).toUpperCase() ?? "A"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#303530]">
              {room.createdBy?.userName ?? "Unknown"}
            </p>

            <p className="text-xs text-[#8A9189]">
              Created by administrator
            </p>
          </div>
        </div>

        {/* Updated */}
        <div className="flex items-center gap-1.5 text-xs text-[#8A9189]">
          <Clock3 className="h-3.5 w-3.5" />
          <span>Updated {formatDate(room.updatedAt)}</span>
        </div>
      </footer>
    </article>
  );
}

/* =========================================================
   Meta Card
========================================================= */

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
    <div
      className="
        group flex items-center gap-3
        rounded-2xl border border-[#E8EBE6]
        bg-[#FAFBF9] p-3.5
        transition-colors duration-200
        hover:border-[#DDE3DA]
        hover:bg-[#F7F9F6]
      "
    >
      <div
        className="
          flex h-10 w-10 shrink-0 items-center justify-center
          rounded-xl bg-white
          text-[#4E604F]
          shadow-sm ring-1 ring-[#E4E7E2]
        "
      >
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8A9189]">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-semibold text-[#1B1C1C]">
          {value}
        </p>
      </div>
    </div>
  );
}

