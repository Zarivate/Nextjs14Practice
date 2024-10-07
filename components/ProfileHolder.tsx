import { fetchPosts2 } from "@/lib/actions/post.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { SuspenseCheck } from "./shared/SuspenseCheck";
import LoadingPostsSkeleton from "./shared/LoadingPostsSkeleton";
import Profile from "./shared/Profile";
import React from "react";
import { UserProps } from "@/types";
import { FullPostInterface } from "@/constants";

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
    userPosts = await fetchPosts2("user", user.username);
  }

  // Function for retrieving user posts that'll be called if a user modifies a post on their profile
  const grabPosts = async () => {
    "use server";
    const data = await fetchPosts2("user", user.username!);
    return data;
  };

  return (
    <Profile
      clerkId={userId}
      privacySet={user!.privacySet}
      user={user!}
      accountCredits={user!.creditBalance}
      username={user!.username}
      userPosts={userPosts!}
      grabPosts={grabPosts}
    />
  );
}

// Function that, depending on whether the data has been retrieved already, will load a fallback
const ProfileHolder = ({ userId, user, userPosts }: ProfileLoadParams) => {
  return (
    <SuspenseCheck
      condition={!userPosts || !user}
      fallback={<LoadingPostsSkeleton />}
    >
      <ProfileLoader userId={userId} user={user} userPosts={userPosts} />
    </SuspenseCheck>
  );
};

export default ProfileHolder;
