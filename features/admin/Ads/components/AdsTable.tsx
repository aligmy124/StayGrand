"use client";

import { useState } from "react";
import { Ads } from "../types/type.ads";
import {
  Edit3,
  Eye,
  Search,
  Trash2,
  MoreVertical,
  Megaphone,
  Plus,
  Users,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { DeleteDialogAds } from "./Dialog/DeleteDialog";
import { UpdateDialogAds } from "./Dialog/UpdateDialog";

interface AdsTableProps {
  ads: Ads[];
}

const HEADERS = [
  { label: "Room", align: "text-left" },
  { label: "Price", align: "text-left" },
  { label: "Capacity", align: "text-left" },
  { label: "Discount", align: "text-left" },
  { label: "Status", align: "text-left" },
  { label: "Created By", align: "text-left" },
  { label: "Actions", align: "text-right" },
];

export default function AdsTable({ ads }: AdsTableProps) {
  const [adsSearch, setAdsSearch] = useState("");
  const [selectedAds, setSelectedAds] = useState<Ads | undefined>(undefined);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  /* ============ Filter ============ */
  const query = adsSearch.trim().toLowerCase();
  const filterAds = query
    ? ads.filter((ad) => {
        return (
          ad.room.roomNumber?.toLowerCase().includes(query) ||
          ad.room.price?.toString().includes(query) ||
          ad.room.capacity?.toString().includes(query) ||
          ad.isActive.toString().includes(query) ||
          ad.createdBy?.userName?.toLowerCase().includes(query)
        );
      })
    : ads;

  /* ============ Empty State ============ */
  if (!ads || ads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E4E7E2] bg-white py-16">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0F3EE]">
          <Megaphone className="h-6 w-6 text-[#4E604F]" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-[#1B1C1C]">
          No ads yet
        </h3>
        <p className="mt-1 text-sm text-[#8A9189]">
          Get started by creating your first ad.
        </p>
        <Link
          href="/dashboard/ads/create"
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-[#4E604F] px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#3F4F40] hover:shadow-lg"
        >
          <Plus className="h-4 w-4" />
          Create Ad
        </Link>
      </div>
    );
  }

  const hasResults = filterAds.length > 0;

  return (
    <div className="space-y-4">
      {/* ============ Search ============ */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A9189]" />
        <input
          type="text"
          value={adsSearch}
          onChange={(e) => setAdsSearch(e.target.value)}
          placeholder="Search by room number, user, or facility..."
          className="h-10 w-full rounded-xl border border-[#E4E7E2] bg-[#F8F9F7] py-2.5 pl-10 pr-4 text-sm text-[#303530] placeholder:text-[#8A9189] transition-all focus:border-[#4E604F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4E604F]/10"
        />
      </div>

      <DeleteDialogAds
        isOpen={isOpenDelete}
        onOpenChange={setIsOpenDelete}
        adsId={selectedAds?._id}
      />
      <UpdateDialogAds
        isOpen={isOpenUpdate}
        onOpenChange={setIsOpenUpdate}
        ads={selectedAds}
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
                filterAds.map((ad, index) => (
                  <motion.tr
                    key={ad._id}
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
                          {ad.room.images?.[0] ? (
                            <Image
                              src={ad.room.images[0]}
                              alt={`Room ${ad.room.roomNumber}`}
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
                            Room {ad.room.roomNumber}
                          </p>
                          <p className="truncate font-mono text-[11px] text-[#8A9189]">
                            #{ad.room._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4 lg:px-5">
                      <span className="text-sm font-bold text-[#4E604F]">
                        ${ad.room.price}
                      </span>
                    </td>

                    {/* Capacity */}
                    <td className="px-4 py-4 lg:px-5">
                      <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#F4F6F2] px-2.5 py-1">
                        <Users className="h-3.5 w-3.5 text-[#4E604F]" />
                        <span className="text-xs font-semibold text-[#303530]">
                          {ad.room.capacity}
                        </span>
                      </div>
                    </td>

                    {/* Discount */}
                    <td className="px-4 py-4 lg:px-5">
                      {ad.room.discount > 0 ? (
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                          -{ad.room.discount}%
                        </span>
                      ) : (
                        <span className="text-sm text-[#8A9189]">—</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 lg:px-5">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          ad.isActive
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        <span
                          className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                            ad.isActive ? "bg-green-600" : "bg-red-500"
                          }`}
                        />
                        {ad.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Created By */}
                    <td className="px-4 py-4 lg:px-5">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4E604F]/10 text-[10px] font-semibold text-[#4E604F]">
                          {ad.createdBy?.userName?.charAt(0).toUpperCase() ??
                            "?"}
                        </div>
                        <span className="truncate text-xs text-[#666B65]">
                          {ad.createdBy?.userName ?? "Unknown"}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 lg:px-5">
                      <div className="flex items-center justify-end gap-0.5">
                        <Link
                          href={`/dashboard/ads/${ad._id}`}
                          aria-label={`View room ${ad.room.roomNumber}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] transition-colors hover:bg-[#F4F6F2] hover:text-[#4E604F]"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          aria-label={`Update room ${ad.room.roomNumber}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] transition-colors hover:bg-[#F4F6F2] hover:text-[#4E604F]"
                          onClick={() => {
                            setSelectedAds(ad);
                            setIsOpenUpdate(true);
                          }}
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Delete room ${ad.room.roomNumber}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] transition-colors hover:bg-red-50 hover:text-red-600"
                          onClick={() => {
                            setSelectedAds(ad);
                            setIsOpenDelete(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={HEADERS.length} className="px-4 py-10">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-6 w-6 text-[#8A9189]" />
                      <h3 className="mt-3 text-sm font-semibold text-[#1B1C1C]">
                        No ads match &ldquo;{adsSearch}&rdquo;
                      </h3>
                      <p className="mt-1 text-xs text-[#8A9189]">
                        Try a different room number, user, or status.
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
          filterAds.map((ad, index) => (
            <motion.article
              key={ad._id}
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
                  {ad.room.images?.[0] ? (
                    <Image
                      src={ad.room.images[0]}
                      alt={`Room ${ad.room.roomNumber}`}
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
                        Room {ad.room.roomNumber}
                      </p>
                      <p className="truncate text-xs text-[#8A9189]">
                        {ad.createdBy?.userName ?? "Unknown"}
                      </p>
                    </div>

                    {/* Status pill */}
                    <span
                      className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        ad.isActive
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      <span
                        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                          ad.isActive ? "bg-green-600" : "bg-red-500"
                        }`}
                      />
                      {ad.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#F4F6F2] px-2.5 py-1">
                      <Users className="h-3.5 w-3.5 text-[#4E604F]" />
                      <span className="text-xs font-semibold text-[#303530]">
                        {ad.room.capacity}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-[#4E604F]">
                      ${ad.room.price}
                    </span>
                    {ad.room.discount > 0 && (
                      <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                        -{ad.room.discount}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* ---- Actions row ---- */}
              <div className="mt-4 flex items-center justify-end border-t border-[#F4F6F2] pt-3">
                <div className="relative">
                  <button
                    type="button"
                    aria-label={`More options for room ${ad.room.roomNumber}`}
                    aria-haspopup="menu"
                    aria-expanded={openMenuId === ad._id}
                    onClick={() =>
                      setOpenMenuId(openMenuId === ad._id ? null : ad._id)
                    }
                    className="flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-medium text-[#666B65] transition-colors hover:bg-[#F4F6F2] hover:text-[#4E604F]"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>

                  <AnimatePresence>
                    {openMenuId === ad._id && (
                      <>
                        {/* Backdrop لإغلاق المنيو عند الضغط بره */}
                        <div
                          className="fixed inset-0 z-20"
                          onClick={() => setOpenMenuId(null)}
                          aria-hidden="true"
                        />

                        <motion.div
                          role="menu"
                          initial={{ opacity: 0, y: -5, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -5, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 bottom-full z-30 mb-2 w-40 overflow-hidden rounded-xl border border-[#E4E7E2] bg-white shadow-lg"
                        >
                          <Link
                            href={`/dashboard/ads/${ad._id}`}
                            role="menuitem"
                            onClick={() => setOpenMenuId(null)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-[#4E604F] transition-colors hover:bg-[#F4F6F2]"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            View
                          </Link>

                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              setSelectedAds(ad);
                              setIsOpenUpdate(true);
                              setOpenMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[#4E604F] transition-colors hover:bg-[#F4F6F2]"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            Edit
                          </button>

                          <div className="border-t border-[#F4F6F2]" />

                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              setSelectedAds(ad);
                              setIsOpenDelete(true);
                              setOpenMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.article>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E4E7E2] bg-white py-12">
            <Search className="h-6 w-6 text-[#8A9189]" />
            <h3 className="mt-3 text-sm font-semibold text-[#1B1C1C]">
              No ads match &ldquo;{adsSearch}&rdquo;
            </h3>
            <p className="mt-1 text-xs text-[#8A9189]">
              Try a different room number, user, or status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}