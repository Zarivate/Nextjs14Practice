"use client";
import React, { useEffect, useState } from "react";
import { fetchPosts, handleDeleteGeneral } from "@/lib/actions/post.actions";
import { useSession } from "@clerk/nextjs";
import { UserPost } from "@/constants";
import SinglePost2 from "@/components/shared/SinglePost2";
import { Checkbox } from "@/components/ui/checkbox";

// Have a seperate landing page for a personal profile page and all the other user profiles
const Page = () => {
  const [allowedProfile, setAllowedProfile] = useState(false);
  const [testPosts, setTestPosts] = useState<Array<UserPost>>([]);
  const { session } = useSession();
  const stringUsername = session?.user.username;
  console.log(testPosts);
  console.log(session);
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
    <>
      <div className="bg-white-200 h-screen w-auto">
        <h2 className="h1-semibold text-center text-black">
          Welcome to your Profile page
        </h2>
        <p className="text-center text-lg text-black h-11 mt-4 ">
          Here is where you can change more specific aspects of what you allow
          other users to see.
        </p>
        <div className="flex items-start h-auto grid grid-cols-2 gap-4 pl-14">
          {/* Possibly add "show more" feature where can see rest of posts/posts get cutoff at somepoint */}
          {testPosts.map(
            ({
              userId,
              email,
              username,
              postText,
              expireAt,
              allowHome,
              _id,
            }) => (
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
        </div>
        <p>
          By default all the posts are only visible to you but you can let
          others see them by changing the setting below
        </p>
        {/* Add button/slider here to showcase private/public*/}
        <div className="items-top flex space-x-2">
          <Checkbox id="terms1" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Set Privacy off
            </label>
            <p className="text-sm text-muted-foreground">
              This allows others to view your profile and your username will
              appear on any Home posts.
            </p>
          </div>
        </div>
        {/* Add feature here where displays any products user may have in their cart/want to purchase */}
      </div>
    </>
  );
};

export default Page;
