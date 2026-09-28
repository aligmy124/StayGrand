import { Suspense } from "react";
import CardRoom from "@/features/portal/rooms/Components/explore/CardRoom";
import { SkeletonRoom } from "@/Shared/Components/SkeletonRoom";
import { getPortalAdsService } from "@/features/portal/Ads/services/ads.service";
import FeaturedCardAds from "./components/FeaturedCardAds";
import FeaturedAdsClient from "./components/FeaturedAdsClient";

// Server Component - لجلب البيانات
async function FetchAds() {
  const ads = await getPortalAdsService({
    size: 6,
  });
  return <FeaturedCardAds ads={ads.data.ads} />;
}

export default function FeaturedAds() {
  return (
    <div className="w-full px-4 py-8 md:px-6 md:py-12 lg:px-8 lg:py-16">
      {/* Header - Client Component للتفاعل */}
      <FeaturedAdsClient />

      {/* Hotel Grid with Suspense */}
      <Suspense fallback={<SkeletonRoom />}>
        <FetchAds/>
      </Suspense>
    </div>
  );
}
