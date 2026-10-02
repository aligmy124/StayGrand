
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Building2,
  CalendarCheck,
  Users,
  X,
  Menu,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Megaphone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const navItems = [
  {
    section: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    section: "Operations",
    items: [
      { name: "Bookings", href: "/dashboard/bookings", icon: CalendarCheck },
      { name: "Rooms", href: "/dashboard/rooms", icon: Building2 },
      { name: "Facilities", href: "/dashboard/facilities", icon: Sparkles },
    ],
  },
  {
    section: "Marketing",
    items: [
      { name: "Ads", href: "/dashboard/ads", icon: Megaphone },
    ],
  },
  {
    section: "Management",
    items: [
      { name: "Users", href: "/dashboard/users", icon: Users },
    ],
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-lg text-[#4E604F]"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen
          bg-white border-r border-[#E4E7E2]
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "lg:w-20" : "lg:w-64"}
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Logo Header */}
          <div className="flex h-16 items-center justify-between border-b border-[#E4E7E2] px-4">
            <Link
              href="/"
              className={`flex items-center gap-1 transition-opacity ${isCollapsed ? "lg:opacity-0 lg:pointer-events-none" : ""}`}
            >
              <span className="text-xl font-light tracking-tight text-[#8A9688]">
                Stay
              </span>
              <span className="text-xl font-bold tracking-tight text-[#4E604F]">
                Grand
              </span>
              <Sparkles className="h-3 w-3 text-[#8A9688]" />
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg text-[#8A9189] hover:bg-[#F4F6F2]"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {navItems.map((section) => (
              <div key={section.section} className="mb-6">
                {!isCollapsed && (
                  <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#8A9189]">
                    {section.section}
                  </p>
                )}

                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;

                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          title={isCollapsed ? item.name : undefined}
                          className={`
                            group relative flex items-center gap-3
                            rounded-xl px-3 py-2.5
                            text-sm font-medium
                            transition-all duration-200
                            ${
                              active
                                ? "bg-[#4E604F] text-white shadow-md shadow-[#4E604F]/20"
                                : "text-[#666B65] hover:bg-[#F4F6F2] hover:text-[#4E604F]"
                            }
                            ${isCollapsed ? "lg:justify-center lg:px-2" : ""}
                          `}
                        >
                          <Icon
                            className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${
                              active
                                ? "text-white"
                                : "text-[#8A9189] group-hover:text-[#4E604F]"
                            }`}
                          />

                          <span
                            className={`transition-opacity duration-200 ${
                              isCollapsed
                                ? "lg:opacity-0 lg:w-0 lg:overflow-hidden"
                                : ""
                            }`}
                          >
                            {item.name}
                          </span>

                          {active && !isCollapsed && (
                            <motion.div
                              layoutId="activeSidebar"
                              className="ml-auto h-1.5 w-1.5 rounded-full bg-white"
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>


          {/* Collapse Toggle - Desktop Only */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex absolute -right-3 top-20 h-6 w-6 items-center justify-center rounded-full bg-white border border-[#E4E7E2] shadow-md text-[#4E604F] hover:bg-[#F4F6F2] transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
