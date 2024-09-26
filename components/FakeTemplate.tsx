import React from "react";
import Image from "next/image";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { CldImage } from "next-cloudinary";

const FakeTemplate = () => {
  return (
    <div className="private-wrapper">
      <h2 className="h1-semibold text-center text-white">
        This is a fake profile
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
            <h2 className="h2-bold text-dark-600">100</h2>
          </div>
        </div>
      </section>
      <p className="text-center text-lg text-white h-11 mt-4 ">
        Here is where you can change more specific aspects of what you allow
        other users to see.
      </p>
      <p className="text-lg text-white mt-2 text-center mb-3">
        By default all your posts are only visible to you but you can let others
        see them by changing the setting below.
      </p>
      <form className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
          <div className="space-y-0.5">
            <div className="mb-2 text-lg font-medium">Privacy</div>
            <div>
              When on only you can see your profile, name and email above your
              posts. When off all this will become visible to anyone.
            </div>
          </div>

          <Switch checked aria-readonly />
        </div>
        <Button type="submit" className="submit-button capitalize" disabled>
          Save Changes
        </Button>
      </form>
      <div className="mt-5 grid grid-rows-1 md:grid md:grid-rows-1 md:max-w-full gap-4">
        <h2 className="text-center text-white text-lg mt-5">Your posts</h2>
        <div
          className={`p-5 bg-white border-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-white-700`}
        >
          <div className="float-left cursor-pointer md:h-full md:w-72">
            <CldImage
              crop="fit"
              height={1300}
              width={1000}
              src="samples/landscapes/girl-urban-view"
              alt="testImg"
            />
          </div>
          <div className="flex flex-col p-2">
            <div className="flex flex-row justify-between">
              <p className="font-satoshi font-bold text-gray-900">
                SorryNoUser
              </p>
            </div>
            <p className="font-inter text-sm text-gray-500">
              ThisIsn'tARealEmail@mail.com
            </p>
            <div className="flex flex-col leading-normal h-inherit">
              <p className="font-normal text-gray-700 dark:text-gray-400 mt-2 overflow-y max-h-52 w-full">
                This isn't an actual post, it's all just one big prank
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FakeTemplate;
