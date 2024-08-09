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
  const [imageClick, setImageClick] = useState(false);
  console.log(imageClick);
  console.log("Initial click state above");

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

  const testClick = () => {
    setImageClick(!imageClick);
    console.log("Click setting below");
    console.log(imageClick);
  };

  return (
    <>
      <div className="p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {imageUrl ? (
          <div
            className={
              imageClick
                ? "float-left cursor-pointer md:h-full md:w-72"
                : "float-left cursor-pointer md:h-full md:w-48"
            }
          >
            <CldImage
              crop="fit"
              height={imageClick ? 1300 : 200}
              width={imageClick ? 1000 : 175}
              src={imageUrl}
              alt="testImg"
              onClick={testClick}
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col p-2 leading-normal h-inherit">
          {privacySet ? (
            <></>
          ) : (
            <>
              <h3 className=" font-satoshi font-semibold text-gray-900">
                {username}
              </h3>
              <p className=" font-inter text-sm text-gray-500">{email}</p>
            </>
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
              <p className="font-normal text-gray-700 dark:text-gray-400 mt-5 overflow-y max-h-52 w-full">
                {postText}
              </p>
              <p className="text-sm mb-2">
                {createdAt == updatedAt ? "" : "(Edited)"}
              </p>
            </>
          )}

          {session?.user.id === userId && (
            <div className="md:mt-[50px] flex-center gap-4 p-3">
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
    </>
  );
};

export default SinglePost2;
