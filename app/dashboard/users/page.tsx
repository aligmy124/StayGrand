
import UsersHeader from "@/features/admin/users/components/UsersHeader";
import UsersTable from "@/features/admin/users/components/UsersTable";
import { getUsersService } from "@/features/admin/users/services/user.service";

import UsersTableSkeleton from "@/Shared/Components/admin/UsersTableSkeleton";
import Pagination from "@/Shared/Components/Pagination";
import { Suspense } from "react";

interface UsersPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
  }>;
}

async function UsersContent({ searchParams }: UsersPageProps) {
  const { page, size } = await searchParams;
  const pageNumber = Number(page);
  const currentPage =
    Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
  const sizeNumber = Number(size);
  const currentSize =
    Number.isInteger(sizeNumber) && sizeNumber > 0 ? sizeNumber : 10;

  const users = await getUsersService({ page: currentPage, size: currentSize });
  const totalCount = users?.data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / currentSize);

  return (
    <>
      <UsersHeader users={users.data.users} totalCount={totalCount} />
      <UsersTable users={users.data.users} />
      <Pagination page={currentPage} totalPages={totalPages} />
    </>
  );
}

export default function UsersPage({ searchParams }: UsersPageProps) {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={<UsersTableSkeleton/>}
      >
        <UsersContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}