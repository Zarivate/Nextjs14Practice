import React from "react";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { fetchPosts2 } from "@/lib/actions/post.actions";
import { headers } from "next/headers";
import { UserProps } from "@/types";
import { UserPost } from "@/constants";
import ProfileHolder from "@/components/ProfileHolder";

const ProfilePage = async () => {
  // Grab the clerk userId using the built in auth method
  const { userId } = auth();

  // Because the correspodning user can be null, case is handled
  if (!userId) redirect("/sign-in");

  let user: UserProps;
  let userPosts: UserPost[];

  // if browser is requesting html it means it's the first page load
  if (headers().get("accept")?.includes("text/html")) {
    user = await getUserById(userId, null);
    userPosts = await fetchPosts2("user", user.username);
  }

  return (
    <>
      <ProfileHolder userId={userId} user={user!} userPosts={userPosts!} />
    </>
  );
};

export default ProfilePage;
