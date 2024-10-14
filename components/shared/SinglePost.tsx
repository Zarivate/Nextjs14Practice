"use client";
import React, { useState } from "react";
import { FullPostInterface } from "@/constants";
import { useSession } from "@clerk/nextjs";
import { debounce } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { DotOptions } from "./DotOptions";

// This function handles the actual manipulation of the posts themselves
const SinglePost = ({
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
}: FullPostInterface) => {
  // Grab the user session state to check whether the same user is looking at their post on the home screen
  const { session } = useSession();

  // May need to reroute a user to another page so declare router
  const router = useRouter();

  // Various state fields to handle manipulating the post fields, such as the text box and image size
  const [newPostText, setNewPostText] = useState(postText);
  const [editMode, setEditMode] = useState(false);
  const [imageClick, setImageClick] = useState(false);

  // Function to handle whether a user is currently editing their post or not
  function handleEdit() {
    setEditMode(!editMode);
  }

  // Function to handle managing any text changes a user makes to their posts
  const onInputChangeHandler = (value: string) => {
    // Set a very short debounce time so each keystroke isn't automatically registered
    // and set to be the new field state
    debounce(() => {
      setNewPostText(value);
    }, 10)();
  };

  // Function for when a user submits their updated prompt
  const sendPatch = () => {
    // Make a call to update the prompt with the post id and new text
    updatePromptFeed!(_id, newPostText);
    // Revert edit mode
    setEditMode(!editMode);
  };

  // Function for when a user clicks an image, decides whether to expand it or not
  const handleImageClick = () => {
    setImageClick(!imageClick);
  };

  // Function for if a user clicks on a username above a post
  const handleProfileClick = () => {
    // Check to see if the post's creator id matches with the current session user's profile id, if so
    // that means the user clicked on their own profile and redirect them to their own profile page
    if (userId === session?.user.id) return router.push("/profile");

    // Else if that's not the case, then redirect to that specific user's profile page
    router.push(`/profile/${username}`);
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
            className={imageClick ? "flex-image md:w-72" : "flex-image md:w-48"}
          >
            <CldImage
              height={imageClick ? 1300 : 200}
              width={imageClick ? 1000 : 175}
              src={imageUrl}
              alt="testImg"
              onClick={handleImageClick}
              className="h-auto w-auto"
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col p-2">
          {/* Check to see whether user Privacy On */}
          {privacySet ? (
            <>
              {/* If the Privacy is true, first check to see if it's the same user as the one who made the post */}
              {session?.user.id === userId ? (
                <>
                  {/* If so, display their username, email, and options to delete and or edit the post */}
                  <div className="flex-userbox">
                    <p
                      className="font-satoshi font-bold text-gray-900"
                      onClick={handleProfileClick}
                    >
                      {username}
                    </p>

                    <DotOptions
                      handleEdit={handleEdit}
                      sendPatch={sendPatch}
                      handleDelete={() => handleDeleteFeed!(_id)}
                      editMode={editMode}
                    />
                  </div>
                  <p className="font-inter feed-email">{email}</p>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            // Else that means that Privacy is off, meaning the user allows other people to see their name and email
            <>
              <div className="flex-userbox">
                <p
                  onClick={handleProfileClick}
                  className="font-satoshi font-bold text-blue-400 cursor-pointer"
                >
                  {username}
                </p>
                {/* Even if Privacy is off, only the same user can edit their posts so check to make sure it's the same person before displaying the dotOptions component  */}
                {session?.user.id === userId ? (
                  <DotOptions
                    handleEdit={handleEdit}
                    sendPatch={sendPatch}
                    handleDelete={() => handleDeleteFeed!(_id)}
                    editMode={editMode}
                  />
                ) : (
                  <></>
                )}
              </div>
              <p className="font-inter feed-email">{email}</p>
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

export default SinglePost;
