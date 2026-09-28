"use client";

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
import { useActionState, useEffect } from "react";
import { deleteAction, DeleteRoomState } from "../../actions/deleteAction";

interface DeleteDialogAdsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  adsId: string | undefined;
}

const initialState: DeleteRoomState = {
  success: false,
};

export function DeleteDialogAds({
  isOpen,
  onOpenChange,
  adsId,
}: DeleteDialogAdsProps) {
  const [state, action, pending] = useActionState(
    deleteAction.bind(null, adsId!),
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      onOpenChange(false);
    }
  }, [state.success, onOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Delete Room</DialogTitle>

            <DialogDescription>
              Are you sure you want to delete this room? This action cannot be
              undone.
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
              {pending ? "Deleting..." : "Delete Room"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
