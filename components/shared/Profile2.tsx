"use client";
import React, { useEffect, useState } from "react";
import { fetchPosts, handleDeleteGeneral } from "@/lib/actions/post.actions";
import { useSession } from "@clerk/nextjs";
import { UserPost } from "@/constants";
import SinglePost2 from "@/components/shared/SinglePost2";
import { Switch } from "@/components/ui/switch";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { updateUser } from "@/lib/actions/user.actions";
import { CldUploadWidget } from "next-cloudinary";

// Have a seperate landing page for a personal profile page and all the other user profiles
const Profile2 = ({ clerkId, privacySet, user }: ProfileProps) => {
  const [allowedProfile, setAllowedProfile] = useState(privacySet);

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
    setAllowedProfile(!allowedProfile);
    user.privacySet = !user.privacySet;
  };

  // Function to handle user form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitting(true);

    try {
      await updateUser(clerkId, user);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
    toast({
      title: "Success!",
      description: "Settings have been changed",
    });
    console.log("I'm going to make you proud everyone...");
  };

  // Create function that changes all the users posts' privacy settings once they change the setting
  const updatePostsPrivacy = async () => {
    // This doesn't work because it doesn't update anything in the database sadly. Will instead need to make
    // a separte call for each post I think, geh.

    testPosts.map((post) => {
      post.privacySet = user.privacySet;
    });
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
          By default all your posts are only visible to you but you can let
          others see them by changing the setting below.
        </p>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-8">
          <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
            <div className="space-y-0.5">
              <div className="mb-2 text-lg font-medium">Privacy</div>
              <div>
                When on only you can see your profile and name and email above
                your posts. When off all this will become visible to anyone.
              </div>
            </div>

            <Switch
              checked={allowedProfile}
              onCheckedChange={handlePrivacyCheck}
              aria-readonly
            />
          </div>
          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={submitting}
            onClick={() => {}}
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
