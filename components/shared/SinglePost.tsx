"use client";
import React from "react";
import { UserPost } from "@/constants";
import { getAuth } from "@clerk/nextjs/server";

const SinglePost = ({
  userId,
  email,
  username,
  postText,
  expireAt,
  allowHome,
}: UserPost) => {
  return (
    <div className="flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-col">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {username}
          </h3>
          <p className="font-inter text-sm text-gray-500">{email}</p>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{postText}</p>
      {/* TODO: Add funcitonality to see whether user is same as poster */}
      {/* Check to make sure the logged in user is the same as the creator of the post, and
      is on the profile page. If so then allow the delete and edit functionality to appear. */}
      {/* {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )} */}
    </div>
  );
};

export default SinglePost;
