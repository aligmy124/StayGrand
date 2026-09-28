"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, CreditCard, Loader2, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import PaymentForm from "./PaymentForm";
import Confirmation from "./Confirmation";
import { payBookingAction } from "../actions/payAction";
import { CardData } from "../types/payment.type";
export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id as string;

  // roomId
  const[roomId, setRoomId]= useState<string | null>(null);

  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

  const [card, setCard] = useState<CardData>({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  /* ============ Validation ============ */
  const isValid =
    card.cardNumber.length >= 16 &&
    card.expiry.length >= 4 &&
    card.cvc.length >= 3;

  /* ============ Submit ============ */
  const handlePay = async () => {
    if (!isValid) {
      toast.error("Please enter valid card details");
      return;
    }

    if (!bookingId) {
      toast.error("Booking ID missing");
      return;
    }

    try {
      setLoading(true);

      const result = await payBookingAction(bookingId, "tok_visa");

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      setStep(2);
      setRoomId(result.data.booking.room);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-start justify-center bg-[#FAFBF9] px-4 py-10 sm:py-16">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-[#E4E7E2] bg-white shadow-sm">
          {/* ============ Header ============ */}
          {step === 1 && (
            <div className="border-b border-[#F0F2EE] bg-gradient-to-br from-[#F8F9F7] to-[#F0F3EE] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#4E604F] text-white shadow-sm">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg font-bold tracking-tight text-[#1B1C1C] sm:text-xl">
                    Complete payment
                  </h1>
                  <p className="mt-0.5 text-xs text-[#8A9189]">
                    Enter your card details to confirm the booking.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ============ Body ============ */}
          <div className="p-6">
            {step === 1 ? (
              <PaymentForm data={card} onChange={setCard} />
            ) : (
              <Confirmation roomId={roomId}/>
            )}
          </div>

          {/* ============ Actions ============ */}
          {step === 1 && (
            <div className="flex flex-col-reverse items-stretch gap-3 border-t border-[#F0F2EE] bg-[#FAFBF9] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
                disabled={loading}
                className="h-11 gap-2 text-[#666B65] hover:bg-[#F4F6F2] hover:text-[#4E604F]"
              >
                <ArrowLeft className="h-4 w-4" />
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handlePay}
                disabled={loading || !isValid}
                className="h-11 gap-2 bg-[#4E604F] px-6 text-sm font-semibold text-white hover:bg-[#3F4F40] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <LockKeyhole className="h-4 w-4" />
                    Pay Now
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* ============ Trust footer ============ */}
        {step === 1 && (
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#8A9189]">
            <LockKeyhole className="h-3 w-3" />
            Secure checkout · Your data is encrypted
          </p>
        )}
      </div>
    </section>
  );
}