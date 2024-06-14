"use client";
import React, { useState, useEffect } from "react";
import { UserPost } from "@/constants";
import SinglePost from "./SinglePost";

const Feed = () => {
  const [userPosts, setUserPosts] = useState([]);

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
  }, []);

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
              postId={_id}
            />
          )
        )}
      </ul>
    </div>
  );
};

export default Feed;
