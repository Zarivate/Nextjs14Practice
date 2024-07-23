"use client";
import React, { useEffect, useState } from "react";
import { TestPostInterface, UserPost } from "@/constants";
import { useSession } from "@clerk/nextjs";
import { debounce } from "@/lib/utils";

const SinglePost2 = ({
  userId,
  email,
  username,
  postText,
  expireAt,
  _id,
  createdAt,
  updatedAt,
  handleDeleteFeed,
  updatePromptFeed,
}: TestPostInterface) => {
  // Grab the user session state to check whether the same user is looking at their post on the home screen
  const { session } = useSession();
  const [newPostText, setNewPostText] = useState(postText);
  const [editMode, setEditMode] = useState(false);

  function handleEdit() {
    setEditMode(!editMode);
  }

  const onInputChangeHandler = (value: string) => {
    debounce(() => {
      setNewPostText(value);
      console.log(newPostText);
    }, 10)();

    setNewPostText(value);
  };

  const sendPatch = () => {
    updatePromptFeed(_id, newPostText);
    setEditMode(!editMode);
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
          <>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-5 overflow-auto max-h-28">
              {postText}
            </p>
            <p className="text-sm">
              {createdAt == updatedAt ? "" : "(Edited)"}
            </p>
          </>
        )}

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

            <p className="post-btn" onClick={() => handleDeleteFeed(_id)}>
              Delete
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SinglePost2;
