import React from "react";
import Feed2 from "./Feed2";

async function TestFeed() {
  // Artifical delay to showcase the loading skeleton
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await delay(2000);
  return (
    <div>
      <Feed2 />
    </div>
  );
}

export default TestFeed;
