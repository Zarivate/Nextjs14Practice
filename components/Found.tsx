import React from "react";
import { getUserById } from "@/lib/actions/user.actions";
import PrivateProfile from "./PrivateProfile";
import PublicTemplate from "./PublicTemplate";
import { fetchPosts } from "@/lib/actions/post.actions";

// Component that handles deciding whether a user's profile is allowed to be viewed or not
const Found = async ({ username }: any) => {
  // Get the user's id by passing in the username passed in through props
  const user = await getUserById(null, username);

  // Grab the user's data, in this case any posts, using the username
  const data = await fetchPosts("user", username);

  // Return the appropriate component depending on whether the user allows others to view their profile or not
  return (
    <div>
      {user.privacySet ? (
        <PrivateProfile />
      ) : (
        <PublicTemplate
          username={username}
          data={data}
          accountCredits={user.creditBalance}
        />
      )}
    </div>
  );
};

export default Found;
