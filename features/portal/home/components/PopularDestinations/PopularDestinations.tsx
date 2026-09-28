import Image from "next/image";
import Link from "next/link";
import { LocateIcon, Sparkles } from "lucide-react";

export default function PopularDestinations() {
  // Sample data - 5 destinations (1 كبير + 4 صغار)
  const destinations = [
    {
      id: 1,
      name: "Lake Como",
      location: "Italy",
      image: "/images/hero2.jpg",
      isMain: true, // الصورة الكبيرة
    },
    {
      id: 2,
      name: "Santorini",
      location: "Greece",
      image: "/images/hero2.jpg",
    },
    {
      id: 3,
      name: "Amalfi Coast",
      location: "Italy",
      image: "/images/hero2.jpg",
    },
    {
      id: 4,
      name: "Tokyo",
      location: "Japan",
      image: "/images/hero2.jpg",
    },

  ];

  // فصل الصورة الرئيسية عن الباقي
  const mainDestination = destinations.find((d) => d.isMain);
  const smallDestinations = destinations.filter((d) => !d.isMain);

  return (
    <div className="w-full px-4 py-8 md:px-6 md:py-12 lg:px-8 lg:py-16">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#4E604F]" />
          <h2 className="font-heading text-3xl font-bold text-[#1B1C1C] md:text-4xl lg:text-5xl">
            Popular Destinations
          </h2>
        </div>

        <Link
          href="/rooms"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[#4E604F] transition-all hover:text-[#3a4d3b] md:text-base"
        >
          <span>View All</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Grid: 1 كبير + 4 صغار */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-4">
        {/* الصورة الكبيرة - عمود واحد */}
        {mainDestination && (
          <Link
            href={`/destinations/${mainDestination.id}`}
            className="group relative col-span-1 row-span-2 overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl md:col-span-3"
          >
            <div className="relative aspect-[4/3] h-full w-full md:aspect-auto md:min-h-[400px]">
              <Image
                src={mainDestination.image}
                alt={mainDestination.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Content on image */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                  {mainDestination.name}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80 md:text-base">
                  <LocateIcon className="h-4 w-4" />
                  <span>{mainDestination.location}</span>
                </p>
                <button className="mt-3 rounded-lg bg-white/20 px-6 py-2 text-sm font-medium backdrop-blur-sm transition-all hover:bg-white/30 md:text-base">
                  Explore
                </button>
              </div>
            </div>
          </Link>
        )}

        {/* 4 صور صغيرة - 2 × 2 */}
        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          {smallDestinations.map((destination, index) => (
            <Link
              key={destination.id}
              href={`/destinations/${destination.id}`}
              className={`group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl ${
                index === 2 ? "col-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 2 ? "aspect-[2/1]" : "aspect-square"
                }`}
              >
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes={
                    index === 2
                      ? "(max-width: 768px) 100vw, 40vw"
                      : "(max-width: 768px) 50vw, 20vw"
                  }
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="p-3 text-center">
                <h3 className="text-sm font-semibold text-[#1B1C1C] transition-colors group-hover:text-[#4E604F] md:text-base">
                  {destination.name}
                </h3>

                <p className="mt-0.5 flex items-center justify-center gap-1 text-xs text-[#434842]/60 md:text-sm">
                  <LocateIcon className="h-3 w-3" />
                  <span>{destination.location}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
