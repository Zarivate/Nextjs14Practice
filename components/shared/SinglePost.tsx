"use client";
import React, { useEffect, useState } from "react";
import { UserPost } from "@/constants";
import { useSession } from "@clerk/nextjs";
import { debounce } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

const SinglePost = ({
  userId,
  email,
  username,
  postText,
  expireAt,
  _id,
  handleDelete,
  updatePrompt,
}: UserPost) => {
  // Grab the user session state to check whether the same user is looking at their post on the home screen
  const { session } = useSession();
  const [newPostText, setNewPostText] = useState(postText);
  const [editMode, setEditMode] = useState(false);
  console.log(editMode);

  function handleEdit() {
    setEditMode(!editMode);
    console.log(editMode);
  }

  const onInputChangeHandler = (value: string) => {
    debounce(() => {
      setNewPostText(value);
      console.log(newPostText);
    }, 100)();

    setNewPostText(value);
  };

  const sendPatch = () => {
    updatePrompt(_id, newPostText);
    setEditMode(!editMode);
    console.log("HOwdy");
  };

  return (
    <>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {username}
          </h3>
          <p className="font-inter text-sm text-gray-500">{email}</p>
        </div>

        {editMode ? (
          <>
            <textarea
              className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-5 w-full overflow-y"
              value={newPostText}
              onChange={(e: any) => onInputChangeHandler(e.target.value)}
            />
          </>
        ) : (
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-5 overflow-auto max-h-28">
            {postText}
          </p>
        )}

        {/* TODO: Add funcitonality to see whether user is same as poster */}
        {/* Check to make sure the logged in user is the same as the creator of the post, and
      is on the profile page. If so then allow the delete and edit functionality to appear. */}
        {session?.user.id === userId && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            {editMode ? (
              <p
                className="font-inter text-sm green_gradient cursor-pointer"
                onClick={() => sendPatch()}
              >
                Done
              </p>
            ) : (
              <button className="post-btn" onClick={handleEdit}>
                Edit
              </button>
            )}

            <p className="post-btn" onClick={() => handleDelete(_id)}>
              Delete
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SinglePost;
