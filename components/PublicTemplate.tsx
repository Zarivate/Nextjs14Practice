"use client";
import React from "react";
import SinglePost2 from "@/components/shared/SinglePost2";
import Image from "next/image";
import { UserPost } from "@/constants";

type PublicTemplateProps = {
  username: string;
  data: UserPost[];
  accountCredits: Number;
};

const PublicTemplate = ({
  username,
  data,
  accountCredits,
}: PublicTemplateProps) => {
  return (
    <>
      <h2 className="h1-semibold text-center text-white">
        Welcome to {username}'s profile
      </h2>
      <section className="profile">
        <div className="profile-balance">
          <p className="balance-text">CREDITS</p>
          <div className="balance-box">
            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{1000}</h2>
          </div>
        </div>
      </section>

      <div className="post-holder">
        <h2 className="text-center text-white text-lg mt-5">Posts</h2>
        {data.length ? (
          <>
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
                  handleDeleteFeed={null}
                  updatePromptFeed={null}
                />
              )
            )}
          </>
        ) : (
          <div>
            <h2 className="text-center">
              Seems they either haven't made any posts or have all expired by
              now, oh well!
            </h2>
            <Image
              src="/assets/images/shrug.png"
              width={300}
              height={300}
              alt="shrug "
              className="mx-auto my-auto"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PublicTemplate;
