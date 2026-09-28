"use client";

import type { IRoom } from "../types/type.room";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  Users,
  Image as ImageIcon,
  Sparkles,
  Plus,
  Search,
  Edit,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DeleteDialog } from "./Dialog/DeleteDialog";
import { UpdateDialog } from "./Dialog/UpdateDialog";

interface IRoomProps {
  rooms: IRoom[];
}

const HEADERS = [
  { label: "Room", align: "text-left" },
  { label: "Capacity", align: "text-left" },
  { label: "Price", align: "text-left" },
  { label: "Facilities", align: "text-left" },
  { label: "Created By", align: "text-left" },
  { label: "Actions", align: "text-right" },
];

export default function RoomsTable({ rooms }: IRoomProps) {
  const [searchRoom, setSearchRoom] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [openDeleteRoomModel, setOpenDeleteRoomModel] =
    useState<boolean>(false);
  const [openUpdateRoomModel, setOpenUpdateRoomModel] =
    useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<IRoom | undefined>(
    undefined,
  );

  /* ============ Filter ============ */
  const query = searchRoom.trim().toLowerCase();
  const filteredRooms = query
    ? rooms.filter((room) => {
        const matchRoom = room.roomNumber?.toLowerCase().includes(query);
        const matchUser = room.createdBy?.userName
          ?.toLowerCase()
          .includes(query);
        const matchFacility = room.facilities?.some((f) =>
          f.name?.toLowerCase().includes(query),
        );
        return matchRoom || matchUser || matchFacility;
      })
    : rooms;

  /* ============ Empty State ============ */
  if (!rooms || rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E4E7E2] bg-white py-16">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0F3EE]">
          <Sparkles className="h-6 w-6 text-[#4E604F]" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-[#1B1C1C]">
          No rooms yet
        </h3>
        <p className="mt-1 text-sm text-[#8A9189]">
          Get started by adding your first room.
        </p>
        <Link
          href="/dashboard/rooms/create"
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-[#4E604F] px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#3F4F40] hover:shadow-lg"
        >
          <Plus className="h-4 w-4" />
          Add Room
        </Link>
      </div>
    );
  }

  const hasResults = filteredRooms.length > 0;

  return (
    <div className="space-y-4">
      {/* ============ Search ============ */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A9189]" />
        <input
          type="text"
          placeholder="Search by room number, user, or facility..."
          value={searchRoom}
          onChange={(e) => setSearchRoom(e.target.value)}
          className="h-10 w-full rounded-xl border border-[#E4E7E2] bg-[#F8F9F7] py-2.5 pl-10 pr-4 text-sm text-[#303530] placeholder:text-[#8A9189] transition-all focus:border-[#4E604F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4E604F]/10"
        />
      </div>

      <DeleteDialog
        open={openDeleteRoomModel}
        onOpenChange={setOpenDeleteRoomModel}
        roomId={selectedRoom?._id!}
      />
      <UpdateDialog
        open={openUpdateRoomModel}
        onOpenChange={setOpenUpdateRoomModel}
        room={selectedRoom}
        rooms={rooms}
      />

      {/* ============ Desktop Table ============ */}
      <div className="hidden overflow-hidden rounded-2xl border border-[#E4E7E2] bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-[#E4E7E2] bg-[#FAFBF9]">
                {HEADERS.map((col) => (
                  <th
                    key={col.label}
                    className={`px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-[#8A9189] lg:px-5 ${col.align}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F6F2]">
              {hasResults ? (
                filteredRooms.map((room, index) => {
                  const finalPrice =
                    room.discount > 0
                      ? (room.price * (1 - room.discount / 100)).toFixed(2)
                      : null;

                  return (
                    <motion.tr
                      key={room._id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: Math.min(index * 0.02, 0.2),
                      }}
                      className="group transition-colors hover:bg-[#FAFBF9]"
                    >
                      {/* Room */}
                      <td className="px-4 py-4 lg:px-5">
                        <div className="flex items-center gap-3">
                          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-[#F4F6F2] ring-1 ring-[#E4E7E2]">
                            {room.images?.[0] ? (
                              <Image
                                src={room.images[0]}
                                alt={`Room ${room.roomNumber}`}
                                fill
                                sizes="56px"
                                loading="lazy"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <ImageIcon className="h-4 w-4 text-[#8A9189]" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#1B1C1C]">
                              Room {room.roomNumber}
                            </p>
                            <p className="truncate font-mono text-[11px] text-[#8A9189]">
                              #{room._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Capacity */}
                      <td className="px-4 py-4 lg:px-5">
                        <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#F4F6F2] px-2.5 py-1">
                          <Users className="h-3.5 w-3.5 text-[#4E604F]" />
                          <span className="text-xs font-semibold text-[#303530]">
                            {room.capacity}
                          </span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-4 lg:px-5">
                        <div className="flex flex-col leading-tight">
                          <span className="text-sm font-bold text-[#4E604F]">
                            ${finalPrice ?? room.price}
                          </span>
                          {finalPrice && (
                            <span className="text-[10px] text-[#8A9189] line-through">
                              ${room.price}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Facilities */}
                      <td className="px-4 py-4 lg:px-5">
                        <div className="flex flex-wrap gap-1">
                          {room.facilities?.slice(0, 2).map((f) => (
                            <span
                              key={f._id}
                              className="inline-flex items-center rounded-md bg-[#F0F3EE] px-2 py-0.5 text-[10px] font-medium text-[#4E604F]"
                            >
                              {f.name}
                            </span>
                          ))}
                          {room.facilities?.length > 2 && (
                            <span className="inline-flex items-center rounded-md bg-[#F4F6F2] px-2 py-0.5 text-[10px] font-medium text-[#8A9189]">
                              +{room.facilities.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Created By */}
                      <td className="px-4 py-4 lg:px-5">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4E604F]/10 text-[10px] font-semibold text-[#4E604F]">
                            {room.createdBy?.userName?.charAt(0).toUpperCase()}
                          </div>
                          <span className="truncate text-xs text-[#666B65]">
                            {room.createdBy?.userName}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 lg:px-5">
                        <div className="flex items-center justify-end gap-0.5">
                          <Link
                            href={`/dashboard/rooms/${room._id}`}
                            aria-label={`View room ${room.roomNumber}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] transition-colors hover:bg-[#F4F6F2] hover:text-[#4E604F]"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button
                            type="button"
                            aria-label={`Update room ${room.roomNumber}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] transition-colors hover:bg-red-50 hover:text-red-600"
                            onClick={() => {
                              setOpenUpdateRoomModel(true);
                              setSelectedRoom(room);
                            }}
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete room ${room.roomNumber}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] transition-colors hover:bg-red-50 hover:text-red-600"
                            onClick={() => {
                              setSelectedRoom(room);
                              setOpenDeleteRoomModel(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={HEADERS.length} className="px-4 py-10">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-6 w-6 text-[#8A9189]" />
                      <h3 className="mt-3 text-sm font-semibold text-[#1B1C1C]">
                        No rooms match &ldquo;{searchRoom}&rdquo;
                      </h3>
                      <p className="mt-1 text-xs text-[#8A9189]">
                        Try a different room number, type, or facility.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============ Mobile Cards ============ */}
      <div className="space-y-3 md:hidden">
        {hasResults ? (
          filteredRooms.map((room, index) => (
            <motion.article
              key={room._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: Math.min(index * 0.02, 0.2),
              }}
              className="group rounded-2xl border border-[#E4E7E2] bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                {/* Thumbnail */}
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#F4F6F2] ring-1 ring-[#E4E7E2]">
                  {room.images?.[0] ? (
                    <Image
                      src={room.images[0]}
                      alt={`Room ${room.roomNumber}`}
                      fill
                      sizes="56px"
                      loading="lazy"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ImageIcon className="h-5 w-5 text-[#8A9189]" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#1B1C1C]">
                        Room {room.roomNumber}
                      </p>
                      <p className="truncate text-xs text-[#8A9189]">
                        {room.facilities?.length || 0} facilities
                      </p>
                    </div>

                    {/* Menu */}
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        aria-label={`More options for room ${room.roomNumber}`}
                        aria-expanded={openMenuId === room._id}
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === room._id ? null : room._id,
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] transition-colors hover:bg-[#F4F6F2]"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>

                      <AnimatePresence>
                        {openMenuId === room._id && (
                          <motion.div
                            initial={{ opacity: 0, y: -5, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -5, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-xl border border-[#E4E7E2] bg-white shadow-lg"
                          >
                            <Link
                              href={`/rooms/${room._id}`}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-[#4E604F] hover:bg-[#F4F6F2]"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              View
                            </Link>
                            <Link
                              href={`/admin/dashboard/rooms/${room._id}/edit`}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-[#4E604F] hover:bg-[#F4F6F2]"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                              Edit
                            </Link>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#F4F6F2] px-2.5 py-1">
                      <Users className="h-3.5 w-3.5 text-[#4E604F]" />
                      <span className="text-xs font-semibold text-[#303530]">
                        {room.capacity}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-[#4E604F]">
                      ${room.price}
                    </span>
                    {room.discount > 0 && (
                      <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                        -{room.discount}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E4E7E2] bg-white py-12">
            <Search className="h-6 w-6 text-[#8A9189]" />
            <h3 className="mt-3 text-sm font-semibold text-[#1B1C1C]">
              No rooms match &ldquo;{searchRoom}&rdquo;
            </h3>
            <p className="mt-1 text-xs text-[#8A9189]">
              Try a different room number, type, or facility.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
