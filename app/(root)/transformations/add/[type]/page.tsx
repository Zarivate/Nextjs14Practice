import Header from "@/components/shared/Header";
import React from "react";
import { transformationTypes } from "@/constants";
import TransformationForm from "@/components/shared/TransformationForm";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

// In order to adjust what gets displayed according to what page the user heads to, the [type] field in the folder structure is destructured and displayed
const AddTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  // Get the corresponding url header type by comparing and finding it to the ones listed in the constants
  const transformation = transformationTypes[type];

  // Grab the clerk userId using the built in auth method
  const { userId } = auth();

  // Because the correspodning user below can be false, the snippet below is done to ensure that case is handled
  if (!userId) redirect("/sign-in");

  // Grab the corresponding mongoDB user id using the clerk Id
  const user = await getUserById(userId);

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <TransformationForm
        action="Add"
        userId={user._id}
        type={transformation.type as TransformationTypeKey}
        creditBalance={user.creditBalance}
      />
    </>
  );
};

export default AddTransformationTypePage;
