import Link from "next/link";
import { Compass, Heart, ArrowRight } from "lucide-react";

const ACTIONS = [
  {
    href: "/rooms",
    icon: Compass,
    title: "Explore Rooms",
    description: "Discover your next stay",
  },
  {
    href: "/portal/favourites",
    icon: Heart,
    title: "Favorites",
    description: "View your saved rooms",
  },
];

export default function QuickActions() {
  return (
    <section className="mt-8" aria-labelledby="quick-actions-heading">
      <div className="mb-4">
        <h3
          id="quick-actions-heading"
          className="text-base font-semibold text-[#303530]"
        >
          Quick Actions
        </h3>

        <p className="mt-1 text-sm text-[#8A9189]">
          Quickly access your favorite sections.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {ACTIONS.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="group flex items-center justify-between rounded-2xl border border-[#E5E8E2] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4E604F]/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E604F]/30 focus-visible:ring-offset-2"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F1F4EF]">
                  <Icon
                    className="h-5 w-5 text-[#4E604F]"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#303530]">
                    {action.title}
                  </p>

                  <p className="mt-0.5 text-xs text-[#8A9189]">
                    {action.description}
                  </p>
                </div>
              </div>

              <ArrowRight
                className="h-4 w-4 text-[#A0A69F] transition-transform group-hover:translate-x-1 group-hover:text-[#4E604F]"
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}