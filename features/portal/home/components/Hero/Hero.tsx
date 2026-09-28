import { Suspense } from "react";
import SearchInput from "../SearchInput/SearchInput";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-visible bg-[#eef1eb]">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top Right Glow */}
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#4E604F]/20 blur-3xl" />

        {/* Bottom Left Glow */}
        <div className="absolute -bottom-40 -left-40 h-[550px] w-[550px] rounded-full bg-[#434842]/15 blur-3xl" />

        {/* Center Soft Light */}
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50 blur-3xl" />

        {/* Subtle Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#4E604F_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.05]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="mb-7 flex items-center gap-3">
          <div className="h-px w-10 bg-[#4E604F]/40" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#4E604F]/80">
            Premium Collection
          </span>
          <div className="h-px w-10 bg-[#4E604F]/40" />
        </div>

        {/* Hero */}
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-[#434842] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Find Your{" "}
            <span className="relative inline-block text-[#4E604F]">
              Perfect Stay
              <span className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-[#4E604F]/50" />
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl px-2 text-base font-light leading-relaxed tracking-wide text-[#434842]/65 sm:text-lg md:text-xl lg:text-2xl">
            Discover exceptional hotels, beautiful rooms,
            <br className="hidden sm:block" />
            and unforgettable stays.
          </p>
        </div>

        {/* Search */}
        <div className="mt-12 w-full max-w-5xl px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="relative">
            {/* Search Glow */}
            <div className="absolute -inset-2 rounded-3xl bg-[#4E604F]/10 blur-2xl" />

            <div className="relative z-10 w-full">
             <Suspense fallback={<h3>loading</h3>}>
               <SearchInput />
             </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
