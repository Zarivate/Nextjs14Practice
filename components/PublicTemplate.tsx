"use client";
import React from "react";
import SinglePost2 from "@/components/shared/SinglePost2";
import Image from "next/image";
import { FullPostInterface } from "@/constants";

type PublicTemplateProps = {
  username: string;
  data: FullPostInterface[];
  accountCredits: Number;
};

const PublicTemplate = ({
  username,
  data,
  accountCredits,
}: PublicTemplateProps) => {
  return (
    <>
      <h2 className="profile-header">Welcome to {username}'s profile</h2>
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
            <h2 className="h2-bold text-dark-600">
              {accountCredits.toString()}
            </h2>
          </div>
        </div>
      </section>

      <div className="post-holder">
        <h2 className="post-header">Posts</h2>
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
