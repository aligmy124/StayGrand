import type { Metadata } from "next";
import { Suspense } from "react";
import PaymentPage from "@/features/portal/payment/components/MainPayment";
import PaymentSkeleton from "@/Shared/Components/PaymentSkeleton";

export const metadata: Metadata = {
  title: "Complete Payment",
  description:
    "Securely complete your booking payment. Your card details are encrypted and protected.",
  robots: {
    index: false,
    follow: false,
  },
};

interface Props {
  params: Promise<{ id: string }>;
}

async function PaymentContent({ params }: Props) {
  const { id } = await params;

  return <PaymentPage bookingId={id} />;
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<PaymentSkeleton />}>
      <PaymentContent params={params} />
    </Suspense>
  );
}
