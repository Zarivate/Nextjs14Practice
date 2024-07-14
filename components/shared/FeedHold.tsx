import React from "react";
import Feed from "./Feed";

async function FeedHold() {
  // Artifical delay to showcase the loading skeleton
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await delay(2000);
  return (
    <div>
      <Feed />
    </div>
  );
}

export default FeedHold;
