"use client";
import React, { useState, useEffect } from "react";
import { PostTemplate } from "@/constants";
import SinglePost from "./SinglePost";
import { handleDeleteGeneral } from "@/lib/actions/post.actions";

type FeedTemplate = {
  posts: PostTemplate[];
  grabServerPosts: () => Promise<any>;
};

export default function Feed({ posts, grabServerPosts }: FeedTemplate) {
  const [userPosts, setUserPosts] = useState<Array<PostTemplate>>([]);

  const fetchPostsFeed = async () => {
    const ServerSidePosts = await grabServerPosts();

    setUserPosts(ServerSidePosts);
  };

  useEffect(() => {
    if (!posts) {
      fetchPostsFeed();
    } else setUserPosts(posts);
  }, []);

  // Function to handle deleting posts, accepts the unique post id
  const handleDelete = async (_id: string) => {
    const returnId = await handleDeleteGeneral(_id);

    // Filter out the now deleted post from the rest of the posts
    const filteredData2 = userPosts.filter((bleh) => bleh._id !== returnId);

    // Update the state containing all the posts, which should trigger a call to the useEffect that will rerender the page and remove the deleted post.
    setUserPosts(filteredData2);
  };

  // Function to handle updating the prompt
  const updatePromptFeed = async (_id: string, newPostText: string) => {
    try {
      await fetch(`/api/posts`, {
        method: "PATCH",
        body: JSON.stringify({
          _id: _id,
          postText: newPostText,
          type: "FEED",
        }),
      });
      fetchPostsFeed();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ul className="post-holder">
        {userPosts.map(
          ({
            userId,
            email,
            username,
            postText,
            expireAt,
            allowHome,
            _id,
            createdAt,
            updatedAt,
            imageUrl,
            privacySet,
          }) => (
            <SinglePost
              userId={userId}
              email={email}
              username={username}
              postText={postText}
              expireAt={expireAt}
              createdAt={createdAt}
              updatedAt={updatedAt}
              allowHome={allowHome}
              imageUrl={imageUrl}
              privacySet={privacySet}
              key={_id}
              _id={_id}
              handleDeleteFeed={handleDelete}
              updatePromptFeed={updatePromptFeed}
            />
          )
        )}
      </ul>
    </>
  );
}
