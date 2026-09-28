"use client";

import { Room } from "../../types/types";
import { formatPrice, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Users, DollarSign } from "lucide-react";
import BookingForm from "@/features/Booking/components/BookingForm";

interface BookingCardProps {
  room: Room;
  isAuthenticated: boolean
}

export function BookingCard({ room,isAuthenticated }: BookingCardProps) {
  return (
    <Card className="rounded-2xl border-0 shadow-xl overflow-hidden bg-gradient-to-br from-white to-[#f8faf8]">
      {/* Decorative top bar */}
      <div className="h-1.5 bg-gradient-to-r from-[#4E604F] via-[#6B8C6D] to-[#4E604F]" />

      <CardHeader className="pb-2 pt-6">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#434842]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4E604F]" />
          Reserve Your Stay
          <span className="h-1.5 w-1.5 rounded-full bg-[#4E604F]" />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 px-6 pb-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-[#f5f7f3] p-2.5 text-center">
            <CalendarDays className="mx-auto h-4 w-4 text-[#4E604F]/60" />

            <p className="mt-0.5 text-[10px] font-medium text-[#434842]">
              {formatDate(room.createdAt)}
            </p>

            <p className="text-[8px] text-[#434842]/40 uppercase tracking-wider">
              Added
            </p>
          </div>

          <div className="rounded-xl bg-[#f5f7f3] p-2.5 text-center">
            <Users className="mx-auto h-4 w-4 text-[#4E604F]/60" />

            <p className="mt-0.5 text-[10px] font-medium text-[#434842]">
              {room.capacity}
            </p>

            <p className="text-[8px] text-[#434842]/40 uppercase tracking-wider">
              Guests
            </p>
          </div>

          <div className="rounded-xl bg-[#f5f7f3] p-2.5 text-center">
            <DollarSign className="mx-auto h-4 w-4 text-[#4E604F]/60" />

            <p className="mt-0.5 text-[10px] font-medium text-[#434842]">
              {formatPrice(room.price)}
            </p>

            <p className="text-[8px] text-[#434842]/40 uppercase tracking-wider">
              / Night
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <BookingForm
          roomId={room._id}
          price={room.price}
          discount={room.discount}
          isAuthenticated={isAuthenticated}
        />
      </CardContent>
    </Card>
  );
}

