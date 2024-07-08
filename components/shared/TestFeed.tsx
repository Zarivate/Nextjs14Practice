import { fetchPosts, handleDeleteGeneral } from "@/app/api/posts/route";
import React, { Suspense, useState } from "react";
import Feed2 from "./Feed2";
import { TestPostInterface, UserPost } from "@/constants";
import LoadingPostsSkeleton from "./LoadingPostsSkeleton";

// Function to handle deleting posts, accepts the unique post id
export const handleDeleteFeed = async (_id: string) => {
  // Make sure user wants to delete the post
  const confirmed = confirm("Are you sure you want to delete this?");

  // If user is sure, make a call to delete
  if (confirmed) {
    try {
      await fetch("/api/posts", {
        method: "DELETE",
        body: JSON.stringify({
          _id: _id,
        }),
      });

      return _id;
    } catch (error) {
      console.log(error);
    }
  }
};

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
