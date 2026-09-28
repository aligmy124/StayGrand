// features/rooms/Components/RoomGallery.tsx
"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Share2,
  Percent,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Room } from "../types/types";
import {
  add_to_favourite,
  FavouriteState,
} from "@/features/favorite/actions/favourite.action";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { toggle_favourite } from "@/features/favorite/actions/toggle_favourite.actions";

interface RoomGalleryProps {
  room: Room;
  isFavourite?: boolean;
  favoriteId?: string | null;
  isAuthenticated: boolean;
}

const initialState: FavouriteState = {
  success: false,
  message: "",
};

export default function RoomGallery({
  room,
  isFavourite = false,
  favoriteId = null,
  isAuthenticated,
}: RoomGalleryProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(isFavourite || false);
  const [state, action, pending] = useActionState(
    toggle_favourite.bind(null, room._id, favoriteId),
    initialState,
  );

useEffect(() => {
  if (!state.message) return;

  if (!state.success) {
    toast.error(state.message);
    return;
  }

  if (state.action === "add") {
    setIsLiked(true);
    toast.success("Added to favourites");
  }

  if (state.action === "remove") {
    setIsLiked(false);
    toast.success("Removed from favourites");
  }

  router.refresh();
}, [state, router]);

  const images = room.images?.length ? room.images : ["/images/hero2.jpg"];
  const imageCount = images.length;

  const handleShare = async () => {
    if (!navigator.share) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard! 📋");
      } catch {
        toast.info("Share not supported on this device.");
      }
      return;
    }

    try {
      await navigator.share({
        title: `Room ${room.roomNumber}`,
        text: "Check out this amazing room at StayCation!",
        url: window.location.href,
      });
    } catch {
      // User cancelled sharing
    }
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % imageCount);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + imageCount) % imageCount);
  };

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-2xl bg-[#eef1eb] shadow-lg">
        <div className="relative aspect-[4/3] sm:aspect-[16/9]">
          <Image
            src={images[selectedImage]}
            alt={`Room ${room.roomNumber}`}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Gradient Overlay - Subtle */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Navigation Arrows */}
        {imageCount > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-[#434842]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-[#434842]" />
            </button>
          </>
        )}

        {/* Discount Badge */}
        {room.discount > 0 && (
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
              <Percent className="h-4 w-4" />
              <span>{room.discount}% OFF</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <form
            action={isAuthenticated ? action : undefined}
            onSubmit={(e) => {
              if (!isAuthenticated) {
                e.preventDefault();
                router.push("/login");
              }
            }}
          >
            <input type="hidden" name="isFavourite" value={String(isLiked)} />

            <button
              type="submit"
              disabled={pending}
              aria-label={
                isLiked ? "Remove from favourites" : "Add to favourites"
              }
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                "bg-white shadow-md transition-all duration-300",
                "hover:scale-105 active:scale-95",
                pending && "cursor-wait",
                isLiked && "bg-red-50",
              )}
            >
              {pending ? (
                <Loader2 className="h-4 w-4 animate-spin text-[#4E604F]" />
              ) : (
                <Heart
                  className={cn(
                    "h-4 w-4 transition-all duration-300",
                    isLiked
                      ? "fill-red-500 text-red-500 scale-110"
                      : "text-[#434842]",
                  )}
                />
              )}
            </button>
          </form>

          <button
            type="button"
            onClick={handleShare}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
          >
            <Share2 className="h-4 w-4 text-[#434842]" />
          </button>
        </div>

        {/* Image Counter */}
        {imageCount > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {selectedImage + 1} / {imageCount}
          </div>
        )}

        {/* Room Number */}
        <div className="absolute bottom-4 right-4 text-right text-white">
          <p className="text-[10px] font-medium uppercase tracking-wider opacity-80">
            Room
          </p>
          <p className="text-xl font-bold">#{room.roomNumber}</p>
        </div>
      </div>

      {/* Thumbnails */}
      {imageCount > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
          {images.slice(0, 6).map((image, index) => {
            const isSelected = selectedImage === index;
            const hasMore = imageCount > 6 && index === 5;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-lg transition",
                  isSelected
                    ? "ring-2 ring-[#4E604F] ring-offset-2"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                <Image
                  src={image}
                  alt={`Room ${room.roomNumber} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />

                {hasMore && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-bold text-white">
                    +{imageCount - 6}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
