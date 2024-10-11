import React from "react";
import { fetchPosts } from "@/lib/actions/post.actions";
import Feed from "./Feed";

// This component handles the retrieval of the actual user posts, which are then sent
// to the actual Feed component to handle
async function FeedHold() {
  // Retrieve posts using action function
  const posts = await fetchPosts("home", null);

  // The data may need to be retrieved again in order to update the Feed,
  // which is what this function is for.
  const grabServerPosts = async () => {
    "use server";
    const data = await fetchPosts("home", null);
    return data;
  };

  // Pass the post data alongside the grab function
  return <Feed posts={posts} grabServerPosts={grabServerPosts} />;
}

export default FeedHold;
