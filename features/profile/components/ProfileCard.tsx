import Image from "next/image";
import { CheckCircle, XCircle, Camera } from "lucide-react";
import LogoutButton from "@/features/Auth/logout/components/LogoutButton";
import AccountDetails from "./AccountDetails";
import QuickActions from "./QuickActions";
import { formatDate, getInitials } from "../helpers/format";
import type { IProfileUser } from "../types/type.user";

interface ProfileCardProps {
  user: IProfileUser;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#E5E8E2] bg-white shadow-[0_20px_60px_rgba(48,53,48,0.06)]">
      {/* Cover */}
      <div className="relative h-36 overflow-hidden sm:h-48">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4E604F] via-[#586A59] to-[#354336]" />

        {/* Decorative circles */}
        <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-black/5" />

        <div className="absolute bottom-5 left-6">
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            Personal Account
          </span>
        </div>
      </div>

      {/* Profile Header */}
      <div className="px-5 pb-6 sm:px-8">
        <div className="relative -mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          {/* Avatar + Name */}
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border-[5px] border-white bg-gradient-to-br from-[#4E604F] to-[#354336] text-3xl font-bold text-white shadow-xl sm:h-28 sm:w-28">
                {user.profileImage ? (
                  <Image
                    src={user.profileImage}
                    alt={`${user.userName}'s profile picture`}
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(user.userName)
                )}
              </div>

              <button
                type="button"
                aria-label="Change profile photo"
                className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-[#4E604F] text-white shadow-lg transition hover:scale-105 hover:bg-[#3F4F40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E604F]/30 focus-visible:ring-offset-2"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight text-[#303530]">
                  {user.userName}
                </h2>

                {user.verified ? (
                  <span
                    className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700"
                    aria-label="Account verified"
                  >
                    <CheckCircle
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    Verified
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-semibold text-yellow-700"
                    aria-label="Account not verified"
                  >
                    <XCircle
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    Unverified
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-[#8A9189]">
                {user.role === "admin" ? "Administrator" : "Member"} · Joined{" "}
                {formatDate(user.createdAt)}
              </p>
            </div>
          </div>

          {/* Logout */}
          <div className="sm:pb-1">
            <LogoutButton />
          </div>
        </div>

        {/* Divider */}
        <div className="my-7 h-px bg-[#E7E9E5]" />

        {/* Account Details */}
        <AccountDetails user={user} />

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  );
}