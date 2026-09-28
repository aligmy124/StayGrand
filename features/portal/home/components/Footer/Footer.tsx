import Link from "next/link";
import { Mail, Phone, MapPin, Clock3, ArrowUpRight } from "lucide-react";

export default async function Footer() {
  "use cache";

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-[#4E604F]/10 bg-[#f5f7f3]">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#4E604F]/[0.06] blur-3xl" />

      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4E604F]/30 to-transparent" />

      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            NEWSLETTER / CTA
        ========================================================= */}
        <section className="border-b border-[#4E604F]/10 py-10 sm:py-12 lg:py-14">
          <div className="relative overflow-hidden rounded-[28px] bg-[#4E604F] px-5 py-7 shadow-[0_20px_60px_-25px_rgba(78,96,79,0.45)] sm:px-8 sm:py-9 lg:px-10">
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/[0.08] blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-white/[0.06] blur-2xl" />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                  Stay in the loop
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Discover better stays.
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-white/65">
                  Get exclusive offers, inspiring destinations, and special
                  deals delivered straight to your inbox.
                </p>
              </div>

              <form className="w-full max-w-md">
                <div className="flex flex-col gap-2 rounded-2xl bg-white/10 p-2 backdrop-blur-md sm:flex-row">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    aria-label="Email address"
                    className="h-11 min-w-0 flex-1 rounded-xl border border-white/10 bg-white px-4 text-sm text-[#1B1C1C] outline-none placeholder:text-[#434842]/45 transition focus:border-white focus:ring-2 focus:ring-white/20"
                  />

                  <button
                    type="submit"
                    className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#4E604F] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
                  >
                    Subscribe
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>

                <p className="mt-2 px-1 text-[10px] text-white/45">
                  No spam. Just useful travel inspiration and exclusive deals.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* =========================================================
            MAIN FOOTER
        ========================================================= */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1.3fr] lg:gap-12 lg:py-14">
          {/* Brand */}
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-[14px] bg-[#4E604F] shadow-lg shadow-[#4E604F]/20 transition-transform duration-300 group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />

                <span className="relative text-xl font-bold text-white">S</span>
              </div>

              <div className="leading-none">
                <span className="text-xl font-bold tracking-tight text-[#1B1C1C]">
                  Stay
                </span>
                <span className="text-xl font-bold tracking-tight text-[#4E604F]">
                  Cation
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-[#434842]/65">
              Discover exceptional rooms, beautiful destinations, and
              unforgettable stays. Your next getaway starts here.
            </p>

            {/* Quick actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/rooms"
                className="group inline-flex items-center gap-2 rounded-xl border border-[#4E604F]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#4E604F] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4E604F]/30 hover:shadow-md"
              >
                Explore Rooms
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/portal/ads"
                className="group inline-flex items-center gap-2 rounded-xl border border-[#4E604F]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#4E604F] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4E604F]/30 hover:shadow-md"
              >
                Special Deals
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#434842]/55">
              Get in touch
            </p>

            <div className="space-y-3">
              <ContactItem
                icon={MapPin}
                label="Location"
                value="Al-Adwa, El Minya, Egypt"
              />

              <ContactItem
                icon={Phone}
                label="Phone"
                value="+20 112 850 6793"
                href="tel:+201128506793"
              />

              <ContactItem
                icon={Mail}
                label="Email"
                value="hg619043@gmail.com"
                href="mailto:hg619043@gmail.com"
              />

              <ContactItem
                icon={Clock3}
                label="Support"
                value="Available 24/7"
              />
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM BAR
        ========================================================= */}
        <div className="flex flex-col gap-3 border-t border-[#4E604F]/10 py-7 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[#434842]/50">
            © {currentYear} StayCation. All rights reserved.
          </p>

          <p className="text-xs text-[#434842]/50">
            Built with care for travelers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   CONTACT ITEM
========================================================= */
function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4E604F]/[0.07]">
        <Icon className="h-4 w-4 text-[#4E604F]" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#434842]/35">
          {label}
        </p>

        <p className="mt-0.5 break-words text-xs leading-5 text-[#434842]/70">
          {value}
        </p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="group flex items-start gap-3 rounded-xl p-1.5 -ml-1.5 transition-colors hover:bg-[#4E604F]/[0.035]"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-xl p-1.5 -ml-1.5">
      {content}
    </div>
  );
}