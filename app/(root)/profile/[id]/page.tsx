import React from "react";
import { UserPost } from "@/constants";
import { fetchPosts } from "@/lib/actions/post.actions";
import { useSession } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.actions";

const ProfilePage = async ({ params }: any) => {
  const username = params.id;

  const userSetting = await getUserById(null, username);

  if (!userSetting) {
    return <div>Not alloved</div>;
  }

  return <div className="mt-5">Bababooy</div>;
};

export default ProfilePage;
