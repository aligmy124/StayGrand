"use client";

import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Trash2,
  UploadCloud,
  Hash,
  DollarSign,
  Percent,
  Users,
  Sparkles,
  ArrowLeft,
  ImagePlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createRoomSchema,
  type CreateFormInput,
  type CreateFormDataRoom,
} from "../schema/createRoom.schema";
import type { IFacility } from "../types/type.room";
import { createRoomAction } from "../actions/createActionRoom";

interface CreateRoomFormProps {
  allFacilities: IFacility[];
}

export function CreateRoomForm({ allFacilities }: CreateRoomFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateFormInput, any, CreateFormDataRoom>({
    resolver: zodResolver(createRoomSchema)
  });

  /* ============ File Validation ============ */
  const validateFiles = (files: File[]): string | true => {
    if (files.length === 0) return "Please upload at least one image";
    for (const file of files) {
      if (!file.type.startsWith("image/"))
        return "Only image files are allowed";
      if (file.size > 5 * 1024 * 1024)
        return "Each image must be less than 5MB";
    }
    return true;
  };

  const addFiles = (newFiles: File[]) => {
    const validation = validateFiles(newFiles);
    if (validation !== true) {
      toast.error(validation);
      return;
    }
    const urls = newFiles.map((f) => URL.createObjectURL(f));
    setFiles((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [...prev, ...urls]);
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    previews.forEach((url) => URL.revokeObjectURL(url));
    setFiles([]);
    setPreviews([]);
  };

  /* ============ Submit ============ */
  const onSubmit = async (data: CreateFormDataRoom) => {
    if (files.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("roomNumber", data.roomNumber);
    formData.append("price", data.price.toString());
    formData.append("discount", data.discount.toString());
    formData.append("capacity", data.capacity.toString());

    data.facilities.forEach((f) => formData.append("facilities[]", f));
    files.forEach((file) => formData.append("imgs", file));

    const result = await createRoomAction(formData);

    if (!result.success) {
      toast.error(result.message);
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, messages]) => {
          if (!messages?.length) return;

          setError(field as keyof CreateFormDataRoom, {
            type: "manual",
            message: messages.join(", "),
          });
        });
      }
      return;
    }

    toast.success(result.message);
    clearAll();
    router.push("/dashboard/rooms");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ============ Basic Info Section ============ */}
      <section className="rounded-2xl border border-[#E4E7E2] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-[#F4F6F2] pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F3EE]">
            <Sparkles className="h-4 w-4 text-[#4E604F]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#1B1C1C]">
              Basic Information
            </h2>
            <p className="text-xs text-[#8A9189]">
              Room number, price, and capacity details.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Room Number */}
          <div className="sm:col-span-2">
            <Label
              htmlFor="roomNumber"
              className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#303530]"
            >
              <Hash className="h-3.5 w-3.5 text-[#8A9189]" />
              Room Number
            </Label>
            <Input
              id="roomNumber"
              placeholder="e.g. 101"
              {...register("roomNumber")}
              className={`h-11 ${errors.roomNumber ? "border-red-500" : ""}`}
            />
            {errors.roomNumber && (
              <p className="mt-1 text-xs text-red-500">
                {errors.roomNumber.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <Label
              htmlFor="price"
              className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#303530]"
            >
              <DollarSign className="h-3.5 w-3.5 text-[#8A9189]" />
              Price
            </Label>
            <Input
              id="price"
              type="text"
              step="0.01"
              placeholder="0.00"
              {...register("price")}
              className={`h-11 ${errors.price ? "border-red-500" : ""}`}
            />
            {errors.price && (
              <p className="mt-1 text-xs text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Discount */}
          <div>
            <Label
              htmlFor="discount"
              className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#303530]"
            >
              <Percent className="h-3.5 w-3.5 text-[#8A9189]" />
              Discount
            </Label>
            <Input
              id="discount"
              type="text"
              placeholder="0"
              {...register("discount")}
              className={`h-11 ${errors.discount ? "border-red-500" : ""}`}
            />
            {errors.discount && (
              <p className="mt-1 text-xs text-red-500">
                {errors.discount.message}
              </p>
            )}
          </div>

          {/* Capacity */}
          <div className="sm:col-span-2">
            <Label
              htmlFor="capacity"
              className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#303530]"
            >
              <Users className="h-3.5 w-3.5 text-[#8A9189]" />
              Capacity
            </Label>
            <Input
              id="capacity"
              type="text"
              placeholder="1"
              {...register("capacity")}
              className={`h-11 ${errors.capacity ? "border-red-500" : ""}`}
            />
            {errors.capacity && (
              <p className="mt-1 text-xs text-red-500">
                {errors.capacity.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ============ Facilities Section ============ */}
      <section className="rounded-2xl border border-[#E4E7E2] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-[#F4F6F2] pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F3EE]">
            <Sparkles className="h-4 w-4 text-[#4E604F]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#1B1C1C]">Facilities</h2>
            <p className="text-xs text-[#8A9189]">
              Select the facilities available in this room.
            </p>
          </div>
        </div>

        <Controller
          control={control}
          name="facilities"
          render={({ field }) => {
            const selected = (field.value ?? []) as string[];
            return (
              <div className="flex flex-wrap gap-2">
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
          <p className="mt-3 text-xs text-red-500">
            {errors.facilities.message}
          </p>
        )}
      </section>

      {/* ============ Images Section ============ */}
      <section className="rounded-2xl border border-[#E4E7E2] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-[#F4F6F2] pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F3EE]">
            <ImagePlus className="h-4 w-4 text-[#4E604F]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#1B1C1C]">
              Room Images
            </h2>
            <p className="text-xs text-[#8A9189]">
              Upload up to 5MB per image. PNG, JPG, or WEBP.
            </p>
          </div>
        </div>

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
              f.type.startsWith("image/"),
            );
            if (dropped.length) addFiles(dropped);
          }}
          className={`group cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all ${
            isDragging
              ? "border-[#4E604F] bg-[#F0F3EE]"
              : files.length
                ? "border-[#4E604F]/60 bg-[#F8F9F7]"
                : "border-[#E4E7E2] bg-[#FAFBF9] hover:border-[#4E604F]/40 hover:bg-[#F8F9F7]"
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

          <div
            className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
              isDragging
                ? "bg-[#4E604F] text-white"
                : "bg-[#F0F3EE] text-[#4E604F] group-hover:bg-[#4E604F] group-hover:text-white"
            }`}
          >
            <UploadCloud className="h-5 w-5" />
          </div>

          <p className="mt-3 text-sm font-semibold text-[#1B1C1C]">
            {isDragging ? "Drop your images here" : "Drag & drop images here"}
          </p>
          <p className="mt-1 text-xs text-[#8A9189]">
            or{" "}
            <span className="font-medium text-[#4E604F] underline-offset-2 hover:underline">
              browse from your computer
            </span>
          </p>
        </div>

        {/* Previews */}
        {previews.length > 0 && (
          <div className="mt-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold text-[#1B1C1C]">
                Selected Images ({previews.length})
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-medium text-red-500 transition-colors hover:text-red-600 hover:underline"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {previews.map((src, i) => (
                <div
                  key={i}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-[#E4E7E2] bg-[#F4F6F2]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`preview-${i}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    aria-label="Remove image"
                    className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition-all hover:bg-red-500 group-hover:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {files.length === 0 && (
          <p className="mt-3 text-xs text-[#8A9189]">
            At least one image is required.
          </p>
        )}
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
              Create Room
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
