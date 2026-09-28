import AdsDetails from "@/features/admin/Ads/components/AdsDetails";
import { adsServiceId } from "@/features/admin/Ads/services/ads.service";
import { Suspense } from "react";

interface AdsIdPageProps {
  params: Promise<{ id: string }>;
}
async function AdsIdPage({ params }: AdsIdPageProps) {
  const { id } = await params;
  const ads = await adsServiceId(id);
  return <AdsDetails ads={ads.data.ads}/>;
}
export default function AdsId({ params }: AdsIdPageProps) {
  return (
    <Suspense fallback={<div></div>}>
      <AdsIdPage params={params} />
    </Suspense>
  );
}