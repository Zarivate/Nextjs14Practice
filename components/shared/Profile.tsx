import { fetchPosts } from "@/app/api/posts/route";
import React, { Suspense } from "react";
import LoadingPostsSkeleton from "./LoadingPostsSkeleton";
import { useSession } from "@clerk/nextjs";

export default function Profile({ profilePosts }) {
  const { session } = useSession();

  console.log(session);
  return (
    <div>
      {profilePosts.map((post) => (
        <>
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">{post.email}</p>
            </div>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-5 overflow-auto max-h-28">
              {post.postText}
            </p>

            {/* TODO: Add funcitonality to see whether user is same as poster */}
            {/* Check to make sure the logged in user is the same as the creator of the post, and
        is on the profile page. If so then allow the delete and edit functionality to appear. */}
            {session?.user.id === post.userId && (
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
        </>
      ))}
      <div>Anybody here?</div>
    </div>
  );
}
