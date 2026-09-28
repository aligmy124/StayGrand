// import Container from "@/Shared/Components/Container";
// import { SingleRoomSkeleton } from "@/Shared/Components/SkeletonRoom";

// export default function Loading() {
//   return (
//     <Container className="py-6 md:py-8 lg:py-10">
//       <SingleRoomSkeleton />
//     </Container>
//   );
// }

import Container from "@/Shared/Components/Container";

export default function Loading() {
  return (
    <Container className="py-6 md:py-8 lg:py-10">
      <div className="space-y-6 animate-pulse">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-8 w-48 rounded-lg bg-gray-200" />
          <div className="h-4 w-72 max-w-full rounded bg-gray-100" />
        </div>

        {/* Content */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              {/* Image */}
              <div className="h-48 bg-gray-200" />

              {/* Content */}
              <div className="space-y-3 p-5">
                <div className="h-5 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-100" />
                <div className="h-4 w-2/3 rounded bg-gray-100" />

                <div className="flex items-center justify-between pt-2">
                  <div className="h-6 w-20 rounded bg-gray-200" />
                  <div className="h-9 w-24 rounded-lg bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

