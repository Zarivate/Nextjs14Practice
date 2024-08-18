import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPostsSkeleton = () => {
  return (
    <ul className="mt-5 grid grid-rows-1 md:grid md:grid-rows-1 md:max-w-full gap-4">
      <Skeleton className="h-56 w-full rounded-sm" />
      <div>Howdy</div>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </ul>
  );
};

export default LoadingPostsSkeleton;
