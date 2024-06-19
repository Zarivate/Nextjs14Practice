"use client";
import { UserPost } from "@/constants";
import { useSession } from "@clerk/nextjs";
import React, { useState } from "react";

export default async function ProfilePage() {
  const { session } = useSession();

  return (
    <div className="w-screen h-screen bg-black">ProfilePage goes here</div>
  );
}
