import { fetchPosts, handleDeleteGeneral } from "@/app/api/posts/route";
import React, { Suspense, useState } from "react";
import Feed2 from "./Feed2";
import { TestPostInterface, UserPost } from "@/constants";
import LoadingPostsSkeleton from "./LoadingPostsSkeleton";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to handle deleting posts, accepts the unique post id
export const handleDeleteTest = async (_id: string) => {
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
  const allPosts = await fetchPosts("home");
  console.log(allPosts);

  return (
    <div>
      <Feed2 posts={allPosts} />
    </div>
  );
}

export default TestFeed;
