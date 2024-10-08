import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingProfileSkeleton = () => {
  return (
    <>
      <div className="mt-5 flex mb-10">
        <Skeleton className="md:w-3/4 md:h-24 mx-auto my-auto" />
      </div>
      <Skeleton className="profile-balance md:h-40" />
      <Skeleton className="mx-auto my-auto md:w-24 md:h-10 mt-10 mb-10" />
      <ul className="post-holder">
        <Skeleton className="skeleton-post" />
        <Skeleton className="skeleton-post" />
        <Skeleton className="skeleton-post" />
        <Skeleton className="skeleton-post" />
      </ul>
      <Skeleton className="mx-auto my-auto md:w-1/2 md:h-10 mt-10" />
      <Skeleton className="mx-auto my-auto md:w-full md:h-12 mt-2 mb-4" />
      <Skeleton className="mx-auto my-auto md:w-full md:h-16 mt-2 mb-6" />
      <Skeleton className="mx-auto my-auto h-[50px] w-full md:h-[54px] rounded-full py-4 px-6" />
    </>
  );
};

export default LoadingProfileSkeleton;
