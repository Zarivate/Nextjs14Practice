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

  useEffect(() => {
    setUserPosts(posts);
  }, []);

  const fetchPostsFeed = async () => {
    const posts = await fetchPosts("home");

    setUserPosts(posts);
  };

  // Function to handle deleting posts, accepts the unique post id
  const handleDelete = async (_id: string) => {
    const returnId = await handleDeleteTest(_id);

    // Filter out the now deleted post from the rest of the posts
    const filteredData = userPosts.filter((bleh) => bleh._id !== returnId);

    // Update the state containing all the posts, which should trigger a call to the useEffect that will rerender the page and remove the deleted post.s
    setUserPosts(filteredData);
  };

  // Function to handle updating the prompt
  const updatePromptFeed = async (_id: string, newPostText: string) => {
    try {
      await fetch(`/api/posts`, {
        method: "PATCH",
        body: JSON.stringify({
          _id: _id,
          postText: newPostText,
        }),
      });
      fetchPostsFeed();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-5">
      {/* Remove the h-56 grid grid-cols-3 gap-4 content-start to see if can stack content in other ways */}
      <ul className="flex items-start justify-between h-56 grid grid-cols-2 gap-4 content-start">
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
      </ul>
    </div>
  );
}
