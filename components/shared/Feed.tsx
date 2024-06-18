"use client";
import React, { useState, useEffect } from "react";
import { UserPost } from "@/constants";
import SinglePost from "./SinglePost";
import { useSession } from "@clerk/nextjs";

export default async function Feed() {
  const [userPosts, setUserPosts] = useState<Array<UserPost>>([]);
  const { session } = useSession();

  console.log(userPosts);

  const delay = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

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
  }, [session?.user.id]);

  // Functio to handle deleting posts, accepts the unique post id
  const handleDelete = async (_id: string) => {
    // Make sure user wants to delete the post
    const confirmed = confirm("Are you sure you want to delete this?");

    // If user is sure, make a call to delete
    if (confirmed) {
      try {
        await fetch("/api/posts", {
          method: "DELETE",
          body: JSON.stringify({
            _id: _id,
          }),
        });

        // Filter out the now deleted post from the rest of the posts
        const filteredData = userPosts.filter((bleh) => bleh._id !== _id);

        // Update the state containing all the posts, which should trigger a call to the useEffect that will rerender the page and remove the deleted post.s
        setUserPosts(filteredData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Function to handle updating the prompt
  const updatePrompt = async (_id: string, newPostText: string) => {
    // Attempt to update the post
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

  // if (!userPosts?.length) {
  //   return (
  //     <div>
  //       <h1>No posts found</h1>
  //     </div>
  //   );
  // }
  return (
    <div className="mt-5 bg-black">
      {/* Remove the h-56 grid grid-cols-3 gap-4 content-start to see if can stack content in other ways */}
      <ul className="flex items-start justify-between h-56 grid grid-cols-2 gap-4 content-start">
        {userPosts.map(
          ({ userId, email, username, postText, expireAt, allowHome, _id }) => (
            <SinglePost
              userId={userId}
              email={email}
              username={username}
              postText={postText}
              expireAt={expireAt}
              allowHome={allowHome}
              key={_id}
              _id={_id}
              handleDelete={handleDelete}
              updatePrompt={updatePrompt}
            />
          )
        )}
      </ul>
    </div>
  );
}
