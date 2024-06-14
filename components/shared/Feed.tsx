"use client";
import React, { useState, useEffect } from "react";
import { UserPost } from "@/constants";
import SinglePost from "./SinglePost";
import { useSession } from "@clerk/nextjs";

const Feed = () => {
  const [userPosts, setUserPosts] = useState<Array<UserPost>>([]);
  const { session } = useSession();

  console.log(userPosts);

  useEffect(() => {
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
    fetchPosts();
  }, [session?.user.id]);

  const handleDelete = async (_id: string) => {
    // Make sure user wants to delete post
    const confirmed = confirm("Are you sure you want to delete this?");

    // If user is sure, make a call to delete the post
    if (confirmed) {
      try {
        await fetch("/api/posts", {
          method: "DELETE",
          body: JSON.stringify({
            _id: _id,
          }),
        });
        console.log(userPosts);
        // Filter out the delete post from the rest of the posts
        const filteredData = userPosts.filter((bleh) => bleh._id !== _id);
        setUserPosts(filteredData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!userPosts?.length) {
    return (
      <div>
        <h1>No posts found</h1>
      </div>
    );
  }
  return (
    <div className="mt-16 py-8 sm:columns-2 sm:gap-6 xl:columns-3 bg-black">
      <ul className="space-x-20">
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
            />
          )
        )}
      </ul>
    </div>
  );
};

export default Feed;
