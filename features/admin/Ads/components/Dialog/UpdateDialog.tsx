import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ads } from "../../types/type.ads";
import { Controller, useForm } from "react-hook-form";
import {
  UpdateDataInput,
  UpdateFormDataAds,
  UpdateSchema,
} from "../../schema/updateAds.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { UpdateAdsActions } from "../../actions/updateAction";
import { toast } from "sonner";
import { Loader2, Megaphone, Percent, CheckCircle2, Check } from "lucide-react";

interface UpdateDialogAdsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ads: Ads | undefined;
}

export function UpdateDialogAds({
  isOpen,
  onOpenChange,
  ads,
}: UpdateDialogAdsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    control,
  } = useForm<UpdateDataInput, any, UpdateFormDataAds>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      discount: ads?.room?.discount,
      isActive: ads?.isActive,
    },
  });

  useEffect(() => {
    if (!ads) return;
    reset({
      discount: ads.room.discount,
      isActive: ads.isActive,
    });
  }, [ads, reset]);

  const onSubmit = async (data: UpdateFormDataAds) => {
    const result = await UpdateAdsActions(ads?._id!, data);
    if (!result?.success) {
      if (result?.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, error]) => {
          setError(field as keyof UpdateFormDataAds, {
            type: "manual",
            message: error?.[0],
          });
        });
      }
      return;
    }
    toast.success(result?.message || "The ad has been updated successfully");
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
<DialogContent className="sm:max-w-md rounded-2xl p-0 gap-0 border-[#E4E7E2] shadow-xl overflow-hidden">
  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
    {/* Header */}
    <DialogHeader className="px-6 pt-6 pb-4 border-b border-[#EEF0EC] bg-gradient-to-b from-[#FAFBF9] to-white">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F3EE]">
          <Megaphone className="h-5 w-5 text-[#4E604F]" />
        </div>
        <div className="min-w-0 flex-1 text-left">
          <DialogTitle className="text-lg font-semibold text-[#1B1C1C] tracking-tight">
            Edit Ad
          </DialogTitle>
          <DialogDescription className="text-sm text-[#666B65] mt-0.5">
            Update the discount and visibility of this ad.
          </DialogDescription>
        </div>
      </div>
    </DialogHeader>

    {/* Body */}
    <div className="px-6 py-5">
      <FieldGroup className="gap-5">
        {/* Discount */}
        <Field className="space-y-1.5">
          <Label
            htmlFor="discount"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#4E604F]"
          >
            <Percent className="h-3.5 w-3.5" />
            Discount
          </Label>
          <div className="relative">
            <input
              type="text"
              {...register("discount")}
              name="discount"
              id="discount"
              placeholder="e.g. 10"
              className={`h-10 w-full rounded-xl border bg-white px-3 pr-9 text-sm text-[#1B1C1C] outline-none transition-colors placeholder:text-[#A8AFA6]
                ${
                  errors.discount
                    ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                    : "border-[#E4E7E2] hover:border-[#C4C9C2] focus:border-[#4E604F] focus:ring-2 focus:ring-[#4E604F]/20"
                }`}
            />
            <Percent className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A8AFA6]" />
          </div>
          {errors.discount && (
            <p className="flex items-center gap-1 text-xs font-medium text-red-500">
              {errors.discount.message}
            </p>
          )}
        </Field>

        {/* isActive */}
        <Field className="space-y-1.5">
          <Label
            htmlFor="active"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#4E604F]"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Status
          </Label>
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-2">
                {/* Active option */}
                <button
                  type="button"
                  onClick={() => field.onChange(true)}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
                    field.value === true
                      ? "border-[#4E604F] bg-[#4E604F] text-white shadow-sm shadow-[#4E604F]/20"
                      : "border-[#E4E7E2] bg-white text-[#666B65] hover:border-[#4E604F]/40 hover:bg-[#F8F9F7] hover:text-[#4E604F]"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      field.value === true ? "bg-white" : "bg-[#4E604F]"
                    }`}
                  />
                  Active
                </button>

                {/* Inactive option */}
                <button
                  type="button"
                  onClick={() => field.onChange(false)}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
                    field.value === false
                      ? "border-[#4E604F] bg-[#4E604F] text-white shadow-sm shadow-[#4E604F]/20"
                      : "border-[#E4E7E2] bg-white text-[#666B65] hover:border-[#4E604F]/40 hover:bg-[#F8F9F7] hover:text-[#4E604F]"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      field.value === false ? "bg-white" : "bg-[#A8AFA6]"
                    }`}
                  />
                  Inactive
                </button>
              </div>
            )}
          />
          {errors.isActive && (
            <p className="flex items-center gap-1 text-xs font-medium text-red-500">
              {errors.isActive.message}
            </p>
          )}
        </Field>
      </FieldGroup>
    </div>

    {/* Footer */}
    <DialogFooter className="mt-2 gap-2 border-t border-[#EEF0EC] bg-gradient-to-b from-white to-[#FAFBF9] px-6 py-4 mb-2 sm:mb-0 sm:justify-end">
      <DialogClose
        render={
          <Button
            type="button"
            variant="outline"
            className="
              h-10 rounded-xl border-[#E4E7E2] bg-white px-4
              text-sm font-medium text-[#666B65]
              transition-all duration-200
              hover:border-[#C4C9C2] hover:bg-[#F8F9F7] hover:text-[#4E604F]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E604F]/20 focus-visible:ring-offset-1
              active:scale-[0.98]
            "
          >
            Cancel
          </Button>
        }
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="
          group relative h-10 min-w-[140px] overflow-hidden rounded-xl
          bg-[#4E604F] px-4
          text-sm font-semibold text-white
          shadow-sm shadow-[#4E604F]/25
          transition-all duration-200
          hover:bg-[#3F5040] hover:shadow-md hover:shadow-[#4E604F]/30
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E604F]/40 focus-visible:ring-offset-1
          active:scale-[0.98]
          disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#4E604F] disabled:hover:shadow-sm
        "
      >
        <span className="flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Check className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              <span>Save changes</span>
            </>
          )}
        </span>
      </Button>
    </DialogFooter>
  </form>
</DialogContent>
    </Dialog>
  );
}
