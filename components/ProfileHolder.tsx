import { fetchPosts2 } from "@/lib/actions/post.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { SuspenseCheck } from "./shared/SuspenseCheck";
import LoadingPostsSkeleton from "./shared/LoadingPostsSkeleton";
import Profile from "./shared/Profile";
import React from "react";
import { UserProps } from "@/types";
import { UserPost } from "@/constants";

declare type ProfileLoadParams = {
  userId: string;
  user: UserProps;
  userPosts: UserPost[];
};

async function ProfileLoader({ userId }: any) {
  const user = await getUserById(userId, null);
  const userPosts = await fetchPosts2("user", user.username);

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

const ProfileHolder = ({ userId, user, userPosts }: ProfileLoadParams) => {
  return (
    <SuspenseCheck
      condition={!userPosts || !user}
      fallback={<LoadingPostsSkeleton />}
    >
      <ProfileLoader userId={userId} />
    </SuspenseCheck>
  );
};

export default ProfileHolder;
