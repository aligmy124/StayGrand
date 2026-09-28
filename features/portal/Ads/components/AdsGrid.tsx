import { Sparkles } from "lucide-react";
import type { IAds } from "../types/ads.type";
import AdCard from "./AdCard";

interface AdsGridProps {
  ads: IAds[];
}

export default function AdsGrid({ ads }: AdsGridProps) {
  if (!ads || ads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E4E7E2] bg-white py-16">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0F3EE]">
          <Sparkles className="h-6 w-6 text-[#4E604F]" />
        </div>

        <h3 className="mt-4 text-base font-semibold text-[#1B1C1C]">
          No ads available
        </h3>

        <p className="mt-1 text-sm text-[#8A9189]">
          Check back soon for new deals and promotions.
        </p>
      </div>
    );
  }

  return (
    <section
      aria-label="Ads list"
      className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3"
    >
      {ads.map((ad) => (
        <AdCard key={ad._id} ad={ad} />
      ))}
    </section>
  );
}
