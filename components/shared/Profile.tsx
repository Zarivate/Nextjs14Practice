"use client";
import { fetchPosts } from "@/app/api/posts/route";
import React from "react";

const Profile = async () => {
  const posts = await fetchPosts();
  console.log(posts);

  return <div>Profile info goes here</div>;
};

export default Profile;
