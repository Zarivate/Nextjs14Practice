"use client";
import React, { useEffect, useState } from "react";
import { TestPostInterface, UserPost } from "@/constants";
import { useSession } from "@clerk/nextjs";
import { debounce } from "@/lib/utils";

import { CldImage } from "next-cloudinary";
import { DotOptions } from "./DotOptions";

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
  console.log(session);
  console.log("Session above");
  console.log(userId);
  console.log("Post user id above");

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
  };

  return (
    <>
      <div
        // Adjust the size of the box depending on how much text is granted, not by whether someone clicks on it
        className={`p-5 bg-white border-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-white-700 ${
          imageClick ? "" : ""
        }`}
      >
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
        <div className="flex flex-col p-2">
          {/* Check to see whether user Privacy On or if the user is the same as the post. */}
          {privacySet ? (
            <>
              {session?.user.id === userId ? (
                <>
                  <div className="flex flex-row justify-between">
                    <h3 className="font-satoshi font-bold text-gray-900">
                      {username}
                    </h3>

                    <DotOptions
                      handleEdit={handleEdit}
                      sendPatch={sendPatch}
                      handleDelete={() => handleDeleteFeed(_id)}
                      editMode={editMode}
                    />
                  </div>
                  <p className="font-inter text-sm text-gray-500">{email}</p>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              {session?.user.id === userId ? (
                <>
                  <div className="flex flex-row justify-between">
                    <h3 className="font-satoshi font-bold text-gray-900">
                      {username}
                    </h3>

                    <DotOptions
                      handleEdit={handleEdit}
                      sendPatch={sendPatch}
                      handleDelete={() => handleDeleteFeed(_id)}
                      editMode={editMode}
                    />
                  </div>
                  <p className="font-inter text-sm text-gray-500">{email}</p>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col leading-normal h-inherit p-2">
          {editMode ? (
            <>
              <textarea
                className="mb-3 font-normal text-gray-700 bg-white mt-5 w-full overflow-y"
                value={newPostText}
                onChange={(e: any) => onInputChangeHandler(e.target.value)}
              />
            </>
          ) : (
            <>
              <p className="font-normal text-gray-700 dark:text-gray-400 mt-2 overflow-y max-h-52 w-full">
                {postText}
              </p>
              <p className="text-sm mb-2">
                {createdAt == updatedAt ? "" : "(Edited)"}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SinglePost2;
