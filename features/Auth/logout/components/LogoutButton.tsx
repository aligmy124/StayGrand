"use client";

import { logoutAction } from "../action/logout.actions";
import { useState, useRef, useEffect, useCallback } from "react";
import { LogOut, Loader2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus trap + escape + scroll lock
  useEffect(() => {
    if (!showConfirm) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableElements = dialog.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const timer = setTimeout(() => cancelRef.current?.focus(), 80);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowConfirm(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [showConfirm]);

  const handleClose = useCallback(() => {
    setShowConfirm(false);
    triggerRef.current?.focus();
  }, []);

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    try {
      await logoutAction();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoading(false);
    }
    // Don't reset isLoading on success — page will redirect
  }, []);

  return (
    <>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setShowConfirm(true)}
        disabled={isLoading}
        className="
          group flex w-full items-center gap-3
          rounded-xl px-3 py-2.5
          text-sm font-medium text-red-600
          transition-all duration-200
          hover:bg-red-50 active:scale-[0.98]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 focus-visible:ring-offset-2
          disabled:opacity-60 disabled:cursor-not-allowed
          cursor-pointer
        "
        aria-label={isLoading ? "Signing out, please wait" : "Sign out"}
        aria-busy={isLoading}
        aria-haspopup="dialog"
      >
        <span
          className="
            flex h-8 w-8 items-center justify-center
            rounded-lg bg-red-50
            transition-colors duration-200
            group-hover:bg-red-100
          "
          aria-hidden="true"
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
              onClick={handleClose}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              ref={dialogRef}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="logout-title"
              aria-describedby="logout-description"
              className="
                fixed left-1/2 top-1/2 z-[61]
                w-[calc(100%-2rem)] max-w-sm
                -translate-x-1/2 -translate-y-1/2
              "
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
                <div className="p-5 sm:p-6">
                  <div className="flex items-start gap-3.5">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50"
                      aria-hidden="true"
                    >
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        id="logout-title"
                        className="text-base font-semibold text-[#303530]"
                      >
                        Sign out of your account?
                      </h3>
                      <p
                        id="logout-description"
                        className="mt-1.5 text-sm leading-relaxed text-[#666B65]"
                      >
                        You&apos;ll need to sign in again to access your dashboard and bookings.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-2 border-t border-[#EEF0EC] bg-[#FAFBF9] p-4 sm:flex-row sm:justify-end">
                  <button
                    ref={cancelRef}
                    type="button"
                    onClick={handleClose}
                    className="
                      rounded-xl border border-[#E4E7E2] bg-white
                      px-4 py-2.5 text-sm font-medium text-[#666B65]
                      transition-all duration-200
                      hover:bg-[#F4F6F2] hover:text-[#4E604F]
                      active:scale-[0.98]
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4E604F]/30 focus-visible:ring-offset-2
                    "
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      rounded-xl bg-red-600 px-4 py-2.5
                      text-sm font-semibold text-white
                      transition-all duration-200
                      hover:bg-red-700
                      active:scale-[0.98]
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 focus-visible:ring-offset-2
                    "
                  >
                    <span className="flex items-center justify-center gap-2">
                      <LogOut className="h-4 w-4" aria-hidden="true" />
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