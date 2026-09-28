// features/rooms/Components/ShareButton.tsx
"use client";

import { Share2, Check } from "lucide-react";
import { Room } from "../types/types";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  room: Room;
}

export default function ShareButton({ room }: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Room ${room.roomNumber}`,
          text: `Check out this amazing room at StayCation!`,
          url: window.location.href,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Share failed:", error);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        toast.success("Link copied to clipboard! 📋");
        setTimeout(() => setIsCopied(false), 3000);
      } catch {
        toast.error("Share not supported on this device");
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition",
        isCopied 
          ? "border-emerald-500/40 bg-emerald-50 text-emerald-700" 
          : "border-[#4E604F]/20 bg-white text-[#434842] hover:bg-[#4E604F]/5"
      )}
    >
      {isCopied ? (
        <>
          <Check className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          Share this room
        </>
      )}
    </button>
  );
}