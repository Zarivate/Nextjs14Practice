"use client";
import React, { useState, useEffect } from "react";
import { Post } from "@/lib/database/models/posts.model";

interface UserPost {
  userId: string;
  email: string;
  username: string;
  postText: string;
  expireAt: Date;
  allowHome: Boolean;
}

const Feed = ({}) => {
  return <div>Feed</div>;
};

export default Feed;
