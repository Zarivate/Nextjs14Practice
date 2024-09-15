import Header from "@/components/shared/Header";
import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <div>
      <Header
        title="Welcome!"
        subtitle={
          "This is the only page you can access without an account. And details how the site works from the perspective of a brand new user."
        }
      />
      <div className="mx-auto my-10 grid max-w-screen-xl grid-rows-1 px-2 text-blue-800 sm:px-20 lg:grid-cols-4">
        <div className="col-span-1 flex flex-row justify-center text-center sm:text-left md:pr-10">
          <Image
            src="/assets/images/mongodb_thumbnail.png"
            alt="MongoDB"
            width={250}
            height={250}
          />
        </div>
        <div className="col-span-3 mt-10 grid grid-cols-1 gap-6 rounded-2xl bg-blue-100 p-5 sm:p-10 lg:mt-0">
          <div className="relative flex gap-5">
            <div className="">
              <h3 className="text-xl font-semibold">Database</h3>
              <p className="text-black mt-3">
                Besides just being fairly comfortable with it due to past
                projects, MongoDB was also chosen due to it perfectly fitting
                the needs of this site. More traditional social sites would
                track various user metrics like session time and interactions,
                which would make a NoSQL based database like MongoDB, not
                necessarily bad, but potentially not ideal as these sorts of
                things are easier to track with more traditional SQL databases.
                That said the only things tracked on this site are the users
                themselves, posts, and any transactions made.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto my-10 grid max-w-screen-xl grid-rows-1 px-2 text-blue-800 sm:px-20 lg:grid-cols-4">
        <div className="col-span-1 flex flex-row justify-center text-center sm:text-left md:pr-10">
          <Image
            src="/assets/images/Vercel_logo.svg.png"
            alt="MongoDB"
            width={250}
            height={250}
          />
        </div>
        <div className="col-span-3 mt-10 grid grid-cols-1 gap-6 rounded-2xl bg-blue-100 p-5 sm:p-10 lg:mt-0">
          <div className="relative flex gap-5">
            <div className="">
              <h3 className="text-xl font-semibold">Database</h3>
              <p className="text-black mt-3">
                Any posts and or transactions made are stored in the appropriate
                Mongodb collection
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto my-10 grid max-w-screen-xl grid-rows-1 px-2 text-blue-800 sm:px-20 lg:grid-cols-4">
        <div className="col-span-1 flex flex-row justify-center text-center sm:text-left md:pr-10">
          <Image
            src="/assets/images/nextjs-icon.png"
            alt="MongoDB"
            width={250}
            height={250}
          />
        </div>
        <div className="col-span-3 mt-10 grid grid-cols-1 gap-6 rounded-2xl bg-blue-100 p-5 sm:p-10 lg:mt-0">
          <div className="relative flex gap-5">
            <div className="">
              <h3 className="text-xl font-semibold">Database</h3>
              <p className="text-black mt-3">
                Any posts and or transactions made are stored in the appropriate
                Mongodb collection
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto my-10 grid max-w-screen-xl grid-rows-1 px-2 text-blue-800 sm:px-20 lg:grid-cols-4">
        <div className="col-span-1 flex flex-row justify-center text-center sm:text-left md:pr-10">
          <Image
            src="/assets/images/stripe-logo.png"
            alt="MongoDB"
            width={250}
            height={250}
          />
        </div>
        <div className="col-span-3 mt-10 grid grid-cols-1 gap-6 rounded-2xl bg-blue-100 p-5 sm:p-10 lg:mt-0">
          <div className="relative flex gap-5">
            <div className="">
              <h3 className="text-xl font-semibold">Database</h3>
              <p className="text-black mt-3">
                Any posts and or transactions made are stored in the appropriate
                Mongodb collection
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
