"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Eye, Edit3, Trash2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { IFacility } from "../types/type.facility";
import { UpdateDialog } from "./Dialog/UpdateDialog";
import { DeleteDialog } from "./Dialog/DeleteDialog";

interface FacilitiesTableProps {
  facilities: IFacility[];
}

const HEADERS = [
  { label: "Facility", align: "text-left" },
  { label: "Created By", align: "text-left" },
  { label: "Created At", align: "text-left" },
  { label: "Updated At", align: "text-left" },
  { label: "Actions", align: "text-right" },
];

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function FacilitiesTable({ facilities }: FacilitiesTableProps) {
  const [search, setSearch] = useState("");
  const [openUpdateModel, setOpenUpdateModel] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<
    IFacility | undefined
  >(undefined);

  const query = search.trim().toLowerCase();
  const filtered = query
    ? facilities.filter((f) => {
        const matchName = f.name?.toLowerCase().includes(query);
        const matchUser = f.createdBy?.userName?.toLowerCase().includes(query);
        return matchName || matchUser;
      })
    : facilities;

  if (!facilities || facilities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E4E7E2] bg-white py-16">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0F3EE]">
          <Sparkles className="h-6 w-6 text-[#4E604F]" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-[#1B1C1C]">
          No facilities yet
        </h3>
        <p className="mt-1 text-sm text-[#8A9189]">
          Get started by adding your first facility.
        </p>
        <Link
          href="/dashboard/facilities/create"
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-[#4E604F] px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#3F4F40] hover:shadow-lg"
        >
          <Sparkles className="h-4 w-4" />
          Create Facility
        </Link>
      </div>
    );
  }

  const hasResults = filtered.length > 0;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A9189]" />
        <input
          type="text"
          placeholder="Search by facility name or creator..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-full rounded-xl border border-[#E4E7E2] bg-[#F8F9F7] py-2.5 pl-10 pr-4 text-sm text-[#303530] placeholder:text-[#8A9189] transition-all focus:border-[#4E604F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4E604F]/10"
        />
      </div>

      <UpdateDialog
        open={openUpdateModel}
        onOpenChange={setOpenUpdateModel}
        facility={selectedFacility}
      />
      <DeleteDialog
        open={openDeleteModel}
        onOpenChange={setOpenDeleteModel}
        facilityId={selectedFacility?._id!}
      />

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-[#E4E7E2] bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
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
                filtered.map((facility, index) => (
                  <motion.tr
                    key={facility._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: Math.min(index * 0.02, 0.2),
                    }}
                    className="group transition-colors hover:bg-[#FAFBF9]"
                  >
                    {/* Facility */}
                    <td className="px-4 py-4 lg:px-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0F3EE] ring-1 ring-[#E4E7E2]">
                          <Sparkles className="h-5 w-5 text-[#4E604F]" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[#1B1C1C]">
                            {facility.name}
                          </p>
                          <p className="truncate font-mono text-[11px] text-[#8A9189]">
                            #{facility._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Created By */}
                    <td className="px-4 py-4 lg:px-5">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4E604F]/10 text-[10px] font-semibold text-[#4E604F]">
                          {facility.createdBy?.userName
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>
                        <span className="truncate text-xs text-[#666B65]">
                          {facility.createdBy?.userName}
                        </span>
                      </div>
                    </td>

                    {/* Created At */}
                    <td className="px-4 py-4 lg:px-5">
                      <span className="text-xs text-[#666B65]">
                        {formatDate(facility.createdAt)}
                      </span>
                    </td>

                    {/* Updated At */}
                    <td className="px-4 py-4 lg:px-5">
                      <span className="text-xs text-[#666B65]">
                        {formatDate(facility.updatedAt)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 lg:px-5">
                      <div className="flex items-center justify-end gap-0.5">
                        <Link
                          href={`/dashboard/facilities/${facility._id}`}
                          aria-label={`View facility ${facility.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] transition-colors hover:bg-[#F4F6F2] hover:text-[#4E604F]"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          aria-label={`Update facility ${facility.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] transition-colors hover:bg-[#F4F6F2] hover:text-[#4E604F]"
                          onClick={() => {
                            setSelectedFacility(facility);
                            setOpenUpdateModel(true);
                          }}
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Delete facility ${facility.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] transition-colors hover:bg-red-50 hover:text-red-600"
                          onClick={() => {
                            setSelectedFacility(facility);
                            setOpenDeleteModel(true);
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
                        No facilities match &ldquo;{search}&rdquo;
                      </h3>
                      <p className="mt-1 text-xs text-[#8A9189]">
                        Try a different name or creator.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {hasResults ? (
          filtered.map((facility, index) => (
            <motion.article
              key={facility._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: Math.min(index * 0.02, 0.2),
              }}
              className="rounded-2xl border border-[#E4E7E2] bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F3EE] ring-1 ring-[#E4E7E2]">
                  <Sparkles className="h-5 w-5 text-[#4E604F]" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#1B1C1C]">
                    {facility.name}
                  </p>
                  <p className="truncate text-xs text-[#8A9189]">
                    by {facility.createdBy?.userName}
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-[#F4F6F2] pt-2">
                    <span className="text-[10px] text-[#8A9189]">
                      {formatDate(facility.createdAt)}
                    </span>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/dashboard/facilities/${facility._id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] hover:bg-[#F4F6F2] hover:text-[#4E604F]"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFacility(facility);
                          setOpenUpdateModel(true);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] hover:bg-[#F4F6F2] hover:text-[#4E604F]"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFacility(facility);
                          setOpenDeleteModel(true);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E4E7E2] bg-white py-12">
            <Search className="h-6 w-6 text-[#8A9189]" />
            <h3 className="mt-3 text-sm font-semibold text-[#1B1C1C]">
              No facilities match &ldquo;{search}&rdquo;
            </h3>
            <p className="mt-1 text-xs text-[#8A9189]">
              Try a different name or creator.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}