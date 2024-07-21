import React, { Suspense } from "react";
import ProfilePostsTest from "./ProfilePostsTest";
import { TestPostInterface3 } from "@/constants";

export default function Profile({
  profilePosts,
  handleDelete,
}: TestPostInterface3) {
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
          handleDelete={handleDelete}
        />
      ))}
      <div>Bottom text</div>
    </>
  );
}
