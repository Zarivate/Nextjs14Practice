import { fetchPosts, handleDeleteGeneral } from "@/app/api/posts/route";
import React, { Suspense, useState } from "react";
import Feed2 from "./Feed2";
import { TestPostInterface, UserPost } from "@/constants";
import LoadingPostsSkeleton from "./LoadingPostsSkeleton";

async function TestFeed() {
  const allPosts = await fetchPosts();
  const homePosts = allPosts.filter(
    (datasnip: UserPost) => datasnip.allowHome == true
  );

  return (
    <div>
      <Suspense fallback={<LoadingPostsSkeleton />}>
        <Feed2 posts={homePosts} />
      </Suspense>
    </div>
  );
}

export default TestFeed;
