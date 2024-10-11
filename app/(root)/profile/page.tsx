import React from "react";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { fetchPosts } from "@/lib/actions/post.actions";
import { headers } from "next/headers";
import { UserProps } from "@/types";
import { FullPostInterface } from "@/constants";
import ProfileHolder from "@/components/ProfileHolder";

const ProfilePage = async () => {
  // Grab the clerk userId using the built in auth method
  const { userId } = auth();

  // Because the correspodning user can be null, case is handled
  if (!userId) redirect("/sign-in");

  // Declare variables and their types
  let user: UserProps;
  let userPosts: FullPostInterface[];

  // If browser is requesting html it means it's the first page load and thus the data isn't cached already
  // so make calls to retrieve it
  if (headers().get("accept")?.includes("text/html")) {
    user = await getUserById(userId, null);
    userPosts = await fetchPosts("user", user.username);
  }

  return (
    <>
      {/* Retrieved data could be null on first call, so use the non-null assertion operator to get around it */}
      <ProfileHolder userId={userId} user={user!} userPosts={userPosts!} />
    </>
  );
};

export default ProfilePage;
