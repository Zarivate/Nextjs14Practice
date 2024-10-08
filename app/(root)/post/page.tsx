import Header from "@/components/shared/Header";
import MakePost from "@/components/shared/MakePost";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";

const Page = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId, null);

  return (
    <>
      <Header
        title={"Welcome to the main function of this site"}
        subtitle={
          "This is an Anti-Social Media site. This site is designed to facilitate private posting and little else. Nothing is shared publicly unless you allow it to be and anything you post gets auto sent to the void in a minute. This timeframe can be altered or entirely removed below. "
        }
      />
      <MakePost
        userId={user._id}
        creditBalance={user.creditBalance}
        userEmail={user.email}
        username={user.username}
      />
    </>
  );
};

export default Page;
