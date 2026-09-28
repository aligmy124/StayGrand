import { Suspense } from "react";
import type { Metadata } from "next";
import FavouriteContent from "@/features/portal/favorite/components/FavouriteContent";
import { getFavoriteRooms } from "@/features/portal/favorite/service/favourite.service";
import Container from "@/Shared/Components/Container";
import { SkeletonRoom } from "@/Shared/Components/SkeletonRoom";

/* ============ Metadata ============ */
export const metadata: Metadata = {
  title: "My Favorites",
  description:
    "Your saved rooms and favorite stays. Browse, compare, and book your favorite rooms anytime.",
  openGraph: {
    title: "My Favorites | StayGrand",
    description:
      "Your saved rooms and favorite stays. Browse, compare, and book your favorite rooms anytime.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "My Favorites | StayGrand",
    description: "Your saved rooms and favorite stays.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

/* ============ Data ============ */
async function FavouriteData() {
  const favourites = await getFavoriteRooms();

  return <FavouriteContent favourites={favourites} />;
}

/* ============ Page ============ */
export default function FavouritePage() {
  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-[#303530] sm:text-4xl">
          My Favorites
        </h1>

        <p className="mt-2 text-sm text-[#8A9189]">
          Rooms you&apos;ve saved for later.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <SkeletonRoom key={i} />
            ))}
          </div>
        }
      >
        <FavouriteData />
      </Suspense>
    </Container>
  );
}
