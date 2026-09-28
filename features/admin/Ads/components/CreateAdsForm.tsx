"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Sparkles,
  ArrowLeft,
  BedDouble,
  Percent,
  Power,
  Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IAds } from "../types/type.ads";
import {
  CreateAdsData,
  CreateAdsInput,
  createAdsSchema,
} from "../schema/createAds.schema";
import { createAdsAction } from "../actions/createAction";
import { IRoom } from "../../rooms/types/type.room";

interface CreateAdsFormProps {
  rooms: IRoom[];
}

export function CreateAdsForm({ rooms }: CreateAdsFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<CreateAdsInput, any, CreateAdsData>({
    resolver: zodResolver(createAdsSchema),
    defaultValues: {
      room: "",
      discount: 0,
      isActive: true,
    },
  });

  const selectedRoomId = watch("room");
  const selectedRoom = rooms.find((r) => r._id === selectedRoomId);

  const onSubmit = async (data: CreateAdsData) => {
    const result = await createAdsAction(data);

    if (!result.success) {
      toast.error(result.message);
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, error]) => {
          setError(field as keyof CreateAdsData, {
            type: "manual",
            message: error?.[0],
          });
        });
      }
      return;
    }
    toast.success(result.message);
    router.replace("/dashboard/ads");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ============ Ad Details Section ============ */}
      <section className="rounded-2xl border border-[#E4E7E2] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-[#F4F6F2] pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F3EE]">
            <Sparkles className="h-4 w-4 text-[#4E604F]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#1B1C1C]">Ad Details</h2>
            <p className="text-xs text-[#8A9189]">
              Choose the room and set the promotional discount.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Room */}
          <div className="sm:col-span-2">
            <Label
              htmlFor="room"
              className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#303530]"
            >
              <BedDouble className="h-3.5 w-3.5 text-[#8A9189]" />
              Room
            </Label>
            <select
              id="room"
              {...register("room")}
              className={`h-11 w-full rounded-md border bg-white px-3 text-sm transition-colors focus:border-[#4E604F] focus:outline-none focus:ring-2 focus:ring-[#4E604F]/10 ${
                errors.room ? "border-red-500" : "border-[#E4E7E2]"
              }`}
            >
              <option value="">Select a room...</option>
              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  Room {room.roomNumber} — ${room.price}
                </option>
              ))}
            </select>
            {errors.room && (
              <p className="mt-1 text-xs text-red-500">{errors.room.message}</p>
            )}
            {selectedRoom && (
              <div className="mt-2 rounded-lg border border-[#F0F2EE] bg-[#FAFBF9] px-3 py-2">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#666B65]">
                  <span>
                    Base price:{" "}
                    <strong className="text-[#303530]">
                      ${selectedRoom.price}
                    </strong>
                  </span>
                  <span className="text-[#E4E7E2]">•</span>
                  <span>
                    Capacity:{" "}
                    <strong className="text-[#303530]">
                      {selectedRoom.capacity}
                    </strong>
                  </span>
                  <span className="text-[#E4E7E2]">•</span>
                  <span>
                    Room discount:{" "}
                    <strong className="text-[#303530]">
                      {selectedRoom.discount}%
                    </strong>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Discount */}
          <div className="sm:col-span-2">
            <Label
              htmlFor="discount"
              className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#303530]"
            >
              <Percent className="h-3.5 w-3.5 text-[#8A9189]" />
              Ad Discount (%)
            </Label>
            <Input
              id="discount"
              type="number"
              min={0}
              max={100}
              placeholder="0"
              {...register("discount")}
              className={`h-11 ${errors.discount ? "border-red-500" : ""}`}
            />
            {errors.discount && (
              <p className="mt-1 text-xs text-red-500">
                {errors.discount.message}
              </p>
            )}
            <p className="mt-1 flex items-center gap-1 text-[10px] text-[#8A9189]">
              <Tag className="h-3 w-3" />
              This discount will be applied on top of the room&apos;s base
              price.
            </p>
          </div>
        </div>
      </section>

      {/* ============ Status Section ============ */}
      <section className="rounded-2xl border border-[#E4E7E2] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-[#F4F6F2] pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F3EE]">
            <Power className="h-4 w-4 text-[#4E604F]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#1B1C1C]">Status</h2>
            <p className="text-xs text-[#8A9189]">
              Enable this ad to make it visible to users.
            </p>
          </div>
        </div>

        <Controller
          control={control}
          name="isActive"
          render={({ field }) => (
            <button
              type="button"
              role="switch"
              aria-checked={field.value}
              onClick={() => field.onChange(!field.value)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                field.value
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-[#E4E7E2] bg-[#FAFBF9] text-[#666B65]"
              }`}
            >
              <span>{field.value ? "Active" : "Inactive"}</span>
              <span
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  field.value ? "bg-emerald-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    field.value ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </span>
            </button>
          )}
        />
      </section>

      {/* ============ Actions ============ */}
      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="h-11 gap-2 text-[#666B65] hover:bg-[#F4F6F2] hover:text-[#4E604F]"
        >
          <ArrowLeft className="h-4 w-4" />
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 gap-2 bg-[#4E604F] px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#3F4F40] hover:shadow-lg disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Creating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Create Ad
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
