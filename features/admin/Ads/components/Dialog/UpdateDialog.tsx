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
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="discount">Discount</Label>
              <input
                className="rounded border-none border-zinc-300 focus:border-green-500 focus:ring-green-500"
                type="text"
                {...register("discount")}
                name="discount"
                id="discount"
                placeholder="enter discount"
              />
              {errors.discount && (
                <p className="text-red-500 text-sm">
                  {errors.discount.message}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor="active">isActive</Label>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value ? "true" : "false"}
                    onChange={(e) => field.onChange(e.target.value === "true")}
                    className="w-full px-3 py-2 rounded border border-zinc-300 focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                )}
              />
              {errors.isActive && (
                <p className="text-red-500 text-sm">
                  {errors.isActive.message}
                </p>
              )}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
