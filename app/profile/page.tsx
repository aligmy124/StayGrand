import { getCurrentUser } from "@/features/Auth/user_Info/service/user.service";
import {
  Mail,
  Phone,
  MapPin,
  Shield,
  Calendar,
  CheckCircle,
  XCircle,
  Camera,
  Compass,
  Heart,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "@/features/Auth/logout/components/LogoutButton";

export default async function Profile() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8F5]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-[#4E604F]/10 animate-pulse" />
          <p className="text-sm text-[#8A9189]">Loading profile...</p>
        </div>
      </div>
    );
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getInitials = (name: string) =>
    name.charAt(0).toUpperCase();

  const accountDetails = [
    {
      label: "Email",
      value: user.email,
      icon: Mail,
    },
    {
      label: "Phone Number",
      value: `+${user.phoneNumber}`,
      icon: Phone,
    },
    {
      label: "Country",
      value: user.country,
      icon: MapPin,
    },
    {
      label: "Role",
      value: user.role,
      icon: Shield,
    },
  ];

  return (
    <main className="min-h-screen bg-[#F7F8F5] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Page Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-[#4E604F]">
            Account
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-[#303530] sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-[#8A9189]">
            Manage your personal information and account preferences.
          </p>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-[28px] border border-[#E5E8E2] bg-white shadow-[0_20px_60px_rgba(48,53,48,0.06)]">

          {/* Cover */}
          <div className="relative h-36 overflow-hidden sm:h-48">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4E604F] via-[#586A59] to-[#354336]" />

            {/* Decorative circles */}
            <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-white/5" />
            <div className="absolute -left-16 -bottom-32 h-72 w-72 rounded-full bg-black/5" />

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
                        alt={user.userName}
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
                    className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-[#4E604F] text-white shadow-lg transition hover:scale-105 hover:bg-[#3F4F40]"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-bold tracking-tight text-[#303530]">
                      {user.userName}
                    </h2>

                    {user.verified ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-semibold text-yellow-700">
                        <XCircle className="h-3.5 w-3.5" />
                        Unverified
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-[#8A9189]">
                    {user.role === "admin"
                      ? "Administrator"
                      : "Member"}{" "}
                    · Joined {formatDate(user.createdAt)}
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
            <section>
              <div className="mb-4">
                <h3 className="text-base font-semibold text-[#303530]">
                  Account Details
                </h3>

                <p className="mt-1 text-sm text-[#8A9189]">
                  Your basic account information.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {accountDetails.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="group flex items-center gap-4 rounded-2xl border border-[#E8EAE6] bg-[#FAFBF9] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D5DCD3] hover:bg-white hover:shadow-md"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-[#EEF0EC]">
                        <Icon className="h-5 w-5 text-[#4E604F]" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wide text-[#9AA099]">
                          {item.label}
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold capitalize text-[#303530]">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="mt-8">
              <div className="mb-4">
                <h3 className="text-base font-semibold text-[#303530]">
                  Quick Actions
                </h3>

                <p className="mt-1 text-sm text-[#8A9189]">
                  Quickly access your favorite sections.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">

                {/* Explore */}
                <Link
                  href="/rooms"
                  className="group flex items-center justify-between rounded-2xl border border-[#E5E8E2] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4E604F]/30 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F1F4EF]">
                      <Compass className="h-5 w-5 text-[#4E604F]" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#303530]">
                        Explore Rooms
                      </p>

                      <p className="mt-0.5 text-xs text-[#8A9189]">
                        Discover your next stay
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 text-[#A0A69F] transition-transform group-hover:translate-x-1 group-hover:text-[#4E604F]" />
                </Link>

                {/* Favorites */}
                <Link
                  href="/favorites"
                  className="group flex items-center justify-between rounded-2xl border border-[#E5E8E2] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4E604F]/30 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F1F4EF]">
                      <Heart className="h-5 w-5 text-[#4E604F]" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#303530]">
                        Favorites
                      </p>

                      <p className="mt-0.5 text-xs text-[#8A9189]">
                        View your saved rooms
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 text-[#A0A69F] transition-transform group-hover:translate-x-1 group-hover:text-[#4E604F]" />
                </Link>
              </div>
            </section>

          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#A0A69F]">
          Your account information is private and secure.
        </p>
      </div>
    </main>
  );
}

