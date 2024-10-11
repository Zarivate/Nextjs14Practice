import React, { Suspense } from "react";
import { getUserConfirm } from "@/lib/actions/user.actions";
import NotFound from "@/components/NotFound";
import Found from "@/components/Found";
import LoadingProfileSkeleton from "@/components/shared/LoadingProfileSkeleton";

// Page that handles navigation to non user profiles
const OtherProfilePage = async ({ params }: any) => {
  // Grab the username from the url
  const username = params.id;
  // Confirm that the user exists
  const confirm = await getUserConfirm(username);

  // If so, redirect them to that user's profile, else to a basic not found page/component
  return (
    <>
      <Suspense fallback={<LoadingProfileSkeleton />}>
        {confirm ? <Found username={username} /> : <NotFound />}
      </Suspense>
    </>
  );
};

export default OtherProfilePage;
