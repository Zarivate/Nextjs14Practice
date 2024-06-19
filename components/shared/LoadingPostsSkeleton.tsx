import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPostsSkeleton = () => {
  return (
    <div className="flex items-start justify-between h-56 grid grid-cols-2 gap-4 content-start mt-5">
      <Skeleton className="skeleton-post" />
      <Skeleton className="skeleton-post" />
      <Skeleton className="skeleton-post" />
      <Skeleton className="skeleton-post" />
    </div>
  );
};

export default LoadingPostsSkeleton;
