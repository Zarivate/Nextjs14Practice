import { fetchPosts } from "@/lib/actions/post.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { SuspenseCheck } from "./shared/SuspenseCheck";
import Profile from "./Profile";
import React from "react";
import { UserProps } from "@/types";
import { FullPostInterface } from "@/constants";
import LoadingProfileSkeleton from "./shared/LoadingProfileSkeleton";

declare type ProfileLoadParams = {
  userId: string;
  user: UserProps;
  userPosts: FullPostInterface[];
};

// Async function that retreives any necessarry data if needed and passes it to the Profile component that actually uses the data
async function ProfileLoader({ userId, user, userPosts }: ProfileLoadParams) {
  if (!user) {
    user = await getUserById(userId, null);
  }

  if (!userPosts) {
    userPosts = await fetchPosts("user", user.username);
  }

  // Function for retrieving user posts that'll be called if a user modifies a post on their profile
  const grabPosts = async () => {
    "use server";
    const data = await fetchPosts("user", user.username!);
    return data;
  };

  return (
    <>
      <Profile
        clerkId={userId}
        privacySet={user!.privacySet}
        user={user!}
        accountCredits={user!.creditBalance}
        username={user!.username}
        userPosts={userPosts!}
        grabPosts={grabPosts}
      />
    </>
  );
}

// Function that, depending on whether the data has been retrieved already, will load a fallback
const ProfileHolder = ({ userId, user, userPosts }: ProfileLoadParams) => {
  return (
    <SuspenseCheck
      condition={!userPosts || !user}
      fallback={<LoadingProfileSkeleton />}
    >
      <ProfileLoader userId={userId} user={user} userPosts={userPosts} />
    </SuspenseCheck>
  );
};

export default ProfileHolder;
