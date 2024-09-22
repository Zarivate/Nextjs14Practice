"use client";
import React, { useEffect, useState } from "react";
import { UserPost } from "@/constants";
import { fetchPosts } from "@/lib/actions/post.actions";
import { useSession } from "@clerk/nextjs";

const ProfilePage = ({ params }: any) => {
  const [allowedProfile, setAllowedProfile] = useState(true);
  const [testPosts, setTestPosts] = useState<Array<UserPost>>([]);
  const { session } = useSession();
  console.log(params);
  console.log("Params above");
  const test1 = "";
  console.log(!test1);
  console.log("Test above");
  useEffect(() => {
    const defaultRun = async () => {
      const data = await fetchPosts("", "");
      setTestPosts(data);
      console.log(testPosts);
    };

    if (session?.user.id) {
      defaultRun();
    }
  }, [session?.user.id]);

  return <div className="mt-5">Bababooy</div>;
};

export default ProfilePage;
