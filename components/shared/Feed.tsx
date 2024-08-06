"use client";
import React, { useState, useEffect } from "react";
import { TestPostInterface2 } from "@/constants";
import SinglePost2 from "./SinglePost2";
import { fetchPosts, handleDeleteGeneral } from "@/lib/actions/post.actions";

export default function Feed() {
  const [userPosts, setUserPosts] = useState<Array<TestPostInterface2>>([]);

  const fetchPostsFeed = async () => {
    const posts = await fetchPosts("home", null);

    setUserPosts(posts);
  };

  useEffect(() => {
    fetchPostsFeed();
  }, []);

  // Function to handle deleting posts, accepts the unique post id
  const handleDelete = async (_id: string) => {
    const returnId = await handleDeleteGeneral(_id);

    // Filter out the now deleted post from the rest of the posts
    const filteredData = userPosts.filter((bleh) => bleh._id !== returnId);

    // Update the state containing all the posts, which should trigger a call to the useEffect that will rerender the page and remove the deleted post.
    setUserPosts(filteredData);
  };

  // Function to handle updating the prompt
  const updatePromptFeed = async (_id: string, newPostText: string) => {
    try {
      await fetch(`/api/posts`, {
        method: "PATCH",
        body: JSON.stringify({
          _id: _id,
          postText: newPostText,
        }),
      });
      fetchPostsFeed();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-5">
        {/* Remove the h-56 grid grid-cols-3 gap-4 content-start to see if can stack content in other ways */}
        <ul className="flex flex-col gap-4 md:max-w-full md:max-h-full">
          {userPosts.map(
            ({
              userId,
              email,
              username,
              postText,
              expireAt,
              allowHome,
              _id,
              createdAt,
              updatedAt,
              imageUrl,
              privacySet,
            }) => (
              <SinglePost2
                userId={userId}
                email={email}
                username={username}
                postText={postText}
                expireAt={expireAt}
                createdAt={createdAt}
                updatedAt={updatedAt}
                allowHome={allowHome}
                imageUrl={imageUrl}
                privacySet={privacySet}
                key={_id}
                _id={_id}
                handleDeleteFeed={handleDelete}
                updatePromptFeed={updatePromptFeed}
              />
            )
          )}
        </ul>
        <a
          href="#"
          className="mt-5 p-5 flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full"
        >
          <img
            className="w-full h-96 md:h-auto md:w-48 "
            src="https://res.cloudinary.com/dwbwqzovu/image/upload/c_fit,w_640,h_640/f_auto/q_auto/ta_ma_ky_qnmtnw?_a=BAVFB+DW0"
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <p className="font-normal text-gray-700 dark:text-gray-400 w-full text-sm">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 w-full">
              Another scorching hot day,
            </p>
            <div className="flex-center gap-4">
              <button className="post-btn w-15">Edit</button>
              <button className="post-btn w-15">Edit</button>
            </div>
          </div>
        </a>
      </div>
    </>
  );
}
