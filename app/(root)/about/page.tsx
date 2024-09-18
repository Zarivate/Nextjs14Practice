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
      <section className="mx-auto my-10 flex max-w-xl flex-col rounded-3xl border-gray-500 px-4 py-10 text-gray-700 sm:border-8 sm:px-10 lg:max-w-screen-lg lg:flex-row bg-white">
        <div className="mr-2">
          <h2 className="mb-4 text-4xl font-medium">Database</h2>
          <p className="mb-6">MongoDb was chosen for a variety of reason</p>
          <div className="mb-4 space-y-4">
            <div className="flex space-x-2">
              <span className="text-blue-400">•</span>
              <span className="font-medium">New Puzzles Everyday</span>
            </div>
            <div className="flex space-x-2">
              <span className="text-blue-400">•</span>
              <span className="font-medium">Daily Activities</span>
            </div>
            <div className="flex space-x-2">
              <span className="text-blue-400">•</span>
              <span className="font-medium">Weekly Competitions</span>
            </div>
            <div className="flex space-x-2">
              <span className="text-blue-400">•</span>
              <span className="font-medium">Challenges and Quizzes</span>
            </div>
          </div>
        </div>
        <div className="h-88">
          <Image
            src="/assets/images/mongodb_thumbnail.png"
            alt="MongoDB"
            width={200}
            height={200}
            className="rounded-lg mt-24"
          />
        </div>
      </section>

      <div className="mx-auto my-10 max-w-full grid grid-rows-1 px-2 text-blue-800 sm:px-20 lg:grid-cols-8">
        <div className="col-span-2 flex flex-row justify-center text-center sm:text-left md:pr-10">
          <Image
            src="/assets/images/mongodb_thumbnail.png"
            alt="MongoDB"
            width={200}
            height={200}
            className="bg-white rounded-lg"
          />
        </div>
        <div className="col-span-6 mt-10 grid grid-cols-1 gap-6 rounded-2xl bg-white p-5 sm:p-10 lg:mt-0">
          <div className="relative flex gap-5">
            <div className="">
              <h3 className="text-xl font-bold text-black">Database</h3>

              <div className="text-black mt-3">
                <ul>
                  <li>• Fairly comfortable experience due to past projects</li>
                  <li>• Fit needs</li>
                  <div className="ml-5">
                    <p>
                      - Not a traditional social media site. No need to track
                      user metrics, something often best suited to SQL
                      databases.
                    </p>
                    <p>
                      - Only things tracked are users themselves, posts, and any
                      transactions made.
                    </p>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto my-10 grid max-w-screen-xl grid-rows-1 px-2 text-blue-800 sm:px-20 lg:grid-cols-8">
        <div className="col-span-2 flex flex-row justify-center text-center sm:text-left md:pr-10">
          <Image
            src="/assets/images/Vercel_logo.svg.png"
            alt="MongoDB"
            width={250}
            height={250}
            className="bg-white rounded-lg"
          />
        </div>
        <div className="col-span-6 mt-10 grid grid-cols-1 gap-6 rounded-2xl bg-blue-100 p-5 sm:p-10 lg:mt-0">
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
            className="bg-white rounded-lg"
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
            className="bg-white rounded-lg"
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
