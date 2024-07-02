"use client";
import Profile from "@/components/shared/Profile";
import React, { useEffect, useState } from "react";
import { BasicPost, UserPost } from "@/constants";
import { fetchPosts } from "@/app/api/posts/route";
import SinglePost from "@/components/shared/SinglePost";
import { useSession } from "@clerk/nextjs";

const ProfilePage = () => {
  const [allowedProfile, setAllowedProfile] = useState(false);
  const [testPosts, setTestPosts] = useState([]);

  const defaultRun = async () => {
    const data = await fetchPosts();
    setTestPosts(data);
  };

  useEffect(() => {
    defaultRun();
  }, []);
  console.log(testPosts);
  if (!testPosts?.length) {
    return (
      <div>
        <h1>No posts found. Why not make one?</h1>
      </div>
    );
  }
  return (
    <div className="mt-5">
      <Profile profilePosts={testPosts} />
    </div>
  );
};

export default ProfilePage;
