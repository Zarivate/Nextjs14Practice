"use client";
import React from "react";
import SinglePost2 from "@/components/shared/SinglePost2";
import Image from "next/image";

// Have a seperate landing page for a personal profile page and all the other user profiles
const PublicTemplate = ({ username, data }: any) => {
  return (
    <>
      <div className="bg-white-200">
        <h2 className="h1-semibold text-center text-white">
          Welcome to {username}'s profile
        </h2>
        <section className="profile">
          <div className="profile-balance">
            <p className="p-14-medium md:p-16-medium">CREDITS AVAILABLE</p>
            <div className="mt-4 flex items-center gap-4">
              <Image
                src="/assets/icons/coins.svg"
                alt="coins"
                width={50}
                height={50}
                className="size-9 md:size-12"
              />
              <h2 className="h2-bold text-dark-600">{100}</h2>
            </div>
          </div>
        </section>

        <div className="post-holder">
          <h2 className="text-center text-white text-lg mt-5">Posts</h2>
          {data.length ? (
            <>
              {/* Possibly add "show more" feature where can see rest of posts/posts get cutoff at somepoint */}
              {data.map(
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
                    allowHome={allowHome}
                    key={_id}
                    _id={_id}
                    imageUrl={imageUrl}
                    privacySet={privacySet}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                  />
                )
              )}
            </>
          ) : (
            <>
              <h2 className="text-center">
                There doesn't seem to be any posts... why not make one?
              </h2>
            </>
          )}
        </div>

        {/* Add feature here where displays any products user may have in their cart/want to purchase */}
      </div>
    </>
  );
};

export default PublicTemplate;
