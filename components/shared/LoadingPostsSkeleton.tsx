import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPostsSkeleton = () => {
  return (
    <ul className="post-holder">
      <Skeleton className="skeleton-post" />
      <Skeleton className="skeleton-post" />
      <Skeleton className="skeleton-post" />
      <Skeleton className="skeleton-post" />
    </ul>
  );
};

export default LoadingPostsSkeleton;
