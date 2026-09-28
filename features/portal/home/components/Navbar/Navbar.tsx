"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import {
  Menu,
  X,
  User,
  Heart,
  Compass,
  Home,
  ChevronDown,
  ChevronRight,
  Shield,
  CalendarCheck,
  LogOut,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import LogoutButton from "@/features/Auth/logout/components/LogoutButton";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type UserType = {
  _id: string;
  userName: string;
  email: string;
  role: string;
  profileImage: string | null;
};

type NavbarProps = { user: UserType | null };

type NavLink = {
  name: string;
  href: string;
  icon: typeof Home;
  description: string;
};

/* -------------------------------------------------------------------------- */
/*                              UI STATE REDUCER                              */
/* -------------------------------------------------------------------------- */

type UIState = {
  isOpen: boolean;
  isScrolled: boolean;
  isDropdownOpen: boolean;
};

type UIAction =
  | { type: "TOGGLE_MOBILE" }
  | { type: "CLOSE_MOBILE" }
  | { type: "TOGGLE_DROPDOWN" }
  | { type: "CLOSE_DROPDOWN" }
  | { type: "SET_SCROLLED"; value: boolean };

const initialUI: UIState = {
  isOpen: false,
  isScrolled: false,
  isDropdownOpen: false,
};

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case "TOGGLE_MOBILE":
      return { ...state, isOpen: !state.isOpen, isDropdownOpen: false };
    case "CLOSE_MOBILE":
      return state.isOpen ? { ...state, isOpen: false } : state;
    case "TOGGLE_DROPDOWN":
      return { ...state, isDropdownOpen: !state.isDropdownOpen };
    case "CLOSE_DROPDOWN":
      return state.isDropdownOpen ? { ...state, isDropdownOpen: false } : state;
    case "SET_SCROLLED":
      return state.isScrolled === action.value
        ? state
        : { ...state, isScrolled: action.value };
    default:
      return state;
  }
}

/* -------------------------------------------------------------------------- */
/*                                NAV LINKS                                   */
/* -------------------------------------------------------------------------- */

const BASE_LINKS: NavLink[] = [
  { name: "Home", href: "/", icon: Home, description: "Discover your next stay" },
  { name: "Explore", href: "/rooms", icon: Compass, description: "Find the perfect room" },
];

const FAVORITES_LINK: NavLink = {
  name: "Favorites",
  href: "/favorites",
  icon: Heart,
  description: "Your saved stays",
};

/* -------------------------------------------------------------------------- */
/*                                  AVATAR                                    */
/* -------------------------------------------------------------------------- */

const Avatar = memo(function Avatar({
  user,
  size = 32,
  ring = true,
  showOnline = true,
}: {
  user: Pick<UserType, "userName" | "profileImage">;
  size?: number;
  ring?: boolean;
  showOnline?: boolean;
}) {
  const initials = user.userName?.charAt(0).toUpperCase() ?? "?";
  const px = `${size}px`;

  return (
    <div className="relative shrink-0" style={{ width: px, height: px }}>
      {user.profileImage ? (
        <Image
          src={user.profileImage}
          alt={user.userName}
          width={size}
          height={size}
          sizes={px}
          className={[
            "rounded-full object-cover shadow-sm",
            ring ? "ring-2 ring-white" : "",
          ].join(" ")}
          style={{ width: px, height: px }}
        />
      ) : (
        <div
          className="flex items-center justify-center rounded-full bg-gradient-to-br from-[#5E715F] to-[#3F4F40] font-semibold text-white shadow-sm"
          style={{ width: px, height: px, fontSize: size * 0.4 }}
        >
          {initials}
        </div>
      )}

      {showOnline && (
        <span
          className="absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-white bg-emerald-400"
          style={{ width: size * 0.32, height: size * 0.32 }}
          aria-hidden
        />
      )}
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/*                              DROPDOWN ITEM                                 */
/* -------------------------------------------------------------------------- */

const DropdownItem = memo(function DropdownItem({
  href,
  icon: Icon,
  label,
  hint,
  onClick,
  tone = "default",
}: {
  href: string;
  icon: typeof Home;
  label: string;
  hint?: string;
  onClick: () => void;
  tone?: "default" | "danger";
}) {
  const isDanger = tone === "danger";
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onClick}
      className={[
        "group flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-medium transition-colors",
        isDanger
          ? "text-[#B0453A] hover:bg-[#FBEEEC]"
          : "text-[#3E4A3F] hover:bg-[#F4F6F2]",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
          isDanger
            ? "bg-[#FBEEEC] group-hover:bg-[#F6DDD9]"
            : "bg-[#F3F5F1] group-hover:bg-[#E8ECE6]",
        ].join(" ")}
      >
        <Icon className="h-4 w-4" />
      </span>

      <span className="flex min-w-0 flex-1 flex-col leading-tight">
        <span className="truncate">{label}</span>
        {hint && (
          <span className="truncate text-[10px] font-normal text-[#9AA199]">
            {hint}
          </span>
        )}
      </span>

      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#A1A79F] transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
});

/* -------------------------------------------------------------------------- */
/*                                 NAVBAR                                     */
/* -------------------------------------------------------------------------- */

function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [ui, dispatch] = useReducer(uiReducer, initialUI);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  /* ------------------------------ Memoized links ------------------------------ */
  const navLinks = useMemo(
    () => (user ? [...BASE_LINKS, FAVORITES_LINK] : BASE_LINKS),
    [user],
  );

  /* ------------------------------ Scroll (rAF) ------------------------------- */
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        dispatch({ type: "SET_SCROLLED", value: window.scrollY > 8 });
        rafRef.current = null;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* --------------------- Click outside + Escape (single listener) ------------- */
  useEffect(() => {
    if (!ui.isDropdownOpen) return;

    const onClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        dispatch({ type: "CLOSE_DROPDOWN" });
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch({ type: "CLOSE_DROPDOWN" });
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [ui.isDropdownOpen]);

  /* ------------------------- Reset on route change --------------------------- */
  useEffect(() => {
    dispatch({ type: "CLOSE_DROPDOWN" });
    dispatch({ type: "CLOSE_MOBILE" });
  }, [pathname]);

  /* ------------------------------- Callbacks --------------------------------- */
  const isActive = useCallback(
    (href: string) =>
      href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`),
    [pathname],
  );

  const closeAll = useCallback(() => {
    dispatch({ type: "CLOSE_DROPDOWN" });
    dispatch({ type: "CLOSE_MOBILE" });
  }, []);

  const toggleMobile = useCallback(() => dispatch({ type: "TOGGLE_MOBILE" }), []);
  const toggleDropdown = useCallback(
    () => dispatch({ type: "TOGGLE_DROPDOWN" }),
    [],
  );

  const isAdmin = user?.role === "admin";

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        ui.isScrolled
          ? "border-b border-[#E8EBE6] bg-white/85 shadow-[0_8px_30px_rgba(78,96,79,0.06)] backdrop-blur-xl"
          : "bg-white",
      ].join(" ")}
    >
      <nav className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* ============================ HEADER ROW ============================ */}
        <div className="flex h-[68px] items-center justify-between gap-3">
          {/* ------------------------------- LOGO ------------------------------ */}
          <Link
            href="/"
            onClick={closeAll}
            className="group relative flex shrink-0 items-center"
            aria-label="StayGrand home"
          >
            <span className="text-[21px] font-light tracking-tight text-[#8A9688] transition-colors duration-300 group-hover:text-[#687667] sm:text-2xl">
              Stay
            </span>
            <span className="text-[21px] font-bold tracking-tight text-[#4E604F] sm:text-2xl">
              Grand
            </span>
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#4E604F] transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* --------------------------- DESKTOP NAV --------------------------- */}
          <div className="hidden lg:flex lg:items-center">
            <div className="flex items-center gap-1 rounded-full border border-[#E9ECE7] bg-[#FAFBF9] p-1 shadow-sm">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative"
                  >
                    <div
                      className={[
                        "relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium transition-colors duration-300 xl:px-5 xl:text-sm",
                        active
                          ? "text-[#304132]"
                          : "text-[#737A72] hover:text-[#304132]",
                      ].join(" ")}
                    >
                      {active && (
                        <motion.span
                          layoutId="desktop-active-nav"
                          transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 32,
                          }}
                          className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm ring-1 ring-[#E2E7E0]"
                        />
                      )}
                      {!active && (
                        <span className="absolute inset-0 -z-10 rounded-full bg-white opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100" />
                      )}
                      <Icon
                        className={[
                          "h-4 w-4 transition-colors duration-300",
                          active
                            ? "text-[#4E604F]"
                            : "text-[#9AA199] group-hover:text-[#4E604F]",
                        ].join(" ")}
                      />
                      <span>{link.name}</span>
                      {active && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-1.5 w-1.5 rounded-full bg-[#4E604F]"
                        />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* -------------------------- DESKTOP RIGHT -------------------------- */}
          <div className="hidden items-center gap-1.5 md:flex">
            <div className="mx-1 h-6 w-px bg-[#E7EAE5]" />

            {user ? (
              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  aria-expanded={ui.isDropdownOpen}
                  aria-haspopup="menu"
                  onClick={toggleDropdown}
                  className="group flex items-center gap-2 rounded-full border border-transparent py-1.5 pl-1.5 pr-2.5 transition-all duration-200 hover:border-[#E5E9E3] hover:bg-[#F7F9F6]"
                >
                  <Avatar user={user} size={32} />

                  <div className="hidden text-left xl:block">
                    <p className="max-w-[110px] truncate text-xs font-semibold text-[#303530]">
                      {user.userName}
                    </p>
                    <p className="text-[10px] text-[#8A9189]">
                      {isAdmin ? "Administrator" : "Member"}
                    </p>
                  </div>

                  <ChevronDown
                    className={[
                      "h-3.5 w-3.5 text-[#8A9189] transition-transform duration-200",
                      ui.isDropdownOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </button>

                {/* -------------------------- DROPDOWN -------------------------- */}
                <AnimatePresence>
                  {ui.isDropdownOpen && (
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-[280px] origin-top-right overflow-hidden rounded-2xl border border-[#E5E9E3] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.10)]"
                    >
                      {/* Identity header */}
                      <div className="bg-gradient-to-br from-[#F8FAF7] to-[#F1F4EF] p-4">
                        <div className="flex items-center gap-3">
                          <Avatar user={user} size={44} showOnline={false} />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-[#303530]">
                              {user.userName}
                            </p>
                            <p className="mt-0.5 truncate text-xs text-[#8A9189]">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="p-2">
                        <DropdownItem
                          href="/profile"
                          icon={User}
                          label="Profile"
                          hint="Manage your account"
                          onClick={closeAll}
                        />
                        <DropdownItem
                          href="/my_booking"
                          icon={CalendarCheck}
                          label="My Bookings"
                          hint="Manage your reservations"
                          onClick={closeAll}
                        />
                        {isAdmin && (
                          <DropdownItem
                            href="/admin"
                            icon={Shield}
                            label="Admin Panel"
                            hint="Manage listings & users"
                            onClick={closeAll}
                          />
                        )}

                        <div className="my-2 border-t border-[#EEF0EC]" />

                        <div className="flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-medium text-[#B0453A] transition-colors hover:bg-[#FBEEEC]">
                          <div className="flex-1">
                            <LogoutButton />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* ------------------------------ GUEST ------------------------------ */
              <div className="flex items-center gap-1">
                <Link
                  href="/login"
                  className="rounded-full px-4 py-2 text-sm font-medium text-[#4E604F] transition-colors hover:bg-[#F3F5F1]"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-[#4E604F] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#3F4F40] hover:shadow-md active:scale-[0.98]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* -------------------------- MOBILE TOGGLE -------------------------- */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              aria-label={ui.isOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={ui.isOpen}
              onClick={toggleMobile}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F4EF] text-[#4E604F] transition hover:bg-[#E8ECE6] active:scale-95"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={ui.isOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  {ui.isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ============================ MOBILE MENU ============================ */}
        <AnimatePresence>
          {ui.isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden lg:hidden"
            >
              <div className="border-t border-[#EEF0EC] py-4">
                {user && (
                  <div className="mb-3 flex items-center gap-3 rounded-2xl border border-[#E7EBE5] bg-gradient-to-br from-[#F9FAF8] to-[#F2F5F0] p-3">
                    <Avatar user={user} size={44} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#303530]">
                        {user.userName}
                      </p>
                      <p className="truncate text-xs text-[#8A9189]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  {navLinks.map((link, index) => {
                    const active = isActive(link.href);
                    const Icon = link.icon;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                      >
                        <Link
                          href={link.href}
                          onClick={closeAll}
                          className={[
                            "group relative flex items-center gap-3 rounded-2xl px-3 py-3 transition-all duration-200",
                            active
                              ? "bg-[#F0F3EE] text-[#304132]"
                              : "text-[#697169] hover:bg-[#F7F8F6]",
                          ].join(" ")}
                        >
                          {active && (
                            <motion.span
                              layoutId="mobile-active-bar"
                              className="absolute left-0 h-7 w-1 rounded-r-full bg-[#4E604F]"
                            />
                          )}
                          <span
                            className={[
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
                              active
                                ? "bg-[#4E604F] text-white shadow-sm"
                                : "bg-[#F1F3EF] text-[#8A9688] group-hover:text-[#4E604F]",
                            ].join(" ")}
                          >
                            <Icon className="h-[18px] w-[18px]" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold">{link.name}</p>
                            <p
                              className={[
                                "mt-0.5 truncate text-[10px]",
                                active ? "text-[#718071]" : "text-[#9AA199]",
                              ].join(" ")}
                            >
                              {link.description}
                            </p>
                          </div>
                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#4E604F]" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-4 border-t border-[#EEF0EC] pt-4">
                  {user ? (
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/profile"
                        onClick={closeAll}
                        className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#E2E7E0] bg-white text-sm font-medium text-[#4E604F] transition hover:bg-[#F5F7F3] active:scale-[0.98]"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                      <Link
                        href="/my_booking"
                        onClick={closeAll}
                        className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#E2E7E0] bg-white text-sm font-medium text-[#4E604F] transition hover:bg-[#F5F7F3] active:scale-[0.98]"
                      >
                        <CalendarCheck className="h-4 w-4" />
                        Bookings
                      </Link>
                      <div className="col-span-2">
                        <LogoutButton />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/login"
                        onClick={closeAll}
                        className="flex h-11 items-center justify-center rounded-xl border border-[#E2E7E0] bg-white text-sm font-medium text-[#4E604F] transition hover:bg-[#F5F7F3]"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        onClick={closeAll}
                        className="flex h-11 items-center justify-center rounded-xl bg-[#4E604F] text-sm font-semibold text-white shadow-sm transition hover:bg-[#3F4F40]"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default memo(Navbar);