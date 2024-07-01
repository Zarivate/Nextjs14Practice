import Profile from "@/components/shared/Profile";
import React from "react";
import { BasicPost, UserPost } from "@/constants";
import { fetchPosts } from "@/app/api/posts/route";
import SinglePost from "@/components/shared/SinglePost";

export default async function ProfilePage() {
  let profilePosts: UserPost[] | BasicPost;

  const testPosts = await fetchPosts();
  console.log(testPosts);
  profilePosts = testPosts;

  if (!testPosts?.length) {
    return (
      <div>
        <h1>No posts found. Why not make one?</h1>
      </div>
    );
  }
  return (
    <div className="mt-5">
      "Howdy"
      <Profile profilePosts={profilePosts} />
    </div>
  );
}
