"use client";
import React, { useState, useEffect } from "react";
import { UserPost, UserPostsArray } from "@/constants";
import SinglePost from "./SinglePost";

const Feed = () => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await fetch("api/posts", {
        method: "GET",
      });
      const data = await posts.json();
      setUserPosts(data);
      console.log(data);
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
          ({ userId, email, username, postText, expireAt, allowHome }) => (
            <SinglePost
              userId={userId}
              email={email}
              username={username}
              postText={postText}
              expireAt={expireAt}
              allowHome={allowHome}
              key={expireAt}
            />
          )
        )}
      </ul>
    </div>
  );
};

export default Feed;
