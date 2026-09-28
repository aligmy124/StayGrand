import {
  Shield,
  Clock,
  Award,
  ThumbsUp,
  Users,
  Star,
  TrendingUp,
  MapPin,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Room } from "../types/types";
import RoomInfo from "./RoomInfo";
import RoomGallery from "./RoomGallery";
import RoomAmenities from "./RoomAmenities";
import { BookingCard } from "./Booking/BookingCard";
import ShareButton from "./ShareButton";
import { getFavoriteRooms } from "@/features/favorite/service/favourite.service";
import Reviews from "./reviews/Reviews";
import { getToken } from "@/lib/cookies/cookies";

interface RoomDetailsProps {
  room: Room;
}

export default async function RoomDetails({ room }: RoomDetailsProps) {
  const token = await getToken();

  let isFavourite = false;
  let favoriteId: string | null = null;

  if (token) {
    const favoriteData = await getFavoriteRooms();

    const favorite = favoriteData.data.favoriteRooms.find((favorite) =>
      favorite.rooms.some((favoriteRoom) => favoriteRoom._id === room._id),
    );

    if (favorite) {
      isFavourite = true;
      favoriteId = favorite._id;
    }
  }

  const features = [
    {
      icon: Shield,
      label: "Secure",
      description: "Protected booking",
    },
    {
      icon: Clock,
      label: "24/7 Support",
      description: "Always available",
    },
    {
      icon: Award,
      label: "Best Price",
      description: "Price guaranteed",
    },
  ];

  const stats = [
    {
      icon: Users,
      label: "Capacity",
      value: `${room.capacity} Guests`,
    },
    {
      icon: Star,
      label: "Guest Rating",
      value: "4.8 / 5",
    },
    {
      icon: TrendingUp,
      label: "Popularity",
      value: "Top Choice",
    },
    {
      icon: ThumbsUp,
      label: "Reviews",
      value: "124 Reviews",
    },
  ];

  const highlights = [
    "Free Wi-Fi",
    "Breakfast Included",
    "Flexible Check-in",
    "24/7 Security",
  ];

  return (
    <main className="min-h-screen bg-[#f5f6f3]">
      {/* =========================================================
          HERO / MAIN SECTION
      ========================================================= */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#4E604F]/[0.06] blur-3xl" />

        <div className="relative mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Room Header */}
          <div className="mb-6 lg:mb-8">
            <RoomInfo room={room} />
          </div>

          {/* =====================================================
              GALLERY + BOOKING
          ===================================================== */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(340px,0.9fr)] lg:gap-8">
            {/* Gallery */}
            <div className="min-w-0">
              <div className="overflow-hidden rounded-[28px] border border-[#4E604F]/10 bg-white p-1.5 shadow-[0_20px_60px_-25px_rgba(27,28,28,0.25)]">
                <RoomGallery
                  room={room}
                  isFavourite={isFavourite}
                  favoriteId={favoriteId}
                  isAuthenticated={!!token}
                />
              </div>
            </div>

            {/* Booking */}
            <aside className="min-w-0">
              <div className="sticky top-24 space-y-4">
                {/* Booking Card */}
                <div className="rounded-[28px] border border-[#4E604F]/10 bg-white p-2 shadow-[0_20px_60px_-25px_rgba(27,28,28,0.28)]">
                  <BookingCard room={room} isAuthenticated={!!token} />
                </div>

                {/* Trust Features */}
                <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-[#4E604F]/10 bg-white shadow-sm">
                  {features.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className={`group px-2 py-4 text-center transition-colors hover:bg-[#4E604F]/[0.035] ${
                          index !== features.length - 1
                            ? "border-r border-[#4E604F]/10"
                            : ""
                        }`}
                      >
                        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[#4E604F]/[0.08] transition-transform duration-300 group-hover:scale-110">
                          <Icon className="h-4 w-4 text-[#4E604F]" />
                        </div>

                        <p className="mt-2 text-[11px] font-semibold text-[#252925]">
                          {item.label}
                        </p>

                        <p className="mt-0.5 text-[9px] text-[#434842]/45">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Share */}
                <div className="rounded-2xl border border-[#4E604F]/10 bg-white p-3 shadow-sm">
                  <ShareButton room={room} />
                </div>
              </div>
            </aside>
          </div>

          {/* =====================================================
              CONTENT
          ===================================================== */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-10 lg:grid-cols-[minmax(0,2fr)_minmax(300px,0.9fr)] lg:gap-8">
            {/* Main Content */}
            <div className="min-w-0 space-y-6">
              {/* Amenities */}
              <section className="overflow-hidden rounded-[28px] border border-[#4E604F]/10 bg-white shadow-sm">
                <div className="border-b border-[#4E604F]/[0.08] px-5 py-5 sm:px-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4E604F]/[0.08]">
                      <Sparkles className="h-5 w-5 text-[#4E604F]" />
                    </div>

                    <div>
                      <h2 className="text-base font-bold text-[#1B1C1C]">
                        Room Amenities
                      </h2>

                      <p className="mt-0.5 text-xs text-[#434842]/50">
                        Everything you need for a comfortable stay
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <RoomAmenities room={room} />
                </div>
              </section>

              {/* Stats */}
              <section>
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4E604F]/60">
                    At a glance
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                      <div
                        key={stat.label}
                        className="group rounded-2xl border border-[#4E604F]/10 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4E604F]/[0.07]">
                            <Icon className="h-4 w-4 text-[#4E604F]" />
                          </div>
                        </div>

                        <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-[#434842]/45">
                          {stat.label}
                        </p>

                        <p className="mt-1 text-sm font-bold text-[#1B1C1C]">
                          {stat.value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* =====================================================
                SIDEBAR
            ===================================================== */}
            <aside className="space-y-4">
              {/* Location */}
              <div className="rounded-[24px] border border-[#4E604F]/10 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4E604F]/[0.08]">
                    <MapPin className="h-4 w-4 text-[#4E604F]" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#1B1C1C]">
                      Prime Location
                    </p>

                    <p className="mt-1.5 text-xs leading-5 text-[#434842]/55">
                      Centrally located with easy access to attractions,
                      restaurants and local experiences.
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-px bg-[#4E604F]/[0.08]" />

                <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-[#4E604F]">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Convenient area
                </div>
              </div>

              {/* Highlights */}
              <div className="rounded-[24px] border border-[#4E604F]/10 bg-white p-5 shadow-sm">
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#434842]/45">
                    Highlights
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#1B1C1C]">
                    Everything included
                  </p>
                </div>

                <div className="space-y-3">
                  {highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-[#4E604F]/[0.035]"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4E604F]/[0.08]">
                        <CheckCircle className="h-3.5 w-3.5 text-[#4E604F]" />
                      </div>

                      <span className="text-xs font-medium text-[#434842]/75">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Small trust card */}
              <div className="relative overflow-hidden rounded-[24px] bg-[#4E604F] p-5 text-white shadow-lg">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                <div className="relative">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Stay with confidence
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-semibold">
                    Your booking is protected from start to finish.
                  </p>

                  <p className="mt-1.5 text-[11px] leading-5 text-white/65">
                    Secure payments, verified rooms and support whenever you
                    need it.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {/* =====================================================
              REVIEWS
          ===================================================== */}
          <section className="mt-10 border-t border-[#4E604F]/10 pt-8 lg:mt-14 lg:pt-10">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4E604F]/60">
                Guest experiences
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#1B1C1C]">
                What guests are saying
              </h2>

              <p className="mt-1 text-sm text-[#434842]/50">
                Real experiences from guests who stayed here.
              </p>
            </div>

            <Reviews roomId={room._id} />
          </section>
        </div>
      </section>
    </main>
  );
}
