import React from "react";
import FakeTemplate from "./FakeTemplate";
import Header from "./shared/Header";

// This is what gets displayed if the user has their privacy on
const PrivateProfile = () => {
  return (
    <>
      <Header title="Sorry this profile is private" />
      <FakeTemplate />
    </>
  );
};

export default PrivateProfile;
