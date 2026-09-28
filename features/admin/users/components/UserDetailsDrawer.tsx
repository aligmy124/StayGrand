"use client";

import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Shield,
  UserCheck,
  UserX,
  Calendar,
  Clock3,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { IUser } from "../types/type.user";

interface UserDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUser | undefined;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export function UserDetailsDrawer({
  open,
  onOpenChange,
  user,
}: UserDetailsDrawerProps) {
  return (
    <AnimatePresence>
      {open && user && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="relative border-b border-[#F0F2EE] bg-gradient-to-br from-[#F8F9F7] via-white to-[#F0F3EE] p-6">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] transition-colors hover:bg-[#F4F6F2] hover:text-[#4E604F]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full bg-[#F4F6F2] ring-4 ring-white shadow-lg">
                  {user.profileImage ? (
                    <Image
                      src={user.profileImage}
                      alt={user.userName}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#4E604F]/10 text-2xl font-bold text-[#4E604F]">
                      {user.userName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <h2 className="mt-3 text-xl font-bold text-[#1B1C1C]">
                  {user.userName}
                </h2>

                <p className="mt-1 font-mono text-[11px] text-[#8A9189]">
                  ID #{user._id.slice(-8)}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
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
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 p-6">
              <DetailRow
                icon={Mail}
                label="Email"
                value={user.email}
              />
              <DetailRow
                icon={Phone}
                label="Phone Number"
                value={String(user.phoneNumber)}
              />
              <DetailRow
                icon={MapPin}
                label="Country"
                value={user.country}
              />
              <DetailRow
                icon={Shield}
                label="Role"
                value={user.role}
              />
              <DetailRow
                icon={Calendar}
                label="Joined"
                value={formatDate(user.createdAt)}
              />
              <DetailRow
                icon={Clock3}
                label="Last Updated"
                value={formatDate(user.updatedAt)}
              />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#F0F2EE] bg-[#FAFBF9] p-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#4E604F] shadow-sm ring-1 ring-[#E4E7E2]">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8A9189]">
          {label}
        </p>
        <p className="mt-0.5 break-words text-sm font-medium text-[#1B1C1C]">
          {value}
        </p>
      </div>
    </div>
  );
}