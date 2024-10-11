"use client";
import React from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { templatePosts } from "@/constants";

// A basic hardcoded fake profile page that gets hidden behind a blur and displayed if the user has their privacy on
const FakeTemplate = () => {
  const username = "SorryNoUser";
  const email = "ThisIsn'tARealEmail@mail.com";

  return (
    <div className="private-wrapper">
      <h2 className="private-header">
        In fact this entire profile is just fake
      </h2>
      <section className="profile">
        <div className="profile-balance">
          <p className="p-14-medium md:p-16-medium">CREDITS</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">100</h2>
          </div>
        </div>
      </section>

      <div className="mt-5 grid grid-rows-1 md:grid md:grid-rows-1 md:max-w-full gap-4">
        <h2 className="text-center text-white text-lg mt-5">Posts</h2>
        {templatePosts.map((post) => (
          <div
            key={post.key}
            className={`p-5 bg-white border-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-white-700`}
          >
            <div className="float-left cursor-pointer md:h-full md:w-72">
              <CldImage
                crop="fit"
                height={1300}
                width={1000}
                src={post.imageSampleUrl}
                alt="testImg"
              />
            </div>
            <div className="flex flex-col p-2">
              <div className="flex flex-row justify-between">
                <p className="font-satoshi font-bold text-gray-900">
                  {username}
                </p>
              </div>
              <p className="font-inter text-sm text-gray-500">{email}</p>
              <div className="flex flex-col leading-normal h-inherit">
                <p className="font-normal text-gray-700 dark:text-gray-400 mt-2 overflow-y max-h-52 w-full">
                  {post.postText}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FakeTemplate;
