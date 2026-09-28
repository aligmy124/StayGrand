"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles, ArrowLeft, Type } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createFacilitySchema,
  type CreateFacilityInput,
} from "../schema/createFacility.schema";
import { createFacilityAction } from "../actions/createAction";

export function CreateFacilityForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateFacilityInput>({
    resolver: zodResolver(createFacilitySchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (data: CreateFacilityInput) => {
    const formData = new FormData();
    formData.append("name", data.name);

    const result = await createFacilityAction(formData);

    if (!result.success) {
      toast.error(result.message);
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([key, value]) => {
          if (key in data) {
            setError(key as keyof CreateFacilityInput, {
              type: "manual",
              message: value.join(", "),
            });
          }
        });
      }
      return;
    }

    toast.success(result.message);
    router.push("/dashboard/facilities");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <section className="rounded-2xl border border-[#E4E7E2] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-[#F4F6F2] pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F3EE]">
            <Sparkles className="h-4 w-4 text-[#4E604F]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#1B1C1C]">
              Facility Information
            </h2>
            <p className="text-xs text-[#8A9189]">
              Give the new facility a clear and unique name.
            </p>
          </div>
        </div>

        <div>
          <Label
            htmlFor="name"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#303530]"
          >
            <Type className="h-3.5 w-3.5 text-[#8A9189]" />
            Facility Name
          </Label>
          <Input
            id="name"
            placeholder="e.g. WiFi, Pool, Air Conditioning"
            {...register("name")}
            className={`h-11 ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>
      </section>

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
              Create Facility
            </>
          )}
        </Button>
      </div>
    </form>
  );
}