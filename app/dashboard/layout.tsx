import type { Metadata } from "next";
import WrapperNavbar from "@/features/admin/dashboard/components/Navbar/WrapperNavbar";
import Sidebar from "@/features/admin/dashboard/components/Sidebar/Sidebar";

export const instant = false;

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Admin",
  },
  description:
    "Admin dashboard to manage rooms, bookings, users, and ads.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8F9F7]">
      <a
        href="#dashboard-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#4E604F] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        Skip to content
      </a>

      <Sidebar />

      <div className="lg:pl-64">
        <WrapperNavbar />

        <main
          id="dashboard-content"
          className="p-4 sm:p-6 lg:p-8"
          aria-label="Dashboard content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}