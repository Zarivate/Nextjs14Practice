import React from "react";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import Profile2 from "@/components/shared/Profile2";
import { redirect } from "next/navigation";

const Page = async () => {
  // Grab the clerk userId using the built in auth method
  const { userId } = auth();

  // Because the correspodning user can be null, case is handled
  if (!userId) redirect("/sign-in");

  // Grab the corresponding mongoDB user id using the clerk Id
  const user = await getUserById(userId, null);

  // console.log(userId);
  // console.log("userId above");
  // console.log(user);
  // console.log("user above");

  return (
    <>
      <Profile2
        clerkId={userId}
        privacySet={user.privacySet}
        user={user}
        accountCredits={user.creditBalance}
        username={user.username}
      />
    </>
  );
};

export default Page;
