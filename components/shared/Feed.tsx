"use client";
import React, { useState, useEffect } from "react";
import { PostTemplate } from "@/constants";
import SinglePost from "./SinglePost";
import { handleDeleteGeneral } from "@/lib/actions/post.actions";

// Special type declared for function
type FeedTemplate = {
  posts: PostTemplate[];
  grabServerPosts: () => Promise<any>;
};

// This function handles the actual manipulation of the posts on the home page
export default function Feed({ posts, grabServerPosts }: FeedTemplate) {
  // Variable state array to hold the posts, are of type PostTemplate
  const [userPosts, setUserPosts] = useState<Array<PostTemplate>>([]);

  // Function to handle retrieval of posts, state of the array is updated afterwards
  const fetchPostsFeed = async () => {
    const ServerSidePosts = await grabServerPosts();
    setUserPosts(ServerSidePosts);
  };

  // In the case that no posts were passed in, attempt to retrieve the posts again.
  // Else simply set the state.
  useEffect(() => {
    if (!posts) {
      fetchPostsFeed();
    } else setUserPosts(posts);
  }, []);

  // Function to handle deleting posts, accepts the unique post id
  const handleDelete = async (_id: string) => {
    // Make a call to delete the post from the database using the general delete action function.
    // If the id is returned that means the delete was successfull and can update the state.
    const returnId = await handleDeleteGeneral(_id);

    // Filter out the now deleted post from the rest of the posts
    const filteredData = userPosts.filter((bleh) => bleh._id !== returnId);

    // Update the state containing all the posts, which should trigger a call to the useEffect that will rerender the page and remove the deleted post.
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
          type: "FEED",
        }),
      });
      // If successfull, make a call to the function below that will update the state
      fetchPostsFeed();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ul className="post-holder">
        {/* Map out the posts and display them using the SinglePost component below */}
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
