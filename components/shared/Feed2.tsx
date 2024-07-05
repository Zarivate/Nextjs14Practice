"use client";
import React, { useState, useEffect, Suspense } from "react";
import { TestPostInterface, UserPost } from "@/constants";
import SinglePost2 from "./SinglePost2";
import {
  handleDeleteGeneral,
  updatePromptGeneral,
} from "@/app/api/posts/route";
import LoadingPostsSkeleton from "./LoadingPostsSkeleton";

export default function Feed2() {
  const [userPosts, setUserPosts] = useState<Array<TestPostInterface>>([]);

  console.log(userPosts);
  const fetchPosts = async () => {
    const posts = await fetch("api/posts", {
      method: "GET",
    });
    const data = await posts.json();
    // Filter data so only ones that agreed to be visible are retrieved
    const allowedData = data.filter(
      (datasnip: UserPost) => datasnip.allowHome == true
    );
    setUserPosts(allowedData);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Functio to handle deleting posts, accepts the unique post id
  const handleDeleteFeed = async (_id: string) => {
    const returnId = await handleDeleteGeneral(_id);

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
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Suspense fallback={<LoadingPostsSkeleton />}>
      <div className="mt-5">
        {/* Remove the h-56 grid grid-cols-3 gap-4 content-start to see if can stack content in other ways */}
        <ul className="flex items-start justify-between h-56 grid grid-cols-2 gap-4 content-start">
          {userPosts.map(
            ({
              userId,
              email,
              username,
              postText,
              expireAt,
              allowHome,
              _id,
            }) => (
              <SinglePost2
                userId={userId}
                email={email}
                username={username}
                postText={postText}
                expireAt={expireAt}
                allowHome={allowHome}
                key={_id}
                _id={_id}
                handleDeleteFeed={handleDeleteFeed}
                updatePromptFeed={updatePromptFeed}
              />
            )
          )}
        </ul>
      </div>
    </Suspense>
  );
}
