export default function PaymentSkeleton() {
  return (
    <section className="flex min-h-screen items-start justify-center bg-[#FAFBF9] px-4 py-10 sm:py-16">
      <div className="w-full max-w-md">
        <div className="animate-pulse overflow-hidden rounded-2xl border border-[#E4E7E2] bg-white shadow-sm">
          <div className="h-24 bg-[#F0F3EE]" />

          <div className="space-y-5 p-6">
            <div className="h-12 rounded-xl bg-[#F0F3EE]" />
            <div className="h-12 rounded-xl bg-[#F0F3EE]" />
            <div className="h-12 rounded-xl bg-[#F0F3EE]" />
          </div>

          <div className="h-20 border-t border-[#F0F2EE] bg-[#FAFBF9]" />
        </div>
      </div>
    </section>
  );
}