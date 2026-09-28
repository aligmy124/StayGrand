"use client";

import { useEffect, useRef, useState } from "react";
import { Trash2, UploadCloud, ImagePlus } from "lucide-react";
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

    // ✅ الـ facilities المختارة بس
    data.facilities.forEach((f) => formData.append("facilities[]", f));

    // ✅ الصور الجديدة بس — لو مفيش، مش بنبعت حقل imgs خالص
    newFiles.forEach((file) => formData.append("imgs", file));

    const result = await updateRoomAction(room?._id!, formData);

    if (!result.success) {
      toast.error(result.message);
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([key, value]) => {
          // ✅ تحقق إن الـ key موجود في الـ form قبل setError
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
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Room</DialogTitle>
            <DialogDescription>
              Update room details and click save.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Room Number */}
            <div>
              <Label htmlFor="roomNumber">Room Number</Label>
              <Input id="roomNumber" {...register("roomNumber")} />
              {errors.roomNumber && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.roomNumber.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="string" {...register("price")} />
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Discount */}
            <div>
              <Label htmlFor="discount">Discount</Label>
              <Input id="discount" type="string" {...register("discount")} />
              {errors.discount && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.discount.message}
                </p>
              )}
            </div>

            {/* Capacity */}
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input id="capacity" type="string" {...register("capacity")} />
              {errors.capacity && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.capacity.message}
                </p>
              )}
            </div>

            {/* Facilities */}
            <div>
              <Label>Facilities</Label>
              <Controller
                control={control}
                name="facilities"
                render={({ field }) => {
                  const selected = (field.value ?? []) as string[];
                  return (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {allFacilities.length === 0 && (
                        <p className="text-xs text-[#8A9189]">
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
                            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                              isSelected
                                ? "border-[#4E604F] bg-[#F0F3EE] text-[#4E604F] shadow-sm"
                                : "border-[#E4E7E2] bg-white text-[#666B65] hover:border-[#4E604F]/40 hover:bg-[#F8F9F7]"
                            }`}
                          >
                            <span
                              className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border transition-colors ${
                                isSelected
                                  ? "border-[#4E604F] bg-[#4E604F]"
                                  : "border-[#C4C9C2]"
                              }`}
                            >
                              {isSelected && (
                                <span className="h-1.5 w-1.5 rounded-full bg-white" />
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
                <p className="mt-2 text-xs text-red-500">
                  {errors.facilities.message}
                </p>
              )}
            </div>

            {/* ============ Images Section ============ */}
            <div>
              <Label className="flex items-center gap-1.5">
                <ImagePlus className="h-3.5 w-3.5 text-[#8A9189]" />
                Update Images
                <span className="text-[10px] font-normal text-[#8A9189]">
                  (Optional)
                </span>
              </Label>

              {/* Current Images (preview بس، مش بتتبعت) */}
              {room?.images && room.images.length > 0 && (
                <div className="mt-2">
                  <p className="mb-1.5 text-[10px] text-[#8A9189]">
                    Current images ({room.images.length})
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {room.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-square overflow-hidden rounded-lg border border-[#E4E7E2] opacity-60"
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
                className={`mt-2 cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-all ${
                  isDragging
                    ? "border-[#4E604F] bg-[#F0F3EE]"
                    : newFiles.length
                      ? "border-[#4E604F]/60 bg-[#F8F9F7]"
                      : "border-[#E4E7E2] bg-[#FAFBF9] hover:border-[#4E604F]/40"
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
                <UploadCloud className="mx-auto h-5 w-5 text-[#4E604F]" />
                <p className="mt-2 text-xs font-medium text-[#1B1C1C]">
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
                <div className="mt-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[10px] font-semibold text-[#1B1C1C]">
                      New Images ({previews.length})
                    </p>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="text-[10px] font-medium text-red-500 hover:underline"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {previews.map((src, i) => (
                      <div
                        key={i}
                        className="group relative aspect-square overflow-hidden rounded-lg border border-[#4E604F]/40"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`new-${i}`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100"
                        >
                          <Trash2 className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              }
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
