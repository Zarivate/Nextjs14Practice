import React from "react";
import { getUserConfirm } from "@/lib/actions/user.actions";
import NotFound from "@/components/NotFound";
import Found from "@/components/Found";

const OtherProfilePage = async ({ params }: any) => {
  const username = params.id;
  const confirm = await getUserConfirm(username);

  if (confirm) return <Found username={username} />;

  return <NotFound />;
};

export default OtherProfilePage;
