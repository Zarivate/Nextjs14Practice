import Profile from "@/components/shared/Profile";
import React from "react";
import { UserPost } from "@/constants";
import { fetchPosts } from "@/app/api/posts/route";
import SinglePost from "@/components/shared/SinglePost";

export default async function ProfilePage() {
  let profilePosts: UserPost[] | undefined;

  const testPosts = await fetchPosts();
  console.log(testPosts);

  const handleDelete = () => {
    console.log("delete test");
  };

  // Function to handle updating the prompt
  const updatePrompt = () => {
    console.log("howdy");
  };

  if (!testPosts?.length) {
    return (
      <div>
        <h1>No posts found. Why not make one?</h1>
      </div>
    );
  }
  return (
    <div className="mt-5">
      {/* Remove the h-56 grid grid-cols-3 gap-4 content-start to see if can stack content in other ways */}
      <ul className="flex items-start justify-between h-56 grid grid-cols-2 gap-4 content-start">
        {testPosts.map(
          ({ userId, email, username, postText, expireAt, allowHome, _id }) => (
            <SinglePost
              userId={userId}
              email={email}
              username={username}
              postText={postText}
              expireAt={expireAt}
              allowHome={allowHome}
              key={_id}
              _id={_id}
              handleDelete={handleDelete}
              updatePrompt={updatePrompt}
            />
          )
        )}
      </ul>
    </div>
  );
}
