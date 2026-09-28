import type { Metadata } from "next";
import { Suspense } from "react";
import { getCurrentUser } from "@/features/Auth/user_Info/service/user.service";
import ProfileCard from "@/features/profile/components/ProfileCard";
import ProfileHeader from "@/features/profile/components/ProfileHeader";
import ProfileSkeleton from "@/features/profile/components/ProfileSkeleton";
/* ============ Metadata ============ */
export const metadata: Metadata = {
  title: "My Profile",
  description:
    "Manage your personal information, account details, and preferences.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "My Profile",
    description:
      "Manage your personal information, account details, and preferences.",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "My Profile",
    description: "Manage your personal information and account details.",
  },
};

/* ============ Data ============ */
async function ProfileContent() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-14 w-14 animate-pulse rounded-2xl bg-[#4E604F]/10" />
          <p className="text-sm text-[#8A9189]">Loading profile...</p>
        </div>
      </div>
    );
  }

  return <ProfileCard user={user} />;
}

/* ============ Page ============ */
export default function Profile() {
  return (
    <main className="min-h-screen bg-[#F7F8F5] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <ProfileHeader />

        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileContent />
        </Suspense>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#A0A69F]">
          Your account information is private and secure.
        </p>
      </div>
    </main>
  );
}