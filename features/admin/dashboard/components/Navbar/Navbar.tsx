// components/DashboardNavbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  Shield,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LogoutButton from "@/features/Auth/logout/components/LogoutButton";

type User = {
  _id: string;
  userName: string;
  email: string;
  role: string;
  profileImage: string | null;
};

type DashboardNavbarProps = {
  user?: User | null;
};

export default function DashboardNavbar({ user }: DashboardNavbarProps) {
     
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  // Generate page title from pathname
  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return "Dashboard";
    const last = segments[segments.length - 1];
    return last
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <header
      className={`
        sticky top-0 z-30 h-16
        border-b border-[#E4E7E2]
        transition-all duration-300
        ${isScrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-white/60" 
          : "bg-white"
        }
      `}
    >
      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: Page Title */}
        <div className="flex items-center gap-3 lg:pl-0 pl-12">
          <h1 className="text-lg font-semibold text-[#303530]">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* User Dropdown */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 rounded-xl px-1.5 py-1.5 hover:bg-[#F4F6F2] transition-colors"
              >
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.userName}
                    className="h-7 w-7 rounded-full object-cover ring-2 ring-[#4E604F]/10"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4E604F] text-xs font-semibold text-white">
                    {user.userName.charAt(0).toUpperCase()}
                  </div>
                )}
                <ChevronDown
                  className={`hidden sm:block h-3 w-3 text-[#8A9189] transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1.5 w-56 overflow-hidden rounded-xl bg-white shadow-xl shadow-black/5 ring-1 ring-black/5"
                  >
                    {/* User Info */}
                    <div className="px-3 py-2.5 border-b border-[#F4F6F2]">
                      <p className="text-sm font-medium text-[#303530] truncate">
                        {user.userName}
                      </p>
                      <p className="text-xs text-[#8A9189] truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#4E604F] hover:bg-[#F4F6F2] transition-colors"
                      >
                        <User className="h-3.5 w-3.5" />
                        Profile
                      </Link>

                      <Link
                        href="/dashboard/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#4E604F] hover:bg-[#F4F6F2] transition-colors"
                      >
                        <Settings className="h-3.5 w-3.5" />
                        Settings
                      </Link>

                      <Link
                        href="/help"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#4E604F] hover:bg-[#F4F6F2] transition-colors"
                      >
                        <HelpCircle className="h-3.5 w-3.5" />
                        Help
                      </Link>

                      {user.role === "admin" && (
                        <Link
                          href="/dashboard/admin"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#4E604F] hover:bg-[#F4F6F2] transition-colors"
                        >
                          <Shield className="h-3.5 w-3.5" />
                          Admin Panel
                        </Link>
                      )}

                      <div className="border-t border-[#F4F6F2] mt-1 pt-1 px-1">
                        <LogoutButton />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Link
                href="/login"
                className="rounded-xl px-3 py-1.5 text-sm font-medium text-[#4E604F] hover:bg-[#F4F6F2] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-[#4E604F] px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-[#3F4F40] transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}