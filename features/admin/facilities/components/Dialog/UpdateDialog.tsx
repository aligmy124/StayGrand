"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Type } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  updateFacilitySchema,
  type UpdateFacilityInput,
} from "../../schema/updateFacility.schema";
import { updateFacilityAction } from "../../actions/updateAction";
import type { IFacility } from "../../types/type.facility";

interface IUpdateFacility {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facility: IFacility | undefined;
}

export function UpdateDialog({
  open,
  onOpenChange,
  facility,
}: IUpdateFacility) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<UpdateFacilityInput>({
    resolver: zodResolver(updateFacilitySchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (!facility) return;
    reset({ name: facility.name });
  }, [facility, reset]);

  const onSubmit = async (data: UpdateFacilityInput) => {
    const formData = new FormData();
    formData.append("name", data.name);

    const result = await updateFacilityAction(facility?._id!, formData);

    if (!result.success) {
      toast.error(result.message);
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([key, value]) => {
          if (key in data) {
            setError(key as keyof UpdateFacilityInput, {
              message: value.join(", "),
            });
          }
        });
      }
      return;
    }

    toast.success(result.message);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Facility</DialogTitle>
            <DialogDescription>
              Update the facility name and click save.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label
              htmlFor="name"
              className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#303530]"
            >
              <Type className="h-3.5 w-3.5 text-[#8A9189]" />
              Facility Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. WiFi, Pool"
              {...register("name")}
              className={`h-11 ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              }
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#4E604F] hover:bg-[#3F4F40]"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}