"use client";
import React, { useEffect, useState } from "react";
import { TestPostInterface, UserPost } from "@/constants";
import { useSession } from "@clerk/nextjs";
import { debounce } from "@/lib/utils";

import { CldImage } from "next-cloudinary";

const SinglePost2 = ({
  userId,
  email,
  username,
  postText,
  _id,
  createdAt,
  updatedAt,
  imageUrl,
  privacySet,
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
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full w-full">
        {imageUrl ? (
          <div className="float-left w-full h-96 md:h-auto md:w-48">
            <CldImage
              crop="fit"
              height="200"
              width="200"
              src={imageUrl}
              alt="testImg"
              className="w-full h-96 md:h-auto md:w-48"
              onClick={() => console.log("Howdy")}
            />
          </div>
        ) : (
          ""
        )}
        <div className="grid grid-cols-1 ">
          {privacySet ? (
            <></>
          ) : (
            <div className="flex flex-col pl-2">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {username}
              </h3>
              <p className="font-inter text-sm text-gray-500">{email}</p>
            </div>
          )}

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
              <p className="pl-2 font-normal text-gray-700 dark:text-gray-400 mt-5 overflow-y max-h-52">
                {postText}
                {postText}
                {postText}
                {postText}
                {postText}
                {postText}
                {postText}
                {postText}
                {postText}
                {postText}
                {postText}
                {postText}
                {postText}
                {postText}
                {postText}
                {postText}
                {postText}
                {postText}
                {postText}
                {postText}
              </p>
              <p className="text-sm mb-2">
                {createdAt == updatedAt ? "" : "(Edited)"}
              </p>
            </>
          )}
          <div className="bottom-0">
            {session?.user.id === userId && (
              <div className="mt-5 flex-center gap-4 border-t border-gray-500 p-3">
                {editMode ? (
                  <p
                    className="font-inter text-sm green-gradient cursor-pointer"
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
        </div>
      </div>
    </>
  );
};

export default SinglePost2;
