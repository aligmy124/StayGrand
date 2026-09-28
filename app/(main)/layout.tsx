import { Suspense } from "react";
import NavbarWrapper from "@/features/home/components/Navbar/NavbarWrapper";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<div className="h-16 sm:h-20" />}>
        <NavbarWrapper />
      </Suspense>

      {children}
    </>
  );
}