"use client";
import Profile from "@/components/shared/Profile";
import React, { useEffect, useState } from "react";
import { fetchPosts } from "@/app/api/posts/route";
import { useSession } from "@clerk/nextjs";
import { UserPost } from "@/constants";

// Have a seperate landing page for a personal profile page and all the other user profiles
const Page = () => {
  const [allowedProfile, setAllowedProfile] = useState(true);
  const [testPosts, setTestPosts] = useState<Array<UserPost>>([]);
  const { session } = useSession();

  useEffect(() => {
    const defaultRun = async () => {
      const data = await fetchPosts();
      setTestPosts(data);
      console.log(testPosts);
    };

    if (session?.user.id) {
      defaultRun();
    }
  }, [session?.user.id]);

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

  return (
    <div>
      <h2>Welcome to your Profile page</h2>
      <p>Take a look at your posts</p>
      {/* Insert the user posts here */}
      <p>
        By default all the posts are only visible to you but you can let others
        see them by saving the setting below
      </p>
      {/* Add button/slider here to showcase private/public*/}
      {/* Add feature here where displays any products user may have in their cart/want to purchase */}
    </div>
  );
};

export default Page;
