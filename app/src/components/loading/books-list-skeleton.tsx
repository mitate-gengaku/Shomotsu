import { Skeleton } from "@/components/ui/skeleton";

export const BooksListSkeleton = () => (
  <div className="w-full lg:w-1/2 h-full mx-auto md:pb-12 relative space-y-8">
    <Skeleton className="w-64 h-6 lg:h-7" />

    <div className="w-full grid grid-cols-2 gap-4 md:hidden mb-8">
      {[...new Array(8)].map((_, i) => (
        <Skeleton key={i} className="h-64" />
      ))}
    </div>

    <div className="w-full hidden md:grid grid-cols-4 gap-4 pb-2 mb-8">
      {[...new Array(16)].map((_, i) => (
        <Skeleton key={i} className="h-64" />
      ))}
    </div>

    <div className="flex items-center justify-center gap-4">
      <Skeleton className="w-28 h-9" />
      <Skeleton className="w-28 h-9" />
    </div>
  </div>
);
