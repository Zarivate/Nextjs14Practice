import React from "react";
import { getUserById } from "@/lib/actions/user.actions";
import PrivateProfile from "./PrivateProfile";

const Found = async ({ username }: any) => {
  const userSetting = await getUserById(null, username);

  if (userSetting) {
    return <PrivateProfile />;
  }

  return <PrivateProfile />;
};

export default Found;
