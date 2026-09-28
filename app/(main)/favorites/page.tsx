import FavouriteContent from "@/features/favorite/components/FavouriteContent";
import { getFavoriteRooms } from "@/features/favorite/service/favourite.service";
import Container from "@/Shared/Components/Container";
import { Suspense } from "react";
import { SkeletonRoom } from "@/Shared/Components/SkeletonRoom";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "StayGrand - Favorites",
  description: "StayGrand - Favorites",
};  

async function FavouriteData() {
  const favourites = await getFavoriteRooms();

  return <FavouriteContent favourites={favourites} />;
}

export default function FavouritePage() {
  return (
    <Container className="py-8">
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