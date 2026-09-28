"use client";

import { DoorOpen, Sparkles, Megaphone, CalendarCheck } from "lucide-react";
import type { IDashboardData } from "../types/type.dashboard";
import StatCard from "./StatCard";

interface StatsGridProps {
  data: IDashboardData;
}

export default function StatsGrid({ data }: StatsGridProps) {
  const totalBookings = data.bookings.pending + data.bookings.completed;

  return (
    <section
      aria-label="Overview statistics"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <StatCard
        icon={DoorOpen}
        label="Total Rooms"
        value={data.rooms}
        color="default"
      />
      <StatCard
        icon={Sparkles}
        label="Facilities"
        value={data.facilities}
        color="purple"
      />
      <StatCard
        icon={Megaphone}
        label="Active Ads"
        value={data.ads}
        color="amber"
      />
      <StatCard
        icon={CalendarCheck}
        label="Total Bookings"
        value={totalBookings}
        color="green"
        hint={`${data.bookings.pending} pending`}
      />
    </section>
  );
}