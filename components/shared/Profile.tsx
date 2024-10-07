"use client";
import React, { useEffect, useState } from "react";
import { handleDeleteGeneral } from "@/lib/actions/post.actions";
import { UserPost } from "@/constants";
import SinglePost2 from "@/components/shared/SinglePost2";
import { Switch } from "@/components/ui/switch";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { updateUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { ProfileProps } from "@/types";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

// Have a seperate landing page for a personal profile page and all the other user profiles
const Profile = ({
  clerkId,
  privacySet,
  user,
  accountCredits,
  username,
  userPosts,
  grabPosts,
}: ProfileProps) => {
  const [allowedProfile, setAllowedProfile] = useState(privacySet);

  const [profilePosts, setProfilePosts] = useState<Array<UserPost>>([]);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (username) {
      setProfilePosts(userPosts);
    }
  }, [username]);

  // Function to handle deleting posts, accepts the unique post id
  const handleDelete = async (_id: string) => {
    const returnId = await handleDeleteGeneral(_id);

    // Filter out the now deleted post from the rest of the posts
    const filteredData = profilePosts.filter((bleh) => bleh._id !== returnId);

    // Update the state containing all the posts, which should trigger a call to the useEffect that will rerender the page and remove the deleted post.
    setProfilePosts(filteredData);
  };

  const FormSchema = z.object({
    privacyState: z.boolean(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      privacyState: allowedProfile,
    },
  });

  // Function to handle updating the prompt
  const updatePromptFeed = async (_id: string, newPostText: string) => {
    try {
      await fetch(`/api/posts`, {
        method: "PATCH",
        body: JSON.stringify({
          _id: _id,
          postText: newPostText,
          type: "FEED",
        }),
      });
      const data = await grabPosts();
      setProfilePosts(data);
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
  const handlePrivacySubmit = async () => {
    setSubmitting(true);

    try {
      await updateUser(clerkId, user);
      profilePosts.map(async (post) => {
        await fetch(`/api/posts`, {
          method: "PATCH",
          body: JSON.stringify({
            _id: post._id,
            postText: post.postText,
            privacySet: user.privacySet,
          }),
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
    toast({
      title: "Success!",
      description: "Settings have been changed",
      className: "success-toast",
    });
  };

  return (
    <>
      <h2 className="profile-header">Welcome to your Profile page</h2>
      <section className="profile">
        <div className="profile-balance">
          <p className="balance-text">CREDITS AVAILABLE</p>
          <div className="balance-box">
            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">
              {accountCredits.toString()}
            </h2>
          </div>
        </div>
      </section>

      <div className="post-holder">
        <h2 className="post-header">Your posts</h2>
        {profilePosts.length ? (
          <>
            {profilePosts.map(
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
                imageUrl,
                privacySet,
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
                  imageUrl={imageUrl}
                  privacySet={privacySet}
                  createdAt={createdAt}
                  updatedAt={updatedAt}
                  handleDeleteFeed={handleDelete}
                  updatePromptFeed={updatePromptFeed}
                />
              )
            )}
          </>
        ) : (
          <>
            <h2 className="text-center">
              There doesn't seem to be any posts...{" "}
              <Link
                href="/post"
                className="cursor-pointer text-white hover:underline"
              >
                why not make one?
              </Link>
            </h2>
          </>
        )}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlePrivacySubmit)}
          className="w-full space-y-6 mt-10 relative"
        >
          <div>
            <p className="profile-p">
              Here is where you can change what you allow other users to see.
            </p>
            <p className="profile-p mb-4">
              By default all your posts and profile are only visible to you but
              you can let others see them by changing the setting below.
            </p>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="privacyState"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Privacy</FormLabel>
                      <FormDescription>
                        When on only you can see your profile, name and email
                        above your posts. When off all this will become visible
                        to anyone.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={allowedProfile}
                        onCheckedChange={handlePrivacyCheck}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={submitting}
          >
            Confirm Changes
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Profile;
