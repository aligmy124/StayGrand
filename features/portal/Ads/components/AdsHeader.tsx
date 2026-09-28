import { Megaphone } from "lucide-react";

interface AdsHeaderProps {
  totalCount?: number;
}

export default function AdsHeader({ totalCount = 0 }: AdsHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4E604F] text-white shadow-sm">
          <Megaphone className="h-5 w-5" aria-hidden="true" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#303530] sm:text-3xl">
              Special Offers
            </h1>

            {totalCount > 0 && (
              <span className="inline-flex items-center rounded-full bg-[#F0F3EE] px-2.5 py-1 text-xs font-semibold text-[#4E604F]">
                {totalCount} deals
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-[#8A9189]">
            Discover exclusive deals and promotions on selected rooms.
          </p>
        </div>
      </div>
    </header>
  );
}