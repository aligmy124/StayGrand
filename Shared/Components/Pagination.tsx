'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
}

export default function Pagination({ page, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l:number;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#4E604F]/10 pt-8 sm:flex-row">
      {/* Results Info */}
      <p className="text-sm text-[#434842]/60">
        Showing page <span className="font-semibold text-[#1B1C1C]">{page}</span> of{' '}
        <span className="font-semibold text-[#1B1C1C]">{totalPages}</span> pages
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1">
        {/* First Page */}
        <button
          onClick={() => changePage(1)}
          disabled={page === 1}
          className="hidden rounded-lg px-3 py-2 text-sm font-medium text-[#434842]/60 transition-all hover:bg-[#4E604F]/10 hover:text-[#4E604F] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#434842]/60 sm:inline-flex items-center gap-1"
          aria-label="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
          <span className="hidden md:inline">First</span>
        </button>

        {/* Previous */}
        <button
          onClick={() => changePage(page - 1)}
          disabled={page === 1}
          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[#434842]/60 transition-all hover:bg-[#4E604F]/10 hover:text-[#4E604F] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#434842]/60"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((item, index) => {
            if (item === '...') {
              return (
                <span
                  key={`dots-${index}`}
                  className="flex h-9 w-9 items-center justify-center text-sm text-[#434842]/40"
                >
                  …
                </span>
              );
            }

            const isActive = item === page;
            return (
              <button
                key={item}
                onClick={() => changePage(item as number)}
                className={`relative h-9 min-w-[36px] rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#4E604F] text-white shadow-md shadow-[#4E604F]/20'
                    : 'text-[#434842]/70 hover:bg-[#4E604F]/10 hover:text-[#4E604F]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Next */}
        <button
          onClick={() => changePage(page + 1)}
          disabled={page === totalPages}
          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[#434842]/60 transition-all hover:bg-[#4E604F]/10 hover:text-[#4E604F] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#434842]/60"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => changePage(totalPages)}
          disabled={page === totalPages}
          className="hidden rounded-lg px-3 py-2 text-sm font-medium text-[#434842]/60 transition-all hover:bg-[#4E604F]/10 hover:text-[#4E604F] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#434842]/60 sm:inline-flex items-center gap-1"
          aria-label="Last page"
        >
          <span className="hidden md:inline">Last</span>
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}