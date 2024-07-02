import React, { Suspense } from "react";
import ProfilePostsTest from "./ProfilePostsTest";
export default function Profile({ profilePosts }) {
  return (
    <>
      {profilePosts.map((post) => (
        <ProfilePostsTest
          username={post.username}
          postText={post.postText}
          email={post.email}
          userId={post.userId}
          key={post._id}
          _id={post._id}
        />
      ))}
      <div>Bottom text</div>
    </>
  );
}
