"use client";
import React from "react";
import { handleDeleteTest } from "./TestFeed";

const TestPostServerDelete = ({ idDelete }) => {
  return (
    <>
      <button onClick={() => handleDeleteTest(idDelete)}>Delete me</button>
    </>
  );
};

export default TestPostServerDelete;
