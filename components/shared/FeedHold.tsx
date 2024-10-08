import React from "react";
import { fetchPosts } from "@/lib/actions/post.actions";
import Feed from "./Feed";

async function FeedHold() {
  const posts = await fetchPosts("home", null);

  const grabServerPosts = async () => {
    "use server";
    const data = await fetchPosts("home", null);
    return data;
  };

  return <Feed posts={posts} grabServerPosts={grabServerPosts} />;
}

export default FeedHold;
