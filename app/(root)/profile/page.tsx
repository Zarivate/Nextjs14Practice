"use client";
import { UserPost } from "@/constants";
import { useSession } from "@clerk/nextjs";
import React, { useState } from "react";

export default async function ProfilePage() {
  const { session } = useSession();

  return <div>ProfilePage goes here</div>;
}
