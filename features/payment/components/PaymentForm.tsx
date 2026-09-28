"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, LockKeyhole } from "lucide-react";
import { CardData } from "../types/payment.type";

interface PaymentFormProps {
  data: CardData;
  onChange: (data: CardData) => void;
}

export default function PaymentForm({ data, onChange }: PaymentFormProps) {
  /* ============ Formatting ============ */
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  return (
    <div className="space-y-5">
      {/* Card Number */}
      <div>
        <Label htmlFor="cardNumber" className="text-xs font-semibold">
          Card number <span className="text-red-500">*</span>
        </Label>
        <div className="relative mt-1">
          <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A9189]" />
          <Input
            id="cardNumber"
            value={formatCardNumber(data.cardNumber)}
            onChange={(e) =>
              onChange({
                ...data,
                cardNumber: e.target.value.replace(/\D/g, ""),
              })
            }
            placeholder="4242 4242 4242 4242"
            inputMode="numeric"
            autoComplete="cc-number"
            className="h-12 pl-10 text-base tracking-wide"
          />
        </div>
      </div>

      {/* Expiry + CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiry" className="text-xs font-semibold">
            Expiry <span className="text-red-500">*</span>
          </Label>
          <Input
            id="expiry"
            value={formatExpiry(data.expiry)}
            onChange={(e) =>
              onChange({
                ...data,
                expiry: e.target.value.replace(/\D/g, ""),
              })
            }
            placeholder="MM/YY"
            inputMode="numeric"
            autoComplete="cc-exp"
            className="mt-1 h-12 text-base"
          />
        </div>
        <div>
          <Label htmlFor="cvc" className="text-xs font-semibold">
            CVC <span className="text-red-500">*</span>
          </Label>
          <Input
            id="cvc"
            value={data.cvc}
            onChange={(e) =>
              onChange({
                ...data,
                cvc: e.target.value.replace(/\D/g, "").slice(0, 4),
              })
            }
            placeholder="123"
            inputMode="numeric"
            autoComplete="cc-csc"
            className="mt-1 h-12 text-base"
          />
        </div>
      </div>

      {/* Demo hint */}
      <div className="flex items-start gap-2 rounded-xl border border-dashed border-[#E4E7E2] bg-[#FAFBF9] px-3 py-3 text-[11px] text-[#8A9189]">
        <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>
          Demo checkout — use <strong className="text-[#303530]">4242 4242 4242 4242</strong>{" "}
          with any future date and any CVC.
        </span>
      </div>
    </div>
  );
}