"use client";

import { logoutAction } from "../action/logout.actions";
import { useState, useRef, useEffect } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Focus management + escape + scroll lock
  useEffect(() => {
    if (!showConfirm) return;

    const timer = setTimeout(() => cancelRef.current?.focus(), 100);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowConfirm(false);
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [showConfirm]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logoutAction();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        disabled={isLoading}
        className="
          group flex w-full items-center gap-3
          rounded-xl px-3 py-2.5
          text-sm font-medium text-red-600
          transition-colors duration-200
          hover:bg-red-50
          focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40
          disabled:opacity-60
        "
      >
        <span
          className="
            flex h-8 w-8 items-center justify-center
            rounded-lg bg-red-50
            transition-colors duration-200
            group-hover:bg-red-100
          "
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
        </span>
        <span>{isLoading ? "Signing out..." : "Sign out"}</span>
      </button>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && !isLoading && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setShowConfirm(false)}
              className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="logout-title"
              className="
                fixed left-1/2 top-1/2 z-[61]
                w-[calc(100%-2rem)] max-w-sm
                -translate-x-1/2 -translate-y-1/2
              "
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
                <div className="p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
                      <LogOut className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3
                        id="logout-title"
                        className="text-base font-semibold text-[#303530]"
                      >
                        Sign out?
                      </h3>
                      <p className="mt-1 text-sm text-[#666B65]">
                        You&apos;ll need to sign in again to access your account.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-2 border-t border-[#EEF0EC] bg-[#FAFBF9] p-4 sm:flex-row sm:justify-end">
                  <button
                    ref={cancelRef}
                    onClick={() => setShowConfirm(false)}
                    className="
                      rounded-xl border border-[#E4E7E2] bg-white
                      px-4 py-2.5 text-sm font-medium text-[#666B65]
                      transition-colors hover:bg-[#F4F6F2]
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4E604F]/30
                    "
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="
                      rounded-xl bg-red-600 px-4 py-2.5
                      text-sm font-semibold text-white
                      transition-colors hover:bg-red-700
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50
                    "
                  >
                    <span className="flex items-center justify-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}