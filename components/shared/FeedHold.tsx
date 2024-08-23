import React from "react";
import Feed from "./Feed";
import { fetchPosts2 } from "@/lib/actions/post.actions";

async function FeedHold() {
  const products = await fetchPosts2("home", null);

  // Artifical delay to showcase the loading skeleton
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await delay(2000);

  return (
    <div>
      <Feed products={products} />
    </div>
  );
}

export default FeedHold;
