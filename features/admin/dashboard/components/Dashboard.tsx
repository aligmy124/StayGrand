import { Suspense } from "react";
import { getDashboardService } from "../services/dashboard.service";
import BookingsChart from "./BookingsChart";
import DashboardHeader from "./DashboardHeader";
import DashboardSkeleton from "./DashboardSkeleton";
import StatsGrid from "./StatsGrid";
import UsersChart from "./UsersChart";

async function DashboardContent() {
  const response = await getDashboardService();
  const data = response.data;

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <StatsGrid data={data} />

      <section
        aria-label="Analytics charts"
        className="grid grid-cols-1 gap-4 lg:grid-cols-2"
      >
        <BookingsChart data={data.bookings} />
        <UsersChart data={data.users} />
      </section>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}