import Link from "next/link";
import { Mail, Phone, MapPin, Clock3, ArrowUpRight } from "lucide-react";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Careers", href: "/careers" },
  { name: "Press", href: "/press" },
];

const supportLinks = [
  { name: "Help Center", href: "/help" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: FaFacebook,
  },
  {
    name: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    name: "Youtube",
    href: "#",
    icon: FaYoutube,
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: FaLinkedin,
  },
];

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
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/[0.08] blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-white/[0.06] blur-2xl" />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              {/* Text */}
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

              {/* Newsletter */}
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

        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_0.8fr_1.3fr] lg:gap-12 lg:py-14">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
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

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="group flex h-9 w-9 items-center justify-center rounded-xl border border-[#4E604F]/10 bg-white/70 text-[#434842]/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#4E604F]/20 hover:bg-[#4E604F] hover:text-white hover:shadow-md"
                  >
                    <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <FooterColumn title="Explore">
            {quickLinks.map((link) => (
              <FooterLink key={link.name} href={link.href}>
                {link.name}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Support */}
          <FooterColumn title="Support">
            {supportLinks.map((link) => (
              <FooterLink key={link.name} href={link.href}>
                {link.name}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Contact */}
          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#434842]/55">
              Contact
            </p>

            <div className="space-y-3">
              <ContactItem
                icon={MapPin}
                label="Location"
                value="123 Luxury Street, New York, NY 10001"
              />

              <ContactItem
                icon={Phone}
                label="Phone"
                value="+1 (234) 567-890"
                href="tel:+1234567890"
              />

              <ContactItem
                icon={Mail}
                label="Email"
                value="info@staycation.com"
                href="mailto:info@staycation.com"
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

        <div className="flex flex-col gap-5 border-t border-[#4E604F]/10 py-7 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[#434842]/50">
            © {currentYear} StayCation. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/privacy"
              className="text-xs text-[#434842]/50 transition-colors hover:text-[#4E604F]"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-xs text-[#434842]/50 transition-colors hover:text-[#4E604F]"
            >
              Terms
            </Link>

            <Link
              href="/cookies"
              className="text-xs text-[#434842]/50 transition-colors hover:text-[#4E604F]"
            >
              Cookies
            </Link>

            <span className="hidden h-3 w-px bg-[#4E604F]/15 sm:block" />

            <label className="flex items-center gap-2 text-xs text-[#434842]/50">
              <span aria-hidden="true">🌐</span>

              <select
                defaultValue="en"
                aria-label="Language"
                className="cursor-pointer bg-transparent text-xs text-[#434842]/60 outline-none transition-colors hover:text-[#4E604F]"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#434842]/55">
        {title}
      </p>

      <nav className="flex flex-col items-start gap-3">{children}</nav>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm text-[#434842]/65 transition-all duration-200 hover:translate-x-1 hover:text-[#4E604F]"
    >
      <span>{children}</span>

      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
    </Link>
  );
}

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
