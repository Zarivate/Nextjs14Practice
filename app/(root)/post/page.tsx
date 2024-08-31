import Header from "@/components/shared/Header";
import MakePost from "@/components/shared/MakePost";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";

const Page = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header
        title={"Welcome to the main function of this site"}
        subtitle={
          "Ever wanted to let your thoughts out to the world but face none of the consequences? Well that's where this site comes in! Anything you post here gets auto sent to the void in a minute. This timeframe can be altered and or entirely removed if you want to save a post to your profile."
        }
      />
      <MakePost
        creditBalance={user.creditBalance}
        userEmail={user.email}
        username={user.username}
      />
    </>
  );
};

export default Page;
