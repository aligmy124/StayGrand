"use client";

import { useEffect, useRef, useState } from "react";
import { Trash2, UploadCloud, ImagePlus, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IRoom } from "../../types/type.room";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  UpdateFormDataRoom,
  UpdateFormInput,
  updateRoomSchema,
} from "../../schema/updateRoom.schema";
import { updateRoomAction } from "../../actions/updateAction";

interface IUpdateRoom {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  room: IRoom | undefined;
  rooms: IRoom[];
}

export function UpdateDialog({ open, onOpenChange, room, rooms }: IUpdateRoom) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    setError,
  } = useForm<UpdateFormInput, any, UpdateFormDataRoom>({
    resolver: zodResolver(updateRoomSchema),
    defaultValues: {
      roomNumber: room?.roomNumber ?? "",
      price: String(room?.price ?? 0),
      discount: String(room?.discount ?? 0),
      capacity: String(room?.capacity ?? 0),
      facilities: room?.facilities?.map((f) => f._id) ?? [],
    },
  });

  useEffect(() => {
    if (!room) return;

    reset({
      roomNumber: room.roomNumber ?? "",
      price: String(room.price ?? 0),
      discount: String(room.discount ?? 0),
      capacity: String(room.capacity ?? 0),
      facilities: room.facilities?.map((f) => f._id) ?? [],
    });
  }, [room, reset]);

  const allFacilities = Array.from(
    new Map(
      rooms
        .flatMap((r) => r.facilities)
        .map((facility) => [facility._id, facility])
    ).values()
  );

  /* ============ File Helpers ============ */
  const validateFiles = (files: File[]): string | true => {
    for (const file of files) {
      if (!file.type.startsWith("image/")) return "Only image files are allowed";
      if (file.size > 5 * 1024 * 1024) return "Each image must be less than 5MB";
    }
    return true;
  };

  const addFiles = (incoming: File[]) => {
    const validation = validateFiles(incoming);
    if (validation !== true) {
      toast.error(validation);
      return;
    }
    const urls = incoming.map((f) => URL.createObjectURL(f));
    setNewFiles((prev) => [...prev, ...incoming]);
    setPreviews((prev) => [...prev, ...urls]);
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    previews.forEach((url) => URL.revokeObjectURL(url));
    setNewFiles([]);
    setPreviews([]);
  };

  /* ============ Submit ============ */
  const onSubmit = async (data: UpdateFormDataRoom) => {
    const formData = new FormData();
    formData.append("roomNumber", data.roomNumber);
    formData.append("price", data.price.toString());
    formData.append("discount", data.discount.toString());
    formData.append("capacity", data.capacity.toString());

    data.facilities.forEach((f) => formData.append("facilities[]", f));

    newFiles.forEach((file) => formData.append("imgs", file));

    const result = await updateRoomAction(room?._id!, formData);

    if (!result.success) {
      toast.error(result.message);
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([key, value]) => {
          if (key in data) {
            setError(key as keyof UpdateFormInput, {
              message: value.join(", "),
            });
          }
        });
      }
      return;
    }

    toast.success(result.message);
    clearAll();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-0 gap-0 border-[#E4E7E2] shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Header */}
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-[#EEF0EC] bg-gradient-to-b from-[#FAFBF9] to-white">
            <DialogTitle className="text-lg font-semibold text-[#1B1C1C] tracking-tight">
              Edit Room
            </DialogTitle>
            <DialogDescription className="text-sm text-[#666B65]">
              Update room details and click save.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 px-6 py-5">
            {/* Room Number */}
            <div className="space-y-1.5">
              <Label
                htmlFor="roomNumber"
                className="text-xs font-semibold uppercase tracking-wide text-[#4E604F]"
              >
                Room Number
              </Label>
              <Input
                id="roomNumber"
                {...register("roomNumber")}
                className={`h-10 rounded-xl border-[#E4E7E2] bg-white transition-colors focus-visible:border-[#4E604F] focus-visible:ring-2 focus-visible:ring-[#4E604F]/20 ${
                  errors.roomNumber ? "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/20" : ""
                }`}
              />
              {errors.roomNumber && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  {errors.roomNumber.message}
                </p>
              )}
            </div>

            {/* Price + Discount + Capacity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="price"
                  className="text-xs font-semibold uppercase tracking-wide text-[#4E604F]"
                >
                  Price
                </Label>
                <Input
                  id="price"
                  type="string"
                  {...register("price")}
                  className={`h-10 rounded-xl border-[#E4E7E2] bg-white transition-colors focus-visible:border-[#4E604F] focus-visible:ring-2 focus-visible:ring-[#4E604F]/20 ${
                    errors.price ? "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/20" : ""
                  }`}
                />
                {errors.price && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="discount"
                  className="text-xs font-semibold uppercase tracking-wide text-[#4E604F]"
                >
                  Discount
                </Label>
                <Input
                  id="discount"
                  type="string"
                  {...register("discount")}
                  className={`h-10 rounded-xl border-[#E4E7E2] bg-white transition-colors focus-visible:border-[#4E604F] focus-visible:ring-2 focus-visible:ring-[#4E604F]/20 ${
                    errors.discount ? "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/20" : ""
                  }`}
                />
                {errors.discount && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.discount.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="capacity"
                  className="text-xs font-semibold uppercase tracking-wide text-[#4E604F]"
                >
                  Capacity
                </Label>
                <Input
                  id="capacity"
                  type="string"
                  {...register("capacity")}
                  className={`h-10 rounded-xl border-[#E4E7E2] bg-white transition-colors focus-visible:border-[#4E604F] focus-visible:ring-2 focus-visible:ring-[#4E604F]/20 ${
                    errors.capacity ? "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/20" : ""
                  }`}
                />
                {errors.capacity && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.capacity.message}
                  </p>
                )}
              </div>
            </div>

            {/* Facilities */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wide text-[#4E604F]">
                Facilities
              </Label>
              <Controller
                control={control}
                name="facilities"
                render={({ field }) => {
                  const selected = (field.value ?? []) as string[];
                  return (
                    <div className="flex flex-wrap gap-2">
                      {allFacilities.length === 0 && (
                        <p className="text-xs text-[#8A9189] italic">
                          No facilities available.
                        </p>
                      )}
                      {allFacilities.map((f) => {
                        const isSelected = selected.includes(f._id);
                        return (
                          <button
                            key={f._id}
                            type="button"
                            onClick={() => {
                              const next = isSelected
                                ? selected.filter((id) => id !== f._id)
                                : [...selected, f._id];
                              field.onChange(next);
                            }}
                            className={`group inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 active:scale-95 ${
                              isSelected
                                ? "border-[#4E604F] bg-[#4E604F] text-white shadow-sm shadow-[#4E604F]/20"
                                : "border-[#E4E7E2] bg-white text-[#666B65] hover:border-[#4E604F]/40 hover:bg-[#F8F9F7] hover:text-[#4E604F]"
                            }`}
                          >
                            <span
                              className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border transition-all ${
                                isSelected
                                  ? "border-white bg-white"
                                  : "border-[#C4C9C2] group-hover:border-[#4E604F]"
                              }`}
                            >
                              {isSelected && (
                                <Check className="h-2.5 w-2.5 text-[#4E604F]" strokeWidth={3} />
                              )}
                            </span>
                            {f.name}
                          </button>
                        );
                      })}
                    </div>
                  );
                }}
              />
              {errors.facilities && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.facilities.message}
                </p>
              )}
            </div>

            {/* ============ Images Section ============ */}
            <div className="space-y-2 rounded-2xl border border-[#EEF0EC] bg-[#FAFBF9] p-4">
              <Label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#4E604F]">
                <ImagePlus className="h-3.5 w-3.5" />
                Update Images
                <span className="text-[10px] font-normal normal-case tracking-normal text-[#8A9189]">
                  (Optional)
                </span>
              </Label>

              {/* Current Images */}
              {room?.images && room.images.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#8A9189]">
                    Current · {room.images.length}
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {room.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-square overflow-hidden rounded-xl border border-[#E4E7E2] bg-white opacity-60 ring-1 ring-black/5"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img}
                          alt={`current-${i}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Drop Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const dropped = Array.from(e.dataTransfer.files).filter((f) =>
                    f.type.startsWith("image/")
                  );
                  if (dropped.length) addFiles(dropped);
                }}
                className={`group mt-1 cursor-pointer rounded-xl border-2 border-dashed p-5 text-center transition-all duration-200 ${
                  isDragging
                    ? "border-[#4E604F] bg-[#F0F3EE] scale-[1.01]"
                    : newFiles.length
                      ? "border-[#4E604F]/60 bg-white"
                      : "border-[#E4E7E2] bg-white hover:border-[#4E604F]/40 hover:bg-[#F8F9F7]"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const selected = Array.from(e.target.files || []);
                    if (selected.length) addFiles(selected);
                    e.target.value = "";
                  }}
                />
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F3EE] transition-transform group-hover:scale-105">
                  <UploadCloud className="h-5 w-5 text-[#4E604F]" />
                </div>
                <p className="mt-2.5 text-xs font-semibold text-[#1B1C1C]">
                  {newFiles.length
                    ? "Add more images"
                    : "Upload new images to replace current ones"}
                </p>
                <p className="mt-0.5 text-[10px] text-[#8A9189]">
                  Leave empty to keep existing images
                </p>
              </div>

              {/* New Files Previews */}
              {previews.length > 0 && (
                <div className="pt-1">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#4E604F]">
                      New · {previews.length}
                    </p>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="text-[10px] font-semibold text-red-500 hover:text-red-600 hover:underline transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {previews.map((src, i) => (
                      <div
                        key={i}
                        className="group relative aspect-square overflow-hidden rounded-xl border border-[#4E604F]/40 bg-white ring-1 ring-[#4E604F]/10"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`new-${i}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-red-500 hover:scale-110 group-hover:opacity-100 active:scale-95"
                          aria-label="Remove image"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 border-t border-[#EEF0EC] bg-[#FAFBF9] px-6 py-4 rounded-b-2xl">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  className="rounded-xl border-[#E4E7E2] hover:bg-white hover:border-[#4E604F]/40"
                >
                  Cancel
                </Button>
              }
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#4E604F] hover:bg-[#3F5040] shadow-sm shadow-[#4E604F]/20 transition-all active:scale-[0.98] min-w-[120px]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}