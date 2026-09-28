"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Search,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Shield,
  UserCheck,
  UserX,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import type { IUser } from "../types/type.user";
import { UserDetailsDrawer } from "./UserDetailsDrawer";

interface UsersTableProps {
  users: IUser[];
}

const HEADERS = [
  { label: "User", align: "text-left" },
  { label: "Contact", align: "text-left" },
  { label: "Country", align: "text-left" },
  { label: "Role", align: "text-left" },
  { label: "Status", align: "text-left" },
  { label: "Joined", align: "text-left" },
  { label: "Actions", align: "text-right" },
];

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function UsersTable({ users }: UsersTableProps) {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>(
    undefined
  );
  const [openDrawer, setOpenDrawer] = useState(false);

  const query = search.trim().toLowerCase();
  const filtered = query
    ? users.filter((u) => {
        const matchName = u.userName?.toLowerCase().includes(query);
        const matchEmail = u.email?.toLowerCase().includes(query);
        const matchPhone = u.phoneNumber?.toString().includes(query);
        const matchCountry = u.country?.toLowerCase().includes(query);
        const matchRole = u.role?.toLowerCase().includes(query);
        return (
          matchName || matchEmail || matchPhone || matchCountry || matchRole
        );
      })
    : users;

  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E4E7E2] bg-white py-16">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0F3EE]">
          <Sparkles className="h-6 w-6 text-[#4E604F]" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-[#1B1C1C]">
          No users yet
        </h3>
        <p className="mt-1 text-sm text-[#8A9189]">
          Users will appear here once they register.
        </p>
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
          placeholder="Search by name, email, phone, country, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-full rounded-xl border border-[#E4E7E2] bg-[#F8F9F7] py-2.5 pl-10 pr-4 text-sm text-[#303530] placeholder:text-[#8A9189] transition-all focus:border-[#4E604F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4E604F]/10"
        />
      </div>

      <UserDetailsDrawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        user={selectedUser}
      />

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-[#E4E7E2] bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
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
                filtered.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: Math.min(index * 0.02, 0.2),
                    }}
                    className="group transition-colors hover:bg-[#FAFBF9]"
                  >
                    {/* User */}
                    <td className="px-4 py-4 lg:px-5">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#F4F6F2] ring-1 ring-[#E4E7E2]">
                          {user.profileImage ? (
                            <Image
                              src={user.profileImage}
                              alt={user.userName}
                              fill
                              sizes="56px"
                              loading="lazy"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[#4E604F]/10 text-sm font-bold text-[#4E604F]">
                              {user.userName?.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[#1B1C1C]">
                            {user.userName}
                          </p>
                          <p className="truncate font-mono text-[11px] text-[#8A9189]">
                            #{user._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-4 lg:px-5">
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="flex items-center gap-1.5 text-[#303530]">
                          <Mail className="h-3 w-3 text-[#8A9189]" />
                          <span className="truncate max-w-[180px]">
                            {user.email}
                          </span>
                        </span>
                        <span className="flex items-center gap-1.5 text-[#8A9189]">
                          <Phone className="h-3 w-3" />
                          {user.phoneNumber}
                        </span>
                      </div>
                    </td>

                    {/* Country */}
                    <td className="px-4 py-4 lg:px-5">
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#666B65]">
                        <MapPin className="h-3.5 w-3.5 text-[#8A9189]" />
                        <span className="capitalize">{user.country}</span>
                      </span>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-4 lg:px-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ring-1 ${
                          user.role === "admin"
                            ? "bg-purple-50 text-purple-700 ring-purple-100"
                            : "bg-[#F0F3EE] text-[#4E604F] ring-[#E4E7E2]"
                        }`}
                      >
                        <Shield className="h-3 w-3" />
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 lg:px-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ring-1 ${
                          user.verified
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                            : "bg-amber-50 text-amber-700 ring-amber-100"
                        }`}
                      >
                        {user.verified ? (
                          <UserCheck className="h-3 w-3" />
                        ) : (
                          <UserX className="h-3 w-3" />
                        )}
                        {user.verified ? "Verified" : "Unverified"}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="px-4 py-4 lg:px-5">
                      <span className="text-xs text-[#666B65]">
                        {formatDate(user.createdAt)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 lg:px-5">
                      <div className="flex items-center justify-end gap-0.5">
                        <button
                          type="button"
                          aria-label={`View user ${user.userName}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] transition-colors hover:bg-[#F4F6F2] hover:text-[#4E604F]"
                          onClick={() => {
                            setSelectedUser(user);
                            setOpenDrawer(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
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
                        No users match &ldquo;{search}&rdquo;
                      </h3>
                      <p className="mt-1 text-xs text-[#8A9189]">
                        Try a different name, email, or role.
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
          filtered.map((user, index) => (
            <motion.article
              key={user._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: Math.min(index * 0.02, 0.2),
              }}
              className="rounded-2xl border border-[#E4E7E2] bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#F4F6F2] ring-1 ring-[#E4E7E2]">
                  {user.profileImage ? (
                    <Image
                      src={user.profileImage}
                      alt={user.userName}
                      fill
                      sizes="56px"
                      loading="lazy"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#4E604F]/10 text-sm font-bold text-[#4E604F]">
                      {user.userName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#1B1C1C]">
                        {user.userName}
                      </p>
                      <p className="truncate text-xs text-[#8A9189]">
                        {user.email}
                      </p>
                    </div>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ring-1 ${
                        user.role === "admin"
                          ? "bg-purple-50 text-purple-700 ring-purple-100"
                          : "bg-[#F0F3EE] text-[#4E604F] ring-[#E4E7E2]"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-[#666B65]">
                    <span className="inline-flex items-center gap-1">
                      <Phone className="h-3 w-3 text-[#8A9189]" />
                      {user.phoneNumber}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-[#8A9189]" />
                      {user.country}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                        user.verified
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {user.verified ? "Verified" : "Unverified"}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-[#F4F6F2] pt-2">
                    <span className="text-[10px] text-[#8A9189]">
                      Joined {formatDate(user.createdAt)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedUser(user);
                        setOpenDrawer(true);
                      }}
                      className="flex h-7 items-center gap-1 rounded-lg bg-[#F4F6F2] px-2 text-[11px] font-medium text-[#4E604F] hover:bg-[#F0F3EE]"
                    >
                      <Eye className="h-3 w-3" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E4E7E2] bg-white py-12">
            <Search className="h-6 w-6 text-[#8A9189]" />
            <h3 className="mt-3 text-sm font-semibold text-[#1B1C1C]">
              No users match &ldquo;{search}&rdquo;
            </h3>
            <p className="mt-1 text-xs text-[#8A9189]">
              Try a different name, email, or role.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}