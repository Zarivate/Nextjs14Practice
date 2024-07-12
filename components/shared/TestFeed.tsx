import { fetchPosts, handleDeleteGeneral } from "@/app/api/posts/route";
import React, { Suspense, useState } from "react";
import Feed2 from "./Feed2";
import { TestPostInterface, TestPostInterface2, UserPost } from "@/constants";
import LoadingPostsSkeleton from "./LoadingPostsSkeleton";
import Feed from "./Feed";
import TestPostServerDelete from "./TestPostServerDelete";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to handle deleting posts, accepts the unique post id
export const handleDeleteTest = async (_id: string) => {
  // Make sure user wants to delete the post
  const confirmed = confirm("Are you sure you want to delete this?");

  if (confirmed) {
    try {
      await fetch(process.env.URL + "/api/posts", {
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
  const examplePosts = await fetchPosts("");
  console.log(examplePosts);
  console.log("Example Posts");

  return (
    <div>
      Hello
      {examplePosts.map((post) => (
        <>
          <div>{post._id}</div>
          <TestPostServerDelete idDelete={post._id} />
        </>
      ))}
    </div>
  );
}

export default TestFeed;
