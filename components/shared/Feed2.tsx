"use client";
import React, { useState, useEffect, Suspense } from "react";
import {
  TestPostInterface,
  TestPostInterface2,
  UserPost,
  UserPostsArray,
  UserPostsArray2,
} from "@/constants";
import SinglePost2 from "./SinglePost2";
import { fetchPosts, handleDeleteGeneral } from "@/app/api/posts/route";
import LoadingPostsSkeleton from "./LoadingPostsSkeleton";
import { handleDeleteTest } from "./TestFeed";

export default function Feed2({ posts }: UserPostsArray2) {
  const [userPosts, setUserPosts] = useState<Array<TestPostInterface2>>([]);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  console.log(posts);
  console.log("blrhjhkdfhg");

  return (
    <div className="mt-5">
      {/* Remove the h-56 grid grid-cols-3 gap-4 content-start to see if can stack content in other ways */}
      {/* <ul className="flex items-start justify-between h-56 grid grid-cols-2 gap-4 content-start">
        {userPosts.map(
          ({ userId, email, username, postText, expireAt, allowHome, _id }) => (
            <SinglePost2
              userId={userId}
              email={email}
              username={username}
              postText={postText}
              expireAt={expireAt}
              allowHome={allowHome}
              key={_id}
              _id={_id}
              handleDeleteFeed={handleDelete}
              updatePromptFeed={updatePromptFeed}
            />
          )
        )}
      </ul> */}
      HOwdy
    </div>
  );
}
