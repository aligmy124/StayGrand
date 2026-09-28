"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  CheckCircle2,
  Sparkles,
  CalendarCheck,
  Mail,
  Home,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ConfirmationProps {
  bookingId?: string;
  roomId?: string | null
}

export default function Confirmation({ bookingId, roomId }: ConfirmationProps) {

  const headingRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);

  /* ✅ نقل التركيز للعنوان عند ظهور الصفحة */
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const handleCopyId = async () => {
    if (!bookingId) return;
    try {
      await navigator.clipboard.writeText(bookingId);
      setCopied(true);
      toast.success("Booking ID copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const shortId = bookingId?.slice(-8) ?? "";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="flex flex-col items-center py-8 text-center"
    >
      {/* ============ Success Icon ============ */}
      <div
        className="relative flex h-24 w-24 items-center justify-center"
        aria-hidden="true"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20 [animation-duration:2s] motion-reduce:animate-none" />
        <span className="absolute inset-2 animate-ping rounded-full bg-emerald-400/15 [animation-duration:2.5s] motion-reduce:animate-none" />

        {/* Main circle */}
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/50 motion-safe:animate-[bounce_1s_ease-out]">
          <CheckCircle2
            className="h-10 w-10 text-emerald-500 motion-safe:animate-[scale-in_0.5s_ease-out]"
            strokeWidth={2.5}
          />
        </span>
      </div>

      {/* ============ Title ============ */}
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 text-2xl font-bold tracking-tight text-[#1B1C1C] outline-none sm:text-3xl"
      >
        Booking Confirmed
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#8A9189]">
        Your payment was completed successfully. A confirmation email is on its
        way to your inbox.
      </p>

      {/* ============ Booking ID ============ */}
      {bookingId && (
        <div className="mt-6 w-full max-w-sm rounded-xl border border-[#E4E7E2] bg-[#FAFBF9] p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 text-left">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A9189]">
                Booking ID
              </p>
              <p className="mt-0.5 truncate font-mono text-sm font-semibold text-[#1B1C1C]">
                #{shortId}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyId}
              aria-label={copied ? "Booking ID copied" : "Copy booking ID"}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E4E7E2] bg-white text-[#666B65] transition-all hover:border-[#4E604F] hover:bg-[#F8F9F7] hover:text-[#4E604F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E604F]/30 active:scale-95"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* ============ Next Steps ============ */}
      <div className="mt-6 w-full max-w-sm rounded-xl border border-[#E4E7E2] bg-white p-4 text-left">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8A9189]">
          What happens next
        </p>

        <ul className="space-y-3">
          <NextStep
            icon={Mail}
            title="Confirmation email"
            description="Check your inbox for booking details."
          />
          <NextStep
            icon={CalendarCheck}
            title="Manage your booking"
            description="View, modify, or cancel from your bookings page."
          />
        </ul>
      </div>

      {/* ============ Actions ============ */}
<div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row-reverse">
  <Button
    
    className="h-11 flex-1 rounded-lg bg-[#4E604F] px-6 text-sm font-semibold text-white shadow-sm hover:bg-[#3F4F40]"
  >
    <Link href={`/rooms/${roomId}`} className="flex items-center justify-center gap-2">
      <Sparkles className="h-4 w-4" aria-hidden="true" />
      <span>View My Bookings</span>
    </Link>
  </Button>

  <Button
    
    variant="outline"
    className="h-11 flex-1 rounded-lg border-[#E4E7E2] bg-white px-6 text-sm font-semibold text-[#303530] hover:border-[#4E604F] hover:bg-[#F8F9F7] hover:text-[#4E604F]"
  >
    <Link href="/" className="flex items-center justify-center gap-2">
      <Home className="h-4 w-4" aria-hidden="true" />
      <span>Return Home</span>
    </Link>
  </Button>
</div>

      {/* ============ Support ============ */}
      <p className="mt-6 text-xs text-[#8A9189]">
        Need help?{" "}
        <Link
          href="/contact"
          className="font-medium text-[#4E604F] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E604F]/30 focus-visible:ring-offset-2 rounded"
        >
          Contact support
        </Link>
      </p>
    </div>
  );
}

/* =========================================================
   Next Step Item
========================================================= */
function NextStep({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F0F3EE]"
        aria-hidden="true"
      >
        <Icon className="h-4 w-4 text-[#4E604F]" />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#1B1C1C]">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-[#8A9189]">
          {description}
        </p>
      </div>
    </li>
  );
}
