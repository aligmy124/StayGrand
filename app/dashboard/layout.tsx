
import WrapperNavbar from "@/features/admin/dashboard/components/Navbar/WrapperNavbar";
import Sidebar from "@/features/admin/dashboard/components/Sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F9F7]">
      {/* Sidebar - Fixed on Desktop, Drawer on Mobile */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Top Navbar */}
        <WrapperNavbar />

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}