import React from "react";
import { getUserById } from "@/lib/actions/user.actions";
import PrivateProfile from "./PrivateProfile";
import PublicTemplate from "./PublicTemplate";
import { fetchPosts2 } from "@/lib/actions/post.actions";

const Found = async ({ username }: any) => {
  const user = await getUserById(null, username);

  const data = await fetchPosts2("user", username);

  if (user.privacySet) {
    return (
      <div>
        <PrivateProfile />
      </div>
    );
  }

  return (
    <div>
      <PublicTemplate
        username={username}
        data={data}
        accountCredits={user.creditBalance}
      />
    </div>
  );
};

export default Found;
