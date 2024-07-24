"use client";
import React, { useEffect, useState } from "react";
import { fetchPosts, handleDeleteGeneral } from "@/lib/actions/post.actions";
import { useSession } from "@clerk/nextjs";
import { UserPost } from "@/constants";
import SinglePost2 from "@/components/shared/SinglePost2";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { updateUser } from "@/lib/actions/user.actions";

// Have a seperate landing page for a personal profile page and all the other user profiles
const Profile2 = ({ clerkId, privacySet, user }: ProfileProps) => {
  const [allowedProfile, setAllowedProfile] = useState(user.privacySet);

  const [testPosts, setTestPosts] = useState<Array<UserPost>>([]);

  const { session } = useSession();

  const [submitting, setSubmitting] = useState(false);

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

  // Function to handle changing the privacy setting box
  const handlePrivacyCheck = () => {
    user.privacySet = !allowedProfile;
    setAllowedProfile(!allowedProfile);
    console.log(user.privacySet);
    console.log("Privacy setting above");
  };

  //   Function to handle user form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitting(true);

    try {
      const response = await updateUser(clerkId, user);

      // console.log(response);
      // console.log("Response above");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }

    console.log("I'm going to make you proud everyone...");
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
              createdAt,
              updatedAt,
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
                createdAt={createdAt}
                updatedAt={updatedAt}
                handleDeleteFeed={handleDelete}
                updatePromptFeed={updatePromptFeed}
              />
            )
          )}
        </div>
        <p className="text-lg mt-5 text-center mb-3">
          By default all the posts are only visible to you but you can let
          others see them by changing the setting below.
        </p>
        <p>Currently privacy is {allowedProfile ? "On" : "Off"}</p>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-8">
          <div className="items-top flex space-x-2">
            <Checkbox id="terms1" onCheckedChange={handlePrivacyCheck} />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Set Privacy {allowedProfile ? "Off" : "On"}
              </label>
              <p className="text-sm text-muted-foreground">
                {allowedProfile
                  ? "Privacy will be off. Anybody will be able to view your profile, and name and email above your posts."
                  : "Privacy will be on, meaning only you can see your profile and your name and email won't appear above your posts."}
              </p>
            </div>
          </div>
          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={submitting}
            onClick={() => {
              toast({
                title: "Success!",
                description: "Settings have been changed",
              });
            }}
          >
            Save Changes
          </Button>
        </form>
        {/* Add feature here where displays any products user may have in their cart/want to purchase */}
      </div>
    </>
  );
};

export default Profile2;
