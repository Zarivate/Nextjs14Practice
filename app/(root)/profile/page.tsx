"use client";
import React, { useEffect, useState } from "react";
import { fetchPosts, handleDeleteGeneral } from "@/app/api/posts/route";
import { useSession } from "@clerk/nextjs";
import { UserPost } from "@/constants";
import SinglePost2 from "@/components/shared/SinglePost2";

// Have a seperate landing page for a personal profile page and all the other user profiles
const Page = () => {
  const [allowedProfile, setAllowedProfile] = useState(true);
  const [testPosts, setTestPosts] = useState<Array<UserPost>>([]);
  const { session } = useSession();
  const stringUsername = session?.user.username;
  console.log(testPosts);

  const grabPosts = async () => {
    const data = await fetchPosts("user", stringUsername);
    setTestPosts(data);
  };

  useEffect(() => {
    if (session?.user.username) {
      grabPosts();
    }
  }, [session?.user.username]);

  // Function to handle deleting posts, accepts the unique post id
  const handleDelete = async (_id: string) => {
    const returnId = await handleDeleteGeneral(_id);

    // Filter out the now deleted post from the rest of the posts
    const filteredData = testPosts.filter((bleh) => bleh._id !== returnId);

    // Update the state containing all the posts, which should trigger a call to the useEffect that will rerender the page and remove the deleted post.
    setTestPosts(filteredData);
  };

  // Function to handle updating the prompt
  const updatePromptFeed = async (_id: string, newPostText: string) => {
    try {
      await fetch(`/api/posts`, {
        method: "PATCH",
        body: JSON.stringify({
          _id: _id,
          postText: newPostText,
        }),
      });
      grabPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Welcome to your Profile page</h2>
      <p>Take a look at your posts</p>
      {/* Insert the user posts here */}
      {testPosts.map(
        ({ userId, email, username, postText, expireAt, allowHome, _id }) => (
          <SinglePost2
            userId={userId}
            email={email}
            username={username}
            postText={postText}
            expireAt={expireAt}
            allowHome={allowHome}
            key={_id}
            _id={_id}
            handleDeleteFeed={handleDelete}
            updatePromptFeed={updatePromptFeed}
          />
        )
      )}
      <p>
        By default all the posts are only visible to you but you can let others
        see them by changing the setting below
      </p>
      {/* Add button/slider here to showcase private/public*/}
      {/* Add feature here where displays any products user may have in their cart/want to purchase */}
    </div>
  );
};

export default Page;
