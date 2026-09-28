import type { Metadata } from "next";
import { Suspense } from "react";
import UsersHeader from "@/features/admin/users/components/UsersHeader";
import UsersTable from "@/features/admin/users/components/UsersTable";
import { getUsersService } from "@/features/admin/users/services/user.service";
import UsersTableSkeleton from "@/Shared/Components/admin/UsersTableSkeleton";
import Pagination from "@/Shared/Components/Pagination";

/* ============ Metadata ============ */
export const metadata: Metadata = {
  title: "Users Management",
  description:
    "Browse all registered users, their roles, and verification status.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Users Management",
    description:
      "Browse all registered users, their roles, and verification status.",
    type: "website",
  },
};

/* ============ Types ============ */
interface UsersPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
  }>;
}

/* ============ Data ============ */
async function UsersContent({ searchParams }: UsersPageProps) {
  const { page, size } = await searchParams;

  const pageNumber = Number(page);
  const sizeNumber = Number(size);

  const currentPage =
    Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;

  const currentSize =
    Number.isInteger(sizeNumber) && sizeNumber > 0 && sizeNumber <= 100
      ? sizeNumber
      : 10;

  const users = await getUsersService({
    page: currentPage,
    size: currentSize,
  });

  const totalCount = users?.data?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / currentSize));

  return (
    <>
      <UsersHeader users={users.data.users} totalCount={totalCount} />
      <UsersTable users={users.data.users} />
      {totalPages > 1 && (
        <Pagination page={currentPage} totalPages={totalPages} />
      )}
    </>
  );
}

/* ============ Page ============ */
export default function UsersPage({ searchParams }: UsersPageProps) {
  return (
    <div className="space-y-6">
      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}