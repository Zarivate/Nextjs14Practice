"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "@clerk/nextjs";
import { debounce } from "@/lib/utils";
import { fetchPosts } from "@/app/api/posts/route";

export default function ProfilePostsTest({
  username,
  postText,
  email,
  userId,
  _id,
}) {
  const { session } = useSession();
  const [newPostText, setNewPostText] = useState(postText);
  const [editMode, setEditMode] = useState(false);

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

  const updatePrompt = async (_id: string, newPostText: string) => {
    // Attempt to update the post
    try {
      await fetch(`/api/posts`, {
        method: "PATCH",
        body: JSON.stringify({
          _id: _id,
          postText: newPostText,
        }),
      });

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const sendPatch = () => {
    updatePrompt(_id, newPostText);
    setEditMode(!editMode);
    console.log("HOwdy");
  };

  const handleDelete = async (_id: string) => {
    // Make sure user wants to delete the post
    const confirmed = confirm("Are you sure you want to delete this?");

    // If user is sure, make a call to delete
    if (confirmed) {
      try {
        await fetch("/api/posts", {
          method: "DELETE",
          body: JSON.stringify({
            _id: _id,
          }),
        });

        // Filter out the now deleted post from the rest of the posts
        const filteredData = userPosts.filter((bleh) => bleh._id !== _id);

        // Update the state containing all the posts, which should trigger a call to the useEffect that will rerender the page and remove the deleted post.s
        setUserPosts(filteredData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <ul className="flex items-start justify-between h-56 grid grid-cols-2 gap-6 content-start mt-6">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {username}
            </h3>
            <p className="font-inter text-sm text-gray-500">{email}</p>
          </div>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-5 overflow-auto max-h-28">
            {postText}
          </p>

          {/* TODO: Add funcitonality to see whether user is same as poster */}
          {/* Check to make sure the logged in user is the same as the creator of the post, and
        is on the profile page. If so then allow the delete and edit functionality to appear. */}
          {session?.user.id === userId && (
            <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
              <button
                className="post-btn"
                onClick={() => console.log("Edit test")}
              >
                Edit
              </button>

              <p
                className="post-btn"
                onClick={() => console.log("Delete test")}
              >
                Delete
              </p>
            </div>
          )}
        </div>
      </ul>
    </>
  );
}
