"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import {
  deleteBookingAction,
  DeleteBookingState,
} from "../../actions/deleteAction";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId?: string;
}

const initialState: DeleteBookingState = { success: false };

export function DeleteDialog({ open, onOpenChange, bookingId }: DialogProps) {
  const [state, action, pending] = useActionState(
    deleteBookingAction.bind(null, bookingId!),
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      onOpenChange(false);
      router.refresh();
    }
  }, [state.success, onOpenChange, router]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Delete Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this booking? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>

          {state.message && !state.success && (
            <p className="text-sm text-red-500">{state.message}</p>
          )}

          <DialogFooter className="gap-2">
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={pending}>
                  Cancel
                </Button>
              }
            />
            <Button type="submit" variant="destructive" disabled={pending}>
              {pending ? "Deleting..." : "Delete Booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}