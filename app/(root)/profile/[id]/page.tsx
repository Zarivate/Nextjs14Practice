"use client";
import Profile from "@/components/shared/Profile";
import React, { useEffect, useState } from "react";
import { BasicPost, UserPost } from "@/constants";
import { fetchPosts } from "@/app/api/posts/route";
import SinglePost from "@/components/shared/SinglePost";
import { useSession } from "@clerk/nextjs";

const ProfilePage = () => {
  const [allowedProfile, setAllowedProfile] = useState(true);
  const [testPosts, setTestPosts] = useState<Array<UserPost>>([]);
  const { session } = useSession();

  const defaultRun = async () => {
    const data = await fetchPosts();
    setTestPosts(data);
  };

  useEffect(() => {
    defaultRun();
  }, [session?.user.id]);
  console.log(testPosts);

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
        const filteredData = testPosts.filter((bleh) => bleh._id !== _id);

        // Update the state containing all the posts, which should trigger a call to the useEffect that will rerender the page and remove the deleted post.s
        setTestPosts(filteredData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!testPosts?.length) {
    return (
      <div>
        <h1>No posts found. Why not make one?</h1>
      </div>
    );
  }
  return (
    <div className="mt-5">
      <Profile profilePosts={testPosts} handleDelete={handleDelete} />
    </div>
  );
};

export default ProfilePage;
