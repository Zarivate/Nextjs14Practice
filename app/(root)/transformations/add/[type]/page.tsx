import Header from "@/components/shared/Header";
import React from "react";
import { transformationTypes } from "@/constants";

// In order to adjust what gets displayed according to what page the user heads to, the [type] field in the folder structure is destructured and displayed
const AddTransformationTypePage = ({ params: { type } }: SearchParamProps) => {
  // Get the corresponding url header type by comparing and finding it to the ones listed in the constants
  const transformation = transformationTypes[type];

  return (
    <Header title={transformation.title} subtitle={transformation.subTitle} />
  );
};

export default AddTransformationTypePage;
