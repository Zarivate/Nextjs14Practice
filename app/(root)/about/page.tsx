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
                Any posts and or transactions made are stored in the appropriate
                Mongodb collection
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="bg-white">
          <section className="mx-auto grid max-w-screen gap-y-4 gap-x-20 px-4 py-10 sm:px-10 lg:grid-cols-8">
            <h2 className="w-full text-3xl font-bold text-black sm:text-4xl lg:col-span-2 text-center">
              Database
              <Image
                src="/assets/images/mongodb_thumbnail.png"
                alt="MongoDB"
                width={150}
                height={150}
                className="mt-3"
              />
            </h2>

            <div className="mr-20 text-gray-600 lg:col-span-6">
              <p className="mb-1 text-black font-extrabold">Reasoning</p>
              <p className="">
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
          </section>
        </div>
        <div className="bg-white">
          <section className="mx-auto grid max-w-screen gap-y-4 gap-x-20 px-4 py-10 sm:px-10 lg:grid-cols-8">
            <h2 className="w-full text-3xl font-bold text-black sm:text-4xl lg:col-span-2 text-center">
              Front End
              <Image
                src="/assets/images/nextjs-icon.png"
                alt="MongoDB"
                width={150}
                height={150}
                className="mt-3"
              />
            </h2>

            <div className="mr-20 text-gray-600 lg:col-span-6">
              <p className="mb-1 text-black font-extrabold">Reasoning</p>
              <p className="">
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
          </section>
        </div>
        <div className="bg-white">
          <section className="mx-auto grid max-w-screen gap-y-4 gap-x-20 px-4 py-10 sm:px-10 lg:grid-cols-8">
            <h2 className="w-full text-3xl font-bold text-black sm:text-4xl lg:col-span-2 text-center">
              Backend
              <Image
                src="/assets/images/stripe-logo.png"
                alt="MongoDB"
                width={150}
                height={150}
                className="mt-3"
              />
            </h2>

            <div className="mr-20 text-gray-600 lg:col-span-6">
              <p className="mb-1 text-black font-extrabold">Reasoning</p>
              <p className="">
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
          </section>
        </div>
        <div className="bg-white">
          <section className="mx-auto grid max-w-screen-xl gap-y-4 gap-x-20  px-4 py-10 sm:px-10 lg:grid-cols-10">
            <h2 className="w-full text-3xl font-bold text-gray-800 sm:text-4xl lg:col-span-3">
              Deployment
              <Image
                src="/assets/images/Vercel_logo.svg.png"
                alt="MongoDB"
                width={150}
                height={150}
                className="mt-3 md:ml-8"
              />
            </h2>

            <div className="mr-20 text-gray-600 lg:col-span-5">
              <p className="mb-1 font-medium">Summary</p>
              <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                repudiandae vel consequuntur maiores pariatur veniam minima qui
                praesentium corporis, cumque aliquid in quis provident aliquam
                ad dolor saepe.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
