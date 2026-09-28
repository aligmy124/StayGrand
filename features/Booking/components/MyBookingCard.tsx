// components/BookingCard.tsx

"use client";

import { Calendar, Clock, CheckCircle, XCircle} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Booking } from "../types/types";

interface BookingCardProps {
  bookings: Booking[];
}

export default function MyBookingCard({ bookings }: BookingCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: {
        icon: Clock,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        label: 'Pending'
      },
      confirmed: {
        icon: CheckCircle,
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        label: 'Confirmed'
      },
      cancelled: {
        icon: XCircle,
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        label: 'Cancelled'
      },
      completed: {
        icon: CheckCircle,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        label: 'Completed'
      }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-[#F4F6F2] p-4">
            <Calendar className="h-8 w-8 text-[#8A9189]" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-[#303530]">No bookings yet</h3>
        <p className="text-sm text-[#8A9189] mt-1">
          Start exploring rooms and book your first stay!
        </p>
        <Link
          href="/rooms"
          className="inline-block mt-4 rounded-lg bg-[#4E604F] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#3F4F40] transition-colors"
        >
          Explore Rooms
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => {
        const statusConfig = getStatusConfig(booking.status);
        const StatusIcon = statusConfig.icon;

        return (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`group rounded-2xl border ${statusConfig.border} bg-white p-5 transition-all duration-300 hover:shadow-lg hover:border-[#4E604F]/20`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              {/* Left: Booking Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <Link 
                      href={`/rooms/${booking.room}`}
                      className="text-lg font-semibold text-[#303530] hover:text-[#4E604F] transition-colors"
                    >
                      Room #{booking.room.slice(-6)}
                    </Link>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <div className="flex items-center gap-2.5 text-sm text-[#666B65]">
                    <Calendar className="h-4 w-4 text-[#8A9189]" />
                    <div>
                      <span className="text-xs text-[#8A9189]">Check-in</span>
                      <p className="font-medium text-[#303530]">{formatDate(booking.startDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-sm text-[#666B65]">
                    <Calendar className="h-4 w-4 text-[#8A9189]" />
                    <div>
                      <span className="text-xs text-[#8A9189]">Check-out</span>
                      <p className="font-medium text-[#303530]">{formatDate(booking.endDate)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 mt-3">
                  <Clock className="h-4 w-4 text-[#8A9189]" />
                  <span className="text-sm text-[#666B65]">
                    Booked on {formatDate(booking.createdAt)}
                  </span>
                </div>
              </div>

              {/* Right: Price & Actions */}
              <div className="flex flex-col items-end gap-3 sm:min-w-[140px]">
                <div className="text-right">
                  <p className="text-xs text-[#8A9189]">Total Price</p>
                  <p className="text-2xl font-bold text-[#4E604F]">
                    ${booking.totalPrice.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <Link
                    href={`/rooms/${booking.room}`}
                    className="flex-1 rounded-lg border border-[#E4E7E2] px-3 py-1.5 text-center text-xs font-medium text-[#4E604F] transition-all hover:bg-[#F4F6F2]"
                  >
                    View Room
                  </Link>
                  
                  {/* {booking.status === 'pending' && (
                    <button
                      className="flex-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-all hover:bg-red-100"
                    >
                      Cancel
                    </button>
                  )} */}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}